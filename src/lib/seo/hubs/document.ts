import type { FormatSEO } from '../types';

/** Hand-written hub pages for document formats. */

export const DOCUMENT_SOURCE_HUBS: Record<string, FormatSEO> = {
  pdf: {
    title: 'PDF Converter — Extract Text From PDF',
    metaDescription:
      'Extract the text from a PDF as a plain TXT file in your browser. Free and private, nothing is uploaded. Scanned PDFs without a text layer are not supported.',
    heading: 'PDF File Converter',
    description:
      'Pull the text out of a PDF and save it as a TXT file, all inside your browser.',
    details:
      'PDF (Portable Document Format) was created by Adobe in 1993 and became an ISO standard in 2008. It describes exactly where every character, line and image sits on a page, which is why a PDF looks the same on every device. That fixed layout is also what makes PDFs awkward to edit or to copy text from.',
    longDescription:
      'This converter reads the text layer of a PDF and writes it to a plain text file, page after page. It works well on PDFs that were exported from Word, Google Docs or a website. It does not do OCR, so a PDF that is really a scan or a photograph of a page will produce a message saying no extractable text was found. Only text is extracted: images, tables and columns are not reproduced, and reading order follows how the PDF stores the text, which in multi-column layouts can interleave lines.',
    useCases: [
      'Copy the contents of a report into an email or an editor',
      'Feed the text of a PDF into search, notes or an AI tool',
      'Check what text a PDF really contains before sharing it',
    ],
    faqs: [
      {
        q: 'Why did I get "no extractable text found"?',
        a: 'The PDF is probably a scan, which is just a picture of text. There is no text layer to read, and this converter does not perform OCR. Run it through an OCR tool first.',
      },
      {
        q: 'Are tables, images and formatting kept?',
        a: 'No. Only the text is extracted. Images are dropped, tables become runs of text, and styling such as bold or font size is not kept.',
      },
      {
        q: 'Is my PDF uploaded?',
        a: 'No. The PDF is read by pdf.js inside your browser, so the file never leaves your device.',
      },
      {
        q: 'Can I convert a PDF to Word?',
        a: 'Not here. Getting editable layout out of a PDF needs far more than text extraction, and this site only extracts plain text.',
      },
    ],
  },

  docx: {
    title: 'DOCX Converter — Convert Word to PDF or TXT',
    metaDescription:
      'Convert Word DOCX files to PDF or plain text in your browser. Text only: images, tables and styling are not carried over. Free and no upload.',
    heading: 'DOCX File Converter',
    description:
      'Turn the text of a Word document into a PDF or a TXT file without uploading it.',
    details:
      'DOCX is the Word format introduced with Office 2007. It is a ZIP archive of XML files that hold the text, styles, images and settings, and it became an ECMA and ISO standard. Because it describes flowing, editable content rather than fixed pages, the same document can paginate differently in Word, LibreOffice and Google Docs.',
    longDescription:
      'Be clear about what this converter does: it extracts the text from the document and lays it out again. For TXT that is exactly what you want. For PDF you get the words on clean pages in a standard font, but not the original fonts, headings styles, tables, images or page layout. If you need a PDF that looks exactly like the document, export it from Word or LibreOffice with "Save as PDF". This page suits quick text hand-offs, and drafts where layout does not matter.',
    useCases: [
      'Get the raw text out of a Word file for pasting elsewhere',
      'Make a plain, readable PDF of a text-only document such as a letter or a draft',
      'Strip formatting from a document before it goes into another system',
    ],
    faqs: [
      {
        q: 'Will the PDF look like my Word document?',
        a: 'No. The PDF contains the document\'s text in a standard font. Fonts, tables, images, headers, footers and page layout are not reproduced.',
      },
      {
        q: 'What about the older .doc format?',
        a: 'Only .docx is supported. Open a .doc file in Word and save it as .docx first.',
      },
      {
        q: 'Is the document uploaded anywhere?',
        a: 'No. It is read in your browser and nothing is sent to a server.',
      },
    ],
  },

  txt: {
    title: 'TXT Converter — Convert Text Files to PDF',
    metaDescription:
      'Convert plain TXT files to PDF in your browser. Free and private with no upload. Uses a standard Latin font, so some scripts may not display.',
    heading: 'TXT File Converter',
    description:
      'Turn a plain text file into a PDF, directly in your browser.',
    details:
      'A TXT file holds characters and nothing else: no fonts, sizes, colours or images. That makes it the most portable format there is, readable by any program on any system, and the usual way to store notes, logs, code snippets and exported data.',
    longDescription:
      'Converting a TXT file to PDF is a way to hand someone a fixed, printable copy that opens in any PDF viewer. Text is set in a standard font and wrapped to the page width; line breaks in the file are preserved. The PDF font covers Latin characters, so text in other scripts such as Arabic, Chinese or Cyrillic may not display correctly in the PDF. Keep that in mind before converting non-Latin text.',
    useCases: [
      'Turn notes or a log file into a PDF you can attach or print',
      'Share a plain-text document in a format that looks the same everywhere',
      'Archive a text file as a PDF',
    ],
    faqs: [
      {
        q: 'Can I change the font or page size?',
        a: 'Not at the moment. The PDF uses a standard font on a standard page, with margins and line spacing set for readable output.',
      },
      {
        q: 'Why do some characters look wrong in the PDF?',
        a: 'The built-in PDF font only covers Latin characters. Other scripts, and some symbols, may be missing or garbled.',
      },
      {
        q: 'Can I convert TXT to Word?',
        a: 'Yes, the tool can also produce a basic DOCX where each paragraph becomes a Word paragraph. It is plain text with no styling.',
      },
    ],
  },

  html: {
    title: 'HTML Converter — Convert HTML to PDF',
    metaDescription:
      'Convert an HTML file to a text-only PDF in your browser. Free, private and no upload. Styling, images and scripts are not rendered.',
    heading: 'HTML File Converter',
    description:
      'Convert an HTML file to a PDF containing its readable text.',
    details:
      'HTML is the markup language of the web. A file consists of tags that describe headings, paragraphs, links, images and structure, with separate CSS describing how it looks. Opening the same HTML in different browsers can produce slightly different layouts.',
    longDescription:
      'This converter reads the HTML, discards tags, scripts and styles, and writes the remaining readable text into a PDF. It does not render the page, so CSS, images, web fonts and layout are not reproduced; what you get is the words in order. It is a fit for saved articles or exported content where only the text matters. To capture how a page actually looks, use your browser\'s Print to PDF instead.',
    useCases: [
      'Make a plain-text PDF of a saved article or email',
      'Extract the readable content from an HTML export',
      'Archive the text of a web page without scripts or styling',
    ],
    faqs: [
      {
        q: 'Will the PDF look like the web page?',
        a: 'No. Layout, colours, images and fonts are not rendered. Use your browser\'s Print to PDF for a visual copy.',
      },
      {
        q: 'Are scripts run when I convert?',
        a: 'No. The file is parsed as text, and script and style content is removed. Nothing in the HTML is executed.',
      },
      {
        q: 'Can I convert a live URL?',
        a: 'No. Save the page as an HTML file first, then drop it into the converter.',
      },
    ],
  },

  md: {
    title: 'Markdown Converter — Convert MD to PDF',
    metaDescription:
      'Convert Markdown files to PDF in your browser. The markup is stripped and the text is laid out plainly. Free, private and no upload required.',
    heading: 'Markdown File Converter',
    description:
      'Turn a Markdown file into a PDF of its text, right in your browser.',
    details:
      'Markdown is a plain-text writing format created by John Gruber in 2004. Symbols such as # for headings, asterisks for emphasis and dashes for lists let you write structured text in any editor, and tools turn it into HTML. It is the standard for README files, documentation and notes.',
    longDescription:
      'The Markdown converter removes the markup (heading hashes, emphasis marks, link syntax, code fences) and sets the remaining text in a PDF. Headings are not styled larger, so the result is a clean, readable copy rather than a rendered document. If you need Markdown rendered with headings, code blocks and styling, convert it to HTML elsewhere and print that to PDF from your browser.',
    useCases: [
      'Share the text of a README or notes with someone who has no Markdown tools',
      'Get a printable copy of a plain Markdown document',
      'Quickly check what a document says without the syntax around it',
    ],
    faqs: [
      {
        q: 'Are headings and bold text kept in the PDF?',
        a: 'No. The markup is stripped and the text is set in a single standard style. For a styled result, render the Markdown to HTML first and print that to PDF.',
      },
      {
        q: 'Can I convert Markdown to HTML here?',
        a: 'Yes, the tool can output HTML from Markdown, with headings, emphasis, links, lists and code converted to tags. Images and links are limited to http and https addresses.',
      },
      {
        q: 'What happens to code blocks?',
        a: 'In a PDF, code blocks are removed along with the other markup. If you need the code, convert to HTML instead.',
      },
    ],
  },
};

