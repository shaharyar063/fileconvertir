const LABELS: Record<string, string> = {
  jpg: 'JPG',
  webp: 'WebP',
  webm: 'WebM',
  md: 'Markdown',
};

/** Display name for a format extension, e.g. `webp` → `WebP`, `png` → `PNG`. */
export function formatLabel(ext: string): string {
  return LABELS[ext.toLowerCase()] ?? ext.toUpperCase();
}
