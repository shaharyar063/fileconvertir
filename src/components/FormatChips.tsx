import { ConversionOption } from '@/lib/converter-types';

interface FormatChipsProps {
  formats: ConversionOption[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function FormatChips({ formats, value, onChange, disabled }: FormatChipsProps) {
  if (formats.length === 0) return null;

  return (
    <div className="space-y-2">
      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Output Format</label>
      <div className="flex flex-wrap gap-2">
        {formats.map((f) => {
          const isSelected = value === f.targetFormat;
          return (
            <button
              key={f.targetFormat}
              type="button"
              disabled={disabled}
              onClick={() => onChange(f.targetFormat)}
              className={`
                rounded-lg border px-4 py-2 text-sm font-bold uppercase tracking-wide transition-all
                disabled:opacity-50 disabled:cursor-not-allowed
                ${isSelected
                  ? 'border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20'
                  : 'border-border bg-secondary/50 text-foreground hover:border-primary hover:text-primary'
                }
              `}
            >
              .{f.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
