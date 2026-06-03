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

  const longDescription = buildSourceHubLongDesc(slug, s, cat, outputs, targets.length);

  return {
    title,
    metaDescription,
    heading: `${s} File Converter`,
    description: pick(slug, [
      `Convert ${s} to ${outputs} without leaving your browser. Select files above, choose an output format, and download results privately.`,
      `All ${s} converters on this page run on your device — ideal for sensitive ${cat} files you don't want on a server.`,
    ]),
    details: desc(sourceFormat),
    longDescription,
    useCases: hubSourceUseCases(slug, s, cat, outputs),
    faqs: hubSourceFaqs(slug, s, cat, outputs, targets),
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

  const longDescription = buildTargetHubLongDesc(slug, t, inputList, inputs.length, targetFormat);

  return {
    title,
    metaDescription,
    heading: `Convert to ${t}`,
    description: pick(slug, [
      `Turn supported files into ${t} format using the converters below. Processing is local, free, and unlimited.`,
      `Output format: ${t}. Accepted inputs include ${inputList} — select the matching converter for your source file.`,
    ]),
    details: desc(targetFormat),
    longDescription,
    useCases: hubTargetUseCases(slug, t, inputList, targetFormat),
    faqs: hubTargetFaqs(slug, t, inputList, targetFormat),
  };
}

function buildSourceHubLongDesc(
  slug: string,
  s: string,
  cat: string,
  outputs: string,
  targetCount: number,
): string {
  const audience = hubAudience(cat);
  const privacyNote = hubPrivacyNote(cat);

  return pick(slug, [
    `This hub covers all ${targetCount} ${s} conversions available on FileConvertir. ${s} is widely used in ${audience} workflows, but recipients, apps, and platforms often require a different format. ${privacyNote} Choose a target format below — each converter runs locally in your browser with no account and no file upload.`,
    `If you work with ${s} files regularly and want a privacy-respecting alternative to cloud tools, this is the right page. ${hubCategoryContext(cat, s)} Outputs include ${outputs}. All conversions are free, unlimited, and run entirely on your device.`,
  ]);
}

function buildTargetHubLongDesc(
  slug: string,
  t: string,
  inputList: string,
  inputCount: number,
  targetFormat: string,
): string {
  return pick(slug, [
    `If you need a .${targetFormat} file, start here. This hub lists all ${inputCount} supported input formats that can export to ${t}: ${inputList}. Each converter processes files on your device — no cloud upload, no account, no size restriction beyond 100MB per file. ${targetHubContext(targetFormat)}`,
    `Target-format hubs help when a form, portal, app, or colleague specifies ${t} but your source material is in a different format. Pick the input that matches your file, convert in-browser, and download ${t} output without installing software or waiting in an upload queue.`,
  ]);
}

function hubAudience(cat: string): string {
  const m: Record<string, string> = {
    image: 'photo editing, web design, and print production',
    document: 'office, academic, and business publishing',
    audio: 'podcast production, music creation, and voice recording',
    video: 'social media, screen recording, and video editing',
    font: 'web design, branding, and app development',
    archive: 'file distribution, backup, and project handoff',
  };
  return m[cat] ?? 'everyday file management';
}

function hubPrivacyNote(cat: string): string {
  const m: Record<string, string> = {
    image: 'Photos and graphics are processed locally — ideal for sensitive images you don\'t want on a server.',
    document: 'Documents, contracts, and reports are processed in-browser without any server upload.',
    audio: 'Audio recordings stay on your device throughout conversion — no cloud storage involved.',
    video: 'Personal or corporate video files are processed locally without any upload.',
    font: 'Custom and licensed fonts are converted without being transmitted anywhere.',
    archive: 'Files are packaged locally, so nothing in the archive is transmitted during the process.',
  };
  return m[cat] ?? 'Files stay on your device throughout conversion.';
}

