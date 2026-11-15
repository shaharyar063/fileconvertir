import type { ConversionPage } from './types';
import { steps } from './helpers';

/**
 * Video conversions from WebM, MOV, MKV and AVI. FFmpeg runs in the browser on
 * one thread: WebM output is VP8 + Opus, audio extraction drops the picture.
 */
export const VIDEO_PAGES_A: Record<string, ConversionPage> = {
  'webm-to-mp3': {
    title: 'WebM to MP3 Converter Online — Extract Audio Free',
    metaDescription:
      'Convert WebM to MP3 online for free. Extract the audio from a WebM video as a 192 kbps MP3 in your browser, with no upload or sign-up. Up to 100 MB.',
    heading: 'WebM to MP3 Converter',
    description:
      'Convert WebM to MP3 online for free: extract the audio from a WebM video as a 192 kbps MP3. Nothing is uploaded.',
    steps: steps('webm', 'mp3', 'Press Convert. The picture is ignored and the audio is decoded and encoded as MP3 at 192 kbps. The first run downloads the media engine (about 30 MB).', { add: 'Click Select Files or drop a WebM video onto the converter. Each file can be up to 100 MB.' }),
    understanding: {
      paragraphs: [
        'A WebM file contains a video track and an audio track, usually Opus or Vorbis. To get an MP3, the converter discards the video and decodes the audio before compressing it again.',
        'Screen recordings, browser-captured clips and downloads from sites that serve WebM are common sources. The MP3 will match the quality of the original soundtrack, since lossy audio cannot be improved by re-encoding.',
        'If the video has no audio track, the conversion has nothing to extract and will fail.',
      ],
      graphics: [
        {
          kind: 'tracks',
          caption: 'Only the audio track is used.',
          source: { name: 'WebM', tracks: ['Video (VP8 or VP9)', 'Audio (Opus or Vorbis)'] },
          target: {
            name: 'MP3',
            tracks: [
              { label: 'Video', state: 'dropped' },
              { label: 'Audio as MP3, 192 kbps', state: 're-encoded' },
            ],
          },
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Saving the sound of a screen recording or lecture', text: 'The MP3 is a fraction of the size and plays on any device.' },
        { title: 'Pulling music or speech from a browser-captured clip', text: 'Many tools capture WebM and need MP3 for editing or sharing.' },
      ],
      keepOriginal:
        'Keep the WebM if you need the picture. The MP3 holds sound only.',
    },
    faqs: [
      { q: 'Does it keep the video?', a: 'No. Only audio is extracted.' },
      { q: 'What if my WebM has no sound?', a: 'The conversion fails, as there is no audio track.' },
      { q: 'What bitrate is the MP3?', a: '192 kbps.' },
      { q: 'Is it as good as the original audio?', a: 'It cannot be better. It is very close for most listeners.' },
    ],
  },

  'webm-to-wav': {
    title: 'WebM to WAV Converter Online — Extract Audio Free',
    metaDescription:
      'Convert WebM to WAV online for free. Extract the audio from a video as uncompressed 16-bit WAV in your browser, with no upload or sign-up. Up to 100 MB.',
    heading: 'WebM to WAV Converter',
    description:
      'Convert WebM to WAV online for free: extract the audio from a WebM video as uncompressed 16-bit WAV. Nothing is uploaded.',
    steps: steps('webm', 'wav', 'Press Convert. The picture is ignored and the soundtrack is decoded to 16-bit PCM and saved as WAV.', { add: 'Click Select Files or drop a WebM video onto the converter. Each file can be up to 100 MB.' }),
    understanding: {
      paragraphs: [
        'WAV holds raw samples, which makes it the format audio editors, transcription tools and speech-recognition software accept most readily. Extracting from WebM gives you the soundtrack in that form with no new loss.',
        'The WAV is far larger than the video\'s own audio, because the Opus or Vorbis track in the WebM was compressed and WAV is not. A few minutes can reach tens of megabytes.',
        'The sound is whatever the WebM contained. Nothing is added or restored.',
      ],
      graphics: [
        {
          kind: 'tracks',
          caption: 'The video is dropped; the audio is decoded to WAV.',
          source: { name: 'WebM', tracks: ['Video (VP8 or VP9)', 'Audio (Opus or Vorbis)'] },
          target: {
            name: 'WAV',
            tracks: [
              { label: 'Video', state: 'dropped' },
              { label: 'Audio as 16-bit PCM', state: 'decoded' },
            ],
          },
        },
        {
          kind: 'table',
          caption: 'WebM audio compared with WAV.',
          columns: ['WebM soundtrack', 'WAV'],
          rows: [
            { label: 'Compression', a: 'Lossy', b: 'None' },
            { label: 'Size', a: 'Small', b: 'Large' },
            { label: 'Editor support', a: 'Limited', b: 'Universal' },
            { label: 'Quality gain', a: 'Not applicable', b: 'None' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Transcribing or analysing a recording', text: 'Many speech tools prefer WAV input.' },
        { title: 'Editing the sound of a screen capture', text: 'Open the WAV in any audio editor.' },
      ],
      keepOriginal:
        'Keep the WebM if you need the video. For a small audio file to share, choose MP3 instead.',
    },
    faqs: [
      { q: 'Why is the WAV so big?', a: 'It stores every sample without compression.' },
      { q: 'Does it keep the video?', a: 'No.' },
      { q: 'What bit depth is used?', a: '16-bit.' },
      { q: 'Does it improve sound quality?', a: 'No.' },
    ],
  },

  'mov-to-webm': {
    title: 'MOV to WebM Converter Online — Free, No Upload',
    metaDescription:
      'Convert MOV to WebM online for free. Re-encodes iPhone and Mac videos as VP8 and Opus in your browser, with no upload or sign-up. Up to 100 MB per file.',
    heading: 'MOV to WebM Converter',
    description:
      'Convert MOV to WebM online for free: iPhone and Mac videos are re-encoded as VP8 with Opus audio. Nothing is uploaded.',
    steps: steps('mov', 'webm', 'Press Convert. The video is re-encoded as VP8 at up to about 2 Mbps with Opus audio. Expect it to take a while: encoding runs on one thread in your browser.'),
    understanding: {
      paragraphs: [
        'MOV is Apple\'s QuickTime container, and iPhones and Macs record in it with H.264 or HEVC. WebM is the web-native format, built on VP8 or VP9 video and Opus audio, which every modern browser plays.',
        'The two formats share no video codec, so the video is fully re-encoded, which is slow in a browser. The converter uses VP8 at up to about 2 Mbps, which keeps the dimensions but can soften fine detail on high-resolution clips.',
        'Keep clips short. Large 4K or long recordings may be too heavy for browser memory, and 100 MB is the limit.',
      ],
      graphics: [
        {
          kind: 'tracks',
          caption: 'Both tracks are decoded and encoded again.',
          source: { name: 'MOV', tracks: ['Video (H.264 or HEVC)', 'Audio (AAC)'] },
          target: {
            name: 'WebM',
            tracks: [
              { label: 'Video as VP8', state: 're-encoded' },
              { label: 'Audio as Opus', state: 're-encoded' },
            ],
          },
        },
        {
          kind: 'support',
          caption: 'Where each format plays.',
          columns: ['WebM', 'MOV'],
          rows: [
            { label: 'Chrome, Edge, Firefox', a: 'yes', b: 'partial' },
            { label: 'Safari and iPhone', a: 'partial', b: 'yes' },
            { label: 'Web page video tags', a: 'yes', b: 'partial' },
            { label: 'Video editors', a: 'partial', b: 'yes' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Putting a phone clip on a website', text: 'WebM plays in a standard video tag in most browsers.' },
        { title: 'Sharing a clip to a service that accepts WebM', text: 'Some forums and tools prefer it.' },
      ],
      keepOriginal:
        'Keep the MOV as the master, particularly for editing. For maximum compatibility outside the web, convert MOV to MP4 instead.',
    },
    faqs: [
      { q: 'Why is it slow?', a: 'Video is encoded on a single thread inside your browser.' },
      { q: 'Does it keep the resolution?', a: 'Yes, but quality is limited by the bitrate cap.' },
      { q: 'Is quality lost?', a: 'Yes. Both the video and audio are compressed again.' },
      { q: 'Is MP4 a better choice?', a: 'For most devices, yes. Use WebM for web pages.' },
    ],
  },

  'mov-to-wav': {
    title: 'MOV to WAV Converter Online — Extract Audio Free',
    metaDescription:
      'Convert MOV to WAV online for free. Extract the audio from an iPhone or Mac video as 16-bit WAV in your browser, with no upload or sign-up. Up to 100 MB.',
    heading: 'MOV to WAV Converter',
    description:
      'Convert MOV to WAV online for free: extract the audio from an iPhone or Mac video as uncompressed 16-bit WAV.',
    steps: steps('mov', 'wav', 'Press Convert. The picture is ignored and the soundtrack is decoded to 16-bit PCM and saved as WAV.', { add: 'Click Select Files or drop a MOV video onto the converter. Each file can be up to 100 MB.' }),
    understanding: {
      paragraphs: [
        'The sound in a MOV from an iPhone, a Mac or a camera is normally AAC. The converter discards the video and decodes the audio into WAV, the form audio editors read without conversion.',
        'No new loss is introduced by the decoding, but the WAV will be many times larger than the audio inside the MOV.',
        'Professional MOV files can carry uncompressed or multichannel audio; here the sound is written as 16-bit PCM.',
      ],
      graphics: [
        {
          kind: 'tracks',
          caption: 'The video track is dropped; the audio is decoded to WAV.',
          source: { name: 'MOV', tracks: ['Video (H.264 or HEVC)', 'Audio (AAC)'] },
          target: {
            name: 'WAV',
            tracks: [
              { label: 'Video', state: 'dropped' },
              { label: 'Audio as 16-bit PCM', state: 'decoded' },
            ],
          },
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Editing the sound of an interview shot on a phone', text: 'Open the WAV in an audio editor to clean it up.' },
        { title: 'Sending audio to a transcription tool', text: 'Many services prefer WAV input.' },
      ],
      keepOriginal:
        'Keep the MOV as the original recording. Choose MOV to MP3 if you only need a compact copy of the sound.',
    },
    faqs: [
      { q: 'Does it keep the video?', a: 'No.' },
      { q: 'Why is the WAV so large?', a: 'WAV stores raw samples with no compression.' },
      { q: 'What bit depth is used?', a: '16-bit.' },
      { q: 'Can it extract from HEVC videos?', a: 'It only needs the audio track, so the video codec does not matter.' },
    ],
  },

  'mkv-to-webm': {
    title: 'MKV to WebM Converter Online — Free, No Upload',
    metaDescription:
      'Convert MKV to WebM online for free. Re-encodes the video as VP8 with Opus audio in your browser, with no upload or sign-up. Up to 100 MB per file.',
    heading: 'MKV to WebM Converter',
    description:
      'Convert MKV to WebM online for free: the video is re-encoded as VP8 with Opus audio. Nothing is uploaded.',
    steps: steps('mkv', 'webm', 'Press Convert. The video is re-encoded as VP8 at up to about 2 Mbps with Opus audio. Encoding runs on one thread in your browser, so it can take a while.'),
    understanding: {
      paragraphs: [
        'MKV can hold almost any video and audio codec plus several audio tracks and subtitles. WebM is a stricter format limited to VP8 or VP9 video and Opus or Vorbis audio, built for browsers.',
        'Since the codecs differ, the video is fully re-encoded rather than copied. Only one video and one audio track are used, and subtitles and extra audio tracks are not carried across.',
        'Re-encoding is slow in the browser. Short clips work best, and files over 100 MB are rejected.',
      ],
      graphics: [
        {
          kind: 'tracks',
          caption: 'Video and audio are re-encoded; extra tracks do not carry over.',
          source: { name: 'MKV', tracks: ['Video (often H.264 or HEVC)', 'Audio (often AAC or DTS)', 'Subtitles and extra audio'] },
          target: {
            name: 'WebM',
            tracks: [
              { label: 'Video as VP8', state: 're-encoded' },
              { label: 'Audio as Opus', state: 're-encoded' },
              { label: 'Subtitles and extra audio', state: 'dropped' },
            ],
          },
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Embedding a clip on a web page', text: 'WebM plays in a standard video tag.' },
        { title: 'A site or tool that accepts WebM only', text: 'Convert once, then upload.' },
      ],
      keepOriginal:
        'Keep the MKV if it has subtitles or several audio tracks you want. For wide compatibility on phones and TVs, MKV to MP4 is the safer choice.',
    },
    faqs: [
      { q: 'Are subtitles kept?', a: 'No. Only the main video and audio are converted.' },
      { q: 'Why does it take so long?', a: 'Re-encoding runs on one thread in your browser.' },
      { q: 'Is the video quality reduced?', a: 'Yes, as it is compressed again at a capped bitrate.' },
      { q: 'What about multiple audio tracks?', a: 'Only one is used, chosen automatically.' },
    ],
  },

  'mkv-to-mp3': {
    title: 'MKV to MP3 Converter Online — Extract Audio Free',
    metaDescription:
      'Convert MKV to MP3 online for free. Extract the audio from a video as a 192 kbps MP3 in your browser, with no upload or sign-up. Videos up to 100 MB.',
    heading: 'MKV to MP3 Converter',
    description:
      'Convert MKV to MP3 online for free: extract the audio from a video as a 192 kbps MP3. The file never leaves your device.',
    steps: steps('mkv', 'mp3', 'Press Convert. The picture is ignored and the main audio track is encoded as MP3 at 192 kbps.', { add: 'Click Select Files or drop an MKV video onto the converter. Each file can be up to 100 MB.' }),
    understanding: {
      paragraphs: [
        'MKV is a container used for films, anime and screen recordings, often with several audio tracks. The converter lets FFmpeg pick the main audio track, usually the one with the most channels, then decodes it and encodes it as MP3.',
        'Some MKV files carry audio such as DTS or TrueHD that is large and high-quality. Converting to a 192 kbps MP3 makes it much smaller and plays anywhere, but surround sound is mixed down to two channels.',
        'Other language tracks are not extracted.',
      ],
      graphics: [
        {
          kind: 'tracks',
          caption: 'The main audio track becomes the MP3.',
          source: { name: 'MKV', tracks: ['Video track', 'Main audio track', 'Other audio and subtitles'] },
          target: {
            name: 'MP3',
            tracks: [
              { label: 'Video', state: 'dropped' },
              { label: 'Main audio as MP3, 192 kbps', state: 're-encoded' },
              { label: 'Other tracks', state: 'dropped' },
            ],
          },
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Saving a concert or soundtrack from a video file', text: 'The MP3 is easy to put on a phone.' },
        { title: 'Keeping a lecture or podcast recorded as video', text: 'Listen without carrying the picture.' },
      ],
      keepOriginal:
        'Keep the MKV if you want the video or other audio tracks.',
    },
    faqs: [
      { q: 'Which audio track is used?', a: 'The one FFmpeg selects automatically, usually the one with the most channels.' },
      { q: 'Is surround sound kept?', a: 'No. MP3 holds two channels, so it is mixed down.' },
      { q: 'What bitrate is the MP3?', a: '192 kbps.' },
      { q: 'Is the video kept?', a: 'No.' },
    ],
  },

  'mkv-to-wav': {
    title: 'MKV to WAV Converter Online — Extract Audio Free',
    metaDescription:
      'Convert MKV to WAV online for free. Extract the audio from a video as uncompressed 16-bit WAV in your browser, with no upload or sign-up. Up to 100 MB.',
    heading: 'MKV to WAV Converter',
    description:
      'Convert MKV to WAV online for free: extract the audio from an MKV video as uncompressed 16-bit WAV. Nothing is uploaded.',
    steps: steps('mkv', 'wav', 'Press Convert. The picture is ignored and the main audio track is decoded to 16-bit PCM and saved as WAV.', { add: 'Click Select Files or drop an MKV video onto the converter. Each file can be up to 100 MB.' }),
    understanding: {
      paragraphs: [
        'WAV is what audio editors and analysis tools handle best. The converter takes the main audio track of the MKV, the one FFmpeg selects automatically, and writes it as raw 16-bit samples.',
        'No new compression loss is added, but the file grows greatly, because the MKV\'s audio was compressed and WAV is not.',
        'The channel count of the track is kept, so a 5.1 soundtrack gives a six-channel WAV, which some editors cannot open.',
      ],
      graphics: [
        {
          kind: 'tracks',
          caption: 'The main audio track is decoded to WAV; everything else is left out.',
          source: { name: 'MKV', tracks: ['Video track', 'Main audio track', 'Other audio and subtitles'] },
          target: {
            name: 'WAV',
            tracks: [
              { label: 'Video', state: 'dropped' },
              { label: 'Main audio as 16-bit PCM', state: 'decoded' },
              { label: 'Other tracks', state: 'dropped' },
            ],
          },
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Editing the dialogue or music from a recording', text: 'Audio editors open the WAV directly.' },
        { title: 'Feeding audio to analysis or transcription software', text: 'Most prefer uncompressed input.' },
      ],
      keepOriginal:
        'Keep the MKV for the picture. Use MP3 if you need a small audio file.',
    },
    faqs: [
      { q: 'Why is the WAV so large?', a: 'It has no compression.' },
      { q: 'Which track is extracted?', a: 'The main one, as chosen automatically by FFmpeg.' },
      { q: 'Is the video kept?', a: 'No.' },
      { q: 'Is quality lost?', a: 'Not in this step, but the original audio was already compressed.' },
    ],
  },

  'avi-to-webm': {
    title: 'AVI to WebM Converter Online — Free, No Upload',
    metaDescription:
      'Convert AVI to WebM online for free. Re-encodes old AVI video as VP8 with Opus audio in your browser, with no upload or sign-up. Up to 100 MB per file.',
    heading: 'AVI to WebM Converter',
    description:
      'Convert AVI to WebM online for free: old AVI video is re-encoded as VP8 with Opus audio. Nothing is uploaded.',
    steps: steps('avi', 'webm', 'Press Convert. The video is re-encoded as VP8 at up to about 2 Mbps with Opus audio. Encoding runs on one thread in your browser, so it can be slow.'),
    understanding: {
      paragraphs: [
        'AVI is a 1990s container that browsers do not play. Converting to WebM gives you a file that works in a normal video tag on a web page.',
        'AVI files often use old codecs such as DivX, Xvid or MJPEG. The converter decodes them and compresses the video again as VP8, so some quality is lost and the process is slow on large files.',
        'Aspect ratio and resolution are kept. Keep clips short to stay within browser memory and the 100 MB limit.',
      ],
      graphics: [
        {
          kind: 'tracks',
          caption: 'Both tracks are decoded and encoded again.',
          source: { name: 'AVI', tracks: ['Video (DivX, Xvid or similar)', 'Audio (often MP3)'] },
          target: {
            name: 'WebM',
            tracks: [
              { label: 'Video as VP8', state: 're-encoded' },
              { label: 'Audio as Opus', state: 're-encoded' },
            ],
          },
        },
        {
          kind: 'support',
          caption: 'Where each format plays.',
          columns: ['WebM', 'AVI'],
          rows: [
            { label: 'Chrome, Edge, Firefox', a: 'yes', b: 'no' },
            { label: 'Web page video tags', a: 'yes', b: 'no' },
            { label: 'Windows Media Player', a: 'partial', b: 'yes' },
            { label: 'Modern phones', a: 'partial', b: 'no' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Putting old family videos on a website', text: 'A WebM plays in the browser without a plugin.' },
        { title: 'Sharing an old camera clip', text: 'Many devices cannot open AVI at all.' },
      ],
      keepOriginal:
        'Keep the AVI if it is your only copy. For phones and TVs, AVI to MP4 is more widely supported.',
    },
    faqs: [
      { q: 'Why will my browser not play AVI?', a: 'Browsers do not support the AVI container or its older codecs.' },
      { q: 'Is quality lost?', a: 'Yes, the video is compressed again.' },
      { q: 'Why is it slow?', a: 'Encoding runs on one thread in your browser.' },
      { q: 'Is MP4 better?', a: 'For phones and TVs, yes. WebM suits web pages.' },
    ],
  },

  'avi-to-mp3': {
    title: 'AVI to MP3 Converter Online — Extract Audio Free',
    metaDescription:
      'Convert AVI to MP3 online for free. Extract the audio from an old video as a 192 kbps MP3 in your browser, with no upload or sign-up. Up to 100 MB.',
    heading: 'AVI to MP3 Converter',
    description:
      'Convert AVI to MP3 online for free: extract the audio from an old video as a 192 kbps MP3. The file never leaves your device.',
    steps: steps('avi', 'mp3', 'Press Convert. The picture is ignored and the soundtrack is encoded as MP3 at 192 kbps.', { add: 'Click Select Files or drop an AVI video onto the converter. Each file can be up to 100 MB.' }),
    understanding: {
      paragraphs: [
        'Many AVI files already carry MP3 or AC3 audio. The converter decodes the soundtrack and writes it as a fresh 192 kbps MP3, discarding the video.',
        'It is a quick way to rescue the sound from concert recordings, home videos or old downloaded clips, and the resulting file plays on any device.',
        'An AVI with no audio track gives an error. A track already at low quality stays low quality.',
      ],
      graphics: [
        {
          kind: 'tracks',
          caption: 'Only the audio track becomes the MP3.',
          source: { name: 'AVI', tracks: ['Video (DivX, Xvid or similar)', 'Audio (often MP3 or AC3)'] },
          target: {
            name: 'MP3',
            tracks: [
              { label: 'Video', state: 'dropped' },
              { label: 'Audio as MP3, 192 kbps', state: 're-encoded' },
            ],
          },
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Rescuing the sound of an old home video', text: 'Listen to it on a phone without the large video file.' },
        { title: 'Pulling a song from a music video', text: 'The MP3 can go into a library.' },
      ],
      keepOriginal:
        'Keep the AVI if the picture matters to you, since the MP3 holds sound only.',
    },
    faqs: [
      { q: 'Is the video kept?', a: 'No.' },
      { q: 'What bitrate is the MP3?', a: '192 kbps.' },
      { q: 'What if the AVI has no sound?', a: 'The conversion fails because no audio exists.' },
      { q: 'Will the sound be better?', a: 'No, it can only match the original track.' },
    ],
  },

  'avi-to-wav': {
    title: 'AVI to WAV Converter Online — Extract Audio Free',
    metaDescription:
      'Convert AVI to WAV online for free. Extract the audio from an old video as uncompressed 16-bit WAV in your browser, with no upload or sign-up. Up to 100 MB.',
    heading: 'AVI to WAV Converter',
    description:
      'Convert AVI to WAV online for free: extract the audio from an old video as uncompressed 16-bit WAV. Nothing is uploaded.',
    steps: steps('avi', 'wav', 'Press Convert. The picture is ignored and the soundtrack is decoded to 16-bit PCM and saved as WAV.', { add: 'Click Select Files or drop an AVI video onto the converter. Each file can be up to 100 MB.' }),
    understanding: {
      paragraphs: [
        'AVI soundtracks are often MP3 or AC3. Decoding them to WAV gives audio editors and restoration tools the raw samples they work with.',
        'No new loss is added by the decoding, and the sound is the same as in the AVI. The file will be much larger than the audio inside the video.',
        'Use it to clean up or edit audio from an old recording before saving a final MP3.',
      ],
      graphics: [
        {
          kind: 'tracks',
          caption: 'The video is dropped; the audio is decoded to WAV.',
          source: { name: 'AVI', tracks: ['Video (DivX, Xvid or similar)', 'Audio (often MP3 or AC3)'] },
          target: {
            name: 'WAV',
            tracks: [
              { label: 'Video', state: 'dropped' },
              { label: 'Audio as 16-bit PCM', state: 'decoded' },
            ],
          },
        },
        {
          kind: 'table',
          caption: 'AVI soundtrack compared with WAV.',
          columns: ['AVI soundtrack', 'WAV'],
          rows: [
            { label: 'Compression', a: 'Usually lossy', b: 'None' },
            { label: 'Size', a: 'Small', b: 'Large' },
            { label: 'Editor support', a: 'Limited', b: 'Universal' },
            { label: 'Quality gain', a: 'Not applicable', b: 'None' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Restoring audio from an old tape transfer', text: 'Restoration software works best with WAV.' },
        { title: 'Transcribing an interview recorded as video', text: 'Speech tools often prefer uncompressed input.' },
      ],
      keepOriginal:
        'Keep the AVI for the picture. Use AVI to MP3 for a small audio file.',
    },
    faqs: [
      { q: 'Why is the WAV so big?', a: 'It has no compression.' },
      { q: 'Does it keep the video?', a: 'No.' },
      { q: 'What bit depth is used?', a: '16-bit.' },
      { q: 'Does it fix poor audio?', a: 'No. It only extracts it.' },
    ],
  },
};
