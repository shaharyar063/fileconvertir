# FileConvertir...

Free online file converter at **[fileconvertir.com](https://fileconvertir.com)**.

Convert images, documents, audio, video, fonts, and archives — 100% in the browser. Your files never leave your device.

## Tech Stack

- **React 18** + TypeScript
- **Vite** build tool
- **Tailwind CSS** + shadcn/ui (Radix UI)
- **React Router v6**
- **FFmpeg.wasm** — audio & video conversion in-browser
- **jsPDF** — document to PDF
- **mammoth.js** — DOCX parsing
- **JSZip** — archive handling
- **opentype.js** — font conversion
- **pdf.js** — PDF text extraction
- **Build-time prerender** — per-route SEO meta (347 pages)

## Local Development

```sh
pnpm install
pnpm dev        # Vite dev server on http://localhost:5000
pnpm test       # Vitest
pnpm build      # production build + prerender + sitemap
```

## Project Structure

```
src/
  components/       # SiteHeader, SiteFooter, HeroConverter, FormatPickerDropdown, FormatBrowser, ...
  converters/       # Per-category conversion logic (image, audio, video, document, font, archive)
  hooks/            # useBulkConverter, useDocumentHead, useTheme
  lib/              # Converter registry, conversion map, SEO helpers, FFmpeg wrapper
  pages/            # Index, ConverterPage, SourceFormatPage, FormatPage, SlugRouter, NotFound
public/
  _headers          # COOP/COEP for FFmpeg + security headers (Cloudflare Pages)
  _redirects        # jpeg -> jpg redirects
plugins/
  vite-sitemap.ts         # Build-time sitemap generator
  vite-prerender-meta.ts  # Per-route static HTML (meta tags + crawlable content)
docs/
  seo-content-workflow.md # How to add a page
```

## Pages and the conversion map

`src/lib/conversion-map.ts` lists everything the tool can convert. Only pairs
with hand-written content in `src/lib/seo/converters/tier-s/` get their own
page (and sitemap entry); every other pair still converts from the homepage
tool. See `docs/seo-content-workflow.md`.

## SEO

- Sitemap, canonical URLs and per-page meta are generated at build time
- Page content is prerendered into the static HTML for crawlers
- JSON-LD structured data on converter and format pages
- Submit `https://fileconvertir.com/sitemap.xml` to Google Search Console

## Deployment

Cloudflare Pages: build command `pnpm build`, output directory `dist`. FFmpeg.wasm (~31 MiB) is loaded from a pinned unpkg URL in production (Cloudflare Pages rejects static files over 25 MiB). Optional env: `VITE_SITE_URL=https://fileconvertir.com`. To self-host instead: `FFMPEG_SELF_HOST=1 pnpm copy-ffmpeg` then set `VITE_FFMPEG_BASE_URL=/ffmpeg` at build time (only on hosts that allow large assets).
