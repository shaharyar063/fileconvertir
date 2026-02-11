import { ConverterPlugin, ConversionResult, ConversionOption } from '@/lib/converter-types';
import { getTargetsForSource } from '@/lib/conversion-map';

const IMAGE_FORMATS = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp', 'tiff', 'heic', 'heif', 'avif', 'ico', 'eps', 'svg', 'psd', 'tga'];
import JSZip from 'jszip';

function getMimeType(format: string): string {
  const map: Record<string, string> = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    webp: 'image/webp',
    gif: 'image/gif',
    bmp: 'image/bmp',
    tiff: 'image/tiff',
    ico: 'image/x-icon',
    eps: 'application/postscript',
    svg: 'image/svg+xml',
    psd: 'image/vnd.adobe.photoshop',
    tga: 'image/x-tga',
    avif: 'image/avif',
  };
  return map[format] || 'image/png';
}

async function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Failed to load image. Format may not be supported by your browser.'));
    img.src = URL.createObjectURL(file);
  });
}

// ── Binary builders ──────────────────────────────────────

function buildIco(pngData: Uint8Array, size: number): Blob {
  const header = new ArrayBuffer(6);
  const hView = new DataView(header);
  hView.setUint16(0, 0, true);
  hView.setUint16(2, 1, true);
  hView.setUint16(4, 1, true);
  const entry = new ArrayBuffer(16);
  const eView = new DataView(entry);
  eView.setUint8(0, size >= 256 ? 0 : size);
  eView.setUint8(1, size >= 256 ? 0 : size);
  eView.setUint8(2, 0);
  eView.setUint8(3, 0);
  eView.setUint16(4, 1, true);
  eView.setUint16(6, 32, true);
  eView.setUint32(8, pngData.length, true);
  eView.setUint32(12, 22, true);
  return new Blob([header, entry, pngData.buffer as ArrayBuffer], { type: 'image/x-icon' });
}

function buildEps(jpegData: Uint8Array, w: number, h: number): Blob {
  const hex = Array.from(jpegData).map(b => b.toString(16).padStart(2, '0')).join('');
  const eps = `%!PS-Adobe-3.0 EPSF-3.0
%%BoundingBox: 0 0 ${w} ${h}
%%EndComments
gsave
${w} ${h} scale
${w} ${h} 8 [${w} 0 0 -${h} 0 ${h}]
<${hex}>
/DCTDecode filter
false 3 colorimage
grestore
showpage
%%EOF`;
  return new Blob([eps], { type: 'application/postscript' });
}

function buildPsd(imageData: ImageData, w: number, h: number): Blob {
  const channelLen = w * h;
  const parts: BlobPart[] = [];
  const header = new ArrayBuffer(26);
  const hv = new DataView(header);
  hv.setUint8(0, 0x38); hv.setUint8(1, 0x42); hv.setUint8(2, 0x50); hv.setUint8(3, 0x53);
  hv.setUint16(4, 1);
  hv.setUint16(12, 4);
  hv.setUint32(14, h);
  hv.setUint32(18, w);
  hv.setUint16(22, 8);
  hv.setUint16(24, 3);
  parts.push(header);
  parts.push(new ArrayBuffer(4)); // color mode
  parts.push(new ArrayBuffer(4)); // image resources
  parts.push(new ArrayBuffer(4)); // layer/mask
  const imgDataHeader = new ArrayBuffer(2);
  new DataView(imgDataHeader).setUint16(0, 0);
  parts.push(imgDataHeader);
  const pixels = imageData.data;
  for (let ch = 0; ch < 4; ch++) {
    const channel = new Uint8Array(channelLen);
    for (let i = 0; i < channelLen; i++) channel[i] = pixels[i * 4 + ch];
    parts.push(channel);
  }
  return new Blob(parts, { type: 'image/vnd.adobe.photoshop' });
}

function buildTga(imageData: ImageData, w: number, h: number): Blob {
  const headerBuf = new ArrayBuffer(18);
  const hv = new DataView(headerBuf);
  hv.setUint8(2, 2);
  hv.setUint16(12, w, true);
  hv.setUint16(14, h, true);
  hv.setUint8(16, 32);
  hv.setUint8(17, 0x20);
  const pixels = imageData.data;
  const pixelData = new Uint8Array(w * h * 4);
  for (let i = 0; i < w * h; i++) {
    pixelData[i * 4 + 0] = pixels[i * 4 + 2];
    pixelData[i * 4 + 1] = pixels[i * 4 + 1];
    pixelData[i * 4 + 2] = pixels[i * 4 + 0];
    pixelData[i * 4 + 3] = pixels[i * 4 + 3];
  }
  return new Blob([headerBuf, pixelData], { type: 'image/x-tga' });
}

