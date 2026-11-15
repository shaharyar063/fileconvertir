import { FONT_SOURCES } from '@/lib/source-formats';
import { ConverterPlugin, ConversionResult, ConversionOption } from '@/lib/converter-types';
import { getTargetsForSource } from '@/lib/conversion-map';
import { ArchiveFormat, buildSingleFileArchive } from '@/lib/build-archive';
import opentype from 'opentype.js';


function getMimeType(format: string): string {
  const map: Record<string, string> = {
    ttf: 'font/ttf',
    otf: 'font/otf',
    woff: 'font/woff',
    woff2: 'font/woff2',
  };
  return map[format] || 'application/octet-stream';
}

/**
 * Build a WOFF file from a raw TTF/OTF ArrayBuffer.
 * WOFF is essentially: WOFF header + compressed font tables.
 * We use CompressionStream (zlib deflate) for table compression.
 */
async function buildWoff(fontBuffer: ArrayBuffer): Promise<ArrayBuffer> {
  const sfntView = new DataView(fontBuffer);

  // Read SFNT header
  const sfntVersion = sfntView.getUint32(0);
  const numTables = sfntView.getUint16(4);

  // Parse table directory
  interface TableEntry {
    tag: string;
    checksum: number;
    offset: number;
    length: number;
  }

  const tables: TableEntry[] = [];
  for (let i = 0; i < numTables; i++) {
    const dirOffset = 12 + i * 16;
    const tag = String.fromCharCode(
      sfntView.getUint8(dirOffset),
      sfntView.getUint8(dirOffset + 1),
      sfntView.getUint8(dirOffset + 2),
      sfntView.getUint8(dirOffset + 3)
    );
    tables.push({
      tag,
      checksum: sfntView.getUint32(dirOffset + 4),
      offset: sfntView.getUint32(dirOffset + 8),
      length: sfntView.getUint32(dirOffset + 12),
    });
  }

  // Compress each table
  interface WoffTableEntry {
    tag: string;
    origLength: number;
    compData: Uint8Array;
    checksum: number;
  }

  const woffTables: WoffTableEntry[] = [];

  for (const table of tables) {
    const tableData = new Uint8Array(fontBuffer, table.offset, table.length);

    let compData: Uint8Array;
    try {
      // Try CompressionStream API
      const stream = new Blob([tableData]).stream().pipeThrough(new CompressionStream('deflate'));
      const reader = stream.getReader();
      const chunks: Uint8Array[] = [];
      let done = false;
      while (!done) {
        const result = await reader.read();
        if (result.value) chunks.push(result.value);
        done = result.done;
      }
      const totalLen = chunks.reduce((s, c) => s + c.length, 0);
      compData = new Uint8Array(totalLen);
      let offset = 0;
      for (const chunk of chunks) {
        compData.set(chunk, offset);
        offset += chunk.length;
      }
      // If compressed is bigger, store uncompressed
      if (compData.length >= tableData.length) {
        compData = tableData;
      }
    } catch {
      // Fallback: store uncompressed
      compData = tableData;
    }

    woffTables.push({
      tag: table.tag,
      origLength: table.length,
      compData,
      checksum: table.checksum,
    });
  }

  // Calculate WOFF file size
  const woffHeaderSize = 44;
  const woffDirSize = numTables * 20;
  let dataOffset = woffHeaderSize + woffDirSize;
  // Align to 4 bytes
  const tableOffsets: number[] = [];
  for (const t of woffTables) {
    tableOffsets.push(dataOffset);
    dataOffset += t.compData.length;
    // Pad to 4-byte boundary
    dataOffset = (dataOffset + 3) & ~3;
  }
  const totalSize = dataOffset;
  const totalSfntSize =
    12 + 16 * numTables + woffTables.reduce((sum, t) => sum + ((t.origLength + 3) & ~3), 0);

  const woffBuf = new ArrayBuffer(totalSize);
  const woffView = new DataView(woffBuf);
  const woffU8 = new Uint8Array(woffBuf);

  // WOFF Header
  woffView.setUint32(0, 0x774F4646); // 'wOFF'
  woffView.setUint32(4, sfntVersion); // flavor
  woffView.setUint32(8, totalSize); // length
  woffView.setUint16(12, numTables);
  woffView.setUint16(14, 0); // reserved
  woffView.setUint32(16, totalSfntSize); // totalSfntSize (spec: header + dir + padded tables)
  woffView.setUint16(20, 1); // majorVersion
  woffView.setUint16(22, 0); // minorVersion
  woffView.setUint32(24, 0); // metaOffset
  woffView.setUint32(28, 0); // metaLength
  woffView.setUint32(32, 0); // metaOrigLength
  woffView.setUint32(36, 0); // privOffset
  woffView.setUint32(40, 0); // privLength

  // Table directory
  for (let i = 0; i < numTables; i++) {
    const dirOff = woffHeaderSize + i * 20;
    const t = woffTables[i];
    // Tag
    for (let j = 0; j < 4; j++) {
      woffView.setUint8(dirOff + j, t.tag.charCodeAt(j));
    }
    woffView.setUint32(dirOff + 4, tableOffsets[i]); // offset
    woffView.setUint32(dirOff + 8, t.compData.length); // compLength
    woffView.setUint32(dirOff + 12, t.origLength); // origLength
    woffView.setUint32(dirOff + 16, t.checksum); // origChecksum
  }

  // Table data
  for (let i = 0; i < numTables; i++) {
    woffU8.set(woffTables[i].compData, tableOffsets[i]);
  }

  return woffBuf;
}


