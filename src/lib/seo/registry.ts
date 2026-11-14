import type { ConverterSEO, FormatSEO, HomepageSEO } from './types';
import { mergeConverterSEO } from './merge';
import { getTierSContent } from './converters/tier-s';
import { SOURCE_HUBS, TARGET_HUBS } from './hubs';
import { HOMEPAGE_SEO } from './homepage';
import { TIER_S_SLUGS, PRIORITY_CONVERTERS } from './constants';

function resolveSource(source: string): string {
  return source === 'jpeg' ? 'jpg' : source;
}

/** Content for a converter page. Only hand-written pages exist. */
export function getConverterSEO(source: string, target: string): ConverterSEO {
  const src = resolveSource(source);
  const slug = `${src}-to-${target}`;
  const content = getTierSContent(slug);
  if (!content) {
    throw new Error(`No hand-written content for ${slug}`);
  }
  return mergeConverterSEO(src, target, content);
}

/** Content for a "Convert to X" hub page. */
export function getFormatSEO(targetFormat: string): FormatSEO {
  const hub = TARGET_HUBS[targetFormat];
  if (!hub) throw new Error(`No hub content for target format "${targetFormat}"`);
  return hub;
}

/** Content for a source-format hub page (`/png/`). */
export function getSourceFormatSEO(sourceFormat: string): FormatSEO {
  const key = sourceFormat === 'jpeg' ? 'jpg' : sourceFormat;
  const hub = SOURCE_HUBS[key];
  if (!hub) throw new Error(`No hub content for source format "${sourceFormat}"`);
  return hub;
}

export function getHomepageSEO(): HomepageSEO {
  return HOMEPAGE_SEO;
}

export { PRIORITY_CONVERTERS, TIER_S_SLUGS };

export { getRelatedConverters } from '../site-navigation';

