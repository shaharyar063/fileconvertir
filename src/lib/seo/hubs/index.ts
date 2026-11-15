import type { FormatSEO } from '../types';
import { IMAGE_SOURCE_HUBS, IMAGE_TARGET_HUBS } from './image';
import { DOCUMENT_SOURCE_HUBS, DOCUMENT_TARGET_HUBS } from './document';
import { MEDIA_SOURCE_HUBS, MEDIA_TARGET_HUBS } from './media';
import { IMAGE_MORE_SOURCE_HUBS, IMAGE_MORE_TARGET_HUBS } from './image-more';
import { MORE_SOURCE_HUBS, MORE_TARGET_HUBS } from './more';

/** Hand-written hub pages, keyed by format (`png`, `mp3`, ...). */
export const SOURCE_HUBS: Record<string, FormatSEO> = {
  ...IMAGE_SOURCE_HUBS,
  ...DOCUMENT_SOURCE_HUBS,
  ...MEDIA_SOURCE_HUBS,
  ...IMAGE_MORE_SOURCE_HUBS,
  ...MORE_SOURCE_HUBS,
};

/** Hand-written "convert to X" hub pages, keyed by target format. */
export const TARGET_HUBS: Record<string, FormatSEO> = {
  ...IMAGE_TARGET_HUBS,
  ...DOCUMENT_TARGET_HUBS,
  ...MEDIA_TARGET_HUBS,
  ...IMAGE_MORE_TARGET_HUBS,
  ...MORE_TARGET_HUBS,
};
