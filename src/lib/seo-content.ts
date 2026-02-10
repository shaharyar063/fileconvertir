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
  tiff: 'TIFF', svg: 'SVG', heic: 'HEIC', ico: 'ICO', avif: 'AVIF',
  eps: 'EPS', psd: 'PSD', tga: 'TGA',
  pdf: 'PDF', docx: 'DOCX', doc: 'DOC', txt: 'TXT', csv: 'CSV',
  rtf: 'RTF', html: 'HTML', md: 'Markdown', odt: 'ODT',
  mp3: 'MP3', wav: 'WAV', aac: 'AAC', ogg: 'OGG', flac: 'FLAC', m4a: 'M4A',
  mp4: 'MP4', webm: 'WebM', mkv: 'MKV', mov: 'MOV', avi: 'AVI',
  ttf: 'TTF', otf: 'OTF', woff: 'WOFF', woff2: 'WOFF2',
  zip: 'ZIP', tar: 'TAR', gz: 'GZ', '7z': '7Z', rar: 'RAR',
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
  zip: 'ZIP is the most common archive format for compressing and bundling files.',
  tar: 'TAR bundles multiple files into a single archive, commonly used on Unix/Linux systems.',
  gz: 'GZ (Gzip) provides single-file compression, often used alongside TAR on Linux.',
};

function name(ext: string): string {
  return formatNames[ext] || ext.toUpperCase();
}

function desc(ext: string): string {
  return formatDescriptions[ext] || `${name(ext)} file format.`;
}

export function getConverterSEO(source: string, target: string): ConverterSEO {
  const s = name(source);
  const t = name(target);

  return {
    title: `${s} to ${t} Converter — Free Online | QuickConvert`,
    metaDescription: `Convert ${s} files to ${t} format instantly in your browser. No upload to servers, no signup required. Free and private.`,
    heading: `Convert ${s} to ${t}`,
    description: `Instantly convert your ${s} files to ${t} format. The conversion runs entirely in your browser — your files never leave your device.`,
    sourceInfo: desc(source),
    targetInfo: desc(target),
    useCases: generateUseCases(source, target),
    faqs: generateFAQs(source, target),
  };
}

export function getFormatSEO(targetFormat: string): FormatSEO {
  const t = name(targetFormat);
  return {
    title: `Convert to ${t} — Free Online Converter | QuickConvert`,
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
      q: `Can I convert multiple files?`,
      a: `Currently, you can convert one file at a time. After downloading, click "New" to start another conversion.`,
    },
  ];
}

function getCategoryForFormat(ext: string): string {
  const imageFormats = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp', 'tiff', 'svg', 'heic', 'ico', 'avif', 'eps', 'psd', 'tga'];
  const docFormats = ['pdf', 'docx', 'doc', 'txt', 'csv', 'rtf', 'html', 'md', 'odt'];
  const audioFormats = ['mp3', 'wav', 'aac', 'ogg', 'flac', 'm4a'];
  const videoFormats = ['mp4', 'webm', 'mkv', 'mov', 'avi'];
  const fontFormats = ['ttf', 'otf', 'woff', 'woff2'];
  const archiveFormats = ['zip', 'tar', 'gz', '7z', 'rar'];

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