const SFNT_TRUETYPE = 0x00010000;
const SFNT_TRUE = 0x74727565; // 'true'
const SFNT_OTTO = 0x4f54544f; // 'OTTO' (CFF outlines)
const SFNT_TTCF = 0x74746366; // font collection
const MAGIC_WOFF = 0x774f4646;

async function inflate(data: Uint8Array): Promise<Uint8Array> {
  const stream = new Blob([data as BlobPart]).stream().pipeThrough(new DecompressionStream('deflate'));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

/**
 * Unwrap a WOFF 1.0 file into the original SFNT bytes (lossless: tables are
 * only decompressed, never re-encoded, so kerning/hinting/features survive).
 */
async function unwrapWoff(buffer: ArrayBuffer): Promise<ArrayBuffer> {
  const view = new DataView(buffer);
  if (view.byteLength < 44 || view.getUint32(0) !== MAGIC_WOFF) {
    throw new Error('This file is not a valid WOFF font.');
  }
  const flavor = view.getUint32(4);
  const numTables = view.getUint16(12);

  const tables: { tag: Uint8Array; checksum: number; data: Uint8Array }[] = [];
  for (let i = 0; i < numTables; i++) {
    const dir = 44 + i * 20;
    const offset = view.getUint32(dir + 4);
    const compLength = view.getUint32(dir + 8);
    const origLength = view.getUint32(dir + 12);
    const raw = new Uint8Array(buffer, offset, compLength);
    const data = compLength < origLength ? await inflate(raw) : raw;
    tables.push({
      tag: new Uint8Array(buffer, dir, 4),
      checksum: view.getUint32(dir + 16),
      data,
    });
  }

  let offset = 12 + 16 * numTables;
  const offsets = tables.map((t) => {
    const o = offset;
    offset += (t.data.length + 3) & ~3;
    return o;
  });

  const out = new ArrayBuffer(offset);
  const ov = new DataView(out);
  const ou = new Uint8Array(out);
  let entrySelector = 0;
  while (1 << (entrySelector + 1) <= numTables) entrySelector++;
  const searchRange = (1 << entrySelector) * 16;
  ov.setUint32(0, flavor);
  ov.setUint16(4, numTables);
  ov.setUint16(6, searchRange);
  ov.setUint16(8, entrySelector);
  ov.setUint16(10, numTables * 16 - searchRange);
  tables.forEach((t, i) => {
    const dir = 12 + i * 16;
    ou.set(t.tag, dir);
    ov.setUint32(dir + 4, t.checksum);
    ov.setUint32(dir + 8, offsets[i]);
    ov.setUint32(dir + 12, t.data.length);
    ou.set(t.data, offsets[i]);
  });
  return out;
}

function sfntFlavor(buffer: ArrayBuffer): number {
  return buffer.byteLength >= 4 ? new DataView(buffer).getUint32(0) : 0;
}

export const fontConverter: ConverterPlugin = {
  id: 'font-converter',
  name: 'Font Converter',
  sourceFormats: FONT_SOURCES,

  getTargetFormats(sourceFormat: string): ConversionOption[] {
    return getTargetsForSource(sourceFormat).map(t => ({
      targetFormat: t,
      label: t.toUpperCase(),
      description: `Convert to ${t.toUpperCase()}`,
    }));
  },

  async convert(file, targetFormat, onProgress): Promise<ConversionResult> {
    onProgress?.(10);

    const arrayBuffer = await file.arrayBuffer();
    onProgress?.(30);

    const baseName = file.name.replace(/\.[^/.]+$/, '');
    const sourceExt = file.name.split('.').pop()?.toLowerCase() ?? '';

    // Archive targets package the original file untouched.
    if (!['zip', 'tar', 'gz'].includes(targetFormat)) {
      // Work on the real SFNT bytes. WOFF is only a compression wrapper, so
      // wrapping/unwrapping is lossless — unlike re-serialising through
      // opentype.js, which drops kerning, ligatures, hinting and other tables.
      const sfnt =
        sourceExt === 'woff' || sfntFlavor(arrayBuffer) === MAGIC_WOFF
          ? await unwrapWoff(arrayBuffer)
          : arrayBuffer;
      const flavor = sfntFlavor(sfnt);
      if (flavor === SFNT_TTCF) {
        throw new Error('Font collections (.ttc) are not supported. Extract a single font first.');
      }
      if (![SFNT_TRUETYPE, SFNT_TRUE, SFNT_OTTO].includes(flavor)) {
        throw new Error('This file does not look like a valid font.');
      }
      onProgress?.(60);

      if (targetFormat === 'woff') {
        const woffBuffer = await buildWoff(sfnt);
        onProgress?.(100);
        return {
          blob: new Blob([woffBuffer], { type: 'font/woff' }),
          filename: `${baseName}.woff`,
          mimeType: 'font/woff',
        };
      }

      // Same outline type as requested (TrueType→ttf, CFF→otf): hand back the
      // original bytes. Only a real TTF<->OTF outline change needs opentype.js.
      const isCff = flavor === SFNT_OTTO;
      if ((targetFormat === 'otf') === isCff) {
        onProgress?.(100);
        return {
          blob: new Blob([sfnt], { type: getMimeType(targetFormat) }),
          filename: `${baseName}.${targetFormat}`,
          mimeType: getMimeType(targetFormat),
        };
      }

      const font = opentype.parse(sfnt);
      const outputBuffer = font.toArrayBuffer();
      onProgress?.(100);
      return {
        blob: new Blob([outputBuffer], { type: getMimeType(targetFormat) }),
        filename: `${baseName}.${targetFormat}`,
        mimeType: getMimeType(targetFormat),
      };
    }

    if (['zip', 'tar', 'gz'].includes(targetFormat)) {
      const data = new Uint8Array(await file.arrayBuffer());
      const result = await buildSingleFileArchive(
        file.name,
        data,
        targetFormat as ArchiveFormat,
        baseName,
      );
      onProgress?.(100);
      return result;
    }

    throw new Error(`Font to ${targetFormat.toUpperCase()} is not supported.`);
  },
};
