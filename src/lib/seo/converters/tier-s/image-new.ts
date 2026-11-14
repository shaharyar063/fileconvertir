import type { ConverterContentOverride, ArticleSection } from '../../types';

export const IMAGE_S_NEW: Record<string, ConverterContentOverride> = {

  'png-to-jpg': {
    title: 'PNG to JPG Converter — Free, No Upload | FileConvertir',
    metaDescription: 'Convert PNG to JPG free online — no upload, 100% private. Shrink screenshots & photos, drop transparency to white. Works everywhere, no signup, no limits.',
    heading: 'PNG to JPG Converter',
    description: 'Convert PNG images to smaller, email-and-web-friendly JPG instantly in your browser. Ideal for shrinking bulky screenshots and photos when you do not need transparency.',
    longDescription: 'PNG is lossless and great for graphics and screenshots, but those files can get huge — a full-screen capture or a photo saved as PNG is often several times larger than the same image as JPG. When you are emailing, uploading, or posting photos and do not need transparency, converting PNG to JPG can cut the file size by 70–90% with no visible quality difference. FileConvertir converts entirely in your browser using your device\'s native image encoder: no upload, no signup, no watermark, and transparent areas are flattened onto a clean white background.',
    howToSteps: [
      { name: 'Drop your PNG files', text: 'Drag your .png files into the converter, or click "Select Files". Batch up to 20 files at once.' },
      { name: 'JPG is preselected', text: 'The output is already set to JPG — conversion starts immediately when files are added.' },
      { name: 'Local in-browser conversion', text: 'Each PNG is decoded and re-encoded as JPG on your device. Transparency is flattened to white. Nothing is uploaded.' },
      { name: 'Download your JPGs', text: 'Save each JPG or download the whole batch as a single ZIP.' },
    ],
    whyChooseUs: [
      { title: 'Dramatic size reduction', text: 'Converting a screenshot or photo from PNG to JPG typically shrinks it by 70–90%, making files far easier to email and upload.' },
      { title: 'No upload — fully private', text: 'Your images stay on your device. Conversion runs entirely in your browser.' },
      { title: 'High-quality output', text: 'JPG is saved at quality 92, which is visually indistinguishable from the source for photos and most screenshots.' },
    ],
    faqs: [
      { q: 'What happens to transparency when I convert PNG to JPG?', a: 'JPG does not support transparency, so any transparent areas are filled with a solid white background during conversion. If you need to keep transparency, keep the file as PNG or convert to WebP instead.' },
      { q: 'Why is my PNG screenshot so large in the first place?', a: 'PNG stores every pixel losslessly, which is ideal for sharp text and graphics but inefficient for photographic content. A detailed full-screen screenshot can be several megabytes as PNG but only a few hundred kilobytes as JPG.' },
      { q: 'Will converting to JPG hurt quality?', a: 'JPG is lossy, but at quality 92 the difference is invisible to the eye for photos and most screenshots. The one place you may notice it is around very sharp, high-contrast text or thin lines, where JPG can introduce faint halos. For those, keep PNG.' },
      { q: 'Are my files uploaded to a server?', a: 'No. Conversion happens 100% in your browser. Your images never leave your device.' },
      { q: 'How much smaller will the JPG be?', a: 'Typically 70–90% smaller for screenshots and photos. A 5MB PNG often becomes a 400KB–1MB JPG.' },
      { q: 'Can I change the background color instead of white?', a: 'The converter flattens transparency to white by default. If you need a specific background color, edit the image first in a graphics tool, then convert.' },
      { q: 'Can I batch convert many PNGs at once?', a: 'Yes — up to 20 files at a time, downloadable as a single ZIP.' },
      { q: 'What is the maximum file size?', a: '100MB per file, which covers even very large high-resolution PNGs.' },
    ],
    useCases: [
      'Shrink bulky PNG screenshots so they fit email and chat attachment limits',
      'Convert PNG photos to JPG for faster web pages and smaller uploads',
      'Prepare images for platforms and forms that only accept JPG',
      'Batch-compress a folder of PNG exports into lightweight JPGs',
    ],
    article: pngToJpg(),
    isPriority: true,
  },

  'png-to-webp': {
    title: 'PNG to WebP Converter — Free, No Upload | FileConvertir',
    metaDescription: 'Convert PNG to WebP free online — no upload, 100% private. Shrink images ~30% for faster websites while keeping transparency. No signup, no limits.',
    heading: 'PNG to WebP Converter',
    description: 'Convert PNG images to modern WebP instantly in your browser. WebP keeps transparency like PNG but produces much smaller files — perfect for speeding up websites and apps.',
    longDescription: 'WebP is Google\'s modern image format that delivers PNG-quality graphics and JPG-quality photos at significantly smaller sizes. For web developers and anyone optimizing a site, converting PNG to WebP is one of the easiest performance wins: files are often 25–35% smaller (sometimes much more) while transparency and sharpness are preserved. FileConvertir converts PNG to WebP entirely in your browser using your device\'s native WebP encoder — no upload, no signup, no quality compromises you did not choose, and full batch support.',
    howToSteps: [
      { name: 'Drop your PNG files', text: 'Drag your .png files into the converter, or click "Select Files". Up to 20 files at a time.' },
      { name: 'WebP is preselected', text: 'Output is already set to WebP — conversion begins automatically when files are added.' },
      { name: 'In-browser conversion', text: 'Each PNG is decoded and re-encoded as WebP locally, preserving transparency. Nothing is uploaded.' },
      { name: 'Download your WebP files', text: 'Save each file or grab the whole batch as a single ZIP.' },
    ],
    whyChooseUs: [
      { title: 'Smaller files, same look', text: 'WebP typically cuts PNG file size by 25–35% or more while preserving transparency and visual quality — a fast, free performance boost for any website.' },
      { title: 'No upload — fully private', text: 'Your images are processed entirely in your browser and never uploaded to a server.' },
      { title: 'Batch-friendly', text: 'Convert an entire folder of site assets to WebP at once and download them as a ZIP.' },
    ],
    faqs: [
      { q: 'Why convert PNG to WebP for my website?', a: 'WebP files are typically 25–35% smaller than equivalent PNGs at the same visual quality, which means faster page loads, lower bandwidth costs, and better Core Web Vitals scores. It supports transparency, so it is a drop-in replacement for most PNG graphics.' },
      { q: 'Does WebP keep transparency?', a: 'Yes. WebP fully supports an alpha channel, so transparent PNGs convert to transparent WebP without a background fill.' },
      { q: 'Is WebP lossless or lossy?', a: 'WebP supports both. This converter produces high-quality WebP that preserves the look of your PNG while shrinking the file. For graphics with flat colors and sharp edges, the savings are usually largest.' },
      { q: 'Do all browsers support WebP?', a: 'Yes — every modern browser (Chrome, Edge, Firefox, Safari 14+) supports WebP. Only very old browsers do not, which is rarely a concern today. For maximum safety on legacy systems, keep a PNG fallback.' },
      { q: 'Are my files uploaded anywhere?', a: 'No. Conversion runs 100% in your browser via your device\'s encoder. Files never leave your machine.' },
      { q: 'When should I NOT convert to WebP?', a: 'If you need the file in an app or workflow that rejects WebP (some older editors, certain print pipelines, or email signatures), stick with PNG or JPG. WebP is best for the web and modern apps.' },
      { q: 'Can I batch convert PNGs to WebP?', a: 'Yes — up to 20 at once, downloadable as a ZIP. Great for optimizing a whole set of site images.' },
      { q: 'What is the maximum file size?', a: '100MB per file, more than enough for web graphics and high-resolution PNGs.' },
    ],
    useCases: [
      'Shrink website images to speed up page loads and improve Core Web Vitals',
      'Convert transparent PNG logos and icons to lighter WebP without losing the alpha channel',
      'Reduce bandwidth costs by serving smaller WebP assets',
      'Batch-optimize a folder of PNG graphics for a web project',
    ],
    article: pngToWebp(),
    isPriority: true,
  },

  'jpg-to-png': {
    title: 'JPG to PNG Converter — Free, No Upload | FileConvertir',
    metaDescription: 'Convert JPG to PNG free online — no upload, 100% private. Lossless PNG for editing & transparency work. Works on any device, no signup, no limits.',
    heading: 'JPG to PNG Converter',
    description: 'Convert JPG photos to lossless PNG instantly in your browser. Useful when you need a format that supports transparency or a lossless container for further editing.',
    longDescription: 'JPG is the everyday photo format, but it is lossy and does not support transparency. Converting JPG to PNG gives you a lossless container that adds no further compression each time you save, plus the ability to add an alpha channel for cut-outs and overlays. The honest caveat: PNG cannot undo the compression artifacts already baked into a JPG — it preserves the image exactly as it currently looks, blocks and all. FileConvertir converts entirely in your browser with no upload, no signup, and full batch support.',
    howToSteps: [
      { name: 'Drop your JPG files', text: 'Drag your .jpg or .jpeg files into the converter, or click "Select Files". Up to 20 at a time.' },
      { name: 'PNG is preselected', text: 'Output is already set to PNG — conversion starts as soon as files are added.' },
      { name: 'Local conversion', text: 'Each JPG is decoded and re-encoded losslessly as PNG on your device. Nothing is uploaded.' },
      { name: 'Download your PNGs', text: 'Save each PNG or download the whole batch as a ZIP.' },
    ],
    whyChooseUs: [
      { title: 'Lossless from here on out', text: 'Once converted to PNG, repeated edits and saves add no further quality loss — unlike JPG, which degrades each time you re-save.' },
      { title: 'Ready for transparency', text: 'PNG supports an alpha channel, so you can erase a background or add overlays after converting.' },
      { title: 'No upload — fully private', text: 'Your photos are converted in your browser and never uploaded to a server.' },
    ],
    faqs: [
      { q: 'Will converting JPG to PNG improve image quality?', a: 'No — and this is the most common misunderstanding. PNG is lossless, so it preserves the JPG exactly as it currently looks, including any compression artifacts. It cannot recover detail or remove blockiness that JPG already discarded. What PNG does is prevent any further loss from future edits and saves.' },
      { q: 'Why would I convert JPG to PNG then?', a: 'Mainly two reasons: to stop quality degradation during repeated editing (every JPG re-save loses a little more), and to gain transparency support so you can cut out a background or composite the image.' },
      { q: 'Why is the PNG larger than the JPG?', a: 'PNG stores image data losslessly while JPG compresses aggressively. For a photographic image, the PNG can be several times larger. That extra size is the cost of lossless storage.' },
      { q: 'Does the PNG get a transparent background automatically?', a: 'No. Converting does not remove the existing background — the image looks the same. PNG simply gives you a format that can hold transparency once you erase areas in an editor.' },
      { q: 'Are my photos uploaded to a server?', a: 'No. Everything runs in your browser via WebAssembly and your device\'s image encoder. Files never leave your machine.' },
      { q: 'Can I batch convert JPGs to PNG?', a: 'Yes — up to 20 files at once, downloadable as a single ZIP.' },
      { q: 'Is there any quality setting?', a: 'PNG is lossless, so there is no quality slider — it always preserves the image exactly.' },
      { q: 'What is the maximum file size?', a: '100MB per file, ample for high-resolution photos.' },
    ],
    useCases: [
      'Create a lossless working copy before heavy editing so re-saves do not degrade the image',
      'Prepare a JPG for background removal or compositing that needs transparency',
      'Place a photo into a design tool or pipeline that expects PNG',
      'Convert a batch of JPGs to PNG for a consistent, lossless asset set',
    ],
    article: jpgToPng(),
    isPriority: true,
  },

  'gif-to-png': {
    title: 'GIF to PNG Converter — Free, No Upload | FileConvertir',
    metaDescription: 'Convert GIF to PNG free online — no upload, 100% private. Extract a clean static PNG from a GIF, with transparency. Works everywhere, no signup.',
    heading: 'GIF to PNG Converter',
    description: 'Convert GIF images to crisp PNG instantly in your browser. Ideal for turning a static GIF — or the first frame of an animation — into a clean, high-quality PNG with transparency support.',
    longDescription: 'GIF is an old format limited to 256 colors per frame, which makes it great for simple graphics and animations but poor for photos and gradients, where it shows visible banding. Converting GIF to PNG gives you a lossless image with full color depth and proper transparency (PNG\'s alpha channel beats GIF\'s hard-edged 1-bit transparency). For animated GIFs, this extracts a single static frame. FileConvertir does it all in your browser — no upload, no signup, no limits beyond your browser\'s memory.',
    howToSteps: [
      { name: 'Drop your GIF files', text: 'Drag your .gif files into the converter, or click "Select Files". Up to 20 at a time.' },
      { name: 'PNG is preselected', text: 'Output is already set to PNG — conversion starts when files are added.' },
      { name: 'Local conversion', text: 'Each GIF is decoded and re-encoded as PNG on your device, preserving transparency. Nothing is uploaded.' },
      { name: 'Download your PNGs', text: 'Save each PNG or download the batch as a ZIP.' },
    ],
    whyChooseUs: [
      { title: 'Full color, no banding', text: 'PNG supports millions of colors, so gradients and photos that looked banded as a 256-color GIF come out smooth.' },
      { title: 'Better transparency', text: 'PNG\'s alpha channel gives smooth, anti-aliased edges instead of GIF\'s hard 1-bit transparency.' },
      { title: 'No upload — fully private', text: 'Conversion happens entirely in your browser; your files never reach a server.' },
    ],
    faqs: [
      { q: 'What happens to an animated GIF when I convert it to PNG?', a: 'PNG is a single-frame image format, so converting an animated GIF extracts one static frame rather than the whole animation. If you need to keep motion, convert to a video format like MP4 or WebM instead, or use an animated WebP/APNG tool.' },
      { q: 'Why convert a GIF to PNG?', a: 'GIF is limited to 256 colors and uses crude 1-bit transparency. PNG gives you full color depth (no banding on gradients) and smooth alpha transparency, making it far better for editing, graphics, and high-quality display.' },
      { q: 'Will quality improve?', a: 'PNG cannot add colors the GIF already discarded, but it preserves what is there losslessly and avoids GIF\'s dithering artifacts in future edits. For graphics, the PNG usually looks cleaner and edits better.' },
      { q: 'Does transparency carry over?', a: 'Yes. GIF transparency is converted to PNG\'s alpha channel. Note GIF transparency is binary (on/off), so edges may look slightly jagged — that is a limitation of the source GIF, not the conversion.' },
      { q: 'Are my files uploaded to a server?', a: 'No. Everything runs in your browser. Files never leave your device.' },
      { q: 'Can I batch convert GIFs to PNG?', a: 'Yes — up to 20 at once, downloadable as a ZIP.' },
      { q: 'Why is the PNG sometimes bigger than the GIF?', a: 'PNG is lossless and stores full color, so for complex images it can be larger than a 256-color GIF. For simple flat graphics it is often similar or smaller.' },
      { q: 'What is the maximum file size?', a: '100MB per file.' },
    ],
    useCases: [
      'Extract a clean static PNG from a single-frame or animated GIF',
      'Convert a low-color GIF graphic to full-color PNG for editing',
      'Get smooth PNG transparency from a GIF logo or icon',
      'Prepare GIF artwork as PNG for design tools that prefer it',
    ],
    article: gifToPng(),
    isPriority: true,
  },

  'bmp-to-jpg': {
    title: 'BMP to JPG Converter — Free, No Upload | FileConvertir',
    metaDescription: 'Convert BMP to JPG free online — no upload, 100% private. Shrink huge uncompressed Windows bitmaps into tiny JPGs. No signup, no limits.',
    heading: 'BMP to JPG Converter',
    description: 'Convert BMP (Windows bitmap) images to compact JPG instantly in your browser. Perfect for shrinking the huge, uncompressed bitmap files older Windows software produces into something you can actually email and upload.',
    longDescription: 'BMP is an old, uncompressed Windows bitmap format. Because it stores every pixel raw, BMP files are enormous — a single full-color image can be tens of megabytes. Most modern websites, apps, and email clients no longer accept BMP, and there is rarely any reason to keep it. Converting BMP to JPG can shrink the file by 95% or more while looking virtually identical. FileConvertir converts entirely in your browser using your device\'s native encoder — no upload, no signup, and full batch support.',
    howToSteps: [
      { name: 'Drop your BMP files', text: 'Drag your .bmp files into the converter, or click "Select Files". Up to 20 at a time.' },
      { name: 'JPG is preselected', text: 'Output is already set to JPG — conversion starts when files are added.' },
      { name: 'Local conversion', text: 'Each BMP is decoded and re-encoded as JPG on your device. Nothing is uploaded.' },
      { name: 'Download your JPGs', text: 'Save each JPG or download the batch as a ZIP.' },
    ],
    whyChooseUs: [
      { title: 'Massive size reduction', text: 'Uncompressed BMP files often shrink by 95% or more as JPG with no visible quality loss — far easier to store, email, and upload.' },
      { title: 'Universal compatibility', text: 'JPG opens everywhere; many modern apps and websites reject BMP entirely.' },
      { title: 'No upload — fully private', text: 'Your images are converted in your browser and never uploaded to a server.' },
    ],
    faqs: [
      { q: 'Why are BMP files so large?', a: 'BMP is typically uncompressed — it stores the full color value of every single pixel with no compression. A 4000×3000 image can be over 35MB. JPG applies efficient compression, which is why the same image becomes a fraction of the size.' },
      { q: 'How much smaller will the JPG be?', a: 'Usually 90–98% smaller. A 30MB BMP commonly becomes a 1–3MB JPG with no visible difference.' },
      { q: 'Will I lose quality converting BMP to JPG?', a: 'JPG is lossy, but at quality 92 the difference is invisible for photographic content. The only place you might notice it is around very sharp, high-contrast edges or text — for those, PNG is a better target.' },
      { q: 'What is a BMP file used for?', a: 'BMP is a legacy Windows bitmap format, still produced by some older software, scanners, and Windows utilities. Because it is uncompressed and poorly supported online, converting to JPG (or PNG) is almost always worthwhile.' },
      { q: 'Are my files uploaded to a server?', a: 'No. Conversion runs 100% in your browser. Files never leave your device.' },
      { q: 'Does BMP transparency carry over?', a: 'Standard BMP files do not store transparency, so there is nothing to carry over. JPG does not support transparency either. If your source has an alpha channel, convert to PNG instead.' },
      { q: 'Can I batch convert BMP files?', a: 'Yes — up to 20 at once, downloadable as a ZIP.' },
      { q: 'What is the maximum file size?', a: '100MB per file, which comfortably covers large uncompressed bitmaps.' },
    ],
    useCases: [
      'Shrink huge uncompressed BMP exports into email-friendly JPGs',
      'Convert legacy Windows bitmap images so modern apps and sites accept them',
      'Reduce storage taken up by old BMP image archives',
      'Batch-convert a folder of BMP files into compact JPGs',
    ],
    article: bmpToJpg(),
    isPriority: true,
  },

  'png-to-tiff': {
    title: 'PNG to TIFF Converter — Free, No Upload | FileConvertir',
    metaDescription: 'Convert PNG to TIFF free online — no upload, 100% private. Get print-ready, archival lossless TIFF from PNG. Works on any device, no signup, no limits.',
    heading: 'PNG to TIFF Converter',
    description: 'Convert PNG images to uncompressed TIFF in your browser. Ideal when a print shop, archive, or professional workflow specifically requires TIFF instead of PNG.',
    longDescription: 'TIFF is the standard format for print production, professional scanning, and long-term archival because it is lossless, widely trusted in print pipelines, and supports features like LZW compression and high bit depths. If a print shop or document archive asks you for a TIFF and you only have a PNG, this converter bridges the gap without quality loss. FileConvertir converts PNG to TIFF entirely in your browser — no upload, no signup, no limits beyond your browser\'s memory, and your files never touch a server.',
    howToSteps: [
      { name: 'Drop your PNG files', text: 'Drag your .png files into the converter, or click "Select Files". Up to 20 at a time.' },
      { name: 'TIFF is preselected', text: 'Output is already set to TIFF — conversion starts automatically.' },
      { name: 'Local conversion', text: 'Each PNG is decoded and written as an uncompressed 8-bit RGB TIFF on your device, with transparent areas placed on white. Nothing is uploaded.' },
      { name: 'Download your TIFFs', text: 'Save each TIFF or download the batch as a ZIP.' },
    ],
    whyChooseUs: [
      { title: 'Lossless, print-ready', text: 'The TIFF keeps every colour pixel from your PNG, giving print shops and archives the format they expect with no quality loss.' },
      { title: 'No upload — fully private', text: 'Your images are converted in your browser and never uploaded to a server.' },
      { title: 'Batch support', text: 'Convert a whole set of PNGs to TIFF at once and download them as a ZIP.' },
    ],
    faqs: [
      { q: 'Why do print shops ask for TIFF instead of PNG?', a: 'TIFF has been the trusted standard in print and prepress for decades. It is lossless, supports CMYK and high bit depths, embeds reliably in professional layout software, and avoids any ambiguity about compression. The TIFFs made here are 8-bit RGB, the most widely accepted variant. Many print pipelines and document management systems are simply built around TIFF.' },
      { q: 'Does converting PNG to TIFF lose quality?', a: 'No. Both PNG and TIFF are lossless, so the image is preserved exactly. Converting is purely a container change, not a quality change.' },
      { q: 'Does the TIFF use compression?', a: 'TIFF can use lossless compression such as LZW, but the files this converter writes are uncompressed, so they are much larger than the PNG. Even compressed, TIFF files are generally larger than PNG because of how the format stores data.' },
      { q: 'Will transparency be preserved?', a: 'The TIFF written here has no alpha channel, so transparent areas are placed on a white background. Print workflows rarely use the alpha channel anyway, but check with your print shop if transparency matters.' },
      { q: 'Are my files uploaded to a server?', a: 'No. Everything runs in your browser via WebAssembly. Files never leave your device.' },
      { q: 'Why is the TIFF larger than the PNG?', a: 'TIFF stores image data in a format optimized for fidelity and print rather than minimal size. Even with LZW compression it is usually larger than an equivalent PNG — that is expected for an archival/print format.' },
      { q: 'Can I batch convert PNGs to TIFF?', a: 'Yes — up to 20 at once, downloadable as a ZIP.' },
      { q: 'What is the maximum file size?', a: '100MB per file, ample for high-resolution print images.' },
    ],
    useCases: [
      'Provide a print shop with the TIFF they require from a PNG you already have',
      'Archive important images in the widely trusted, lossless TIFF format',
      'Hand off graphics to a prepress workflow built around TIFF',
      'Batch-convert a set of PNGs to TIFF for a print or archival project',
    ],
    article: pngToTiff(),
    isPriority: true,
  },
};

