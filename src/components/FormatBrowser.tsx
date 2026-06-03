import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { conversionMap } from '@/lib/conversion-map';
import { sitePath } from '@/lib/site-url';

const CATEGORY_ORDER = ['image', 'document', 'audio', 'video', 'font', 'archive'] as const;

const CATEGORY_LABELS: Record<string, string> = {
  image: 'Images',
  document: 'Documents',
  audio: 'Audio',
  video: 'Video',
  font: 'Fonts',
  archive: 'Archives',
};

const CATEGORY_COLORS: Record<string, string> = {
  image:    'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
  document: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  audio:    'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  video:    'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
  font:     'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300',
  archive:  'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300',
};

interface FormatEntry {
  source: string;
  targets: string[];
  category: string;
}

const formats: FormatEntry[] = conversionMap
  .filter((e) => e.source !== 'jpeg')
  .map((e) => ({ source: e.source, targets: e.targets, category: e.category }));

const grouped = CATEGORY_ORDER.map((cat) => ({
  cat,
  label: CATEGORY_LABELS[cat],
  formats: formats.filter((f) => f.category === cat),
})).filter((g) => g.formats.length > 0);

export function FormatBrowser() {
  const [selected, setSelected] = useState<string | null>(null);

  const selectedEntry = selected ? formats.find((f) => f.source === selected) ?? null : null;

  function toggle(src: string) {
    setSelected((prev) => (prev === src ? null : src));
  }

  return (
    <div className="space-y-6">
      {grouped.map(({ cat, label, formats: catFormats }) => (
        <div key={cat}>
          {/* Category label */}
          <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
            {label}
          </p>

          {/* Horizontally scrollable format chips */}
          <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {catFormats.map(({ source }) => {
              const isSelected = selected === source;
              return (
                <button
                  key={source}
                  onClick={() => toggle(source)}
                  className={`group relative shrink-0 rounded-xl border px-4 py-2.5 text-sm font-bold uppercase tracking-wide transition-all duration-150
                    ${isSelected
                      ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                      : 'border-border bg-card text-foreground hover:border-primary hover:text-primary'
                    }`}
                >
                  .{source}
                  {isSelected && (
                    <span className="absolute -bottom-[9px] left-1/2 -translate-x-1/2 border-4 border-transparent border-t-primary" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}

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
                className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${CATEGORY_COLORS[selectedEntry.category]}`}
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
