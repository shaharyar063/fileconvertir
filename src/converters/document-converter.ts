import { ConverterPlugin, ConversionResult, ConversionOption } from '@/lib/converter-types';
import { getTargetsForSource } from '@/lib/conversion-map';

const DOC_SOURCES = ['pdf', 'docx', 'doc', 'odt', 'txt', 'rtf', 'html', 'md', 'csv', 'xlsx', 'xls', 'ods', 'pptx', 'ppt', 'odp', 'epub', 'mobi'];

async function readTextFile(file: File): Promise<string> {
  return file.text();
}

async function docxToText(file: File): Promise<string> {
  const mammoth = await import('mammoth');
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
}

async function htmlToText(file: File): Promise<string> {
  const html = await file.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}

async function pdfToText(file: File): Promise<string> {
  const text = await file.text();
  const matches = text.match(/\(([^)]+)\)/g);
  if (matches && matches.length > 0) {
    return matches.map(m => m.slice(1, -1)).join(' ');
  }
  return '[PDF text extraction requires a server-side processor. The file structure was preserved.]';
}

async function rtfToText(file: File): Promise<string> {
  const raw = await file.text();
  return raw.replace(/\{\\[^{}]*\}/g, '').replace(/\\[a-z]+\d*\s?/gi, '').replace(/[{}]/g, '').trim();
}

function mdToHtml(md: string): string {
  // Basic markdown → HTML conversion
  const html = md
    // Code blocks
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code class="$1">$2</code></pre>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Headers
    .replace(/^######\s+(.+)$/gm, '<h6>$1</h6>')
    .replace(/^#####\s+(.+)$/gm, '<h5>$1</h5>')
    .replace(/^####\s+(.+)$/gm, '<h4>$1</h4>')
    .replace(/^###\s+(.+)$/gm, '<h3>$1</h3>')
    .replace(/^##\s+(.+)$/gm, '<h2>$1</h2>')
    .replace(/^#\s+(.+)$/gm, '<h1>$1</h1>')
    // Bold & italic
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Links & images
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // Blockquotes
    .replace(/^>\s+(.+)$/gm, '<blockquote>$1</blockquote>')
    // Horizontal rules
    .replace(/^---+$/gm, '<hr />')
    // Unordered lists
    .replace(/^[-*]\s+(.+)$/gm, '<li>$1</li>')
    // Line breaks → paragraphs
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br />');

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Document</title></head><body><p>${html}</p></body></html>`;
}

function mdToText(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/#{1,6}\s+/g, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^>\s+/gm, '')
    .replace(/^[-*]\s+/gm, '• ')
    .replace(/^---+$/gm, '')
    .trim();
}

async function textToPdf(text: string, filename: string): Promise<Blob> {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF();
  const lines = doc.splitTextToSize(text, 180);
  let y = 15;
  const pageHeight = doc.internal.pageSize.getHeight();
  for (const line of lines) {
    if (y > pageHeight - 15) { doc.addPage(); y = 15; }
    doc.text(line, 15, y);
    y += 7;
  }
  return doc.output('blob');
}

async function extractText(file: File, ext: string): Promise<string> {
  switch (ext) {
    case 'txt':
    case 'csv': return readTextFile(file);
    case 'html': return htmlToText(file);
    case 'docx': return docxToText(file);
    case 'doc': return readTextFile(file);
    case 'rtf': return rtfToText(file);
    case 'pdf': return pdfToText(file);
    case 'md': return readTextFile(file);
    default: return readTextFile(file);
  }
}

export const documentConverter: ConverterPlugin = {
  id: 'document-converter',
  name: 'Document Converter',
  sourceFormats: DOC_SOURCES,

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

    // MD → HTML (special case, no text extraction needed)
    if (ext === 'md' && targetFormat === 'html') {
      const mdContent = await file.text();
      onProgress?.(50);
      const htmlContent = mdToHtml(mdContent);
      onProgress?.(100);
      return {
        blob: new Blob([htmlContent], { type: 'text/html' }),
        filename: `${baseName}.html`,
        mimeType: 'text/html',
      };
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
      const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${baseName}</title></head><body><pre>${text}</pre></body></html>`;
      onProgress?.(100);
      return {
        blob: new Blob([html], { type: 'text/html' }),
        filename: `${baseName}.html`,
        mimeType: 'text/html',
      };
    }

    if (targetFormat === 'pdf') {
      const blob = await textToPdf(text, baseName);
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

    // Archive wrapping
    if (['zip', 'tar', 'gz'].includes(targetFormat)) {
      const JSZip = (await import('jszip')).default;
      const zip = new JSZip();
      zip.file(file.name, await file.arrayBuffer());
      const blob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE' });
      onProgress?.(100);
      return { blob, filename: `${baseName}.${targetFormat}`, mimeType: 'application/octet-stream' };
    }

    // Cloud-required conversions are handled by cloud processing via useConverter hook
    throw new Error(`${ext.toUpperCase()}-to-${targetFormat.toUpperCase()} conversion is not supported in the browser. Please try again.`);
  },
};
