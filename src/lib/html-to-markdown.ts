/**
 * Convert an HTML fragment to Markdown by walking the DOM. Covers headings,
 * paragraphs, emphasis, links, lists, block quotes, code, rules and simple
 * tables. Images, scripts and styles are dropped; only text is kept.
 */

function inlineText(node: Node): string {
  if (node.nodeType === Node.TEXT_NODE) return (node.textContent ?? '').replace(/\s+/g, ' ');
  if (node.nodeType !== Node.ELEMENT_NODE) return '';
  const el = node as Element;
  const tag = el.tagName.toLowerCase();
  const inner = () => Array.from(el.childNodes).map(inlineText).join('');
  switch (tag) {
    case 'strong':
    case 'b': { const t = inner().trim(); return t ? `**${t}**` : ''; }
    case 'em':
    case 'i': { const t = inner().trim(); return t ? `*${t}*` : ''; }
    case 'code': return `\`${el.textContent ?? ''}\``;
    case 'br': return '  \n';
    case 'a': {
      const href = el.getAttribute('href') ?? '';
      const t = inner().trim();
      return /^https?:\/\//i.test(href) && t ? `[${t}](${href})` : t;
    }
    case 'img': return '';
    case 'script':
    case 'style':
    case 'noscript':
    case 'template': return '';
    default: return inner();
  }
}

function block(el: Element, depth = 0): string[] {
  const out: string[] = [];
  for (const node of Array.from(el.childNodes)) {
    if (node.nodeType === Node.TEXT_NODE) {
      const t = (node.textContent ?? '').replace(/\s+/g, ' ').trim();
      if (t) out.push(t);
      continue;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) continue;
    const child = node as Element;
    const tag = child.tagName.toLowerCase();
    if (/^h[1-6]$/.test(tag)) {
      const t = inlineText(child).trim();
      if (t) out.push(`${'#'.repeat(Number(tag[1]))} ${t}`);
    } else if (tag === 'p') {
      const t = inlineText(child).trim();
      if (t) out.push(t);
    } else if (tag === 'ul' || tag === 'ol') {
      const items = Array.from(child.children)
        .filter((c) => c.tagName.toLowerCase() === 'li')
        .map((li, idx) => {
          const marker = tag === 'ol' ? `${idx + 1}.` : '-';
          const text = Array.from(li.childNodes)
            .filter((n) => !(n.nodeType === Node.ELEMENT_NODE && /^(ul|ol)$/i.test((n as Element).tagName)))
            .map(inlineText).join('').trim();
          const nested = Array.from(li.children)
            .filter((c) => /^(ul|ol)$/i.test(c.tagName))
            .map((c) => block(c.parentElement ? (() => { const w = document.createElement('div'); w.appendChild(c.cloneNode(true)); return w; })() : c, depth + 1).join('\n'))
            .join('\n');
          const line = `${'  '.repeat(depth)}${marker} ${text}`;
          return nested ? `${line}\n${nested}` : line;
        });
      if (items.length) out.push(items.join('\n'));
    } else if (tag === 'blockquote') {
      const inner = block(child, depth).join('\n\n');
      if (inner) out.push(inner.split('\n').map((l) => `> ${l}`).join('\n'));
    } else if (tag === 'pre') {
      out.push('```\n' + (child.textContent ?? '').replace(/\n$/, '') + '\n```');
    } else if (tag === 'hr') {
      out.push('---');
    } else if (tag === 'table') {
      const rows = Array.from(child.querySelectorAll('tr')).map((tr) =>
        Array.from(tr.children).map((c) => inlineText(c).trim().replace(/\|/g, '\\|')),
      ).filter((r) => r.length);
      if (rows.length) {
        const width = Math.max(...rows.map((r) => r.length));
        const pad = (r: string[]) => [...r, ...Array(width - r.length).fill('')];
        const lines = rows.map((r) => `| ${pad(r).join(' | ')} |`);
        lines.splice(1, 0, `| ${Array(width).fill('---').join(' | ')} |`);
        out.push(lines.join('\n'));
      }
    } else if (['script', 'style', 'noscript', 'template', 'head'].includes(tag)) {
      continue;
    } else if (['div', 'section', 'article', 'main', 'header', 'footer', 'body', 'figure', 'figcaption', 'li', 'td', 'th', 'dd', 'dt', 'dl', 'nav', 'aside'].includes(tag)) {
      out.push(...block(child, depth));
    } else {
      const t = inlineText(child).trim();
      if (t) out.push(t);
    }
  }
  return out;
}

export function htmlToMarkdown(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return block(doc.body).join('\n\n').replace(/\n{3,}/g, '\n\n').trim();
}
