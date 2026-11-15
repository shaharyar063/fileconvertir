import type { FormatSEO } from '../types';

/** Hand-written hub pages for audio and video formats. */

export const MEDIA_SOURCE_HUBS: Record<string, FormatSEO> = {
  mp3: {
    title: 'MP3 Converter — Convert MP3 to WAV and More',
    metaDescription:
      'Convert MP3 audio to WAV, AAC, OGG, FLAC or M4A in your browser. Free and private, with no upload. Lossy MP3 cannot regain quality in a lossless format.',
    heading: 'MP3 File Converter',
    description:
      'Convert MP3 files to WAV and other audio formats without uploading them anywhere.',
    details:
      'MP3 (MPEG-1 Audio Layer III) is the lossy audio format that made digital music portable. It discards sounds that are hard to hear to shrink files to roughly a tenth of CD size: at 128 kbps a minute of stereo audio is about 1 MB. Every player, phone and car stereo plays it.',
    longDescription:
      'You usually convert an MP3 because an editor, a device or a project asks for a different container, most often WAV. Remember that MP3 has already thrown information away. Converting it to WAV or FLAC gives you a file that is lossless going forward and easy to edit, but it cannot bring back what the MP3 lost, and the file will be about ten times bigger. Converting to another lossy format such as AAC or OGG adds a second round of compression, so prefer to keep the original recording when you have one.',
    useCases: [
      'Open an MP3 in an audio editor or a video project that wants WAV',
      'Prepare a track for a device or app that does not support MP3',
      'Make an uncompressed copy to edit without further quality loss',
    ],
    faqs: [
      {
        q: 'Will a WAV made from an MP3 sound better?',
        a: 'No. WAV is uncompressed, but it only stores what the MP3 already contains. It will sound the same and take up around ten times the space.',
      },
      {
        q: 'Is converting MP3 to another lossy format a good idea?',
        a: 'Avoid it where possible. Each lossy encode removes more detail, so MP3 to AAC or OGG is slightly worse than the original. Convert from the source recording if you have it.',
      },
      {
        q: 'Why does the first conversion take longer?',
        a: 'Audio conversion uses FFmpeg compiled for the browser, a download of roughly 30 MB the first time. After that it is cached for the session.',
      },
      {
        q: 'Are my files uploaded?',
        a: 'No. The conversion runs on your device.',
      },
    ],
  },

  wav: {
    title: 'WAV Converter — Convert WAV to MP3 or FLAC',
    metaDescription:
      'Convert WAV audio to MP3 or FLAC in your browser. Free and private, with no upload. MP3 makes files much smaller, FLAC keeps full quality.',
    heading: 'WAV File Converter',
    description:
      'Shrink WAV recordings to MP3, or keep them lossless as FLAC, without uploading anything.',
    details:
      'WAV is an uncompressed audio container from Microsoft and IBM dating to 1991. CD-quality stereo (44.1 kHz, 16-bit) takes about 10 MB per minute, so recordings and exports get large quickly. It is a standard format in recording software and audio editors because nothing has been thrown away.',
    longDescription:
      'The choice here is between size and fidelity. MP3 makes a WAV roughly a tenth of its size, which suits sharing, podcasts and streaming. FLAC compresses losslessly, typically to about half the size, and you can turn it back into an identical WAV. If you plan to keep editing the audio, stay with WAV or FLAC and make the MP3 last.',
    useCases: [
      'Make a recording small enough to email or upload as MP3',
      'Archive a master as FLAC to save disk space without losing quality',
      'Prepare voice recordings and podcast episodes for publishing',
    ],
    faqs: [
      {
        q: 'How much smaller is an MP3 than a WAV?',
        a: 'Typically around a tenth of the size. A three-minute CD-quality WAV of about 30 MB becomes roughly 3 MB as a 128 kbps MP3.',
      },
      {
        q: 'Is FLAC really lossless?',
        a: 'Yes. FLAC compresses without discarding anything, so converting it back to WAV gives identical audio. Files are usually 50 to 60 per cent of the WAV size.',
      },
      {
        q: 'Can I choose the MP3 bitrate?',
        a: 'Not currently. MP3 files are encoded with FFmpeg\'s default quality settings.',
      },
    ],
  },

  flac: {
    title: 'FLAC Converter — Convert FLAC to MP3',
    metaDescription:
      'Convert FLAC to MP3 in your browser for phones, cars and players that do not support FLAC. Free, private, no upload. Expect a lossy, much smaller file.',
    heading: 'FLAC File Converter',
    description:
      'Convert FLAC files to MP3 so they play on any device.',
    details:
      'FLAC (Free Lossless Audio Codec) compresses audio without discarding any information, typically to about half the size of the equivalent WAV. It is the usual choice for ripped CDs and high-resolution music libraries. Support is good on computers and many phones, but patchy in older cars, players and some apps.',
    longDescription:
      'Converting FLAC to MP3 trades fidelity for compatibility and size. The MP3 is lossy and far smaller, which is what you want for a phone, a car or a shared folder. Keep the FLAC originals as your master and treat the MP3s as disposable copies, because converting back would not restore what the MP3 discarded.',
    useCases: [
      'Put part of a lossless library onto a player that cannot read FLAC',
      'Create smaller copies of tracks for sharing',
      'Free up space on a phone while keeping the FLAC masters elsewhere',
    ],
    faqs: [
      {
        q: 'Will the MP3 sound worse than the FLAC?',
        a: 'Technically yes, because MP3 is lossy. At typical bitrates the difference is subtle on most equipment, but the MP3 is not a substitute for the master.',
      },
      {
        q: 'Do I lose tags and cover art?',
        a: 'Conversion may not carry every tag across, and embedded cover art is not guaranteed to survive. Check the result in your player.',
      },
    ],
  },

  ogg: {
    title: 'OGG Converter — Convert OGG to MP3',
    metaDescription:
      'Convert OGG Vorbis audio to MP3 in your browser for wider device support. Free, private and no upload. Note that this adds a second lossy encode.',
    heading: 'OGG File Converter',
    description:
      'Convert OGG audio to MP3 so it plays on devices and apps that skip OGG.',
    details:
      'OGG is an open container, most often holding Vorbis audio. It was designed as a free alternative to MP3 and delivers similar or slightly better quality at the same bitrate. It is common in games, Linux software and some web audio, but Apple devices and many car stereos do not play it.',
    longDescription:
      'People convert OGG to MP3 to get a file that works everywhere. Both formats are lossy, so the conversion decodes the OGG and re-encodes it, which costs a little more quality. If you have the original source recording, converting from that gives a better result.',
    useCases: [
      'Play game or Linux audio on an iPhone or in a car',
      'Send a recording to someone whose app does not accept OGG',
      'Get an MP3 for a video editor that cannot import OGG',
    ],
    faqs: [
      {
        q: 'Is converting OGG to MP3 lossy?',
        a: 'Yes. Both are lossy, so the audio is decoded and compressed a second time. At normal bitrates the change is small, but it is not lossless.',
      },
      {
        q: 'Why do Apple devices not play OGG?',
        a: 'Apple has historically not included OGG Vorbis support in its media frameworks, which is the main reason people convert to MP3 or M4A.',
      },
    ],
  },

  aac: {
    title: 'AAC Converter — Convert AAC to MP3',
    metaDescription:
      'Convert AAC audio files to MP3 in your browser. Free, private, no upload. A second lossy encode slightly reduces quality, so use the original if you can.',
    heading: 'AAC File Converter',
    description:
      'Convert AAC audio to MP3 for players and apps that only know MP3.',
    details:
      'AAC (Advanced Audio Coding) was designed as the successor to MP3 and generally sounds better at the same bitrate. It is the default audio format on iPhones and in YouTube and streaming services. Raw .aac files are less common than AAC inside an M4A or MP4 container.',
    longDescription:
      'A standalone .aac file can be refused by some editors, older players and upload forms, while MP3 is accepted nearly everywhere. Converting re-encodes the audio into MP3, so there is a small additional loss. If your file is really an M4A, use the M4A converter instead.',
    useCases: [
      'Open an AAC recording in software that only accepts MP3',
      'Share audio with someone using an older device',
      'Prepare audio for a form or platform that lists MP3 as its only option',
    ],
    faqs: [
      {
        q: 'What is the difference between AAC and M4A?',
        a: 'AAC is the audio codec; M4A is a container, usually holding AAC audio. Both are handled here, each by its own converter.',
      },
      {
        q: 'Will the sound quality drop?',
        a: 'Slightly. Converting between two lossy formats re-encodes the audio. At normal bitrates most listeners will not notice, but the MP3 is not as good as the source.',
      },
    ],
  },

  m4a: {
    title: 'M4A Converter — Convert M4A to MP3 or WAV',
    metaDescription:
      'Convert M4A audio to MP3 or WAV in your browser. Free and private, with no upload. Handy for iPhone voice memos and iTunes purchases.',
    heading: 'M4A File Converter',
    description:
      'Convert M4A files, such as iPhone voice memos, to MP3 or WAV.',
    details:
      'M4A is the audio-only form of the MP4 container, typically carrying AAC audio. Apple uses it for iTunes purchases, Voice Memos and GarageBand exports. It can also hold Apple Lossless (ALAC) audio. Many non-Apple tools and older devices handle it poorly.',
    longDescription:
      'Convert to MP3 for the widest compatibility and a small file, or to WAV if you want to edit the audio in software that expects uncompressed input. A WAV made from AAC audio is uncompressed but still reflects the original lossy compression, so it will not sound better and will be much larger.',
    useCases: [
      'Share an iPhone voice memo with someone who does not use Apple devices',
      'Import audio into an editor that does not read M4A',
      'Move purchased tracks to a player that only supports MP3',
    ],
    faqs: [
      {
        q: 'Can I convert voice memos from my iPhone?',
        a: 'Yes. Voice memos are M4A files. Save one to Files, then drop it into the converter.',
      },
      {
        q: 'Does DRM-protected M4A work?',
        a: 'No. Files protected by DRM cannot be decoded. Most current iTunes purchases are DRM-free and work normally.',
      },
    ],
  },

  mp4: {
    title: 'MP4 Converter — Extract Audio or Convert to WebM',
    metaDescription:
      'Convert MP4 video to MP3 or WAV audio, or re-encode it as WebM, in your browser. Free and private with no upload. Large videos can take a while.',
    heading: 'MP4 File Converter',
    description:
      'Extract audio from an MP4 or convert it to WebM, entirely on your device.',
    details:
      'MP4 (MPEG-4 Part 14) is the container used for most online video. It usually carries H.264 video and AAC audio, and nearly every phone, TV and browser can play it. The container itself is only a wrapper; compatibility depends on the codecs inside.',
    longDescription:
      'The common job here is pulling the soundtrack out of a video as MP3 or WAV. Converting to WebM re-encodes the video with VP8, an open codec that some web platforms prefer. Video conversion runs in the browser with FFmpeg compiled to WebAssembly, so it is much slower than desktop software: expect minutes rather than seconds for long clips. It also needs enough memory, so very large videos may fail on phones. Keep files under the 100 MB limit.',
    useCases: [
      'Save the audio of a lecture, interview or concert as MP3',
      'Get a WAV soundtrack to use in an editor',
      'Produce a WebM for a website that serves it',
    ],
    faqs: [
      {
        q: 'Why is video conversion slow?',
        a: 'The conversion runs inside your browser using WebAssembly, which is considerably slower than desktop software and uses a single thread. A short clip takes a short time; a long one can take many minutes.',
      },
      {
        q: 'Will the WebM be lower quality?',
        a: 'It is re-encoded with fast settings chosen to keep browser memory use low, so expect some loss compared to the original. Keep the MP4 if quality matters.',
      },
      {
        q: 'What is the size limit?',
        a: 'Up to 100 MB per file. Browsers on phones may run out of memory before that on long or high-resolution video.',
      },
    ],
  },

  mov: {
    title: 'MOV Converter — Convert MOV to MP4 or MP3',
    metaDescription:
      'Convert MOV video to MP4, or extract the audio as MP3, in your browser. Free, private, no upload. Works for iPhone recordings under 100 MB.',
    heading: 'MOV File Converter',
    description:
      'Turn MOV videos from iPhones and Macs into MP4, or pull out the audio as MP3.',
    details:
      'MOV is Apple\'s QuickTime container. iPhones and Macs record into it, and it plays smoothly across Apple software. Outside that ecosystem, support is less reliable, and large iPhone recordings can use HEVC video that older Windows software cannot decode.',
    longDescription:
      'Converting MOV to MP4 re-encodes the video as H.264 with AAC audio, the combination that plays nearly everywhere. It uses fast settings to keep memory use manageable in a browser, so the result is smaller but of somewhat lower quality than the source, and long clips take a while. Very long or high-resolution clips may exceed what a browser can handle, so trim them first if a conversion fails.',
    useCases: [
      'Share an iPhone video with someone on Windows or Android',
      'Upload a recording to a site that rejects MOV',
      'Extract the audio of a clip as MP3',
    ],
    faqs: [
      {
        q: 'Will the MP4 look as good as the MOV?',
        a: 'Slightly worse. The video is re-encoded with fast, memory-friendly settings, which trades some quality for speed. Keep the original for archives.',
      },
      {
        q: 'Is there a size limit?',
        a: 'Files can be up to 100 MB. Longer iPhone recordings usually exceed that, so trim them first.',
      },
      {
        q: 'Do I need to install anything?',
        a: 'No. Conversion runs in the browser. The first video or audio conversion downloads the converter engine, about 30 MB.',
      },
    ],
  },

  mkv: {
    title: 'MKV Converter — Convert MKV to MP4',
    metaDescription:
      'Convert MKV video to MP4 in your browser for TVs, phones and editors that cannot open Matroska. Free, private, no upload, up to 100 MB per file.',
    heading: 'MKV File Converter',
    description:
      'Convert MKV videos to MP4 so they play on more devices.',
    details:
      'MKV is the Matroska container, an open format that can hold any number of video, audio and subtitle tracks. It is popular for ripped media and downloads, but many TVs, phones and editing tools do not play it directly.',
    longDescription:
      'This converter re-encodes the video as H.264 with AAC audio inside an MP4. Because it re-encodes rather than just re-wrapping, it takes time and the picture loses a little quality. Only one video and one audio track are kept: extra audio tracks are dropped and subtitles are not guaranteed to survive. If your player only needed a different container, a desktop tool that remuxes without re-encoding will be faster and lossless.',
    useCases: [
      'Play an MKV on a TV or phone that does not support Matroska',
      'Import MKV footage into an editor that expects MP4',
      'Reduce the size of a short clip',
    ],
    faqs: [
      {
        q: 'Are subtitles and extra audio tracks kept?',
        a: 'Only one video and one audio track are kept, so extra audio tracks are dropped. Subtitles are not guaranteed to carry over, so check the result.',
      },
      {
        q: 'Is this lossless?',
        a: 'No. The video is re-encoded, which loses some quality. A tool that only changes the container can avoid that.',
      },
      {
        q: 'Why did a large file fail?',
        a: 'Files are limited to 100 MB, and browsers need memory to hold both the source and the result. Try a shorter clip.',
      },
    ],
  },

  avi: {
    title: 'AVI Converter — Convert AVI to MP4',
    metaDescription:
      'Convert old AVI videos to MP4 in your browser. Free and private with no upload. Works on files up to 100 MB; longer videos can take time.',
    heading: 'AVI File Converter',
    description:
      'Convert AVI videos to MP4 for modern phones, TVs and players.',
    details:
      'AVI is a container Microsoft introduced in 1992. It was the standard on Windows for years, and many old camcorder clips and downloads are still in it. It is inefficient by today\'s standards and does not handle modern features well, so newer devices often skip it.',
    longDescription:
      'The conversion re-encodes an AVI as H.264 video with AAC audio in an MP4. That makes it playable on phones and TVs and often smaller, though the re-encode costs some quality. Old AVIs sometimes contain obscure codecs; if one fails to convert, the codec is likely outside what the browser\'s FFmpeg build includes.',
    useCases: [
      'Make old camcorder footage playable on a phone',
      'Upload a legacy video to a site that wants MP4',
      'Reduce the size of an old, uncompressed AVI',
    ],
    faqs: [
      {
        q: 'Why did my AVI fail to convert?',
        a: 'Old AVIs can use rare codecs. If the converter reports an error, the file likely uses a codec the browser build of FFmpeg does not support.',
      },
      {
        q: 'Will the MP4 be smaller?',
        a: 'Usually, especially for old uncompressed or lightly compressed AVIs.',
      },
    ],
  },

  webm: {
    title: 'WebM Converter — Convert WebM to MP4',
    metaDescription:
      'Convert WebM video to MP4 in your browser so it plays on iPhones, TVs and editors. Free, private, no upload. Limit of 100 MB per file.',
    heading: 'WebM File Converter',
    description:
      'Turn WebM videos into MP4 for devices that do not play WebM.',
    details:
      'WebM is an open video format Google introduced in 2010, built on the Matroska container with VP8, VP9 or AV1 video and Vorbis or Opus audio. Browsers play it well, which is why screen recorders and web tools often produce it, but some phones, TVs and editors do not.',
    longDescription:
      'Browser-based recorders such as screen capture tools often output WebM, and then the file will not open in your editor or on your phone. Converting to MP4 re-encodes the video as H.264 with AAC audio, which works almost everywhere. It runs in your browser, so longer recordings take time and the result is slightly lower quality than the source.',
    useCases: [
      'Make a browser screen recording playable in an editor',
      'Share a WebM clip with people on iPhones',
      'Upload a recording to a site that only accepts MP4',
    ],
    faqs: [
      {
        q: 'Why do screen recordings come out as WebM?',
        a: 'Many browser-based recorders use the browser\'s built-in recorder, which writes WebM. Converting to MP4 makes the file widely compatible.',
      },
      {
        q: 'Will the MP4 look worse?',
        a: 'A little. Re-encoding uses fast settings to keep browser memory use down, so some quality is lost versus the source.',
      },
    ],
  },
};

