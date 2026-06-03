import type { ConverterContentOverride } from '../../types';

export const PRIORITY_S_PAGES: Record<string, ConverterContentOverride> = {

  /* ─────────────────────────────────────────────────────────────────────────
     EXISTING PRIORITY PAGES (kept intact)
  ───────────────────────────────────────────────────────────────────────── */

  'heic-to-jpg': {
    title: 'HEIC to JPG Converter — Free, No Upload | FileConvertir',
    metaDescription: 'Convert HEIC to JPG free, online, with no upload. Works on Windows, Mac & Android. Open iPhone HEIC photos as JPG instantly — 100% private, no signup.',
    heading: 'HEIC to JPG Converter',
    description: 'Convert HEIC photos from your iPhone or iPad to JPG instantly — without uploading a single file to any server. Works on Windows, Mac, Android and Linux right in your browser.',
    longDescription: 'HEIC (High-Efficiency Image Container) is the default photo format on iPhones since iOS 11, but it isn\'t natively supported by Windows, most Android phones, Photoshop, or many websites and email clients. The fastest fix is to convert HEIC to JPG. FileConvertir does this entirely in your browser using WebAssembly — your photos never leave your device, there\'s no upload wait, no signup, and no file count or size limit beyond what your browser can handle. You can drop a single HEIC file or batch convert dozens of iPhone photos at once.',
    howToSteps: [
      { name: 'Drop your HEIC files', text: 'Drag and drop one or more .heic or .heif files into the converter above, or click "Select Files" to browse. You can upload up to 20 files at once.' },
      { name: 'JPG is already selected', text: 'The output format is preset to JPG. You don\'t have to configure anything — conversion starts the moment your files are added.' },
      { name: 'Conversion runs in your browser', text: 'Each HEIC file is decoded and re-encoded as JPG using your device\'s CPU. No file is ever uploaded to any server.' },
      { name: 'Download your JPGs', text: 'Click "Download" to save each converted JPG, or grab them all as a single ZIP archive.' },
    ],
    whyChooseUs: [
      { title: 'No upload — true privacy', text: 'Convertio, CloudConvert and most other tools upload your photos to their servers. FileConvertir does 100% of the work in your browser. Your photos never touch a server.' },
      { title: 'No signup, no limits', text: 'Convert as many HEIC files as you want, as often as you want. No account, no daily quota, no watermark, no paywall.' },
      { title: 'Works on every OS', text: 'Windows 10/11, macOS, Linux, Android, ChromeOS — anywhere you have a modern browser. No software install required.' },
      { title: 'Batch convert iPhone photo dumps', text: 'Convert your entire iPhone photo export at once instead of one at a time.' },
    ],
    faqs: [
      { q: 'How do I convert HEIC to JPG on Windows for free?', a: 'Open FileConvertir.com in any browser (Chrome, Edge, Firefox), drop your HEIC files into the converter, and download the converted JPGs. No software install, no Microsoft Store HEIF Image Extension purchase needed.' },
      { q: 'How do I convert HEIC to JPG on Mac without losing quality?', a: 'Drop your HEIC files into FileConvertir. Conversion uses your browser\'s native image decoder which preserves the full source resolution. The JPG is saved at quality 92, which is visually indistinguishable from the original.' },
      { q: 'Are my iPhone photos uploaded to your server?', a: 'No. Every byte stays on your device. The conversion runs locally in your browser using WebAssembly — there is no upload, no server-side storage, and nothing is logged. You can verify this by opening DevTools → Network and watching that no file transfer happens during conversion.' },
      { q: 'Why are my iPhone photos saved as HEIC instead of JPG?', a: 'Apple switched the default to HEIC in iOS 11 because the format is roughly 50% smaller than JPG at the same quality. The downside: HEIC isn\'t supported by Windows, most older apps, and many websites. Converting to JPG fixes that.' },
      { q: 'Can I batch convert HEIC photos to JPG?', a: 'Yes. You can drop up to 20 HEIC files at once. They all get converted in parallel and you can download them individually or as a single ZIP file.' },
      { q: 'Does the converter work offline?', a: 'After the page has loaded once, conversions work even if you go offline. The conversion logic runs entirely in your browser — no internet connection is needed once the page is loaded.' },
      { q: 'Will the JPG file size be larger than the HEIC original?', a: 'Yes, usually about 1.5–2× larger. That\'s the trade-off for HEIC\'s superior compression. If file size matters, consider converting to WebP instead — it\'s smaller than JPG with similar quality.' },
      { q: 'What\'s the maximum HEIC file size I can convert?', a: 'Up to 100MB per file. Modern iPhones produce HEIC files of 1–4MB each, so this is plenty for normal use.' },
      { q: 'Will EXIF metadata (date, location) be preserved?', a: 'Basic image data is preserved, but some EXIF metadata may be stripped during conversion for privacy. If you need full metadata preservation for professional workflows, use a desktop tool.' },
      { q: 'Is FileConvertir really free?', a: 'Yes — completely free, forever, with no limits. No signup, no email required, no ads inside the converter, no paid tier.' },
    ],
    useCases: [
      'Open iPhone photos on Windows without installing the HEIF Image Extension',
      'Share HEIC photos with Android users or via email clients that reject .heic files',
      'Upload iPhone photos to websites, social platforms, and CMSs that only accept JPG',
      'Batch convert an entire iCloud photo export from HEIC to JPG in one session',
    ],
  },

  'avif-to-jpg': {
    title: 'AVIF to JPG Converter — Free, No Upload | FileConvertir',
    metaDescription: 'Convert AVIF to JPG free online — no upload, no signup, 100% private. Fix AVIF compatibility instantly in your browser. Works on Windows, Mac, Android.',
    heading: 'AVIF to JPG Converter',
    description: 'Convert AVIF (AV1 Image File Format) images to JPG instantly. AVIF is great for the web but unsupported by older apps, email clients, and many devices. This converter fixes that without uploading anything.',
    longDescription: 'AVIF is a next-generation image format based on the AV1 video codec. It produces dramatically smaller files than JPG, PNG, or WebP at the same quality, which is why Google, Netflix and Cloudflare have adopted it. The catch: not every program supports it yet — older versions of Photoshop, Microsoft Word, many email clients, social media uploaders, and Windows 10 (without an extension) can\'t open AVIF. Converting to JPG is the universal fix. FileConvertir runs the entire conversion in your browser using WebAssembly, so nothing ever uploads to a server.',
    howToSteps: [
      { name: 'Drop your AVIF files', text: 'Drag your .avif files into the converter or click "Select Files". Supports batch conversion of up to 20 files at once.' },
      { name: 'JPG is preselected', text: 'The output is already set to JPG, so conversion starts immediately when files are added.' },
      { name: 'Local in-browser conversion', text: 'Files are decoded by your browser\'s native AVIF decoder and re-encoded as JPG. Nothing leaves your device.' },
      { name: 'Download your JPGs', text: 'Save each JPG individually or download all of them as a single ZIP file.' },
    ],
    whyChooseUs: [
      { title: 'Files never leave your device', text: 'Most other converters upload your image to their server. We do everything in-browser — true privacy.' },
      { title: 'Modern AVIF decoder', text: 'Uses your browser\'s built-in AVIF decoder (Chrome 85+, Firefox 93+, Safari 16+) for fast, accurate conversion.' },
      { title: 'No signup, no limits, no watermark', text: 'Convert as many AVIF files as you need. No daily quota, no paywall, no email required.' },
    ],
    faqs: [
      { q: 'Why won\'t Photoshop or Windows open my AVIF file?', a: 'AVIF support is still rolling out. Photoshop added native AVIF support in version 25.x; older versions need a plugin. Windows 11 supports AVIF natively, but Windows 10 needs the AV1 Video Extension from the Microsoft Store. Converting to JPG bypasses all of these issues.' },
      { q: 'Will I lose quality converting AVIF to JPG?', a: 'Some quality loss is inherent because JPG is less efficient than AVIF. FileConvertir saves the JPG at quality 92, which is visually indistinguishable for almost all photos. Sharp edges and graphics may show slight artifacts.' },
      { q: 'Are my files uploaded to a server?', a: 'No. The conversion runs 100% in your browser using WebAssembly — nothing is ever uploaded.' },
      { q: 'Can I convert AVIF to JPG in bulk?', a: 'Yes — up to 20 files at once. Drop the whole folder and download the converted JPGs as a ZIP.' },
      { q: 'Will the JPG be larger than the AVIF original?', a: 'Yes, typically 3–5× larger. AVIF is significantly more efficient than JPG. If file size is critical and you control the destination, consider keeping AVIF or using WebP.' },
      { q: 'Does this work on iPhone or Android?', a: 'Yes — works in any modern mobile browser. On iPhone use Safari 16+ or Chrome.' },
      { q: 'What\'s the max file size?', a: '100MB per file, which is far more than typical AVIF images.' },
    ],
    useCases: [
      'Open AVIF images in Photoshop (older versions), Lightroom, or GIMP that lack AVIF support',
      'Fix AVIF files saved from Chrome browser screenshots or web-downloaded images',
      'Share AVIF web images with colleagues whose email clients reject the format',
      'Convert website AVIF assets to JPG for offline editing in legacy design tools',
    ],
  },

  'm4a-to-mp3': {
    title: 'M4A to MP3 Converter — Free, No Upload | FileConvertir',
    metaDescription: 'Convert M4A to MP3 free online — no upload, 100% private. Works with iPhone voice memos, Apple Music & iTunes audio. Browser-based, no signup.',
    heading: 'M4A to MP3 Converter',
    description: 'Convert M4A audio files to MP3 instantly in your browser. Perfect for iPhone voice memos, Apple Music exports, podcast files, and audio that won\'t play in older media players or car stereos.',
    longDescription: 'M4A is Apple\'s audio container format (typically holding AAC-encoded audio). It\'s used for iPhone voice memos, Apple Music downloads, GarageBand exports, and iTunes Store purchases. The problem: many older devices, Bluetooth speakers, car stereos, Windows Media Player, and audio editors don\'t support M4A but every device on Earth supports MP3. FileConvertir converts M4A to MP3 right in your browser using FFmpeg.wasm. No upload, no signup, no quality loss beyond the unavoidable lossy-to-lossy re-encoding.',
    howToSteps: [
      { name: 'Drop your M4A files', text: 'Drag and drop your .m4a files into the converter, or click "Select Files". Batch up to 20 files at a time.' },
      { name: 'MP3 is preselected', text: 'Conversion starts immediately as soon as files are added — no settings to change.' },
      { name: 'FFmpeg runs in your browser', text: 'FFmpeg.wasm decodes the M4A and re-encodes it as 192 kbps MP3 entirely on your device. Nothing is uploaded.' },
      { name: 'Download your MP3s', text: 'Save each MP3 individually or grab all of them as a single ZIP archive.' },
    ],
    whyChooseUs: [
      { title: 'No upload — your audio is private', text: 'Most M4A-to-MP3 converters upload your audio to their server. FileConvertir runs entirely in your browser using WebAssembly.' },
      { title: 'High-quality 192 kbps output', text: 'Default bitrate is 192 kbps which preserves audio fidelity well for music, voice memos and podcasts.' },
      { title: 'Works in every modern browser', text: 'Chrome, Edge, Firefox, Safari — desktop and mobile. Note: requires SharedArrayBuffer support, which all modern browsers have.' },
    ],
    faqs: [
      { q: 'How do I convert iPhone voice memos to MP3?', a: 'Export the voice memo from the Voice Memos app (Share → Save to Files), then drop the .m4a file into FileConvertir. The MP3 is ready in seconds.' },
      { q: 'Can I convert Apple Music or iTunes M4A to MP3?', a: 'Yes for unprotected M4A files (your own recordings, free songs, podcast files). DRM-protected M4P files from older iTunes Store purchases cannot be converted by any browser tool — that\'s a deliberate Apple restriction.' },
      { q: 'Are my audio files uploaded to a server?', a: 'No. FFmpeg runs in your browser via WebAssembly — your files never leave your device. There is no upload, no logging, and no server-side storage.' },
      { q: 'What bitrate is the MP3?', a: 'The MP3 is encoded at 192 kbps CBR, which is high quality for music and excellent for voice. This roughly matches the perceptual quality of the M4A source.' },
      { q: 'Will I lose audio quality?', a: 'Some quality loss is unavoidable when converting between two lossy formats (M4A/AAC → MP3). At 192 kbps the loss is inaudible to most listeners on most playback equipment.' },
      { q: 'Why won\'t my car stereo play M4A files?', a: 'Many car stereos and older Bluetooth speakers only support MP3 and WMA. Converting to MP3 fixes the playback issue.' },
      { q: 'Can I batch convert M4A to MP3?', a: 'Yes — up to 20 files at once. Drop them in, wait a moment, download the ZIP.' },
      { q: 'How long does it take?', a: 'Roughly real-time on a modern laptop — a 3-minute song converts in about 3 seconds. First conversion takes a bit longer because FFmpeg.wasm has to load.' },
      { q: 'What\'s the max file size?', a: '100MB per file. A typical 1-hour podcast at 192 kbps is around 86MB, so this fits.' },
    ],
    useCases: [
      'Convert iPhone voice memos to MP3 for sharing via messaging apps or email',
      'Play Apple Music or GarageBand exports on car stereos and Bluetooth speakers that reject M4A',
      'Import M4A recordings into audio editors like Audacity that work better with MP3',
      'Upload M4A podcast episodes to hosting platforms that require MP3 format',
    ],
  },

  'mov-to-mp4': {
    title: 'MOV to MP4 Converter — Free, No Upload | FileConvertir',
    metaDescription: 'Convert MOV to MP4 free online — no upload, 100% private. Fix QuickTime video compatibility on Windows, Android & social media. Browser-based, no signup.',
    heading: 'MOV to MP4 Converter',
    description: 'Convert Apple QuickTime MOV videos to universally compatible MP4 instantly in your browser. Fix playback on Windows, Android, social media uploaders, and video editors that reject MOV.',
    longDescription: 'MOV is Apple\'s QuickTime container, used by iPhone, iPad, Mac screen recordings and Final Cut Pro. While modern Windows can play MOV, many video editors, social platforms (older TikTok, some Instagram tools), Android apps, and Bluetooth/cast receivers only accept MP4. Converting MOV to MP4 is a container repackage — usually no re-encoding is needed because both formats commonly use H.264 or HEVC video. FileConvertir runs FFmpeg.wasm in your browser to do this with zero upload, zero signup, and full privacy.',
    howToSteps: [
      { name: 'Drop your MOV file', text: 'Drag and drop your .mov video into the converter or click "Select Files".' },
      { name: 'MP4 is preselected', text: 'The output is already set to MP4 — conversion begins automatically when the file is added.' },
      { name: 'Browser-based FFmpeg conversion', text: 'FFmpeg.wasm processes your video in-browser. Nothing is ever uploaded to a server.' },
      { name: 'Download your MP4', text: 'Save the converted MP4 to your device as soon as it\'s ready.' },
    ],
    whyChooseUs: [
      { title: 'No upload, no waiting', text: 'Most online MOV converters upload the entire video, then queue it server-side. FileConvertir starts converting immediately, with no upload step at all.' },
      { title: 'No quality loss when possible', text: 'For MOV files using H.264/HEVC video and AAC audio, FFmpeg simply re-wraps the streams into an MP4 container — no re-encoding, no quality loss, and very fast.' },
      { title: '100% private', text: 'Your video never leaves your device. There is no server-side storage, no upload log, nothing.' },
    ],
    faqs: [
      { q: 'Why won\'t Windows or Android play my MOV file?', a: 'Modern Windows 10/11 can play many MOV files via the built-in HEVC extension, but it\'s unreliable. Android requires a third-party player. Converting to MP4 makes the video play natively everywhere.' },
      { q: 'Will I lose video quality converting MOV to MP4?', a: 'Usually no. If the MOV uses H.264 or HEVC video and AAC audio (which is typical for iPhone recordings), FFmpeg can re-wrap the streams without re-encoding — this is lossless.' },
      { q: 'Are my videos uploaded to your server?', a: 'No. FFmpeg.wasm runs in your browser. The video stays on your device the entire time.' },
      { q: 'How long does conversion take?', a: 'For container-only repackaging (the common case): a 1-minute video converts in 2–5 seconds. For files needing re-encoding, expect roughly 0.5–1× real-time.' },
      { q: 'What\'s the maximum video file size?', a: '100MB per file. For larger videos, use a desktop tool like HandBrake.' },
      { q: 'Why does my iPhone export videos as MOV instead of MP4?', a: 'iPhone records in MOV by default because it\'s Apple\'s native container. Both MOV and MP4 can hold the same H.264/HEVC video — converting is mostly a relabeling operation.' },
      { q: 'Can I convert MOV to MP4 on iPhone or Android?', a: 'Yes — open FileConvertir.com in mobile Safari or Chrome, upload your video from the camera roll, and download the converted MP4. All processing happens on your phone.' },
    ],
    useCases: [
      'Play iPhone and Mac screen recordings on Windows PCs, Android phones, and Smart TVs',
      'Upload MOV videos to social media platforms, presentation tools, and CMSs that require MP4',
      'Share QuickTime recordings with colleagues who use non-Apple devices',
      'Fix MOV files rejected by video editors, messaging apps, and media players',
    ],
  },

  'tiff-to-jpg': {
    title: 'TIFF to JPG Converter — Free, No Upload | FileConvertir',
    metaDescription: 'Convert TIFF to JPG free online — no upload, 100% private. Shrink huge TIFF files for email & web. Browser-based, no signup, no quality limits.',
    heading: 'TIFF to JPG Converter',
    description: 'Convert TIFF (and TIF) images to JPG instantly in your browser. Perfect for shrinking huge scanned documents, photographer proofs, and print-quality TIFFs into web/email-friendly JPGs.',
    longDescription: 'TIFF is the standard format for high-quality scanning, professional photography, and print production. The downside: TIFF files are massive (often 50–500MB) and most websites, email clients, social platforms, and messaging apps reject them. Converting to JPG can reduce file size by 90–95% while keeping near-identical visual quality. FileConvertir converts TIFF to JPG entirely in your browser — no upload, no waiting on a slow server, no privacy worries about your scanned documents.',
    howToSteps: [
      { name: 'Drop your TIFF files', text: 'Drag and drop your .tiff or .tif files into the converter, or click "Select Files". You can batch up to 20 files at a time.' },
      { name: 'JPG is preselected', text: 'No settings to change — the output is already set to JPG.' },
      { name: 'Local in-browser conversion', text: 'Each TIFF is decoded and re-encoded as JPG locally using your browser. Nothing is uploaded.' },
      { name: 'Download your JPGs', text: 'Save individually or download the whole batch as a ZIP.' },
    ],
    whyChooseUs: [
      { title: 'Handles huge TIFFs without uploading', text: 'A 200MB TIFF takes minutes to upload on most connections. FileConvertir skips that entirely — conversion starts immediately on your device.' },
      { title: 'Private — perfect for scanned documents', text: 'Sensitive scans (contracts, IDs, medical records) never leave your device. No server-side storage, no logging.' },
      { title: 'Massive file-size reduction', text: 'Typical TIFF → JPG saves 90–95% file size with no visible quality loss for most images.' },
    ],
    faqs: [
      { q: 'Why are my scanned documents in TIFF format?', a: 'Scanners default to TIFF because it\'s lossless and supports multi-page documents. The downside is huge file sizes that can\'t be emailed or uploaded easily.' },
      { q: 'Will I lose quality converting TIFF to JPG?', a: 'JPG is lossy, but at quality 92 (our default) the difference is invisible to the human eye for almost all photos and documents. The trade-off is dramatically smaller file size.' },
      { q: 'Are my files uploaded to your server?', a: 'No. Everything runs in your browser. Especially important for sensitive scanned documents like IDs or contracts — they never leave your device.' },
      { q: 'Can I convert multi-page TIFF files?', a: 'Currently the converter handles the first page of multi-page TIFFs. For multi-page documents, consider converting the TIFF to PDF instead.' },
      { q: 'How much smaller will the JPG be?', a: 'Typically 90–95% smaller. A 100MB TIFF often becomes a 5–10MB JPG with no visible difference.' },
      { q: 'What\'s the max TIFF file size?', a: '100MB per file. For larger TIFFs (e.g., 600 DPI archive scans), use a desktop tool.' },
      { q: 'Will TIFF metadata be preserved?', a: 'Basic image data is preserved. Some TIFF-specific metadata (like custom tags from professional scanners) may be stripped during conversion.' },
    ],
    useCases: [
      'Shrink large scanner TIFF exports to email-friendly JPG without losing visible quality',
      'Convert photographer RAW-to-TIFF exports for web publishing and social sharing',
      'Reduce massive print-production TIFFs for preview sharing with clients',
      'Batch convert archival TIFF scans to JPG for web gallery display',
    ],
  },

  'webp-to-png': {
    title: 'WebP to PNG Converter — Free, No Upload | FileConvertir',
    metaDescription: 'Convert WebP to PNG free online — no upload, 100% private. Preserve transparency. Fix WebP compatibility instantly. Browser-based, no signup.',
    heading: 'WebP to PNG Converter',
    description: 'Convert WebP images to PNG instantly while preserving transparency. Perfect when an app, editor, or website rejects WebP files. All conversion happens in your browser.',
    longDescription: 'WebP is Google\'s modern image format with excellent compression, but support is uneven — many image editors (older Photoshop versions, MS Paint), Office documents, email signatures, and design tools still reject WebP. Converting to PNG fixes the compatibility issue while preserving transparency and lossless quality. FileConvertir converts WebP to PNG entirely in your browser, with no upload to any server.',
    howToSteps: [
      { name: 'Drop your WebP files', text: 'Drag your .webp files into the converter or click "Select Files". Batch up to 20 files at once.' },
      { name: 'PNG is preselected', text: 'No settings to configure — the output is already set to PNG.' },
      { name: 'Local browser conversion', text: 'Each WebP is decoded and re-encoded as PNG using your browser\'s built-in image decoder. Nothing leaves your device.' },
      { name: 'Download your PNGs', text: 'Save individually or download the entire batch as a single ZIP file.' },
    ],
    whyChooseUs: [
      { title: 'Preserves transparency', text: 'Both WebP and PNG support transparent backgrounds. The conversion preserves the alpha channel pixel-for-pixel.' },
      { title: 'No upload — files stay on your device', text: 'Most other tools upload your image to their server. FileConvertir does everything locally.' },
      { title: 'Lossless conversion', text: 'PNG is a lossless format, so no compression artifacts are introduced during conversion.' },
    ],
    faqs: [
      { q: 'Why won\'t Photoshop or MS Paint open my WebP?', a: 'Photoshop added native WebP support in version 23.2 (2022); older versions need a plugin. MS Paint, Office, and many email clients still don\'t support WebP. Converting to PNG fixes that.' },
      { q: 'Will transparency be preserved?', a: 'Yes — both WebP and PNG support full alpha transparency. Your transparent backgrounds are preserved exactly.' },
      { q: 'Are my files uploaded to a server?', a: 'No. The conversion runs 100% in your browser. Files never leave your device.' },
      { q: 'Will the PNG be larger than the WebP?', a: 'Yes, usually 2–4× larger because PNG is lossless and WebP has more efficient compression. That\'s the trade-off for compatibility.' },
      { q: 'Will quality be lost?', a: 'No — PNG is lossless. The output is pixel-identical to the WebP source image.' },
      { q: 'Why did websites switch to WebP in the first place?', a: 'WebP files are typically 25–35% smaller than equivalent JPG/PNG, which speeds up websites. Google Search even uses WebP support as a ranking signal indirectly via Core Web Vitals.' },
      { q: 'Can I convert animated WebP?', a: 'Currently only the first frame of an animated WebP is converted. For animations, convert to GIF instead.' },
      { q: 'What\'s the max file size?', a: '100MB per file, which is far more than typical WebP images need.' },
    ],
    useCases: [
      'Open WebP images saved from Chrome, Firefox, or Edge in Photoshop, GIMP, or MS Paint',
      'Use WebP graphics from websites in Office documents, email signatures, and design tools',
      'Convert website screenshot WebP images to PNG for editing and sharing',
      'Preserve transparent WebP logos and icons as PNG for use in presentations',
    ],
  },

  /* ─────────────────────────────────────────────────────────────────────────
     NEW PRIORITY PAGES — IMAGE CONVERSIONS
  ───────────────────────────────────────────────────────────────────────── */

  'webp-to-jpg': {
    title: 'WebP to JPG Converter — Free, No Upload | FileConvertir',
    metaDescription: 'Convert WebP to JPG free online — no upload, no signup, 100% private. Fix WebP compatibility with email clients, Word & older Photoshop. Works on Windows, Mac, mobile.',
    heading: 'WebP to JPG Converter',
    description: 'Convert WebP images to JPG instantly in your browser. Ideal when email clients, Office apps, or older software rejects WebP files. No upload, no signup — completely private.',
    longDescription: 'WebP files are everywhere on the modern web — Chrome saves screenshots as WebP, websites serve WebP images for speed, and many tools export it by default. The problem: Microsoft Word, Outlook, older Photoshop versions, many CMS platforms, and countless email clients still don\'t accept WebP attachments or inline images. Converting WebP to JPG gives you a universally compatible file that works everywhere. FileConvertir processes all conversion in your browser — the files stay on your device, conversion starts instantly, and there\'s no file size penalty from upload queues.',
    howToSteps: [
      { name: 'Drop your WebP files', text: 'Drag one or more .webp files into the converter above, or click "Select Files" to browse. Batch up to 20 files at once.' },
      { name: 'JPG is preselected', text: 'The output is already set to JPG. Conversion begins automatically once files are added — no format selection needed.' },
      { name: 'Browser decodes and re-encodes', text: 'Your browser decodes the WebP using its built-in decoder and re-encodes as high-quality JPG. No data is sent to any server.' },
      { name: 'Download the JPGs', text: 'Save each JPG file individually, or download all results as a single ZIP archive.' },
    ],
    whyChooseUs: [
      { title: 'Zero upload — instant start', text: 'Cloud converters make you wait for upload, then processing. FileConvertir starts converting immediately because everything runs in your browser.' },
      { title: 'Works with web-downloaded WebP images', text: 'Chrome and Edge often save images as WebP. Drop those files here and get a JPG that opens in any program.' },
      { title: 'No account, no daily limits', text: 'Convert as many WebP files as you need. No signup, no daily quota, no watermark added to results.' },
    ],
    faqs: [
      { q: 'Why can\'t I insert a WebP image into Microsoft Word?', a: 'Microsoft Word and Outlook use Windows\' built-in image codecs, which historically didn\'t include WebP. Newer versions of Office 365 on Windows 11 have added WebP support, but it remains inconsistent. Converting to JPG guarantees compatibility across all Office versions.' },
      { q: 'Will I lose quality converting WebP to JPG?', a: 'Some loss is possible because JPG is lossy, but FileConvertir saves the JPG at quality 92 — high enough that the difference is invisible to the human eye for photos and most web images. If the source WebP was already lossy (most are), the additional loss is minimal.' },
      { q: 'What about transparent WebP images?', a: 'JPG doesn\'t support transparency. If your WebP has a transparent background, the JPG will have a white background. If preserving transparency matters, convert to PNG instead.' },
      { q: 'Are my files uploaded to your server?', a: 'No. The conversion runs entirely in your browser using the Canvas API. Your images never leave your device.' },
      { q: 'Why does Chrome save screenshots as WebP?', a: 'Chrome uses WebP by default for screenshots and "Save image as" in newer versions because it produces smaller files. Unfortunately this creates compatibility issues with non-Chrome software.' },
      { q: 'Will the JPG be bigger than the WebP?', a: 'Yes, typically 1.5–3× larger, because WebP has better compression than JPG. That\'s the trade-off for universal compatibility.' },
      { q: 'Can I batch convert multiple WebP files?', a: 'Yes — drop up to 20 WebP files at once. They convert in parallel and you can download them individually or as a ZIP.' },
      { q: 'Does this work on iPhone and Android?', a: 'Yes — use Safari or Chrome on mobile. Image conversion is fast even on phones.' },
    ],
    useCases: [
      'Insert web-downloaded WebP images into Microsoft Word, PowerPoint, or Outlook',
      'Fix WebP images that email clients display as attachments instead of inline',
      'Convert WebP screenshots from Chrome for use in design tools and presentations',
      'Upload WebP product photos to e-commerce platforms or CMS that require JPG',
    ],
  },

  'avif-to-png': {
    title: 'AVIF to PNG Converter — Free, Preserves Transparency | FileConvertir',
    metaDescription: 'Convert AVIF to PNG free online — no upload, no signup, preserves transparency. Fix AVIF compatibility in Photoshop, Figma & design tools. Works on Windows, Mac, mobile.',
    heading: 'AVIF to PNG Converter',
    description: 'Convert AVIF images to PNG instantly while keeping transparent backgrounds. Ideal when design tools, editors, or CMS platforms can\'t open AVIF files. 100% in-browser, no upload.',
    longDescription: 'AVIF has been adopted by Chrome, Safari, and major CDNs as the next-generation image format, but design tool support is still catching up. Figma, older versions of Photoshop, Affinity Photo, GIMP on some platforms, and most image editing plugins still can\'t open AVIF files. PNG is the universal lossless format that every tool accepts, and — crucially — it preserves transparency pixel-for-pixel, unlike JPG. FileConvertir converts AVIF to PNG directly in your browser using the browser\'s native AVIF decoder, with no upload, no software install, and no account required.',
    howToSteps: [
      { name: 'Drop your AVIF files', text: 'Drag your .avif files into the converter or click "Select Files". Add up to 20 files for batch conversion.' },
      { name: 'Select PNG as output', text: 'Choose PNG from the output format selector. Both lossy and lossless AVIF files are supported.' },
      { name: 'Browser decodes locally', text: 'Your browser\'s built-in AVIF decoder processes the image. The PNG is created on your device — nothing is uploaded.' },
      { name: 'Download your PNGs', text: 'Save each converted PNG or download them all in a ZIP. Transparent backgrounds are fully preserved.' },
    ],
    whyChooseUs: [
      { title: 'Transparency preserved exactly', text: 'AVIF supports alpha channels, and PNG preserves them perfectly. Unlike JPG conversion, your transparent logos, icons, and UI elements stay transparent.' },
      { title: 'Uses the browser\'s native AVIF decoder', text: 'Chrome (v85+), Firefox (v93+), and Safari (v16+) have built-in AVIF support. FileConvertir uses this directly — no third-party library needed for fast, accurate conversion.' },
      { title: 'No limits, no watermarks', text: 'Free for unlimited conversions. No account, no daily quota, no visible watermark on results.' },
    ],
    faqs: [
      { q: 'Can Photoshop open AVIF files?', a: 'Photoshop CC 2023 (version 25.x) and later added native AVIF support. Older versions need a free plugin from the Adobe Marketplace. Lightroom Classic added AVIF support in version 11.4. If you\'re on an older version, converting to PNG first is the easiest fix.' },
      { q: 'Does converting AVIF to PNG lose quality?', a: 'If the source AVIF was lossless, the PNG output is also lossless — no quality loss at all. If the source AVIF was lossy (the more common web format), the PNG preserves the decoded pixel data exactly — no additional loss is introduced.' },
      { q: 'Will transparent AVIF backgrounds be preserved in the PNG?', a: 'Yes, completely. Both AVIF and PNG support full alpha transparency. The converter preserves the alpha channel pixel-for-pixel.' },
      { q: 'Can Figma open AVIF files?', a: 'As of mid-2025, Figma doesn\'t natively import AVIF files. Converting to PNG first is the recommended workaround for Figma, Sketch, and most web design tools.' },
      { q: 'Are my files uploaded to a server?', a: 'No. AVIF to PNG conversion uses your browser\'s built-in image decoder. Files are never uploaded, stored, or logged.' },
      { q: 'Why is the PNG much larger than the AVIF?', a: 'AVIF has excellent compression — typically 3–5× better than PNG. The PNG is larger because it\'s lossless and stores every pixel uncompressed. This is the trade-off for full compatibility and transparent background support.' },
      { q: 'What browsers support this converter?', a: 'Any browser with AVIF support: Chrome 85+, Firefox 93+, Safari 16+, Edge 85+. If your browser doesn\'t support AVIF, you\'ll see a decode error.' },
      { q: 'Can I convert multiple AVIF files at once?', a: 'Yes — up to 20 files per batch. Results download individually or as a single ZIP.' },
    ],
    useCases: [
      'Open AVIF images from the web in Figma, Photoshop, or Affinity Photo for editing',
      'Preserve transparent AVIF logos and UI elements when converting for cross-tool use',
      'Fix AVIF images downloaded from CDNs or web scrapers that can\'t be opened in design software',
      'Convert AVIF icons and sprites to PNG for use in game engines, Electron apps, or Android projects',
    ],
  },

  'svg-to-png': {
    title: 'SVG to PNG Converter — Free, Custom Resolution | FileConvertir',
    metaDescription: 'Convert SVG to PNG free online — no upload, no signup. Export SVG logos & icons as PNG at any resolution. Preserves transparency. Works on Windows, Mac, mobile.',
    heading: 'SVG to PNG Converter',
    description: 'Convert SVG vector files to PNG raster images at the resolution you need. Perfect for exporting logos, icons, and illustrations to use in Word, PowerPoint, social media, and apps that can\'t display SVG.',
    longDescription: 'SVG (Scalable Vector Graphics) is perfect for logos and icons — infinitely scalable, tiny file size. The problem is that most non-web software can\'t display SVG: Microsoft Word, PowerPoint, Outlook, Android XML drawables, video editors, many email clients, and countless apps require PNG. FileConvertir exports your SVG to PNG directly in your browser using the Canvas API, which means the SVG is rasterized at browser resolution without any upload. Transparency is fully preserved in the output PNG, so your transparent logo stays transparent.',
    howToSteps: [
      { name: 'Drop your SVG files', text: 'Drag and drop your .svg files into the converter, or click "Select Files". Supports batch conversion of up to 20 files.' },
      { name: 'Select PNG as output', text: 'Choose PNG from the output format selector. The SVG is rendered at its native dimensions.' },
      { name: 'Browser rasterizes the SVG', text: 'Your browser\'s Canvas API draws the SVG and exports a PNG. Nothing is uploaded — all rendering happens locally.' },
      { name: 'Download your PNGs', text: 'Save each PNG individually or download all as a single ZIP. Transparency is preserved.' },
    ],
    whyChooseUs: [
      { title: 'Transparent backgrounds preserved', text: 'SVG logos and icons with transparent backgrounds export to PNG with transparency intact. No white box added around your logo.' },
      { title: 'Uses the browser\'s native SVG renderer', text: 'Your browser renders the SVG exactly as it would display on a webpage — the most accurate SVG-to-PNG rendering method.' },
      { title: 'No Inkscape or Illustrator needed', text: 'Convert SVG to PNG without installing any software. Works in any modern browser on Windows, Mac, Linux, Android, or iOS.' },
    ],
    faqs: [
      { q: 'Why can\'t Word or PowerPoint display my SVG?', a: 'Office 365 on Windows added limited SVG support in 2018, but it\'s unreliable and doesn\'t support all SVG features. Older Office versions have no SVG support at all. Converting to PNG guarantees your logo or icon displays correctly in all Office versions.' },
      { q: 'Will transparency be preserved in the PNG?', a: 'Yes. If your SVG has a transparent background (no fill on the root element), the exported PNG will also have a transparent background — perfect for logo use.' },
      { q: 'What resolution is the PNG?', a: 'The PNG is rasterized at the SVG\'s native width and height. If your SVG is 500×500, the PNG will be 500×500 pixels. For higher resolution exports, edit the SVG\'s width/height attributes before converting.' },
      { q: 'Are my SVG files uploaded to a server?', a: 'No. The browser\'s Canvas API handles all rendering locally. Your SVG files are never transmitted anywhere.' },
      { q: 'Why is my SVG showing as a blank PNG?', a: 'Some SVGs use external fonts or relative paths that the browser can\'t resolve offline. Try opening the SVG in a text editor and ensuring all fonts and images are embedded (base64 encoded) or referenced by absolute URL.' },
      { q: 'Can I convert animated SVGs?', a: 'The converter rasterizes a single frame of animated SVGs (the initial state). For animation export, you\'d need a specialized tool.' },
      { q: 'Does this work for SVG icons downloaded from icon libraries?', a: 'Yes — icons from Heroicons, Feather, Font Awesome, Lucide, and similar libraries convert cleanly. Make sure the SVG has a defined width and height or viewBox attribute.' },
      { q: 'Can I batch convert SVG files?', a: 'Yes — up to 20 SVGs at once. They all export to separate PNG files that you can download as a ZIP.' },
    ],
    useCases: [
      'Export SVG logos to PNG for use in Microsoft Word, PowerPoint, and email signatures',
      'Prepare SVG icons as PNG for Android XML drawables and iOS app assets',
      'Convert SVG illustrations to PNG for uploading to social media and e-commerce platforms',
      'Export SVG wireframes and mockups to PNG for sharing with stakeholders who don\'t have design tools',
    ],
  },

  'png-to-pdf': {
    title: 'PNG to PDF Converter — Free, Multiple Pages | FileConvertir',
    metaDescription: 'Convert PNG to PDF free online — no upload, no signup. Combine multiple PNG images into one PDF document. Works on Windows, Mac & mobile. 100% private.',
    heading: 'PNG to PDF Converter',
    description: 'Convert PNG images to PDF — combine multiple screenshots, scans, or photos into a single PDF document. Everything runs in your browser. No upload, no account required.',
    longDescription: 'Whether you\'re combining screenshots into a report, packaging signed form photos as a PDF, or turning a sequence of images into a presentable document, PNG to PDF is a daily need. FileConvertir handles this entirely client-side using jsPDF — your images never leave your browser. Each PNG is embedded into the PDF at its full resolution, with no compression beyond what\'s needed to fit the page. Multi-image batches are combined into a single PDF with one image per page, making it easy to deliver a professional document from a set of screenshots.',
    howToSteps: [
      { name: 'Add your PNG files', text: 'Drag and drop one or more .png files into the converter, or click "Select Files". Up to 20 images per batch.' },
      { name: 'Select PDF as output', text: 'Choose PDF from the output format dropdown. Images are added to the PDF in the order they appear.' },
      { name: 'PDF is built in your browser', text: 'jsPDF assembles the PDF entirely on your device — no server, no upload, no cloud.' },
      { name: 'Download the PDF', text: 'Save the finished PDF file. Multiple PNGs become a single multi-page PDF.' },
    ],
    whyChooseUs: [
      { title: 'Multiple images → one PDF document', text: 'Drop several PNG screenshots or scans at once. They become a single PDF with one image per page — ready to email or print.' },
      { title: 'Sensitive images stay private', text: 'Screenshots of documents, financial statements, or forms never touch a server. All processing is local.' },
      { title: 'No account, no limits, free', text: 'Convert as many PNG files to PDF as you need. No signup, no daily cap, no watermark added.' },
    ],
    faqs: [
      { q: 'Can I combine multiple PNG images into one PDF?', a: 'Yes — drop multiple PNGs at once. They are combined into a single PDF document with one image per page, in the order you added them.' },
      { q: 'Are my images uploaded to a server?', a: 'No. The PDF is assembled entirely in your browser using jsPDF. Your images never leave your device.' },
      { q: 'Will the image quality be preserved in the PDF?', a: 'Yes. Each PNG is embedded at its full resolution. The PDF may be larger than the source PNGs because PDF stores images differently, but no visual quality is lost.' },
      { q: 'What page size will the PDF be?', a: 'Each page is sized to fit the PNG image. If your PNG is wider than tall, it\'s placed in landscape orientation; taller than wide gets portrait orientation.' },
      { q: 'Can I convert transparent PNG files to PDF?', a: 'Yes. Transparent areas are rendered against a white background in the PDF, as PDF doesn\'t natively support page-level transparency.' },
      { q: 'What is the maximum number of PNGs I can combine?', a: 'Up to 20 PNG files per batch, with a 100MB limit per file. For very large batches, convert in multiple sessions.' },
      { q: 'Can I convert PNG screenshots to PDF for printing?', a: 'Absolutely. The PDF is sized to your image dimensions. For best print results, use high-resolution source PNGs (at least 150 DPI equivalent width).' },
      { q: 'Does this work on mobile?', a: 'Yes — works on iPhone Safari and Android Chrome. Large batches may be slower on older phones.' },
    ],
    useCases: [
      'Combine multiple screenshots into a single PDF report for sharing or printing',
      'Package signed form photos or scanned receipts as a PDF for email submission',
      'Convert PNG wireframe screens to a PDF deck for stakeholder review',
      'Bundle PNG product images into a PDF catalog without design software',
    ],
  },

  'jpg-to-pdf': {
    title: 'JPG to PDF Converter — Free, Combine Multiple Photos | FileConvertir',
    metaDescription: 'Convert JPG to PDF free online — no upload, no signup. Combine multiple JPEG photos into one PDF document instantly. Works on Windows, Mac & mobile. 100% private.',
    heading: 'JPG to PDF Converter',
    description: 'Convert JPEG photos to PDF — combine multiple images into a single professional document. Works entirely in your browser. No upload, no account needed.',
    longDescription: 'Converting photos to PDF is one of the most common document tasks: attaching proof of ID for rental applications, submitting insurance claim photos, bundling product shots for clients, or turning a set of scanned receipts into an expense report. FileConvertir assembles your JPG files into a PDF document entirely in your browser using jsPDF — nothing is uploaded to any server. Multiple JPEGs become a single multi-page PDF, with each photo on its own page at its native resolution.',
    howToSteps: [
      { name: 'Add your JPG files', text: 'Drag and drop your .jpg or .jpeg photos into the converter, or click "Select Files". Add up to 20 photos per batch.' },
      { name: 'Select PDF as output', text: 'Choose PDF from the output format dropdown. Photos will appear in the PDF in the order you added them.' },
      { name: 'PDF is built in your browser', text: 'jsPDF assembles the document on your device. No image is ever sent to a server.' },
      { name: 'Download the PDF', text: 'Save the finished PDF. Multiple photos become one multi-page document.' },
    ],
    whyChooseUs: [
      { title: 'Photo order preserved', text: 'Photos appear in the PDF in the order you added them. Reorder by dragging files before converting.' },
      { title: 'Sensitive photos stay private', text: 'ID photos, medical images, or financial documents are never uploaded. Local processing only.' },
      { title: 'Works on any device, no install', text: 'Convert JPEG to PDF on Windows, Mac, iPhone, or Android — right in the browser, nothing to download.' },
    ],
    faqs: [
      { q: 'How do I combine multiple JPG photos into one PDF?', a: 'Drop all your JPG files at once into the converter, select PDF as output, and download. All photos are combined into a single PDF with one image per page.' },
      { q: 'Are my photos uploaded to your server?', a: 'No. The PDF is assembled entirely in your browser using jsPDF. Your photos never leave your device.' },
      { q: 'Will photo quality be preserved in the PDF?', a: 'Yes. Each JPG is embedded at its original resolution. No additional compression is applied.' },
      { q: 'Can I choose the page order?', a: 'Photos appear in the order you added them. Drop them in the desired sequence, or adjust the order in the file picker before converting.' },
      { q: 'What page size will the PDF use?', a: 'Each page fits the photo. Landscape photos get landscape pages; portrait photos get portrait pages.' },
      { q: 'How many photos can I combine in one PDF?', a: 'Up to 20 JPG files per batch. Each file can be up to 100MB. For larger batches, convert in multiple sessions.' },
      { q: 'Can I use this for insurance claim or ID document photos?', a: 'Yes, and it\'s a great use case because the photos never leave your device. No cloud conversion means no privacy risk for sensitive documents.' },
      { q: 'Does this work on iPhone?', a: 'Yes. Open the page in Safari, tap "Select Files," choose photos from your camera roll, and download the PDF.' },
    ],
    useCases: [
      'Bundle ID photos, utility bills, and proof documents into a single PDF for rental or visa applications',
      'Combine insurance claim photos into a PDF to email to your insurance provider',
      'Package product photos for clients or print-shop submissions as a multi-page PDF',
      'Turn scanned receipts or invoices into a PDF expense report for accounting',
    ],
  },

  'heic-to-pdf': {
    title: 'HEIC to PDF Converter — iPhone Photos to PDF Free | FileConvertir',
    metaDescription: 'Convert HEIC to PDF free online — no upload, no signup. Turn iPhone photos into PDF documents instantly. Multiple HEIC files → one PDF. 100% private, browser-based.',
    heading: 'HEIC to PDF Converter',
    description: 'Convert iPhone HEIC photos to PDF instantly in your browser. Bundle multiple HEIC images into a single PDF document for easy sharing, printing, or submission — without uploading your photos.',
    longDescription: 'iPhone photos arrive as HEIC files, but forms, portals, and email recipients almost always require PDF. Whether you\'re submitting insurance photos, attaching proof of address, creating a photo portfolio, or sending product images to a client, HEIC-to-PDF is a common workflow. FileConvertir handles this in two steps invisibly: it decodes the HEIC using WebAssembly, then assembles the result into a PDF using jsPDF — all locally in your browser. Your photos never touch a server, which matters when the images contain sensitive personal documents.',
    howToSteps: [
      { name: 'Drop your HEIC files', text: 'Drag your .heic or .heif photos into the converter, or tap "Select Files" to pick from your camera roll. Up to 20 photos per batch.' },
      { name: 'Select PDF as output', text: 'Choose PDF from the output format dropdown. All HEIC files will be combined into one PDF.' },
      { name: 'Browser converts locally', text: 'Each HEIC is decoded in-browser and assembled into a PDF. Nothing is uploaded — your photos stay on your device.' },
      { name: 'Download the PDF', text: 'Save the finished PDF document. Multiple iPhone photos become one shareable, printable PDF.' },
    ],
    whyChooseUs: [
      { title: 'iPhone photos → PDF in one step', text: 'No need to first convert HEIC to JPG, then to PDF. Drop HEIC files directly and get a PDF immediately.' },
      { title: 'Private — never uploaded', text: 'Phone photos often contain private locations, documents, or personal content. FileConvertir never uploads them — all processing is in-browser.' },
      { title: 'Combine multiple iPhone photos into one PDF', text: 'Drop 10 HEIC photos at once and get a single 10-page PDF — ideal for insurance claims, legal submissions, or client packages.' },
    ],
    faqs: [
      { q: 'How do I turn my iPhone photos into a PDF without a computer?', a: 'Open FileConvertir.com in Safari on your iPhone, tap "Select Files," choose your HEIC photos from your camera roll, select PDF as output, and tap Download. The entire conversion happens on your iPhone.' },
      { q: 'Can I combine multiple iPhone HEIC photos into one PDF?', a: 'Yes. Drop multiple HEIC files at once — each becomes one page in a single PDF document. You can combine up to 20 photos per conversion.' },
      { q: 'Are my iPhone photos uploaded to the internet?', a: 'No. The conversion runs entirely in your browser using WebAssembly (for HEIC decoding) and jsPDF (for PDF assembly). Your photos never leave your device.' },
      { q: 'Will the photo quality be preserved in the PDF?', a: 'Yes. Each HEIC is decoded to its full resolution and embedded in the PDF at that resolution. No quality is lost beyond what\'s inherent in the HEIC encoding itself.' },
      { q: 'Why use PDF instead of just sharing HEIC files?', a: 'Many email clients, portals, and apps don\'t accept HEIC. PDF is universally supported — every device and operating system can open a PDF. It\'s also more professional for document submissions.' },
      { q: 'What if I have HEIF files instead of HEIC?', a: 'HEIC and HEIF are essentially the same format (HEIF is the container, HEIC is the Apple-branded variant). Both .heic and .heif files are supported.' },
      { q: 'Can I convert a single HEIC photo to PDF?', a: 'Yes — you can convert a single file or multiple files. One HEIC becomes a single-page PDF; multiple HEICs become a multi-page PDF.' },
      { q: 'Does this work on Android?', a: 'Android devices don\'t natively create HEIC files, but if you received HEIC photos from an iPhone user, you can open FileConvertir in Chrome on Android to convert them.' },
    ],
    useCases: [
      'Submit iPhone photos as PDF for insurance claims, rental applications, or legal documents',
      'Convert HEIC passport or ID photos to PDF for visa or government form submissions',
      'Bundle multiple iPhone shots of a property or product into a single PDF document',
      'Send iPhone photos to recipients whose email or portal only accepts PDF attachments',
    ],
  },

  /* ─────────────────────────────────────────────────────────────────────────
     NEW PRIORITY PAGES — AUDIO CONVERSIONS
  ───────────────────────────────────────────────────────────────────────── */

  'mp4-to-mp3': {
    title: 'MP4 to MP3 Converter — Extract Audio Free | FileConvertir',
    metaDescription: 'Extract audio from MP4 free online — no upload, no signup, 100% private. Convert MP4 video to MP3 in your browser. Works on Windows, Mac, Android. No size tricks.',
    heading: 'MP4 to MP3 Converter',
    description: 'Extract the audio track from any MP4 video and save it as an MP3 — instantly in your browser. No upload, no account, and the resulting MP3 plays on every device.',
    longDescription: 'Extracting audio from an MP4 is one of the most common multimedia tasks: saving the audio from a lecture recording, converting a music video\'s audio for offline listening, ripping the soundtrack from a presentation, or archiving a podcast episode from a video format. FileConvertir uses FFmpeg.wasm to do this conversion entirely in your browser — the MP4 video is processed locally, the audio stream is re-encoded as 192 kbps MP3, and the file is made available for download without ever leaving your device. No upload queue, no wait time, no account required.',
    howToSteps: [
      { name: 'Drop your MP4 file', text: 'Drag and drop your .mp4 video into the converter, or click "Select Files". Files up to 100MB are supported.' },
      { name: 'Select MP3 as output', text: 'Choose MP3 from the output format dropdown. The converter will extract the audio track automatically.' },
      { name: 'FFmpeg extracts audio in-browser', text: 'FFmpeg.wasm processes the MP4 on your device, separates the audio stream, and encodes it as 192 kbps MP3. No upload.' },
      { name: 'Download the MP3', text: 'Save the extracted MP3 file. It\'s ready to play on any media player, phone, or car stereo.' },
    ],
    whyChooseUs: [
      { title: 'True in-browser processing — not a server', text: 'Many "browser" converters are just upload forms. FileConvertir runs FFmpeg.wasm in your browser tab — your video never touches a server.' },
      { title: '192 kbps MP3 output', text: 'Audio is extracted and encoded at 192 kbps, which is high quality for music, speech, and podcasts. Audible difference from source is negligible.' },
      { title: 'Works offline after first load', text: 'Once the page and FFmpeg.wasm have loaded, subsequent conversions work without an internet connection.' },
    ],
    faqs: [
      { q: 'How do I extract audio from an MP4 video online for free?', a: 'Drop your MP4 into FileConvertir, select MP3 as output, and download. The audio is extracted and saved as MP3 in your browser — no upload, no account, free.' },
      { q: 'Is audio quality preserved when extracting from MP4?', a: 'If the MP4 audio is AAC (standard for H.264 MP4), it\'s re-encoded to 192 kbps MP3. Some quality loss is unavoidable (AAC → MP3 is a lossy-to-lossy conversion), but at 192 kbps the difference is inaudible for most content.' },
      { q: 'Are my videos uploaded to your server?', a: 'No. FFmpeg.wasm processes the video entirely in your browser. The video file never leaves your device.' },
      { q: 'What\'s the maximum MP4 file size?', a: '100MB per file. A 1-hour lecture at 720p is typically 300–500MB, which exceeds this limit — for large files, use a desktop tool like FFmpeg or HandBrake.' },
      { q: 'How long does extraction take?', a: 'For most MP4 files, audio extraction takes 1–5 seconds per minute of video on a modern computer. The first conversion takes longer because FFmpeg.wasm needs to load.' },
      { q: 'Can I extract audio from MP4 on my iPhone?', a: 'Yes — open FileConvertir in Safari on iPhone, select your MP4 from Files, and download the MP3. Processing happens on your device.' },
      { q: 'Does the converter work with MP4 files from screen recorders?', a: 'Yes. Screen recordings (from Loom, OBS, Camtasia, or the built-in Mac/Windows recorder) in MP4 format are supported.' },
      { q: 'What if my MP4 has no audio track?', a: 'If the MP4 contains no audio (some silent screen recordings don\'t), the output will be a near-empty MP3. Check that your source video has an audio track before converting.' },
    ],
    useCases: [
      'Extract lecture or webinar audio from an MP4 recording for offline listening',
      'Convert music video files to MP3 for playback on portable players and car stereos',
      'Save podcast or interview audio from MP4 archives as MP3 files',
      'Extract narration or voice-over from screen recording MP4s for re-use in other projects',
    ],
  },

  'wav-to-mp3': {
    title: 'WAV to MP3 Converter — Reduce File Size Free | FileConvertir',
    metaDescription: 'Convert WAV to MP3 free online — no upload, no signup. Reduce WAV file size by 90% for sharing & streaming. Browser-based, 100% private. Works on Windows, Mac, mobile.',
    heading: 'WAV to MP3 Converter',
    description: 'Convert WAV audio files to MP3 and reduce file size by up to 90% — without losing audible quality. Runs entirely in your browser. Perfect for sharing recordings, podcasts, and music.',
    longDescription: 'WAV files are uncompressed — a 3-minute song in WAV format is typically 30–50MB, while the same song as a 192 kbps MP3 is around 4MB. WAV is essential for audio production and recording because it preserves every sample, but it\'s impractical for sharing, emailing, or streaming. Converting WAV to MP3 makes files email-friendly, compatible with every music player and streaming service, and dramatically easier to store. FileConvertir handles the conversion with FFmpeg.wasm running locally in your browser — no upload, no account, and no server ever sees your audio.',
    howToSteps: [
      { name: 'Drop your WAV files', text: 'Drag .wav files into the converter, or click "Select Files". Batch up to 20 WAV files at a time.' },
      { name: 'Select MP3 as output', text: 'Choose MP3 from the output format dropdown. The converter uses 192 kbps by default.' },
      { name: 'FFmpeg encodes in your browser', text: 'FFmpeg.wasm processes the WAV and encodes the MP3 on your device. Nothing is uploaded.' },
      { name: 'Download the MP3s', text: 'Save each MP3 individually or download them all as a ZIP archive.' },
    ],
    whyChooseUs: [
      { title: '90% file size reduction', text: 'A typical 40MB WAV recording becomes a 4MB MP3 — small enough to email, stream, or share via any platform.' },
      { title: 'No upload — audio files stay private', text: 'Voice recordings, music demos, and podcast audio never leave your device during conversion.' },
      { title: 'Industry-standard 192 kbps output', text: 'The MP3 is encoded at 192 kbps — the standard for podcast distribution and music sharing, inaudibly different from the WAV source.' },
    ],
    faqs: [
      { q: 'Will I lose audio quality converting WAV to MP3?', a: 'Some quality loss is inevitable because MP3 is lossy and WAV is lossless. However, at 192 kbps, the loss is inaudible on consumer headphones and speakers. Trained ears in professional listening environments may detect subtle differences, but for podcasts, voice, and shared music it\'s transparent.' },
      { q: 'Why is my WAV file so large?', a: 'WAV stores uncompressed PCM audio — every sample is saved exactly as recorded. A CD-quality (44.1 kHz, 16-bit, stereo) WAV is about 10MB per minute. This is great for editing, terrible for sharing.' },
      { q: 'Are my audio files uploaded to a server?', a: 'No. FFmpeg.wasm processes everything locally in your browser. Your recordings never leave your device.' },
      { q: 'What bitrate will the MP3 be?', a: '192 kbps CBR (constant bit rate). This is the standard for podcast distribution and high-quality sharing. It\'s a good balance between file size and audio quality.' },
      { q: 'Can I convert WAV recordings from Audacity, GarageBand, or Logic?', a: 'Yes. WAV files exported from any DAW (Audacity, GarageBand, Logic Pro, Reaper, Pro Tools) are supported.' },
      { q: 'How much smaller will the MP3 be?', a: 'Typically 85–92% smaller. A 40MB WAV becomes approximately 3–5MB as a 192 kbps MP3.' },
      { q: 'Can I batch convert multiple WAV files?', a: 'Yes — up to 20 WAV files at once. They convert in parallel and you can download all as a ZIP.' },
      { q: 'What is the maximum WAV file size?', a: '100MB per file. For WAV files larger than this (common in long recording sessions), use desktop FFmpeg for batch processing.' },
    ],
    useCases: [
      'Convert WAV recordings to MP3 for uploading to podcast hosting platforms like Spotify or Apple Podcasts',
      'Shrink large WAV audio exports from Audacity or GarageBand for email sharing',
      'Convert WAV music tracks to MP3 for uploading to SoundCloud, Bandcamp, or streaming platforms',
      'Reduce WAV voiceover files to MP3 for use in video projects where small size matters',
    ],
  },

  'flac-to-mp3': {
    title: 'FLAC to MP3 Converter — Free, High-Quality Output | FileConvertir',
    metaDescription: 'Convert FLAC to MP3 free online — no upload, no signup. Keep audiophile audio quality in a shareable MP3. Browser-based, 100% private. Works on Windows, Mac, mobile.',
    heading: 'FLAC to MP3 Converter',
    description: 'Convert FLAC lossless audio to MP3 instantly in your browser. Ideal when your device, car stereo, or streaming platform can\'t play FLAC. All conversion is local — no upload.',
    longDescription: 'FLAC is the preferred format for audiophiles and music archivists because it preserves the original recording bit-for-bit at roughly half the size of WAV. The trade-off is compatibility: many car stereos, portable Bluetooth speakers, Amazon Music, streaming apps, and older Android devices don\'t support FLAC playback. Converting to MP3 makes your lossless audio library playable everywhere. FileConvertir uses FFmpeg.wasm to transcode FLAC to 192 kbps MP3 locally in your browser. Your music never leaves your device — no upload, no server-side processing, complete privacy.',
    howToSteps: [
      { name: 'Drop your FLAC files', text: 'Drag .flac files into the converter, or click "Select Files". Up to 20 files per batch.' },
      { name: 'Select MP3 as output', text: 'Choose MP3 from the format dropdown. Audio is encoded at 192 kbps for maximum quality.' },
      { name: 'FFmpeg transcodes locally', text: 'FFmpeg.wasm decodes the FLAC losslessly and re-encodes as MP3 on your device. Nothing is uploaded.' },
      { name: 'Download your MP3s', text: 'Save individually or download all as a ZIP. Ready to play on any device.' },
    ],
    whyChooseUs: [
      { title: 'FLAC decoded losslessly before MP3 encoding', text: 'Unlike some tools that re-encode FLAC twice, FileConvertir decodes the FLAC to full PCM audio, then encodes directly to MP3 — minimizing quality loss.' },
      { title: 'No upload of your music library', text: 'FLAC libraries can be huge. Uploading files to a converter is slow and a privacy risk. Everything here runs locally.' },
      { title: 'Batch convert entire albums', text: 'Drop a full album of FLAC files at once. They all convert in parallel, and you can download everything as one ZIP.' },
    ],
    faqs: [
      { q: 'Why can\'t my car stereo play FLAC files?', a: 'Most car stereos were designed before FLAC became popular. They support MP3 and WMA universally, and some newer models add AAC, FLAC, or WAV. If your stereo only shows MP3/WMA, converting FLAC to MP3 is the fix.' },
      { q: 'Will I lose audio quality converting FLAC to MP3?', a: 'Yes — FLAC is lossless, MP3 is lossy. However, at 192 kbps the perceptual quality is excellent. On consumer headphones and car stereos, the difference is inaudible. Professional listening equipment or treated studio rooms may reveal subtle differences.' },
      { q: 'What bitrate is used for the MP3?', a: '192 kbps CBR. This is the standard audiophile-acceptable MP3 bitrate. For maximum quality at larger file size, use WAV as output instead, which preserves the full FLAC fidelity.' },
      { q: 'Are my music files uploaded to a server?', a: 'No. FFmpeg.wasm runs entirely in your browser. Your FLAC files never leave your device.' },
      { q: 'Does Spotify or Apple Music accept FLAC files?', a: 'Neither Spotify nor Apple Music accept direct FLAC uploads from users. Apple Music uses AAC internally; Spotify uses OGG Vorbis. Converting FLAC to MP3 makes your tracks compatible with most upload portals.' },
      { q: 'Can I convert a full FLAC album at once?', a: 'Yes — up to 20 files per batch. Drop the entire album folder and download the converted MP3s as a ZIP.' },
      { q: 'Why is FLAC so much larger than MP3?', a: 'FLAC is lossless — it stores audio data perfectly with compression, but no audio data is discarded. A CD-quality FLAC is ~5× larger than a 192 kbps MP3 for the same song.' },
      { q: 'Does the converter preserve metadata (title, artist, album)?', a: 'ID3 metadata embedded in FLAC files may be partially preserved in the MP3 output, but full metadata migration is not guaranteed. Check the output in a media player after conversion.' },
    ],
    useCases: [
      'Convert FLAC music collection to MP3 for playback on car stereos that don\'t support FLAC',
      'Prepare FLAC audio for upload to podcasting platforms or music sharing services that require MP3',
      'Convert FLAC tracks for syncing to older iPods, portable players, and fitness trackers',
      'Share FLAC recordings with collaborators whose audio software or devices only accept MP3',
    ],
  },

  'aac-to-mp3': {
    title: 'AAC to MP3 Converter — Free, Compatible Everywhere | FileConvertir',
    metaDescription: 'Convert AAC to MP3 free online — no upload, no signup. Fix AAC compatibility on older devices, car stereos & media players. Browser-based, 100% private.',
    heading: 'AAC to MP3 Converter',
    description: 'Convert AAC audio files to universally compatible MP3 instantly in your browser. Fix playback issues on older Android devices, car stereos, and media players that reject AAC.',
    longDescription: 'AAC (Advanced Audio Coding) is the audio format behind Apple Music, iTunes, YouTube audio streams, and most streaming services. It\'s technically superior to MP3 — better quality at the same file size. But compatibility is the sticking point: many older Android devices, budget Bluetooth speakers, car stereos manufactured before 2015, and older Windows Media Player installations don\'t support AAC. Converting to MP3 solves the playback problem without installing any software. FileConvertir uses FFmpeg.wasm to perform the conversion locally in your browser — no upload, no account, and your audio files stay on your device.',
    howToSteps: [
      { name: 'Drop your AAC files', text: 'Drag .aac files into the converter, or click "Select Files". Batch up to 20 files.' },
      { name: 'Select MP3 as output', text: 'Choose MP3 from the output format dropdown.' },
      { name: 'FFmpeg converts in-browser', text: 'FFmpeg.wasm decodes the AAC and re-encodes as 192 kbps MP3 on your device. No upload.' },
      { name: 'Download the MP3s', text: 'Save files individually or as a ZIP archive.' },
    ],
    whyChooseUs: [
      { title: 'MP3 works everywhere AAC doesn\'t', text: 'Every device made in the last 20 years plays MP3. If your AAC file won\'t play somewhere, the MP3 version will.' },
      { title: 'No upload — files stay on your device', text: 'Unlike cloud converters, FileConvertir processes AAC files locally in your browser.' },
      { title: 'Free, no account, no limits', text: 'Convert as many AAC files as you need without signing up or hitting a daily quota.' },
    ],
    faqs: [
      { q: 'Why won\'t my car stereo play AAC files?', a: 'Older car stereos (pre-2015) typically support MP3 and WMA only. AAC support became common in newer models but isn\'t universal. Converting to MP3 guarantees playback on any stereo.' },
      { q: 'Will I lose audio quality converting AAC to MP3?', a: 'Some loss is unavoidable because both are lossy formats. At 192 kbps MP3, the difference is inaudible for most listeners. AAC is actually more efficient than MP3 at the same bitrate, so you\'re trading a slight quality advantage for compatibility.' },
      { q: 'Are my audio files uploaded to a server?', a: 'No. FFmpeg.wasm runs in your browser. Files never leave your device.' },
      { q: 'What devices can\'t play AAC files?', a: 'Older Android versions (pre-4.4), some budget Bluetooth speakers, older car stereos, Windows Media Player without additional codecs, and some Sonos and Amazon Echo integrations may have trouble with AAC. MP3 plays on all of them.' },
      { q: 'Is AAC better quality than MP3?', a: 'Yes, technically — AAC achieves the same perceptual quality at roughly 70–80% of the MP3 bitrate. However, MP3 is more universally supported. Convert to MP3 when compatibility is the priority.' },
      { q: 'Can I batch convert AAC files?', a: 'Yes — up to 20 files at once.' },
    ],
    useCases: [
      'Play AAC audio files on older car stereos and Bluetooth speakers that only support MP3',
      'Convert AAC podcast downloads for use in editors like Audacity that work best with MP3',
      'Fix AAC files that won\'t play on older Android devices or Windows Media Player',
      'Convert AAC voice recordings to MP3 for uploading to platforms that require MP3 format',
    ],
  },

  'ogg-to-mp3': {
    title: 'OGG to MP3 Converter — Free, Works on Any Device | FileConvertir',
    metaDescription: 'Convert OGG to MP3 free online — no upload, no signup. Fix OGG Vorbis compatibility on Windows, Android & car stereos. Browser-based, 100% private.',
    heading: 'OGG to MP3 Converter',
    description: 'Convert OGG Vorbis audio files to MP3 instantly in your browser. Fix playback on Windows Media Player, car stereos, and apps that don\'t support OGG. No upload, no account.',
    longDescription: 'OGG Vorbis is an open-source audio codec popular with Linux users, game developers, and platforms that avoid licensing fees. You\'ll find OGG files in video game soundtracks, Discord audio clips, Audacity recordings, and open-source media. The problem: Windows Media Player doesn\'t support OGG without a codec pack, most car stereos can\'t play it, and Android support is inconsistent. Converting to MP3 gives you a file that plays everywhere. FileConvertir handles OGG-to-MP3 conversion with FFmpeg.wasm running entirely in your browser — no upload, no account needed.',
    howToSteps: [
      { name: 'Drop your OGG files', text: 'Drag .ogg files into the converter or click "Select Files". Up to 20 files per batch.' },
      { name: 'Select MP3 as output', text: 'Choose MP3 from the format dropdown.' },
      { name: 'FFmpeg converts locally', text: 'FFmpeg.wasm decodes the OGG Vorbis and re-encodes as 192 kbps MP3 in your browser. No upload.' },
      { name: 'Download the MP3s', text: 'Save files individually or as a ZIP.' },
    ],
    whyChooseUs: [
      { title: 'Fixes OGG compatibility instantly', text: 'MP3 plays natively on Windows, Mac, Android, iOS, every car stereo, and every media player — no codec install needed.' },
      { title: 'Games and Linux-friendly workflow', text: 'Converts video game audio files and OGG recordings from Linux tools without any OS-specific software.' },
      { title: 'No upload — files stay local', text: 'OGG files from games or private recordings are processed locally without leaving your device.' },
    ],
    faqs: [
      { q: 'Why won\'t Windows Media Player play my OGG file?', a: 'Windows Media Player doesn\'t include an OGG Vorbis codec by default. You can install a codec pack, use VLC, or simply convert the OGG to MP3 which plays natively.' },
      { q: 'Where do OGG files come from?', a: 'Common sources include: video game soundtracks and sound effects, Audacity exports on Linux, Discord audio clips, open-source media projects, and some streaming platforms that use OGG Vorbis internally.' },
      { q: 'Will I lose quality converting OGG to MP3?', a: 'Some quality loss occurs because both are lossy formats. At 192 kbps MP3, the loss is negligible for most listening scenarios.' },
      { q: 'Are my files uploaded to a server?', a: 'No. FFmpeg.wasm processes everything in your browser.' },
      { q: 'Can I play OGG game audio files after converting?', a: 'Yes — extracted game OGG files convert cleanly to MP3 for listening outside the game engine.' },
      { q: 'Can I batch convert OGG files?', a: 'Yes — up to 20 files per session.' },
    ],
    useCases: [
      'Convert video game OGG soundtracks and sound effects to MP3 for external listening',
      'Fix OGG audio files that Windows Media Player or car stereos won\'t play',
      'Convert Audacity OGG exports to MP3 for sharing with users on non-Linux platforms',
      'Convert OGG voice chat recordings to MP3 for archiving or editing',
    ],
  },

  'm4a-to-wav': {
    title: 'M4A to WAV Converter — Free, Lossless Output | FileConvertir',
    metaDescription: 'Convert M4A to WAV free online — no upload, no signup. Get lossless WAV for audio editing in Audacity, Pro Tools & DAWs. Browser-based, 100% private.',
    heading: 'M4A to WAV Converter',
    description: 'Convert M4A audio to uncompressed WAV format for high-quality audio editing. Ideal for importing Apple recordings into Audacity, Pro Tools, or other DAWs. Runs entirely in your browser.',
    longDescription: 'M4A files from iPhones, GarageBand, or Apple Music are AAC-compressed, which makes them small and convenient but incompatible with many professional audio workflows. DAWs like Audacity, Pro Tools, Logic, Ableton, and Reaper work best with uncompressed WAV files for editing and mixing. Converting M4A to WAV gives you uncompressed audio that every professional tool accepts, with no re-compression artifacts introduced during editing. FileConvertir uses FFmpeg.wasm to perform the conversion in your browser — no upload, maximum privacy for your recordings.',
    howToSteps: [
      { name: 'Drop your M4A files', text: 'Drag .m4a files into the converter or click "Select Files". Up to 20 files per batch.' },
      { name: 'Select WAV as output', text: 'Choose WAV from the output format dropdown. The M4A audio is decoded and written as uncompressed WAV.' },
      { name: 'FFmpeg decodes and converts', text: 'FFmpeg.wasm decodes the M4A/AAC stream and writes a PCM WAV file on your device. Nothing is uploaded.' },
      { name: 'Download the WAV files', text: 'Save each WAV individually or as a ZIP. Ready to import into any audio editor.' },
    ],
    whyChooseUs: [
      { title: 'Uncompressed WAV for professional editing', text: 'DAWs and audio editors work best with WAV. Avoid re-encoding artifacts by working in uncompressed format after this conversion.' },
      { title: 'No upload of your recordings', text: 'Voice memos, music demos, and podcast recordings are processed locally — never sent to a server.' },
      { title: 'Compatible with every audio tool', text: 'WAV is supported by Audacity, Pro Tools, Logic, Ableton, Reaper, Adobe Audition, and every other audio editor.' },
    ],
    faqs: [
      { q: 'Why convert M4A to WAV for audio editing?', a: 'DAWs and audio editors work best with uncompressed audio. WAV files don\'t have codec decode overhead and can be edited without re-compression artifacts. It\'s standard practice to work in WAV or AIFF during editing, then export to M4A/MP3 for distribution.' },
      { q: 'Does converting M4A to WAV improve quality?', a: 'The conversion decodes the M4A/AAC to PCM audio (the same data used internally during playback). You won\'t recover quality lost by the original AAC encoding, but you will have a lossless WAV that doesn\'t degrade further during editing.' },
      { q: 'Will the WAV file be much larger than the M4A?', a: 'Yes. A 10MB M4A typically becomes 80–120MB as WAV. This is expected — WAV stores uncompressed audio, which is much larger but better for editing workflows.' },
      { q: 'Are my audio files uploaded to a server?', a: 'No. FFmpeg.wasm processes everything in your browser.' },
      { q: 'Can I import M4A into Audacity directly?', a: 'Audacity can import M4A on newer versions with FFmpeg installed. If you get an import error, converting to WAV first is the most reliable workaround.' },
      { q: 'Does this work with iPhone voice memos?', a: 'Yes. Voice memo .m4a files exported from the iPhone Voice Memos app convert cleanly to WAV.' },
    ],
    useCases: [
      'Import iPhone voice memos and M4A recordings into Audacity, Pro Tools, or Reaper for editing',
      'Convert M4A music exports from GarageBand to WAV for professional mixing workflows',
      'Prepare M4A podcast recordings as WAV for mastering before distribution',
      'Convert M4A audio to WAV for use in video editors that prefer uncompressed audio tracks',
    ],
  },

  /* ─────────────────────────────────────────────────────────────────────────
     NEW PRIORITY PAGES — VIDEO CONVERSIONS
  ───────────────────────────────────────────────────────────────────────── */

  'mkv-to-mp4': {
    title: 'MKV to MP4 Converter — Free, No Quality Loss | FileConvertir',
    metaDescription: 'Convert MKV to MP4 free online — no upload, no signup. Fix MKV playback on iPhone, Smart TV & Plex. Browser-based, 100% private. No re-encoding when possible.',
    heading: 'MKV to MP4 Converter',
    description: 'Convert MKV video files to MP4 for playback on iPhones, Smart TVs, Plex, and apps that reject MKV. Runs entirely in your browser — no upload, no account required.',
    longDescription: 'MKV (Matroska) is the most popular container for downloaded movies and TV shows. It supports multiple audio tracks, subtitles, and chapter markers in a single file — perfect for media archiving. The problem: iPhones, iPads, many Smart TVs, Plex without transcoding enabled, Chromecast, and AirPlay all struggle or outright refuse to play MKV. Converting to MP4 fixes compatibility while preserving the video quality. When the MKV\'s video codec is H.264 or HEVC and audio is AAC, FileConvertir re-wraps without re-encoding — the conversion is nearly instant and quality is identical.',
    howToSteps: [
      { name: 'Drop your MKV file', text: 'Drag your .mkv file into the converter or click "Select Files". Files up to 100MB are supported.' },
      { name: 'Select MP4 as output', text: 'Choose MP4 from the format dropdown. The converter will handle the container repackaging.' },
      { name: 'FFmpeg converts in your browser', text: 'FFmpeg.wasm processes the MKV on your device. For H.264 MKV files, it re-wraps without re-encoding — very fast. Nothing is uploaded.' },
      { name: 'Download the MP4', text: 'Save the converted MP4. It\'s ready for iPhone, Plex, Smart TV, or any media player.' },
    ],
    whyChooseUs: [
      { title: 'No re-encoding for H.264 MKV files', text: 'Most MKV files use H.264 video and AAC audio. FileConvertir detects this and re-wraps the streams — no quality loss, and the conversion takes seconds instead of minutes.' },
      { title: '100% private — movie files stay on your device', text: 'MKV files are often large and personal. FileConvertir processes them in-browser without uploading anything to a server.' },
      { title: 'Fixes iPhone, Plex, and Smart TV compatibility', text: 'MP4 is the universal video container. Converting MKV to MP4 fixes playback on virtually every device.' },
    ],
    faqs: [
      { q: 'Why won\'t my iPhone play MKV files?', a: 'iOS doesn\'t natively support the MKV container. iPhone can play H.264 and HEVC video content, but only inside MP4 or MOV containers. Converting the MKV to MP4 solves this without any quality loss if the video codec is compatible.' },
      { q: 'Will I lose video quality converting MKV to MP4?', a: 'Not if the MKV uses H.264 or HEVC video and AAC audio — which is typical for downloaded content. FFmpeg re-wraps the streams into an MP4 container without re-encoding. Quality is bit-for-bit identical.' },
      { q: 'Can I play the converted MP4 on my Smart TV?', a: 'Yes — MP4 with H.264 video is the most widely supported video format. Every Smart TV from the last decade supports it natively.' },
      { q: 'Why does Plex transcode my MKV files?', a: 'Plex transcodes MKV files that use codecs its client device doesn\'t support directly. Converting to MP4 with H.264/AAC tells Plex the file is already in a direct-play compatible format, eliminating transcoding.' },
      { q: 'What\'s the maximum file size?', a: '100MB per file. Feature-length MKV movies are typically 1–15GB, which exceeds this limit — for large files, use HandBrake or desktop FFmpeg.' },
      { q: 'Are my video files uploaded to your server?', a: 'No. FFmpeg.wasm processes everything in your browser.' },
      { q: 'What if my MKV has multiple audio or subtitle tracks?', a: 'The converter selects the primary audio track. Subtitle tracks are not included in the MP4 output.' },
      { q: 'Does this work for short MKV clips under 100MB?', a: 'Yes — short clips, screen recordings, and edited MKV exports under 100MB convert quickly and cleanly.' },
    ],
    useCases: [
      'Play MKV movies and TV episodes on iPhone, iPad, or Apple TV via AirPlay',
      'Fix MKV files that Plex Media Server forces to transcode rather than direct-play',
      'Convert MKV recordings to MP4 for uploading to YouTube, Vimeo, or social media',
      'Make MKV video clips compatible with Smart TVs, Chromecast, and Fire Stick',
    ],
  },

  'avi-to-mp4': {
    title: 'AVI to MP4 Converter — Free, Modernize Old Videos | FileConvertir',
    metaDescription: 'Convert AVI to MP4 free online — no upload, no signup. Play old AVI videos on iPhone, Android & modern apps. Browser-based, 100% private. No quality loss.',
    heading: 'AVI to MP4 Converter',
    description: 'Convert old AVI video files to modern MP4 format — compatible with iPhones, Android, YouTube, and every video player. Runs entirely in your browser, no upload needed.',
    longDescription: 'AVI (Audio Video Interleave) was the dominant video format throughout the 1990s and 2000s, and countless old home videos, DV camera recordings, and Windows Movie Maker exports still exist in AVI format. The problem in 2025: iPhones can\'t play AVI, Android provides inconsistent support, YouTube technically accepts it but prefers MP4, and modern video editors often stumble over old AVI codec variants. Converting to MP4 modernizes the format so your old videos play everywhere. FileConvertir uses FFmpeg.wasm to handle the conversion in your browser — the video is re-encoded to H.264 MP4, making it compatible with every modern device and platform.',
    howToSteps: [
      { name: 'Drop your AVI file', text: 'Drag your .avi video into the converter or click "Select Files". Supports files up to 100MB.' },
      { name: 'Select MP4 as output', text: 'Choose MP4 from the format dropdown.' },
      { name: 'FFmpeg re-encodes in your browser', text: 'FFmpeg.wasm re-encodes the AVI to H.264 MP4 on your device. This may take a few seconds for longer clips. Nothing is uploaded.' },
      { name: 'Download the MP4', text: 'Save the converted MP4. Ready for iPhone, YouTube, or any modern media player.' },
    ],
    whyChooseUs: [
      { title: 'Brings old videos to modern compatibility', text: 'AVI files from camcorders, Windows Movie Maker, or old DVDs become H.264 MP4 — the universally accepted modern video format.' },
      { title: 'No software install needed', text: 'No HandBrake, no VirtualDub, no codecs to install. AVI-to-MP4 conversion works right in your browser.' },
      { title: '100% private — old home videos stay local', text: 'Personal AVI videos are processed on your device without any upload to a server.' },
    ],
    faqs: [
      { q: 'Why can\'t my iPhone play AVI files?', a: 'iOS and the Apple ecosystem only support H.264 and HEVC video in MP4 or MOV containers. AVI is not a supported container on iPhone. Converting to MP4 is the fix.' },
      { q: 'Will converting AVI to MP4 reduce quality?', a: 'For most AVI files, re-encoding to H.264 MP4 is done at high quality settings. Some quality reduction is inherent in re-encoding, but the output is excellent for viewing and sharing purposes.' },
      { q: 'My old AVI videos use the DivX or Xvid codec — will they convert?', a: 'Yes. FFmpeg supports DivX 3/4/5, Xvid, and most other classic AVI codecs. These old files typically convert well to H.264 MP4.' },
      { q: 'Can I upload AVI to YouTube?', a: 'YouTube does accept AVI, but MP4 with H.264 is the recommended format for fastest processing and best quality. Converting first often speeds up YouTube processing and avoids codec-related issues.' },
      { q: 'Are my videos uploaded to a server?', a: 'No. FFmpeg.wasm processes everything in your browser.' },
      { q: 'What\'s the maximum AVI file size?', a: '100MB per file. Old DV or SD-resolution AVI files are often under this limit; HD AVI files may exceed it.' },
      { q: 'How long does conversion take?', a: 'AVI re-encoding takes longer than a simple re-wrap because the video must be re-encoded. Expect roughly 1–3 seconds per minute of video on a modern computer.' },
    ],
    useCases: [
      'Play old home videos from camcorders and Windows Movie Maker on iPhone, iPad, and Android',
      'Upload legacy AVI recordings to YouTube, Instagram Reels, or TikTok without issues',
      'Convert old DivX or Xvid AVI movies for playback on Smart TVs and streaming devices',
      'Modernize AVI archives before uploading to cloud storage for long-term preservation',
    ],
  },

  'webm-to-mp4': {
    title: 'WebM to MP4 Converter — Free, Screen Recordings | FileConvertir',
    metaDescription: 'Convert WebM to MP4 free online — no upload, no signup. Fix browser screen recordings, Loom exports & WebM video compatibility. 100% private, browser-based.',
    heading: 'WebM to MP4 Converter',
    description: 'Convert WebM video files to MP4 — fix browser screen recordings, Loom exports, and Chrome-captured video that won\'t play outside the browser. Runs entirely in your browser.',
    longDescription: 'WebM is Google\'s open video format used heavily in browser-based applications: Chrome and Firefox screen recordings save as WebM, Loom often exports in WebM, Google Meet and video call recordings sometimes use it, and HTML5 video elements frequently serve WebM. The problem: Windows Media Player can\'t open WebM, iPhones can\'t play it, and many video editors don\'t support it without installing extra codecs. Converting to MP4 gives you a file that plays everywhere, edits in any tool, and uploads to every platform. FileConvertir uses FFmpeg.wasm to handle the conversion locally in your browser.',
    howToSteps: [
      { name: 'Drop your WebM file', text: 'Drag your .webm file into the converter or click "Select Files".' },
      { name: 'Select MP4 as output', text: 'Choose MP4 from the format dropdown.' },
      { name: 'FFmpeg converts in-browser', text: 'FFmpeg.wasm processes the WebM on your device. Nothing is uploaded to any server.' },
      { name: 'Download the MP4', text: 'Save the converted MP4. Ready to share, edit, or upload anywhere.' },
    ],
    whyChooseUs: [
      { title: 'Perfect for browser screen recordings', text: 'Chrome extensions, browser-based screen recorders, and OBS WebM exports all convert cleanly to MP4 here.' },
      { title: 'No upload — recordings stay private', text: 'Screen recordings often contain sensitive information. FileConvertir processes them locally without any server upload.' },
      { title: 'No codec install or software', text: 'No VLC, no Handbrake, no codec packs needed. Convert WebM to MP4 in any browser.' },
    ],
    faqs: [
      { q: 'Why does my screen recording save as WebM?', a: 'Chrome-based screen recorders, browser extensions, and many web-based recording tools use WebM because it\'s natively supported by Chrome without any codec overhead. The trade-off is that WebM isn\'t well-supported outside the browser.' },
      { q: 'Can I play WebM on Windows Media Player?', a: 'No, Windows Media Player doesn\'t support WebM. You need VLC, or better yet, convert the WebM to MP4 to play it natively.' },
      { q: 'Can I play WebM on iPhone?', a: 'iPhone natively supports WebM in Safari starting with iOS 16 (VP8 only). For older iOS versions or better compatibility across all Apple devices, convert to MP4.' },
      { q: 'Does Loom export videos as WebM?', a: 'Loom downloads vary by browser. Chrome typically downloads as WebM. If your Loom recording is WebM, drop it here to convert to MP4 for sharing outside the browser.' },
      { q: 'Are my video files uploaded to a server?', a: 'No. FFmpeg.wasm processes everything in your browser.' },
      { q: 'Will quality be preserved?', a: 'WebM typically uses VP8 or VP9 codec. Converting to H.264 MP4 involves re-encoding, which may introduce a small quality reduction, but output is excellent for sharing and editing.' },
      { q: 'What\'s the maximum file size?', a: '100MB per file.' },
    ],
    useCases: [
      'Convert Chrome browser screen recordings from WebM to MP4 for sharing outside the browser',
      'Fix Loom or Google Meet WebM downloads for playback on iPhone, Windows, or Smart TVs',
      'Convert OBS WebM recordings to MP4 for upload to YouTube or Vimeo',
      'Make WebM video clips from web scraping or browser automation compatible with video editors',
    ],
  },

  'mov-to-mp3': {
    title: 'MOV to MP3 Converter — Extract QuickTime Audio Free | FileConvertir',
    metaDescription: 'Extract audio from MOV files free online — no upload, no signup. Convert QuickTime .mov to MP3 in your browser. Works on Windows, Mac & mobile. 100% private.',
    heading: 'MOV to MP3 Converter',
    description: 'Extract the audio track from Apple QuickTime MOV files and save it as an MP3. Perfect for getting music from screen recordings, lectures, or iPhone videos. No upload required.',
    longDescription: 'MOV files from iPhone, iPad, Mac screen recordings, and Final Cut Pro often contain audio that you want to extract — a voice-over from a screen recording, music from a video clip, a lecture captured as a MOV file, or narration to repurpose for a podcast. Converting MOV to MP3 extracts just the audio track as a standard MP3 file that plays on every device. FileConvertir uses FFmpeg.wasm to strip the audio from the MOV container and re-encode it as 192 kbps MP3 entirely in your browser — no upload, no server, no account.',
    howToSteps: [
      { name: 'Drop your MOV file', text: 'Drag your .mov video into the converter or click "Select Files".' },
      { name: 'Select MP3 as output', text: 'Choose MP3 from the output format dropdown. Only the audio track will be extracted.' },
      { name: 'FFmpeg extracts audio locally', text: 'FFmpeg.wasm strips the audio from the MOV and encodes it as 192 kbps MP3 on your device. Nothing uploaded.' },
      { name: 'Download the MP3', text: 'Save the extracted MP3 — plays on any device, media player, or car stereo.' },
    ],
    whyChooseUs: [
      { title: 'Extract audio without video editors', text: 'No QuickTime Pro, no iMovie, no Final Cut needed. Drop the MOV here and download the MP3 in seconds.' },
      { title: 'Private — MOV recordings stay local', text: 'MOV files from screen recordings or iPhone often contain private content. Nothing is uploaded to a server.' },
      { title: 'Works on Windows and Android too', text: 'Even if you received a MOV file on a non-Apple device, FileConvertir converts it to MP3 in any modern browser.' },
    ],
    faqs: [
      { q: 'How do I extract audio from a MOV file for free?', a: 'Drop the .mov file into FileConvertir, select MP3 as output, and download. The audio is extracted and saved as MP3 without any upload or software install.' },
      { q: 'Can I extract audio from iPhone screen recordings?', a: 'Yes. iPhone screen recordings save as MOV files. Drop them here to extract the audio as MP3.' },
      { q: 'Will audio quality be preserved?', a: 'MOV typically contains AAC audio. Converting to MP3 at 192 kbps involves a small lossy-to-lossy quality reduction that is inaudible for most content.' },
      { q: 'Are my MOV files uploaded to a server?', a: 'No. FFmpeg.wasm processes everything in your browser.' },
      { q: 'Why would I want MP3 from a MOV instead of just the audio from the MOV?', a: 'MP3 plays on car stereos, portable players, older phones, and every audio app. MOV is a video container — even though the audio inside is compatible, you\'d need a video-capable player to access it.' },
      { q: 'What\'s the maximum MOV file size?', a: '100MB per file.' },
      { q: 'Can I do this on iPhone?', a: 'Yes — open FileConvertir in Safari on iPhone, select the MOV from your Files app, and download the MP3.' },
    ],
    useCases: [
      'Extract narration or voice-over audio from Mac screen recordings saved as MOV',
      'Get the audio track from iPhone video clips to use in podcast or music projects',
      'Convert lecture or meeting recordings saved in MOV format to MP3 for easy sharing',
      'Extract music from iPhone-recorded live performance MOV files for offline listening',
    ],
  },

  /* ─────────────────────────────────────────────────────────────────────────
     NEW PRIORITY PAGES — DOCUMENT CONVERSIONS
  ───────────────────────────────────────────────────────────────────────── */

  'docx-to-pdf': {
    title: 'DOCX to PDF Converter — Free, Preserves Formatting | FileConvertir',
    metaDescription: 'Convert Word DOCX to PDF free online — no upload, no signup. Preserve fonts, layout & formatting. Browser-based, 100% private. Works on Windows, Mac & mobile.',
    heading: 'DOCX to PDF Converter',
    description: 'Convert Word DOCX documents to PDF instantly in your browser. Preserve your formatting, fonts, and layout for professional document sharing — without uploading your file to any server.',
    longDescription: 'Converting a Word document to PDF is one of the most universal tasks in any workplace or school: sending a resume, sharing a report, locking a contract for signature, or creating a print-ready document. FileConvertir converts DOCX to PDF directly in your browser using Mammoth.js and jsPDF, extracting your document\'s text and structure without uploading it to any server. Your document content stays on your device — especially important for confidential contracts, CVs, or business reports. The PDF output preserves headings, paragraphs, lists, and text formatting from your Word document.',
    howToSteps: [
      { name: 'Drop your DOCX file', text: 'Drag your .docx file into the converter, or click "Select Files" to browse.' },
      { name: 'Select PDF as output', text: 'Choose PDF from the output format dropdown.' },
      { name: 'Browser converts locally', text: 'Mammoth.js extracts the document content and jsPDF assembles the PDF on your device. Nothing is uploaded.' },
      { name: 'Download the PDF', text: 'Save the finished PDF — ready to send, print, or share.' },
    ],
    whyChooseUs: [
      { title: 'Document stays on your device', text: 'Confidential contracts, CVs, and business reports are processed locally. Nothing goes to a server, unlike most online DOCX-to-PDF tools.' },
      { title: 'No Microsoft Word needed', text: 'Convert DOCX to PDF on Windows, Mac, Linux, iPad, or Android — no Office license required.' },
      { title: 'Free, no account, no watermark', text: 'No limit on conversions, no watermark added to your PDF, no signup required.' },
    ],
    faqs: [
      { q: 'Will the PDF look exactly like my Word document?', a: 'FileConvertir preserves text, headings, paragraphs, bold/italic formatting, and lists. Complex layouts with advanced tables, text boxes, footnotes, or custom fonts may render differently. For pixel-perfect conversion, use "Save as PDF" in Microsoft Word itself or Google Docs.' },
      { q: 'Is my DOCX document uploaded to a server?', a: 'No. Mammoth.js and jsPDF process the document entirely in your browser. Your file never leaves your device.' },
      { q: 'Why convert DOCX to PDF instead of sharing the DOCX?', a: 'PDFs preserve your formatting exactly as you designed it, regardless of what software or OS the recipient uses. They also prevent accidental editing and are accepted by most submission portals, email clients, and print shops.' },
      { q: 'Does this work on iPhone or Android?', a: 'Yes. Open the page in mobile Safari or Chrome, select your DOCX file, and download the PDF.' },
      { q: 'Can I convert a password-protected DOCX?', a: 'No. Password-protected DOCX files cannot be opened without the password, and the converter cannot bypass document protection.' },
      { q: 'Will images in my DOCX appear in the PDF?', a: 'Basic image embedding is supported, though complex image positioning from Word layouts may differ.' },
      { q: 'Is there a file size limit?', a: 'Up to 100MB per DOCX file. Most normal documents are well under 10MB.' },
      { q: 'What if I get a blank PDF?', a: 'This can happen with DOCX files that use advanced features or unusual encoding. Try re-saving the document in Word or Google Docs first, then converting.' },
    ],
    useCases: [
      'Convert your resume or CV from DOCX to PDF before emailing or uploading to job portals',
      'Share business reports and proposals as PDF to prevent recipients from editing the content',
      'Submit DOCX academic papers or assignments to portals that only accept PDF',
      'Create a print-ready PDF from a Word document without opening Microsoft Word',
    ],
  },

  'docx-to-txt': {
    title: 'DOCX to TXT Converter — Extract Text from Word Free | FileConvertir',
    metaDescription: 'Convert Word DOCX to plain text free online — no upload, no signup. Extract clean text from Word documents. Browser-based, 100% private. Works on any device.',
    heading: 'DOCX to TXT Converter',
    description: 'Extract plain text from Word DOCX documents instantly in your browser. Remove formatting, tables, and styles — get clean text for scripts, AI prompts, databases, and code pipelines.',
    longDescription: 'Plain text extracted from Word documents is an essential step in many workflows: feeding document content into an AI or LLM, importing text into a CMS or database, running text analysis scripts, or simply getting clean, copyable text without formatting noise. FileConvertir extracts text from DOCX files using Mammoth.js directly in your browser — no upload, no server, no account. The output is a .txt file containing all paragraph text from your Word document, ready to paste, import, or process however you need.',
    howToSteps: [
      { name: 'Drop your DOCX file', text: 'Drag your .docx file into the converter or click "Select Files".' },
      { name: 'Select TXT as output', text: 'Choose TXT from the output format dropdown.' },
      { name: 'Mammoth.js extracts text locally', text: 'Your browser reads the DOCX and strips all formatting, leaving clean plain text. Nothing is uploaded.' },
      { name: 'Download the TXT file', text: 'Save the plain text file — ready to import, paste, or process.' },
    ],
    whyChooseUs: [
      { title: 'Clean text without markup or XML', text: 'Unlike opening DOCX in a text editor and seeing raw XML, this extracts readable paragraph text with proper line breaks.' },
      { title: 'Private — documents never uploaded', text: 'Business documents, legal contracts, and research papers are processed locally in your browser.' },
      { title: 'Useful for AI, CMS, and data pipelines', text: 'The output TXT is ready to paste into ChatGPT, import into a CMS, or feed into text analysis scripts.' },
    ],
    faqs: [
      { q: 'What gets extracted from the DOCX?', a: 'Paragraph text, headings, and list items are extracted. Tables are converted to plain-text rows. Images, charts, embedded objects, headers, footers, and footnotes are not included in the TXT output.' },
      { q: 'Is my document uploaded to a server?', a: 'No. Mammoth.js parses the DOCX entirely in your browser. Your document content never leaves your device.' },
      { q: 'Why extract text instead of copying from Word?', a: 'Copying from Word often includes hidden formatting characters, special spaces, and SmartQuotes that cause issues in plain-text contexts like code, databases, or AI prompts. A TXT extraction gives you clean, standard ASCII/UTF-8 text.' },
      { q: 'Does the TXT preserve paragraph structure?', a: 'Yes — paragraphs are separated by line breaks. Headings are included as text lines. Lists are converted to hyphens or numbered lines.' },
      { q: 'Can I use this for AI training data or LLM prompts?', a: 'Yes. Plain TXT is the ideal format for pasting into AI tools, as it eliminates formatting noise that can confuse the model.' },
      { q: 'Is there a file size limit?', a: 'Up to 100MB per DOCX. Normal documents are well under this limit.' },
    ],
    useCases: [
      'Extract text from Word documents to feed into AI tools, ChatGPT, or language model prompts',
      'Convert DOCX reports to TXT for importing into CMS platforms and databases',
      'Get plain text from legal contracts or business documents for analysis or search indexing',
      'Strip Word formatting from DOCX files before processing with Python or shell scripts',
    ],
  },

  'pdf-to-txt': {
    title: 'PDF to Text Converter — Extract Text Free | FileConvertir',
    metaDescription: 'Extract text from PDF free online — no upload, no signup. Convert PDF to plain text instantly in your browser. 100% private. Works on Windows, Mac & mobile.',
    heading: 'PDF to Text Converter',
    description: 'Extract plain text from PDF documents directly in your browser. Get clean, copyable text from PDFs without uploading your file to any server. Free, instant, and private.',
    longDescription: 'Extracting text from a PDF is a constant need: copying content from a locked PDF where Ctrl+C is disabled, preparing PDF content for AI tools, building searchable text from document archives, extracting data for spreadsheets, or processing documents in code pipelines. FileConvertir uses pdf.js (Mozilla\'s PDF engine) to read your PDF and extract all text content entirely in your browser — no upload, no server-side processing, complete privacy for your documents. The output is a plain .txt file with the PDF\'s text content, ready to copy, import, or process.',
    howToSteps: [
      { name: 'Drop your PDF file', text: 'Drag your .pdf into the converter or click "Select Files". Files up to 100MB supported.' },
      { name: 'Select TXT as output', text: 'Choose TXT from the output format dropdown.' },
      { name: 'pdf.js extracts text in-browser', text: 'Mozilla\'s pdf.js engine reads the PDF and extracts all text on your device. Nothing is uploaded.' },
      { name: 'Download the TXT', text: 'Save the extracted plain text file — ready to use in any application.' },
    ],
    whyChooseUs: [
      { title: 'Uses Mozilla\'s trusted pdf.js engine', text: 'The same PDF engine that powers Firefox processes your PDF locally — no server involved, no third-party processing.' },
      { title: 'Sensitive documents never leave your device', text: 'Financial reports, legal filings, medical records, and confidential PDFs are processed in your browser only.' },
      { title: 'Clean, importable plain text', text: 'The output is UTF-8 plain text — paste into any editor, AI tool, database, or script without formatting issues.' },
    ],
    faqs: [
      { q: 'Will this work on PDFs where copy-paste is disabled?', a: 'It depends. If the PDF is a true digital text PDF (not a scanned image), pdf.js can extract the text even if the document has copy restrictions in its metadata. For purely image-based scanned PDFs, text extraction won\'t work — those require OCR, which this tool doesn\'t perform.' },
      { q: 'What\'s the difference between a text PDF and a scanned PDF?', a: 'A text PDF has actual text encoded in the file (created from Word, Google Docs, or a PDF printer). A scanned PDF is just a photo of a document — text inside is not machine-readable without OCR.' },
      { q: 'Is my PDF uploaded to a server?', a: 'No. pdf.js processes everything in your browser. Your PDF never leaves your device.' },
      { q: 'Can I extract text for AI or LLM use?', a: 'Yes. Plain TXT is the best format for pasting into ChatGPT, Claude, Gemini, or any AI tool. PDF encoding often confuses AI tools; plain text doesn\'t.' },
      { q: 'Does the converter preserve the text layout?', a: 'Text is extracted in reading order, but PDF layouts (multi-column, text boxes) may result in jumbled ordering. For well-structured PDFs (reports, academic papers, contracts) the output reads naturally.' },
      { q: 'What\'s the maximum PDF file size?', a: '100MB per file. Most PDFs are well under 10MB.' },
      { q: 'Will tables in the PDF extract correctly?', a: 'Table data is extracted, but table structure (rows/columns) is not preserved — cells appear as lines of text. For table data extraction, a dedicated PDF parsing tool works better.' },
    ],
    useCases: [
      'Extract text from PDFs to paste into ChatGPT, Claude, or other AI tools as context',
      'Convert text-layer PDFs to TXT for importing into databases, CMS platforms, or spreadsheets',
      'Get searchable text from PDF reports and legal documents for indexing or analysis',
      'Extract text from PDF articles or research papers before running text analysis scripts',
    ],
  },

  /* ─────────────────────────────────────────────────────────────────────────
     NEW PRIORITY PAGES — FONT CONVERSION
  ───────────────────────────────────────────────────────────────────────── */

  'ttf-to-woff': {
    title: 'TTF to WOFF Converter — Free Web Font Converter | FileConvertir',
    metaDescription: 'Convert TTF to WOFF free online — no upload, no signup. Generate web-ready WOFF fonts for CSS @font-face without installing tools. Browser-based, 100% private.',
    heading: 'TTF to WOFF Converter',
    description: 'Convert TTF font files to WOFF format for use in CSS @font-face — instantly in your browser. No install, no upload. Get web-ready fonts without Fontforge or Python tools.',
    longDescription: 'Web developers regularly need to convert TTF (TrueType Font) files to WOFF (Web Open Font Format) for use in CSS @font-face declarations. WOFF is the compressed web font format with universal browser support — every browser released after 2012 supports it. While WOFF2 is slightly more efficient, WOFF remains important for maximum compatibility. FileConvertir converts TTF to WOFF directly in your browser using opentype.js — no upload, no server, no Fontforge or Python scripts required. Drop your TTF, download the WOFF, drop it into your project.',
    howToSteps: [
      { name: 'Drop your TTF file', text: 'Drag your .ttf font file into the converter, or click "Select Files".' },
      { name: 'Select WOFF as output', text: 'Choose WOFF from the output format dropdown.' },
      { name: 'opentype.js converts locally', text: 'opentype.js reads the TTF and generates the WOFF on your device. Nothing is uploaded.' },
      { name: 'Download the WOFF', text: 'Save the .woff file — ready to reference in your CSS @font-face rule.' },
    ],
    whyChooseUs: [
      { title: 'No Fontforge, no Python, no CLI tools', text: 'Font format conversion used to require installing Fontforge or Python font libraries. FileConvertir does it in any browser, instantly.' },
      { title: 'Font files stay on your device', text: 'Custom or proprietary fonts are processed locally without being uploaded. No licensing exposure from cloud conversion.' },
      { title: 'WOFF works in every browser', text: 'WOFF has 100% browser support going back to IE9. It\'s the safe choice for maximum compatibility across web projects.' },
    ],
    faqs: [
      { q: 'What\'s the difference between WOFF and WOFF2?', a: 'WOFF2 uses Brotli compression and is 20–30% smaller than WOFF. Both are web font formats. WOFF2 is supported in all modern browsers (Chrome 36+, Firefox 39+, Safari 12+). For maximum compatibility including older Android browsers, providing both WOFF and WOFF2 is common practice.' },
      { q: 'How do I use a WOFF font in CSS?', a: 'Use the @font-face rule: @font-face { font-family: \'MyFont\'; src: url(\'/fonts/myfont.woff\') format(\'woff\'); } Then apply it with font-family: \'MyFont\'; in your styles.' },
      { q: 'Is it legal to convert TTF fonts to WOFF?', a: 'It depends on the font\'s license. Many free and open-source fonts (Google Fonts, Open Font License) explicitly permit format conversion for web use. Commercial fonts may restrict format conversion in their EULA. Check the font\'s license before converting and distributing.' },
      { q: 'Are my font files uploaded to a server?', a: 'No. opentype.js processes everything in your browser.' },
      { q: 'Should I use WOFF or WOFF2 for my website?', a: 'WOFF2 for all modern browsers, with WOFF as a fallback. The @font-face src can list both: src: url(font.woff2) format(\'woff2\'), url(font.woff) format(\'woff\'); Browsers use the first format they support.' },
      { q: 'Can I convert multiple TTF files at once?', a: 'Yes — up to 20 font files per batch.' },
      { q: 'Will all font features (kerning, ligatures) be preserved?', a: 'Yes. WOFF is a wrapper format — the underlying font data (including OpenType features like kerning, ligatures, and glyph substitutions) is fully preserved.' },
    ],
    useCases: [
      'Convert TTF fonts to WOFF for use in CSS @font-face declarations on web projects',
      'Prepare desktop fonts for web deployment without installing Fontforge or Python tools',
      'Generate WOFF fallbacks alongside WOFF2 for maximum browser compatibility',
      'Convert custom brand fonts to WOFF for self-hosting without relying on Google Fonts CDN',
    ],
  },

};
