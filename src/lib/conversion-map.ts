/**
 * Central conversion mapping — the single source of truth.
 *
 * Every pair listed here MUST have a working implementation,
 * either in a browser converter or in the Supabase edge function.
 */

export type ConversionMethod = 'browser' | 'cloud';

export interface ConversionEntry {
  source: string;
  targets: string[];
  converterId: string;
  category: 'image' | 'document' | 'audio' | 'video' | 'font' | 'archive';
  /** Which targets need cloud processing (all others are browser-capable) */
  cloudTargets?: string[];
}

export const conversionMap: ConversionEntry[] = [
  // ── Images ───────────────────────────────────────────────
  // Browser: Canvas API (jpg/png/webp/avif), manual builders (bmp/gif/tiff/ico/eps/svg/psd/tga), jsPDF (pdf)
  { source: 'jpg',  targets: ['png', 'webp', 'gif', 'bmp', 'avif', 'tiff', 'ico', 'svg', 'pdf', 'zip', 'tar', 'gz'],
    converterId: 'image-converter', category: 'image' },
  { source: 'jpeg', targets: ['png', 'webp', 'gif', 'bmp', 'avif', 'tiff', 'ico', 'svg', 'pdf', 'zip', 'tar', 'gz'],
    converterId: 'image-converter', category: 'image' },
  { source: 'png',  targets: ['jpg', 'webp', 'gif', 'bmp', 'avif', 'tiff', 'ico', 'eps', 'svg', 'psd', 'tga', 'pdf', 'zip', 'tar', 'gz'],
    converterId: 'image-converter', category: 'image' },
  { source: 'webp', targets: ['jpg', 'png', 'gif', 'bmp', 'avif', 'tiff', 'ico', 'svg', 'pdf', 'zip', 'tar', 'gz'],
    converterId: 'image-converter', category: 'image' },
  { source: 'gif',  targets: ['jpg', 'png', 'webp', 'bmp', 'tiff', 'pdf', 'zip', 'tar', 'gz'],
    converterId: 'image-converter', category: 'image' },
  { source: 'bmp',  targets: ['jpg', 'png', 'webp', 'gif', 'tiff', 'avif', 'pdf', 'zip', 'tar', 'gz'],
    converterId: 'image-converter', category: 'image' },
  { source: 'svg',  targets: ['png', 'jpg', 'webp', 'pdf', 'zip', 'tar', 'gz'],
    converterId: 'image-converter', category: 'image' },
  { source: 'ico',  targets: ['png', 'jpg', 'webp', 'pdf', 'zip', 'tar', 'gz'],
    converterId: 'image-converter', category: 'image' },
  { source: 'avif', targets: ['jpg', 'png', 'webp', 'gif', 'bmp', 'tiff', 'pdf', 'zip', 'tar', 'gz'],
    converterId: 'image-converter', category: 'image' },
  // HEIC/HEIF: Apple's modern image formats — 1.8M+ monthly searches for "heic to jpg"
  { source: 'heic', targets: ['jpg', 'png', 'webp', 'gif', 'bmp', 'tiff', 'pdf', 'zip', 'tar', 'gz'],
    converterId: 'image-converter', category: 'image' },
  { source: 'heif', targets: ['jpg', 'png', 'webp', 'gif', 'bmp', 'tiff', 'pdf', 'zip', 'tar', 'gz'],
    converterId: 'image-converter', category: 'image' },
  // TIFF: High-demand in photography/print workflows (~200k/month "tiff to jpg")
  { source: 'tiff', targets: ['jpg', 'png', 'webp', 'gif', 'bmp', 'avif', 'pdf', 'zip', 'tar', 'gz'],
    converterId: 'image-converter', category: 'image' },

  // ── Documents ────────────────────────────────────────────
  // Browser: text extraction + jsPDF/markdown/html builders
  // Cloud: Supabase edge function for DOCX output
  { source: 'txt',  targets: ['pdf', 'html', 'md', 'docx', 'zip', 'tar', 'gz'],
    converterId: 'document-converter', category: 'document', cloudTargets: ['docx'] },
  { source: 'html', targets: ['txt', 'pdf', 'md', 'docx', 'zip', 'tar', 'gz'],
    converterId: 'document-converter', category: 'document', cloudTargets: ['docx'] },
  { source: 'md',   targets: ['txt', 'html', 'pdf', 'docx', 'zip', 'tar', 'gz'],
    converterId: 'document-converter', category: 'document', cloudTargets: ['docx'] },
  { source: 'rtf',  targets: ['txt', 'pdf', 'html', 'docx', 'zip', 'tar', 'gz'],
    converterId: 'document-converter', category: 'document', cloudTargets: ['docx'] },
  { source: 'csv',  targets: ['txt', 'pdf', 'html', 'zip', 'tar', 'gz'],
    converterId: 'document-converter', category: 'document' },
  { source: 'pdf',  targets: ['txt', 'zip', 'tar', 'gz'],
    converterId: 'document-converter', category: 'document' },
  { source: 'docx', targets: ['txt', 'pdf', 'html', 'md', 'zip', 'tar', 'gz'],
    converterId: 'document-converter', category: 'document' },
  { source: 'odt',  targets: ['txt', 'pdf', 'html', 'md', 'zip', 'tar', 'gz'],
    converterId: 'document-converter', category: 'document' },

  // ── Audio ────────────────────────────────────────────────
  // Browser: FFmpeg.wasm (requires SharedArrayBuffer)
  // Fallback: Supabase cloud (limited support)
  // AAC and M4A added as targets — FFmpeg.wasm natively supports both codecs
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

export function getSourcesForTarget(target: string): string[] {
  return conversionMap
    .filter(e => e.targets.includes(target.toLowerCase()))
    .map(e => e.source);
}

export function getAllTargetFormats(): string[] {
  const set = new Set<string>();
  conversionMap.forEach(e => e.targets.forEach(t => set.add(t)));
  return [...set];
}

export function getAllSourceFormats(): string[] {
  return [...new Set(conversionMap.map(e => e.source))];
}

/** Check if a specific conversion requires cloud processing */
export function isCloudConversion(source: string, target: string): boolean {
  const entry = getConversionEntry(source);
  if (!entry) return false;
  return entry.cloudTargets?.includes(target.toLowerCase()) ?? false;
}

/** Get the conversion method for a specific pair */
export function getConversionMethod(source: string, target: string): ConversionMethod {
  return isCloudConversion(source, target) ? 'cloud' : 'browser';
}