function pngToJpg(): ArticleSection[] {
  return [
    {
      heading: 'Why your PNGs are so big — and why that becomes a problem',
      paragraphs: [
        'PNG is a lossless format, which is wonderful for graphics and screenshots but terrible for file size when the content is photographic. Because PNG stores image data without throwing anything away, a single full-screen screenshot or a photo saved as PNG can easily run several megabytes — sometimes ten or twenty times larger than the same picture as a JPG.',
        'That size is invisible until it gets in the way. Email providers cap attachments. Chat apps compress or reject large images. Web forms and content systems have upload limits. Websites built on heavy PNGs load slowly and burn bandwidth. Suddenly that crisp lossless file is the thing standing between you and getting the image where it needs to go.',
        'When you do not actually need PNG\'s lossless quality or transparency, converting to JPG is the obvious fix. It is the difference between an image that bounces off an attachment limit and one that sends in a second.',
      ],
    },
    {
      heading: 'How much smaller, and at what cost to quality',
      paragraphs: [
        'Converting a photographic PNG to JPG typically shrinks it by 70–90%. A 5MB screenshot can drop to a few hundred kilobytes; a 12MB photo can land under a megabyte. The savings come from JPG\'s compression, which is tuned for the way human eyes perceive images — it discards detail you are unlikely to notice.',
        'That discarding is the catch: JPG is lossy. At a high quality setting like 92, the loss is invisible for photos and most screenshots, and the size win is enormous. The honest exception is content with very sharp, high-contrast edges — fine text, thin lines, crisp logos — where JPG can leave faint halos or ringing. If your image is mostly that kind of content and legibility matters, keep it as PNG.',
        'For everything photographic, though, the trade is overwhelmingly in JPG\'s favor: a tiny, imperceptible quality cost for a massive reduction in size.',
      ],
    },
    {
      heading: 'Transparency disappears — plan for it',
      paragraphs: [
        'This is the single most important thing to understand before converting: JPG cannot store transparency. Any transparent areas in your PNG have to be filled with a solid color during conversion, and that color is white by default. A logo on a transparent background becomes a logo on a white box.',
        'If you need to keep transparency — for overlays, stickers, logos that will sit on colored backgrounds, or any compositing work — do not convert to JPG. Either keep the PNG or convert to WebP, which supports both transparency and strong compression.',
        'If you do want a flat image but a different background color, the cleanest approach is to flatten the PNG onto your chosen color in an editor first, then convert. Going in knowing transparency will become white saves you from surprises later.',
      ],
    },
    {
      heading: 'The everyday wins: email, web and uploads',
      paragraphs: [
        'The most common reason to convert PNG to JPG is simply to make an image practical to send and post. Email a 6MB PNG screenshot and you risk hitting attachment caps or clogging the recipient\'s inbox; send it as a 500KB JPG and nobody notices the size at all. For chat apps and social platforms, smaller JPGs upload faster and avoid aggressive recompression.',
        'For websites, the impact is bigger than it looks. Heavy PNG photos slow page loads, hurt mobile users on limited data, and drag down performance scores. Swapping them for JPGs (or WebP) is one of the simplest speed improvements you can make.',
        'In short, JPG is the lingua franca of everyday image sharing. When your PNG is just a photo or a screenshot headed out into the world, JPG gets it there with far less friction.',
      ],
    },
    {
      heading: 'Batch converting screenshots and photo dumps',
      paragraphs: [
        'If you have a folder of PNG screenshots or exported photos, converting them one by one is tedious. Drop the whole set in at once — up to twenty files per batch — and download them as a single ZIP. This is the fast way to slim down a pile of captures before archiving or sharing them.',
        'Batching is especially handy for screenshots, which pile up quickly and are almost always larger than they need to be as PNG. Converting them to JPG en masse reclaims a surprising amount of disk space with no meaningful loss for typical screen content.',
        'Just remember the transparency rule applies to every file in the batch: any transparent regions become white. For ordinary screenshots and photos that is exactly what you want.',
      ],
    },
    {
      heading: 'Why doing it in your browser keeps things private',
      paragraphs: [
        'Screenshots and photos can be surprisingly sensitive — they might show private messages, account details, documents, or faces. Uploading them to an online converter means handing that content to someone else\'s server. FileConvertir avoids that completely by converting inside your browser: the PNG is decoded and the JPG is encoded on your own device, with nothing transmitted or stored remotely.',
        'You can verify it in the browser\'s developer tools — the Network tab shows no file leaving your machine during conversion. That local-only design also means no signup, no daily limits, and no watermark stamped on your images.',
        'The per-file ceiling is 100MB, which covers even very large high-resolution PNGs. The first conversion warms up the in-browser encoder briefly; after that, batches process quickly and stay entirely on your device until you choose to save them.',
      ],
    },
  ];
}