export const MEDIA_TARGET_HUBS: Record<string, FormatSEO> = {
  mp3: {
    title: 'Convert to MP3 — Audio and Video to MP3',
    metaDescription:
      'Convert WAV, M4A, AAC, OGG, FLAC, MP4 or MOV to MP3 in your browser. Free, private, with no upload. Extracts the audio from video files too.',
    heading: 'Convert to MP3',
    description:
      'Make an MP3 from other audio formats, or extract the soundtrack from a video.',
    details:
      'MP3 is the most compatible audio format in existence. It is lossy but compact, at about 1 MB per minute at 128 kbps, and every player, phone, car and website accepts it.',
    longDescription:
      'Converting to MP3 is the safe choice when you need audio to play anywhere or to fit a size limit. From lossless sources such as WAV and FLAC you trade fidelity for size. From other lossy sources such as AAC, M4A and OGG you add a second compression pass, so use the original recording if you have it. From MP4 and MOV, the converter extracts the soundtrack and drops the picture.',
    useCases: [
      'Save the audio of a video as MP3',
      'Make a lossless recording small enough to share',
      'Get a file that plays on every device and car stereo',
    ],
    faqs: [
      {
        q: 'What sources can I convert to MP3?',
        a: 'WAV, FLAC, AAC, M4A and OGG audio, and MP4 and MOV video, which have their own converters. The tool also accepts other video formats from the homepage.',
      },
      {
        q: 'Can I choose the bitrate?',
        a: 'Not at the moment. Files are encoded with FFmpeg\'s default MP3 settings.',
      },
      {
        q: 'Is the audio from a video extracted in full?',
        a: 'Yes, the whole soundtrack is converted. The video is dropped, so the MP3 is audio only.',
      },
    ],
  },

  wav: {
    title: 'Convert to WAV — MP3, M4A and MP4 to WAV',
    metaDescription:
      'Convert MP3, M4A or the audio of an MP4 video to uncompressed WAV in your browser. Free, private and no upload. Files are large by nature.',
    heading: 'Convert to WAV',
    description:
      'Create an uncompressed WAV from MP3, M4A or the audio of a video.',
    details:
      'WAV stores audio uncompressed, about 10 MB per minute for CD-quality stereo. It is the standard exchange format in recording and editing software because no processing has been applied.',
    longDescription:
      'WAV is the right target when software needs uncompressed input, such as an audio editor or a sampler. Be realistic about what it can do: converting a lossy source like MP3 or M4A to WAV does not restore quality, it just stores the already-compressed sound without further loss. Expect files roughly ten times larger.',
    useCases: [
      'Import audio into an editor, sampler or video project that needs WAV',
      'Get an uncompressed soundtrack from a video',
      'Avoid another lossy encode while editing',
    ],
    faqs: [
      {
        q: 'Does converting to WAV improve quality?',
        a: 'No. It preserves what the source already holds. A WAV made from an MP3 sounds the same as the MP3 but is much bigger.',
      },
      {
        q: 'What sample rate and bit depth are used?',
        a: 'The WAV is written as 16-bit PCM at the source\'s sample rate.',
      },
    ],
  },

  flac: {
    title: 'Convert to FLAC — WAV to FLAC',
    metaDescription:
      'Convert WAV audio to FLAC in your browser to save space without losing quality. Free, private and no upload. Lossless, about half the WAV size.',
    heading: 'Convert to FLAC',
    description:
      'Compress WAV recordings to FLAC without losing anything.',
    details:
      'FLAC is a lossless audio format: it shrinks audio, typically to 50 to 60 per cent of the WAV size, and decompresses to a bit-identical copy. It is open and widely supported on computers and many phones.',
    longDescription:
      'Use FLAC to archive recordings and masters where quality matters but disk space does too. It cannot improve a lossy source: converting an MP3 to FLAC gives a larger file with the same sound. Start from WAV or another lossless source to get the benefit.',
    useCases: [
      'Archive studio recordings at half the size',
      'Store a ripped CD library losslessly',
      'Keep editable masters compact',
    ],
    faqs: [
      {
        q: 'Is the audio identical to the WAV?',
        a: 'Yes. FLAC is lossless, so converting back to WAV gives the same audio data.',
      },
      {
        q: 'Should I convert MP3 to FLAC?',
        a: 'Only if a device or app demands FLAC. It will not restore any quality and will be several times larger than the MP3.',
      },
    ],
  },

  mp4: {
    title: 'Convert to MP4 — MOV, MKV, AVI, WebM to MP4',
    metaDescription:
      'Convert MOV, MKV, AVI or WebM video to MP4 in your browser. Free, private with no upload. Re-encodes to H.264, so long clips can take a while.',
    heading: 'Convert to MP4',
    description:
      'Make an MP4 from MOV, MKV, AVI or WebM so the video plays almost anywhere.',
    details:
      'MP4 is the most widely supported video format. With H.264 video and AAC audio it plays on practically every phone, TV, browser and editor, and upload sites accept it by default.',
    longDescription:
      'Each converter here re-encodes the video to H.264 with AAC audio. That guarantees compatibility but is not lossless, and conversion runs inside the browser with WebAssembly, so it is slower than desktop software. Files are limited to 100 MB. Only one video and one audio track are kept: extra audio tracks are dropped and subtitles may not survive.',
    useCases: [
      'Make an iPhone or camera clip play on any device',
      'Prepare footage for an editor or upload site that wants MP4',
      'Shrink a legacy AVI',
    ],
    faqs: [
      {
        q: 'Is the conversion lossless?',
        a: 'No. The video is re-encoded, with fast settings that favour speed and low memory use, so quality drops somewhat.',
      },
      {
        q: 'Why is it slow?',
        a: 'It runs in your browser on a single thread using WebAssembly, which is much slower than native software.',
      },
      {
        q: 'Are subtitles kept?',
        a: 'Not reliably. One video and one audio track are converted, and subtitles may not carry over, so check the result.',
      },
    ],
  },

  webm: {
    title: 'Convert to WebM — MP4 to WebM',
    metaDescription:
      'Convert MP4 video to WebM in your browser for web publishing. Free and private with no upload. Encoded with VP8 video and Opus audio.',
    heading: 'Convert to WebM',
    description:
      'Convert MP4 video to WebM for websites that prefer an open format.',
    details:
      'WebM is an open, web-oriented video format from Google that uses VP8, VP9 or AV1 video with Vorbis or Opus audio. It is well supported in browsers and is often smaller than MP4 for the same quality, but it does not play natively on many TVs and Apple devices.',
    longDescription:
      'The WebM files made here use VP8 video and Opus audio, which every WebM-capable browser plays. VP8 is the older WebM codec, so files are not as small as VP9 or AV1 would make them. Use WebM for web pages that you control; use MP4 when you need maximum compatibility.',
    useCases: [
      'Serve an open-format video on your own website',
      'Meet a platform requirement for WebM',
      'Create a small background video clip for a web page',
    ],
    faqs: [
      {
        q: 'Which codec is used for the video?',
        a: 'VP8. The newer VP9 encoder does not run reliably inside a browser, so use desktop software if you need VP9 or AV1.',
      },
      {
        q: 'Will it play on an iPhone?',
        a: 'Newer iOS and Safari versions play WebM in the browser, but support is not as universal as MP4. Test before relying on it.',
      },
    ],
  },
};
