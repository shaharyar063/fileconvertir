import { useParams, Navigate, Link } from 'react-router-dom';
import { useMemo } from 'react';
import { getSourceFormatPage, converterRoutes } from '@/lib/converters';
import { getSourceFormatSEO } from '@/lib/seo-content';
import { HeroConverter } from '@/components/HeroConverter';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { useDocumentHead } from '@/hooks/use-document-head';
import { buildFAQSchema, buildBreadcrumbSchema, absoluteUrl } from '@/lib/seo-jsonld';
import { sitePath } from '@/lib/site-url';

export default function SourceFormatPage() {
  const { slug, format } = useParams<{ slug?: string; format?: string }>();
  const fmt = slug || format;
  const page = fmt ? getSourceFormatPage(fmt) : undefined;
  const seo = page ? getSourceFormatSEO(page.sourceFormat) : undefined;
  const relatedRoutes = converterRoutes.filter(r => page ? r.sourceFormat === page.sourceFormat : false);
  const jsonLd = useMemo(() => {
    if (!seo || !page) return undefined;
    return [
      buildFAQSchema(seo.faqs),
      buildBreadcrumbSchema([
        { name: 'Home', url: absoluteUrl() },
        { name: seo.heading, url: absoluteUrl(page.sourceFormat) },
      ]),
    ];
  }, [seo, page]);
  useDocumentHead({
    title: seo?.title ?? 'FileConvertir',
    description: seo?.metaDescription ?? '',
    canonical: page ? absoluteUrl(page.sourceFormat) : undefined,
    jsonLd,
  });

  if (!page || !seo) return <Navigate to="/" replace />;

  return (
    <article className="mx-auto max-w-3xl px-4 py-6">
      {/* Breadcrumb */}
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
      </header>

      {seo.longDescription && (
        <section className="mt-8 rounded-xl border border-border bg-card/40 p-5 md:p-6">
          <p className="text-sm md:text-base text-foreground/90 leading-relaxed">{seo.longDescription}</p>
        </section>
      )}

      {/* Converter Tool — preselected source */}
      <section className="mt-8">
        <HeroConverter initialSource={page.sourceFormat} lockSource />
      </section>

      {/* What is this format? */}
      <section className="mt-12">
        <h2 className="text-xl font-extrabold text-foreground">What is {page.sourceFormat.toUpperCase()}?</h2>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{seo.details}</p>
      </section>

      {/* Convert to section */}
      {relatedRoutes.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-extrabold text-foreground">
            Convert {page.sourceFormat.toUpperCase()} to:
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {relatedRoutes.map(r => (
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

      {/* Use Cases */}
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

      {/* FAQs */}
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
    </article>
  );
}
