import { TIER_S_SLUGS } from '../../constants';
import type { ConverterContentOverride } from '../../types';
import { PRIORITY_S_PAGES } from './priority';
import { buildTierSEnhanced, parseConverterSlug } from '../../builders/tier-s-enhance';

export function getTierSContent(slug: string): ConverterContentOverride | undefined {
  if (!(TIER_S_SLUGS as readonly string[]).includes(slug)) return undefined;
  if (PRIORITY_S_PAGES[slug]) return PRIORITY_S_PAGES[slug];
  const { source, target } = parseConverterSlug(slug);
  if (!source || !target) return undefined;
  return buildTierSEnhanced(source, target);
}
