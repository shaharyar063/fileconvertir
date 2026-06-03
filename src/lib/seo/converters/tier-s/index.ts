import { TIER_S_SLUGS } from '../../constants';
import type { ConverterContentOverride, ArticleSection } from '../../types';
import { PRIORITY_S_PAGES } from './priority';
import { buildTierSEnhanced, parseConverterSlug } from '../../builders/tier-s-enhance';
import { IMAGE_S_ARTICLES } from './image-articles';
import { IMAGE_S_NEW } from './image-new';
import { AUDIO_S_ARTICLES, AUDIO_S_NEW } from './audio-content';
import { VIDEO_S_ARTICLES, VIDEO_S_NEW } from './video-content';
import { DOCUMENT_S_ARTICLES, DOCUMENT_S_NEW } from './document-content';

const NEW_PAGES: Record<string, ConverterContentOverride> = {
  ...IMAGE_S_NEW,
  ...AUDIO_S_NEW,
  ...VIDEO_S_NEW,
  ...DOCUMENT_S_NEW,
};

const ARTICLES: Record<string, ArticleSection[]> = {
  ...IMAGE_S_ARTICLES,
  ...AUDIO_S_ARTICLES,
  ...VIDEO_S_ARTICLES,
  ...DOCUMENT_S_ARTICLES,
};

export function getTierSContent(slug: string): ConverterContentOverride | undefined {
  if (!(TIER_S_SLUGS as readonly string[]).includes(slug)) return undefined;

  const base = PRIORITY_S_PAGES[slug] ?? NEW_PAGES[slug];
  if (base) {
    return base.article ? base : { ...base, article: ARTICLES[slug] };
  }

  const { source, target } = parseConverterSlug(slug);
  if (!source || !target) return undefined;
  const enhanced = buildTierSEnhanced(source, target);
  return ARTICLES[slug] ? { ...enhanced, article: ARTICLES[slug] } : enhanced;
}
