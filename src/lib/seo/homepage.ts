import type { HomepageSEO } from './types';

export const HOMEPAGE_SEO: HomepageSEO = {
  title: 'Free Online File Converter — No Upload | FileConvertir',
  metaDescription:
    'Free online file converter for images, documents, audio and video. Convert PNG, JPG, PDF, MP3, MP4 and more in your browser, with no upload or sign-up.',
  heading: 'Free Online File Converter',
  description:
    'Free online file converter: convert images, documents, audio, video, fonts and archives in your browser with no upload or sign-up. Your files never leave your device.',
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
      a: '230+ conversions across images (PNG, JPG, WebP, AVIF), documents (PDF, DOCX), audio/video (FFmpeg), fonts, and archives.',
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
      a: 'PNG to JPG, MOV to MP4, M4A to MP3, WebP to PNG, and PNG to JPG are frequent — each has a dedicated page.',
    },
  ],
};
