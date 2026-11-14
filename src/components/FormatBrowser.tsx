import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { converterRoutes } from '@/lib/converters';
import { sitePath } from '@/lib/site-url';


const CATEGORY_LABELS: Record<string, string> = {
  image: 'Images',
  document: 'Documents',
  audio: 'Audio',
  video: 'Video',
  font: 'Fonts',
  archive: 'Archives',
};

interface FormatEntry {
  source: string;
  targets: string[];
  category: string;
}

const formats: FormatEntry[] = (() => {
  const bySource = new Map<string, FormatEntry>();
  for (const r of converterRoutes) {
    const entry = bySource.get(r.sourceFormat) ?? {
      source: r.sourceFormat,
      targets: [],
      category: r.category.toLowerCase(),
    };
    entry.targets.push(r.targetFormat);
    bySource.set(r.sourceFormat, entry);
  }
  return [...bySource.values()];
})();

export function FormatBrowser() {
  const [selected, setSelected] = useState<string | null>(null);

  const selectedEntry = selected ? formats.find((f) => f.source === selected) ?? null : null;

  function toggle(src: string) {
    setSelected((prev) => (prev === src ? null : src));
  }

  return (
    <div className="space-y-4">
      {/* All formats, wrapping so nothing is clipped on small screens */}
      <div className="flex flex-wrap gap-2">
        {formats.map(({ source }) => {
          const isSelected = selected === source;
          return (
            <button
              key={source}
              onClick={() => toggle(source)}
              className={`group relative rounded-xl border px-4 py-2.5 text-sm font-bold uppercase tracking-wide transition-all duration-150
                ${isSelected
                  ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                  : 'border-border bg-card text-foreground hover:border-primary hover:text-primary'
                }`}
            >
              .{source}
            </button>
          );
        })}
      </div>

      {/* Expandable converter panel */}
      {selectedEntry && (
        <div
          key={selectedEntry.source}
          className="animate-in fade-in slide-in-from-top-2 duration-200 rounded-xl border border-primary/30 bg-card p-5 shadow-sm"
        >
          {/* Panel header */}
          <div className="mb-4 flex items-center justify-between">
            <div>
              <span
                className={`inline-block rounded-full border border-border bg-secondary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-muted-foreground`}
              >
                {CATEGORY_LABELS[selectedEntry.category]}
              </span>
              <p className="mt-1.5 text-sm font-bold text-foreground">
                Convert .{selectedEntry.source.toUpperCase()} to…
              </p>
            </div>
            <button
              onClick={() => setSelected(null)}
              className="text-xs text-muted-foreground hover:text-foreground"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {/* Converter tiles */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {selectedEntry.targets.map((target) => (
              <Link
                key={target}
                to={sitePath(`${selectedEntry.source}-to-${target}`)}
                className="group flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <span className="truncate">
                  {selectedEntry.source.toUpperCase()}
                  <span className="mx-1 font-normal text-muted-foreground">→</span>
                  {target.toUpperCase()}
                </span>
                <ArrowRight className="ml-1 h-3 w-3 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
