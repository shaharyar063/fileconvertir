import type { FormatSEO } from '../types';

/** Format pages for the less common image formats. */

export const IMAGE_MORE_SOURCE_HUBS: Record<string, FormatSEO> = {
  ico: {
    title: 'ICO Converter Online — Convert ICO to PNG, JPG, WebP',
    metaDescription:
      'Free online ICO converter. Convert ICO icons and favicons to PNG, JPG, WebP or PDF in your browser, with no upload or sign-up. Transparency kept for PNG.',
    heading: 'ICO File Converter',
    description:
      'Free online ICO converter: convert ICO icons and favicons to PNG, JPG, WebP or PDF in your browser with no upload.',
    details:
      'ICO is the Windows icon format, and the format of the favicon.ico file that browsers have looked for since the 1990s. One ICO can bundle several copies of the same picture at different sizes, such as 16, 32, 48 and 256 pixels, so Windows and browsers can pick the sharpest fit. Images inside can be stored as bitmaps or as PNG.',
    longDescription:
      'Converting an ICO means choosing one of those pictures, because PNG, JPG and WebP hold a single image. The converter takes the one your browser draws from the file, normally the largest. PNG is the right target for icons because it keeps transparency; JPG and PDF fill the transparent area with white. Going the other way, from an image to an ICO, is covered by the PNG, JPG and WebP converters.',
    useCases: [
      'Reuse a website\'s favicon in a document or design',
      'Open an icon file in an editor that does not read ICO',
      'Check what a favicon.ico actually looks like at full size',
    ],
    faqs: [
      { q: 'Why does my ICO convert to a small image?', a: 'The largest image stored inside the icon may be small. A favicon often holds only 16 and 32 pixel versions.' },
      { q: 'Can I get every size out of an ICO?', a: 'No. Each ICO becomes one PNG, JPG or WebP file.' },
      { q: 'Which format keeps the transparent background?', a: 'PNG and WebP. JPG and PDF output place the icon on white.' },
    ],
  },
};

