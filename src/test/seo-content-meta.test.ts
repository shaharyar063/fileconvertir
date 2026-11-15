import { describe, expect, it } from 'vitest';
import { converterRoutes, formatPages } from '@/lib/converters';
import { getFormatSEO, getSourceFormatSEO } from '@/lib/seo-content';

const META_MIN = 120;
const META_MAX = 160;

describe('hub meta descriptions', () => {
  const sources = [...new Set(converterRoutes.map((r) => r.sourceFormat))];
  const targets = new Set(formatPages.map((p) => p.targetFormat));

  it.each(sources)('source hub %s meta is 120–160 chars', (source) => {
    const { metaDescription } = getSourceFormatSEO(source);
    expect(metaDescription.length).toBeGreaterThanOrEqual(META_MIN);
    expect(metaDescription.length).toBeLessThanOrEqual(META_MAX);
  });

  it.each([...targets])('target hub to-%s meta is 120–160 chars', (target) => {
    const { metaDescription } = getFormatSEO(target);
    expect(metaDescription.length).toBeGreaterThanOrEqual(META_MIN);
    expect(metaDescription.length).toBeLessThanOrEqual(META_MAX);
  });
});
