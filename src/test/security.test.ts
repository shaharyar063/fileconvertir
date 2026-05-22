import { describe, expect, it } from 'vitest';
import { safeArchiveEntryName } from '@/lib/safe-archive-path';
import { sanitizeExportedHtml } from '@/lib/escape-html';

describe('safeArchiveEntryName', () => {
  it('rejects path traversal', () => {
    expect(safeArchiveEntryName('../../../etc/passwd')).toBeNull();
    expect(safeArchiveEntryName('foo/../../bar.txt')).toBeNull();
  });

  it('returns basename for nested paths', () => {
    expect(safeArchiveEntryName('folder/sub/file.txt')).toBe('file.txt');
  });

  it('accepts simple names', () => {
    expect(safeArchiveEntryName('photo.jpg')).toBe('photo.jpg');
  });
});

describe('sanitizeExportedHtml', () => {
  it('removes script tags and javascript: URLs', () => {
    const dirty =
      '<p>ok</p><script>alert(1)</script><a href="javascript:alert(1)">x</a>';
    const clean = sanitizeExportedHtml(dirty);
    expect(clean).not.toContain('<script');
    expect(clean).not.toContain('javascript:');
  });
});
