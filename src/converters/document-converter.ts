import { ConverterPlugin, ConversionResult, ConversionOption } from '@/lib/converter-types';
import { getTargetsForSource } from '@/lib/conversion-map';

const DOC_SOURCES = ['pdf', 'docx', 'doc', 'txt', 'rtf', 'html'];

function labelFor(fmt: string): string {
  return fmt.toUpperCase();
}

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
  // Basic PDF text extraction using browser-available methods
  // For production, a library like pdf.js would be better
  const text = await file.text();
  // Try to extract readable text from PDF binary
  const matches = text.match(/\(([^)]+)\)/g);
  if (matches && matches.length > 0) {
    return matches.map(m => m.slice(1, -1)).join(' ');
  }
  return '[PDF text extraction requires a server-side processor. The file structure was preserved.]';
}

async function rtfToText(file: File): Promise<string> {
  const raw = await file.text();
  // Strip RTF control words — basic extraction
  return raw
    .replace(/\{\\[^{}]*\}/g, '')
    .replace(/\\[a-z]+\d*\s?/gi, '')
    .replace(/[{}]/g, '')
    .trim();
}

async function textToPdf(text: string, filename: string): Promise<Blob> {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF();
  const lines = doc.splitTextToSize(text, 180);
  let y = 15;
  const pageHeight = doc.internal.pageSize.getHeight();
  for (const line of lines) {
    if (y > pageHeight - 15) {
      doc.addPage();
      y = 15;
    }
    doc.text(line, 15, y);
    y += 7;
  }
  return doc.output('blob');
}

async function extractText(file: File, ext: string): Promise<string> {
  switch (ext) {
    case 'txt': return readTextFile(file);
    case 'html': return htmlToText(file);
    case 'docx': return docxToText(file);
    case 'doc': return readTextFile(file); // .doc is binary; best-effort
    case 'rtf': return rtfToText(file);
    case 'pdf': return pdfToText(file);
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
      label: labelFor(t),
      description: `Convert to ${labelFor(t)}`,
    }));
  },

  async convert(file, targetFormat, onProgress): Promise<ConversionResult> {
    const ext = file.name.split('.').pop()?.toLowerCase() || '';
    onProgress?.(10);

    const text = await extractText(file, ext);
    onProgress?.(50);

    const baseName = file.name.replace(/\.[^/.]+$/, '');

    if (targetFormat === 'txt') {
      onProgress?.(100);
      return {
        blob: new Blob([text], { type: 'text/plain' }),
        filename: `${baseName}.txt`,
        mimeType: 'text/plain',
      };
    }

    if (targetFormat === 'pdf') {
      const blob = await textToPdf(text, baseName);
      onProgress?.(100);
      return {
        blob,
        filename: `${baseName}.pdf`,
        mimeType: 'application/pdf',
      };
    }

    throw new Error(`Unsupported document target format: ${targetFormat}`);
  },
};
