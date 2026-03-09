const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
}

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB for edge functions

const MIME_TYPES: Record<string, string> = {
  // Images
  jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp',
  gif: 'image/gif', bmp: 'image/bmp', tiff: 'image/tiff', avif: 'image/avif',
  ico: 'image/x-icon', svg: 'image/svg+xml', pdf: 'application/pdf',
  // Documents
  txt: 'text/plain', html: 'text/html', md: 'text/markdown',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  doc: 'application/msword', rtf: 'application/rtf',
  csv: 'text/csv', xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  odt: 'application/vnd.oasis.opendocument.text',
  // Audio
  mp3: 'audio/mpeg', wav: 'audio/wav', aac: 'audio/aac', ogg: 'audio/ogg',
  flac: 'audio/flac', m4a: 'audio/mp4', aiff: 'audio/aiff', wma: 'audio/x-ms-wma',
  // Video
  mp4: 'video/mp4', mov: 'video/quicktime', avi: 'video/x-msvideo',
  mkv: 'video/x-matroska', webm: 'video/webm', flv: 'video/x-flv',
  wmv: 'video/x-ms-wmv', '3gp': 'video/3gpp',
  // Fonts
  ttf: 'font/ttf', otf: 'font/otf', woff: 'font/woff', woff2: 'font/woff2',
  eot: 'application/vnd.ms-fontobject',
  // Archives
  zip: 'application/zip', tar: 'application/x-tar', gz: 'application/gzip',
  '7z': 'application/x-7z-compressed',
};

function errorResponse(message: string, status: number) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

// ── Image to PDF ────────────────────────────────────────

async function imageToPdf(fileData: Uint8Array, _sourceFormat: string): Promise<Uint8Array> {
  // Use pdf-lib to embed the image in a PDF
  const pdfLib = await import("https://esm.sh/pdf-lib@1.17.1");
  const { PDFDocument } = pdfLib;
  
  const pdfDoc = await PDFDocument.create();
  
  let image;
  // Try embedding as PNG first, then JPEG
  try {
    image = await pdfDoc.embedPng(fileData);
  } catch {
    try {
      image = await pdfDoc.embedJpg(fileData);
    } catch {
      throw new Error("Could not embed image in PDF. Try converting to PNG or JPG first.");
    }
  }
  
  const page = pdfDoc.addPage([image.width, image.height]);
  page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
  
  const pdfBytes = await pdfDoc.save();
  return new Uint8Array(pdfBytes);
}

// ── Document conversions ────────────────────────────────

