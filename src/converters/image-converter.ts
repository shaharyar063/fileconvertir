import { ConverterPlugin, ConversionResult, ConversionOption } from '@/lib/converter-types';
import { getTargetsForSource } from '@/lib/conversion-map';

const IMAGE_FORMATS = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp', 'tiff', 'heic', 'heif', 'ico', 'eps', 'odd', 'svg', 'psd', 'tga'];

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
    odd: 'application/octet-stream',
    svg: 'image/svg+xml',
    psd: 'image/vnd.adobe.photoshop',
    tga: 'image/x-tga',
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

function buildIco(pngData: Uint8Array, size: number): Blob {
  const header = new ArrayBuffer(6);
  const hView = new DataView(header);
  hView.setUint16(0, 0, true); // reserved
  hView.setUint16(2, 1, true); // ICO type
  hView.setUint16(4, 1, true); // 1 image

  const entry = new ArrayBuffer(16);
  const eView = new DataView(entry);
  eView.setUint8(0, size >= 256 ? 0 : size); // width
  eView.setUint8(1, size >= 256 ? 0 : size); // height
  eView.setUint8(2, 0); // palette
  eView.setUint8(3, 0); // reserved
  eView.setUint16(4, 1, true); // color planes
  eView.setUint16(6, 32, true); // bits per pixel
  eView.setUint32(8, pngData.length, true); // size
  eView.setUint32(12, 22, true); // offset (6 + 16)

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
  // Minimal PSD: signature, version, channels(4), height, width, depth(8), colorMode(3=RGB)
  const channelLen = w * h;
  const parts: BlobPart[] = [];

  // File header (26 bytes)
  const header = new ArrayBuffer(26);
  const hv = new DataView(header);
  // Signature "8BPS"
  hv.setUint8(0, 0x38); hv.setUint8(1, 0x42); hv.setUint8(2, 0x50); hv.setUint8(3, 0x53);
  hv.setUint16(4, 1); // version
  // 6 reserved bytes (already 0)
  hv.setUint16(12, 4); // channels (RGBA)
  hv.setUint32(14, h); // height
  hv.setUint32(18, w); // width
  hv.setUint16(22, 8); // bits per channel
  hv.setUint16(24, 3); // RGB color mode
  parts.push(header);

  // Color mode data (4 bytes = length 0)
  const colorMode = new ArrayBuffer(4);
  parts.push(colorMode);

  // Image resources (4 bytes = length 0)
  const imgRes = new ArrayBuffer(4);
  parts.push(imgRes);

  // Layer and mask info (4 bytes = length 0)
  const layerMask = new ArrayBuffer(4);
  parts.push(layerMask);

  // Image data: compression=0 (raw), then planar RGBA
  const imgDataHeader = new ArrayBuffer(2);
  new DataView(imgDataHeader).setUint16(0, 0); // no compression
  parts.push(imgDataHeader);

  const pixels = imageData.data;
  for (let ch = 0; ch < 4; ch++) {
    const channel = new Uint8Array(channelLen);
    for (let i = 0; i < channelLen; i++) {
      channel[i] = pixels[i * 4 + ch];
    }
    parts.push(channel);
  }

  return new Blob(parts, { type: 'image/vnd.adobe.photoshop' });
}

function buildTga(imageData: ImageData, w: number, h: number): Blob {
  // Uncompressed TGA (type 2), 32-bit BGRA
  const headerBuf = new ArrayBuffer(18);
  const hv = new DataView(headerBuf);
  hv.setUint8(2, 2); // uncompressed true-color
  hv.setUint16(12, w, true);
  hv.setUint16(14, h, true);
  hv.setUint8(16, 32); // 32 bits per pixel
  hv.setUint8(17, 0x20); // top-left origin

  const pixels = imageData.data;
  const pixelData = new Uint8Array(w * h * 4);
  for (let i = 0; i < w * h; i++) {
    pixelData[i * 4 + 0] = pixels[i * 4 + 2]; // B
    pixelData[i * 4 + 1] = pixels[i * 4 + 1]; // G
    pixelData[i * 4 + 2] = pixels[i * 4 + 0]; // R
    pixelData[i * 4 + 3] = pixels[i * 4 + 3]; // A
  }

  return new Blob([headerBuf, pixelData], { type: 'image/x-tga' });
}

