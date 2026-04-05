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

export function getConverterSEO(source: string, target: string): ConverterSEO {
  const s = name(source);
  const t = name(target);
  const key = `${source}-to-${target}`;
  const specific = converterSpecific[key];

  return {
    title: `${s} to ${t} Converter — Free Online | FileConvertir`,
    metaDescription: specific?.metaDescription ?? `Convert ${s} to ${t} free online — no file upload, 100% private. Runs instantly in your browser. No signup required.`,
    heading: `Convert ${s} to ${t}`,
    description: specific?.description ?? `Instantly convert your ${s} files to ${t} format. The conversion runs entirely in your browser — your files never leave your device.`,
    sourceInfo: desc(source),
    targetInfo: desc(target),
    useCases: generateUseCases(source, target),
    faqs: generateFAQs(source, target),
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
