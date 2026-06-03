import type { ArticleSection, ConverterContentOverride } from '../../types';

/* ───────────────────────────────────────────────────────────────────────────
   ARTICLE BODIES FOR THE 6 EXISTING VIDEO TIER S PAGES
   (article field only — these slugs already have full entries in priority.ts)
─────────────────────────────────────────────────────────────────────────── */

export const VIDEO_S_ARTICLES: Record<string, ArticleSection[]> = {
  'mov-to-mp4': [
    {
      heading: 'Container vs codec: what is actually inside a MOV file',
      paragraphs: [
        'The single most useful thing to understand about MOV and MP4 is that they are containers, not video formats in the way most people imagine. A container is a wrapper — it holds a video stream, one or more audio streams, timecodes, and metadata, and it tells a player where each piece starts and stops. The actual picture is produced by a codec, almost always H.264 (AVC) or H.265 (HEVC) on modern Apple devices. So an iPhone MOV and a YouTube MP4 frequently hold the exact same H.264 video; they just live in different boxes.',
        'This matters because it changes what "conversion" really means. When the codec inside your MOV is already H.264 or HEVC with AAC audio — which it almost always is — there is nothing to re-encode. The job is to lift those streams out of the QuickTime box and drop them into the MP4 box, byte for byte. Players on Windows, Android, and the web reject the MOV box but happily read the identical streams once they are in an MP4. You get full compatibility without touching a single pixel.',
        'Knowing this also tells you when conversion will be slow. If your MOV happens to use Apple ProRes (common from Final Cut Pro or professional cameras), the streams are not web-friendly and a true re-encode is required. That is the rare case where MOV to MP4 takes real time and involves a quality decision rather than a simple relabel.',
      ],
    },
    {
      heading: 'Why your iPhone insists on recording MOV',
      paragraphs: [
        'Apple ships QuickTime/MOV as the default capture container on every iPhone and iPad because it integrates cleanly with the rest of the Apple ecosystem: AirDrop, Photos, iMovie, and Final Cut all expect it. Since iOS 11, the camera also defaults to HEVC video inside that MOV to save space, which is great until you try to share the file with someone on an older Windows laptop or an Android phone that has no HEVC decoder.',
        'You can sidestep the HEVC half of the problem by switching Settings → Camera → Formats to "Most Compatible," which forces H.264 capture. But that does nothing about the MOV wrapper itself, and it makes new recordings larger. Converting after the fact is usually the better path: you keep small, high-quality recordings on your phone and only produce an MP4 when you actually need to send one somewhere.',
        'This is also why a video that plays perfectly on your iPhone can refuse to open on a relative\'s PC. The picture is fine — the operating system just does not recognise the container, the codec, or both. MP4 with H.264 is the lowest common denominator that every device built in the last fifteen years understands.',
      ],
    },
    {
      heading: 'Remux vs re-encode: the difference that saves you hours',
      paragraphs: [
        'Remuxing copies the existing audio and video streams into a new container without decoding them. It is essentially a file-system operation: fast, lossless, and finished in seconds even for a long clip. Re-encoding, by contrast, decodes every frame back to raw pixels and compresses them again from scratch — slow, and it always discards a little quality because H.264 and HEVC are lossy.',
        'FileConvertir prefers the remux path whenever the source streams are already MP4-compatible, which is the common case for iPhone and Mac recordings. That is why a one-minute clip can convert almost instantly. If you ever notice a MOV to MP4 conversion taking much longer, it usually means the source used a codec (like ProRes) that genuinely has to be transcoded.',
        'The practical takeaway: do not assume "converting" automatically harms your footage. For the typical MOV from a phone, the resulting MP4 is bit-for-bit identical in picture quality to the original. You only pay a quality tax when a re-encode is truly unavoidable.',
      ],
    },
    {
      heading: 'When social platforms re-encode it anyway',
      paragraphs: [
        'Even after you produce a clean MP4, Instagram, TikTok, YouTube, and other platforms will re-compress your upload to fit their own bitrate ladders and resolutions. That is unavoidable and outside any converter\'s control. What converting to MP4 buys you is acceptance: many uploaders and editing front-ends silently reject or mishandle MOV files, especially HEVC ones, and you end up with a failed upload or a green-screen preview.',
        'Because the platform will re-encode regardless, there is no benefit to obsessing over the quality of the MP4 you hand it — a high-quality remux is more than enough. The goal is simply to give the platform a container it will accept so its own pipeline can take over cleanly.',
      ],
    },
    {
      heading: 'Big files and the 100MB ceiling',
      paragraphs: [
        'Because FileConvertir runs FFmpeg.wasm inside the browser tab, it works on files up to 100MB. That comfortably covers most short clips, screen recordings, and social-media-length videos. A few minutes of 1080p H.264 typically fits well under the limit.',
        'For a long 4K recording, a multi-gigabyte screen capture, or an archive of an entire event, a desktop tool like HandBrake or the native FFmpeg command line is the right choice — they have no memory ceiling and can batch hundreds of files overnight. The in-browser converter is built for the everyday "I just need this one MOV to play on Windows" problem, where uploading a private video to some server is exactly what you want to avoid.',
      ],
    },
    {
      heading: 'Editing MOV in Premiere, DaVinci, and Shotcut',
      paragraphs: [
        'Most professional editors handle MOV natively, but HEVC-in-MOV is a frequent stumbling block, particularly on Windows where the editor depends on a paid or missing system HEVC decoder. Symptoms include choppy scrubbing, audio that plays but no picture, or an outright import error. Converting to an H.264 MP4 first removes that dependency and usually makes timeline playback smoother.',
        'If you plan to do heavy colour or effects work, remember that H.264/HEVC are delivery codecs, not editing codecs — every frame depends on its neighbours, which makes scrubbing CPU-intensive. For serious projects, editors often transcode to an intermediate format like ProRes or DNxHD. For light trims and assembling clips, though, a straightforward MP4 is perfectly workable and far smaller.',
      ],
    },
  ],

  'mkv-to-mp4': [
    {
      heading: 'Matroska: the Swiss-army container',
      paragraphs: [
        'MKV, short for Matroska, became the default for downloaded movies and TV because it can hold almost anything in one tidy file: a video stream, several audio tracks (original language plus dubs), multiple subtitle tracks, chapter markers, cover art, and even fonts for styled subtitles. That flexibility is exactly why media enthusiasts love it and why it dominates ripped and archived content.',
        'MP4 is comparatively conservative. It was standardised for broad device playback, so it sticks to a smaller, well-supported set of streams and features. When you convert MKV to MP4 you are trading some of Matroska\'s flexibility for guaranteed playability — which is the correct trade the moment you need the file to "just work" on a phone, TV, or console.',
        'Understanding this also explains why the conversion can sometimes change what is in the file. Anything MP4 does not support cleanly — a second commentary track, soft subtitles, embedded fonts — may be dropped or flattened. If those extras matter to you, it is worth knowing before you convert rather than discovering it on the couch.',
      ],
    },
    {
      heading: 'Why MKV will not direct-play on your iPhone or Apple TV',
      paragraphs: [
        'The codecs inside a typical MKV — usually H.264 or HEVC video with AAC, AC-3, or DTS audio — are mostly fine for Apple devices. The roadblock is the Matroska container itself: iOS and tvOS do not natively parse MKV, so even when the video would decode perfectly, the system refuses to open the wrapper. The result is a file that plays on your PC but is invisible to the Apple TV app or the iPhone Files preview.',
        'Repackaging into MP4 fixes this because MP4 is a first-class citizen across Apple\'s platforms. When the MKV\'s video is already H.264/HEVC and the audio is AAC, the conversion is a remux: the streams are copied into the MP4 container untouched, so there is no quality loss and it finishes quickly.',
        'The audio is where surprises happen. Many MKV releases ship with AC-3 or DTS surround audio that MP4 (and Apple devices) handle inconsistently. In those cases the audio specifically may need re-encoding to AAC, while the video is still copied losslessly.',
      ],
    },
    {
      heading: 'Soft subtitles, dubs, and what gets left behind',
      paragraphs: [
        'Subtitles come in two flavours. "Soft" subtitles are a separate text track you can toggle on and off; "hard" subtitles are burned permanently into the picture. MKV typically carries soft subtitles, which is convenient — but MP4 support for soft subtitle formats is narrow, so during conversion they are often dropped rather than carried over.',
        'If subtitles are essential, the cleanest workflow is to keep a separate .srt file alongside your MP4; most players (VLC, Infuse, Plex, even Apple TV apps) will load a matching sidecar subtitle automatically. Alternatively, a desktop tool can burn the subtitles into the video before conversion, though that makes them permanent.',
        'The same logic applies to multiple audio tracks. An MKV might contain the original language plus a dub plus director commentary; the MP4 output keeps the primary track. If you need a specific language, select or reorder tracks in a desktop tool first so the right one becomes primary.',
      ],
    },
    {
      heading: 'Direct play vs transcode: stop your Plex server from melting',
      paragraphs: [
        'Plex tries to "direct play" a file when the client device can read the container and codecs as-is. If it cannot — often because the device chokes on the MKV container or its audio — Plex transcodes on the fly, which pins your server\'s CPU and can cause buffering, especially on a low-power NAS or while several people stream at once.',
        'Converting your library to MP4 with H.264/HEVC video and AAC audio gives Plex (and Jellyfin, and Emby) a format almost every client can direct-play. That moves the work off your server entirely: the client just reads the stream. For a home server handling multiple simultaneous viewers, this is the single biggest quality-of-life upgrade you can make.',
      ],
    },
    {
      heading: 'Remuxing keeps quality; transcoding does not',
      paragraphs: [
        'Because most MKV files already use device-friendly video codecs, the ideal MKV to MP4 conversion is a remux — copying streams into a new container with zero re-encoding and therefore zero quality loss. It is fast and the output is visually identical to the source.',
        'A full transcode only becomes necessary when the source uses something MP4 cannot carry, or when you deliberately want to shrink the file or change resolution. Whenever you can avoid transcoding, do — every re-encode of a lossy codec throws away a little detail you can never get back.',
      ],
    },
    {
      heading: 'The size problem: a 12GB movie will not fit',
      paragraphs: [
        'A feature-length MKV is routinely 4–15GB, far beyond what an in-browser converter can hold in memory. FileConvertir\'s 100MB ceiling is ideal for clips, short episodes, and edited exports, but a full movie needs a desktop tool.',
        'For large libraries, the free utility MKVToolNix can remux MKV to MP4 almost instantly without re-encoding, and HandBrake can transcode when you actually want smaller files. Use the browser converter for the quick, private, one-off jobs and reach for desktop software when you are processing whole movies or batches.',
      ],
    },
  ],

  'avi-to-mp4': [
    {
      heading: 'Why AVI feels frozen in 1999',
      paragraphs: [
        'AVI (Audio Video Interleave) was Microsoft\'s flagship video container in the Windows 95/98 era, and it shows its age. It predates modern features the web takes for granted: it has weak support for variable bitrate audio, no native subtitle handling, clumsy metadata, and a structure that bloats files. It was designed for an era of CDs and standard-definition camcorders, not phones and streaming.',
        'That legacy is why a perfectly good old video locked in AVI is awkward today. iPhones will not open it, Android support is patchy, web players ignore it, and even Windows often needs the right legacy codec installed. The footage might be priceless, but the wrapper has aged out of the modern ecosystem.',
        'Converting to MP4 is less about chasing quality and more about rescuing content from a dying format before the codecs needed to play it become harder to find. MP4 with H.264 is the format most likely to still be openable in twenty years.',
      ],
    },
    {
      heading: 'DivX, Xvid, and the codec graveyard',
      paragraphs: [
        'Most AVI files use codecs that have effectively retired: DivX and Xvid (MPEG-4 Part 2), Microsoft\'s MS-MPEG4, Cinepak, Indeo, or uncompressed/raw video from early capture cards. In their day these were impressive, but they are far less efficient than H.264, meaning the files are larger for worse picture quality.',
        'The good news is that FFmpeg, which powers this converter, still understands these old codecs. So an AVI that your phone cannot touch can be decoded and re-encoded into a clean H.264 MP4 that is both smaller and universally playable. You are effectively migrating the footage onto modern infrastructure.',
        'Occasionally a very old AVI uses a proprietary codec that was never well documented, and decoding can produce artefacts or fail. These cases are rare, but if an output looks wrong, the original codec — not the conversion — is usually the culprit.',
      ],
    },
    {
      heading: 'Interlaced footage and the comb-teeth problem',
      paragraphs: [
        'A lot of AVI content comes from camcorders and TV captures that recorded interlaced video — each frame is built from two fields representing slightly different moments in time. On old CRT televisions this looked smooth, but on modern progressive-scan screens it shows up as horizontal "comb teeth" along anything that moves.',
        'When you re-encode interlaced AVI to MP4, this is the moment to consider deinterlacing, which blends or reconstructs the fields into clean progressive frames. The browser converter applies sensible defaults, but if you have a large archive of interlaced DV tapes, a desktop tool with explicit deinterlace filters (like HandBrake\'s decomb) will give you finer control over the result.',
        'Knowing your footage is interlaced also explains why the picture might have looked subtly wrong even before conversion — it was never meant for a flat-panel display in the first place.',
      ],
    },
    {
      heading: 'When 4:3 footage meets a 16:9 screen',
      paragraphs: [
        'Standard-definition AVI is almost always 4:3, the squarish shape of old TVs. Played on a widescreen phone or monitor, it will appear pillarboxed with black bars on the sides — that is correct, not a bug. Avoid the temptation to stretch it to fill the screen, which distorts everyone into short, wide versions of themselves.',
        'A faithful conversion preserves the original aspect ratio so people and scenes keep their natural proportions. If you genuinely want a widescreen result you would have to crop top and bottom, losing image, which is rarely worth it for cherished old footage.',
      ],
    },
    {
      heading: 'Re-encoding is unavoidable here — and that is OK',
      paragraphs: [
        'Unlike MOV or MKV to MP4, AVI to MP4 almost always requires a true re-encode because the old codecs are not MP4-compatible. That means the conversion takes a little longer and, technically, passes the video through another lossy compression step.',
        'In practice this rarely matters. The source AVI was usually standard-definition and already imperfect, and a high-quality H.264 re-encode preserves everything your eye will notice while making the file dramatically smaller and universally playable. The tiny theoretical quality loss is a fair price for footage that will actually open on a phone in 2025.',
      ],
    },
    {
      heading: 'Preserving the only copy of an old home video',
      paragraphs: [
        'AVI files often hold irreplaceable memories — birthdays, weddings, a grandparent who is no longer around — and there may be only one copy. That makes privacy and safety paramount, which is exactly why an in-browser converter is reassuring: the file never leaves your computer, so there is no upload, no third-party server, and no question of where your family video ended up.',
        'A sensible workflow is to keep the original AVI untouched as an archival master and treat the MP4 as your shareable, playable copy. Storage is cheap; do not delete the source. Once you have an MP4, that copy will sail onto phones, into cloud photo libraries, and across messaging apps without any of the codec headaches AVI brings.',
      ],
    },
  ],

  'webm-to-mp4': [
    {
      heading: 'Why the web runs on WebM',
      paragraphs: [
        'WebM exists because the web wanted a high-quality video format with no licensing fees. Google built it around royalty-free codecs — VP8, then VP9, and increasingly AV1 — so any browser or site could play and serve video without paying patent pools the way H.264 requires. That is why YouTube, browser screen recorders, Google Meet, and HTML5 `<video>` elements lean on WebM so heavily.',
        'The catch is that "great for browsers" and "great everywhere else" are different things. Outside the browser, WebM support thins out fast: Windows Media Player ignores it, older iPhones cannot play it, and most video editors either refuse it or need extra components. The very thing that makes WebM ideal on the web makes it awkward the moment a file leaves the browser.',
        'Converting to MP4 trades the open-web advantages for universal playback. It is the right move whenever you need to email a recording, drop it into an editor, or play it on a TV — places where the royalty-free codec story is irrelevant and compatibility is everything.',
      ],
    },
    {
      heading: 'VP9, Opus, and the codecs inside',
      paragraphs: [
        'A WebM file typically pairs VP9 (or VP8, or AV1) video with Opus audio. These are genuinely excellent, modern codecs — VP9 rivals HEVC for efficiency, and Opus is one of the best audio codecs ever standardised. The problem is purely about where they are supported, not how good they are.',
        'MP4 conventionally carries H.264/HEVC video and AAC audio, which is why WebM to MP4 is a real transcode rather than a quick remux: the VP9 video and Opus audio have to be decoded and re-encoded into H.264 and AAC. That takes processing time and introduces a small, usually invisible, quality loss.',
        'Because it is a true re-encode, the output quality depends on the encoder settings, not just the source. A high-quality H.264 export from a clean VP9 source looks essentially identical to the original for normal viewing, which is exactly what you want when the goal is compatibility rather than archival.',
      ],
    },
    {
      heading: 'The variable-frame-rate trap in screen recordings',
      paragraphs: [
        'Browser screen recorders and tools like Loom often capture in variable frame rate (VFR) — the recorder only writes a new frame when the screen actually changes, which keeps files small. WebM tolerates VFR happily, but it is a notorious source of problems once you move the file elsewhere.',
        'The classic symptom is audio that drifts progressively out of sync the longer you watch, or an editor that reports a wildly wrong duration. This happens because many editors assume a constant frame rate and mishandle the gaps. Converting to MP4 is a good opportunity to normalise the footage to a constant frame rate, which is what makes the audio line up and the clip behave predictably in an editor.',
        'So if you have ever had a screen recording where the voice slowly slips behind the picture, VFR is almost certainly why — and a clean MP4 conversion is the usual fix.',
      ],
    },
    {
      heading: 'Why Premiere and iMovie choke on WebM',
      paragraphs: [
        'Professional and consumer editors alike — Premiere Pro, iMovie, Final Cut, DaVinci Resolve — are built around H.264/HEVC and ProRes workflows. WebM with VP9/Opus sits outside that comfort zone, so importing it often fails outright or imports with no audio, no video, or a frozen first frame.',
        'Rather than hunting for plugins or codec packs, converting the WebM to an H.264 MP4 first is the reliable path: every mainstream editor accepts it without complaint. This is the single most common reason people convert WebM — they downloaded or recorded something in the browser and now need to actually edit it.',
        'Once it is an MP4, you can trim, caption, and assemble it like any other clip, then export to whatever format your final destination needs.',
      ],
    },
    {
      heading: 'Converting without bloating the file',
      paragraphs: [
        'VP9 is so efficient that a naive conversion to H.264 can produce a noticeably larger MP4 for the same visual quality — H.264 simply needs more bits to look the same. That is the expected trade-off for compatibility, and for short clips it rarely matters.',
        'If file size is a concern, a sensible middle ground is to keep the resolution and frame rate the same while letting the encoder target a reasonable quality level rather than a punishingly high bitrate. For most screen recordings and web clips, the resulting MP4 is still modest in size and far more portable than the WebM original.',
      ],
    },
    {
      heading: 'Privacy matters for screen recordings',
      paragraphs: [
        'Screen recordings are frequently sensitive: they can show internal dashboards, customer data, private messages, or a walkthrough of an unreleased product. Uploading that to a random online converter is a genuine data-leak risk, often in breach of workplace policy.',
        'Because FileConvertir runs FFmpeg.wasm entirely in your browser tab, a WebM screen recording never leaves your machine during conversion. There is no upload, no server-side copy, and nothing to leak — which makes it a safe default for exactly the kind of recordings that most need converting.',
      ],
    },
  ],

  'mov-to-mp3': [
    {
      heading: 'The audio hiding inside your MOV',
      paragraphs: [
        'Every MOV video carries at least one audio track, almost always encoded as AAC, the same codec Apple uses across its ecosystem. Extracting to MP3 means pulling that audio stream out of the video container and re-encoding it on its own, so you end up with a small, standalone file you can play anywhere without dragging the video along.',
        'Because the source is AAC and MP3 is also a lossy format, this is a lossy-to-lossy conversion — you are not creating new fidelity, just repackaging the audio that is already there into a more universally playable form. At a sensible bitrate the difference is inaudible for speech and very close to transparent for music.',
        'It helps to think of it as separating, not converting in the dramatic sense. The voice or music was always in the file; you are simply giving it its own container so it can live on a phone, a car stereo, or a podcast feed.',
      ],
    },
    {
      heading: 'Why pull the audio out at all',
      paragraphs: [
        'A MOV is a video file, so listening to it normally means opening a video player, keeping the screen on, and burning battery rendering frames you do not care about. An MP3 plays in any audio app, in the background, with the screen off, and uses a fraction of the storage — ideal for anything you only want to hear.',
        'Common reasons include saving the audio from a lecture or webinar recording, lifting narration from a screen recording to reuse elsewhere, capturing the spoken content of an interview, or grabbing music from a clip you recorded. In every case the picture is dead weight and MP3 is the lighter, more flexible result.',
      ],
    },
    {
      heading: 'What 192 kbps actually means for voice vs music',
      paragraphs: [
        'FileConvertir extracts to 192 kbps MP3 by default, and it helps to know what that number buys you. Bitrate is how many bits per second describe the sound — higher means more detail and a larger file. For spoken-word content (lectures, interviews, voice notes) 192 kbps is overkill in the best way: the result is effectively indistinguishable from the source.',
        'For music, 192 kbps is a solid, widely accepted quality level that sounds clean on phones, earbuds, and car stereos. Trained listeners on high-end equipment can sometimes detect a difference from lossless, but for the everyday job of getting listenable audio off a video, it is more than enough.',
        'Because the original MOV audio is itself compressed, encoding the MP3 at a wildly high bitrate would not recover quality that was never captured — it would just make a bigger file. 192 kbps is a deliberate, sensible balance.',
      ],
    },
    {
      heading: 'From iPhone screen recording to a clean MP3',
      paragraphs: [
        'iPhone screen recordings are saved as MOV, and they are one of the most common sources for audio extraction — a tutorial you narrated, a captured voice call, or a video walkthrough whose commentary you want as a standalone clip. Drop the MOV in, choose MP3, and the spoken track comes out ready to share.',
        'Because the whole process runs in your browser, you can even do it on the phone itself: open the converter in Safari, pick the recording from the Files app, and download the MP3 without a desktop in sight. Nothing is uploaded, which matters when a recording contains a private conversation.',
      ],
    },
    {
      heading: 'Building a podcast or lecture archive',
      paragraphs: [
        'If you regularly capture talks, classes, or meetings as video, converting each one to MP3 turns a heavy video library into a lean, searchable audio archive. MP3s are tiny by comparison, sync effortlessly to phones and players, and slot straight into podcast apps and audiobook-style listening workflows.',
        'For anyone studying, an MP3 of a lecture means you can re-listen on a commute or at the gym without staring at a screen. For podcasters repurposing video interviews, MP3 is the distribution format every hosting platform expects. The conversion is the bridge between "I recorded a video" and "I have an audio file I can actually use."',
      ],
    },
    {
      heading: 'What conversion cannot do: cleanup and noise',
      paragraphs: [
        'It is worth being honest about the limits. Extracting to MP3 copies the audio faithfully — including any background hiss, room echo, or low recording volume that was in the original. Converting does not clean up, normalise, or denoise the sound; whatever was captured is what you get.',
        'If a recording needs real polishing — noise removal, volume levelling, trimming dead air — that is a job for an audio editor like Audacity or GarageBand after extraction. A reasonable workflow is to pull the MP3 here first, then open it in an editor only if the quality genuinely needs work. For most lectures and voice notes, the straight extraction is perfectly listenable as-is.',
      ],
    },
  ],

  'mp4-to-mp3': [
    {
      heading: 'Every video is also an audio file',
      paragraphs: [
        'An MP4 almost always contains an AAC audio track riding alongside the H.264 or HEVC video. Converting to MP3 means isolating that audio and re-encoding it into the format every device on earth can play. You are not transforming the video so much as freeing the sound that was already inside it.',
        'Since MP4 audio is AAC and MP3 is also lossy, this is a lossy-to-lossy step: the conversion repackages existing audio rather than improving it. At a healthy bitrate the result is so close to the source that the difference is academic for the things people actually extract — talks, music, podcasts, and narration.',
        'Framing it this way sets the right expectations. The MP3 will sound as good as the audio in the video did, no better and, at 192 kbps, scarcely worse. The win is portability, not fidelity.',
      ],
    },
    {
      heading: 'Lecture recordings: the most common reason',
      paragraphs: [
        'By far the biggest use case is education. Students and professionals record lectures, webinars, and training sessions as MP4, then want to revisit the content without sitting in front of a screen. An MP3 lets you re-listen while walking, driving, or doing chores, and it takes a fraction of the storage of the video.',
        'Audio-only also makes the material easier to skim and reference. Many podcast and audiobook apps remember your position, let you speed up playback, and download for offline listening — features that turn an hour-long lecture MP4 into something you can genuinely study on the move.',
        'Because nothing is uploaded, recordings of internal training or proprietary course material stay private, which is exactly what institutions and employers expect.',
      ],
    },
    {
      heading: 'Music videos, concerts, and the quality ceiling',
      paragraphs: [
        'Pulling the audio from a music video or concert clip is popular, but it is worth understanding the quality ceiling. The MP3 can only be as good as the audio embedded in the MP4. If that video was a compressed download, the audio is already lossy, and converting to MP3 cannot add back detail that was never there.',
        'That is why a 320 kbps MP3 made from a modest web video does not magically sound like a studio master — it just faithfully carries the modest source. For casual listening this is fine; for serious music collecting, an actual purchased or lossless source will always beat audio ripped from a video.',
        'In short: 192 kbps from a clean source is great for listening, and chasing extreme bitrates from an already-compressed video mostly just makes bigger files.',
      ],
    },
    {
      heading: 'A quick word on copyright',
      paragraphs: [
        'Converting your own recordings — lectures you captured, videos you made, content you have the rights to — is entirely your call. Extracting audio from copyrighted music videos, films, or other people\'s work for redistribution is a different matter and can infringe copyright depending on where you live and what you do with it.',
        'The tool itself is neutral: it simply performs the conversion you ask for. The responsibility for using it within the law and within a platform\'s terms rests with you. Personal, private use of material you own or have permission for is the safe and intended path.',
      ],
    },
    {
      heading: 'Why the MP3 might sound the same as a "better" format',
      paragraphs: [
        'People sometimes ask whether they should extract to a "better" format than MP3. For audio that originated inside an MP4, the honest answer is usually no. The source is already lossy AAC, so converting to a lossless format like WAV or FLAC just produces a much larger file that preserves the same imperfect audio — it does not recover quality.',
        'MP3 at 192 kbps gives you near-transparent quality, tiny files, and unrivalled compatibility. The only good reason to extract to WAV instead is if you intend to edit the audio in a DAW, where working uncompressed avoids stacking another round of lossy compression during editing.',
      ],
    },
    {
      heading: 'When the file is too big: the 100MB wall',
      paragraphs: [
        'The in-browser converter handles MP4s up to 100MB, which covers short clips and many music videos but not long recordings. A one-hour lecture at 720p can easily be 300–500MB, well past the limit, simply because the video stream is large even though you only want the audio.',
        'For those long files you have two good options. You can trim the MP4 to the segment you need first, bringing it under 100MB, or use a desktop tool — FFmpeg can extract audio from a multi-gigabyte video in seconds with a single command. The browser tool is built for quick, private, everyday extractions; for marathon recordings, desktop software is the better fit.',
      ],
    },
  ],
};

