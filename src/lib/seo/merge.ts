import type { ConverterContentOverride, ConverterSEO } from './types';
import { desc, name } from './format-names';

export function mergeConverterSEO(
  source: string,
  target: string,
  content: ConverterContentOverride,
): ConverterSEO {
  return {
    ...content,
    sourceInfo: desc(source),
    targetInfo: desc(target),
    heading: content.heading || `Convert ${name(source)} to ${name(target)}`,
  };
}
