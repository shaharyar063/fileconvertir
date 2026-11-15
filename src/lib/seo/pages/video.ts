import type { ConversionPage } from './types';

/**
 * Video conversion pages. Video is always re-encoded (H.264/AAC for MP4,
 * VP8/Opus for WebM) by FFmpeg running in the browser on one thread.
 */
export const VIDEO_PAGES: Record<string, ConversionPage> = {
  'mp4-to-mp3': {
    title: 'MP4 to MP3 Converter Online — Extract Audio Free',
    metaDescription:
      'Convert MP4 to MP3 online for free. Extract the audio from a video as a 192 kbps MP3 in your browser, with no upload or sign-up. Videos up to 100 MB.',
    heading: 'MP4 to MP3 Converter',
    description:
      'Convert MP4 to MP3 online for free: extract the audio from a video as a 192 kbps MP3. The video never leaves your device and no sign-up is needed; the limit is 100 MB.',
    steps: [
      { name: 'Add your MP4 video', text: 'Click Select Files or drop an MP4 onto the converter. Each file can be up to 100 MB.' },
      { name: 'Convert to MP3', text: 'Press Convert. The picture is discarded and the audio is encoded at 192 kbps. The first run downloads the media engine (about 30 MB).' },
      { name: 'Download', text: 'Save the MP3. It is a small fraction of the video\'s size.' },
    ],
    understanding: {
      paragraphs: [
        'An MP4 file is a container with separate tracks inside: one for the picture, one for the sound. Extracting audio means ignoring the video track entirely and working only on the audio track.',
        'The audio in an MP4 is nearly always AAC. It is decoded and encoded again as MP3 at a constant 192 kbps. Since both are lossy, there is a slight generational loss, which is not noticeable for speech and minor for music.',
        'The MP3 can only be as good as the video\'s soundtrack. A clip with low-bitrate audio will produce an MP3 that sounds the same, however high the MP3 bitrate.',
      ],
      graphics: [
        {
          kind: 'tracks',
          caption: 'Only the audio track is used. The video track is left out.',
          source: { name: 'MP4', tracks: ['Video (usually H.264)', 'Audio (usually AAC)'] },
          target: {
            name: 'MP3',
            tracks: [
              { label: 'Video', state: 'dropped' },
              { label: 'Audio as MP3, 192 kbps', state: 're-encoded' },
            ],
          },
        },
        {
          kind: 'sizeBars',
          caption: 'A five-minute 720p video at about 2 Mbps, and its audio as MP3.',
          unit: 'MB',
          bars: [
            { label: 'MP4 video', value: 75 },
            { label: 'MP3 audio at 192 kbps', value: 7.2, highlight: true },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Listening to a lecture or talk', text: 'Audio-only files are easier to play in the background, in a podcast app or in the car.' },
        { title: 'Saving a recorded call or meeting', text: 'If only the conversation matters, the MP3 is a tenth of the size and simple to share or transcribe.' },
        { title: 'Pulling music or a voice-over from your own video', text: 'The MP3 can be dropped into another project or playlist.' },
      ],
      keepOriginal:
        'Keep the MP4 when the picture matters or when you may want the audio at full quality later. For editing the audio, extracting to WAV avoids a second lossy encode.',
    },
    faqs: [
      { q: 'Is the video uploaded to extract the audio?', a: 'No. The file is processed in your browser, which is why there is a 100 MB limit.' },
      { q: 'What quality is the MP3?', a: 'A constant 192 kbps. It cannot exceed the quality of the audio already in the video.' },
      { q: 'My video is larger than 100 MB. What can I do?', a: 'Trim or compress it first, or use a desktop tool such as FFmpeg or VLC, which have no size limit.' },
      { q: 'Does it work with videos that have no sound?', a: 'No. If the MP4 has no audio track, there is nothing to extract and the conversion fails.' },
      { q: 'Can I extract only part of the audio?', a: 'Not here. The whole soundtrack is converted. Trim the MP3 afterwards in an audio editor.' },
    ],
  },

  'mp4-to-wav': {
    title: 'MP4 to WAV Converter Online — Extract Audio Free',
    metaDescription:
      'Convert MP4 to WAV online for free and extract uncompressed audio from a video for editing. Runs in your browser with no upload or sign-up. Up to 100 MB.',
    heading: 'MP4 to WAV Converter',
    description:
      'Convert MP4 to WAV online for free to extract uncompressed audio from a video for editing. The audio is pulled out in your browser, so nothing is uploaded; videos can be up to 100 MB.',
    steps: [
      { name: 'Add your MP4 video', text: 'Click Select Files or drop an MP4 onto the converter, up to 100 MB.' },
      { name: 'Convert to WAV', text: 'Press Convert. The audio track is decoded to 16-bit PCM and the video is discarded. The first run downloads the media engine.' },
      { name: 'Download', text: 'Save the WAV. It can be as large as the video itself.' },
    ],
    understanding: {
      paragraphs: [
        'This conversion drops the picture and decodes the soundtrack to raw samples: 16-bit PCM at the audio\'s original sample rate, which is 48 kHz for most video.',
        'Unlike extracting to MP3, nothing is compressed a second time. The WAV is exactly what the video\'s audio track decodes to. It is not better than the source, but it will not get worse as you edit and re-save it.',
        'Uncompressed audio is large. Stereo at 48 kHz takes about 11.5 MB per minute, so a long video can produce a WAV bigger than the MP4 it came from.',
      ],
      graphics: [
        {
          kind: 'tracks',
          caption: 'The audio track is decoded to PCM; the video track is left out.',
          source: { name: 'MP4', tracks: ['Video (usually H.264)', 'Audio (usually AAC, 48 kHz)'] },
          target: {
            name: 'WAV',
            tracks: [
              { label: 'Video', state: 'dropped' },
              { label: 'Audio as 16-bit PCM', state: 'decoded' },
            ],
          },
        },
        {
          kind: 'sizeBars',
          caption: 'Audio extracted from a five-minute video, stereo at 48 kHz.',
          unit: 'MB',
          bars: [
            { label: 'WAV, 16-bit', value: 57.6, highlight: true },
            { label: 'MP3 at 192 kbps, for comparison', value: 7.2 },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Cleaning up dialogue or an interview', text: 'Noise reduction, levelling and cutting are best done on uncompressed audio.' },
        { title: 'Sending audio to a mixing or mastering tool', text: 'Audio workstations take WAV as their standard input.' },
        { title: 'Feeding a transcription or analysis system', text: 'Many speech and audio-analysis tools specify WAV.' },
      ],
      keepOriginal:
        'If you just want to listen to the audio, extract to MP3 instead; it is about an eighth of the size. Keep the MP4 if you will need picture and sound together again.',
    },
    faqs: [
      { q: 'What sample rate and bit depth is the WAV?', a: '16-bit, at the sample rate of the video\'s audio track. That is normally 48 kHz.' },
      { q: 'Is the WAV better quality than an MP3 from the same video?', a: 'Slightly, because it avoids a second lossy encode. It still cannot exceed the quality of the audio in the video.' },
      { q: 'Why is the WAV bigger than my video?', a: 'Video audio is compressed. As WAV it is uncompressed, about 11.5 MB per minute in stereo.' },
      { q: 'Are multiple audio tracks extracted?', a: 'No. One audio track is converted.' },
    ],
  },

  'mp4-to-webm': {
    title: 'MP4 to WebM Converter Online — Free, No Upload',
    metaDescription:
      'Convert MP4 to WebM online for free with VP8 video and Opus audio for websites. Runs in your browser with no upload or sign-up. Videos up to 100 MB.',
    heading: 'MP4 to WebM Converter',
    description:
      'Convert MP4 to WebM online for free with VP8 video and Opus audio for websites. Encoded in your browser with no sign-up, so your video is not uploaded; the limit is 100 MB.',
    steps: [
      { name: 'Add your MP4 video', text: 'Click Select Files or drop an MP4 onto the converter. The limit is 100 MB per file.' },
      { name: 'Convert to WebM', text: 'Press Convert. Video is re-encoded with VP8 and audio with Opus. The first run downloads the media engine (about 30 MB).' },
      { name: 'Download', text: 'Save the WebM file when encoding finishes.' },
    ],
    understanding: {
      paragraphs: [
        'MP4 and WebM are both containers, but they hold different codecs. MP4 normally carries H.264 video with AAC audio. WebM carries VP8, VP9 or AV1 video with Vorbis or Opus audio, all of them open and royalty-free. Converting means decoding every frame and encoding it again.',
        'This converter writes VP8 video and Opus audio. VP8 is the original WebM codec: every browser that plays WebM plays it, and it encodes quickly enough to be practical in a browser. It is less efficient than the newer VP9, so the file is not always smaller than the MP4.',
        'Resolution and frame rate stay the same. The picture is re-encoded with a bitrate ceiling of about 2 Mbps, so high-resolution footage loses some detail.',
      ],
      graphics: [
        {
          kind: 'tracks',
          caption: 'Both tracks are decoded and encoded again in WebM\'s codecs.',
          source: { name: 'MP4', tracks: ['Video: H.264', 'Audio: AAC'] },
          target: {
            name: 'WebM',
            tracks: [
              { label: 'Video: VP8', state: 're-encoded' },
              { label: 'Audio: Opus', state: 're-encoded' },
            ],
          },
        },
        {
          kind: 'table',
          caption: 'MP4 and the WebM this converter produces.',
          columns: ['MP4', 'WebM output'],
          rows: [
            { label: 'Video codec', a: 'H.264 (usually)', b: 'VP8' },
            { label: 'Audio codec', a: 'AAC', b: 'Opus' },
            { label: 'Licensing', a: 'Patent pools', b: 'Royalty-free' },
            { label: 'Video bitrate', a: 'As recorded', b: 'Up to about 2 Mbps' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'A site or platform that asks for WebM', text: 'Some wikis, forums and open-source projects accept only royalty-free formats.' },
        { title: 'A background or hero video on your own site', text: 'Offering WebM alongside MP4 lets browsers pick the one they handle best.' },
        { title: 'Short clips for chat and community platforms', text: 'Several of them embed WebM directly.' },
      ],
      graphic: {
        kind: 'support',
        caption: 'Where each format plays.',
        columns: ['MP4', 'WebM'],
        rows: [
          { label: 'Chrome, Firefox, Edge', a: 'yes', b: 'yes' },
          { label: 'Safari and iPhone', a: 'yes', b: 'partial' },
          { label: 'TVs and media players', a: 'yes', b: 'partial' },
          { label: 'Video editors', a: 'yes', b: 'partial' },
        ],
      },
      keepOriginal:
        'Keep the MP4 for sharing, phones, TVs and editing, where it is the most compatible choice. Convert to WebM only for a destination that needs it. If you want the smallest possible WebM, encode VP9 or AV1 with desktop software.',
    },
    faqs: [
      { q: 'Which codecs does the WebM use?', a: 'VP8 for video and Opus for audio. Both play in every browser that supports WebM.' },
      { q: 'Why VP8 and not VP9?', a: 'The VP9 encoder is not reliable when run inside a browser, so this converter uses VP8. For VP9 or AV1, use desktop software such as FFmpeg or HandBrake.' },
      { q: 'Will the WebM be smaller than the MP4?', a: 'Not necessarily. VP8 is roughly comparable to H.264, so the size depends mainly on how the MP4 was encoded.' },
      { q: 'Is quality lost?', a: 'Yes, some. The video is re-encoded, and detailed high-resolution footage is limited by the bitrate ceiling. Keep the MP4 as the master.' },
      { q: 'Does WebM play on iPhones?', a: 'Recent versions of Safari play WebM, but support is less complete than for MP4. Test on the devices you care about.' },
    ],
  },

  'mov-to-mp4': {
    title: 'MOV to MP4 Converter Online — iPhone Video, Free',
    metaDescription:
      'Convert MOV to MP4 online for free so iPhone and Mac videos play on Windows, Android and the web. Runs in your browser with no upload. Up to 100 MB.',
    heading: 'MOV to MP4 Converter',
    description:
      'Convert MOV to MP4 online for free so iPhone and Mac videos play on Windows, Android and the web. Your video is re-encoded in your browser and never uploaded, up to 100 MB.',
    steps: [
      { name: 'Add your MOV video', text: 'Click Select Files or drop a MOV file onto the converter. The limit is 100 MB, roughly one to two minutes of 1080p iPhone video.' },
      { name: 'Convert to MP4', text: 'Press Convert. The video is re-encoded to H.264 with AAC audio. The first run downloads the media engine (about 30 MB).' },
      { name: 'Download', text: 'Save the MP4 once encoding finishes.' },
    ],
    understanding: {
      paragraphs: [
        'MOV is Apple\'s QuickTime container, and MP4 was derived from it, so the two are close relatives. The trouble is usually what is inside: recent iPhones record HEVC video, which many Windows programs, older TVs and websites cannot decode.',
        'This converter always re-encodes the picture to H.264 and the sound to AAC, the combination with the widest support. It does not simply re-wrap the file. Re-encoding takes real time in a browser, and the fast settings used mean the MP4 is usually smaller and slightly lower in quality than the MOV.',
        'Resolution and frame rate are unchanged. HDR footage is not tone-mapped, so HDR clips can look washed out after conversion.',
      ],
      graphics: [
        {
          kind: 'tracks',
          caption: 'Video and audio are both re-encoded into the most widely supported codecs.',
          source: { name: 'MOV', tracks: ['Video: HEVC or H.264', 'Audio: AAC'] },
          target: {
            name: 'MP4',
            tracks: [
              { label: 'Video: H.264', state: 're-encoded' },
              { label: 'Audio: AAC', state: 're-encoded' },
            ],
          },
        },
        {
          kind: 'table',
          caption: 'MOV compared with the MP4 this converter makes.',
          columns: ['MOV', 'MP4 output'],
          rows: [
            { label: 'Made by', a: 'Apple (QuickTime)', b: 'ISO standard' },
            { label: 'Typical video codec', a: 'HEVC on recent iPhones', b: 'H.264' },
            { label: 'Quality', a: 'Original', b: 'Slightly lower' },
            { label: 'File size', a: 'Original', b: 'Usually smaller' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Sending an iPhone video to a Windows or Android user', text: 'They may see no picture, or an error asking for a codec. The MP4 plays without extras.' },
        { title: 'Uploading to a site that rejects MOV', text: 'Learning platforms, job portals and some social tools accept MP4 only.' },
        { title: 'Putting a clip into slides', text: 'PowerPoint and Google Slides are more reliable with H.264 MP4.' },
      ],
      graphic: {
        kind: 'support',
        caption: 'Where each format plays.',
        columns: ['MOV', 'MP4'],
        rows: [
          { label: 'iPhone, iPad, Mac', a: 'yes', b: 'yes' },
          { label: 'Windows apps', a: 'partial', b: 'yes' },
          { label: 'Android and smart TVs', a: 'partial', b: 'yes' },
          { label: 'Upload forms and web players', a: 'partial', b: 'yes' },
        ],
      },
      keepOriginal:
        'Keep the MOV as your original, and for editing on a Mac or iPhone. If you need a lossless change of container, or have a long recording, use desktop software, which can copy the streams without re-encoding.',
    },
    faqs: [
      { q: 'Is the conversion lossless?', a: 'No. The video is always re-encoded to H.264, which loses some quality. Desktop tools can re-wrap compatible MOV files without loss.' },
      { q: 'How long a video can I convert?', a: 'Up to 100 MB. For 1080p iPhone footage that is about one to two minutes, and less for 4K.' },
      { q: 'Why is it slow?', a: 'Encoding runs in your browser on one thread. A short clip takes a short while; anything longer takes minutes.' },
      { q: 'Will it work on my phone?', a: 'Short clips usually do. Phones have less memory, so longer or 4K videos may fail.' },
      { q: 'What happens to HDR video?', a: 'It is converted without tone mapping, so colours can look flat. Convert HDR clips with software that handles HDR.' },
    ],
  },

  'mov-to-mp3': {
    title: 'MOV to MP3 Converter Online — Extract Audio Free',
    metaDescription:
      'Convert MOV to MP3 online for free and extract the audio from iPhone and QuickTime videos at 192 kbps. Runs in your browser with no upload or sign-up.',
    heading: 'MOV to MP3 Converter',
    description:
      'Convert MOV to MP3 online for free to extract the audio from iPhone and QuickTime videos at 192 kbps. Your video stays on your device, with no upload or sign-up.',
    steps: [
      { name: 'Add your MOV video', text: 'Click Select Files or drop a MOV file onto the converter, up to 100 MB.' },
      { name: 'Convert to MP3', text: 'Press Convert. The picture is ignored and the audio is encoded at 192 kbps. The first run downloads the media engine.' },
      { name: 'Download', text: 'Save the MP3.' },
    ],
    understanding: {
      paragraphs: [
        'A MOV from an iPhone or a QuickTime screen recording carries its sound as a separate track, usually AAC, sometimes uncompressed PCM. The converter reads that track and leaves the video untouched and unused.',
        'When the source audio is AAC, converting to MP3 is a second lossy encode with a small loss. When it is PCM, as in some screen recordings and camera files, the MP3 is made from uncompressed audio and is as good as a 192 kbps MP3 gets.',
        'Because the video is discarded, the size limit is the main constraint: the MOV itself must be under 100 MB even though the MP3 will be tiny.',
      ],
      graphics: [
        {
          kind: 'tracks',
          caption: 'The audio track becomes the MP3. The video track is not used.',
          source: { name: 'MOV', tracks: ['Video (HEVC or H.264)', 'Audio (AAC or PCM)'] },
          target: {
            name: 'MP3',
            tracks: [
              { label: 'Video', state: 'dropped' },
              { label: 'Audio as MP3, 192 kbps', state: 're-encoded' },
            ],
          },
        },
        {
          kind: 'table',
          caption: 'Choosing an audio format for the extracted sound.',
          columns: ['MP3', 'WAV'],
          rows: [
            { label: 'Size per minute', a: 'About 1.4 MB', b: 'About 11.5 MB' },
            { label: 'Quality', a: 'Lossy, 192 kbps', b: 'Uncompressed' },
            { label: 'Best for', a: 'Listening, sharing', b: 'Editing' },
            { label: 'Plays on', a: 'Everything', b: 'Most software' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Keeping the audio of a concert or speech you filmed', text: 'The MP3 takes a fraction of the space and plays in any music app.' },
        { title: 'Turning a screen recording into a voice note', text: 'If the narration is what matters, share the audio alone.' },
        { title: 'Getting audio into a transcription service', text: 'Most accept MP3 and limit upload size, which rules out the video.' },
      ],
      keepOriginal:
        'Keep the MOV if you may need the footage. If you plan to edit the sound, extract it as WAV instead to avoid lossy compression.',
    },
    faqs: [
      { q: 'Does this work with iPhone videos?', a: 'Yes. Save the video to Files or transfer it to your computer, then add it here. It must be under 100 MB.' },
      { q: 'What bitrate is the MP3?', a: 'A constant 192 kbps.' },
      { q: 'My MOV is too big. Is there a workaround?', a: 'Trim the clip on your phone first, or use a desktop tool such as VLC or FFmpeg for long recordings.' },
      { q: 'Is spatial or multichannel audio kept?', a: 'The MP3 is made from the main audio track. Surround or spatial information is not preserved as such.' },
    ],
  },

  'mkv-to-mp4': {
    title: 'MKV to MP4 Converter Online — Free, No Upload',
    metaDescription:
      'Convert MKV to MP4 online for free so videos play on iPhones, TVs and editors. Runs in your browser with no upload; one audio track is kept. Up to 100 MB.',
    heading: 'MKV to MP4 Converter',
    description:
      'Convert MKV to MP4 online for free so videos play on iPhones, TVs and editors. Runs in your browser with no upload or sign-up, for files up to 100 MB; extra audio tracks are dropped.',
    steps: [
      { name: 'Add your MKV video', text: 'Click Select Files or drop an MKV onto the converter. Files can be up to 100 MB, which suits clips more than films.' },
      { name: 'Convert to MP4', text: 'Press Convert. Video is re-encoded to H.264 and audio to AAC. The first run downloads the media engine (about 30 MB).' },
      { name: 'Download', text: 'Save the MP4 when it is ready.' },
    ],
    understanding: {
      paragraphs: [
        'MKV, the Matroska container, can hold almost anything: several audio languages, multiple subtitle tracks, chapters and attachments. MP4 is stricter, and far more widely supported.',
        'The converter picks one video track and one audio track and re-encodes them as H.264 and AAC. Additional audio tracks are left out. Subtitles are not reliably carried over, so do not count on them. Chapters and attachments are not kept.',
        'Because the picture is re-encoded with fast settings, there is some quality loss and the process takes time. A tool that only changes the container can do this losslessly in seconds, but that needs desktop software.',
      ],
      graphics: [
        {
          kind: 'tracks',
          caption: 'One video and one audio track are converted. The rest stays behind.',
          source: { name: 'MKV', tracks: ['Video', 'Audio 1 (main)', 'Audio 2 (e.g. second language)', 'Subtitles'] },
          target: {
            name: 'MP4',
            tracks: [
              { label: 'Video: H.264', state: 're-encoded' },
              { label: 'Audio 1: AAC', state: 're-encoded' },
              { label: 'Audio 2', state: 'dropped' },
              { label: 'Subtitles (not reliable)', state: 'dropped' },
            ],
          },
        },
        {
          kind: 'table',
          caption: 'What each container can hold.',
          columns: ['MKV', 'MP4'],
          rows: [
            { label: 'Audio tracks', a: 'Many', b: 'One kept here' },
            { label: 'Subtitle formats', a: 'Nearly any', b: 'Few' },
            { label: 'Codecs', a: 'Nearly any', b: 'H.264, AAC here' },
            { label: 'Device support', a: 'Limited', b: 'Very wide' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'A TV, console or iPhone will not play the file', text: 'Many devices have no Matroska support, while MP4 with H.264 is safe.' },
        { title: 'Importing a clip into an editor', text: 'Several editing programs refuse MKV but accept MP4.' },
        { title: 'Recordings from OBS', text: 'OBS records MKV by default for crash safety; MP4 is easier to share afterwards.' },
      ],
      graphic: {
        kind: 'support',
        caption: 'Where each format plays.',
        columns: ['MKV', 'MP4'],
        rows: [
          { label: 'VLC and desktop players', a: 'yes', b: 'yes' },
          { label: 'iPhone and iPad', a: 'no', b: 'yes' },
          { label: 'Smart TVs and consoles', a: 'partial', b: 'yes' },
          { label: 'Video editors', a: 'partial', b: 'yes' },
        ],
      },
      keepOriginal:
        'Keep the MKV when you need its extra audio tracks or subtitles, or the original quality. For films and long recordings, use a desktop remuxer such as MKVToolNix or FFmpeg, which keeps everything and does not re-encode.',
    },
    faqs: [
      { q: 'Are subtitles kept?', a: 'Not reliably. Plan on the MP4 having no subtitles, and keep a separate subtitle file if you need them.' },
      { q: 'What happens to additional audio tracks?', a: 'Only one audio track is converted. Other languages or commentary tracks are dropped.' },
      { q: 'Is quality lost?', a: 'Yes, a little, because the video is re-encoded. Lossless conversion requires a tool that copies the streams.' },
      { q: 'Can I convert a full film?', a: 'Films are usually far larger than the 100 MB limit, and browser encoding would take a very long time. Use desktop software for those.' },
      { q: 'How do I convert OBS recordings?', a: 'Short ones can be converted here. OBS can also remux MKV to MP4 itself, under File, Remux Recordings, without any quality loss.' },
    ],
  },

  'avi-to-mp4': {
    title: 'AVI to MP4 Converter Online — Free, No Upload',
    metaDescription:
      'Convert AVI to MP4 online for free so old videos play on phones, TVs and browsers. Runs in your browser with no upload or sign-up. Files up to 100 MB.',
    heading: 'AVI to MP4 Converter',
    description:
      'Convert AVI to MP4 online for free so old videos play on phones, TVs and browsers. Converted on your device with no account, for files up to 100 MB.',
    steps: [
      { name: 'Add your AVI video', text: 'Click Select Files or drop an AVI onto the converter, up to 100 MB.' },
      { name: 'Convert to MP4', text: 'Press Convert. The video is re-encoded to H.264 and the audio to AAC. The first run downloads the media engine.' },
      { name: 'Download', text: 'Save the MP4.' },
    ],
    understanding: {
      paragraphs: [
        'AVI was introduced by Microsoft in 1992. Files from that era use codecs such as DivX, Xvid, Motion JPEG or DV, with MP3 or uncompressed audio. Modern phones, browsers and many TVs no longer decode them.',
        'Converting replaces those with H.264 video and AAC audio in an MP4. H.264 is far more efficient than the older codecs, so the MP4 is often much smaller even though the picture looks about the same. As with any re-encode, a little quality is lost.',
        'Very old or unusual AVI codecs may not be recognised. If a conversion fails, that is the most likely reason.',
      ],
      graphics: [
        {
          kind: 'tracks',
          caption: 'Legacy codecs are replaced by modern ones.',
          source: { name: 'AVI', tracks: ['Video: DivX, Xvid, MJPEG or DV', 'Audio: MP3 or PCM'] },
          target: {
            name: 'MP4',
            tracks: [
              { label: 'Video: H.264', state: 're-encoded' },
              { label: 'Audio: AAC', state: 're-encoded' },
            ],
          },
        },
        {
          kind: 'table',
          caption: 'AVI compared with MP4.',
          columns: ['AVI', 'MP4'],
          rows: [
            { label: 'Introduced', a: '1992', b: '2001' },
            { label: 'Typical codecs', a: 'DivX, Xvid, MJPEG', b: 'H.264, AAC' },
            { label: 'Streaming', a: 'Poor', b: 'Designed for it' },
            { label: 'Plays in browsers', a: 'No', b: 'Yes' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Old camcorder or webcam footage', text: 'Family videos saved as AVI will not open on a phone until they are converted.' },
        { title: 'Sharing or posting a legacy clip', text: 'Messaging apps and websites expect MP4.' },
        { title: 'Reducing the size of bulky AVI files', text: 'Motion JPEG and DV files in particular shrink dramatically as H.264.' },
      ],
      keepOriginal:
        'Keep the AVI as the archival original, since each re-encode loses a little. For tapes and long home videos, which are far larger than 100 MB, convert with desktop software.',
    },
    faqs: [
      { q: 'Why will my AVI not convert?', a: 'It may use a rare codec the converter does not include, or be over 100 MB. Desktop tools such as VLC or HandBrake support more codecs.' },
      { q: 'Will the MP4 be smaller?', a: 'Usually, and often by a lot, because H.264 is more efficient than older AVI codecs.' },
      { q: 'Is the picture quality affected?', a: 'Slightly. The video is re-encoded once. Old low-resolution footage generally looks the same afterwards.' },
      { q: 'Does it fix interlaced video?', a: 'No. Interlaced footage is not deinterlaced, so combing lines from old camcorder video remain.' },
    ],
  },

  'webm-to-mp4': {
    title: 'WebM to MP4 Converter Online — Free, No Upload',
    metaDescription:
      'Convert WebM to MP4 online for free so screen recordings open in editors and on iPhones. Runs in your browser with no upload or sign-up. Up to 100 MB.',
    heading: 'WebM to MP4 Converter',
    description:
      'Convert WebM to MP4 online for free so screen recordings open in editors and on iPhones. Nothing is uploaded and no sign-up is needed; files can be up to 100 MB.',
    steps: [
      { name: 'Add your WebM video', text: 'Click Select Files or drop a WebM file onto the converter, up to 100 MB.' },
      { name: 'Convert to MP4', text: 'Press Convert. VP8 or VP9 video becomes H.264, and Opus or Vorbis audio becomes AAC. The first run downloads the media engine.' },
      { name: 'Download', text: 'Save the MP4.' },
    ],
    understanding: {
      paragraphs: [
        'WebM is what browsers produce. Screen recorders, video-call recordings and web-based capture tools use the browser\'s built-in recorder, which writes VP8 or VP9 video with Opus audio.',
        'Those codecs are not allowed in a standard MP4 that every device understands, so there is no way to just re-wrap the file. Each frame is decoded and encoded again as H.264, and the audio as AAC. That takes time and loses a little quality.',
        'Browser recordings often have a variable frame rate and no duration information. Converting to MP4 writes a normal, seekable file, which is frequently what fixes problems in editors.',
      ],
      graphics: [
        {
          kind: 'tracks',
          caption: 'Web codecs are converted to the ones MP4 players expect.',
          source: { name: 'WebM', tracks: ['Video: VP8 or VP9', 'Audio: Opus or Vorbis'] },
          target: {
            name: 'MP4',
            tracks: [
              { label: 'Video: H.264', state: 're-encoded' },
              { label: 'Audio: AAC', state: 're-encoded' },
            ],
          },
        },
        {
          kind: 'table',
          caption: 'WebM compared with MP4.',
          columns: ['WebM', 'MP4'],
          rows: [
            { label: 'Produced by', a: 'Browsers, web recorders', b: 'Cameras, phones, editors' },
            { label: 'Codecs', a: 'VP8/VP9, Opus', b: 'H.264, AAC' },
            { label: 'Seeking in recordings', a: 'Often unreliable', b: 'Reliable' },
            { label: 'Editor support', a: 'Limited', b: 'Universal' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'A screen recording will not import into your editor', text: 'Many editing programs reject WebM or show only audio. MP4 imports cleanly.' },
        { title: 'Sending a recording to someone on an iPhone', text: 'MP4 plays in Messages, Photos and Mail without question.' },
        { title: 'Uploading where WebM is not accepted', text: 'Slide tools, learning platforms and some social sites take MP4 only.' },
      ],
      graphic: {
        kind: 'support',
        caption: 'Where each format plays.',
        columns: ['WebM', 'MP4'],
        rows: [
          { label: 'Chrome, Firefox, Edge', a: 'yes', b: 'yes' },
          { label: 'iPhone apps', a: 'partial', b: 'yes' },
          { label: 'Video editors', a: 'partial', b: 'yes' },
          { label: 'TVs and media players', a: 'partial', b: 'yes' },
        ],
      },
      keepOriginal:
        'Keep the WebM if it is going straight onto a web page or into a browser-based tool, where it already works. For recordings longer than a few minutes, a desktop converter will be much faster.',
    },
    faqs: [
      { q: 'Why can a WebM not simply be renamed to MP4?', a: 'The codecs inside are different. A renamed file still contains VP9 and Opus, which most MP4 players will not decode.' },
      { q: 'Why does my screen recording have no length or will not seek?', a: 'Browser recorders often write WebM without duration data. Converting to MP4 produces a file with proper timing.' },
      { q: 'Is quality lost?', a: 'A little, because the video is re-encoded. Text in screen recordings stays readable at normal sizes.' },
      { q: 'How long does it take?', a: 'It depends on length and resolution. Encoding runs on one thread in your browser, so allow a few minutes for anything beyond a short clip.' },
      { q: 'Is there a size limit?', a: 'Yes, 100 MB per file.' },
    ],
  },
};