async function convertDocument(fileData: Uint8Array, sourceFormat: string, targetFormat: string): Promise<Uint8Array> {
  const text = new TextDecoder().decode(fileData);
  
  // TXT/HTML/MD/CSV/RTF → DOCX (simple DOCX with text content)
  if (targetFormat === 'docx') {
    // Build a minimal DOCX (which is a ZIP of XML files)
    const { default: JSZip } = await import("https://esm.sh/jszip@3.10.1");
    const zip = new JSZip();
    
    // Extract plain text based on source
    let plainText = text;
    if (sourceFormat === 'html') {
      plainText = text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    } else if (sourceFormat === 'md') {
      plainText = text.replace(/#{1,6}\s+/g, '').replace(/\*\*(.+?)\*\*/g, '$1').replace(/\*(.+?)\*/g, '$1').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').trim();
    } else if (sourceFormat === 'rtf') {
      plainText = text.replace(/\{\\[^{}]*\}/g, '').replace(/\\[a-z]+\d*\s?/gi, '').replace(/[{}]/g, '').trim();
    }
    
    const paragraphs = plainText.split(/\n\n|\r\n\r\n/).map(p => 
      `<w:p><w:r><w:t xml:space="preserve">${p.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</w:t></w:r></w:p>`
    ).join('');
    
    zip.file('[Content_Types].xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>`);
    
    zip.file('_rels/.rels', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`);
    
    zip.file('word/_rels/document.xml.rels', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
</Relationships>`);
    
    zip.file('word/document.xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>${paragraphs}</w:body>
</w:document>`);
    
    const docxBuf = await zip.generateAsync({ type: 'uint8array', compression: 'DEFLATE' });
    return docxBuf;
  }
  
  // Source → TXT
  if (targetFormat === 'txt') {
    let plainText = text;
    if (sourceFormat === 'html') {
      plainText = text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    } else if (sourceFormat === 'rtf') {
      plainText = text.replace(/\{\\[^{}]*\}/g, '').replace(/\\[a-z]+\d*\s?/gi, '').replace(/[{}]/g, '').trim();
    }
    return new TextEncoder().encode(plainText);
  }
  
  // Source → HTML
  if (targetFormat === 'html') {
    let content = text;
    if (sourceFormat === 'md') {
      // Basic MD → HTML
      content = text
        .replace(/^### (.+)$/gm, '<h3>$1</h3>')
        .replace(/^## (.+)$/gm, '<h2>$1</h2>')
        .replace(/^# (.+)$/gm, '<h1>$1</h1>')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br/>');
      content = `<p>${content}</p>`;
    }
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Document</title></head><body>${content}</body></html>`;
    return new TextEncoder().encode(html);
  }
  
  // Source → MD
  if (targetFormat === 'md') {
    let mdText = text;
    if (sourceFormat === 'html') {
      mdText = text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    }
    return new TextEncoder().encode(mdText);
  }
  
  // Source → PDF (text-based)
  if (targetFormat === 'pdf') {
    let plainText = text;
    if (sourceFormat === 'html') {
      plainText = text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    } else if (sourceFormat === 'rtf') {
      plainText = text.replace(/\{\\[^{}]*\}/g, '').replace(/\\[a-z]+\d*\s?/gi, '').replace(/[{}]/g, '').trim();
    }
    
    const pdfLib = await import("https://esm.sh/pdf-lib@1.17.1");
    const { PDFDocument, StandardFonts, rgb } = pdfLib;
    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    
    const fontSize = 11;
    const margin = 50;
    const pageWidth = 595;
    const pageHeight = 842;
    const maxWidth = pageWidth - margin * 2;
    
    const lines: string[] = [];
    for (const paragraph of plainText.split('\n')) {
      if (paragraph.trim() === '') { lines.push(''); continue; }
      // Word wrap
      const words = paragraph.split(' ');
      let currentLine = '';
      for (const word of words) {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        const width = font.widthOfTextAtSize(testLine, fontSize);
        if (width > maxWidth && currentLine) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      }
      if (currentLine) lines.push(currentLine);
    }
    
    let page = pdfDoc.addPage([pageWidth, pageHeight]);
    let y = pageHeight - margin;
    
    for (const line of lines) {
      if (y < margin) {
        page = pdfDoc.addPage([pageWidth, pageHeight]);
        y = pageHeight - margin;
      }
      if (line) {
        page.drawText(line, { x: margin, y, size: fontSize, font, color: rgb(0, 0, 0) });
      }
      y -= fontSize * 1.4;
    }
    
    return new Uint8Array(await pdfDoc.save());
  }
  
  throw new Error(`${sourceFormat.toUpperCase()} to ${targetFormat.toUpperCase()} conversion is not yet supported on the server.`);
}

// ── DOCX-based conversions ──────────────────────────────

async function convertDocx(fileData: Uint8Array, targetFormat: string): Promise<Uint8Array> {
  // Extract text from DOCX
  const { default: JSZip } = await import("https://esm.sh/jszip@3.10.1");
  const zip = await JSZip.loadAsync(fileData);
  const docXml = await zip.file('word/document.xml')?.async('text');
  if (!docXml) throw new Error('Invalid DOCX file');
  
  // Strip XML tags to get text
  const text = docXml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  
  if (targetFormat === 'txt') return new TextEncoder().encode(text);
  if (targetFormat === 'html') {
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Document</title></head><body><p>${text}</p></body></html>`;
    return new TextEncoder().encode(html);
  }
  if (targetFormat === 'md') return new TextEncoder().encode(text);
  if (targetFormat === 'pdf') {
    return convertDocument(new TextEncoder().encode(text), 'txt', 'pdf');
  }
  
  throw new Error(`DOCX to ${targetFormat.toUpperCase()} is not yet supported.`);
}

// ── Archive conversions ─────────────────────────────────

function buildTar(files: { name: string; data: Uint8Array }[]): Uint8Array {
  const blocks: Uint8Array[] = [];
  const encoder = new TextEncoder();
  
  for (const file of files) {
    const header = new Uint8Array(512);
    const nameBytes = encoder.encode(file.name.slice(0, 99));
    header.set(nameBytes, 0);
    header.set(encoder.encode('0000644\0'), 100);
    header.set(encoder.encode('0000000\0'), 108);
    header.set(encoder.encode('0000000\0'), 116);
    const sizeOctal = file.data.length.toString(8).padStart(11, '0') + '\0';
    header.set(encoder.encode(sizeOctal), 124);
    const mtime = Math.floor(Date.now() / 1000).toString(8).padStart(11, '0') + '\0';
    header.set(encoder.encode(mtime), 136);
    header[156] = 48;
    header.set(encoder.encode('ustar\0'), 257);
    header.set(encoder.encode('00'), 263);
    for (let i = 148; i < 156; i++) header[i] = 0x20;
    let checksum = 0;
    for (let i = 0; i < 512; i++) checksum += header[i];
    header.set(encoder.encode(checksum.toString(8).padStart(6, '0') + '\0 '), 148);
    blocks.push(header);
    const dataBlocks = Math.ceil(file.data.length / 512);
    const padded = new Uint8Array(dataBlocks * 512);
    padded.set(file.data, 0);
    blocks.push(padded);
  }
  blocks.push(new Uint8Array(1024));
  const total = blocks.reduce((s, b) => s + b.length, 0);
  const result = new Uint8Array(total);
  let off = 0;
  for (const b of blocks) { result.set(b, off); off += b.length; }
  return result;
}

function parseTar(buffer: ArrayBuffer): { name: string; data: Uint8Array }[] {
  const view = new Uint8Array(buffer);
  const files: { name: string; data: Uint8Array }[] = [];
  let offset = 0;
  while (offset < view.length - 512) {
    const header = view.slice(offset, offset + 512);
    if (header.every(b => b === 0)) break;
    let nameEnd = 0;
    while (nameEnd < 100 && header[nameEnd] !== 0) nameEnd++;
    const name = new TextDecoder().decode(header.slice(0, nameEnd));
    let sizeStr = '';
    for (let i = 124; i < 136; i++) {
      if (header[i] === 0 || header[i] === 0x20) break;
      sizeStr += String.fromCharCode(header[i]);
    }
    const size = parseInt(sizeStr, 8) || 0;
    const typeFlag = header[156];
    offset += 512;
    if (size > 0 && (typeFlag === 0 || typeFlag === 48)) {
      files.push({ name, data: view.slice(offset, offset + size) });
    }
    offset += Math.ceil(size / 512) * 512;
  }
  return files;
}

async function convertArchive(fileData: Uint8Array, sourceFormat: string, targetFormat: string): Promise<Uint8Array> {
  const { default: JSZip } = await import("https://esm.sh/jszip@3.10.1");
  
  let files: { name: string; data: Uint8Array }[] = [];
  
  // Extract source
  if (sourceFormat === 'zip') {
    const zip = await JSZip.loadAsync(fileData);
    const entries = Object.entries(zip.files).filter(([, f]) => !f.dir);
    for (const [name, zipFile] of entries) {
      files.push({ name, data: await zipFile.async('uint8array') });
    }
  } else if (sourceFormat === 'tar') {
    files = parseTar(fileData.buffer);
  } else if (sourceFormat === 'gz') {
    const ds = new DecompressionStream('gzip');
    const stream = new Blob([fileData]).stream().pipeThrough(ds);
    const reader = stream.getReader();
    const chunks: Uint8Array[] = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) chunks.push(value);
    }
    const totalLen = chunks.reduce((s, c) => s + c.length, 0);
    const decompressed = new Uint8Array(totalLen);
    let off = 0;
    for (const c of chunks) { decompressed.set(c, off); off += c.length; }
    
    // Check if it's a tar
    if (decompressed.length > 262 && decompressed[257] === 0x75 && decompressed[258] === 0x73) {
      files = parseTar(decompressed.buffer);
    } else {
      files = [{ name: 'file', data: decompressed }];
    }
  } else {
    throw new Error(`Cannot extract ${sourceFormat.toUpperCase()} archives on the server.`);
  }
  
  if (files.length === 0) throw new Error('Archive is empty.');
  
  // Build target
  if (targetFormat === 'zip') {
    const zip = new JSZip();
    for (const f of files) zip.file(f.name, f.data);
    return await zip.generateAsync({ type: 'uint8array', compression: 'DEFLATE' });
  }
  
  if (targetFormat === 'tar') {
    return buildTar(files);
  }
  
  if (targetFormat === 'gz') {
    // Build tar first, then gzip
    const tarData = buildTar(files);
    const cs = new CompressionStream('gzip');
    const stream = new Blob([tarData]).stream().pipeThrough(cs);
    const reader = stream.getReader();
    const chunks: Uint8Array[] = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) chunks.push(value);
    }
    const totalLen = chunks.reduce((s, c) => s + c.length, 0);
    const gzipped = new Uint8Array(totalLen);
    let off = 0;
    for (const c of chunks) { gzipped.set(c, off); off += c.length; }
    return gzipped;
  }
  
  throw new Error(`Archive to ${targetFormat.toUpperCase()} is not supported.`);
}

// ── Main handler ────────────────────────────────────────

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  if (req.method !== 'POST') {
    return errorResponse('Method not allowed', 405);
  }
  
  try {
    const contentType = req.headers.get('content-type') || '';
    if (!contentType.includes('multipart/form-data')) {
      return errorResponse('Content-Type must be multipart/form-data', 400);
    }
    
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const sourceFormat = (formData.get('sourceFormat') as string || '').toLowerCase();
    const targetFormat = (formData.get('targetFormat') as string || '').toLowerCase();
    
    if (!file) return errorResponse('Missing file', 400);
    if (!sourceFormat || !targetFormat) return errorResponse('Missing sourceFormat or targetFormat', 400);
    
    if (file.size > MAX_FILE_SIZE) {
      return errorResponse(`File too large. Maximum is ${MAX_FILE_SIZE / 1024 / 1024}MB for cloud processing.`, 413);
    }
    
    const fileData = new Uint8Array(await file.arrayBuffer());
    let resultData: Uint8Array;
    const resultMime = MIME_TYPES[targetFormat] || 'application/octet-stream';
    
    // ── Route to handler ────────────────────────────────
    
    const imageFormats = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp', 'tiff', 'heic', 'heif', 'avif', 'svg', 'ico'];
    const textDocFormats = ['txt', 'html', 'md', 'rtf', 'csv'];
    const archiveFormats = ['zip', 'tar', 'gz'];
    
    if (imageFormats.includes(sourceFormat) && targetFormat === 'pdf') {
      // Image → PDF
      resultData = await imageToPdf(fileData, sourceFormat);
    } else if (sourceFormat === 'docx' && ['txt', 'html', 'md', 'pdf', 'odt', 'rtf'].includes(targetFormat)) {
      if (['odt', 'rtf'].includes(targetFormat)) {
        return errorResponse(`DOCX to ${targetFormat.toUpperCase()} requires LibreOffice which is not available in this environment. This conversion will be supported in a future update.`, 422);
      }
      resultData = await convertDocx(fileData, targetFormat);
    } else if (textDocFormats.includes(sourceFormat) && ['txt', 'html', 'md', 'pdf', 'docx'].includes(targetFormat)) {
      resultData = await convertDocument(fileData, sourceFormat, targetFormat);
    } else if (archiveFormats.includes(sourceFormat) && archiveFormats.includes(targetFormat)) {
      resultData = await convertArchive(fileData, sourceFormat, targetFormat);
    } else {
      return errorResponse(`${sourceFormat.toUpperCase()} to ${targetFormat.toUpperCase()} conversion is not yet supported.`, 422);
    }
    
    // Build filename
    const originalName = file.name.replace(/\.[^/.]+$/, '');
    const filename = `${originalName}.${targetFormat}`;
    
    return new Response(resultData, {
      headers: {
        ...corsHeaders,
        'Content-Type': resultMime,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'X-Filename': filename,
      },
    });
    
  } catch (err) {
    console.error('Conversion error:', err);
    return errorResponse(err instanceof Error ? err.message : 'Conversion failed', 500);
  }
});
