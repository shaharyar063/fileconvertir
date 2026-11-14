import { absoluteUrl } from '@/lib/site-url';
import { describe, expect, it } from 'vitest';
import { escapeHtml, getAllPrerenderPages, injectPageMeta } from '@/lib/prerender-meta';

const baseHtml = `<!doctype html>
<html><head>
<title>Home</title>
<meta name="description" content="Home desc" />
<link rel="canonical" href="https://fileconvertir.com/" />
<meta property="og:title" content="Home" />
<meta property="og:description" content="Home desc" />
<meta property="og:url" content="https://fileconvertir.com/" />
<meta name="twitter:title" content="Home" />
<meta name="twitter:description" content="Home desc" />
<script type="application/ld+json">[]</script>
</head><body><div id="root"></div></body></html>`;

describe('prerender-meta', () => {
  it('escapes HTML entities in meta text', () => {
    expect(escapeHtml(`Tom & Jerry's "best"`)).toBe(
      'Tom &amp; Jerry\'s &quot;best&quot;',
    );
  });

  it('injects per-route canonical and title', () => {
    const html = injectPageMeta(baseHtml, {
      path: 'png-to-jpg',
      title: 'PNG to JPG — Free',
      description: 'Convert PNG to JPG online.',
      canonical: 'https://fileconvertir.com/png-to-jpg/',
      heading: 'Convert PNG to JPG',
    });

    expect(html).toContain('<title>PNG to JPG — Free</title>');
    expect(html).toContain('href="https://fileconvertir.com/png-to-jpg/"');
    expect(html).not.toContain('href="https://fileconvertir.com/png-to-jpg"');
    expect(html).toContain('data-prerender="true"');
  });

  it('does not prerender jpeg duplicates (they redirect to jpg-to-*)', () => {
    const paths = getAllPrerenderPages().map((p) => p.path);
    expect(paths.some((p) => p === 'jpeg' || p.startsWith('jpeg-to-'))).toBe(false);
    expect(absoluteUrl('jpeg-to-png')).toBe('https://fileconvertir.com/jpg-to-png/');
  });

  it('only publishes pages that have hand-written content', () => {
    const pairs = getAllPrerenderPages().filter((p) => /-to-/.test(p.path));
    expect(pairs.length).toBeGreaterThan(20);
    for (const p of pairs) expect(p.bodyHtml, p.path).toContain('<h2>');
  });
});
