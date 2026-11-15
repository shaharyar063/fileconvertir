import type { ConversionPage } from './types';
import { IMAGE_PAGES } from './image';
import { DOCUMENT_PAGES } from './document';
import { AUDIO_PAGES } from './audio';
import { VIDEO_PAGES } from './video';
import { IMAGE_PAGES_A } from './image-convert-a';
import { IMAGE_PAGES_B } from './image-convert-b';
import { IMAGE_PAGES_C } from './image-convert-c';
import { IMAGE_PAGES_D } from './image-convert-d';
import { DOCUMENT_PAGES_A } from './document-convert-a';
import { DOCUMENT_PAGES_B } from './document-convert-b';
import { AUDIO_PAGES_A } from './audio-convert-a';
import { AUDIO_PAGES_B } from './audio-convert-b';
import { VIDEO_PAGES_A } from './video-convert-a';
import { JPEG_PAGES } from './jpeg-convert';
import { FONT_ARCHIVE_PAGES } from './font-archive-convert';

/** Every conversion page, keyed by slug (`png-to-jpg`). */
export const CONVERSION_PAGES: Record<string, ConversionPage> = {
  ...IMAGE_PAGES,
  ...DOCUMENT_PAGES,
  ...AUDIO_PAGES,
  ...VIDEO_PAGES,
  ...IMAGE_PAGES_A,
  ...IMAGE_PAGES_B,
  ...IMAGE_PAGES_C,
  ...IMAGE_PAGES_D,
  ...DOCUMENT_PAGES_A,
  ...DOCUMENT_PAGES_B,
  ...AUDIO_PAGES_A,
  ...AUDIO_PAGES_B,
  ...VIDEO_PAGES_A,
  ...JPEG_PAGES,
  ...FONT_ARCHIVE_PAGES,
};

export function getConversionPage(slug: string): ConversionPage | undefined {
  return CONVERSION_PAGES[slug];
}
