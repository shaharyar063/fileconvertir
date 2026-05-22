import { META_DESC_MAX, META_DESC_MIN } from './constants';

export function clampMetaDescription(text: string): string {
  if (text.length <= META_DESC_MAX) return text;
  const trimmed = text.slice(0, META_DESC_MAX - 3).replace(/\s+\S*$/, '');
  return `${trimmed}...`;
}

export function fitMeta(candidates: string[]): string {
  const fit = candidates.find((t) => t.length >= META_DESC_MIN && t.length <= META_DESC_MAX);
  return fit ?? clampMetaDescription(candidates[0]!);
}
