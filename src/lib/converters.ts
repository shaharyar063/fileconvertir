import { getSourcesForTarget } from './conversion-map';

export interface ConverterRoute {
  slug: string;
  sourceFormat: string;
  targetFormat: string;
  label: string;
  category: string;
}

export interface FormatPage {
  slug: string;
  targetFormat: string;
  label: string;
  description: string;
  acceptedInputs: string[];
}

export const converterRoutes: ConverterRoute[] = [
  // ── Image ─────────────────────────────────────────────
  // JPG/JPEG
  { slug: 'jpg-to-png',  sourceFormat: 'jpg',  targetFormat: 'png',  label: 'JPG → PNG',  category: 'Image' },
  { slug: 'jpg-to-webp', sourceFormat: 'jpg',  targetFormat: 'webp', label: 'JPG → WebP', category: 'Image' },
  { slug: 'jpg-to-gif',  sourceFormat: 'jpg',  targetFormat: 'gif',  label: 'JPG → GIF',  category: 'Image' },
  { slug: 'jpg-to-bmp',  sourceFormat: 'jpg',  targetFormat: 'bmp',  label: 'JPG → BMP',  category: 'Image' },
  { slug: 'jpg-to-avif', sourceFormat: 'jpg',  targetFormat: 'avif', label: 'JPG → AVIF', category: 'Image' },
  // PNG
  { slug: 'png-to-jpg',  sourceFormat: 'png',  targetFormat: 'jpg',  label: 'PNG → JPG',  category: 'Image' },
  { slug: 'png-to-webp', sourceFormat: 'png',  targetFormat: 'webp', label: 'PNG → WebP', category: 'Image' },
  { slug: 'png-to-gif',  sourceFormat: 'png',  targetFormat: 'gif',  label: 'PNG → GIF',  category: 'Image' },
  { slug: 'png-to-bmp',  sourceFormat: 'png',  targetFormat: 'bmp',  label: 'PNG → BMP',  category: 'Image' },
  { slug: 'png-to-ico',  sourceFormat: 'png',  targetFormat: 'ico',  label: 'PNG → ICO',  category: 'Image' },
  { slug: 'png-to-eps',  sourceFormat: 'png',  targetFormat: 'eps',  label: 'PNG → EPS',  category: 'Image' },
  { slug: 'png-to-svg',  sourceFormat: 'png',  targetFormat: 'svg',  label: 'PNG → SVG',  category: 'Image' },
  { slug: 'png-to-psd',  sourceFormat: 'png',  targetFormat: 'psd',  label: 'PNG → PSD',  category: 'Image' },
  { slug: 'png-to-tga',  sourceFormat: 'png',  targetFormat: 'tga',  label: 'PNG → TGA',  category: 'Image' },
  { slug: 'png-to-tiff', sourceFormat: 'png',  targetFormat: 'tiff', label: 'PNG → TIFF', category: 'Image' },
  { slug: 'png-to-avif', sourceFormat: 'png',  targetFormat: 'avif', label: 'PNG → AVIF', category: 'Image' },
  // WebP
  { slug: 'webp-to-jpg',  sourceFormat: 'webp', targetFormat: 'jpg',  label: 'WebP → JPG',  category: 'Image' },
  { slug: 'webp-to-png',  sourceFormat: 'webp', targetFormat: 'png',  label: 'WebP → PNG',  category: 'Image' },
  { slug: 'webp-to-gif',  sourceFormat: 'webp', targetFormat: 'gif',  label: 'WebP → GIF',  category: 'Image' },
  { slug: 'webp-to-bmp',  sourceFormat: 'webp', targetFormat: 'bmp',  label: 'WebP → BMP',  category: 'Image' },
  { slug: 'webp-to-avif', sourceFormat: 'webp', targetFormat: 'avif', label: 'WebP → AVIF', category: 'Image' },
  // GIF
  { slug: 'gif-to-jpg',  sourceFormat: 'gif',  targetFormat: 'jpg',  label: 'GIF → JPG',  category: 'Image' },
  { slug: 'gif-to-png',  sourceFormat: 'gif',  targetFormat: 'png',  label: 'GIF → PNG',  category: 'Image' },
  { slug: 'gif-to-webp', sourceFormat: 'gif',  targetFormat: 'webp', label: 'GIF → WebP', category: 'Image' },
  // BMP
  { slug: 'bmp-to-jpg',  sourceFormat: 'bmp',  targetFormat: 'jpg',  label: 'BMP → JPG',  category: 'Image' },
  { slug: 'bmp-to-png',  sourceFormat: 'bmp',  targetFormat: 'png',  label: 'BMP → PNG',  category: 'Image' },
  { slug: 'bmp-to-webp', sourceFormat: 'bmp',  targetFormat: 'webp', label: 'BMP → WebP', category: 'Image' },
  { slug: 'bmp-to-gif',  sourceFormat: 'bmp',  targetFormat: 'gif',  label: 'BMP → GIF',  category: 'Image' },
  // TIFF
  { slug: 'tiff-to-jpg',  sourceFormat: 'tiff', targetFormat: 'jpg',  label: 'TIFF → JPG',  category: 'Image' },
  { slug: 'tiff-to-png',  sourceFormat: 'tiff', targetFormat: 'png',  label: 'TIFF → PNG',  category: 'Image' },
  { slug: 'tiff-to-webp', sourceFormat: 'tiff', targetFormat: 'webp', label: 'TIFF → WebP', category: 'Image' },
  // HEIC
  { slug: 'heic-to-jpg',  sourceFormat: 'heic', targetFormat: 'jpg',  label: 'HEIC → JPG',  category: 'Image' },
  { slug: 'heic-to-png',  sourceFormat: 'heic', targetFormat: 'png',  label: 'HEIC → PNG',  category: 'Image' },
  { slug: 'heic-to-webp', sourceFormat: 'heic', targetFormat: 'webp', label: 'HEIC → WebP', category: 'Image' },
  // HEIF
  { slug: 'heif-to-jpg',  sourceFormat: 'heif', targetFormat: 'jpg',  label: 'HEIF → JPG',  category: 'Image' },
  { slug: 'heif-to-png',  sourceFormat: 'heif', targetFormat: 'png',  label: 'HEIF → PNG',  category: 'Image' },
  { slug: 'heif-to-webp', sourceFormat: 'heif', targetFormat: 'webp', label: 'HEIF → WebP', category: 'Image' },
  // AVIF
  { slug: 'avif-to-jpg',  sourceFormat: 'avif', targetFormat: 'jpg',  label: 'AVIF → JPG',  category: 'Image' },
  { slug: 'avif-to-png',  sourceFormat: 'avif', targetFormat: 'png',  label: 'AVIF → PNG',  category: 'Image' },
  { slug: 'avif-to-webp', sourceFormat: 'avif', targetFormat: 'webp', label: 'AVIF → WebP', category: 'Image' },
  // SVG
  { slug: 'svg-to-png',  sourceFormat: 'svg',  targetFormat: 'png',  label: 'SVG → PNG',  category: 'Image' },
  { slug: 'svg-to-jpg',  sourceFormat: 'svg',  targetFormat: 'jpg',  label: 'SVG → JPG',  category: 'Image' },
  // ICO
  { slug: 'ico-to-png',  sourceFormat: 'ico',  targetFormat: 'png',  label: 'ICO → PNG',  category: 'Image' },
  { slug: 'ico-to-jpg',  sourceFormat: 'ico',  targetFormat: 'jpg',  label: 'ICO → JPG',  category: 'Image' },

  // ── Document ──────────────────────────────────────────
  { slug: 'pdf-to-txt',   sourceFormat: 'pdf',  targetFormat: 'txt',  label: 'PDF → TXT',   category: 'Document' },
  { slug: 'docx-to-txt',  sourceFormat: 'docx', targetFormat: 'txt',  label: 'DOCX → TXT',  category: 'Document' },
  { slug: 'docx-to-pdf',  sourceFormat: 'docx', targetFormat: 'pdf',  label: 'DOCX → PDF',  category: 'Document' },
  { slug: 'doc-to-txt',   sourceFormat: 'doc',  targetFormat: 'txt',  label: 'DOC → TXT',   category: 'Document' },
  { slug: 'txt-to-pdf',   sourceFormat: 'txt',  targetFormat: 'pdf',  label: 'TXT → PDF',   category: 'Document' },
  { slug: 'rtf-to-txt',   sourceFormat: 'rtf',  targetFormat: 'txt',  label: 'RTF → TXT',   category: 'Document' },
  { slug: 'html-to-txt',  sourceFormat: 'html', targetFormat: 'txt',  label: 'HTML → TXT',  category: 'Document' },
  { slug: 'html-to-pdf',  sourceFormat: 'html', targetFormat: 'pdf',  label: 'HTML → PDF',  category: 'Document' },
  { slug: 'md-to-txt',    sourceFormat: 'md',   targetFormat: 'txt',  label: 'MD → TXT',    category: 'Document' },
  { slug: 'md-to-html',   sourceFormat: 'md',   targetFormat: 'html', label: 'MD → HTML',   category: 'Document' },
  { slug: 'md-to-pdf',    sourceFormat: 'md',   targetFormat: 'pdf',  label: 'MD → PDF',    category: 'Document' },
  { slug: 'csv-to-txt',   sourceFormat: 'csv',  targetFormat: 'txt',  label: 'CSV → TXT',   category: 'Document' },

  // ── Audio ─────────────────────────────────────────────
  { slug: 'mp3-to-wav',   sourceFormat: 'mp3',  targetFormat: 'wav',  label: 'MP3 → WAV',   category: 'Audio' },
  { slug: 'wav-to-mp3',   sourceFormat: 'wav',  targetFormat: 'mp3',  label: 'WAV → MP3',   category: 'Audio' },
  { slug: 'aac-to-mp3',   sourceFormat: 'aac',  targetFormat: 'mp3',  label: 'AAC → MP3',   category: 'Audio' },
  { slug: 'aac-to-wav',   sourceFormat: 'aac',  targetFormat: 'wav',  label: 'AAC → WAV',   category: 'Audio' },
  { slug: 'ogg-to-mp3',   sourceFormat: 'ogg',  targetFormat: 'mp3',  label: 'OGG → MP3',   category: 'Audio' },
  { slug: 'ogg-to-wav',   sourceFormat: 'ogg',  targetFormat: 'wav',  label: 'OGG → WAV',   category: 'Audio' },
  { slug: 'flac-to-mp3',  sourceFormat: 'flac', targetFormat: 'mp3',  label: 'FLAC → MP3',  category: 'Audio' },
  { slug: 'flac-to-wav',  sourceFormat: 'flac', targetFormat: 'wav',  label: 'FLAC → WAV',  category: 'Audio' },
  { slug: 'm4a-to-mp3',   sourceFormat: 'm4a',  targetFormat: 'mp3',  label: 'M4A → MP3',   category: 'Audio' },
  { slug: 'm4a-to-wav',   sourceFormat: 'm4a',  targetFormat: 'wav',  label: 'M4A → WAV',   category: 'Audio' },

  // ── Video ─────────────────────────────────────────────
  { slug: 'mp4-to-mp3',   sourceFormat: 'mp4',  targetFormat: 'mp3',  label: 'MP4 → MP3',   category: 'Video' },
  { slug: 'mov-to-mp3',   sourceFormat: 'mov',  targetFormat: 'mp3',  label: 'MOV → MP3',   category: 'Video' },
  { slug: 'webm-to-mp3',  sourceFormat: 'webm', targetFormat: 'mp3',  label: 'WEBM → MP3',  category: 'Video' },

  // ── Font ──────────────────────────────────────────────
  { slug: 'ttf-to-otf',   sourceFormat: 'ttf',   targetFormat: 'otf',  label: 'TTF → OTF',   category: 'Font' },
  { slug: 'ttf-to-woff',  sourceFormat: 'ttf',   targetFormat: 'woff', label: 'TTF → WOFF',  category: 'Font' },
  { slug: 'otf-to-ttf',   sourceFormat: 'otf',   targetFormat: 'ttf',  label: 'OTF → TTF',   category: 'Font' },
  { slug: 'otf-to-woff',  sourceFormat: 'otf',   targetFormat: 'woff', label: 'OTF → WOFF',  category: 'Font' },
  { slug: 'woff-to-ttf',  sourceFormat: 'woff',  targetFormat: 'ttf',  label: 'WOFF → TTF',  category: 'Font' },
  { slug: 'woff-to-otf',  sourceFormat: 'woff',  targetFormat: 'otf',  label: 'WOFF → OTF',  category: 'Font' },
  { slug: 'woff2-to-ttf', sourceFormat: 'woff2', targetFormat: 'ttf',  label: 'WOFF2 → TTF', category: 'Font' },
  { slug: 'woff2-to-otf', sourceFormat: 'woff2', targetFormat: 'otf',  label: 'WOFF2 → OTF', category: 'Font' },

  // ── Archive ───────────────────────────────────────────
  { slug: 'zip-to-tar',   sourceFormat: 'zip',  targetFormat: 'tar',  label: 'ZIP → TAR',   category: 'Archive' },
  { slug: 'tar-to-zip',   sourceFormat: 'tar',  targetFormat: 'zip',  label: 'TAR → ZIP',   category: 'Archive' },
  { slug: 'gz-to-zip',    sourceFormat: 'gz',   targetFormat: 'zip',  label: 'GZ → ZIP',    category: 'Archive' },
];

