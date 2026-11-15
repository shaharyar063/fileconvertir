import type { ConversionPage } from './types';
import { steps } from './helpers';

/** Font conversions (lossless WOFF wrapping) and archive-to-archive conversions. */
export const FONT_ARCHIVE_PAGES: Record<string, ConversionPage> = {
  'ttf-to-woff': {
    title: 'TTF to WOFF Converter Online — Free, Lossless',
    metaDescription:
      'Convert TTF to WOFF online for free. Compresses a TrueType font for the web without changing the font, in your browser with no upload or sign-up.',
    heading: 'TTF to WOFF Converter',
    description:
      'Convert TTF to WOFF online for free: a TrueType font is compressed for the web without changing the font itself.',
    steps: steps('ttf', 'woff', 'Press Convert. Each table of the font is compressed with zlib and wrapped in a WOFF file. The outlines and features are untouched.', { add: 'Click Select Files or drop up to 20 TTF fonts onto the converter. Each file can be up to 100 MB.' }),
    understanding: {
      paragraphs: [
        'WOFF is a wrapper for web fonts. It holds the same data as the TTF, with every table compressed, so a browser downloads less. The glyphs, kerning, hinting and OpenType features are identical to the original.',
        'Because nothing is redrawn, the conversion is lossless and quick. The WOFF will usually be noticeably smaller than the TTF.',
        'Browsers also support WOFF2, which compresses further, but this converter writes WOFF 1.0 only. Check the font licence before putting it on a site: converting does not change what you are allowed to do with it.',
      ],
      graphics: [
        {
          kind: 'flow',
          caption: 'The font tables are compressed and wrapped; nothing is redrawn.',
          steps: [
            { label: 'TTF', detail: 'raw font tables' },
            { label: 'Compress tables', detail: 'zlib' },
            { label: 'WOFF wrapper' },
            { label: '.woff file', detail: 'same font, smaller' },
          ],
        },
        {
          kind: 'table',
          caption: 'TTF compared with WOFF.',
          columns: ['TTF', 'WOFF'],
          rows: [
            { label: 'Glyph outlines', a: 'TrueType', b: 'Identical' },
            { label: 'Kerning and features', a: 'Included', b: 'Kept' },
            { label: 'File size', a: 'Larger', b: 'Smaller' },
            { label: 'Made for', a: 'Installing on a computer', b: 'Serving on a website' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Self-hosting a font on a website', text: 'The @font-face rule can point to a WOFF file that loads faster than a TTF.' },
        { title: 'A CSS framework or CMS that expects WOFF', text: 'Many themes list WOFF or WOFF2 only.' },
      ],
      keepOriginal:
        'Keep the TTF to install the font on your computer or to convert again. If you need the smallest possible web file, use a WOFF2 tool as well.',
    },
    faqs: [
      { q: 'Does the font change?', a: 'No. Only the container and compression change.' },
      { q: 'Is WOFF2 supported?', a: 'Not as an output. This writes WOFF 1.0.' },
      { q: 'Does it work with OTF files?', a: 'Use the OTF to WOFF converter.' },
      { q: 'Can I use any font on my site?', a: 'Only if its licence allows web use.' },
    ],
  },

  'otf-to-woff': {
    title: 'OTF to WOFF Converter Online — Free, Lossless',
    metaDescription:
      'Convert OTF to WOFF online for free. Compresses an OpenType font for the web without changing it, in your browser with no upload or sign-up needed.',
    heading: 'OTF to WOFF Converter',
    description:
      'Convert OTF to WOFF online for free: an OpenType font is compressed for the web without changing the font itself.',
    steps: steps('otf', 'woff', 'Press Convert. The font tables are compressed with zlib and wrapped in a WOFF file. Outlines and OpenType features stay the same.', { add: 'Click Select Files or drop up to 20 OTF fonts onto the converter. Each file can be up to 100 MB.' }),
    understanding: {
      paragraphs: [
        'An OTF font can contain PostScript (CFF) outlines or TrueType outlines, along with advanced features such as ligatures and alternates. WOFF wraps either kind and compresses it for the web without altering it.',
        'The converter does not redraw glyphs or change outline type, so every feature in the original is present in the WOFF. The saving depends on the font; CFF fonts are already compact, so the gain can be smaller than for TTF.',
        'Only WOFF 1.0 is produced, not WOFF2. Confirm the licence allows web embedding before you publish.',
      ],
      graphics: [
        {
          kind: 'flow',
          caption: 'OTF tables are compressed and wrapped unchanged.',
          steps: [
            { label: 'OTF', detail: 'CFF or TrueType outlines' },
            { label: 'Compress tables', detail: 'zlib' },
            { label: 'WOFF wrapper' },
            { label: '.woff file', detail: 'same font' },
          ],
        },
        {
          kind: 'table',
          caption: 'OTF compared with WOFF.',
          columns: ['OTF', 'WOFF'],
          rows: [
            { label: 'Outlines', a: 'CFF or TrueType', b: 'Identical' },
            { label: 'OpenType features', a: 'Included', b: 'Kept' },
            { label: 'File size', a: 'Larger', b: 'Smaller' },
            { label: 'Intended use', a: 'Desktop installs', b: 'Websites' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Bringing a desktop typeface to a website', text: 'Reference the WOFF in your stylesheet.' },
        { title: 'Satisfying a theme that rejects OTF', text: 'Some platforms accept WOFF and not OTF.' },
      ],
      keepOriginal:
        'Keep the OTF for desktop installs and design tools. It is the version you edit and convert from.',
    },
    faqs: [
      { q: 'Are ligatures and alternates kept?', a: 'Yes. Nothing in the font is changed.' },
      { q: 'Is the file smaller?', a: 'Usually, though by less for compact CFF fonts.' },
      { q: 'Can I get WOFF2?', a: 'Not here.' },
      { q: 'Does it convert to TTF?', a: 'No. Changing outline type is not supported.' },
    ],
  },

  'woff-to-ttf': {
    title: 'WOFF to TTF Converter Online — Free, Lossless',
    metaDescription:
      'Convert WOFF to TTF online for free. Unwraps a web font so you can install it, without changing the font, in your browser with no upload or sign-up.',
    heading: 'WOFF to TTF Converter',
    description:
      'Convert WOFF to TTF online for free: a web font is unwrapped so you can install it. The font itself is unchanged.',
    steps: steps('woff', 'ttf', 'Press Convert. The compressed tables are decompressed and rebuilt as a TrueType font file. Only fonts with TrueType outlines can be saved as TTF.', { add: 'Click Select Files or drop up to 20 WOFF fonts onto the converter. Each file can be up to 100 MB.' }),
    understanding: {
      paragraphs: [
        'A WOFF file is a TrueType or OpenType font whose tables have been compressed. The converter decompresses them and writes the original font back, so the result is exactly the font that was wrapped.',
        'That also means the output type depends on the font inside. A WOFF made from a TTF unwraps to a TTF. If the WOFF holds PostScript (CFF) outlines, it is an OTF font and the converter tells you to choose OTF instead of writing a mislabelled file.',
        'Check the licence before installing a font you downloaded from a website.',
      ],
      graphics: [
        {
          kind: 'flow',
          caption: 'The WOFF wrapper is removed and the font tables restored.',
          steps: [
            { label: '.woff file', detail: 'compressed tables' },
            { label: 'Decompress', detail: 'tables restored' },
            { label: 'TTF', detail: 'if outlines are TrueType' },
          ],
        },
        {
          kind: 'table',
          caption: 'WOFF compared with TTF.',
          columns: ['WOFF', 'TTF'],
          rows: [
            { label: 'Glyphs and features', a: 'Included', b: 'Identical' },
            { label: 'File size', a: 'Smaller', b: 'Larger' },
            { label: 'Install on a computer', a: 'Not supported', b: 'Supported' },
            { label: 'CFF-flavoured fonts', a: 'Possible', b: 'Not allowed here' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Installing a web font on your computer', text: 'Operating systems install TTF, not WOFF.' },
        { title: 'Opening a font in a design app', text: 'Many tools read TTF only.' },
      ],
      keepOriginal:
        'Keep the WOFF for the website. Use the TTF only where you need to install or edit the font.',
    },
    faqs: [
      { q: 'Why does it say to choose OTF?', a: 'The font inside has PostScript outlines, so it is an OTF font.' },
      { q: 'Does anything change in the font?', a: 'No. The tables are only decompressed.' },
      { q: 'Does it work on WOFF2?', a: 'No, only WOFF 1.0.' },
      { q: 'Is it legal to convert?', a: 'Converting is a technical step; your licence decides what you may do with the font.' },
    ],
  },

  'woff-to-otf': {
    title: 'WOFF to OTF Converter Online — Free, Lossless',
    metaDescription:
      'Convert WOFF to OTF online for free. Unwraps a web font that has PostScript outlines for installing, with no change to the font, no upload or sign-up.',
    heading: 'WOFF to OTF Converter',
    description:
      'Convert WOFF to OTF online for free: a web font with PostScript outlines is unwrapped for installing. Nothing is uploaded.',
    steps: steps('woff', 'otf', 'Press Convert. The compressed tables are decompressed and rebuilt as an OpenType font. Only fonts with PostScript (CFF) outlines can be saved as OTF.', { add: 'Click Select Files or drop up to 20 WOFF fonts onto the converter. Each file can be up to 100 MB.' }),
    understanding: {
      paragraphs: [
        'WOFF is a compressed wrapper, so the converter simply restores the font inside it. If that font has PostScript (CFF) outlines, the unwrapped file is an OpenType font and is saved as .otf.',
        'If the WOFF holds TrueType outlines, it is really a TTF. The converter says so and asks you to choose TTF, since renaming it as OTF would produce a mislabelled file. Changing a font from one outline type to another is a different, lossy job that this tool does not do.',
        'All glyphs, kerning and OpenType features come back exactly as they were.',
      ],
      graphics: [
        {
          kind: 'flow',
          caption: 'The wrapper is removed; the font type is whatever was inside.',
          steps: [
            { label: '.woff file', detail: 'compressed tables' },
            { label: 'Decompress', detail: 'tables restored' },
            { label: 'OTF', detail: 'if outlines are CFF' },
          ],
        },
        {
          kind: 'table',
          caption: 'What decides the output.',
          columns: ['Outlines inside the WOFF', 'Result'],
          rows: [
            { label: 'PostScript (CFF)', a: 'OTF font', b: 'Saved as OTF' },
            { label: 'TrueType', a: 'TTF font', b: 'Choose TTF instead' },
            { label: 'Glyphs', a: 'Unchanged', b: 'Unchanged' },
            { label: 'Features', a: 'Kept', b: 'Kept' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Installing a typeface that you only have as a web file', text: 'Desktop systems and design tools expect OTF or TTF.' },
        { title: 'Recovering the source font from a site export', text: 'The unwrapped file is the original.' },
      ],
      keepOriginal:
        'Keep the WOFF for the website. Keep the OTF only for installing or converting back.',
    },
    faqs: [
      { q: 'Why was my font refused?', a: 'It has TrueType outlines, so it should be saved as TTF.' },
      { q: 'Can it change TrueType to CFF?', a: 'No. That conversion is not supported.' },
      { q: 'Does it work on WOFF2?', a: 'No.' },
      { q: 'Is anything lost?', a: 'No. The tables are only decompressed.' },
    ],
  },

  'zip-to-tar': {
    title: 'ZIP to TAR Converter Online — Free, No Upload',
    metaDescription:
      'Convert ZIP to TAR online for free. Repacks the files in your ZIP into an uncompressed TAR archive in your browser, with no upload or sign-up needed.',
    heading: 'ZIP to TAR Converter',
    description:
      'Convert ZIP to TAR online for free: the files inside a ZIP are repacked into an uncompressed TAR archive.',
    steps: steps('zip', 'tar', 'Press Convert. The ZIP is opened, its files are read and written into a TAR archive without compression. Folders are flattened.', { add: 'Click Select Files or drop up to 20 ZIP files onto the converter. Each file can be up to 100 MB.' }),
    understanding: {
      paragraphs: [
        'ZIP compresses each file separately. TAR does not compress at all: it just joins files end to end with a header in front of each one. Repacking a ZIP as TAR therefore makes the archive about as big as the files themselves.',
        'TAR is the format of Linux and Unix tools, often followed by gzip. If you want a compressed archive that those tools open, choose ZIP to GZ instead, which writes a .tar.gz.',
        'Folder structure is flattened, so files from different folders share one level. Files with identical names are renamed with a number so none is overwritten.',
      ],
      graphics: [
        {
          kind: 'flow',
          caption: 'Files are extracted from the ZIP and joined into a TAR.',
          steps: [
            { label: 'ZIP', detail: 'each file compressed' },
            { label: 'Extract files' },
            { label: 'Join with headers' },
            { label: '.tar', detail: 'no compression' },
          ],
        },
        {
          kind: 'table',
          caption: 'ZIP compared with TAR.',
          columns: ['ZIP', 'TAR'],
          rows: [
            { label: 'Compression', a: 'Per file', b: 'None' },
            { label: 'Typical size', a: 'Smaller', b: 'About the size of the files' },
            { label: 'Common on', a: 'Windows, macOS', b: 'Linux, Unix' },
            { label: 'Folders', a: 'Kept in the ZIP', b: 'Flattened here' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Handing files to a Linux build or script', text: 'Many tools expect a .tar.' },
        { title: 'Preparing to compress with another method', text: 'A TAR is a clean input for gzip or other compressors.' },
      ],
      keepOriginal:
        'Keep the ZIP if you need to save space or keep folders.',
    },
    faqs: [
      { q: 'Is the TAR compressed?', a: 'No. Use ZIP to GZ for a compressed .tar.gz.' },
      { q: 'Are folders kept?', a: 'No. Files are placed at one level.' },
      { q: 'What happens to same-named files?', a: 'They are renamed with a number so none is lost.' },
      { q: 'Are password-protected ZIPs supported?', a: 'No.' },
    ],
  },

  'zip-to-gz': {
    title: 'ZIP to GZ Converter Online — Free, No Upload',
    metaDescription:
      'Convert ZIP to GZ online for free. Repacks the files in your ZIP into a compressed TAR.GZ archive in your browser, with no upload or sign-up needed.',
    heading: 'ZIP to GZ Converter',
    description:
      'Convert ZIP to GZ online for free: the files inside a ZIP are repacked into a compressed TAR.GZ archive.',
    steps: steps('zip', 'gz', 'Press Convert. The ZIP is opened, its files are joined into a TAR and the TAR is compressed with gzip. The result is saved as .tar.gz.', { add: 'Click Select Files or drop up to 20 ZIP files onto the converter. Each file can be up to 100 MB.' }),
    understanding: {
      paragraphs: [
        'GZ compresses a single stream, so to hold several files it needs a TAR inside. The output is therefore a .tar.gz, the standard compressed archive on Linux and in software releases.',
        'Gzip compresses the TAR as a whole, which can beat ZIP on groups of similar files, though results vary. Files that are already compressed, such as JPEG, MP3 or MP4, shrink very little in any format.',
        'Folders are flattened and duplicate names are renumbered. Your browser must support compression streams, which current Chrome, Edge, Firefox and Safari do.',
      ],
      graphics: [
        {
          kind: 'flow',
          caption: 'Files from the ZIP are tarred, then compressed with gzip.',
          steps: [
            { label: 'ZIP', detail: 'each file compressed' },
            { label: 'Extract files' },
            { label: 'Join into TAR' },
            { label: 'Gzip', detail: 'compress whole TAR' },
            { label: '.tar.gz' },
          ],
        },
        {
          kind: 'table',
          caption: 'ZIP compared with TAR.GZ.',
          columns: ['ZIP', 'TAR.GZ'],
          rows: [
            { label: 'Compression', a: 'Per file', b: 'Whole archive' },
            { label: 'Common on', a: 'Windows, macOS', b: 'Linux, Unix' },
            { label: 'Random access to one file', a: 'Easy', b: 'Must read through' },
            { label: 'Folders', a: 'Kept in the ZIP', b: 'Flattened here' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Shipping files to a Linux server', text: 'tar -xzf unpacks a .tar.gz in one command.' },
        { title: 'Compressing a set of text or code files', text: 'Whole-archive compression often does well on similar files.' },
      ],
      keepOriginal:
        'Keep the ZIP if recipients use Windows, or need to extract single files quickly.',
    },
    faqs: [
      { q: 'Why is the file named .tar.gz?', a: 'A gzip stream holds one file, so the files are put in a TAR first.' },
      { q: 'Will it be smaller than the ZIP?', a: 'Sometimes. It depends on the content.' },
      { q: 'Are folders kept?', a: 'No, they are flattened.' },
      { q: 'Does my browser need anything special?', a: 'Support for compression streams, available in current browsers.' },
    ],
  },

  'tar-to-zip': {
    title: 'TAR to ZIP Converter Online — Free, No Upload',
    metaDescription:
      'Convert TAR to ZIP online for free. Repacks the files from a TAR archive into a compressed ZIP in your browser, with no upload or sign-up needed.',
    heading: 'TAR to ZIP Converter',
    description:
      'Convert TAR to ZIP online for free: the files in a TAR archive are repacked into a compressed ZIP that opens anywhere.',
    steps: steps('tar', 'zip', 'Press Convert. The TAR is read, its files are extracted and written into a ZIP with deflate compression. Folders are flattened.', { add: 'Click Select Files or drop up to 20 TAR files onto the converter. Each file can be up to 100 MB.' }),
    understanding: {
      paragraphs: [
        'A TAR file is an uncompressed bundle, so it is usually as large as its contents. Putting the same files in a ZIP compresses them, which often makes the file smaller and lets Windows and macOS open it with no extra software.',
        'Only regular files are copied. Empty folders, symbolic links and special entries are skipped, and folder paths are flattened. Files with the same name are renumbered.',
        'Unsafe paths, such as those that try to climb out of a folder, are sanitised.',
      ],
      graphics: [
        {
          kind: 'flow',
          caption: 'Files are read out of the TAR and compressed into a ZIP.',
          steps: [
            { label: 'TAR', detail: 'uncompressed bundle' },
            { label: 'Extract files' },
            { label: 'Deflate' },
            { label: '.zip', detail: 'opens everywhere' },
          ],
        },
        {
          kind: 'support',
          caption: 'Where each archive opens without extra software.',
          columns: ['ZIP', 'TAR'],
          rows: [
            { label: 'Windows', a: 'yes', b: 'partial' },
            { label: 'macOS', a: 'yes', b: 'yes' },
            { label: 'Linux', a: 'yes', b: 'yes' },
            { label: 'Email attachments', a: 'yes', b: 'partial' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Sharing a Linux backup with a Windows user', text: 'ZIP opens by double-clicking.' },
        { title: 'Shrinking an uncompressed TAR', text: 'Compression saves space when the files are text or documents.' },
      ],
      keepOriginal:
        'Keep the TAR if you need to preserve permissions, links or folders, because the ZIP made here does not.',
    },
    faqs: [
      { q: 'Are file permissions kept?', a: 'No. They are not carried into the ZIP.' },
      { q: 'What about folders?', a: 'They are flattened.' },
      { q: 'Will the ZIP be smaller?', a: 'Usually, for compressible files.' },
      { q: 'Does it support .tar.gz?', a: 'Use the GZ to ZIP converter for that.' },
    ],
  },

  'tar-to-gz': {
    title: 'TAR to GZ Converter Online — Free, No Upload',
    metaDescription:
      'Convert TAR to GZ online for free. Compresses a TAR archive into a TAR.GZ file with gzip in your browser, with no upload or sign-up needed. 100 MB limit.',
    heading: 'TAR to GZ Converter',
    description:
      'Convert TAR to GZ online for free: a TAR archive is compressed with gzip into a TAR.GZ file. Nothing is uploaded.',
    steps: steps('tar', 'gz', 'Press Convert. The TAR\'s files are read, rebuilt as a TAR and compressed with gzip. The result is saved as .tar.gz.', { add: 'Click Select Files or drop up to 20 TAR files onto the converter. Each file can be up to 100 MB.' }),
    understanding: {
      paragraphs: [
        'A plain TAR takes as much space as its files. Gzip compresses the whole archive, and text, code and documents often shrink a lot. That is what a .tar.gz is.',
        'The converter reads the files out of your TAR and builds a fresh one before compressing, so folder paths are flattened and duplicate names are renumbered. Special entries such as links are not carried over.',
        'Already compressed contents, such as photos or video, will not shrink much.',
      ],
      graphics: [
        {
          kind: 'flow',
          caption: 'The TAR is rebuilt and compressed with gzip.',
          steps: [
            { label: 'TAR', detail: 'uncompressed' },
            { label: 'Read files' },
            { label: 'Rebuild TAR' },
            { label: 'Gzip' },
            { label: '.tar.gz', detail: 'compressed' },
          ],
        },
        {
          kind: 'table',
          caption: 'TAR compared with TAR.GZ.',
          columns: ['TAR', 'TAR.GZ'],
          rows: [
            { label: 'Compression', a: 'None', b: 'Gzip' },
            { label: 'Size for text files', a: 'Large', b: 'Much smaller' },
            { label: 'Size for photos or video', a: 'Large', b: 'About the same' },
            { label: 'Links and special entries', a: 'Possible', b: 'Not kept here' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Transferring a backup over a slow connection', text: 'A smaller file uploads sooner.' },
        { title: 'Publishing a source release', text: '.tar.gz is the usual format for downloads.' },
      ],
      keepOriginal:
        'Keep the TAR if you need links, permissions or exact folder paths preserved.',
    },
    faqs: [
      { q: 'Is the output a TAR.GZ?', a: 'Yes, named .tar.gz.' },
      { q: 'Will my permissions be kept?', a: 'No.' },
      { q: 'How much smaller will it be?', a: 'It depends on the content. Text shrinks most.' },
      { q: 'Are folders kept?', a: 'No, they are flattened.' },
    ],
  },

  'gz-to-zip': {
    title: 'GZ to ZIP Converter Online — Free, No Upload',
    metaDescription:
      'Convert GZ to ZIP online for free. Unpacks a gzip or TAR.GZ file and repacks its contents as a ZIP in your browser, with no upload or sign-up needed.',
    heading: 'GZ to ZIP Converter',
    description:
      'Convert GZ to ZIP online for free: a gzip or TAR.GZ file is unpacked and its contents are repacked as a ZIP.',
    steps: steps('gz', 'zip', 'Press Convert. The gzip is decompressed. If it holds a TAR, its files are extracted; otherwise the single file is kept. They are then written into a ZIP.', { add: 'Click Select Files or drop up to 20 GZ files onto the converter. Each file can be up to 100 MB.' }),
    understanding: {
      paragraphs: [
        'A .gz file is one compressed file, and a .tar.gz is a TAR archive compressed that way. The converter checks which it is. For a .tar.gz it extracts every file, and for a plain .gz it keeps the single file under its original name.',
        'The contents are then compressed into a ZIP, which opens by double-clicking on Windows and macOS.',
        'Folders are flattened and files with the same name get a number. Corrupted or truncated gzip data produces an error.',
      ],
      graphics: [
        {
          kind: 'flow',
          caption: 'Gzip is decompressed, files are extracted and a ZIP is written.',
          steps: [
            { label: '.gz or .tar.gz' },
            { label: 'Decompress' },
            { label: 'Extract files', detail: 'from the TAR if present' },
            { label: '.zip' },
          ],
        },
        {
          kind: 'support',
          caption: 'Where each format opens without extra software.',
          columns: ['ZIP', 'GZ'],
          rows: [
            { label: 'Windows', a: 'yes', b: 'no' },
            { label: 'macOS', a: 'yes', b: 'yes' },
            { label: 'Linux', a: 'yes', b: 'yes' },
            { label: 'Email attachments', a: 'yes', b: 'partial' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Opening a Linux download on Windows', text: 'Older Windows versions cannot open a .tar.gz without extra software.' },
        { title: 'Sending a server log archive to a colleague', text: 'A ZIP opens without special tools.' },
      ],
      keepOriginal:
        'Keep the .gz if the file goes back to a Linux system, where it is the expected format.',
    },
    faqs: [
      { q: 'Does it work with .tar.gz files?', a: 'Yes. The files inside are extracted.' },
      { q: 'What about a single compressed file?', a: 'It is kept as one file inside the ZIP.' },
      { q: 'Are folders kept?', a: 'No, they are flattened.' },
      { q: 'What if I get an error?', a: 'The gzip may be damaged or incomplete.' },
    ],
  },

  'gz-to-tar': {
    title: 'GZ to TAR Converter Online — Free, No Upload',
    metaDescription:
      'Convert GZ to TAR online for free. Decompresses a TAR.GZ file into a plain TAR archive in your browser, with no upload or sign-up needed. 100 MB per file.',
    heading: 'GZ to TAR Converter',
    description:
      'Convert GZ to TAR online for free: a gzip or TAR.GZ file is decompressed into an uncompressed TAR archive.',
    steps: steps('gz', 'tar', 'Press Convert. The gzip is decompressed and the files are written into a plain TAR with no compression.', { add: 'Click Select Files or drop up to 20 GZ files onto the converter. Each file can be up to 100 MB.' }),
    understanding: {
      paragraphs: [
        'Removing the gzip layer from a .tar.gz leaves the TAR it was made from. This converter reads the files out and writes a clean TAR, so you get an uncompressed bundle that tools can read directly.',
        'A plain .gz that holds one file, not a TAR, is wrapped into a TAR that contains that single file under its original name.',
        'The file will be larger than the .gz. Folders are flattened, duplicate names are renumbered and special entries such as links are not preserved.',
      ],
      graphics: [
        {
          kind: 'flow',
          caption: 'Gzip is removed and the files are written into a TAR.',
          steps: [
            { label: '.gz or .tar.gz', detail: 'compressed' },
            { label: 'Decompress' },
            { label: 'Write TAR', detail: 'headers and data' },
            { label: '.tar', detail: 'uncompressed' },
          ],
        },
        {
          kind: 'table',
          caption: 'GZ compared with the TAR produced.',
          columns: ['GZ', 'TAR'],
          rows: [
            { label: 'Compression', a: 'Gzip', b: 'None' },
            { label: 'Size', a: 'Smaller', b: 'Larger' },
            { label: 'Single file support', a: 'One file', b: 'Many files' },
            { label: 'Folders', a: 'Inside the TAR', b: 'Flattened here' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Feeding a tool that wants a plain TAR', text: 'Some importers cannot read gzip.' },
        { title: 'Recompressing with a different tool', text: 'Start from an uncompressed TAR.' },
      ],
      keepOriginal:
        'Keep the .gz if you want the smaller file. TAR is for tools that need to read the bundle directly.',
    },
    faqs: [
      { q: 'Why is the TAR bigger?', a: 'It is no longer compressed.' },
      { q: 'What if the .gz is not a TAR?', a: 'The single file is placed inside a new TAR.' },
      { q: 'Are folders kept?', a: 'No. They are flattened.' },
      { q: 'Are file permissions kept?', a: 'No.' },
    ],
  },
};
