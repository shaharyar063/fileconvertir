import { DOCUMENT_SOURCES } from '@/lib/source-formats';
import { ConverterPlugin, ConversionResult, ConversionOption } from '@/lib/converter-types';
import { getTargetsForSource } from '@/lib/conversion-map';
import { textToDocx } from '@/lib/build-docx';
import { extractPdfText } from '@/lib/pdf-text';
import { ArchiveFormat, buildSingleFileArchive } from '@/lib/build-archive';
import { escapeHtml, sanitizeExportedHtml } from '@/lib/escape-html';
import { markdownToHtml } from '@/lib/markdown';
import { htmlToMarkdown } from '@/lib/html-to-markdown';
import { csvToHtmlTable } from '@/lib/csv';
import { rtfToText } from '@/lib/rtf';


async function readTextFile(file: File): Promise<string> {
  return file.text();
}

async function docxToText(file: File): Promise<string> {
  const mammoth = await import('mammoth');
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
}

async function docxToHtmlBody(file: File): Promise<string> {
  const mammoth = await import('mammoth');
  const result = await mammoth.convertToHtml({ arrayBuffer: await file.arrayBuffer() });
  return result.value;
}

function htmlDocument(title: string, body: string): string {
  const style = 'body{font-family:system-ui,sans-serif;max-width:48rem;margin:2rem auto;padding:0 1rem;line-height:1.5}table{border-collapse:collapse}td,th{border:1px solid #ccc;padding:4px 8px;text-align:left}pre{background:#f4f4f4;padding:.75rem;overflow:auto}';
  return sanitizeExportedHtml(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>${escapeHtml(title)}</title><style>${style}</style></head><body>${body}</body></html>`);
}

async function htmlToText(file: File): Promise<string> {
  const html = await file.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  doc.querySelectorAll('script, style, noscript, template').forEach((el) => el.remove());
  // textContent glues block elements together ("<p>a</p><p>b</p>" -> "ab"), so
  // put line breaks where the browser would show them.
  doc.querySelectorAll('br').forEach((el) => el.replaceWith('\n'));
  doc
    .querySelectorAll('p, div, h1, h2, h3, h4, h5, h6, li, tr, section, article, blockquote, pre, ul, ol, table')
    .forEach((el) => el.append('\n'));
  return (doc.body.textContent || '').replace(/\n{3,}/g, '\n\n').trim();
}

async function pdfToText(file: File): Promise<string> {
  return extractPdfText(file);
}

async function rtfFileToText(file: File): Promise<string> {
  return rtfToText(await file.text());
}

function mdToText(md: string): string {
  return md
    .replace(/```[^\n]*\n([\s\S]*?)```/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/#{1,6}\s+/g, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^>\s+/gm, '')
    .replace(/^[-*]\s+/gm, '- ')
    .replace(/^---+$/gm, '')
    .trim();
}

async function textToPdf(text: string, monospace = false): Promise<Blob> {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF();
  // Plain text and CSV keep their alignment in a monospace font; everything
  // else uses the standard proportional font.
  doc.setFont(monospace ? 'courier' : 'helvetica');
  doc.setFontSize(monospace ? 10 : 11);
  const lineHeight = monospace ? 4.5 : 5.5;
  const lines = doc.splitTextToSize(text, 180);
  let y = 15;
  const pageHeight = doc.internal.pageSize.getHeight();
  for (const line of lines) {
    if (y > pageHeight - 15) { doc.addPage(); y = 15; }
    doc.text(line, 15, y);
    y += lineHeight;
  }
  return doc.output('blob');
}

async function odtToText(file: File): Promise<string> {
  const JSZip = (await import('jszip')).default;
  const zip = await JSZip.loadAsync(await file.arrayBuffer());
  const contentXml = await zip.file('content.xml')?.async('text');
  if (!contentXml) throw new Error('Invalid ODT file: content.xml not found');
  // Keep paragraph/line structure, then strip tags and decode XML entities.
  return contentXml
    .replace(/<\/text:(p|h)>/g, '\n\n')
    .replace(/<text:(line-break|tab)\s*\/>/g, (_m, t) => (t === 'tab' ? '\t' : '\n'))
    .replace(/<text:s(?:\s+text:c="(\d+)")?\s*\/>/g, (_m, c) => ' '.repeat(Number(c) || 1))
    .replace(/<[^>]+>/g, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

async function extractText(file: File, ext: string): Promise<string> {
  switch (ext) {
    case 'txt':
    case 'csv': return readTextFile(file);
    case 'html': return htmlToText(file);
    case 'docx': return docxToText(file);
    case 'odt': return odtToText(file);
    case 'rtf': return rtfFileToText(file);
    case 'pdf': return pdfToText(file);
    case 'md': return readTextFile(file);
    default: return readTextFile(file);
  }
}

export const documentConverter: ConverterPlugin = {
  id: 'document-converter',
  name: 'Document Converter',
  sourceFormats: DOCUMENT_SOURCES,

  getTargetFormats(sourceFormat: string): ConversionOption[] {
    return getTargetsForSource(sourceFormat).map(t => ({
      targetFormat: t,
      label: t.toUpperCase(),
      description: `Convert to ${t.toUpperCase()}`,
    }));
  },

  async convert(file, targetFormat, onProgress): Promise<ConversionResult> {
    const ext = file.name.split('.').pop()?.toLowerCase() || '';
    onProgress?.(10);
    const baseName = file.name.replace(/\.[^/.]+$/, '');

    // Targets that keep the document's structure instead of flattening to text
    if (ext === 'md' && targetFormat === 'html') {
      const html = htmlDocument(baseName, markdownToHtml(await file.text()));
      onProgress?.(100);
      return { blob: new Blob([html], { type: 'text/html' }), filename: `${baseName}.html`, mimeType: 'text/html' };
    }
    if (ext === 'docx' && targetFormat === 'html') {
      const html = htmlDocument(baseName, await docxToHtmlBody(file));
      onProgress?.(100);
      return { blob: new Blob([html], { type: 'text/html' }), filename: `${baseName}.html`, mimeType: 'text/html' };
    }
    if (ext === 'docx' && targetFormat === 'md') {
      const markdown = htmlToMarkdown(await docxToHtmlBody(file));
      onProgress?.(100);
      return { blob: new Blob([markdown], { type: 'text/markdown' }), filename: `${baseName}.md`, mimeType: 'text/markdown' };
    }
    if (ext === 'html' && targetFormat === 'md') {
      const markdown = htmlToMarkdown(await file.text());
      onProgress?.(100);
      return { blob: new Blob([markdown], { type: 'text/markdown' }), filename: `${baseName}.md`, mimeType: 'text/markdown' };
    }
    if (ext === 'csv' && targetFormat === 'html') {
      const html = htmlDocument(baseName, csvToHtmlTable(await file.text()));
      onProgress?.(100);
      return { blob: new Blob([html], { type: 'text/html' }), filename: `${baseName}.html`, mimeType: 'text/html' };
    }

    const text = ext === 'md' ? mdToText(await file.text()) : await extractText(file, ext);
    onProgress?.(50);

    if (targetFormat === 'txt') {
      onProgress?.(100);
      return {
        blob: new Blob([text], { type: 'text/plain' }),
        filename: `${baseName}.txt`,
        mimeType: 'text/plain',
      };
    }

    if (targetFormat === 'html') {
      const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${escapeHtml(baseName)}</title></head><body><pre>${escapeHtml(text)}</pre></body></html>`;
      onProgress?.(100);
      return {
        blob: new Blob([html], { type: 'text/html' }),
        filename: `${baseName}.html`,
        mimeType: 'text/html',
      };
    }

    if (targetFormat === 'pdf') {
      const blob = await textToPdf(text, ext === 'txt' || ext === 'csv');
      onProgress?.(100);
      return { blob, filename: `${baseName}.pdf`, mimeType: 'application/pdf' };
    }

    if (targetFormat === 'md') {
      onProgress?.(100);
      return {
        blob: new Blob([text], { type: 'text/markdown' }),
        filename: `${baseName}.md`,
        mimeType: 'text/markdown',
      };
    }

    if (targetFormat === 'docx') {
      const blob = await textToDocx(text);
      onProgress?.(100);
      return {
        blob,
        filename: `${baseName}.docx`,
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      };
    }

    if (['zip', 'tar', 'gz'].includes(targetFormat)) {
      const data = new Uint8Array(await file.arrayBuffer());
      const result = await buildSingleFileArchive(
        file.name,
        data,
        targetFormat as ArchiveFormat,
        baseName,
      );
      onProgress?.(100);
      return result;
    }

    throw new Error(`${ext.toUpperCase()}-to-${targetFormat.toUpperCase()} conversion is not supported. Please try another format.`);
  },
};