export const formatPages: FormatPage[] = [
  // Image
  { slug: 'to-jpg', targetFormat: 'jpg', label: 'Convert to JPG', description: 'Convert images to JPG format.', acceptedInputs: getSourcesForTarget('jpg') },
  { slug: 'to-png', targetFormat: 'png', label: 'Convert to PNG', description: 'Convert images to PNG format.', acceptedInputs: getSourcesForTarget('png') },
  { slug: 'to-webp', targetFormat: 'webp', label: 'Convert to WebP', description: 'Convert images to WebP format.', acceptedInputs: getSourcesForTarget('webp') },
  { slug: 'to-gif', targetFormat: 'gif', label: 'Convert to GIF', description: 'Convert images to GIF format.', acceptedInputs: getSourcesForTarget('gif') },
  { slug: 'to-bmp', targetFormat: 'bmp', label: 'Convert to BMP', description: 'Convert images to BMP format.', acceptedInputs: getSourcesForTarget('bmp') },
  { slug: 'to-avif', targetFormat: 'avif', label: 'Convert to AVIF', description: 'Convert images to AVIF format.', acceptedInputs: getSourcesForTarget('avif') },
  { slug: 'to-ico', targetFormat: 'ico', label: 'Convert to ICO', description: 'Convert images to ICO format.', acceptedInputs: getSourcesForTarget('ico') },
  { slug: 'to-eps', targetFormat: 'eps', label: 'Convert to EPS', description: 'Convert images to EPS format.', acceptedInputs: getSourcesForTarget('eps') },
  { slug: 'to-svg', targetFormat: 'svg', label: 'Convert to SVG', description: 'Convert images to SVG format.', acceptedInputs: getSourcesForTarget('svg') },
  { slug: 'to-psd', targetFormat: 'psd', label: 'Convert to PSD', description: 'Convert images to PSD format.', acceptedInputs: getSourcesForTarget('psd') },
  { slug: 'to-tga', targetFormat: 'tga', label: 'Convert to TGA', description: 'Convert images to TGA format.', acceptedInputs: getSourcesForTarget('tga') },
  { slug: 'to-tiff', targetFormat: 'tiff', label: 'Convert to TIFF', description: 'Convert images to TIFF format.', acceptedInputs: getSourcesForTarget('tiff') },
  // Document
  { slug: 'to-pdf', targetFormat: 'pdf', label: 'Convert to PDF', description: 'Convert documents to PDF format.', acceptedInputs: getSourcesForTarget('pdf') },
  { slug: 'to-txt', targetFormat: 'txt', label: 'Convert to TXT', description: 'Extract plain text from documents.', acceptedInputs: getSourcesForTarget('txt') },
  { slug: 'to-html', targetFormat: 'html', label: 'Convert to HTML', description: 'Convert documents to HTML format.', acceptedInputs: getSourcesForTarget('html') },
  // Audio
  { slug: 'to-mp3', targetFormat: 'mp3', label: 'Convert to MP3', description: 'Convert audio or extract audio from video.', acceptedInputs: getSourcesForTarget('mp3') },
  { slug: 'to-wav', targetFormat: 'wav', label: 'Convert to WAV', description: 'Convert audio files to WAV format.', acceptedInputs: getSourcesForTarget('wav') },
  // Font
  { slug: 'to-ttf', targetFormat: 'ttf', label: 'Convert to TTF', description: 'Convert fonts to TrueType format.', acceptedInputs: getSourcesForTarget('ttf') },
  { slug: 'to-otf', targetFormat: 'otf', label: 'Convert to OTF', description: 'Convert fonts to OpenType format.', acceptedInputs: getSourcesForTarget('otf') },
  { slug: 'to-woff', targetFormat: 'woff', label: 'Convert to WOFF', description: 'Convert fonts to WOFF web format.', acceptedInputs: getSourcesForTarget('woff') },
  // Archive
  { slug: 'to-zip', targetFormat: 'zip', label: 'Convert to ZIP', description: 'Convert archives to ZIP format.', acceptedInputs: getSourcesForTarget('zip') },
  { slug: 'to-tar', targetFormat: 'tar', label: 'Convert to TAR', description: 'Convert archives to TAR format.', acceptedInputs: getSourcesForTarget('tar') },
];

export function getConverterBySlug(slug: string): ConverterRoute | undefined {
  return converterRoutes.find(r => r.slug === slug);
}

export function getFormatPageBySlug(slug: string): FormatPage | undefined {
  return formatPages.find(p => p.slug === slug);
}
