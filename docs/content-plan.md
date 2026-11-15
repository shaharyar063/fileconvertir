# Content and graphics plan

Audit of every URL on fileconvertir.com and the plan for the four-section
redesign. The converter always comes first; content sits below it.

## Page types and search intent

| Type | URLs | Intent | Primary keyword pattern | Must not target |
|---|---|---|---|---|
| Homepage | `/` | "free file converter" (navigational / broad) | file converter | any single pair |
| Conversion page | `/png-to-jpg/` (35) | do one specific conversion | "[source] to [target]" | "what is [format]" |
| Source format page | `/png/` (23) | learn about a format and see what it converts to | "[format] converter", "what is [format]" | "[source] to [target]" |
| Target format page | `/to-pdf/` (11) | need a file in a given format, source undecided | "convert to [format]" | "[source] to [target]" |

Cannibalization rules:

- Titles and H1s never repeat across types: conversion pages use
  "[SOURCE] to [TARGET] Converter", source pages "[FORMAT] File Converter",
  target pages "Convert to [FORMAT]".
- Format pages explain the format itself (history, structure, strengths,
  limits) and link out to conversions. They do not carry how-to steps or
  conversion-specific FAQs.
- Conversion pages explain only that conversion (what changes, what is lost,
  when to do it). They link back to both format pages.
- Pairs that share a target (e.g. five "to MP3" pages) each lead with what is
  specific to the source: container vs codec, lossless vs lossy source,
  video extraction, and so on.

## Layout for every conversion page

Above the tool: one H1, a 1–2 sentence description. Nothing else.

Below the tool, four H2 sections:

1. How to Convert [SOURCE] to [TARGET] — three steps with a three-step visual.
2. Understanding [SOURCE] to [TARGET] Conversion — what happens, differences,
   quality, limits; one or two informative graphics.
3. Why and When to Convert [SOURCE] to [TARGET] — concrete scenarios, plus
   when to keep the original.
4. Frequently Asked Questions — 4–6 page-specific questions.

Then related-conversion links (a `nav`, not a content section).

Schema: `HowTo` (the three steps), `FAQPage`, `BreadcrumbList`.

## Graphic types

All graphics are inline SVG or semantic HTML figures, drawn from page data,
theme-aware, responsive, with a text alternative and caption.

| Graphic | Shows | Used for |
|---|---|---|
| Steps | add file → convert → download, labelled with the real formats | every page (section 1) |
| Format table | source vs target on the attributes that matter | most pages |
| Size bars | typical file sizes for a stated example | size-driven conversions |
| Transparency | checkerboard before/after | conversions that keep or flatten alpha |
| Frames | animation frames, first frame kept | GIF, animated WebP |
| Vector vs pixels | curve vs pixel grid | SVG to PNG |
| Pages | styled document vs plain-text output, photo page, text lines | document and image-to-PDF pages |
| Flow | decode → process → encode chain | audio and video pages |
| Tracks | container tracks kept, re-encoded or dropped | video pages |
| Waveform | full-detail vs reduced-detail audio | lossy/lossless audio pages |
| Support | where each format opens | compatibility-driven conversions |

## Conversion pages

