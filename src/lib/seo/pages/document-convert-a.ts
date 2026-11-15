import type { ConversionPage } from './types';
import { steps } from './helpers';

/** Conversions from TXT, HTML and Markdown. */
export const DOCUMENT_PAGES_A: Record<string, ConversionPage> = {
  'txt-to-html': {
    title: 'TXT to HTML Converter Online — Free, No Upload',
    metaDescription:
      'Convert TXT to HTML online for free. Wraps a plain text file in an HTML page that keeps its spacing. Runs in your browser with no upload or sign-up.',
    heading: 'TXT to HTML Converter',
    description:
      'Convert TXT to HTML online for free: your text goes into an HTML page that keeps its spacing. Nothing is uploaded.',
    steps: steps('txt', 'html', 'Press Convert. The text is escaped and placed in a preformatted block inside a complete HTML page.'),
    understanding: {
      paragraphs: [
        'A text file has no structure beyond line breaks, so this converter does not guess at headings or paragraphs. It puts the whole text inside a preformatted block, which a browser displays in a monospace font with every space and line break kept.',
        'Characters that mean something in HTML, such as angle brackets and ampersands, are escaped, so the text shows exactly as written and nothing in it can run as code. The page title is taken from the file name.',
        'If you want real paragraphs and headings, write the text in Markdown and use the Markdown to HTML converter.',
      ],
      graphics: [
        {
          kind: 'pages',
          caption: 'The text keeps its spacing, inside a simple web page.',
          alt: 'Lines of loose text on the left; on the right the same text in even spacing inside a web browser window.',
          left: { label: 'Text file', look: 'textfile' },
          right: { label: 'HTML page', look: 'mono' },
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Publishing a log or notes online', text: 'A preformatted HTML page shows column alignment and indentation exactly as in the file.' },
        { title: 'Embedding plain text in a web page', text: 'The escaped output can be pasted into a page without breaking its markup.' },
        { title: 'Sharing text that must stay aligned', text: 'ASCII tables and code listings keep their layout.' },
      ],
      keepOriginal:
        'Keep the TXT for editing and for anything a script will read. If you need real HTML structure such as headings and lists, start from Markdown instead.',
    },
    faqs: [
      { q: 'Does it turn paragraphs into HTML paragraphs?', a: 'No. The whole text goes in one preformatted block, so spacing is kept but there are no paragraph elements.' },
      { q: 'Is the text safe to publish?', a: 'Yes. HTML characters are escaped, so nothing in the text is interpreted as markup.' },
      { q: 'Can I style the page?', a: 'Edit the saved HTML file, or paste the block into your own page and style it there.' },
      { q: 'What encoding does the HTML use?', a: 'UTF-8.' },
    ],
  },

  'txt-to-md': {
    title: 'TXT to Markdown Converter Online — Free, No Upload',
    metaDescription:
      'Convert TXT to Markdown online for free. Saves your text as a .md file unchanged, in your browser with no upload or sign-up. No Markdown syntax is added.',
    heading: 'TXT to Markdown Converter',
    description:
      'Convert TXT to Markdown online for free: your text is saved as a .md file, unchanged. Nothing is uploaded.',
    steps: steps('txt', 'md', 'Press Convert. The text is saved unchanged with a .md extension.'),
    understanding: {
      paragraphs: [
        'Markdown is plain text with optional symbols, so any text file is already valid Markdown. This converter therefore changes the file extension and nothing else: no headings, bold text or lists are detected or added.',
        'That is useful when a tool or repository insists on .md files. Be aware that Markdown treats some characters as syntax. A line beginning with a hash, a dash or an asterisk will be rendered as a heading or list item once the file is displayed.',
        'Single line breaks inside a paragraph are joined into one line by most Markdown renderers, so text that depends on hard line breaks may reflow.',
      ],
      graphics: [
        {
          kind: 'table',
          caption: 'What changes and what does not.',
          columns: ['TXT file', 'Markdown output'],
          rows: [
            { label: 'Text', a: 'As written', b: 'Identical' },
            { label: 'Extension', a: '.txt', b: '.md' },
            { label: 'Headings and lists', a: 'None', b: 'Not added' },
            { label: 'Special characters', a: 'Plain', b: 'May be read as syntax later' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'A README or docs folder that expects .md', text: 'Notes saved as .txt are not picked up by documentation tools.' },
        { title: 'Starting a Markdown document from plain notes', text: 'Open the result in a Markdown editor and add headings and emphasis there.' },
      ],
      keepOriginal:
        'Keep the TXT if the exact line breaks matter, since a Markdown renderer may join them. Renaming the file yourself gives the same result.',
    },
    faqs: [
      { q: 'Does it add Markdown formatting?', a: 'No. The content is identical to the text file.' },
      { q: 'Why convert at all?', a: 'Some tools and sites accept only the .md extension.' },
      { q: 'Will lines starting with # or - change meaning?', a: 'Yes, once rendered, because Markdown reads them as headings or list items.' },
      { q: 'Can it detect headings automatically?', a: 'No. You would add the symbols yourself in an editor.' },
    ],
  },

  'txt-to-docx': {
    title: 'TXT to DOCX Converter Online — Free, No Upload',
    metaDescription:
      'Convert TXT to DOCX online for free. Each paragraph becomes a Word paragraph, in plain default styling. Runs in your browser with no upload or sign-up.',
    heading: 'TXT to DOCX Converter',
    description:
      'Convert TXT to DOCX online for free: your text becomes a Word document with plain styling. Nothing is uploaded.',
    steps: steps('txt', 'docx', 'Press Convert. Blank lines separate paragraphs, line breaks inside a paragraph are kept, and a minimal Word document is written.'),
    understanding: {
      paragraphs: [
        'The DOCX created here is deliberately basic. Each block of text separated by a blank line becomes a Word paragraph, and single line breaks inside a block stay as line breaks.',
        'There are no styles, headings, fonts or page settings in the file, so Word applies its defaults. Open the document and format it as you like. Control characters that Word cannot store are removed so the file always opens.',
        'Text is stored as UTF-8 inside the document, so accented letters and non-Latin scripts are kept.',
      ],
      graphics: [
        {
          kind: 'pages',
          caption: 'Loose text becomes a Word document with default styling.',
          alt: 'Lines of loose text on the left; on the right a page of plain, evenly set text lines.',
          left: { label: 'Text file', look: 'textfile' },
          right: { label: 'DOCX, default styling', look: 'plain' },
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'A template or workflow that requires Word files', text: 'Some offices and portals accept DOCX but not TXT.' },
        { title: 'Turning notes into an editable document', text: 'Open the DOCX and add headings, fonts and spacing in Word.' },
        { title: 'Sending text to someone who uses Word', text: 'A DOCX opens with a double-click and can be edited without worrying about encodings.' },
      ],
      keepOriginal:
        'Keep the TXT for code, data and anything a program reads. A DOCX adds nothing if no one will edit it in Word.',
    },
    faqs: [
      { q: 'Does it keep my line breaks?', a: 'Blank lines start new paragraphs, and single line breaks stay as line breaks within a paragraph.' },
      { q: 'What font will the document use?', a: 'Word\'s default. The file sets no fonts or styles.' },
      { q: 'Does it work with non-English text?', a: 'Yes, text is stored as UTF-8.' },
      { q: 'Can I get headings or formatting automatically?', a: 'No. The converter does not interpret the text.' },
    ],
  },

  'html-to-txt': {
    title: 'HTML to TXT Converter Online — Extract Text Free',
    metaDescription:
      'Convert HTML to text online for free. Extract the readable text from an HTML file, with scripts and styles removed, in your browser with no upload.',
    heading: 'HTML to TXT Converter',
    description:
      'Convert HTML to TXT online for free to extract readable text from a web page file. Scripts and styles are removed.',
    steps: steps('html', 'txt', 'Press Convert. Scripts and styles are removed, and the text is saved with a line break after each block element.'),
    understanding: {
      paragraphs: [
        'An HTML file mixes the words you want with tags, styles and scripts. The converter parses the file the way a browser would, discards everything that is not readable content, and keeps the text.',
        'Headings, paragraphs, list items, table rows and line breaks each start a new line, so the text stays readable instead of running together. Links lose their addresses, and images are dropped. Nothing in the file is run.',
        'Text that a page loads with JavaScript is not in the saved file, so it cannot be extracted.',
      ],
      graphics: [
        {
          kind: 'pages',
          caption: 'The words are kept; markup, styling and scripts are not.',
          alt: 'A web page in a browser window on the left; plain lines of text on the right.',
          left: { label: 'HTML page', look: 'web' },
          right: { label: 'Plain text', look: 'textfile' },
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Extracting an article from a saved page', text: 'Get the words without menus, ads and tracking code.' },
        { title: 'Cleaning an HTML email export', text: 'Strip the markup to read or reuse the message text.' },
        { title: 'Feeding page content to a script or AI tool', text: 'Plain text is the most predictable input.' },
      ],
      keepOriginal:
        'Keep the HTML if you need links, images or structure. To keep headings and lists as Markdown, use the HTML to Markdown converter.',
    },
    faqs: [
      { q: 'Are links kept?', a: 'The link text is kept but not the address.' },
      { q: 'Are scripts executed?', a: 'No. Script and style content is removed and nothing is run.' },
      { q: 'Why is some content missing?', a: 'Content added by JavaScript after the page loads is not in the saved HTML.' },
      { q: 'Can I convert a live URL?', a: 'No. Save the page as an HTML file first.' },
    ],
  },

  'html-to-md': {
    title: 'HTML to Markdown Converter Online — Free, No Upload',
    metaDescription:
      'Convert HTML to Markdown online for free. Headings, lists, links, bold, code and tables become Markdown, in your browser with no upload or sign-up.',
    heading: 'HTML to Markdown Converter',
    description:
      'Convert HTML to Markdown online for free: headings, lists, links and emphasis become Markdown. Nothing is uploaded.',
    steps: steps('html', 'md', 'Press Convert. The page structure is rewritten as Markdown: headings, lists, links, emphasis, quotes, code and tables.'),
    understanding: {
      paragraphs: [
        'Markdown covers the structure of a document without the weight of HTML tags. The converter walks the page and rewrites what it recognises: headings become lines starting with hashes, lists become dashes or numbers, bold and italic get asterisks, links become bracketed text with the address.',
        'Quotes, preformatted code and simple tables are converted too. What is dropped: images, scripts, styles, classes and layout. Only links that start with http or https keep their address.',
        'Complex layouts built from many nested containers flatten into a sequence of paragraphs, so review the result for long pages.',
      ],
      graphics: [
        {
          kind: 'table',
          caption: 'How common HTML becomes Markdown.',
          columns: ['HTML', 'Markdown'],
          rows: [
            { label: 'Heading', a: '<h2>Title</h2>', b: '## Title' },
            { label: 'Emphasis', a: '<strong>, <em>', b: '**bold**, *italic*' },
            { label: 'Link', a: '<a href="…">text</a>', b: '[text](…)' },
            { label: 'List', a: '<ul><li>', b: '- item' },
            { label: 'Image', a: '<img>', b: 'Dropped' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Moving web content into docs or a repository', text: 'Markdown is what documentation tools, static site generators and wikis use.' },
        { title: 'Saving an article in a note-taking app', text: 'Apps such as Obsidian read Markdown and keep the headings and links.' },
        { title: 'Cleaning HTML before editing', text: 'Markdown is far easier to read and edit than raw tags.' },
      ],
      keepOriginal:
        'Keep the HTML if layout, images or styling matter. Markdown cannot express them, and images are dropped here.',
    },
    faqs: [
      { q: 'Are images included?', a: 'No. Images are dropped from the Markdown.' },
      { q: 'Which links keep their address?', a: 'Links that begin with http or https. Others keep only their text.' },
      { q: 'Are tables converted?', a: 'Simple tables become pipe tables. Merged cells are not represented.' },
      { q: 'Does it run scripts in the HTML?', a: 'No. Scripts and styles are removed.' },
    ],
  },

  'html-to-docx': {
    title: 'HTML to DOCX Converter Online — Text Only, Free',
    metaDescription:
      'Convert HTML to DOCX online for free. The readable text becomes a Word document with plain styling; layout and images are not kept. No upload needed.',
    heading: 'HTML to DOCX Converter',
    description:
      'Convert HTML to DOCX online for free: the readable text becomes a plain Word document. Layout and images are not kept.',
    steps: steps('html', 'docx', 'Press Convert. Scripts, styles and tags are stripped and the text is written into a minimal Word document.'),
    understanding: {
      paragraphs: [
        'HTML is converted to its readable text first, and that text is placed into a Word document paragraph by paragraph. Tags, CSS, images and scripts are not carried over.',
        'Headings do not become Word headings, and links lose their addresses. You get an editable document with Word\'s default styling, which is a quick way to move the wording of a page into Word, not a way to reproduce how it looks.',
        'To keep the page\'s appearance, print it to PDF from your browser instead.',
      ],
      graphics: [
        {
          kind: 'pages',
          caption: 'The words reach the document. The design stays behind.',
          alt: 'A web page in a browser window on the left; a page of plain text lines on the right.',
          left: { label: 'HTML page', look: 'web' },
          right: { label: 'DOCX, plain text', look: 'plain' },
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Copying an article into Word for editing', text: 'You skip menus and scripts and get just the wording.' },
        { title: 'Archiving exported HTML content', text: 'A DOCX opens in any office suite without a browser.' },
      ],
      keepOriginal:
        'Keep the HTML for anything visual. For headings and lists that survive into other tools, HTML to Markdown keeps more structure than this does.',
    },
    faqs: [
      { q: 'Does the DOCX keep headings and bold text?', a: 'No. The text is plain, in Word\'s default style.' },
      { q: 'Are images included?', a: 'No.' },
      { q: 'Are links kept?', a: 'Only their text.' },
      { q: 'Is anything in the HTML executed?', a: 'No. The file is read as text.' },
    ],
  },

  'md-to-txt': {
    title: 'Markdown to TXT Converter Online — Free, No Upload',
    metaDescription:
      'Convert Markdown to TXT online for free. Removes the syntax and keeps the text, links and code, in your browser with no upload or sign-up needed.',
    heading: 'Markdown to TXT Converter',
    description:
      'Convert Markdown to TXT online for free: the symbols are removed and the readable text is kept. Nothing is uploaded.',
    steps: steps('md', 'txt', 'Press Convert. Heading hashes, emphasis marks, link syntax and code fences are removed, and list items start with a dash.'),
    understanding: {
      paragraphs: [
        'Markdown is already readable, but its symbols get in the way when you paste into a plain text field. The converter strips them: heading hashes, asterisks, underscores, link brackets and code fences.',
        'Links keep their visible text but lose the address, images become their alt text, and the contents of code blocks are kept as plain lines. Bullets are written with a leading dash. Tables lose their structure and stay as lines with pipe characters.',
        'The output is a clean text version of the document, ready for places where Markdown would show up as stray symbols.',
      ],
      graphics: [
        {
          kind: 'pages',
          caption: 'The symbols go; the words and code stay.',
          alt: 'A page of Markdown source with hash, asterisk and backtick symbols on the left; plain text lines on the right.',
          left: { label: 'Markdown source', look: 'markup' },
          right: { label: 'Plain text', look: 'textfile' },
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Pasting into a system without Markdown support', text: 'Forms, tickets and emails show hashes and asterisks as clutter.' },
        { title: 'Counting words or checking length', text: 'Syntax characters distort counts, so strip them first.' },
        { title: 'Preparing text for text-to-speech or analysis', text: 'Symbols are read aloud or confuse tools.' },
      ],
      keepOriginal:
        'Keep the Markdown for anything that will be rendered. Link addresses are lost in the text version, so you cannot rebuild the links later.',
    },
    faqs: [
      { q: 'Are link addresses kept?', a: 'No, only the link text.' },
      { q: 'What happens to code blocks?', a: 'The code is kept as plain lines. The fences are removed.' },
      { q: 'What about images?', a: 'They are replaced by their alt text.' },
      { q: 'Are bullet lists preserved?', a: 'Yes, as lines starting with a dash.' },
    ],
  },

  'md-to-html': {
    title: 'Markdown to HTML Converter Online — Free, No Upload',
    metaDescription:
      'Convert Markdown to HTML online for free. Headings, lists, links, quotes and code become a clean HTML page in your browser, with no upload or sign-up.',
    heading: 'Markdown to HTML Converter',
    description:
      'Convert Markdown to HTML online for free: headings, lists, links and code become a clean web page. Nothing is uploaded.',
    steps: steps('md', 'html', 'Press Convert. The Markdown is rendered to HTML and saved as a complete page with simple default styling.'),
    understanding: {
      paragraphs: [
        'The converter reads the common Markdown elements and writes valid HTML: headings as h1 to h6, paragraphs, bold and italic, links, images, block quotes, bulleted and numbered lists, horizontal rules, inline code and fenced code blocks.',
        'It is built for ordinary documents, not every Markdown extension. Tables, footnotes and task lists are not converted and appear as written. Raw HTML in the source is escaped, not passed through, and links and images accept only http or https addresses, so the output is safe to publish.',
        'The page includes a small stylesheet for readable defaults. Remove or replace it if you will paste the body into your own site.',
      ],
      graphics: [
        {
          kind: 'table',
          caption: 'How Markdown elements are written in HTML.',
          columns: ['Markdown', 'HTML'],
          rows: [
            { label: 'Heading', a: '## Title', b: '<h2>Title</h2>' },
            { label: 'Emphasis', a: '**bold**', b: '<strong>bold</strong>' },
            { label: 'List', a: '- item', b: '<ul><li>item</li></ul>' },
            { label: 'Link', a: '[text](https://…)', b: '<a href="https://…">text</a>' },
            { label: 'Code fence', a: '```', b: '<pre><code>' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Publishing a README or notes as a web page', text: 'You get a ready page you can upload anywhere.' },
        { title: 'Preparing content for a CMS or email template', text: 'Copy the body markup straight into your system.' },
        { title: 'Printing styled Markdown', text: 'Open the HTML in a browser and print to PDF to keep headings and code formatting.' },
      ],
      keepOriginal:
        'Keep the Markdown as your source of truth and regenerate the HTML when it changes. Tables and footnotes need a fuller Markdown tool.',
    },
    faqs: [
      { q: 'Are tables supported?', a: 'No. Table syntax is left as plain text.' },
      { q: 'Is HTML inside the Markdown allowed?', a: 'It is escaped and shown as text, which keeps the page safe.' },
      { q: 'Can I print the result to PDF with styling?', a: 'Yes. Open the HTML in a browser and use Print, then Save as PDF.' },
      { q: 'Which links are allowed?', a: 'Only http and https addresses. Others are replaced with a harmless placeholder.' },
    ],
  },

  'md-to-docx': {
    title: 'Markdown to DOCX Converter Online — Text Only, Free',
    metaDescription:
      'Convert Markdown to DOCX online for free. Syntax is removed and the text becomes a plain Word document, in your browser with no upload or sign-up.',
    heading: 'Markdown to DOCX Converter',
    description:
      'Convert Markdown to DOCX online for free: the syntax is removed and the text becomes a plain Word document.',
    steps: steps('md', 'docx', 'Press Convert. Markdown symbols are stripped and the text is written into a minimal Word document.'),
    understanding: {
      paragraphs: [
        'Writers often want Markdown notes as a Word file for review. This converter strips the Markdown symbols and writes the remaining text into a DOCX, one paragraph per block.',
        'Headings are not turned into Word headings, emphasis is not carried over as bold or italic, and links keep only their text. Code block contents stay as plain paragraphs, and bullet items begin with a dash.',
        'If the document\'s styling matters, convert it to HTML first, open that in Word and save as DOCX; Word then reads headings and emphasis from the HTML.',
      ],
      graphics: [
        {
          kind: 'pages',
          caption: 'The words reach Word; the Markdown formatting does not.',
          alt: 'A page of Markdown source with symbols on the left; a page of plain text lines on the right.',
          left: { label: 'Markdown source', look: 'markup' },
          right: { label: 'DOCX, plain text', look: 'plain' },
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Sending a draft to a reviewer who uses Word', text: 'They can comment and track changes without learning Markdown.' },
        { title: 'Submitting text to a system that wants DOCX', text: 'Many offices accept Word files and nothing else.' },
      ],
      keepOriginal:
        'Keep the Markdown as the source. If you want headings and bold text in Word, go through HTML as described above.',
    },
    faqs: [
      { q: 'Are headings kept as Word headings?', a: 'No. They become ordinary paragraphs.' },
      { q: 'Is bold and italic text preserved?', a: 'No. The Markdown symbols are removed and the words appear unstyled.' },
      { q: 'How do I keep the formatting?', a: 'Convert to HTML, open the HTML in Word, then save as DOCX.' },
      { q: 'What about code blocks?', a: 'Their contents are kept as plain paragraphs.' },
    ],
  },
};
