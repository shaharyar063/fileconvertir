/**
 * SEO content for converter pages and format pages.
 * Provides unique titles, descriptions, FAQs, use cases, and related links.
 */

import { converterRoutes } from './converters';

export interface ConverterSEO {
  title: string;
  metaDescription: string;
  heading: string;
  description: string;
  useCases: string[];
  sourceInfo: string;
  targetInfo: string;
  faqs: { q: string; a: string }[];
  /** Optional deep-content fields used only for priority "money pages". */
  longDescription?: string;
  howToSteps?: { name: string; text: string }[];
  whyChooseUs?: { title: string; text: string }[];
  isPriority?: boolean;
}

/**
 * The 6 priority "money pages" we are actively trying to rank for.
 * These get deep, hand-written content + boosted sitemap priority.
 */
export const PRIORITY_CONVERTERS = [
  'heic-to-jpg',
  'avif-to-jpg',
  'm4a-to-mp3',
  'mov-to-mp4',
  'tiff-to-jpg',
  'webp-to-png',
] as const;

export function isPriorityConverter(slug: string): boolean {
  return (PRIORITY_CONVERTERS as readonly string[]).includes(slug);
}

export interface FormatSEO {
  title: string;
  metaDescription: string;
  heading: string;
  description: string;
  details: string;
  useCases: string[];
  faqs: { q: string; a: string }[];
}

const formatNames: Record<string, string> = {
  jpg: 'JPEG', jpeg: 'JPEG', png: 'PNG', webp: 'WebP', gif: 'GIF', bmp: 'BMP',
  tiff: 'TIFF', svg: 'SVG', heic: 'HEIC', heif: 'HEIF', ico: 'ICO', avif: 'AVIF',
  eps: 'EPS', psd: 'PSD', tga: 'TGA',
  pdf: 'PDF', docx: 'DOCX', doc: 'DOC', txt: 'TXT', csv: 'CSV',
  rtf: 'RTF', html: 'HTML', md: 'Markdown', odt: 'ODT',
  xlsx: 'XLSX', xls: 'XLS', ods: 'ODS',
  pptx: 'PPTX', ppt: 'PPT', odp: 'ODP',
  epub: 'EPUB', mobi: 'MOBI',
  mp3: 'MP3', wav: 'WAV', aac: 'AAC', ogg: 'OGG', flac: 'FLAC', m4a: 'M4A',
  aiff: 'AIFF', wma: 'WMA',
  mp4: 'MP4', webm: 'WebM', mkv: 'MKV', mov: 'MOV', avi: 'AVI',
  flv: 'FLV', wmv: 'WMV', '3gp': '3GP',
  ttf: 'TTF', otf: 'OTF', woff: 'WOFF', woff2: 'WOFF2', eot: 'EOT',
  zip: 'ZIP', tar: 'TAR', gz: 'GZ', '7z': '7Z', rar: 'RAR', iso: 'ISO',
};

