import type { ConverterSEO, FormatSEO, HomepageSEO } from './types';
import { mergeConverterSEO } from './merge';
import { getTierSContent } from './converters/tier-s';
import { buildSourceHubSEO, buildTargetHubSEO } from './builders/hub-builder';
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

export function getFormatSEO(targetFormat: string): FormatSEO {
  return buildTargetHubSEO(targetFormat);
}

export function getSourceFormatSEO(sourceFormat: string): FormatSEO {
  return buildSourceHubSEO(sourceFormat);
}

export function getHomepageSEO(): HomepageSEO {
  return HOMEPAGE_SEO;
}

export { PRIORITY_CONVERTERS, TIER_S_SLUGS };

export { getRelatedConverters } from '../site-navigation';

