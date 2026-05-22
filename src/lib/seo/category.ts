import { conversionMap } from '../conversion-map';

export type FormatCategory = 'image' | 'document' | 'audio' | 'video' | 'font' | 'archive' | 'other';

export function getCategoryForFormat(ext: string): FormatCategory {
  const entry = conversionMap.find((e) => e.source === ext);
  if (entry) return entry.category;
  const asTarget = conversionMap.some((e) => e.targets.includes(ext));
  if (!asTarget) return 'other';
  const imageTargets = ['png', 'jpg', 'jpeg', 'webp', 'gif', 'bmp', 'tiff', 'svg', 'ico', 'avif', 'pdf'];
  if (imageTargets.includes(ext)) return 'image';
  if (['mp3', 'wav', 'aac', 'ogg', 'flac', 'm4a'].includes(ext)) return 'audio';
  if (['mp4', 'webm', 'mov', 'mkv', 'avi'].includes(ext)) return 'video';
  if (['docx', 'txt', 'pdf', 'html', 'md', 'csv', 'rtf', 'odt'].includes(ext)) return 'document';
  if (['ttf', 'otf', 'woff'].includes(ext)) return 'font';
  if (['zip', 'tar', 'gz'].includes(ext)) return 'archive';
  return 'other';
}

export function isArchiveTarget(target: string): boolean {
  return ['zip', 'tar', 'gz'].includes(target);
}