const formatDescriptions: Record<string, string> = {
  jpg: 'JPEG is the most widely used lossy image format, ideal for photographs and web images with small file sizes.',
  png: 'PNG is a lossless image format that supports transparency, perfect for graphics, logos, and screenshots.',
  webp: 'WebP is a modern image format by Google that provides superior compression for both lossy and lossless images.',
  gif: 'GIF supports simple animations and limited color palettes, commonly used for short animated clips.',
  bmp: 'BMP (Bitmap) is an uncompressed image format used in Windows environments.',
  tiff: 'TIFF is a flexible, high-quality image format commonly used in publishing and photography.',
  svg: 'SVG is a vector image format based on XML, ideal for logos, icons, and scalable graphics.',
  heic: 'HEIC is Apple\'s high-efficiency image format that offers better compression than JPEG.',
  ico: 'ICO is the standard icon format used for favicons and Windows application icons.',
  avif: 'AVIF is a next-gen image format based on AV1 codec, offering excellent compression and quality.',
  eps: 'EPS (Encapsulated PostScript) is a vector format used in professional printing.',
  psd: 'PSD is Adobe Photoshop\'s native format supporting layers and advanced editing features.',
  tga: 'TGA (Targa) is an image format commonly used in game development and video production.',
  pdf: 'PDF is the universal document format that preserves formatting across all platforms.',
  docx: 'DOCX is Microsoft Word\'s document format, widely used for text documents and reports.',
  txt: 'TXT is a plain text format with no formatting, universally compatible with all systems.',
  csv: 'CSV stores tabular data as comma-separated values, used for spreadsheets and data exchange.',
  html: 'HTML is the standard markup language for web pages and web applications.',
  md: 'Markdown is a lightweight markup language for creating formatted text using a plain-text editor.',
  rtf: 'RTF (Rich Text Format) is a cross-platform document format supporting basic formatting.',
  mp3: 'MP3 is the most popular audio format, offering good quality with high compression.',
  wav: 'WAV is an uncompressed audio format providing lossless, studio-quality sound.',
  aac: 'AAC is an advanced audio codec offering better quality than MP3 at similar bitrates.',
  ogg: 'OGG Vorbis is an open-source audio format with excellent quality and compression.',
  flac: 'FLAC is a lossless audio format that perfectly preserves original audio quality.',
  m4a: 'M4A is an Apple audio format based on AAC, commonly used in iTunes and Apple Music.',
  mp4: 'MP4 is the most widely supported video container format for streaming and playback.',
  webm: 'WebM is an open video format optimized for web streaming.',
  mov: 'MOV is Apple\'s QuickTime video format, widely used in video editing.',
  ttf: 'TrueType Font (TTF) is a widely supported font format for desktop and print use.',
  otf: 'OpenType Font (OTF) extends TTF with advanced typographic features.',
  woff: 'WOFF (Web Open Font Format) is optimized for web delivery with built-in compression.',
  woff2: 'WOFF2 offers even better compression than WOFF for faster web font loading.',
  eot: 'EOT (Embedded OpenType) is a legacy web font format primarily used by older versions of Internet Explorer.',
  heif: 'HEIF (High Efficiency Image File Format) stores images with better compression than JPEG, used on Apple devices.',
  xlsx: 'XLSX is the modern Microsoft Excel spreadsheet format based on Open XML, supporting formulas and charts.',
  xls: 'XLS is the legacy Microsoft Excel spreadsheet format, still widely used for compatibility.',
  ods: 'ODS (OpenDocument Spreadsheet) is an open-standard spreadsheet format used by LibreOffice and OpenOffice.',
  pptx: 'PPTX is the modern Microsoft PowerPoint format for slide presentations.',
  ppt: 'PPT is the legacy Microsoft PowerPoint format for slide presentations.',
  odp: 'ODP (OpenDocument Presentation) is an open-standard format for slide presentations.',
  epub: 'EPUB is the standard e-book format supporting reflowable content across various readers and devices.',
  mobi: 'MOBI is Amazon Kindle\'s e-book format, optimized for reading on Kindle devices.',
  aiff: 'AIFF (Audio Interchange File Format) is an uncompressed audio format developed by Apple for professional audio.',
  wma: 'WMA (Windows Media Audio) is a Microsoft audio format offering good compression for music and podcasts.',
  mkv: 'MKV (Matroska) is a flexible, open-standard multimedia container supporting unlimited video, audio, and subtitle tracks.',
  avi: 'AVI (Audio Video Interleave) is a classic Microsoft multimedia container format with broad compatibility.',
  flv: 'FLV (Flash Video) is a container format originally used for streaming video via Adobe Flash Player.',
  wmv: 'WMV (Windows Media Video) is a Microsoft video format commonly used for streaming and download.',
  '3gp': '3GP is a multimedia container format designed for 3G mobile phones with small file sizes.',
  doc: 'DOC is the legacy Microsoft Word document format, widely supported across word processors.',
  odt: 'ODT (OpenDocument Text) is an open-standard word processing format used by LibreOffice and OpenOffice.',
  zip: 'ZIP is the most common archive format for compressing and bundling files.',
  tar: 'TAR bundles multiple files into a single archive, commonly used on Unix/Linux systems.',
  gz: 'GZ (Gzip) provides single-file compression, often used alongside TAR on Linux.',
  '7z': '7Z is a high-compression archive format that supports strong AES-256 encryption.',
  rar: 'RAR is a proprietary archive format known for high compression ratios and split archive support.',
  iso: 'ISO is a disc image format that contains an exact copy of data from an optical disc.',
};

