import * as pdfjs from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

/** Extract text from a PDF file using pdf.js (client-side). */
export async function extractPdfText(file: File): Promise<string> {
  const data = new Uint8Array(await file.arrayBuffer());
  const doc = await pdfjs.getDocument({ data }).promise;

  const parts: string[] = [];
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    // Keep the PDF's own line breaks instead of running a page into one line.
    let pageText = '';
    for (const item of content.items) {
      if (!('str' in item)) continue;
      pageText += item.str + (item.hasEOL ? '\n' : ' ');
    }
    pageText = pageText.replace(/[ \t]+/g, ' ').replace(/ ?\n ?/g, '\n');
    if (pageText.trim()) {
      parts.push(pageText.trim());
    }
  }

  const text = parts.join('\n\n').trim();
  if (!text) {
    return 'No extractable text found. This PDF may be scanned images only (OCR is not supported).';
  }
  return text;
}
