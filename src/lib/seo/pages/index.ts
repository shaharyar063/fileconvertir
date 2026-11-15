import type { ConversionPage } from './types';
import { IMAGE_PAGES } from './image';

/** Every conversion page, keyed by slug (`png-to-jpg`). */
export const CONVERSION_PAGES: Record<string, ConversionPage> = {
  ...IMAGE_PAGES,
};

export function getConversionPage(slug: string): ConversionPage | undefined {
  return CONVERSION_PAGES[slug];
}