function name(ext: string): string {
  return formatNames[ext] || ext.toUpperCase();
}

function desc(ext: string): string {
  return formatDescriptions[ext] || `${name(ext)} file format.`;
}

/**
 * Hand-crafted content for the highest-traffic converter pairs.
 * Unique descriptions improve CTR and signal content quality to Google.
 */
const converterSpecific: Record<string, { metaDescription: string; description: string }> = {
  'heic-to-jpg': {
    metaDescription: 'Convert HEIC photos to JPG instantly — no upload, 100% private. Works with iPhone & Apple device photos. Free, unlimited, no signup needed.',
    description: 'Convert HEIC (High-Efficiency Image Format) photos from your iPhone or Mac to widely-compatible JPEG format. Works entirely in your browser — your photos never leave your device.',
  },
  'heic-to-png': {
    metaDescription: 'Convert HEIC to PNG free online — no upload required. Keeps transparency. Works with iPhone photos. 100% private, runs in your browser.',
    description: 'Convert HEIC images from iPhone and Apple devices to PNG format with lossless quality. Everything runs in your browser — no servers, no privacy risk.',
  },
  'heif-to-jpg': {
    metaDescription: 'Convert HEIF to JPG free online — no file upload, 100% private. Works instantly in your browser. No signup required.',
    description: 'Convert HEIF (High-Efficiency Image Format) files to universally compatible JPEG. No file upload needed — conversion happens entirely in your browser.',
  },
  'tiff-to-jpg': {
    metaDescription: 'Convert TIFF to JPG online, free — no upload, 100% private. Perfect for photographers and print workflows. Instant browser-based conversion.',
    description: 'Convert TIFF images to JPEG format for web sharing and email. TIFF files stay on your device — all processing runs locally in your browser.',
  },
  'png-to-jpg': {
    metaDescription: 'Convert PNG to JPG free online — no upload, 100% private. Instant in-browser conversion, no signup. Reduce file size without losing quality.',
    description: 'Convert PNG images to JPEG format to reduce file size for web, email, or social media. No file upload — conversion runs entirely in your browser.',
  },
  'jpg-to-png': {
    metaDescription: 'Convert JPG to PNG free online — no upload, 100% private. Add transparency support. Instant browser-based, no signup required.',
    description: 'Convert JPEG images to PNG format to gain transparency support and lossless quality. Your files stay local — nothing is ever uploaded to a server.',
  },
  'webp-to-jpg': {
    metaDescription: 'Convert WebP to JPG free online — no upload, 100% private. Fix WebP compatibility issues. Instant, browser-based, no signup.',
    description: 'Convert WebP images to JPEG for broader compatibility with apps, email clients, and social media. Runs entirely in your browser — no data is uploaded.',
  },
  'webp-to-png': {
    metaDescription: 'Convert WebP to PNG free online — no upload, 100% private. Preserve transparency. Instant in-browser conversion, no signup required.',
    description: 'Convert WebP images to PNG to preserve transparency and lossless quality. No file upload ever — all conversion happens locally in your browser.',
  },
  'svg-to-png': {
    metaDescription: 'Convert SVG to PNG free online — no upload, 100% private. Choose output size. Instant browser conversion, no signup needed.',
    description: 'Convert scalable SVG vector graphics to raster PNG images at any resolution. Your files never leave your browser — 100% private conversion.',
  },
  'avif-to-jpg': {
    metaDescription: 'Convert AVIF to JPG free online — no upload, 100% private. Fix AVIF compatibility instantly. Browser-based, no signup required.',
    description: 'Convert AVIF next-gen images to universally supported JPEG format. Runs entirely in your browser — your files are never uploaded to any server.',
  },
  'bmp-to-jpg': {
    metaDescription: 'Convert BMP to JPG free online — no upload, 100% private. Reduce huge BMP file sizes. Instant, browser-based, no signup.',
    description: 'Convert large BMP bitmap images to compact JPEG format. All processing runs locally in your browser — your files never leave your device.',
  },
  'mp4-to-mp3': {
    metaDescription: 'Extract audio from MP4 video to MP3 free online — no upload, 100% private. Runs in your browser, no signup required.',
    description: 'Extract and convert audio from MP4 video files to MP3 format. Uses FFmpeg.wasm to process everything locally — your video files never leave your device.',
  },
  'm4a-to-mp3': {
    metaDescription: 'Convert M4A to MP3 free online — no upload, 100% private. Works with Apple Music and iPhone audio. Instant browser conversion.',
    description: 'Convert M4A audio files (common on iPhone and Apple Music) to universally compatible MP3. Runs entirely in your browser using FFmpeg — no file upload needed.',
  },
  'wav-to-mp3': {
    metaDescription: 'Convert WAV to MP3 free online — no upload, 100% private. Shrink large WAV files instantly. Browser-based conversion, no signup.',
    description: 'Convert large uncompressed WAV audio to compact MP3 format. Runs locally in your browser with FFmpeg.wasm — your audio files are never uploaded.',
  },
  'flac-to-mp3': {
    metaDescription: 'Convert FLAC to MP3 free online — no upload, 100% private. Perfect for portable playback. Instant browser-based, no signup required.',
    description: 'Convert lossless FLAC audio to MP3 for portable playback on any device. FFmpeg processes your files entirely in-browser — no server, no upload.',
  },
  'aac-to-mp3': {
    metaDescription: 'Convert AAC to MP3 free online — no upload, 100% private. Broad player compatibility. Instant in-browser, no signup needed.',
    description: 'Convert AAC audio to MP3 for maximum player compatibility. Everything runs in your browser via FFmpeg.wasm — your audio files stay on your device.',
  },
  'ogg-to-mp3': {
    metaDescription: 'Convert OGG to MP3 free online — no upload, 100% private. Browser-based FFmpeg conversion, no signup required.',
    description: 'Convert OGG Vorbis audio to widely supported MP3 format. Uses FFmpeg.wasm in your browser — files are never uploaded to any server.',
  },
  'mov-to-mp4': {
    metaDescription: 'Convert MOV to MP4 free online — no upload, 100% private. Fix QuickTime compatibility instantly. Browser-based, no signup.',
    description: 'Convert Apple QuickTime MOV videos to universally compatible MP4. FFmpeg runs locally in your browser — your video files never leave your device.',
  },
  'mkv-to-mp4': {
    metaDescription: 'Convert MKV to MP4 free online — no upload, 100% private. Fix MKV playback issues instantly. Browser FFmpeg, no signup.',
    description: 'Convert Matroska MKV video files to widely compatible MP4 format. All processing runs in your browser — no server upload, no privacy risk.',
  },
  'docx-to-pdf': {
    metaDescription: 'Convert DOCX to PDF free online — no upload, 100% private. Preserve formatting. Instant browser conversion, no signup required.',
    description: 'Convert Microsoft Word DOCX documents to PDF for universal sharing. All conversion runs in your browser — your documents are never uploaded to a server.',
  },
  'txt-to-pdf': {
    metaDescription: 'Convert TXT to PDF free online — no upload, 100% private. Instant in-browser conversion. No signup, no file size limits.',
    description: 'Convert plain text files to PDF format for professional sharing. Runs entirely in your browser using jsPDF — your files stay local.',
  },
};

