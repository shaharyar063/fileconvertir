import type { FormatSEO } from '../types';

/** Hand-written hub pages for image formats. */

export const IMAGE_SOURCE_HUBS: Record<string, FormatSEO> = {
  jpg: {
    title: 'JPG Converter — Turn JPG Into PNG or PDF',
    metaDescription:
      'Convert JPG photos to PNG or PDF in your browser. Files stay on your device, nothing is uploaded, and you can convert up to 20 photos at a time.',
    heading: 'JPG File Converter',
    description:
      'Convert JPG photos to PNG or PDF without uploading them anywhere. Pick a target format below, or drop your files into the converter above.',
    details:
      'JPG (also written JPEG) is the lossy image format almost every camera, phone and website uses. It stores photographs compactly by discarding detail the eye is unlikely to notice, which is why a 12-megapixel photo can fit in two or three megabytes. The trade-off is that every re-save loses a little more quality, and JPG has no transparency channel.',
    longDescription:
      'Most reasons to convert a JPG come down to what the destination accepts. A form may want a PDF, a design tool may want a PNG you can layer over a background, or you may want a lossless copy before you start editing so you stop compounding compression. Converting a JPG to PNG does not bring back detail that was already thrown away, but it stops further loss. The converter reads the file with your browser\'s own image decoder, so very large photos can take a moment on older phones.',
    useCases: [
      'Turn a phone photo of a signed form or ID into a PDF for an online application',
      'Make a lossless PNG copy of a JPG before editing it repeatedly',
      'Prepare product photos as PNG for tools that expect a lossless source',
      'Convert a batch of up to 20 photos at once and download them as one ZIP',
    ],
    faqs: [
      {
        q: 'Does converting JPG to PNG improve the quality?',
        a: 'No. PNG is lossless, so it keeps the picture exactly as it is, but it cannot recover detail the JPG compression already removed. The file will usually be several times larger than the original JPG.',
      },
      {
        q: 'Is the photo\'s EXIF data kept?',
        a: 'No. The image is redrawn on a canvas and re-encoded, so camera details, GPS location and the embedded colour profile are not carried over. That is useful if you want to share a photo without its location.',
      },
      {
        q: 'Are JPG and JPEG the same thing?',
        a: 'Yes. They are the same format. The three-letter .jpg extension exists because older Windows versions required three-character extensions. A file named .jpeg is converted exactly like a .jpg file.',
      },
      {
        q: 'Does anything get uploaded?',
        a: 'No. The conversion runs in your browser, so the photo never leaves your device.',
      },
    ],
  },

  png: {
    title: 'PNG Converter — Convert PNG to JPG, WebP, PDF',
    metaDescription:
      'Convert PNG images to JPG, WebP, TIFF or PDF in your browser. Free, private, no upload, and transparency is handled for you when the target needs it.',
    heading: 'PNG File Converter',
    description:
      'Turn PNG screenshots and graphics into smaller JPG or WebP files, or into a PDF or TIFF, entirely inside your browser.',
    details:
      'PNG is a lossless image format built for graphics: screenshots, logos, diagrams and anything with sharp edges or transparency. It compresses without discarding any pixels, which keeps text crisp but makes photographs large. A full-screen screenshot saved as PNG is often several megabytes, while the same image as JPG is a fraction of that.',
    longDescription:
      'The usual reason to convert a PNG is size. Email limits, upload forms and slow connections all punish big files, and a JPG or WebP can be a fraction of the size for photographic content. The catch is transparency: JPG has no alpha channel, so transparent areas are filled with white during conversion. If you need to keep transparency in a smaller file, WebP is the better target. PNG to PDF is handy when a form wants a document instead of an image, and PNG to TIFF is for print workflows that ask for it.',
    useCases: [
      'Shrink a screenshot before attaching it to an email or support ticket',
      'Replace a heavy PNG on a web page with a lighter WebP while keeping transparency',
      'Wrap a scanned page saved as PNG into a PDF for submission',
      'Hand a print shop a TIFF when their intake form insists on it',
    ],
    faqs: [
      {
        q: 'What happens to transparent areas when I convert to JPG?',
        a: 'They become white. JPG cannot store transparency, so the converter flattens the image onto a white background first. Choose WebP if you need to keep the transparency.',
      },
      {
        q: 'Will converting to JPG make the text in a screenshot blurry?',
        a: 'It can. JPG compression works best on photographs and leaves faint artefacts around sharp edges such as text. For screenshots full of text, WebP or keeping the PNG usually looks cleaner.',
      },
      {
        q: 'Why is the TIFF so much bigger than my PNG?',
        a: 'The TIFF we write is uncompressed 8-bit RGB, which is the most widely accepted form but takes about as many bytes as the raw pixels. PNG compresses the same pixels losslessly, so it is much smaller.',
      },
      {
        q: 'Is there a file size limit?',
        a: 'Each file can be up to 100 MB, with up to 20 files per batch. Very large images may be limited by your device\'s memory.',
      },
    ],
  },

  webp: {
    title: 'WebP Converter — Convert WebP to PNG or JPG',
    metaDescription:
      'Convert WebP images to PNG or JPG so they open anywhere. Runs in your browser with no upload, and keeps transparency when you choose PNG.',
    heading: 'WebP File Converter',
    description:
      'Save WebP images as PNG or JPG so they work in editors, office apps and upload forms that do not accept WebP.',
    details:
      'WebP is an image format Google released in 2010 to make web pages lighter. It offers both lossy and lossless compression, supports transparency and animation, and typically produces smaller files than JPG or PNG at similar visual quality. Every current browser can display it, but many desktop programs, older phones and upload forms still reject it.',
    longDescription:
      'You usually meet WebP by accident: you save an image from a website and the file refuses to open in your editor or in a document. Converting it to PNG keeps full quality and any transparency, while JPG gives the smallest file for photos. Because WebP can contain animation, note that only the first frame is converted. Your browser decodes the file itself, so no data leaves your device.',
    useCases: [
      'Insert an image saved from a website into Word, Google Docs or PowerPoint',
      'Upload a product photo to a marketplace that only allows JPG or PNG',
      'Edit a downloaded image in software that cannot read WebP',
      'Keep a logo\'s transparent background by converting to PNG',
    ],
    faqs: [
      {
        q: 'Does an animated WebP stay animated?',
        a: 'No. The converter draws the image onto a canvas, which captures a single frame, so animated WebP files become a still image.',
      },
      {
        q: 'Should I pick PNG or JPG?',
        a: 'Pick PNG for logos, screenshots and anything with transparency. Pick JPG for photographs when you want the smallest file; transparent areas will turn white.',
      },
      {
        q: 'Why does the PNG come out larger than the WebP?',
        a: 'WebP compresses more efficiently than PNG, so the same pixels need more bytes once stored losslessly as PNG. The picture itself is not worse.',
      },
    ],
  },

  avif: {
    title: 'AVIF Converter — Convert AVIF to JPG or PNG',
    metaDescription:
      'Open AVIF images anywhere by converting them to JPG or PNG. The conversion happens in your browser, so your pictures are never uploaded.',
    heading: 'AVIF File Converter',
    description:
      'Convert AVIF images to JPG or PNG so editors, documents and older devices can open them.',
    details:
      'AVIF is an image format built on the AV1 video codec and standardised in 2019. It usually beats JPG and WebP on file size at the same quality and supports transparency, HDR and wide colour. Modern versions of Chrome, Firefox and Safari display it, but many editing programs and older operating systems still cannot open an .avif file.',
    longDescription:
      'Sites that serve AVIF to save bandwidth leave you with files that Windows Photos, older Office versions and many upload forms do not recognise. Converting to JPG gives a universally readable photo, and PNG keeps transparency. This page only decodes AVIF; it does not create AVIF files, because browsers do not expose an AVIF encoder. If your browser cannot display AVIF itself, it cannot convert it either.',
    useCases: [
      'Open an AVIF saved from a website in an editor that lacks AVIF support',
      'Send an AVIF photo to someone whose phone or mail client cannot show it',
      'Attach an image to a document or form that only accepts JPG or PNG',
    ],
    faqs: [
      {
        q: 'Can I convert other images to AVIF here?',
        a: 'No. Browsers can decode AVIF but do not provide a way to create it, so this site converts from AVIF only.',
      },
      {
        q: 'Why will my AVIF not convert?',
        a: 'The converter relies on your browser to read the file. Browsers older than Chrome 85, Firefox 93 or Safari 16.4 cannot decode AVIF, so update your browser or try another one.',
      },
      {
        q: 'Will the JPG be bigger than the AVIF?',
        a: 'Usually yes. AVIF compresses more efficiently, so the same picture needs more bytes as JPG. The image itself looks the same to the eye at the default quality.',
      },
    ],
  },

  gif: {
    title: 'GIF Converter — Turn GIF Into PNG',
    metaDescription:
      'Convert a GIF to a PNG image in your browser. Free, private and instant, with no upload. Note that animated GIFs become a single still frame.',
    heading: 'GIF File Converter',
    description:
      'Convert GIF images to PNG. Everything runs in your browser and your files never leave your device.',
    details:
      'GIF dates from 1987 and is limited to 256 colours per image, which is why photographs look grainy in GIF form. Its lasting value is simple animation, and it supports one-bit transparency, meaning a pixel is either fully see-through or fully solid. The format uses lossless LZW compression.',
    longDescription:
      'Turning a GIF into a PNG is mostly about grabbing a clean still. PNG has no colour limit and supports smooth transparency, so it is a better home for logos and icons that happened to be saved as GIF. The converter reads only the first frame of an animated GIF, so it is not a way to extract every frame or to keep the animation. If you need the animation, keep the original GIF.',
    useCases: [
      'Save the first frame of an animated GIF as a still image',
      'Move an old logo or icon from GIF to a modern PNG',
      'Open a GIF in a tool that handles PNG better',
    ],
    faqs: [
      {
        q: 'Does the animation survive?',
        a: 'No. Only the first frame is converted, and the result is a single still PNG.',
      },
      {
        q: 'Can I extract every frame of a GIF?',
        a: 'Not with this converter. It outputs one image per file, taken from the first frame.',
      },
      {
        q: 'Will the PNG look better than the GIF?',
        a: 'It will look identical, because the PNG just stores the GIF\'s pixels without the 256-colour palette limit. A PNG cannot add colours the GIF never had.',
      },
    ],
  },

  bmp: {
    title: 'BMP Converter — Convert BMP to JPG',
    metaDescription:
      'Shrink huge BMP images by converting them to JPG right in your browser. Free, private, with no upload. Typical size savings are very large.',
    heading: 'BMP File Converter',
    description:
      'Convert bulky BMP images to JPG. Conversion runs in your browser, so nothing is uploaded.',
    details:
      'BMP is the Windows bitmap format. It stores pixels with little or no compression, so files are large: a 1920×1080 image at 24 bits per pixel is roughly 6 MB. It has no real advantage on the web today, but it is still produced by older software, screen-capture tools and some embedded devices.',
    longDescription:
      'Because BMP is uncompressed, converting to JPG typically cuts a file to a small fraction of its size, which is the main reason people use this page. JPG is lossy, so choose it for photographs and screenshots you only need to view, not for artwork you will edit again. Any transparency is flattened onto white because JPG has no alpha channel.',
    useCases: [
      'Reduce the size of old scans or screenshots saved as BMP',
      'Make a BMP small enough to email or upload',
      'Open a BMP in a program that only supports JPG',
    ],
    faqs: [
      {
        q: 'How much smaller will the JPG be?',
        a: 'It depends on the picture, but a BMP of a photograph often shrinks to a tenth of its size or less when saved as JPG.',
      },
      {
        q: 'Will I lose quality?',
        a: 'A little. JPG is lossy, although at the default quality the difference is hard to see in photographs. If you need an exact copy, convert to PNG instead where that is offered.',
      },
    ],
  },

  svg: {
    title: 'SVG Converter — Convert SVG to PNG',
    metaDescription:
      'Turn SVG graphics into PNG images in your browser. Free and private, with no upload. The PNG is rendered at the size the SVG declares.',
    heading: 'SVG File Converter',
    description:
      'Convert an SVG to a PNG image for places that cannot display vector graphics.',
    details:
      'SVG is a vector format written in XML. Instead of storing pixels, it stores shapes, paths and text, so it stays sharp at any size and is usually tiny for logos and icons. Browsers display SVG natively, but many email clients, social networks, slide tools and upload forms do not accept it.',
    longDescription:
      'Converting SVG to PNG rasterises the drawing: it is rendered once at a fixed pixel size, and that size is baked in. The converter uses the width and height declared in the SVG, and falls back to a default size when the file declares none. If you need a particular or larger PNG, set the width and height in the SVG first. Once it is a PNG you cannot scale it up without blurring, so keep the original SVG.',
    useCases: [
      'Upload a logo to a site that rejects SVG files',
      'Use an icon or diagram in a slide deck or email',
      'Get a quick preview image of a vector drawing',
    ],
    faqs: [
      {
        q: 'What size will the PNG be?',
        a: 'The size written in the SVG\'s width and height attributes. If the file declares none, a default size is used, so add width and height to the SVG when you need a specific size.',
      },
      {
        q: 'Is transparency kept?',
        a: 'Yes, when you convert to PNG. Transparent parts of the SVG stay transparent. Converting to JPG fills them with white.',
      },
      {
        q: 'Can I turn a PNG back into an SVG?',
        a: 'Converting a raster image into true vector shapes needs tracing software. Any SVG made from a raster file by a simple converter just embeds the picture and does not become scalable.',
      },
    ],
  },
};

