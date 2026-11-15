# Keyword research for page descriptions

The description under each H1 is written to rank for that page's keywords.
This file records what each page targets and how the choices were made.

## Method and limits

- **What was done:** for each kind of page I searched the main phrase
  ("png to jpg converter online free no upload", "mp4 to mp3 converter online
  free extract audio from video", and so on) and read how the results
  describe themselves: the phrases in their titles and snippets, the limits
  they state, and the audience they name.
- **What was not available:** search volume, keyword difficulty and click
  data. There is no Search Console or SEO-tool access in this project's
  environment, so no keyword is chosen by volume. Check Google Search Console
  after a few weeks and adjust the wording using real queries and impressions.
- **Pattern in the results:** pages that rank lead with
  "[format] to [format] converter" plus "online" and "free", then one concrete
  hook: an audience (iPhone, voice memos, screenshots), a benefit (keep
  transparency, smaller files, extract audio) or a limit (scanned PDFs need
  OCR). Large sites (Smallpdf, Adobe, Zamzar, ezgif) hold the broad terms.
  Small tools mostly compete with "no upload / private / in your browser", so
  specific hooks are the realistic way in.

## Rules used for every description

1. Lead with the primary keyword as a phrase: "Convert X to Y online for
   free". The H1 carries the "X to Y converter" variant, so both forms appear.
2. Add one or two secondary keywords that describe a real use or audience.
3. State "no upload" and "no sign-up", which is true for this site.
4. State the main limit when the conversion has one (transparency, text only,
   first frame). Claims must match what the converter does.
5. Two sentences, about 150 to 200 characters, so the description fits in
   three lines or fewer on a phone at the small text size.
6. No sentence repeats from another page (enforced by a test).

## Titles and meta descriptions

Rules applied to all 70 pages (enforced by tests in `src/test/`):

- **Title, 60 characters at most:** `[X] to [Y] Converter Online — [one hook]`,
  for example "M4A to MP3 Converter Online — Voice Memos, Free". The keyword
  comes first, "Online" is the modifier searchers use, and the hook is the
  specific benefit or audience. PDF to TXT uses "PDF to Text" because that is
  the more common phrase. No brand suffix, except on the homepage, because
  Google shows the site name separately.
- **Format pages:** "[FORMAT] Converter Online — Convert [FORMAT] to ..." and
  "Convert to [FORMAT] Online — [sources] to [FORMAT]".
- **Meta description, 120 to 160 characters:** repeats the keyword phrase, says
  "free" and "no upload or sign-up", names the main benefit and the main limit,
  and ends with a batch or size limit where that is useful. It is worded
  differently from the on-page description, so the two do not duplicate.
- Every title and meta description is unique across the site. The same text is
  used for the Open Graph and Twitter tags.

## Conversion pages

| Page | Primary keyword | Secondary keywords in the description |
|---|---|---|
| `/png-to-jpg/` | png to jpg converter | convert png to jpg, shrink screenshots, no upload, no sign-up |
| `/png-to-webp/` | png to webp converter | keep transparency, lighter website images |
| `/png-to-tiff/` | png to tiff converter | print, archive, publishing, uncompressed TIFF |
| `/jpg-to-png/` | jpg to png converter | lossless copy, edit without quality loss, jpeg |
| `/webp-to-png/` | webp to png converter | keep transparency, open in any editor, animated first frame |
| `/webp-to-jpg/` | webp to jpg converter | Word, email, upload forms, transparent becomes white |
| `/avif-to-jpg/` | avif to jpg converter | open AVIF on any device, browser support note |
| `/avif-to-png/` | avif to png converter | keep transparent background, editors, design tools |
| `/gif-to-png/` | gif to png converter | still image from a GIF, first frame |
| `/bmp-to-jpg/` | bmp to jpg converter | shrink large bitmap files, up to 20 files |
| `/svg-to-png/` | svg to png converter | transparent background, size from the SVG |
| `/jpg-to-pdf/` | jpg to pdf converter | photos, scans, receipts, forms and email |
| `/png-to-pdf/` | png to pdf converter | screenshots, forms and email |
| `/docx-to-pdf/` | docx to pdf converter | Word document text, plain PDF, limits stated |
| `/docx-to-txt/` | docx to txt converter | extract text from a Word document |
| `/pdf-to-txt/` | pdf to txt converter | pdf to text converter, extract text, OCR note |
| `/txt-to-pdf/` | txt to pdf converter | text file, printable A4, monospace |
| `/html-to-pdf/` | html to pdf converter | readable text of an HTML file, not rendered |
| `/md-to-pdf/` | markdown to pdf converter | .md file, plain-text PDF |
| `/wav-to-mp3/` | wav to mp3 converter | 192 kbps, about seven times smaller |
| `/wav-to-flac/` | wav to flac converter | lossless compression, about half the size |
| `/flac-to-mp3/` | flac to mp3 converter | 192 kbps, phones, cars, players |
| `/mp3-to-wav/` | mp3 to wav converter | audio editors, CD burning, uncompressed |
| `/m4a-to-mp3/` | m4a to mp3 converter | iPhone voice memos, iTunes audio, 192 kbps |
| `/m4a-to-wav/` | m4a to wav converter | uncompressed 16-bit, transcription tools |
| `/aac-to-mp3/` | aac to mp3 converter | raw .aac files, 192 kbps |
| `/ogg-to-mp3/` | ogg to mp3 converter | iPhones, cars, 192 kbps |
| `/mp4-to-mp3/` | mp4 to mp3 converter | extract audio from video, 192 kbps |
| `/mp4-to-wav/` | mp4 to wav converter | extract uncompressed audio from video |
| `/mp4-to-webm/` | mp4 to webm converter | VP8 video, Opus audio, websites |
| `/mov-to-mp4/` | mov to mp4 converter | iPhone and Mac videos, Windows, Android |
| `/mov-to-mp3/` | mov to mp3 converter | audio from iPhone and QuickTime video |
| `/mkv-to-mp4/` | mkv to mp4 converter | iPhones, TVs, editors, extra tracks dropped |
| `/avi-to-mp4/` | avi to mp4 converter | old videos on phones, TVs, browsers |
| `/webm-to-mp4/` | webm to mp4 converter | screen recordings, editors, iPhones |

## Format pages

| Type | Primary keyword pattern | Example |
|---|---|---|
| Source page `/png/` | "[format] converter" ("Free online PNG converter") | `/png/`, `/m4a/`, `/mov/` |
| Target page `/to-pdf/` | "convert to [format] online" | `/to-pdf/`, `/to-mp3/` |
| Homepage | "free online file converter" | `/` |

These do not target "[format] to [format]" phrases, which belong to the
conversion pages, so the two types do not compete for the same query.

## Next steps

- Compare these phrases with real queries in Search Console after two to four
  weeks and rewrite descriptions that attract impressions but few clicks.
- The meta descriptions (search result snippets) were not changed here; they
  can be tuned the same way once click data exists.