/**
 * Deep, hand-written content for priority "money pages".
 * Each entry includes a tailored title, longer meta description, long-form description,
 * step-by-step HowTo, "why choose us" comparison points, and an extended FAQ list
 * specifically targeting long-tail keywords for that conversion.
 */
const priorityDeepContent: Record<string, Partial<ConverterSEO>> = {
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
  },
};

export function getConverterSEO(source: string, target: string): ConverterSEO {
  const s = name(source);
  const t = name(target);
  const key = `${source}-to-${target}`;
  const specific = converterSpecific[key];
  const deep = priorityDeepContent[key];

  const baseTitle = `${s} to ${t} Converter — Free Online | FileConvertir`;
  const baseMeta = specific?.metaDescription ?? `Convert ${s} to ${t} free online — no file upload, 100% private. Runs instantly in your browser. No signup required.`;
  const baseHeading = `Convert ${s} to ${t}`;
  const baseDescription = specific?.description ?? `Instantly convert your ${s} files to ${t} format. The conversion runs entirely in your browser — your files never leave your device.`;

  return {
    title: deep?.title ?? baseTitle,
    metaDescription: deep?.metaDescription ?? baseMeta,
    heading: deep?.heading ?? baseHeading,
    description: deep?.description ?? baseDescription,
    sourceInfo: desc(source),
    targetInfo: desc(target),
    useCases: generateUseCases(source, target),
    faqs: deep?.faqs ?? generateFAQs(source, target),
    longDescription: deep?.longDescription,
    howToSteps: deep?.howToSteps,
    whyChooseUs: deep?.whyChooseUs,
    isPriority: !!deep,
  };
}

