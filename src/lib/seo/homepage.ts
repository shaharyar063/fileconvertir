import type { HomepageSEO } from './types';

export const HOMEPAGE_SEO: HomepageSEO = {
  title: 'Free Online File Converter — No Upload | FileConvertir',
  metaDescription:
    'Free online file converter for images, documents, audio and video. Convert PNG, JPG, PDF, MP3, MP4 and more in your browser, with no upload or sign-up.',
  heading: 'Free Online File Converter',
  description:
    'Free online file converter: convert images, documents, audio, video, fonts and archives in your browser with no upload or sign-up. Your files never leave your device.',
  content: {
    howItWorks: [
      { name: 'Choose your formats', text: 'Pick the format you have and the one you want, or just add a file and the tool will offer what it can be converted to.' },
      { name: 'Add your files', text: 'Click Select Files or drop up to 20 files at once. Each file can be up to 100 MB.' },
      { name: 'Convert and download', text: 'Press Convert, then save each result or all of them as one ZIP. The first audio or video conversion downloads a media engine of about 30 MB.' },
    ],
    comparison: {
      columns: ['FileConvertir', 'Upload-based converters'],
      rows: [
        { label: 'Where your file goes', a: 'Stays on your device', b: 'Sent to a company\'s server' },
        { label: 'Account or sign-up', a: 'Not needed', b: 'Often required for larger files' },
        { label: 'Watermarks', a: 'None', b: 'Common on free tiers' },
        { label: 'Speed', a: 'No upload or download wait', b: 'Depends on your connection' },
        { label: 'Large video', a: 'Slower, limited by your device', b: 'Faster on their servers' },
      ],
    },
    limits: [
      'Each file can be up to 100 MB, and a batch holds up to 20 files.',
      'Video is re-encoded on one processor thread in your browser, so long or high-resolution clips take a while.',
      'Lossy formats such as JPG and MP3 lose a little more quality each time they are converted. Convert from your original whenever you can.',
      'Scanned PDFs have no text to extract, and there is no text recognition.',
    ],
  },
  faqs: [
    {
      q: 'Is FileConvertir really free?',
      a: 'Yes — unlimited conversions with no account, paywall, or watermark on results.',
    },
    {
      q: 'Are my files uploaded to a server?',
      a: 'No. Conversions run locally in your browser with WebAssembly and JavaScript. Files stay on your device.',
    },
    {
      q: 'What formats can I convert?',
      a: 'More than 230 conversions across images, documents, audio, video, fonts and archives. Each format has its own page listing what it converts to.',
    },
    {
      q: 'What is the maximum file size?',
      a: '100MB per file. Batch mode supports up to 20 files (500MB total per batch).',
    },
    {
      q: 'Can I convert on iPhone or Android?',
      a: 'Yes in modern mobile browsers. Large video files may be slower on phones.',
    },
    {
      q: 'Does it work offline?',
      a: 'Not fully. Your files are never uploaded, but the page and some converters are downloaded the first time you use them, and audio and video conversion needs a one-time engine download of about 30 MB, so you need a connection.',
    },
    {
      q: 'How is this different from cloud converters?',
      a: 'Cloud tools upload your files. FileConvertir processes them on your machine — better for privacy and quick jobs.',
    },
    {
      q: 'Which conversions are most popular?',
      a: 'PNG to JPG, WebP to JPG, MP4 to MP3, MOV to MP4, DOCX to PDF and WAV to MP3 are among the most used, and each has its own page.',
    },
  ],
};