function hubCategoryContext(cat: string, s: string): string {
  const m: Record<string, string> = {
    image: `${s} images can be exported to web-optimized, print-ready, or transparency-preserving formats depending on your needs.`,
    document: `${s} documents can be exported for sharing (PDF), text extraction (TXT), or web publishing (HTML, Markdown).`,
    audio: `${s} audio can be converted for universal playback (MP3), professional editing (WAV), or archival (FLAC).`,
    video: `${s} video can be repackaged for device compatibility (MP4), web streaming (WebM), or audio extraction (MP3).`,
    font: `${s} fonts can be prepared for web use (WOFF, WOFF2) or cross-platform desktop use (OTF, TTF).`,
    archive: `${s} archives can be repackaged into other archive formats for compatibility with different extraction tools.`,
  };
  return m[cat] ?? `${s} files can be converted to a range of output formats.`;
}

function targetHubContext(targetFormat: string): string {
  const m: Record<string, string> = {
    jpg: 'JPG is the most universally compatible image format, accepted by every email client, website, and device.',
    png: 'PNG preserves transparency and lossless quality — the standard for logos, graphics, and UI assets.',
    pdf: 'PDF preserves formatting across all platforms and is the standard for document sharing and printing.',
    mp3: 'MP3 plays on every device ever made — the universal audio format for music, podcasts, and voice.',
    mp4: 'MP4 is the universal video container supported by every streaming platform, device, and media player.',
    webp: 'WebP is the recommended format for web images — 25–35% smaller than JPG or PNG.',
    woff: 'WOFF is the standard web font format with 100% browser support for CSS @font-face.',
    wav: 'WAV provides uncompressed audio for professional editing and maximum quality.',
    txt: 'TXT is plain text readable by every application, perfect for data processing and AI tools.',
  };
  return m[targetFormat] ?? '';
}

function hubSourceUseCases(slug: string, s: string, cat: string, outputs: string): string[] {
  return [
    pick(slug, [
      `Standardize ${s} exports to a consistent format before sending to clients or colleagues`,
      `Batch-convert a folder of ${s} files to ${outputs.split(',')[0]?.trim() ?? 'another format'} in one session`,
    ]),
    pick(slug, [
      `Fix format compatibility when ${s} files are rejected by email, CMS, or cloud storage`,
      `Avoid cloud uploads for confidential ${s} files — keep conversion local and private`,
    ]),
    cat === 'image'
      ? `Prepare ${s} assets for web publishing, social media, or print without desktop software`
      : cat === 'audio' || cat === 'video'
        ? `Convert ${s} files for playback on devices or platforms that don't support the format natively`
        : `Move ${s} content into formats your downstream tools and workflows actually support`,
    `Quickly convert a ${s} file on a borrowed or locked-down computer — no install needed`,
  ];
}

function hubSourceFaqs(
  slug: string,
  s: string,
  cat: string,
  outputs: string,
  targets: string[],
): { q: string; a: string }[] {
  return [
    {
      q: `What can I convert ${s} to?`,
      a: `From this hub you can convert ${s} to: ${outputs}. Each link opens a dedicated converter with the output format pre-selected. All conversions are free and run in your browser.`,
    },
    {
      q: `Do I need to install software to convert ${s} files?`,
      a: `No. Use any modern browser on Windows, macOS, Linux, Android, or iOS. There's nothing to download or install — the conversion logic runs inside the browser tab.`,
    },
    {
      q: `Are my ${s} files uploaded to a server?`,
      a: `No — all conversions run locally in your browser. ${cat === 'image' ? 'Images use the browser\'s Canvas API and native decoders.' : cat === 'audio' || cat === 'video' ? 'Audio and video use FFmpeg.wasm, which runs locally.' : 'Documents use in-browser JavaScript libraries.'} Files never leave your device.`,
    },
    {
      q: pick(slug, [`Is there a file size limit?`, `Can I convert many ${s} files at once?`]),
      a: `Up to 100MB per file and 20 files per batch (500MB total per batch). ${cat === 'font' ? 'Font files are tiny — you\'ll never hit these limits.' : cat === 'image' ? 'Most images are well under 10MB, so the limit is rarely a concern.' : 'For larger files, a desktop tool is recommended.'}`,
    },
    {
      q: `Which ${s} conversion is most common?`,
      a: pick(slug, [
        `The most popular ${s} conversions depend on the use case — ${formatCommonConversion(cat, targets, outputs)} tends to be most requested.`,
        `Check the quick links below for the most popular ${s} target formats.`,
      ]),
    },
    {
      q: `Does this work on iPhone or Android?`,
      a: `Yes. Open the converter in Safari (iPhone) or Chrome (Android) and select files from your camera roll or file storage. Very large audio and video conversions may be slower on mobile.`,
    },
  ];
}

