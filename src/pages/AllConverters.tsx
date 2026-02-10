import { useNavigate } from 'react-router-dom';
import { converterRoutes, formatPages } from '@/lib/converters';
import { Image, FileText, Music, Film, Type, Archive } from 'lucide-react';

const categoryIcons: Record<string, React.ReactNode> = {
  Image: <Image className="h-4 w-4" />,
  Document: <FileText className="h-4 w-4" />,
  Audio: <Music className="h-4 w-4" />,
  Video: <Film className="h-4 w-4" />,
  Font: <Type className="h-4 w-4" />,
  Archive: <Archive className="h-4 w-4" />,
};

export default function AllConverters() {
  const navigate = useNavigate();
  const categories = [...new Set(converterRoutes.map(r => r.category))];

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-extrabold text-foreground">All Converters</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Browse all available conversion tools.
      </p>

      {/* Format pages */}
      <div className="mt-8 space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">By Output Format</h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {formatPages.map(p => (
            <button
              key={p.slug}
              onClick={() => navigate(`/${p.slug}`)}
              className="rounded-xl border border-border bg-card px-3 py-2.5 text-left text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {categories.map(cat => (
        <div key={cat} className="mt-8 space-y-2">
          <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            {categoryIcons[cat]}
            {cat}
          </h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {converterRoutes.filter(r => r.category === cat).map(r => (
              <button
                key={r.slug}
                onClick={() => navigate(`/${r.slug}`)}
                className="rounded-xl border border-border bg-card px-3 py-2.5 text-left text-sm text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
