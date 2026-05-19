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
</head><body><motion.div id="root"></div></body></html>`;

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

  it('canonicalizes jpeg-to-* routes to jpg-to-*', () => {
    const page = getAllPrerenderPages().find((p) => p.path === 'jpeg-to-png');
    expect(page?.canonical).toBe('https://fileconvertir.com/jpg-to-png/');
  });
});
