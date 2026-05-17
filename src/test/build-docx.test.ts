import { describe, expect, it } from 'vitest';
import { buildDocxBytes, textToDocx } from '@/lib/build-docx';
import JSZip from 'jszip';

describe('build-docx', () => {
  it('produces a valid DOCX zip with document.xml', async () => {
    const bytes = await buildDocxBytes('Hello\n\nWorld');
    const zip = await JSZip.loadAsync(bytes);
    const docXml = await zip.file('word/document.xml')?.async('text');
    expect(docXml).toContain('Hello');
    expect(docXml).toContain('World');
    expect(zip.file('[Content_Types].xml')).toBeTruthy();
  });

  it('wraps bytes in a DOCX blob', async () => {
    const blob = await textToDocx('test');
    expect(blob.type).toContain('wordprocessingml');
    expect(blob.size).toBeGreaterThan(0);
  });

  it('escapes XML in paragraph text', async () => {
    const zip = await JSZip.loadAsync(await buildDocxBytes('Tom & Jerry <test>'));
    const docXml = await zip.file('word/document.xml')?.async('text');
    expect(docXml).toContain('&amp;');
    expect(docXml).toContain('&lt;');
    expect(docXml).not.toContain('Tom & Jerry <');
  });
});