function pngToWebp(): ArticleSection[] {
  return [
    {
      heading: 'The fastest free win for site performance',
      paragraphs: [
        'If you run a website and your images are PNGs, you are almost certainly shipping more bytes than you need to. PNG is lossless and faithful, but it is not built for the web\'s appetite for speed. WebP, Google\'s modern image format, delivers the same visual result at a meaningfully smaller size — commonly 25–35% smaller, and far more than that for flat graphics with limited colors.',
        'Smaller images mean faster page loads, lower bandwidth bills, and better Core Web Vitals scores, which feed directly into search ranking and user experience. Converting PNG to WebP is one of those rare changes that improves performance without forcing you to compromise on how the image looks.',
        'Best of all, WebP is not a trade-off between quality and size in the way old formats were. It supports transparency like PNG and photographic compression like JPG, so it covers both jobs in a single, lighter format.',
      ],
    },
    {
      heading: 'How WebP achieves smaller files',
      paragraphs: [
        'WebP borrows compression techniques from modern video coding. For graphics and images with flat regions and sharp edges, its lossless mode often beats PNG outright while still being a true lossless copy. For photographic content, its lossy mode produces files dramatically smaller than JPG at comparable quality.',
        'The encoder is smart about predicting pixel values from their neighbors and storing only the differences, which is why areas of solid color — common in logos, icons, and UI graphics — compress so efficiently. A PNG that wastes space describing a large flat background becomes a tiny WebP.',
        'The practical upshot is that the same image, looking the same to your visitors, simply weighs less. Multiply that across every asset on a page and the cumulative download savings are substantial.',
      ],
    },
    {
      heading: 'Transparency comes along for the ride',
      paragraphs: [
        'A frequent worry when moving away from PNG is losing transparency. With WebP, that worry is unfounded — WebP fully supports an alpha channel. Transparent logos, icons, and cut-out graphics convert cleanly, with no background fill and no jagged edges.',
        'This is what makes WebP a genuine drop-in replacement for PNG on the web, rather than a compromise. You keep the transparency that made you choose PNG in the first place, and you shed a big chunk of the file size.',
        'For UI assets and brand graphics specifically, this combination is ideal: crisp edges, intact transparency, and a fraction of the bytes. There is rarely a reason to keep those as heavy PNGs once you have confirmed your audience\'s browsers support WebP — and today, almost all of them do.',
      ],
    },
    {
      heading: 'Browser support and when to keep a fallback',
      paragraphs: [
        'WebP is supported by every current major browser: Chrome, Edge, Firefox, Opera, and Safari from version 14 onward. For the overwhelming majority of real-world visitors, you can serve WebP and it will simply work. The days of WebP being a risky, Chrome-only format are long gone.',
        'The only audience to think about is people on very old browsers or unusual environments. If you must support those, the standard pattern is the HTML <picture> element with a PNG fallback, so modern browsers get the light WebP and ancient ones still see an image. For most projects, even that is overkill now.',
        'There are also non-web contexts where WebP is not welcome — some older desktop editors, certain print pipelines, and a few email clients. WebP shines for the web and modern apps; for those legacy destinations, stick with PNG or JPG.',
      ],
    },
    {
      heading: 'Batch optimizing a whole asset folder',
      paragraphs: [
        'Optimizing one image is nice; optimizing an entire project\'s worth at once is where the time savings show up. Drop in up to twenty PNGs per batch and download them all as a single ZIP, then drop the WebP versions into your project. For a typical site with dozens of graphics, this turns image optimization from a chore into a couple of minutes of work.',
        'Because the conversion is lossless-capable and transparency-aware, you can batch confidently without manually checking each file for ruined edges or lost alpha. The output preserves what matters and trims what does not.',
        'Pair this with proper width and height attributes and lazy loading in your markup, and converting PNGs to WebP becomes a foundational step in a fast, modern image pipeline.',
      ],
    },
    {
      heading: 'Private, in-browser, no upload',
      paragraphs: [
        'Even site assets can be confidential before launch — unreleased designs, client work, draft graphics. Uploading them to a conversion service means exposing them to a third-party server. FileConvertir keeps everything local: each PNG is decoded and re-encoded as WebP inside your browser, using your device\'s own encoder, with no upload and no server-side storage.',
        'You can confirm there is no network transfer in the browser\'s developer tools. That local design also removes signup walls, daily quotas, and watermarks — you convert as much as you need, whenever you need to.',
        'The per-file limit is 100MB, far above typical web graphics, and the first conversion of a session just needs a moment to initialize the encoder. After that, batches process fast and never leave your machine until you save them.',
      ],
    },
  ];
}