function buildBmp(imageData: ImageData, w: number, h: number): Blob {
  const rowSize = Math.ceil((w * 3) / 4) * 4;
  const pixelDataSize = rowSize * h;
  const fileSize = 54 + pixelDataSize;
  const buf = new ArrayBuffer(fileSize);
  const view = new DataView(buf);
  view.setUint8(0, 0x42); view.setUint8(1, 0x4D);
  view.setUint32(2, fileSize, true);
  view.setUint32(10, 54, true);
  view.setUint32(14, 40, true);
  view.setInt32(18, w, true);
  view.setInt32(22, h, true);
  view.setUint16(26, 1, true);
  view.setUint16(28, 24, true);
  view.setUint32(34, pixelDataSize, true);
  view.setUint32(38, 2835, true);
  view.setUint32(42, 2835, true);
  const pixels = imageData.data;
  const u8 = new Uint8Array(buf);
  for (let y = 0; y < h; y++) {
    const dstRow = h - 1 - y;
    for (let x = 0; x < w; x++) {
      const srcIdx = (y * w + x) * 4;
      const dstIdx = 54 + dstRow * rowSize + x * 3;
      u8[dstIdx] = pixels[srcIdx + 2];
      u8[dstIdx + 1] = pixels[srcIdx + 1];
      u8[dstIdx + 2] = pixels[srcIdx];
    }
  }
  return new Blob([buf], { type: 'image/bmp' });
}

function buildGif(imageData: ImageData, w: number, h: number): Blob {
  const pixels = imageData.data;
  const totalPixels = w * h;
  const colorMap = new Map<number, number>();
  const palette: number[] = [];
  const indexed = new Uint8Array(totalPixels);
  for (let i = 0; i < totalPixels; i++) {
    const r = pixels[i * 4] & 0xF8;
    const g = pixels[i * 4 + 1] & 0xFC;
    const b = pixels[i * 4 + 2] & 0xF8;
    const key = (r << 16) | (g << 8) | b;
    let idx = colorMap.get(key);
    if (idx === undefined) {
      if (palette.length < 256) {
        idx = palette.length;
        palette.push(key);
        colorMap.set(key, idx);
      } else {
        let best = 0, bestDist = Infinity;
        for (let j = 0; j < palette.length; j++) {
          const pr = (palette[j] >> 16) & 0xFF;
          const pg = (palette[j] >> 8) & 0xFF;
          const pb = palette[j] & 0xFF;
          const dist = (r - pr) ** 2 + (g - pg) ** 2 + (b - pb) ** 2;
          if (dist < bestDist) { bestDist = dist; best = j; }
        }
        idx = best;
      }
    }
    indexed[i] = idx;
  }
  while (palette.length < 256) palette.push(0);
  const parts: Uint8Array[] = [];
  parts.push(new Uint8Array([0x47, 0x49, 0x46, 0x38, 0x39, 0x61]));
  const lsd = new Uint8Array(7);
  lsd[0] = w & 0xFF; lsd[1] = (w >> 8) & 0xFF;
  lsd[2] = h & 0xFF; lsd[3] = (h >> 8) & 0xFF;
  lsd[4] = 0xF7; lsd[5] = 0; lsd[6] = 0;
  parts.push(lsd);
  const gct = new Uint8Array(768);
  for (let i = 0; i < 256; i++) {
    gct[i * 3] = (palette[i] >> 16) & 0xFF;
    gct[i * 3 + 1] = (palette[i] >> 8) & 0xFF;
    gct[i * 3 + 2] = palette[i] & 0xFF;
  }
  parts.push(gct);
  const imgDesc = new Uint8Array(10);
  imgDesc[0] = 0x2C;
  imgDesc[5] = w & 0xFF; imgDesc[6] = (w >> 8) & 0xFF;
  imgDesc[7] = h & 0xFF; imgDesc[8] = (h >> 8) & 0xFF;
  parts.push(imgDesc);
  const minCodeSize = 8;
  parts.push(new Uint8Array([minCodeSize]));
  const clearCode = 1 << minCodeSize;
  const eoiCode = clearCode + 1;
  let bitBuf = 0, bitCount = 0;
  const codeSize = minCodeSize + 1;
  const outBytes: number[] = [];
  function writeBits(code: number, size: number) {
    bitBuf |= code << bitCount;
    bitCount += size;
    while (bitCount >= 8) { outBytes.push(bitBuf & 0xFF); bitBuf >>= 8; bitCount -= 8; }
  }
  writeBits(clearCode, codeSize);
  for (let i = 0; i < totalPixels; i++) {
    writeBits(indexed[i], codeSize);
    if (i > 0 && i % 126 === 0) writeBits(clearCode, codeSize);
  }
  writeBits(eoiCode, codeSize);
  if (bitCount > 0) outBytes.push(bitBuf & 0xFF);
  const subBlocks: number[] = [];
  let pos = 0;
  while (pos < outBytes.length) {
    const chunkSize = Math.min(255, outBytes.length - pos);
    subBlocks.push(chunkSize);
    for (let i = 0; i < chunkSize; i++) subBlocks.push(outBytes[pos + i]);
    pos += chunkSize;
  }
  subBlocks.push(0);
  parts.push(new Uint8Array(subBlocks));
  parts.push(new Uint8Array([0x3B]));
  return new Blob(parts as BlobPart[], { type: 'image/gif' });
}

