/**
 * Internal navigation link data derived from conversion-map.
 * Used by footer, homepage hub sections, and prerender noscript blocks
 * so every sitemap URL receives at least one crawlable <a href> inlink.
 */
import { conversionMap } from './conversion-map';
import { converterRoutes } from './converters';
import { sitePath } from './site-url';

/**
 * All pages with hand-crafted Tier S content — get highest weighting in
 * related-converter lists and are surfaced first in navigation grids.
 */
const PRIORITY_SLUGS = new Set([
  // Original priority pages
  'heic-to-jpg',
  'avif-to-jpg',
  'm4a-to-mp3',
  'mov-to-mp4',
  'tiff-to-jpg',
  'webp-to-png',
  // Image conversions — boosted
  'webp-to-jpg',
  'avif-to-png',
  'svg-to-png',
  'png-to-pdf',
  'jpg-to-pdf',
  'heic-to-pdf',
  // Audio conversions — boosted
  'mp4-to-mp3',
  'wav-to-mp3',
  'flac-to-mp3',
  'aac-to-mp3',
  'ogg-to-mp3',
  'm4a-to-wav',
  // Video conversions — boosted
  'mkv-to-mp4',
  'avi-to-mp4',
  'webm-to-mp4',
  'mov-to-mp3',
  // Document conversions — boosted
  'docx-to-pdf',
  'docx-to-txt',
  'pdf-to-txt',
  // Font conversions — boosted
  'ttf-to-woff',
]);

export interface NavLink {
  href: string;
  label: string;
}

export interface NavSection {
  title: string;
  links: NavLink[];
}

const CATEGORY_LABELS: Record<string, string> = {
  image: 'Images',
  document: 'Documents',
  audio: 'Audio',
  video: 'Video',
  font: 'Fonts',
  archive: 'Archives',
};

/** All source-format hub pages (/png, /mp3, …) grouped by category. */
export function getSourceHubSections(): NavSection[] {
  const sections: NavSection[] = [];
  for (const cat of ['image', 'document', 'audio', 'video', 'font', 'archive'] as const) {
    const sources = conversionMap
      .filter((e) => e.category === cat)
      .map((e) => e.source)
      .sort();
    sections.push({
      title: CATEGORY_LABELS[cat] ?? cat,
      links: sources.map((s) => ({
        href: sitePath(s),
        label: s.toUpperCase(),
      })),
    });
  }
  return sections;
}

/** All target-format hub pages (/to-jpg, /to-pdf, …). */
export function getTargetHubSections(): NavSection[] {
  const targets = new Set<string>();
  conversionMap.forEach((e) => e.targets.forEach((t) => targets.add(t)));
  const byCategory = new Map<string, string[]>();
  for (const target of [...targets].sort()) {
    const cat =
      conversionMap.find((e) => e.targets.includes(target))?.category ?? 'other';
    const list = byCategory.get(cat) ?? [];
    list.push(target);
    byCategory.set(cat, list);
  }
  return [...byCategory.entries()].map(([cat, fmts]) => ({
    title: `To ${CATEGORY_LABELS[cat] ?? cat}`,
    links: fmts.map((t) => ({
      href: sitePath(`to-${t}`),
      label: t.toUpperCase(),
    })),
  }));
}

/** Converter routes grouped by category for homepage / footer. */
export function getConverterSectionsByCategory(): NavSection[] {
  const cats = ['Image', 'Document', 'Audio', 'Video', 'Font', 'Archive'] as const;
  return cats.map((cat) => ({
    title: CATEGORY_LABELS[cat.toLowerCase()] ?? cat,
    links: converterRoutes
      .filter((r) => r.category === cat)
      .map((r) => ({
        href: sitePath(r.slug),
        label: r.label,
      })),
  }));
}

/** Every indexable internal URL — for prerender footer / crawlable inlinks. */
export function getAllSitewideNavLinks(): NavLink[] {
  const seen = new Set<string>();
  const add = (link: NavLink) => {
    if (seen.has(link.href)) return;
    seen.add(link.href);
    out.push(link);
  };
  const out: NavLink[] = [];
  add({ href: '/', label: 'Home' });
  for (const section of getSourceHubSections()) {
    section.links.forEach(add);
  }
  for (const section of getTargetHubSections()) {
    section.links.forEach(add);
  }
  for (const route of converterRoutes) {
    add({ href: sitePath(route.slug), label: route.label });
  }
  return out;
}

/**
 * Popular links shown in footer, sidebar, and homepage cards.
 * Mix of high-volume standbys and boosted opportunity pages.
 */
export const POPULAR_LINKS: NavLink[] = [
  { href: sitePath('heic-to-jpg'),   label: 'HEIC to JPG' },
  { href: sitePath('webp-to-jpg'),   label: 'WebP to JPG' },
  { href: sitePath('avif-to-jpg'),   label: 'AVIF to JPG' },
  { href: sitePath('png-to-pdf'),    label: 'PNG to PDF' },
  { href: sitePath('jpg-to-pdf'),    label: 'JPG to PDF' },
  { href: sitePath('mov-to-mp4'),    label: 'MOV to MP4' },
  { href: sitePath('mp4-to-mp3'),    label: 'MP4 to MP3' },
  { href: sitePath('wav-to-mp3'),    label: 'WAV to MP3' },
  { href: sitePath('flac-to-mp3'),   label: 'FLAC to MP3' },
  { href: sitePath('mkv-to-mp4'),    label: 'MKV to MP4' },
  { href: sitePath('docx-to-pdf'),   label: 'DOCX to PDF' },
  { href: sitePath('pdf-to-txt'),    label: 'PDF to Text' },
  { href: sitePath('heic-to-pdf'),   label: 'HEIC to PDF' },
  { href: sitePath('svg-to-png'),    label: 'SVG to PNG' },
  { href: sitePath('ttf-to-woff'),   label: 'TTF to WOFF' },
  { href: sitePath('m4a-to-mp3'),    label: 'M4A to MP3' },
  { href: sitePath('webm-to-mp4'),   label: 'WebM to MP4' },
  { href: sitePath('tiff-to-jpg'),   label: 'TIFF to JPG' },
];

