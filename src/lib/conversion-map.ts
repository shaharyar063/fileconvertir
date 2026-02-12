/**
 * Central conversion mapping — the single source of truth.
 * 
 * Rules:
 * - Image ↔ Image, Image → PDF, Image → Archive
 * - Document ↔ Document, Document → PDF, Document → Image, Document → Archive
 * - Video ↔ Video, Video → Audio, Video → Archive
 * - Audio ↔ Audio, Audio → Archive
 * - Font ↔ Font, Font → Archive
 * - Any format → ZIP/TAR/GZ
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
  { source: 'jpg',  targets: ['png', 'webp', 'gif', 'bmp', 'avif', 'tiff', 'ico', 'svg', 'pdf', 'zip', 'tar', 'gz'],
    converterId: 'image-converter', category: 'image', cloudTargets: ['pdf'] },
  { source: 'jpeg', targets: ['png', 'webp', 'gif', 'bmp', 'avif', 'tiff', 'ico', 'svg', 'pdf', 'zip', 'tar', 'gz'],
    converterId: 'image-converter', category: 'image', cloudTargets: ['pdf'] },
  { source: 'png',  targets: ['jpg', 'webp', 'gif', 'bmp', 'avif', 'tiff', 'ico', 'eps', 'svg', 'psd', 'tga', 'pdf', 'zip', 'tar', 'gz'],
    converterId: 'image-converter', category: 'image', cloudTargets: ['pdf'] },
  { source: 'webp', targets: ['jpg', 'png', 'gif', 'bmp', 'avif', 'tiff', 'ico', 'svg', 'pdf', 'zip', 'tar', 'gz'],
    converterId: 'image-converter', category: 'image', cloudTargets: ['pdf'] },
  { source: 'gif',  targets: ['jpg', 'png', 'webp', 'bmp', 'tiff', 'pdf', 'zip', 'tar', 'gz'],
    converterId: 'image-converter', category: 'image', cloudTargets: ['pdf'] },
  { source: 'bmp',  targets: ['jpg', 'png', 'webp', 'gif', 'tiff', 'avif', 'pdf', 'zip', 'tar', 'gz'],
    converterId: 'image-converter', category: 'image', cloudTargets: ['pdf'] },
  { source: 'tiff', targets: ['jpg', 'png', 'webp', 'gif', 'bmp', 'pdf', 'zip', 'tar', 'gz'],
    converterId: 'image-converter', category: 'image', cloudTargets: ['pdf'] },
  { source: 'heic', targets: ['jpg', 'png', 'webp', 'gif', 'bmp', 'pdf', 'zip', 'tar', 'gz'],
    converterId: 'image-converter', category: 'image', cloudTargets: ['heic'] },
  { source: 'heif', targets: ['jpg', 'png', 'webp', 'gif', 'bmp', 'pdf', 'zip', 'tar', 'gz'],
    converterId: 'image-converter', category: 'image', cloudTargets: ['heif'] },
  { source: 'avif', targets: ['jpg', 'png', 'webp', 'gif', 'bmp', 'tiff', 'pdf', 'zip', 'tar', 'gz'],
    converterId: 'image-converter', category: 'image', cloudTargets: ['pdf'] },
  { source: 'svg',  targets: ['png', 'jpg', 'webp', 'pdf', 'zip', 'tar', 'gz'],
    converterId: 'image-converter', category: 'image', cloudTargets: ['pdf'] },
  { source: 'ico',  targets: ['png', 'jpg', 'webp', 'zip', 'tar', 'gz'],
    converterId: 'image-converter', category: 'image' },

  // ── Documents ────────────────────────────────────────────
  { source: 'pdf',  targets: ['txt', 'docx', 'doc', 'html', 'jpg', 'png', 'zip', 'tar', 'gz'],
    converterId: 'document-converter', category: 'document', cloudTargets: ['docx', 'doc', 'jpg', 'png'] },
  { source: 'docx', targets: ['txt', 'pdf', 'html', 'odt', 'rtf', 'md', 'jpg', 'png', 'zip', 'tar', 'gz'],
    converterId: 'document-converter', category: 'document', cloudTargets: ['odt', 'rtf', 'md', 'jpg', 'png'] },
  { source: 'doc',  targets: ['txt', 'pdf', 'docx', 'html', 'odt', 'zip', 'tar', 'gz'],
    converterId: 'document-converter', category: 'document', cloudTargets: ['pdf', 'docx', 'html', 'odt'] },
  { source: 'odt',  targets: ['txt', 'pdf', 'docx', 'html', 'zip', 'tar', 'gz'],
    converterId: 'document-converter', category: 'document', cloudTargets: ['pdf', 'docx', 'html'] },
  { source: 'txt',  targets: ['pdf', 'html', 'md', 'docx', 'zip', 'tar', 'gz'],
    converterId: 'document-converter', category: 'document', cloudTargets: ['docx'] },
  { source: 'rtf',  targets: ['txt', 'pdf', 'html', 'docx', 'zip', 'tar', 'gz'],
    converterId: 'document-converter', category: 'document', cloudTargets: ['docx'] },
  { source: 'html', targets: ['txt', 'pdf', 'md', 'docx', 'zip', 'tar', 'gz'],
    converterId: 'document-converter', category: 'document', cloudTargets: ['docx'] },
  { source: 'md',   targets: ['txt', 'html', 'pdf', 'docx', 'zip', 'tar', 'gz'],
    converterId: 'document-converter', category: 'document', cloudTargets: ['docx'] },
  { source: 'csv',  targets: ['txt', 'xlsx', 'pdf', 'html', 'zip', 'tar', 'gz'],
    converterId: 'document-converter', category: 'document', cloudTargets: ['xlsx'] },
  { source: 'xlsx', targets: ['csv', 'txt', 'pdf', 'xls', 'ods', 'zip', 'tar', 'gz'],
    converterId: 'document-converter', category: 'document', cloudTargets: ['csv', 'txt', 'pdf', 'xls', 'ods'] },
  { source: 'xls',  targets: ['csv', 'txt', 'pdf', 'xlsx', 'ods', 'zip', 'tar', 'gz'],
    converterId: 'document-converter', category: 'document', cloudTargets: ['csv', 'txt', 'pdf', 'xlsx', 'ods'] },
  { source: 'ods',  targets: ['csv', 'txt', 'pdf', 'xlsx', 'zip', 'tar', 'gz'],
    converterId: 'document-converter', category: 'document', cloudTargets: ['csv', 'txt', 'pdf', 'xlsx'] },
  { source: 'pptx', targets: ['pdf', 'ppt', 'odp', 'jpg', 'png', 'zip', 'tar', 'gz'],
    converterId: 'document-converter', category: 'document', cloudTargets: ['pdf', 'ppt', 'odp', 'jpg', 'png'] },
  { source: 'ppt',  targets: ['pdf', 'pptx', 'odp', 'zip', 'tar', 'gz'],
    converterId: 'document-converter', category: 'document', cloudTargets: ['pdf', 'pptx', 'odp'] },
  { source: 'odp',  targets: ['pdf', 'pptx', 'zip', 'tar', 'gz'],
    converterId: 'document-converter', category: 'document', cloudTargets: ['pdf', 'pptx'] },
  { source: 'epub', targets: ['pdf', 'txt', 'html', 'mobi', 'zip', 'tar', 'gz'],
    converterId: 'document-converter', category: 'document', cloudTargets: ['pdf', 'txt', 'html', 'mobi'] },
  { source: 'mobi', targets: ['pdf', 'txt', 'epub', 'zip', 'tar', 'gz'],
    converterId: 'document-converter', category: 'document', cloudTargets: ['pdf', 'txt', 'epub'] },

  // ── Audio (cloud-first) ────────────────────────────────────
  { source: 'mp3',  targets: ['wav', 'aac', 'ogg', 'flac', 'm4a', 'aiff', 'wma', 'zip', 'tar', 'gz'],
    converterId: 'audio-converter', category: 'audio', cloudTargets: ['wav', 'aac', 'ogg', 'flac', 'm4a', 'aiff', 'wma'] },
  { source: 'wav',  targets: ['mp3', 'aac', 'ogg', 'flac', 'm4a', 'aiff', 'wma', 'zip', 'tar', 'gz'],
    converterId: 'audio-converter', category: 'audio', cloudTargets: ['mp3', 'aac', 'ogg', 'flac', 'm4a', 'aiff', 'wma'] },
  { source: 'aac',  targets: ['mp3', 'wav', 'ogg', 'flac', 'm4a', 'aiff', 'wma', 'zip', 'tar', 'gz'],
    converterId: 'audio-converter', category: 'audio', cloudTargets: ['mp3', 'wav', 'ogg', 'flac', 'm4a', 'aiff', 'wma'] },
  { source: 'ogg',  targets: ['mp3', 'wav', 'aac', 'flac', 'm4a', 'aiff', 'wma', 'zip', 'tar', 'gz'],
    converterId: 'audio-converter', category: 'audio', cloudTargets: ['mp3', 'wav', 'aac', 'flac', 'm4a', 'aiff', 'wma'] },
  { source: 'flac', targets: ['mp3', 'wav', 'aac', 'ogg', 'm4a', 'aiff', 'wma', 'zip', 'tar', 'gz'],
    converterId: 'audio-converter', category: 'audio', cloudTargets: ['mp3', 'wav', 'aac', 'ogg', 'm4a', 'aiff', 'wma'] },
  { source: 'm4a',  targets: ['mp3', 'wav', 'aac', 'ogg', 'flac', 'aiff', 'wma', 'zip', 'tar', 'gz'],
    converterId: 'audio-converter', category: 'audio', cloudTargets: ['mp3', 'wav', 'aac', 'ogg', 'flac', 'aiff', 'wma'] },
  { source: 'aiff', targets: ['mp3', 'wav', 'aac', 'ogg', 'flac', 'm4a', 'wma', 'zip', 'tar', 'gz'],
    converterId: 'audio-converter', category: 'audio', cloudTargets: ['mp3', 'wav', 'aac', 'ogg', 'flac', 'm4a', 'wma'] },
  { source: 'wma',  targets: ['mp3', 'wav', 'aac', 'ogg', 'flac', 'm4a', 'aiff', 'zip', 'tar', 'gz'],
    converterId: 'audio-converter', category: 'audio', cloudTargets: ['mp3', 'wav', 'aac', 'ogg', 'flac', 'm4a', 'aiff'] },

  // ── Video (cloud-first) ────────────────────────────────────
  { source: 'mp4',  targets: ['mov', 'avi', 'mkv', 'webm', 'flv', 'wmv', '3gp', 'mp3', 'wav', 'aac', 'zip', 'tar', 'gz'],
    converterId: 'video-converter', category: 'video', cloudTargets: ['mov', 'avi', 'mkv', 'webm', 'flv', 'wmv', '3gp', 'mp3', 'wav', 'aac'] },
  { source: 'mov',  targets: ['mp4', 'avi', 'mkv', 'webm', 'flv', 'wmv', '3gp', 'mp3', 'wav', 'aac', 'zip', 'tar', 'gz'],
    converterId: 'video-converter', category: 'video', cloudTargets: ['mp4', 'avi', 'mkv', 'webm', 'flv', 'wmv', '3gp', 'mp3', 'wav', 'aac'] },
  { source: 'avi',  targets: ['mp4', 'mov', 'mkv', 'webm', 'flv', 'wmv', '3gp', 'mp3', 'wav', 'aac', 'zip', 'tar', 'gz'],
    converterId: 'video-converter', category: 'video', cloudTargets: ['mp4', 'mov', 'mkv', 'webm', 'flv', 'wmv', '3gp', 'mp3', 'wav', 'aac'] },
  { source: 'mkv',  targets: ['mp4', 'mov', 'avi', 'webm', 'flv', 'wmv', '3gp', 'mp3', 'wav', 'aac', 'zip', 'tar', 'gz'],
    converterId: 'video-converter', category: 'video', cloudTargets: ['mp4', 'mov', 'avi', 'webm', 'flv', 'wmv', '3gp', 'mp3', 'wav', 'aac'] },
  { source: 'webm', targets: ['mp4', 'mov', 'avi', 'mkv', 'flv', 'wmv', '3gp', 'mp3', 'wav', 'aac', 'zip', 'tar', 'gz'],
    converterId: 'video-converter', category: 'video', cloudTargets: ['mp4', 'mov', 'avi', 'mkv', 'flv', 'wmv', '3gp', 'mp3', 'wav', 'aac'] },
  { source: 'flv',  targets: ['mp4', 'mov', 'avi', 'mkv', 'webm', 'wmv', '3gp', 'mp3', 'wav', 'aac', 'zip', 'tar', 'gz'],
    converterId: 'video-converter', category: 'video', cloudTargets: ['mp4', 'mov', 'avi', 'mkv', 'webm', 'wmv', '3gp', 'mp3', 'wav', 'aac'] },
  { source: 'wmv',  targets: ['mp4', 'mov', 'avi', 'mkv', 'webm', 'flv', '3gp', 'mp3', 'wav', 'aac', 'zip', 'tar', 'gz'],
    converterId: 'video-converter', category: 'video', cloudTargets: ['mp4', 'mov', 'avi', 'mkv', 'webm', 'flv', '3gp', 'mp3', 'wav', 'aac'] },
  { source: '3gp',  targets: ['mp4', 'mov', 'avi', 'mkv', 'webm', 'flv', 'wmv', 'mp3', 'wav', 'aac', 'zip', 'tar', 'gz'],
    converterId: 'video-converter', category: 'video', cloudTargets: ['mp4', 'mov', 'avi', 'mkv', 'webm', 'flv', 'wmv', 'mp3', 'wav', 'aac'] },

  // ── Fonts ────────────────────────────────────────────────
  { source: 'ttf',   targets: ['otf', 'woff', 'woff2', 'eot', 'zip', 'tar', 'gz'],
    converterId: 'font-converter', category: 'font', cloudTargets: ['woff2', 'eot'] },
  { source: 'otf',   targets: ['ttf', 'woff', 'woff2', 'eot', 'zip', 'tar', 'gz'],
    converterId: 'font-converter', category: 'font', cloudTargets: ['woff2', 'eot'] },
  { source: 'woff',  targets: ['ttf', 'otf', 'woff2', 'eot', 'zip', 'tar', 'gz'],
    converterId: 'font-converter', category: 'font', cloudTargets: ['woff2', 'eot'] },
  { source: 'woff2', targets: ['ttf', 'otf', 'woff', 'eot', 'zip', 'tar', 'gz'],
    converterId: 'font-converter', category: 'font', cloudTargets: ['eot'] },
  { source: 'eot',   targets: ['ttf', 'otf', 'woff', 'woff2', 'zip', 'tar', 'gz'],
    converterId: 'font-converter', category: 'font', cloudTargets: ['ttf', 'otf', 'woff', 'woff2'] },

  // ── Archives ─────────────────────────────────────────────
  { source: 'zip',  targets: ['tar', 'gz', '7z'],
    converterId: 'archive-converter', category: 'archive', cloudTargets: ['7z'] },
  { source: 'tar',  targets: ['zip', 'gz', '7z'],
    converterId: 'archive-converter', category: 'archive', cloudTargets: ['7z'] },
  { source: 'gz',   targets: ['zip', 'tar', '7z'],
    converterId: 'archive-converter', category: 'archive', cloudTargets: ['7z'] },
  { source: 'rar',  targets: ['zip', 'tar', 'gz', '7z'],
    converterId: 'archive-converter', category: 'archive', cloudTargets: ['zip', 'tar', 'gz', '7z'] },
  { source: '7z',   targets: ['zip', 'tar', 'gz'],
    converterId: 'archive-converter', category: 'archive', cloudTargets: ['zip', 'tar', 'gz'] },
  { source: 'iso',  targets: ['zip', 'tar', 'gz'],
    converterId: 'archive-converter', category: 'archive', cloudTargets: ['zip', 'tar', 'gz'] },
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