function buildBmp(imageData: ImageData, w: number, h: number): Blob {
  const rowSize = Math.ceil((w * 3) / 4) * 4; // rows padded to 4-byte boundary
  const pixelDataSize = rowSize * h;
  const fileSize = 54 + pixelDataSize; // 14 (file header) + 40 (DIB header) + pixels
  const buf = new ArrayBuffer(fileSize);
  const view = new DataView(buf);

  // BMP File Header (14 bytes)
  view.setUint8(0, 0x42); view.setUint8(1, 0x4D); // 'BM'
  view.setUint32(2, fileSize, true);
  view.setUint32(10, 54, true); // pixel data offset

  // DIB Header (BITMAPINFOHEADER, 40 bytes)
  view.setUint32(14, 40, true); // header size
  view.setInt32(18, w, true);
  view.setInt32(22, h, true); // positive = bottom-up
  view.setUint16(26, 1, true); // color planes
  view.setUint16(28, 24, true); // bits per pixel
  view.setUint32(30, 0, true); // no compression
  view.setUint32(34, pixelDataSize, true);
  view.setUint32(38, 2835, true); // X pixels per meter (~72 DPI)
  view.setUint32(42, 2835, true); // Y pixels per meter

  const pixels = imageData.data;
  const u8 = new Uint8Array(buf);
  // BMP stores rows bottom-to-top, BGR order
  for (let y = 0; y < h; y++) {
    const srcRow = y;
    const dstRow = h - 1 - y;
    for (let x = 0; x < w; x++) {
      const srcIdx = (srcRow * w + x) * 4;
      const dstIdx = 54 + dstRow * rowSize + x * 3;
      u8[dstIdx + 0] = pixels[srcIdx + 2]; // B
      u8[dstIdx + 1] = pixels[srcIdx + 1]; // G
      u8[dstIdx + 2] = pixels[srcIdx + 0]; // R
    }
  }

  return new Blob([buf], { type: 'image/bmp' });
}

function buildGif(imageData: ImageData, w: number, h: number): Blob {
  const pixels = imageData.data;
  const totalPixels = w * h;

  // Simple median-cut to 256 colors
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
        // Find nearest color
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

  // Pad palette to 256
  while (palette.length < 256) palette.push(0);

  // Build GIF89a
  const parts: Uint8Array[] = [];

  // Header
  parts.push(new Uint8Array([0x47, 0x49, 0x46, 0x38, 0x39, 0x61])); // GIF89a

  // Logical Screen Descriptor
  const lsd = new Uint8Array(7);
  lsd[0] = w & 0xFF; lsd[1] = (w >> 8) & 0xFF;
  lsd[2] = h & 0xFF; lsd[3] = (h >> 8) & 0xFF;
  lsd[4] = 0xF7; // GCT flag, 256 colors (2^(7+1))
  lsd[5] = 0; // bg color index
  lsd[6] = 0; // pixel aspect ratio
  parts.push(lsd);

  // Global Color Table (256 * 3 bytes)
  const gct = new Uint8Array(768);
  for (let i = 0; i < 256; i++) {
    gct[i * 3 + 0] = (palette[i] >> 16) & 0xFF;
    gct[i * 3 + 1] = (palette[i] >> 8) & 0xFF;
    gct[i * 3 + 2] = palette[i] & 0xFF;
  }
  parts.push(gct);

  // Image Descriptor
  const imgDesc = new Uint8Array(10);
  imgDesc[0] = 0x2C; // Image separator
  imgDesc[1] = 0; imgDesc[2] = 0; // left
  imgDesc[3] = 0; imgDesc[4] = 0; // top
  imgDesc[5] = w & 0xFF; imgDesc[6] = (w >> 8) & 0xFF;
  imgDesc[7] = h & 0xFF; imgDesc[8] = (h >> 8) & 0xFF;
  imgDesc[9] = 0; // no local color table
  parts.push(imgDesc);

  // LZW Minimum Code Size
  const minCodeSize = 8;
  parts.push(new Uint8Array([minCodeSize]));

  // LZW compress (uncompressed variant: clear + single-byte codes)
  const clearCode = 1 << minCodeSize;
  const eoiCode = clearCode + 1;
  const subBlocks: number[] = [];

  // Simple uncompressed LZW: output clear code, then each pixel as a literal, then EOI
  // We pack bits into bytes
  let bitBuf = 0;
  let bitCount = 0;
  let codeSize = minCodeSize + 1;
  const outBytes: number[] = [];

  function writeBits(code: number, size: number) {
    bitBuf |= code << bitCount;
    bitCount += size;
    while (bitCount >= 8) {
      outBytes.push(bitBuf & 0xFF);
      bitBuf >>= 8;
      bitCount -= 8;
    }
  }

  writeBits(clearCode, codeSize);
  for (let i = 0; i < totalPixels; i++) {
    writeBits(indexed[i], codeSize);
    // Periodically emit clear codes to prevent code size from growing
    if (i > 0 && i % 126 === 0) {
      writeBits(clearCode, codeSize);
    }
  }
  writeBits(eoiCode, codeSize);
  if (bitCount > 0) outBytes.push(bitBuf & 0xFF);

  // Split into sub-blocks (max 255 bytes each)
  let pos = 0;
  while (pos < outBytes.length) {
    const chunkSize = Math.min(255, outBytes.length - pos);
    subBlocks.push(chunkSize);
    for (let i = 0; i < chunkSize; i++) subBlocks.push(outBytes[pos + i]);
    pos += chunkSize;
  }
  subBlocks.push(0); // block terminator

  parts.push(new Uint8Array(subBlocks));

  // Trailer
  parts.push(new Uint8Array([0x3B]));

  return new Blob(parts as BlobPart[], { type: 'image/gif' });
}

