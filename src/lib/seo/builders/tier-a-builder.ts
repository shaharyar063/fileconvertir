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
      `When ${s} will not open where you need ${t}, use the converter above. Processing stays on your device for privacy.`,
    ]),
    longDescription,
    useCases: [
      ...base.useCases,
      pick(slug, extraUseCase(cat, s, t)),
    ].slice(0, 4),
    faqs: [
      ...base.faqs.slice(0, 3),
      {
        q: pick(slug, [
          `How long does ${s} to ${t} take?`,
          `Does this work offline?`,
          `Can I convert multiple ${s} files to ${t}?`,
        ]),
        a: pick(slug, [
          `Most jobs finish in seconds on a modern laptop. Video/audio may take longer; the first FFmpeg conversion loads extra code once.`,
          `After the page loads, many image and document conversions work offline. Audio/video need the initial FFmpeg download while online.`,
          `Yes — add up to 20 ${s} files and download results individually or as a ZIP.`,
        ]),
      },
      {
        q: `Why choose browser conversion over desktop software?`,
        a: `No install, no account, and files stay local. Useful for one-off tasks on shared or locked-down computers.`,
      },
    ],
  };
}

function scenarioLine(cat: string, s: string, t: string, archive: boolean): string {
  if (archive) return `you need a ${t} package from ${s} files.`;
  const m: Record<string, string> = {
    image: `${t} is required for email, CMS, or design tools that reject ${s}.`,
    document: `you need ${t} for sharing, editing, or archiving ${s} content.`,
    audio: `players or editors expect ${t} instead of ${s}.`,
    video: `platforms or devices require ${t} video rather than ${s}.`,
    font: `your stack needs ${t} web fonts or desktop installs from ${s}.`,
  };
  return m[cat] ?? `${t} improves compatibility versus ${s}.`;
}

function scenarioShort(cat: string, s: string, t: string): string {
  const m: Record<string, string> = {
    image: `Fix image compatibility.`,
    document: `Repurpose document content.`,
    audio: `Fix audio playback.`,
    video: `Fix video compatibility.`,
    font: `Prepare fonts for web or OS.`,
    archive: `Bundle files for transfer.`,
  };
  return m[cat] ?? `Convert formats quickly.`;
}

function extraUseCase(cat: string, s: string, t: string): string[] {
  return [
    `Batch-convert a folder of ${s} files before a deadline`,
    `Avoid installing desktop tools for a one-time ${s} → ${t} task`,
    `Keep confidential ${s} files on-device during conversion to ${t}`,
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
      `When you need to hand off multiple ${s} files as one download, converting to ${t} keeps attachments organized. FileConvertir builds the archive in your browser using JavaScript — no upload queue, no account, and no server copies of your data. This is useful for email limits, ticket attachments, and quick backups. Select up to 20 files per batch and download the ${t} when processing completes.`,
      `Creating a ${t} from ${s} files is a common step before sharing or storing project assets. This tool repackages locally so sensitive material does not pass through a cloud converter. Works on Windows, macOS, Linux, and modern mobile browsers.`,
    ]);
  }
  const engine =
    cat === 'audio' || cat === 'video'
      ? 'FFmpeg.wasm in your browser'
      : cat === 'image'
        ? 'the browser Canvas API and native decoders'
        : 'in-browser document and text libraries';

  return pick(slug, [
    `Converting ${s} to ${t} solves a practical compatibility problem: many apps, websites, and devices standardize on ${t}, while your files are still in ${s}. FileConvertir handles the transformation with ${engine}, so files remain on your computer or phone. There is no subscription, no file retention, and batch mode supports up to 20 inputs. For most pairs, you select files, wait a few seconds, and download ${t} output immediately.`,
    `If you received a ${s} file but need ${t}, you do not need to install heavy desktop suites for a single task. This page focuses on that exact conversion path with clear steps and privacy-first local processing. Quality and speed depend on file size and your device; the limit is 100MB per file.`,
  ]);
}
