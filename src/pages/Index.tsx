import { Link } from 'react-router-dom';
import { HeroConverter } from '@/components/HeroConverter';
import { converterRoutes } from '@/lib/converters';
import { PRIORITY_CONVERTERS } from '@/lib/seo-content';
import { Shield, Zap, Globe, ArrowRight, CheckCircle, Image, FileText, Music, Film, Type, Archive, TrendingUp } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { useDocumentHead } from '@/hooks/use-document-head';
import { buildFAQSchema, buildWebAppSchema, buildWebSiteSchema, SITE_URL } from '@/lib/seo-jsonld';
import { useMemo } from 'react';

const popularConversions: { slug: string; label: string; tagline: string }[] = [
  { slug: 'heic-to-jpg', label: 'HEIC to JPG', tagline: 'Open iPhone photos on Windows' },
  { slug: 'm4a-to-mp3',  label: 'M4A to MP3',  tagline: 'Apple audio for any device' },
  { slug: 'mov-to-mp4',  label: 'MOV to MP4',  tagline: 'Fix QuickTime compatibility' },
  { slug: 'webp-to-png', label: 'WebP to PNG', tagline: 'Preserve transparency' },
  { slug: 'tiff-to-jpg', label: 'TIFF to JPG', tagline: 'Shrink huge scans for email' },
  { slug: 'avif-to-jpg', label: 'AVIF to JPG', tagline: 'Fix AVIF compatibility' },
];
// Reference PRIORITY_CONVERTERS so the link list stays in sync with the priority list
void PRIORITY_CONVERTERS;

const categories = [
  { key: 'Image', icon: Image, label: 'Images', desc: 'PNG, JPG, WebP, AVIF, HEIC, HEIF, GIF, BMP, TIFF, SVG, ICO' },
  { key: 'Document', icon: FileText, label: 'Documents', desc: 'PDF, DOCX, ODT, TXT, HTML, Markdown, CSV, RTF' },
  { key: 'Audio', icon: Music, label: 'Audio', desc: 'MP3, WAV, AAC, OGG, FLAC, M4A — extract from video' },
  { key: 'Video', icon: Film, label: 'Video', desc: 'MP4, MOV, AVI, MKV, WebM — extract audio' },
  { key: 'Font', icon: Type, label: 'Fonts', desc: 'TTF, OTF, WOFF' },
  { key: 'Archive', icon: Archive, label: 'Archives', desc: 'ZIP, TAR, GZ' },
];

const useCases = [
  'Convert images for web publishing with optimized file sizes',
  'Extract text from PDFs and documents for easy editing',
  'Convert audio and video files for playback on any device',
  'Prepare web fonts for faster website loading',
  'Repackage archives for cross-platform compatibility',
  'All conversions run locally — your files never leave your device',
];

const faqs = [
  { q: 'Is FileConvertir really free?', a: 'Yes, completely free with no limits. No signup, no account, no hidden fees. Just drop a file and convert.' },
  { q: 'Are my files uploaded to a server?', a: 'No. All conversions run locally in your browser using WebAssembly and JavaScript. Your files never leave your device, ensuring complete privacy.' },
  { q: 'What file formats are supported?', a: 'We support 200+ conversion types across images, documents, audio, video, fonts, and archives. Select a format from the converter above to see all available options.' },
  { q: 'What\'s the maximum file size?', a: 'The maximum file size is 100MB. Since processing happens in your browser, larger files may take longer depending on your device.' },
  { q: 'Can I convert multiple files at once?', a: 'Yes! You can batch convert up to 20 files at once. Select multiple files, choose your output format, and download them all individually or as a single ZIP archive.' },
];

export default function Index() {
  const jsonLd = useMemo(() => [buildWebSiteSchema(), buildWebAppSchema(), buildFAQSchema(faqs)], []);
  useDocumentHead({
    title: 'FileConvertir — Free Online File Converter | Images, Docs, Audio, Video',
    description: 'Convert images, documents, audio, video, fonts & archives instantly in your browser. 100% private — your files never leave your device. No signup required.',
    canonical: `${SITE_URL}/`,
    jsonLd,
  });

  return (
    <article className="mx-auto max-w-3xl px-4 py-6">

      {/* Title */}
      <header>
        <h1 className="text-3xl font-extrabold text-foreground md:text-4xl">
          Free Online File Converter
        </h1>
        <p className="mt-3 max-w-xl text-base text-muted-foreground leading-relaxed">
          Convert images, documents, audio, video, fonts & archives instantly in your browser. 100% private — your files never leave your device.
        </p>
      </header>

      {/* Converter Tool */}
      <section className="mt-8">
        <HeroConverter />
      </section>

      {/* Most Popular Conversions — high-traffic priority pages */}
      <section className="mt-12" aria-label="Most popular conversions">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          <h2 className="text-xl font-extrabold text-foreground">Most Popular Conversions</h2>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">The conversions our visitors use most — all run 100% in your browser.</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {popularConversions.map(p => (
            <Link
              key={p.slug}
              to={`/${p.slug}`}
              className="group rounded-xl border border-border bg-card p-4 transition-all hover:border-primary hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{p.label}</span>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{p.tagline}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Features Row */}
      <section className="mt-12 grid gap-4 md:grid-cols-3" aria-label="Key features">
        {[
          { icon: Shield, title: '100% Private', desc: 'Files never leave your device. All processing happens in your browser.' },
          { icon: Zap, title: 'Lightning Fast', desc: 'No upload wait. Conversions start instantly using local processing.' },
          { icon: Globe, title: 'No Signup', desc: 'Free to use, no account required. Just drop a file and convert.' },
        ].map(f => (
          <div
            key={f.title}
            className="rounded-xl border border-border bg-card p-5 card-hover"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <f.icon className="h-4 w-4" />
              </div>
              <h2 className="text-sm font-bold text-foreground">{f.title}</h2>
            </div>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Why Use FileConvertir */}
      <section className="mt-12">
        <h2 className="text-xl font-extrabold text-foreground">
          Why Use FileConvertir?
        </h2>
        <ul className="mt-4 space-y-3">
          {useCases.map((uc, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>{uc}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Category Sections */}
      <section className="mt-12" id="categories" aria-label="Conversion categories">
        <h2 className="text-xl font-extrabold text-foreground">
          All Conversion Categories
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Choose a category below or select formats above to get started.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.map(cat => {
            const routes = converterRoutes.filter(r => r.category === cat.key);
            const topRoutes = routes.slice(0, 4);
            return (
              <div
                key={cat.key}
                className="rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <cat.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">{cat.label}</h3>
                    <p className="text-xs text-muted-foreground">{routes.length} converters</p>
                  </div>
                </div>
                <p className="mt-3 text-xs text-muted-foreground leading-relaxed">{cat.desc}</p>
                <div className="mt-4 space-y-1">
                  {topRoutes.map(r => (
                    <Link
                      key={r.slug}
                      to={`/${r.slug}`}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-medium text-foreground transition-colors hover:bg-primary/10 hover:text-primary group"
                    >
                      <span>{r.label}</span>
                      <ArrowRight className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQs */}
      <section className="mt-12" aria-label="Frequently asked questions">
        <h2 className="text-xl font-extrabold text-foreground">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="mt-4">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-sm text-foreground hover:no-underline hover:text-primary transition-colors text-left">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </article>
  );
}
