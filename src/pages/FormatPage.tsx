import { useParams, Navigate, Link } from 'react-router-dom';
import { useMemo } from 'react';
import { getFormatPageBySlug, converterRoutes } from '@/lib/converters';
import { getFormatSEO } from '@/lib/seo-content';
import { HeroConverter } from '@/components/HeroConverter';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { useDocumentHead } from '@/hooks/use-document-head';
import { buildFAQSchema, buildBreadcrumbSchema, absoluteUrl } from '@/lib/seo-jsonld';
import { sitePath } from '@/lib/site-url';

export default function FormatPage() {
  const { format } = useParams<{ format: string }>();
  const page = format ? getFormatPageBySlug(`to-${format}`) : undefined;
  const seo = page ? getFormatSEO(page.targetFormat) : undefined;

  const jsonLd = useMemo(() => {
    if (!seo || !page) return undefined;
    return [
      buildFAQSchema(seo.faqs),
      buildBreadcrumbSchema([
        { name: 'Home', url: absoluteUrl() },
        { name: seo.heading, url: absoluteUrl(`to-${page.targetFormat}`) },
      ]),
    ];
  }, [seo, page]);
  useDocumentHead({
    title: seo?.title ?? 'FileConvertir',
    description: seo?.metaDescription ?? '',
    canonical: page ? absoluteUrl(`to-${page.targetFormat}`) : undefined,
    jsonLd,
  });

  if (!page || !seo) return <Navigate to="/" replace />;
  const acceptHint = page.acceptedInputs.map(e => `.${e.toUpperCase()}`).join(', ');

  const relatedConverters = converterRoutes.filter(
    (r) => r.targetFormat === page.targetFormat,
  );

  return (
    <article className="mx-auto max-w-3xl px-4 py-6">
      <nav className="mb-6 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{seo.heading}</span>
      </nav>

      <header>
        <h1 className="text-3xl font-extrabold text-foreground md:text-4xl">
          {seo.heading}
        </h1>
        <p className="mt-3 text-base text-muted-foreground leading-relaxed">{seo.description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="inline-block rounded-lg border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary">
            Output: .{page.targetFormat}
          </span>
          <span className="inline-block rounded-lg border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
            Accepts: {acceptHint}
          </span>
        </div>
      </header>

      <section className="mt-8">
        <HeroConverter initialTarget={page.targetFormat} lockTarget />
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-extrabold text-foreground">About {page.targetFormat.toUpperCase()} Format</h2>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{seo.details}</p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-extrabold text-foreground">Use Cases</h2>
        <ul className="mt-4 space-y-3">
          {seo.useCases.map((uc, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>{uc}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-extrabold text-foreground">FAQ</h2>
        <Accordion type="single" collapsible className="mt-4">
          {seo.faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-sm text-foreground hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {relatedConverters.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-extrabold text-foreground">
            Converters That Output {page.targetFormat.toUpperCase()}
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {relatedConverters.map(r => (
              <Link
                key={r.slug}
                to={sitePath(r.slug)}
                className="flex items-center justify-between rounded-xl border border-border bg-card px-3 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <span>{r.label}</span>
                <ArrowRight className="h-3 w-3 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