function buildTiff(imageData: ImageData, w: number, h: number): Blob {
  const pixels = imageData.data;
  const stripSize = w * h * 3;
  const stripData = new Uint8Array(stripSize);
  for (let i = 0; i < w * h; i++) {
    stripData[i * 3] = pixels[i * 4];
    stripData[i * 3 + 1] = pixels[i * 4 + 1];
    stripData[i * 3 + 2] = pixels[i * 4 + 2];
  }
  const numEntries = 10;
  const ifdOffset = 8;
  const ifdSize = 2 + numEntries * 12 + 4;
  const bitsPerSampleOffset = ifdOffset + ifdSize;
  const stripOffset = bitsPerSampleOffset + 6;
  const totalSize = stripOffset + stripSize;
  const buf = new ArrayBuffer(totalSize);
  const view = new DataView(buf);
  const u8 = new Uint8Array(buf);
  view.setUint8(0, 0x49); view.setUint8(1, 0x49);
  view.setUint16(2, 42, true);
  view.setUint32(4, ifdOffset, true);
  let off = ifdOffset;
  view.setUint16(off, numEntries, true); off += 2;
  function writeEntry(tag: number, type: number, count: number, value: number) {
    view.setUint16(off, tag, true); off += 2;
    view.setUint16(off, type, true); off += 2;
    view.setUint32(off, count, true); off += 4;
    view.setUint32(off, value, true); off += 4;
  }
  writeEntry(256, 3, 1, w);
  writeEntry(257, 3, 1, h);
  writeEntry(258, 3, 3, bitsPerSampleOffset);
  writeEntry(259, 3, 1, 1);
  writeEntry(262, 3, 1, 2);
  writeEntry(273, 4, 1, stripOffset);
  writeEntry(277, 3, 1, 3);
  writeEntry(278, 4, 1, h);
  writeEntry(279, 4, 1, stripSize);
  writeEntry(282, 3, 1, 72);
  view.setUint32(off, 0, true);
  view.setUint16(bitsPerSampleOffset, 8, true);
  view.setUint16(bitsPerSampleOffset + 2, 8, true);
  view.setUint16(bitsPerSampleOffset + 4, 8, true);
  u8.set(stripData, stripOffset);
  return new Blob([buf], { type: 'image/tiff' });
}

// ── Main converter ──────────────────────────────────────

