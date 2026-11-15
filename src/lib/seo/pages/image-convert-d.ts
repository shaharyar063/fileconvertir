import type { ConversionPage } from './types';
import { steps } from './helpers';

/** Image conversions from ICO. */
export const IMAGE_PAGES_D: Record<string, ConversionPage> = {
  'ico-to-png': {
    title: 'ICO to PNG Converter Online — Extract Icons Free',
    metaDescription:
      'Convert ICO to PNG online for free to extract an icon or favicon as an image with transparency kept. Runs in your browser with no upload or sign-up.',
    heading: 'ICO to PNG Converter',
    description:
      'Convert ICO to PNG online for free to turn an icon or favicon into an image, with transparency kept. Nothing is uploaded.',
    steps: steps('ico', 'png', 'Press Convert. Your browser reads the icon and saves it as a lossless PNG with its transparency intact.'),
    understanding: {
      paragraphs: [
        'An ICO file can hold several versions of one icon at different sizes, such as 16, 32, 48 and 256 pixels. A PNG holds a single image, so the conversion has to pick one.',
        'The converter lets your browser decode the icon and saves the result, which in practice is the largest image in the file. Transparency is kept, so the PNG drops onto any background. You cannot choose a smaller size from inside the icon.',
        'The PNG is lossless, so nothing is degraded in the conversion. If the icon only contains a tiny 16-pixel image, the PNG will be tiny too.',
      ],
      graphics: [
        {
          kind: 'transparency',
          caption: 'The icon\'s transparent background is preserved in the PNG.',
          alt: 'An icon on a transparent background remains on a transparent background after conversion to PNG.',
          sourceLabel: 'ICO with transparency',
          targetLabel: 'PNG with transparency',
          result: 'kept',
        },
        {
          kind: 'table',
          caption: 'What happens to a multi-size icon.',
          columns: ['ICO file', 'PNG output'],
          rows: [
            { label: 'Images inside', a: 'Several sizes', b: 'One, usually the largest' },
            { label: 'Transparency', a: 'Yes', b: 'Kept' },
            { label: 'Compression', a: 'Per image', b: 'Lossless' },
            { label: 'Choose a size', a: 'Not applicable', b: 'No' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Reusing a site\'s favicon or a program icon', text: 'A PNG can go into a document, slide or design tool, which rarely accept ICO files.' },
        { title: 'Checking what an icon file contains', text: 'Converting shows the image your browser draws from the file.' },
        { title: 'Editing an icon', text: 'Image editors open PNG without plugins, so you can edit it and convert back to ICO afterwards.' },
      ],
      keepOriginal:
        'Keep the ICO if you still need all the sizes in it, for example for a Windows application, since the PNG holds only one of them.',
    },
    faqs: [
      { q: 'Which size is extracted from a multi-size icon?', a: 'The image your browser draws for the file, normally the largest one.' },
      { q: 'Is transparency kept?', a: 'Yes. The PNG keeps the icon\'s alpha channel.' },
      { q: 'Can I extract every size?', a: 'No. Each ICO produces one PNG.' },
      { q: 'Why is my PNG so small?', a: 'The icon may only contain small images. The PNG cannot be larger than the biggest image inside.' },
    ],
  },

  'ico-to-jpg': {
    title: 'ICO to JPG Converter Online — Free, No Upload',
    metaDescription:
      'Convert ICO to JPG online for free to save an icon as a photo-style image. Transparency becomes white. Runs in your browser with no upload or sign-up.',
    heading: 'ICO to JPG Converter',
    description:
      'Convert ICO to JPG online for free to save an icon as a regular image. Transparency becomes white.',
    steps: steps('ico', 'jpg', 'Press Convert. The icon is placed on a white background and saved as a JPG at 92% quality.'),
    understanding: {
      paragraphs: [
        'JPG cannot hold transparency, and icons nearly always have it, so a JPG of an icon sits on a white square. Edges between the icon and the white may look slightly soft because JPG compression blurs sharp contrast.',
        'An ICO can contain several sizes. The conversion saves one image, normally the largest in the file, so the JPG is the size of that image, which is often small.',
        'Choose this only if a JPG is required. For icons PNG is nearly always the better target.',
      ],
      graphics: [
        {
          kind: 'transparency',
          caption: 'The icon\'s transparent background becomes white in the JPG.',
          alt: 'An icon on a transparent background becomes the same icon on a solid white background after conversion to JPG.',
          sourceLabel: 'ICO, transparent',
          targetLabel: 'JPG on white',
          result: 'white',
        },
        {
          kind: 'table',
          caption: 'ICO compared with JPG.',
          columns: ['ICO', 'JPG output'],
          rows: [
            { label: 'Transparency', a: 'Yes', b: 'No, becomes white' },
            { label: 'Edges', a: 'Crisp', b: 'Slightly softened' },
            { label: 'Sizes', a: 'Several', b: 'One' },
            { label: 'Best for', a: 'Icons', b: 'Photographs' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'A form that only accepts JPG', text: 'Some upload fields reject PNG and ICO.' },
        { title: 'Showing an icon in a document that lacks PNG support', text: 'A few old tools handle only JPG.' },
      ],
      keepOriginal:
        'Convert to PNG instead whenever possible. It keeps the transparency and the sharp edges that a JPG loses.',
    },
    faqs: [
      { q: 'Why is the background white?', a: 'JPG has no transparency, so transparent areas are filled with white.' },
      { q: 'Which size of the icon is converted?', a: 'One image, normally the largest stored in the ICO.' },
      { q: 'Would PNG be better?', a: 'Yes for icons. It keeps transparency and crisp edges.' },
      { q: 'Does it change the dimensions?', a: 'No. The JPG is the size of the image taken from the icon.' },
    ],
  },

  'ico-to-webp': {
    title: 'ICO to WebP Converter Online — Free, No Upload',
    metaDescription:
      'Convert ICO to WebP online for free as a small image with transparency kept. Runs in your browser with no upload. Needs a browser that can encode WebP.',
    heading: 'ICO to WebP Converter',
    description:
      'Convert ICO to WebP online for free as a small image that keeps transparency. Nothing is uploaded.',
    steps: steps('ico', 'webp', 'Press Convert. Your browser saves the icon as a WebP at 92% quality with its transparency kept.'),
    understanding: {
      paragraphs: [
        'WebP keeps the transparent background of an icon while storing it in a very small file, which is why it suits icons placed on web pages.',
        'The icon is saved as one image, normally the largest inside the ICO, using lossy WebP at 92% quality. For a tiny image the saving is small, and sharp pixel-art edges may pick up faint artefacts that PNG would not.',
        'WebP encoding is done by your browser. Chrome, Edge and Firefox can write it; some Safari versions cannot and will show an error.',
      ],
      graphics: [
        {
          kind: 'transparency',
          caption: 'Transparency is preserved in the WebP.',
          alt: 'An icon on a transparent background remains on a transparent background after conversion to WebP.',
          sourceLabel: 'ICO with transparency',
          targetLabel: 'WebP with transparency',
          result: 'kept',
        },
        {
          kind: 'table',
          caption: 'ICO compared with the WebP produced here.',
          columns: ['ICO', 'WebP output'],
          rows: [
            { label: 'Images', a: 'Several sizes', b: 'One' },
            { label: 'Compression', a: 'Per image', b: 'Lossy, 92%' },
            { label: 'Transparency', a: 'Yes', b: 'Yes' },
            { label: 'Use on web pages', a: 'Favicon only', b: 'Any image slot' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Reusing an icon as a page graphic', text: 'ICO works as a favicon but not as an ordinary image on a page.' },
        { title: 'Media libraries that accept WebP but not ICO', text: 'Many CMS uploaders list WebP, PNG and JPG only.' },
      ],
      keepOriginal:
        'Keep the ICO for the favicon itself. If you need pixel-exact edges, convert to PNG instead of WebP.',
    },
    faqs: [
      { q: 'Which size is converted?', a: 'One image, normally the largest in the icon.' },
      { q: 'Is the WebP lossless?', a: 'No. It is saved at 92% quality. PNG is the lossless choice.' },
      { q: 'Does it keep transparency?', a: 'Yes.' },
      { q: 'Why does it say my browser cannot encode WebP?', a: 'Use Chrome, Edge or Firefox. Some Safari versions cannot encode WebP.' },
    ],
  },

  'ico-to-pdf': {
    title: 'ICO to PDF Converter Online — Free, No Upload',
    metaDescription:
      'Convert ICO to PDF online for free. The icon becomes a one-page PDF on white, in your browser with no upload or sign-up. Convert up to 20 icons at once.',
    heading: 'ICO to PDF Converter',
    description:
      'Convert ICO to PDF online for free: each icon becomes a one-page PDF on a white page. Nothing is uploaded.',
    steps: steps('ico', 'pdf', 'Press Convert. The icon is placed on white and a PDF page the same size as the image is created.', { download: 'Save the PDF. Several icons download as a ZIP with one PDF per icon.' }),
    understanding: {
      paragraphs: [
        'An icon is a small image, often 32 or 256 pixels wide, so the PDF page created for it is small too. The page matches the icon\'s pixel size, and printers scale it to fit paper.',
        'The image is stored in the PDF as a JPEG at 92% quality, with transparent areas turned white. The conversion picks one image from the icon, normally the largest.',
        'The PDF is mainly useful for attaching or printing an icon where a PDF is required. It is not a vector document.',
      ],
      graphics: [
        {
          kind: 'pages',
          caption: 'The icon becomes a single PDF page sized to the icon.',
          alt: 'A small loose image on the left; on the right the same image filling one PDF page.',
          left: { label: 'ICO image', look: 'image' },
          right: { label: 'One-page PDF', look: 'photo' },
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Attaching an icon where only PDF is accepted', text: 'Brand submissions and forms sometimes ask for every asset as a PDF.' },
        { title: 'Printing an icon', text: 'A PDF prints reliably, though a small icon will look soft when enlarged.' },
      ],
      keepOriginal:
        'Keep the ICO or a PNG for any on-screen use. If a printed icon must be sharp, redraw it from a vector source.',
    },
    faqs: [
      { q: 'Is the PDF a vector file?', a: 'No. It contains the icon as a pixel image.' },
      { q: 'How big is the PDF page?', a: 'The size of the icon\'s pixels, so a 32-pixel icon makes a tiny page.' },
      { q: 'Can I merge several icons into one PDF?', a: 'Not here. Each icon becomes its own PDF.' },
      { q: 'What happens to transparency?', a: 'It becomes white.' },
    ],
  },
};
