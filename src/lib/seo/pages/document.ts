import type { ConversionPage } from './types';

/** Document conversion pages. All of them work on text, not on page layout. */
export const DOCUMENT_PAGES: Record<string, ConversionPage> = {
  'docx-to-pdf': {
    title: 'DOCX to PDF Converter — Text Only, No Upload',
    metaDescription:
      'Convert the text of a Word DOCX file to a simple PDF in your browser. Fonts, images, tables and layout are not kept. Free and private.',
    heading: 'DOCX to PDF Converter',
    description:
      'Turn the text of a Word document into a plain PDF, privately in your browser. Formatting, images and tables are not carried over.',
    steps: [
      { name: 'Add your DOCX file', text: 'Click Select Files or drop up to 20 Word documents onto the converter. Only .docx is supported, not .doc.' },
      { name: 'Convert to PDF', text: 'Press Convert. The text is read from the document and set on A4 pages in a standard font.' },
      { name: 'Download', text: 'Save the PDF, or a ZIP if you converted several documents.' },
    ],
    understanding: {
      paragraphs: [
        'A Word file describes text along with styles, images, tables and page settings, and Word itself decides how those become pages. Reproducing that layout needs a full word-processing engine, which a browser page does not have.',
        'This converter takes a simpler route. It reads the words out of the document, paragraph by paragraph, and sets them in a PDF in 11-point Helvetica on A4 with 15 mm margins. Fonts, bold and italic, heading sizes, images, tables, headers, footers and page breaks are not reproduced. Text inside a table comes out as ordinary lines.',
        'The built-in PDF font covers Latin characters. Text in other scripts may not display correctly.',
      ],
      graphics: [
        {
          kind: 'pages',
          caption: 'Only the words carry over. Styling, pictures and tables do not.',
          alt: 'A Word page with a heading, an image and a table on the left; on the right a PDF page with plain lines of text only.',
          left: { label: 'Word document', look: 'styled' },
          right: { label: 'PDF (text only)', look: 'plain' },
        },
        {
          kind: 'table',
          caption: 'What reaches the PDF.',
          columns: ['In the DOCX', 'In the PDF'],
          rows: [
            { label: 'Paragraph text', a: 'Yes', b: 'Kept' },
            { label: 'Fonts, bold, italic', a: 'Yes', b: 'One standard font' },
            { label: 'Images', a: 'Yes', b: 'Dropped' },
            { label: 'Tables', a: 'Grid', b: 'Text lines, no grid' },
            { label: 'Headers and footers', a: 'Yes', b: 'Not included' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'A text-only letter or draft', text: 'When the document is just paragraphs, a plain PDF is a quick way to share it without it being edited by accident.' },
        { title: 'No word processor to hand', text: 'On a borrowed or locked-down computer you can still get the words into a PDF without installing anything.' },
        { title: 'Private documents', text: 'The file is read on your device, which matters for contracts and personal papers you would not upload to a conversion site.' },
      ],
      keepOriginal:
        'Use Word, Google Docs or LibreOffice (File, then Save as PDF or Download as PDF) whenever the look matters: CVs, reports with tables or images, and anything with a designed layout. Only the program that lays out the document can reproduce it.',
    },
    faqs: [
      { q: 'Will the PDF look like my Word document?', a: 'No. It contains the text in a standard font. Fonts, images, tables, headers, footers and page layout are not reproduced.' },
      { q: 'How do I get a PDF that keeps the exact layout?', a: 'Export it from the program that made it: File, Save as PDF in Word, or File, Download, PDF document in Google Docs.' },
      { q: 'What happens to tables and images?', a: 'Images are left out. The text in each table cell appears as a normal line, without borders or columns.' },
      { q: 'Are .doc files supported?', a: 'No, only .docx. Open the .doc in Word or LibreOffice and save it as .docx first.' },
      { q: 'Is my document sent to a server?', a: 'No. It is opened and converted inside your browser.' },
    ],
  },

  'docx-to-txt': {
    title: 'DOCX to TXT Converter — Extract Word Text',
    metaDescription:
      'Extract the plain text from a Word DOCX file in your browser. Formatting, images and tables are removed. Free, private and nothing uploaded.',
    heading: 'DOCX to TXT Converter',
    description:
      'Pull the plain text out of a Word document and save it as a TXT file. The document never leaves your device.',
    steps: [
      { name: 'Add your DOCX file', text: 'Click Select Files or drop up to 20 .docx documents onto the converter.' },
      { name: 'Convert to TXT', text: 'Press Convert. The text of each document is extracted, one paragraph after another.' },
      { name: 'Download', text: 'Save the .txt file. It is plain UTF-8 text that opens in any editor.' },
    ],
    understanding: {
      paragraphs: [
        'A DOCX file is a ZIP archive of XML. The words are in there, wrapped in markup for styles, fonts and layout. Extraction discards the markup and keeps the words.',
        'Each paragraph in the document becomes a block of text separated by a blank line. Headings and list items come through as ordinary lines, without numbering or bullets. Text in table cells is kept, one cell after another, but the grid is gone. Images, charts and comments are not included.',
        'The result is saved as UTF-8, so accented letters and non-Latin scripts are preserved.',
      ],
      graphics: [
        {
          kind: 'pages',
          caption: 'The document is reduced to its words.',
          alt: 'A formatted Word page with a heading, image and table on the left; plain lines of text with no page on the right.',
          left: { label: 'Word document', look: 'styled' },
          right: { label: 'Plain text file', look: 'textfile' },
        },
        {
          kind: 'table',
          caption: 'How parts of the document appear in the text file.',
          columns: ['In the DOCX', 'In the TXT'],
          rows: [
            { label: 'Paragraphs', a: 'Styled text', b: 'Plain text, blank line between' },
            { label: 'Headings', a: 'Large, bold', b: 'Plain lines' },
            { label: 'Lists', a: 'Bullets or numbers', b: 'Lines without markers' },
            { label: 'Tables', a: 'Rows and columns', b: 'Cell text in sequence' },
            { label: 'Images', a: 'Embedded', b: 'Removed' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Pasting into another system', text: 'Content management systems, forms and code editors behave better with clean text than with Word formatting.' },
        { title: 'Feeding text to a script or an AI tool', text: 'Plain text is the input most tools expect, with no hidden styling to strip.' },
        { title: 'Counting or searching words', text: 'Command-line tools and simple editors work directly on .txt files.' },
        { title: 'Checking what a document really contains', text: 'Extraction shows the text without the layout around it.' },
      ],
      keepOriginal:
        'Keep the DOCX whenever structure matters: tables you need to read as tables, numbered lists, images, or a document you will continue to edit in Word.',
    },
    faqs: [
      { q: 'Are tables kept?', a: 'The text in the cells is kept, but the rows and columns are not. Each cell becomes its own line.' },
      { q: 'What encoding does the text file use?', a: 'UTF-8, which preserves accents and non-Latin scripts.' },
      { q: 'Are comments and tracked changes included?', a: 'Comments are not extracted. If the document has tracked changes, accept or reject them in Word first so the text is what you expect.' },
      { q: 'Does it work with .doc files?', a: 'No. Only .docx is supported. Save older .doc files as .docx first.' },
      { q: 'Do numbered lists keep their numbers?', a: 'No. Word generates list numbers when it displays the document; they are not stored as text, so they do not appear in the output.' },
    ],
  },

  'pdf-to-txt': {
    title: 'PDF to TXT Converter — Extract Text, No Upload',
    metaDescription:
      'Extract the text from a PDF as a TXT file in your browser. Works on PDFs with a text layer, not scans. Free, private and nothing uploaded.',
    heading: 'PDF to TXT Converter',
    description:
      'Extract the text from a PDF and save it as a plain TXT file. The PDF is read in your browser and is never uploaded.',
    steps: [
      { name: 'Add your PDF file', text: 'Click Select Files or drop up to 20 PDFs onto the converter. Each can be up to 100 MB.' },
      { name: 'Convert to TXT', text: 'Press Convert. The text layer of every page is read in order.' },
      { name: 'Download', text: 'Save the .txt file. Pages are separated by a blank line.' },
    ],
    understanding: {
      paragraphs: [
        'A PDF records where each piece of text sits on the page, not paragraphs or reading order. The converter reads that text layer page by page and writes it out, keeping the line breaks it finds.',
        'This works for PDFs exported from Word, Google Docs, a browser or most other software. It does not work for scans. A scanned PDF is a photograph of a page with no text inside it, and reading it would need OCR, which this converter does not do. In that case the output says that no extractable text was found.',
        'Layout is not rebuilt. Multi-column pages may come out with lines interleaved, tables become runs of text, and images are ignored.',
      ],
      graphics: [
        {
          kind: 'pages',
          caption: 'The text layer is copied out; layout, images and tables are left behind.',
          alt: 'A PDF page with a heading, an image and a table on the left; plain lines of text with no page on the right.',
          left: { label: 'PDF page', look: 'styled' },
          right: { label: 'Plain text file', look: 'textfile' },
        },
        {
          kind: 'flow',
          caption: 'What happens to your PDF, all inside the browser.',
          steps: [
            { label: 'PDF opened', detail: 'by pdf.js on your device' },
            { label: 'Text layer read', detail: 'page by page' },
            { label: 'Pages joined', detail: 'blank line between pages' },
            { label: 'TXT saved', detail: 'UTF-8' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Quoting or reusing a report', text: 'Extracting the text is quicker and cleaner than copying page by page from a viewer.' },
        { title: 'Searching across documents', text: 'Text files can be searched and indexed by any tool, without a PDF reader.' },
        { title: 'Giving a document to an AI or analysis tool', text: 'Plain text avoids upload limits and parsing problems with PDFs.' },
        { title: 'Reading on a device with poor PDF support', text: 'A text file reflows to any screen.' },
      ],
      keepOriginal:
        'Keep the PDF when layout carries meaning: tables, forms, figures, or multi-column pages. For scanned documents, run OCR software first; this converter cannot read them.',
    },
    faqs: [
      { q: 'Why does the output say no extractable text was found?', a: 'The PDF is almost certainly a scan or a set of images. It has no text layer, and this converter does not perform OCR.' },
      { q: 'How can I tell whether a PDF is a scan?', a: 'Try to select a word in a PDF viewer. If you can only select the whole page like a picture, it is a scan.' },
      { q: 'Are tables and columns preserved?', a: 'No. Text is written in the order the PDF stores it. Tables lose their grid, and multi-column layouts can interleave.' },
      { q: 'Does it work on password-protected PDFs?', a: 'A PDF that needs a password to open cannot be read. PDFs that open normally are processed.' },
      { q: 'Is the PDF uploaded?', a: 'No. It is parsed by pdf.js inside your browser.' },
    ],
  },

  'txt-to-pdf': {
    title: 'TXT to PDF Converter — Free, No Upload',
    metaDescription:
      'Convert plain text files to PDF in your browser. Monospace font on A4 pages with wrapped lines. Free and private, nothing is uploaded.',
    heading: 'TXT to PDF Converter',
    description:
      'Turn a plain text file into a printable PDF in your browser. Spacing is kept, and nothing is uploaded.',
    steps: [
      { name: 'Add your TXT file', text: 'Click Select Files or drop up to 20 text files onto the converter.' },
      { name: 'Convert to PDF', text: 'Press Convert. The text is set in a monospace font on A4 pages, wrapping long lines.' },
      { name: 'Download', text: 'Save the PDF, or a ZIP of PDFs for a batch.' },
    ],
    understanding: {
      paragraphs: [
        'Plain text has no page size, margins or font, so it looks different in every program and prints unpredictably. Converting to PDF fixes one layout that looks the same everywhere.',
        'The layout here is fixed: A4 pages, 15 mm margins, 10-point Courier. Because every character in a monospace font has the same width, indentation and aligned columns stay lined up. Lines wider than the page wrap onto the next line, and text continues onto new pages as needed.',
        'The font covers Latin characters. Other scripts, and some symbols, may not appear correctly.',
      ],
      graphics: [
        {
          kind: 'pages',
          caption: 'Loose text is set on fixed pages in a monospace font.',
          alt: 'Lines of text with no page boundary on the left; the same text laid out in evenly spaced characters on a page on the right.',
          left: { label: 'Text file', look: 'textfile' },
          right: { label: 'PDF, A4 monospace', look: 'mono' },
        },
        {
          kind: 'table',
          caption: 'The page layout this converter uses. It cannot be changed.',
          columns: ['Setting', 'Value'],
          rows: [
            { label: 'Page', a: 'Size', b: 'A4, portrait' },
            { label: 'Font', a: 'Typeface', b: 'Courier, 10 pt' },
            { label: 'Margins', a: 'All sides', b: '15 mm' },
            { label: 'Long lines', a: 'Handling', b: 'Wrapped' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Attaching a log or export to a ticket', text: 'Some systems only accept PDF attachments, and a PDF cannot be altered by accident.' },
        { title: 'Printing notes or instructions', text: 'Page breaks and margins are predictable, unlike printing from a text editor.' },
        { title: 'Sharing a README with non-technical readers', text: 'A PDF opens on any phone or computer with a double-click.' },
      ],
      keepOriginal:
        'Keep the TXT for anything that will be edited, searched by scripts or read by software. For source code that needs syntax highlighting or line numbers, export a PDF from your code editor instead.',
    },
    faqs: [
      { q: 'Can I change the font, size or margins?', a: 'No. The layout is fixed at Courier 10 pt on A4 with 15 mm margins.' },
      { q: 'What happens to very long lines?', a: 'They wrap onto the next line. Nothing is cut off, though very wide tables lose their alignment where they wrap.' },
      { q: 'Why are some characters missing or wrong?', a: 'The built-in PDF fonts only include Latin characters. Text in other scripts, and some special symbols, may not display.' },
      { q: 'Are page numbers or headers added?', a: 'No. The PDF contains only your text.' },
      { q: 'Does it keep tabs and indentation?', a: 'Indentation made with spaces is kept exactly. Tab characters may be rendered narrower than in your editor.' },
    ],
  },

  'html-to-pdf': {
    title: 'HTML to PDF Converter — Text Only, No Upload',
    metaDescription:
      'Convert an HTML file to a PDF of its readable text in your browser. Styles, images and scripts are not rendered. Free, private, no upload.',
    heading: 'HTML to PDF Converter',
    description:
      'Convert an HTML file to a PDF containing its readable text. The page is not rendered, so styling and images are not included.',
    steps: [
      { name: 'Add your HTML file', text: 'Click Select Files or drop up to 20 saved .html files onto the converter. Web addresses are not accepted.' },
      { name: 'Convert to PDF', text: 'Press Convert. Scripts and styles are removed and the text is set on A4 pages.' },
      { name: 'Download', text: 'Save the PDF, or a ZIP for several files.' },
    ],
    understanding: {
      paragraphs: [
        'A browser turns HTML into a visual page using stylesheets, fonts, images and scripts. This converter does not do that. It parses the file, discards script and style content, and keeps the readable text.',
        'Headings, paragraphs and list items each start on a new line, so the structure of an article survives as line breaks. Everything is set in one standard font: there are no colours, columns, images or links in the result.',
        'Nothing in the file is executed, and nothing is fetched from the internet, so content that a page loads with JavaScript will not appear.',
      ],
      graphics: [
        {
          kind: 'pages',
          caption: 'The words are kept; the design is not.',
          alt: 'A web page in a browser window with a banner, heading and button on the left; a PDF page of plain text lines on the right.',
          left: { label: 'HTML in a browser', look: 'web' },
          right: { label: 'PDF (text only)', look: 'plain' },
        },
        {
          kind: 'table',
          caption: 'What the converter does with each part of an HTML file.',
          columns: ['In the HTML', 'In the PDF'],
          rows: [
            { label: 'Headings and paragraphs', a: 'Styled blocks', b: 'Plain text, one per line' },
            { label: 'CSS', a: 'Layout and colours', b: 'Ignored' },
            { label: 'Images', a: 'Shown', b: 'Left out' },
            { label: 'Scripts', a: 'Run by the browser', b: 'Removed, never run' },
            { label: 'Links', a: 'Clickable', b: 'Link text only' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Archiving the words of a saved article', text: 'You get a compact PDF of the content without ads, menus or tracking scripts.' },
        { title: 'Exported emails or reports in HTML', text: 'Turn an HTML export into a document people can open without a browser.' },
        { title: 'Handling untrusted HTML safely', text: 'Because the file is parsed as text and never run, opening it this way carries no script risk.' },
      ],
      keepOriginal:
        'When you want the page as it looks, open it in your browser and use Print, then Save as PDF. That uses the browser\'s own rendering, so layout, images and fonts are preserved.',
    },
    faqs: [
      { q: 'Will the PDF look like the web page?', a: 'No. Only the text is converted. For a visual copy, use Print, Save as PDF in your browser.' },
      { q: 'Can I enter a URL instead of a file?', a: 'No. Save the page first (File, Save Page As), then convert the saved .html file.' },
      { q: 'Does the converter run the page\'s JavaScript?', a: 'No. Script and style content is removed before the text is read.' },
      { q: 'Why is some content missing?', a: 'Content that the page loads with JavaScript is not in the saved HTML as text, so it cannot be extracted.' },
      { q: 'Are images included?', a: 'No, whether they are linked or embedded.' },
    ],
  },

  'md-to-pdf': {
    title: 'Markdown to PDF Converter — Free, No Upload',
    metaDescription:
      'Convert Markdown files to a plain-text PDF in your browser. Syntax is removed; headings and code are not styled. Free, private, no upload.',
    heading: 'Markdown to PDF Converter',
    description:
      'Convert a Markdown file to a PDF of its text in your browser. The syntax is removed and headings are not styled.',
    steps: [
      { name: 'Add your Markdown file', text: 'Click Select Files or drop up to 20 .md files onto the converter.' },
      { name: 'Convert to PDF', text: 'Press Convert. Markdown symbols are stripped and the text is set on A4 pages.' },
      { name: 'Download', text: 'Save the PDF, or a ZIP if you converted several files.' },
    ],
    understanding: {
      paragraphs: [
        'Markdown marks up plain text with symbols: # for headings, asterisks for emphasis, dashes for lists, backticks for code. Tools usually render those into styled pages. This converter removes the symbols and keeps the words.',
        'In the PDF, headings are the same size as body text, emphasis is not bold or italic, and links show only their text. List items begin with a dash. The contents of fenced code blocks are kept, without the fences, monospace font or highlighting. Tables lose their structure, and images are reduced to their alt text.',
        'The result is a readable, printable copy, not a typeset document.',
      ],
      graphics: [
        {
          kind: 'pages',
          caption: 'Markdown symbols are removed; the text is set in one plain style.',
          alt: 'A page of Markdown source with hash, asterisk and backtick symbols on the left; a PDF page of plain text lines on the right.',
          left: { label: 'Markdown source', look: 'markup' },
          right: { label: 'PDF (plain text)', look: 'plain' },
        },
        {
          kind: 'table',
          caption: 'How common Markdown elements appear in the PDF.',
          columns: ['Markdown', 'In the PDF'],
          rows: [
            { label: 'Heading', a: '# Title', b: 'Title (normal size)' },
            { label: 'Emphasis', a: '**bold**, *italic*', b: 'bold, italic (unstyled)' },
            { label: 'List', a: '- item', b: '- item' },
            { label: 'Link', a: '[text](url)', b: 'text' },
            { label: 'Code block', a: 'Fenced with ```', b: 'Code text, no fences' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Sending notes to someone without Markdown tools', text: 'They get readable text in a PDF instead of a file full of symbols.' },
        { title: 'Printing a README or a set of notes', text: 'The PDF paginates cleanly on A4.' },
        { title: 'A quick copy when appearance does not matter', text: 'No software to install and nothing leaves your device.' },
      ],
      keepOriginal:
        'For a styled PDF with real headings, tables and code formatting, convert the Markdown to HTML, open it in your browser and use Print, Save as PDF, or use a Markdown editor with PDF export.',
    },
    faqs: [
      { q: 'Are headings and bold text styled in the PDF?', a: 'No. The syntax is removed and everything is set in one standard style.' },
      { q: 'How can I get a formatted PDF from Markdown?', a: 'Convert the file to HTML, open that in a browser and print it to PDF, or export from a Markdown editor.' },
      { q: 'What happens to code blocks?', a: 'The code is kept as plain text. The fences are removed, and it is not set in a monospace font.' },
      { q: 'Are tables and images supported?', a: 'Tables come out as lines of text with their pipe characters. Images are replaced by their alt text.' },
      { q: 'Which Markdown flavour is expected?', a: 'Common syntax is handled: headings, emphasis, lists, links, quotes and fenced code. Extensions such as footnotes are left as written.' },
    ],
  },
};
