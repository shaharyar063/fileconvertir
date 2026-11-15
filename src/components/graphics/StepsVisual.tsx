import type { Step } from '@/lib/seo/pages/types';

const INK = 'hsl(var(--foreground))';
const PAPER = 'hsl(var(--background))';

/** A document outline with the format written on it. */
function FileGlyph({ label, x = 0 }: { label: string; x?: number }) {
  const text = label.length > 5 ? label.slice(0, 5) : label;
  return (
    <g transform={`translate(${x} 0)`}>
      <path d="M6 3 H22 L32 13 V43 a2 2 0 0 1 -2 2 H6 a2 2 0 0 1 -2 -2 V5 a2 2 0 0 1 2 -2 Z" fill={PAPER} stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      <path d="M22 3 V13 H32" fill="none" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      <text x="18" y="35" textAnchor="middle" fontSize={text.length > 4 ? 7 : text.length > 3 ? 8 : 9.5} fontWeight="800" fill={INK} fontFamily="Inter, system-ui, sans-serif">
        {text}
      </text>
    </g>
  );
}

function StepIcon({ index, source, target }: { index: number; source: string; target: string }) {
  return (
    <svg viewBox="0 0 84 48" className="h-12 w-auto" aria-hidden="true">
      {index === 0 && (
        <>
          <FileGlyph label={source} x={24} />
          {/* plus badge: add a file */}
          <circle cx="62" cy="12" r="9" fill={INK} />
          <path d="M62 7.5 V16.5 M57.5 12 H66.5" stroke={PAPER} strokeWidth="2" strokeLinecap="round" />
        </>
      )}
      {index === 1 && (
        <>
          <FileGlyph label={source} x={0} />
          <path d="M40 18 H50 M46 14 L50 18 L46 22" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M50 30 H40 M44 26 L40 30 L44 34" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
          <FileGlyph label={target} x={52} />
        </>
      )}
      {index === 2 && (
        <>
          <FileGlyph label={target} x={24} />
          {/* down-arrow badge: download */}
          <circle cx="62" cy="36" r="9" fill={INK} />
          <path d="M62 31 V40 M58 36.5 L62 40.5 L66 36.5" fill="none" stroke={PAPER} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
    </svg>
  );
}

/** Section 1 visual: three numbered cards — add, convert, download. */
export function StepsVisual({ steps, source, target }: { steps: Step[]; source: string; target: string }) {
  return (
    <ol className="mt-5 grid gap-3 sm:grid-cols-3">
      {steps.map((step, i) => (
        <li key={step.name} className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              {i + 1}
            </span>
            <StepIcon index={i} source={source} target={target} />
          </div>
          <h3 className="mt-3 text-sm font-bold text-foreground">{step.name}</h3>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
        </li>
      ))}
    </ol>
  );
}
