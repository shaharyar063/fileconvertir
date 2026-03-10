import { ConverterPlugin, ConversionResult, ConversionOption } from '@/lib/converter-types';
import { getTargetsForSource } from '@/lib/conversion-map';
import JSZip from 'jszip';

const ARCHIVE_SOURCES = ['zip', 'tar', 'gz'];

/**
 * Parse a TAR archive and return its files.
 */
function parseTar(buffer: ArrayBuffer): { name: string; data: Uint8Array }[] {
  const view = new Uint8Array(buffer);
  const files: { name: string; data: Uint8Array }[] = [];
  let offset = 0;

  while (offset < view.length - 512) {
    // Read header
    const header = view.slice(offset, offset + 512);

    // Check for empty block (end of archive)
    if (header.every(b => b === 0)) break;

    // File name (bytes 0-99)
    let nameEnd = 0;
    while (nameEnd < 100 && header[nameEnd] !== 0) nameEnd++;
    const name = new TextDecoder().decode(header.slice(0, nameEnd));

    // File size (bytes 124-135, octal)
    let sizeStr = '';
    for (let i = 124; i < 136; i++) {
      if (header[i] === 0 || header[i] === 0x20) break;
      sizeStr += String.fromCharCode(header[i]);
    }
    const size = parseInt(sizeStr, 8) || 0;

    // Type flag (byte 156)
    const typeFlag = header[156];

    offset += 512; // Skip header

    if (size > 0 && (typeFlag === 0 || typeFlag === 48)) { // Regular file
      files.push({
        name,
        data: view.slice(offset, offset + size),
      });
    }

    // Advance past data blocks (512-byte aligned)
    offset += Math.ceil(size / 512) * 512;
  }

  return files;
}

/**
 * Build a TAR archive from files.
 */
function buildTar(files: { name: string; data: Uint8Array }[]): ArrayBuffer {
  const blocks: Uint8Array[] = [];

  for (const file of files) {
    // Header block (512 bytes)
    const header = new Uint8Array(512);

    // File name
    const nameBytes = new TextEncoder().encode(file.name.slice(0, 99));
    header.set(nameBytes, 0);

    // File mode: 0644
    const mode = new TextEncoder().encode('0000644\0');
    header.set(mode, 100);

    // UID/GID: 0
    const zero = new TextEncoder().encode('0000000\0');
    header.set(zero, 108); // uid
    header.set(zero, 116); // gid

    // File size (octal, 11 chars + null)
    const sizeOctal = file.data.length.toString(8).padStart(11, '0') + '\0';
    header.set(new TextEncoder().encode(sizeOctal), 124);

    // Modification time
    const mtime = Math.floor(Date.now() / 1000).toString(8).padStart(11, '0') + '\0';
    header.set(new TextEncoder().encode(mtime), 136);

    // Type flag: '0' (regular file)
    header[156] = 48; // '0'

    // USTAR indicator
    header.set(new TextEncoder().encode('ustar\0'), 257);
    header.set(new TextEncoder().encode('00'), 263);

    // Compute checksum
    // First fill checksum field with spaces
    for (let i = 148; i < 156; i++) header[i] = 0x20;
    let checksum = 0;
    for (let i = 0; i < 512; i++) checksum += header[i];
    const checksumStr = checksum.toString(8).padStart(6, '0') + '\0 ';
    header.set(new TextEncoder().encode(checksumStr), 148);

    blocks.push(header);

    // Data blocks
    const dataBlocks = Math.ceil(file.data.length / 512);
    const paddedData = new Uint8Array(dataBlocks * 512);
    paddedData.set(file.data, 0);
    blocks.push(paddedData);
  }

  // Two empty end-of-archive blocks
  blocks.push(new Uint8Array(1024));

  const totalSize = blocks.reduce((s, b) => s + b.length, 0);
  const result = new Uint8Array(totalSize);
  let offset = 0;
  for (const block of blocks) {
    result.set(block, offset);
    offset += block.length;
  }

  return result.buffer;
}

/**
 * Decompress gzip data using DecompressionStream API.
 */
