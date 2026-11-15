import type { ConversionPage } from './types';

/**
 * Audio conversion pages. All use FFmpeg compiled to WebAssembly in the
 * browser. MP3 output is 192 kbps; WAV output is 16-bit PCM.
 */
export const AUDIO_PAGES: Record<string, ConversionPage> = {
  'wav-to-mp3': {
    title: 'WAV to MP3 Converter Online — Free, 192 kbps',
    metaDescription:
      'Convert WAV to MP3 online for free at 192 kbps. Make large recordings about seven times smaller in your browser, with no upload or sign-up. Up to 100 MB.',
    heading: 'WAV to MP3 Converter',
    description:
      'Convert WAV to MP3 online for free at 192 kbps and make large recordings about seven times smaller. Encoded in your browser, so recordings stay private, up to 100 MB each.',
    steps: [
      { name: 'Add your WAV file', text: 'Click Select Files or drop WAV files onto the converter. Each can be up to 100 MB, which is about nine minutes of CD-quality stereo.' },
      { name: 'Convert to MP3', text: 'Press Convert. The first conversion downloads the audio engine (about 30 MB), then the file is encoded at 192 kbps.' },
      { name: 'Download', text: 'Save the MP3, or a ZIP if you converted several recordings.' },
    ],
    understanding: {
      paragraphs: [
        'WAV stores sound as raw samples, about 10 MB per minute at CD quality. MP3 analyses the audio and discards what human hearing is least likely to notice, which is how it gets so much smaller.',
        'This converter encodes at a constant 192 kbps. At that rate most people cannot tell the MP3 from the original on ordinary headphones or speakers, and speech is effectively indistinguishable. The loss is permanent, though: the discarded detail cannot be recovered from the MP3 later.',
        'The sample rate and channel count of the WAV are kept. Very high sample rates are reduced to 48 kHz, the maximum MP3 supports.',
      ],
      graphics: [
        {
          kind: 'sizeBars',
          caption: 'A four-minute stereo recording at CD quality (44.1 kHz, 16-bit).',
          unit: 'MB',
          bars: [
            { label: 'WAV', value: 42.3 },
            { label: 'MP3 at 192 kbps', value: 5.8, highlight: true },
          ],
        },
        {
          kind: 'wave',
          caption: 'Illustration: MP3 keeps the shape of the sound and drops fine detail that is hard to hear.',
          alt: 'Two waveforms. The WAV waveform shows fine ripples on top of the main wave; the MP3 waveform has the same overall shape with the fine ripples removed.',
          left: { label: 'WAV: every sample', detail: 'full' },
          right: { label: 'MP3: detail reduced', detail: 'reduced' },
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Sending a recording', text: 'A few minutes of WAV exceeds most email limits. The MP3 goes through and plays on any phone.' },
        { title: 'Publishing a podcast or voice-over', text: 'Podcast hosts and most websites expect MP3, and listeners download far less data.' },
        { title: 'Fitting music on a phone or player', text: 'The same storage holds roughly seven times as many tracks.' },
      ],
      keepOriginal:
        'Keep the WAV as your master, and for anything you will edit, mix or master further. Convert to MP3 last, once, from the finished WAV. For an archive that saves space without losing anything, use FLAC.',
    },
    faqs: [
      { q: 'What bitrate is the MP3?', a: 'A constant 192 kbps. The bitrate cannot be changed in this converter.' },
      { q: 'Will I hear a difference?', a: 'Most listeners do not at 192 kbps on consumer equipment. On high-end systems, trained ears can sometimes pick out differences in complex music.' },
      { q: 'How long a recording can I convert?', a: 'The limit is 100 MB per file, about nine and a half minutes of 16-bit, 44.1 kHz stereo. Split longer recordings first.' },
      { q: 'Why is the first conversion slow?', a: 'The audio engine, FFmpeg, is downloaded the first time you convert audio or video. It is about 30 MB and is reused afterwards.' },
      { q: 'Is my audio uploaded?', a: 'No. Encoding happens on your device.' },
    ],
  },

  'wav-to-flac': {
    title: 'WAV to FLAC Converter Online — Lossless, Free',
    metaDescription:
      'Convert WAV to FLAC online for free. Lossless compression at about half the size, with audio identical to the WAV. Runs in your browser with no upload.',
    heading: 'WAV to FLAC Converter',
    description:
      'Convert WAV to FLAC online for free for lossless compression at about half the size. Runs in your browser with no upload or sign-up, and the audio stays identical to the WAV.',
    steps: [
      { name: 'Add your WAV file', text: 'Click Select Files or drop WAV files onto the converter, up to 100 MB each.' },
      { name: 'Convert to FLAC', text: 'Press Convert. The audio is compressed losslessly; the first run downloads the audio engine (about 30 MB).' },
      { name: 'Download', text: 'Save the FLAC file. Batches download as a ZIP.' },
    ],
    understanding: {
      paragraphs: [
        'FLAC does for audio what ZIP does for documents. It finds patterns in the samples and stores them more compactly, without discarding anything. Decode a FLAC and you get back exactly the audio that went in.',
        'How much space you save depends on the material. Dense, loud music compresses less; quiet or sparse recordings compress more. Around 50 to 60 per cent of the WAV size is typical. Sample rate, bit depth and channels are unchanged.',
        'FLAC also has proper support for tags such as title, artist and album, which WAV handles poorly.',
      ],
      graphics: [
        {
          kind: 'sizeBars',
          caption: 'A four-minute stereo recording at CD quality. FLAC size varies with the music.',
          unit: 'MB',
          bars: [
            { label: 'WAV', value: 42.3 },
            { label: 'FLAC (typical)', value: 25, highlight: true },
            { label: 'MP3 at 192 kbps, for comparison', value: 5.8 },
          ],
        },
        {
          kind: 'table',
          caption: 'WAV and FLAC hold the same audio in different ways.',
          columns: ['WAV', 'FLAC'],
          rows: [
            { label: 'Audio quality', a: 'Original', b: 'Identical' },
            { label: 'Compression', a: 'None', b: 'Lossless' },
            { label: 'Tags', a: 'Limited', b: 'Full support' },
            { label: 'Reversible', a: 'Source', b: 'Yes, back to the same WAV audio' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Archiving masters and recordings', text: 'You keep full quality while using roughly half the disk space.' },
        { title: 'Building a lossless music library', text: 'FLAC is the common format for lossless collections, with tags and artwork that players read.' },
        { title: 'Sending high-quality audio', text: 'A smaller file transfers faster, and the recipient gets the same audio as the WAV.' },
      ],
      keepOriginal:
        'Keep WAV where software or hardware requires it, such as some samplers, CD-authoring tools and older editors. If the goal is the smallest file for casual listening, MP3 is the format to choose.',
    },
    faqs: [
      { q: 'Is any quality lost?', a: 'None. FLAC is lossless, so the decoded audio matches the WAV sample for sample.' },
      { q: 'How much smaller will the file be?', a: 'Usually 40 to 50 per cent smaller. It depends on the recording.' },
      { q: 'Can I convert the FLAC back to WAV later?', a: 'Yes, and the audio will be the same as the original.' },
      { q: 'Does it keep 24-bit audio?', a: 'Yes. Bit depth and sample rate are preserved.' },
      { q: 'Should I convert an MP3 to FLAC?', a: 'There is no benefit. FLAC cannot restore what MP3 removed, and the file becomes several times larger.' },
    ],
  },

  'flac-to-mp3': {
    title: 'FLAC to MP3 Converter Online — Free, 192 kbps',
    metaDescription:
      'Convert FLAC to MP3 online for free at 192 kbps so tracks play on phones, cars and any player. Runs in your browser with no upload or sign-up.',
    heading: 'FLAC to MP3 Converter',
    description:
      'Convert FLAC to MP3 online for free at 192 kbps so tracks play on phones, cars and any player. Runs in your browser with no upload or sign-up; keep your FLAC files as the lossless master.',
    steps: [
      { name: 'Add your FLAC files', text: 'Click Select Files or drop up to 20 FLAC tracks onto the converter, 100 MB each at most.' },
      { name: 'Convert to MP3', text: 'Press Convert. Each track is decoded and encoded as a 192 kbps MP3. The first run downloads the audio engine.' },
      { name: 'Download', text: 'Save the MP3, or a ZIP containing the whole batch.' },
    ],
    understanding: {
      paragraphs: [
        'FLAC keeps every sample of the original recording. MP3 does not: it removes detail that is hard to hear in exchange for a file about a quarter of the size.',
        'Because the source is lossless, this is the best possible starting point for an MP3. The audio is compressed only once. At 192 kbps the result is very close to the FLAC on everyday equipment.',
        'Text tags such as title and artist usually carry over, but this is not guaranteed for every file, and embedded cover art may be lost. Check the result in your player.',
      ],
      graphics: [
        {
          kind: 'wave',
          caption: 'Illustration: the MP3 follows the same sound but leaves out fine detail.',
          alt: 'Two waveforms. The FLAC waveform shows fine ripples on the main wave; the MP3 waveform has the same outline without the fine ripples.',
          left: { label: 'FLAC: lossless', detail: 'full' },
          right: { label: 'MP3: lossy copy', detail: 'reduced' },
        },
        {
          kind: 'sizeBars',
          caption: 'A four-minute track. FLAC size varies with the music.',
          unit: 'MB',
          bars: [
            { label: 'FLAC (typical)', value: 25 },
            { label: 'MP3 at 192 kbps', value: 5.8, highlight: true },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'A car stereo or older player that ignores FLAC', text: 'MP3 is the one format practically every head unit and portable player reads.' },
        { title: 'Saving space on a phone', text: 'About four times as many tracks fit in the same storage.' },
        { title: 'Sharing a track', text: 'An MP3 is small enough to send and plays without the recipient installing anything.' },
      ],
      graphic: {
        kind: 'support',
        caption: 'Where each format plays.',
        columns: ['FLAC', 'MP3'],
        rows: [
          { label: 'Computers and Android phones', a: 'yes', b: 'yes' },
          { label: 'iPhone Music library', a: 'partial', b: 'yes' },
          { label: 'Car stereos', a: 'partial', b: 'yes' },
          { label: 'Older portable players', a: 'no', b: 'yes' },
        ],
      },
      keepOriginal:
        'Keep the FLAC files as your library. Treat MP3s as copies you can regenerate at any time; you cannot rebuild a FLAC from an MP3.',
    },
    faqs: [
      { q: 'What quality is the MP3?', a: 'A constant 192 kbps, which is a good balance for music and more than enough for speech.' },
      { q: 'Can I get the lossless quality back from the MP3?', a: 'No. What MP3 removes is gone. Keep your FLAC originals.' },
      { q: 'Are tags and album art kept?', a: 'Text tags usually transfer. Embedded artwork may not, so check and re-add it in your player if needed.' },
      { q: 'Can I convert a whole album at once?', a: 'Yes. Add up to 20 tracks, within 500 MB in total, and download them as a ZIP.' },
      { q: 'Does high-resolution FLAC work?', a: 'Yes. Audio above 48 kHz is resampled, because MP3 does not support higher sample rates.' },
    ],
  },

  'mp3-to-wav': {
    title: 'MP3 to WAV Converter Online — Free, No Upload',
    metaDescription:
      'Convert MP3 to WAV online for free for audio editors, CD burning and tools that need uncompressed audio. Runs in your browser with no upload or sign-up.',
    heading: 'MP3 to WAV Converter',
    description:
      'Convert MP3 to WAV online for free for audio editors, CD burning and tools that need uncompressed audio. Runs in your browser with no upload or sign-up; the sound is not improved.',
    steps: [
      { name: 'Add your MP3 file', text: 'Click Select Files or drop up to 20 MP3 files onto the converter.' },
      { name: 'Convert to WAV', text: 'Press Convert. The MP3 is decoded to 16-bit PCM. The first conversion downloads the audio engine (about 30 MB).' },
      { name: 'Download', text: 'Save the WAV. Expect a file roughly seven to ten times the size of the MP3.' },
    ],
    understanding: {
      paragraphs: [
        'Every time an MP3 plays, it is decoded into raw samples. Converting to WAV simply saves those decoded samples to a file: 16-bit PCM at the MP3\'s own sample rate.',
        'Nothing is added. The detail MP3 compression removed is not in the file, so it cannot be put back, and the WAV sounds exactly like the MP3. What changes is that the audio is now uncompressed, so an editor can cut, process and save it repeatedly without compressing it again each time.',
        'The price is size. Uncompressed audio needs about 10 MB per minute.',
      ],
      graphics: [
        {
          kind: 'flow',
          caption: 'Decoding does not recover what MP3 compression discarded.',
          steps: [
            { label: 'MP3', detail: 'compressed, detail already removed' },
            { label: 'Decode', detail: 'the same step a player performs' },
            { label: 'WAV', detail: '16-bit PCM, same sound' },
          ],
        },
        {
          kind: 'sizeBars',
          caption: 'A four-minute stereo track.',
          unit: 'MB',
          bars: [
            { label: 'MP3 at 128 kbps', value: 3.8 },
            { label: 'WAV, 16-bit 44.1 kHz', value: 42.3, highlight: true },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Editing in audio software', text: 'Working on a WAV avoids re-compressing the audio at every save.' },
        { title: 'Burning an audio CD', text: 'Many CD-authoring tools take WAV as their input.' },
        { title: 'Hardware and systems that only read WAV', text: 'Samplers, phone systems, kiosks and some game engines do not decode MP3.' },
      ],
      keepOriginal:
        'Keep the MP3 for listening and sharing. A WAV made from it takes far more space and sounds no better. If you have the original uncompressed recording, use that instead.',
    },
    faqs: [
      { q: 'Does converting to WAV improve the sound?', a: 'No. The WAV contains exactly what the MP3 decodes to. Lost detail is not restored.' },
      { q: 'Why is the WAV so much larger?', a: 'It is uncompressed. Size depends only on length: about 10 MB per minute for stereo at 44.1 kHz.' },
      { q: 'What format is the WAV?', a: '16-bit PCM, with the same sample rate and number of channels as the MP3.' },
      { q: 'Then why convert at all?', a: 'For compatibility and editing. Some tools only accept WAV, and editing a WAV avoids further lossy compression.' },
    ],
  },

  'm4a-to-mp3': {
    title: 'M4A to MP3 Converter Online — Voice Memos, Free',
    metaDescription:
      'Convert M4A to MP3 online for free at 192 kbps. Works with iPhone voice memos and iTunes audio, in your browser with no upload or sign-up. Batch up to 20 files.',
    heading: 'M4A to MP3 Converter',
    description:
      'Convert M4A to MP3 online for free at 192 kbps, including iPhone voice memos and iTunes audio. Runs in your browser with no upload or sign-up, so recordings stay on your device.',
    steps: [
      { name: 'Add your M4A file', text: 'Click Select Files or drop up to 20 M4A files onto the converter. On an iPhone, save the voice memo to Files first.' },
      { name: 'Convert to MP3', text: 'Press Convert. The audio is decoded and encoded as a 192 kbps MP3. The first run downloads the audio engine.' },
      { name: 'Download', text: 'Save the MP3, or a ZIP for a batch.' },
    ],
    understanding: {
      paragraphs: [
        'M4A is a container, the audio-only form of MP4. Inside it the sound is nearly always AAC, a lossy codec. Apple uses M4A for Voice Memos, GarageBand exports and iTunes purchases.',
        'Converting to MP3 means decoding the AAC and compressing the audio again in a different lossy format. A second round of compression always costs a little quality. At 192 kbps the effect is small, and for speech it is not noticeable.',
        'Files with copy protection cannot be decoded. That affects old iTunes purchases from before 2009 and Apple Music downloads, not your own recordings.',
      ],
      graphics: [
        {
          kind: 'flow',
          caption: 'The audio is unpacked from the M4A container, decoded and re-encoded.',
          steps: [
            { label: 'M4A container', detail: 'holds AAC audio' },
            { label: 'Decode AAC', detail: 'to raw samples' },
            { label: 'Encode MP3', detail: '192 kbps' },
            { label: '.mp3 file' },
          ],
        },
        {
          kind: 'table',
          caption: 'M4A compared with MP3.',
          columns: ['M4A (AAC)', 'MP3'],
          rows: [
            { label: 'Type', a: 'Container with AAC inside', b: 'Codec and file format' },
            { label: 'Efficiency', a: 'Better at the same bitrate', b: 'Needs more bitrate' },
            { label: 'Default on', a: 'Apple devices', b: 'Everything' },
            { label: 'Protected files', a: 'Possible (DRM)', b: 'No' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Sharing a voice memo', text: 'Recipients on older Android phones, Windows PCs or web forms may not be able to open an M4A.' },
        { title: 'Uploading to a site that lists MP3 only', text: 'Transcription services, course platforms and some podcast tools ask for MP3.' },
        { title: 'Playing on a car stereo or MP3 player', text: 'Many of them do not recognise M4A files on a USB stick.' },
      ],
      graphic: {
        kind: 'support',
        caption: 'Where each format plays.',
        columns: ['M4A', 'MP3'],
        rows: [
          { label: 'iPhone, iPad, Mac', a: 'yes', b: 'yes' },
          { label: 'Current Android and Windows', a: 'yes', b: 'yes' },
          { label: 'Car stereos and older players', a: 'partial', b: 'yes' },
          { label: 'Upload forms and web tools', a: 'partial', b: 'yes' },
        ],
      },
      keepOriginal:
        'Keep the M4A if it already plays where you need it. It is the better-sounding file, and converting only loses quality. Convert when something refuses to open it.',
    },
    faqs: [
      { q: 'How do I convert an iPhone voice memo?', a: 'In Voice Memos, share the recording and choose Save to Files. Then open this page, select the file and convert.' },
      { q: 'Will the MP3 sound worse?', a: 'Very slightly, because the audio is compressed a second time. At 192 kbps most people will not notice, especially with speech.' },
      { q: 'Why does my iTunes file fail to convert?', a: 'It is probably copy-protected. Protected purchases and Apple Music downloads cannot be decoded by any converter.' },
      { q: 'Does it handle Apple Lossless (ALAC) in M4A?', a: 'Yes. ALAC audio is decoded and encoded to MP3 in the same way.' },
      { q: 'What is the difference between M4A and MP4?', a: 'They are the same container. M4A is the name used when the file holds audio only.' },
    ],
  },

  'm4a-to-wav': {
    title: 'M4A to WAV Converter Online — Free, No Upload',
    metaDescription:
      'Convert M4A to WAV online for free and get uncompressed 16-bit audio for editors and transcription tools. Runs in your browser with no upload or sign-up.',
    heading: 'M4A to WAV Converter',
    description:
      'Convert M4A to WAV online for free to get uncompressed 16-bit audio for editors and transcription tools. Decoded in your browser, so nothing is uploaded.',
    steps: [
      { name: 'Add your M4A file', text: 'Click Select Files or drop up to 20 M4A files onto the converter.' },
      { name: 'Convert to WAV', text: 'Press Convert. The audio is decoded to 16-bit PCM. The first conversion downloads the audio engine (about 30 MB).' },
      { name: 'Download', text: 'Save the WAV, which will be several times larger than the M4A.' },
    ],
    understanding: {
      paragraphs: [
        'An M4A normally holds AAC audio, which is lossy. Converting to WAV decodes it once and stores the result uncompressed, as 16-bit PCM at the original sample rate.',
        'No second lossy step is involved, so this conversion does not reduce quality. It does not raise it either: the WAV is the M4A\'s sound, frozen in an uncompressed form that editors can work on without re-compressing.',
        'If the M4A contains Apple Lossless (ALAC) audio, the WAV is a true lossless copy at 16 bits. Copy-protected files cannot be decoded.',
      ],
      graphics: [
        {
          kind: 'flow',
          caption: 'One decode, no further compression.',
          steps: [
            { label: 'M4A', detail: 'AAC or ALAC audio' },
            { label: 'Decode', detail: 'to raw samples' },
            { label: 'WAV', detail: '16-bit PCM' },
          ],
        },
        {
          kind: 'sizeBars',
          caption: 'A four-minute stereo recording.',
          unit: 'MB',
          bars: [
            { label: 'M4A (AAC at 256 kbps)', value: 7.7 },
            { label: 'WAV, 16-bit 44.1 kHz', value: 42.3, highlight: true },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Editing a voice memo or interview', text: 'Some editors import WAV more reliably than M4A, and edits are saved without another lossy pass.' },
        { title: 'Transcription and speech tools', text: 'Several speech-recognition tools and telephony systems require WAV input.' },
        { title: 'Bringing GarageBand or iPhone audio into other software', text: 'WAV is the format every digital audio workstation accepts.' },
      ],
      keepOriginal:
        'Keep the M4A for listening, sharing and storage. It is a fraction of the size and sounds the same. Make a WAV only when a tool needs one.',
    },
    faqs: [
      { q: 'Is quality lost when converting M4A to WAV?', a: 'No. The audio is decoded once and stored uncompressed. It is also not improved.' },
      { q: 'What bit depth and sample rate does the WAV use?', a: '16-bit, at the sample rate of the source, usually 44.1 or 48 kHz.' },
      { q: 'Why is the WAV so large?', a: 'Uncompressed audio takes about 10 MB per minute in stereo, regardless of content.' },
      { q: 'Will a protected iTunes file convert?', a: 'No. DRM-protected files cannot be decoded.' },
    ],
  },

  'aac-to-mp3': {
    title: 'AAC to MP3 Converter Online — Free, 192 kbps',
    metaDescription:
      'Convert AAC to MP3 online for free at 192 kbps so raw .aac files play in any player or editor. Runs in your browser with no upload or sign-up. Batch up to 20.',
    heading: 'AAC to MP3 Converter',
    description:
      'Convert AAC to MP3 online for free at 192 kbps so raw .aac files play in any player or editor. Converted in your browser, with no upload and no account.',
    steps: [
      { name: 'Add your AAC file', text: 'Click Select Files or drop up to 20 .aac files onto the converter.' },
      { name: 'Convert to MP3', text: 'Press Convert. The stream is decoded and encoded as a 192 kbps MP3. The first run downloads the audio engine.' },
      { name: 'Download', text: 'Save the MP3, or a ZIP of the batch.' },
    ],
    understanding: {
      paragraphs: [
        'A file ending in .aac is a bare AAC audio stream, without the M4A or MP4 container that usually wraps it. Recorders, streaming captures and some broadcast tools produce these. Many players handle AAC inside M4A but stumble on a raw .aac file, and such files often cannot be seeked or tagged properly.',
        'AAC is the more efficient codec, so going to MP3 is a step sideways for compatibility, not an upgrade. The audio is decoded and compressed again, with a small loss. At 192 kbps that loss is minor for music and inaudible for speech.',
      ],
      graphics: [
        {
          kind: 'flow',
          caption: 'A raw AAC stream is decoded and re-encoded as MP3.',
          steps: [
            { label: '.aac stream', detail: 'no container' },
            { label: 'Decode', detail: 'to raw samples' },
            { label: 'Encode MP3', detail: '192 kbps' },
            { label: '.mp3 file', detail: 'seekable, taggable' },
          ],
        },
        {
          kind: 'table',
          caption: 'AAC and MP3 side by side.',
          columns: ['AAC', 'MP3'],
          rows: [
            { label: 'Introduced', a: '1997', b: '1993' },
            { label: 'Quality per bitrate', a: 'Higher', b: 'Lower' },
            { label: 'Raw file support', a: 'Uneven', b: 'Universal' },
            { label: 'Tags', a: 'Not in a raw stream', b: 'ID3' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'A recorder or capture tool gave you .aac files', text: 'Converting makes them playable and seekable in ordinary players.' },
        { title: 'An editor or upload form rejects .aac', text: 'MP3 is on every accepted-formats list.' },
        { title: 'You need tags', text: 'MP3 files carry title, artist and album information that a raw AAC stream cannot.' },
      ],
      keepOriginal:
        'Keep the AAC if your player handles it. It is the higher-quality file. If you only need it to behave like a normal audio file on Apple devices, placing it in an M4A container without re-encoding is lossless, though that needs a desktop tool.',
    },
    faqs: [
      { q: 'What is the difference between .aac and .m4a?', a: 'The audio is the same codec. An .m4a wraps it in a container with timing and tags; an .aac file is the bare stream.' },
      { q: 'Is AAC better than MP3?', a: 'At the same bitrate, yes. MP3\'s advantage is that everything plays it.' },
      { q: 'Does the conversion reduce quality?', a: 'Slightly, since the audio is compressed a second time. It is rarely noticeable at 192 kbps.' },
      { q: 'What bitrate is used?', a: 'A constant 192 kbps.' },
    ],
  },

  'ogg-to-mp3': {
    title: 'OGG to MP3 Converter Online — Free, 192 kbps',
    metaDescription:
      'Convert OGG to MP3 online for free at 192 kbps so audio plays on iPhones, cars and any player. Runs in your browser with no upload or sign-up. Batch up to 20.',
    heading: 'OGG to MP3 Converter',
    description:
      'Convert OGG to MP3 online for free at 192 kbps so audio plays on iPhones, cars and any player. Runs in your browser with no upload or sign-up.',
    steps: [
      { name: 'Add your OGG file', text: 'Click Select Files or drop up to 20 .ogg files onto the converter.' },
      { name: 'Convert to MP3', text: 'Press Convert. The Vorbis audio is decoded and encoded as a 192 kbps MP3. The first run downloads the audio engine.' },
      { name: 'Download', text: 'Save the MP3, or a ZIP for several files.' },
    ],
    understanding: {
      paragraphs: [
        'OGG is an open container, and the audio inside is usually Vorbis. It was created as a patent-free alternative to MP3 and is common in games, open-source software and Wikipedia media.',
        'Technically Vorbis is at least as good as MP3. The problem is support: Apple\'s apps, many car stereos and plenty of consumer devices never added it. MP3 plays on all of them.',
        'Both formats are lossy, so the conversion decodes the audio and compresses it again. That costs a little quality. A low-bitrate OGG will still sound like a low-bitrate file as an MP3.',
      ],
      graphics: [
        {
          kind: 'flow',
          caption: 'Vorbis audio is decoded and re-encoded as MP3.',
          steps: [
            { label: 'OGG container', detail: 'Vorbis audio' },
            { label: 'Decode', detail: 'to raw samples' },
            { label: 'Encode MP3', detail: '192 kbps' },
            { label: '.mp3 file' },
          ],
        },
        {
          kind: 'table',
          caption: 'OGG Vorbis compared with MP3.',
          columns: ['OGG Vorbis', 'MP3'],
          rows: [
            { label: 'Licence', a: 'Open, royalty-free', b: 'Patents expired in 2017' },
            { label: 'Quality per bitrate', a: 'Equal or better', b: 'Baseline' },
            { label: 'Common in', a: 'Games, Linux, web audio', b: 'Everything' },
            { label: 'Apple apps', a: 'Mostly unsupported', b: 'Supported' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Playing on an iPhone or in iTunes', text: 'Apple\'s Music app does not import OGG files. MP3 goes straight in.' },
        { title: 'Audio extracted from a game or app', text: 'Game assets are often OGG. MP3 lets you use them in editors and players.' },
        { title: 'USB sticks for car stereos', text: 'Head units reliably read MP3 and frequently ignore OGG.' },
      ],
      graphic: {
        kind: 'support',
        caption: 'Where each format plays.',
        columns: ['OGG', 'MP3'],
        rows: [
          { label: 'Android, Linux, web browsers', a: 'yes', b: 'yes' },
          { label: 'Windows', a: 'partial', b: 'yes' },
          { label: 'iPhone and Apple Music app', a: 'no', b: 'yes' },
          { label: 'Car stereos and portable players', a: 'partial', b: 'yes' },
        ],
      },
      keepOriginal:
        'Keep the OGG when your device or software plays it, since converting can only lose quality. This applies especially to game and web projects, which use OGG deliberately.',
    },
    faqs: [
      { q: 'Does converting OGG to MP3 lose quality?', a: 'A little. Both are lossy, so the audio is compressed twice. The result cannot be better than the OGG.' },
      { q: 'Does it work with OGG files that contain Opus audio?', a: 'Files with an .ogg extension that hold Opus audio are decoded as well. Files with the .opus extension are not accepted.' },
      { q: 'Why does Apple not play OGG?', a: 'Apple never built Vorbis support into its media apps, so OGG files have to be converted for iPhone, iPad and the Music app.' },
      { q: 'What bitrate will the MP3 be?', a: 'A constant 192 kbps, whatever the bitrate of the OGG.' },
    ],
  },
};
