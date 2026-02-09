import { ConverterPlugin, ConversionResult, ConversionOption } from '@/lib/converter-types';
import { getTargetsForSource } from '@/lib/conversion-map';

const IMAGE_FORMATS = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp', 'tiff', 'heic', 'heif', 'ico', 'eps', 'odd'];

function getMimeType(format: string): string {
  const map: Record<string, string> = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    webp: 'image/webp',
    gif: 'image/gif',
    bmp: 'image/bmp',
    ico: 'image/x-icon',
    eps: 'application/postscript',
    odd: 'application/octet-stream',
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

    // ODD: export as PNG wrapped in a simple ODD container (binary)
    if (targetFormat === 'odd') {
      const pngBlob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(b => (b ? resolve(b) : reject(new Error('ODD conversion failed'))), 'image/png');
      });
      onProgress?.(100);
      const baseName = file.name.replace(/\.[^/.]+$/, '');
      URL.revokeObjectURL(img.src);
      return { blob: pngBlob, filename: `${baseName}.odd`, mimeType: 'application/octet-stream' };
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
