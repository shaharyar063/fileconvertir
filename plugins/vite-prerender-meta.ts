import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import type { Plugin } from 'vite';
import { getAllPrerenderPages, injectPageMeta } from '../src/lib/prerender-meta';

/**
 * After Vite build, emit one HTML file per SEO route with correct
 * title, description, canonical, and Open Graph tags in the initial response.
 *
 * Each slug is written in two forms:
 *   - slug/index.html  → Cloudflare serves /slug/ with 200 (canonical trailing-slash URL)
 *   - slug.html        → Cloudflare serves /slug  with 200 directly (no 308 redirect)
 *
 * Without the flat slug.html file, Cloudflare Pages auto-issues a 308 Permanent
 * Redirect from /slug → /slug/ because it detects the slug/ directory. Writing
 * both files eliminates that redirect chain entirely.
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
      if (!existsSync(indexPath)) return;
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

        // 1. Directory form: slug/index.html → serves /slug/ (canonical)
        const dirFilePath = join(outDir, page.path, 'index.html');
        mkdirSync(dirname(dirFilePath), { recursive: true });
        writeFileSync(dirFilePath, html, 'utf-8');

        // 2. Flat form: slug.html → serves /slug directly (eliminates 308 redirect)
        const flatFilePath = join(outDir, `${page.path}.html`);
        writeFileSync(flatFilePath, html, 'utf-8');

        written += 2;
      }

      console.log(`[prerender-meta] Wrote ${written} HTML files with per-route SEO meta`);
    },
  };
}