function formatCommonConversion(cat: string, targets: string[], outputs: string): string {
  const common: Record<string, string> = {
    image: targets.includes('jpg') ? 'converting to JPG' : targets.includes('png') ? 'converting to PNG' : `converting to ${outputs.split(',')[0]?.trim() ?? 'the first target'}`,
    document: targets.includes('pdf') ? 'converting to PDF' : 'converting to TXT for text extraction',
    audio: targets.includes('mp3') ? 'converting to MP3 for universal playback' : 'converting to WAV for editing',
    video: targets.includes('mp4') ? 'converting to MP4 for device compatibility' : 'converting to MP3 for audio extraction',
    font: targets.includes('woff') ? 'converting to WOFF for web use' : 'converting to TTF for desktop use',
    archive: 'converting to ZIP for broad compatibility',
  };
  return common[cat] ?? `the first target: ${outputs.split(',')[0]?.trim() ?? ''}`;
}

function hubTargetUseCases(slug: string, t: string, inputs: string, targetFormat: string): string[] {
  return [
    `You were asked for a ${t} file but only have ${inputs.split(',')[0]?.trim() ?? 'another format'}`,
    `Standardize project deliverables to ${t} format for consistent sharing across your team`,
    pick(slug, [
      `Convert to ${t} without installing format-specific desktop applications`,
      `Quickly produce a ${t} output on a borrowed computer or without admin access to install software`,
    ]),
    `Keep source files private while producing ${t} output — all conversion is local`,
  ];
}

function hubTargetFaqs(
  slug: string,
  t: string,
  inputs: string,
  targetFormat: string,
): { q: string; a: string }[] {
  return [
    {
      q: `Which file formats can be converted to ${t}?`,
      a: `Supported input formats include: ${inputs}. Each input has its own dedicated converter page — click the link that matches your source file.`,
    },
    {
      q: `Is converting to ${t} free?`,
      a: `Yes — unlimited conversions with no account, no watermark, and no daily quota. Everything runs in your browser.`,
    },
    {
      q: `Will converting to ${t} reduce quality?`,
      a: pick(slug, [
        `It depends on the conversion pair. Lossless targets like PNG and WAV preserve full quality. Lossy targets like JPG and MP3 trade some quality for smaller file size. The converter uses high-quality settings to minimize any perceptual loss.`,
        `Some conversions re-encode content (introducing minor quality changes) while others simply repackage without re-encoding (no quality change). The individual converter page explains the behavior for each specific input-to-${t} path.`,
      ]),
    },
    {
      q: `Are my files uploaded when converting to ${t}?`,
      a: `No. All conversion happens locally in your browser. Files are never sent to any server — there's no upload step, no server-side storage, and no privacy risk.`,
    },
    {
      q: `Can I use this on mobile to get ${t} files?`,
      a: `Yes — works in Safari on iPhone and Chrome on Android. Select files from your device storage or camera roll. Large video and audio conversions may be slower on mobile.`,
    },
    {
      q: `How do I pick the right converter for ${t}?`,
      a: `Match your source file\'s extension to the list on this page. Each converter is optimized for that specific input-to-${t} path and opens with ${t} preselected as the output.`,
    },
  ];
}
