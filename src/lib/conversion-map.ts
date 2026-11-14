/**
 * Central conversion mapping — the single source of truth.
 *
 * Every pair listed here MUST have a working browser implementation.
 */

export interface ConversionEntry {
  source: string;
  targets: string[];
  converterId: string;
  category: 'image' | 'document' | 'audio' | 'video' | 'font' | 'archive';
}

export const conversionMap: ConversionEntry[] = [
  // ── Images ───────────────────────────────────────────────
  // Browser: Canvas API (jpg/png/webp), manual builders (bmp/gif/tiff/ico/eps/svg/psd/tga), jsPDF (pdf)
  { source: 'jpg',  targets: ['png', 'webp', 'gif', 'bmp', 'tiff', 'ico', 'svg', 'pdf', 'zip', 'tar', 'gz'],
    converterId: 'image-converter', category: 'image' },
  { source: 'jpeg', targets: ['png', 'webp', 'gif', 'bmp', 'tiff', 'ico', 'svg', 'pdf', 'zip', 'tar', 'gz'],
    converterId: 'image-converter', category: 'image' },
  { source: 'png',  targets: ['jpg', 'webp', 'gif', 'bmp', 'tiff', 'ico', 'eps', 'svg', 'psd', 'tga', 'pdf', 'zip', 'tar', 'gz'],
    converterId: 'image-converter', category: 'image' },
  { source: 'webp', targets: ['jpg', 'png', 'gif', 'bmp', 'tiff', 'ico', 'svg', 'pdf', 'zip', 'tar', 'gz'],
    converterId: 'image-converter', category: 'image' },
  { source: 'gif',  targets: ['jpg', 'png', 'webp', 'bmp', 'tiff', 'pdf', 'zip', 'tar', 'gz'],
    converterId: 'image-converter', category: 'image' },
  { source: 'bmp',  targets: ['jpg', 'png', 'webp', 'gif', 'tiff', 'pdf', 'zip', 'tar', 'gz'],
    converterId: 'image-converter', category: 'image' },
  { source: 'svg',  targets: ['png', 'jpg', 'webp', 'pdf', 'zip', 'tar', 'gz'],
    converterId: 'image-converter', category: 'image' },
  { source: 'ico',  targets: ['png', 'jpg', 'webp', 'pdf', 'zip', 'tar', 'gz'],
    converterId: 'image-converter', category: 'image' },
  { source: 'avif', targets: ['jpg', 'png', 'webp', 'gif', 'bmp', 'tiff', 'pdf', 'zip', 'tar', 'gz'],
    converterId: 'image-converter', category: 'image' },

  // ── Documents ────────────────────────────────────────────
  // Browser: text extraction + jsPDF/markdown/html/DOCX builders
  { source: 'txt',  targets: ['pdf', 'html', 'md', 'docx', 'zip', 'tar', 'gz'],
    converterId: 'document-converter', category: 'document' },
  { source: 'html', targets: ['txt', 'pdf', 'md', 'docx', 'zip', 'tar', 'gz'],
    converterId: 'document-converter', category: 'document' },
  { source: 'md',   targets: ['txt', 'html', 'pdf', 'docx', 'zip', 'tar', 'gz'],
    converterId: 'document-converter', category: 'document' },
  { source: 'rtf',  targets: ['txt', 'pdf', 'html', 'docx', 'zip', 'tar', 'gz'],
    converterId: 'document-converter', category: 'document' },
  { source: 'csv',  targets: ['txt', 'pdf', 'html', 'zip', 'tar', 'gz'],
    converterId: 'document-converter', category: 'document' },
  { source: 'pdf',  targets: ['txt', 'zip', 'tar', 'gz'],
    converterId: 'document-converter', category: 'document' },
  { source: 'docx', targets: ['txt', 'pdf', 'html', 'md', 'zip', 'tar', 'gz'],
    converterId: 'document-converter', category: 'document' },
  { source: 'odt',  targets: ['txt', 'pdf', 'html', 'md', 'zip', 'tar', 'gz'],
    converterId: 'document-converter', category: 'document' },

  // ── Audio ────────────────────────────────────────────────
  // Browser: FFmpeg.wasm (requires SharedArrayBuffer / COOP+COEP headers)
  { source: 'mp3',  targets: ['wav', 'aac', 'ogg', 'flac', 'm4a', 'zip', 'tar', 'gz'],
    converterId: 'audio-converter', category: 'audio' },
  { source: 'wav',  targets: ['mp3', 'aac', 'ogg', 'flac', 'm4a', 'zip', 'tar', 'gz'],
    converterId: 'audio-converter', category: 'audio' },
  { source: 'ogg',  targets: ['mp3', 'wav', 'aac', 'flac', 'm4a', 'zip', 'tar', 'gz'],
    converterId: 'audio-converter', category: 'audio' },
  { source: 'flac', targets: ['mp3', 'wav', 'aac', 'ogg', 'm4a', 'zip', 'tar', 'gz'],
    converterId: 'audio-converter', category: 'audio' },
  { source: 'aac',  targets: ['mp3', 'wav', 'ogg', 'flac', 'm4a', 'zip', 'tar', 'gz'],
    converterId: 'audio-converter', category: 'audio' },
  { source: 'm4a',  targets: ['mp3', 'wav', 'aac', 'ogg', 'flac', 'zip', 'tar', 'gz'],
    converterId: 'audio-converter', category: 'audio' },

  // ── Video ────────────────────────────────────────────────
  // Browser: FFmpeg.wasm
  { source: 'mp4',  targets: ['webm', 'mp3', 'wav', 'zip', 'tar', 'gz'],
    converterId: 'video-converter', category: 'video' },
  { source: 'webm', targets: ['mp4', 'mp3', 'wav', 'zip', 'tar', 'gz'],
    converterId: 'video-converter', category: 'video' },
  { source: 'mov',  targets: ['mp4', 'webm', 'mp3', 'wav', 'zip', 'tar', 'gz'],
    converterId: 'video-converter', category: 'video' },
  { source: 'mkv',  targets: ['mp4', 'webm', 'mp3', 'wav', 'zip', 'tar', 'gz'],
    converterId: 'video-converter', category: 'video' },
  { source: 'avi',  targets: ['mp4', 'webm', 'mp3', 'wav', 'zip', 'tar', 'gz'],
    converterId: 'video-converter', category: 'video' },

  // ── Fonts ────────────────────────────────────────────────
  // Browser: opentype.js (TTF/OTF parsing) + custom WOFF builder
  { source: 'ttf',  targets: ['otf', 'woff', 'zip', 'tar', 'gz'],
    converterId: 'font-converter', category: 'font' },
  { source: 'otf',  targets: ['ttf', 'woff', 'zip', 'tar', 'gz'],
    converterId: 'font-converter', category: 'font' },
  { source: 'woff', targets: ['ttf', 'otf', 'zip', 'tar', 'gz'],
    converterId: 'font-converter', category: 'font' },

  // ── Archives ─────────────────────────────────────────────
  // Browser: JSZip + manual TAR/GZ builders
  { source: 'zip',  targets: ['tar', 'gz'],
    converterId: 'archive-converter', category: 'archive' },
  { source: 'tar',  targets: ['zip', 'gz'],
    converterId: 'archive-converter', category: 'archive' },
  { source: 'gz',   targets: ['zip', 'tar'],
    converterId: 'archive-converter', category: 'archive' },
];

/* ── Helpers ─────────────────────────────────────────────── */

export function getConversionEntry(source: string): ConversionEntry | undefined {
  return conversionMap.find(e => e.source === source.toLowerCase());
}

export function getTargetsForSource(source: string): string[] {
  return getConversionEntry(source)?.targets ?? [];
}

