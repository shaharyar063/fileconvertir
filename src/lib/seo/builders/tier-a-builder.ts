import type { ConverterContentOverride } from '../types';
import { name } from '../format-names';
import { pick } from '../slug-hash';
import { fitMeta } from '../meta-utils';
import { getCategoryForFormat, isArchiveTarget } from '../category';
import { buildTierBContent } from './tier-b-builder';

export function buildTierAContent(source: string, target: string): ConverterContentOverride {
  const slug = `${source}-to-${target}`;
  const s = name(source);
  const t = name(target);
  const cat = getCategoryForFormat(source);
  const archive = isArchiveTarget(target);
  const base = buildTierBContent(source, target);

  const title = pick(slug, [
    `${s} to ${t} Converter — Free, In Browser`,
    `Convert ${s} to ${t} — Private Online Tool`,
    `${s} to ${t} — No Upload, Works on Mobile`,
  ]);

  const metaDescription = fitMeta([
    `${s} to ${t} in your browser: free, private, no account. Ideal when ${scenarioLine(cat, s, t, archive)} Files never leave your device.`,
    `Turn ${s} into ${t} locally — no cloud upload. ${scenarioShort(cat, s, t)} Batch convert up to 20 files on desktop or phone.`,
  ]);

  const longDescription = buildLongDescription(slug, s, t, cat, archive);

  return {
    ...base,
    title,
    metaDescription,
    heading: base.heading,
    description: pick(slug, [
      `${scenarioShort(cat, s, t)} FileConvertir converts ${s} to ${t} entirely in your browser — select files, convert, download. No signup.`,
      `When ${s} won't open where you need ${t}, use the converter above. Processing stays on your device for privacy and speed.`,
    ]),
    longDescription,
    useCases: [
      ...base.useCases,
      pick(slug, extraUseCases(cat, s, t)),
    ].slice(0, 4),
    faqs: buildFaqs(slug, s, t, cat, base.faqs),
  };
}

function buildFaqs(
  slug: string,
  s: string,
  t: string,
  cat: string,
  baseFaqs: { q: string; a: string }[],
): { q: string; a: string }[] {
  return [
    ...baseFaqs.slice(0, 3),
    {
      q: pick(slug, [
        `How long does ${s} to ${t} conversion take?`,
        `Does ${s} to ${t} work offline?`,
        `Can I convert multiple ${s} files to ${t} at once?`,
      ]),
      a: pick(slug, [
        cat === 'audio' || cat === 'video'
          ? `Most ${s} files convert in real-time or faster on a modern laptop. The very first conversion loads FFmpeg.wasm (a one-time delay of a few seconds); subsequent conversions are faster.`
          : `Most jobs finish in 1–5 seconds on a modern laptop. Image conversions are nearly instant; large document files take a little longer.`,
        `After the page loads, image and document conversions work without an internet connection. Audio and video conversions need the initial FFmpeg.wasm download (a few seconds online), then work offline.`,
        `Yes — drop up to 20 ${s} files at once. They convert in parallel and you can download results individually or as a ZIP archive.`,
      ]),
    },
    {
      q: `Is ${s} to ${t} conversion truly free?`,
      a: `Yes — completely free with no limits, no watermark, no account required, and no expiry on use. FileConvertir runs as a client-side tool in your browser; there is no server infrastructure charging per conversion.`,
    },
    {
      q: pick(slug, [
        `Why convert ${s} to ${t} instead of using a desktop app?`,
        `Is a browser-based ${s} converter good enough?`,
      ]),
      a: pick(slug, [
        `Browser conversion is ideal for occasional or one-off tasks — no installation, no license, and files stay on your device. Desktop apps like ${desktopAlt(cat)} are better for bulk production workflows where you need scripting or advanced output controls.`,
        `For most everyday use cases, yes. The converter uses the same underlying libraries (${engineLabel(cat)}) as many desktop tools. For professional production work requiring exact encoder parameters, a dedicated desktop application offers more control.`,
      ]),
    },
    {
      q: `What is the file size limit?`,
      a: `Up to 100MB per file and 20 files per batch (500MB total). ${fileSizeContext(cat, s, t)}`,
    },
  ];
}

function engineLabel(cat: string): string {
  if (cat === 'audio' || cat === 'video') return 'FFmpeg.wasm';
  if (cat === 'image') return 'the Canvas API and browser image decoders';
  if (cat === 'document') return 'Mammoth.js and pdf.js';
  if (cat === 'font') return 'opentype.js';
  return 'JavaScript browser APIs';
}

function desktopAlt(cat: string): string {
  const m: Record<string, string> = {
    image: 'Photoshop, GIMP, or ImageMagick',
    document: 'Microsoft Word or LibreOffice',
    audio: 'Audacity, FFmpeg CLI, or Adobe Audition',
    video: 'HandBrake, FFmpeg CLI, or DaVinci Resolve',
    font: 'Fontforge',
    archive: '7-Zip or the OS built-in archiver',
  };
  return m[cat] ?? 'dedicated desktop software';
}

