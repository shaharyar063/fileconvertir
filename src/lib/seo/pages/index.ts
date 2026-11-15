import type { ConversionPage } from './types';
import { IMAGE_PAGES } from './image';
import { DOCUMENT_PAGES } from './document';
import { AUDIO_PAGES } from './audio';
import { VIDEO_PAGES } from './video';

/** Every conversion page, keyed by slug (`png-to-jpg`). */
export const CONVERSION_PAGES: Record<string, ConversionPage> = {
  ...IMAGE_PAGES,
  ...DOCUMENT_PAGES,
  ...AUDIO_PAGES,
  ...VIDEO_PAGES,
};

export function getConversionPage(slug: string): ConversionPage | undefined {
  return CONVERSION_PAGES[slug];
}
