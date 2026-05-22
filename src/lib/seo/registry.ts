import { converterRoutes } from '../converters';
import type { ContentTier } from './types';
import type { ConverterSEO, FormatSEO, HomepageSEO } from './types';
import { mergeConverterSEO } from './merge';
import { getTierSContent } from './converters/tier-s';
import { buildTierAContent } from './builders/tier-a-builder';
import { buildTierBContent } from './builders/tier-b-builder';
import { buildSourceHubSEO, buildTargetHubSEO } from './builders/hub-builder';
import { HOMEPAGE_SEO } from './homepage';
import tiersData from './tiers.json';
import { TIER_S_SLUGS, PRIORITY_CONVERTERS } from './constants';

const tiers = tiersData as Record<string, ContentTier>;

function resolveSource(source: string): string {
  return source === 'jpeg' ? 'jpg' : source;
}

function getTier(slug: string, source: string): ContentTier {
  if (source === 'jpeg') return 'skip';
  return tiers[slug] ?? 'B';
}

export function getConverterSEO(source: string, target: string): ConverterSEO {
  const src = resolveSource(source);
  const slug = `${source}-to-${target}`;
  const canonicalSlug = `${src}-to-${target}`;

  const tierS = getTierSContent(canonicalSlug);
  if (tierS) return mergeConverterSEO(src, target, tierS);

  const tier = getTier(slug, source);
  if (tier === 'skip') {
    return mergeConverterSEO(src, target, buildTierBContent(src, target));
  }
  const content =
    tier === 'B'
      ? buildTierBContent(src, target)
      : buildTierAContent(src, target);

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

export function isPriorityConverter(slug: string): boolean {
  return (PRIORITY_CONVERTERS as readonly string[]).includes(slug) || (TIER_S_SLUGS as readonly string[]).includes(slug);
}

export { getRelatedConverters } from '../site-navigation';

export function getCategoryStats() {
  const cats: Record<string, number> = {};
  converterRoutes.forEach((r) => {
    cats[r.category] = (cats[r.category] || 0) + 1;
  });
  return cats;
}

export function getTotalConversions(): number {
  return converterRoutes.length;
}
