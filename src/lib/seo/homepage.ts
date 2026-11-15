import type { HomepageSEO } from './types';

export const HOMEPAGE_SEO: HomepageSEO = {
  title: 'FileConvertir — Free Online File Converter',
  metaDescription:
    'Convert images, documents, audio, video, fonts and archives in your browser. 100% private — files never leave your device. No signup, free, 230+ conversions.',
  heading: 'Free Online File Converter',
  description:
    'Convert images, documents, audio, video, fonts and archives instantly in your browser. Private, free, and works on desktop or mobile.',
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
