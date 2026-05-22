/** Magic-byte signatures for common converter input types. */
const SIGNATURES: Record<string, { offset: number; bytes: number[] }[]> = {
  jpg: [{ offset: 0, bytes: [0xff, 0xd8, 0xff] }],
  jpeg: [{ offset: 0, bytes: [0xff, 0xd8, 0xff] }],
  png: [{ offset: 0, bytes: [0x89, 0x50, 0x4e, 0x47] }],
  gif: [
    { offset: 0, bytes: [0x47, 0x49, 0x46, 0x38, 0x37, 0x61] },
    { offset: 0, bytes: [0x47, 0x49, 0x46, 0x38, 0x39, 0x61] },
  ],
  webp: [{ offset: 8, bytes: [0x57, 0x45, 0x42, 0x50] }],
  bmp: [{ offset: 0, bytes: [0x42, 0x4d] }],
  pdf: [{ offset: 0, bytes: [0x25, 0x50, 0x44, 0x46] }],
  zip: [{ offset: 0, bytes: [0x50, 0x4b, 0x03, 0x04] }],
  mp3: [
    { offset: 0, bytes: [0x49, 0x44, 0x33] },
    { offset: 0, bytes: [0xff, 0xfb] },
    { offset: 0, bytes: [0xff, 0xf3] },
    { offset: 0, bytes: [0xff, 0xf2] },
  ],
  wav: [{ offset: 0, bytes: [0x52, 0x49, 0x46, 0x46] }],
  ogg: [{ offset: 0, bytes: [0x4f, 0x67, 0x67, 0x53] }],
  flac: [{ offset: 0, bytes: [0x66, 0x4c, 0x61, 0x43] }],
  mp4: [
    { offset: 4, bytes: [0x66, 0x74, 0x79, 0x70] },
  ],
  mov: [{ offset: 4, bytes: [0x66, 0x74, 0x79, 0x70] }],
  mkv: [{ offset: 0, bytes: [0x1a, 0x45, 0xdf, 0xa3] }],
  avi: [{ offset: 0, bytes: [0x52, 0x49, 0x46, 0x46] }],
  webm: [{ offset: 0, bytes: [0x1a, 0x45, 0xdf, 0xa3] }],
  gz: [{ offset: 0, bytes: [0x1f, 0x8b] }],
  docx: [{ offset: 0, bytes: [0x50, 0x4b, 0x03, 0x04] }],
  odt: [{ offset: 0, bytes: [0x50, 0x4b, 0x03, 0x04] }],
  ttf: [{ offset: 0, bytes: [0x00, 0x01, 0x00, 0x00] }],
  otf: [{ offset: 0, bytes: [0x4f, 0x54, 0x54, 0x4f] }],
  woff: [{ offset: 0, bytes: [0x77, 0x4f, 0x46, 0x46] }],
  woff2: [{ offset: 0, bytes: [0x77, 0x4f, 0x46, 0x32] }],
};

const TEXT_EXTENSIONS = new Set([
  'txt', 'csv', 'md', 'html', 'htm', 'rtf', 'xml', 'json',
]);

const SKIP_SNIFF = new Set(['svg', 'heic', 'heif', 'avif', 'ico', 'eps', 'psd', 'tga', 'tar']);

function matchesSignature(view: Uint8Array, sig: { offset: number; bytes: number[] }): boolean {
  if (view.length < sig.offset + sig.bytes.length) return false;
  return sig.bytes.every((b, i) => view[sig.offset + i] === b);
}

/**
 * Returns true if file header matches the claimed extension (when we have a signature).
 * Text-like and some exotic formats are not strictly checked.
 */
export async function fileMatchesClaimedExtension(
  file: File,
  extension: string,
): Promise<boolean> {
  const ext = extension.toLowerCase();
  if (TEXT_EXTENSIONS.has(ext) || SKIP_SNIFF.has(ext)) return true;

  const sigs = SIGNATURES[ext];
  if (!sigs?.length) return true;

  const head = new Uint8Array(await file.slice(0, 32).arrayBuffer());
  return sigs.some((sig) => matchesSignature(head, sig));
}

export function mismatchExtensionMessage(extension: string): string {
  return `This file does not look like a valid .${extension} file. Check the filename and try again.`;
}
