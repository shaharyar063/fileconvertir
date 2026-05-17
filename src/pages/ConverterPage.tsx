import { useParams, Navigate, Link } from 'react-router-dom';
import { useMemo } from 'react';
import { getConverterBySlug } from '@/lib/converters';
import { getConverterSEO } from '@/lib/seo-content';
import { getRelatedConverters } from '@/lib/site-navigation';
import { HeroConverter } from '@/components/HeroConverter';
import { CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { useDocumentHead } from '@/hooks/use-document-head';
import { buildFAQSchema, buildBreadcrumbSchema, buildHowToSchema, SITE_URL } from '@/lib/seo-jsonld';

export default function ConverterPage() {
  const { slug } = useParams<{ slug: string }>();
  const route = slug ? getConverterBySlug(slug) : undefined;
  const seo = route ? getConverterSEO(route.sourceFormat, route.targetFormat) : undefined;
  const related = route
    ? getRelatedConverters(route.sourceFormat, route.targetFormat, 12)
    : [];
  const jsonLd = useMemo(() => {
    if (!seo || !route) return undefined;
    const schemas: object[] = [
      buildFAQSchema(seo.faqs),
      buildBreadcrumbSchema([
        { name: 'Home', url: SITE_URL },
        { name: seo.heading, url: `${SITE_URL}/${route.slug}` },
      ]),
    ];
    if (seo.howToSteps && seo.howToSteps.length > 0) {
      schemas.push(buildHowToSchema(`How to ${seo.heading}`, seo.howToSteps));
    }
    return schemas;
  }, [seo, route]);
  useDocumentHead({
    title: seo?.title ?? 'FileConvertir',
    description: seo?.metaDescription ?? '',
    canonical: route ? `${SITE_URL}/${route.slug}` : undefined,
    jsonLd,
  });

  if (!route || !seo) return <Navigate to="/" replace />;

  return (
    <article className="mx-auto max-w-3xl px-4 py-6">
      {/* Breadcrumb */}
      <nav className="mb-6 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <Link to={`/${route.sourceFormat}`} className="hover:text-primary">
          {route.sourceFormat.toUpperCase()}
        </Link>
        <span className="mx-2">/</span>
        <Link to={`/to-${route.targetFormat}`} className="hover:text-primary">
          To {route.targetFormat.toUpperCase()}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{seo.heading}</span>
      </nav>

      {/* Title */}
      <header>
        <h1 className="text-3xl font-extrabold text-foreground md:text-4xl">
          {seo.heading}
        </h1>
        <p className="mt-3 text-base text-muted-foreground leading-relaxed">
          {seo.description}
        </p>
      </header>

      {/* Converter Tool — reuses HeroConverter with preselected formats */}
      <section className="mt-8">
        <HeroConverter
          initialSource={route.sourceFormat}
          initialTarget={route.targetFormat}
        />
      </section>

      {/* Long-form description for priority pages — placed near top for E-E-A-T signal */}
      {seo.longDescription && (
        <section className="mt-10 rounded-xl border border-border bg-card/40 p-5 md:p-6">
          <p className="text-sm md:text-base text-foreground/90 leading-relaxed">
            {seo.longDescription}
          </p>
        </section>
      )}

      {/* How To — step-by-step guide (priority pages only) */}
      {seo.howToSteps && seo.howToSteps.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-extrabold text-foreground">
            How to {seo.heading}
          </h2>
          <ol className="mt-5 space-y-4">
            {seo.howToSteps.map((step, i) => (
              <li key={i} className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {i + 1}
                </div>
                <div className="pt-1">
                  <h3 className="text-sm font-bold text-foreground">{step.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Why Choose Us — comparison points (priority pages only) */}
      {seo.whyChooseUs && seo.whyChooseUs.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-extrabold text-foreground">
            Why use FileConvertir for this conversion?
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {seo.whyChooseUs.map((item, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-bold text-foreground">{item.title}</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Format Info */}
      <section className="mt-12 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
            About {route.sourceFormat.toUpperCase()}
          </h2>
          <p className="mt-2 text-sm text-foreground leading-relaxed">{seo.sourceInfo}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
            About {route.targetFormat.toUpperCase()}
          </h2>
          <p className="mt-2 text-sm text-foreground leading-relaxed">{seo.targetInfo}</p>
        </div>
      </section>

      {/* Use Cases */}
      <section className="mt-12">
        <h2 className="text-xl font-extrabold text-foreground">
          Why Convert {route.sourceFormat.toUpperCase()} to {route.targetFormat.toUpperCase()}?
        </h2>
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
      <section className="mt-12">
        <h2 className="text-xl font-extrabold text-foreground">
          Frequently Asked Questions
        </h2>
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

      {/* Related Converters */}
      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-extrabold text-foreground">
            Related Converters
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {related.map(r => (
              <Link
                key={r.slug}
                to={`/${r.slug}`}
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
