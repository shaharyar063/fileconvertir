import type { ConversionPage } from './types';
import { steps } from './helpers';

/** Audio conversions from MP3 and WAV. Encoded with FFmpeg in the browser; codecs use FFmpeg defaults. */
export const AUDIO_PAGES_A: Record<string, ConversionPage> = {
  'mp3-to-aac': {
    title: 'MP3 to AAC Converter Online — Free, No Upload',
    metaDescription:
      'Convert MP3 to AAC online for free. Re-encodes your audio as a raw AAC stream in your browser with no upload or sign-up. Up to 20 files, 100 MB each.',
    heading: 'MP3 to AAC Converter',
    description:
      'Convert MP3 to AAC online for free: your audio is decoded and re-encoded as an AAC stream. Everything runs in your browser.',
    steps: steps('mp3', 'aac', 'Press Convert. The first conversion downloads the audio engine (about 30 MB); then the MP3 is decoded and encoded as AAC with FFmpeg\'s default settings.'),
    understanding: {
      paragraphs: [
        'MP3 and AAC are both lossy codecs, and AAC is the newer design. Converting between them means decoding the MP3 to raw sound and compressing it again, so the file is encoded twice and a little quality is lost on the second pass.',
        'The result is a raw .aac stream. It plays in VLC, most Android players and many car stereos, but it carries no title or artist tags and is awkward to skip around in. Apple devices prefer the M4A wrapper for the same codec.',
        'Because the MP3 is already degraded, AAC will not make it sound better, and a smaller file is not guaranteed.',
      ],
      graphics: [
        {
          kind: 'flow',
          caption: 'Two lossy passes: decode MP3, encode AAC.',
          steps: [
            { label: 'MP3', detail: 'already lossy' },
            { label: 'Decode', detail: 'to raw samples' },
            { label: 'Encode AAC', detail: 'second lossy pass' },
            { label: '.aac stream', detail: 'no tags' },
          ],
        },
        {
          kind: 'table',
          caption: 'MP3 and the raw AAC stream compared.',
          columns: ['MP3', 'AAC stream'],
          rows: [
            { label: 'Metadata tags', a: 'Supported', b: 'Not carried over' },
            { label: 'Seeking', a: 'Good', b: 'Limited' },
            { label: 'Apple Music app', a: 'Plays', b: 'Poor, use M4A' },
            { label: 'Encoding passes', a: 'One', b: 'Two' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'A device or app that asks for AAC', text: 'Some players and game engines list AAC but not MP3.' },
        { title: 'Testing how audio sounds in AAC', text: 'Producing a quick AAC copy lets you compare codecs on your own track.' },
      ],
      keepOriginal:
        'Keep the MP3 as it is unless something requires AAC. Go back to your original WAV or FLAC for any new lossy copy, since encoding from MP3 stacks losses.',
    },
    faqs: [
      { q: 'Will AAC sound better than my MP3?', a: 'No. The detail the MP3 discarded cannot return, and the second encode adds a little more loss.' },
      { q: 'Why does the file have no title or artist?', a: 'The raw AAC stream has nowhere to store tags. Use MP3 to M4A if you need tags.' },
      { q: 'Can I pick the bitrate?', a: 'No. AAC uses FFmpeg\'s default setting.' },
      { q: 'Will it play on an iPhone?', a: 'Not reliably in the Music app. Convert to M4A for Apple devices.' },
    ],
  },

  'mp3-to-ogg': {
    title: 'MP3 to OGG Converter Online — Free, No Upload',
    metaDescription:
      'Convert MP3 to OGG Vorbis online for free. Re-encodes the audio in your browser with no upload or sign-up, for games, Linux and web projects. 100 MB limit.',
    heading: 'MP3 to OGG Converter',
    description:
      'Convert MP3 to OGG online for free: your track is decoded and re-encoded as Vorbis. Nothing leaves your device.',
    steps: steps('mp3', 'ogg', 'Press Convert. After the one-off audio engine download, the MP3 is decoded and re-encoded with the Vorbis codec at FFmpeg\'s default quality.'),
    understanding: {
      paragraphs: [
        'OGG with Vorbis is an open, royalty-free alternative to MP3. It is popular in games, open-source software and some web audio, and it is built into Android and most browsers other than Safari on older versions.',
        'MP3 is lossy, so this is a lossy-to-lossy conversion. The audio is decoded and compressed again, which adds a second round of loss. It will not recover anything the MP3 threw away.',
        'File size depends on the default Vorbis quality and the track itself, so the OGG may be smaller or larger than your MP3.',
      ],
      graphics: [
        {
          kind: 'flow',
          caption: 'The MP3 is fully decoded before Vorbis encodes it.',
          steps: [
            { label: 'MP3', detail: 'lossy' },
            { label: 'Decode', detail: 'to raw samples' },
            { label: 'Encode Vorbis', detail: 'lossy again' },
            { label: '.ogg file' },
          ],
        },
        {
          kind: 'support',
          caption: 'Where each format plays.',
          columns: ['OGG', 'MP3'],
          rows: [
            { label: 'Android, Linux, game engines', a: 'yes', b: 'yes' },
            { label: 'Web browsers', a: 'yes', b: 'yes' },
            { label: 'iPhone Music app', a: 'no', b: 'yes' },
            { label: 'Car stereos', a: 'partial', b: 'yes' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Game or app assets', text: 'Many engines and open-source tools prefer OGG for sound effects and music.' },
        { title: 'Avoiding MP3 for licensing preference', text: 'Vorbis is free of royalties by design, which some projects like to state outright.' },
        { title: 'HTML5 audio fallback', text: 'Pair an OGG with an MP3 so every browser has something it can play.' },
      ],
      keepOriginal:
        'Keep the MP3 for phones, cars and iTunes. If you still have the uncompressed original, encode OGG from that instead.',
    },
    faqs: [
      { q: 'Does OGG always mean Vorbis?', a: 'Here, yes. The converter writes Vorbis audio into an OGG file.' },
      { q: 'Is the sound identical to the MP3?', a: 'Very close, but not identical, since it is compressed a second time.' },
      { q: 'Can I choose a quality level?', a: 'No. FFmpeg\'s default is used.' },
      { q: 'Will it play on iPhone?', a: 'Not in the Music app. Use M4A or MP3 for Apple devices.' },
    ],
  },

  'mp3-to-flac': {
    title: 'MP3 to FLAC Converter Online — Free, No Upload',
    metaDescription:
      'Convert MP3 to FLAC online for free. Wraps the decoded audio losslessly in your browser; it will not restore lost quality. No upload or sign-up needed.',
    heading: 'MP3 to FLAC Converter',
    description:
      'Convert MP3 to FLAC online for free. The audio is stored losslessly, but converting cannot restore quality the MP3 lost.',
    steps: steps('mp3', 'flac', 'Press Convert. The MP3 is decoded and the samples are stored in FLAC with no further loss.'),
    understanding: {
      paragraphs: [
        'FLAC is lossless: it stores exactly the samples it is given. The samples here come from decoding an MP3, so the FLAC faithfully preserves what the MP3 sounded like, including everything it had already lost.',
        'It does not turn an MP3 into a high-resolution recording. Expect a file several times larger than the MP3 with identical sound.',
        'The conversion is useful when a tool, a player or a library insists on FLAC, not as a way to improve quality.',
      ],
      graphics: [
        {
          kind: 'wave',
          caption: 'Illustration: FLAC keeps the MP3\'s decoded sound exactly, with no extra detail added.',
          alt: 'Two matching waveforms with the same overall shape and no fine ripples, showing the FLAC identical to the decoded MP3.',
          left: { label: 'MP3, decoded', detail: 'reduced' },
          right: { label: 'FLAC: same sound', detail: 'reduced' },
        },
        {
          kind: 'table',
          caption: 'What changes and what does not.',
          columns: ['MP3', 'FLAC output'],
          rows: [
            { label: 'Compression', a: 'Lossy', b: 'Lossless' },
            { label: 'Sound quality', a: 'As encoded', b: 'Identical to the MP3' },
            { label: 'File size', a: 'Small', b: 'Several times larger' },
            { label: 'Recovers lost detail', a: 'Not applicable', b: 'No' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'A library or player that only takes FLAC', text: 'Some tools reject MP3 but accept lossless files.' },
        { title: 'Editing without adding more loss', text: 'Working in a lossless format avoids stacking new MP3 compression on every save.' },
      ],
      keepOriginal:
        'Keep the MP3 if size matters. The FLAC will not sound better, and it is much bigger.',
    },
    faqs: [
      { q: 'Does FLAC improve my MP3?', a: 'No. It stores the MP3\'s sound exactly, nothing more.' },
      { q: 'Why is the file so much larger?', a: 'FLAC keeps every sample uncompressed in quality terms, while MP3 discards detail to save space.' },
      { q: 'Is it truly lossless?', a: 'Yes, from the decoded MP3 onward.' },
      { q: 'Will tags carry over?', a: 'Support for tags depends on the file; do not rely on them.' },
    ],
  },

  'mp3-to-m4a': {
    title: 'MP3 to M4A Converter Online — Free, No Upload',
    metaDescription:
      'Convert MP3 to M4A online for free. Re-encodes your audio as AAC in an Apple-friendly file, in your browser with no upload or sign-up. 100 MB per file.',
    heading: 'MP3 to M4A Converter',
    description:
      'Convert MP3 to M4A online for free: your audio is re-encoded as AAC in an Apple-friendly file. Nothing is uploaded.',
    steps: steps('mp3', 'm4a', 'Press Convert. The MP3 is decoded and encoded again as AAC inside an MP4 container.'),
    understanding: {
      paragraphs: [
        'M4A is AAC audio inside an MP4 container, the format iPhones, iPads and Macs use for songs and voice recordings. Unlike a bare .aac stream it can hold tags and seeks properly.',
        'This is not a simple re-wrap: MP3 and AAC are different codecs, so the audio is decoded and compressed again. The second lossy pass costs a small amount of quality.',
        'Use it when an Apple app or a ringtone workflow wants M4A. For everything else, the MP3 you already have plays almost everywhere.',
      ],
      graphics: [
        {
          kind: 'flow',
          caption: 'MP3 is decoded, then AAC is written into an MP4 container.',
          steps: [
            { label: 'MP3', detail: 'lossy' },
            { label: 'Decode', detail: 'to raw samples' },
            { label: 'Encode AAC', detail: 'second lossy pass' },
            { label: '.m4a file', detail: 'MP4 container' },
          ],
        },
        {
          kind: 'support',
          caption: 'Where each format plays.',
          columns: ['M4A', 'MP3'],
          rows: [
            { label: 'iPhone, iPad, Mac', a: 'yes', b: 'yes' },
            { label: 'Windows and Android', a: 'yes', b: 'yes' },
            { label: 'Older portable players', a: 'partial', b: 'yes' },
            { label: 'Upload forms', a: 'partial', b: 'yes' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Apple apps that ask for M4A', text: 'GarageBand and iPhone ringtone tools work with AAC-based files.' },
        { title: 'Tagged audio from a bare conversion', text: 'M4A keeps title and artist fields that a raw AAC stream cannot.' },
      ],
      keepOriginal:
        'Keep the MP3 as the main copy. Re-encoding MP3 to M4A does not improve it and loses a little.',
    },
    faqs: [
      { q: 'Is M4A better than MP3?', a: 'The codec is more efficient, but converting from MP3 cannot add quality.' },
      { q: 'Does it keep the artist and title?', a: 'Do not rely on it; check the output in your player.' },
      { q: 'Can I set the bitrate?', a: 'No. FFmpeg\'s default AAC setting is used.' },
      { q: 'Is this the same as renaming the file?', a: 'No. The audio is re-encoded.' },
    ],
  },

  'wav-to-aac': {
    title: 'WAV to AAC Converter Online — Free, No Upload',
    metaDescription:
      'Convert WAV to AAC online for free. Compress large recordings into a raw AAC stream in your browser with no upload or sign-up. Up to 100 MB per file.',
    heading: 'WAV to AAC Converter',
    description:
      'Convert WAV to AAC online for free: large recordings are compressed into an AAC stream. Encoded in your browser.',
    steps: steps('wav', 'aac', 'Press Convert. The first run loads the audio engine (about 30 MB), then the WAV samples are compressed to AAC at FFmpeg\'s default setting.'),
    understanding: {
      paragraphs: [
        'WAV is uncompressed, so AAC shrinks it dramatically by discarding detail that is hard to hear.',
        'The output is a raw .aac stream. It plays in VLC and most Android players, but it has no tags and limited seeking. For Apple devices or tagged files, WAV to M4A is the better choice.',
        'The loss is permanent. Keep your WAV if you may edit or re-encode the recording again.',
      ],
      graphics: [
        {
          kind: 'sizeBars',
          caption: 'A four-minute stereo recording at CD quality.',
          unit: 'MB',
          bars: [
            { label: 'WAV', value: 42.3 },
            { label: 'AAC at about 128 kbps', value: 3.8, highlight: true },
          ],
        },
        {
          kind: 'wave',
          caption: 'Illustration: AAC keeps the overall shape and drops fine detail.',
          alt: 'Two waveforms. The WAV waveform has fine ripples; the AAC waveform has the same shape with the ripples reduced.',
          left: { label: 'WAV: every sample', detail: 'full' },
          right: { label: 'AAC: detail reduced', detail: 'reduced' },
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Shrinking a voice recording or demo', text: 'The AAC file is a fraction of the size, which suits email and chat.' },
        { title: 'A pipeline that needs an AAC stream', text: 'Some video and streaming tools consume .aac audio directly.' },
      ],
      keepOriginal:
        'Keep the WAV as your master. For a version with tags that Apple devices open, use WAV to M4A.',
    },
    faqs: [
      { q: 'How much smaller is the AAC?', a: 'Roughly ten times smaller than a CD-quality WAV with FFmpeg\'s default setting.' },
      { q: 'Is anything lost?', a: 'Yes. AAC is lossy, and the loss cannot be reversed.' },
      { q: 'Why is there no metadata?', a: 'A raw AAC stream cannot store tags.' },
      { q: 'Which is better for iPhone, AAC or M4A?', a: 'M4A.' },
    ],
  },

  'wav-to-ogg': {
    title: 'WAV to OGG Converter Online — Free, No Upload',
    metaDescription:
      'Convert WAV to OGG Vorbis online for free. Compress recordings with an open codec in your browser, with no upload or sign-up. Up to 100 MB per file.',
    heading: 'WAV to OGG Converter',
    description:
      'Convert WAV to OGG online for free: recordings are compressed with the open Vorbis codec. Nothing is uploaded.',
    steps: steps('wav', 'ogg', 'Press Convert. The WAV samples are compressed with Vorbis at FFmpeg\'s default quality and saved in an OGG file.'),
    understanding: {
      paragraphs: [
        'Vorbis compresses audio with an open, royalty-free codec and is widely used in games and open-source software. Starting from a WAV gives it clean, uncompressed input, so this is the best case for quality.',
        'The compression is lossy but efficient: the OGG is a small fraction of the WAV. Browsers, Android and Linux play it natively. Apple\'s Music app does not.',
        'The quality level is FFmpeg\'s default and cannot be changed here.',
      ],
      graphics: [
        {
          kind: 'flow',
          caption: 'Uncompressed samples go straight into the Vorbis encoder.',
          steps: [
            { label: 'WAV', detail: 'raw samples' },
            { label: 'Encode Vorbis', detail: 'lossy, one pass' },
            { label: '.ogg file', detail: 'much smaller' },
          ],
        },
        {
          kind: 'support',
          caption: 'Where each format plays.',
          columns: ['OGG', 'WAV'],
          rows: [
            { label: 'Web browsers', a: 'yes', b: 'yes' },
            { label: 'Android and Linux', a: 'yes', b: 'yes' },
            { label: 'iPhone Music app', a: 'no', b: 'yes' },
            { label: 'Car stereos', a: 'partial', b: 'partial' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Game sound effects and music', text: 'Many engines expect OGG and handle it efficiently.' },
        { title: 'Web audio without MP3', text: 'Serve an OGG to browsers that favour open formats.' },
      ],
      keepOriginal:
        'Keep the WAV master for editing. OGG is for distribution, and Apple devices need MP3 or M4A instead.',
    },
    faqs: [
      { q: 'Is OGG lossy?', a: 'With Vorbis, yes.' },
      { q: 'How does it compare with MP3 in size?', a: 'Similar. The exact size depends on the audio.' },
      { q: 'Does it work on iPhone?', a: 'Not in the Music app.' },
      { q: 'Can I raise the quality?', a: 'Not here. The default is used.' },
    ],
  },

  'wav-to-m4a': {
    title: 'WAV to M4A Converter Online — Free, No Upload',
    metaDescription:
      'Convert WAV to M4A online for free. Compress recordings to AAC in an Apple-friendly file, in your browser with no upload or sign-up. 100 MB per file.',
    heading: 'WAV to M4A Converter',
    description:
      'Convert WAV to M4A online for free: recordings are compressed to AAC in a file that Apple devices open. Nothing is uploaded.',
    steps: steps('wav', 'm4a', 'Press Convert. The WAV is compressed to AAC at FFmpeg\'s default setting and stored in an MP4 container.'),
    understanding: {
      paragraphs: [
        'M4A holds AAC audio, the codec behind iTunes songs and iPhone voice memos. Compressing a WAV into it makes the file many times smaller while it remains easy to play on Apple and modern Android devices.',
        'The container supports tags and seeking, unlike a bare .aac stream, so it is the better AAC choice for music and voice.',
        'The compression is lossy and permanent. Keep the WAV if you will edit the recording later.',
      ],
      graphics: [
        {
          kind: 'sizeBars',
          caption: 'A four-minute stereo recording at CD quality.',
          unit: 'MB',
          bars: [
            { label: 'WAV', value: 42.3 },
            { label: 'M4A (AAC, about 128 kbps)', value: 3.8, highlight: true },
          ],
        },
        {
          kind: 'flow',
          caption: 'Samples are compressed to AAC and placed in an MP4 container.',
          steps: [
            { label: 'WAV', detail: 'raw samples' },
            { label: 'Encode AAC', detail: 'lossy' },
            { label: 'MP4 container' },
            { label: '.m4a file', detail: 'tags, seeking' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Sharing a recording to an iPhone', text: 'M4A opens in Files, Messages and the Music app without extra apps.' },
        { title: 'Making a podcast or voice draft smaller', text: 'AAC keeps speech clear at a small size.' },
        { title: 'Archive-friendly tagged copies', text: 'M4A can carry artist and title fields.' },
      ],
      keepOriginal:
        'Keep the WAV as the master. If a site wants MP3 specifically, use WAV to MP3 instead.',
    },
    faqs: [
      { q: 'Is M4A lossless?', a: 'Not here. The converter writes lossy AAC.' },
      { q: 'Will it play on Windows?', a: 'Yes, in current versions of Windows and Android.' },
      { q: 'How much smaller will it be?', a: 'Around ten times smaller than CD-quality WAV with the default setting.' },
      { q: 'Can I choose the bitrate?', a: 'No.' },
    ],
  },
};
