/**
 * Central conversion mapping — the single source of truth.
 * Every UI selector, validation gate, and converter lookup is driven by this map.
 */

export interface ConversionEntry {
  /** Lowercase extension (canonical) */
  source: string;
  /** Allowed target extensions */
  targets: string[];
  /** Which converter plugin handles this source */
  converterId: string;
  /** Human-readable category */
  category: 'image' | 'document' | 'audio' | 'video';
}

export const conversionMap: ConversionEntry[] = [
  // ── Images ───────────────────────────────────────────────
  { source: 'jpg',  targets: ['png', 'webp', 'gif'],       converterId: 'image-converter', category: 'image' },
  { source: 'jpeg', targets: ['png', 'webp', 'gif'],       converterId: 'image-converter', category: 'image' },
  { source: 'png',  targets: ['jpg', 'jpeg', 'webp', 'gif', 'bmp', 'ico', 'eps', 'odd', 'svg', 'psd', 'tga', 'tiff'], converterId: 'image-converter', category: 'image' },
  { source: 'webp', targets: ['jpg', 'png', 'gif'],        converterId: 'image-converter', category: 'image' },
  { source: 'gif',  targets: ['jpg', 'png', 'webp'],       converterId: 'image-converter', category: 'image' },
  { source: 'bmp',  targets: ['jpg', 'png', 'webp', 'gif'],converterId: 'image-converter', category: 'image' },
  { source: 'tiff', targets: ['jpg', 'png', 'webp'],       converterId: 'image-converter', category: 'image' },
  { source: 'heic', targets: ['jpg', 'png', 'webp'],       converterId: 'image-converter', category: 'image' },
  { source: 'heif', targets: ['jpg', 'png', 'webp'],       converterId: 'image-converter', category: 'image' },

  // ── Documents ────────────────────────────────────────────
  { source: 'pdf',  targets: ['txt'],                       converterId: 'document-converter', category: 'document' },
  { source: 'docx', targets: ['txt', 'pdf'],                converterId: 'document-converter', category: 'document' },
  { source: 'doc',  targets: ['txt'],                       converterId: 'document-converter', category: 'document' },
  { source: 'txt',  targets: ['pdf'],                       converterId: 'document-converter', category: 'document' },
  { source: 'rtf',  targets: ['txt'],                       converterId: 'document-converter', category: 'document' },
  { source: 'html', targets: ['txt', 'pdf'],                converterId: 'document-converter', category: 'document' },

  // ── Audio ────────────────────────────────────────────────
  { source: 'mp3',  targets: ['wav'],                       converterId: 'audio-converter', category: 'audio' },
  { source: 'wav',  targets: ['mp3'],                       converterId: 'audio-converter', category: 'audio' },
  { source: 'aac',  targets: ['mp3', 'wav'],                converterId: 'audio-converter', category: 'audio' },
  { source: 'ogg',  targets: ['mp3', 'wav'],                converterId: 'audio-converter', category: 'audio' },
  { source: 'flac', targets: ['mp3', 'wav'],                converterId: 'audio-converter', category: 'audio' },

  // ── Video ────────────────────────────────────────────────
  { source: 'mp4',  targets: ['mp3'],                       converterId: 'video-converter', category: 'video' },
  { source: 'mov',  targets: ['mp3'],                       converterId: 'video-converter', category: 'video' },
  { source: 'webm', targets: ['mp3'],                       converterId: 'video-converter', category: 'video' },
];

/* ── Helpers ─────────────────────────────────────────────── */

/** Get the entry for a given source extension */
export function getConversionEntry(source: string): ConversionEntry | undefined {
  return conversionMap.find(e => e.source === source.toLowerCase());
}

/** Get valid target formats for a source extension */
export function getTargetsForSource(source: string): string[] {
  return getConversionEntry(source)?.targets ?? [];
}

/** Get all source extensions that can produce a given target */
export function getSourcesForTarget(target: string): string[] {
  return conversionMap
    .filter(e => e.targets.includes(target.toLowerCase()))
    .map(e => e.source);
}

/** All unique target formats across the entire map */
export function getAllTargetFormats(): string[] {
  const set = new Set<string>();
  conversionMap.forEach(e => e.targets.forEach(t => set.add(t)));
  return [...set];
}

/** All unique source formats */
export function getAllSourceFormats(): string[] {
  return [...new Set(conversionMap.map(e => e.source))];
}
