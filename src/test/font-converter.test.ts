import { describe, it, expect } from 'vitest';
import opentype from 'opentype.js';
import { fontConverter } from '@/converters/font-converter';

// jsdom's File lacks arrayBuffer(); the converter only needs name + arrayBuffer().
function fakeFile(name: string, buf: ArrayBuffer): File {
  return { name, size: buf.byteLength, arrayBuffer: async () => buf } as unknown as File;
}

function makeOtf(): File {
  const notdef = new opentype.Glyph({ name: '.notdef', unicode: 0, advanceWidth: 600, path: new opentype.Path() });
  const a = new opentype.Glyph({ name: 'A', unicode: 65, advanceWidth: 600, path: new opentype.Path() });
  const font = new opentype.Font({
    familyName: 'Test', styleName: 'Regular', unitsPerEm: 1000, ascender: 800, descender: -200,
    glyphs: [notdef, a],
  });
  return fakeFile('test.otf', font.toArrayBuffer());
}

function tables(buf: ArrayBuffer): Record<string, number[]> {
  const v = new DataView(buf);
  const out: Record<string, number[]> = {};
  for (let i = 0; i < v.getUint16(4); i++) {
    const d = 12 + i * 16;
    const tag = String.fromCharCode(v.getUint8(d), v.getUint8(d + 1), v.getUint8(d + 2), v.getUint8(d + 3));
    out[tag] = Array.from(new Uint8Array(buf, v.getUint32(d + 8), v.getUint32(d + 12)));
  }
  return out;
}

const readBlob = (b: Blob) =>
  new Promise<ArrayBuffer>((res) => { const r = new FileReader(); r.onload = () => res(r.result as ArrayBuffer); r.readAsArrayBuffer(b); });

describe('font-converter', () => {
  it('wraps OTF as WOFF and unwraps back to identical tables (lossless)', async () => {
    const src = makeOtf();
    const woff = await fontConverter.convert(src, 'woff');
    const woffBuf = await readBlob(woff.blob);
    expect(new DataView(woffBuf).getUint32(0)).toBe(0x774f4646);
    // totalSfntSize must follow the WOFF spec
    const n = new DataView(woffBuf).getUint16(12);
    expect(new DataView(woffBuf).getUint32(16)).toBeGreaterThanOrEqual(12 + 16 * n);

    const back = await fontConverter.convert(fakeFile('test.woff', woffBuf), 'otf');
    const backBuf = await readBlob(back.blob);
    expect(tables(backBuf)).toEqual(tables(await src.arrayBuffer()));
  });

  it('refuses to relabel outlines: WOFF with CFF outlines cannot become TTF', async () => {
    const woff = await fontConverter.convert(makeOtf(), 'woff');
    const file = fakeFile('x.woff', await readBlob(woff.blob));
    await expect(fontConverter.convert(file, 'ttf')).rejects.toThrow(/choose OTF/i);
  });

  it('rejects files that are not fonts', async () => {
    await expect(fontConverter.convert(fakeFile('x.ttf', new Uint8Array(64).buffer), 'woff')).rejects.toThrow(/valid font/i);
  });
});
