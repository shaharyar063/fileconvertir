import type { Step } from './types';
import { formatLabel } from '../../format-label';

/**
 * The three steps of every conversion page. Adding and downloading work the
 * same way for every pair; `convert` is the page-specific middle step and says
 * what this converter does to this file type.
 */
export function steps(
  source: string,
  target: string,
  convert: string,
  options: { add?: string; download?: string } = {},
): [Step, Step, Step] {
  const s = formatLabel(source);
  const t = formatLabel(target);
  return [
    {
      name: `Add your ${s} files`,
      text: options.add ?? `Click Select Files or drop up to 20 ${s} files onto the converter. Each file can be up to 100 MB.`,
    },
    { name: `Convert to ${t}`, text: convert },
    {
      name: 'Download',
      text: options.download ?? `Save the ${t} file. If you converted several files, they download together as one ZIP.`,
    },
  ];
}
