import { describe, expect, it } from 'vitest';
import { buildSingleFileArchive, buildTar } from '@/lib/build-archive';

// CompressionStream + Blob.stream() are not available in jsdom; gate gz tests.
const hasStreams =
  typeof CompressionStream !== 'undefined' &&
  typeof (Blob.prototype as unknown as { stream?: unknown }).stream === 'function';

describe('build-archive', () => {
  it('wraps a single file as a zip blob with correct metadata', async () => {
    const data = new TextEncoder().encode('hello world');
    const { blob, filename, mimeType } = await buildSingleFileArchive(
      'hello.txt',
      data,
      'zip',
      'hello',
    );

    expect(filename).toBe('hello.zip');
    expect(mimeType).toBe('application/zip');
    expect(blob.type).toBe('application/zip');
    expect(blob.size).toBeGreaterThan(0);
  });

  it('wraps a single file as a tar blob with correct metadata', async () => {
    const data = new TextEncoder().encode('hello world');
    const { blob, filename, mimeType } = await buildSingleFileArchive(
      'hello.txt',
      data,
      'tar',
      'hello',
    );

    expect(filename).toBe('hello.tar');
    expect(mimeType).toBe('application/x-tar');
    expect(blob.type).toBe('application/x-tar');
    // TAR header is exactly one 512-byte block + 512 data + 1024 EOA = 2048
    expect(blob.size).toBeGreaterThanOrEqual(2048);
  });

  it('produces a TAR with the USTAR magic and correct file name', () => {
    const data = new TextEncoder().encode('abc');
    const tar = buildTar([{ name: 'a.txt', data }]);
    const magic = String.fromCharCode(...tar.slice(257, 263));
    expect(magic.startsWith('ustar')).toBe(true);
    const name = String.fromCharCode(...tar.slice(0, 5));
    expect(name).toBe('a.txt');
  });

  it.skipIf(!hasStreams)('builds a real .tar.gz with gzip magic bytes', async () => {
    const data = new TextEncoder().encode('payload');
    const { blob, filename, mimeType } = await buildSingleFileArchive(
      'a.bin',
      data,
      'gz',
      'a',
    );
    expect(filename).toBe('a.tar.gz');
    expect(mimeType).toBe('application/gzip');
    const bytes = new Uint8Array(await new Response(blob).arrayBuffer());
    expect(bytes[0]).toBe(0x1f);
    expect(bytes[1]).toBe(0x8b);
  });
});