export function getFormatSEO(targetFormat: string): FormatSEO {
  const t = name(targetFormat);
  return {
    title: `Convert to ${t} — Free Online Converter | FileConvertir`,
    metaDescription: `Convert files to ${t} format online for free. Supports multiple input formats. No upload, no signup — runs in your browser.`,
    heading: `Convert to ${t}`,
    description: `Convert your files to ${t} format instantly. Upload any supported file and download the converted ${t} file in seconds.`,
    details: desc(targetFormat),
    useCases: [
      `Convert files to ${t} for better compatibility`,
      `Prepare ${t} files for web publishing or sharing`,
      `Reduce file size by converting to ${t}`,
    ],
    faqs: [
      { q: `What files can I convert to ${t}?`, a: `We support multiple input formats. Simply upload your file and our converter will detect if it can be converted to ${t}.` },
      { q: `Is the conversion free?`, a: `Yes, all conversions are completely free with no limits. Your files are processed in your browser and never uploaded to any server.` },
      { q: `Is my data safe?`, a: `Absolutely. All processing happens locally in your browser. Your files never leave your device.` },
    ],
  };
}

export function getSourceFormatSEO(sourceFormat: string): FormatSEO {
  const s = name(sourceFormat);
  return {
    title: `${s} File Converter — Free Online | FileConvertir`,
    metaDescription: `Convert ${s} files to other formats instantly in your browser. No upload, no signup — 100% private.`,
    heading: `${s} File Converter`,
    description: `Convert your ${s} files to any supported format instantly. All processing happens in your browser — your files never leave your device.`,
    details: desc(sourceFormat),
    useCases: [
      `Convert ${s} files for better compatibility with different software`,
      `Share ${s} files in formats that recipients can open`,
      `Optimize ${s} files for web or print use`,
    ],
    faqs: [
      { q: `What formats can I convert ${s} to?`, a: `Select ${s} as input and the converter will show all available output formats.` },
      { q: `Is the conversion free?`, a: `Yes, completely free with no limits. No signup required.` },
      { q: `Is my data safe?`, a: `Absolutely. All processing happens locally in your browser. Your files never leave your device.` },
    ],
  };
}

