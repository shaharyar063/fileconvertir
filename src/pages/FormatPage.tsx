import { useParams, Navigate, Link } from 'react-router-dom';
import { getFormatPageBySlug, converterRoutes } from '@/lib/converters';
import { getFormatSEO } from '@/lib/seo-content';
import { DropZone } from '@/components/DropZone';
import { ConversionProgress } from '@/components/ConversionProgress';
import { useConverter } from '@/hooks/use-converter';
import { Download, RotateCcw, ArrowRight, CheckCircle } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

export default function FormatPage() {
  const { format } = useParams<{ format: string }>();
  const page = format ? getFormatPageBySlug(`to-${format}`) : undefined;

  const {
    fileInfo, status, progress, result, error, handleFile, convert, reset,
  } = useConverter(page?.targetFormat);

  if (!page) return <Navigate to="/" replace />;

  const seo = getFormatSEO(page.targetFormat);
  const isConverting = status === 'converting';
  const isDone = status === 'done';
  const acceptHint = page.acceptedInputs.map(e => `.${e.toUpperCase()}`).join(', ');

  // Related: converters that output this format
  const relatedConverters = converterRoutes.filter(r => r.targetFormat === page.targetFormat).slice(0, 6);

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

      {/* Converter */}
      <section className="mt-8 rounded-2xl border border-border bg-card p-6 glow-orange">
        <div className="space-y-4">
          <DropZone
            onFile={handleFile}
            fileInfo={fileInfo}
            onClear={reset}
            disabled={isConverting}
            acceptHint={acceptHint}
          />

          <ConversionProgress status={status} progress={progress} />
          {error && <p className="text-sm text-destructive">{error}</p>}

          {fileInfo && !isDone && (
            <button
              onClick={convert}
              disabled={isConverting}
              className="h-12 w-full rounded-xl bg-primary text-sm font-bold uppercase tracking-wide text-primary-foreground transition-all hover:brightness-110 disabled:opacity-50"
            >
              {isConverting ? 'Converting…' : `Convert to ${page.targetFormat.toUpperCase()}`}
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

      {/* Format Details */}
      <section className="mt-12">
        <h2 className="text-xl font-extrabold text-foreground">About {page.targetFormat.toUpperCase()} Format</h2>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{seo.details}</p>
      </section>

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

      {/* Related Converters */}
      {relatedConverters.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-extrabold text-foreground">
            Converters That Output {page.targetFormat.toUpperCase()}
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {relatedConverters.map(r => (
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
