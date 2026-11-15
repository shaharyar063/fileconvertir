import { Link } from 'react-router-dom';
import { HeroConverter } from '@/components/HeroConverter';
import { converterRoutes } from '@/lib/converters';
import { getHomepageSEO } from '@/lib/seo-content';
import { Image, FileText, Music, Film, Type, Archive } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { useDocumentHead } from '@/hooks/use-document-head';
import { buildFAQSchema, buildHowToSchema, buildWebAppSchema, buildWebSiteSchema } from '@/lib/seo-jsonld';
import { absoluteUrl, sitePath } from '@/lib/site-url';
import { useMemo, ReactNode } from 'react';
import { HowItWorksFigure, CategoryBarsFigure, PrivacyPathFigure } from '@/components/HomeGraphics';

const homeSeo = getHomepageSEO();
const { howItWorks, comparison, limits } = homeSeo.content;

const categories = [
  { key: 'Image', icon: Image, label: 'Images', picks: ['png-to-jpg', 'webp-to-jpg', 'jpg-to-pdf', 'svg-to-png'] },
  { key: 'Document', icon: FileText, label: 'Documents', picks: ['docx-to-pdf', 'pdf-to-txt', 'docx-to-html', 'md-to-html'] },
  { key: 'Audio', icon: Music, label: 'Audio', picks: ['wav-to-mp3', 'm4a-to-mp3', 'flac-to-mp3', 'mp3-to-m4a'] },
  { key: 'Video', icon: Film, label: 'Video', picks: ['mp4-to-mp3', 'mov-to-mp4', 'mkv-to-mp4', 'webm-to-mp4'] },
  { key: 'Font', icon: Type, label: 'Fonts', picks: ['ttf-to-woff', 'otf-to-woff', 'woff-to-ttf'] },
  { key: 'Archive', icon: Archive, label: 'Archives', picks: ['zip-to-tar', 'tar-to-zip', 'gz-to-zip'] },
];

/** Full-width section separated by a hairline border. */
function Band({ children, id, label }: { children: ReactNode; id?: string; label?: string }) {
  return (
    <section id={id} aria-label={label} className="border-b border-border bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-4 py-14 md:py-16">{children}</div>
    </section>
  );
}

const H2 = ({ children }: { children: ReactNode }) => (
  <h2 className="text-2xl font-extrabold tracking-tight text-foreground md:text-3xl">{children}</h2>
);

export default function Index() {
  const jsonLd = useMemo(
    () => [
      buildWebSiteSchema(),
      buildWebAppSchema(),
      buildHowToSchema('How to convert a file online', howItWorks),
      buildFAQSchema(homeSeo.faqs),
    ],
    [],
  );
  useDocumentHead({
    title: homeSeo.title,
    description: homeSeo.metaDescription,
    canonical: absoluteUrl(),
    jsonLd,
  });

  return (
    <>
      <Band>
        <header>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">{homeSeo.heading}</h1>
          <p className="mt-2 max-w-2xl text-xs leading-snug text-muted-foreground">{homeSeo.description}</p>
        </header>
        <div className="mt-8">
          <HeroConverter />
        </div>
      </Band>

      <Band label="How it works">
        <H2>How to convert a file online</H2>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {howItWorks.map((step, i) => (
            <li key={step.name} className="rounded-xl border border-border p-5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">
                {i + 1}
              </span>
              <h3 className="mt-3 text-sm font-bold text-foreground">{step.name}</h3>
              <p className="mt-2 text-xs leading-relaxed text-foreground/80">{step.text}</p>
            </li>
          ))}
        </ol>
        <HowItWorksFigure />
      </Band>

      <Band id="categories" label="Supported formats">
        <H2>What you can convert</H2>
        <p className="mt-3 text-sm text-foreground/80">
          Images, documents, audio, video, fonts and archives. Open a format to see every output it supports.
        </p>
        <CategoryBarsFigure />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {categories.map((cat) => {
            const routes = converterRoutes.filter((r) => r.category === cat.key);
            const formats = [...new Set(routes.map((r) => r.sourceFormat))].sort();
            const picks = cat.picks
              .map((slug) => routes.find((r) => r.slug === slug))
              .filter((r): r is NonNullable<typeof r> => Boolean(r));
            return (
              <div key={cat.key} className="rounded-xl border border-border p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border">
                    <cat.icon className="h-4 w-4" />
                  </div>
                  <h3 className="text-sm font-bold text-foreground">{cat.label}</h3>
                </div>
                <ul className="mt-4 space-y-1.5 text-sm">
                  {picks.map((r) => (
                    <li key={r.slug}>
                      <Link to={sitePath(r.slug)} className="font-medium text-foreground underline-offset-4 hover:underline">
                        {r.label.replace('→', 'to')}
                      </Link>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 flex flex-wrap items-center gap-1.5 text-[11px] text-muted-foreground">
                  All:
                  {formats.map((f) => (
                    <Link
                      key={f}
                      to={sitePath(f)}
                      className="rounded-md border border-border px-1.5 py-0.5 font-medium uppercase text-foreground hover:bg-secondary"
                    >
                      {f}
                    </Link>
                  ))}
                </p>
              </div>
            );
          })}
        </div>
      </Band>

      <Band label="Private conversion in your browser">
        <H2>Why convert in your browser</H2>
        <p className="mt-3 text-sm leading-relaxed text-foreground/80">
          A typical converter site has to receive your file before it can touch it. Here your browser does the job with
          JavaScript and WebAssembly, so a private document or a family video never has to leave your device.
        </p>
        <PrivacyPathFigure />
        <div className="mt-6 overflow-hidden rounded-xl border border-border">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-border bg-secondary">
              <tr>
                <th scope="col" className="p-3"><span className="sr-only">Feature</span></th>
                <th scope="col" className="p-3 font-bold">{comparison.columns[0]}</th>
                <th scope="col" className="p-3 font-bold">{comparison.columns[1]}</th>
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map((r) => (
                <tr key={r.label} className="border-b border-border last:border-0">
                  <th scope="row" className="p-3 font-medium">{r.label}</th>
                  <td className="p-3">{r.a}</td>
                  <td className="p-3 text-foreground/70">{r.b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3 className="mt-8 text-sm font-bold text-foreground">Limits to know about</h3>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-xs leading-relaxed text-foreground/80">
          {limits.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
      </Band>

      <Band label="Frequently asked questions">
        <H2>Frequently asked questions</H2>
        <Accordion type="single" collapsible className="mt-6">
          {homeSeo.faqs.map((faq, i) => (
            <AccordionItem key={faq.q} value={`faq-${i}`} className="border-border">
              <AccordionTrigger className="text-left text-sm text-foreground hover:no-underline">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-foreground/85">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Band>
    </>
  );
}
