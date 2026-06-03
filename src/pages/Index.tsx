import { Link } from 'react-router-dom';
import { HeroConverter } from '@/components/HeroConverter';
import { converterRoutes } from '@/lib/converters';
import { PRIORITY_CONVERTERS, getHomepageSEO } from '@/lib/seo-content';
import { Shield, Zap, Globe, ArrowRight, CheckCircle, Image, FileText, Music, Film, Type, Archive, TrendingUp, Flame } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { useDocumentHead } from '@/hooks/use-document-head';
import { buildFAQSchema, buildWebAppSchema, buildWebSiteSchema } from '@/lib/seo-jsonld';
import { absoluteUrl } from '@/lib/site-url';
import { useMemo, ReactNode } from 'react';
import { FormatBrowser } from '@/components/FormatBrowser';
import { BOOSTED_LINKS } from '@/lib/site-navigation';
import { sitePath } from '@/lib/site-url';

const popularConversions: { slug: string; label: string; tagline: string }[] = [
  { slug: 'heic-to-jpg',  label: 'HEIC to JPG',  tagline: 'Open iPhone photos on Windows' },
  { slug: 'webp-to-jpg',  label: 'WebP to JPG',  tagline: 'Insert web images into Office' },
  { slug: 'mp4-to-mp3',   label: 'MP4 to MP3',   tagline: 'Extract audio from any video' },
  { slug: 'mkv-to-mp4',   label: 'MKV to MP4',   tagline: 'Fix Plex & iPhone playback' },
  { slug: 'docx-to-pdf',  label: 'DOCX to PDF',  tagline: 'Lock formatting for sharing' },
  { slug: 'pdf-to-txt',   label: 'PDF to Text',  tagline: 'Extract text for AI & editing' },
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

const faqs = getHomepageSEO().faqs;

/**
 * Full-bleed section band. `invert` flips the two brand colors locally
 * so we get the glyphy.io rhythm of alternating light/dark stripes.
 */
function Band({
  invert = false,
  children,
  id,
  ariaLabel,
  className = '',
}: {
  invert?: boolean;
  children: ReactNode;
  id?: string;
  ariaLabel?: string;
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`${invert ? 'section-invert ' : ''}bg-background text-foreground ${className}`}
    >
      <div className="mx-auto max-w-3xl px-4 py-14 md:py-20">{children}</div>
    </section>
  );
}

export default function Index() {
  const jsonLd = useMemo(() => [buildWebSiteSchema(), buildWebAppSchema(), buildFAQSchema(faqs)], []);
  const homeSeo = getHomepageSEO();
  useDocumentHead({
    title: homeSeo.title,
    description: homeSeo.metaDescription,
    canonical: absoluteUrl(),
    jsonLd,
  });

  return (
    <>
      {/* HERO — light band */}
      <Band>
        <header>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
            Free Online File Converter
          </h1>
          <p className="mt-4 max-w-xl text-base text-foreground/90 leading-relaxed">
            Convert images, documents, audio, video, fonts & archives instantly in your browser. 100% private — your files never leave your device.
          </p>
        </header>
        <div className="mt-8">
          <HeroConverter />
        </div>
      </Band>

      {/* MOST POPULAR — dark band */}
      <Band invert ariaLabel="Most popular conversions">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-foreground" />
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
            Most Popular Conversions
          </h2>
        </div>
        <p className="mt-3 text-sm text-foreground/80">
          The conversions our visitors use most — all run 100% in your browser.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {popularConversions.map(p => (
            <Link
              key={p.slug}
              to={sitePath(p.slug)}
              className="group rounded-xl border border-border bg-background p-4 transition-transform hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-foreground">{p.label}</span>
                <ArrowRight className="h-3.5 w-3.5 text-foreground transition-transform group-hover:translate-x-0.5" />
              </div>
              <p className="mt-1 text-xs text-foreground/80">{p.tagline}</p>
            </Link>
          ))}
        </div>
      </Band>

      {/* TRENDING — light band */}
      <Band ariaLabel="Trending file conversions">
        <div className="flex items-center gap-2">
          <Flame className="h-4 w-4 text-foreground" />
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
            More Conversions
          </h2>
        </div>
        <p className="mt-3 text-sm text-foreground/80">
          Every conversion runs locally in your browser — no upload, no account needed.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {BOOSTED_LINKS.map(link => (
            <Link
              key={link.href}
              to={link.href}
              className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </Band>

      {/* FEATURES — light band */}
      <Band ariaLabel="Key features">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
          Built for speed and privacy
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            { icon: Shield, title: '100% Private', desc: 'Files never leave your device. All processing happens in your browser.' },
            { icon: Zap, title: 'Lightning Fast', desc: 'No upload wait. Conversions start instantly using local processing.' },
            { icon: Globe, title: 'No Signup', desc: 'Free to use, no account required. Just drop a file and convert.' },
          ].map(f => (
            <div
              key={f.title}
              className="rounded-xl border border-border bg-background p-5 card-hover"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border">
                  <f.icon className="h-4 w-4 text-foreground" />
                </div>
                <h3 className="text-sm font-bold text-foreground">{f.title}</h3>
              </div>
              <p className="mt-3 text-xs text-foreground/80 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </Band>

      {/* WHY — dark band */}
      <Band invert>
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
          Why Use FileConvertir?
        </h2>
        <ul className="mt-6 space-y-3">
          {useCases.map((uc, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-foreground/95">
              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-foreground" />
              <span>{uc}</span>
            </li>
          ))}
        </ul>
      </Band>

      {/* CATEGORIES — light band */}
      <Band id="categories" ariaLabel="Conversion categories">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
          All Conversion Categories
        </h2>
        <p className="mt-3 text-sm text-foreground/80">
          Choose a category below or select formats above to get started.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.map(cat => {
            const routes = converterRoutes.filter(r => r.category === cat.key);
            const topRoutes = routes.slice(0, 4);
            return (
              <div
                key={cat.key}
                className="rounded-xl border border-border bg-background p-5 card-hover"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border">
                    <cat.icon className="h-4 w-4 text-foreground" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">{cat.label}</h3>
                    <p className="text-xs text-foreground/80">{routes.length} converters</p>
                  </div>
                </div>
                <p className="mt-3 text-xs text-foreground/80 leading-relaxed">{cat.desc}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {[...new Set(routes.map((r) => r.sourceFormat))]
                    .sort()
                    .map((src) => (
                      <Link
                        key={src}
                        to={sitePath(src)}
                        className="rounded-md border border-border px-2 py-0.5 text-[10px] font-medium uppercase text-foreground hover:border-primary"
                      >
                        {src}
                      </Link>
                    ))}
                </div>
                <div className="mt-4 space-y-1">
                  {topRoutes.map((r) => (
                    <Link
                      key={r.slug}
                      to={sitePath(r.slug)}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-medium text-foreground transition-transform hover:translate-x-0.5 group"
                    >
                      <span>{r.label}</span>
                      <ArrowRight className="h-3 w-3 text-foreground transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Band>

      <Band id="browse-formats" ariaLabel="Browse all file formats">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
          Browse All Formats
        </h2>
        <p className="mt-3 text-sm text-foreground/80">
          Tap any format to see every available conversion for it.
        </p>
        <div className="mt-8">
          <FormatBrowser />
        </div>
      </Band>

      {/* FAQ — dark band */}
      <Band invert ariaLabel="Frequently asked questions">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="mt-6">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border-border">
              <AccordionTrigger className="text-sm text-foreground hover:no-underline text-left">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-foreground/85 leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Band>
    </>
  );
}
