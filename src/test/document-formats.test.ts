import { describe, expect, it } from 'vitest';
import { markdownToHtml } from '@/lib/markdown';
import { htmlToMarkdown } from '@/lib/html-to-markdown';
import { csvToHtmlTable, parseCsv } from '@/lib/csv';
import { documentConverter } from '@/converters/document-converter';

function fakeFile(name: string, content: string | Uint8Array): File {
  const bytes = typeof content === 'string' ? new TextEncoder().encode(content) : content;
  return {
    name,
    size: bytes.length,
    text: async () => (typeof content === 'string' ? content : new TextDecoder().decode(bytes)),
    arrayBuffer: async () => bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength),
  } as unknown as File;
}
const readBlob = (b: Blob) =>
  new Promise<string>((res) => { const r = new FileReader(); r.onload = () => res(String(r.result)); r.readAsText(b); });

describe('markdownToHtml', () => {
  it('produces valid block structure', () => {
    const html = markdownToHtml('# Title\n\nSome **bold** and *italic* with `code` and [a link](https://example.com).\n\n- one\n- two\n\n1. first\n2. second\n\n> quoted\n\n---\n\n```js\nconst a = 1 < 2;\n```');
    expect(html).toContain('<h1>Title</h1>');
    expect(html).not.toContain('<p><h1>');
    expect(html).toContain('<strong>bold</strong>');
    expect(html).toContain('<em>italic</em>');
    expect(html).toContain('<code>code</code>');
    expect(html).toContain('<a href="https://example.com/">a link</a>');
    expect(html).toContain('<ul><li>one</li><li>two</li></ul>');
    expect(html).toContain('<ol><li>first</li><li>second</li></ol>');
    expect(html).toContain('<blockquote>');
    expect(html).toContain('<hr />');
    expect(html).toContain('<pre><code class="language-js">const a = 1 &lt; 2;</code></pre>');
  });

  it('escapes HTML and blocks javascript: links', () => {
    const html = markdownToHtml('<script>alert(1)</script> [x](javascript:alert(1))');
    expect(html).not.toContain('<script>');
    expect(html).not.toContain('javascript:');
  });
});

describe('htmlToMarkdown', () => {
  it('converts structure to Markdown', () => {
    const md = htmlToMarkdown('<h1>Title</h1><p>Hello <strong>bold</strong> <em>it</em> <a href="https://example.com">link</a></p><ul><li>a</li><li>b</li></ul><script>x()</script><pre>code()</pre>');
    expect(md).toContain('# Title');
    expect(md).toContain('Hello **bold** *it* [link](https://example.com)');
    expect(md).toContain('- a\n- b');
    expect(md).toContain('```\ncode()\n```');
    expect(md).not.toContain('x()');
  });

  it('drops non-http links but keeps the text', () => {
    expect(htmlToMarkdown('<p><a href="javascript:alert(1)">click</a></p>')).toBe('click');
  });
});

describe('csv', () => {
  it('parses quoted fields and doubled quotes', () => {
    expect(parseCsv('a,"b,c","say ""hi"""\n1,2,3\n')).toEqual([['a', 'b,c', 'say "hi"'], ['1', '2', '3']]);
  });
  it('renders a table with a header row and escaped cells', () => {
    const html = csvToHtmlTable('name,note\nA,<b>x</b>\n');
    expect(html).toContain('<thead><tr><th>name</th><th>note</th></tr></thead>');
    expect(html).toContain('<td>&lt;b&gt;x&lt;/b&gt;</td>');
  });
});

describe('document converter outputs', () => {
  it('converts CSV to an HTML table and keeps bold text from RTF', async () => {
    const csv = await documentConverter.convert(fakeFile('a.csv', 'x,y\n1,2\n'), 'html');
    expect(await readBlob(csv.blob)).toContain('<table>');
    const rtf = await documentConverter.convert(fakeFile('a.rtf', '{\\rtf1\\ansi {\\b Bold}\\par Next\\par}'), 'txt');
    expect(await readBlob(rtf.blob)).toBe('Bold\nNext');
  });
});