function jpgToPng(): ArticleSection[] {
  return [
    {
      heading: 'The myth: converting to PNG does not restore quality',
      paragraphs: [
        'The most common reason people convert JPG to PNG is a misunderstanding worth clearing up first. PNG will not repair a JPG. It is a lossless format, which means it preserves whatever you give it exactly — including every compression artifact, every bit of blockiness, and every smudge the JPG already baked in. There is no detail hidden in a JPG waiting to be recovered; what was discarded during JPG compression is gone.',
        'So if your JPG looks soft or blocky, the PNG you make from it will look exactly as soft or blocky, just in a bigger file. Conversion is not restoration. Understanding this saves disappointment and points you toward the real, legitimate reasons to convert.',
        'Those reasons are about what happens next to the image, not about fixing what already happened to it.',
      ],
    },
    {
      heading: 'The real reason #1: stop the bleeding during editing',
      paragraphs: [
        'JPG loses a little quality every single time you save it. Open a JPG, make an edit, save, edit again, save again — each cycle re-compresses the whole image and adds fresh artifacts. This "generational loss" is why a photo that has been passed around and re-saved many times looks progressively worse.',
        'Converting to PNG before you start editing breaks that cycle. PNG is lossless, so you can edit, save, edit, and save as many times as you like with no further degradation. The image is frozen at its current quality and stays there through your whole workflow.',
        'For any multi-step editing job — retouching, annotating, compositing, repeated cropping — converting the JPG to PNG up front is the disciplined move. You accept the quality you have now and guarantee you will not lose more.',
      ],
    },
    {
      heading: 'The real reason #2: you need transparency',
      paragraphs: [
        'JPG has no alpha channel, so it cannot hold transparency. If your plan is to cut out a subject, remove a background, or composite the image over something else, you need a format that supports transparency — and PNG is the standard choice.',
        'Converting JPG to PNG does not magically create a transparent background; the image looks identical right after conversion. What it does is give you a canvas that can hold transparency once you erase or mask areas in an editor. Without that, your eraser would just paint white.',
        'So the workflow is: convert to PNG, then remove the background in your tool of choice. The PNG format is the enabler, not the eraser. This is the legitimate path to a transparent logo, sticker, or product cut-out that started life as a JPG.',
      ],
    },
    {
      heading: 'Expect a bigger file, and know why',
      paragraphs: [
        'A PNG made from a photographic JPG will usually be several times larger than the original. JPG\'s entire purpose is aggressive, eye-tuned compression; PNG\'s purpose is exact, lossless storage. When you convert, you are swapping a small lossy file for a large lossless one.',
        'For a working copy you will edit and then re-export, that temporary size is a non-issue. For final delivery or web use, you generally would not keep the photographic image as PNG — you would export back to JPG or WebP once editing is done.',
        'There is no quality setting to tweak, because PNG is always lossless. The size you get is simply what it takes to store the image without loss.',
      ],
    },
    {
      heading: 'Where PNG genuinely shines over JPG',
      paragraphs: [
        'Even though PNG cannot fix a photographic JPG, there are images where PNG is plainly the better home. Anything with sharp text, line art, screenshots, charts, or flat areas of color compresses well as PNG and stays perfectly crisp, while JPG would add halos and banding around the edges.',
        'If your JPG is actually a screenshot or a graphic that was unfortunately saved as JPG, converting to PNG is sensible going forward — not because it repairs past damage, but because PNG is the right format for that kind of content from now on, especially if you will edit it.',
        'Match the format to the content: photos for sharing belong in JPG or WebP; graphics, text, and edit-in-progress images belong in PNG.',
      ],
    },
    {
      heading: 'Private conversion and batch handling',
      paragraphs: [
        'JPGs are often personal photos, so it matters that conversion does not hand them to a stranger\'s server. FileConvertir converts entirely in your browser — the JPG is decoded and the PNG is written on your own device using WebAssembly and your browser\'s encoder. Nothing uploads, nothing is stored remotely, and you can verify the absence of network traffic in developer tools.',
        'If you are preparing a set of images for an editing project, batch them: drop up to twenty JPGs at once and download the PNGs as a single ZIP. There is no account to create, no quota, and no watermark on the output.',
        'The per-file limit is a generous 100MB, more than enough for high-resolution photos. The first conversion of a session takes a brief moment to initialize, and from there the process is quick and stays on your machine until you save.',
      ],
    },
  ];
}

