/**
 * Central conversion mapping — the single source of truth.
 */

export interface ConversionEntry {
  source: string;
  targets: string[];
  converterId: string;
  category: 'image' | 'document' | 'audio' | 'video' | 'font' | 'archive';
}

export const conversionMap: ConversionEntry[] = [
  // ── Images ───────────────────────────────────────────────
  { source: 'jpg',  targets: ['png', 'webp', 'gif', 'bmp', 'avif'],              converterId: 'image-converter', category: 'image' },
  { source: 'jpeg', targets: ['png', 'webp', 'gif', 'bmp', 'avif'],              converterId: 'image-converter', category: 'image' },
  { source: 'png',  targets: ['jpg', 'webp', 'gif', 'bmp', 'ico', 'eps', 'svg', 'psd', 'tga', 'tiff', 'avif'], converterId: 'image-converter', category: 'image' },
  { source: 'webp', targets: ['jpg', 'png', 'gif', 'bmp', 'avif'],               converterId: 'image-converter', category: 'image' },
  { source: 'gif',  targets: ['jpg', 'png', 'webp'],                              converterId: 'image-converter', category: 'image' },
  { source: 'bmp',  targets: ['jpg', 'png', 'webp', 'gif'],                       converterId: 'image-converter', category: 'image' },
  { source: 'tiff', targets: ['jpg', 'png', 'webp'],                              converterId: 'image-converter', category: 'image' },
  { source: 'heic', targets: ['jpg', 'png', 'webp'],                              converterId: 'image-converter', category: 'image' },
  { source: 'heif', targets: ['jpg', 'png', 'webp'],                              converterId: 'image-converter', category: 'image' },
  { source: 'avif', targets: ['jpg', 'png', 'webp'],                              converterId: 'image-converter', category: 'image' },
  { source: 'svg',  targets: ['png', 'jpg'],                                      converterId: 'image-converter', category: 'image' },
  { source: 'ico',  targets: ['png', 'jpg'],                                      converterId: 'image-converter', category: 'image' },

  // ── Documents ────────────────────────────────────────────
  { source: 'pdf',  targets: ['txt'],                       converterId: 'document-converter', category: 'document' },
  { source: 'docx', targets: ['txt', 'pdf'],                converterId: 'document-converter', category: 'document' },
  { source: 'doc',  targets: ['txt'],                       converterId: 'document-converter', category: 'document' },
  { source: 'txt',  targets: ['pdf'],                       converterId: 'document-converter', category: 'document' },
  { source: 'rtf',  targets: ['txt'],                       converterId: 'document-converter', category: 'document' },
  { source: 'html', targets: ['txt', 'pdf'],                converterId: 'document-converter', category: 'document' },
  { source: 'md',   targets: ['txt', 'html', 'pdf'],       converterId: 'document-converter', category: 'document' },
  { source: 'csv',  targets: ['txt'],                       converterId: 'document-converter', category: 'document' },

  // ── Audio ────────────────────────────────────────────────
  { source: 'mp3',  targets: ['wav'],                       converterId: 'audio-converter', category: 'audio' },
  { source: 'wav',  targets: ['mp3'],                       converterId: 'audio-converter', category: 'audio' },
  { source: 'aac',  targets: ['mp3', 'wav'],                converterId: 'audio-converter', category: 'audio' },
  { source: 'ogg',  targets: ['mp3', 'wav'],                converterId: 'audio-converter', category: 'audio' },
  { source: 'flac', targets: ['mp3', 'wav'],                converterId: 'audio-converter', category: 'audio' },
  { source: 'm4a',  targets: ['mp3', 'wav'],                converterId: 'audio-converter', category: 'audio' },

  // ── Video ────────────────────────────────────────────────
  { source: 'mp4',  targets: ['mp3'],                       converterId: 'video-converter', category: 'video' },
  { source: 'mov',  targets: ['mp3'],                       converterId: 'video-converter', category: 'video' },
  { source: 'webm', targets: ['mp3'],                       converterId: 'video-converter', category: 'video' },

  // ── Fonts ────────────────────────────────────────────────
  { source: 'ttf',   targets: ['otf', 'woff'],              converterId: 'font-converter', category: 'font' },
  { source: 'otf',   targets: ['ttf', 'woff'],              converterId: 'font-converter', category: 'font' },
  { source: 'woff',  targets: ['ttf', 'otf'],               converterId: 'font-converter', category: 'font' },
  { source: 'woff2', targets: ['ttf', 'otf'],               converterId: 'font-converter', category: 'font' },

  // ── Archives ─────────────────────────────────────────────
  { source: 'zip',  targets: ['tar'],                       converterId: 'archive-converter', category: 'archive' },
  { source: 'tar',  targets: ['zip'],                       converterId: 'archive-converter', category: 'archive' },
  { source: 'gz',   targets: ['zip'],                       converterId: 'archive-converter', category: 'archive' },
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
