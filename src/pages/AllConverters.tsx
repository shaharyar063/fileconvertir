import { Link } from 'react-router-dom';
import { converterRoutes, formatPages } from '@/lib/converters';
import { getTotalConversions } from '@/lib/seo-content';
import { Image, FileText, Music, Film, Type, Archive, ArrowRight } from 'lucide-react';

const categoryMeta: Record<string, { icon: React.ElementType; desc: string }> = {
  Image: { icon: Image, desc: 'Convert between image formats like PNG, JPG, WebP, AVIF, and more.' },
  Document: { icon: FileText, desc: 'Convert documents between PDF, DOCX, TXT, HTML, and Markdown.' },
  Audio: { icon: Music, desc: 'Convert audio files between MP3, WAV, AAC, OGG, and FLAC.' },
  Video: { icon: Film, desc: 'Extract audio from video files like MP4, MOV, and WebM.' },
  Font: { icon: Type, desc: 'Convert fonts between TTF, OTF, WOFF, and WOFF2 formats.' },
  Archive: { icon: Archive, desc: 'Convert between archive formats like ZIP, TAR, and GZ.' },
};

export default function AllConverters() {
  const categories = [...new Set(converterRoutes.map(r => r.category))];

  return (
    <article className="mx-auto max-w-4xl px-4 py-12">
      <nav className="mb-6 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">All Converters</span>
      </nav>

      <header>
        <h1 className="text-3xl font-extrabold text-foreground md:text-4xl">All Converters</h1>
        <p className="mt-2 text-muted-foreground">
          Browse all {getTotalConversions()} available conversion tools. Every conversion runs in your browser.
        </p>
      </header>

      {/* Format Pages */}
      <section className="mt-10">
        <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">By Output Format</h2>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {formatPages.map(p => (
            <Link
              key={p.slug}
              to={`/${p.slug}`}
              className="rounded-xl border border-border bg-card px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {p.label}
            </Link>
          ))}
        </div>
      </section>

      {/* By Category */}
      {categories.map(cat => {
        const meta = categoryMeta[cat];
        const Icon = meta?.icon || FileText;
        const routes = converterRoutes.filter(r => r.category === cat);
        return (
          <section key={cat} className="mt-10">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground">{cat}</h2>
                {meta?.desc && <p className="text-xs text-muted-foreground">{meta.desc}</p>}
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
              {routes.map(r => (
                <Link
                  key={r.slug}
                  to={`/${r.slug}`}
                  className="flex items-center justify-between rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <span>{r.label}</span>
                  <ArrowRight className="h-3 w-3 text-muted-foreground" />
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </article>
  );
}