function gifToPng(): ArticleSection[] {
  return [
    {
      heading: 'GIF\'s biggest limitation: only 256 colors',
      paragraphs: [
        'GIF is one of the oldest image formats still in everyday use, and it carries an old constraint: each frame can contain at most 256 distinct colors. For simple logos, icons, and flat graphics that is fine, but for photographs, gradients, or anything with subtle color transitions it falls apart. The format approximates missing colors with dithering — scattered dots that simulate shades it cannot store directly — which produces visible speckling and banding.',
        'PNG removes that ceiling entirely. It supports millions of colors and full lossless storage, so gradients render smoothly and photographic content keeps its true tones. Converting a color-starved GIF to PNG gives the image room to breathe.',
        'If your GIF was always a flat two- or three-color graphic, the visual difference will be small, but you still gain a more flexible, editable format. If the GIF was straining to represent a rich image, the upgrade is obvious.',
      ],
    },
    {
      heading: 'What happens to animation',
      paragraphs: [
        'GIF is famous for animation, and this is the one thing PNG cannot replicate in the same file. PNG is a single-frame, static image format. When you convert an animated GIF to PNG, you get one still frame, not the moving sequence. That is by design, not a flaw.',
        'If your goal is to keep the motion, PNG is the wrong target. Convert the animated GIF to a video format like MP4 or WebM, which are far more efficient for motion and play smoothly everywhere. There are also animated formats like APNG and animated WebP, but for sharing motion, a small MP4 is usually the most practical choice.',
        'Reach for GIF-to-PNG when you specifically want a still image — a single representative frame, or a static graphic that happened to be saved as a GIF.',
      ],
    },
    {
      heading: 'Better, smoother transparency',
      paragraphs: [
        'GIF supports transparency, but only in the crudest possible way: each pixel is either fully opaque or fully transparent, with nothing in between. That binary transparency produces hard, jagged edges, especially noticeable on curved or diagonal outlines, and it cannot blend smoothly against different backgrounds.',
        'PNG\'s alpha channel supports 256 levels of transparency, enabling smooth, anti-aliased edges that look clean on any background. When you convert a GIF to PNG, the existing transparency carries over, and any future edits can take advantage of PNG\'s far superior alpha handling.',
        'There is an honest limit: conversion cannot invent smoothness the GIF never had. If the source GIF already has jagged 1-bit edges, those jagged edges come across in the PNG. But from that point on, you are working in a format that can do transparency properly.',
      ],
    },
    {
      heading: 'Lossless quality and cleaner editing',
      paragraphs: [
        'PNG is lossless, so once a GIF frame becomes a PNG it can be edited and re-saved repeatedly without accumulating compression damage. GIF\'s palette quantization and dithering, by contrast, are baked in and get messier the more you manipulate the image.',
        'For anyone working with the graphic — recoloring a logo, cleaning up an icon, placing it into a design — PNG is simply the more cooperative format. Selections are cleaner, colors are exact, and there is no dithering noise to fight.',
        'This makes GIF-to-PNG a natural first step when you have inherited old GIF assets and need to actually do something with them rather than just display them.',
      ],
    },
    {
      heading: 'File size: it depends on the image',
      paragraphs: [
        'Whether the PNG is larger or smaller than the GIF depends entirely on the content. For a simple flat graphic with few colors, the PNG can be similar in size or even smaller, since PNG compresses flat regions efficiently. For a complex or photographic image that the GIF was crudely approximating, the PNG will be larger because it stores full color losslessly.',
        'That size increase, when it happens, comes with a real quality gain — no dithering, full color, smooth transparency. It is the cost of upgrading from a constrained format to a capable one.',
        'If minimal size is your priority for a photographic image, JPG or WebP would be smaller still, but neither matches PNG for lossless graphics with transparency. Choose based on what the image is and where it is going.',
      ],
    },
    {
      heading: 'Local, private, batch-friendly conversion',
      paragraphs: [
        'Whatever the GIF contains, the conversion happens entirely in your browser. The GIF is decoded and the PNG is written on your own device using WebAssembly, with no upload to any server and nothing stored remotely. You can confirm there is no network activity in your browser\'s developer tools.',
        'If you have a collection of GIF graphics to modernize, batch them: drop up to twenty at once and download the PNGs as a single ZIP. There is no signup, no quota, and no watermark on the results.',
        'The per-file limit is 100MB, well beyond the size of typical GIFs, and the first conversion in a session takes a brief moment to initialize. After that, batches convert quickly and stay on your machine until you save them.',
      ],
    },
  ];
}