function fileSizeContext(cat: string, s: string, t: string): string {
  const m: Record<string, string> = {
    image: `Most ${s} images are well under 10MB, so this limit is rarely reached.`,
    document: `Typical ${s} documents are under 10MB. Very large documents with many embedded images may approach the limit.`,
    audio: `A 1-hour audio file at high quality is typically 50–80MB — within the limit for most recordings.`,
    video: `Most short video clips are within range; feature-length videos typically exceed 100MB. Use HandBrake for larger files.`,
    font: `Font files are tiny — typically under 1MB. The limit will never be reached for font conversion.`,
    archive: `For archives larger than 100MB, consider splitting into multiple batches.`,
  };
  return m[cat] ?? `For files over this limit, use a dedicated desktop tool.`;
}

function scenarioLine(cat: string, s: string, t: string, archive: boolean): string {
  if (archive) return `you need a ${t} package from ${s} files.`;
  const m: Record<string, string> = {
    image: `${t} is required for email, CMS, or design tools that reject ${s}.`,
    document: `you need ${t} for sharing, editing, or archiving ${s} content.`,
    audio: `your media player, streaming platform, or audio editor expects ${t} instead of ${s}.`,
    video: `your streaming device, video editor, or platform requires ${t} rather than ${s}.`,
    font: `your web stack or OS needs ${t} fonts from ${s} source files.`,
  };
  return m[cat] ?? `${t} offers better compatibility than ${s} for this use case.`;
}

function scenarioShort(cat: string, s: string, t: string): string {
  const m: Record<string, string> = {
    image: `Fix image format compatibility instantly.`,
    document: `Repurpose document content without reinstalling software.`,
    audio: `Fix audio playback on any device or app.`,
    video: `Fix video compatibility with your device or platform.`,
    font: `Prepare fonts for web or operating system use.`,
    archive: `Bundle files into a portable archive.`,
  };
  return m[cat] ?? `Convert formats quickly without desktop software.`;
}

function extraUseCases(cat: string, s: string, t: string): string[] {
  return [
    `Batch-convert a folder of ${s} files before a deadline without installing desktop software`,
    `Avoid uploading confidential ${s} files to a cloud converter — process everything locally`,
    `Quickly convert a ${s} attachment before forwarding to someone who needs ${t}`,
  ];
}

function buildLongDescription(
  slug: string,
  s: string,
  t: string,
  cat: string,
  archive: boolean,
): string {
  if (archive) {
    return pick(slug, [
      `When you need to hand off multiple ${s} files as one download, converting to ${t} keeps everything organized in a single archive. FileConvertir builds the ${t} archive directly in your browser using JavaScript — no upload queue, no account, and no server-side copy of your data. This is useful for email size limits, ticketing system attachments, and quick project backups. Select up to 20 files per batch and download the ${t} when processing completes.`,
      `Creating a ${t} from ${s} files is a common step before sharing or storing project assets. This tool handles the packaging locally so sensitive material doesn't pass through a cloud converter. Works on Windows, macOS, Linux, Android, and modern mobile browsers without any software installation.`,
    ]);
  }

  const engine = engineLabel(cat);

  return pick(slug, [
    `Converting ${s} to ${t} solves a practical compatibility problem: many apps, websites, and devices standardize on ${t}, while your files may still be in ${s} format. This is common when software versions differ, when files are shared across platforms, or when a submission portal specifies the output format you need. FileConvertir handles the conversion with ${engine} running entirely on your device — no upload, no subscription, and no file retention. Batch mode supports up to 20 inputs, and results are available for download immediately.`,
    `${s} and ${t} serve different purposes — ${formatPurpose(cat, s)} while ${formatPurpose(cat, t)}. Converting between them is often necessary when workflows span different tools or platforms. FileConvertir uses ${engine} to perform this conversion without any server involvement: files are processed on your computer or phone, which means faster results for small files and no privacy concerns for sensitive content. There's no daily limit, no account, and nothing to install.`,
  ]);
}

function formatPurpose(cat: string, fmt: string): string {
  const common: Record<string, string> = {
    jpg: 'JPG is optimized for photographs with small file sizes',
    png: 'PNG is lossless with transparency support for graphics',
    webp: 'WebP offers superior compression for web images',
    avif: 'AVIF provides next-generation compression for web delivery',
    heic: 'HEIC is Apple\'s efficient default photo format',
    tiff: 'TIFF preserves maximum image quality for printing and archiving',
    svg: 'SVG scales infinitely as a vector format',
    pdf: 'PDF preserves formatting universally for document sharing',
    docx: 'DOCX is the standard editable Word document format',
    txt: 'TXT is plain text compatible with every application',
    mp3: 'MP3 is universally supported for audio playback',
    wav: 'WAV stores uncompressed audio for professional editing',
    flac: 'FLAC preserves lossless audio quality',
    aac: 'AAC offers better quality than MP3 at the same file size',
    mp4: 'MP4 is the universal video container for streaming and sharing',
    mkv: 'MKV is flexible for multi-track video archiving',
    mov: 'MOV is Apple\'s QuickTime format for high-quality video',
    ttf: 'TTF is the standard desktop font format',
    woff: 'WOFF is optimized for web font delivery',
  };
  return common[fmt] ?? `${fmt.toUpperCase()} serves its specific use case`;
}
