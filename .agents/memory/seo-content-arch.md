---
name: SEO content architecture
description: How page content flows through the tier system in FileConvertir's SEO stack
---

# SEO Content Architecture

**Flow for a converter page slug:**
1. `registry.ts → getConverterSEO(source, target)`
2. Calls `getTierSContent(slug)` — if slug is in `TIER_S_SLUGS` (constants.ts):
   - If `PRIORITY_S_PAGES[slug]` exists → use hand-crafted content from `priority.ts`
   - Otherwise → `buildTierSEnhanced(source, target)` (enhanced template in `tier-s-enhance.ts`)
3. If not Tier S → check `tiers.json` for 'A' or 'B'
   - 'A' → `buildTierAContent()` in `tier-a-builder.ts`
   - 'B' → `buildTierBContent()` in `tier-b-builder.ts`

**Key files:**
- `src/lib/seo/converters/tier-s/priority.ts` — all hand-crafted page content (26 entries)
- `src/lib/seo/constants.ts` — `TIER_S_SLUGS` list (controls which slugs get Tier S routing)
- `src/lib/seo/tiers.json` — maps each slug to 'S', 'A', or 'B'
- `src/lib/site-navigation.ts` — `PRIORITY_SLUGS` set (controls related-converter weighting), `POPULAR_LINKS`, `BOOSTED_LINKS`

**Why:** To add a new hand-crafted page, add the slug to `TIER_S_SLUGS` in constants.ts AND add an entry to `PRIORITY_S_PAGES` in priority.ts. The slug must also exist in tiers.json as 'S' for the non-priority path (though the TIER_S_SLUGS check runs first in registry.ts, so tiers.json is a secondary guard).

**ConverterContentOverride shape:**
```ts
{
  title, metaDescription, heading, description, useCases[],
  faqs[{ q, a }], longDescription?, howToSteps?[{ name, text }],
  whyChooseUs?[{ title, text }], isPriority?
}
```
Title target: 50–65 chars. metaDescription: 150–160 chars (enforced by `fitMeta`).
