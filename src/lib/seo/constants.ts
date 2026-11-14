export const META_DESC_MIN = 120;
export const META_DESC_MAX = 160;
export const PRIORITY_CONVERTERS = [
  'avif-to-jpg',
  'm4a-to-mp3',
  'mov-to-mp4',
  'webp-to-png',
] as const;

export const TIER_S_SLUGS = [
  'mov-to-mp4', 'm4a-to-mp3', 'jpg-to-pdf', 'png-to-jpg',
  'webp-to-png', 'webp-to-jpg', 'avif-to-jpg', 'avif-to-png', 'svg-to-png', 'png-to-webp', 'jpg-to-png', 'gif-to-png',
  'bmp-to-jpg', 'png-to-tiff', 'png-to-pdf',
  'mp3-to-wav', 'wav-to-mp3', 'flac-to-mp3', 'aac-to-mp3', 'ogg-to-mp3', 'm4a-to-wav', 'mp4-to-mp3', 'wav-to-flac',
  'mkv-to-mp4', 'avi-to-mp4', 'webm-to-mp4', 'mp4-to-webm', 'mov-to-mp3', 'mp4-to-wav',
  'docx-to-pdf', 'pdf-to-txt', 'txt-to-pdf', 'html-to-pdf', 'md-to-pdf', 'docx-to-txt',
] as const;
