import { describe, expect, it } from 'vitest';
import { conversionMap } from '@/lib/conversion-map';
import { getFormatSEO, getSourceFormatSEO } from '@/lib/seo-content';

const META_MIN = 120;
const META_MAX = 160;

describe('hub meta descriptions', () => {
  const sources = [...new Set(conversionMap.map((e) => e.source))];
  const targets = new Set<string>();
  conversionMap.forEach((e) => e.targets.forEach((t) => targets.add(t)));

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
