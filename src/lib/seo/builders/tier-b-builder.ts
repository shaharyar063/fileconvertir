import type { ConverterContentOverride } from '../types';
import { name } from '../format-names';
import { pick } from '../slug-hash';
import { fitMeta } from '../meta-utils';
import { getCategoryForFormat, isArchiveTarget } from '../category';

export function buildTierBContent(source: string, target: string): ConverterContentOverride {
  const slug = `${source}-to-${target}`;
  const s = name(source);
  const t = name(target);
  const cat = getCategoryForFormat(source);
  const archive = isArchiveTarget(target);

  const title = pick(slug, [
    `${s} to ${t} — Free Browser Converter`,
    `Convert ${s} to ${t} Online — No Upload`,
    `${s} to ${t} Converter — Private & Free`,
    `Change ${s} Files to ${t} — In Your Browser`,
  ]);

  const metaDescription = archive
    ? fitMeta([
        `Bundle or repackage ${s} files as ${t} in your browser — no upload, no signup. Handy for backups, email attachments, and cross-platform sharing.`,
        `Turn ${s} into a ${t} archive locally. FileConvertir runs in the browser; files never leave your device. Free and unlimited.`,
      ])
    : fitMeta([
        `Convert ${s} to ${t} in your browser — private, free, no account. Files stay on your device; batch up to 20 files. Works on Windows, Mac, and mobile.`,
        `Need ${t} from ${s}? FileConvertir converts locally in the browser with no server upload. Free, instant, and private.`,
        `${s} to ${t} conversion that runs entirely on your device. Select files, convert, download — no signup or cloud storage.`,
      ]);

  const heading = pick(slug, [
    `Convert ${s} to ${t}`,
    `${s} to ${t} Converter`,
    `Change ${s} to ${t}`,
  ]);

  const description = archive
    ? pick(slug, [
        `Repackage your ${s} files into ${t} format for easier sharing or backup. Everything runs in the browser — nothing is sent to a server.`,
        `Create a ${t} archive from ${s} files when you need smaller downloads or Linux-friendly packages. Local processing only.`,
      ])
    : pick(slug, [
        `Turn ${s} files into ${t} when your app, device, or colleague needs that format. Conversion uses your browser — files stay private on your machine.`,
        `Switch from ${s} to ${t} without installing software. Select your files above and download the result in seconds.`,
      ]);

  const useCases = buildUseCases(slug, s, t, cat, archive);
  const faqs = buildFaqs(slug, s, t, cat, archive);

  return { title, metaDescription, heading, description, useCases, faqs };
}

function buildUseCases(
  slug: string,
  s: string,
  t: string,
  cat: string,
  archive: boolean,
): string[] {
  if (archive) {
    return [
      pick(slug, [
        `Email a folder of ${s} files as one ${t} attachment`,
        `Share multiple ${s} exports in a single ${t} download`,
        `Back up project ${s} assets before archiving to ${t}`,
      ]),
      pick(slug, [
        `Move ${s} files to a ${t} archive for Linux or macOS tools`,
        `Reduce clutter by bundling ${s} files before storage`,
      ]),
      `Keep sensitive ${s} data local — no cloud upload during ${t} creation`,
    ];
  }
  const pool: Record<string, string[]> = {
    image: [
      `Open ${s} photos in apps that only accept ${t}`,
      `Shrink or repackage ${s} images for web or email as ${t}`,
      `Prepare ${t} assets for slides, CMS, or print workflows from ${s}`,
    ],
    document: [
      `Extract or reformat ${s} content into editable ${t}`,
      `Share ${s} documents as ${t} for universal viewing`,
      `Archive ${s} notes or exports in ${t} for compliance`,
    ],
    audio: [
      `Play ${s} audio on devices that prefer ${t}`,
      `Edit ${s} recordings in a DAW that expects ${t}`,
      `Share podcast or voice clips as ${t} for wider compatibility`,
    ],
    video: [
      `Upload ${s} video where only ${t} is accepted`,
      `Extract or repackage ${s} footage for editing as ${t}`,
      `Fix playback issues by moving ${s} video to ${t}`,
    ],
    font: [
      `Use ${s} fonts on the web by converting to ${t}`,
      `Install ${s} typefaces on systems that need ${t}`,
      `Bundle ${s} font files into ${t} for deployment`,
    ],
  };
  const base = pool[cat] ?? [
    `Convert ${s} to ${t} for software that requires ${t}`,
    `Share files with teammates who use ${t} instead of ${s}`,
    `Standardize file formats in a local, private workflow`,
  ];
  return [base[0]!, base[1]!, pick(slug, base)];
}

function buildFaqs(
  slug: string,
  s: string,
  t: string,
  cat: string,
  archive: boolean,
): { q: string; a: string }[] {
  const how = pick(slug, [
    `How do I convert ${s} to ${t} without uploading?`,
    `What is the easiest way to turn ${s} into ${t}?`,
    `Can I convert ${s} to ${t} on my phone?`,
  ]);
  const howA = `Open this page, select your ${s} file(s), and confirm ${t} as the output. Processing runs in your browser; download when finished.`;

  const quality = archive
    ? {
        q: `Will my ${s} files be compressed inside ${t}?`,
        a: `${t} archives bundle files as-is unless the format applies compression. Check the output size after conversion.`,
      }
    : {
        q: `Will quality change when converting ${s} to ${t}?`,
        a: cat === 'image' || cat === 'audio' || cat === 'video'
          ? `Some formats are lossy; others are repackaged without re-encoding. The converter uses the best browser-safe method for this pair.`
          : `Text and document conversions focus on structure; media conversions may re-encode depending on the formats.`,
      };

  return [
    { q: how, a: howA },
    { q: `Is ${s} to ${t} conversion free?`, a: `Yes — unlimited conversions, no account, no watermark.` },
    {
      q: `Are my ${s} files stored on your servers?`,
      a: `No. FileConvertir processes files locally in your browser. They never leave your device.`,
    },
    quality,
    {
      q: `What is the maximum file size?`,
      a: `Up to 100MB per file, with batch conversion up to 20 files (500MB total per batch).`,
    },
  ];
}
