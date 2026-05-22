/** Stable numeric hash for picking unique copy variants per slug. */
export function slugHash(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) {
    h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  }
  return h;
}

export function pick<T>(slug: string, items: readonly T[]): T {
  return items[slugHash(slug) % items.length]!;
}
