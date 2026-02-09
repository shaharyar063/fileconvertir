import { useNavigate } from 'react-router-dom';
import { converterRoutes, formatPages } from '@/lib/converters';

export default function AllConverters() {
  const navigate = useNavigate();

  const categories = [...new Set(converterRoutes.map(r => r.category))];

  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <h1 className="text-2xl font-bold text-foreground">All Converters</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Choose a conversion tool below.
      </p>

      {/* Format pages */}
      <div className="mt-8">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">By Output Format</h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {formatPages.map(p => (
            <button
              key={p.slug}
              onClick={() => navigate(`/${p.slug}`)}
              className="rounded border border-border px-3 py-2 text-left text-sm text-foreground hover:border-primary hover:text-primary"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Pair routes */}
      {categories.map(cat => (
        <div key={cat} className="mt-8">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{cat}</h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {converterRoutes.filter(r => r.category === cat).map(r => (
              <button
                key={r.slug}
                onClick={() => navigate(`/${r.slug}`)}
                className="rounded border border-border px-3 py-2 text-left text-sm text-foreground hover:border-primary hover:text-primary"
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
