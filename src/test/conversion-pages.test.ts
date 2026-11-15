import { describe, expect, it } from 'vitest';
import { CONVERSION_PAGES } from '@/lib/seo/pages';
import { conversionMap } from '@/lib/conversion-map';
import { formatLabel } from '@/lib/format-label';

const entries = Object.entries(CONVERSION_PAGES);

describe('conversion pages', () => {
  it.each(entries)('%s follows the four-section contract', (slug, page) => {
    const [source, target] = slug.split('-to-');
    const mapEntry = conversionMap.find((e) => e.source === source);
    expect(mapEntry?.targets, `${slug} is not a real conversion`).toContain(target);

    expect(page.title.length).toBeLessThanOrEqual(60);
    expect(page.metaDescription.length).toBeGreaterThanOrEqual(120);
    expect(page.metaDescription.length).toBeLessThanOrEqual(160);
    // 1–2 sentences above the tool
    expect(page.description.split(/(?<=[.!?])\s+/).length).toBeLessThanOrEqual(2);
    // The description sits under the H1 and carries the page's keywords.
    const [src, tgt] = slug.split('-to-').map(formatLabel);
    expect(page.description.toLowerCase()).toContain(`${src} to ${tgt}`.toLowerCase());
    expect(page.description.toLowerCase()).toContain('online');
    expect(page.description.toLowerCase()).toContain('free');
    expect(page.description.length).toBeLessThanOrEqual(260);
    expect(page.steps).toHaveLength(3);
    expect(page.understanding.paragraphs.length).toBeGreaterThanOrEqual(1);
    expect(page.understanding.graphics.length).toBeGreaterThanOrEqual(1);
    expect(page.understanding.graphics.length).toBeLessThanOrEqual(2);
    expect(page.whyWhen.scenarios.length).toBeGreaterThanOrEqual(2);
    expect(page.whyWhen.keepOriginal.length).toBeGreaterThan(40);
    expect(page.faqs.length).toBeGreaterThanOrEqual(4);
    expect(page.faqs.length).toBeLessThanOrEqual(6);
  });

  it('has unique titles, H1s and meta descriptions', () => {
    for (const field of ['title', 'heading', 'metaDescription', 'description'] as const) {
      const values = entries.map(([, p]) => p[field]);
      expect(new Set(values).size, field).toBe(values.length);
    }
  });

  it('does not reuse sentences or FAQ questions between pages', () => {
    const seen = new Map<string, string>();
    const dupes: string[] = [];
    const add = (slug: string, text: string, min: number) => {
      for (const sentence of text.split(/(?<=[.!?])\s+/)) {
        const key = sentence.trim().toLowerCase();
        if (key.length < min) continue;
        const prev = seen.get(key);
        if (prev && prev !== slug) dupes.push(`${prev} / ${slug}: ${sentence.slice(0, 70)}`);
        else seen.set(key, slug);
      }
    };
    for (const [slug, p] of entries) {
      add(slug, p.description, 40);
      add(slug, p.understanding.paragraphs.join(' '), 60);
      add(slug, p.whyWhen.scenarios.map((s) => s.text).join(' '), 60);
      add(slug, p.whyWhen.keepOriginal, 60);
      add(slug, p.faqs.map((f) => f.a).join(' '), 60);
    }
    expect(dupes).toEqual([]);
  });
});
