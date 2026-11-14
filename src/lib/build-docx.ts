import JSZip from 'jszip';

// Characters that are illegal in XML 1.0 make Word report the file as corrupt.
// eslint-disable-next-line no-control-regex
const INVALID_XML_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\uFFFE\uFFFF]/g;

function escapeXml(text: string): string {
  return text
    .replace(INVALID_XML_CHARS, '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/** Build a minimal DOCX (OOXML ZIP) as raw bytes. */
export async function buildDocxBytes(plainText: string): Promise<Uint8Array> {
  const paragraphs = plainText.split(/\r?\n\r?\n/).map((p) => {
    // Single line breaks inside a paragraph become real Word line breaks.
    const runs = p
      .split(/\r?\n/)
      .map((line) => `<w:t xml:space="preserve">${escapeXml(line)}</w:t>`)
      .join('<w:br/>');
    return `<w:p><w:r>${runs}</w:r></w:p>`;
  });

  if (paragraphs.length === 0) {
    paragraphs.push('<w:p><w:r><w:t xml:space="preserve"></w:t></w:r></w:p>');
  }

  const zip = new JSZip();

  zip.file(
    '[Content_Types].xml',
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>`,
  );

  zip.file(
    '_rels/.rels',
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`,
  );

  zip.file(
    'word/_rels/document.xml.rels',
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
</Relationships>`,
  );

  zip.file(
    'word/document.xml',
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>${paragraphs.join('')}</w:body>
</w:document>`,
  );

  return zip.generateAsync({
    type: 'uint8array',
    compression: 'DEFLATE',
  });
}

/** Build a minimal DOCX (OOXML ZIP) from plain text. */
export async function textToDocx(plainText: string): Promise<Blob> {
  const buffer = await buildDocxBytes(plainText);
  return new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  });
}
