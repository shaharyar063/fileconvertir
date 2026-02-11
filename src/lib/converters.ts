import { conversionMap, getSourcesForTarget } from './conversion-map';

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

/** Auto-generate all converter routes from the conversion map */
export const converterRoutes: ConverterRoute[] = conversionMap.flatMap(entry =>
  entry.targets.map(target => ({
    slug: `${entry.source}-to-${target}`,
    sourceFormat: entry.source,
    targetFormat: target,
    label: `${entry.source.toUpperCase()} → ${target.toUpperCase()}`,
    category: entry.category.charAt(0).toUpperCase() + entry.category.slice(1),
  }))
);

/** Auto-generate all format (target) pages from the conversion map */
export const formatPages: FormatPage[] = (() => {
  const allTargets = new Set<string>();
  conversionMap.forEach(e => e.targets.forEach(t => allTargets.add(t)));

  return [...allTargets].map(target => ({
    slug: `to-${target}`,
    targetFormat: target,
    label: `Convert to ${target.toUpperCase()}`,
    description: `Convert files to ${target.toUpperCase()} format.`,
    acceptedInputs: getSourcesForTarget(target),
  }));
})();

/** Build source format pages from conversion map */
export function getSourceFormatPage(format: string): SourceFormatPage | undefined {
  const entry = conversionMap.find(e => e.source === format.toLowerCase());
  if (!entry) return undefined;
  return {
    sourceFormat: entry.source,
    label: `${entry.source.toUpperCase()} File Converter`,
    targets: entry.targets,
  };
}

export function getConverterBySlug(slug: string): ConverterRoute | undefined {
  return converterRoutes.find(r => r.slug === slug);
}

export function getFormatPageBySlug(slug: string): FormatPage | undefined {
  return formatPages.find(p => p.slug === slug);
}
