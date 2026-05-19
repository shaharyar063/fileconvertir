import { Plugin } from 'vite';
import { conversionMap } from '../src/lib/conversion-map';
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

      conversionMap.forEach((entry) => {
        entry.targets.forEach((target) => {
          urls.push(
            `  <url><loc>${absoluteUrl(`${entry.source}-to-${target}`)}</loc><lastmod>${now}</lastmod><priority>0.8</priority><changefreq>monthly</changefreq></url>`,
          );
        });
      });

      const sources = new Set(conversionMap.map((e) => e.source));
      sources.forEach((source) => {
        urls.push(
          `  <url><loc>${absoluteUrl(source)}</loc><lastmod>${now}</lastmod><priority>0.7</priority><changefreq>monthly</changefreq></url>`,
        );
      });

      const targets = new Set<string>();
      conversionMap.forEach((e) => e.targets.forEach((t) => targets.add(t)));
      targets.forEach((target) => {
        urls.push(
          `  <url><loc>${absoluteUrl(`to-${target}`)}</loc><lastmod>${now}</lastmod><priority>0.7</priority><changefreq>monthly</changefreq></url>`,
        );
      });

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
