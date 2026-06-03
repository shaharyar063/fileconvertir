import type { ArticleSection } from '../../types';

export const IMAGE_S_ARTICLES: Record<string, ArticleSection[]> = {
  'heic-to-jpg': [
    {
      heading: 'Why your iPhone photos won\'t open on Windows or Android',
      paragraphs: [
        'You AirDrop a photo to a friend with an Android phone, or copy your camera roll onto a Windows laptop, and suddenly the files have a .heic extension that nothing wants to open. This is the single most common reason people convert HEIC to JPG, and it isn\'t your fault — it\'s a compatibility gap baked into how Apple ships its cameras.',
        'Since iOS 11, iPhones save photos as HEIC by default because the format stores the same picture in roughly half the space of a JPG. The trade-off is reach: Windows 10 needs a paid HEIF extension from the Microsoft Store, most Android gallery apps ignore HEIC entirely, and plenty of websites, applicant tracking systems, and email clients silently reject the upload. JPG, by contrast, has been universally readable since the 1990s.',
        'Converting to JPG trades a little disk space for the guarantee that the photo opens everywhere — in a browser, in Word, on a Samsung phone, on a hotel print kiosk, or attached to an insurance claim. That universality is exactly why JPG remains the safe default for sharing.',
      ],
    },
    {
      heading: 'What HEIC actually is (and what HEIF means)',
      paragraphs: [
        'HEIC is a container — High Efficiency Image Container — that wraps image data compressed with the HEVC (H.265) codec. HEIF is the broader standard; HEIC is Apple\'s specific flavour of it. Inside a single .heic file there can be more than just one picture: Live Photos, depth maps, burst sequences, and editing metadata all ride along.',
        'That richness is part of why other platforms struggle with HEIC. A simple JPG decoder expects one image and nothing else. When a HEIC file carries auxiliary data, a non-Apple program either has to understand the whole container or give up. Converting to JPG flattens everything down to the single visible photo, which is usually exactly what you want when you\'re sharing or printing.',
      ],
    },
    {
      heading: 'Will converting to JPG lose quality?',
      paragraphs: [
        'Both HEIC and JPG are lossy formats, so re-encoding does involve a generation of compression. In practice the loss is invisible for normal viewing. FileConvertir decodes the HEIC at full resolution and re-encodes JPG at quality 92, a level that preserves fine detail, skin tones, and gradients without obvious artefacts.',
        'The one honest caveat is that you are converting lossy to lossy, so this isn\'t something to repeat over and over on the same image — each pass discards a little more data. Convert once from the HEIC original and keep that JPG, rather than converting, editing, re-saving, and converting again in a loop.',
        'If you need a pixel-perfect, edit-friendly copy, PNG is the lossless alternative — but for photos destined for email, web, or print, JPG\'s file size and compatibility make it the better pick almost every time.',
      ],
    },
    {
      heading: 'What happens to EXIF, dates, and location data',
      paragraphs: [
        'HEIC files carry EXIF metadata: the date the photo was taken, camera settings, and often GPS coordinates. When you convert, basic image information carries through, but FileConvertir strips some metadata during conversion as a privacy safeguard — you generally don\'t want your home\'s GPS coordinates embedded in a photo you post publicly.',
        'If you specifically need full EXIF preserved — for a professional archive, a legal timeline, or geotagged travel photos — a desktop tool with explicit metadata controls is the better choice. For everyday sharing, stripped metadata is a feature, not a bug.',
      ],
    },
    {
      heading: 'Converting an entire camera roll at once',
      paragraphs: [
        'Nobody wants to convert 300 vacation photos one tap at a time. Drop a whole batch — up to 20 files per pass — and FileConvertir processes them in parallel right in your browser, then offers every result as a single ZIP download. For a full export, run a few batches back to back.',
        'On a modern laptop this is fast because the work uses your own CPU and your browser\'s native image decoder rather than waiting in an upload queue on someone else\'s server. The first conversion may take a beat while the decoder spins up; after that it\'s near-instant per image.',
      ],
    },
    {
      heading: 'Why doing this in your browser keeps photos private',
      paragraphs: [
        'Most "free HEIC to JPG" sites upload your photos to their servers, convert them there, and send them back. That means your family pictures, ID scans, or whiteboard snapshots briefly live on a stranger\'s infrastructure. FileConvertir never does this — every byte stays on your device, and you can confirm it by opening your browser\'s DevTools Network tab and watching that no file ever leaves.',
        'For personal photos this matters. The safest file is the one that was never transmitted. In-browser conversion gives you the convenience of a web tool with the privacy of desktop software, and it works the same on Windows, macOS, Android, ChromeOS, and Linux.',
      ],
    },
  ],

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
        'It also means the tool works the same everywhere and offline once loaded. Drop up to 20 WebP files at once, let them convert in parallel, and download them individually or as one ZIP — no account, no watermark, no size gymnastics.',
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

  'tiff-to-jpg': [
    {
      heading: 'Why scans and print files come as TIFF',
      paragraphs: [
        'TIFF is the workhorse of scanning, publishing, and archival. Flatbed scanners, document management systems, fax archives, and print shops all lean on it because it can store images losslessly at high bit depth with no compression artefacts. The downside is that those qualities make TIFF files enormous and awkward to share.',
        'Converting TIFF to JPG is what you do when a high-fidelity source needs to become something you can actually email, post, or display on the web. You\'re deliberately trading archival perfection for a compact, universally viewable file — the right call once the image is leaving the print or archive pipeline.',
      ],
    },
    {
      heading: 'The dramatic file-size shrink',
      paragraphs: [
        'This is where TIFF-to-JPG earns its keep. An uncompressed TIFF can easily be 20–100MB, while the equivalent JPG might be one or two megabytes — often a 90% or greater reduction. A scanned brochure that won\'t fit in an email attachment becomes trivial to send.',
        'That shrink comes from JPG\'s lossy compression, which discards information the eye barely notices. For photographs and most colour scans the visual difference at high quality is negligible, while the size savings are transformative.',
      ],
    },
    {
      heading: 'When JPG is the wrong choice',
      paragraphs: [
        'Be honest about the content. If your TIFF is a black-and-white document scan, a line drawing, or anything with sharp text, JPG\'s compression can introduce fuzzy halos around the edges of letters. For crisp text or graphics, PNG (or keeping TIFF) preserves the edges better.',
        'JPG shines for photographic and continuous-tone scans — artwork reproductions, colour photos, magazine pages. Match the target to the content rather than reaching for JPG reflexively, and you\'ll avoid disappointing results on text-heavy scans.',
      ],
    },
    {
      heading: 'The multi-page TIFF caveat',
      paragraphs: [
        'Here\'s something many people don\'t realise: TIFF can hold multiple pages in a single file, the way a PDF does. Scanners often produce multi-page TIFFs for multi-sheet documents. JPG, by contrast, is strictly one image per file.',
        'So when you convert a multi-page TIFF to JPG, you can\'t end up with one multi-page JPG — that doesn\'t exist. If your goal is a single shareable document from a multi-page scan, converting to PDF is the better path. Use JPG when you have single-page images or want each page as a separate picture.',
      ],
    },
    {
      heading: 'Quality settings and bit depth',
      paragraphs: [
        'TIFFs often store 16 bits per channel for editing headroom; JPG is 8-bit. The conversion maps the image down to 8-bit, which is plenty for viewing and sharing but means JPG isn\'t the format for ongoing heavy edits. Do your tonal work on the TIFF, then export JPG as the final deliverable.',
        'FileConvertir encodes JPG at a high quality level that keeps colour scans and photos looking faithful, giving you a small file that still represents the original well for screen and casual print.',
      ],
    },
    {
      heading: 'Handled locally, kept private',
      paragraphs: [
        'Scanned documents are often sensitive — contracts, tax forms, medical paperwork, ID copies. FileConvertir converts TIFF to JPG entirely in your browser, so those scans never get uploaded to anyone\'s server.',
        'Drop a batch of up to 20 TIFFs, convert them in parallel, and download as individual JPGs or one ZIP. No account, no quota, and the same experience on every operating system.',
      ],
    },
    {
      heading: 'Not all TIFFs are uncompressed',
      paragraphs: [
        'It\'s a common assumption that every TIFF is a giant uncompressed file, but TIFF is really a flexible container that can hold data several ways: completely uncompressed, packed with lossless LZW or ZIP compression, or even — less commonly — with JPEG compression inside. That\'s why two TIFFs of the same image can differ wildly in size.',
        'For your purposes the distinction rarely changes the outcome: whatever compression the TIFF uses internally, the conversion decodes it to pixels and re-encodes a standard JPG. The size shrink you see comes from JPG\'s efficient lossy compression, not from whatever the TIFF was doing.',
        'The one case to keep in mind is a TIFF that already contains JPEG-compressed data. Converting it to a fresh JPG is a second lossy pass, so do it once from the best available source and avoid repeatedly re-saving the result.',
        'In short, you don\'t have to know what flavour of TIFF you\'re holding. The converter reads whatever the file contains and gives you a clean, compact JPG — you just get a much smaller result and, occasionally, a reminder of how flexible the TIFF format really is under the hood.',
      ],
    },
  ],

  'jpg-to-pdf': [
    {
      heading: 'Turning loose photos into one tidy document',
      paragraphs: [
        'Photos are great for viewing but clumsy for sharing as a set. Send someone twelve separate JPGs and they arrive as a messy pile of attachments in no guaranteed order. Combine them into a single PDF and you get one clean document that opens the same way on every device, with the pages in exactly the order you chose.',
        'This is why JPG-to-PDF is so popular for receipts, ID copies, signed forms, portfolios, and anything you photographed and now need to submit as a "document." A PDF reads as official and organised in a way a folder of images never will.',
      ],
    },
    {
      heading: 'The phone-as-scanner workflow',
      paragraphs: [
        'Most people don\'t own a scanner anymore — they photograph documents with their phone. That leaves you with JPGs of pages that you really need as a single PDF to email to HR, a landlord, a bank, or a government portal that only accepts PDF.',
        'Converting JPG to PDF closes that gap. Snap each page, drop the photos in, and get back one multi-page PDF that behaves like a proper scan. It\'s the missing step between "I took pictures of the document" and "I submitted the document."',
      ],
    },
    {
      heading: 'Page size, orientation, and margins',
      paragraphs: [
        'When a photo becomes a PDF page, it has to be placed on a page of some size — typically A4 or US Letter. A good conversion fits the image to the page while keeping its aspect ratio, so portraits stay portrait and landscapes stay landscape rather than getting stretched.',
        'Think about consistency if the document will be printed: photos taken at slightly different angles or zoom levels look more professional when each is fitted to the same page size with sensible margins. For pure on-screen sharing, exact page geometry matters less, but it still makes the result feel deliberate.',
      ],
    },
    {
      heading: 'Multiple photos, one ordered file',
      paragraphs: [
        'The real power of JPG-to-PDF is combining several images into one file in a chosen sequence — page one, page two, page three. That ordering is something a zip of loose images can\'t guarantee, and it\'s exactly what reviewers expect when they ask for "the documents as a single PDF."',
        'Whether it\'s a two-sided ID, a multi-page contract, or a photo portfolio meant to be flipped through, packaging them in order makes the result easy for the recipient to read top to bottom.',
      ],
    },
    {
      heading: 'Quality, size, and readability',
      paragraphs: [
        'A PDF built from JPGs is essentially a wrapper around those images, so the photos\' own resolution determines how sharp the pages look. Photograph documents in good light and reasonably close, and the text in the resulting PDF stays legible.',
        'Because JPGs are already compressed, the PDF stays a manageable size — far smaller than if you embedded uncompressed images — which keeps it easy to email even when it has several pages.',
      ],
    },
    {
      heading: 'Built in your browser, nothing uploaded',
      paragraphs: [
        'The documents people turn into PDFs are often the most sensitive things they own: passports, pay slips, lease agreements, medical forms. FileConvertir assembles the PDF entirely in your browser, so none of those images are ever sent to a server.',
        'Drop up to 20 JPGs, get a single PDF back, and download it directly. No signup, no watermark stamped across your pages, and it works identically on phone and desktop.',
      ],
    },
    {
      heading: 'Tips for sharp, readable document photos',
      paragraphs: [
        'Since a JPG-to-PDF result is only as good as the photos you feed it, a few habits make a big difference. Shoot in even, diffuse light to avoid glare and harsh shadows, lay the page flat, and fill the frame with the document so the text is as large and crisp as possible. Holding the phone parallel to the page keeps lines straight rather than keystoned.',
        'Avoid flash where you can — it tends to blow out the centre of a glossy page and cast a hot spot. Natural window light or a bright, even room light usually produces a cleaner, more legible capture that turns into a more professional-looking PDF page.',
        'If a page comes out crooked or has distracting background, crop and straighten it before converting. A little tidying up front means the finished PDF reads like a real scan instead of a hurried snapshot, which matters when it\'s going to an employer, a bank, or a government office.',
      ],
    },
  ],

  'png-to-pdf': [
    {
      heading: 'Why screenshots and diagrams belong in a PDF',
      paragraphs: [
        'PNG is the format your computer reaches for when you take a screenshot or export a diagram, because it keeps text and lines razor-sharp. But a folder of PNGs is awkward to hand to someone — they have to open each one, and there\'s no fixed order. Wrapping them in a PDF turns a scattered set of images into a single, professional document.',
        'That\'s why people convert PNG to PDF for things like bug reports, design specs, step-by-step guides, account statements, and slide exports. The recipient opens one file, scrolls through the pages in order, and prints it cleanly — no image-viewer juggling required.',
      ],
    },
    {
      heading: 'Keeping screenshots crisp',
      paragraphs: [
        'Because PNG is lossless, the text and UI elements in your screenshots stay sharp, and a well-made PDF preserves that clarity rather than recompressing it into mush. This matters when the whole point is for someone to read the small print in an error message or follow a labelled diagram.',
        'If you\'d converted those screenshots to JPG first, the text edges would soften and you\'d see compression halos. Going PNG straight into a PDF keeps the source quality intact, which is why it\'s the preferred route for technical and instructional content.',
      ],
    },
    {
      heading: 'Flattening transparency',
      paragraphs: [
        'PNGs often carry transparency, and PDF pages need a defined background. During conversion, transparent areas are flattened onto a solid background (typically white) so the page renders predictably everywhere.',
        'This is almost always what you want for a document, but it\'s worth knowing: a logo that floated transparently as a PNG will sit on a white page in the PDF. If preserving transparency for further compositing matters, keep the PNG; if you\'re building a readable document, flattening is exactly right.',
      ],
    },
    {
      heading: 'Combining several images in order',
      paragraphs: [
        'The big win is sequencing. A multi-step tutorial, a series of screenshots, or a set of diagrams can be combined into one PDF with the pages in the precise order you intend. That ordered, single-file result is what colleagues and clients expect when they ask you to "send it as a PDF."',
        'It also travels better than a zip of images: PDFs preview inline in email and chat, open with a built-in reader on every device, and print as a coherent booklet rather than a stack of separate pictures.',
      ],
    },
    {
      heading: 'Page sizing for clean printing',
      paragraphs: [
        'When a PNG becomes a PDF page it\'s fitted to a standard page size while keeping its proportions, so nothing gets stretched. For wide screenshots, a landscape page can make better use of the space; for tall captures, portrait works better.',
        'If the PDF is meant to be printed, consistent page sizing across all the images makes the output look intentional and professional rather than like a random assortment of pictures pasted together.',
      ],
    },
    {
      heading: 'Assembled locally for privacy',
      paragraphs: [
        'Screenshots can contain a lot you\'d rather not leak — account numbers, private messages, internal dashboards. FileConvertir builds the PDF entirely in your browser, so those images never get uploaded anywhere.',
        'Drop up to 20 PNGs, receive one combined PDF, and download it on the spot. No account, no watermark, and the same smooth experience whether you\'re on Windows, Mac, Android, or iOS.',
      ],
    },
    {
      heading: 'PNG or JPG inside the PDF: which to choose',
      paragraphs: [
        'When you\'re deciding what to feed into a PDF, the content should guide you. PNG is the right source for screenshots, diagrams, charts, and anything with sharp text or flat colour, because its lossless data keeps those edges clean on the page. JPG is the better source for full photographs, where its smaller size keeps the PDF light.',
        'Mixing them is fine — a single PDF can contain both — but a common mistake is converting screenshots to JPG first and then to PDF, which softens the text and adds compression halos. Going straight from PNG into the PDF avoids that and preserves every pixel of the original capture.',
        'If file size becomes a concern with many high-resolution PNGs, that\'s the moment to weigh JPG for the purely photographic pages while keeping PNG for the text-heavy ones. Match the format to each page\'s content and you get the best of both: readable text and a manageable file.',
        'As a rule of thumb, if you can read every character clearly when you zoom into the original PNG, the PDF will be just as legible. Start from the highest-resolution captures you have rather than ones already shrunk for a chat app, and your finished document will hold up both on screen and in print.',
      ],
    },
  ],

  'heic-to-pdf': [
    {
      heading: 'From iPhone camera roll to shareable document',
      paragraphs: [
        'Your iPhone shoots in HEIC, which is efficient but stubbornly incompatible with a lot of the world. When you need to send those photos as a proper document — to a school, an insurer, an employer, or a government form — turning them into a PDF solves two problems at once: it escapes HEIC\'s compatibility issues and packages multiple shots into one clean file.',
        'PDF is the format institutions ask for. It opens identically everywhere, preserves page order, and reads as an official submission. Converting HEIC straight to PDF means you skip the awkward middle step of first making JPGs and then assembling them.',
      ],
    },
    {
      heading: 'Why not just send the HEIC files?',
      paragraphs: [
        'Because the person on the other end probably can\'t open them. Windows needs a paid extension for HEIC, many Android phones and web upload forms reject it outright, and plenty of document portals only accept PDF in the first place. Sending raw HEIC is a near-guaranteed "we couldn\'t open your file" reply.',
        'Wrapping the photos in a PDF sidesteps all of that. The PDF embeds standard image data the reader can render, so it works on the recipient\'s machine regardless of whether they have any HEIC support at all.',
      ],
    },
    {
      heading: 'Perfect for forms, applications, and records',
      paragraphs: [
        'Photographed a signed form, an ID, a set of receipts, or a stack of paperwork with your iPhone? Those HEIC photos become a usable submission only once they\'re a PDF. Most application systems, HR portals, and claim forms specifically want a single PDF rather than a scatter of image attachments.',
        'Combining several HEIC photos into one ordered PDF mirrors a real scanned document — page one, page two, and so on — which is exactly how reviewers expect to receive multi-page material.',
      ],
    },
    {
      heading: 'Printing iPhone photos reliably',
      paragraphs: [
        'Print shops and office printers handle PDFs far more predictably than HEIC, which many print drivers can\'t interpret. If you want to print a batch of iPhone photos — for a scrapbook, a noticeboard, or a handout — laying them into a PDF first gives you consistent, controllable output.',
        'Because each photo is fitted to a page at its native resolution, the printed result stays sharp, and you control the order rather than leaving it to whatever sequence the printer decides on.',
      ],
    },
    {
      heading: 'What happens to Live Photos and metadata',
      paragraphs: [
        'A HEIC can contain more than the still image — Live Photo motion, depth data, and EXIF metadata like date and GPS. Converting to PDF flattens everything down to the visible photo on the page, dropping the motion and trimming metadata. For sharing and printing this is exactly what you want.',
        'If you specifically need the Live Photo motion or full EXIF preserved, keep the original HEIC alongside your PDF. The PDF is the hand-off copy; the HEIC remains your archive.',
      ],
    },
    {
      heading: 'Converted on your device, never uploaded',
      paragraphs: [
        'The photos people turn into PDFs are frequently personal or official — IDs, medical forms, signed contracts. FileConvertir decodes your HEIC files and builds the PDF entirely in your browser, so nothing is ever sent to a server.',
        'Drop up to 20 HEIC photos at once, get a single ordered PDF back, and download it immediately. No signup, no watermark across your pages, and it works the same on iPhone, Android, Windows, and Mac.',
      ],
    },
    {
      heading: 'Doing it straight from your iPhone',
      paragraphs: [
        'You don\'t need a computer for any of this. Open the converter in Safari or Chrome on your iPhone, tap to add photos straight from your camera roll, and the PDF is built right there on the device. That\'s ideal when you\'re away from a desk and a form needs submitting before a deadline.',
        'Because everything runs locally in the browser, your photos never leave the phone — there\'s no upload over mobile data and nothing cached on a server. It\'s the same privacy you\'d get from a native app, without installing anything or granting broad photo-library permissions to a third party.',
        'When you\'re back at a computer, the workflow is identical, just faster for big batches. Either way you end up with one tidy PDF you can email, AirDrop, or upload — and the original HEIC files stay untouched in your library as your high-quality archive.',
      ],
    },
  ],
};
