import { useDocumentHead } from '@/hooks/use-document-head';
import { absoluteUrl } from '@/lib/site-url';
import { PRIVACY_PAGE, PRIVACY_UPDATED } from '@/lib/seo/privacy';

export default function Privacy() {
  useDocumentHead({
    title: PRIVACY_PAGE.title,
    description: PRIVACY_PAGE.metaDescription,
    canonical: absoluteUrl('privacy'),
  });

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-extrabold text-foreground md:text-4xl">{PRIVACY_PAGE.heading}</h1>
      <p className="mt-2 text-xs text-muted-foreground">Last updated {PRIVACY_UPDATED}</p>
      <p className="mt-6 text-sm leading-relaxed text-foreground/90">{PRIVACY_PAGE.intro}</p>
      {PRIVACY_PAGE.sections.map((s) => (
        <section key={s.heading} className="mt-8">
          <h2 className="text-xl font-bold text-foreground">{s.heading}</h2>
          {s.paragraphs.map((p) => (
            <p key={p} className="mt-3 text-sm leading-relaxed text-foreground/90">{p}</p>
          ))}
        </section>
      ))}
    </article>
  );
}
