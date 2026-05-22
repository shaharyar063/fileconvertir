import type { ConverterContentOverride } from '../types';
import { pick } from '../slug-hash';
import { name } from '../format-names';
import { buildTierAContent } from './tier-a-builder';

export function parseConverterSlug(slug: string): { source: string; target: string } {
  const idx = slug.indexOf('-to-');
  if (idx === -1) return { source: slug, target: '' };
  return { source: slug.slice(0, idx), target: slug.slice(idx + 4) };
}

/** Tier S pages without full hand copy still get HowTo, whyChooseUs, and isPriority. */
export function buildTierSEnhanced(source: string, target: string): ConverterContentOverride {
  const slug = `${source}-to-${target}`;
  const s = name(source);
  const t = name(target);
  const base = buildTierAContent(source, target);

  return {
    ...base,
    isPriority: true,
    howToSteps: [
      {
        name: pick(slug, ['Select your files', 'Add your files', 'Choose files to convert']),
        text: `Click the drop zone or browse to add .${source} files. You can process up to 20 files per batch.`,
      },
      {
        name: `${t} output is preset`,
        text: `This page already targets ${t}. Conversion begins once valid ${s} files are added.`,
      },
      {
        name: 'Processing stays local',
        text: pick(slug, [
          `Your browser decodes ${s} and writes ${t} output on your device — no server upload.`,
          `Conversion runs locally; check DevTools Network if you want to verify nothing is sent upstream.`,
        ]),
      },
      {
        name: 'Download results',
        text: `Save each ${t} file or download a ZIP when batch converting.`,
      },
    ],
    whyChooseUs: [
      {
        title: 'Private by design',
        text: `Unlike cloud converters, FileConvertir keeps ${s} files on your machine during ${s} → ${t} conversion.`,
      },
      {
        title: 'No account required',
        text: 'Free, unlimited use with no signup, watermark, or daily quota.',
      },
      {
        title: pick(slug, ['Works across devices', 'Fast for one-off tasks', 'No install']),
        text: pick(slug, [
          'Use Chrome, Edge, Firefox, or Safari on desktop and mobile — no app store download.',
          'Ideal when you need a single conversion without installing desktop software.',
          'Open the page, convert, and leave — nothing to uninstall afterward.',
        ]),
      },
    ],
    faqs: [
      ...base.faqs,
      {
        q: `Does ${s} to ${t} work on mobile?`,
        a: `Yes in modern mobile browsers. Very large files may be slower on phones; desktop is faster for big video or audio.`,
      },
    ],
  };
}
