import type { FormatSEO, HomepageSEO } from './types';
import { SOURCE_HUBS, TARGET_HUBS } from './hubs';
import { HOMEPAGE_SEO } from './homepage';

/** Content for a "Convert to X" format page. */
export function getFormatSEO(targetFormat: string): FormatSEO {
  const hub = TARGET_HUBS[targetFormat];
  if (!hub) throw new Error(`No hub content for target format "${targetFormat}"`);
  return hub;
}

/** Content for a source-format page (`/png/`). */
export function getSourceFormatSEO(sourceFormat: string): FormatSEO {
  const key = sourceFormat === 'jpeg' ? 'jpg' : sourceFormat;
  const hub = SOURCE_HUBS[key];
  if (!hub) throw new Error(`No hub content for source format "${sourceFormat}"`);
  return hub;
}

export function getHomepageSEO(): HomepageSEO {
  return HOMEPAGE_SEO;
}