/**
 * Curated format hub links for the footer — one or two key formats per
 * category. Keeps the footer to ~12 links instead of 36+ hub pages.
 */
export const FOOTER_FORMAT_LINKS: NavLink[] = [
  { href: sitePath('heic'),   label: 'HEIC' },
  { href: sitePath('webp'),   label: 'WebP' },
  { href: sitePath('avif'),   label: 'AVIF' },
  { href: sitePath('png'),    label: 'PNG'  },
  { href: sitePath('pdf'),    label: 'PDF'  },
  { href: sitePath('docx'),   label: 'DOCX' },
  { href: sitePath('mp4'),    label: 'MP4'  },
  { href: sitePath('mov'),    label: 'MOV'  },
  { href: sitePath('mp3'),    label: 'MP3'  },
  { href: sitePath('wav'),    label: 'WAV'  },
  { href: sitePath('ttf'),    label: 'TTF'  },
  { href: sitePath('zip'),    label: 'ZIP'  },
];

/**
 * Boosted links — used on the homepage "Trending" section.
 * These are the highest-opportunity pages that need inbound link authority.
 */
export const BOOSTED_LINKS: NavLink[] = [
  { href: sitePath('webp-to-jpg'),  label: 'WebP to JPG',   },
  { href: sitePath('avif-to-png'),  label: 'AVIF to PNG',   },
  { href: sitePath('mp4-to-mp3'),   label: 'MP4 to MP3',    },
  { href: sitePath('mkv-to-mp4'),   label: 'MKV to MP4',    },
  { href: sitePath('avi-to-mp4'),   label: 'AVI to MP4',    },
  { href: sitePath('webm-to-mp4'),  label: 'WebM to MP4',   },
  { href: sitePath('flac-to-mp3'),  label: 'FLAC to MP3',   },
  { href: sitePath('wav-to-mp3'),   label: 'WAV to MP3',    },
  { href: sitePath('docx-to-pdf'),  label: 'DOCX to PDF',   },
  { href: sitePath('pdf-to-txt'),   label: 'PDF to Text',   },
  { href: sitePath('heic-to-pdf'),  label: 'HEIC to PDF',   },
  { href: sitePath('jpg-to-pdf'),   label: 'JPG to PDF',    },
  { href: sitePath('svg-to-png'),   label: 'SVG to PNG',    },
  { href: sitePath('docx-to-txt'),  label: 'DOCX to TXT',   },
  { href: sitePath('ttf-to-woff'),  label: 'TTF to WOFF',   },
];

/** Flat list of internal links to inject into prerender <noscript> for a given path. */
export function getPrerenderInternalLinks(path: string): NavLink[] {
  const links: NavLink[] = [{ href: '/', label: 'Home' }];

  const slug = path.replace(/^\//, '');
  if (!slug) {
    links.push(...POPULAR_LINKS.slice(0, 12));
    for (const section of getSourceHubSections()) {
      links.push(...section.links.slice(0, 4));
    }
    return links;
  }

  const route = converterRoutes.find((r) => r.slug === slug);
  if (route) {
    links.push(
      { href: sitePath(route.sourceFormat), label: `${route.sourceFormat.toUpperCase()} hub` },
      { href: sitePath(`to-${route.targetFormat}`), label: `To ${route.targetFormat.toUpperCase()}` },
    );
    links.push(
      ...getRelatedConverters(route.sourceFormat, route.targetFormat, 8).map((r) => ({
        href: sitePath(r.slug),
        label: r.label,
      })),
    );
    // Always include a handful of boosted links for cross-linking authority
    links.push(...BOOSTED_LINKS.slice(0, 5).map((l) => l));
    return links;
  }

  const sourcePage = conversionMap.find((e) => e.source === slug);
  if (sourcePage) {
    links.push(
      ...sourcePage.targets.slice(0, 10).map((t) => ({
        href: sitePath(`${slug}-to-${t}`),
        label: `${slug.toUpperCase()} to ${t.toUpperCase()}`,
      })),
    );
    return links;
  }

  if (slug.startsWith('to-')) {
    const target = slug.slice(3);
    const sources = conversionMap
      .filter((e) => e.targets.includes(target))
      .map((e) => e.source);
    links.push(
      ...sources.slice(0, 10).map((s) => ({
        href: sitePath(`${s}-to-${target}`),
        label: `${s.toUpperCase()} to ${target.toUpperCase()}`,
      })),
    );
    return links;
  }

  links.push(...POPULAR_LINKS.slice(0, 8));
  return links;
}

export function getRelatedConverters(
  source: string,
  target: string,
  limit = 12,
): typeof converterRoutes {
  const slug = `${source}-to-${target}`;

  // Score: priority slugs get 0, others get 1 — priority pages bubble to top
  const score = (s: string) => (PRIORITY_SLUGS.has(s) ? 0 : 1);

  return converterRoutes
    .filter((r) => r.slug !== slug)
    .filter(
      (r) =>
        r.sourceFormat === source ||
        r.targetFormat === target ||
        r.sourceFormat === target,
    )
    .sort((a, b) => score(a.slug) - score(b.slug))
    .slice(0, limit);
}
