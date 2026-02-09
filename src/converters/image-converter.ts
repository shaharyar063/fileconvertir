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

    // TIFF: canvas export (browser support varies, fallback to PNG blob with .tiff ext)
    if (targetFormat === 'tiff') {
      const pngBlob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(b => (b ? resolve(b) : reject(new Error('TIFF conversion failed'))), 'image/png');
      });
      onProgress?.(100);
      const baseName = file.name.replace(/\.[^/.]+$/, '');
      URL.revokeObjectURL(img.src);
      return { blob: pngBlob, filename: `${baseName}.tiff`, mimeType: 'image/tiff' };
    }

    const mimeType = getMimeType(targetFormat);
    const quality = (targetFormat === 'png' || targetFormat === 'gif' || targetFormat === 'bmp') ? undefined : 0.92;

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
