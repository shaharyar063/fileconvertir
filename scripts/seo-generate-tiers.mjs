import fs from 'fs';
import { converterRoutes } from '../src/lib/converters.ts';
const TIER_S_SLUGS = [
  'heic-to-jpg', 'heic-to-png', 'heif-to-jpg', 'heif-to-png', 'mov-to-mp4', 'm4a-to-mp3', 'jpg-to-pdf', 'png-to-jpg',
  'webp-to-png', 'webp-to-jpg', 'avif-to-jpg', 'avif-to-png', 'svg-to-png', 'png-to-webp', 'jpg-to-png', 'gif-to-png',
  'tiff-to-jpg', 'tiff-to-png', 'bmp-to-jpg', 'png-to-tiff', 'heic-to-pdf', 'png-to-pdf',
  'mp3-to-wav', 'wav-to-mp3', 'flac-to-mp3', 'aac-to-mp3', 'ogg-to-mp3', 'm4a-to-wav', 'mp4-to-mp3', 'wav-to-flac',
  'mkv-to-mp4', 'avi-to-mp4', 'webm-to-mp4', 'mp4-to-webm', 'mov-to-mp3', 'mp4-to-wav',
  'docx-to-pdf', 'pdf-to-txt', 'txt-to-pdf', 'html-to-pdf', 'md-to-pdf', 'docx-to-txt',
];

const ARCHIVE_TARGETS = new Set(['zip', 'tar', 'gz']);
const tierS = new Set(TIER_S_SLUGS);

const tiers = {};
for (const route of converterRoutes) {
  if (route.sourceFormat === 'jpeg') {
    tiers[route.slug] = 'skip';
    continue;
  }
  if (tierS.has(route.slug)) {
    tiers[route.slug] = 'S';
  } else if (ARCHIVE_TARGETS.has(route.targetFormat)) {
    tiers[route.slug] = 'B';
  } else {
    tiers[route.slug] = 'A';
  }
}

fs.writeFileSync(
  'src/lib/seo/tiers.json',
  JSON.stringify(tiers, null, 2) + '\n',
);
const counts = Object.values(tiers).reduce((a, t) => ((a[t] = (a[t] || 0) + 1), a), {});
console.log(counts);
