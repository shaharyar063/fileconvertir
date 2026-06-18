import JSZip from 'jszip';

export type ArchiveFormat = 'zip' | 'tar' | 'gz';

const MIME: Record<ArchiveFormat, string> = {
  zip: 'application/zip',
  tar: 'application/x-tar',
  gz: 'application/gzip',
};

/**
 * Build a TAR archive (USTAR) from a list of files.
 * Used as a shared client-side TAR builder so every converter can
 * emit a real .tar (and .tar.gz) instead of a ZIP renamed to .tar.
 */
export function buildTar(files: { name: string; data: Uint8Array }[]): Uint8Array {
  const encoder = new TextEncoder();
  const blocks: Uint8Array[] = [];

  for (const file of files) {
    const header = new Uint8Array(512);
    header.set(encoder.encode(file.name.slice(0, 99)), 0);
    header.set(encoder.encode('0000644\0'), 100);
    header.set(encoder.encode('0000000\0'), 108);
    header.set(encoder.encode('0000000\0'), 116);
    header.set(
      encoder.encode(file.data.length.toString(8).padStart(11, '0') + '\0'),
      124,
    );
    header.set(
      encoder.encode(Math.floor(Date.now() / 1000).toString(8).padStart(11, '0') + '\0'),
      136,
    );
    header[156] = 48; // '0' = regular file
    header.set(encoder.encode('ustar\0'), 257);
    header.set(encoder.encode('00'), 263);
    for (let i = 148; i < 156; i++) header[i] = 0x20;
    let checksum = 0;
    for (let i = 0; i < 512; i++) checksum += header[i];
    header.set(
      encoder.encode(checksum.toString(8).padStart(6, '0') + '\0 '),
      148,
    );
    blocks.push(header);

    const dataBlocks = Math.ceil(file.data.length / 512);
    const padded = new Uint8Array(dataBlocks * 512);
    padded.set(file.data, 0);
    blocks.push(padded);
  }

  // Two empty end-of-archive blocks
  blocks.push(new Uint8Array(1024));

  const totalSize = blocks.reduce((s, b) => s + b.length, 0);
  const result = new Uint8Array(totalSize);
  let offset = 0;
  for (const b of blocks) {
    result.set(b, offset);
    offset += b.length;
  }
  return result;
}

/** Gzip a Uint8Array using the browser CompressionStream API. */
export async function gzip(data: Uint8Array): Promise<Uint8Array> {
  if (typeof CompressionStream === 'undefined') {
    throw new Error('Your browser does not support GZ compression. Please use a modern browser (Chrome 80+, Firefox 113+, Safari 16.4+).');
  }
  const stream = new Blob([data])
    .stream()
    .pipeThrough(new CompressionStream('gzip'));
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) chunks.push(value);
  }
  const total = chunks.reduce((s, c) => s + c.length, 0);
  const out = new Uint8Array(total);
  let offset = 0;
  for (const c of chunks) {
    out.set(c, offset);
    offset += c.length;
  }
  return out;
}

/**
 * Wrap a single converted file's bytes into the requested archive format.
 * Produces a real .zip / .tar / .tar.gz — not a ZIP renamed to .tar.
 */
export async function buildSingleFileArchive(
  innerName: string,
  innerData: Uint8Array,
  format: ArchiveFormat,
  baseName: string,
): Promise<{ blob: Blob; filename: string; mimeType: string }> {
  if (format === 'zip') {
    const zip = new JSZip();
    // Copy into a fresh Uint8Array so JSZip's same-realm `instanceof Uint8Array`
    // check passes reliably across browser, jsdom and Node test runners.
    const copy = new Uint8Array(innerData.byteLength);
    copy.set(innerData);
    zip.file(innerName, copy);
    // Generate as uint8array then wrap in a Blob — avoids JSZip's internal
    // Blob path (which breaks under jsdom but works in real browsers).
    const bytes = await zip.generateAsync({
      type: 'uint8array',
      compression: 'DEFLATE',
    });
    return {
      blob: new Blob([bytes], { type: MIME.zip }),
      filename: `${baseName}.zip`,
      mimeType: MIME.zip,
    };
  }

  if (format === 'tar') {
    const tar = buildTar([{ name: innerName, data: innerData }]);
    return {
      blob: new Blob([tar], { type: MIME.tar }),
      filename: `${baseName}.tar`,
      mimeType: MIME.tar,
    };
  }

  // gz: wrap as .tar.gz (single file packed in a tar, then gzipped)
  const tar = buildTar([{ name: innerName, data: innerData }]);
  const gz = await gzip(tar);
  return {
    blob: new Blob([gz], { type: MIME.gz }),
    filename: `${baseName}.tar.gz`,
    mimeType: MIME.gz,
  };
}