function bmpToJpg(): ArticleSection[] {
  return [
    {
      heading: 'The problem with BMP: enormous, uncompressed, and unloved',
      paragraphs: [
        'BMP, the Windows bitmap format, is a relic from an era when storage was small but compression was expensive. Its defining trait is that it is typically uncompressed — it records the full color value of every single pixel with no attempt to save space. The result is files of staggering size: a single 4000×3000 image can exceed 35 megabytes, where the same picture as a JPG would be a couple of megabytes at most.',
        'On top of the size problem, BMP is poorly supported in the modern world. Most websites, web forms, social platforms, and many email clients simply do not accept it. Mobile apps often ignore it. It lingers mainly because some older Windows software, utilities, and scanners still spit it out.',
        'Converting BMP to JPG solves both issues at once: a massive reduction in size and a format that opens absolutely everywhere. There is rarely a good reason to hold onto a BMP once you have a JPG copy.',
      ],
    },
    {
      heading: 'Just how dramatic the shrink is',
      paragraphs: [
        'Because BMP stores everything raw and JPG compresses aggressively, the size reduction is often staggering — typically 90 to 98 percent. A 30MB BMP routinely becomes a 1–3MB JPG, and a heavy archive of bitmaps can collapse from gigabytes to a manageable folder.',
        'That reduction is not just about saving disk space. Smaller files email instantly, upload without hitting limits, and load quickly on the web. If you have been wrestling with BMP attachments that bounce off size caps, converting to JPG makes the problem vanish.',
        'The compression that achieves this is tuned to human vision, discarding detail you are unlikely to perceive. For photographic content, the visible quality difference at a high JPG setting is essentially nil despite the enormous size cut.',
      ],
    },
    {
      heading: 'Quality: what you keep and what you give up',
      paragraphs: [
        'JPG is a lossy format, so converting from a pristine, uncompressed BMP does involve discarding some data. The honest framing is that at a high quality level like 92, that loss is invisible for photographs — you would not be able to tell the JPG from the original BMP without measuring it pixel by pixel.',
        'The exception, as always with JPG, is content built from hard edges: fine text, thin lines, crisp logos, screenshots. There JPG can introduce faint halos or ringing. If your BMP is that kind of graphic and sharpness matters, convert to PNG instead, which is lossless and keeps edges perfectly clean while still being far smaller than BMP.',
        'For ordinary images and photos, though, JPG is the clear winner: a tiny, imperceptible quality cost in exchange for a file that is a fraction of the size and works everywhere.',
      ],
    },
    {
      heading: 'No transparency to worry about',
      paragraphs: [
        'Standard BMP files do not store transparency — there is no alpha channel in the common bitmap formats most software produces. That actually simplifies the conversion to JPG, because JPG also has no transparency, so nothing is lost in that regard. The image converts straight across with no background-fill surprises.',
        'If you happen to have an unusual BMP variant or a related image that does carry an alpha channel and you need to preserve it, JPG is the wrong target — choose PNG, which supports transparency. But for the vast majority of real-world BMP files, this is not a concern at all.',
        'In short, for typical opaque bitmaps, JPG is a clean, straightforward destination with no transparency caveats to manage.',
      ],
    },
    {
      heading: 'Where BMP files come from, and clearing them out',
      paragraphs: [
        'You will most often encounter BMP files from older Windows applications, legacy scanning software, certain industrial or scientific tools, screen-capture utilities set to bitmap output, and old archives. They were everywhere in the Windows 95 through XP era and still surface in workflows that have not been modernized.',
        'If you have inherited a folder of BMPs — an old photo archive, exported screenshots, or scanned material — converting the whole lot to JPG reclaims a remarkable amount of storage and makes the images usable in modern tools. Batch up to twenty at a time and download them as a single ZIP to make short work of it.',
        'Keep the originals only if you have a specific archival reason; otherwise the JPG copies are smaller, more compatible, and visually indistinguishable for photographic content.',
      ],
    },
    {
      heading: 'Converting privately in your browser',
      paragraphs: [
        'Because the conversion runs entirely in your browser, your bitmaps never leave your device. The BMP is decoded and the JPG is encoded locally using your browser\'s own image engine — there is no upload, no server-side storage, and nothing logged. You can verify the absence of any file transfer in the browser\'s developer tools.',
        'That local approach means no signup, no daily limits, and no watermark, so you can convert a single legacy file or an entire archive without restrictions. It is especially reassuring if the bitmaps contain anything private, such as scanned documents or screenshots.',
        'The per-file limit is 100MB, which comfortably accommodates even very large uncompressed bitmaps. The first conversion of a session warms up the encoder briefly; after that, batches process quickly and remain on your machine until you save them.',
      ],
    },
  ];
}

