import type { FormatSEO } from '../types';

/** Format pages for rich-text, spreadsheet-text, font and archive formats, plus extra audio and document targets. */

export const MORE_SOURCE_HUBS: Record<string, FormatSEO> = {
  jpeg: {
    title: 'JPEG Converter Online — Convert JPEG to PNG, WebP, PDF',
    metaDescription:
      'Free online JPEG converter. Convert .jpeg photos to PNG, WebP, GIF, BMP, TIFF, ICO, SVG or PDF in your browser, with no upload or sign-up needed.',
    heading: 'JPEG File Converter',
    description:
      'Free online JPEG converter: convert .jpeg photos to PNG, WebP, GIF, BMP, TIFF, ICO, SVG or PDF in your browser with no upload or sign-up.',
    details:
      'JPEG stands for the Joint Photographic Experts Group, the committee that published the format in 1992. It compresses photographs by discarding detail the eye is unlikely to miss, and it is the default output of cameras and phones.',
    longDescription:
      'A file ending in .jpeg is the same format as one ending in .jpg; the longer extension survives from systems that allowed four letters. Every conversion here treats them identically. Lossless targets such as PNG, BMP and TIFF stop further quality loss but cannot restore what JPEG already removed, WebP shrinks the file for the web, and PDF wraps the photo in a page. ICO scales the picture into an icon.',
    useCases: [
      'Save a .jpeg as PNG before editing it several times',
      'Shrink photos for a website by converting them to WebP',
      'Attach a photographed document as a PDF',
    ],
    faqs: [
      { q: 'Is .jpeg different from .jpg?', a: 'No. They are two spellings of the same format.' },
      { q: 'Which target keeps the most quality?', a: 'PNG, TIFF and BMP store the decoded pixels without further loss.' },
      { q: 'Can JPEG be converted to an animated GIF?', a: 'No. GIFs made here are single still images.' },
    ],
  },

  rtf: {
    title: 'RTF Converter Online — Convert RTF to TXT, PDF, DOCX',
    metaDescription:
      'Free online RTF converter. Convert Rich Text Format files to TXT, PDF, HTML or DOCX in your browser, with no upload or sign-up. Text is kept; layout is not.',
    heading: 'RTF File Converter',
    description:
      'Free online RTF converter: convert Rich Text Format files to TXT, PDF, HTML or DOCX in your browser with no upload. Text and accents are kept; layout is not.',
    details:
      'RTF, Rich Text Format, was introduced by Microsoft in 1987 as a way to move formatted text between word processors. The file is plain text with backslash codes for fonts, sizes, bold and paragraphs, which is why Notepad, WordPad, TextEdit and Word can all open it.',
    longDescription:
      'The converter reads those codes, drops the formatting ones and keeps the words, including accented characters and text that was bold or italic. Paragraph breaks and tabs are preserved. The output is plain: fonts, colours, tables\' borders and images are not carried to TXT, PDF, HTML or DOCX. When you need the document to look the same elsewhere, open it in Word or LibreOffice and save from there.',
    useCases: [
      'Read an old RTF on a device with no word processor',
      'Turn a template or letter into plain text for another system',
      'Make a PDF or DOCX copy of the wording of an RTF',
    ],
    faqs: [
      { q: 'Are accented letters kept?', a: 'Yes, the escape codes used for them are decoded to the real characters.' },
      { q: 'Does it keep bold and fonts?', a: 'No, the words are kept and the styling is dropped.' },
      { q: 'Does it extract images from RTF?', a: 'No. Pictures embedded in the file are skipped.' },
    ],
  },

  csv: {
    title: 'CSV Converter Online — Convert CSV to HTML, PDF, TXT',
    metaDescription:
      'Free online CSV converter. Turn comma-separated files into an HTML table, a PDF or a TXT file in your browser, with no upload or sign-up. Quoted fields work.',
    heading: 'CSV File Converter',
    description:
      'Free online CSV converter: turn comma-separated files into an HTML table, a PDF or a TXT file in your browser, with no upload or sign-up needed.',
    details:
      'CSV, comma-separated values, is the simplest way to move table data between programs. Each line is a row and commas separate the cells, so a spreadsheet, a database export and a script can all read the same file. There is no formatting, no formulas and no sheets, only values.',
    longDescription:
      'The CSV to HTML converter parses the file properly, handling quoted fields that contain commas or line breaks, and writes a page with a table whose first row is the header. CSV to PDF prints the raw text in a monospace font, and CSV to TXT keeps the data unchanged under a text extension. Only comma-separated files are read; semicolon or tab-separated exports should be saved with commas first.',
    useCases: [
      'Show an exported spreadsheet as a table on a web page',
      'Print the rows of a small data export as a PDF',
      'Open a CSV in a text editor instead of a spreadsheet to avoid reformatting',
    ],
    faqs: [
      { q: 'Does it support semicolon or tab separated files?', a: 'No. Only commas are recognised as separators.' },
      { q: 'Which row becomes the table header?', a: 'The first row of the file.' },
      { q: 'Can it convert CSV to Excel?', a: 'No. There is no XLSX output on this site.' },
    ],
  },

  odt: {
    title: 'ODT Converter Online — Convert ODT to TXT, PDF, HTML',
    metaDescription:
      'Free online ODT converter. Convert OpenDocument text files from LibreOffice to TXT, PDF, HTML or Markdown in your browser, with no upload or sign-up.',
    heading: 'ODT File Converter',
    description:
      'Free online ODT converter: convert LibreOffice and OpenOffice text documents to TXT, PDF, HTML or Markdown in your browser with no upload or sign-up.',
    details:
      'ODT is the OpenDocument Text format, the default for LibreOffice Writer and Apache OpenOffice and an ISO standard since 2006. Inside the file is a ZIP archive holding XML for the content, styles and any images, which is why it can be read without the program that made it.',
    longDescription:
      'The converter opens that archive, reads the document body and extracts the words, with paragraphs and headings separated by blank lines. That text becomes the TXT, the PDF pages, the preformatted HTML or the Markdown file. Fonts, images, table borders, headers and footers are not reproduced. For a PDF that looks like the original, use LibreOffice\'s own export.',
    useCases: [
      'Read an ODT on a computer without LibreOffice',
      'Pull the text of a document into another tool or script',
      'Make a quick plain PDF of a LibreOffice letter or note',
    ],
    faqs: [
      { q: 'Is this the same as exporting from LibreOffice?', a: 'No. LibreOffice keeps layout, while this converter keeps only the text.' },
      { q: 'Are images and tables converted?', a: 'No, only the words are extracted.' },
      { q: 'Does it read .doc or .docx?', a: 'No, ODT files only. DOCX has its own converter.' },
    ],
  },

  ttf: {
    title: 'TTF Converter Online — Convert TTF to WOFF Free',
    metaDescription:
      'Free online TTF converter. Convert TrueType fonts to WOFF for the web in your browser, with no upload or sign-up. The font itself is not changed.',
    heading: 'TTF Font Converter',
    description:
      'Free online TTF converter: convert TrueType fonts to WOFF for websites in your browser with no upload or sign-up. The glyphs and features stay identical.',
    details:
      'TTF, TrueType, is a font format developed by Apple and licensed to Microsoft in the late 1980s. Glyphs are described by quadratic curves, and the format is installed natively on Windows, macOS, Linux and Android. It was designed for operating systems, not for downloading over a network.',
    longDescription:
      'Converting to WOFF compresses each table of the font and wraps it for browsers, which makes the file smaller to download. The font itself is not edited: outlines, kerning, hinting and OpenType features are identical. Converting TTF to OTF is not offered, because changing outline type would mean redrawing every glyph. Always check that the font licence allows web use.',
    useCases: [
      'Self-host a font on your website with @font-face',
      'Reduce the download size of a custom font',
      'Package a font as a WOFF for a theme that requires it',
    ],
    faqs: [
      { q: 'Does converting change how the font looks?', a: 'No. The glyph data is copied exactly.' },
      { q: 'Why is there no TTF to OTF option?', a: 'It would mean converting curve types, which is a lossy rebuild this tool does not do.' },
      { q: 'Can I produce WOFF2?', a: 'No, this writes WOFF 1.0.' },
    ],
  },

  otf: {
    title: 'OTF Converter Online — Convert OTF to WOFF Free',
    metaDescription:
      'Free online OTF converter. Convert OpenType fonts to WOFF for the web in your browser, with no upload or sign-up. Features and outlines stay unchanged.',
    heading: 'OTF Font Converter',
    description:
      'Free online OTF converter: convert OpenType fonts to WOFF for websites in your browser with no upload or sign-up. Outlines and features stay unchanged.',
    details:
      'OTF, OpenType, was developed by Microsoft and Adobe in the 1990s as a successor to both TrueType and PostScript fonts. An OTF holds either PostScript-style CFF outlines or TrueType outlines, plus layout features such as ligatures, small capitals and alternates.',
    longDescription:
      'The converter compresses the font tables and wraps them as WOFF, so a browser downloads less. Because nothing is redrawn, every OpenType feature in the original is present in the result. Compact CFF fonts shrink less than TrueType fonts do. There is no OTF to TTF option, since that would require converting the outlines, which this tool does not attempt.',
    useCases: [
      'Bring a licensed desktop typeface onto a website',
      'Satisfy a theme or platform that only takes WOFF',
      'Keep ligatures and alternates working in a web font',
    ],
    faqs: [
      { q: 'Are OpenType features kept in the WOFF?', a: 'Yes, all tables are copied intact.' },
      { q: 'Why is the saving smaller than for TTF?', a: 'CFF outlines are already compact.' },
      { q: 'Can I convert OTF to TTF?', a: 'No, changing outline type is not supported.' },
    ],
  },

  woff: {
    title: 'WOFF Converter Online — Convert WOFF to TTF, OTF Free',
    metaDescription:
      'Free online WOFF converter. Unwrap a web font to TTF or OTF for installing, in your browser with no upload or sign-up. The font itself is not changed.',
    heading: 'WOFF Font Converter',
    description:
      'Free online WOFF converter: unwrap a web font to TTF or OTF for installing, in your browser with no upload or sign-up. The font itself is not changed.',
    details:
      'WOFF, the Web Open Font Format, became a W3C recommendation in 2012. It is not a new type of font but a compressed wrapper around a TrueType or OpenType font, designed so browsers download less. Operating systems do not install it.',
    longDescription:
      'The converter decompresses each table and restores the original font. Which format you get depends on what was inside: TrueType outlines give a TTF, and PostScript (CFF) outlines give an OTF. If you pick the wrong one, the converter says so rather than writing a mislabelled file. WOFF2, the newer format, is not supported as input.',
    useCases: [
      'Install a font you only have as a web file',
      'Open a web font in a design or editing program',
      'Recover the original font file from a site export',
    ],
    faqs: [
      { q: 'How do I know whether to choose TTF or OTF?', a: 'Try one. If it is wrong, the message tells you which one the font needs.' },
      { q: 'Does it support WOFF2?', a: 'No, only WOFF 1.0 files.' },
      { q: 'Is the font altered?', a: 'No. The tables are only decompressed.' },
    ],
  },

  zip: {
    title: 'ZIP Converter Online — Convert ZIP to TAR, GZ Free',
    metaDescription:
      'Free online ZIP converter. Repack the files in a ZIP into a TAR or TAR.GZ archive in your browser, with no upload or sign-up. Folders are flattened.',
    heading: 'ZIP File Converter',
    description:
      'Free online ZIP converter: repack the files in a ZIP into a TAR or TAR.GZ archive in your browser with no upload or sign-up. Folders are flattened.',
    details:
      'ZIP, created by Phil Katz in 1989, compresses each file separately and stores them in one archive with an index at the end. Windows, macOS and Linux open it without extra software, and it is the default choice for emailing a group of files.',
    longDescription:
      'The converter opens your ZIP, reads the files and writes them into a TAR, which joins files without compressing them, or into a .tar.gz, which gzip-compresses the TAR. Those are the formats Linux tools and software releases use. Folder paths are flattened, identical names are renumbered, and password-protected archives cannot be read. To make a ZIP from other files, use the converter for that file type.',
    useCases: [
      'Hand files to a Linux build, script or server in its usual format',
      'Prepare a ZIP\'s contents for another compressor',
      'Create a .tar.gz from a ZIP you received',
    ],
    faqs: [
      { q: 'Does it support encrypted ZIPs?', a: 'No.' },
      { q: 'Are folders preserved?', a: 'No. All files are placed at one level.' },
      { q: 'Why does GZ produce a .tar.gz?', a: 'Gzip compresses a single stream, so several files are tarred first.' },
    ],
  },

  tar: {
    title: 'TAR Converter Online — Convert TAR to ZIP, GZ Free',
    metaDescription:
      'Free online TAR converter. Repack the files from a TAR archive into a ZIP or TAR.GZ in your browser, with no upload or sign-up. Folders are flattened.',
    heading: 'TAR File Converter',
    description:
      'Free online TAR converter: repack the files from a TAR archive into a ZIP or TAR.GZ in your browser with no upload or sign-up. Folders are flattened.',
    details:
      'TAR, short for tape archive, dates back to 1979 and Unix. It simply joins files end to end with a header before each, and does no compression, which is why TAR is nearly always paired with gzip. It stores permissions and links that ZIP does not.',
    longDescription:
      'The converter reads the regular files from your TAR and rewrites them as a compressed ZIP, which opens on any computer, or as a gzip-compressed TAR. Permissions, symbolic links and empty folders are not carried across, folder paths are flattened and duplicate names are renumbered. Keep the original TAR if those details matter.',
    useCases: [
      'Make a Linux backup openable on Windows',
      'Compress an uncompressed TAR to save space',
      'Send a TAR to someone who expects a ZIP',
    ],
    faqs: [
      { q: 'Are permissions kept?', a: 'No, only file names and contents are copied.' },
      { q: 'Does it read .tar.gz files?', a: 'Use the GZ converter for those.' },
      { q: 'Why is the ZIP smaller than the TAR?', a: 'ZIP compresses the files and TAR does not.' },
    ],
  },

  gz: {
    title: 'GZ Converter Online — Convert GZ to ZIP, TAR Free',
    metaDescription:
      'Free online GZ converter. Unpack a gzip or TAR.GZ file into a ZIP or plain TAR in your browser, with no upload or sign-up needed. 100 MB per file.',
    heading: 'GZ File Converter',
    description:
      'Free online GZ converter: unpack a gzip or TAR.GZ file into a ZIP or plain TAR in your browser with no upload or sign-up. Up to 100 MB per file.',
    details:
      'GZ is the gzip format, written by Jean-loup Gailly and Mark Adler in 1992 as a free replacement for Unix compress. It compresses a single stream of data, so a collection of files has to be put in a TAR first, giving the familiar .tar.gz.',
    longDescription:
      'The converter decompresses the gzip and checks what is inside. A .tar.gz yields its files, which are repacked into a ZIP or a plain TAR. A plain .gz holding one file keeps that file under its original name. Damaged or truncated gzip data gives an error. Folder paths are flattened, so check the result if directories matter.',
    useCases: [
      'Open a .tar.gz download on a Windows computer',
      'Decompress a log file archive and send it as a ZIP',
      'Get a plain TAR for a tool that cannot read gzip',
    ],
    faqs: [
      { q: 'Does it handle both .gz and .tar.gz?', a: 'Yes. The converter detects whether a TAR is inside.' },
      { q: 'What if the file is corrupted?', a: 'The converter shows an error saying the gzip could not be read.' },
      { q: 'Are folder structures kept?', a: 'No, files are placed at one level.' },
    ],
  },
};

