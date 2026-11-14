import { conversionMap } from './conversion-map';
import { HAND_WRITTEN_SLUGS } from './seo/converters/tier-s';

export interface ConverterRoute {
  slug: string;
  sourceFormat: string;
  targetFormat: string;
  label: string;
  category: string;
}

export interface FormatPage {
  slug: string;
  targetFormat: string;
  label: string;
  description: string;
  acceptedInputs: string[];
}

export interface SourceFormatPage {
  sourceFormat: string;
  label: string;
  targets: string[];
}

/**
 * Every conversion the tool can perform (from the conversion map).
 * The tool works for all of these, but only some get their own page.
 */
const allConversionPairs: ConverterRoute[] = conversionMap
  .filter(entry => entry.source !== 'jpeg') // alias of jpg
  .flatMap(entry =>
    entry.targets.map(target => ({
      slug: `${entry.source}-to-${target}`,
      sourceFormat: entry.source,
      targetFormat: target,
      label: `${entry.source.toUpperCase()} → ${target.toUpperCase()}`,
      category: entry.category.charAt(0).toUpperCase() + entry.category.slice(1),
    }))
  );

const publishedSlugs = new Set<string>(HAND_WRITTEN_SLUGS);

/**
 * Converter pages that exist as URLs: only conversions with hand-written
 * content. Templated pages for the remaining pairs were removed; those pairs
 * still work in the homepage tool.
 */
export const converterRoutes: ConverterRoute[] = allConversionPairs.filter(r =>
  publishedSlugs.has(r.slug)
);

/** Target hub pages (/to-pdf/) — one per target that has a converter page. */
export const formatPages: FormatPage[] = (() => {
  const allTargets = new Set(converterRoutes.map(r => r.targetFormat));

  return [...allTargets].map(target => ({
    slug: `to-${target}`,
    targetFormat: target,
    label: `Convert to ${target.toUpperCase()}`,
    description: `Convert files to ${target.toUpperCase()} format.`,
    acceptedInputs: converterRoutes
      .filter(r => r.targetFormat === target)
      .map(r => r.sourceFormat),
  }));
})();

/** Source hub pages (/png/) — one per source that has a converter page. */
export function getSourceFormatPage(format: string): SourceFormatPage | undefined {
  const key = format.toLowerCase();
  const targets = converterRoutes.filter(r => r.sourceFormat === key).map(r => r.targetFormat);
  if (targets.length === 0) return undefined;
  return {
    sourceFormat: key,
    label: `${key.toUpperCase()} File Converter`,
    targets,
  };
}

/** Whether a dedicated page exists for this conversion pair. */
export function isPublishedPair(source: string, target: string): boolean {
  const slug = `${source.toLowerCase()}-to-${target.toLowerCase()}`;
  return converterRoutes.some(r => r.slug === slug);
}

export function getConverterBySlug(slug: string): ConverterRoute | undefined {
  return converterRoutes.find(r => r.slug === slug);
}

export function getFormatPageBySlug(slug: string): FormatPage | undefined {
  return formatPages.find(p => p.slug === slug);
}
