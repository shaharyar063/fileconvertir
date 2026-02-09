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

// Legacy pair routes (kept for AllConverters listing)
export const converterRoutes: ConverterRoute[] = [
  // Image pairs
  { slug: 'png-to-jpg', sourceFormat: 'png', targetFormat: 'jpg', label: 'PNG → JPG', category: 'Image' },
  { slug: 'png-to-jpeg', sourceFormat: 'png', targetFormat: 'jpeg', label: 'PNG → JPEG', category: 'Image' },
  { slug: 'png-to-webp', sourceFormat: 'png', targetFormat: 'webp', label: 'PNG → WebP', category: 'Image' },
  { slug: 'png-to-bmp', sourceFormat: 'png', targetFormat: 'bmp', label: 'PNG → BMP', category: 'Image' },
  { slug: 'png-to-ico', sourceFormat: 'png', targetFormat: 'ico', label: 'PNG → ICO', category: 'Image' },
  { slug: 'png-to-eps', sourceFormat: 'png', targetFormat: 'eps', label: 'PNG → EPS', category: 'Image' },
  { slug: 'png-to-odd', sourceFormat: 'png', targetFormat: 'odd', label: 'PNG → ODD', category: 'Image' },
  { slug: 'jpg-to-png', sourceFormat: 'jpg', targetFormat: 'png', label: 'JPG → PNG', category: 'Image' },
  { slug: 'jpg-to-webp', sourceFormat: 'jpg', targetFormat: 'webp', label: 'JPG → WebP', category: 'Image' },
  { slug: 'webp-to-jpg', sourceFormat: 'webp', targetFormat: 'jpg', label: 'WebP → JPG', category: 'Image' },
  { slug: 'webp-to-png', sourceFormat: 'webp', targetFormat: 'png', label: 'WebP → PNG', category: 'Image' },
  { slug: 'gif-to-png', sourceFormat: 'gif', targetFormat: 'png', label: 'GIF → PNG', category: 'Image' },
  { slug: 'bmp-to-jpg', sourceFormat: 'bmp', targetFormat: 'jpg', label: 'BMP → JPG', category: 'Image' },
  { slug: 'bmp-to-png', sourceFormat: 'bmp', targetFormat: 'png', label: 'BMP → PNG', category: 'Image' },
  { slug: 'tiff-to-jpg', sourceFormat: 'tiff', targetFormat: 'jpg', label: 'TIFF → JPG', category: 'Image' },
  { slug: 'heic-to-jpg', sourceFormat: 'heic', targetFormat: 'jpg', label: 'HEIC → JPG', category: 'Image' },
  { slug: 'heic-to-png', sourceFormat: 'heic', targetFormat: 'png', label: 'HEIC → PNG', category: 'Image' },
  // Document pairs
  { slug: 'docx-to-txt', sourceFormat: 'docx', targetFormat: 'txt', label: 'DOCX → TXT', category: 'Document' },
  { slug: 'docx-to-pdf', sourceFormat: 'docx', targetFormat: 'pdf', label: 'DOCX → PDF', category: 'Document' },
  { slug: 'txt-to-pdf', sourceFormat: 'txt', targetFormat: 'pdf', label: 'TXT → PDF', category: 'Document' },
  { slug: 'html-to-txt', sourceFormat: 'html', targetFormat: 'txt', label: 'HTML → TXT', category: 'Document' },
  { slug: 'html-to-pdf', sourceFormat: 'html', targetFormat: 'pdf', label: 'HTML → PDF', category: 'Document' },
  { slug: 'pdf-to-txt', sourceFormat: 'pdf', targetFormat: 'txt', label: 'PDF → TXT', category: 'Document' },
  { slug: 'rtf-to-txt', sourceFormat: 'rtf', targetFormat: 'txt', label: 'RTF → TXT', category: 'Document' },
  // Audio pairs
  { slug: 'wav-to-mp3', sourceFormat: 'wav', targetFormat: 'mp3', label: 'WAV → MP3', category: 'Audio' },
  { slug: 'ogg-to-mp3', sourceFormat: 'ogg', targetFormat: 'mp3', label: 'OGG → MP3', category: 'Audio' },
  { slug: 'flac-to-mp3', sourceFormat: 'flac', targetFormat: 'mp3', label: 'FLAC → MP3', category: 'Audio' },
  { slug: 'mp3-to-wav', sourceFormat: 'mp3', targetFormat: 'wav', label: 'MP3 → WAV', category: 'Audio' },
  { slug: 'aac-to-mp3', sourceFormat: 'aac', targetFormat: 'mp3', label: 'AAC → MP3', category: 'Audio' },
  // Video pairs
  { slug: 'mp4-to-mp3', sourceFormat: 'mp4', targetFormat: 'mp3', label: 'MP4 → MP3', category: 'Video' },
  { slug: 'mov-to-mp3', sourceFormat: 'mov', targetFormat: 'mp3', label: 'MOV → MP3', category: 'Video' },
  { slug: 'webm-to-mp3', sourceFormat: 'webm', targetFormat: 'mp3', label: 'WEBM → MP3', category: 'Video' },
];

