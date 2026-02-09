import { ConverterPlugin, ConversionResult, ConversionOption } from '@/lib/converter-types';

const IMAGE_FORMATS = ['jpg', 'jpeg', 'png', 'webp'];

function getMimeType(format: string): string {
  const map: Record<string, string> = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    webp: 'image/webp',
  };
  return map[format] || 'image/png';
}

async function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

export const imageConverter: ConverterPlugin = {
  id: 'image-converter',
  name: 'Image Converter',
  sourceFormats: IMAGE_FORMATS,

  getTargetFormats(sourceFormat: string): ConversionOption[] {
    const normalized = sourceFormat === 'jpeg' ? 'jpg' : sourceFormat;
    return IMAGE_FORMATS
      .filter(f => f !== normalized && f !== 'jpeg')
      .map(f => ({
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
    ctx.drawImage(img, 0, 0);
    onProgress?.(70);

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

    return {
      blob,
      filename: `${baseName}.${ext}`,
      mimeType,
    };
  },
};
