import type { ConverterContentOverride } from '../types';
import { pick } from '../slug-hash';
import { name } from '../format-names';
import { getCategoryForFormat } from '../category';
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
  const cat = getCategoryForFormat(source);
  const base = buildTierAContent(source, target);

  return {
    ...base,
    isPriority: true,
    howToSteps: [
      {
        name: pick(slug, ['Select your files', 'Add your files', 'Choose files to convert']),
        text: pick(slug, [
          `Click the drop zone or use "Select Files" to add your .${source} files. Drag and drop works too — up to 20 files per batch.`,
          `Drop your .${source} file(s) directly onto the converter or click to browse. Batch mode supports up to 20 files at once.`,
          `Select one or more .${source} files from your device. The converter accepts batches of up to 20 files simultaneously.`,
        ]),
      },
      {
        name: `${t} output is preset`,
        text: pick(slug, [
          `This page is dedicated to ${s} → ${t}. The output format is already selected — conversion begins the moment files are loaded.`,
          `No format selection needed. This converter is pre-configured for ${t} output, so it starts as soon as ${s} files are added.`,
        ]),
      },
      {
        name: pick(slug, ['Processing stays local', 'In-browser conversion', 'Files stay on your device']),
        text: pick(slug, [
          `Your browser decodes ${s} and writes ${t} output on your device — nothing is sent to any server. Open DevTools → Network to verify zero upload traffic.`,
          `Conversion runs locally using ${engineLabel(cat)} — no cloud, no upload queue, no privacy risk. Files never leave your machine.`,
          `${t} files are created directly on your device. There is no upload step and no server-side processing.`,
        ]),
      },
      {
        name: 'Download results',
        text: pick(slug, [
          `Click Download to save each ${t} file, or grab the full batch as a single ZIP archive.`,
          `Individual ${t} files are available as soon as each one finishes. For batches, a ZIP download button appears when all conversions complete.`,
        ]),
      },
    ],
    whyChooseUs: [
      {
        title: pick(slug, ['Private by design', 'Zero-upload privacy', 'Files never leave your device']),
        text: `Cloud converters upload your ${s} files to their servers — FileConvertir processes them locally in your browser. ${privacyContext(cat)} Nothing is logged or stored.`,
      },
      {
        title: 'No account, no daily limits',
        text: `Use the converter as many times as you need, convert as many files as you want. No signup, no watermark on results, no daily quota.`,
      },
      {
        title: pick(slug, ['Works on every platform', 'Cross-platform, no install', 'Desktop and mobile support']),
        text: pick(slug, [
          `Works on Windows, macOS, Linux, Android, and iOS. Anywhere you have Chrome, Firefox, Edge, or Safari — no app to install.`,
          `No desktop software required. The converter runs in your browser, so it works on any device and operating system.`,
          `Access on desktop for fast processing of large files, or on mobile for quick conversions on the go.`,
        ]),
      },
      {
        title: pick(slug, [`${s} to ${t} in seconds`, 'No upload wait', 'Instant local processing']),
        text: pick(slug, [
          `Skip the upload queue. Conversion starts immediately because ${engineLabel(cat)} processes files right on your device.`,
          `Browser-based processing means zero upload time. ${s} files convert to ${t} without leaving your device.`,
        ]),
      },
    ],
    faqs: [
      ...base.faqs,
      {
        q: `Does ${s} to ${t} work on mobile?`,
        a: `Yes — works in Safari on iPhone and Chrome on Android. Very large ${cat === 'video' || cat === 'audio' ? 'audio/video' : ''} files may take longer on phones; a desktop or laptop is faster for big batches.`,
      },
      {
        q: `Is there a file size limit?`,
        a: `Up to 100MB per file, with a maximum of 20 files per batch (500MB total per batch). For larger files, a desktop tool like FFmpeg or HandBrake is recommended.`,
      },
    ],
  };
}

function engineLabel(cat: string): string {
  if (cat === 'audio' || cat === 'video') return 'FFmpeg.wasm';
  if (cat === 'image') return 'the browser\'s native image decoder';
  if (cat === 'document') return 'in-browser document libraries';
  if (cat === 'font') return 'opentype.js';
  return 'local browser APIs';
}

function privacyContext(cat: string): string {
  const m: Record<string, string> = {
    image: 'Ideal for sensitive photos, IDs, and documents you don\'t want on a server.',
    document: 'Especially important for contracts, CVs, and confidential business documents.',
    audio: 'Your recordings, voice memos, and music files stay on your device.',
    video: 'Personal videos and screen recordings are never transmitted to any server.',
    font: 'Custom and proprietary fonts are processed without any upload.',
    archive: 'Files packaged for sharing are assembled locally without cloud exposure.',
  };
  return m[cat] ?? 'Your files are never uploaded or stored.';
}