export const IMAGE_TARGET_HUBS: Record<string, FormatSEO> = {
  jpg: {
    title: 'Convert to JPG — PNG, WebP, AVIF or BMP to JPG',
    metaDescription:
      'Convert PNG, WebP, AVIF or BMP images to JPG in your browser. Smaller files that open everywhere, free, private and with no upload.',
    heading: 'Convert to JPG',
    description:
      'Make a JPG from a PNG, WebP, AVIF or BMP. Choose the converter that matches your source file below.',
    details:
      'JPG is the default format for photographs. It uses lossy compression tuned to human vision, which makes files small, and it is understood by every browser, phone, printer and upload form. It cannot store transparency, and quality drops slightly each time a JPG is saved again.',
    longDescription:
      'People ask for JPG when a site, form or colleague expects a photo-sized file. Converting from PNG or BMP can reduce size dramatically, while WebP and AVIF are usually already compact, so converting them is about compatibility rather than size. In every case transparent areas are filled with white because JPG has no alpha channel.',
    useCases: [
      'Meet an upload limit by turning a large PNG screenshot into a JPG',
      'Open a downloaded WebP or AVIF in software that only supports JPG',
      'Shrink old BMP files that take up too much space',
    ],
    faqs: [
      {
        q: 'Which source formats can I convert to JPG?',
        a: 'PNG, WebP, AVIF and BMP all have their own converter, and the tool also handles other images such as GIF and SVG from the homepage.',
      },
      {
        q: 'Why did the background turn white?',
        a: 'JPG cannot store transparency. Transparent areas are filled with white during conversion. Use PNG or WebP as the target if you need to keep it.',
      },
      {
        q: 'Is the JPG quality adjustable?',
        a: 'Not at the moment. Images are saved at a fixed high quality setting of about 92%, which balances size and appearance for most photos.',
      },
    ],
  },

  png: {
    title: 'Convert to PNG — JPG, WebP, AVIF, GIF or SVG to PNG',
    metaDescription:
      'Convert JPG, WebP, AVIF, GIF or SVG files to lossless PNG in your browser. Keeps transparency, runs privately and never uploads your files.',
    heading: 'Convert to PNG',
    description:
      'Create a lossless PNG from JPG, WebP, AVIF, GIF or SVG. Pick the converter that matches your source file below.',
    details:
      'PNG is a lossless image format with full alpha transparency. Nothing is thrown away when a picture is saved as PNG, so it suits screenshots, logos, diagrams and images you intend to edit again. The cost is file size, especially for photographs.',
    longDescription:
      'Reasons to convert to PNG differ by source. From SVG you get a fixed-size raster of a vector drawing. From GIF you get a still of the first frame without the 256-colour limit. From WebP or AVIF you get a file that every editor opens and that preserves transparency. From JPG you stop further quality loss, although the lost detail does not return.',
    useCases: [
      'Rasterise an SVG logo for a platform that does not accept vector files',
      'Open a WebP or AVIF in an editor that does not support them',
      'Keep a lossless copy of a JPG before heavy editing',
      'Capture a still frame from a GIF',
    ],
    faqs: [
      {
        q: 'Will converting JPG to PNG restore lost quality?',
        a: 'No. PNG stores exactly what the JPG contains. The detail removed by JPEG compression cannot be recovered, and the PNG will be much larger.',
      },
      {
        q: 'Is transparency preserved?',
        a: 'Yes. Where the source has transparency, as with WebP, AVIF and SVG, it carries into the PNG.',
      },
      {
        q: 'Do animated images stay animated?',
        a: 'No. PNG output is a single still image, so animated GIF or WebP files lose their animation.',
      },
    ],
  },

  webp: {
    title: 'Convert to WebP — Turn PNG Into WebP',
    metaDescription:
      'Convert PNG images to WebP for faster web pages. Runs in your browser with no upload and keeps transparency. Needs a browser that can encode WebP.',
    heading: 'Convert to WebP',
    description:
      'Make a WebP from a PNG to cut file size while keeping transparency.',
    details:
      'WebP is Google\'s web image format. It supports lossy and lossless compression, transparency and animation, and usually produces files noticeably smaller than JPG or PNG at similar visual quality. All current browsers display it.',
    longDescription:
      'Swapping PNG for WebP is one of the simplest ways to make a page load faster, since graphics with transparency can shrink considerably. WebP encoding relies on your browser: Chrome, Edge and Firefox can create WebP files, while Safari may not. If your browser cannot encode WebP the converter will tell you instead of handing back a mislabelled file.',
    useCases: [
      'Reduce the weight of images on a website without losing transparency',
      'Prepare images for a CMS or store that recommends WebP',
      'Shrink a collection of screenshots for sharing',
    ],
    faqs: [
      {
        q: 'Why does the converter say my browser cannot create WebP?',
        a: 'Creating WebP depends on the browser\'s built-in encoder. Chrome, Edge and Firefox include one; some versions of Safari do not. Try another browser.',
      },
      {
        q: 'Is the WebP lossless?',
        a: 'It is saved at a fixed high quality setting, which is lossy but visually close to the PNG. Transparency is kept.',
      },
      {
        q: 'Can older browsers show WebP?',
        a: 'All current browsers can. Very old browsers and some email clients cannot, so keep a PNG or JPG fallback where that matters.',
      },
    ],
  },

  tiff: {
    title: 'Convert to TIFF — Turn PNG Into TIFF',
    metaDescription:
      'Convert PNG images to TIFF in your browser for print and archive workflows. Free, private and with no upload. Output is uncompressed 8-bit RGB.',
    heading: 'Convert to TIFF',
    description:
      'Create a TIFF from a PNG for print shops and archives that ask for it.',
    details:
      'TIFF is a flexible image container created in the 1980s that remains common in print production, scanning and archiving. It can hold lossless or uncompressed pixel data, many colour modes and multiple pages. Most web browsers cannot display it.',
    longDescription:
      'You normally convert to TIFF because someone else requires it, such as a printer\'s intake form or an archive policy. The TIFF written here is a single-page, uncompressed, 8-bit RGB image, the most widely accepted variant. It is therefore much larger than the source PNG. Transparency is flattened onto white because the output has no alpha channel, and CMYK or 16-bit TIFFs are not produced.',
    useCases: [
      'Satisfy a print vendor that only accepts TIFF files',
      'Store a lossless master copy for an archive',
      'Pass an image into older publishing software',
    ],
    faqs: [
      {
        q: 'Why is the TIFF so large?',
        a: 'It stores the raw pixels without compression, which is the safest choice for compatibility. Expect roughly width × height × 3 bytes.',
      },
      {
        q: 'Does it support CMYK or 16-bit colour?',
        a: 'No. Output is 8-bit RGB. For prepress work that needs CMYK, convert in a dedicated tool such as Photoshop.',
      },
      {
        q: 'What happens to transparency?',
        a: 'It is flattened onto a white background, since the TIFF has no alpha channel.',
      },
    ],
  },
};
