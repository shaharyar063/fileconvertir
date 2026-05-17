import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import type { Plugin } from 'vite';
import { getAllPrerenderPages, injectPageMeta } from '../src/lib/prerender-meta';

/**
 * After Vite build, emit one HTML file per SEO route with correct
 * title, description, canonical, and Open Graph tags in the initial response.
 * Writes flat `slug.html` files (not `slug/index.html`) to avoid Cloudflare
 * Pages 308 redirects from `/slug` → `/slug/`.
 */
export function prerenderMetaPlugin(): Plugin {
  let outDir = 'dist';

  return {
    name: 'prerender-meta',
    configResolved(config) {
      outDir = config.build.outDir;
    },
    closeBundle() {
      const indexPath = join(outDir, 'index.html');
      const template = readFileSync(indexPath, 'utf-8');
      const pages = getAllPrerenderPages();
      const redirectLines: string[] = [];
      let written = 0;

      for (const page of pages) {
        if (!page.path) {
          writeFileSync(indexPath, injectPageMeta(template, page), 'utf-8');
          written += 1;
          continue;
        }

        const html = injectPageMeta(template, page);
        const filePath = join(outDir, `${page.path}.html`);
        writeFileSync(filePath, html, 'utf-8');
        redirectLines.push(`/${page.path}  /${page.path}.html  200`);
        written += 1;
      }

      const redirectsPath = join(outDir, '_redirects');
      const redirects = `${redirectLines.join('\n')}\n/*  /index.html  200\n`;
      writeFileSync(redirectsPath, redirects, 'utf-8');

      console.log(
        `[prerender-meta] Wrote ${written} HTML files and ${redirectLines.length} URL rewrites (no trailing-slash 308s)`,
      );
    },
  };
}
