import { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { ConverterRoute } from '@/lib/converters';
import type { ConversionPage } from '@/lib/seo/pages/types';
import { formatLabel } from '@/lib/format-label';
import { getRelatedConverters } from '@/lib/site-navigation';
import { sitePath } from '@/lib/site-url';
import { HeroConverter } from '@/components/HeroConverter';
import { GraphicFigure } from '@/components/graphics/Graphic';
import { StepsVisual } from '@/components/graphics/StepsVisual';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { useDocumentHead } from '@/hooks/use-document-head';
import { buildFAQSchema, buildBreadcrumbSchema, buildHowToSchema, absoluteUrl } from '@/lib/seo-jsonld';

const H2 = 'text-xl font-extrabold text-foreground md:text-2xl';
const PROSE = 'text-sm leading-relaxed text-muted-foreground md:text-[15px]';

/**
 * Conversion page: H1 + short description + tool, then exactly four content
 * sections (how to, understanding, why and when, FAQ) and related links.
 */
export function ConversionPageView({ route, page }: { route: ConverterRoute; page: ConversionPage }) {
  const source = formatLabel(route.sourceFormat);
  const target = formatLabel(route.targetFormat);
  const pair = `${source} to ${target}`;
  const related = getRelatedConverters(route.sourceFormat, route.targetFormat, 9);

  // The tool lets people pick any supported pair. Pairs without their own page
  // do not navigate, so the page switches to a plain tool view instead of
  // showing a guide for the wrong conversion.
  const [selection, setSelection] = useState({ source: route.sourceFormat, target: route.targetFormat });
  const onPairChange = useCallback((s: string, t: string) => {
    const norm = (x: string) => (x === 'jpeg' ? 'jpg' : x);
    setSelection((prev) => (prev.source === norm(s) && prev.target === norm(t) ? prev : { source: norm(s), target: norm(t) }));
  }, []);
  const isGuidePair = selection.source === route.sourceFormat && selection.target === route.targetFormat;
  const customTitle =
    selection.source && selection.target
      ? `${formatLabel(selection.source)} to ${formatLabel(selection.target)} Converter`
      : 'Free Online File Converter';

  const jsonLd = useMemo(
    () => [
      buildHowToSchema(`How to convert ${pair}`, page.steps),
      buildFAQSchema(page.faqs),
      buildBreadcrumbSchema([
        { name: 'Home', url: absoluteUrl() },
        { name: `${source} converter`, url: absoluteUrl(route.sourceFormat) },
        { name: page.heading, url: absoluteUrl(route.slug) },
      ]),
    ],
    [page, pair, source, route],
  );

  useDocumentHead({
    title: isGuidePair ? page.title : `${customTitle} — FileConvertir`,
    description: isGuidePair ? page.metaDescription : 'Convert files in your browser. Nothing is uploaded.',
    canonical: absoluteUrl(route.slug),
    jsonLd: isGuidePair ? jsonLd : undefined,
    noindex: !isGuidePair,
  });

  return (
    <article className="mx-auto max-w-3xl px-4 py-8">
      {/* Above the tool: the H1 and a short description only */}
      <header>
        <h1 className="text-3xl font-extrabold text-foreground md:text-4xl">
          {isGuidePair ? page.heading : customTitle}
        </h1>
        <p className="mt-2 text-xs leading-snug text-muted-foreground">
          {isGuidePair
            ? page.description
            : 'Add your files, pick the output format and convert. Everything runs in your browser, so nothing is uploaded.'}
        </p>
      </header>

      <div className="mt-6">
        <HeroConverter
          initialSource={route.sourceFormat}
          initialTarget={route.targetFormat}
          onPairChange={onPairChange}
        />
      </div>

      {!isGuidePair && (
        <p className="mt-8 text-sm text-muted-foreground">
          Looking for the guide?{' '}
          <Link to={sitePath(route.slug)} reloadDocument className="font-medium text-foreground underline underline-offset-4">
            Read about {pair} conversion
          </Link>
          .
        </p>
      )}

      {isGuidePair && (
        <>

      {/* 1. How to */}
      <section className="mt-14" aria-labelledby="how-to">
        <h2 id="how-to" className={H2}>How to Convert {pair}</h2>
        <StepsVisual steps={page.steps} source={source} target={target} />
      </section>

      {/* 2. Understanding */}
      <section className="mt-14" aria-labelledby="understanding">
        <h2 id="understanding" className={H2}>Understanding {pair} Conversion</h2>
        <div className="mt-4 space-y-4">
          {page.understanding.paragraphs.map((p) => (
            <p key={p} className={PROSE}>{p}</p>
          ))}
        </div>
        {page.understanding.graphics.map((g, i) => (
          <GraphicFigure key={i} graphic={g} />
        ))}
        {page.understanding.subsections?.map((sub) => (
          <div key={sub.heading} className="mt-6">
            <h3 className="text-base font-bold text-foreground">{sub.heading}</h3>
            <div className="mt-2 space-y-3">
              {sub.paragraphs.map((p) => (
                <p key={p} className={PROSE}>{p}</p>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* 3. Why and when */}
      <section className="mt-14" aria-labelledby="why-when">
        <h2 id="why-when" className={H2}>Why and When to Convert {pair}</h2>
        <ul className="mt-4 space-y-3">
          {page.whyWhen.scenarios.map((s) => (
            <li key={s.title} className={`${PROSE} border-l-2 border-border pl-4`}>
              <strong className="font-semibold text-foreground">{s.title}.</strong> {s.text}
            </li>
          ))}
        </ul>
        {page.whyWhen.graphic && <GraphicFigure graphic={page.whyWhen.graphic} />}
        <h3 className="mt-6 text-base font-bold text-foreground">When to keep the {source} instead</h3>
        <p className={`mt-2 ${PROSE}`}>{page.whyWhen.keepOriginal}</p>
      </section>

      {/* 4. FAQ */}
      <section className="mt-14" aria-labelledby="faq">
        <h2 id="faq" className={H2}>Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="mt-4">
          {page.faqs.map((faq, i) => (
            <AccordionItem key={faq.q} value={`faq-${i}`}>
              <AccordionTrigger className="text-left text-sm text-foreground hover:no-underline">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Related links (navigation, not a content section) */}
      <nav className="mt-14 border-t border-border pt-8" aria-label="Related conversions">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Related conversions</p>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {related.map((r) => (
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
        <p className="mt-4 text-sm text-muted-foreground">
          More:{' '}
          <Link to={sitePath(route.sourceFormat)} className="font-medium text-foreground underline underline-offset-4">
            all {source} conversions
          </Link>{' '}
          ·{' '}
          <Link to={sitePath(`to-${route.targetFormat}`)} className="font-medium text-foreground underline underline-offset-4">
            convert other files to {target}
          </Link>
        </p>
      </nav>
        </>
      )}
    </article>
  );
}
