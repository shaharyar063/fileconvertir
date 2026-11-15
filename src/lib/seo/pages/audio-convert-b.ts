import type { ConversionPage } from './types';
import { steps } from './helpers';

/** Audio conversions from OGG, FLAC, AAC and M4A. Encoded with FFmpeg in the browser. */
export const AUDIO_PAGES_B: Record<string, ConversionPage> = {
  'ogg-to-wav': {
    title: 'OGG to WAV Converter Online — Free, No Upload',
    metaDescription:
      'Convert OGG to WAV online for free. Decodes Vorbis audio to 16-bit PCM in your browser, with no upload or sign-up, for editing and old software. 100 MB limit.',
    heading: 'OGG to WAV Converter',
    description:
      'Convert OGG to WAV online for free: Vorbis audio is decoded to uncompressed 16-bit WAV. Nothing leaves your device.',
    steps: steps('ogg', 'wav', 'Press Convert. After the one-off audio engine download, the Vorbis audio is decoded to 16-bit PCM and saved as WAV.'),
    understanding: {
      paragraphs: [
        'WAV is the format audio editors, samplers and older software accept without fuss. Decoding an OGG into it is a single step and adds no new compression loss.',
        'The sound is the same as the OGG, since a lossy file cannot regain what it lost, but the file becomes many times larger because WAV stores every sample.',
        'Samples are written as 16-bit PCM. A 24-bit original is not possible after Vorbis, so nothing is lost by that choice.',
      ],
      graphics: [
        {
          kind: 'flow',
          caption: 'One decode, no further compression.',
          steps: [
            { label: 'OGG', detail: 'Vorbis audio' },
            { label: 'Decode', detail: 'to raw samples' },
            { label: 'WAV', detail: '16-bit PCM' },
          ],
        },
        {
          kind: 'table',
          caption: 'OGG compared with the WAV produced.',
          columns: ['OGG Vorbis', 'WAV'],
          rows: [
            { label: 'Compression', a: 'Lossy', b: 'None' },
            { label: 'File size', a: 'Small', b: 'About ten times larger' },
            { label: 'Editors and old software', a: 'Limited', b: 'Universal' },
            { label: 'Quality gain', a: 'Not applicable', b: 'None' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Editing a game or web sound', text: 'Audio editors open WAV directly, so you can trim and process it.' },
        { title: 'Software that rejects OGG', text: 'Many samplers, video editors and devices take WAV but not Vorbis.' },
      ],
      keepOriginal:
        'Keep the OGG for storage and sharing. The WAV is for working on the audio and is far bigger.',
    },
    faqs: [
      { q: 'Does WAV improve the sound?', a: 'No. It holds exactly what the OGG decodes to.' },
      { q: 'Why is the WAV so large?', a: 'It contains every sample without compression.' },
      { q: 'What bit depth is used?', a: '16-bit.' },
      { q: 'Will metadata be kept?', a: 'Tags generally do not carry over to WAV.' },
    ],
  },

  'ogg-to-aac': {
    title: 'OGG to AAC Converter Online — Free, No Upload',
    metaDescription:
      'Convert OGG to AAC online for free. Re-encodes Vorbis audio as an AAC stream in your browser with no upload or sign-up. Up to 20 files at 100 MB each.',
    heading: 'OGG to AAC Converter',
    description:
      'Convert OGG to AAC online for free: Vorbis audio is decoded and re-encoded as an AAC stream. Nothing is uploaded.',
    steps: steps('ogg', 'aac', 'Press Convert. The Vorbis audio is decoded and compressed again as AAC with FFmpeg\'s default setting.'),
    understanding: {
      paragraphs: [
        'OGG Vorbis and AAC are unrelated lossy codecs, so there is no shortcut: the audio is decoded and compressed a second time. That second pass costs a little quality.',
        'The output is a raw .aac stream with no tags, which is fine for players and tools that read AAC but poor for organising music. Apple apps prefer the M4A wrapper.',
        'Convert only if something refuses OGG. Phones and players from the Apple world do not play Vorbis.',
      ],
      graphics: [
        {
          kind: 'flow',
          caption: 'Vorbis is decoded, then compressed again as AAC.',
          steps: [
            { label: 'OGG', detail: 'Vorbis, lossy' },
            { label: 'Decode', detail: 'to raw samples' },
            { label: 'Encode AAC', detail: 'second lossy pass' },
            { label: '.aac stream' },
          ],
        },
        {
          kind: 'support',
          caption: 'Where each format plays.',
          columns: ['AAC stream', 'OGG'],
          rows: [
            { label: 'iPhone Music app', a: 'partial', b: 'no' },
            { label: 'Android', a: 'yes', b: 'yes' },
            { label: 'Web browsers', a: 'yes', b: 'yes' },
            { label: 'Metadata tags', a: 'no', b: 'yes' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'A device that will not open OGG', text: 'Many Apple and car systems skip Vorbis but accept AAC.' },
        { title: 'Feeding an AAC-only tool', text: 'Some streaming and video tools read raw AAC audio.' },
      ],
      keepOriginal:
        'Keep the OGG as your source. For a tagged file on Apple devices, use OGG to M4A.',
    },
    faqs: [
      { q: 'Does converting lower the quality?', a: 'Slightly, because lossy audio is compressed twice.' },
      { q: 'Will tags carry over?', a: 'No. A raw AAC stream has nowhere to store them.' },
      { q: 'Is it better than M4A?', a: 'No, for most uses M4A is easier to play and tag.' },
      { q: 'Can I set the bitrate?', a: 'No.' },
    ],
  },

  'ogg-to-flac': {
    title: 'OGG to FLAC Converter Online — Free, No Upload',
    metaDescription:
      'Convert OGG to FLAC online for free. Stores the decoded Vorbis audio losslessly in your browser; it will not restore lost quality. No upload or sign-up.',
    heading: 'OGG to FLAC Converter',
    description:
      'Convert OGG to FLAC online for free: the Vorbis audio is stored losslessly, though quality the OGG lost cannot return.',
    steps: steps('ogg', 'flac', 'Press Convert. The Vorbis audio is decoded and its samples are saved in FLAC without more loss.'),
    understanding: {
      paragraphs: [
        'FLAC is a lossless container for audio. Putting an OGG into it preserves exactly what the Vorbis file sounded like, with no new loss, but also no restored detail.',
        'The FLAC will be much larger than the OGG for the same sound. It is useful when a library or workflow requires FLAC, not as a quality upgrade.',
        'If you have the original uncompressed recording, use that for FLAC instead.',
      ],
      graphics: [
        {
          kind: 'wave',
          caption: 'Illustration: FLAC keeps the decoded OGG sound exactly, with no added detail.',
          alt: 'Two matching waveforms with the same reduced detail, showing the FLAC identical to the decoded OGG.',
          left: { label: 'OGG, decoded', detail: 'reduced' },
          right: { label: 'FLAC: same sound', detail: 'reduced' },
        },
        {
          kind: 'table',
          caption: 'OGG and FLAC compared.',
          columns: ['OGG Vorbis', 'FLAC output'],
          rows: [
            { label: 'Compression', a: 'Lossy', b: 'Lossless' },
            { label: 'File size', a: 'Small', b: 'Several times larger' },
            { label: 'Sound', a: 'As encoded', b: 'Identical to the OGG' },
            { label: 'Quality gain', a: 'Not applicable', b: 'None' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'A music library that wants FLAC files', text: 'Some players and taggers sort lossless files separately.' },
        { title: 'Editing without recompression', text: 'A lossless working copy avoids a new lossy round with each save.' },
      ],
      keepOriginal:
        'Keep the OGG if space matters. The FLAC will sound the same and take far more room.',
    },
    faqs: [
      { q: 'Will the FLAC sound better?', a: 'No.' },
      { q: 'Why is it bigger?', a: 'FLAC stores every sample, while Vorbis discards detail to save space.' },
      { q: 'Is the conversion lossless?', a: 'Yes, from the decoded Vorbis onwards.' },
      { q: 'Can I get the original quality back?', a: 'No. Use the original recording if you still have it.' },
    ],
  },

  'ogg-to-m4a': {
    title: 'OGG to M4A Converter Online — Free, No Upload',
    metaDescription:
      'Convert OGG to M4A online for free. Re-encodes Vorbis audio as AAC in an Apple-friendly file, in your browser with no upload or sign-up. 100 MB per file.',
    heading: 'OGG to M4A Converter',
    description:
      'Convert OGG to M4A online for free: Vorbis audio is re-encoded as AAC in a file Apple devices play. Nothing is uploaded.',
    steps: steps('ogg', 'm4a', 'Press Convert. The Vorbis audio is decoded and compressed again as AAC inside an MP4 container.'),
    understanding: {
      paragraphs: [
        'iPhones, iPads and the Music app do not play OGG. M4A is the format they expect, so converting is the usual way to listen on Apple devices.',
        'The two formats use different lossy codecs, so the audio is decoded and compressed again, which costs a small amount of quality.',
        'M4A files can carry tags and seek smoothly, which is why this is usually a better choice than a bare AAC stream.',
      ],
      graphics: [
        {
          kind: 'flow',
          caption: 'Vorbis is decoded and re-encoded as AAC in an MP4 container.',
          steps: [
            { label: 'OGG', detail: 'Vorbis' },
            { label: 'Decode', detail: 'to raw samples' },
            { label: 'Encode AAC', detail: 'second lossy pass' },
            { label: '.m4a file', detail: 'MP4 container' },
          ],
        },
        {
          kind: 'support',
          caption: 'Where each format plays.',
          columns: ['M4A', 'OGG'],
          rows: [
            { label: 'iPhone, iPad, Mac', a: 'yes', b: 'no' },
            { label: 'Windows', a: 'yes', b: 'partial' },
            { label: 'Android', a: 'yes', b: 'yes' },
            { label: 'Linux players', a: 'yes', b: 'yes' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Putting a game soundtrack on an iPhone', text: 'OGG files from games will not open in the Music app until converted.' },
        { title: 'Sharing audio with Apple users', text: 'M4A plays in Messages, Mail and Files.' },
      ],
      keepOriginal:
        'Keep the OGG for Linux, Android and the web where it plays natively.',
    },
    faqs: [
      { q: 'Why will my iPhone not play OGG?', a: 'Apple does not include a Vorbis player in its Music app.' },
      { q: 'Is quality lost?', a: 'A little, as the audio is compressed a second time.' },
      { q: 'Are tags kept?', a: 'Do not rely on it; check in your player.' },
      { q: 'Can I choose the bitrate?', a: 'No.' },
    ],
  },

  'flac-to-wav': {
    title: 'FLAC to WAV Converter Online — Free, Lossless',
    metaDescription:
      'Convert FLAC to WAV online for free with no loss in quality. Decompresses to 16-bit PCM in your browser, with no upload or sign-up. 100 MB per file.',
    heading: 'FLAC to WAV Converter',
    description:
      'Convert FLAC to WAV online for free with no loss in quality: the audio is decompressed to 16-bit WAV. Nothing is uploaded.',
    steps: steps('flac', 'wav', 'Press Convert. After the one-off audio engine download, the FLAC is decompressed to 16-bit PCM and saved as WAV.'),
    understanding: {
      paragraphs: [
        'FLAC and WAV hold the same audio. FLAC compresses it without loss, and WAV stores it raw, so converting between them changes the file size but not the sound.',
        'The result is typically around twice the size of the FLAC. Editors, samplers, CD-burning tools and older hardware take WAV where FLAC is not supported.',
        'Samples are written at 16 bits. A 24-bit FLAC is reduced to 16-bit, so for master files keep the original.',
      ],
      graphics: [
        {
          kind: 'flow',
          caption: 'Lossless decompression, no new loss.',
          steps: [
            { label: 'FLAC', detail: 'compressed, lossless' },
            { label: 'Decode', detail: 'to raw samples' },
            { label: 'WAV', detail: '16-bit PCM' },
          ],
        },
        {
          kind: 'table',
          caption: 'FLAC and the WAV produced.',
          columns: ['FLAC', 'WAV'],
          rows: [
            { label: 'Sound quality', a: 'Lossless', b: 'Identical' },
            { label: 'File size', a: 'About half of WAV', b: 'Larger' },
            { label: 'Tags and artwork', a: 'Supported', b: 'Mostly not carried over' },
            { label: 'Bit depth here', a: 'Up to 24-bit', b: '16-bit' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Burning an audio CD', text: 'Many CD tools accept WAV and reject FLAC.' },
        { title: 'Editing in software without FLAC support', text: 'Older audio editors and video tools read WAV only.' },
        { title: 'Sending to a mastering or broadcast service', text: 'Some require WAV deliveries.' },
      ],
      keepOriginal:
        'Keep the FLAC for your library: it is smaller and holds tags. Create a WAV only when a tool needs it.',
    },
    faqs: [
      { q: 'Is any quality lost?', a: 'No. Both are lossless. 24-bit audio is written at 16-bit, though.' },
      { q: 'Why is the WAV bigger?', a: 'FLAC compresses the data and WAV does not.' },
      { q: 'Are tags kept?', a: 'Not reliably.' },
      { q: 'Can I convert back to FLAC later?', a: 'Yes, without loss.' },
    ],
  },

  'flac-to-aac': {
    title: 'FLAC to AAC Converter Online — Free, No Upload',
    metaDescription:
      'Convert FLAC to AAC online for free. Compress lossless audio into a small AAC stream in your browser with no upload or sign-up. Up to 100 MB per file.',
    heading: 'FLAC to AAC Converter',
    description:
      'Convert FLAC to AAC online for free: lossless audio is compressed into a small AAC stream. Nothing is uploaded.',
    steps: steps('flac', 'aac', 'Press Convert. The FLAC is decoded and compressed to AAC with FFmpeg\'s default setting.'),
    understanding: {
      paragraphs: [
        'Going from FLAC to AAC trades exactness for size. AAC discards detail that is hard to hear, and the file ends up several times smaller than the FLAC.',
        'The output is a raw .aac stream with no title or artist tags. If you want a tagged file for an iPhone, FLAC to M4A is the better route.',
        'Because FLAC is a clean source, this is the ideal starting point for a lossy copy. The loss is permanent, so keep the FLAC.',
      ],
      graphics: [
        {
          kind: 'wave',
          caption: 'Illustration: the FLAC keeps every detail; the AAC keeps the shape of the sound.',
          alt: 'Two waveforms. The FLAC waveform has fine ripples; the AAC waveform has the same shape with the ripples reduced.',
          left: { label: 'FLAC: every sample', detail: 'full' },
          right: { label: 'AAC: detail reduced', detail: 'reduced' },
        },
        {
          kind: 'table',
          caption: 'FLAC compared with the AAC stream.',
          columns: ['FLAC', 'AAC stream'],
          rows: [
            { label: 'Compression', a: 'Lossless', b: 'Lossy' },
            { label: 'File size', a: 'Large', b: 'Several times smaller' },
            { label: 'Tags', a: 'Supported', b: 'Not carried over' },
            { label: 'Reversible', a: 'Not applicable', b: 'No' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Fitting a library on a phone', text: 'AAC copies take a fraction of the space.' },
        { title: 'An AAC-only tool or device', text: 'Some players and video tools want AAC audio.' },
      ],
      keepOriginal:
        'Keep the FLAC as your master library. Make AAC copies from it whenever you need them.',
    },
    faqs: [
      { q: 'Is AAC as good as FLAC?', a: 'It sounds very close to most listeners, but it is lossy and FLAC is not.' },
      { q: 'Can I get the FLAC back from the AAC?', a: 'No.' },
      { q: 'Why is there no artist or title?', a: 'The raw AAC stream cannot hold tags. Use M4A for tags.' },
      { q: 'Can I choose the bitrate?', a: 'No.' },
    ],
  },

  'flac-to-ogg': {
    title: 'FLAC to OGG Converter Online — Free, No Upload',
    metaDescription:
      'Convert FLAC to OGG online for free. Compress lossless audio with the open Vorbis codec in your browser, no upload or sign-up. Up to 100 MB per file.',
    heading: 'FLAC to OGG Converter',
    description:
      'Convert FLAC to OGG online for free: lossless audio is compressed with the open Vorbis codec. Nothing is uploaded.',
    steps: steps('flac', 'ogg', 'Press Convert. The FLAC is decoded and compressed with Vorbis at FFmpeg\'s default quality.'),
    understanding: {
      paragraphs: [
        'Vorbis is an open, royalty-free lossy codec, widely used in games and Linux software. Starting from lossless FLAC gives it the best possible input.',
        'The OGG is far smaller than the FLAC, and it plays in browsers, on Android and on Linux. Apple\'s Music app cannot play it.',
        'The compression is lossy and permanent, so keep your FLAC library as the master.',
      ],
      graphics: [
        {
          kind: 'flow',
          caption: 'Lossless audio is compressed once with Vorbis.',
          steps: [
            { label: 'FLAC', detail: 'lossless' },
            { label: 'Decode', detail: 'to raw samples' },
            { label: 'Encode Vorbis', detail: 'lossy' },
            { label: '.ogg file', detail: 'much smaller' },
          ],
        },
        {
          kind: 'support',
          caption: 'Where each format plays.',
          columns: ['OGG', 'FLAC'],
          rows: [
            { label: 'Android and Linux', a: 'yes', b: 'yes' },
            { label: 'Web browsers', a: 'yes', b: 'yes' },
            { label: 'iPhone Music app', a: 'no', b: 'partial' },
            { label: 'Game engines', a: 'yes', b: 'partial' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Game audio from a lossless library', text: 'Ship small OGG files while keeping masters in FLAC.' },
        { title: 'Streaming from your own server', text: 'OGG is light enough to stream over a slow connection.' },
      ],
      keepOriginal:
        'Keep the FLAC. OGG is for distribution and cannot be turned back into lossless audio.',
    },
    faqs: [
      { q: 'Is OGG lossless?', a: 'No. Vorbis is lossy.' },
      { q: 'How much smaller is it?', a: 'Several times smaller than the FLAC.' },
      { q: 'Does it work on iPhone?', a: 'Not in the Music app.' },
      { q: 'Can I pick a quality level?', a: 'No. The default is used.' },
    ],
  },

  'flac-to-m4a': {
    title: 'FLAC to M4A Converter Online — Free, No Upload',
    metaDescription:
      'Convert FLAC to M4A online for free. Compress lossless audio to AAC in an Apple-friendly file, in your browser with no upload or sign-up. 100 MB per file.',
    heading: 'FLAC to M4A Converter',
    description:
      'Convert FLAC to M4A online for free: lossless audio is compressed to AAC in a file Apple devices play. Nothing is uploaded.',
    steps: steps('flac', 'm4a', 'Press Convert. The FLAC is decoded and compressed to AAC at FFmpeg\'s default setting, then stored in an MP4 container.'),
    understanding: {
      paragraphs: [
        'iPhones and the Apple Music app do not play FLAC files directly in every case, but they handle M4A without trouble. Converting gives you a small, widely compatible copy of a lossless track.',
        'The audio becomes AAC, which is lossy. From a clean FLAC source the result sounds excellent to most listeners, but it is permanent and cannot be turned back into lossless.',
        'M4A supports title and artist tags, unlike a bare AAC stream, so it suits a music collection better.',
      ],
      graphics: [
        {
          kind: 'flow',
          caption: 'FLAC is decoded, compressed to AAC and wrapped in MP4.',
          steps: [
            { label: 'FLAC', detail: 'lossless' },
            { label: 'Decode', detail: 'to raw samples' },
            { label: 'Encode AAC', detail: 'lossy' },
            { label: '.m4a file', detail: 'MP4 container' },
          ],
        },
        {
          kind: 'support',
          caption: 'Where each format plays.',
          columns: ['M4A', 'FLAC'],
          rows: [
            { label: 'iPhone Music library', a: 'yes', b: 'partial' },
            { label: 'Windows and Android', a: 'yes', b: 'yes' },
            { label: 'Car stereos', a: 'partial', b: 'partial' },
            { label: 'Older portable players', a: 'partial', b: 'no' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Loading music onto an iPhone', text: 'M4A copies save space compared with a lossless library.' },
        { title: 'Sharing a track in a message or email', text: 'The file is far smaller than the FLAC.' },
      ],
      keepOriginal:
        'Keep the FLAC as the master. Create M4A copies for devices and delete them freely.',
    },
    faqs: [
      { q: 'Is M4A lossless?', a: 'Not here. The converter writes lossy AAC.' },
      { q: 'How much space will I save?', a: 'The M4A is typically several times smaller than the FLAC.' },
      { q: 'Does it keep the tags and artwork?', a: 'Do not rely on it; check in your player.' },
      { q: 'Can I set the bitrate?', a: 'No.' },
    ],
  },

  'aac-to-wav': {
    title: 'AAC to WAV Converter Online — Free, No Upload',
    metaDescription:
      'Convert AAC to WAV online for free. Decodes the AAC stream to 16-bit PCM in your browser, with no upload or sign-up, for editing and old software.',
    heading: 'AAC to WAV Converter',
    description:
      'Convert AAC to WAV online for free: the AAC stream is decoded to uncompressed 16-bit WAV. Nothing is uploaded.',
    steps: steps('aac', 'wav', 'Press Convert. The AAC stream is decoded to 16-bit PCM and saved as a WAV file.'),
    understanding: {
      paragraphs: [
        'A WAV file holds raw samples that every editor, sampler and burning tool understands. Decoding AAC to it needs one step and adds no new compression loss.',
        'The sound is the same as the AAC, since lost detail cannot return, but the file becomes roughly ten times larger.',
        'Choose it when you have to edit, burn or import audio into software that does not read AAC.',
      ],
      graphics: [
        {
          kind: 'flow',
          caption: 'The AAC stream is decoded to raw samples.',
          steps: [
            { label: '.aac stream', detail: 'lossy' },
            { label: 'Decode', detail: 'to raw samples' },
            { label: 'WAV', detail: '16-bit PCM' },
          ],
        },
        {
          kind: 'sizeBars',
          caption: 'A four-minute stereo recording.',
          unit: 'MB',
          bars: [
            { label: 'AAC at about 128 kbps', value: 3.8 },
            { label: 'WAV, 16-bit 44.1 kHz', value: 42.3, highlight: true },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Editing in a program without AAC support', text: 'Convert to WAV, edit, then export again.' },
        { title: 'Burning to an audio CD', text: 'Burning software usually wants WAV.' },
      ],
      keepOriginal:
        'Keep the AAC for listening and sharing, because the WAV is much bigger and sounds no better.',
    },
    faqs: [
      { q: 'Will WAV improve the AAC?', a: 'No.' },
      { q: 'Why is the file so large?', a: 'WAV stores every sample uncompressed.' },
      { q: 'Does it support .m4a files?', a: 'Use the M4A to WAV converter for those.' },
      { q: 'What bit depth is used?', a: '16-bit.' },
    ],
  },

  'aac-to-ogg': {
    title: 'AAC to OGG Converter Online — Free, No Upload',
    metaDescription:
      'Convert AAC to OGG online for free. Re-encodes the AAC stream with the open Vorbis codec in your browser, no upload or sign-up. Up to 100 MB per file.',
    heading: 'AAC to OGG Converter',
    description:
      'Convert AAC to OGG online for free: the AAC stream is decoded and re-encoded with the open Vorbis codec.',
    steps: steps('aac', 'ogg', 'Press Convert. The AAC is decoded and compressed again with Vorbis at FFmpeg\'s default quality.'),
    understanding: {
      paragraphs: [
        'AAC and Vorbis are different lossy codecs, so converting between them decodes the audio and compresses it a second time. Some quality is lost in the process, though most people will not hear it on ordinary speakers.',
        'OGG is useful when an open format is required, for example in games or Linux software.',
        'If you have the original recording, encode OGG from that instead.',
      ],
      graphics: [
        {
          kind: 'flow',
          caption: 'The AAC is decoded before Vorbis compresses it.',
          steps: [
            { label: '.aac stream', detail: 'lossy' },
            { label: 'Decode', detail: 'to raw samples' },
            { label: 'Encode Vorbis', detail: 'lossy again' },
            { label: '.ogg file' },
          ],
        },
        {
          kind: 'table',
          caption: 'AAC compared with OGG Vorbis.',
          columns: ['AAC', 'OGG Vorbis'],
          rows: [
            { label: 'Licence', a: 'Patented, widely licensed', b: 'Open, royalty-free' },
            { label: 'iPhone Music app', a: 'Partial', b: 'No' },
            { label: 'Game engines', a: 'Some', b: 'Common' },
            { label: 'Encoding passes', a: 'One', b: 'Two' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Open-source or game projects', text: 'These often prefer Vorbis over AAC.' },
        { title: 'Web audio', text: 'Offer an OGG next to an MP3 or M4A for browser compatibility.' },
      ],
      keepOriginal:
        'Keep the AAC if it plays where you need it. Converting between lossy formats only loses quality.',
    },
    faqs: [
      { q: 'Will the OGG sound worse?', a: 'Slightly, because the audio is compressed twice.' },
      { q: 'Is OGG smaller than AAC?', a: 'Not necessarily. It depends on the audio.' },
      { q: 'Will it play on iPhone?', a: 'Not in the Music app.' },
      { q: 'Can I choose the quality?', a: 'No.' },
    ],
  },

  'aac-to-flac': {
    title: 'AAC to FLAC Converter Online — Free, No Upload',
    metaDescription:
      'Convert AAC to FLAC online for free. Stores the decoded audio losslessly in your browser; it will not restore lost quality. No upload or sign-up needed.',
    heading: 'AAC to FLAC Converter',
    description:
      'Convert AAC to FLAC online for free: the decoded audio is stored losslessly, but lost quality does not come back.',
    steps: steps('aac', 'flac', 'Press Convert. The AAC stream is decoded and the samples are saved in FLAC without further loss.'),
    understanding: {
      paragraphs: [
        'FLAC stores audio without loss, but the samples it receives here come from an AAC that was already compressed. The FLAC preserves that sound faithfully and cannot add anything.',
        'Expect a file several times larger than the AAC. The conversion helps when a tool or a library only accepts FLAC.',
        'It is not a way to get studio quality from a streaming copy.',
      ],
      graphics: [
        {
          kind: 'wave',
          caption: 'Illustration: FLAC keeps the decoded AAC sound exactly, with no added detail.',
          alt: 'Two matching waveforms with the same reduced detail, showing the FLAC identical to the decoded AAC.',
          left: { label: 'AAC, decoded', detail: 'reduced' },
          right: { label: 'FLAC: same sound', detail: 'reduced' },
        },
        {
          kind: 'table',
          caption: 'AAC compared with FLAC output.',
          columns: ['AAC stream', 'FLAC'],
          rows: [
            { label: 'Compression', a: 'Lossy', b: 'Lossless' },
            { label: 'File size', a: 'Small', b: 'Several times larger' },
            { label: 'Sound', a: 'As encoded', b: 'Identical' },
            { label: 'Quality gain', a: 'Not applicable', b: 'None' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'A tool that only accepts FLAC', text: 'Some library software sorts or imports lossless formats.' },
        { title: 'Editing without further loss', text: 'A lossless copy does not degrade on each save.' },
      ],
      keepOriginal:
        'Keep the AAC if size matters. The FLAC will sound the same.',
    },
    faqs: [
      { q: 'Does it improve quality?', a: 'No.' },
      { q: 'Why is the FLAC larger?', a: 'It stores all samples without discarding any detail.' },
      { q: 'Is it truly lossless?', a: 'Yes, from the decoded AAC onward.' },
      { q: 'Can I get the original recording back?', a: 'No.' },
    ],
  },

  'aac-to-m4a': {
    title: 'AAC to M4A Converter Online — Free, No Upload',
    metaDescription:
      'Convert AAC to M4A online for free. Puts a raw AAC stream into an Apple-friendly M4A file in your browser, with no upload or sign-up. 100 MB per file.',
    heading: 'AAC to M4A Converter',
    description:
      'Convert AAC to M4A online for free: a raw AAC stream becomes a file that Apple devices open. Nothing is uploaded.',
    steps: steps('aac', 'm4a', 'Press Convert. The AAC stream is decoded and written again as AAC inside an MP4 container.'),
    understanding: {
      paragraphs: [
        'A raw .aac stream has no container: no tags and little seeking. M4A is the same codec inside an MP4 file, which iPhones, iPads and Macs play natively.',
        'This converter does not copy the stream across unchanged. The audio is decoded and encoded again, which adds a little loss.',
        'The gain is compatibility, not quality, so convert only if your device refuses the .aac file.',
      ],
      graphics: [
        {
          kind: 'flow',
          caption: 'The stream is decoded and encoded into an MP4 container.',
          steps: [
            { label: '.aac stream', detail: 'no container' },
            { label: 'Decode', detail: 'to raw samples' },
            { label: 'Encode AAC', detail: 'again' },
            { label: '.m4a file', detail: 'MP4 container' },
          ],
        },
        {
          kind: 'support',
          caption: 'Where each format plays.',
          columns: ['M4A', 'AAC stream'],
          rows: [
            { label: 'iPhone, iPad, Mac', a: 'yes', b: 'partial' },
            { label: 'Windows and Android', a: 'yes', b: 'yes' },
            { label: 'Metadata tags', a: 'yes', b: 'no' },
            { label: 'Seeking', a: 'yes', b: 'partial' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Opening an AAC file on an iPhone', text: 'M4A files open in Files and the Music app.' },
        { title: 'Adding tags afterwards', text: 'A tagging program can edit M4A but not a bare AAC.' },
      ],
      keepOriginal:
        'Keep the AAC if your player already handles it. The conversion costs a little quality.',
    },
    faqs: [
      { q: 'Is this a simple re-wrap?', a: 'No. The audio is decoded and encoded again.' },
      { q: 'Will quality drop?', a: 'Slightly.' },
      { q: 'Does it add tags?', a: 'No, but the file can now hold them.' },
      { q: 'Does it support Apple devices?', a: 'Yes.' },
    ],
  },

  'm4a-to-aac': {
    title: 'M4A to AAC Converter Online — Free, No Upload',
    metaDescription:
      'Convert M4A to AAC online for free. Turns an M4A file into a raw AAC stream in your browser, with no upload or sign-up. Up to 20 files at 100 MB each.',
    heading: 'M4A to AAC Converter',
    description:
      'Convert M4A to AAC online for free: an M4A file becomes a raw AAC stream without a container. Nothing is uploaded.',
    steps: steps('m4a', 'aac', 'Press Convert. The audio is decoded from the M4A and written again as a bare AAC stream.'),
    understanding: {
      paragraphs: [
        'M4A is AAC audio inside an MP4 container. The AAC format is the same audio without the container, so this conversion strips the wrapper. Because the converter re-encodes rather than copying, some quality is lost.',
        'The container is also what holds the title, artist and artwork, so those are gone afterwards, and seeking becomes limited.',
        'Use it only for tools that demand a raw .aac stream. For normal listening, leave the M4A as it is.',
      ],
      graphics: [
        {
          kind: 'flow',
          caption: 'The M4A container is removed and the audio is encoded again.',
          steps: [
            { label: '.m4a file', detail: 'MP4 container' },
            { label: 'Decode AAC', detail: 'to raw samples' },
            { label: 'Encode AAC', detail: 'again' },
            { label: '.aac stream', detail: 'no tags' },
          ],
        },
        {
          kind: 'table',
          caption: 'M4A compared with the AAC stream.',
          columns: ['M4A', 'AAC stream'],
          rows: [
            { label: 'Container', a: 'MP4', b: 'None' },
            { label: 'Tags and artwork', a: 'Supported', b: 'Lost' },
            { label: 'Seeking', a: 'Good', b: 'Limited' },
            { label: 'Encoding passes', a: 'One', b: 'Two' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'A pipeline that needs raw AAC', text: 'Some streaming or video tools take bare AAC audio.' },
        { title: 'Removing a container for testing', text: 'A stream is simpler to inspect.' },
      ],
      keepOriginal:
        'Keep the M4A. It plays better, keeps tags and has not been re-encoded.',
    },
    faqs: [
      { q: 'Is the M4A copied losslessly?', a: 'No. The audio is decoded and encoded again.' },
      { q: 'Are tags and artwork kept?', a: 'No.' },
      { q: 'Does it work on iPhone voice memos?', a: 'Yes, but M4A already works there.' },
      { q: 'Can I choose the bitrate?', a: 'No.' },
    ],
  },

  'm4a-to-ogg': {
    title: 'M4A to OGG Converter Online — Free, No Upload',
    metaDescription:
      'Convert M4A to OGG online for free. Re-encodes AAC audio with the open Vorbis codec in your browser, with no upload or sign-up. 100 MB per file.',
    heading: 'M4A to OGG Converter',
    description:
      'Convert M4A to OGG online for free: AAC audio is decoded and re-encoded with the open Vorbis codec. Nothing is uploaded.',
    steps: steps('m4a', 'ogg', 'Press Convert. The AAC audio is decoded from the M4A and compressed with Vorbis at FFmpeg\'s default quality.'),
    understanding: {
      paragraphs: [
        'M4A files usually hold AAC audio, and OGG holds Vorbis, so the audio has to be decoded and compressed again. That second lossy pass costs a little quality.',
        'The OGG plays in browsers, on Android and in Linux software, and is widely accepted by game engines, but Apple\'s Music app cannot play it.',
        'Artwork and tags in the M4A are not carried across.',
      ],
      graphics: [
        {
          kind: 'flow',
          caption: 'AAC is decoded from the M4A and compressed with Vorbis.',
          steps: [
            { label: '.m4a file', detail: 'AAC audio' },
            { label: 'Decode', detail: 'to raw samples' },
            { label: 'Encode Vorbis', detail: 'lossy again' },
            { label: '.ogg file' },
          ],
        },
        {
          kind: 'support',
          caption: 'Where each format plays.',
          columns: ['OGG', 'M4A'],
          rows: [
            { label: 'iPhone, iPad, Mac', a: 'no', b: 'yes' },
            { label: 'Android and Linux', a: 'yes', b: 'yes' },
            { label: 'Web browsers', a: 'yes', b: 'yes' },
            { label: 'Game engines', a: 'yes', b: 'partial' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'Using an iPhone recording in a game or app', text: 'Voice memos are M4A; many engines want OGG.' },
        { title: 'Open-format distribution', text: 'Publish a royalty-free copy of a recording.' },
      ],
      keepOriginal:
        'Keep the M4A for Apple devices. Convert only when OGG is required.',
    },
    faqs: [
      { q: 'Does it lose quality?', a: 'A little, because the audio is compressed twice.' },
      { q: 'Are tags kept?', a: 'Not reliably.' },
      { q: 'Will the OGG play on iPhone?', a: 'Not in the Music app.' },
      { q: 'Can I pick a quality level?', a: 'No.' },
    ],
  },

  'm4a-to-flac': {
    title: 'M4A to FLAC Converter Online — Free, No Upload',
    metaDescription:
      'Convert M4A to FLAC online for free. Stores the decoded audio losslessly in your browser; it will not restore lost quality. No upload or sign-up needed.',
    heading: 'M4A to FLAC Converter',
    description:
      'Convert M4A to FLAC online for free: the decoded audio is stored losslessly, but lost quality does not come back.',
    steps: steps('m4a', 'flac', 'Press Convert. The audio is decoded from the M4A and its samples are saved in FLAC without more loss.'),
    understanding: {
      paragraphs: [
        'An M4A is normally lossy AAC. Putting it into FLAC preserves exactly what the AAC sounded like, with no extra loss and no restored detail.',
        'The FLAC will be several times larger. It helps when a program insists on FLAC, but it is not an upgrade.',
        'If the M4A holds Apple Lossless audio instead of AAC, the audio is decoded and stored losslessly, and nothing is lost.',
      ],
      graphics: [
        {
          kind: 'wave',
          caption: 'Illustration: FLAC keeps the decoded M4A sound exactly, with no added detail.',
          alt: 'Two matching waveforms with the same reduced detail, showing the FLAC identical to the decoded M4A.',
          left: { label: 'M4A, decoded', detail: 'reduced' },
          right: { label: 'FLAC: same sound', detail: 'reduced' },
        },
        {
          kind: 'table',
          caption: 'M4A compared with FLAC output.',
          columns: ['M4A (AAC)', 'FLAC'],
          rows: [
            { label: 'Compression', a: 'Lossy', b: 'Lossless' },
            { label: 'File size', a: 'Small', b: 'Several times larger' },
            { label: 'Sound', a: 'As encoded', b: 'Identical' },
            { label: 'Tags and artwork', a: 'Supported', b: 'Not reliably kept' },
          ],
        },
      ],
    },
    whyWhen: {
      scenarios: [
        { title: 'A tool that needs FLAC', text: 'Some editors and library managers want lossless files.' },
        { title: 'Editing an iPhone recording', text: 'Work from a lossless copy so each save does not degrade it.' },
      ],
      keepOriginal:
        'Keep the M4A when space matters. The FLAC sounds the same and takes much more room.',
    },
    faqs: [
      { q: 'Will it sound better than the M4A?', a: 'No.' },
      { q: 'Why is the FLAC bigger?', a: 'FLAC keeps every sample the decoder produced.' },
      { q: 'Does it work with Apple Lossless?', a: 'Yes, and the conversion is then lossless from end to end.' },
      { q: 'Are cover art and tags kept?', a: 'Not reliably.' },
    ],
  },
};
