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
# Install dependencies
npm install

# Start dev server
npm run dev
```

## Project Structure

```
src/
  components/       # UI components (SiteHeader, DropZone, HeroConverter, etc.)
  converters/       # Per-category conversion logic (image, audio, video, document, font, archive)
  hooks/            # Custom React hooks (useConverter, useDocumentHead, etc.)
  lib/              # Converter registry, SEO helpers, conversion map
  pages/            # Route views (Index, ConverterPage, FormatPage, SlugRouter, etc.)
public/
  favicon.svg       # FileConvertir brand icon (SVG)
  favicon.ico       # Legacy fallback favicon
  sitemap.xml       # Pre-generated sitemap (347 URLs) for Google Search Console
  robots.txt        # Crawler instructions
  _headers          # COOP/COEP for FFmpeg (Cloudflare Pages)
  _redirects        # SPA fallback
plugins/
  vite-sitemap.ts   # Build-time sitemap generator
  vite-prerender-meta.ts  # Per-route HTML with canonical/title
```

## SEO

- 347-URL sitemap covering 278 converter pairs, 37 source pages, 31 target pages
- Submit `https://fileconvertir.com/sitemap.xml` to Google Search Console
- JSON-LD structured data on all converter and format pages
- Hand-crafted meta descriptions for the highest-traffic keywords (HEIC→JPG, PNG↔JPG, MP4→MP3, etc.)

## Deployment

Cloudflare Pages: build command `npm run build`, output directory `dist`. Optional env: `VITE_SITE_URL=https://fileconvertir.com`.
