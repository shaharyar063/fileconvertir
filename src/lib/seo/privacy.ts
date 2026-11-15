/** Privacy policy copy. Keep it in step with what the site actually does. */
export const PRIVACY_UPDATED = '15 November 2026';

export const PRIVACY_PAGE = {
  title: 'Privacy Policy — FileConvertir',
  metaDescription:
    'FileConvertir converts files inside your browser, so they are never uploaded. Read what the site does collect: anonymous analytics and standard hosting logs.',
  heading: 'Privacy Policy',
  intro:
    'FileConvertir is built so that your files stay on your device. This page explains what that means, and the small amount of data the site does collect.',
  sections: [
    {
      heading: 'Your files',
      paragraphs: [
        'Every conversion runs in your browser using JavaScript and WebAssembly. The files you add are read from your device, converted in memory and handed back to you as a download. They are not sent to our servers or to anyone else, and we cannot see them.',
        'Audio and video conversion uses FFmpeg compiled to WebAssembly. The first time you convert audio or video, your browser downloads that engine (about 30 MB) from a public content delivery network, unpkg.com. That request tells the network your IP address and browser details, as any file download does, but it never includes your files.',
      ],
    },
    {
      heading: 'Analytics',
      paragraphs: [
        'We use Google Analytics to count visits and see which pages are useful. It loads a script from Google and sets cookies in your browser. Google receives your IP address, the pages you view, your approximate location and your device and browser type. It does not receive the contents or names of files you convert.',
        'You can block this with your browser\'s privacy settings, a tracking blocker, or Google\'s opt-out add-on. The converters work the same either way.',
      ],
    },
    {
      heading: 'Hosting',
      paragraphs: [
        'The site is served by Cloudflare Pages. Like any web host, Cloudflare processes the IP address and request details of each visit to deliver the pages and protect the service, and may keep standard logs.',
      ],
    },
    {
      heading: 'Data stored on your device',
      paragraphs: [
        'The site remembers your light or dark choice in your browser\'s local storage. Analytics cookies are described above. There are no accounts, no logins and no advertising on the site.',
      ],
    },
    {
      heading: 'Children',
      paragraphs: [
        'The site is a general-purpose tool and is not directed at children. We do not knowingly collect personal information from them.',
      ],
    },
    {
      heading: 'Changes to this policy',
      paragraphs: [
        'If the site changes in a way that affects your privacy, for example by adding a service that handles data, this page will be updated and the date at the top will change.',
      ],
    },
  ],
};
