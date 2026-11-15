import type { ConversionPage } from './types';
import { steps } from './helpers';

/**
 * Pages for files with the .jpeg extension. JPEG and JPG are the same format;
 * these pages exist so the .jpeg spelling has its own URL and wording. The
 * converter does exactly what it does for .jpg files.
 */
export const JPEG_PAGES: Record<string, ConversionPage> = {
  'jpeg-to-png': {
    title: 'JPEG to PNG Converter Online — Free, No Upload',
    metaDescription:
      'Convert JPEG to PNG online for free. Save .jpeg photos as lossless PNG files in your browser, with no upload or sign-up. Up to 20 files at a time.',
    heading: 'JPEG to PNG Converter',
    description:
      'Convert JPEG to PNG online for free and save your .jpeg photos as lossless images. Everything runs in your browser, so nothing is uploaded.',
    steps: steps('jpeg', 'png', 'Press Convert. Each .jpeg photo is decoded and saved again as a PNG, which uses lossless compression from this point on.'),
    understanding: {
      paragraphs: [
        'A .jpeg file is a JPEG image, exactly the same format as a .jpg file; the extra letter is a leftover from old systems that allowed only three-letter extensions. Converting it to PNG changes how it is stored, not what it contains.',
        'PNG compresses without discarding anything, so later edits and re-saves never degrade the picture the way repeated JPEG saves do. The details JPEG already threw away stay gone, though, and the PNG will usually be several times larger than the original.',
        'PNG also supports transparency, but a photo has none, so the PNG comes out fully opaque.',
      ],
      graphics: [
        {
          kind: 'table',
          caption: 'JPEG compared with the PNG produced here.',
          columns: ['JPEG', 'PNG'],
          rows: [
            { label: 'Compression', a: 'Lossy', b: 'Lossless' },
            { label: 'Repeated saving', a: 'Degrades quality', b: 'No further loss' },
            { label: 'Transparency', a: 'No', b: 'Supported' },
            { label: 'File size for photos', a: 'Small', b: 'Several times larger' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Editing a photo several times', text: 'Work from a PNG copy so every save keeps the image exactly as it was.' },
        { title: 'Software that does not accept .jpeg', text: 'A few design tools and uploaders list PNG and not JPEG.' },
        { title: 'Adding a transparent background later', text: 'PNG is the format an editor needs for cut-outs.' },
      ],
      keepOriginal:
        'Keep the .jpeg for sharing and storage, since it is far smaller. Convert to PNG only for the editing stage.',
    },
    faqs: [
      { q: 'Is a .jpeg file different from a .jpg file?', a: 'No. They are the same format with different extensions, and both convert identically.' },
      { q: 'Will the PNG look better than my JPEG?', a: 'No. It looks the same, because the detail JPEG discarded cannot be recovered.' },
      { q: 'Why is the PNG so much bigger?', a: 'Lossless compression has to keep every pixel exactly, which takes more space than lossy JPEG.' },
      { q: 'Does it keep the picture dimensions?', a: 'Yes. Width and height are unchanged.' },
    ],
  },

  'jpeg-to-webp': {
    title: 'JPEG to WebP Converter Online — Free, No Upload',
    metaDescription:
      'Convert JPEG to WebP online for free. Make .jpeg photos smaller for websites in your browser, with no upload or sign-up. Needs a browser that encodes WebP.',
    heading: 'JPEG to WebP Converter',
    description:
      'Convert JPEG to WebP online for free to shrink .jpeg photos for the web. Encoding happens in your browser and nothing is uploaded.',
    steps: steps('jpeg', 'webp', 'Press Convert. Your browser re-encodes each .jpeg photo as WebP at 92% quality. If it cannot encode WebP, you get an error instead of a wrongly named file.'),
    understanding: {
      paragraphs: [
        'WebP is the format Google designed to replace JPEG on web pages. At comparable visual quality its files are commonly 25 to 35 percent smaller, which means faster pages and less bandwidth.',
        'A .jpeg is already lossy, and WebP is lossy as well, so this conversion compresses the picture a second time. At 92% the extra loss is very small, but starting from your original camera file always gives a better result than starting from a copy.',
        'The encoding is done by your browser, so Chrome, Edge and Firefox work, while some Safari versions refuse to write WebP.',
      ],
      graphics: [
        {
          kind: 'support',
          caption: 'Where each format works.',
          columns: ['WebP', 'JPEG'],
          rows: [
            { label: 'Current web browsers', a: 'yes', b: 'yes' },
            { label: 'Email and chat apps', a: 'partial', b: 'yes' },
            { label: 'Older image editors', a: 'partial', b: 'yes' },
            { label: 'Printing services', a: 'no', b: 'yes' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Speeding up a website', text: 'Smaller images load faster and help page speed scores.' },
        { title: 'Shrinking a photo gallery', text: 'WebP copies save storage on a server or CDN.' },
      ],
      keepOriginal:
        'Keep the .jpeg originals for email, printing and editing, because WebP is not accepted everywhere.',
    },
    faqs: [
      { q: 'Do .jpeg files work the same as .jpg?', a: 'Yes. Both extensions are the same format.' },
      { q: 'How much smaller will the WebP be?', a: 'Often around a quarter to a third smaller, depending on the photo.' },
      { q: 'Why does it say my browser cannot encode WebP?', a: 'Some Safari versions cannot write WebP. Use Chrome, Edge or Firefox.' },
      { q: 'Is the quality setting adjustable?', a: 'No. It is fixed at 92%.' },
    ],
  },

  'jpeg-to-gif': {
    title: 'JPEG to GIF Converter Online — Free, No Upload',
    metaDescription:
      'Convert JPEG to GIF online for free. Turn .jpeg photos into 256-colour still GIFs in your browser, with no upload or sign-up. Not suitable for photographs.',
    heading: 'JPEG to GIF Converter',
    description:
      'Convert JPEG to GIF online for free as a still image limited to 256 colours. Everything stays in your browser.',
    steps: steps('jpeg', 'gif', 'Press Convert. Each .jpeg photo is reduced to a palette of at most 256 colours and saved as a single-frame GIF.'),
    understanding: {
      paragraphs: [
        'A JPEG can contain millions of colours, while a GIF stores at most 256 per image. Smooth skies and skin tones therefore break into visible bands, which is why GIF suits flat artwork better than photographs.',
        'The result is a still, single-frame GIF. It is not animated, and several .jpeg files do not become one animation.',
        'Choose it when a system insists on GIF or when you want the posterised look on purpose. Otherwise PNG keeps far more of your photo.',
      ],
      graphics: [
        {
          kind: 'table',
          caption: 'JPEG compared with the GIF produced here.',
          columns: ['JPEG', 'GIF'],
          rows: [
            { label: 'Colours', a: 'Millions', b: 'At most 256' },
            { label: 'Animation', a: 'No', b: 'Not created here' },
            { label: 'Best for', a: 'Photographs', b: 'Flat graphics' },
            { label: 'Gradients', a: 'Smooth', b: 'Banded' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'A form that only accepts GIF', text: 'Some legacy upload fields list GIF but not JPEG.' },
        { title: 'A retro, low-colour look', text: 'The palette limit gives photographs a deliberate vintage feel.' },
      ],
      keepOriginal:
        'Keep the .jpeg for anything that needs natural colour. The GIF cannot be turned back into the full photo.',
    },
    faqs: [
      { q: 'Can I make an animated GIF from JPEGs?', a: 'No. Each file becomes a single still image.' },
      { q: 'Why does my photo look blotchy?', a: 'GIF allows only 256 colours, so gradients turn into bands.' },
      { q: 'Is a .jpeg treated differently from a .jpg?', a: 'No, they are identical.' },
      { q: 'Is the file smaller?', a: 'Not usually for photographs. GIF is efficient for flat art only.' },
    ],
  },

  'jpeg-to-bmp': {
    title: 'JPEG to BMP Converter Online — Free, No Upload',
    metaDescription:
      'Convert JPEG to BMP online for free. Save .jpeg photos as uncompressed 24-bit bitmaps in your browser, with no upload or sign-up. Files become much larger.',
    heading: 'JPEG to BMP Converter',
    description:
      'Convert JPEG to BMP online for free and save .jpeg photos as uncompressed bitmaps. Nothing leaves your device.',
    steps: steps('jpeg', 'bmp', 'Press Convert. Each .jpeg photo is decoded and written as an uncompressed 24-bit BMP.'),
    understanding: {
      paragraphs: [
        'BMP stores every pixel as raw colour values with no compression at all, so a file is roughly width times height times three bytes. A 12-megapixel photo becomes a bitmap of about 36 MB.',
        'That size is the price of simplicity: every program, game engine and embedded device can read a BMP without a decoder library. The picture itself is unchanged from the decoded JPEG.',
        'The bitmap has no transparency here, and no extra quality appears. It looks the same as the .jpeg.',
      ],
      graphics: [
        {
          kind: 'sizeBars',
          caption: 'A 12-megapixel photo (approximate sizes).',
          unit: 'MB',
          bars: [
            { label: 'JPEG', value: 3.5 },
            { label: 'BMP, 24-bit', value: 36, highlight: true },
          ],
        },
        {
          kind: 'table',
          caption: 'JPEG compared with the BMP produced here.',
          columns: ['JPEG', 'BMP'],
          rows: [
            { label: 'Compression', a: 'Lossy', b: 'None' },
            { label: 'Colour depth', a: '24-bit', b: '24-bit' },
            { label: 'Decoder needed', a: 'Yes', b: 'Barely' },
            { label: 'File size', a: 'Small', b: 'About ten times larger' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Old software or hardware', text: 'Some embedded displays and legacy programs read only bitmaps.' },
        { title: 'Image processing code', text: 'Raw pixel data is easy to read without libraries.' },
      ],
      keepOriginal:
        'Keep the .jpeg for storage and sharing. The BMP is only an interchange copy.',
    },
    faqs: [
      { q: 'Why is the BMP so large?', a: 'It stores every pixel without compression.' },
      { q: 'Does the picture get better?', a: 'No, it looks identical to the decoded JPEG.' },
      { q: 'What colour depth is used?', a: '24-bit colour.' },
      { q: 'Are .jpg and .jpeg handled alike?', a: 'Yes.' },
    ],
  },

  'jpeg-to-tiff': {
    title: 'JPEG to TIFF Converter Online — Free, No Upload',
    metaDescription:
      'Convert JPEG to TIFF online for free. Save .jpeg photos as uncompressed single-page TIFF files in your browser, with no upload or sign-up. Large output.',
    heading: 'JPEG to TIFF Converter',
    description:
      'Convert JPEG to TIFF online for free and save .jpeg photos as uncompressed TIFF files. Nothing is uploaded.',
    steps: steps('jpeg', 'tiff', 'Press Convert. Each .jpeg photo is written as a single-page, uncompressed 8-bit RGB TIFF.'),
    understanding: {
      paragraphs: [
        'TIFF is the format print shops, publishers and archives ask for when an image will be processed further. The files made here hold plain RGB pixels, one page each, with no compression.',
        'Because the pixels are raw, the TIFF is many times larger than the .jpeg. It does not improve the image, since the loss from JPEG compression is already in the data.',
        'Layers, CMYK, 16-bit depth and embedded colour profiles are not created.',
      ],
      graphics: [
        {
          kind: 'sizeBars',
          caption: 'A 12-megapixel photo (approximate sizes).',
          unit: 'MB',
          bars: [
            { label: 'JPEG', value: 3.5 },
            { label: 'TIFF, uncompressed', value: 36, highlight: true },
          ],
        },
        {
          kind: 'table',
          caption: 'What the TIFF contains.',
          columns: ['JPEG', 'TIFF output'],
          rows: [
            { label: 'Compression', a: 'Lossy', b: 'None' },
            { label: 'Colour', a: 'RGB', b: '8-bit RGB' },
            { label: 'Pages', a: 'One', b: 'One' },
            { label: 'Colour profile', a: 'May be embedded', b: 'Not carried over' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'A print or publishing submission', text: 'Some workflows accept TIFF but reject JPEG.' },
        { title: 'Archiving a working copy', text: 'An uncompressed file avoids another round of JPEG loss.' },
      ],
      keepOriginal:
        'Keep the .jpeg for everyday use, because the TIFF is far larger and no sharper.',
    },
    faqs: [
      { q: 'Does TIFF restore lost detail?', a: 'No. The loss from JPEG compression stays.' },
      { q: 'Is the TIFF compressed?', a: 'No, it is uncompressed.' },
      { q: 'Does it keep my colour profile?', a: 'No.' },
      { q: 'Is .jpeg handled like .jpg?', a: 'Yes.' },
    ],
  },

  'jpeg-to-ico': {
    title: 'JPEG to ICO Converter Online — Favicon Maker, Free',
    metaDescription:
      'Convert JPEG to ICO online for free. Turn a .jpeg picture into a favicon or icon file in your browser, with no upload or sign-up. Up to 256 pixels square.',
    heading: 'JPEG to ICO Converter',
    description:
      'Convert JPEG to ICO online for free to make a favicon or icon from a .jpeg picture. Everything runs in your browser.',
    steps: steps('jpeg', 'ico', 'Press Convert. The picture is scaled to fit a square canvas of up to 256 pixels and saved as a single-image ICO.'),
    understanding: {
      paragraphs: [
        'ICO is the icon format used by Windows and by browsers for favicon.ico. The converter fits your .jpeg onto a square canvas of up to 256 pixels and stores one image in the file.',
        'A JPEG has no transparency, so the icon is a filled square. For a logo that should sit on any background, remove the background in an editor and convert a PNG instead.',
        'Only one size is written. Windows applications that want several sizes in one ICO need a dedicated icon tool.',
      ],
      graphics: [
        {
          kind: 'table',
          caption: 'What the converter produces.',
          columns: ['JPEG', 'ICO output'],
          rows: [
            { label: 'Shape', a: 'Any ratio', b: 'Square canvas' },
            { label: 'Largest side', a: 'Any size', b: 'Up to 256 pixels' },
            { label: 'Transparency', a: 'No', b: 'Not added' },
            { label: 'Images inside', a: 'One', b: 'One' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Making a quick favicon', text: 'Upload the ICO as favicon.ico on your site.' },
        { title: 'A custom folder or shortcut icon', text: 'Windows accepts ICO for shortcuts.' },
      ],
      keepOriginal:
        'Keep the .jpeg as the source. For crisp logos on transparent backgrounds, start from a PNG.',
    },
    faqs: [
      { q: 'Will the icon be transparent?', a: 'No. A JPEG has no transparency to carry over.' },
      { q: 'What size is the result?', a: 'Up to 256 pixels on the longest side, on a square canvas.' },
      { q: 'Can the ICO hold several sizes?', a: 'No, only one.' },
      { q: 'Does it accept .jpg too?', a: 'Yes, both extensions work.' },
    ],
  },

  'jpeg-to-svg': {
    title: 'JPEG to SVG Converter Online — Embeds the Photo',
    metaDescription:
      'Convert JPEG to SVG online for free. Wraps your .jpeg photo inside an SVG file in your browser; it is not vector tracing. No upload or sign-up needed.',
    heading: 'JPEG to SVG Converter',
    description:
      'Convert JPEG to SVG online for free: your .jpeg photo is embedded inside an SVG file. It is wrapped, not traced into vectors.',
    steps: steps('jpeg', 'svg', 'Press Convert. The photo is embedded inside an SVG file at its original pixel size.'),
    understanding: {
      paragraphs: [
        'SVG normally holds shapes described by maths, which scale without blurring. A photograph cannot be turned into shapes by a simple conversion, so this tool places the .jpeg inside an SVG wrapper as an embedded image.',
        'The file opens anywhere an SVG does, but it stays a pixel image: enlarging it blurs it just as the JPEG would. Tracing a photo into true vectors needs a dedicated tracing tool and rarely looks good for photographs.',
        'The SVG is larger than the .jpeg because the image data is embedded as text.',
      ],
      graphics: [
        {
          kind: 'vector',
          caption: 'The photo stays pixels; only the wrapper is SVG.',
          alt: 'A pixelated image labelled JPEG and an identical pixelated image inside an SVG frame, both blurred when enlarged.',
          sourceLabel: 'JPEG, pixels',
          targetLabel: 'SVG, same pixels',
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'A tool that takes SVG only', text: 'Some designers\' tools and templates insist on SVG files.' },
        { title: 'Placing a photo in an SVG layout', text: 'The embedded image can sit inside a larger vector design.' },
      ],
      keepOriginal:
        'Keep the .jpeg. The SVG is bigger and no sharper, and it is not a vector version of your photo.',
    },
    faqs: [
      { q: 'Is the result a true vector?', a: 'No. It contains the original pixels inside an SVG wrapper.' },
      { q: 'Will it scale without blurring?', a: 'No, the embedded photo blurs when enlarged.' },
      { q: 'Why is the SVG larger?', a: 'The image data is embedded as text.' },
      { q: 'How do I vectorise a logo?', a: 'Use an image tracing tool on a flat graphic, not a photograph.' },
    ],
  },

  'jpeg-to-pdf': {
    title: 'JPEG to PDF Converter Online — Free, No Upload',
    metaDescription:
      'Convert JPEG to PDF online for free. Turn .jpeg photos into PDF pages in your browser, with no upload or sign-up. Up to 20 files, each on its own PDF.',
    heading: 'JPEG to PDF Converter',
    description:
      'Convert JPEG to PDF online for free and turn .jpeg photos into PDF pages. Your files stay in your browser.',
    steps: steps('jpeg', 'pdf', 'Press Convert. Each .jpeg photo is placed on a PDF page the same size as the image.', { download: 'Save the PDF. If you converted several photos, they download as a ZIP with one PDF per photo.' }),
    understanding: {
      paragraphs: [
        'The converter puts each .jpeg on its own PDF page. The page matches the image\'s pixel size, so nothing is cropped or padded.',
        'Because the picture is already a JPEG, it is stored in the PDF at 92% quality, which keeps the file size sensible and looks unchanged in normal use. Words in a photographed document are part of the picture, so they cannot be selected or searched.',
        'Several photos make several PDFs, not one combined document.',
      ],
      graphics: [
        {
          kind: 'pages',
          caption: 'A photo becomes a full-page PDF.',
          alt: 'A loose photograph on the left; on the right the same picture filling one PDF page.',
          left: { label: 'JPEG photo', look: 'image' },
          right: { label: 'One-page PDF', look: 'photo' },
        },
        {
          kind: 'table',
          caption: 'JPEG compared with the PDF produced here.',
          columns: ['JPEG', 'PDF output'],
          rows: [
            { label: 'Page size', a: 'Not applicable', b: 'Same as the image' },
            { label: 'Image quality', a: 'As saved', b: 'Stored at 92%' },
            { label: 'Text in the picture', a: 'Pixels only', b: 'Still pixels' },
            { label: 'Several files', a: 'Separate', b: 'Separate PDFs' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Submitting a photographed form or receipt', text: 'Many portals take PDFs and reject image files.' },
        { title: 'Sending a photo as a document', text: 'A PDF opens consistently on every device.' },
        { title: 'Printing a picture at a known page size', text: 'The page keeps the exact pixel proportions.' },
      ],
      keepOriginal:
        'Keep the .jpeg if you still need to edit or reuse the picture. The PDF holds only a recompressed copy.',
    },
    faqs: [
      { q: 'Can I combine several JPEGs into one PDF?', a: 'Not here. Each photo becomes its own PDF.' },
      { q: 'Can I search the text in a scanned page?', a: 'No. There is no text recognition.' },
      { q: 'Does the PDF reduce quality?', a: 'It stores the picture at 92% JPEG quality, a very small change.' },
      { q: 'Are .jpg and .jpeg both accepted?', a: 'Yes, they are the same format.' },
    ],
  },
};
