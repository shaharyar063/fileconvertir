import { escapeHtml } from './escape-html';

/** Parse CSV (RFC 4180 style: quoted fields, doubled quotes, CRLF or LF). */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let quoted = false;
  const src = text.replace(/^\uFEFF/, '');
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (quoted) {
      if (ch === '"') {
        if (src[i + 1] === '"') { field += '"'; i++; } else quoted = false;
      } else field += ch;
    } else if (ch === '"' && field === '') quoted = true;
    else if (ch === ',') { row.push(field); field = ''; }
    else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && src[i + 1] === '\n') i++;
      row.push(field); field = '';
      if (row.some((c) => c !== '') || row.length > 1) rows.push(row);
      row = [];
    } else field += ch;
  }
  if (field !== '' || row.length) { row.push(field); rows.push(row); }
  return rows;
}

/** CSV to an HTML table; the first row is the header. */
export function csvToHtmlTable(text: string): string {
  const rows = parseCsv(text);
  if (rows.length === 0) return '<table></table>';
  const cells = (r: string[], tag: 'th' | 'td') => r.map((c) => `<${tag}>${escapeHtml(c)}</${tag}>`).join('');
  const [head, ...body] = rows;
  return [
    '<table>',
    `<thead><tr>${cells(head, 'th')}</tr></thead>`,
    `<tbody>${body.map((r) => `<tr>${cells(r, 'td')}</tr>`).join('')}</tbody>`,
    '</table>',
  ].join('\n');
}