function pngToTiff(): ArticleSection[] {
  return [
    {
      heading: 'When a print shop or archive insists on TIFF',
      paragraphs: [
        'Most of the time PNG is a perfectly good image format, so it can be puzzling when a print shop, publisher, or document archive turns down your PNG and asks for a TIFF instead. The request is not arbitrary. TIFF has been the trusted standard in professional print and long-term archival for decades, and entire production pipelines are built around it. If your only file is a PNG, converting to TIFF is how you meet that requirement without starting over.',
        'The good news is that this is one of the safest conversions you can do. Both PNG and TIFF are lossless, so moving from one to the other changes the container, not the image. Every pixel is preserved exactly, with no compression artifacts and no quality loss.',
        'So when a specification or a vendor calls for TIFF, you can satisfy it confidently from a PNG source, knowing the visual result is identical.',
      ],
    },
    {
      heading: 'Why print and prepress prefer TIFF',
      paragraphs: [
        'Print professionals favor TIFF for several concrete reasons. It is reliably lossless, so nothing is degraded between your file and the press. It supports high bit depths and color models that matter in professional color workflows. It embeds dependably in layout and prepress software like InDesign and traditional RIP systems. And it has a long, stable track record that print operators trust implicitly.',
        'PNG, while also lossless, grew up as a web format. It is excellent for screens but was never designed around print production, color separation, or the specific features prepress operators rely on. That history is why many shops standardize on TIFF for incoming artwork even though PNG could technically hold the same pixels.',
        'Understanding this helps you anticipate the requirement rather than fight it: when the destination is paper produced professionally, TIFF is simply the expected currency.',
      ],
    },
    {
      heading: 'Lossless compression keeps quality intact',
      paragraphs: [
        'A common worry is that converting to a "print" format means heavy, unwieldy files. TIFF supports lossless compression schemes such as LZW, which shrink the file without altering a single pixel. You get the archival fidelity of TIFF with a more reasonable size than fully uncompressed bitmap storage.',
        'Crucially, this compression is lossless, so it differs entirely from JPG\'s lossy approach. There are no artifacts, no generational degradation, and no quality compromise — just an efficient way to store the exact same image data.',
        'That said, even compressed, TIFF files are generally larger than the equivalent PNG, because the format stores data in a way optimized for fidelity and print rather than for minimal web size. That larger footprint is expected and is the whole point of an archival, print-oriented format.',
      ],
    },
    {
      heading: 'Transparency and how print workflows handle it',
      paragraphs: [
        'TIFF can store an alpha channel, so transparency from your PNG can be carried into the TIFF. However, print workflows treat transparency in their own ways — some expect artwork to be flattened against a background, others handle alpha through the layout application rather than the image file. Before relying on a transparent TIFF, it is worth a quick word with your print shop about how they want transparency delivered.',
        'For purely on-screen or archival use, keeping the alpha channel is usually fine and convenient. For print specifically, the safest path is to confirm the shop\'s preference and, if needed, flatten the image onto the intended background color first.',
        'Either way, the conversion itself preserves what the PNG contains; how that transparency is ultimately used is a workflow decision on the receiving end.',
      ],
    },
    {
      heading: 'Archival: future-proofing your images',
      paragraphs: [
        'Beyond active print jobs, TIFF is a popular choice for long-term archival precisely because it is lossless, widely documented, and broadly supported by professional and library-grade systems. Institutions that need images to remain faithful and openable decades from now often standardize on TIFF as a preservation master.',
        'If you are building your own archive of important images and want a format that prioritizes fidelity and longevity over compactness, converting your PNGs to TIFF gives you durable, lossless masters. You can always derive smaller JPG or WebP copies later for everyday sharing while keeping the TIFFs as the canonical originals.',
        'This master-plus-derivatives approach mirrors how professionals manage important imagery: preserve a pristine lossless original, generate lighter copies as needed.',
      ],
    },
    {
      heading: 'Converting privately, with batch support',
      paragraphs: [
        'Print and archival images can be confidential — unreleased designs, client artwork, or sensitive documents headed for production. FileConvertir converts PNG to TIFF entirely within your browser, so those files never touch a server. The PNG is decoded and the TIFF is written on your own device using WebAssembly, with no upload and nothing stored remotely, which you can verify in the browser\'s developer tools.',
        'If you have a set of images to prepare for a print job or archive, batch them: drop up to twenty PNGs at once and download the TIFFs as a single ZIP. There is no signup, no quota, and no watermark, so the workflow stays clean and unrestricted.',
        'The per-file limit is 100MB, ample for high-resolution print images, and the first conversion of a session just needs a brief moment to initialize. After that, your files convert quickly and remain on your machine until you choose to save them.',
      ],
    },
  ];
}
