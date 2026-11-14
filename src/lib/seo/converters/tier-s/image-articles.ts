import type { ArticleSection } from '../../types';

export const IMAGE_S_ARTICLES: Record<string, ArticleSection[]> = {
  'webp-to-png': [
    {
      heading: 'When you actually need PNG instead of WebP',
      paragraphs: [
        'WebP is a great web format, but it hits walls the moment you step outside the browser. Older versions of Photoshop, many email clients, PowerPoint, some Android OEM galleries, and a surprising number of upload forms still refuse WebP. PNG, on the other hand, is understood by essentially every image program ever written.',
        'The reason people specifically pick PNG over JPG here is transparency. WebP supports an alpha channel, and so does PNG — but JPG does not. If your WebP has a transparent background (a logo, an icon, a sticker, a cut-out product shot), converting to PNG keeps that transparency intact, while converting to JPG would flatten it onto a solid colour.',
      ],
    },
    {
      heading: 'Lossless in, lossless out',
      paragraphs: [
        'PNG is a lossless format: it stores every pixel exactly, with no compression artefacts. When your WebP source is itself lossless (which is common for graphics, screenshots, and logos), converting to PNG is a true round-trip — the output is pixel-identical to the source.',
        'If the WebP was saved in its lossy mode (typical for photographs), the artefacts already baked into it carry over, but PNG won\'t add any new ones. Either way, PNG is the format you choose when you cannot afford further quality loss — for editing masters, archival copies, or graphics with crisp edges and text.',
      ],
    },
    {
      heading: 'Transparency: the alpha channel explained',
      paragraphs: [
        'An alpha channel records, for every pixel, how see-through it is. This is what lets a logo sit on any coloured background without an ugly white box around it. WebP and PNG both carry full 8-bit alpha, so the conversion preserves smooth, anti-aliased edges rather than the jagged 1-bit transparency you got from ancient GIFs.',
        'This is precisely why converting a transparent WebP to PNG (not JPG) is the right move when you\'re building UI assets, overlaying watermarks, or dropping a graphic into a design that has a coloured or patterned background.',
      ],
    },
    {
      heading: 'The trade-off: file size',
      paragraphs: [
        'Be ready for bigger files. PNG\'s lossless compression simply cannot match WebP\'s efficiency, so a PNG is often two to four times larger than the WebP it came from, and far larger than an equivalent JPG photo.',
        'That\'s an acceptable cost when you need compatibility or transparency, but it\'s the wrong direction if your goal is a fast-loading website. If you\'re optimising page speed, keep WebP for the web and only generate PNG copies for the specific tools or recipients that need them.',
      ],
    },
    {
      heading: 'PNG vs JPG: choosing the right target',
      paragraphs: [
        'Use this simple rule. If the image has transparency, or is a logo, screenshot, diagram, or anything with sharp text and flat colour, choose PNG — it stays crisp and keeps the alpha channel. If it\'s a photograph with no transparency and you care about file size, JPG is usually the smarter target.',
        'Converting a photographic WebP to PNG works fine, but you\'ll get a much larger file for no visible benefit. Match the format to the content, not just the habit.',
      ],
    },
    {
      heading: 'Everything stays in your browser',
      paragraphs: [
        'FileConvertir decodes WebP and writes PNG using your browser\'s built-in image engine, so nothing is uploaded. That\'s reassuring when the graphic is an unreleased product render, a confidential design comp, or a client logo under NDA.',
        'It also means the tool works the same everywhere. Drop up to 20 WebP files at once, let them convert in parallel, and download them individually or as one ZIP — no account, no watermark, no size gymnastics.',
      ],
    },
    {
      heading: 'Why renaming the file won\'t work',
      paragraphs: [
        'A tempting shortcut is to rename "image.webp" to "image.png" and hope the program accepts it. It won\'t, at least not reliably. The file extension is only a label; the bytes inside are still WebP-encoded, so a strict reader will either refuse the file or display a broken image where your graphic should be.',
        'A genuine conversion decodes the WebP pixel data and re-encodes it inside the PNG container, producing a file that is PNG all the way through. That is why dropping the file into a real converter, rather than fiddling with the extension, is the dependable route to something other software will actually open.',
        'It also explains why this matters so much for compatibility-sensitive tools: the program reads the file\'s structure, not its name. Hand it a true PNG and it works; hand it a renamed WebP and you are back to square one.',
      ],
    },
  ],

  'webp-to-jpg': [
    {
      heading: 'Why Office and email keep rejecting your WebP',
      paragraphs: [
        'You save an image from a website, it lands as a .webp, and then Word won\'t insert it, Outlook mangles the attachment, and the job portal says "unsupported file type." WebP is built for browsers, not for the wider ecosystem of office software, email clients, and upload forms — and that mismatch is the number-one reason to convert it to JPG.',
        'JPG is the lingua franca of digital photos. It works in every version of Office, every email client, every social platform, every printer driver, and every content management system. When you need an image to "just work" for someone else, JPG removes the friction WebP introduces.',
      ],
    },
    {
      heading: 'JPG is built for photographs',
      paragraphs: [
        'JPG\'s compression was designed specifically for continuous-tone images — photos, with their smooth gradients and subtle colour shifts. For that content it produces small files that look excellent, which is exactly why it has dominated photography for three decades.',
        'If your WebP is a photo (a product shot, a headshot, a landscape), JPG is the natural target: compact, universally readable, and visually faithful. Where JPG struggles is sharp-edged graphics and text, where its blocky artefacts become visible — for that kind of image, PNG is the better choice.',
      ],
    },
    {
      heading: 'What happens to transparency',
      paragraphs: [
        'Here\'s the honest catch: JPG has no transparency. If your WebP has a transparent background, converting to JPG flattens that alpha channel onto a solid background (typically white). For a photo this is irrelevant, but for a logo or cut-out it means you\'ll get a rectangle of background colour where the transparency used to be.',
        'If you need the transparency preserved, convert to PNG instead. Reach for JPG only when the image is a full-frame photo or you genuinely want a solid background.',
      ],
    },
    {
      heading: 'Quality and the lossy-to-lossy reality',
      paragraphs: [
        'Most WebP files saved from the web use lossy compression, and JPG is also lossy, so you\'re doing a lossy-to-lossy conversion. FileConvertir encodes JPG at quality 92, which keeps the result visually indistinguishable from the source for normal viewing.',
        'The practical advice is the same as with any lossy format: convert once and keep the result, rather than repeatedly re-saving the same image, since each round of compression discards a little more detail. One clean conversion from the original WebP is all you need.',
      ],
    },
    {
      heading: 'File size: a happy side effect',
      paragraphs: [
        'Unlike converting to PNG, going from WebP to JPG usually keeps files small. JPG is far more space-efficient than PNG, so your converted photos stay easy to email and quick to upload — sometimes even close to the WebP size for photographic content.',
        'That makes WebP-to-JPG a comfortable choice when you need both broad compatibility and a modest file size, the two things that matter most for sharing photos by email or attaching them to a form.',
      ],
    },
    {
      heading: 'Private, batchable, and cross-platform',
      paragraphs: [
        'Conversion runs entirely in your browser via the native image decoder, so your images are never uploaded — useful when the file is a personal photo or a confidential document scan you downloaded as WebP.',
        'Drop up to 20 WebP files at a time and download the JPGs individually or as a single ZIP. It works identically on Windows, Mac, Android, and iOS, with no signup, no quota, and no watermark.',
      ],
    },
    {
      heading: 'Where WebP came from and why it keeps tripping people up',
      paragraphs: [
        'Google introduced WebP in 2010 to make web pages lighter, and over the years browsers, CDNs, and image plugins started serving it automatically. The result is that you often end up with a WebP without ever choosing it — you right-click a picture, save it, and discover later that it won\'t open in the tool you need.',
        'That silent adoption is exactly why WebP-to-JPG is such a common rescue operation. The format is everywhere on the web but still patchy outside the browser, so the moment you try to use the image in a desktop app, an email, or an upload form, the gap shows.',
        'Converting to JPG resets the file to the format the rest of the world has agreed on for photos. You lose nothing meaningful for a photograph, and you gain the certainty that whoever you send it to can open it without installing anything or updating their software.',
      ],
    },
  ],

  'avif-to-jpg': [
    {
      heading: 'AVIF is the future — but the present is JPG',
      paragraphs: [
        'AVIF produces stunningly small files thanks to the AV1 video codec, which is why Netflix, Google, and Cloudflare have embraced it for the web. The problem is that the rest of the software world hasn\'t caught up. Open an .avif in an older Photoshop, drop it into Word, attach it to an email, or upload it to a form, and you\'ll frequently hit "unsupported format."',
        'Converting to JPG is the pragmatic bridge. You keep the picture and gain compatibility with every tool that hasn\'t yet learned to read AV1-based images. It\'s the same pattern the web went through with WebP a few years earlier — the new format is great until you need to hand the file to something old.',
      ],
    },
    {
      heading: 'The AV1 codec, in plain terms',
      paragraphs: [
        'AVIF wraps still images in the AV1 codec, a royalty-free video compression standard. Because video codecs are extraordinarily good at squeezing data, a single AVIF frame can be a fraction of the size of an equivalent JPG or even WebP at similar quality.',
        'That efficiency is also why AVIF is computationally heavier to decode, and why support arrived gradually: Chrome added it around version 85, Firefox around 93, and Safari in version 16. Anything older, or any app that relies on the operating system\'s image decoders, may simply not recognise the file. JPG sidesteps all of that.',
      ],
    },
    {
      heading: 'The Photoshop and legacy-software gap',
      paragraphs: [
        'Photoshop only gained native AVIF support in its 2024 (25.x) releases; earlier versions need a plugin or can\'t open the file at all. Lightroom, GIMP builds, many RAW editors, and countless smaller utilities are in the same boat.',
        'If your workflow runs through any of those tools, converting AVIF to JPG up front saves you from fighting plugins and version requirements. You get a file your editor opens instantly, edits cleanly, and exports without complaint.',
      ],
    },
    {
      heading: 'Expect a larger file — that\'s the trade',
      paragraphs: [
        'Because AVIF is so efficient, the JPG you get back will typically be three to five times larger than the original. This isn\'t a flaw in the conversion; it\'s the cost of moving to a less advanced but universally supported codec.',
        'If file size is critical and you control where the image ends up, it can be worth keeping AVIF for the web and only generating JPGs for the specific legacy destinations that need them. For one-off sharing and editing, the size increase rarely matters.',
      ],
    },
    {
      heading: 'How much quality will you lose?',
      paragraphs: [
        'AVIF and JPG are both lossy, so re-encoding costs a generation of compression. FileConvertir outputs JPG at quality 92, which looks identical to the source for photographs. The places you might notice a difference are hard edges, fine text, and flat graphic areas, where JPG\'s block-based compression is weaker than AVIF\'s.',
        'For those graphic-heavy images, PNG is the better target. For ordinary photos, JPG at high quality is an excellent, compatible result.',
      ],
    },
    {
      heading: 'Local conversion using your browser\'s AVIF decoder',
      paragraphs: [
        'FileConvertir uses your browser\'s built-in AVIF decoder to read the file and re-encodes JPG entirely on your device. Nothing uploads, which keeps web-downloaded assets, product renders, and personal photos private.',
        'Convert up to 20 AVIF files per batch and download them as individual JPGs or one ZIP. Make sure you\'re on a current browser (Chrome 85+, Firefox 93+, or Safari 16+) so the AVIF decoder is available, and you\'re set — no install, no signup, no limits.',
      ],
    },
    {
      heading: 'AVIF vs WebP vs JPG: how the sizes stack up',
      paragraphs: [
        'It helps to picture where AVIF sits among the formats you\'ll meet. For the same perceived quality, AVIF is usually the smallest, WebP comes next, and JPG is the largest of the three. That ordering is why a site might serve AVIF to save bandwidth, and why your JPG copy balloons when you convert back.',
        'The practical takeaway is to convert with intent. If the JPG is for a one-time edit or to email a single picture, the larger size is irrelevant. If you\'re handling hundreds of images for a website, you generally want to keep the AVIF originals and only spin off JPGs for the specific places that demand them.',
        'None of this means JPG is "worse" — it means JPG is older and simpler, which is precisely what makes it universally readable. You\'re choosing compatibility over compression, and for most everyday tasks that\'s the right trade.',
      ],
    },
  ],

  'avif-to-png': [
    {
      heading: 'Why convert AVIF to PNG instead of JPG',
      paragraphs: [
        'There are two reasons to choose PNG as your target when converting an AVIF: transparency and losslessness. AVIF can store an alpha channel and can encode images losslessly, and JPG can do neither. If your AVIF has a transparent background or you need a pixel-perfect copy, PNG is the only sensible destination.',
        'This makes AVIF-to-PNG the right pick for logos, icons, UI assets, diagrams, and any graphic with crisp edges or flat colour that you intend to edit further. JPG would flatten the transparency and soften the edges; PNG keeps both intact.',
      ],
    },
    {
      heading: 'Preserving the alpha channel',
      paragraphs: [
        'AVIF\'s alpha support means a single file can hold both a high-efficiency image and full transparency information. When you convert to PNG, that alpha channel is carried over at full 8-bit precision, so smooth, anti-aliased edges stay smooth.',
        'That matters whenever the image will sit on top of something — a coloured website section, a patterned slide, a photo composite. Convert to JPG and you\'d bake in a white rectangle; convert to PNG and the graphic floats cleanly over any background.',
      ],
    },
    {
      heading: 'Lossless means truly lossless',
      paragraphs: [
        'PNG stores every pixel exactly. If your AVIF was encoded losslessly, the PNG is an exact reproduction with zero new artefacts. Even if the AVIF was lossy, PNG won\'t degrade it further — it simply captures the decoded result faithfully.',
        'That makes PNG the format of choice for editing masters and archival copies, where you want a known-good, artefact-free base to work from rather than a file that loses a little more each time it\'s saved.',
      ],
    },
    {
      heading: 'The size trade-off is real',
      paragraphs: [
        'AVIF is one of the most space-efficient formats in existence, and PNG is one of the least. Expect the PNG to be dramatically larger — often many times the AVIF size, especially for photographic content.',
        'For graphics with transparency and limited colours, the increase is usually tolerable. For full photographs you don\'t need to edit, ask yourself whether you actually need PNG; if transparency and losslessness aren\'t requirements, JPG will give you a much smaller file.',
      ],
    },
    {
      heading: 'Where AVIF-to-PNG shines',
      paragraphs: [
        'Designers downloading AVIF assets from a modern web build, developers extracting transparent icons, and anyone preparing a graphic for a tool that can\'t read AV1 all benefit from this conversion. PNG drops straight into Photoshop, Figma imports, Office, and every email client without a fuss.',
        'It\'s also the safe move when you\'re not sure what the recipient\'s software supports — PNG\'s near-universal compatibility plus its lossless transparency make it a reliable hand-off format.',
      ],
    },
    {
      heading: 'No upload, full privacy',
      paragraphs: [
        'The conversion happens in your browser using its native AVIF decoder, so your files never touch a server. That\'s important for unreleased designs, client assets under NDA, or any image you\'d rather not hand to a third-party cloud service.',
        'Batch up to 20 AVIF files, convert in parallel, and download individually or as a ZIP. Use a current browser with AVIF support (Chrome 85+, Firefox 93+, Safari 16+) and there\'s nothing to install, no account, and no limit.',
      ],
    },
    {
      heading: 'Checking that your browser can read AVIF',
      paragraphs: [
        'Because AVIF support arrived only recently, the one prerequisite for this conversion is a browser that can actually decode the format. Chrome from version 85, Firefox from 93, and Safari from 16 all read AVIF; anything older may not, and the conversion relies on that built-in decoder to read your file in the first place.',
        'If a file refuses to load, the quickest fix is to update your browser or try a different modern one. You don\'t need any plugin or extension — current browsers ship AVIF decoding as standard — but a years-old build simply won\'t recognise the bytes.',
        'Once the file decodes, the rest is straightforward: the pixels, including the alpha channel, are written into a lossless PNG on your device. The transparency and detail you saw in the AVIF carry straight through to the PNG without a round trip to any server.',
        'On mobile this is worth checking too: AVIF reads in Safari on iOS 16 and later and in Chrome on recent Android, so a phone from the last few years will handle the conversion fine. If you\'re on an older device that can\'t decode the file, doing the conversion on a desktop browser is the simplest fallback.',
      ],
    },
  ],

  'svg-to-png': [
    {
      heading: 'From vector to raster: what really changes',
      paragraphs: [
        'An SVG isn\'t a grid of pixels — it\'s a set of instructions: draw a circle here, fill this path with that colour, place this text in this font. That\'s why it scales infinitely without blurring. A PNG is the opposite: a fixed grid of pixels at a specific resolution. Converting SVG to PNG "renders" those instructions into actual pixels.',
        'You do this whenever the destination can\'t read SVG or won\'t render it reliably. Email clients strip SVG for security reasons, most social platforms reject it, app icon pipelines demand PNG, and many older tools simply don\'t understand vectors. Rasterising to PNG turns your scalable artwork into a file those places will accept.',
      ],
    },
    {
      heading: 'Choosing the right resolution',
      paragraphs: [
        'Because the SVG has no inherent pixel size, the most important decision when converting is the output resolution. Render too small and the PNG looks soft when enlarged; render too large and you get a needlessly heavy file. Pick the dimensions for where the image will actually be used.',
        'A favicon might be 32×32 or 64×64. A social share image might be 1200×630. A logo for a slide deck might be 1000 pixels on its long edge. When in doubt, render at 2× the display size to look sharp on high-DPI "Retina" screens, then let the platform scale it down.',
      ],
    },
    {
      heading: 'Transparency survives the trip',
      paragraphs: [
        'SVGs frequently have transparent backgrounds, and PNG preserves that with its alpha channel. So a logo exported to PNG will still sit cleanly on any colour, rather than carrying a white box around it.',
        'If you specifically need a solid background — say, for a platform that requires one — you can flatten onto a colour, but the default PNG keeps the transparency that makes vector logos so flexible. This is a key reason to choose PNG over JPG, which can\'t hold transparency at all.',
      ],
    },
    {
      heading: 'Common real-world uses',
      paragraphs: [
        'Favicons are the classic case: browsers still love a PNG (or ICO) for the little tab icon, so designers keep the master as SVG and export PNG sizes. Email signatures need PNG because SVG won\'t render in Outlook or Gmail. Social media profile pictures and share cards must be raster. App stores and OS icon sets demand specific PNG dimensions.',
        'In each case the workflow is the same: design once in vector, then rasterise to the exact PNG sizes each channel requires. Keeping the SVG as the source means you can re-export crisp PNGs at any size later.',
      ],
    },
    {
      heading: 'When you should NOT rasterise',
      paragraphs: [
        'If the destination supports SVG — a modern website, an icon system, a design tool like Figma or Illustrator — keep the vector. Rasterising throws away scalability, so a PNG that looks crisp today will blur the moment someone needs it bigger.',
        'Convert to PNG for compatibility and hand-off, not as a default. Treat the SVG as the master you always come back to, and generate PNGs as disposable, purpose-built exports.',
      ],
    },
    {
      heading: 'Rendered in your browser, never uploaded',
      paragraphs: [
        'FileConvertir renders the SVG and writes the PNG using your browser\'s own rendering engine, so the file never leaves your device. That\'s useful for brand assets and client logos you can\'t risk leaking to a cloud service.',
        'Drop up to 20 SVGs at once and download the PNGs individually or as a ZIP. There\'s no signup, no watermark, and it works the same across Windows, Mac, Linux, Android, and iOS.',
      ],
    },
    {
      heading: 'Fonts and external assets: a quirk to watch',
      paragraphs: [
        'SVGs can reference fonts and, occasionally, external images. When an SVG uses a system font that isn\'t guaranteed to exist on every machine, the safest way to keep text looking exactly right is to convert the text to outlines (paths) in your design tool before rasterising. That way the letters become shapes and render identically regardless of installed fonts.',
        'This is worth knowing because text is the part of an SVG most likely to surprise you after conversion. A heading that looked perfect in your editor can shift to a fallback font if the original typeface isn\'t available at render time. Outlining the text removes that risk entirely.',
        'For logos and icons — which are mostly paths and shapes already — this rarely comes up, and the PNG you get is a faithful, pixel-locked snapshot of the artwork at the resolution you chose.',
      ],
    },
  ],

};
