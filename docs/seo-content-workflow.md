# SEO content workflow

Every converter page must have unique, hand-written content. Templated or
spun copy was removed because search engines treat it as low-value and do not
index it.

## Structure

- `src/lib/seo/converters/tier-s/` — hand-written page content (one entry per page)
- `src/lib/seo/constants.ts` — `TIER_S_SLUGS` (pages that may be published)
- `src/lib/converters.ts` — `converterRoutes` = pairs with hand-written content;
  these are the only converter URLs, sitemap entries and prerendered pages
- `src/lib/conversion-map.ts` — everything the *tool* can convert. Pairs without
  a page still work from the homepage tool; they just have no URL of their own.
- `src/lib/seo/builders/hub-builder.ts` — format hub pages (`/png/`, `/to-pdf/`)

## Adding a page

1. Add the slug to `TIER_S_SLUGS` in `src/lib/seo/constants.ts`
2. Write a full entry in `converters/tier-s/` (title, meta description, how-to,
   use cases, FAQs, and a real article)
3. `npm run test` and `npm run build`

## Rules

- No templates, no `pick()`-style spinning for converter pages
- Meta descriptions: 120–160 characters, unique per page
- Prefer "select files" over "upload" (conversion runs locally)
