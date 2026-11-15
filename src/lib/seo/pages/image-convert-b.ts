import type { ConversionPage } from './types';
import { steps } from './helpers';

/** Image conversions from WebP, GIF and BMP. */
export const IMAGE_PAGES_B: Record<string, ConversionPage> = {
  'webp-to-gif': {
    title: 'WebP to GIF Converter Online — Free, No Upload',
    metaDescription:
      'Convert WebP to GIF online for free. Saves a still 256-colour GIF with transparency on white, in your browser with no upload. Animated WebP gives frame one.',
    heading: 'WebP to GIF Converter',
    description:
      'Convert WebP to GIF online for free: you get a still GIF, even from an animated WebP, and nothing is uploaded.',
    steps: steps('webp', 'gif', 'Press Convert. The first frame of each WebP is reduced to 256 colours and saved as a single-frame GIF on a white background.'),
    understanding: {
      paragraphs: [
        'WebP can hold photographs, transparency and animation. GIF can hold none of those well, which makes this a lossy step for most images.',
        'Only the first frame is converted, so an animated WebP does not become an animated GIF. The palette is limited to 256 colours, so photographs show banding, and transparent areas are filled with white.',
        'If your goal is a GIF animation from a WebP, this tool will not do it; it extracts a single still.',
      ],
      graphics: [
        {
          kind: 'frames',
          caption: 'An animated WebP becomes one still GIF: the first frame.',
          alt: 'Four animation frames on the left; only the first frame remains on the right.',
          sourceLabel: 'Animated WebP',
          targetLabel: 'GIF (first frame)',
        },
        {
          kind: 'table',
          caption: 'WebP compared with the GIF produced here.',
          columns: ['WebP', 'GIF output'],
          rows: [
            { label: 'Colours', a: 'Millions', b: '256' },
            { label: 'Transparency', a: 'Smooth alpha', b: 'Filled with white' },
            { label: 'Animation', a: 'Supported', b: 'Single frame' },
            { label: 'File size', a: 'Small', b: 'Often larger' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'A tool that rejects WebP', text: 'Older chat clients and some email tools accept GIF but not WebP.' },
        { title: 'A flat-colour graphic', text: 'Logos and icons with few colours survive the 256-colour limit without visible change.' },
      ],
      keepOriginal:
        'Keep the WebP for photographs and anything animated. If you only need an image that opens in more places, PNG or JPG preserve far more than GIF.',
    },
    faqs: [
      { q: 'Does an animated WebP become an animated GIF?', a: 'No. The converter takes the first frame only.' },
      { q: 'Why does my photo look banded?', a: 'GIF can use only 256 colours per image, so gradients are flattened.' },
      { q: 'What happens to transparency?', a: 'It is replaced by white.' },
      { q: 'Is there a better format to convert to?', a: 'For photos choose JPG; for graphics with transparency choose PNG.' },
    ],
  },

  'webp-to-bmp': {
    title: 'WebP to BMP Converter Online — Free, No Upload',
    metaDescription:
      'Convert WebP to BMP online for free for software that only opens bitmaps. Transparency becomes white. Runs in your browser with no upload or sign-up.',
    heading: 'WebP to BMP Converter',
    description:
      'Convert WebP to BMP online for free for older software that only opens bitmaps. Runs in your browser.',
    steps: steps('webp', 'bmp', 'Press Convert. Each WebP is decoded, placed on white where it is transparent, and saved as an uncompressed 24-bit BMP.'),
    understanding: {
      paragraphs: [
        'WebP is one of the most compact image formats; BMP is the least. Converting from one to the other expands the file many times over without changing how the picture looks.',
        'The BMP is 24-bit, so there is no alpha channel: a transparent WebP gets a white background. Animated WebP files give their first frame.',
        'Because the BMP is uncompressed, its size depends only on the image dimensions, at about three bytes per pixel.',
      ],
      graphics: [
        {
          kind: 'sizeBars',
          caption: 'A 1920×1080 image, approximate.',
          unit: 'MB',
          bars: [
            { label: 'WebP (typical)', value: 0.3 },
            { label: 'BMP, 24-bit', value: 6.2, highlight: true },
          ],
        },
        {
          kind: 'transparency',
          caption: 'Transparency in the WebP is filled with white in the BMP.',
          alt: 'A logo on a transparent background becomes the same logo on a solid white background after conversion to BMP.',
          sourceLabel: 'WebP with transparency',
          targetLabel: 'BMP on white',
          result: 'white',
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'A Windows tool that reads only bitmaps', text: 'Some legacy applications, scanners\' software and drivers accept only BMP.' },
        { title: 'Embedded displays', text: 'Hobbyist and industrial displays commonly load raw bitmaps.' },
      ],
      keepOriginal:
        'Keep the WebP wherever it is supported, since it is far smaller. If you just need a widely supported image, PNG is a better choice than BMP.',
    },
    faqs: [
      { q: 'Why is the BMP hundreds of times bigger?', a: 'WebP compresses heavily, while BMP stores every pixel as three bytes.' },
      { q: 'Is quality affected?', a: 'The picture looks the same. Only transparency is lost.' },
      { q: 'What about animated WebP?', a: 'Only the first frame is saved.' },
      { q: 'Which BMP type is created?', a: 'A standard 24-bit uncompressed Windows bitmap.' },
    ],
  },

  'webp-to-tiff': {
    title: 'WebP to TIFF Converter Online — Free, No Upload',
    metaDescription:
      'Convert WebP to TIFF online for free for print and archive use. Writes an uncompressed 8-bit RGB TIFF in your browser, with no upload or sign-up.',
    heading: 'WebP to TIFF Converter',
    description:
      'Convert WebP to TIFF online for free when print or archive software wants TIFF. Runs in your browser.',
    steps: steps('webp', 'tiff', 'Press Convert. Each WebP is decoded, transparency is placed on white, and an uncompressed 8-bit RGB TIFF is written.'),
    understanding: {
      paragraphs: [
        'TIFF is requested by print shops, scanners\' software and archives, none of which read WebP. The conversion decodes the WebP and stores the pixels in a TIFF.',
        'The TIFF is one page, 8 bits per channel, RGB, uncompressed, with no alpha channel. Transparent WebP areas become white. If the WebP was lossy, its compression artefacts are kept as they are; the TIFF cannot restore them.',
        'Expect a large file: about three bytes per pixel, far more than a WebP.',
      ],
      graphics: [
        {
          kind: 'sizeBars',
          caption: 'A 12-megapixel image, approximate.',
          unit: 'MB',
          bars: [
            { label: 'WebP (typical)', value: 2.5 },
            { label: 'TIFF, uncompressed', value: 36, highlight: true },
          ],
        },
        {
          kind: 'table',
          caption: 'WebP compared with the TIFF produced here.',
          columns: ['WebP', 'TIFF output'],
          rows: [
            { label: 'Compression', a: 'Lossy or lossless', b: 'None' },
            { label: 'Transparency', a: 'Yes', b: 'Placed on white' },
            { label: 'Colour', a: '8-bit', b: '8-bit RGB' },
            { label: 'Accepted by print workflows', a: 'Rarely', b: 'Commonly' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Handing an image to a printer', text: 'A web image saved as WebP needs a print-friendly format before a shop will take it.' },
        { title: 'Archives that require TIFF', text: 'Collections often standardise on TIFF masters regardless of the original format.' },
      ],
      keepOriginal:
        'Keep the WebP for the web, where its size matters. For anything shown on screen, a TIFF has no advantage and is many times larger.',
    },
    faqs: [
      { q: 'Does the TIFF improve a WebP\'s quality?', a: 'No. It stores the decoded pixels without further compression, but cannot add detail.' },
      { q: 'What happens to transparency?', a: 'It is placed on white, since the TIFF has no alpha channel.' },
      { q: 'Does it produce CMYK?', a: 'No. The output is RGB.' },
      { q: 'Why is the file so large?', a: 'It is uncompressed, at roughly three bytes per pixel.' },
    ],
  },

  'webp-to-ico': {
    title: 'WebP to ICO Converter Online — Free, No Upload',
    metaDescription:
      'Convert WebP to ICO online for free to make an icon or favicon with transparency kept. Fits a square up to 256 px, in your browser with no upload.',
    heading: 'WebP to ICO Converter',
    description:
      'Convert WebP to ICO online for free to make an icon or favicon, with transparency kept. Nothing is uploaded.',
    steps: steps('webp', 'ico', 'Press Convert. The image is fitted inside a square canvas of up to 256 pixels with its transparency kept, and saved as an ICO.'),
    understanding: {
      paragraphs: [
        'Icons for Windows and favicons for websites use the ICO container. Many logos are delivered as WebP now, and desktop tools often cannot import them, so the ICO has to be made first.',
        'One image is written, up to 256 by 256 pixels. A non-square picture is fitted into the square without stretching, and the leftover space is transparent. Small images are not enlarged. Transparency in the WebP is kept.',
        'At 16 or 32 pixels, the sizes browsers actually show, fine detail disappears. A simple, bold mark is the best source.',
      ],
      graphics: [
        {
          kind: 'transparency',
          caption: 'Transparent areas in the WebP stay transparent in the ICO.',
          alt: 'A logo on a transparent background remains on a transparent background after conversion to ICO.',
          sourceLabel: 'WebP with transparency',
          targetLabel: 'ICO with transparency',
          result: 'kept',
        },
        {
          kind: 'table',
          caption: 'How the icon is made.',
          columns: ['Your WebP', 'ICO output'],
          rows: [
            { label: 'Shape', a: 'Any proportions', b: 'Square, image fitted' },
            { label: 'Size', a: 'Any', b: 'Up to 256 × 256 px' },
            { label: 'Transparency', a: 'Yes', b: 'Kept' },
            { label: 'Images in the file', a: 'Not applicable', b: 'One' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'A favicon from a WebP logo', text: 'Site builders that ask for a favicon.ico need the ICO format specifically.' },
        { title: 'A desktop shortcut icon', text: 'Windows applies .ico files to shortcuts, and does not accept WebP there.' },
      ],
      keepOriginal:
        'Keep the WebP as the master. Modern browsers accept a PNG favicon linked in the page head, so use ICO only where it is mandatory.',
    },
    faqs: [
      { q: 'Is transparency preserved?', a: 'Yes, the icon keeps its alpha channel.' },
      { q: 'How big is the icon?', a: 'Up to 256 by 256 pixels. Smaller images keep their size.' },
      { q: 'Does the ICO contain multiple sizes?', a: 'No, one image, which apps scale as required.' },
      { q: 'What if the WebP is animated?', a: 'The first frame becomes the icon.' },
    ],
  },

  'webp-to-svg': {
    title: 'WebP to SVG Converter Online — Embeds the Image',
    metaDescription:
      'Convert WebP to SVG online for free. The image is embedded in an SVG file with transparency kept, but it is not traced into vectors. No upload needed.',
    heading: 'WebP to SVG Converter',
    description:
      'Convert WebP to SVG online for free by embedding the image in an SVG file. It does not trace vector shapes.',
    steps: steps('webp', 'svg', 'Press Convert. The WebP is decoded and embedded as a PNG inside an SVG file at its original pixel size.'),
    understanding: {
      paragraphs: [
        'An SVG made from a WebP is a container, not a vector drawing. The picture is stored inside it as a PNG, so it stays made of pixels and blurs if enlarged.',
        'Dimensions and transparency are preserved. The file can be dropped into anything that accepts SVG, which is the usual reason for this conversion. It cannot be edited as shapes.',
        'Because the embedded copy is lossless PNG data, the SVG is usually much larger than the WebP.',
      ],
      graphics: [
        {
          kind: 'vector',
          caption: 'A WebP inside an SVG is still pixels. A traced vector would be curves.',
          alt: 'A smooth curve with control points on the left; the same curve drawn from blocky pixels on the right.',
          sourceLabel: 'Real vector: curves',
          targetLabel: 'WebP in SVG: pixels',
        },
        {
          kind: 'table',
          caption: 'The SVG this converter produces.',
          columns: ['True SVG', 'This converter'],
          rows: [
            { label: 'Content', a: 'Shapes, paths, text', b: 'Embedded raster image' },
            { label: 'Resizes cleanly', a: 'Yes', b: 'No' },
            { label: 'Transparency', a: 'Yes', b: 'Yes, kept' },
            { label: 'Size vs the WebP', a: 'Usually small', b: 'Larger' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'A tool that only accepts SVG', text: 'Some craft and design tools check the file type before importing.' },
        { title: 'Bundling a picture with vector elements', text: 'You can later place text or shapes around the embedded image inside one file.' },
      ],
      keepOriginal:
        'Keep the WebP wherever a bitmap is accepted. For a scalable logo, trace it in vector software such as Inkscape; only simple shapes trace well.',
    },
    faqs: [
      { q: 'Is the SVG a real vector?', a: 'No, it wraps your image as pixels.' },
      { q: 'How can I get scalable artwork?', a: 'Trace the image with Inkscape\'s Trace Bitmap or Illustrator\'s Image Trace.' },
      { q: 'Is transparency kept?', a: 'Yes.' },
      { q: 'Why is the SVG so large?', a: 'The image is embedded as lossless PNG data, which is bigger than WebP.' },
    ],
  },

  'webp-to-pdf': {
    title: 'WebP to PDF Converter Online — Free, No Upload',
    metaDescription:
      'Convert WebP to PDF online for free. Each image becomes a one-page PDF in your browser, with transparency on white. No upload or sign-up. Up to 20 files.',
    heading: 'WebP to PDF Converter',
    description:
      'Convert WebP to PDF online for free: each WebP image becomes its own one-page PDF. Nothing is uploaded.',
    steps: steps('webp', 'pdf', 'Press Convert. Each image is placed on white and a PDF page of the same size is created.', { download: 'Save the PDF. Several images download as a ZIP with one PDF per image.' }),
    understanding: {
      paragraphs: [
        'Images saved from websites are often WebP, which forms and document portals do not accept. A PDF is accepted almost everywhere.',
        'The PDF page has the same pixel dimensions as the image, and the picture fills it. It is stored inside as a JPEG at 92% quality, and transparent areas are filled with white. Text in the image is part of the picture and cannot be selected.',
        'Each WebP produces its own PDF. Animated WebP files give their first frame.',
      ],
      graphics: [
        {
          kind: 'pages',
          caption: 'The image becomes one PDF page of the same proportions.',
          alt: 'A loose image on the left; on the right the same image filling one PDF page.',
          left: { label: 'WebP image', look: 'image' },
          right: { label: 'One-page PDF', look: 'photo' },
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'A form asks for a PDF', text: 'Applications and claim portals often accept only PDF, even for a single image.' },
        { title: 'Printing a saved web image', text: 'A PDF opens and prints identically on any computer.' },
        { title: 'Archiving an image with the same layout', text: 'The page preserves the exact proportions of the picture.' },
      ],
      keepOriginal:
        'Keep the WebP if you are just sharing the image. If you need several images in one PDF, convert them here and merge the PDFs with a merge tool.',
    },
    faqs: [
      { q: 'Can I combine several WebP files in one PDF?', a: 'Not in this converter. Each image becomes a separate PDF.' },
      { q: 'Is the image quality reduced?', a: 'Slightly. It is stored as a JPEG at 92% quality inside the PDF.' },
      { q: 'What happens to transparency?', a: 'It is filled with white.' },
      { q: 'Can I select text in the PDF?', a: 'No. The page is a picture and no text recognition is performed.' },
    ],
  },

  'gif-to-jpg': {
    title: 'GIF to JPG Converter Online — Free, No Upload',
    metaDescription:
      'Convert GIF to JPG online for free to save a still photo-style image. Animated GIFs give frame one, transparency becomes white. Runs in your browser.',
    heading: 'GIF to JPG Converter',
    description:
      'Convert GIF to JPG online for free to save a still image; animated GIFs give their first frame and nothing is uploaded.',
    steps: steps('gif', 'jpg', 'Press Convert. The first frame of each GIF is placed on white and saved as a JPG at 92% quality.'),
    understanding: {
      paragraphs: [
        'JPG suits photographs, while GIF suits flat graphics, so JPG is rarely the best home for a GIF. People still convert for compatibility, or to grab a frame as a normal photo-style file.',
        'Only the first frame is saved, and transparent pixels become white because JPG has no transparency. Flat colours and sharp edges are the weak point of JPG compression, so you may see faint noise around edges and text.',
        'The JPG can be larger or smaller than the GIF depending on the artwork.',
      ],
      graphics: [
        {
          kind: 'frames',
          caption: 'Only the first frame of an animated GIF is saved.',
          alt: 'Four animation frames on the left; a single frame, the first, on the right.',
          sourceLabel: 'Animated GIF',
          targetLabel: 'JPG (first frame)',
        },
        {
          kind: 'table',
          caption: 'GIF compared with JPG.',
          columns: ['GIF', 'JPG'],
          rows: [
            { label: 'Best at', a: 'Flat graphics', b: 'Photographs' },
            { label: 'Colours', a: '256', b: 'Millions' },
            { label: 'Animation', a: 'Yes', b: 'No' },
            { label: 'Transparency', a: '1-bit', b: 'None' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'A still from an animation', text: 'Use the first frame as a thumbnail or poster image.' },
        { title: 'An upload form that wants JPG', text: 'Profile photo and listing forms often reject GIF.' },
      ],
      keepOriginal:
        'Keep the GIF for animation or sharp-edged graphics. For a still graphic, PNG keeps edges cleaner than JPG.',
    },
    faqs: [
      { q: 'Does the animation survive?', a: 'No. Only the first frame is converted.' },
      { q: 'Why is the background white?', a: 'JPG has no transparency, so transparent pixels become white.' },
      { q: 'Should I pick PNG instead?', a: 'For graphics and text, yes. PNG keeps flat colours and edges exact.' },
      { q: 'Is quality lost?', a: 'Some, because JPG is lossy. At 92% it is minor.' },
    ],
  },

  'gif-to-webp': {
    title: 'GIF to WebP Converter Online — Free, No Upload',
    metaDescription:
      'Convert GIF to WebP online for free for a smaller still image with transparency. Animated GIFs give frame one. Runs in your browser with no upload.',
    heading: 'GIF to WebP Converter',
    description:
      'Convert GIF to WebP online for free to get a smaller still image that keeps transparency. Nothing is uploaded.',
    steps: steps('gif', 'webp', 'Press Convert. Your browser saves the first frame of each GIF as a WebP at 92% quality, keeping transparency.'),
    understanding: {
      paragraphs: [
        'WebP supports animation as a format, but this converter outputs a still: only the GIF\'s first frame is saved. If you want the animation preserved, this is the wrong tool.',
        'For stills, WebP is usually much smaller than GIF and supports smooth transparency, where GIF allows only on or off. The result is saved with lossy compression at 92% quality, so a flat-colour GIF may gain faint artefacts.',
        'Encoding depends on your browser. Chrome, Edge and Firefox can produce WebP; some Safari versions cannot and will show an error.',
      ],
      graphics: [
        {
          kind: 'frames',
          caption: 'An animated GIF becomes one still WebP.',
          alt: 'Four animation frames on the left; only the first frame remains on the right.',
          sourceLabel: 'Animated GIF',
          targetLabel: 'WebP (first frame)',
        },
        {
          kind: 'table',
          caption: 'GIF compared with the WebP produced here.',
          columns: ['GIF', 'WebP output'],
          rows: [
            { label: 'Colours', a: '256', b: 'Millions' },
            { label: 'Transparency', a: 'On or off', b: 'Smooth' },
            { label: 'Animation', a: 'Yes', b: 'Not created' },
            { label: 'Size of a still', a: 'Larger', b: 'Smaller' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Lighter logos and icons', text: 'A still GIF graphic usually shrinks when stored as WebP.' },
        { title: 'Web pages that serve WebP', text: 'Replacing old GIF stills keeps pages light.' },
      ],
      keepOriginal:
        'Keep the GIF if it animates. For an animation, converting to a video format is far more efficient, but this site does not make video from GIFs.',
    },
    faqs: [
      { q: 'Will the WebP animate?', a: 'No. It is a still of the first frame.' },
      { q: 'Is transparency kept?', a: 'Yes. Transparent pixels stay transparent in the WebP.' },
      { q: 'Why does it say my browser cannot encode WebP?', a: 'WebP encoding comes from the browser. Use current Chrome, Edge or Firefox.' },
      { q: 'Is the WebP lossless?', a: 'No. It uses 92% lossy quality.' },
    ],
  },

  'gif-to-bmp': {
    title: 'GIF to BMP Converter Online — Free, No Upload',
    metaDescription:
      'Convert GIF to BMP online for free for software that needs bitmaps. Animated GIFs give frame one, transparency becomes white. No upload or sign-up needed.',
    heading: 'GIF to BMP Converter',
    description:
      'Convert GIF to BMP online for free for software that needs bitmaps. Animated GIFs give their first frame.',
    steps: steps('gif', 'bmp', 'Press Convert. The first frame is placed on white and saved as an uncompressed 24-bit BMP.'),
    understanding: {
      paragraphs: [
        'A GIF is a palette image with at most 256 colours. The BMP produced here is 24-bit, so every pixel takes three bytes whatever the palette, and the file is far larger.',
        'The picture is identical to the GIF\'s first frame. Transparent pixels become white because the BMP has no alpha channel. Animation is not kept.',
        'This conversion is mostly useful for older Windows programs and devices that read only bitmaps.',
      ],
      graphics: [
        {
          kind: 'sizeBars',
          caption: 'A 640×400 image, approximate.',
          unit: 'KB',
          bars: [
            { label: 'GIF', value: 25 },
            { label: 'BMP, 24-bit', value: 750, highlight: true },
          ],
        },
        {
          kind: 'table',
          caption: 'GIF compared with BMP.',
          columns: ['GIF', 'BMP output'],
          rows: [
            { label: 'Storage', a: '256-colour palette', b: '24-bit pixels' },
            { label: 'Compression', a: 'Lossless', b: 'None' },
            { label: 'Transparency', a: 'On or off', b: 'None, becomes white' },
            { label: 'Animation', a: 'Yes', b: 'No' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Legacy Windows applications', text: 'Some older programs can only load bitmap files.' },
        { title: 'Hardware that loads raw bitmaps', text: 'Small displays and kiosks often take BMP.' },
      ],
      keepOriginal:
        'Keep the GIF for the web and animations. The BMP is about thirty times larger for typical graphics.',
    },
    faqs: [
      { q: 'Why is the BMP so much bigger?', a: 'It stores each pixel as three bytes without compression, while the GIF compresses a small palette.' },
      { q: 'Is the animation kept?', a: 'No. Only the first frame.' },
      { q: 'What happens to a transparent GIF?', a: 'Transparent areas turn white.' },
      { q: 'Does it change the picture?', a: 'No. The pixels are the same as the GIF\'s first frame.' },
    ],
  },

  'gif-to-tiff': {
    title: 'GIF to TIFF Converter Online — Free, No Upload',
    metaDescription:
      'Convert GIF to TIFF online for free for print and archive workflows. Writes an uncompressed 8-bit RGB TIFF of the first frame, with no upload or sign-up.',
    heading: 'GIF to TIFF Converter',
    description:
      'Convert GIF to TIFF online for free when print or archive software wants TIFF. Runs in your browser.',
    steps: steps('gif', 'tiff', 'Press Convert. The first frame is placed on white and written as an uncompressed 8-bit RGB TIFF.'),
    understanding: {
      paragraphs: [
        'TIFF is a standard exchange format in print and archiving, which GIF is not. The TIFF created here holds your GIF\'s first frame as 8-bit RGB with no compression.',
        'The picture is not improved: a 256-colour GIF stays a 256-colour picture stored in a larger container. Transparent pixels become white, and animation is not kept.',
        'The file is much bigger than the GIF, at about three bytes per pixel.',
      ],
      graphics: [
        {
          kind: 'sizeBars',
          caption: 'A 640×400 image, approximate.',
          unit: 'KB',
          bars: [
            { label: 'GIF', value: 25 },
            { label: 'TIFF, uncompressed', value: 750, highlight: true },
          ],
        },
        {
          kind: 'table',
          caption: 'GIF compared with TIFF.',
          columns: ['GIF', 'TIFF output'],
          rows: [
            { label: 'Colour', a: '256-colour palette', b: '8-bit RGB' },
            { label: 'Compression', a: 'Lossless', b: 'None' },
            { label: 'Transparency', a: 'On or off', b: 'Placed on white' },
            { label: 'Used in', a: 'Web', b: 'Print, archives' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'A printer or publisher requires TIFF', text: 'Layout and prepress workflows commonly accept TIFF but not GIF.' },
        { title: 'Archival storage', text: 'Records offices standardise on TIFF for still images.' },
      ],
      keepOriginal:
        'Keep the GIF for web use or if it animates. The TIFF has no visual advantage and is many times larger.',
    },
    faqs: [
      { q: 'Does the TIFF get more colours?', a: 'No. It stores the same colours the GIF had.' },
      { q: 'Is the animation preserved?', a: 'No, only the first frame is written.' },
      { q: 'What about transparency?', a: 'It is filled with white.' },
      { q: 'Is the TIFF compressed?', a: 'No, which is why it is large.' },
    ],
  },

  'gif-to-pdf': {
    title: 'GIF to PDF Converter Online — Free, No Upload',
    metaDescription:
      'Convert GIF to PDF online for free. The first frame becomes a one-page PDF in your browser, transparency on white. No upload or sign-up. Up to 20 files.',
    heading: 'GIF to PDF Converter',
    description:
      'Convert GIF to PDF online for free: the first frame of each GIF becomes a one-page PDF. Nothing is uploaded.',
    steps: steps('gif', 'pdf', 'Press Convert. The first frame is placed on white and a PDF page of the same size is created.', { download: 'Save the PDF. Several GIFs download as a ZIP with one PDF per GIF.' }),
    understanding: {
      paragraphs: [
        'A PDF cannot play an animation, so converting a GIF to PDF captures a still: the first frame, placed on a page the same size as the image.',
        'Inside the PDF the frame is stored as a JPEG at 92% quality. Flat-colour GIF artwork can show faint noise at edges because JPEG suits photographs better. Transparent pixels become white.',
        'Each GIF produces a separate PDF.',
      ],
      graphics: [
        {
          kind: 'pages',
          caption: 'The first frame fills one PDF page.',
          alt: 'A loose image on the left; on the right the same image filling one PDF page.',
          left: { label: 'GIF frame', look: 'image' },
          right: { label: 'One-page PDF', look: 'photo' },
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Printing a GIF', text: 'A PDF prints at a fixed size on any system.' },
        { title: 'A form that only accepts PDF', text: 'Attach a GIF graphic by wrapping it in a PDF.' },
      ],
      keepOriginal:
        'Keep the GIF to share it on screen or if it animates. A PDF cannot show the animation.',
    },
    faqs: [
      { q: 'Does the PDF animate?', a: 'No. PDF holds the first frame only.' },
      { q: 'Can I put several GIFs in one PDF?', a: 'Not here. Each GIF becomes its own PDF; merge them with a PDF tool.' },
      { q: 'What happens to transparency?', a: 'It turns white.' },
      { q: 'Is the image quality reduced?', a: 'Slightly. It is stored as a 92% JPEG.' },
    ],
  },

  'bmp-to-png': {
    title: 'BMP to PNG Converter Online — Lossless, Free',
    metaDescription:
      'Convert BMP to PNG online for free for a lossless but much smaller file. Runs in your browser with no upload or sign-up. Convert up to 20 bitmaps at once.',
    heading: 'BMP to PNG Converter',
    description:
      'Convert BMP to PNG online for free for a lossless file that is much smaller. Done in your browser.',
    steps: steps('bmp', 'png', 'Press Convert. Each bitmap is decoded and saved as a lossless PNG.'),
    understanding: {
      paragraphs: [
        'Both BMP and PNG store pixels exactly, so converting between them loses nothing. The difference is compression: PNG shrinks the same pixels, often to a fraction of the BMP\'s size.',
        'For images with large flat areas, such as screenshots and diagrams, the saving can be dramatic. For photographs the PNG is still smaller than the BMP, but larger than a JPG would be.',
        'PNG can store transparency, but BMP here has none, so the result is fully opaque.',
      ],
      graphics: [
        {
          kind: 'sizeBars',
          caption: 'A 1920×1080 screenshot, approximate.',
          unit: 'MB',
          bars: [
            { label: 'BMP, 24-bit', value: 6.2 },
            { label: 'PNG, lossless', value: 0.9, highlight: true },
          ],
        },
        {
          kind: 'table',
          caption: 'BMP compared with PNG.',
          columns: ['BMP', 'PNG'],
          rows: [
            { label: 'Pixel accuracy', a: 'Exact', b: 'Exact' },
            { label: 'Compression', a: 'None', b: 'Lossless' },
            { label: 'Web use', a: 'Impractical', b: 'Standard' },
            { label: 'Transparency', a: 'Usually none', b: 'Supported' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Shrinking old screenshots without loss', text: 'Folders of BMP captures shrink a lot, with no change in what they show.' },
        { title: 'Putting a bitmap on a web page', text: 'Browsers display BMP, but PNG loads far faster.' },
        { title: 'Uploading where BMP is rejected', text: 'Most upload forms accept PNG and not BMP.' },
      ],
      keepOriginal:
        'Keep the BMP only for software that insists on it. For photographs choose JPG instead, which is smaller still.',
    },
    faqs: [
      { q: 'Is any quality lost?', a: 'None. PNG is lossless.' },
      { q: 'How much smaller is the PNG?', a: 'Often five to ten times for screenshots, less for photos.' },
      { q: 'Should I use JPG instead?', a: 'For photos yes. It is smaller, with a small loss of quality.' },
      { q: 'Does the PNG have transparency?', a: 'No. A BMP carries none, so the image stays opaque.' },
    ],
  },

  'bmp-to-webp': {
    title: 'BMP to WebP Converter Online — Free, No Upload',
    metaDescription:
      'Convert BMP to WebP online for free for a tiny web-ready image. Runs in your browser with no upload or sign-up. Needs a browser that can encode WebP.',
    heading: 'BMP to WebP Converter',
    description:
      'Convert BMP to WebP online for free for a tiny, web-ready image. Nothing is uploaded.',
    steps: steps('bmp', 'webp', 'Press Convert. Your browser encodes each bitmap as WebP at 92% quality.'),
    understanding: {
      paragraphs: [
        'A BMP is the largest way to store a picture. WebP is among the smallest, so the saving is dramatic: a multi-megabyte bitmap often becomes a few hundred kilobytes.',
        'This conversion is lossy. At 92% quality, differences are hard to see in photographs, but sharp text and pixel art may show faint artefacts, so choose PNG for those.',
        'Encoding is done by your browser. Chrome, Edge and Firefox can encode WebP; some Safari versions cannot.',
      ],
      graphics: [
        {
          kind: 'sizeBars',
          caption: 'A 1920×1080 photograph, approximate.',
          unit: 'MB',
          bars: [
            { label: 'BMP, 24-bit', value: 6.2 },
            { label: 'WebP at 92% quality', value: 0.35, highlight: true },
          ],
        },
        {
          kind: 'table',
          caption: 'BMP compared with WebP.',
          columns: ['BMP', 'WebP output'],
          rows: [
            { label: 'Compression', a: 'None', b: 'Lossy, 92%' },
            { label: 'Size', a: 'Largest', b: 'Very small' },
            { label: 'Browsers', a: 'Yes', b: 'Yes' },
            { label: 'Older software', a: 'Yes', b: 'Not always' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Publishing scanned or captured images online', text: 'Bitmaps straight from old tools are far too heavy for web pages.' },
        { title: 'Archiving space', text: 'Large collections of BMP files shrink dramatically.' },
      ],
      keepOriginal:
        'Keep the BMP, or use PNG, when you need exact pixels. WebP is lossy and may not open in older tools.',
    },
    faqs: [
      { q: 'Is the WebP lossless?', a: 'No. It is encoded at 92% quality.' },
      { q: 'How much smaller will it be?', a: 'Often ten to twenty times for photographs.' },
      { q: 'Why does it say my browser cannot encode WebP?', a: 'Use current Chrome, Edge or Firefox.' },
      { q: 'Should I use PNG for screenshots?', a: 'Yes, if sharp text matters. PNG is lossless and still much smaller than BMP.' },
    ],
  },

  'bmp-to-gif': {
    title: 'BMP to GIF Converter Online — Free, No Upload',
    metaDescription:
      'Convert BMP to GIF online for free as a still 256-colour image. Runs in your browser with no upload or sign-up. Photos show banding, flat art converts well.',
    heading: 'BMP to GIF Converter',
    description:
      'Convert BMP to GIF online for free as a still 256-colour image. Runs in your browser with no upload.',
    steps: steps('bmp', 'gif', 'Press Convert. Each bitmap is reduced to at most 256 colours and saved as a single-frame GIF.'),
    understanding: {
      paragraphs: [
        'A 24-bit BMP can use millions of colours; GIF allows only 256. Simple graphics such as icons and diagrams convert cleanly, but photographs show banding because gradients collapse into a few shades.',
        'GIF compresses the reduced palette losslessly, so the file is far smaller than the BMP. The result is a still: no animation is created.',
        'The converted GIF has no transparency, since a BMP carries none.',
      ],
      graphics: [
        {
          kind: 'sizeBars',
          caption: 'A 640×400 graphic, approximate.',
          unit: 'KB',
          bars: [
            { label: 'BMP, 24-bit', value: 750 },
            { label: 'GIF, 256 colours', value: 40, highlight: true },
          ],
        },
        {
          kind: 'table',
          caption: 'BMP compared with GIF.',
          columns: ['BMP', 'GIF output'],
          rows: [
            { label: 'Colours', a: 'Millions', b: 'Up to 256' },
            { label: 'Compression', a: 'None', b: 'Lossless on the palette' },
            { label: 'Size', a: 'Very large', b: 'Small' },
            { label: 'Photos', a: 'Exact', b: 'Banding' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Old graphics for web pages or forums', text: 'Icons and simple diagrams shrink enormously as GIF.' },
        { title: 'Systems that still ask for GIF', text: 'Email signatures and legacy CMS fields often list GIF.' },
      ],
      keepOriginal:
        'Keep the BMP, or choose PNG, for photographs and anything needing exact colours. PNG is also lossless and has no colour limit.',
    },
    faqs: [
      { q: 'Will colours change?', a: 'Yes, if the image has more than 256 colours. They are mapped to the nearest palette colour.' },
      { q: 'Is the result animated?', a: 'No. It is one frame.' },
      { q: 'Would PNG be better?', a: 'Usually. It has no colour limit and is lossless.' },
      { q: 'How much smaller is the GIF?', a: 'For simple graphics, often more than ten times.' },
    ],
  },

  'bmp-to-tiff': {
    title: 'BMP to TIFF Converter Online — Free, No Upload',
    metaDescription:
      'Convert BMP to TIFF online for free for print and archive use. Writes an uncompressed 8-bit RGB TIFF in your browser, with no upload or sign-up needed.',
    heading: 'BMP to TIFF Converter',
    description:
      'Convert BMP to TIFF online for free for print and archive workflows. Runs in your browser with no upload.',
    steps: steps('bmp', 'tiff', 'Press Convert. Each bitmap is written as an uncompressed 8-bit RGB TIFF.'),
    understanding: {
      paragraphs: [
        'BMP and TIFF are both uncompressed here, so the TIFF is about the same size as the bitmap and shows the same pixels. What changes is acceptance: print shops, archives and professional software read TIFF.',
        'No quality is lost or gained. The TIFF is single-page 8-bit RGB with no alpha channel, matching a 24-bit BMP exactly.',
        'Colour is RGB; no CMYK separation is performed.',
      ],
      graphics: [
        {
          kind: 'table',
          caption: 'BMP compared with the TIFF produced here.',
          columns: ['BMP', 'TIFF output'],
          rows: [
            { label: 'Pixel data', a: '24-bit RGB', b: '24-bit RGB' },
            { label: 'Compression', a: 'None', b: 'None' },
            { label: 'File size', a: 'Large', b: 'About the same' },
            { label: 'Accepted by print workflows', a: 'Rarely', b: 'Commonly' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'A printer wants TIFF', text: 'Many print vendors list TIFF and not BMP as acceptable.' },
        { title: 'Archiving scanned material', text: 'Scanners sometimes output BMP, while archives standardise on TIFF.' },
      ],
      keepOriginal:
        'Keep the BMP only if a tool needs it. If space matters, PNG stores the same pixels in far less room.',
    },
    faqs: [
      { q: 'Is quality affected?', a: 'No. The same pixels are stored.' },
      { q: 'Does the file get smaller?', a: 'No, roughly the same size. Use PNG to save space.' },
      { q: 'Is CMYK supported?', a: 'No. The TIFF is RGB.' },
      { q: 'Does it keep DPI information?', a: 'A default resolution is written. Set print size in your layout software.' },
    ],
  },

  'bmp-to-pdf': {
    title: 'BMP to PDF Converter Online — Free, No Upload',
    metaDescription:
      'Convert BMP to PDF online for free. Each bitmap becomes a one-page PDF in your browser, with no upload or sign-up. Convert up to 20 bitmaps at a time.',
    heading: 'BMP to PDF Converter',
    description:
      'Convert BMP to PDF online for free: each bitmap becomes a one-page PDF. Nothing is uploaded.',
    steps: steps('bmp', 'pdf', 'Press Convert. Each bitmap is placed on a PDF page of the same size.', { download: 'Save the PDF. Several bitmaps download as a ZIP with one PDF per image.' }),
    understanding: {
      paragraphs: [
        'A PDF is a far better thing to send than a bitmap: it is smaller and every device opens it. Each BMP is placed on a page of the same pixel size.',
        'Inside the PDF the image is stored as a JPEG at 92% quality, which is why the PDF is much smaller than the BMP. The text in a scanned page stays a picture and cannot be selected.',
        'Every bitmap makes its own PDF; they are not merged.',
      ],
      graphics: [
        {
          kind: 'sizeBars',
          caption: 'A 1920×1080 scan, approximate.',
          unit: 'MB',
          bars: [
            { label: 'BMP, 24-bit', value: 6.2 },
            { label: 'One-page PDF', value: 0.6, highlight: true },
          ],
        },
        {
          kind: 'pages',
          caption: 'The bitmap fills a single PDF page.',
          alt: 'A loose image on the left; on the right the same image filling one PDF page.',
          left: { label: 'BMP image', look: 'image' },
          right: { label: 'One-page PDF', look: 'photo' },
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Submitting a scanned page', text: 'Old scanners and capture tools write BMP, but portals ask for PDF.' },
        { title: 'Emailing a large bitmap', text: 'The PDF is a fraction of the size, so it fits attachment limits.' },
      ],
      keepOriginal:
        'Keep the BMP if you need exact pixels. For merging several scans into one document, convert them here and join the PDFs afterwards.',
    },
    faqs: [
      { q: 'Can I merge several BMPs into one PDF?', a: 'Not in this converter. Each becomes its own PDF.' },
      { q: 'Why is the PDF smaller?', a: 'The image is stored as a JPEG inside the PDF, while the BMP is uncompressed.' },
      { q: 'Can I search the text in the PDF?', a: 'No. It is a picture, and no OCR is done.' },
      { q: 'Is the image sharp?', a: 'Yes at normal sizes. Fine text may show slight JPEG softness.' },
    ],
  },
};
