import type { ConversionPage } from './types';
import { steps } from './helpers';

/** Image conversions from SVG and AVIF. */
export const IMAGE_PAGES_C: Record<string, ConversionPage> = {
  'svg-to-jpg': {
    title: 'SVG to JPG Converter Online — Free, No Upload',
    metaDescription:
      'Convert SVG to JPG online for free. Renders the vector at the size set in the file on a white background, in your browser with no upload or sign-up.',
    heading: 'SVG to JPG Converter',
    description:
      'Convert SVG to JPG online for free by rendering the vector on a white background. Nothing is uploaded.',
    steps: steps('svg', 'jpg', 'Press Convert. Your browser draws each SVG at the width and height set in the file, on white, and saves it as a JPG at 92% quality.'),
    understanding: {
      paragraphs: [
        'An SVG is drawn from shapes, so turning it into a JPG means picking one size and rendering it as pixels. The size comes from the width and height written in the SVG; a file without them falls back to a default.',
        'JPG has no transparency, so everything not covered by the artwork becomes white. JPG also smudges flat colour edges slightly. For logos and line art, PNG stays sharper, and JPG makes sense mainly where a photo-style file is required.',
        'Once rasterised, the JPG cannot be enlarged without blurring, so keep the SVG.',
      ],
      graphics: [
        {
          kind: 'vector',
          caption: 'Rendering fixes the picture at one size.',
          alt: 'A smooth vector curve on the left; the same curve drawn as blocky pixels on the right.',
          sourceLabel: 'SVG: curves, any size',
          targetLabel: 'JPG: pixels, one size',
        },
        {
          kind: 'transparency',
          caption: 'Areas with nothing drawn become white.',
          alt: 'A logo on a transparent background becomes the same logo on a solid white background after conversion to JPG.',
          sourceLabel: 'SVG, transparent',
          targetLabel: 'JPG on white',
          result: 'white',
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'A form that only accepts JPG', text: 'Profile, product and ID-style uploads often accept JPG and nothing else.' },
        { title: 'Sending a logo to someone without design software', text: 'A JPG opens in every image viewer and email client.' },
      ],
      keepOriginal:
        'Keep the SVG as your master, and convert to PNG instead when you need a transparent background or sharp edges. A JPG of a logo is both blurrier and non-transparent.',
    },
    faqs: [
      { q: 'What size will the JPG be?', a: 'The width and height written in the SVG. Edit them first for a larger image.' },
      { q: 'Why is the background white?', a: 'JPG cannot store transparency, so empty areas are filled with white.' },
      { q: 'Should I choose PNG instead?', a: 'For logos and graphics, yes. PNG keeps edges crisp and transparency.' },
      { q: 'Why do the fonts look different?', a: 'Text is drawn with fonts installed on your device. Convert text to outlines in your design tool to avoid substitutions.' },
    ],
  },

  'svg-to-webp': {
    title: 'SVG to WebP Converter Online — Free, No Upload',
    metaDescription:
      'Convert SVG to WebP online for free as a small raster image with transparency kept. Runs in your browser with no upload. Needs WebP-capable browser.',
    heading: 'SVG to WebP Converter',
    description:
      'Convert SVG to WebP online for free as a small raster image that keeps its transparent background.',
    steps: steps('svg', 'webp', 'Press Convert. Your browser draws each SVG at its declared size and encodes it as WebP at 92% quality, transparency kept.'),
    understanding: {
      paragraphs: [
        'WebP gives a compact raster copy of a vector graphic while keeping transparency, which makes it useful for web pages that cannot use SVG directly.',
        'The picture is rendered once at the width and height set in the SVG and then compressed with lossy WebP. Sharp edges on flat colours can show faint artefacts that PNG would avoid. The result is pixels, so it blurs if enlarged.',
        'Encoding comes from your browser; Chrome, Edge and Firefox support it, while some Safari versions do not.',
      ],
      graphics: [
        {
          kind: 'transparency',
          caption: 'Transparent areas stay transparent in the WebP.',
          alt: 'A logo on a transparent background remains on a transparent background after conversion to WebP.',
          sourceLabel: 'SVG, transparent',
          targetLabel: 'WebP with transparency',
          result: 'kept',
        },
        {
          kind: 'table',
          caption: 'SVG compared with the WebP produced here.',
          columns: ['SVG', 'WebP output'],
          rows: [
            { label: 'Made of', a: 'Shapes', b: 'Pixels' },
            { label: 'Scales cleanly', a: 'Yes', b: 'No' },
            { label: 'Compression', a: 'Not applicable', b: 'Lossy, 92%' },
            { label: 'Transparency', a: 'Yes', b: 'Yes' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Image fields that reject SVG', text: 'Social networks, marketplaces and many CMS media libraries accept raster formats only.' },
        { title: 'Lightweight raster fallbacks', text: 'A compact WebP works as a fallback for older embeds that cannot draw SVG.' },
      ],
      keepOriginal:
        'Keep the SVG for websites that support it, since it stays sharp at every size. If edge accuracy matters, convert to PNG instead of WebP.',
    },
    faqs: [
      { q: 'What size is the WebP?', a: 'The width and height declared in the SVG.' },
      { q: 'Is it lossless?', a: 'No. It uses 92% lossy WebP, so PNG is better for razor-sharp edges.' },
      { q: 'Is transparency kept?', a: 'Yes.' },
      { q: 'Why does my browser fail to encode it?', a: 'Some Safari versions cannot encode WebP. Use Chrome, Edge or Firefox.' },
    ],
  },

  'svg-to-pdf': {
    title: 'SVG to PDF Converter Online — Free, No Upload',
    metaDescription:
      'Convert SVG to PDF online for free. The vector is rendered to an image and placed on a one-page PDF, in your browser with no upload or sign-up.',
    heading: 'SVG to PDF Converter',
    description:
      'Convert SVG to PDF online for free: the drawing is rendered and placed on a one-page PDF. Nothing is uploaded.',
    steps: steps('svg', 'pdf', 'Press Convert. Each SVG is rendered on white at its declared size and placed on a PDF page of the same size.', { download: 'Save the PDF. Several SVGs download as a ZIP with one PDF per file.' }),
    understanding: {
      paragraphs: [
        'It is natural to expect a vector PDF from an SVG, with curves that stay sharp at any zoom. This converter does not produce that. It renders the SVG as pixels and stores the picture on the PDF page as a JPEG.',
        'The page matches the SVG\'s declared width and height. Zooming far into the PDF will show pixels. Empty areas become white because the stored JPEG has no transparency.',
        'For true vector PDF output, open the SVG in a vector editor or browser and print to PDF.',
      ],
      graphics: [
        {
          kind: 'vector',
          caption: 'The PDF holds a picture of the drawing, not the curves.',
          alt: 'A smooth vector curve on the left; the same curve drawn as blocky pixels on the right.',
          sourceLabel: 'SVG: curves',
          targetLabel: 'PDF page: pixels',
        },
        {
          kind: 'table',
          caption: 'Picture in a PDF, or a vector PDF.',
          columns: ['This converter', 'Print to PDF from a browser'],
          rows: [
            { label: 'Content', a: 'Rendered image', b: 'Vector drawing' },
            { label: 'Zoom quality', a: 'Pixelates', b: 'Stays sharp' },
            { label: 'Text selectable', a: 'No', b: 'Often yes' },
            { label: 'Effort', a: 'One click', b: 'Open and print' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Sending a diagram that must open anywhere', text: 'A PDF is read by every device, while SVG support varies.' },
        { title: 'A form that accepts only PDF', text: 'Attach a logo or drawing without converting it in design software.' },
      ],
      keepOriginal:
        'Keep the SVG as the master. When print quality or zooming matters, print the SVG to PDF from your browser or a vector editor, which keeps the shapes as curves.',
    },
    faqs: [
      { q: 'Is the PDF a vector file?', a: 'No. It contains a rendered image of the SVG.' },
      { q: 'How do I get a vector PDF?', a: 'Open the SVG in a browser or vector editor and print or export to PDF.' },
      { q: 'What size is the page?', a: 'The width and height declared in the SVG.' },
      { q: 'Is transparency kept?', a: 'No. Empty areas become white.' },
    ],
  },

  'avif-to-webp': {
    title: 'AVIF to WebP Converter Online — Free, No Upload',
    metaDescription:
      'Convert AVIF to WebP online for free for wider browser and editor support. Transparency is kept, in your browser with no upload. Needs WebP encoding.',
    heading: 'AVIF to WebP Converter',
    description:
      'Convert AVIF to WebP online for free for wider support, with transparency kept. Runs in your browser.',
    steps: steps('avif', 'webp', 'Press Convert. Your browser decodes each AVIF and encodes it again as WebP at 92% quality, keeping transparency.'),
    understanding: {
      paragraphs: [
        'AVIF and WebP are both modern web formats. AVIF compresses better, but WebP has been supported for much longer, including in older editors and CMS platforms.',
        'Converting re-compresses the picture with another lossy codec, and WebP usually needs more bytes than AVIF for the same quality, so the file grows. Transparency is preserved.',
        'Your browser must be able to read AVIF and write WebP. Current Chrome, Edge and Firefox can do both; Safari may not be able to encode WebP.',
      ],
      graphics: [
        {
          kind: 'sizeBars',
          caption: 'The same photograph, approximate.',
          unit: 'MB',
          bars: [
            { label: 'AVIF', value: 1 },
            { label: 'WebP at 92% quality', value: 2.2, highlight: true },
          ],
        },
        {
          kind: 'support',
          caption: 'Where each format opens.',
          columns: ['AVIF', 'WebP'],
          rows: [
            { label: 'Current browsers', a: 'yes', b: 'yes' },
            { label: 'Browsers from before 2022', a: 'no', b: 'yes' },
            { label: 'Image editors and CMS tools', a: 'partial', b: 'yes' },
            { label: 'Email clients', a: 'partial', b: 'partial' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'A CMS or tool that accepts WebP but not AVIF', text: 'WebP is on far more allowed-format lists than AVIF.' },
        { title: 'Supporting older visitors', text: 'Browsers from a few years ago display WebP but not AVIF.' },
      ],
      keepOriginal:
        'Keep the AVIF where it works, since it is smaller. Do not chain lossy conversions: always convert from the original image if you still have it.',
    },
    faqs: [
      { q: 'Will the WebP be bigger than the AVIF?', a: 'Usually, because AVIF compresses more efficiently.' },
      { q: 'Is transparency kept?', a: 'Yes.' },
      { q: 'Why did it say my browser cannot encode WebP?', a: 'WebP encoding is a browser feature, missing in some Safari versions.' },
      { q: 'Is this lossless?', a: 'No. Both the original and the new file are lossy.' },
    ],
  },

  'avif-to-gif': {
    title: 'AVIF to GIF Converter Online — Free, No Upload',
    metaDescription:
      'Convert AVIF to GIF online for free as a still 256-colour image with transparency on white. Runs in your browser with no upload or sign-up needed.',
    heading: 'AVIF to GIF Converter',
    description:
      'Convert AVIF to GIF online for free as a still 256-colour image. Nothing is uploaded.',
    steps: steps('avif', 'gif', 'Press Convert. Each AVIF is decoded, placed on white and reduced to 256 colours as a single-frame GIF.'),
    understanding: {
      paragraphs: [
        'AVIF can carry millions of colours and smooth transparency; GIF cannot. The conversion maps every pixel to one of 256 palette colours, so photographs lose gradients and show banding.',
        'Transparency is replaced by white, and the GIF is a single frame. The file often ends up larger than the AVIF, which is among the most compact formats there is.',
        'Use this only where a GIF is demanded, such as a chat tool or forum field that rejects newer formats.',
      ],
      graphics: [
        {
          kind: 'table',
          caption: 'AVIF compared with the GIF produced here.',
          columns: ['AVIF', 'GIF output'],
          rows: [
            { label: 'Colours', a: 'Millions, HDR possible', b: '256' },
            { label: 'Transparency', a: 'Smooth', b: 'Filled with white' },
            { label: 'File size', a: 'Very small', b: 'Larger' },
            { label: 'Animation', a: 'Possible', b: 'Not created' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'A tool that accepts only GIF', text: 'A few old forums and messaging features list GIF but not AVIF.' },
        { title: 'Flat artwork', text: 'Logos and icons with few colours survive the palette limit.' },
      ],
      keepOriginal:
        'Keep the AVIF for photographs. If you need a more compatible still, JPG or PNG preserve far more than GIF.',
    },
    faqs: [
      { q: 'Will the GIF look worse?', a: 'For photos, yes: 256 colours cannot show smooth gradients.' },
      { q: 'What happens to transparency?', a: 'It becomes white.' },
      { q: 'Is the GIF animated?', a: 'No. It is one frame.' },
      { q: 'Which format is better for compatibility?', a: 'JPG for photos, PNG for graphics.' },
    ],
  },

  'avif-to-bmp': {
    title: 'AVIF to BMP Converter Online — Free, No Upload',
    metaDescription:
      'Convert AVIF to BMP online for free for software that only opens bitmaps. Transparency becomes white. Runs in your browser with no upload or sign-up.',
    heading: 'AVIF to BMP Converter',
    description:
      'Convert AVIF to BMP online for free for software that only opens bitmaps. Runs in your browser.',
    steps: steps('avif', 'bmp', 'Press Convert. Each AVIF is decoded, placed on white where transparent, and saved as an uncompressed 24-bit BMP.'),
    understanding: {
      paragraphs: [
        'This is the biggest size jump among image conversions. AVIF is one of the smallest formats and BMP the largest, so a few hundred kilobytes can become several megabytes.',
        'The BMP is 24-bit with no compression, so HDR and extended colour in the AVIF are reduced to ordinary 8-bit colour, and transparency is replaced by white.',
        'The picture looks the same as the AVIF on a standard display. Nothing is gained apart from compatibility with software that reads bitmaps.',
      ],
      graphics: [
        {
          kind: 'sizeBars',
          caption: 'A 1920×1080 photograph, approximate.',
          unit: 'MB',
          bars: [
            { label: 'AVIF', value: 0.25 },
            { label: 'BMP, 24-bit', value: 6.2, highlight: true },
          ],
        },
        {
          kind: 'transparency',
          caption: 'Transparency in the AVIF is filled with white in the BMP.',
          alt: 'A logo on a transparent background becomes the same logo on a solid white background after conversion to BMP.',
          sourceLabel: 'AVIF with transparency',
          targetLabel: 'BMP on white',
          result: 'white',
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Legacy Windows applications', text: 'Some old programs open only bitmaps, and certainly not AVIF.' },
        { title: 'Hardware that loads raw bitmaps', text: 'Embedded displays and some industrial tools expect BMP.' },
      ],
      keepOriginal:
        'Keep the AVIF for storage and the web. If you just need something every program opens, PNG or JPG are a far better choice than BMP.',
    },
    faqs: [
      { q: 'Why is the BMP so large?', a: 'AVIF compresses extremely well, while BMP stores three bytes per pixel.' },
      { q: 'Is HDR preserved?', a: 'No. The BMP is 8-bit, so HDR is reduced to standard colour.' },
      { q: 'What about transparency?', a: 'It is filled with white.' },
      { q: 'Is there a smaller compatible format?', a: 'Yes: JPG for photos or PNG for graphics.' },
    ],
  },

  'avif-to-tiff': {
    title: 'AVIF to TIFF Converter Online — Free, No Upload',
    metaDescription:
      'Convert AVIF to TIFF online for free for print and archive workflows. Writes an uncompressed 8-bit RGB TIFF in your browser with no upload or sign-up.',
    heading: 'AVIF to TIFF Converter',
    description:
      'Convert AVIF to TIFF online for free when print or archive software wants TIFF. Nothing is uploaded.',
    steps: steps('avif', 'tiff', 'Press Convert. Each AVIF is decoded and written as an uncompressed 8-bit RGB TIFF, transparency on white.'),
    understanding: {
      paragraphs: [
        'Print and archive systems rarely understand AVIF. The TIFF produced here carries the decoded picture in the format those systems expect: one page, 8 bits per channel, RGB, uncompressed.',
        'AVIF is usually lossy, and the TIFF cannot undo that; it simply stops further loss from stacking up when you edit and save. HDR and wide-gamut colour are reduced to 8-bit RGB, and transparency becomes white.',
        'Expect a very large file, since AVIF is one of the most compact formats and TIFF is uncompressed.',
      ],
      graphics: [
        {
          kind: 'sizeBars',
          caption: 'A 12-megapixel photograph, approximate.',
          unit: 'MB',
          bars: [
            { label: 'AVIF', value: 1.5 },
            { label: 'TIFF, uncompressed', value: 36, highlight: true },
          ],
        },
        {
          kind: 'table',
          caption: 'AVIF compared with the TIFF produced here.',
          columns: ['AVIF', 'TIFF output'],
          rows: [
            { label: 'Colour depth', a: 'Up to 12-bit, HDR', b: '8-bit RGB' },
            { label: 'Transparency', a: 'Yes', b: 'Placed on white' },
            { label: 'Compression', a: 'Lossy or lossless', b: 'None' },
            { label: 'Print support', a: 'Rare', b: 'Standard' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Submitting an image to a printer', text: 'A downloaded AVIF needs to become TIFF before most shops will take it.' },
        { title: 'Editing in older tools', text: 'Legacy editors open TIFF and not AVIF, and saving a TIFF adds no further compression.' },
      ],
      keepOriginal:
        'Keep the AVIF for the web. The TIFF is many times larger and shows nothing more.',
    },
    faqs: [
      { q: 'Does the TIFF improve the image?', a: 'No. It stores the decoded pixels without more compression.' },
      { q: 'What happens to HDR?', a: 'The TIFF is 8-bit RGB, so HDR is reduced.' },
      { q: 'Why is it so big?', a: 'It is uncompressed, while AVIF is highly compressed.' },
      { q: 'Does it support CMYK?', a: 'No, only RGB.' },
    ],
  },

  'avif-to-pdf': {
    title: 'AVIF to PDF Converter Online — Free, No Upload',
    metaDescription:
      'Convert AVIF to PDF online for free. Each image becomes a one-page PDF in your browser, transparency on white, with no upload or sign-up. Up to 20 files.',
    heading: 'AVIF to PDF Converter',
    description:
      'Convert AVIF to PDF online for free: each AVIF image becomes its own one-page PDF. Nothing is uploaded.',
    steps: steps('avif', 'pdf', 'Press Convert. Each AVIF is decoded, placed on white and put on a PDF page of the same size.', { download: 'Save the PDF. Several images download as a ZIP with one PDF per image.' }),
    understanding: {
      paragraphs: [
        'Document portals accept PDF, and almost none accept AVIF. Wrapping the image in a PDF makes it usable as an attachment.',
        'The PDF page has the same pixel size as the AVIF, and the picture is stored in it as a JPEG at 92% quality. Transparent areas turn white, and any text in the image remains part of the picture.',
        'Each file produces a separate PDF, and your browser has to be able to draw AVIF images first.',
      ],
      graphics: [
        {
          kind: 'pages',
          caption: 'The image becomes one PDF page of the same proportions.',
          alt: 'A loose image on the left; on the right the same image filling one PDF page.',
          left: { label: 'AVIF image', look: 'image' },
          right: { label: 'One-page PDF', look: 'photo' },
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Attaching an AVIF where only PDF is accepted', text: 'Claim, application and support forms typically accept PDF.' },
        { title: 'Printing an AVIF', text: 'Many print workflows open PDF but not AVIF.' },
      ],
      keepOriginal:
        'Keep the AVIF to share the picture online. To put several images in one PDF, convert them here and merge the PDFs.',
    },
    faqs: [
      { q: 'Can I merge several AVIF images into one PDF?', a: 'Not here. Each image becomes its own PDF.' },
      { q: 'Why will my AVIF not convert?', a: 'Your browser must be able to display AVIF. Update to a current Chrome, Edge, Firefox or Safari.' },
      { q: 'Does quality drop?', a: 'Slightly. The image is stored as a 92% JPEG.' },
      { q: 'What happens to transparency?', a: 'It is filled with white.' },
    ],
  },
};
