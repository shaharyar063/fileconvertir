import type { FormatSEO } from '../types';
import { conversionMap, getSourcesForTarget } from '../../conversion-map';
import { name, desc, formatNameList } from '../format-names';
import { pick } from '../slug-hash';
import { fitMeta } from '../meta-utils';

export function buildSourceHubSEO(sourceFormat: string): FormatSEO {
  if (sourceFormat === 'jpeg') return buildSourceHubSEO('jpg');
  const slug = sourceFormat;
  const s = name(sourceFormat);
  const entry = conversionMap.find((e) => e.source === sourceFormat);
  const targets = entry?.targets ?? [];
  const outputs = formatNameList(targets);
  const cat = entry?.category ?? 'other';

  const title = pick(slug, [
    `${s} Converter — Free Online Tool`,
    `Convert ${s} Files — Browser-Based`,
    `Free ${s} File Converter Online`,
  ]);

  const metaDescription = fitMeta([
    `Convert ${s} to ${outputs} in your browser. Free, private, no signup — files stay on your device. Pick an output format and start instantly.`,
    `Free ${s} converter online: export to ${outputs} without uploading to a server. Works on Windows, Mac, and mobile browsers.`,
  ]);

  const longDescription = pick(slug, [
    `This hub covers every ${s} conversion available on FileConvertir. ${s} files are common in ${hubAudience(cat)} workflows, but recipients and apps often need a different format. Choose a target below — each converter runs locally in your browser with no account.`,
    `Use this page when you work with ${s} regularly and want a private alternative to cloud upload tools. Batch convert up to 20 files, up to 100MB each, with outputs including ${outputs}.`,
  ]);

  return {
    title,
    metaDescription,
    heading: `${s} File Converter`,
    description: pick(slug, [
      `Convert ${s} to ${outputs} without leaving your browser. Select files above, choose an output, and download results privately.`,
      `All ${s} tools on this page run on your device — ideal for sensitive ${cat} files you do not want on a server.`,
    ]),
    details: desc(sourceFormat),
    longDescription,
    useCases: hubSourceUseCases(slug, s, cat, outputs),
    faqs: hubSourceFaqs(slug, s, outputs),
  };
}

export function buildTargetHubSEO(targetFormat: string): FormatSEO {
  const slug = `to-${targetFormat}`;
  const t = name(targetFormat);
  const inputs = getSourcesForTarget(targetFormat);
  const inputList = formatNameList(inputs);

  const title = pick(slug, [
    `Convert to ${t} — Free Online`,
    `Create ${t} Files — Browser Converter`,
    `${t} Converter Hub — FileConvertir`,
  ]);

  const metaDescription = fitMeta([
    `Convert ${inputList} to ${t} in your browser. Free, private, no account — files never uploaded. Choose your input format and convert now.`,
    `Need a ${t} file? Turn ${inputList} into ${t} locally with FileConvertir. Works on desktop and mobile browsers.`,
  ]);

  const longDescription = pick(slug, [
    `If you need a .${targetFormat} file, start here. This hub lists every supported input that can export to ${t}, including ${inputList}. Each converter processes files on your device — useful for privacy and quick one-off jobs.`,
    `Target-format hubs help when a form, app, or colleague specifies ${t} but your source material is elsewhere. Pick the input that matches your file, convert in-browser, and download ${t} output without installing software.`,
  ]);

  return {
    title,
    metaDescription,
    heading: `Convert to ${t}`,
    description: pick(slug, [
      `Turn supported files into ${t} format using the converters below. Processing is local, free, and unlimited.`,
      `Output format: ${t}. Accepted inputs include ${inputList} and more — select the matching tool for your source file.`,
    ]),
    details: desc(targetFormat),
    longDescription,
    useCases: hubTargetUseCases(slug, t, inputList),
    faqs: hubTargetFaqs(slug, t, inputList),
  };
}

function hubAudience(cat: string): string {
  const m: Record<string, string> = {
    image: 'photo, web, and design',
    document: 'office, school, and business',
    audio: 'podcast, music, and voice',
    video: 'social, editing, and playback',
    font: 'web design and branding',
    archive: 'backup and file transfer',
  };
  return m[cat] ?? 'everyday';
}

function hubSourceUseCases(slug: string, s: string, cat: string, outputs: string): string[] {
  return [
    pick(slug, [
      `Standardize ${s} exports before sending to clients`,
      `Batch-convert a folder of ${s} files to ${outputs.split(',')[0] ?? 'another format'}`,
      `Avoid cloud uploads for confidential ${s} material`,
    ]),
    `Pick the right output when email or CMS rejects ${s}`,
    cat === 'image'
      ? `Prepare ${s} assets for web, print, or social in one session`
      : `Move ${s} into formats your tools actually support`,
  ];
}

function hubSourceFaqs(slug: string, s: string, outputs: string): { q: string; a: string }[] {
  return [
    {
      q: `What can I convert ${s} to?`,
      a: `From this hub: ${outputs}. Each link opens a dedicated converter with the output preselected.`,
    },
    {
      q: `Do I need to install software?`,
      a: `No. Use a modern browser on Windows, macOS, Linux, Android, or iOS.`,
    },
    {
      q: `Are ${s} files uploaded?`,
      a: `No — conversions run locally. Files stay on your device.`,
    },
    {
      q: pick(slug, [`Is there a file size limit?`, `Can I convert many ${s} files?`]),
      a: `Up to 100MB per file, 20 files per batch, 500MB total per batch.`,
    },
    {
      q: `Which ${s} conversion is most popular?`,
      a: pick(slug, [
        `It depends on your workflow — image users often pick JPG or PNG; documents often go to PDF.`,
        `Check the quick links below for common ${s} targets like those in ${outputs}.`,
      ]),
    },
  ];
}

function hubTargetUseCases(slug: string, t: string, inputs: string): string[] {
  return [
    `You were asked for ${t} but only have ${inputs.split(',')[0] ?? 'another format'}`,
    `Standardize deliverables to ${t} across a team`,
    `Convert without installing format-specific desktop apps`,
    `Keep proprietary files local while producing ${t}`,
  ];
}

function hubTargetFaqs(slug: string, t: string, inputs: string): { q: string; a: string }[] {
  return [
    {
      q: `Which files can become ${t}?`,
      a: `Supported inputs include ${inputs}. Open the matching converter if your source format is listed.`,
    },
    {
      q: `Is convert-to-${t} free?`,
      a: `Yes — unlimited conversions with no account.`,
    },
    {
      q: `Will converting to ${t} reduce quality?`,
      a: pick(slug, [
        `It depends on the pair. Lossless targets preserve detail; lossy targets trade size for compatibility.`,
        `Some conversions repackage without re-encoding; others re-encode for compatibility — the tool page explains behavior.`,
      ]),
    },
    {
      q: `Can I use this on mobile?`,
      a: `Yes. Large video or audio jobs may be slower on phones.`,
    },
    {
      q: `How do I pick the right converter?`,
      a: `Match your source file extension to the list below — each route is optimized for that input to ${t}.`,
    },
  ];
}
