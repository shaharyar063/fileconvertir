export interface ConverterRoute {
  slug: string;
  sourceFormat: string;
  targetFormat: string;
  label: string;
  category: string;
}

export const converterRoutes: ConverterRoute[] = [
  { slug: 'png-to-jpg', sourceFormat: 'png', targetFormat: 'jpg', label: 'PNG → JPG', category: 'Image' },
  { slug: 'jpg-to-png', sourceFormat: 'jpg', targetFormat: 'png', label: 'JPG → PNG', category: 'Image' },
  { slug: 'jpg-to-webp', sourceFormat: 'jpg', targetFormat: 'webp', label: 'JPG → WebP', category: 'Image' },
  { slug: 'png-to-webp', sourceFormat: 'png', targetFormat: 'webp', label: 'PNG → WebP', category: 'Image' },
  { slug: 'webp-to-jpg', sourceFormat: 'webp', targetFormat: 'jpg', label: 'WebP → JPG', category: 'Image' },
  { slug: 'webp-to-png', sourceFormat: 'webp', targetFormat: 'png', label: 'WebP → PNG', category: 'Image' },
];

export function getConverterBySlug(slug: string): ConverterRoute | undefined {
  return converterRoutes.find(r => r.slug === slug);
}
