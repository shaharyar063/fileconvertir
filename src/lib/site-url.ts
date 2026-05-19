const RAW =
  (typeof import.meta !== 'undefined' &&
    (import.meta.env?.VITE_SITE_URL as string | undefined)) ||
  (typeof process !== 'undefined' && process.env.VITE_SITE_URL) ||
  'https://fileconvertir.com';

export const SITE_URL = RAW.replace(/\/$/, '');

/** Canonical absolute URL. Non-root paths use a trailing slash (Cloudflare Pages). */
export function absoluteUrl(path = ''): string {
  if (!path || path === '/') return `${SITE_URL}/`;
  const segment = path.replace(/^\/+|\/+$/g, '');
  return `${SITE_URL}/${segment}/`;
}

/** In-app and prerender path, e.g. `/png-to-jpg/`. */
export function sitePath(path = ''): string {
  if (!path || path === '/') return '/';
  const segment = path.replace(/^\/+|\/+$/g, '');
  return `/${segment}/`;
}
