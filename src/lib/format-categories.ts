/**
 * Format categories and helpers for the format picker dropdowns.
 */
import { conversionMap } from './conversion-map';
import { Image, FileText, Music, Film, Type, Archive } from 'lucide-react';

export interface FormatCategory {
  key: string;
  label: string;
  icon: typeof Image;
  formats: string[];
}

export const formatCategories: FormatCategory[] = [
  {
    key: 'image',
    label: 'Images',
    icon: Image,
    formats: ['jpg', 'jpeg', 'png', 'webp', 'avif', 'gif', 'bmp', 'svg', 'ico'],
  },
  {
    key: 'document',
    label: 'Documents',
    icon: FileText,
    formats: ['pdf', 'docx', 'odt', 'txt', 'rtf', 'html', 'md', 'csv'],
  },
  {
    key: 'video',
    label: 'Video',
    icon: Film,
    formats: ['mp4', 'mov', 'avi', 'mkv', 'webm'],
  },
  {
    key: 'audio',
    label: 'Audio',
    icon: Music,
    formats: ['mp3', 'wav', 'aac', 'ogg', 'flac', 'm4a'],
  },
  {
    key: 'font',
    label: 'Fonts',
    icon: Type,
    formats: ['ttf', 'otf', 'woff'],
  },
  {
    key: 'archive',
    label: 'Archives',
    icon: Archive,
    formats: ['zip', 'tar', 'gz'],
  },
];

/** Get all source formats that exist in the conversion map */
export function getAllSources(): string[] {
  return [...new Set(conversionMap.map(e => e.source))];
}

/** Get all target formats that exist in the conversion map */
export function getAllTargets(): string[] {
  const set = new Set<string>();
  conversionMap.forEach(e => e.targets.forEach(t => set.add(t)));
  return [...set];
}

function findSourceEntry(source: string) {
  const key = source.toLowerCase();
  return (
    conversionMap.find((e) => e.source === key) ??
    (key === 'jpg' ? conversionMap.find((e) => e.source === 'jpeg') : undefined) ??
    (key === 'jpeg' ? conversionMap.find((e) => e.source === 'jpg') : undefined)
  );
}

/** Given a source format, get all valid target formats */
export function getValidTargets(source: string): string[] {
  return findSourceEntry(source)?.targets ?? [];
}

/** Given a target format, get all valid source formats */
export function getValidSources(target: string): string[] {
  const key = target.toLowerCase();
  return conversionMap
    .filter((e) => e.targets.includes(key))
    .map((e) => e.source);
}

/** Whether source can convert to target per conversion map (jpg/jpeg aliased). */
export function isValidConversion(source: string, target: string): boolean {
  return getValidTargets(source).includes(target.toLowerCase());
}

/** Filter categories to only show formats in the allowed set */
export function filterCategories(
  allowedFormats: string[] | null
): FormatCategory[] {
  if (!allowedFormats) return formatCategories;
  
  return formatCategories
    .map(cat => ({
      ...cat,
      formats: cat.formats.filter(f => allowedFormats.includes(f)),
    }))
    .filter(cat => cat.formats.length > 0);
}
