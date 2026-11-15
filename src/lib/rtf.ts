/**
 * Minimal RTF to plain text. Handles paragraphs, tabs, hex (\'e9) and unicode
 * (\u233?) escapes, and skips non-text groups (fonts, colours, styles, images,
 * metadata). Formatting such as bold is dropped but the text inside is kept.
 */

const SKIP_DESTINATIONS = new Set([
  'fonttbl', 'colortbl', 'stylesheet', 'info', 'pict', 'object', 'header', 'headerl', 'headerr',
  'headerf', 'footer', 'footerl', 'footerr', 'footerf', 'themedata', 'datastore', 'listtable',
  'listoverridetable', 'rsidtbl', 'generator', 'colorschememapping', 'latentstyles', 'xmlnstbl',
  'fldinst', 'bkmkstart', 'bkmkend', 'private', 'revtbl', 'filetbl',
]);

const SYMBOLS: Record<string, string> = {
  emdash: '—', endash: '–', lquote: '‘', rquote: '’', ldblquote: '“',
  rdblquote: '”', bullet: '•', emspace: ' ', enspace: ' ', tab: '\t',
};

function decodeCp1252(byte: number): string {
  try {
    return new TextDecoder('windows-1252').decode(new Uint8Array([byte]));
  } catch {
    return String.fromCharCode(byte);
  }
}

export function rtfToText(rtf: string): string {
  let out = '';
  const stack: { skip: boolean; uc: number }[] = [];
  let skip = false;
  let uc = 1;
  let skipChars = 0; // fallback characters to ignore after a \uN escape
  let i = 0;

  while (i < rtf.length) {
    const ch = rtf[i];

    if (ch === '{') {
      stack.push({ skip, uc });
      i++;
      // A group starting with \* or a skip-listed control word is not document text.
      if (rtf[i] === '\\' && rtf[i + 1] === '*') skip = true;
      else if (rtf[i] === '\\') {
        const m = /^\\([a-zA-Z]+)/.exec(rtf.slice(i, i + 24));
        if (m && SKIP_DESTINATIONS.has(m[1])) skip = true;
      }
      continue;
    }
    if (ch === '}') {
      const prev = stack.pop();
      skip = prev?.skip ?? false;
      uc = prev?.uc ?? 1;
      i++;
      continue;
    }
    if (ch === '\\') {
      const next = rtf[i + 1];
      if (next === undefined) break;
      if (next === '\\' || next === '{' || next === '}') {
        if (!skip && skipChars === 0) out += next;
        else if (skipChars > 0) skipChars--;
        i += 2;
        continue;
      }
      if (next === "'") {
        const hex = rtf.slice(i + 2, i + 4);
        if (!skip) {
          if (skipChars > 0) skipChars--;
          else out += decodeCp1252(parseInt(hex, 16) || 0);
        }
        i += 4;
        continue;
      }
      if (next === '~') { if (!skip) out += ' '; i += 2; continue; }
      if (next === '-' || next === '_') { i += 2; continue; }
      if (next === '\n' || next === '\r') { if (!skip) out += '\n'; i += 2; continue; }
      const m = /^\\([a-zA-Z]+)(-?\d+)? ?/.exec(rtf.slice(i, i + 40));
      if (!m) { i += 2; continue; }
      i += m[0].length;
      const word = m[1];
      const param = m[2] !== undefined ? parseInt(m[2], 10) : undefined;
      if (skip) continue;
      if (word === 'par' || word === 'line' || word === 'sect' || word === 'page') out += '\n';
      else if (word === 'cell' || word === 'tab') out += '\t';
      else if (word === 'row') out += '\n';
      else if (word === 'uc' && param !== undefined) uc = param;
      else if (word === 'u' && param !== undefined) {
        out += String.fromCharCode(param < 0 ? param + 65536 : param);
        skipChars = uc;
      } else if (SYMBOLS[word]) out += SYMBOLS[word];
      continue;
    }
    if (ch === '\r' || ch === '\n') { i++; continue; }
    if (!skip) {
      if (skipChars > 0) skipChars--;
      else out += ch;
    }
    i++;
  }

  return out.replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
}