/* ───────────────────────────────────────────────────────────────────────────
   FULL ENTRIES FOR THE 2 NEW VIDEO TIER S PAGES
─────────────────────────────────────────────────────────────────────────── */

export const VIDEO_S_NEW: Record<string, ConverterContentOverride> = {
  'mp4-to-webm': {
    title: 'MP4 to WebM Converter — Optimize for Web | FileConvertir',
    metaDescription:
      'Convert MP4 to WebM free online — no upload, no signup. Get smaller, web-optimized VP9 video for fast-loading sites and HTML5 video. 100% private, browser-based.',
    heading: 'MP4 to WebM Converter',
    description:
      'Convert MP4 videos to WebM for faster-loading websites and royalty-free HTML5 video. WebM with VP9 is typically smaller than MP4 at the same quality. Runs entirely in your browser — no upload, no account.',
    longDescription:
      'WebM is the web\'s native video format: it uses royalty-free codecs (VP9 and AV1) and is supported by every modern browser without licensing fees. For website owners, WebM matters because a VP9-encoded clip is often 25–40% smaller than the equivalent H.264 MP4 at the same visual quality, which means faster page loads and better Core Web Vitals. The classic pattern is to serve WebM with an MP4 fallback inside an HTML5 `<video>` element so every visitor gets the best file their browser supports. FileConvertir converts MP4 to WebM with FFmpeg.wasm running locally in your browser — your video never leaves your device, and there is no upload queue or signup.',
    howToSteps: [
      { name: 'Drop your MP4 file', text: 'Drag your .mp4 video into the converter, or click "Select Files". Files up to 100MB are supported.' },
      { name: 'Select WebM as output', text: 'Choose WebM from the output format dropdown. The video is re-encoded to VP9 with Opus audio.' },
      { name: 'FFmpeg converts in your browser', text: 'FFmpeg.wasm decodes the H.264 and re-encodes as VP9 WebM on your device. Nothing is uploaded.' },
      { name: 'Download the WebM', text: 'Save the WebM file, ready to serve on your website or embed in an HTML5 video element.' },
    ],
    whyChooseUs: [
      { title: 'Smaller files for faster sites', text: 'VP9 WebM is typically 25–40% smaller than H.264 MP4 at matching quality, cutting bandwidth and improving load times.' },
      { title: 'Royalty-free for the open web', text: 'WebM uses VP9 and Opus — no patent licensing fees, which is why browsers and CDNs adopted it for the web.' },
      { title: '100% private — no upload', text: 'Your video is processed in the browser tab with FFmpeg.wasm. It never touches a server, so unreleased product or marketing footage stays confidential.' },
    ],
    faqs: [
      { q: 'Why convert MP4 to WebM for my website?', a: 'WebM with the VP9 codec is usually 25–40% smaller than an H.264 MP4 of the same quality, so pages load faster and use less bandwidth. WebM is also royalty-free, which is why it became the web\'s preferred format. The common best practice is to serve WebM with an MP4 fallback so every browser is covered.' },
      { q: 'Will I lose quality converting MP4 to WebM?', a: 'It is a re-encode (H.264 to VP9), so technically there is a small lossy step. In practice VP9 is so efficient that a well-encoded WebM looks essentially identical to the MP4 source at a smaller file size. The visible difference is negligible for normal web playback.' },
      { q: 'Do all browsers support WebM?', a: 'WebM is supported in Chrome, Firefox, Edge, Opera, and Android, and in Safari on recent macOS and iOS versions. For maximum coverage on older Apple devices, serve WebM with an MP4 fallback in your HTML5 video element.' },
      { q: 'Is the conversion slower than other formats?', a: 'Yes — VP9 encoding is computationally heavier than simply copying streams, so MP4 to WebM takes longer than a container-only repackage. Expect roughly real-time or a bit slower depending on resolution and your device.' },
      { q: 'Are my videos uploaded to a server?', a: 'No. FFmpeg.wasm runs entirely in your browser. Your MP4 is processed on your device and never uploaded, stored, or logged.' },
      { q: 'What audio codec does the WebM use?', a: 'WebM output uses Opus, a modern, efficient, royalty-free audio codec that pairs naturally with VP9 and is supported across the same browsers.' },
      { q: 'What is the maximum file size?', a: '100MB per file. For large videos or batch encoding of an entire site\'s media, a desktop tool like FFmpeg has no memory ceiling and is better suited.' },
      { q: 'Should I use WebM or MP4 for social media uploads?', a: 'Use MP4. Social platforms expect MP4/H.264 and will re-encode anyway. WebM is specifically for serving video on your own website where smaller files and faster loads matter.' },
    ],
    useCases: [
      'Serve smaller, faster-loading background and hero videos on your website',
      'Produce a royalty-free WebM source for HTML5 <video> elements with an MP4 fallback',
      'Reduce video bandwidth costs and improve Core Web Vitals page-speed scores',
      'Optimize product demos and marketing clips for embedding on landing pages',
    ],
    article: [
      {
        heading: 'Why the web prefers WebM over MP4',
        paragraphs: [
          'MP4 with H.264 is the universal delivery format — it plays on every device, which is exactly why it dominates downloads, social media, and editing. But "universal" and "optimal for a website" are not the same thing. When you are the one paying for bandwidth and chasing fast page loads, the efficiency of the codec matters more than playing on a fifteen-year-old phone.',
          'WebM was created to be the open web\'s native video format. It wraps royalty-free codecs — VP9 and increasingly AV1 — and is built into every modern browser without the patent-licensing baggage H.264 carries. For a site owner, the practical payoff is smaller files: a VP9 WebM is frequently 25–40% lighter than the equivalent H.264 MP4 while looking the same to viewers.',
          'Smaller video is not a vanity metric. It directly improves Largest Contentful Paint and overall Core Web Vitals, reduces your CDN bill, and makes the experience smoother for visitors on mobile data. Converting MP4 to WebM is one of the highest-leverage video optimisations you can make for a website.',
        ],
      },
      {
        heading: 'VP9 and Opus: the codecs you are switching to',
        paragraphs: [
          'When you convert MP4 to WebM here, the H.264 video is re-encoded to VP9 and the audio to Opus. VP9 is Google\'s successor to VP8 and competes directly with HEVC on efficiency — it squeezes the same visual quality into noticeably fewer bits. Opus is, by most measures, the best general-purpose audio codec available, excelling at both speech and music across a wide range of bitrates.',
          'Both are royalty-free, which is the whole point. H.264 and HEVC are encumbered by patent pools that charge licensing fees to certain distributors and hardware makers; VP9 and Opus carry none of that, which is why browsers, YouTube, and CDNs embraced them for serving video at massive scale.',
          'The trade-off is encoding effort. VP9 is more computationally demanding to encode than H.264, so the conversion takes longer — you are buying smaller, cheaper-to-serve files with a one-time cost in encoding time. For web assets you encode once and serve millions of times, that is an easy trade.',
        ],
      },
      {
        heading: 'The right way to use WebM: progressive enhancement',
        paragraphs: [
          'WebM should rarely be your only video file. The professional pattern is progressive enhancement inside an HTML5 `<video>` element: list a WebM source first and an MP4 source second. Browsers that understand WebM grab the smaller, faster file; everything else falls back to the universally compatible MP4. The visitor never knows the difference — they just get the best file their browser can play.',
          'This belt-and-braces approach means you never have to worry about an older Safari version or an unusual device failing to load your video. You get the bandwidth savings of WebM for the majority of traffic and the bulletproof compatibility of MP4 for the rest.',
          'It also future-proofs your markup. As AV1 support spreads, you can add an AV1 source above WebM for even better compression, and browsers will simply pick the best option in the list. The fallback chain is the durable, correct way to ship web video.',
        ],
      },
      {
        heading: 'Quality, bitrate, and not over-compressing',
        paragraphs: [
          'Converting MP4 to WebM is a true re-encode, decoding H.264 back to pixels and compressing again with VP9. That is a lossy step, so the golden rule is to start from the highest-quality MP4 you have rather than a file that has already been compressed several times. Garbage in, garbage out applies doubly to video.',
          'Because VP9 is so efficient, you can usually keep the same resolution and frame rate and still end up with a smaller file at visually identical quality. There is rarely a reason to crank the bitrate sky-high — that just erodes the size advantage WebM exists to give you. A sensible quality target preserves what viewers notice while keeping the file lean.',
          'If you are serving the same video at multiple sizes, encode each resolution from the original master rather than upscaling a small version. Upscaling never adds real detail; it only adds bytes.',
        ],
      },
      {
        heading: 'Encoding time and the 100MB browser limit',
        paragraphs: [
          'Running VP9 encoding through FFmpeg.wasm in a browser tab is impressive, but it is slower than a native desktop encoder and bound by the tab\'s available memory. FileConvertir handles MP4s up to 100MB, which is plenty for the short hero clips, product demos, and looping background videos that benefit most from WebM.',
          'For a long-form video, a large library, or a build pipeline that needs to spit out dozens of optimised clips, command-line FFmpeg on your machine is the better tool — no size ceiling, scriptable batch processing, and access to two-pass encoding for tighter quality control. The browser converter shines for the quick, private, one-off web asset.',
          'A reasonable workflow for a website is to trim and master your clip first, keep it under 100MB, convert it to WebM here for the privacy and convenience, and pair it with an MP4 fallback you already have.',
        ],
      },
      {
        heading: 'Privacy for unreleased and marketing footage',
        paragraphs: [
          'The videos most worth optimising for a website are often the ones you least want leaked: a product reveal, a campaign teaser, a customer testimonial under embargo. Uploading those to an anonymous online converter means handing a copy to a third party — a real risk for anything pre-launch or covered by an NDA.',
          'Because FileConvertir performs the entire conversion with FFmpeg.wasm inside your browser, the MP4 never leaves your device. There is no upload, no server-side copy, and nothing to leak. You get web-optimised WebM output with the same confidence as if you had run a local tool, which makes it a safe default for exactly the high-stakes marketing footage that benefits most from conversion.',
        ],
      },
    ],
    isPriority: true,
  },

  'mp4-to-wav': {
    title: 'MP4 to WAV Converter — Extract Lossless Audio | FileConvertir',
    metaDescription:
      'Convert MP4 to WAV free online — no upload, no signup. Extract an uncompressed audio track for editing in Audacity, Premiere or any DAW. 100% private, browser-based.',
    heading: 'MP4 to WAV Converter',
    description:
      'Extract the audio from an MP4 video as an uncompressed WAV file, ready for editing in any DAW or video editor. Ideal for podcasts, voice-overs, and post-production. Runs entirely in your browser — no upload.',
    longDescription:
      'When you plan to edit the audio from a video — cleaning up a podcast, mixing a voice-over, syncing dialogue in post — you want it in an uncompressed format that will not degrade as you work. WAV is the standard: it stores raw PCM audio that every editor and DAW (Audacity, Premiere Pro, DaVinci Resolve, Logic, Reaper, Pro Tools) accepts natively, with no codec decode overhead and no re-compression artefacts during editing. Extracting MP4 to WAV decodes the video\'s AAC audio track and writes it as PCM, giving you a clean working file. FileConvertir does this with FFmpeg.wasm in your browser — the video stays on your device, with no upload and no account.',
    howToSteps: [
      { name: 'Drop your MP4 file', text: 'Drag your .mp4 video into the converter, or click "Select Files". Files up to 100MB are supported.' },
      { name: 'Select WAV as output', text: 'Choose WAV from the output format dropdown. Only the audio track is extracted and written as uncompressed PCM.' },
      { name: 'FFmpeg decodes locally', text: 'FFmpeg.wasm separates the audio stream and writes a WAV file on your device. Nothing is uploaded.' },
      { name: 'Download the WAV', text: 'Save the WAV and import it into Audacity, your DAW, or your video editor for editing.' },
    ],
    whyChooseUs: [
      { title: 'Uncompressed audio for clean editing', text: 'WAV stores raw PCM, so editing, filtering, and mixing introduce no codec artefacts. It is the format DAWs are designed to work with.' },
      { title: 'Universal in every editor', text: 'Audacity, Premiere, Resolve, Logic, Reaper, Pro Tools, and Audition all accept WAV natively — no import errors, no plugins.' },
      { title: '100% private — no upload', text: 'FFmpeg.wasm processes the MP4 in your browser tab. Interviews, voice notes, and unreleased audio never leave your device.' },
    ],
    faqs: [
      { q: 'Why extract MP4 audio to WAV instead of MP3?', a: 'WAV is uncompressed, so it is the right choice when you intend to edit the audio. Editing a lossy MP3 and re-exporting stacks compression on compression, degrading quality. Working in WAV avoids that — you only compress once, at the very end, when you export your finished audio.' },
      { q: 'Does converting MP4 to WAV improve the audio quality?', a: 'No. The MP4\'s audio is compressed AAC, and decoding it to WAV gives you the exact same audio as uncompressed PCM. You will not recover detail lost in the original encoding, but you will have a lossless working file that does not degrade further as you edit.' },
      { q: 'Why is the WAV file so much bigger than the MP4?', a: 'WAV is uncompressed — roughly 10MB per minute for CD-quality stereo. A small MP4 can produce a large WAV because all the compression is removed. This is expected and is exactly what makes WAV good for editing.' },
      { q: 'Are my videos uploaded to a server?', a: 'No. FFmpeg.wasm runs entirely in your browser. The MP4 is processed on your device and is never uploaded, stored, or logged.' },
      { q: 'Can I import the WAV into Audacity or Premiere?', a: 'Yes. WAV is the most universally supported audio format. Audacity, Adobe Premiere Pro, DaVinci Resolve, Logic Pro, Reaper, and Pro Tools all import it directly without any plugins or conversions.' },
      { q: 'What sample rate and bit depth does the WAV use?', a: 'The WAV preserves the source audio\'s sample rate (commonly 44.1 kHz or 48 kHz) and is written as standard PCM. 48 kHz is typical for video, which is convenient since most video editors work at 48 kHz.' },
      { q: 'What is the maximum MP4 file size?', a: '100MB per file. Because WAV output is large and uncompressed, long videos quickly exceed practical limits — for hour-long recordings, use desktop FFmpeg, which has no memory ceiling.' },
      { q: 'Can I do this on a phone?', a: 'Yes — open FileConvertir in Safari or Chrome on your phone, select the MP4, and extract the WAV. All processing happens on the device, though large WAV files are easier to handle on a computer.' },
    ],
    useCases: [
      'Extract dialogue or voice-over from a video for editing and mixing in a DAW',
      'Pull a podcast interview\'s audio from an MP4 recording into Audacity for cleanup',
      'Get an uncompressed audio track to sync with footage in Premiere or DaVinci Resolve',
      'Prepare video audio for mastering before exporting a final distribution file',
    ],
    article: [
      {
        heading: 'When you should reach for WAV, not MP3',
        paragraphs: [
          'Extracting audio from a video comes in two flavours, and choosing the wrong one wastes either quality or space. If you just want to listen — a lecture on your commute, music from a clip — MP3 is the obvious answer: small, portable, plays everywhere. But if you intend to edit the audio, WAV is the correct choice, and the reason is compounding compression.',
          'Every time you edit a lossy file like MP3 and export it again, you re-compress audio that was already compressed, throwing away a little more detail with each round trip. Do this a few times — trim, denoise, level, export — and the degradation becomes audible. WAV sidesteps the problem entirely by storing raw, uncompressed PCM that you can edit freely without any generational loss.',
          'The professional rule of thumb is simple: edit in WAV, deliver in MP3 (or AAC). You keep everything lossless during the work and compress exactly once, at the very end, when you export the finished file.',
        ],
      },
      {
        heading: 'What WAV actually is',
        paragraphs: [
          'WAV is not really a codec in the usual sense — it is a container for uncompressed PCM (pulse-code modulation) audio, the raw digital representation of sound. There is no clever compression discarding inaudible detail; every sample is stored exactly as captured. That is why WAV is the lingua franca of audio editing: there is nothing to decode, nothing to second-guess, and no artefacts to fight.',
          'The cost is size. CD-quality stereo WAV runs about 10MB per minute, so a short video can yield a surprisingly large audio file. That is not a flaw — it is the direct consequence of keeping every bit of audio data. The size is the price of an editing-grade master, and storage is cheap compared to re-recording.',
          'WAV also cleanly preserves the source sample rate and bit depth. Since most video is mastered at 48 kHz, the extracted WAV typically lands at 48 kHz too, which happens to be the native rate most video editors and DAWs expect — one less thing to convert.',
        ],
      },
      {
        heading: 'Honest expectations: extraction does not add quality',
        paragraphs: [
          'It is important to be clear-eyed about what this conversion can and cannot do. The audio inside an MP4 is compressed AAC. Decoding it to WAV gives you a faithful, uncompressed copy of that AAC audio — but it cannot recreate the detail the original AAC encoder discarded. A WAV made from a lossy source is lossless going forward, not lossless looking backward.',
          'So WAV does not make a mediocre recording sound better; it makes a working copy that will not get any worse as you edit. Think of it as a stable foundation rather than a quality upgrade. Anyone promising that converting to WAV "restores" or "enhances" compressed audio is mistaken.',
          'The genuine, real value is in the editing workflow: you can apply filters, cut, and mix as many times as you like, and the audio only takes its single, final compression hit when you export. That is exactly what makes WAV the right intermediate format.',
        ],
      },
      {
        heading: 'Dropping it into Audacity, Premiere, and your DAW',
        paragraphs: [
          'WAV is the most universally supported audio format in existence, so the extracted file imports cleanly into Audacity, Adobe Premiere Pro, DaVinci Resolve, Logic Pro, Reaper, Pro Tools, and Adobe Audition without plugins, conversions, or import errors. This is a big part of why people convert to WAV in the first place — MP4 audio sometimes refuses to import directly, while WAV never does.',
          'In Audacity, a WAV opens instantly as an editable waveform ready for noise reduction, compression, and level adjustment — the typical podcast cleanup chain. In a video editor, a WAV at 48 kHz drops straight onto the timeline in sync with your footage, which is invaluable when you are replacing or sweetening the original audio track.',
          'For dialogue work, the lossless WAV means you can de-ess, gate, and EQ aggressively without compression artefacts muddying the result. You hear exactly what your edits do, not what a lossy codec layered on top.',
        ],
      },
      {
        heading: 'A practical podcast and post-production workflow',
        paragraphs: [
          'A common real-world scenario is a recorded video interview that you want to release as a clean podcast episode. The workflow is straightforward: extract the MP4\'s audio to WAV here, import it into Audacity or your DAW, remove background noise, level the voices, trim the dead air, then export a final MP3 or AAC for distribution. You edited losslessly and compressed only once.',
          'The same pattern applies to film and video post-production. Editors extract the production audio to WAV to clean it, mix it with music and effects, and master it, then marry the polished mix back to the picture. WAV is the connective tissue between "captured in a video" and "professionally finished."',
          'Keeping a WAV master is also smart archival practice. If you later need a different deliverable — a louder version for a noisy platform, a mono cut for a phone-line bumper — you re-export from the lossless WAV rather than degrading an already-compressed file.',
        ],
      },
      {
        heading: 'File size, the 100MB limit, and privacy',
        paragraphs: [
          'Because WAV is uncompressed, output files are large, and that interacts with the in-browser converter\'s 100MB input ceiling. Short videos extract comfortably, but a long recording both pushes the input near the limit and produces a hefty WAV. For hour-long interviews or full lectures, desktop FFmpeg — which has no memory ceiling and can extract audio in seconds — is the better tool.',
          'For everything shorter, the browser converter is ideal precisely because the audio you most want to edit is often the most sensitive: an interview under embargo, a confidential meeting, an unreleased voice-over. FFmpeg.wasm runs entirely in your browser tab, so the video and its audio never leave your device. There is no upload, no third-party copy, and nothing to leak — you get an editing-ready WAV with the privacy of a local tool.',
        ],
      },
    ],
    isPriority: true,
  },
};
