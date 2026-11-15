import { useMemo, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import type { ConverterRoute } from '@/lib/converters';
import type { FormatSEO } from '@/lib/seo/types';
import { formatLabel } from '@/lib/format-label';
import { sitePath } from '@/lib/site-url';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { useDocumentHead } from '@/hooks/use-document-head';
import { buildFAQSchema, buildBreadcrumbSchema, absoluteUrl } from '@/lib/seo-jsonld';

const H2 = 'text-xl font-extrabold text-foreground md:text-2xl';
const PROSE = 'text-sm leading-relaxed text-muted-foreground md:text-[15px]';

/**
 * Format page (`/png/`, `/to-pdf/`): explains the format itself and links to
 * its conversions. Above the tool: the H1 and a short description only.
 */
export function FormatPageView({
  seo,
  path,
  format,
  convertingHeading,
  linksHeading,
  routes,
  tool,
}: {
  seo: FormatSEO;
  /** URL slug of this page, e.g. `png` or `to-pdf`. */
  path: string;
  /** The format this page is about. */
  format: string;
  convertingHeading: string;
  linksHeading: string;
  routes: ConverterRoute[];
  tool: ReactNode;
}) {
  const label = formatLabel(format);
  const jsonLd = useMemo(
    () => [
      buildFAQSchema(seo.faqs),
      buildBreadcrumbSchema([
        { name: 'Home', url: absoluteUrl() },
        { name: seo.heading, url: absoluteUrl(path) },
      ]),
    ],
    [seo, path],
  );
  useDocumentHead({
    title: seo.title,
    description: seo.metaDescription,
    canonical: absoluteUrl(path),
    jsonLd,
  });

  return (
    <article className="mx-auto max-w-3xl px-4 py-8">
      <header>
        <h1 className="text-3xl font-extrabold text-foreground md:text-4xl">{seo.heading}</h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">{seo.description}</p>
      </header>

      <div className="mt-6">{tool}</div>

      <section className="mt-14" aria-labelledby="about-format">
        <h2 id="about-format" className={H2}>What is {label}?</h2>
        <p className={`mt-4 ${PROSE}`}>{seo.details}</p>
      </section>

      {seo.longDescription && (
        <section className="mt-12" aria-labelledby="converting">
          <h2 id="converting" className={H2}>{convertingHeading}</h2>
          <p className={`mt-4 ${PROSE}`}>{seo.longDescription}</p>
        </section>
      )}

      {routes.length > 0 && (
        <section className="mt-12" aria-labelledby="conversions">
          <h2 id="conversions" className={H2}>{linksHeading}</h2>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {routes.map((r) => (
              <Link
                key={r.slug}
                to={sitePath(r.slug)}
                className="flex items-center justify-between rounded-xl border border-border bg-card px-3 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary"
              >
                <span>{formatLabel(r.sourceFormat)} to {formatLabel(r.targetFormat)}</span>
                <ArrowRight className="h-3 w-3 shrink-0 text-muted-foreground" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mt-12" aria-labelledby="uses">
        <h2 id="uses" className={H2}>Common Uses</h2>
        <ul className="mt-4 space-y-3">
          {seo.useCases.map((uc) => (
            <li key={uc} className="flex items-start gap-3 text-sm text-muted-foreground">
              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-foreground" aria-hidden="true" />
              <span>{uc}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12" aria-labelledby="faq">
        <h2 id="faq" className={H2}>Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="mt-4">
          {seo.faqs.map((faq, i) => (
            <AccordionItem key={faq.q} value={`faq-${i}`}>
              <AccordionTrigger className="text-left text-sm text-foreground hover:no-underline">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </article>
  );
}