export const IMAGE_MORE_TARGET_HUBS: Record<string, FormatSEO> = {
  gif: {
    title: 'Convert to GIF Online — JPG, PNG, WebP, BMP to GIF',
    metaDescription:
      'Convert to GIF online for free. Turn JPG, PNG, WebP, BMP or AVIF images into a still 256-colour GIF in your browser, with no upload or sign-up needed.',
    heading: 'Convert to GIF',
    description:
      'Convert to GIF online: turn JPG, PNG, WebP, BMP or AVIF images into a still GIF in your browser, free, with no upload.',
    details:
      'GIF is the 1987 image format that became famous for short looping animations. Each image is limited to a palette of 256 colours, and a pixel is either fully transparent or fully solid. It uses lossless compression, which suits flat graphics and handles photographs badly.',
    longDescription:
      'The GIFs made here are still, single-frame images. They are useful for older systems that insist on GIF, for flat graphics with few colours and for deliberate retro looks. Photographs lose their gradients because only 256 colours remain, and transparent areas are filled with white since GIF transparency is not written. Animated GIFs cannot be created on this site.',
    useCases: [
      'Submit a graphic to a system that only accepts GIF files',
      'Shrink a simple icon or diagram with few colours',
      'Create a low-colour, retro-style version of a picture',
    ],
    faqs: [
      { q: 'Can I make an animated GIF here?', a: 'No. The converter writes single-frame GIFs only.' },
      { q: 'Why does my photo look blotchy as a GIF?', a: 'GIF allows only 256 colours, so smooth gradients turn into visible bands.' },
      { q: 'Is transparency kept when converting to GIF?', a: 'No. Transparent areas are filled with white.' },
    ],
  },

  bmp: {
    title: 'Convert to BMP Online — JPG, PNG, WebP, GIF to BMP',
    metaDescription:
      'Convert to BMP online for free. Turn JPG, PNG, WebP, GIF or AVIF images into 24-bit Windows bitmaps in your browser, with no upload or sign-up needed.',
    heading: 'Convert to BMP',
    description:
      'Convert to BMP online: make a 24-bit bitmap from JPG, PNG, WebP, GIF or AVIF in your browser, free, with no upload.',
    details:
      'BMP is the bitmap format of Windows. It stores each pixel as raw colour values with no compression, so files are large but trivial for software to read. That simplicity keeps it alive in old Windows programs, embedded displays and teaching material.',
    longDescription:
      'The BMP files created here are standard 24-bit bitmaps. They have no alpha channel, so transparent areas are filled with white, and they are roughly three bytes per pixel, many times larger than the source image. Choose BMP only when something specifically requires it; for everything else PNG stores the same pixels in far less space.',
    useCases: [
      'Feed an image to legacy Windows software that reads only bitmaps',
      'Load a picture onto a small display or microcontroller project',
      'Prepare simple pixel data for image-processing exercises',
    ],
    faqs: [
      { q: 'Why are BMP files so large?', a: 'They use no compression. A full-HD image takes about 6 MB whatever it shows.' },
      { q: 'Does BMP support transparency?', a: 'The BMPs created here do not. Transparent areas become white.' },
      { q: 'What bit depth is used?', a: '24-bit colour.' },
    ],
  },

  ico: {
    title: 'Convert to ICO Online — Make Favicons From JPG, PNG',
    metaDescription:
      'Convert to ICO online for free. Make a favicon or Windows icon from JPG, PNG or WebP in your browser, with transparency kept. No upload or sign-up needed.',
    heading: 'Convert to ICO',
    description:
      'Convert to ICO online: make a favicon or Windows icon from JPG, PNG or WebP in your browser, free, with no upload.',
    details:
      'ICO is the container for Windows icons and for favicon.ico, the small file that browsers show in tabs and bookmarks. A single ICO can hold several sizes of the same icon, though most are made at one size and scaled by the system.',
    longDescription:
      'The ICO files made here contain one image, up to 256 by 256 pixels. A non-square picture is fitted inside a square canvas without stretching, and the extra space is transparent. Transparency from PNG and WebP is kept; JPG sources have none to begin with. Icons are shown at tiny sizes, so simple bold artwork works much better than photographs.',
    useCases: [
      'Make a favicon.ico for a website',
      'Give a Windows shortcut or folder a custom icon',
      'Supply an app icon to a packaging tool that requires ICO',
    ],
    faqs: [
      { q: 'What size will the icon be?', a: 'Up to 256 by 256 pixels, depending on the source image. Smaller images keep their size.' },
      { q: 'Does the ICO hold several sizes?', a: 'No. It holds one image, which systems scale as needed.' },
      { q: 'Is transparency kept?', a: 'Yes, when the source image has it, as with PNG and WebP.' },
    ],
  },

  svg: {
    title: 'Convert to SVG Online — JPG, PNG, WebP Embedded',
    metaDescription:
      'Convert to SVG online for free. Wrap a JPG, PNG or WebP image in an SVG file in your browser. It embeds the picture and does not trace vector shapes.',
    heading: 'Convert to SVG',
    description:
      'Convert to SVG online: wrap a JPG, PNG or WebP image in an SVG file in your browser, free. It does not trace vectors.',
    details:
      'SVG is the vector image format of the web. Instead of pixels it describes shapes, paths and text, which is why it stays sharp at any size and is often tiny. An SVG file can also embed a normal picture, though that picture stays made of pixels.',
    longDescription:
      'The SVG files created here are of that second kind: your image is embedded at its original size, transparency intact. They satisfy tools that only accept the .svg extension, but they do not scale smoothly or have editable shapes. A real vector needs tracing software such as Inkscape\'s Trace Bitmap, which works best on simple logos and line art, not photographs.',
    useCases: [
      'Meet an upload requirement that lists only SVG',
      'Keep a picture and added vector elements in one file',
      'Place a bitmap inside an SVG-based design or template',
    ],
    faqs: [
      { q: 'Is the SVG a true vector graphic?', a: 'No. It contains your image as pixels.' },
      { q: 'How do I vectorise a logo?', a: 'Use tracing software, such as Inkscape\'s Trace Bitmap or Illustrator\'s Image Trace.' },
      { q: 'Why is the SVG larger than my image?', a: 'The picture is embedded as lossless PNG data inside the SVG.' },
    ],
  },

  eps: {
    title: 'Convert to EPS Online — PNG to Raster EPS Free',
    metaDescription:
      'Convert to EPS online for free. Turn a PNG into a raster EPS file for print software in your browser, with no upload. It embeds the image, not vector art.',
    heading: 'Convert to EPS',
    description:
      'Convert to EPS online: make a raster EPS from a PNG for print software, in your browser, free, with no upload.',
    details:
      'EPS, Encapsulated PostScript, is a print-industry format built on the PostScript page-description language. It is most often used for vector logos and illustrations, but an EPS can also carry an ordinary bitmap.',
    longDescription:
      'The EPS files created here contain your picture as an embedded bitmap inside a PostScript wrapper. That lets older layout and print software place the image, but it is not vector artwork and it does not scale cleanly. Transparency is not supported, so transparent areas turn white. For genuine vector EPS files, export from a drawing program such as Illustrator or Inkscape.',
    useCases: [
      'Supply a picture to a publisher or printer that requires EPS',
      'Place a bitmap in an older page-layout program',
      'Pass a raster image through a PostScript-based workflow',
    ],
    faqs: [
      { q: 'Is the EPS a vector file?', a: 'No. It holds your image as pixels.' },
      { q: 'What happens to transparency?', a: 'It becomes white, because the embedded picture has no transparency.' },
      { q: 'Where can I get real vector EPS files?', a: 'Export from a vector program such as Illustrator or Inkscape.' },
    ],
  },

  psd: {
    title: 'Convert to PSD Online — PNG to Photoshop File Free',
    metaDescription:
      'Convert to PSD online for free. Turn a PNG into a flat single-layer Photoshop file with transparency in your browser, with no upload or sign-up needed.',
    heading: 'Convert to PSD',
    description:
      'Convert to PSD online: turn a PNG into a flat Photoshop file with transparency, in your browser, free, with no upload.',
    details:
      'PSD is Adobe Photoshop\'s native format. It can store layers, masks, adjustment layers, text and colour modes such as CMYK and 16-bit. Most editors, from GIMP to Affinity Photo, can open it.',
    longDescription:
      'The PSD files created here are the simplest kind: one flat layer holding your picture as 8-bit RGB with an alpha channel and no compression. That is enough to open an image in Photoshop and start adding layers, but it cannot bring back layers that were already merged away when the PNG was exported. Files are large, at about four bytes per pixel.',
    useCases: [
      'Start a Photoshop project from a PNG',
      'Supply a PSD to a team that works in Photoshop',
      'Feed a PSD-only plugin or texture tool',
    ],
    faqs: [
      { q: 'Will the PSD have layers?', a: 'Only one, the flat image.' },
      { q: 'Is transparency kept?', a: 'Yes, as an alpha channel.' },
      { q: 'Which colour mode does it use?', a: '8-bit RGB. CMYK and 16-bit are not produced.' },
    ],
  },

  tga: {
    title: 'Convert to TGA Online — PNG to Targa for Games Free',
    metaDescription:
      'Convert to TGA online for free. Turn a PNG into a 32-bit Targa image with alpha for game engines and 3D tools, in your browser, with no upload needed.',
    heading: 'Convert to TGA',
    description:
      'Convert to TGA online: turn a PNG into a 32-bit Targa with alpha for game engines and 3D tools, free, with no upload.',
    details:
      'TGA, or Targa, is a simple raster format created in the 1980s. It is still common in game development, texture pipelines and some video tools because it is easy to read and supports an alpha channel without compression.',
    longDescription:
      'The TGA files created here are uncompressed 32-bit images with red, green, blue and alpha, the variant most engines and editors accept. Transparency from a PNG becomes the alpha channel, so cut-out sprites and textures keep their edges. Expect about four bytes per pixel, much larger than the PNG.',
    useCases: [
      'Import textures and sprites with alpha into a game engine',
      'Supply images to older 3D and rendering software',
      'Build image sequences for compositing tools that read TGA',
    ],
    faqs: [
      { q: 'Does the TGA keep transparency?', a: 'Yes, as a 32-bit alpha channel.' },
      { q: 'Is the TGA compressed?', a: 'No. It is uncompressed, so files are large.' },
      { q: 'Will my engine read it?', a: 'Uncompressed 32-bit TGA is the most widely supported variant.' },
    ],
  },
};
