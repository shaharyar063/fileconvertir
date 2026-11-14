import type { ConverterContentOverride } from '../../types';

/**
 * Pages rewritten to describe exactly what the converters do:
 *  - image → PDF: one PDF per image (no merging)
 *  - text-based documents → PDF: plain text only (no layout or styling)
 *  - MOV/MKV → MP4: always re-encoded (never a lossless re-wrap)
 */

export const CORRECTED_PAGES: Record<string, ConverterContentOverride> = {
  'jpg-to-pdf': {
    title: 'JPG to PDF Converter — Free, No Upload',
    metaDescription:
      'Convert JPG photos to PDF in your browser. Each photo becomes its own PDF page sized to the image. Free, private and nothing is uploaded.',
    heading: 'JPG to PDF Converter',
    description:
      'Turn JPG photos into PDF files right in your browser. Each photo becomes its own PDF, and nothing is uploaded.',
    longDescription:
      'Forms, portals and email systems often want a PDF when all you have is a photo. This converter wraps each JPG in a PDF whose single page matches the picture, so the photo fills the page edge to edge. Each image produces its own PDF, and when you convert several at once they download together as a ZIP. It does not merge photos into one multi-page document, so if you need that, join the PDFs afterwards with a PDF merge tool.',
    howToSteps: [
      { name: 'Add your photos', text: 'Click "Select Files" or drop up to 20 JPG files onto the converter.' },
      { name: 'Check the output', text: 'The target is already set to PDF, so just press Convert.' },
      { name: 'Wait a moment', text: 'Each photo is read and wrapped into a PDF on your device. Large photos take a few seconds.' },
      { name: 'Download', text: 'A single file downloads directly. Several files arrive together as a ZIP, one PDF per photo.' },
    ],
    whyChooseUs: [
      { title: 'Nothing is uploaded', text: 'The PDF is built in your browser, so photos of IDs, receipts and contracts stay on your device.' },
      { title: 'Page matches the photo', text: 'Each page takes the image\'s own dimensions, so there are no margins or white bars.' },
      { title: 'Batch in one go', text: 'Convert up to 20 photos at once, at up to 100 MB each, and download them together.' },
    ],
    useCases: [
      'Turn a phone photo of a signed form or ID into a PDF for an online application',
      'Convert receipts or invoices photographed on your phone into PDFs for expenses',
      'Send a photographed document to someone who can only open PDFs',
      'Convert a folder of photos in one batch, one PDF per photo',
    ],
    faqs: [
      {
        q: 'Can I combine several JPGs into one PDF?',
        a: 'Not with this converter. Each photo becomes its own PDF. Convert them here, then join the PDFs with a PDF merge tool if you need a single multi-page file.',
      },
      {
        q: 'How is the image stored in the PDF?',
        a: 'The photo is re-saved as a JPEG at high quality (about 92%) and placed on a page of the same pixel size. There is a very small quality change compared with the original file.',
      },
      {
        q: 'Will the PDF contain selectable text?',
        a: 'No. The page is a picture, so the text in a photographed document cannot be selected or searched. This converter does not perform OCR.',
      },
      {
        q: 'What happens to the photo\'s location data?',
        a: 'It is removed. The image is redrawn and re-encoded, so EXIF details such as GPS position and camera model do not carry over to the PDF.',
      },
      {
        q: 'Is there a size limit?',
        a: 'Up to 100 MB per file and 20 files per batch. Very large photos can be limited by your device\'s memory.',
      },
    ],
    article: [
      {
        heading: 'What this converter does, and what it does not',
        paragraphs: [
          'The converter takes each JPG, draws it on a canvas in your browser and writes a PDF with one page. The page is the same size as the picture, with the photo filling it entirely. That is ideal for submitting a photographed document, because nothing is cropped or padded.',
          'It is deliberately simple. It does not reorder, merge or split pages, it does not add margins or headers, and it does not recognise text. If a portal asks for one PDF containing several photos, convert the photos here and then merge the resulting PDFs with a dedicated tool.',
        ],
      },
      {
        heading: 'Getting a readable result from a phone photo',
        paragraphs: [
          'The PDF can only be as sharp as the photo. For documents, shoot in good light, hold the phone parallel to the page and fill the frame, so that text stays crisp when the page is viewed or printed.',
          'Because every photo becomes a page the size of the image, a 12-megapixel photo produces a large page. That is fine for viewing on screen, and most printers will scale it to fit a sheet of paper.',
        ],
      },
      {
        heading: 'Privacy',
        paragraphs: [
          'Photos of identity documents, medical letters and contracts are exactly the files you should be careful with. The conversion happens entirely in your browser: the photo is read from your device, the PDF is created in memory and handed back to you as a download. Nothing is sent to a server, and there is no account to create.',
        ],
      },
    ],
    isPriority: true,
  },

  'png-to-pdf': {
    title: 'PNG to PDF Converter — Free, No Upload',
    metaDescription:
      'Convert PNG screenshots and images to PDF in your browser. One PDF per image, with transparency placed on white. Free and private, no upload.',
    heading: 'PNG to PDF Converter',
    description:
      'Turn PNG screenshots and graphics into PDF files in your browser. Each image becomes its own PDF page, and nothing is uploaded.',
    longDescription:
      'This converter wraps each PNG in a PDF whose single page matches the image size. Transparent areas are placed on a white background, because the picture is stored in the PDF as a high-quality JPEG. Each PNG produces its own PDF, and a batch downloads as a ZIP. It does not merge images into one multi-page document; for that, join the PDFs afterwards with a PDF merge tool.',
    howToSteps: [
      { name: 'Add your PNG files', text: 'Click "Select Files" or drop up to 20 PNG images onto the converter.' },
      { name: 'Press Convert', text: 'PDF is already selected as the output, so nothing else needs choosing.' },
      { name: 'Wait for the PDFs', text: 'Each image is wrapped into a PDF on your device. This takes a moment per file.' },
      { name: 'Download', text: 'One file downloads directly; several arrive together as a ZIP with one PDF per image.' },
    ],
    whyChooseUs: [
      { title: 'Private by design', text: 'Screenshots often contain personal information. Here nothing leaves your device.' },
      { title: 'Page fits the image', text: 'The PDF page is the same size as the PNG, so screenshots are shown whole with no margins.' },
      { title: 'Transparency handled', text: 'Transparent areas become white instead of turning black, which would make logos unreadable.' },
    ],
    useCases: [
      'Save a screenshot as a PDF to attach to a ticket or an email',
      'Convert a scanned page saved as PNG into a PDF for submission',
      'Turn a diagram or chart exported as PNG into a document you can print',
      'Batch-convert several screenshots, one PDF each',
    ],
    faqs: [
      {
        q: 'Can I put several PNG files into one PDF?',
        a: 'Not here. Each PNG becomes a separate PDF. Merge the PDFs afterwards with a PDF merge tool if you want one document.',
      },
      {
        q: 'Is the PNG stored losslessly in the PDF?',
        a: 'No. The image is stored in the PDF as a JPEG at about 92% quality. That is visually very close, but text in screenshots can show faint compression marks on close inspection.',
      },
      {
        q: 'What happens to transparent areas?',
        a: 'They are filled with white before the image is saved into the PDF.',
      },
      {
        q: 'Will the text in a screenshot be selectable?',
        a: 'No. The PDF holds a picture of the screenshot, not live text, and this converter does not do OCR.',
      },
      {
        q: 'What is the size limit?',
        a: 'Up to 100 MB per file and 20 files per batch.',
      },
    ],
    article: [
      {
        heading: 'One image, one PDF page',
        paragraphs: [
          'The converter reads each PNG in your browser and writes a PDF with a single page the same size as the image. A screenshot of a web page, a chart or a scanned sheet appears whole, edge to edge, with nothing cropped.',
          'Because the result is a picture on a page, it is great for showing or printing something exactly as it looked, but it is not searchable or editable text. If you need text out of a screenshot you will need an OCR tool.',
        ],
      },
      {
        heading: 'Quality and file size',
        paragraphs: [
          'Inside the PDF the image is stored as a high-quality JPEG rather than as lossless PNG data. That keeps PDFs a manageable size even for large screenshots, at the cost of tiny compression artefacts around sharp edges. For most uses the difference is invisible.',
          'If you need a perfectly lossless copy of a graphic, keep the PNG itself and attach that instead.',
        ],
      },
      {
        heading: 'Combining several images',
        paragraphs: [
          'When you convert several PNGs, you get a ZIP containing one PDF per image. To produce a single multi-page document, run those PDFs through a PDF merge tool afterwards. Keeping the steps separate keeps this converter fast, private and predictable.',
        ],
      },
    ],
    isPriority: true,
  },

  'docx-to-pdf': {
    title: 'DOCX to PDF Converter — Text Only, No Upload',
    metaDescription:
      'Convert the text of a Word DOCX file into a simple PDF in your browser. Fonts, images, tables and layout are not kept. Free and private.',
    heading: 'DOCX to PDF Converter',
    description:
      'Turn the text of a Word document into a plain PDF, privately in your browser. Formatting, images and tables are not carried over.',
    longDescription:
      'Be aware of what this does before you use it: the converter extracts the text from your Word document and sets it in a PDF in a standard font. Headings styles, fonts, colours, images, tables, headers, footers and page layout are not reproduced. It suits text-only documents such as letters, drafts and notes, or cases where you only need the words in PDF form. For a PDF that looks exactly like your document, use File > Save as PDF in Word, or Export in LibreOffice or Google Docs.',
    howToSteps: [
      { name: 'Add your DOCX', text: 'Click "Select Files" or drop up to 20 Word documents onto the converter.' },
      { name: 'Press Convert', text: 'PDF is the preset output.' },
      { name: 'Text is extracted', text: 'Your browser reads the document and pulls out its text, paragraph by paragraph.' },
      { name: 'Download the PDF', text: 'The text is laid out on A4 pages and you can download the result.' },
    ],
    whyChooseUs: [
      { title: 'Nothing leaves your device', text: 'Contracts, CVs and reports are processed locally, with no upload.' },
      { title: 'Clear about its limits', text: 'It extracts and re-sets text only, so you know exactly what you will get.' },
      { title: 'Fast for plain documents', text: 'Text-only documents convert in moments with no software to install.' },
    ],
    useCases: [
      'Make a simple, printable PDF of a letter or draft where layout does not matter',
      'Hand someone the words of a document in a format that cannot be edited by accident',
      'Archive the text content of a Word file as a PDF',
      'Check what text a document really contains',
    ],
    faqs: [
      {
        q: 'Will the PDF look like my Word document?',
        a: 'No. Only the text is carried over, set in a standard font. Fonts, bold and italic, headings styles, images, tables, headers, footers and page breaks are not reproduced.',
      },
      {
        q: 'How do I get a PDF that keeps the exact layout?',
        a: 'Export from the program that created the document: File > Save as PDF in Word, or File > Download > PDF in Google Docs. A converter that does not run Word cannot reproduce its layout.',
      },
      {
        q: 'What about images and tables?',
        a: 'Images are dropped, and the text inside tables comes out as ordinary lines of text without the grid.',
      },
      {
        q: 'Does it support older .doc files?',
        a: 'No, only .docx. Open a .doc file in Word and save it as .docx first.',
      },
      {
        q: 'Is my document uploaded?',
        a: 'No. It is read and converted inside your browser.',
      },
    ],
    article: [
      {
        heading: 'Why this converter is text-only',
        paragraphs: [
          'A DOCX file is an archive of XML describing text, styles, images and settings, and Word decides how it all lays out into pages. Reproducing that layout faithfully needs a full word-processing engine. This converter takes the simpler route: it reads the text and writes it into a PDF.',
          'That makes it quick and private, and perfectly adequate for text-based documents. It is the wrong tool when appearance matters.',
        ],
      },
      {
        heading: 'When to use it, and when not to',
        paragraphs: [
          'Use it for letters, notes, drafts, scripts and other documents whose value is in the words. Do not use it for CVs with a designed layout, reports with images and tables, or anything that must look exactly like the original.',
          'For those, exporting from Word, LibreOffice or Google Docs is the reliable route, and the PDF they produce can still be shared privately.',
        ],
      },
      {
        heading: 'What the PDF looks like',
        paragraphs: [
          'Text is set in a standard font on A4 pages with fixed margins and wrapped to the page width. The PDF font covers Latin characters, so text in other scripts may not display correctly.',
        ],
      },
    ],
    isPriority: true,
  },

  'txt-to-pdf': {
    title: 'TXT to PDF Converter — Free, No Upload',
    metaDescription:
      'Convert plain text files to PDF in your browser. Set in a monospace font on A4 pages with wrapping. Free, private and no upload required.',
    heading: 'TXT to PDF Converter',
    description:
      'Turn plain text notes, logs and code into a printable PDF right in your browser. Nothing is uploaded.',
    longDescription:
      'The converter sets your text in a monospace font on A4 pages with fixed margins, wrapping long lines and starting a new page when one fills up. Spacing and indentation are kept because every character has the same width. The built-in PDF font covers Latin characters, so text in other scripts may not display correctly. You cannot change the font, page size or margins.',
    howToSteps: [
      { name: 'Add your text file', text: 'Click "Select Files" or drop up to 20 TXT files onto the converter.' },
      { name: 'Press Convert', text: 'PDF is already set as the output.' },
      { name: 'The PDF is built', text: 'Your text is laid out on A4 pages in your browser.' },
      { name: 'Download', text: 'Save the PDF, or a ZIP of PDFs if you converted several files.' },
    ],
    whyChooseUs: [
      { title: 'Spacing stays put', text: 'A monospace font keeps columns, indentation and ASCII tables lined up.' },
      { title: 'Private', text: 'Logs and notes are processed in your browser and never uploaded.' },
      { title: 'No setup', text: 'There is nothing to install and no options to configure.' },
    ],
    useCases: [
      'Turn a log or export into a PDF to attach to a ticket',
      'Make a README or set of instructions printable',
      'Archive notes as a fixed, non-editable document',
      'Print plain text with predictable page breaks',
    ],
    faqs: [
      {
        q: 'Can I change the font, size or margins?',
        a: 'No. The PDF uses a fixed monospace font at 10 pt on A4 with set margins.',
      },
      {
        q: 'What about very long lines?',
        a: 'They wrap onto the next line. That preserves every character, but it can disturb the alignment of very wide tables.',
      },
      {
        q: 'Why do some characters look wrong?',
        a: 'The built-in PDF fonts only cover Latin characters. Other scripts and some symbols may be missing or garbled.',
      },
      {
        q: 'Does it add page numbers or headers?',
        a: 'No. The PDF contains your text only.',
      },
    ],
    article: [
      {
        heading: 'A plain, predictable layout',
        paragraphs: [
          'Plain text has no page size, margins or font, so every program shows it differently. Converting it to PDF fixes that: your text is set in a monospace font on A4 pages, and the result looks the same on every device and prints the same way.',
          'Lines that are too wide for the page wrap to the next line, and when a page is full the text continues on a new one.',
        ],
      },
      {
        heading: 'Code, logs and tables',
        paragraphs: [
          'Because every character occupies the same width, indentation and columns of aligned text stay aligned. Long lines of code or very wide tables will wrap, which can break alignment. If you need syntax highlighting or line numbers, export from your code editor instead.',
        ],
      },
      {
        heading: 'Character support',
        paragraphs: [
          'The PDF uses a built-in font that covers Latin characters. Text in Arabic, Chinese, Cyrillic or other scripts may not display correctly in the result, so check the PDF before relying on it.',
        ],
      },
    ],
    isPriority: true,
  },

  'html-to-pdf': {
    title: 'HTML to PDF Converter — Text Only, No Upload',
    metaDescription:
      'Convert an HTML file to a PDF of its text in your browser. Styling, images and scripts are not rendered. Free, private and no upload.',
    heading: 'HTML to PDF Converter',
    description:
      'Convert an HTML file into a PDF containing its readable text. The page is not rendered, so styling and images are not kept.',
    longDescription:
      'This converter parses the HTML, removes scripts and styles, and sets the remaining text in a PDF. It does not render the page like a browser would: CSS, images, web fonts and layout are all ignored, and you get the words in reading order with line breaks between blocks. It suits saved articles, exported emails and similar text-based content. If you need a PDF that looks like the page, use your browser\'s Print to PDF instead.',
    howToSteps: [
      { name: 'Add your HTML file', text: 'Click "Select Files" or drop up to 20 HTML files onto the converter.' },
      { name: 'Press Convert', text: 'PDF is the preset output.' },
      { name: 'Text is extracted', text: 'Scripts and styles are removed and the readable text is collected block by block.' },
      { name: 'Download', text: 'The text is laid out on A4 pages and ready to save.' },
    ],
    whyChooseUs: [
      { title: 'Scripts never run', text: 'The file is read as text and nothing in it is executed.' },
      { title: 'Private', text: 'The HTML stays on your device throughout.' },
      { title: 'Honest about scope', text: 'It gives you the page\'s text, not a picture of the page.' },
    ],
    useCases: [
      'Make a text-only PDF of a saved article or exported email',
      'Pull the readable content out of an HTML export',
      'Archive the words of a page without scripts or styling',
    ],
    faqs: [
      {
        q: 'Will the PDF look like the web page?',
        a: 'No. CSS, images, fonts and layout are not rendered. Use your browser\'s Print to PDF (or Save as PDF) when you need the visual appearance.',
      },
      {
        q: 'Are images included?',
        a: 'No. Only text is converted, whether the images are embedded or linked.',
      },
      {
        q: 'Does it run the page\'s JavaScript?',
        a: 'No. The file is parsed as text, and script and style content is discarded.',
      },
      {
        q: 'Can I convert a web address?',
        a: 'No. Save the page as an HTML file first, then drop the file into the converter.',
      },
    ],
    article: [
      {
        heading: 'Text, not a screenshot of the page',
        paragraphs: [
          'A browser turns HTML into a visual page using stylesheets, fonts, images and scripts. This converter does none of that. It reads the markup, throws away scripts and styles, and keeps the text, putting line breaks between paragraphs, headings and list items.',
          'The result is a clean, readable PDF of the content. It is not a visual copy of the page.',
        ],
      },
      {
        heading: 'When your browser is the better tool',
        paragraphs: [
          'If you want the page as you see it, open it in your browser and choose Print, then Save as PDF. That uses the browser\'s own rendering engine, so layout, images and fonts come through. This converter is for the cases where you only need the words.',
        ],
      },
      {
        heading: 'What happens to the text',
        paragraphs: [
          'The text is set in a standard font on A4 pages and wrapped to the page width. Scripts, styles and hidden template content are removed first. Characters outside the Latin range may not display correctly in the PDF.',
        ],
      },
    ],
    isPriority: true,
  },

  'md-to-pdf': {
    title: 'Markdown to PDF Converter — Free, No Upload',
    metaDescription:
      'Convert Markdown files to a plain-text PDF in your browser. Markup is removed and headings are not styled. Free, private and no upload.',
    heading: 'Markdown to PDF Converter',
    description:
      'Convert a Markdown file into a PDF of its text in your browser. The markup is stripped; headings and code are not styled.',
    longDescription:
      'The converter removes the Markdown syntax (heading hashes, emphasis marks, link markup and code fences) and sets the remaining text in a PDF. It keeps the contents of code blocks, but headings are not made larger, lists become plain dashed lines, and there is no syntax highlighting or table formatting. It is a readable, printable copy of your text rather than a rendered document. For a styled result, render the Markdown to HTML first and print that to PDF from your browser.',
    howToSteps: [
      { name: 'Add your Markdown file', text: 'Click "Select Files" or drop up to 20 .md files onto the converter.' },
      { name: 'Press Convert', text: 'PDF is the preset output.' },
      { name: 'Markup is stripped', text: 'Headings, emphasis, links and fences are removed, leaving the text.' },
      { name: 'Download', text: 'The text is laid out on A4 pages and you can save the PDF.' },
    ],
    whyChooseUs: [
      { title: 'Private', text: 'Notes and documentation stay on your device.' },
      { title: 'Keeps your code', text: 'The contents of fenced code blocks are preserved in the output.' },
      { title: 'Clear expectations', text: 'It produces a plain readable copy, not a styled document.' },
    ],
    useCases: [
      'Give someone a printable copy of a README or set of notes',
      'Read the text of a Markdown file without the syntax around it',
      'Archive notes in a format anyone can open',
    ],
    faqs: [
      {
        q: 'Will headings and bold text be styled in the PDF?',
        a: 'No. The markup is removed and all text is set in one standard style. Headings and bold text look like ordinary text.',
      },
      {
        q: 'How do I get a styled PDF from Markdown?',
        a: 'Convert the Markdown to HTML (this site can do that), open the HTML in your browser and use Print, then Save as PDF. That keeps headings, lists and code formatting.',
      },
      {
        q: 'What happens to code blocks and tables?',
        a: 'The text inside code blocks is kept, without fences or highlighting. Tables lose their structure and come out as lines of text.',
      },
      {
        q: 'Are images included?',
        a: 'No. Image syntax is reduced to its alt text.',
      },
    ],
    article: [
      {
        heading: 'A text copy, not a rendered document',
        paragraphs: [
          'Markdown is a way of writing structured text, and programs turn it into styled pages. This converter does not do that styling. It strips the syntax and sets what remains in a PDF, so you get the words in a clean, printable form.',
          'Headings are not enlarged and lists are plain lines starting with a dash. If appearance matters, render the Markdown to HTML and print that to PDF from your browser.',
        ],
      },
      {
        heading: 'Code blocks',
        paragraphs: [
          'The content of fenced code blocks is kept, which makes this useful for documentation that includes commands or snippets. The code is not set in a monospace font or highlighted in the PDF, so indentation may not line up the way it does in your editor.',
        ],
      },
      {
        heading: 'Going further',
        paragraphs: [
          'For a polished PDF with headings, tables and code formatting, convert the Markdown to HTML and use your browser\'s Print to PDF, or use a Markdown tool with a PDF export. This page is for quickly getting a plain copy without installing anything.',
        ],
      },
    ],
    isPriority: true,
  },

  'mov-to-mp4': {
    title: 'MOV to MP4 Converter — Free, No Upload',
    metaDescription:
      'Convert MOV videos to MP4 in your browser. Re-encodes to H.264 for wide compatibility. Free and private, no upload, files up to 100 MB.',
    heading: 'MOV to MP4 Converter',
    description:
      'Convert MOV videos from iPhones and Macs into MP4 that plays almost anywhere. Everything runs in your browser.',
    longDescription:
      'MOV is Apple\'s QuickTime container, and MP4 is the format nearly every phone, TV, browser and editor accepts. This converter re-encodes the video to H.264 with AAC audio using FFmpeg running in your browser. Because it re-encodes rather than just re-wrapping the file, conversion takes real time, the result is smaller, and there is some quality loss compared with the original. Files can be up to 100 MB.',
    howToSteps: [
      { name: 'Add your MOV file', text: 'Click "Select Files" or drop MOV videos onto the converter. Each file can be up to 100 MB.' },
      { name: 'Press Convert', text: 'MP4 is the preset output. The first conversion downloads the converter engine (about 30 MB).' },
      { name: 'Wait for the encode', text: 'The video is re-encoded in your browser. Longer clips take longer, and progress is shown.' },
      { name: 'Download the MP4', text: 'Save the finished file, or a ZIP if you converted several.' },
    ],
    whyChooseUs: [
      { title: 'No upload', text: 'Personal videos are processed on your device and never sent to a server.' },
      { title: 'Plays everywhere', text: 'H.264 video with AAC audio is accepted by virtually every device and platform.' },
      { title: 'No software to install', text: 'It runs in the browser, so there is nothing to download except the converter engine.' },
    ],
    useCases: [
      'Share an iPhone video with someone on Windows or Android',
      'Upload a clip to a site that rejects MOV files',
      'Shrink a short recording for email or messaging',
      'Prepare footage for an editor that works best with MP4',
    ],
    faqs: [
      {
        q: 'Is the conversion lossless?',
        a: 'No. The video is always re-encoded to H.264, using fast settings that keep browser memory use low. The file is smaller and plays widely, but quality is somewhat lower than the original.',
      },
      {
        q: 'Why does it take a while?',
        a: 'Re-encoding video is demanding, and it runs in your browser on a single thread using WebAssembly, which is slower than desktop software. Short clips take a short time; longer ones take minutes.',
      },
      {
        q: 'What is the file size limit?',
        a: 'Up to 100 MB per file. Longer iPhone recordings are often bigger than that, so trim them first.',
      },
      {
        q: 'Will it work on my phone?',
        a: 'It can, but phones have less memory. Short clips usually work; long or high-resolution ones may fail.',
      },
      {
        q: 'Do I need to install anything?',
        a: 'No. The first video or audio conversion downloads the converter engine, about 30 MB, which your browser then reuses.',
      },
    ],
    article: [
      {
        heading: 'Why MOV files cause trouble',
        paragraphs: [
          'iPhones and Macs record in MOV, and they play smoothly across Apple software. Outside that world, support is patchier: some Windows programs, TVs, social sites and editors refuse MOV files or play them badly, particularly when the video inside uses newer codecs.',
          'MP4 with H.264 video and AAC audio is the safest choice for sharing, which is why people convert.',
        ],
      },
      {
        heading: 'Re-encoding, not re-wrapping',
        paragraphs: [
          'Some desktop tools can change the container without touching the video, which is fast and lossless. This converter does not do that. It decodes the video and encodes it again as H.264 with settings chosen for speed and low memory use in a browser.',
          'The result plays everywhere, and the file is usually smaller, but you give up some quality. If you need an exact, lossless copy, use a desktop tool such as FFmpeg that can copy the streams as they are.',
        ],
      },
      {
        heading: 'Limits to know about',
        paragraphs: [
          'Conversion runs entirely on your device, so its speed depends on your computer. Files are limited to 100 MB, and long or high-resolution clips may exceed what a browser can handle. If a conversion fails, try trimming the clip first.',
        ],
      },
    ],
    isPriority: true,
  },

  'mkv-to-mp4': {
    title: 'MKV to MP4 Converter — Free, No Upload',
    metaDescription:
      'Convert MKV videos to MP4 in your browser for TVs, phones and editors. Re-encodes to H.264. Free, private, no upload, files up to 100 MB.',
    heading: 'MKV to MP4 Converter',
    description:
      'Convert MKV videos to MP4 so they play on more devices. Conversion runs in your browser and nothing is uploaded.',
    longDescription:
      'MKV (Matroska) files often will not play on TVs, iPhones and many editors. This converter re-encodes the video to H.264 with AAC audio inside an MP4, using FFmpeg in your browser. It re-encodes rather than just re-wrapping the streams, so it takes real time and costs some quality. Only one video and one audio track are kept: extra audio tracks are dropped and subtitles are not guaranteed to survive. Files can be up to 100 MB.',
    howToSteps: [
      { name: 'Add your MKV file', text: 'Click "Select Files" or drop MKV videos onto the converter, up to 100 MB each.' },
      { name: 'Press Convert', text: 'MP4 is preset. The first conversion downloads the converter engine, about 30 MB.' },
      { name: 'Wait for the encode', text: 'The video is re-encoded in your browser, with progress shown.' },
      { name: 'Download', text: 'Save the MP4, or a ZIP if you converted several files.' },
    ],
    whyChooseUs: [
      { title: 'No upload', text: 'Your videos are converted on your device, not on a server.' },
      { title: 'Widely playable output', text: 'H.264 video and AAC audio in an MP4 plays on nearly every device.' },
      { title: 'Plain about limits', text: 'It tells you up front that it re-encodes and keeps one video and one audio track.' },
    ],
    useCases: [
      'Play an MKV on a TV, iPhone or other device that does not support Matroska',
      'Import MKV footage into an editor that expects MP4',
      'Shrink a short clip for sharing',
    ],
    faqs: [
      {
        q: 'Is it lossless?',
        a: 'No. The video is re-encoded to H.264, so some quality is lost. A desktop tool that only changes the container, such as MKVToolNix or FFmpeg with stream copy, can avoid that.',
      },
      {
        q: 'Are subtitles and extra audio tracks kept?',
        a: 'Only one video and one audio track are kept, so extra audio tracks are dropped. Subtitles are not guaranteed to carry over, so check the result.',
      },
      {
        q: 'Why is it slow?',
        a: 'It re-encodes in your browser on a single thread using WebAssembly, which is much slower than desktop software.',
      },
      {
        q: 'What is the size limit?',
        a: 'Up to 100 MB per file. Most full-length films are far larger, so this suits short clips.',
      },
    ],
    article: [
      {
        heading: 'Why convert MKV to MP4',
        paragraphs: [
          'Matroska is an excellent container that can hold many audio and subtitle tracks, which is why it is common for downloaded and ripped video. The catch is device support: many TVs, iPhones, game consoles and editors will not open it.',
          'MP4 with H.264 video and AAC audio is the format those devices expect.',
        ],
      },
      {
        heading: 'What this converter does',
        paragraphs: [
          'It decodes the video and encodes it again as H.264, with AAC audio, using FFmpeg compiled to run in your browser. It keeps one video and one audio track. Extra audio tracks are dropped, and subtitles may not carry over, so if you rely on them check the output or keep a separate subtitle file.',
          'Because it re-encodes, conversion takes real time and some quality is lost. If you need the original quality, a desktop tool that copies the streams into an MP4 without re-encoding is faster and lossless.',
        ],
      },
      {
        heading: 'Size and speed limits',
        paragraphs: [
          'Everything runs on your device in a single browser thread, so speed depends on your computer. Files are limited to 100 MB, which suits clips rather than full films. For long videos, a desktop tool is the better choice.',
        ],
      },
    ],
    isPriority: true,
  },
};
