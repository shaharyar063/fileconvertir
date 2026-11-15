import type { ConversionPage } from './types';

/** Image conversion pages. Each entry is written for that conversion only. */
export const IMAGE_PAGES: Record<string, ConversionPage> = {
  'png-to-jpg': {
    title: 'PNG to JPG Converter — Free, No Upload',
    metaDescription:
      'Convert PNG to JPG in your browser. Smaller files for email and uploads, transparency filled with white, nothing uploaded. Up to 20 files at once.',
    heading: 'PNG to JPG Converter',
    description:
      'Convert PNG to JPG online for free and shrink screenshots and photos. Runs in your browser with no upload or sign-up; transparent areas turn white.',
    steps: [
      { name: 'Add your PNG files', text: 'Click Select Files or drop up to 20 PNG images onto the converter. Each file can be up to 100 MB.' },
      { name: 'Convert to JPG', text: 'Press Convert. Each image is redrawn on a white background and saved as a JPG at 92% quality.' },
      { name: 'Download', text: 'Save the JPG. If you converted several images, they download together as one ZIP.' },
    ],
    understanding: {
      paragraphs: [
        'PNG stores every pixel exactly, which keeps text and edges crisp but makes photographic images large. JPG throws away detail the eye rarely notices, so the same picture takes far less space.',
        'The trade-off is that JPG has no transparency. Any transparent area in your PNG is filled with white during conversion. JPG compression also leaves faint marks around sharp edges, so screenshots full of small text can look slightly softer than the original.',
      ],
      graphics: [
        {
          kind: 'transparency',
          caption: 'JPG cannot store transparency, so transparent areas are filled with white.',
          alt: 'A logo on a transparent background becomes the same logo on a solid white background after conversion to JPG.',
          sourceLabel: 'PNG with transparency',
          targetLabel: 'JPG on white',
          result: 'white',
        },
        {
          kind: 'sizeBars',
          caption: 'Approximate sizes for a 12-megapixel photograph. Real results depend on the picture.',
          unit: 'MB',
          bars: [
            { label: 'PNG (lossless)', value: 18 },
            { label: 'JPG at 92% quality', value: 4.5, highlight: true },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Attachments over the size limit', text: 'A photo saved as PNG can be many megabytes. As a JPG it usually fits under email and messaging limits.' },
        { title: 'Upload forms that only accept JPG', text: 'Job portals, visa applications and marketplaces often list JPG as the only photo format.' },
        { title: 'Photos on a web page', text: 'Photographic PNGs slow pages down. A JPG loads much faster with no visible difference at normal viewing sizes.' },
      ],
      keepOriginal:
        'Keep the PNG for logos, icons, diagrams and screenshots with small text, and for anything that needs a transparent background. For those, a JPG is both blurrier at the edges and often not much smaller.',
    },
    faqs: [
      { q: 'What happens to the transparent background?', a: 'It becomes white. JPG has no transparency channel, so the converter places your image on a white background before saving.' },
      { q: 'How much smaller will the JPG be?', a: 'For photographs, typically 70–90% smaller. For flat graphics and screenshots the saving is smaller, because PNG already compresses those well.' },
      { q: 'Can I choose the JPG quality?', a: 'No. Images are saved at a fixed 92% quality, which keeps photos looking the same while still cutting the file size substantially.' },
      { q: 'Will the image dimensions change?', a: 'No. The JPG has the same width and height in pixels as the PNG.' },
      { q: 'Is metadata kept?', a: 'No. The image is redrawn and re-encoded, so embedded text chunks and colour profiles in the PNG are not copied to the JPG.' },
    ],
  },

  'png-to-webp': {
    title: 'PNG to WebP Converter — Keep Transparency',
    metaDescription:
      'Convert PNG to WebP in your browser for lighter web images that keep transparency. Private, no upload. Needs a browser that can encode WebP.',
    heading: 'PNG to WebP Converter',
    description:
      'Convert PNG to WebP online for free to make website images lighter while keeping transparency. Runs in your browser with no upload or sign-up, in Chrome, Edge and Firefox.',
    steps: [
      { name: 'Add your PNG files', text: 'Click Select Files or drop up to 20 PNG images onto the converter.' },
      { name: 'Convert to WebP', text: 'Press Convert. Your browser encodes each image as WebP at 92% quality, keeping transparency.' },
      { name: 'Download', text: 'Save the WebP file, or a ZIP if you converted a batch.' },
    ],
    understanding: {
      paragraphs: [
        'WebP was designed by Google to replace both JPG and PNG on the web. Unlike JPG it supports transparency, and it compresses more efficiently than PNG, so a graphic with a transparent background can shrink considerably without gaining a white box.',
        'This converter uses the WebP encoder built into your browser at a high quality setting. That is lossy compression: the result looks the same at normal sizes but is not pixel-identical to the PNG. Chrome, Edge and Firefox can encode WebP. Some versions of Safari cannot, and in that case the converter shows an error instead of giving you a mislabelled file.',
      ],
      graphics: [
        {
          kind: 'table',
          caption: 'How the two formats differ on the points that matter for web images.',
          columns: ['PNG', 'WebP (as converted here)'],
          rows: [
            { label: 'Compression', a: 'Lossless', b: 'Lossy, 92% quality' },
            { label: 'Transparency', a: 'Yes', b: 'Yes, preserved' },
            { label: 'Typical size', a: 'Largest', b: 'Much smaller' },
            { label: 'Animation', a: 'No (APNG aside)', b: 'Supported by the format; output is a still' },
          ],
        },
        {
          kind: 'transparency',
          caption: 'Transparent areas stay transparent in the WebP.',
          alt: 'A logo on a transparent background stays on a transparent background after conversion to WebP.',
          sourceLabel: 'PNG with transparency',
          targetLabel: 'WebP with transparency',
          result: 'kept',
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Speeding up a website', text: 'Swapping PNG logos, icons and illustrations for WebP reduces page weight while the transparent edges stay clean.' },
        { title: 'Meeting a performance audit', text: 'Tools such as Lighthouse flag PNG and JPG images and recommend a modern format. WebP satisfies that check.' },
        { title: 'Stores and CMS platforms that prefer WebP', text: 'Several platforms recommend uploading WebP so pages stay light on mobile connections.' },
      ],
      graphic: {
        kind: 'support',
        caption: 'Where each format opens. WebP is safe on the web, less so in older desktop software.',
        columns: ['PNG', 'WebP'],
        rows: [
          { label: 'Current Chrome, Edge, Firefox, Safari', a: 'yes', b: 'yes' },
          { label: 'Browsers from before 2020', a: 'yes', b: 'partial' },
          { label: 'Older image editors and office apps', a: 'yes', b: 'partial' },
          { label: 'Email clients', a: 'yes', b: 'partial' },
        ],
      },
      keepOriginal:
        'Keep the PNG as your master copy for editing, and whenever the image must open in older software or be embedded in email. Convert a copy to WebP for the website.',
    },
    faqs: [
      { q: 'Does WebP keep the transparent background?', a: 'Yes. WebP has a full alpha channel, and the converter preserves it.' },
      { q: 'Is the WebP lossless?', a: 'No. It is encoded at 92% quality, which is lossy. The difference is not visible at normal viewing sizes, but keep the PNG if you need exact pixels.' },
      { q: 'Why do I get an error saying my browser cannot encode WebP?', a: 'WebP encoding depends on the browser. Chrome, Edge and Firefox support it; some Safari versions do not. Open the page in another browser and try again.' },
      { q: 'How much smaller is WebP than PNG?', a: 'It depends on the image. Photographic PNGs shrink the most; simple flat graphics shrink less. Compare the sizes shown after conversion.' },
      { q: 'Can every visitor see WebP images?', a: 'Every current browser can. Only very old browsers cannot, so most sites no longer need a fallback.' },
    ],
  },

  'png-to-tiff': {
    title: 'PNG to TIFF Converter — For Print and Archive',
    metaDescription:
      'Convert PNG to TIFF in your browser for print shops and archives. Output is uncompressed 8-bit RGB. Private, free and nothing is uploaded.',
    heading: 'PNG to TIFF Converter',
    description:
      'Convert PNG to TIFF online for free for print shops, archives and publishing software. The output is an uncompressed 8-bit RGB TIFF, created in your browser with no upload.',
    steps: [
      { name: 'Add your PNG files', text: 'Click Select Files or drop up to 20 PNG images onto the converter.' },
      { name: 'Convert to TIFF', text: 'Press Convert. Each image is written as an uncompressed 8-bit RGB TIFF.' },
      { name: 'Download', text: 'Save the TIFF, or a ZIP of TIFFs for a batch. Expect large files.' },
    ],
    understanding: {
      paragraphs: [
        'TIFF is a container that print, scanning and archive systems have relied on since the 1980s. It can hold many kinds of image data. The variant written here is the most widely accepted one: a single page, 8 bits per channel, RGB, with no compression.',
        'No colour information is lost, so every visible pixel matches the PNG. Two things do change. The file gets much larger, because nothing is compressed. And transparency is not kept: the output has no alpha channel, so transparent areas are placed on white.',
      ],
      graphics: [
        {
          kind: 'table',
          caption: 'What the TIFF produced by this converter contains.',
          columns: ['Your PNG', 'TIFF output'],
          rows: [
            { label: 'Colour', a: 'RGB or palette', b: '8-bit RGB' },
            { label: 'Compression', a: 'Lossless (Deflate)', b: 'None' },
            { label: 'Transparency', a: 'Supported', b: 'Flattened to white' },
            { label: 'CMYK / 16-bit', a: 'No CMYK', b: 'Not produced' },
            { label: 'Pages', a: 'One', b: 'One' },
          ],
        },
        {
          kind: 'sizeBars',
          caption: 'A 1920×1080 image: the TIFF stores about 3 bytes per pixel, while the PNG size depends on the content.',
          unit: 'MB',
          bars: [
            { label: 'PNG screenshot (typical)', value: 1 },
            { label: 'Uncompressed TIFF', value: 6.2, highlight: true },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'A print shop asks for TIFF', text: 'Many printers list TIFF on their intake form because their software handles it predictably.' },
        { title: 'Archive or records policies', text: 'Some organisations require TIFF masters for scanned or digitised material.' },
        { title: 'Older publishing software', text: 'Legacy layout and prepress tools often import TIFF more reliably than PNG.' },
      ],
      keepOriginal:
        'Keep the PNG for anything on screen or on the web. Browsers do not display TIFF, the files are several times larger, and the PNG already holds the same pixels losslessly. If your printer needs CMYK, convert in a prepress tool instead, since this output is RGB.',
    },
    faqs: [
      { q: 'Is any quality lost?', a: 'No colour detail is lost. The TIFF stores the same pixel values without compression. Only transparency is removed.' },
      { q: 'Why is the TIFF several times larger than my PNG?', a: 'It is uncompressed, so it needs about three bytes for every pixel regardless of content. PNG compresses the same pixels.' },
      { q: 'Does the TIFF support CMYK?', a: 'No. The output is 8-bit RGB. For CMYK separations, use software such as Photoshop or ask your print shop to convert.' },
      { q: 'What happens to a transparent background?', a: 'It is filled with white, because the TIFF written here has no alpha channel.' },
      { q: 'Does the TIFF include a resolution (DPI) setting?', a: 'It carries a default of 72. Pixel dimensions are unchanged, so set the print size or DPI in your layout software.' },
    ],
  },

  'jpg-to-png': {
    title: 'JPG to PNG Converter — Lossless Copy, No Upload',
    metaDescription:
      'Convert JPG to PNG in your browser. Get a lossless copy for editing that stops further quality loss. Free and private, nothing is uploaded.',
    heading: 'JPG to PNG Converter',
    description:
      'Convert JPG to PNG online for free to get a lossless copy you can edit without further quality loss. Works with JPG and JPEG files in your browser, with no upload or sign-up.',
    steps: [
      { name: 'Add your JPG files', text: 'Click Select Files or drop up to 20 JPG or JPEG images onto the converter.' },
      { name: 'Convert to PNG', text: 'Press Convert. Each photo is decoded and saved again as a lossless PNG.' },
      { name: 'Download', text: 'Save the PNG, or a ZIP for a batch. PNG files are noticeably larger than the JPGs.' },
    ],
    understanding: {
      paragraphs: [
        'A JPG loses a little detail every time it is saved, because it is recompressed each time. A PNG does not: once the picture is in PNG form you can open, edit and save it repeatedly without it degrading further.',
        'What the conversion cannot do is undo the compression already applied. The PNG is an exact copy of how the JPG looks now, including any blockiness or halos. It will also be several times larger, since PNG stores those pixels without discarding anything.',
        'The PNG gains the ability to hold transparency, but nothing is made transparent automatically. You can erase a background in an editor afterwards.',
      ],
      graphics: [
        {
          kind: 'sizeBars',
          caption: 'Approximate sizes for a 12-megapixel photograph. The PNG is larger but holds the same picture.',
          unit: 'MB',
          bars: [
            { label: 'JPG (original)', value: 4 },
            { label: 'PNG (lossless copy)', value: 18, highlight: true },
          ],
        },
        {
          kind: 'table',
          caption: 'What changes and what does not when a JPG becomes a PNG.',
          columns: ['JPG', 'PNG'],
          rows: [
            { label: 'Saving again', a: 'Loses a little quality each time', b: 'No loss' },
            { label: 'Existing artefacts', a: 'Present', b: 'Copied as they are' },
            { label: 'Transparency', a: 'Not possible', b: 'Possible after editing' },
            { label: 'EXIF data', a: 'Camera, date, GPS', b: 'Removed' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Before repeated editing', text: 'Convert once, then edit and save the PNG as often as you like without adding compression damage.' },
        { title: 'Cutting out a background', text: 'You need a format with transparency before you can remove a background for a logo, sticker or product shot.' },
        { title: 'Tools that require PNG', text: 'Some design, game and print-on-demand tools only accept PNG uploads.' },
        { title: 'Sharing without location data', text: 'The converted PNG carries no EXIF, so GPS coordinates and camera details are gone.' },
      ],
      keepOriginal:
        'Keep the JPG when you only need to view, share or post the photo. The PNG is far larger and looks no better.',
    },
    faqs: [
      { q: 'Will converting to PNG improve the image quality?', a: 'No. PNG preserves the picture exactly as the JPG shows it. Detail removed by JPG compression cannot be recovered.' },
      { q: 'Why is the PNG so much bigger?', a: 'PNG is lossless, so it cannot discard detail to save space the way JPG does. Photographs commonly grow three to five times.' },
      { q: 'Does the PNG have a transparent background?', a: 'Not automatically. The image stays fully opaque. PNG simply allows transparency once you remove the background in an editor.' },
      { q: 'Is the EXIF data kept?', a: 'No. Camera details, capture date and GPS location are not copied into the PNG.' },
      { q: 'Are .jpg and .jpeg files both accepted?', a: 'Yes. They are the same format with different extensions, and both convert the same way.' },
    ],
  },

  'webp-to-png': {
    title: 'WebP to PNG Converter — Transparency Kept',
    metaDescription:
      'Convert WebP to PNG in your browser so the image opens in any editor. Transparency is kept. Free, private and nothing is uploaded.',
    heading: 'WebP to PNG Converter',
    description:
      'Convert WebP to PNG online for free so images open in any editor or app, with transparency kept. Runs in your browser with no upload; an animated WebP gives its first frame.',
    steps: [
      { name: 'Add your WebP files', text: 'Click Select Files or drop up to 20 WebP images onto the converter.' },
      { name: 'Convert to PNG', text: 'Press Convert. Your browser decodes each WebP and saves it as a lossless PNG.' },
      { name: 'Download', text: 'Save the PNG, or a ZIP if you converted several images.' },
    ],
    understanding: {
      paragraphs: [
        'Websites serve WebP because it is small, but a saved WebP often will not open in desktop software. PNG is understood practically everywhere, and like WebP it supports full transparency, so nothing visible changes in the conversion.',
        'The PNG is a lossless copy of the decoded WebP. If the WebP was lossy, its existing compression is preserved as it is, with no additional loss. The file will be larger, because PNG compresses less efficiently.',
        'WebP can also hold animation. PNG output is a single image, so only the first frame of an animated WebP is converted.',
      ],
      graphics: [
        {
          kind: 'transparency',
          caption: 'Both formats support an alpha channel, so transparent backgrounds survive.',
          alt: 'A logo on a transparent background remains on a transparent background after conversion from WebP to PNG.',
          sourceLabel: 'WebP with transparency',
          targetLabel: 'PNG with transparency',
          result: 'kept',
        },
        {
          kind: 'frames',
          caption: 'An animated WebP becomes one still PNG: the first frame.',
          alt: 'Four animation frames on the left; only the first frame remains on the right.',
          sourceLabel: 'Animated WebP',
          targetLabel: 'PNG (first frame)',
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Editing a saved web image', text: 'Older versions of Photoshop and many other editors cannot open WebP. PNG opens in all of them.' },
        { title: 'Keeping a logo cut-out', text: 'When the image has a transparent background, PNG is the target that preserves it.' },
        { title: 'Design tools and print-on-demand uploads', text: 'Many upload forms accept PNG but reject WebP.' },
      ],
      graphic: {
        kind: 'support',
        caption: 'Where each format opens.',
        columns: ['WebP', 'PNG'],
        rows: [
          { label: 'Current web browsers', a: 'yes', b: 'yes' },
          { label: 'Older image editors', a: 'partial', b: 'yes' },
          { label: 'Office apps and email', a: 'partial', b: 'yes' },
          { label: 'Upload forms', a: 'partial', b: 'yes' },
        ],
      },
      keepOriginal:
        'Keep the WebP for use on a website, where its smaller size is the whole point. If the image is a photo and you do not need transparency, JPG gives a smaller file than PNG.',
    },
    faqs: [
      { q: 'Is the transparent background preserved?', a: 'Yes. PNG and WebP both store full transparency, and the converter keeps it.' },
      { q: 'Does converting lose quality?', a: 'No further quality is lost. PNG stores the decoded image exactly; it cannot restore detail a lossy WebP already dropped.' },
      { q: 'What happens to an animated WebP?', a: 'Only the first frame is converted, producing a still image.' },
      { q: 'Why is the PNG larger than the WebP?', a: 'WebP compresses more efficiently. The PNG holds the same pixels in a less compact form.' },
      { q: 'Why did my file fail to convert?', a: 'The converter relies on your browser to read WebP. Every current browser can; very old ones cannot.' },
    ],
  },

  'webp-to-jpg': {
    title: 'WebP to JPG Converter — Opens Everywhere',
    metaDescription:
      'Convert WebP to JPG in your browser so photos open in Office, email and upload forms. Transparent areas become white. Free, no upload.',
    heading: 'WebP to JPG Converter',
    description:
      'Convert WebP to JPG online for free so saved web images open in Word, email and upload forms. Done in your browser with no upload or sign-up; transparent areas become white.',
    steps: [
      { name: 'Add your WebP files', text: 'Click Select Files or drop up to 20 WebP images onto the converter.' },
      { name: 'Convert to JPG', text: 'Press Convert. Each image is placed on white and saved as a JPG at 92% quality.' },
      { name: 'Download', text: 'Save the JPG. Batches download as a single ZIP.' },
    ],
    understanding: {
      paragraphs: [
        'JPG is the safest choice when a WebP photo has to go somewhere that does not understand WebP: a Word document, an older phone, a marketplace listing.',
        'Both formats are usually lossy, so this conversion decodes the WebP and compresses it again. At the 92% quality used here the second pass is hard to see, but it is not lossless. Because WebP is the more efficient format, the JPG often ends up larger than the WebP you started with.',
        'JPG has no transparency. If the WebP has a transparent background it is filled with white. Animated WebP files become a still of the first frame.',
      ],
      graphics: [
        {
          kind: 'transparency',
          caption: 'Transparent areas in the WebP are filled with white in the JPG.',
          alt: 'A logo on a transparent background becomes the same logo on a white background after conversion to JPG.',
          sourceLabel: 'WebP with transparency',
          targetLabel: 'JPG on white',
          result: 'white',
        },
        {
          kind: 'table',
          caption: 'WebP compared with the JPG this converter produces.',
          columns: ['WebP', 'JPG'],
          rows: [
            { label: 'Compression', a: 'Lossy or lossless', b: 'Lossy, 92% quality' },
            { label: 'Transparency', a: 'Yes', b: 'No, becomes white' },
            { label: 'Animation', a: 'Possible', b: 'First frame only' },
            { label: 'File size', a: 'Smaller', b: 'Often larger' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Putting a web image into a document', text: 'Older versions of Word, PowerPoint and similar apps refuse WebP. A JPG inserts without trouble.' },
        { title: 'Marketplace and form uploads', text: 'Listings, profile photos and application forms frequently accept JPG only.' },
        { title: 'Sending photos to older devices', text: 'Phones, TVs and photo frames from a few years ago often cannot show WebP.' },
      ],
      graphic: {
        kind: 'support',
        caption: 'Where each format opens.',
        columns: ['WebP', 'JPG'],
        rows: [
          { label: 'Current web browsers', a: 'yes', b: 'yes' },
          { label: 'Older Office versions', a: 'no', b: 'yes' },
          { label: 'Older phones, TVs, photo frames', a: 'partial', b: 'yes' },
          { label: 'Upload forms', a: 'partial', b: 'yes' },
        ],
      },
      keepOriginal:
        'Keep the WebP for websites. If the image has a transparent background or is a logo or screenshot, convert to PNG instead, since JPG would add a white box and soften the edges.',
    },
    faqs: [
      { q: 'What happens to a transparent background?', a: 'It turns white, because JPG cannot store transparency. Choose PNG as the target if you need to keep it.' },
      { q: 'Will the JPG look worse than the WebP?', a: 'There is a small additional loss from compressing a second time, usually not visible at 92% quality.' },
      { q: 'Why is my JPG bigger than the WebP?', a: 'WebP needs fewer bytes for the same picture. Converting to JPG trades size for compatibility.' },
      { q: 'Can I convert an animated WebP?', a: 'You get a still image of the first frame. JPG cannot hold animation.' },
    ],
  },

  'avif-to-jpg': {
    title: 'AVIF to JPG Converter — Free, No Upload',
    metaDescription:
      'Convert AVIF images to JPG in your browser so they open in any app. Private and free, nothing is uploaded. Requires a browser that can display AVIF.',
    heading: 'AVIF to JPG Converter',
    description:
      'Convert AVIF to JPG online for free so images open on any device, app or upload form. Runs in your browser with no upload or sign-up, and needs a browser that can display AVIF.',
    steps: [
      { name: 'Add your AVIF files', text: 'Click Select Files or drop up to 20 AVIF images onto the converter.' },
      { name: 'Convert to JPG', text: 'Press Convert. Your browser decodes the AVIF and saves it as a JPG at 92% quality on a white background.' },
      { name: 'Download', text: 'Save the JPG, or a ZIP when converting several files.' },
    ],
    understanding: {
      paragraphs: [
        'AVIF is built on the AV1 video codec and is one of the most efficient image formats available. Sites use it to cut bandwidth, which leaves you with files that many programs still cannot open.',
        'Converting to JPG decodes the AVIF and recompresses it. The JPG is usually several times larger, because JPG needs more data for the same visual quality. AVIF features that JPG lacks are dropped: transparency becomes white, and HDR or wide-colour images are reduced to standard 8-bit colour.',
        'The converter depends on your browser to read AVIF. Chrome 85, Firefox 93, Safari 16.4 and later can. If the image will not load, the browser is too old to decode it.',
      ],
      graphics: [
        {
          kind: 'table',
          caption: 'What AVIF offers and what carries over to JPG.',
          columns: ['AVIF', 'JPG'],
          rows: [
            { label: 'Released', a: '2019', b: '1992' },
            { label: 'Transparency', a: 'Yes', b: 'No, becomes white' },
            { label: 'Colour depth', a: 'Up to 12-bit, HDR', b: '8-bit' },
            { label: 'File size', a: 'Very small', b: 'Larger' },
          ],
        },
        {
          kind: 'sizeBars',
          caption: 'Approximate sizes for the same photograph at similar visual quality.',
          unit: 'MB',
          bars: [
            { label: 'AVIF', value: 1 },
            { label: 'JPG at 92% quality', value: 3, highlight: true },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'An image saved from a website will not open', text: 'Photo viewers and editors without AVIF support show an error or a blank file. The JPG opens normally.' },
        { title: 'Sharing with someone on an older device', text: 'Phones and computers a few years old often cannot display AVIF at all.' },
        { title: 'Uploading to a form or marketplace', text: 'Most upload forms list JPG and PNG, not AVIF.' },
      ],
      graphic: {
        kind: 'support',
        caption: 'AVIF support is still catching up outside current browsers.',
        columns: ['AVIF', 'JPG'],
        rows: [
          { label: 'Chrome 85+, Firefox 93+, Safari 16.4+', a: 'yes', b: 'yes' },
          { label: 'Older browsers', a: 'no', b: 'yes' },
          { label: 'Image editors and office apps', a: 'partial', b: 'yes' },
          { label: 'Upload forms', a: 'partial', b: 'yes' },
        ],
      },
      keepOriginal:
        'Keep the AVIF for use on a modern website, and when the image has transparency or HDR that you want to preserve. For transparency, convert to PNG.',
    },
    faqs: [
      { q: 'Why will my AVIF not convert?', a: 'Your browser has to be able to display AVIF. Update to a current version of Chrome, Firefox, Edge or Safari and try again.' },
      { q: 'Why is the JPG larger than the AVIF?', a: 'AVIF compresses far more efficiently. A JPG of similar quality needs several times the data.' },
      { q: 'Is quality lost?', a: 'A little, because the picture is compressed a second time. At 92% quality it is rarely visible.' },
      { q: 'What happens to HDR images?', a: 'They are converted to standard 8-bit colour, since JPG cannot carry HDR. Very bright highlights may look flatter.' },
      { q: 'Can this site create AVIF files?', a: 'No. Browsers can read AVIF but do not provide a way to write it, so conversion is one-way.' },
    ],
  },

  'avif-to-png': {
    title: 'AVIF to PNG Converter — Keeps Transparency',
    metaDescription:
      'Convert AVIF to PNG in your browser and keep transparent backgrounds. Opens in every editor. Free, private, with no upload required.',
    heading: 'AVIF to PNG Converter',
    description:
      'Convert AVIF to PNG online for free and keep transparent backgrounds for editors and design tools. Done privately in your browser with no upload or sign-up.',
    steps: [
      { name: 'Add your AVIF files', text: 'Click Select Files or drop up to 20 AVIF images onto the converter.' },
      { name: 'Convert to PNG', text: 'Press Convert. Your browser decodes each AVIF and stores the pixels as a lossless PNG.' },
      { name: 'Download', text: 'Save the PNG, or a ZIP for a batch.' },
    ],
    understanding: {
      paragraphs: [
        'PNG is the target to choose when an AVIF has a transparent background or sharp-edged artwork. It keeps the alpha channel and adds no compression damage of its own.',
        'The PNG stores exactly what the AVIF decodes to. If the AVIF was lossy, as most web images are, that existing loss stays, but nothing further is removed. The price is size: PNG files are many times larger than AVIF.',
        'PNG output is 8 bits per channel, so HDR and 10- or 12-bit AVIF images are reduced to standard colour. Your browser must be able to display AVIF for the conversion to work.',
      ],
      graphics: [
        {
          kind: 'transparency',
          caption: 'The alpha channel in the AVIF is carried into the PNG.',
          alt: 'A logo on a transparent background remains on a transparent background after conversion from AVIF to PNG.',
          sourceLabel: 'AVIF with transparency',
          targetLabel: 'PNG with transparency',
          result: 'kept',
        },
        {
          kind: 'table',
          caption: 'Choosing between PNG and JPG as the target for an AVIF.',
          columns: ['To PNG', 'To JPG'],
          rows: [
            { label: 'Transparency', a: 'Kept', b: 'Becomes white' },
            { label: 'Added loss', a: 'None', b: 'Small' },
            { label: 'File size', a: 'Largest', b: 'Moderate' },
            { label: 'Best for', a: 'Logos, graphics, editing', b: 'Photos, sharing' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Opening a transparent AVIF in a design tool', text: 'Many editors and design tools still cannot import AVIF, and PNG is the format they all accept with transparency.' },
        { title: 'Editing without stacking compression', text: 'PNG is lossless, so further edits and saves do not degrade the image.' },
        { title: 'Reusing web artwork', text: 'Icons and illustrations pulled from a site as AVIF are easiest to reuse as PNG.' },
      ],
      keepOriginal:
        'Keep the AVIF for a website, where its small size matters. For ordinary photographs without transparency, converting to JPG gives a much smaller file than PNG.',
    },
    faqs: [
      { q: 'Does the PNG keep the transparent background?', a: 'Yes. Transparency in the AVIF is preserved in the PNG.' },
      { q: 'Is the conversion lossless?', a: 'The PNG is an exact copy of the decoded AVIF. It cannot restore detail a lossy AVIF already discarded.' },
      { q: 'Why is the PNG so much larger?', a: 'AVIF is one of the most efficient formats and PNG is lossless. The same picture can take ten times the space or more.' },
      { q: 'What happens to HDR or 10-bit images?', a: 'They are converted to 8 bits per channel, so the extended range is lost.' },
      { q: 'My AVIF will not load. Why?', a: 'The browser needs AVIF support: Chrome 85, Firefox 93, Safari 16.4 or later.' },
    ],
  },

  'gif-to-png': {
    title: 'GIF to PNG Converter — Still Image, No Upload',
    metaDescription:
      'Convert a GIF to PNG in your browser. Animated GIFs become a still of the first frame. Free and private, with nothing uploaded to a server.',
    heading: 'GIF to PNG Converter',
    description:
      'Convert GIF to PNG online for free to save a still image from a GIF. Runs in your browser with no upload or sign-up; an animated GIF gives its first frame.',
    steps: [
      { name: 'Add your GIF files', text: 'Click Select Files or drop up to 20 GIF images onto the converter.' },
      { name: 'Convert to PNG', text: 'Press Convert. The first frame of each GIF is saved as a PNG.' },
      { name: 'Download', text: 'Save the PNG, or a ZIP if you converted several GIFs.' },
    ],
    understanding: {
      paragraphs: [
        'GIF dates from 1987. Each frame can use at most 256 colours, and a pixel is either fully transparent or fully solid. PNG has neither limit: it stores millions of colours and smooth, partial transparency.',
        'Converting does not add colours that were never in the GIF. The PNG reproduces the frame exactly as it is, including any dithering or banding. What you gain is a modern file that edits cleanly and that every tool accepts.',
        'PNG holds one image, so animation is not carried over. The converter takes the first frame only.',
      ],
      graphics: [
        {
          kind: 'frames',
          caption: 'Only the first frame of an animated GIF is converted.',
          alt: 'Four animation frames on the left; a single frame, the first, on the right.',
          sourceLabel: 'Animated GIF',
          targetLabel: 'PNG (first frame)',
        },
        {
          kind: 'table',
          caption: 'The limits of GIF compared with PNG.',
          columns: ['GIF', 'PNG'],
          rows: [
            { label: 'Colours', a: '256 per frame', b: 'Up to 16.7 million' },
            { label: 'Transparency', a: 'On or off per pixel', b: 'Smooth, 256 levels' },
            { label: 'Animation', a: 'Yes', b: 'No' },
            { label: 'Compression', a: 'Lossless (LZW)', b: 'Lossless (Deflate)' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Grabbing a still from an animation', text: 'Use the first frame as a thumbnail, poster image or preview.' },
        { title: 'Modernising an old logo or icon', text: 'Graphics saved as GIF years ago are easier to edit and reuse as PNG.' },
        { title: 'Uploading where GIF is rejected', text: 'Some avatar, document and print forms accept PNG but not GIF.' },
      ],
      keepOriginal:
        'Keep the GIF if you need the animation. A PNG cannot play it. To make an animation smaller or sharper, a video format is the right target, not PNG.',
    },
    faqs: [
      { q: 'Does the animation survive?', a: 'No. PNG is a still format, and only the first frame is converted.' },
      { q: 'Can I pick a different frame?', a: 'Not in this converter. It always uses the first frame.' },
      { q: 'Will the PNG have more colours or look smoother?', a: 'No. It reproduces the GIF frame exactly. Colours the GIF discarded cannot be brought back.' },
      { q: 'Is transparency kept?', a: 'Yes. Transparent pixels in the GIF stay transparent in the PNG.' },
    ],
  },

  'bmp-to-jpg': {
    title: 'BMP to JPG Converter — Shrink Bitmap Files',
    metaDescription:
      'Convert BMP to JPG in your browser and cut file size dramatically. Free and private, nothing is uploaded. Convert up to 20 bitmaps at a time.',
    heading: 'BMP to JPG Converter',
    description:
      'Convert BMP to JPG online for free and shrink large bitmap files to a fraction of their size. Runs in your browser with no upload or sign-up, for up to 20 files at once.',
    steps: [
      { name: 'Add your BMP files', text: 'Click Select Files or drop up to 20 BMP images onto the converter. Each can be up to 100 MB.' },
      { name: 'Convert to JPG', text: 'Press Convert. Each bitmap is compressed as a JPG at 92% quality.' },
      { name: 'Download', text: 'Save the JPG, or a ZIP of JPGs for a batch.' },
    ],
    understanding: {
      paragraphs: [
        'A BMP stores every pixel with little or no compression, usually three bytes each. That makes the format simple and the files huge: a single full-HD image is about 6 MB whatever it shows.',
        'JPG compresses the same picture by discarding detail that is hard to see. For photographs and scans the visual difference is negligible, while the file shrinks to a small fraction of its size. Sharp-edged graphics and text can show faint artefacts, as with any JPG.',
      ],
      graphics: [
        {
          kind: 'sizeBars',
          caption: 'A 1920×1080 photograph. The BMP size is fixed by its dimensions; the JPG size depends on the picture.',
          unit: 'MB',
          bars: [
            { label: 'BMP, 24-bit uncompressed', value: 6.2 },
            { label: 'JPG at 92% quality (typical)', value: 0.6, highlight: true },
          ],
        },
        {
          kind: 'table',
          caption: 'BMP compared with JPG.',
          columns: ['BMP', 'JPG'],
          rows: [
            { label: 'Compression', a: 'None (usually)', b: 'Lossy' },
            { label: 'Quality', a: 'Exact pixels', b: 'Visually similar' },
            { label: 'Web and email', a: 'Impractical', b: 'Standard' },
            { label: 'Used by', a: 'Older Windows software, devices', b: 'Everything' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Emailing or uploading a bitmap', text: 'BMP files quickly exceed attachment limits. The JPG is small enough to send.' },
        { title: 'Clearing space', text: 'Folders of old scans or screenshots saved as BMP take up many times the room they need.' },
        { title: 'Output from older software or devices', text: 'Legacy tools, lab instruments and embedded devices still export BMP that other people cannot use easily.' },
      ],
      keepOriginal:
        'Keep the BMP, or convert to PNG instead, when you need exact pixels: pixel art, technical images and files that software reads back as bitmaps.',
    },
    faqs: [
      { q: 'How much smaller will the JPG be?', a: 'For photographs, often a tenth of the BMP size or less. The exact figure depends on the image.' },
      { q: 'Will I see a difference in quality?', a: 'Rarely for photos at 92% quality. Fine lines and small text can show slight softening.' },
      { q: 'Do the pixel dimensions change?', a: 'No. Width and height stay the same.' },
      { q: 'Which BMP files are supported?', a: 'Any BMP your browser can display, which covers the common 24-bit and 32-bit Windows bitmaps.' },
    ],
  },

  'svg-to-png': {
    title: 'SVG to PNG Converter — Rasterise Vectors Free',
    metaDescription:
      'Convert SVG to PNG in your browser. The vector is rendered at the size set in the file, with transparency kept. Free, private, no upload.',
    heading: 'SVG to PNG Converter',
    description:
      'Convert SVG to PNG online for free with a transparent background kept. Runs in your browser with no upload or sign-up; the PNG uses the width and height set in the SVG.',
    steps: [
      { name: 'Add your SVG files', text: 'Click Select Files or drop up to 20 SVG files onto the converter.' },
      { name: 'Convert to PNG', text: 'Press Convert. Your browser draws each SVG at the width and height set in the file and saves it as a PNG.' },
      { name: 'Download', text: 'Save the PNG, or a ZIP when converting several files.' },
    ],
    understanding: {
      paragraphs: [
        'An SVG describes shapes mathematically, which is why it stays sharp at any size. A PNG is a grid of pixels. Converting means rendering the drawing once, at one size, and that size is then fixed.',
        'The PNG takes its dimensions from the width and height attributes in the SVG. To get a larger image, increase those values in the SVG before converting. If the file sets no size, a default is used. Enlarging the PNG afterwards will blur it.',
        'Transparent areas stay transparent. Text is drawn with the fonts available on your device, so an SVG that relies on a font you do not have, or on external images, may look different from the original.',
      ],
      graphics: [
        {
          kind: 'vector',
          caption: 'A vector shape is stored as curves; the PNG stores the same shape as fixed pixels.',
          alt: 'A smooth curve defined by control points on the left; the same curve drawn as blocks on a pixel grid on the right.',
          sourceLabel: 'SVG: curves, any size',
          targetLabel: 'PNG: pixels, one size',
        },
        {
          kind: 'table',
          caption: 'SVG compared with PNG.',
          columns: ['SVG', 'PNG'],
          rows: [
            { label: 'Made of', a: 'Shapes and text', b: 'Pixels' },
            { label: 'Scaling', a: 'Sharp at any size', b: 'Blurs when enlarged' },
            { label: 'Transparency', a: 'Yes', b: 'Yes, kept' },
            { label: 'Accepted by', a: 'Browsers, design tools', b: 'Nearly everything' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Uploading a logo', text: 'Social networks, marketplaces and many site builders reject SVG and ask for PNG.' },
        { title: 'Slides, documents and email', text: 'Office apps and email clients handle PNG reliably, while SVG support varies.' },
        { title: 'App icons and favicons', text: 'These are needed as PNG at specific pixel sizes. Set the SVG to that size, then convert.' },
      ],
      keepOriginal:
        'Keep the SVG as your master and for websites, where it stays sharp on every screen and is usually smaller. Make PNG copies only for the places that need them.',
    },
    faqs: [
      { q: 'What size will the PNG be?', a: 'The width and height declared in the SVG. Edit those attributes first if you need a different size.' },
      { q: 'How do I get a high-resolution PNG?', a: 'Open the SVG in a text editor, increase the width and height values proportionally, save, and convert again.' },
      { q: 'Is the transparent background kept?', a: 'Yes. Areas with nothing drawn stay transparent in the PNG.' },
      { q: 'Why do the fonts look different?', a: 'Text is rendered with fonts installed on your device. If the SVG names a font you do not have, a fallback is used. Converting the text to outlines in a design tool avoids this.' },
      { q: 'Can I convert a PNG back to SVG?', a: 'Not to a true vector. That requires tracing software, and simple converters only embed the picture inside an SVG wrapper.' },
    ],
  },

  'jpg-to-pdf': {
    title: 'JPG to PDF Converter — Free, No Upload',
    metaDescription:
      'Convert JPG photos to PDF in your browser. Each photo becomes its own one-page PDF sized to the image. Free, private and nothing is uploaded.',
    heading: 'JPG to PDF Converter',
    description:
      'Convert JPG to PDF online for free: turn photos, scans and receipts into PDFs for forms and email. No upload or sign-up; each photo becomes its own PDF.',
    steps: [
      { name: 'Add your JPG files', text: 'Click Select Files or drop up to 20 JPG photos onto the converter.' },
      { name: 'Convert to PDF', text: 'Press Convert. Each photo is placed on a PDF page the same size as the image.' },
      { name: 'Download', text: 'Save the PDF. Several photos download as a ZIP with one PDF per photo.' },
    ],
    understanding: {
      paragraphs: [
        'The converter wraps each photo in a PDF with a single page. The page takes the photo\'s own dimensions, so the picture fills it edge to edge with no margins or white bars.',
        'Inside the PDF the photo is stored as a JPEG at 92% quality. The page is a picture, not text: words in a photographed document cannot be selected or searched, because no text recognition is performed. Location and camera data in the original photo are not carried into the PDF.',
        'Each photo produces its own PDF. The converter does not join several photos into one multi-page file.',
      ],
      graphics: [
        {
          kind: 'pages',
          caption: 'The photo becomes a single PDF page of the same proportions.',
          alt: 'A loose photograph on the left; on the right the same photograph filling one PDF page from edge to edge.',
          left: { label: 'JPG photo', look: 'image' },
          right: { label: 'One-page PDF', look: 'photo' },
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'A portal that only takes PDF', text: 'Applications, claims and government forms often require a PDF even when all you have is a phone photo of the document.' },
        { title: 'Sending a signed page', text: 'A photo of a signed form is more readily accepted, and easier to print, as a PDF.' },
        { title: 'Receipts and invoices for expenses', text: 'Accounting tools commonly expect a PDF attachment per receipt.' },
      ],
      keepOriginal:
        'Keep the JPG when you are simply sharing a picture: it is smaller and opens anywhere. If you need several photos in one document, convert them here and then merge the PDFs with a PDF merge tool.',
    },
    faqs: [
      { q: 'Can I combine several photos into one PDF?', a: 'Not with this converter. Each photo becomes a separate PDF. Merge them afterwards with a PDF merge tool if you need one file.' },
      { q: 'Can the text in the PDF be selected or searched?', a: 'No. The page is an image. Making it searchable requires OCR, which this converter does not do.' },
      { q: 'What page size does the PDF use?', a: 'The page matches the photo in pixels. Printers scale it to fit the paper.' },
      { q: 'Does the photo lose quality?', a: 'It is re-saved at 92% JPEG quality, a very small change that is not visible in normal use.' },
      { q: 'Is my photo\'s GPS location included?', a: 'No. EXIF data such as location and camera model is not copied into the PDF.' },
    ],
  },

  'png-to-pdf': {
    title: 'PNG to PDF Converter — Free, No Upload',
    metaDescription:
      'Convert PNG screenshots and images to PDF in your browser. One PDF per image, transparency placed on white. Free, private, nothing uploaded.',
    heading: 'PNG to PDF Converter',
    description:
      'Convert PNG to PDF online for free: turn screenshots and images into PDFs for forms and email. No upload or sign-up; each image becomes its own PDF.',
    steps: [
      { name: 'Add your PNG files', text: 'Click Select Files or drop up to 20 PNG images onto the converter.' },
      { name: 'Convert to PDF', text: 'Press Convert. Each image is placed on a white PDF page of the same size.' },
      { name: 'Download', text: 'Save the PDF. A batch downloads as a ZIP containing one PDF per image.' },
    ],
    understanding: {
      paragraphs: [
        'Each PNG is placed on a PDF page with the same pixel dimensions, so a screenshot or scan appears whole, without cropping or margins.',
        'The image is not stored losslessly. Inside the PDF it is a JPEG at 92% quality, which keeps the file a sensible size. Photos look unchanged; small text in screenshots can show very faint compression marks when zoomed in. Transparent areas are placed on white.',
        'Because the page is a picture, its text cannot be selected or searched. Each PNG becomes a separate PDF, and files are not merged.',
      ],
      graphics: [
        {
          kind: 'pages',
          caption: 'The image fills one PDF page of the same proportions.',
          alt: 'A loose image on the left; on the right the same image filling one PDF page.',
          left: { label: 'PNG image', look: 'image' },
          right: { label: 'One-page PDF', look: 'photo' },
        },
        {
          kind: 'table',
          caption: 'What changes when a PNG is wrapped in a PDF by this converter.',
          columns: ['PNG', 'PDF output'],
          rows: [
            { label: 'Image data', a: 'Lossless', b: 'JPEG, 92% quality' },
            { label: 'Transparency', a: 'Supported', b: 'Placed on white' },
            { label: 'Text', a: 'Pixels', b: 'Still pixels, not selectable' },
            { label: 'Pages', a: 'Not applicable', b: 'One per image' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Attaching a screenshot to a ticket or claim', text: 'Support desks and insurers frequently ask for PDF attachments.' },
        { title: 'Submitting a scanned page', text: 'Scanner apps often save PNG, while the form you are filling in wants a PDF.' },
        { title: 'Printing a chart or diagram', text: 'A PDF prints predictably on any system, at the size of the page.' },
      ],
      keepOriginal:
        'Keep the PNG when exact pixels matter, for example interface mock-ups or artwork, and when the recipient can open images. To hand over several images as one document, merge the resulting PDFs with a PDF merge tool.',
    },
    faqs: [
      { q: 'Can I put several PNGs in one PDF?', a: 'Not here. You get one PDF per image. Combine them afterwards with a PDF merge tool.' },
      { q: 'Is the image stored losslessly in the PDF?', a: 'No. It is saved as a JPEG at 92% quality, which is visually very close but not identical to the PNG.' },
      { q: 'What happens to transparency?', a: 'Transparent areas are filled with white.' },
      { q: 'Can I select the text in a screenshot once it is a PDF?', a: 'No. The page is still an image. Selectable text requires OCR, which is not performed.' },
    ],
  },
};