| URL | What the page is uniquely about | Section 2 graphics | Section 3 graphic |
|---|---|---|---|
| `/png-to-jpg/` | shrinking lossless PNG; transparency becomes white | transparency, size bars | — |
| `/png-to-webp/` | smaller web images that keep transparency | format table, transparency | support |
| `/png-to-tiff/` | print/archive hand-off; uncompressed 8-bit RGB output | format table, size bars | — |
| `/png-to-pdf/` | screenshot/scan as a one-page PDF; image is not text | pages, format table | — |
| `/jpg-to-png/` | lossless copy for editing; quality is not restored | size bars, format table | — |
| `/jpg-to-pdf/` | photo of a document as a PDF page; one PDF per photo | pages | — |
| `/webp-to-png/` | opening WebP in editors; alpha kept; first frame only | transparency, frames | support |
| `/webp-to-jpg/` | WebP for Office/upload forms; alpha flattened | transparency, format table | support |
| `/avif-to-jpg/` | AVIF compatibility; decode depends on browser | format table, size bars | support |
| `/avif-to-png/` | AVIF with transparency into editors | transparency, format table | — |
| `/gif-to-png/` | still frame; 256-colour palette; 1-bit alpha | frames, format table | — |
| `/bmp-to-jpg/` | shrinking uncompressed bitmaps | size bars, format table | — |
| `/svg-to-png/` | rasterising vectors at a fixed size | vector vs pixels, format table | — |
| `/docx-to-pdf/` | text-only PDF of a Word file | pages, format table | — |
| `/docx-to-txt/` | raw text out of Word | pages, format table | — |
| `/pdf-to-txt/` | text layer extraction; no OCR | pages, flow | — |
| `/txt-to-pdf/` | monospace A4 layout of plain text | pages, format table | — |
| `/html-to-pdf/` | text of an HTML file, not a rendering | pages, format table | — |
| `/md-to-pdf/` | Markdown syntax stripped to plain text PDF | pages, format table | — |
| `/wav-to-mp3/` | 10× smaller for sharing; 192 kbps | size bars, waveform | — |
| `/wav-to-flac/` | lossless archive at about half size | size bars, format table | — |
| `/flac-to-mp3/` | portable copies; keep FLAC masters | waveform, size bars | support |
| `/mp3-to-wav/` | editing/PCM-only tools; no quality gain | flow, size bars | — |
| `/m4a-to-mp3/` | voice memos/iTunes audio for any player | flow, format table | support |
| `/m4a-to-wav/` | M4A into editors that want PCM | flow, size bars | — |
| `/aac-to-mp3/` | raw AAC streams; lossy-to-lossy | flow, format table | — |
| `/ogg-to-mp3/` | Vorbis audio for Apple devices and cars | flow, format table | support |
| `/mp4-to-mp3/` | audio extraction; video discarded | tracks, size bars | — |
| `/mp4-to-wav/` | uncompressed soundtrack for editing | tracks, size bars | — |
| `/mp4-to-webm/` | VP8/Opus for the web | tracks, format table | support |
| `/mov-to-mp4/` | iPhone video for everything else; re-encode | tracks, format table | support |
| `/mov-to-mp3/` | audio from iPhone/QuickTime recordings | tracks, flow | — |
| `/mkv-to-mp4/` | Matroska to device-friendly MP4; extra tracks dropped | tracks, format table | support |
| `/avi-to-mp4/` | legacy AVI to modern MP4 | tracks, format table | — |
| `/webm-to-mp4/` | browser recordings into editors/iPhones | tracks, format table | support |

## Format pages (34)

Keep the hand-written copy in `src/lib/seo/hubs/`. Layout change only:
H1, short description, tool; then "What is [FORMAT]?", "Converting
[FORMAT]", conversion links, use cases, FAQ. Nothing but the H1 and
description sits above the tool.

## Homepage

Already tool-first (H1, description, tool). No structural change.

## Batches

1. Framework: content types, graphics components, page template, tests.
2. Image pages (11) and image-to-PDF (2).
3. Document pages (6).
4. Audio pages (8).
5. Video pages (8).
6. Format-page layout, removal of the old content and template.

Each batch is verified in a browser: one H1, four H2s, no skipped heading
levels, tool above the first H2, no horizontal overflow on a phone, and a
real file converted on every page.

## Guide coverage batch

Every real conversion the tool supports now has its own guide: 140 pages in
total (images, documents, audio, video, fonts and archive-to-archive).
Source files live in `src/lib/seo/pages/` (`*-convert-*.ts`,
`font-archive-convert.ts`). Hub content for the added formats is in
`src/lib/seo/hubs/image-more.ts` and `hubs/more.ts`.

Pairs that only package a file into ZIP, TAR or GZ (for example JPG to ZIP)
stay tool-only: they are noindex and link back to the related pages, because
a guide for each would be the same text with the extension swapped.

Font routes TTF to OTF and OTF to TTF were removed: changing outline type is
a lossy rebuild the tool does not do, so only lossless WOFF wrapping and
unwrapping is offered.
