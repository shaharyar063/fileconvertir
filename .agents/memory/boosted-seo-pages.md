---
name: Boosted SEO pages
description: The 26 hand-crafted Tier S priority converter pages and the strategy behind them
---

# Boosted SEO Pages

All 26 entries live in `src/lib/seo/converters/tier-s/priority.ts`.

## Original 6 (pre-existing)
heic-to-jpg, avif-to-jpg, m4a-to-mp3, mov-to-mp4, tiff-to-jpg, webp-to-png

## 20 New Pages Added
**Image:** webp-to-jpg, avif-to-png, svg-to-png, png-to-pdf, jpg-to-pdf, heic-to-pdf
**Audio:** mp4-to-mp3, wav-to-mp3, flac-to-mp3, aac-to-mp3, ogg-to-mp3, m4a-to-wav
**Video:** mkv-to-mp4, avi-to-mp4, webm-to-mp4, mov-to-mp3
**Document:** docx-to-pdf, docx-to-txt, pdf-to-txt
**Font:** ttf-to-woff

## Strategy
Each page targets long-tail intent beyond just "X to Y converter":
- Device-specific pain points (iPhone HEIC, car stereo AAC, Plex MKV)
- App-specific problems (Photoshop can't open AVIF, Word rejects WebP)
- Workflow contexts (podcast production, DAW editing, AI text extraction)
- Quality/technical FAQs (bitrate, re-encoding vs re-wrap, transparency)

## Internal Linking
- `PRIORITY_SLUGS` in `site-navigation.ts` includes all 26 slugs → these bubble to top of related-converter lists
- `BOOSTED_LINKS` array (15 items) displayed on homepage as "More Conversions" tag cloud
- `POPULAR_LINKS` updated to 18 items mixing standbys + opportunity pages
- Homepage "Most Popular" cards updated to feature mp4-to-mp3, mkv-to-mp4, webp-to-jpg, docx-to-pdf, pdf-to-txt
