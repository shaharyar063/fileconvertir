import type { ConversionPage } from './types';
import { steps } from './helpers';

/** Image conversions from JPG and PNG to the less common image formats. */
export const IMAGE_PAGES_A: Record<string, ConversionPage> = {
  'jpg-to-webp': {
    title: 'JPG to WebP Converter Online — Smaller Photos, Free',
    metaDescription:
      'Convert JPG to WebP online for free to make photos load faster on websites. Runs in your browser with no upload or sign-up. Batch up to 20 files.',
    heading: 'JPG to WebP Converter',
    description:
      'Convert JPG to WebP online for free and make website photos load faster. Done in your browser, so nothing is uploaded.',
    steps: steps('jpg', 'webp', 'Press Convert. Your browser encodes each photo as WebP at 92% quality. If it cannot encode WebP, you get an error instead of a mislabelled file.'),
    understanding: {
      paragraphs: [
        'WebP was designed to replace JPG on the web. At the same visual quality it usually produces a smaller file, which means faster pages and less mobile data.',
        'Both formats are lossy, so converting a JPG to WebP compresses the photo a second time. At 92% quality the second pass is rarely visible, but it is not free, and each further lossy conversion adds to it. Dimensions stay the same, and EXIF data such as camera model and GPS location is not carried over.',
        'Encoding uses your browser\'s own WebP encoder. Chrome, Edge and Firefox have one; some Safari versions do not, and the converter says so rather than saving a wrongly named file.',
      ],
      graphics: [
        {
          kind: 'sizeBars',
          caption: 'A 12-megapixel photograph, approximate. The saving varies with the picture.',
          unit: 'MB',
          bars: [
            { label: 'JPG original', value: 4.5 },
            { label: 'WebP at 92% quality', value: 3.2, highlight: true },
          ],
        },
        {
          kind: 'table',
          caption: 'JPG compared with WebP for photographs.',
          columns: ['JPG', 'WebP'],
          rows: [
            { label: 'Compression', a: 'Lossy', b: 'Lossy (or lossless)' },
            { label: 'Transparency', a: 'No', b: 'Yes' },
            { label: 'Size at similar quality', a: 'Larger', b: 'Smaller' },
            { label: 'Opens in older software', a: 'Everywhere', b: 'Not always' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Passing a page-speed test', text: 'Audits such as Lighthouse recommend modern image formats. Swapping photographic JPGs for WebP is the usual fix.' },
        { title: 'Shop and blog galleries', text: 'A product page with a dozen photos loads noticeably faster when each image is a few hundred kilobytes lighter.' },
        { title: 'Saving storage and bandwidth', text: 'Sites serving many images pay for every byte transferred, so smaller files lower hosting costs.' },
      ],
      keepOriginal:
        'Keep the JPG as the master and for email, print and older software. Make WebP copies only for the web, and do not convert a WebP back to JPG repeatedly, since every lossy step costs detail.',
    },
    faqs: [
      { q: 'Will the WebP look worse than the JPG?', a: 'Very slightly, since the image is compressed again. At 92% quality the difference is not visible at normal viewing sizes.' },
      { q: 'Is the WebP always smaller than the JPG?', a: 'Usually, but not guaranteed. A JPG that is already heavily compressed may not shrink, so compare the sizes shown after conversion.' },
      { q: 'Why does it say my browser cannot encode WebP?', a: 'WebP encoding comes from the browser. Open the page in current Chrome, Edge or Firefox.' },
      { q: 'Can I choose the quality?', a: 'No. Photos are saved at a fixed 92% quality.' },
    ],
  },

  'jpg-to-gif': {
    title: 'JPG to GIF Converter Online — Free, No Upload',
    metaDescription:
      'Convert JPG to GIF online for free. Photos are reduced to 256 colours as a still GIF, in your browser with no upload or sign-up. Up to 20 files.',
    heading: 'JPG to GIF Converter',
    description:
      'Convert JPG to GIF online for free to get a still GIF image. Done in your browser with no upload or sign-up.',
    steps: steps('jpg', 'gif', 'Press Convert. Each photo is reduced to a palette of at most 256 colours and saved as a single-frame GIF.'),
    understanding: {
      paragraphs: [
        'GIF stores each image with at most 256 colours. A photograph contains thousands of shades, so converting a JPG to GIF replaces many subtle tones with the nearest palette colour. Smooth gradients such as skies show visible banding.',
        'The result is a still image: this converter does not create animations, and a GIF made from one JPG has exactly one frame. No dithering is applied, so flat-colour pictures convert cleanly while photographs look posterised.',
        'The GIF is usually larger than the JPG, not smaller, because GIF compression suits graphics, not photos.',
      ],
      graphics: [
        {
          kind: 'table',
          caption: 'What the two formats can store.',
          columns: ['JPG', 'GIF'],
          rows: [
            { label: 'Colours per image', a: 'Millions', b: 'Up to 256' },
            { label: 'Best for', a: 'Photographs', b: 'Flat graphics, simple animation' },
            { label: 'Compression', a: 'Lossy', b: 'Lossless on the reduced palette' },
            { label: 'Animation', a: 'No', b: 'Yes (not created here)' },
          ],
        },
        {
          kind: 'sizeBars',
          caption: 'A 640×400 photograph, approximate.',
          unit: 'KB',
          bars: [
            { label: 'JPG at 92% quality', value: 120 },
            { label: 'GIF, 256 colours', value: 190, highlight: true },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'A platform that wants GIF files', text: 'Some forums, email signatures and chat tools accept GIF for avatars or reactions but not JPG.' },
        { title: 'Retro or low-colour looks', text: 'Reducing a picture to a small palette is a deliberate style for pixel-art-like effects.' },
        { title: 'Starting point for editing', text: 'If you plan to build an animation in another tool, a GIF frame is a convenient input.' },
      ],
      keepOriginal:
        'Keep the JPG for photographs. The GIF will look worse and is often bigger. If the aim is a small, good-looking photo, WebP or JPG are better choices than GIF.',
    },
    faqs: [
      { q: 'Does this make an animated GIF?', a: 'No. The output has one frame. To animate, combine several images in an animation tool.' },
      { q: 'Why does my photo look blotchy as a GIF?', a: 'GIF allows only 256 colours, so gradients are flattened into bands. That is a limit of the format.' },
      { q: 'Why is the GIF bigger than the JPG?', a: 'GIF compresses flat colours well and photographs poorly, and the JPG was already compressed.' },
      { q: 'Is transparency added?', a: 'No. JPG has no transparency, so the GIF is fully opaque.' },
    ],
  },

  'jpg-to-bmp': {
    title: 'JPG to BMP Converter Online — Free, No Upload',
    metaDescription:
      'Convert JPG to BMP online for free for old Windows software and devices that need bitmaps. Runs in your browser with no upload or sign-up. Up to 20 files.',
    heading: 'JPG to BMP Converter',
    description:
      'Convert JPG to BMP online for free for software and devices that only read bitmaps. Nothing is uploaded.',
    steps: steps('jpg', 'bmp', 'Press Convert. Each photo is decoded and written as an uncompressed 24-bit BMP.'),
    understanding: {
      paragraphs: [
        'BMP is the plain bitmap format of Windows. It stores three bytes for every pixel and applies no compression, so the converted file is much larger than the JPG.',
        'The image looks the same as the JPG at the pixel level. Nothing is added or restored: the artefacts that JPG compression produced are copied into the bitmap exactly as they appear.',
        'The BMP is written as 24-bit colour. EXIF information in the JPG is not carried over.',
      ],
      graphics: [
        {
          kind: 'sizeBars',
          caption: 'A 1920×1080 photograph, approximate. BMP size depends only on the dimensions.',
          unit: 'MB',
          bars: [
            { label: 'JPG at 92% quality', value: 0.6 },
            { label: 'BMP, 24-bit', value: 6.2, highlight: true },
          ],
        },
        {
          kind: 'table',
          caption: 'JPG compared with BMP.',
          columns: ['JPG', 'BMP'],
          rows: [
            { label: 'Compression', a: 'Lossy', b: 'None' },
            { label: 'Size', a: 'Small', b: 'Very large' },
            { label: 'Read by', a: 'Everything', b: 'Windows software, legacy tools' },
            { label: 'Metadata', a: 'EXIF', b: 'None' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Legacy Windows programs', text: 'Some older applications and tools only open bitmap files.' },
        { title: 'Embedded devices and displays', text: 'Microcontrollers and small displays often load raw bitmaps because they are trivial to decode.' },
        { title: 'Image processing exercises', text: 'Uncompressed pixels are easy to read in code, which is why BMP is popular in teaching.' },
      ],
      keepOriginal:
        'Keep the JPG for everything else. BMP files are roughly ten times larger, do not save quality, and are poorly supported on the web and in email.',
    },
    faqs: [
      { q: 'Does BMP give better quality than JPG?', a: 'No. It stores the same pixels uncompressed, including the JPG\'s compression artefacts.' },
      { q: 'Why is the BMP so big?', a: 'It uses three bytes per pixel with no compression, so size depends only on width and height.' },
      { q: 'Which BMP variant is produced?', a: 'A standard uncompressed 24-bit Windows bitmap.' },
      { q: 'Can I use the BMP on a website?', a: 'It will work in browsers but is far larger than needed. Use JPG, PNG or WebP online.' },
    ],
  },

  'jpg-to-tiff': {
    title: 'JPG to TIFF Converter Online — For Print, Free',
    metaDescription:
      'Convert JPG to TIFF online for free for print shops and archives. Writes an uncompressed 8-bit RGB TIFF in your browser, with no upload or sign-up.',
    heading: 'JPG to TIFF Converter',
    description:
      'Convert JPG to TIFF online for free when a printer or archive asks for TIFF. Done in your browser with no upload.',
    steps: steps('jpg', 'tiff', 'Press Convert. Each photo is written as a single-page, uncompressed 8-bit RGB TIFF.'),
    understanding: {
      paragraphs: [
        'TIFF is the file format print and archive workflows ask for by name. The TIFF produced here is the most widely accepted variant: one page, 8 bits per channel, RGB, uncompressed.',
        'Converting from JPG cannot add quality. A TIFF can store pixels losslessly, but the JPG has already discarded detail, and the TIFF keeps exactly what the JPG shows now. Its advantage is that opening, editing and saving the TIFF will not compress the picture again.',
        'The file is large, about three bytes per pixel. The output is RGB only, with no CMYK conversion, and the JPG\'s EXIF data is not copied.',
      ],
      graphics: [
        {
          kind: 'sizeBars',
          caption: 'A 12-megapixel photograph, approximate.',
          unit: 'MB',
          bars: [
            { label: 'JPG at 92% quality', value: 4.5 },
            { label: 'TIFF, uncompressed', value: 36, highlight: true },
          ],
        },
        {
          kind: 'table',
          caption: 'What the TIFF contains.',
          columns: ['JPG', 'TIFF output'],
          rows: [
            { label: 'Colour', a: '8-bit RGB (YCbCr)', b: '8-bit RGB' },
            { label: 'Compression', a: 'Lossy', b: 'None' },
            { label: 'Resaving', a: 'Loses quality', b: 'No further loss' },
            { label: 'CMYK', a: 'Possible', b: 'Not produced' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'A print shop requires TIFF', text: 'Many printers list TIFF as their accepted format for photo jobs.' },
        { title: 'Archival or records policies', text: 'Some archives want TIFF masters even when the source arrived as JPG.' },
        { title: 'A stable editing copy', text: 'Repeated retouching of a TIFF avoids stacking JPG compression on every save.' },
      ],
      keepOriginal:
        'Keep the JPG for sharing and the web. The TIFF is about eight times larger, browsers do not display it, and it holds no more detail than the JPG already had.',
    },
    faqs: [
      { q: 'Is the TIFF better quality than the JPG?', a: 'No. It holds the same pixels as the JPG shows, without further compression. Lost detail does not come back.' },
      { q: 'Why is the file so large?', a: 'It is uncompressed, so it needs about three bytes per pixel.' },
      { q: 'Does it support CMYK?', a: 'No. The TIFF is RGB. Printers can convert, or you can do it in prepress software.' },
      { q: 'Can I open the TIFF in a browser?', a: 'Most browsers will not display it. It is intended for print and editing tools.' },
    ],
  },

  'jpg-to-ico': {
    title: 'JPG to ICO Converter Online — Make an Icon, Free',
    metaDescription:
      'Convert JPG to ICO online for free to make a favicon or Windows icon. Picture is fitted to a square up to 256 px, in your browser with no upload.',
    heading: 'JPG to ICO Converter',
    description:
      'Convert JPG to ICO online for free to make a favicon or Windows icon. Done in your browser, with no upload or sign-up.',
    steps: steps('jpg', 'ico', 'Press Convert. The photo is scaled to fit a square canvas of up to 256 pixels and saved as a single-image ICO.'),
    understanding: {
      paragraphs: [
        'An ICO file holds one or more small square images that Windows and browsers use for icons. This converter writes one image, as large as your photo allows up to 256 by 256 pixels.',
        'A non-square photo is fitted inside the square, keeping its proportions, with transparent bars filling the leftover space. Large photos are scaled down, and a photo smaller than 256 pixels is not scaled up.',
        'Favicons are displayed at 16 or 32 pixels, where a detailed photograph turns into mush. Simple, high-contrast artwork works far better than a photograph.',
      ],
      graphics: [
        {
          kind: 'table',
          caption: 'How your JPG becomes the icon.',
          columns: ['Your JPG', 'ICO output'],
          rows: [
            { label: 'Shape', a: 'Any proportions', b: 'Square canvas' },
            { label: 'Size', a: 'Any', b: 'Up to 256 × 256 px' },
            { label: 'Sizes inside the file', a: 'Not applicable', b: 'One' },
            { label: 'Empty space', a: 'None', b: 'Transparent' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'A quick favicon', text: 'Put a logo photo into an ICO to use as a site icon.' },
        { title: 'A custom Windows icon', text: 'Shortcuts and folders can take an ICO file as their icon.' },
        { title: 'Software that insists on .ico', text: 'Some tools and CMS settings accept only the ICO extension.' },
      ],
      keepOriginal:
        'For a website, a PNG icon declared in the page head is simpler and works in all current browsers. Use ICO only where a .ico file is required, and start from a clean, simple image rather than a busy photo.',
    },
    faqs: [
      { q: 'What size is the icon?', a: 'Up to 256 by 256 pixels, depending on your photo. Smaller photos keep their size.' },
      { q: 'Does the ICO contain several sizes?', a: 'No. It contains one image. Browsers scale it to 16 or 32 pixels as needed.' },
      { q: 'What happens to a rectangular photo?', a: 'It is fitted inside a square, keeping its proportions, and the extra space is transparent.' },
      { q: 'Will a photo look good as a favicon?', a: 'Rarely. At 16 pixels detail disappears, so use a simple logo.' },
    ],
  },

  'jpg-to-svg': {
    title: 'JPG to SVG Converter Online — Embeds the Image',
    metaDescription:
      'Convert JPG to SVG online for free. The photo is embedded in an SVG wrapper, not traced into vectors, in your browser with no upload or sign-up.',
    heading: 'JPG to SVG Converter',
    description:
      'Convert JPG to SVG online for free by wrapping the photo in an SVG file. It is not traced into vector shapes.',
    steps: steps('jpg', 'svg', 'Press Convert. The photo is embedded inside an SVG file at its original pixel size.'),
    understanding: {
      paragraphs: [
        'A real vector graphic is made of shapes and curves. A photograph cannot be turned into that by a simple converter. What this page produces is an SVG file that contains your photo as an embedded image.',
        'The SVG has the same width and height in pixels as the JPG. Opening it in a browser or an SVG-aware app shows the photo, but it does not scale smoothly like a vector: enlarging it enlarges the pixels.',
        'The embedded copy is stored as a PNG, so the file is larger than the JPG.',
      ],
      graphics: [
        {
          kind: 'vector',
          caption: 'Wrapping a photo in SVG does not make it a vector. The pixels stay pixels.',
          alt: 'A smooth vector curve on the left, and the same curve drawn from blocky pixels on the right, standing for a photo inside an SVG file.',
          sourceLabel: 'True vector: curves',
          targetLabel: 'Photo in SVG: still pixels',
        },
        {
          kind: 'table',
          caption: 'What the SVG output is, and is not.',
          columns: ['True vector SVG', 'This converter\'s SVG'],
          rows: [
            { label: 'Made of', a: 'Shapes and paths', b: 'An embedded raster image' },
            { label: 'Scales without blurring', a: 'Yes', b: 'No' },
            { label: 'Editable shapes', a: 'Yes', b: 'No' },
            { label: 'File size', a: 'Small', b: 'Larger than the JPG' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'A tool that only accepts .svg uploads', text: 'Some design and cutting tools list SVG as the only allowed type. A wrapped photo satisfies the file check.' },
        { title: 'Placing a photo inside another SVG', text: 'Embedding keeps the picture in a single self-contained file.' },
      ],
      keepOriginal:
        'Keep the JPG whenever you only need the photo. If you want true vector shapes from a picture, you need tracing software such as Inkscape\'s Trace Bitmap, and it works best on simple logos, not photographs.',
    },
    faqs: [
      { q: 'Is the result a real vector?', a: 'No. It is your photo embedded in an SVG container. It does not scale smoothly.' },
      { q: 'How do I get a true vector?', a: 'Use tracing software, for example Inkscape (Path, Trace Bitmap) or Illustrator\'s Image Trace. It suits logos and line art.' },
      { q: 'Why is the SVG larger than my JPG?', a: 'The photo is embedded as a PNG, which is lossless and larger than the JPG.' },
      { q: 'Does the SVG have the same dimensions?', a: 'Yes, the same width and height in pixels as the JPG.' },
    ],
  },

  'png-to-gif': {
    title: 'PNG to GIF Converter Online — Free, No Upload',
    metaDescription:
      'Convert PNG to GIF online for free. Reduces the image to 256 colours as a still GIF, with transparency placed on white. No upload or sign-up needed.',
    heading: 'PNG to GIF Converter',
    description:
      'Convert PNG to GIF online for free to get a still GIF of a graphic or logo. Runs in your browser with no upload.',
    steps: steps('png', 'gif', 'Press Convert. The image is reduced to at most 256 colours, transparent areas are placed on white, and a single-frame GIF is saved.'),
    understanding: {
      paragraphs: [
        'GIF limits an image to 256 colours. Logos, icons and flat illustrations often fit comfortably, so a PNG of that kind converts with no visible change. Photographs and smooth gradients do not, and show banding.',
        'GIF cannot store partial transparency, and this converter does not write GIF transparency at all, so transparent areas are filled with white. The output is a single frame, not an animation.',
        'For simple graphics the GIF can be smaller than the PNG. For anything with many colours it is usually larger.',
      ],
      graphics: [
        {
          kind: 'transparency',
          caption: 'Transparent areas are filled with white in the GIF.',
          alt: 'A logo on a transparent background becomes the same logo on a solid white background after conversion to GIF.',
          sourceLabel: 'PNG with transparency',
          targetLabel: 'GIF on white',
          result: 'white',
        },
        {
          kind: 'table',
          caption: 'PNG compared with GIF.',
          columns: ['PNG', 'GIF output'],
          rows: [
            { label: 'Colours', a: 'Millions', b: 'Up to 256' },
            { label: 'Transparency', a: 'Smooth alpha', b: 'Filled with white' },
            { label: 'Animation', a: 'No', b: 'Single frame' },
            { label: 'Best for', a: 'Everything', b: 'Simple graphics' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'A tool that does not accept PNG', text: 'Older forums, email platforms and chat systems sometimes list GIF but not PNG for images.' },
        { title: 'A deliberately low-colour look', text: 'A 256-colour palette gives pixel-art and retro effects.' },
        { title: 'Small simple icons', text: 'Flat icons with few colours can compress very well as GIF.' },
      ],
      keepOriginal:
        'Keep the PNG for anything detailed, photographic or transparent. The GIF loses colours and the transparent background, and for photos it is the worst of the common formats.',
    },
    faqs: [
      { q: 'What happens to a transparent background?', a: 'It is filled with white. This converter does not write GIF transparency.' },
      { q: 'Will my screenshot look different?', a: 'Screenshots with many colours, gradients or photos will show banding. Simple interface screenshots usually look fine.' },
      { q: 'Can I make an animated GIF?', a: 'No. The output has a single frame.' },
      { q: 'Is the GIF smaller than the PNG?', a: 'For flat graphics often yes. For colourful images it is typically larger.' },
    ],
  },

  'png-to-bmp': {
    title: 'PNG to BMP Converter Online — Free, No Upload',
    metaDescription:
      'Convert PNG to BMP online for free for legacy Windows software and devices. Writes a 24-bit bitmap, transparency on white, in your browser with no upload.',
    heading: 'PNG to BMP Converter',
    description:
      'Convert PNG to BMP online for free for older Windows software and devices. Everything runs in your browser.',
    steps: steps('png', 'bmp', 'Press Convert. Transparent areas are placed on white and the image is written as an uncompressed 24-bit BMP.'),
    understanding: {
      paragraphs: [
        'BMP stores three bytes per pixel and uses no compression. A PNG compresses the same pixels losslessly, so the bitmap is usually several times larger while showing an identical picture.',
        'The BMP written here is 24-bit and has no alpha channel, so transparent areas are filled with white. Old tools that read only BMP are why the format still gets requested.',
        'Colours are preserved exactly for fully opaque images, since both formats are lossless.',
      ],
      graphics: [
        {
          kind: 'transparency',
          caption: 'A 24-bit BMP has no alpha channel, so transparency is filled with white.',
          alt: 'A logo on a transparent background becomes the same logo on a solid white background after conversion to BMP.',
          sourceLabel: 'PNG with transparency',
          targetLabel: 'BMP on white',
          result: 'white',
        },
        {
          kind: 'sizeBars',
          caption: 'A 1920×1080 screenshot, approximate. BMP size is fixed by the dimensions.',
          unit: 'MB',
          bars: [
            { label: 'PNG screenshot (typical)', value: 1 },
            { label: 'BMP, 24-bit', value: 6.2, highlight: true },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Legacy software', text: 'Some older Windows tools and drivers can only open bitmaps.' },
        { title: 'Embedded and hobbyist hardware', text: 'Small displays and microcontroller projects often load BMP because it needs no decoder.' },
        { title: 'Teaching image processing', text: 'Uncompressed pixel data is easy to read in a few lines of code.' },
      ],
      keepOriginal:
        'Keep the PNG for normal use. It is smaller, supports transparency, and works everywhere, while the BMP only matters for the few systems that insist on it.',
    },
    faqs: [
      { q: 'Is any quality lost?', a: 'No colour is lost for opaque images. Only transparency is removed, because the BMP has no alpha channel.' },
      { q: 'Why is the BMP so much bigger?', a: 'It is uncompressed. PNG compresses the same pixels without loss.' },
      { q: 'What bit depth is the BMP?', a: '24-bit colour.' },
      { q: 'Can I keep transparency in a bitmap?', a: 'Not with this converter. Use PNG or WebP if transparency matters.' },
    ],
  },

  'png-to-ico': {
    title: 'PNG to ICO Converter Online — Favicon Maker, Free',
    metaDescription:
      'Convert PNG to ICO online for free to make a favicon or Windows icon. Transparency is kept and the image fits a square up to 256 px. No upload.',
    heading: 'PNG to ICO Converter',
    description:
      'Convert PNG to ICO online for free to make a favicon or Windows icon, with transparency kept. Runs in your browser.',
    steps: steps('png', 'ico', 'Press Convert. The image is fitted into a square canvas of up to 256 pixels, keeping transparency, and saved as an ICO.'),
    understanding: {
      paragraphs: [
        'An ICO file is a container for small square icons. PNG is the usual starting point because it keeps transparent edges, which an icon needs to sit cleanly on any background.',
        'The converter writes one image, up to 256 by 256 pixels. A rectangular PNG is fitted inside the square without stretching, and the leftover space is transparent. A PNG smaller than 256 pixels keeps its size rather than being enlarged.',
        'The ICO contains a single size. Browsers and Windows scale it down to 16 or 32 pixels when needed, so start from a simple, bold design, ideally square.',
      ],
      graphics: [
        {
          kind: 'transparency',
          caption: 'Transparent areas are preserved in the ICO.',
          alt: 'A logo on a transparent background remains on a transparent background after conversion to ICO.',
          sourceLabel: 'PNG with transparency',
          targetLabel: 'ICO with transparency',
          result: 'kept',
        },
        {
          kind: 'table',
          caption: 'How the icon is built.',
          columns: ['Your PNG', 'ICO output'],
          rows: [
            { label: 'Shape', a: 'Any proportions', b: 'Square, image fitted' },
            { label: 'Size', a: 'Any', b: 'Up to 256 × 256 px' },
            { label: 'Transparency', a: 'Yes', b: 'Kept' },
            { label: 'Sizes in one file', a: 'Not applicable', b: 'One' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Adding a favicon', text: 'Content management systems and older sites ask for a favicon.ico in the site root.' },
        { title: 'A custom icon for a Windows shortcut', text: 'Windows applies .ico files to shortcuts and folders.' },
        { title: 'A desktop app that requires .ico', text: 'Packaging tools for Windows programs usually want an ICO for the app icon.' },
      ],
      keepOriginal:
        'Keep the PNG as the master artwork. For modern sites a PNG icon linked in the page head works in all current browsers, so use the ICO only where a .ico file is demanded.',
    },
    faqs: [
      { q: 'What size will the ICO be?', a: 'Up to 256 by 256 pixels, depending on your PNG.' },
      { q: 'Does the ICO keep transparency?', a: 'Yes. The icon is saved with its alpha channel.' },
      { q: 'Can the ICO hold several sizes?', a: 'This converter writes a single image. Apps scale it as needed.' },
      { q: 'What if my PNG is not square?', a: 'It is fitted inside a square without distortion, with transparent padding.' },
      { q: 'What is the best source image for a favicon?', a: 'A simple, square PNG with bold shapes. Fine detail disappears at 16 pixels.' },
    ],
  },

  'png-to-eps': {
    title: 'PNG to EPS Converter Online — Raster EPS, Free',
    metaDescription:
      'Convert PNG to EPS online for free. Creates a raster EPS with a white background, not vector artwork. Runs in your browser with no upload or sign-up.',
    heading: 'PNG to EPS Converter',
    description:
      'Convert PNG to EPS online for free for software that needs an EPS file. The image is embedded, not vectorised.',
    steps: steps('png', 'eps', 'Press Convert. The image is placed on white and embedded as JPEG data inside an EPS file.'),
    understanding: {
      paragraphs: [
        'EPS is a PostScript-based format used in print and design. It is usually vector artwork, but it can also wrap a plain picture, and that is what this converter produces: your PNG embedded in an EPS file.',
        'The picture inside is stored as a JPEG at 92% quality, so it is slightly compressed even though the PNG was lossless. Transparency is not supported, so transparent areas turn white. The EPS does not become scalable artwork: enlarging it enlarges the pixels.',
        'Software that imports EPS, such as layout and page-design tools, will place the picture like any other image.',
      ],
      graphics: [
        {
          kind: 'vector',
          caption: 'The EPS holds your picture as pixels. It is not converted to curves.',
          alt: 'A smooth vector curve on the left; the same curve as blocky pixels on the right, representing the raster picture inside the EPS.',
          sourceLabel: 'Vector EPS: curves',
          targetLabel: 'This EPS: embedded pixels',
        },
        {
          kind: 'table',
          caption: 'The EPS this converter creates.',
          columns: ['Your PNG', 'EPS output'],
          rows: [
            { label: 'Content', a: 'Pixels', b: 'Pixels (JPEG inside)' },
            { label: 'Quality', a: 'Lossless', b: 'JPEG 92%' },
            { label: 'Transparency', a: 'Yes', b: 'Placed on white' },
            { label: 'Scales without blurring', a: 'No', b: 'No' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'A publisher or print tool that needs EPS', text: 'Some older workflows only accept EPS for placed images.' },
        { title: 'Placing a bitmap into a PostScript pipeline', text: 'The EPS wrapper lets a raster image travel through systems built around PostScript.' },
      ],
      keepOriginal:
        'Keep the PNG wherever it is accepted. For true scalable artwork, redraw or trace the image in a vector program and export EPS from there. A logo placed this way will not stay sharp when enlarged.',
    },
    faqs: [
      { q: 'Is the EPS a vector file?', a: 'No. It contains your image as pixels. Use vector software to produce real vector EPS artwork.' },
      { q: 'Is the PNG quality preserved?', a: 'Nearly. The pixels are stored inside the EPS as a JPEG at 92% quality.' },
      { q: 'What about transparency?', a: 'It is filled with white, since the embedded JPEG has no transparency.' },
      { q: 'Will the EPS open in my software?', a: 'Programs that import EPS, such as Illustrator or InDesign, should place it. Previews may be limited in other apps.' },
    ],
  },

  'png-to-svg': {
    title: 'PNG to SVG Converter Online — Embeds the Image',
    metaDescription:
      'Convert PNG to SVG online for free. The image is embedded in an SVG file, keeping transparency, but it is not traced into vector shapes. No upload.',
    heading: 'PNG to SVG Converter',
    description:
      'Convert PNG to SVG online for free by embedding the picture in an SVG file. It is not traced into vectors.',
    steps: steps('png', 'svg', 'Press Convert. The PNG is embedded inside an SVG file at its original pixel size, transparency intact.'),
    understanding: {
      paragraphs: [
        'People searching for PNG to SVG usually want a vector: smooth shapes that scale to any size. That needs tracing software to detect edges and rebuild them as curves. This converter does not trace.',
        'What it produces is a valid SVG that embeds your PNG at its original width and height, with any transparency preserved. The file opens anywhere SVG is accepted, but it stays pixel-based, so it blurs when enlarged and cannot be edited as shapes.',
        'The embedded PNG is re-encoded from your image, so the SVG is roughly the size of the PNG plus a little overhead.',
      ],
      graphics: [
        {
          kind: 'vector',
          caption: 'Embedding a PNG in an SVG keeps the pixels. A trace would rebuild the shapes as curves.',
          alt: 'A smooth curve with control points on the left; the same curve drawn from blocky pixels on the right, representing a PNG inside an SVG.',
          sourceLabel: 'Traced vector: curves',
          targetLabel: 'PNG inside SVG: pixels',
        },
        {
          kind: 'table',
          caption: 'Embedded image or traced vector.',
          columns: ['This converter', 'Tracing software'],
          rows: [
            { label: 'Result', a: 'PNG wrapped in SVG', b: 'Curves and shapes' },
            { label: 'Scales cleanly', a: 'No', b: 'Yes' },
            { label: 'Best for', a: 'File type requirements', b: 'Logos, line art' },
            { label: 'Fidelity to the PNG', a: 'Exact', b: 'Approximate' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'An upload form that only allows SVG', text: 'Some design and cutting tools check the extension and nothing else.' },
        { title: 'Keeping artwork and a bitmap in one file', text: 'An SVG can contain the picture along with text or shapes added later.' },
      ],
      keepOriginal:
        'Keep the PNG unless a tool demands SVG. For a real vector, trace the image with Inkscape (Path, Trace Bitmap), Illustrator\'s Image Trace or a dedicated vectoriser; results are best on simple logos with clear edges.',
    },
    faqs: [
      { q: 'Does this turn my PNG into a vector?', a: 'No. It embeds the PNG in an SVG. You still have pixels.' },
      { q: 'How can I vectorise a logo?', a: 'Use tracing software such as Inkscape\'s Trace Bitmap or Illustrator\'s Image Trace, then clean up the paths.' },
      { q: 'Is transparency kept?', a: 'Yes. The embedded PNG keeps its alpha channel.' },
      { q: 'Will the SVG be smaller than the PNG?', a: 'No. It is slightly larger because the image sits inside the SVG wrapper.' },
    ],
  },

  'png-to-psd': {
    title: 'PNG to PSD Converter Online — Free, No Upload',
    metaDescription:
      'Convert PNG to PSD online for free. Creates a flat single-layer Photoshop file with transparency, in your browser with no upload or sign-up needed.',
    heading: 'PNG to PSD Converter',
    description:
      'Convert PNG to PSD online for free to open the image in Photoshop, with transparency kept. Nothing is uploaded.',
    steps: steps('png', 'psd', 'Press Convert. The image is written as an 8-bit RGB PSD with an alpha channel, as one flat layer.'),
    understanding: {
      paragraphs: [
        'PSD is Photoshop\'s native file format, built to hold layers, masks and effects. A PNG has none of that, so the PSD produced here is a flat image: a single layer containing your picture.',
        'The file is 8-bit RGB with a transparency channel and no compression, so it is roughly four bytes per pixel. Transparency from the PNG is kept as an alpha channel.',
        'You can open the PSD in Photoshop, and in other editors that read PSD, then start adding layers. This does not recreate layers that were lost when the PNG was exported.',
      ],
      graphics: [
        {
          kind: 'table',
          caption: 'What the PSD contains compared with a normal Photoshop file.',
          columns: ['Typical PSD', 'PSD from this converter'],
          rows: [
            { label: 'Layers', a: 'Many', b: 'One flat image' },
            { label: 'Colour', a: 'RGB, CMYK, 16-bit and more', b: '8-bit RGB' },
            { label: 'Transparency', a: 'Layer masks and alpha', b: 'One alpha channel' },
            { label: 'Compression', a: 'Optional', b: 'None' },
          ],
        },
        {
          kind: 'sizeBars',
          caption: 'A 1920×1080 image, approximate. The PSD stores four bytes per pixel.',
          unit: 'MB',
          bars: [
            { label: 'PNG (typical)', value: 1.5 },
            { label: 'PSD, uncompressed RGBA', value: 8.3, highlight: true },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Starting an edit in Photoshop', text: 'Some designers prefer to begin a project from a PSD so layers and adjustments save inside one file.' },
        { title: 'A client or team asks for a PSD', text: 'A flat PSD satisfies a file-type requirement when no layered source exists.' },
        { title: 'Tools that read PSD but not PNG', text: 'A few older plugins and texture tools prefer PSD input.' },
      ],
      keepOriginal:
        'Keep the PNG for sharing and the web. The PSD is much larger and only useful in editors. If you hoped to recover layers, that is not possible: layers are not stored in a PNG.',
    },
    faqs: [
      { q: 'Does the PSD have layers?', a: 'It has one: your flat image. Layers lost when the PNG was made cannot be recovered.' },
      { q: 'Is transparency preserved?', a: 'Yes, as an alpha channel in the PSD.' },
      { q: 'Why is the PSD so much larger?', a: 'It is stored without compression, about four bytes per pixel.' },
      { q: 'Does it open in Photoshop?', a: 'Yes, and in other editors that support PSD, such as GIMP and Affinity Photo.' },
      { q: 'What colour mode and depth does it use?', a: '8-bit RGB. 16-bit and CMYK are not produced.' },
    ],
  },

  'png-to-tga': {
    title: 'PNG to TGA Converter Online — Free, No Upload',
    metaDescription:
      'Convert PNG to TGA online for free for game engines and 3D tools. Writes a 32-bit Targa with alpha in your browser, with no upload or sign-up needed.',
    heading: 'PNG to TGA Converter',
    description:
      'Convert PNG to TGA online for free for game engines and 3D tools, with transparency kept as alpha. No upload.',
    steps: steps('png', 'tga', 'Press Convert. The image is written as an uncompressed 32-bit TGA with an alpha channel.'),
    understanding: {
      paragraphs: [
        'TGA, or Targa, is a simple image format that game engines, texture pipelines and older video tools still read. This converter writes the most common variant: uncompressed, 32-bit, with red, green, blue and alpha.',
        'PNG\'s transparency maps directly onto the TGA alpha channel, so cut-out textures and sprites keep their edges. Nothing is compressed, so the file is roughly four bytes per pixel and much larger than the PNG.',
        'Colour values are preserved exactly because both formats are lossless.',
      ],
      graphics: [
        {
          kind: 'transparency',
          caption: 'The alpha channel is carried into the TGA.',
          alt: 'A logo on a transparent background stays on a transparent background after conversion to TGA.',
          sourceLabel: 'PNG with transparency',
          targetLabel: 'TGA with alpha',
          result: 'kept',
        },
        {
          kind: 'table',
          caption: 'The TGA written by this converter.',
          columns: ['Your PNG', 'TGA output'],
          rows: [
            { label: 'Channels', a: 'RGB or RGBA', b: '32-bit RGBA' },
            { label: 'Compression', a: 'Lossless', b: 'None' },
            { label: 'Alpha', a: 'Yes', b: 'Yes' },
            { label: 'Size', a: 'Compact', b: 'About 4 bytes per pixel' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Game and engine textures', text: 'Several engines and modding tools import TGA for textures and UI sprites with alpha.' },
        { title: '3D and rendering tools', text: 'Older rendering software uses TGA as an interchange format.' },
        { title: 'Video and compositing', text: 'Some editors take TGA sequences because the format is simple and lossless.' },
      ],
      keepOriginal:
        'Keep the PNG for the web and for sharing. Many modern engines read PNG directly, so convert only if your tool specifically asks for TGA.',
    },
    faqs: [
      { q: 'Does the TGA keep transparency?', a: 'Yes. It is stored as a 32-bit alpha channel.' },
      { q: 'Is the TGA compressed?', a: 'No. It is uncompressed, so files are large.' },
      { q: 'Will my game engine open it?', a: 'Uncompressed 32-bit TGA is the most widely supported variant, so most engines and editors read it.' },
      { q: 'Is any quality lost?', a: 'No. Both formats are lossless.' },
    ],
  },
};
