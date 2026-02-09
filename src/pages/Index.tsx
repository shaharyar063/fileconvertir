import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { converterRoutes } from '@/lib/converters';

export default function Index() {
  const [selected, setSelected] = useState(converterRoutes[0].slug);
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center">
      <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        Convert Files Instantly.<br />No Signup. No Fuss.
      </h1>
      <p className="mt-3 text-muted-foreground">
        Convert images, documents, and audio files directly in your browser.
      </p>

      <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="h-10 w-full max-w-xs rounded border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
        >
          {converterRoutes.map((r) => (
            <option key={r.slug} value={r.slug}>
              {r.label}
            </option>
          ))}
        </select>
        <button
          onClick={() => navigate(`/${selected}`)}
          className="h-10 rounded bg-primary px-6 text-sm font-semibold text-primary-foreground hover:opacity-90"
        >
          Go to Converter →
        </button>
      </div>

      <div className="mt-16 border-t border-border pt-8">
        <h2 className="mb-4 text-sm font-semibold text-muted-foreground uppercase tracking-wide">Available Converters</h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {converterRoutes.map((r) => (
            <a
              key={r.slug}
              href={`/${r.slug}`}
              onClick={(e) => { e.preventDefault(); navigate(`/${r.slug}`); }}
              className="rounded border border-border px-3 py-2 text-sm text-foreground hover:bg-secondary"
            >
              {r.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
