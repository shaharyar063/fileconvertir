import { ConverterPlugin, ConversionResult, ConversionOption } from '@/lib/converter-types';
import { getTargetsForSource } from '@/lib/conversion-map';
import opentype from 'opentype.js';

const FONT_SOURCES = ['ttf', 'otf', 'woff', 'woff2', 'eot'];

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
  const sfntSize = fontBuffer.byteLength;

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

  const woffBuf = new ArrayBuffer(totalSize);
  const woffView = new DataView(woffBuf);
  const woffU8 = new Uint8Array(woffBuf);

  // WOFF Header
  woffView.setUint32(0, 0x774F4646); // 'wOFF'
  woffView.setUint32(4, sfntVersion); // flavor
  woffView.setUint32(8, totalSize); // length
  woffView.setUint16(12, numTables);
  woffView.setUint16(14, 0); // reserved
  woffView.setUint32(16, sfntSize); // totalSfntSize
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

    // Parse font with opentype.js
    const font = opentype.parse(arrayBuffer);
    onProgress?.(60);

    const baseName = file.name.replace(/\.[^/.]+$/, '');

    if (targetFormat === 'woff') {
      // Get TTF/OTF buffer first, then wrap as WOFF
      const sfntBuffer = font.toArrayBuffer();
      onProgress?.(75);
      const woffBuffer = await buildWoff(sfntBuffer);
      onProgress?.(100);
      return {
        blob: new Blob([woffBuffer], { type: 'font/woff' }),
        filename: `${baseName}.woff`,
        mimeType: 'font/woff',
      };
    }

    // Archive wrapping
    if (['zip', 'tar', 'gz'].includes(targetFormat)) {
      const JSZip = (await import('jszip')).default;
      const zip = new JSZip();
      zip.file(file.name, await file.arrayBuffer());
      const blob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE' });
      onProgress?.(100);
      return { blob, filename: `${baseName}.${targetFormat}`, mimeType: 'application/octet-stream' };
    }

    // TTF and OTF: opentype.js outputs OpenType (OTF/TTF) format
    const outputBuffer = font.toArrayBuffer();
    onProgress?.(100);

    return {
      blob: new Blob([outputBuffer], { type: getMimeType(targetFormat) }),
      filename: `${baseName}.${targetFormat}`,
      mimeType: getMimeType(targetFormat),
    };
  },
};
