import type { ArticleSection, ConverterContentOverride } from '../../types';

/* ─────────────────────────────────────────────────────────────────────────
   ARTICLE BODIES FOR EXISTING DOCUMENT TIER S PAGES
   docx-to-pdf, pdf-to-txt, docx-to-txt
   (these slugs already exist in priority.ts — these are NEW deep articles only)
───────────────────────────────────────────────────────────────────────── */

export const DOCUMENT_S_ARTICLES: Record<string, ArticleSection[]> = {
  'pdf-to-txt': [
    {
      heading: 'When you actually need plain text out of a PDF',
      paragraphs: [
        'PDFs are designed to be read, not mined. The format prioritizes "this looks the same everywhere" over "this is easy to extract," which is exactly why getting clean text back out can be frustrating. But there are concrete moments when you genuinely need it: you want to paste a report into ChatGPT or Claude as context, you need to edit text that lives in a locked PDF, you are building a searchable archive, or you want to feed document content into a script.',
        'The good news is that for a large class of PDFs this is fast and reliable. A PDF generated from Word, Google Docs, LaTeX, or a "Print to PDF" command contains real, encoded text underneath the visual layout. Extracting it is just a matter of reading that text layer and writing it to a .txt file — which is precisely what this tool does.',
      ],
    },
    {
      heading: 'The single most important distinction: text PDFs vs scanned PDFs',
      paragraphs: [
        'Before you convert anything, understand which kind of PDF you have, because it determines whether extraction is even possible. A text PDF was created digitally — the characters are stored as text and you can usually select them with your cursor. A scanned PDF is a photograph of paper; each page is essentially an image, and there is no machine-readable text inside, even though your eyes can read it perfectly.',
        'This tool extracts the text layer. If you have a digital text PDF, it works beautifully. If you have a scan — a contract someone signed and photographed, an old document run through a copier, a receipt — there is no text to extract, and the output will be empty or garbage. Getting text from a scan requires OCR (optical character recognition), which analyzes the image pixels to guess the letters. This converter does not do OCR, and we would rather tell you that plainly than have you fight an empty result.',
        'A quick test: open the PDF and try to select a sentence with your mouse. If the text highlights, you have a text PDF and extraction will work. If your cursor selects a whole rectangular block like an image, it is a scan and you will need a dedicated OCR tool first.',
      ],
    },
    {
      heading: 'How pdf.js reads your document privately',
      paragraphs: [
        'The engine here is pdf.js, the same open-source PDF renderer that Mozilla built and ships inside Firefox. It is mature, well-tested, and runs entirely in JavaScript — which means it runs inside your browser tab with no server involved. Your PDF is never uploaded.',
        'That privacy is not a nice-to-have for the documents people most often want to extract. Financial statements, legal filings, medical records, tax forms, and confidential business reports are exactly the files you should not be uploading to a random conversion website. Here they are read locally and the text never leaves your machine, which makes this safe to use even for sensitive material.',
      ],
    },
    {
      heading: 'Preparing PDF text for AI tools',
      paragraphs: [
        'One of the fastest-growing reasons to do this is feeding documents to large language models. AI chat tools work best with clean plain text. When you paste a PDF directly, or upload it, the model often has to wrestle with the encoding, and column layouts can come out scrambled. Handing it a .txt file you extracted yourself gives you control over what the model actually sees.',
        'Plain text also sidesteps token waste — there is no formatting overhead, just the words. For long documents you can open the .txt, trim the parts you do not need, and paste only the relevant section, which keeps you under context limits and produces sharper answers.',
      ],
    },
    {
      heading: 'Layout, columns, and tables: managing your expectations',
      paragraphs: [
        'Text is extracted in the reading order pdf.js infers, which for a normal single-column document — an article, a contract, a letter — comes out clean and natural. Where it gets messy is complex layouts. A two-column academic paper may interleave the columns; a magazine-style page with sidebars and pull-quotes can produce text in an order that does not match how you read it visually.',
        'Tables are the hardest case. The data inside the cells extracts, but the grid structure does not — rows and columns collapse into lines of text, and you lose the alignment that made the table readable. If your real goal is to pull structured data out of a table, a purpose-built PDF table-extraction tool or a spreadsheet importer will serve you far better than plain text extraction.',
      ],
    },
    {
      heading: 'Common snags and how to handle them',
      paragraphs: [
        'If you get an empty .txt from a PDF you can clearly read, it is almost certainly a scanned document — see the text-vs-scan section above and run it through OCR first. If the text comes out but with odd spacing or merged words, that usually reflects how the original PDF encoded its characters; a quick find-and-replace pass in any text editor cleans it up.',
        '"Copy is disabled" PDFs are a special case worth knowing about. Many PDFs set a flag that asks viewers to block copy-paste, but the underlying text is still there. Because pdf.js reads the text layer directly, it can often extract from these even when Ctrl+C is greyed out in a normal reader — useful when you have legitimate access to a document but the author locked the clipboard. Files up to 100MB are supported, which comfortably covers all but the largest archives.',
      ],
    },
  ],

  'docx-to-txt': [
    {
      heading: 'The hidden cost of copy-pasting from Word',
      paragraphs: [
        'Copying text straight out of Word feels like it should be harmless, but it drags along a surprising amount of invisible baggage. Word uses "smart quotes" (curly " and \' instead of straight " and \'), non-breaking spaces, em-dashes auto-substituted for hyphens, and special characters that look fine in a document but break things the moment they land somewhere strict.',
        'Paste that into a code editor, a database field, a JSON config, or a command line and you get cryptic errors — a string that will not parse, a quote that the compiler does not recognize, a space that is not really a space. Extracting clean plain text from the .docx instead strips all of that out, giving you standard, predictable UTF-8 that behaves the same everywhere.',
      ],
    },
    {
      heading: 'Why opening a .docx in a text editor does not work',
      paragraphs: [
        'People sometimes try to "just open" a .docx in Notepad or a code editor, expecting to see the words. Instead they get a wall of binary garbage or, if they unzip it, a tangle of XML tags. That is because a .docx is not a text file at all — it is a ZIP archive containing XML documents, styles, relationships, and media, all wrapped together in the Office Open XML format.',
        'To get readable text you have to parse that structure properly. This tool uses Mammoth.js, which understands the OOXML format, walks through the document body, and pulls out the actual paragraph text in order — discarding the XML scaffolding and leaving you with clean, readable lines.',
      ],
    },
    {
      heading: 'What gets kept and what gets dropped',
      paragraphs: [
        'The point of a TXT extraction is to keep the words and throw away the styling, so that is exactly what happens. Paragraph text, headings, and list items all come through, separated by line breaks so the structure stays legible. Headings appear as plain text lines; bulleted and numbered lists become simple lines you can re-format however your destination needs.',
        'What is deliberately left behind: bold, italic, colors, fonts, and sizes (formatting has no meaning in plain text), plus images, charts, embedded objects, headers, footers, and footnotes. Tables are flattened to plain-text rows rather than preserving a grid. If you need any of that visual structure, plain text is the wrong target — but for the workflows below, dropping it is the entire point.',
      ],
    },
    {
      heading: 'Feeding clean text to AI tools and LLMs',
      paragraphs: [
        'Plain text is the native language of large language models. When you want to summarize a Word report, ask questions about a contract, or have an AI rewrite a document, the cleanest input is a .txt with nothing but the words. Formatting noise — stray style codes, table markup, embedded object placeholders — can confuse the model or burn through your context window for no benefit.',
        'Extracting to TXT first also lets you see and edit exactly what the model will receive. You can delete boilerplate, trim the sections you do not care about, and paste only what matters. That produces tighter prompts and better answers than dumping a whole formatted document and hoping the tool figures out what is relevant.',
      ],
    },
    {
      heading: 'Importing into databases, CMS platforms, and scripts',
      paragraphs: [
        'Anyone who has migrated content knows the pain of pasting Word text into a CMS and watching the editor fill up with span tags, inline styles, and mso-* attributes that bloat the page and break the site\'s styling. Starting from clean plain text avoids all of it — you import words, then apply the platform\'s own formatting.',
        'The same applies to data pipelines. If you are loading document text into a database column, running a Python or shell script over it, or building a search index, plain UTF-8 is what those tools expect. A .txt extraction gives you a predictable input with no encoding surprises, which means fewer mysterious failures downstream.',
      ],
    },
    {
      heading: 'Private by design, and built for batches',
      paragraphs: [
        'Because Mammoth.js runs inside your browser, the document is never uploaded. That is reassuring for the kinds of files people commonly need to extract — legal contracts, HR documents, research drafts, internal memos. The text is parsed on your device and the .txt is generated locally; nothing is sent to a server.',
        'And when you have more than one file, batch mode handles up to twenty .docx documents at once, producing a clean .txt for each. That turns what would be a tedious open-copy-clean-paste loop into a single drop-and-download, which is exactly what you want when you are preparing a whole folder of documents for an AI tool or a content migration.',
      ],
    },
  ],
};

/* ─────────────────────────────────────────────────────────────────────────
   FULL CONTENT FOR NEW DOCUMENT TIER S PAGES
   txt-to-pdf, html-to-pdf, md-to-pdf
───────────────────────────────────────────────────────────────────────── */

export const DOCUMENT_S_NEW: Record<string, ConverterContentOverride> = {
};