export const MORE_TARGET_HUBS: Record<string, FormatSEO> = {
  html: {
    title: 'Convert to HTML Online — From DOCX, MD, CSV, TXT',
    metaDescription:
      'Convert to HTML online for free. Turn DOCX, Markdown, CSV, TXT, RTF or ODT files into a web page in your browser, with no upload or sign-up needed.',
    heading: 'Convert to HTML',
    description:
      'Convert to HTML online: turn DOCX, Markdown, CSV, TXT, RTF or ODT files into a web page in your browser, free, with no upload or sign-up.',
    details:
      'HTML is the markup language of web pages. Headings, paragraphs, lists, links and tables are tagged so a browser can display them on any device, and the same file can be styled, indexed by search engines and read by screen readers.',
    longDescription:
      'What you get depends on the source. DOCX keeps its structure, with headings, bold, lists, tables and pictures turned into real elements. Markdown becomes valid blocks, and CSV becomes a table with a header row. TXT, RTF and ODT sources have no structure to map, so their text is placed in a preformatted block. Each page includes a small stylesheet that you can remove.',
    useCases: [
      'Publish a Word document or Markdown notes on a website',
      'Show an exported CSV as a readable table',
      'Share a document with someone who only has a browser',
    ],
    faqs: [
      { q: 'Which sources produce real headings and lists?', a: 'DOCX and Markdown. TXT, RTF and ODT produce preformatted text.' },
      { q: 'Is the HTML safe to publish?', a: 'Yes. Text is escaped, and links must be http or https.' },
      { q: 'Can I convert PDF to HTML?', a: 'No. PDF to HTML is not available.' },
    ],
  },

  md: {
    title: 'Convert to Markdown Online — From DOCX, HTML, TXT',
    metaDescription:
      'Convert to Markdown online for free. Turn DOCX or HTML into Markdown with headings, lists and links kept, in your browser with no upload or sign-up.',
    heading: 'Convert to Markdown',
    description:
      'Convert to Markdown online: turn DOCX or HTML into Markdown with headings, lists and links kept, free, in your browser with no upload or sign-up.',
    details:
      'Markdown is a lightweight writing syntax: hashes mark headings, asterisks mark emphasis, dashes make lists and brackets make links. Because it is plain text, it works in any editor, diffs cleanly in version control and is the standard for READMEs, wikis and documentation sites.',
    longDescription:
      'Conversions from DOCX and HTML read the document structure and write the equivalent Markdown, including pipe tables. Images are left out, and fonts, colours and layout have no Markdown form. TXT and ODT sources contain no structure to translate, so the file is saved with the text unchanged and a .md extension. Headings in a Word file convert only if they use Word\'s Heading styles.',
    useCases: [
      'Move a Word document into a docs site or repository',
      'Turn a web page\'s HTML into notes',
      'Import documents into a Markdown-based notes app',
    ],
    faqs: [
      { q: 'Why did my headings not convert?', a: 'Word headings convert only when they use the Heading styles. Hand-formatted bold text stays a paragraph.' },
      { q: 'Are images included?', a: 'No, they are left out.' },
      { q: 'Does it convert PDF to Markdown?', a: 'No.' },
    ],
  },

  docx: {
    title: 'Convert to DOCX Online — From TXT, HTML, MD, RTF',
    metaDescription:
      'Convert to DOCX online for free. Turn TXT, HTML, Markdown or RTF files into a Word document in your browser, with no upload or sign-up. Text only.',
    heading: 'Convert to DOCX',
    description:
      'Convert to DOCX online: turn TXT, HTML, Markdown or RTF files into a Word document in your browser, free, with no upload or sign-up. Text only.',
    details:
      'DOCX is the Word document format used since Office 2007. It is a ZIP archive of XML, which makes it open standard and readable by Word, LibreOffice, Google Docs and Pages.',
    longDescription:
      'The DOCX files created here are plain: the source text is written paragraph by paragraph in Word\'s default style. Headings, bold text, tables and images from HTML, Markdown or RTF are not carried over. That makes the output a clean starting point to restyle, or a way to meet an upload form that insists on DOCX.',
    useCases: [
      'Satisfy a portal that only accepts Word files',
      'Start a Word document from text you already have',
      'Move text out of an old RTF into a modern format',
    ],
    faqs: [
      { q: 'Does the DOCX keep my headings and bold text?', a: 'No. The output is plain paragraphs.' },
      { q: 'Can I convert PDF to DOCX?', a: 'No.' },
      { q: 'Will it open in Google Docs?', a: 'Yes, like any DOCX.' },
    ],
  },

  aac: {
    title: 'Convert to AAC Online — MP3, WAV, OGG, FLAC to AAC',
    metaDescription:
      'Convert to AAC online for free. Turn MP3, WAV, OGG, FLAC or M4A audio into an AAC stream in your browser, with no upload or sign-up. 100 MB per file.',
    heading: 'Convert to AAC',
    description:
      'Convert to AAC online: turn MP3, WAV, OGG, FLAC or M4A audio into an AAC stream in your browser, free, with no upload or sign-up needed.',
    details:
      'AAC, Advanced Audio Coding, was standardised in 1997 as the successor to MP3. At the same bitrate it generally sounds better, which is why it is used by YouTube, Apple Music and most broadcast streaming.',
    longDescription:
      'The AAC files made here are raw streams in the .aac format, written with FFmpeg\'s default encoder settings. A raw stream has no container, so it carries no title or artist tags and seeking is limited. Lossy sources such as MP3 and OGG are compressed a second time, which costs a little quality. For files that Apple devices open and tag, convert to M4A instead.',
    useCases: [
      'Feed an AAC-only tool, game engine or video workflow',
      'Compress a WAV or FLAC recording into a small file',
      'Test how a track sounds in AAC',
    ],
    faqs: [
      { q: 'What is the difference between AAC and M4A?', a: 'M4A is AAC audio in an MP4 container, with tags and better seeking.' },
      { q: 'Can I choose the bitrate?', a: 'No. FFmpeg\'s default is used.' },
      { q: 'Will the AAC play on an iPhone?', a: 'Not reliably in the Music app. Use M4A.' },
    ],
  },

  ogg: {
    title: 'Convert to OGG Online — MP3, WAV, FLAC to OGG Vorbis',
    metaDescription:
      'Convert to OGG online for free. Turn MP3, WAV, FLAC, AAC or M4A audio into OGG Vorbis in your browser, with no upload or sign-up. 100 MB per file.',
    heading: 'Convert to OGG',
    description:
      'Convert to OGG online: turn MP3, WAV, FLAC, AAC or M4A audio into OGG Vorbis in your browser, free, with no upload or sign-up needed.',
    details:
      'OGG is a container from the Xiph.Org Foundation, and Vorbis is the open, royalty-free audio codec most often found inside it. It was released in 2000 as a patent-free alternative to MP3 and became common in games and open-source software.',
    longDescription:
      'The files made here use Vorbis at FFmpeg\'s default quality. They play in browsers other than old Safari, on Android and on Linux, and are favoured by game engines. The Apple Music app does not play them. A WAV or FLAC source gives the best result; MP3, AAC and M4A sources are compressed a second time, which costs a little quality.',
    useCases: [
      'Supply sound for a game engine that prefers OGG',
      'Give browsers an open-format audio fallback',
      'Compress recordings with a royalty-free codec',
    ],
    faqs: [
      { q: 'Is OGG the same as Vorbis?', a: 'Here it is. The converter writes Vorbis audio into the OGG container.' },
      { q: 'Does OGG play on iPhone?', a: 'Not in the Music app.' },
      { q: 'Can I set the quality?', a: 'No, the default is used.' },
    ],
  },

  m4a: {
    title: 'Convert to M4A Online — MP3, WAV, FLAC, OGG to M4A',
    metaDescription:
      'Convert to M4A online for free. Turn MP3, WAV, OGG, FLAC or AAC audio into AAC in an M4A file in your browser, with no upload or sign-up needed.',
    heading: 'Convert to M4A',
    description:
      'Convert to M4A online: turn MP3, WAV, OGG, FLAC or AAC audio into AAC in an M4A file in your browser, free, with no upload or sign-up.',
    details:
      'M4A is the MPEG-4 audio file type: AAC sound inside an MP4 container. It is what iTunes songs, iPhone voice memos and Apple Podcasts use, and unlike a bare AAC stream it can hold titles, artists and cover art.',
    longDescription:
      'Whatever the source, the audio is decoded and encoded as AAC with FFmpeg\'s default settings, then stored in an MP4 container. That is lossy, so converting from FLAC or WAV saves a lot of space while MP3 or OGG sources lose a little extra quality. Converting AAC to M4A re-encodes it rather than copying it.',
    useCases: [
      'Put songs or recordings on an iPhone or Mac',
      'Shrink a lossless library for a phone',
      'Share a voice recording that every Apple device opens',
    ],
    faqs: [
      { q: 'Is M4A lossless?', a: 'Not here. This converter writes lossy AAC.' },
      { q: 'Why choose M4A over AAC?', a: 'The container supports tags and seeking.' },
      { q: 'Does it work on Android and Windows?', a: 'Yes, current versions play M4A.' },
    ],
  },

  woff: {
    title: 'Convert to WOFF Online — TTF and OTF to WOFF Free',
    metaDescription:
      'Convert to WOFF online for free. Compress TTF or OTF fonts for the web in your browser, with no upload or sign-up. The font itself is not changed.',
    heading: 'Convert to WOFF',
    description:
      'Convert to WOFF online: compress TTF or OTF fonts for the web in your browser, free, with no upload or sign-up. The font itself is not changed.',
    details:
      'WOFF is the Web Open Font Format, a W3C standard since 2012. It packages a font with each table compressed, so a website visitor downloads fewer bytes, and every modern browser can display it.',
    longDescription:
      'The conversion copies the font tables into a WOFF 1.0 file after compressing them with zlib. No glyph is redrawn, so outlines, kerning and OpenType features stay identical to the TTF or OTF. WOFF2 compresses further but is not produced here. Check the licence of the font before using it on a site.',
    useCases: [
      'Self-host a custom font on a website',
      'Cut the download size of a typeface',
      'Meet a theme or builder that wants WOFF',
    ],
    faqs: [
      { q: 'Is any quality lost?', a: 'No. The font data is copied exactly.' },
      { q: 'Can I get WOFF2?', a: 'No.' },
      { q: 'Does it handle font collections?', a: 'No. TTC collections must be split first.' },
    ],
  },

  ttf: {
    title: 'Convert to TTF Online — Unwrap WOFF to TTF Free',
    metaDescription:
      'Convert to TTF online for free. Unwrap a WOFF web font to a TrueType file for installing, in your browser with no upload or sign-up needed.',
    heading: 'Convert to TTF',
    description:
      'Convert to TTF online: unwrap a WOFF web font to a TrueType file for installing, free, in your browser with no upload or sign-up needed.',
    details:
      'TTF is the TrueType font file, the format that Windows, macOS and Linux install for use in documents and design programs. Its glyphs are drawn with quadratic curves.',
    longDescription:
      'This target works for WOFF fonts that contain TrueType outlines: the converter decompresses the tables and saves the original font. A WOFF that contains PostScript outlines is an OTF font, and the converter will tell you to choose OTF instead. Converting an OTF to TTF is not supported because it would require converting every curve.',
    useCases: [
      'Install a font you downloaded as a web file',
      'Open a web font in a design tool',
      'Recover the original TrueType file from a site',
    ],
    faqs: [
      { q: 'Why did it refuse my WOFF?', a: 'The font inside has PostScript outlines, so choose OTF.' },
      { q: 'Can I convert OTF to TTF?', a: 'No.' },
      { q: 'Is the font changed?', a: 'No, the tables are only decompressed.' },
    ],
  },

  otf: {
    title: 'Convert to OTF Online — Unwrap WOFF to OTF Free',
    metaDescription:
      'Convert to OTF online for free. Unwrap a WOFF web font with PostScript outlines to an OpenType file for installing, with no upload or sign-up needed.',
    heading: 'Convert to OTF',
    description:
      'Convert to OTF online: unwrap a WOFF web font with PostScript outlines to an OpenType file, free, in your browser with no upload or sign-up.',
    details:
      'OTF is OpenType, a font format from Microsoft and Adobe that can hold PostScript-style outlines along with advanced typographic features. Desktop systems and design programs install it directly.',
    longDescription:
      'The converter accepts WOFF files whose font has PostScript (CFF) outlines and saves the decompressed original as an .otf file. A WOFF with TrueType outlines is a TTF font, and the converter tells you so instead of mislabelling it. TTF to OTF is not offered, since it would need a rebuild of the outlines.',
    useCases: [
      'Install an OpenType typeface you only have as a web file',
      'Open a web font in a layout or design program',
      'Get the source font back from a site export',
    ],
    faqs: [
      { q: 'Why was my WOFF rejected?', a: 'It holds TrueType outlines. Choose TTF instead.' },
      { q: 'Does it convert TTF to OTF?', a: 'No.' },
      { q: 'Are ligatures preserved?', a: 'Yes, nothing in the font is altered.' },
    ],
  },

  zip: {
    title: 'Convert to ZIP Online — From TAR and GZ Archives',
    metaDescription:
      'Convert to ZIP online for free. Repack TAR or TAR.GZ archives as a ZIP that opens on any computer, in your browser with no upload or sign-up needed.',
    heading: 'Convert to ZIP',
    description:
      'Convert to ZIP online: repack TAR or TAR.GZ archives as a ZIP that opens on any computer, free, in your browser with no upload or sign-up.',
    details:
      'ZIP is the most widely supported archive format. Windows and macOS open it with a double-click, email services accept it and nearly every upload form allows it. Each file is compressed on its own inside the archive.',
    longDescription:
      'The converter extracts the files from a TAR or GZ and writes them into a ZIP with deflate compression. Folder paths are flattened, identical names are renumbered, and permissions or links are not stored. Other file types can be packaged into a ZIP from their own converter pages.',
    useCases: [
      'Open a Linux archive on Windows',
      'Share a TAR with someone who expects a ZIP',
      'Compress an uncompressed TAR',
    ],
    faqs: [
      { q: 'Will the ZIP be smaller than the TAR?', a: 'Usually, because ZIP compresses its files.' },
      { q: 'Are folders kept?', a: 'No, files end up at one level.' },
      { q: 'Does it make password-protected ZIPs?', a: 'No.' },
    ],
  },

  tar: {
    title: 'Convert to TAR Online — From ZIP and GZ Archives',
    metaDescription:
      'Convert to TAR online for free. Repack ZIP or GZ archives into a plain TAR for Linux and Unix tools, in your browser with no upload or sign-up needed.',
    heading: 'Convert to TAR',
    description:
      'Convert to TAR online: repack ZIP or GZ archives into a plain TAR for Linux and Unix tools, free, in your browser with no upload or sign-up.',
    details:
      'TAR joins files into a single stream with no compression, a design from Unix in the 1970s. Programs on Linux and macOS read it natively, and it is the usual input to gzip and other compressors.',
    longDescription:
      'The converter reads the files from a ZIP or GZ and writes them into a standard TAR archive. Since there is no compression, the file will be about the size of its contents. Folder paths are flattened and duplicate names are renumbered. For a compressed result, use the GZ target, which produces a .tar.gz.',
    useCases: [
      'Give a Linux tool the archive format it expects',
      'Prepare files for another compression program',
      'Repack a ZIP from a Windows user',
    ],
    faqs: [
      { q: 'Is the TAR compressed?', a: 'No. Choose GZ for a compressed .tar.gz.' },
      { q: 'Does it keep file permissions?', a: 'No.' },
      { q: 'Are folder paths kept?', a: 'No, they are flattened.' },
    ],
  },

  gz: {
    title: 'Convert to GZ Online — From ZIP and TAR Archives',
    metaDescription:
      'Convert to GZ online for free. Repack ZIP or TAR archives into a compressed TAR.GZ in your browser, with no upload or sign-up needed. 100 MB per file.',
    heading: 'Convert to GZ',
    description:
      'Convert to GZ online: repack ZIP or TAR archives into a compressed TAR.GZ, free, in your browser with no upload or sign-up. Up to 100 MB per file.',
    details:
      'GZ is gzip, the compression used across Linux and the web. It compresses one stream, so several files are put into a TAR before compression, and the usual result carries the double extension .tar.gz.',
    longDescription:
      'The converter builds a TAR from the files in your ZIP or TAR and then compresses it with gzip in your browser. Text, source code and documents shrink well, while photos, video and audio hardly shrink at all. Folder paths are flattened and permissions are not recorded. Your browser needs compression streams, which every current browser has.',
    useCases: [
      'Prepare a source release or backup for Linux',
      'Compress a set of text files for a slow upload',
      'Convert a ZIP you received into a .tar.gz',
    ],
    faqs: [
      { q: 'Why is the result .tar.gz?', a: 'Gzip compresses a single file, so the files are put in a TAR first.' },
      { q: 'Will already compressed files shrink?', a: 'Hardly at all.' },
      { q: 'Does it keep folders?', a: 'No, they are flattened.' },
    ],
  },
};
