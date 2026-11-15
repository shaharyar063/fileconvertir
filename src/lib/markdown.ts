import { escapeHtml, safeHttpUrl } from './escape-html';

/** Inline Markdown (code, images, links, bold, italic) to safe HTML. */
function inline(text: string): string {
  const codes: string[] = [];
  let s = text.replace(/`([^`]+)`/g, (_m, code: string) => {
    codes.push(`<code>${escapeHtml(code)}</code>`);
    return `\u0000${codes.length - 1}\u0000`;
  });
  s = escapeHtml(s);
  const href = (u: string) => escapeHtml(safeHttpUrl(u.replace(/&amp;/g, '&')));
  s = s.replace(/!\[([^\]]*)\]\(([^)\s]+)[^)]*\)/g, (_m, alt: string, url: string) => `<img src="${href(url)}" alt="${alt}" />`);
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)[^)]*\)/g, (_m, label: string, url: string) => `<a href="${href(url)}">${label}</a>`);
  s = s
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/(\*\*|__)(.+?)\1/g, '<strong>$2</strong>')
    .replace(/(^|[^*\w])\*(?!\s)(.+?)(?<!\s)\*(?!\*)/g, '$1<em>$2</em>');
  // eslint-disable-next-line no-control-regex
  return s.replace(/\u0000(\d+)\u0000/g, (_m, i: string) => codes[Number(i)]);
}

/**
 * Block-level Markdown to HTML: headings, paragraphs, fenced code, block
 * quotes, rules, and bulleted or numbered lists. Output is valid HTML (no
 * paragraphs around headings, list items inside a list).
 */
export function markdownToHtml(md: string): string {
  const lines = md.replace(/\r\n?/g, '\n').split('\n');
  const out: string[] = [];
  let i = 0;
  const isBlank = (l: string) => l.trim() === '';

  while (i < lines.length) {
    const line = lines[i];
    if (isBlank(line)) { i++; continue; }

    const fence = /^```\s*([\w-]*)/.exec(line);
    if (fence) {
      const code: string[] = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i])) code.push(lines[i++]);
      i++; // closing fence
      const cls = fence[1] ? ` class="language-${escapeHtml(fence[1])}"` : '';
      out.push(`<pre><code${cls}>${escapeHtml(code.join('\n'))}</code></pre>`);
      continue;
    }

    const heading = /^(#{1,6})\s+(.*?)\s*#*\s*$/.exec(line);
    if (heading) {
      const n = heading[1].length;
      out.push(`<h${n}>${inline(heading[2])}</h${n}>`);
      i++;
      continue;
    }

    if (/^\s*([-*_])(\s*\1){2,}\s*$/.test(line)) { out.push('<hr />'); i++; continue; }

    if (/^>\s?/.test(line)) {
      const quote: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) quote.push(lines[i++].replace(/^>\s?/, ''));
      out.push(`<blockquote><p>${inline(quote.join('\n'))}</p></blockquote>`);
      continue;
    }

    const list = /^\s*([-*+]|\d+[.)])\s+/.exec(line);
    if (list) {
      const ordered = /\d/.test(list[1]);
      const items: string[] = [];
      while (i < lines.length) {
        const m = /^\s*([-*+]|\d+[.)])\s+(.*)$/.exec(lines[i]);
        if (!m || /\d/.test(m[1]) !== ordered) break;
        items.push(`<li>${inline(m[2])}</li>`);
        i++;
      }
      out.push(`<${ordered ? 'ol' : 'ul'}>${items.join('')}</${ordered ? 'ol' : 'ul'}>`);
      continue;
    }

    const para: string[] = [];
    while (
      i < lines.length &&
      !isBlank(lines[i]) &&
      !/^(#{1,6}\s|```|>\s?|\s*([-*+]|\d+[.)])\s+)/.test(lines[i]) &&
      !/^\s*([-*_])(\s*\1){2,}\s*$/.test(lines[i])
    ) para.push(lines[i++]);
    if (para.length === 0) { para.push(lines[i++]); }
    out.push(`<p>${inline(para.join('\n')).replace(/\n/g, '<br />')}</p>`);
  }
  return out.join('\n');
}