function generateUseCases(source: string, target: string): string[] {
  const s = name(source);
  const t = name(target);
  const cases: string[] = [
    `Convert ${s} files to ${t} for better compatibility with your software`,
    `Share files in ${t} format when recipients can't open ${s} files`,
  ];

  const cat = getCategoryForFormat(source);
  if (cat === 'image') {
    cases.push(`Optimize images by converting from ${s} to ${t} for web use`);
    cases.push(`Prepare ${t} images for social media or email`);
  } else if (cat === 'document') {
    cases.push(`Convert documents for easier editing or archival`);
    cases.push(`Extract text content from ${s} files into ${t} format`);
  } else if (cat === 'audio' || cat === 'video') {
    cases.push(`Convert media for playback on different devices`);
    cases.push(`Reduce file size while maintaining quality`);
  } else if (cat === 'font') {
    cases.push(`Prepare web fonts for faster loading on websites`);
    cases.push(`Convert fonts for cross-platform compatibility`);
  } else if (cat === 'archive') {
    cases.push(`Repackage archives for different operating systems`);
    cases.push(`Convert to ${t} for broader tool support`);
  }
  return cases;
}

function generateFAQs(source: string, target: string): { q: string; a: string }[] {
  const s = name(source);
  const t = name(target);
  return [
    {
      q: `How do I convert ${s} to ${t}?`,
      a: `Simply upload your ${s} file using the converter above. The conversion starts automatically and you can download the ${t} file when it's done.`,
    },
    {
      q: `Is ${s} to ${t} conversion free?`,
      a: `Yes, completely free with no limits. No signup or account required.`,
    },
    {
      q: `Are my files uploaded to a server?`,
      a: `No. All conversions run locally in your browser using WebAssembly and JavaScript. Your files never leave your device, ensuring complete privacy.`,
    },
    {
      q: `What's the maximum file size?`,
      a: `The maximum file size is 100MB. Since processing happens in your browser, larger files may take longer depending on your device.`,
    },
    {
      q: `Can I convert multiple files at once?`,
      a: `Yes! You can batch convert up to 20 files at once. Select multiple files, choose your output format, and download them all as a ZIP archive when done.`,
    },
  ];
}

function getCategoryForFormat(ext: string): string {
  const imageFormats = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp', 'tiff', 'svg', 'heic', 'heif', 'ico', 'avif', 'eps', 'psd', 'tga'];
  const docFormats = ['pdf', 'docx', 'doc', 'txt', 'csv', 'rtf', 'html', 'md', 'odt', 'xlsx', 'xls', 'ods', 'pptx', 'ppt', 'odp', 'epub', 'mobi'];
  const audioFormats = ['mp3', 'wav', 'aac', 'ogg', 'flac', 'm4a', 'aiff', 'wma'];
  const videoFormats = ['mp4', 'webm', 'mkv', 'mov', 'avi', 'flv', 'wmv', '3gp'];
  const fontFormats = ['ttf', 'otf', 'woff', 'woff2', 'eot'];
  const archiveFormats = ['zip', 'tar', 'gz', '7z', 'rar', 'iso'];

  if (imageFormats.includes(ext)) return 'image';
  if (docFormats.includes(ext)) return 'document';
  if (audioFormats.includes(ext)) return 'audio';
  if (videoFormats.includes(ext)) return 'video';
  if (fontFormats.includes(ext)) return 'font';
  if (archiveFormats.includes(ext)) return 'archive';
  return 'other';
}

export function getRelatedConverters(source: string, target: string, limit = 6) {
  return converterRoutes
    .filter(r => r.slug !== `${source}-to-${target}`)
    .filter(r => r.sourceFormat === source || r.targetFormat === target || r.sourceFormat === target)
    .slice(0, limit);
}

export function getCategoryStats() {
  const cats: Record<string, number> = {};
  converterRoutes.forEach(r => {
    cats[r.category] = (cats[r.category] || 0) + 1;
  });
  return cats;
}

export function getTotalConversions(): number {
  return converterRoutes.length;
}
