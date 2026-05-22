# SEO content workflow

## Structure

- `src/lib/seo/registry.ts` — `getConverterSEO`, hub getters, homepage
- `src/lib/seo/converters/tier-s/` — Spotlight pages (40 slugs in `constants.ts`)
- `src/lib/seo/tiers.json` — per-slug tier: `S`, `A`, `B`, or `skip` (jpeg duplicates)
- `src/lib/seo/builders/` — Tier A/B/hub generators for unique copy at scale

## Commands

```bash
npx tsx scripts/seo-generate-tiers.mjs   # regenerate tiers.json
npx tsx scripts/seo-content-audit.mjs    # duplicate title/meta check
npm run test -- src/test/seo-content-uniqueness.test.ts
```

## Adding a Tier S page

1. Add slug to `TIER_S_SLUGS` in `src/lib/seo/constants.ts`
2. Add hand-written entry to `converters/tier-s/priority.ts` OR rely on `buildTierSEnhanced`
3. Set `tiers.json` entry to `"S"`
4. Run audit + tests

## Rules

- Do not write unique copy for `jpeg-to-*` (canonical to `jpg-to-*`)
- Meta descriptions: 120–160 characters
- Prefer “select files” over “upload” for FileConvertir UX
