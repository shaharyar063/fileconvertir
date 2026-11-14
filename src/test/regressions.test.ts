import { describe, it, expect } from 'vitest';
import { dedupeFileNames, truncateUtf8, buildTar } from '@/lib/build-archive';
import { fileMatchesClaimedExtension } from '@/lib/file-sniff';

function fakeFile(bytes: number[], name = 'x'): File {
  const buf = new Uint8Array(bytes).buffer;
  return { name, size: bytes.length, slice: () => ({ arrayBuffer: async () => buf }) } as unknown as File;
}

describe('archive name handling', () => {
  it('dedupes identical names so entries are not overwritten', () => {
    const out = dedupeFileNames([{ name: 'index.html' }, { name: 'index.html' }, { name: 'README' }, { name: 'README' }]);
    expect(out.map((f) => f.name)).toEqual(['index.html', 'index (1).html', 'README', 'README (1)']);
  });

  it('truncates names by bytes, never splitting a multibyte character', () => {
    const name = '文'.repeat(60); // 180 bytes
    const bytes = truncateUtf8(name, 99);
    expect(bytes.length).toBeLessThanOrEqual(99);
    expect(new TextDecoder('utf-8', { fatal: true }).decode(bytes)).toBe('文'.repeat(33));
  });

  it('builds a valid TAR header for very long non-ASCII names', () => {
    const tar = buildTar([{ name: '文'.repeat(200), data: new Uint8Array([1, 2, 3]) }]);
    expect(tar.length).toBe(512 + 512 + 1024);
    expect(String.fromCharCode(...tar.slice(257, 262))).toBe('ustar');
  });
});

describe('file sniffing', () => {
  it('accepts MP3 frames with CRC (FF FA) and MPEG-2.5 (FF E3)', async () => {
    expect(await fileMatchesClaimedExtension(fakeFile([0xff, 0xfa, 0x90, 0x00]), 'mp3')).toBe(true);
    expect(await fileMatchesClaimedExtension(fakeFile([0xff, 0xe3, 0x18, 0x00]), 'mp3')).toBe(true);
  });
  it('accepts old QuickTime files that start with a moov atom', async () => {
    expect(await fileMatchesClaimedExtension(fakeFile([0, 0, 0, 8, 0x6d, 0x6f, 0x6f, 0x76]), 'mov')).toBe(true);
  });
  it('still rejects mismatched content', async () => {
    expect(await fileMatchesClaimedExtension(fakeFile([0x00, 0x11, 0x22, 0x33]), 'png')).toBe(false);
  });
});