function buildTiff(imageData: ImageData, w: number, h: number): Blob {
  const pixels = imageData.data; // RGBA
  const stripSize = w * h * 3; // RGB only
  const stripData = new Uint8Array(stripSize);
  for (let i = 0; i < w * h; i++) {
    stripData[i * 3 + 0] = pixels[i * 4 + 0]; // R
    stripData[i * 3 + 1] = pixels[i * 4 + 1]; // G
    stripData[i * 3 + 2] = pixels[i * 4 + 2]; // B
  }

  // IFD with 10 entries
  const numEntries = 10;
  const ifdOffset = 8; // right after header
  const ifdSize = 2 + numEntries * 12 + 4; // count + entries + next IFD pointer
  const bitsPerSampleOffset = ifdOffset + ifdSize;
  const stripOffset = bitsPerSampleOffset + 6; // 3 shorts for bits per sample

  const totalSize = stripOffset + stripSize;
  const buf = new ArrayBuffer(totalSize);
  const view = new DataView(buf);
  const u8 = new Uint8Array(buf);

  // Header: little-endian TIFF
  view.setUint8(0, 0x49); // 'I'
  view.setUint8(1, 0x49); // 'I'
  view.setUint16(2, 42, true); // magic
  view.setUint32(4, ifdOffset, true); // IFD offset

  let off = ifdOffset;
  view.setUint16(off, numEntries, true); off += 2;

  function writeEntry(tag: number, type: number, count: number, value: number) {
    view.setUint16(off, tag, true); off += 2;
    view.setUint16(off, type, true); off += 2;
    view.setUint32(off, count, true); off += 4;
    view.setUint32(off, value, true); off += 4;
  }

  // Tag entries (must be sorted by tag number)
  writeEntry(256, 3, 1, w);                    // ImageWidth (SHORT)
  writeEntry(257, 3, 1, h);                    // ImageLength (SHORT)
  writeEntry(258, 3, 3, bitsPerSampleOffset);  // BitsPerSample → offset
  writeEntry(259, 3, 1, 1);                    // Compression = None
  writeEntry(262, 3, 1, 2);                    // PhotometricInterpretation = RGB
  writeEntry(273, 4, 1, stripOffset);          // StripOffsets (LONG)
  writeEntry(277, 3, 1, 3);                    // SamplesPerPixel
  writeEntry(278, 4, 1, h);                    // RowsPerStrip
  writeEntry(279, 4, 1, stripSize);            // StripByteCounts
  writeEntry(282, 3, 1, 72);                   // XResolution (simplified)

  // Next IFD = 0 (no more IFDs)
  view.setUint32(off, 0, true);

  // BitsPerSample values: 8, 8, 8
  view.setUint16(bitsPerSampleOffset, 8, true);
  view.setUint16(bitsPerSampleOffset + 2, 8, true);
  view.setUint16(bitsPerSampleOffset + 4, 8, true);

  // Copy strip data
  u8.set(stripData, stripOffset);

  return new Blob([buf], { type: 'image/tiff' });
}

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
    // White background for formats that don't support transparency
    if (targetFormat === 'jpg' || targetFormat === 'jpeg' || targetFormat === 'bmp' || targetFormat === 'ico') {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.drawImage(img, 0, 0);
    onProgress?.(70);

    // ICO: resize to 256x256 max and produce PNG-based ICO
    if (targetFormat === 'ico') {
      const size = Math.min(256, canvas.width, canvas.height);
      const icoCanvas = document.createElement('canvas');
      icoCanvas.width = size;
      icoCanvas.height = size;
      const icoCtx = icoCanvas.getContext('2d')!;
      icoCtx.fillStyle = '#ffffff';
      icoCtx.fillRect(0, 0, size, size);
      icoCtx.drawImage(img, 0, 0, size, size);
      const pngBlob = await new Promise<Blob>((resolve, reject) => {
        icoCanvas.toBlob(b => (b ? resolve(b) : reject(new Error('ICO conversion failed'))), 'image/png');
      });
      const pngBuf = await pngBlob.arrayBuffer();
      const icoBlob = buildIco(new Uint8Array(pngBuf), size);
      onProgress?.(100);
      const baseName = file.name.replace(/\.[^/.]+$/, '');
      URL.revokeObjectURL(img.src);
      return { blob: icoBlob, filename: `${baseName}.ico`, mimeType: 'image/x-icon' };
    }

    // EPS: wrap as basic EPS file
    if (targetFormat === 'eps') {
      const jpegBlob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(b => (b ? resolve(b) : reject(new Error('EPS conversion failed'))), 'image/jpeg', 0.92);
      });
      const jpegBuf = await jpegBlob.arrayBuffer();
      const epsBlob = buildEps(new Uint8Array(jpegBuf), canvas.width, canvas.height);
      onProgress?.(100);
      const baseName = file.name.replace(/\.[^/.]+$/, '');
      URL.revokeObjectURL(img.src);
      return { blob: epsBlob, filename: `${baseName}.eps`, mimeType: 'application/postscript' };
    }

    // ODD: export as PNG binary with .odd extension
    if (targetFormat === 'odd') {
      const pngBlob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(b => (b ? resolve(b) : reject(new Error('ODD conversion failed'))), 'image/png');
      });
      onProgress?.(100);
      const baseName = file.name.replace(/\.[^/.]+$/, '');
      URL.revokeObjectURL(img.src);
      return { blob: pngBlob, filename: `${baseName}.odd`, mimeType: 'application/octet-stream' };
    }

    // SVG: trace image as an embedded SVG
    if (targetFormat === 'svg') {
      const dataUrl = canvas.toDataURL('image/png');
      const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${canvas.width}" height="${canvas.height}">
  <image href="${dataUrl}" width="${canvas.width}" height="${canvas.height}"/>
</svg>`;
      const svgBlob = new Blob([svgContent], { type: 'image/svg+xml' });
      onProgress?.(100);
      const baseName = file.name.replace(/\.[^/.]+$/, '');
      URL.revokeObjectURL(img.src);
      return { blob: svgBlob, filename: `${baseName}.svg`, mimeType: 'image/svg+xml' };
    }

    // PSD: minimal PSD file with flattened image
    if (targetFormat === 'psd') {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const psdBlob = buildPsd(imageData, canvas.width, canvas.height);
      onProgress?.(100);
      const baseName = file.name.replace(/\.[^/.]+$/, '');
      URL.revokeObjectURL(img.src);
      return { blob: psdBlob, filename: `${baseName}.psd`, mimeType: 'image/vnd.adobe.photoshop' };
    }

    // TGA: uncompressed TGA file
    if (targetFormat === 'tga') {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const tgaBlob = buildTga(imageData, canvas.width, canvas.height);
      onProgress?.(100);
      const baseName = file.name.replace(/\.[^/.]+$/, '');
      URL.revokeObjectURL(img.src);
      return { blob: tgaBlob, filename: `${baseName}.tga`, mimeType: 'image/x-tga' };
    }

    // TIFF: build a real uncompressed TIFF file
    if (targetFormat === 'tiff') {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const tiffBlob = buildTiff(imageData, canvas.width, canvas.height);
      onProgress?.(100);
      const baseName = file.name.replace(/\.[^/.]+$/, '');
      URL.revokeObjectURL(img.src);
      return { blob: tiffBlob, filename: `${baseName}.tiff`, mimeType: 'image/tiff' };
    }

    // BMP: build a real BMP file from pixel data
    if (targetFormat === 'bmp') {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const bmpBlob = buildBmp(imageData, canvas.width, canvas.height);
      onProgress?.(100);
      const baseName = file.name.replace(/\.[^/.]+$/, '');
      URL.revokeObjectURL(img.src);
      return { blob: bmpBlob, filename: `${baseName}.bmp`, mimeType: 'image/bmp' };
    }

    // GIF: build a real GIF file with color quantization
    if (targetFormat === 'gif') {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const gifBlob = buildGif(imageData, canvas.width, canvas.height);
      onProgress?.(100);
      const baseName = file.name.replace(/\.[^/.]+$/, '');
      URL.revokeObjectURL(img.src);
      return { blob: gifBlob, filename: `${baseName}.gif`, mimeType: 'image/gif' };
    }

    // Remaining formats (jpg, jpeg, png, webp) — natively supported by canvas.toBlob
    const mimeType = getMimeType(targetFormat);
    const quality = targetFormat === 'png' ? undefined : 0.92;

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error('Conversion failed'))),
        mimeType,
        quality
      );
    });

    onProgress?.(100);

    const baseName = file.name.replace(/\.[^/.]+$/, '');
    const ext = targetFormat === 'jpeg' ? 'jpg' : targetFormat;

    URL.revokeObjectURL(img.src);

    return { blob, filename: `${baseName}.${ext}`, mimeType };
  },
};
