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

/** Given a source format, get all valid target formats */
export function getValidTargets(source: string): string[] {
  const entry = conversionMap.find(e => e.source === source.toLowerCase());
  return entry?.targets ?? [];
}

/** Given a target format, get all valid source formats */
export function getValidSources(target: string): string[] {
  return conversionMap
    .filter(e => e.targets.includes(target.toLowerCase()))
    .map(e => e.source);
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