async function decompressGzip(data: ArrayBuffer): Promise<ArrayBuffer> {
  try {
    const stream = new Blob([data]).stream().pipeThrough(new DecompressionStream('gzip'));
    const reader = stream.getReader();
    const chunks: Uint8Array[] = [];
    let done = false;
    while (!done) {
      const result = await reader.read();
      if (result.value) chunks.push(result.value);
      done = result.done;
    }
    const totalLen = chunks.reduce((s, c) => s + c.length, 0);
    const out = new Uint8Array(totalLen);
    let offset = 0;
    for (const chunk of chunks) {
      out.set(chunk, offset);
      offset += chunk.length;
    }
    return out.buffer;
  } catch {
    throw new Error('Failed to decompress gzip data. The file may be corrupted.');
  }
}

export const archiveConverter: ConverterPlugin = {
  id: 'archive-converter',
  name: 'Archive Converter',
  sourceFormats: ARCHIVE_SOURCES,

  getTargetFormats(sourceFormat: string): ConversionOption[] {
    return getTargetsForSource(sourceFormat).map(t => ({
      targetFormat: t,
      label: t.toUpperCase(),
      description: `Convert to ${t.toUpperCase()} archive`,
    }));
  },

  async convert(file, targetFormat, onProgress): Promise<ConversionResult> {
    onProgress?.(10);
    const baseName = file.name.replace(/\.[^/.]+$/, '').replace(/\.tar$/, '');
    const ext = file.name.split('.').pop()?.toLowerCase() || '';
    const buffer = await file.arrayBuffer();
    onProgress?.(30);

    let files: { name: string; data: Uint8Array }[] = [];

    // Extract source archive
    if (ext === 'zip') {
      const zip = await JSZip.loadAsync(buffer);
      const entries = Object.entries(zip.files).filter(([, f]) => !f.dir);
      for (const [name, zipFile] of entries) {
        const data = await zipFile.async('uint8array');
        files.push({ name, data });
      }
    } else if (ext === 'tar') {
      files = parseTar(buffer);
    } else if (ext === 'gz') {
      // .gz could be a .tar.gz or just a single compressed file
      const decompressed = await decompressGzip(buffer);
      // Check if decompressed content is a TAR
      const u8 = new Uint8Array(decompressed);
      if (u8.length > 262 && u8[257] === 0x75 && u8[258] === 0x73 && u8[259] === 0x74) {
        // USTAR magic → it's a tar
        files = parseTar(decompressed);
      } else {
        // Single file
        const innerName = file.name.replace(/\.gz$/i, '') || 'file';
        files = [{ name: innerName, data: u8 }];
      }
    }

    onProgress?.(60);

    if (files.length === 0) {
      throw new Error('Archive appears to be empty or could not be read.');
    }

    // Build target archive
    if (targetFormat === 'zip') {
      const zip = new JSZip();
      for (const f of files) {
        zip.file(f.name, f.data);
      }
      const blob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE' });
      onProgress?.(100);
      return {
        blob,
        filename: `${baseName}.zip`,
        mimeType: 'application/zip',
      };
    }

    if (targetFormat === 'tar') {
      const tarBuffer = buildTar(files);
      onProgress?.(100);
      return {
        blob: new Blob([tarBuffer], { type: 'application/x-tar' }),
        filename: `${baseName}.tar`,
        mimeType: 'application/x-tar',
      };
    }

    if (targetFormat === 'gz') {
      const tarBuffer = buildTar(files);
      const stream = new Blob([tarBuffer]).stream().pipeThrough(new CompressionStream('gzip'));
      const reader = stream.getReader();
      const chunks: Uint8Array[] = [];
      let done = false;
      while (!done) {
        const result = await reader.read();
        if (result.value) chunks.push(result.value);
        done = result.done;
      }
      const totalLen = chunks.reduce((s, c) => s + c.length, 0);
      const gzipped = new Uint8Array(totalLen);
      let offset = 0;
      for (const chunk of chunks) {
        gzipped.set(chunk, offset);
        offset += chunk.length;
      }
      onProgress?.(100);
      return {
        blob: new Blob([gzipped], { type: 'application/gzip' }),
        filename: `${baseName}.tar.gz`,
        mimeType: 'application/gzip',
      };
    }

    throw new Error(`Archive to ${targetFormat.toUpperCase()} is not supported in the browser. Please try again.`);
  },
};
