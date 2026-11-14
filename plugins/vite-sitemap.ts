import { Plugin } from 'vite';
import { converterRoutes, formatPages } from '../src/lib/converters';
import { absoluteUrl } from '../src/lib/site-url';

export function sitemapPlugin(): Plugin {
  return {
    name: 'generate-sitemap',
    generateBundle() {
      const now = new Date().toISOString().split('T')[0];
      const urls: string[] = [];

      urls.push(
        `  <url><loc>${absoluteUrl()}</loc><lastmod>${now}</lastmod><priority>1.0</priority><changefreq>weekly</changefreq></url>`,
      );

      for (const route of converterRoutes) {
        urls.push(
          `  <url><loc>${absoluteUrl(route.slug)}</loc><lastmod>${now}</lastmod><priority>0.8</priority><changefreq>monthly</changefreq></url>`,
        );
      }

      const sources = new Set(converterRoutes.map((r) => r.sourceFormat));
      for (const source of sources) {
        urls.push(
          `  <url><loc>${absoluteUrl(source)}</loc><lastmod>${now}</lastmod><priority>0.7</priority><changefreq>monthly</changefreq></url>`,
        );
      }

      for (const page of formatPages) {
        urls.push(
          `  <url><loc>${absoluteUrl(page.slug)}</loc><lastmod>${now}</lastmod><priority>0.7</priority><changefreq>monthly</changefreq></url>`,
        );
      }

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: sitemap,
      });
    },
  };
}
