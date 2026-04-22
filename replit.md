# FileConvertir

Free online file converter at **fileconvertir.com**. All conversions run 100% locally in the browser — files never leave the user's device.

## SEO Status (April 2026)

- **Sitemap**: `public/sitemap.xml` — 347 URLs (278 converter pairs, 37 source pages, 31 target pages). Submit to Google Search Console at: `https://fileconvertir.com/sitemap.xml`
- **Robots.txt**: `public/robots.txt` references the sitemap and allows all crawlers
- **Meta tags**: Title + description set client-side via `useDocumentHead` on all routes
- **JSON-LD schema**: SoftwareApplication + FAQPage on all converter pages; WebSite + FAQPage on homepage
- **6 priority "money pages"** (`PRIORITY_CONVERTERS` in `seo-content.ts`): heic-to-jpg (~1.5M/mo), avif-to-jpg (~150k/mo, low DR), m4a-to-mp3 (~300k/mo), mov-to-mp4 (~300k/mo), tiff-to-jpg (~200k/mo), webp-to-png (~250k/mo). These pages get hand-written long descriptions, HowTo step schema, "Why Choose Us" comparison sections, and 7-10 long-tail-targeted FAQs.
- **Sitemap priority weighting**: priority pages = 1.0 + weekly changefreq, other converter pairs = 0.6 + monthly, format hub pages = 0.5
- **Homepage** features a prominent "Most Popular Conversions" grid linking to the 6 priority pages for internal-link authority flow
- **SEO differentiator**: "Files never leave your device" — used in all meta descriptions and page copy
- **Realistic ranking expectations**: head keywords (1M+/mo) need 6-12 months for a 1-month-old DR-low site; mid-tier (100-300k) need 3-6 months; long-tail variants achievable in 1-3 months

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build**: Vite
- **Styling**: Tailwind CSS + shadcn/ui (Radix UI)
- **Routing**: React Router DOM v6
- **Data fetching**: TanStack Query v5
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **File processing**: ffmpeg.wasm, jspdf, mammoth, jszip, opentype.js
- **Backend**: Supabase (Edge Functions)

## Project Structure

```
src/
  components/       # UI components (SiteHeader, SiteFooter, HeroConverter, DropZone, etc.)
  components/ui/    # shadcn/ui base components
  converters/       # File conversion logic per category (image, audio, video, document, font, archive)
  hooks/            # Custom React hooks
  integrations/     # Supabase client
  lib/              # Converter registry, SEO helpers (seo-jsonld.ts, seo-content.ts)
  pages/            # Route views (Index, ConverterPage, FormatPage, SourceFormatPage, SlugRouter)
public/             # Static assets (favicon.svg, og-image.svg, robots.txt)
plugins/            # Vite plugins (sitemap generator)
```

## Brand & Design

- **Brand name**: FileConvertir
- **Domain**: fileconvertir.com
- **Brand system (April 2026 rebrand)**: strict two-color palette inspired by glyphy.io — **cream `#FBF3DC`** (`hsl(45 80% 92%)`) and **near-black `#0A0A0A`** (`hsl(0 0% 4%)`). Light mode = cream bg + black fg. Dark mode = black bg + cream fg. Primary always equals foreground; switching modes literally swaps the two colors. Defined as CSS variables in `src/index.css` under `:root` and `.dark`.
- **Logo**: `src/components/BrandLogo.tsx` — rounded square in `hsl(var(--foreground))` with two-arrow conversion mark cut to `hsl(var(--background))`. Inverts automatically with the theme.
- **Theme toggle**: `src/components/ThemeToggle.tsx` — top-right of header, sun/moon icon. State held in `src/hooks/use-theme.tsx` (localStorage `fc-theme`, defaults to system preference). FOUC-prevention script in `index.html` sets the `dark` class before React mounts.
- **Font**: Inter (Google Fonts)
- **Theme**: Light + dark, with light as the default for first-time visitors (matches glyphy.io reference). System preference respected.
- **Favicon**: `/public/favicon.svg` — black rounded-square with cream conversion arrows; `/public/favicon.ico` regenerated to match

## Key Files

- `index.html` — Meta tags, favicons, structured data (all updated to fileconvertir.com)
- `src/index.css` — CSS variables (color palette), global utilities (smooth scroll, focus rings, card hover)
- `src/lib/seo-jsonld.ts` — SITE_URL and SITE_NAME constants
- `src/lib/seo-content.ts` — SEO titles/descriptions for converter pages
- `src/components/SiteHeader.tsx` — Logo + navigation
- `src/components/SiteFooter.tsx` — Footer with links
- `src/pages/Index.tsx` — Home page

## UX Details Added

- `scroll-behavior: smooth` on `html`
- Subtle radial gradient on `body` background for depth
- `:focus-visible` ring using foreground color (theme-aware)
- `.card-hover` utility: gentle lift + shadow on hover
- Category cards: border color + shadow glow on hover
- FAQ accordion: hover color transition on questions
- Header nav link to `#categories` anchor for quick access
- All interactive elements have pointer-friendly padding
