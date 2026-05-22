/**
 * Normalize and validate archive entry paths (Zip Slip mitigation).
 * Returns a safe basename or null if the path must be skipped.
 */
export function safeArchiveEntryName(name: string): string | null {
  const normalized = name.replace(/\\/g, '/').replace(/^\/+/, '');
  if (!normalized || normalized.includes('\0')) return null;

  const segments = normalized.split('/');
  if (segments.some((seg) => seg === '..')) return null;
  if (/^[a-zA-Z]:/.test(segments[0] ?? '')) return null;

  const base = segments[segments.length - 1]?.trim();
  if (!base || base === '.' || base === '..') return null;
  return base;
}
