import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import type { Plugin } from 'vite';
import { getAllPrerenderPages, injectPageMeta } from '../src/lib/prerender-meta';

/**
 * After Vite build, emit one HTML file per SEO route with correct
 * title, description, canonical, and Open Graph tags in the initial response.
 * Uses `slug/index.html` so Cloudflare Pages serves `/slug/` with 200.
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
      let written = 0;

      for (const page of pages) {
        if (!page.path) {
          writeFileSync(indexPath, injectPageMeta(template, page), 'utf-8');
          written += 1;
          continue;
        }

        const html = injectPageMeta(template, page);
        const filePath = join(outDir, page.path, 'index.html');
        mkdirSync(dirname(filePath), { recursive: true });
        writeFileSync(filePath, html, 'utf-8');
        written += 1;
      }

      console.log(`[prerender-meta] Wrote ${written} HTML files with per-route SEO meta`);
    },
  };
}
