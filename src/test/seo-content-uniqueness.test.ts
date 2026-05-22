import { describe, expect, it } from 'vitest';
import { getAllPrerenderPages } from '@/lib/prerender-meta';
import { isSitemapExcludedPath } from '@/lib/site-url';

describe('seo content uniqueness', () => {
  it('has no duplicate titles among indexable prerender pages', () => {
    const pages = getAllPrerenderPages().filter(
      (p) => !p.path || !isSitemapExcludedPath(p.path),
    );
    const titles = new Map<string, string[]>();
    for (const p of pages) {
      const key = p.path || '/';
      const list = titles.get(p.title) ?? [];
      list.push(key);
      titles.set(p.title, list);
    }
    const dups = [...titles.entries()].filter(([, paths]) => paths.length > 1);
    expect(dups, JSON.stringify(dups.slice(0, 5))).toEqual([]);
  });

  it('has no duplicate meta descriptions among indexable pages', () => {
    const pages = getAllPrerenderPages().filter(
      (p) => !p.path || !isSitemapExcludedPath(p.path),
    );
    const descs = new Map<string, string[]>();
    for (const p of pages) {
      const key = p.path || '/';
      const list = descs.get(p.description) ?? [];
      list.push(key);
      descs.set(p.description, list);
    }
    const dups = [...descs.entries()].filter(([, paths]) => paths.length > 1);
    expect(dups, JSON.stringify(dups.slice(0, 5))).toEqual([]);
  });

  it('avoids banned template FAQ opener on converter pages', () => {
    const pages = getAllPrerenderPages().filter((p) => p.path.includes('-to-'));
    const banned = pages.filter((p) =>
      p.description.startsWith('Convert ') &&
      p.description.includes('free online — no file upload'),
    );
    expect(banned.length).toBe(0);
  });
});