export const DOCUMENT_TARGET_HUBS: Record<string, FormatSEO> = {
  pdf: {
    title: 'Convert to PDF — JPG, PNG, DOCX, TXT, HTML, MD',
    metaDescription:
      'Make a PDF from JPG, PNG, DOCX, TXT, HTML or Markdown in your browser. Free, private and no upload. Documents are converted as text only.',
    heading: 'Convert to PDF',
    description:
      'Create a PDF from an image or a text-based document. Each converter below runs privately in your browser.',
    details:
      'PDF is the universal format for sharing fixed-layout documents. A PDF looks the same on any device and is accepted by almost every portal, printer and email system, which is why forms and offices ask for it by name.',
    longDescription:
      'What you get depends on the source. Images (JPG and PNG) become a PDF page sized to the picture, one PDF per image, with the picture embedded at high quality. Text-based sources (TXT, HTML, Markdown and Word documents) are converted as plain text only, set in a standard font: layout, styling, tables and images from the original are not carried over. For a PDF that mirrors a designed document, export it from the program that created it.',
    useCases: [
      'Turn a photo of a form or receipt into a PDF for an online submission',
      'Create a simple, printable copy of a text file or Markdown notes',
      'Produce a text-only PDF from a Word document when the layout does not matter',
    ],
    faqs: [
      {
        q: 'Can I merge several images into one PDF?',
        a: 'Not yet. Each image becomes its own PDF, and several files are downloaded together as a ZIP. Use a PDF merge tool afterwards if you need a single file.',
      },
      {
        q: 'Will a Word document keep its formatting?',
        a: 'No. DOCX, HTML, Markdown and TXT files are converted as plain text in a standard font. Export from the original program when the layout matters.',
      },
      {
        q: 'How big is the PDF page for an image?',
        a: 'The page matches the image\'s pixel dimensions, so the PDF shows the picture edge to edge with no margins.',
      },
      {
        q: 'Is anything uploaded?',
        a: 'No. Files are converted in your browser and never leave your device.',
      },
    ],
  },

  txt: {
    title: 'Convert to TXT — Extract Text From PDF or DOCX',
    metaDescription:
      'Extract plain text from PDF or Word DOCX files in your browser. Free and private, with no upload. Scanned PDFs without a text layer are not supported.',
    heading: 'Convert to TXT',
    description:
      'Get the plain text out of a PDF or a Word document and save it as a TXT file.',
    details:
      'TXT is plain text with no formatting, the lowest common denominator that any program on any system can open. It is the right format for pulling words out of a document, for notes, and for feeding content into other tools.',
    longDescription:
      'PDF text comes from the file\'s text layer, so scanned PDFs without one are not supported because there is no OCR. For Word documents the raw text of the body is extracted, paragraph by paragraph. In both cases images, tables, columns and styling are dropped, and the result is just the words in reading order.',
    useCases: [
      'Copy the contents of a report into another document or tool',
      'Remove all formatting from a Word file',
      'Search or analyse the text of a PDF',
    ],
    faqs: [
      {
        q: 'Does this work on scanned PDFs?',
        a: 'No. A scanned PDF is only a picture and has no text to extract. This converter does not run OCR.',
      },
      {
        q: 'Are tables preserved?',
        a: 'No. The text is extracted in reading order and the table structure is not kept.',
      },
      {
        q: 'Does the text file use UTF-8?',
        a: 'Yes. The output is written as UTF-8, so accented letters and most scripts are kept correctly.',
      },
    ],
  },
};
