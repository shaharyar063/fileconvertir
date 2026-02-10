import { useParams, Navigate, Link } from 'react-router-dom';
import { getConverterBySlug } from '@/lib/converters';
import { getConverterSEO, getRelatedConverters } from '@/lib/seo-content';
import { DropZone } from '@/components/DropZone';
import { ConversionProgress } from '@/components/ConversionProgress';
import { useConverter } from '@/hooks/use-converter';
import { Download, RotateCcw, ArrowRight, CheckCircle } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

export default function ConverterPage() {
  const { slug } = useParams<{ slug: string }>();
  const route = slug ? getConverterBySlug(slug) : undefined;

  const {
    fileInfo, status, progress, result, error, handleFile, convert, reset,
  } = useConverter(route?.targetFormat);

  if (!route) return <Navigate to="/" replace />;

  const seo = getConverterSEO(route.sourceFormat, route.targetFormat);
  const related = getRelatedConverters(route.sourceFormat, route.targetFormat);
  const isConverting = status === 'converting';
  const isDone = status === 'done';

  const handleDownload = () => {
    if (!result) return;
    const url = URL.createObjectURL(result.blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = result.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/converters" className="hover:text-primary">Converters</Link>
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

      {/* Converter Tool */}
      <section className="mt-8 rounded-2xl border border-border bg-card p-6 glow-orange">
        <div className="space-y-4">
          <DropZone
            onFile={handleFile}
            fileInfo={fileInfo}
            onClear={reset}
            disabled={isConverting}
            acceptHint={`.${route.sourceFormat.toUpperCase()}`}
          />

          <ConversionProgress status={status} progress={progress} />
          {error && <p className="text-sm text-destructive">{error}</p>}

          {fileInfo && !isDone && (
            <button
              onClick={convert}
              disabled={isConverting}
              className="h-12 w-full rounded-xl bg-primary text-sm font-bold uppercase tracking-wide text-primary-foreground transition-all hover:brightness-110 disabled:opacity-50"
            >
              {isConverting ? 'Converting…' : `Convert to ${route.targetFormat.toUpperCase()}`}
            </button>
          )}

          {isDone && (
            <div className="flex gap-3">
              <button
                onClick={handleDownload}
                className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-primary text-sm font-bold text-primary-foreground transition-all hover:brightness-110"
              >
                <Download className="h-4 w-4" />
                Download {result?.filename}
              </button>
              <button
                onClick={reset}
                className="flex h-12 items-center gap-2 rounded-xl border border-border px-5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                <RotateCcw className="h-4 w-4" />
                New
              </button>
            </div>
          )}
        </div>
      </section>

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
