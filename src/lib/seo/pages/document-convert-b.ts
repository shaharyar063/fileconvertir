import type { ConversionPage } from './types';
import { steps } from './helpers';

/** Conversions from RTF, CSV, DOCX and ODT. */
export const DOCUMENT_PAGES_B: Record<string, ConversionPage> = {
  'rtf-to-txt': {
    title: 'RTF to TXT Converter Online — Free, No Upload',
    metaDescription:
      'Convert RTF to TXT online for free. Extracts the text with accents and paragraphs kept, formatting dropped, in your browser with no upload or sign-up.',
    heading: 'RTF to TXT Converter',
    description:
      'Convert RTF to TXT online for free: the text is extracted with accents and paragraphs, and formatting is dropped.',
    steps: steps('rtf', 'txt', 'Press Convert. The RTF codes are read, paragraph and tab marks become line breaks and tabs, and accented characters are decoded.'),
    understanding: {
      paragraphs: [
        'An RTF file is text mixed with control codes for fonts, sizes, bold and so on. The converter reads those codes, throws away the formatting ones, and keeps every piece of visible text, including text that was bold or italic.',
        'Paragraph marks become line breaks, table cells are separated by tabs, and accented or special characters written as escape sequences are decoded to the real characters. Fonts, colours, tables\' borders and images are not part of the output.',
        'Embedded pictures and objects are skipped. Complex documents with text boxes or fields may lose some wording.',
      ],
      graphics: [
        {
          kind: 'pages',
          caption: 'Formatting codes are removed; the text remains.',
          alt: 'A formatted page with a heading, an image and a table on the left; plain lines of text on the right.',
          left: { label: 'RTF document', look: 'styled' },
          right: { label: 'Plain text', look: 'textfile' },
        },
        {
          kind: 'table',
          caption: 'What the converter does with RTF elements.',
          columns: ['In the RTF', 'In the TXT'],
          rows: [
            { label: 'Paragraphs', a: '\\par', b: 'Line break' },
            { label: 'Accents (é, ü)', a: 'Escape codes', b: 'Real characters' },
            { label: 'Bold, italic, fonts', a: 'Codes', b: 'Removed, text kept' },
            { label: 'Images', a: 'Embedded', b: 'Skipped' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Reading an old RTF with no word processor', text: 'Text files open in anything, while RTF needs a program that understands it.' },
        { title: 'Extracting wording for another system', text: 'Plain text goes cleanly into forms, databases and scripts.' },
        { title: 'Recovering text from a damaged workflow', text: 'Even when formatting is broken, the readable text is usually recoverable.' },
      ],
      keepOriginal:
        'Keep the RTF if you need fonts, emphasis and layout. For a version that Word can still edit, open the RTF in Word and save as DOCX.',
    },
    faqs: [
      { q: 'Is bold text lost?', a: 'The bold styling is dropped but the words are kept.' },
      { q: 'Are accented characters preserved?', a: 'Yes. Codes such as \\\'e9 and unicode escapes are decoded.' },
      { q: 'What happens to tables?', a: 'Cell text is kept, separated by tabs, without borders.' },
      { q: 'Are images extracted?', a: 'No. Embedded pictures are skipped.' },
    ],
  },

  'rtf-to-pdf': {
    title: 'RTF to PDF Converter Online — Text Only, Free',
    metaDescription:
      'Convert RTF to PDF online for free. The text is set on plain A4 pages; fonts, images and tables are not kept. Runs in your browser with no upload.',
    heading: 'RTF to PDF Converter',
    description:
      'Convert RTF to PDF online for free: the text goes onto plain A4 pages. Fonts, images and tables are not kept.',
    steps: steps('rtf', 'pdf', 'Press Convert. The text is extracted from the RTF and set on A4 pages in a standard font.'),
    understanding: {
      paragraphs: [
        'This conversion reads the words from the RTF and lays them out in a PDF in 11-point Helvetica with 15 mm margins. It does not reproduce the document\'s own fonts, sizes, colours, tables or pictures.',
        'It works well for text-centred documents such as letters and notes. For a document that must look exactly as written, open the RTF in Word or LibreOffice and export to PDF from there.',
        'The built-in PDF font covers Latin characters, so other scripts may not display correctly.',
      ],
      graphics: [
        {
          kind: 'pages',
          caption: 'Only the text carries into the PDF.',
          alt: 'A formatted page with a heading, an image and a table on the left; a plain page of text lines on the right.',
          left: { label: 'RTF document', look: 'styled' },
          right: { label: 'PDF, text only', look: 'plain' },
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Making a readable PDF of a text document', text: 'Share the wording in a format nobody can alter by accident.' },
        { title: 'No office software available', text: 'Produce a PDF on a shared or locked-down computer.' },
      ],
      keepOriginal:
        'Use Word or LibreOffice to export when layout, tables or images matter. Keep the RTF if the document will be edited.',
    },
    faqs: [
      { q: 'Will the PDF look like my RTF?', a: 'No. Only the text is converted, in a standard font.' },
      { q: 'What about images and tables?', a: 'They are not included. Table text appears as plain lines.' },
      { q: 'How do I keep the layout?', a: 'Open the RTF in Word or LibreOffice and choose Save as PDF.' },
      { q: 'Do accented letters work?', a: 'Yes, for Latin scripts.' },
    ],
  },

  'rtf-to-html': {
    title: 'RTF to HTML Converter Online — Text Only, Free',
    metaDescription:
      'Convert RTF to HTML online for free. The text is placed in a preformatted HTML page; fonts and styling are not carried over. No upload or sign-up needed.',
    heading: 'RTF to HTML Converter',
    description:
      'Convert RTF to HTML online for free: the text goes into an HTML page without the RTF formatting.',
    steps: steps('rtf', 'html', 'Press Convert. The text is extracted from the RTF, escaped and placed in a preformatted block in a complete HTML page.'),
    understanding: {
      paragraphs: [
        'The RTF\'s formatting is not translated into HTML elements. Bold text does not become a strong tag, and headings do not become heading tags. The page contains the text, with its line breaks, in a preformatted block.',
        'Characters that are special in HTML are escaped, so the text displays as written. Accents and special symbols are decoded correctly first.',
        'For HTML with real structure, open the RTF in a word processor and export, or convert it to DOCX there and use the DOCX to HTML converter.',
      ],
      graphics: [
        {
          kind: 'pages',
          caption: 'The text moves into a plain web page.',
          alt: 'A formatted page on the left; a web browser window showing evenly spaced text on the right.',
          left: { label: 'RTF document', look: 'styled' },
          right: { label: 'HTML page', look: 'mono' },
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Publishing the wording of an old RTF online', text: 'You get a viewable page without the original program.' },
        { title: 'Pulling text into a web template', text: 'The escaped block can be pasted into your own markup.' },
      ],
      keepOriginal:
        'Keep the RTF as the editable original. If headings, bold text and lists matter, route the document through DOCX and use DOCX to HTML.',
    },
    faqs: [
      { q: 'Does bold or italic text survive?', a: 'No. The words are kept without styling.' },
      { q: 'Is the HTML safe to publish?', a: 'Yes, special characters are escaped.' },
      { q: 'Are images included?', a: 'No.' },
      { q: 'How do I get structured HTML?', a: 'Convert the RTF to DOCX in a word processor, then use the DOCX to HTML converter.' },
    ],
  },

  'rtf-to-docx': {
    title: 'RTF to DOCX Converter Online — Text Only, Free',
    metaDescription:
      'Convert RTF to DOCX online for free. The text becomes a plain Word document; fonts, tables and images are not kept. Runs in your browser with no upload.',
    heading: 'RTF to DOCX Converter',
    description:
      'Convert RTF to DOCX online for free: the text becomes a plain Word document without fonts or tables.',
    steps: steps('rtf', 'docx', 'Press Convert. The text is extracted from the RTF and written into a minimal Word document, one paragraph per block.'),
    understanding: {
      paragraphs: [
        'Word opens RTF files itself, so you can usually just open and re-save. This converter exists for when Word is not available, or when you want a clean, plain DOCX without the RTF\'s formatting baggage.',
        'The output contains the document\'s text only. Fonts, sizes, colours, tables and pictures from the RTF are not transferred, and everything uses Word\'s default style. Accents and special characters are decoded correctly.',
        'If the RTF has formatting you want to keep, open it in Word and use Save As, which keeps it.',
      ],
      graphics: [
        {
          kind: 'pages',
          caption: 'Only the wording reaches the DOCX.',
          alt: 'A formatted page with a heading, image and table on the left; a plain page of text lines on the right.',
          left: { label: 'RTF document', look: 'styled' },
          right: { label: 'DOCX, plain text', look: 'plain' },
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'An upload form that wants DOCX', text: 'Many portals accept DOCX and reject RTF.' },
        { title: 'Starting clean from old text', text: 'Strip years of inherited formatting and restyle from scratch.' },
      ],
      keepOriginal:
        'Use Word\'s Save As if the formatting matters, since Word reads RTF natively and keeps fonts and tables.',
    },
    faqs: [
      { q: 'Does the DOCX keep my fonts and tables?', a: 'No. Only the text is converted.' },
      { q: 'Why not open the RTF in Word?', a: 'You can, and that keeps formatting. This converter is for when Word is not available or plain output is wanted.' },
      { q: 'Are accented characters kept?', a: 'Yes.' },
      { q: 'What about images?', a: 'They are not included.' },
    ],
  },

  'csv-to-txt': {
    title: 'CSV to TXT Converter Online — Free, No Upload',
    metaDescription:
      'Convert CSV to TXT online for free. Saves your data unchanged with a .txt extension, in your browser with no upload or sign-up. Up to 20 files at once.',
    heading: 'CSV to TXT Converter',
    description:
      'Convert CSV to TXT online for free: your data is saved unchanged as a text file. Nothing is uploaded.',
    steps: steps('csv', 'txt', 'Press Convert. The file contents are saved as they are, with a .txt extension.'),
    understanding: {
      paragraphs: [
        'A CSV file is already plain text, with commas separating the values. Converting to TXT keeps every character the same and only changes the file extension, so nothing is parsed or reformatted.',
        'That is what you need when a system accepts .txt but rejects .csv, or when you want a spreadsheet program to leave the file alone instead of opening it as a table. Commas, quotes and line breaks are all preserved.',
        'If you want the data in a readable layout, convert to PDF for aligned columns or to HTML for a table.',
      ],
      graphics: [
        {
          kind: 'table',
          caption: 'The content stays the same.',
          columns: ['CSV file', 'TXT output'],
          rows: [
            { label: 'Content', a: 'Comma-separated values', b: 'Identical' },
            { label: 'Extension', a: '.csv', b: '.txt' },
            { label: 'Opens in', a: 'Spreadsheet by default', b: 'Text editor by default' },
            { label: 'Parsing', a: 'Not applicable', b: 'None' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'An uploader that rejects .csv', text: 'Some systems allow plain text files only.' },
        { title: 'Keeping Excel from reformatting the data', text: 'Double-clicking a .txt opens it in a text editor, so leading zeros and long numbers stay intact.' },
      ],
      keepOriginal:
        'Keep the CSV for data work: spreadsheets and import tools recognise it as a table. Renaming the file gives the same result.',
    },
    faqs: [
      { q: 'Is the data changed?', a: 'No. The contents are identical.' },
      { q: 'Can it reformat the columns?', a: 'No. Use CSV to PDF for aligned columns or CSV to HTML for a table.' },
      { q: 'Will Excel open the TXT?', a: 'Excel can import it through its text import wizard.' },
      { q: 'Which encoding is used?', a: 'UTF-8.' },
    ],
  },

  'csv-to-pdf': {
    title: 'CSV to PDF Converter Online — Free, No Upload',
    metaDescription:
      'Convert CSV to PDF online for free. The data is set in a monospace font on A4 pages, in your browser with no upload or sign-up. Not a formatted table.',
    heading: 'CSV to PDF Converter',
    description:
      'Convert CSV to PDF online for free: your data is set on A4 pages in a monospace font. Nothing is uploaded.',
    steps: steps('csv', 'pdf', 'Press Convert. The file text is set in 10-point Courier on A4 pages and long lines wrap.'),
    understanding: {
      paragraphs: [
        'The PDF shows the CSV as it is written, comma separators and all, in a monospace font. It does not turn the values into a ruled table with aligned columns.',
        'That is fine for small files that you want to read or print as evidence of what was exported. Wide files wrap onto several lines per row, which can make columns hard to follow. For a real table, convert to HTML.',
        'The PDF contains text, so it can be searched and selected. Non-Latin characters may not display in the built-in font.',
      ],
      graphics: [
        {
          kind: 'pages',
          caption: 'The raw data on a fixed page; it is not a formatted table.',
          alt: 'Lines of loose text on the left; the same text in evenly spaced characters on a page on the right.',
          left: { label: 'CSV text', look: 'textfile' },
          right: { label: 'PDF, monospace', look: 'mono' },
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Attaching a small export to a report', text: 'A PDF can be viewed anywhere without spreadsheet software.' },
        { title: 'Printing data rows', text: 'The page layout and margins are fixed and predictable.' },
      ],
      keepOriginal:
        'Keep the CSV for data work. For a printable, formatted table, convert to HTML and print it from your browser, or build the table in a spreadsheet.',
    },
    faqs: [
      { q: 'Does it create a table with columns?', a: 'No. It prints the file as text, commas included.' },
      { q: 'What about wide files?', a: 'Long rows wrap to the next line, which can break up the columns.' },
      { q: 'Is the text searchable?', a: 'Yes, the PDF contains real text.' },
      { q: 'How do I get a formatted table?', a: 'Convert to HTML, open it in a browser and print to PDF.' },
    ],
  },

  'csv-to-html': {
    title: 'CSV to HTML Converter Online — Table, Free',
    metaDescription:
      'Convert CSV to HTML online for free as a table. The first row becomes the header, in your browser with no upload or sign-up. Quoted fields are handled.',
    heading: 'CSV to HTML Converter',
    description:
      'Convert CSV to HTML online for free: your data becomes an HTML table with a header row. Nothing is uploaded.',
    steps: steps('csv', 'html', 'Press Convert. The CSV is parsed, quoted fields are handled, and a page with a styled table is saved.'),
    understanding: {
      paragraphs: [
        'The converter parses the CSV properly: fields wrapped in quotes can contain commas and line breaks, and doubled quotes become one. The first row is treated as the header and the rest as body rows.',
        'The result is a complete HTML page with a bordered table. Every cell is escaped, so data containing angle brackets shows as text. Numbers and dates stay as text; nothing is calculated or sorted.',
        'Only comma-separated files are read. Files that use semicolons or tabs need to be saved with commas first.',
      ],
      graphics: [
        {
          kind: 'table',
          caption: 'How CSV maps to the table.',
          columns: ['CSV', 'HTML'],
          rows: [
            { label: 'First row', a: 'name,qty,price', b: 'Header cells (th)' },
            { label: 'Other rows', a: 'widget,4,2.50', b: 'Body cells (td)' },
            { label: 'Quoted fields', a: '"a, b"', b: 'One cell: a, b' },
            { label: 'Special characters', a: '< >', b: 'Escaped' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Showing data on a web page', text: 'Paste the table into your site or send the page as is.' },
        { title: 'Sharing a spreadsheet export with someone without Excel', text: 'A browser opens the page.' },
        { title: 'Printing a clean table', text: 'Open the HTML and print to PDF for a formatted result.' },
      ],
      keepOriginal:
        'Keep the CSV for analysis, since an HTML table cannot be sorted or calculated. If the file uses semicolons, convert it to commas first.',
    },
    faqs: [
      { q: 'Is the first row the header?', a: 'Yes, it becomes the table header.' },
      { q: 'Does it handle quoted fields?', a: 'Yes, including commas and doubled quotes inside quotes.' },
      { q: 'What about semicolon-separated files?', a: 'Not supported. Only commas are read.' },
      { q: 'Is the HTML safe?', a: 'Yes. Cell contents are escaped.' },
    ],
  },

  'docx-to-html': {
    title: 'DOCX to HTML Converter Online — Free, No Upload',
    metaDescription:
      'Convert DOCX to HTML online for free. Headings, bold, lists, tables and images become clean HTML in your browser, with no upload or sign-up needed.',
    heading: 'DOCX to HTML Converter',
    description:
      'Convert DOCX to HTML online for free: headings, lists, tables and images become a clean HTML page. Nothing is uploaded.',
    steps: steps('docx', 'html', 'Press Convert. Word headings, bold and italic, lists, links, tables and images are rewritten as HTML in a complete page.'),
    understanding: {
      paragraphs: [
        'Word describes a document with paragraph styles. The converter maps them to HTML: Heading 1 to 6 become h1 to h6, bold and italic become strong and em, lists and tables become lists and tables, and links stay links. Pictures are embedded in the page itself.',
        'It captures structure, not appearance. Fonts, colours, page size, headers, footers and exact spacing are not reproduced. Text that is only made to look like a heading, using large bold type instead of a heading style, is a plain paragraph.',
        'The page has a small default stylesheet. Remove it if you paste the body into your own site, and review the markup before publishing.',
      ],
      graphics: [
        {
          kind: 'table',
          caption: 'How Word elements appear in the HTML.',
          columns: ['In the DOCX', 'In the HTML'],
          rows: [
            { label: 'Heading 1 style', a: 'Large heading', b: '<h1>' },
            { label: 'Bold, italic', a: 'Character styles', b: '<strong>, <em>' },
            { label: 'Table', a: 'Grid', b: '<table>' },
            { label: 'Picture', a: 'Embedded', b: 'Embedded in the page' },
            { label: 'Fonts and colours', a: 'Yes', b: 'Not carried over' },
          ],
        },
        {
          kind: 'pages',
          caption: 'Structure carries over; the exact look does not.',
          alt: 'A styled Word page with heading, image and table on the left; a web page with similar structure on the right.',
          left: { label: 'Word document', look: 'styled' },
          right: { label: 'HTML page', look: 'web' },
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Publishing a Word document online', text: 'Headings, lists and tables arrive as real HTML elements.' },
        { title: 'Moving content into a CMS or newsletter', text: 'Paste the clean body markup instead of Word\'s messy copy and paste.' },
        { title: 'Reading a document without Word', text: 'Any browser opens the result.' },
      ],
      keepOriginal:
        'Keep the DOCX if layout and page design matter. Use the Word style pickers for headings so they convert correctly.',
    },
    faqs: [
      { q: 'Are images included?', a: 'Yes, embedded in the page.' },
      { q: 'Why did my heading become a normal paragraph?', a: 'It was formatted by hand rather than with a Heading style, which the converter cannot tell from ordinary text.' },
      { q: 'Are fonts and colours kept?', a: 'No. Structure is kept, appearance is not.' },
      { q: 'Does it support .doc files?', a: 'No, only .docx.' },
    ],
  },

  'docx-to-md': {
    title: 'DOCX to Markdown Converter Online — Free, No Upload',
    metaDescription:
      'Convert DOCX to Markdown online for free. Headings, bold, italic, links, lists and tables become Markdown, in your browser with no upload or sign-up needed.',
    heading: 'DOCX to Markdown Converter',
    description:
      'Convert DOCX to Markdown online for free: headings, lists, links and emphasis become Markdown. Nothing is uploaded.',
    steps: steps('docx', 'md', 'Press Convert. The document is read, Word styles are mapped to Markdown, and images are left out.'),
    understanding: {
      paragraphs: [
        'The converter reads the document\'s structure and writes it as Markdown: Heading styles become lines starting with hashes, bold and italic get asterisks, lists use dashes or numbers, links keep their addresses, and tables become pipe tables.',
        'Images are not included, since Markdown would have to reference separate files. Footnotes, comments, headers, footers and text boxes are not converted, and exact formatting such as fonts and colours has no Markdown equivalent.',
        'Headings only convert if they use Word\'s Heading styles. Hand-formatted bold text that looks like a heading stays a bold paragraph.',
      ],
      graphics: [
        {
          kind: 'table',
          caption: 'How Word content maps to Markdown.',
          columns: ['In the DOCX', 'In the Markdown'],
          rows: [
            { label: 'Heading 2 style', a: 'Large heading', b: '## Heading' },
            { label: 'Bold and italic', a: 'Character styles', b: '**bold**, *italic*' },
            { label: 'Bulleted list', a: 'Bullets', b: '- item' },
            { label: 'Table', a: 'Grid', b: 'Pipe table' },
            { label: 'Images', a: 'Embedded', b: 'Left out' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Moving documents into a docs site or repository', text: 'Static site generators and wikis use Markdown.' },
        { title: 'Importing into note-taking apps', text: 'Apps such as Obsidian and Notion read Markdown with headings and links intact.' },
        { title: 'Putting a document under version control', text: 'Markdown diffs cleanly, unlike a binary DOCX.' },
      ],
      keepOriginal:
        'Keep the DOCX when images, footnotes or exact layout matter, since Markdown cannot hold them.',
    },
    faqs: [
      { q: 'Are headings converted?', a: 'Yes, when they use Word\'s Heading styles.' },
      { q: 'Are images kept?', a: 'No. They are left out of the Markdown.' },
      { q: 'What about tables?', a: 'They become pipe tables. Merged cells are not represented.' },
      { q: 'Is it the same as DOCX to TXT?', a: 'No. TXT removes all structure; Markdown keeps headings, lists, emphasis and links.' },
    ],
  },

  'odt-to-txt': {
    title: 'ODT to TXT Converter Online — Free, No Upload',
    metaDescription:
      'Convert ODT to TXT online for free. Extracts the text from a LibreOffice document with paragraphs kept, in your browser with no upload or sign-up.',
    heading: 'ODT to TXT Converter',
    description:
      'Convert ODT to TXT online for free: the text of an OpenDocument file is extracted with paragraphs kept.',
    steps: steps('odt', 'txt', 'Press Convert. The document\'s text is read, paragraphs and headings are separated by blank lines, and special characters are decoded.'),
    understanding: {
      paragraphs: [
        'An ODT file, from LibreOffice, OpenOffice and similar programs, is a ZIP archive of XML. The converter opens it, reads the document body and writes out the words.',
        'Headings and paragraphs are separated by blank lines, line breaks and tabs are restored, and characters such as ampersands are decoded. Formatting, images, tables\' borders and styles are not part of the text.',
        'It works on the document body only: headers, footers and comments are not extracted.',
      ],
      graphics: [
        {
          kind: 'pages',
          caption: 'The document body is reduced to its words.',
          alt: 'A formatted page with heading, image and table on the left; plain lines of text on the right.',
          left: { label: 'ODT document', look: 'styled' },
          right: { label: 'Plain text', look: 'textfile' },
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Reading an ODT without LibreOffice', text: 'Plain text opens anywhere.' },
        { title: 'Moving text into another system', text: 'Forms, databases and scripts want plain text.' },
        { title: 'Searching or counting words', text: 'Text files work with every command-line and search tool.' },
      ],
      keepOriginal:
        'Keep the ODT if you need styling, tables and images. For a Word-compatible file, save as DOCX from LibreOffice.',
    },
    faqs: [
      { q: 'Are headers and footers included?', a: 'No, only the document body.' },
      { q: 'Are tables kept?', a: 'The text inside is kept as paragraphs, without borders or columns.' },
      { q: 'Are images extracted?', a: 'No.' },
      { q: 'Does it work with .fodt or .ott?', a: 'No, only .odt files.' },
    ],
  },

  'odt-to-pdf': {
    title: 'ODT to PDF Converter Online — Text Only, Free',
    metaDescription:
      'Convert ODT to PDF online for free. The text is set on plain A4 pages; fonts, images and tables are not kept. Runs in your browser with no upload.',
    heading: 'ODT to PDF Converter',
    description:
      'Convert ODT to PDF online for free: the text goes onto plain A4 pages. Fonts, images and tables are not kept.',
    steps: steps('odt', 'pdf', 'Press Convert. The document text is read and set on A4 pages in a standard font.'),
    understanding: {
      paragraphs: [
        'The converter extracts the text from the OpenDocument file and lays it out in a PDF in 11-point Helvetica. Formatting, images, tables, headers and footers are not reproduced.',
        'It suits text-centred documents. For a PDF that matches the original, open the file in LibreOffice and use File, Export as PDF, which keeps the document\'s own layout and fonts.',
        'The built-in PDF font covers Latin characters, so some scripts may not display.',
      ],
      graphics: [
        {
          kind: 'pages',
          caption: 'Only the text reaches the PDF.',
          alt: 'A formatted page with heading, image and table on the left; a plain page of text lines on the right.',
          left: { label: 'ODT document', look: 'styled' },
          right: { label: 'PDF, text only', look: 'plain' },
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'A quick PDF of a text document', text: 'Share the words in a fixed format.' },
        { title: 'No LibreOffice at hand', text: 'Produce a PDF from any browser.' },
      ],
      keepOriginal:
        'Export from LibreOffice for layout-accurate PDFs. Keep the ODT as the editable original.',
    },
    faqs: [
      { q: 'Will the PDF look like my ODT?', a: 'No. Only the text is converted.' },
      { q: 'How do I keep the layout?', a: 'In LibreOffice, choose File, Export as PDF.' },
      { q: 'Are images and tables included?', a: 'No.' },
      { q: 'Do non-Latin characters work?', a: 'The built-in font covers Latin text only.' },
    ],
  },

  'odt-to-html': {
    title: 'ODT to HTML Converter Online — Text Only, Free',
    metaDescription:
      'Convert ODT to HTML online for free. The text goes into a preformatted HTML page; styling and images are not kept. Runs in your browser with no upload.',
    heading: 'ODT to HTML Converter',
    description:
      'Convert ODT to HTML online for free: the document text goes into an HTML page. Styling and images are not kept.',
    steps: steps('odt', 'html', 'Press Convert. The text is read from the ODT, escaped and placed in a preformatted block in an HTML page.'),
    understanding: {
      paragraphs: [
        'The converter reads the OpenDocument text and writes it into a web page inside a preformatted block. Headings are not turned into heading tags, and styling, tables and images are left out.',
        'All special characters are escaped, so the text shows as written and is safe to publish.',
        'For HTML with real structure from an ODT, export HTML from LibreOffice (File, Export), or save as DOCX and use the DOCX to HTML converter.',
      ],
      graphics: [
        {
          kind: 'pages',
          caption: 'The words move into a plain web page.',
          alt: 'A formatted page on the left; a browser window showing evenly spaced text on the right.',
          left: { label: 'ODT document', look: 'styled' },
          right: { label: 'HTML page', look: 'mono' },
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Putting the wording of a document online', text: 'You get a viewable page without any office software.' },
        { title: 'Pasting text into a template', text: 'The escaped block drops into your own markup safely.' },
      ],
      keepOriginal:
        'Keep the ODT for editing. Use LibreOffice\'s own HTML export or the DOCX route when you need headings and tables as HTML.',
    },
    faqs: [
      { q: 'Are headings and lists converted to HTML elements?', a: 'No. The page contains plain text in a preformatted block.' },
      { q: 'Are images included?', a: 'No.' },
      { q: 'Is the output safe to publish?', a: 'Yes. Special characters are escaped.' },
      { q: 'How can I get structured HTML?', a: 'Use File, Export in LibreOffice, or convert via DOCX.' },
    ],
  },

  'odt-to-md': {
    title: 'ODT to Markdown Converter Online — Text Only, Free',
    metaDescription:
      'Convert ODT to Markdown online for free. The text is saved as a .md file with paragraphs kept but no syntax added. No upload or sign-up needed.',
    heading: 'ODT to Markdown Converter',
    description:
      'Convert ODT to Markdown online for free: the text is saved as a .md file with paragraphs kept. No syntax is added.',
    steps: steps('odt', 'md', 'Press Convert. The text is extracted and saved with a .md extension; headings and emphasis are not marked up.'),
    understanding: {
      paragraphs: [
        'Unlike DOCX, which carries explicit heading styles, this ODT conversion reads only the text, so the Markdown file contains plain paragraphs without hashes or asterisks.',
        'That makes it a quick way to move the wording into a Markdown-based tool, where you then add headings and emphasis. It does not translate the document\'s styles. Images, tables\' borders and formatting are not kept.',
        'If the document\'s headings matter, save the ODT as DOCX in LibreOffice and use the DOCX to Markdown converter, which does read heading styles.',
      ],
      graphics: [
        {
          kind: 'table',
          caption: 'What the Markdown contains.',
          columns: ['ODT document', 'Markdown output'],
          rows: [
            { label: 'Paragraphs', a: 'Styled', b: 'Plain, blank line between' },
            { label: 'Headings', a: 'Heading styles', b: 'Plain lines, no #' },
            { label: 'Bold and italic', a: 'Yes', b: 'Not marked' },
            { label: 'Images', a: 'Yes', b: 'Not included' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Starting a Markdown file from a LibreOffice document', text: 'You get the wording ready to be marked up.' },
        { title: 'Importing into a Markdown-based notes tool', text: 'The .md extension lets the app pick up the file.' },
      ],
      keepOriginal:
        'Keep the ODT as the source. If you want headings and emphasis to convert automatically, go through DOCX and use DOCX to Markdown.',
    },
    faqs: [
      { q: 'Are headings converted to Markdown headings?', a: 'No. They come out as plain lines.' },
      { q: 'How can I keep headings?', a: 'Save as DOCX in LibreOffice, then use the DOCX to Markdown converter.' },
      { q: 'Are images included?', a: 'No.' },
      { q: 'Is the content the same as ODT to TXT?', a: 'Yes, only the extension differs.' },
    ],
  },
};
