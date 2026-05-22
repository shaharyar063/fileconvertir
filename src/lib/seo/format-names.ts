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


export function name(ext: string): string {
  return formatNames[ext] || ext.toUpperCase();
}

export function desc(ext: string): string {
  return formatDescriptions[ext] || `${name(ext)} file format.`;
}

export function formatNameList(formats: string[], maxNames = 3): string {
  const unique = [...new Set(formats)];
  if (unique.length === 0) return 'many formats';
  const shown = unique.slice(0, maxNames).map((f) => name(f));
  if (unique.length <= maxNames) return shown.join(', ');
  return `${shown.join(', ')} & more`;
}