// Dedicated /to-{format} pages — driven by the central conversion map
export const formatPages: FormatPage[] = [
  { slug: 'to-jpg', targetFormat: 'jpg', label: 'Convert to JPG', description: 'Convert images to JPG format.', acceptedInputs: getSourcesForTarget('jpg') },
  { slug: 'to-jpeg', targetFormat: 'jpeg', label: 'Convert to JPEG', description: 'Convert images to JPEG format.', acceptedInputs: getSourcesForTarget('jpeg') },
  { slug: 'to-png', targetFormat: 'png', label: 'Convert to PNG', description: 'Convert images to PNG format.', acceptedInputs: getSourcesForTarget('png') },
  { slug: 'to-webp', targetFormat: 'webp', label: 'Convert to WebP', description: 'Convert images to WebP format.', acceptedInputs: getSourcesForTarget('webp') },
  { slug: 'to-gif', targetFormat: 'gif', label: 'Convert to GIF', description: 'Convert images to GIF format.', acceptedInputs: getSourcesForTarget('gif') },
  { slug: 'to-bmp', targetFormat: 'bmp', label: 'Convert to BMP', description: 'Convert images to BMP format.', acceptedInputs: getSourcesForTarget('bmp') },
  { slug: 'to-ico', targetFormat: 'ico', label: 'Convert to ICO', description: 'Convert images to ICO format.', acceptedInputs: getSourcesForTarget('ico') },
  { slug: 'to-eps', targetFormat: 'eps', label: 'Convert to EPS', description: 'Convert images to EPS format.', acceptedInputs: getSourcesForTarget('eps') },
  { slug: 'to-odd', targetFormat: 'odd', label: 'Convert to ODD', description: 'Convert images to ODD format.', acceptedInputs: getSourcesForTarget('odd') },
  { slug: 'to-pdf', targetFormat: 'pdf', label: 'Convert to PDF', description: 'Convert documents to PDF format.', acceptedInputs: getSourcesForTarget('pdf') },
  { slug: 'to-txt', targetFormat: 'txt', label: 'Convert to TXT', description: 'Extract plain text from documents.', acceptedInputs: getSourcesForTarget('txt') },
  { slug: 'to-mp3', targetFormat: 'mp3', label: 'Convert to MP3', description: 'Convert audio or extract audio from video as MP3.', acceptedInputs: getSourcesForTarget('mp3') },
  { slug: 'to-wav', targetFormat: 'wav', label: 'Convert to WAV', description: 'Convert audio files to WAV format.', acceptedInputs: getSourcesForTarget('wav') },
];

export function getConverterBySlug(slug: string): ConverterRoute | undefined {
  return converterRoutes.find(r => r.slug === slug);
}

export function getFormatPageBySlug(slug: string): FormatPage | undefined {
  return formatPages.find(p => p.slug === slug);
}