export const imageConverter: ConverterPlugin = {
  id: 'image-converter',
  name: 'Image Converter',
  sourceFormats: IMAGE_FORMATS,

  getTargetFormats(sourceFormat: string): ConversionOption[] {
    return getTargetsForSource(sourceFormat).map(f => ({
      targetFormat: f,
      label: f.toUpperCase(),
      description: `Convert to ${f.toUpperCase()} format`,
    }));
  },

  async convert(file: File, targetFormat: string, onProgress?: (p: number) => void): Promise<ConversionResult> {
    onProgress?.(10);
    const img = await loadImage(file);
    onProgress?.(40);

    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d')!;

    if (['jpg', 'jpeg', 'bmp', 'ico'].includes(targetFormat)) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.drawImage(img, 0, 0);
    onProgress?.(70);

    const baseName = file.name.replace(/\.[^/.]+$/, '');
    const w = canvas.width;
    const h = canvas.height;

    // ICO
    if (targetFormat === 'ico') {
      const size = Math.min(256, w, h);
      const icoCanvas = document.createElement('canvas');
      icoCanvas.width = size; icoCanvas.height = size;
      const icoCtx = icoCanvas.getContext('2d')!;
      icoCtx.fillStyle = '#ffffff';
      icoCtx.fillRect(0, 0, size, size);
      icoCtx.drawImage(img, 0, 0, size, size);
      const pngBlob = await new Promise<Blob>((res, rej) => icoCanvas.toBlob(b => b ? res(b) : rej(new Error('ICO failed')), 'image/png'));
      const pngBuf = await pngBlob.arrayBuffer();
      URL.revokeObjectURL(img.src);
      onProgress?.(100);
      return { blob: buildIco(new Uint8Array(pngBuf), size), filename: `${baseName}.ico`, mimeType: 'image/x-icon' };
    }

    // EPS
    if (targetFormat === 'eps') {
      const jpegBlob = await new Promise<Blob>((res, rej) => canvas.toBlob(b => b ? res(b) : rej(new Error('EPS failed')), 'image/jpeg', 0.92));
      const jpegBuf = await jpegBlob.arrayBuffer();
      URL.revokeObjectURL(img.src);
      onProgress?.(100);
      return { blob: buildEps(new Uint8Array(jpegBuf), w, h), filename: `${baseName}.eps`, mimeType: 'application/postscript' };
    }

    // SVG (embedded raster)
    if (targetFormat === 'svg') {
      const dataUrl = canvas.toDataURL('image/png');
      const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><image href="${dataUrl}" width="${w}" height="${h}"/></svg>`;
      URL.revokeObjectURL(img.src);
      onProgress?.(100);
      return { blob: new Blob([svgContent], { type: 'image/svg+xml' }), filename: `${baseName}.svg`, mimeType: 'image/svg+xml' };
    }

    // Binary format builders
    const imageData = ctx.getImageData(0, 0, w, h);
    const builders: Record<string, () => Blob> = {
      psd: () => buildPsd(imageData, w, h),
      tga: () => buildTga(imageData, w, h),
      tiff: () => buildTiff(imageData, w, h),
      bmp: () => buildBmp(imageData, w, h),
      gif: () => buildGif(imageData, w, h),
    };

    if (builders[targetFormat]) {
      const blob = builders[targetFormat]();
      URL.revokeObjectURL(img.src);
      onProgress?.(100);
      return { blob, filename: `${baseName}.${targetFormat}`, mimeType: getMimeType(targetFormat) };
    }

    // Archive wrapping: zip, tar, gz
    if (['zip', 'tar', 'gz'].includes(targetFormat)) {
      // Convert image to PNG first, then wrap in archive
      const pngBlob = await new Promise<Blob>((res, rej) => {
        canvas.toBlob(b => b ? res(b) : rej(new Error('Failed')), 'image/png');
      });
      const pngData = new Uint8Array(await pngBlob.arrayBuffer());
      URL.revokeObjectURL(img.src);

      if (targetFormat === 'zip') {
        const zip = new JSZip();
        zip.file(`${baseName}.png`, pngData);
        const archiveBlob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE' });
        onProgress?.(100);
        return { blob: archiveBlob, filename: `${baseName}.zip`, mimeType: 'application/zip' };
      }
      // For tar/gz, delegate to archive converter (simplified: wrap as zip)
      const zip = new JSZip();
      zip.file(`${baseName}.png`, pngData);
      const archiveBlob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE' });
      onProgress?.(100);
      return { blob: archiveBlob, filename: `${baseName}.${targetFormat}`, mimeType: 'application/octet-stream' };
    }

    // Canvas-native formats: jpg, jpeg, png, webp, avif
    const mimeType = getMimeType(targetFormat);
    const quality = targetFormat === 'png' ? undefined : 0.92;
    const blob = await new Promise<Blob>((res, rej) => {
      canvas.toBlob(b => b ? res(b) : rej(new Error('Conversion failed')), mimeType, quality);
    });
    URL.revokeObjectURL(img.src);
    onProgress?.(100);
    const ext = targetFormat === 'jpeg' ? 'jpg' : targetFormat;
    return { blob, filename: `${baseName}.${ext}`, mimeType };
  },
};
