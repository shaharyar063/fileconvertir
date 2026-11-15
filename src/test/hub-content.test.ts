import { describe, expect, it } from 'vitest';
import { converterRoutes, formatPages } from '@/lib/converters';
import { getFormatSEO, getSourceFormatSEO } from '@/lib/seo/registry';
import { formatLabel } from '@/lib/format-label';

const sources = [...new Set(converterRoutes.map((r) => r.sourceFormat))];
const targets = formatPages.map((p) => p.targetFormat);

describe('hub pages are hand-written for every published format', () => {
  it.each(sources)('source hub %s has full content', (fmt) => {
    const hub = getSourceFormatSEO(fmt);
    expect(hub.useCases.length).toBeGreaterThanOrEqual(2);
    expect(hub.faqs.length).toBeGreaterThanOrEqual(2);
    expect(hub.details.length).toBeGreaterThan(100);
    expect((hub.longDescription ?? '').length).toBeGreaterThan(200);
    expect(hub.title.length).toBeLessThanOrEqual(62);
    expect(hub.description.toLowerCase()).toContain(`${formatLabel(fmt)} converter`.toLowerCase());
    expect(hub.description.length).toBeLessThanOrEqual(260);
  });

  it.each(targets)('target hub to-%s has full content', (fmt) => {
    const hub = getFormatSEO(fmt);
    expect(hub.useCases.length).toBeGreaterThanOrEqual(2);
    expect(hub.faqs.length).toBeGreaterThanOrEqual(2);
    expect(hub.details.length).toBeGreaterThan(100);
    expect((hub.longDescription ?? '').length).toBeGreaterThan(200);
    expect(hub.title.length).toBeLessThanOrEqual(62);
    expect(hub.description.toLowerCase()).toContain(`convert to ${formatLabel(fmt)}`.toLowerCase());
    expect(hub.description.length).toBeLessThanOrEqual(260);
  });

  it('shares no sentences between hubs (no templates)', () => {
    const seen = new Map<string, string>();
    const dupes: string[] = [];
    const add = (id: string, text: string) => {
      for (const sentence of text.split(/(?<=[.!?])\s+/)) {
        const key = sentence.trim().toLowerCase();
        if (key.length < 50) continue;
        const prev = seen.get(key);
        if (prev && prev !== id) dupes.push(`${prev} / ${id}: ${sentence.slice(0, 60)}`);
        else seen.set(key, id);
      }
    };
    for (const f of sources) {
      const h = getSourceFormatSEO(f);
      add(`src:${f}`, [h.description, h.details, h.longDescription ?? '', ...h.faqs.map((q) => q.a)].join(' '));
    }
    for (const f of targets) {
      const h = getFormatSEO(f);
      add(`to:${f}`, [h.description, h.details, h.longDescription ?? '', ...h.faqs.map((q) => q.a)].join(' '));
    }
    expect(dupes).toEqual([]);
  });
});
