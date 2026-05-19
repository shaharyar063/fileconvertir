const RAW =
  (typeof import.meta !== 'undefined' &&
    (import.meta.env?.VITE_SITE_URL as string | undefined)) ||
  (typeof process !== 'undefined' && process.env.VITE_SITE_URL) ||
  'https://fileconvertir.com';

export const SITE_URL = RAW.replace(/\/$/, '');

/** Primary slug for indexing; jpeg routes canonical to jpg equivalents. */
export function canonicalSlug(slug: string): string {
  const clean = slug.replace(/^\/+|\/+$/g, '');
  if (clean.startsWith('jpeg-to-')) return clean.replace(/^jpeg-to-/, 'jpg-to-');
  if (clean === 'jpeg') return 'jpg';
  return clean;
}

/** True for jpeg duplicate URLs that should not appear in the sitemap. */
export function isSitemapExcludedPath(path: string): boolean {
  const clean = path.replace(/^\/+|\/+$/g, '');
  return clean === 'jpeg' || clean.startsWith('jpeg-to-');
}

/** Canonical absolute URL. Non-root paths use a trailing slash (Cloudflare Pages). */
export function absoluteUrl(path = ''): string {
  if (!path || path === '/') return `${SITE_URL}/`;
  const segment = canonicalSlug(path);
  return `${SITE_URL}/${segment}/`;
}

/** In-app and prerender path, e.g. `/png-to-jpg/`. */
export function sitePath(path = ''): string {
  if (!path || path === '/') return '/';
  const segment = path.replace(/^\/+|\/+$/g, '');
  return `/${segment}/`;
}
