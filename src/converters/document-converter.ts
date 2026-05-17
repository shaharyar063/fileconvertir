import { ConverterPlugin, ConversionResult, ConversionOption } from '@/lib/converter-types';
import { getTargetsForSource } from '@/lib/conversion-map';
import { textToDocx } from '@/lib/build-docx';
import { extractPdfText } from '@/lib/pdf-text';
import { ArchiveFormat, buildSingleFileArchive } from '@/lib/build-archive';

const DOC_SOURCES = ['pdf', 'docx', 'odt', 'txt', 'rtf', 'html', 'md', 'csv'];

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
  return extractPdfText(file);
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

async function textToPdf(text: string): Promise<Blob> {
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

async function odtToText(file: File): Promise<string> {
  const JSZip = (await import('jszip')).default;
  const zip = await JSZip.loadAsync(await file.arrayBuffer());
  const contentXml = await zip.file('content.xml')?.async('text');
  if (!contentXml) throw new Error('Invalid ODT file: content.xml not found');
  return contentXml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

async function extractText(file: File, ext: string): Promise<string> {
  switch (ext) {
    case 'txt':
    case 'csv': return readTextFile(file);
    case 'html': return htmlToText(file);
    case 'docx': return docxToText(file);
    case 'odt': return odtToText(file);
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
      const blob = await textToPdf(text);
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
