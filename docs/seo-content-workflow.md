# SEO content workflow

See `docs/content-plan.md` for the page-by-page plan and search intent.

## Structure

- `src/lib/conversion-map.ts` — everything the *tool* can convert. Pairs
  without a page still work from the homepage tool.
- `src/lib/seo/pages/` — conversion pages (`image.ts`, `document.ts`,
  `audio.ts`, `video.ts`). A pair gets a URL, sitemap entry and prerendered
  page only if it has an entry here.
- `src/lib/seo/pages/types.ts` — the `ConversionPage` contract and the
  `Graphic` types.
- `src/components/ConversionPageView.tsx` — the page template: H1, short
  description, tool, then four sections and related links.
- `src/components/graphics/` — figures drawn from page data.
- `src/lib/seo/hubs/` — format pages (`/png/`, `/to-pdf/`), rendered by
  `FormatPageView`.

## Adding a conversion page

1. Confirm the pair exists in `conversion-map.ts` and convert a real file.
2. Add a `ConversionPage` entry: title, meta description (120–160 chars),
   H1, a 1–2 sentence description, three steps, the understanding section
   with one or two graphics, scenarios plus when to keep the original, and
   4–6 FAQs.
3. `pnpm test` and `pnpm build`.

## Rules

- Write each page for that conversion only. Tests fail if a sentence is
  shared between pages.
- Describe what the converter actually does, including its limits. Check
  claims against the converter code or a real conversion.
- Nothing above the tool except the H1 and the short description.
- Graphics must explain something specific to the page.
- Format pages explain the format; conversion pages explain the conversion.
