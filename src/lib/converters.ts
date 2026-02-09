export interface ConverterRoute {
  slug: string;
  sourceFormat: string;
  targetFormat: string;
  label: string;
  category: string;
}

export interface FormatPage {
  slug: string;
  targetFormat: string;
  label: string;
  description: string;
  acceptedInputs: string[];
}

// Legacy pair routes (still used for AllConverters listing)
export const converterRoutes: ConverterRoute[] = [
  { slug: 'png-to-jpg', sourceFormat: 'png', targetFormat: 'jpg', label: 'PNG → JPG', category: 'Image' },
  { slug: 'jpg-to-png', sourceFormat: 'jpg', targetFormat: 'png', label: 'JPG → PNG', category: 'Image' },
  { slug: 'jpg-to-webp', sourceFormat: 'jpg', targetFormat: 'webp', label: 'JPG → WebP', category: 'Image' },
  { slug: 'png-to-webp', sourceFormat: 'png', targetFormat: 'webp', label: 'PNG → WebP', category: 'Image' },
  { slug: 'webp-to-jpg', sourceFormat: 'webp', targetFormat: 'jpg', label: 'WebP → JPG', category: 'Image' },
  { slug: 'webp-to-png', sourceFormat: 'webp', targetFormat: 'png', label: 'WebP → PNG', category: 'Image' },
];

// Dedicated /to-{format} pages
export const formatPages: FormatPage[] = [
  { slug: 'to-jpg', targetFormat: 'jpg', label: 'Convert to JPG', description: 'Convert PNG, WebP, or other images to JPG format.', acceptedInputs: ['png', 'webp'] },
  { slug: 'to-png', targetFormat: 'png', label: 'Convert to PNG', description: 'Convert JPG, WebP, or other images to PNG format.', acceptedInputs: ['jpg', 'jpeg', 'webp'] },
  { slug: 'to-webp', targetFormat: 'webp', label: 'Convert to WebP', description: 'Convert JPG, PNG, or other images to WebP format.', acceptedInputs: ['jpg', 'jpeg', 'png'] },
];

export function getConverterBySlug(slug: string): ConverterRoute | undefined {
  return converterRoutes.find(r => r.slug === slug);
}

export function getFormatPageBySlug(slug: string): FormatPage | undefined {
  return formatPages.find(p => p.slug === slug);
}
