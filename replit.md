# FileConvertir

Free online file converter at **fileconvertir.com**. All conversions run 100% locally in the browser — files never leave the user's device.

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
- **Logo**: Custom SVG arrows-cycle icon (two arrows: white right-arrow + cyan left-arrow on indigo rounded square)
- **Primary color**: Electric Indigo — `hsl(239, 84%, 67%)` / `#6366F1`
- **Background**: Deep navy-black — `hsl(235, 28%, 8%)` — not pure black, easier on eyes
- **Accent**: Cyan `#a5f3fc` for conversion direction arrows
- **Font**: Inter (Google Fonts)
- **Theme**: Dark-only, perceptually uniform OKLCH-based palette
- **Favicon**: `/public/favicon.svg` — SVG with indigo rounded-square + dual-arrow icon

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
- `:focus-visible` ring using brand indigo
- `.card-hover` utility: gentle lift + shadow on hover
- Category cards: border color + shadow glow on hover
- FAQ accordion: hover color transition on questions
- Header nav link to `#categories` anchor for quick access
- All interactive elements have pointer-friendly padding
