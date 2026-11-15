import { useId, type ReactNode } from 'react';
import { ArrowDown, ArrowRight, Check, Minus, X } from 'lucide-react';
import type { Graphic, PageLook, Support, TrackState } from '@/lib/seo/pages/types';

/**
 * Informative figures for conversion pages. Every figure is drawn from the
 * page's own data, uses theme colours, scales to its container and carries a
 * text alternative plus a caption.
 */

const INK = 'hsl(var(--foreground))';
const PAPER = 'hsl(var(--background))';
const SOFT = 'hsl(var(--muted-foreground))';
const LINE = 'hsl(var(--border))';

function Figure({ caption, children }: { caption: string; children: ReactNode }) {
  return (
    <figure className="my-6 rounded-xl border border-border bg-card p-4 md:p-5">
      {children}
      <figcaption className="mt-3 text-xs leading-relaxed text-muted-foreground">{caption}</figcaption>
    </figure>
  );
}

/** Two labelled panels with an arrow between them. */
function BeforeAfter({
  alt,
  left,
  right,
}: {
  alt: string;
  left: { label: string; panel: ReactNode };
  right: { label: string; panel: ReactNode };
}) {
  return (
    <div role="img" aria-label={alt} className="flex items-center justify-center gap-2 sm:gap-5">
      {[left, right].map((side, i) => (
        <div key={i} className="contents">
          {i === 1 && <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden="true" />}
          <div className="w-full max-w-[220px] text-center" aria-hidden="true">
            {side.panel}
            <p className="mt-2 text-xs font-bold text-foreground">{side.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Transparency ─────────────────────────────────────────── */

function AlphaPanel({ background }: { background: 'checker' | 'white' }) {
  const id = useId();
  return (
    <svg viewBox="0 0 120 90" className="h-auto w-full rounded-lg border border-border">
      <defs>
        <pattern id={id} width="12" height="12" patternUnits="userSpaceOnUse">
          <rect width="12" height="12" fill="#ffffff" />
          <rect width="6" height="6" fill="#d4d4d4" />
          <rect x="6" y="6" width="6" height="6" fill="#d4d4d4" />
        </pattern>
      </defs>
      <rect width="120" height="90" fill={background === 'checker' ? `url(#${id})` : '#ffffff'} />
      {/* The picture itself: a simple logo-like mark */}
      <circle cx="48" cy="45" r="22" fill="#0a0a0a" />
      <rect x="58" y="33" width="34" height="24" rx="6" fill="#0a0a0a" opacity="0.55" />
    </svg>
  );
}

/* ── Animation frames ─────────────────────────────────────── */

function FramesPanel({ count }: { count: 1 | 4 }) {
  const frames = count === 4 ? [0, 1, 2, 3] : [0];
  const w = 26;
  const startX = count === 4 ? 5 : 47;
  return (
    <svg viewBox="0 14 120 62" className="h-auto w-full">
      {frames.map((f) => {
        const x = startX + f * (w + 2);
        return (
          <g key={f} opacity={count === 4 && f > 0 ? 0.45 : 1}>
            <rect x={x} y="24" width={w} height="42" rx="3" fill={PAPER} stroke={INK} strokeWidth="1.5" />
            {/* a ball that moves from frame to frame */}
            <circle cx={x + 6 + f * 4.5} cy={56 - f * 7} r="4" fill={INK} />
            <line x1={x + 2} y1="62" x2={x + w - 2} y2="62" stroke={SOFT} strokeWidth="1" />
          </g>
        );
      })}
    </svg>
  );
}

/* ── Vector vs pixels ─────────────────────────────────────── */

function VectorPanel({ raster }: { raster: boolean }) {
  if (!raster) {
    return (
      <svg viewBox="0 0 120 90" className="h-auto w-full">
        <path d="M20 68 C 20 10, 100 10, 100 68" fill="none" stroke={INK} strokeWidth="3" />
        {/* anchor points and handles: the shape is stored as maths */}
        <line x1="20" y1="68" x2="20" y2="30" stroke={SOFT} strokeWidth="1" strokeDasharray="3 2" />
        <line x1="100" y1="68" x2="100" y2="30" stroke={SOFT} strokeWidth="1" strokeDasharray="3 2" />
        {[
          [20, 68],
          [100, 68],
        ].map(([x, y]) => (
          <rect key={x} x={x - 3} y={y - 3} width="6" height="6" fill={PAPER} stroke={INK} strokeWidth="1.5" />
        ))}
        {[
          [20, 30],
          [100, 30],
        ].map(([x, y]) => (
          <circle key={x} cx={x} cy={y} r="2.5" fill={SOFT} />
        ))}
      </svg>
    );
  }
  // The same arch sampled onto a coarse pixel grid.
  const cell = 6;
  const cells: [number, number][] = [];
  for (let gx = 0; gx < 20; gx++) {
    for (let gy = 0; gy < 15; gy++) {
      const x = gx * cell + cell / 2;
      const y = gy * cell + cell / 2;
      // distance to the arch (approximated as a half-ellipse outline)
      const nx = (x - 60) / 40;
      const ny = (68 - y) / 43;
      if (y <= 70 && Math.abs(Math.sqrt(nx * nx + ny * ny) - 1) < 0.1) cells.push([gx, gy]);
    }
  }
  return (
    <svg viewBox="0 0 120 90" className="h-auto w-full">
      {Array.from({ length: 21 }, (_, i) => (
        <line key={`v${i}`} x1={i * cell} y1="0" x2={i * cell} y2="90" stroke={LINE} strokeWidth="0.5" />
      ))}
      {Array.from({ length: 16 }, (_, i) => (
        <line key={`h${i}`} x1="0" y1={i * cell} x2="120" y2={i * cell} stroke={LINE} strokeWidth="0.5" />
      ))}
      {cells.map(([gx, gy]) => (
        <rect key={`${gx}-${gy}`} x={gx * cell} y={gy * cell} width={cell} height={cell} fill={INK} />
      ))}
    </svg>
  );
}

/* ── Document pages ───────────────────────────────────────── */

function Picture({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={LINE} />
      <circle cx={x + w * 0.75} cy={y + h * 0.3} r={Math.min(w, h) * 0.12} fill={SOFT} />
      <path
        d={`M${x} ${y + h} L${x + w * 0.35} ${y + h * 0.45} L${x + w * 0.55} ${y + h * 0.7} L${x + w * 0.72} ${y + h * 0.55} L${x + w} ${y + h} Z`}
        fill={SOFT}
      />
    </g>
  );
}

function textLines(x: number, y: number, widths: number[], gap = 7, weight = 2) {
  return widths.map((w, i) => (
    <line key={i} x1={x} y1={y + i * gap} x2={x + w} y2={y + i * gap} stroke={SOFT} strokeWidth={weight} strokeLinecap="round" />
  ));
}

function PagePanel({ look }: { look: PageLook }) {
  const sheet = <rect x="14" y="4" width="92" height="122" rx="3" fill={PAPER} stroke={INK} strokeWidth="1.5" />;
  let body: ReactNode;
  switch (look) {
    case 'styled':
      body = (
        <>
          {sheet}
          <line x1="24" y1="18" x2="78" y2="18" stroke={INK} strokeWidth="5" strokeLinecap="round" />
          {textLines(24, 30, [72, 66, 70])}
          <Picture x={24} y={52} w={34} h={26} />
          {textLines(64, 56, [32, 28, 32, 24])}
          {/* table */}
          <rect x="24" y="88" width="72" height="28" fill="none" stroke={SOFT} strokeWidth="1" />
          <line x1="24" y1="97" x2="96" y2="97" stroke={SOFT} strokeWidth="1" />
          <line x1="24" y1="106" x2="96" y2="106" stroke={SOFT} strokeWidth="1" />
          <line x1="48" y1="88" x2="48" y2="116" stroke={SOFT} strokeWidth="1" />
          <line x1="72" y1="88" x2="72" y2="116" stroke={SOFT} strokeWidth="1" />
        </>
      );
      break;
    case 'web':
      body = (
        <>
          {sheet}
          <line x1="14" y1="16" x2="106" y2="16" stroke={INK} strokeWidth="1.5" />
          {[21, 27, 33].map((cx) => (
            <circle key={cx} cx={cx} cy="10" r="2" fill={SOFT} />
          ))}
          <rect x="24" y="24" width="72" height="20" fill={LINE} />
          <line x1="24" y1="54" x2="70" y2="54" stroke={INK} strokeWidth="4" strokeLinecap="round" />
          {textLines(24, 66, [72, 68, 60])}
          <rect x="24" y="92" width="30" height="10" rx="5" fill={INK} />
          {textLines(24, 112, [50])}
        </>
      );
      break;
    case 'markup':
      body = (
        <>
          {sheet}
          <g fontFamily="ui-monospace, monospace" fontSize="9" fontWeight="700" fill={INK}>
            <text x="22" y="22">#</text>
            <text x="22" y="52">**</text>
            <text x="22" y="74">-</text>
            <text x="22" y="84">-</text>
            <text x="22" y="106">```</text>
          </g>
          {textLines(32, 19, [44])}
          {textLines(24, 32, [70, 62])}
          {textLines(36, 49, [30])}
          {textLines(30, 71, [50])}
          {textLines(30, 81, [42])}
          {textLines(42, 103, [36])}
        </>
      );
      break;
    case 'plain':
      body = (
        <>
          {sheet}
          {textLines(24, 18, [72, 68, 70, 50, 0, 72, 64, 70, 66, 38, 0, 70, 72, 58], 7.4)}
        </>
      );
      break;
    case 'mono':
      body = (
        <>
          {sheet}
          <g stroke={SOFT} strokeWidth="2" strokeDasharray="3 1.6">
            {[72, 60, 72, 48, 0, 66, 72, 54, 72, 36, 0, 72, 60, 42].map((w, i) =>
              w ? <line key={i} x1="24" y1={18 + i * 7.4} x2={24 + w} y2={18 + i * 7.4} /> : null,
            )}
          </g>
        </>
      );
      break;
    case 'photo':
      body = (
        <>
          {sheet}
          <Picture x={15} y={5} w={90} h={120} />
        </>
      );
      break;
    case 'image':
      body = (
        <>
          <Picture x={18} y={28} w={84} h={64} />
          <rect x="18" y="28" width="84" height="64" fill="none" stroke={INK} strokeWidth="1.5" />
        </>
      );
      break;
    case 'textfile':
      body = (
        <>
          <rect x="14" y="4" width="92" height="122" rx="3" fill="none" stroke={SOFT} strokeWidth="1.5" strokeDasharray="4 3" />
          {textLines(22, 16, [76, 70, 74, 40, 0, 76, 66, 72, 30, 0, 74, 76, 52, 0, 60], 7.2)}
        </>
      );
      break;
  }
  return (
    <svg viewBox="0 0 120 130" className="mx-auto h-auto w-full max-w-[150px]">
      {body}
    </svg>
  );
}

/* ── Waveform ─────────────────────────────────────────────── */

function WavePanel({ detail }: { detail: 'full' | 'reduced' }) {
  const points: string[] = [];
  for (let i = 0; i <= 232; i += 2) {
    const t = i / 6;
    let y = Math.sin(t * 0.55) * 15 + Math.sin(t * 1.7) * 7;
    if (detail === 'full') y += Math.sin(t * 5.3) * 4 + Math.sin(t * 9.1) * 2.5;
    points.push(`${i === 0 ? 'M' : 'L'}${4 + i} ${(40 - y).toFixed(1)}`);
  }
  return (
    <svg viewBox="0 0 240 80" className="h-auto w-full rounded-lg border border-border">
      <line x1="4" y1="40" x2="236" y2="40" stroke={LINE} strokeWidth="1" />
      <path d={points.join(' ')} fill="none" stroke={INK} strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

/* ── HTML figures ─────────────────────────────────────────── */

function SupportMark({ value }: { value: Support }) {
  const map = {
    yes: { Icon: Check, text: 'Opens', cls: 'bg-primary text-primary-foreground' },
    partial: { Icon: Minus, text: 'Depends on version', cls: 'border border-foreground text-foreground' },
    no: { Icon: X, text: 'Does not open', cls: 'border border-border text-muted-foreground' },
  } as const;
  const { Icon, text, cls } = map[value];
  return (
    <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${cls}`}>
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      <span className="sr-only">{text}</span>
    </span>
  );
}

const TRACK_LABEL: Record<TrackState, string> = {
  're-encoded': 'Re-encoded',
  decoded: 'Decoded',
  dropped: 'Dropped',
  new: 'Created',
};

export function GraphicFigure({ graphic }: { graphic: Graphic }) {
  switch (graphic.kind) {
    case 'table':
      return (
        <Figure caption={graphic.caption}>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-border">
                  <td className="py-2 pr-3" />
                  <th scope="col" className="py-2 pr-3 font-bold text-foreground">{graphic.columns[0]}</th>
                  <th scope="col" className="py-2 font-bold text-foreground">{graphic.columns[1]}</th>
                </tr>
              </thead>
              <tbody>
                {graphic.rows.map((row) => (
                  <tr key={row.label} className="border-b border-border last:border-0">
                    <th scope="row" className="py-2 pr-3 align-top font-semibold text-muted-foreground">{row.label}</th>
                    <td className="py-2 pr-3 align-top text-foreground">{row.a}</td>
                    <td className="py-2 align-top text-foreground">{row.b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Figure>
      );

    case 'sizeBars': {
      const max = Math.max(...graphic.bars.map((b) => b.value));
      return (
        <Figure caption={graphic.caption}>
          <ul className="space-y-3">
            {graphic.bars.map((bar) => (
              <li key={bar.label}>
                <div className="flex items-baseline justify-between gap-3 text-xs sm:text-sm">
                  <span className="font-semibold text-foreground">{bar.label}</span>
                  <span className="shrink-0 tabular-nums text-muted-foreground">
                    {bar.value} {graphic.unit}
                  </span>
                </div>
                <div className="mt-1 h-3 w-full rounded-full bg-secondary" aria-hidden="true">
                  <div
                    className={`h-3 rounded-full ${bar.highlight ? 'bg-primary' : 'bg-muted-foreground'}`}
                    style={{ width: `${Math.max(1.5, (bar.value / max) * 100)}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </Figure>
      );
    }

    case 'transparency':
      return (
        <Figure caption={graphic.caption}>
          <BeforeAfter
            alt={graphic.alt}
            left={{ label: graphic.sourceLabel, panel: <AlphaPanel background="checker" /> }}
            right={{
              label: graphic.targetLabel,
              panel: <AlphaPanel background={graphic.result === 'kept' ? 'checker' : 'white'} />,
            }}
          />
        </Figure>
      );

    case 'frames':
      return (
        <Figure caption={graphic.caption}>
          <BeforeAfter
            alt={graphic.alt}
            left={{ label: graphic.sourceLabel, panel: <FramesPanel count={4} /> }}
            right={{ label: graphic.targetLabel, panel: <FramesPanel count={1} /> }}
          />
        </Figure>
      );

    case 'vector':
      return (
        <Figure caption={graphic.caption}>
          <BeforeAfter
            alt={graphic.alt}
            left={{ label: graphic.sourceLabel, panel: <VectorPanel raster={false} /> }}
            right={{ label: graphic.targetLabel, panel: <VectorPanel raster /> }}
          />
        </Figure>
      );

    case 'pages':
      return (
        <Figure caption={graphic.caption}>
          <BeforeAfter
            alt={graphic.alt}
            left={{ label: graphic.left.label, panel: <PagePanel look={graphic.left.look} /> }}
            right={{ label: graphic.right.label, panel: <PagePanel look={graphic.right.look} /> }}
          />
        </Figure>
      );

    case 'wave':
      return (
        <Figure caption={graphic.caption}>
          <div role="img" aria-label={graphic.alt} className="grid gap-4 sm:grid-cols-2">
            {[graphic.left, graphic.right].map((side) => (
              <div key={side.label} aria-hidden="true">
                <WavePanel detail={side.detail} />
                <p className="mt-2 text-center text-xs font-bold text-foreground">{side.label}</p>
              </div>
            ))}
          </div>
        </Figure>
      );

    case 'flow':
      return (
        <Figure caption={graphic.caption}>
          <ol className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-stretch">
            {graphic.steps.map((step, i) => (
              <li key={step.label} className="flex flex-1 flex-col items-center gap-2 sm:flex-row">
                {i > 0 && (
                  <>
                    <ArrowDown className="h-4 w-4 shrink-0 text-muted-foreground sm:hidden" aria-hidden="true" />
                    <ArrowRight className="hidden h-4 w-4 shrink-0 text-muted-foreground sm:block" aria-hidden="true" />
                  </>
                )}
                <div className="w-full flex-1 rounded-lg border border-border bg-background px-3 py-2.5 text-center">
                  <p className="text-xs font-bold text-foreground sm:text-sm">{step.label}</p>
                  {step.detail && <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">{step.detail}</p>}
                </div>
              </li>
            ))}
          </ol>
        </Figure>
      );

    case 'tracks':
      return (
        <Figure caption={graphic.caption}>
          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <div className="flex-1 rounded-lg border border-foreground p-3">
              <p className="text-xs font-bold uppercase tracking-wide text-foreground">{graphic.source.name}</p>
              <ul className="mt-2 space-y-1.5">
                {graphic.source.tracks.map((t) => (
                  <li key={t} className="rounded-md bg-secondary px-2.5 py-1.5 text-xs text-foreground">{t}</li>
                ))}
              </ul>
            </div>
            <ArrowDown className="mx-auto h-5 w-5 shrink-0 text-muted-foreground sm:hidden" aria-hidden="true" />
            <ArrowRight className="hidden h-5 w-5 shrink-0 text-muted-foreground sm:block" aria-hidden="true" />
            <div className="flex-1 rounded-lg border border-foreground p-3">
              <p className="text-xs font-bold uppercase tracking-wide text-foreground">{graphic.target.name}</p>
              <ul className="mt-2 space-y-1.5">
                {graphic.target.tracks.map((t) => (
                  <li
                    key={t.label}
                    className={`flex items-center justify-between gap-2 rounded-md px-2.5 py-1.5 text-xs ${
                      t.state === 'dropped'
                        ? 'border border-dashed border-border text-muted-foreground line-through'
                        : 'bg-secondary text-foreground'
                    }`}
                  >
                    <span>{t.label}</span>
                    <span className="shrink-0 text-[10px] font-bold uppercase tracking-wide no-underline">
                      {TRACK_LABEL[t.state]}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Figure>
      );

    case 'support':
      return (
        <Figure caption={graphic.caption}>
          <table className="w-full border-collapse text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-border">
                <td className="py-2 pr-3" />
                <th scope="col" className="w-16 py-2 text-center font-bold text-foreground">{graphic.columns[0]}</th>
                <th scope="col" className="w-16 py-2 text-center font-bold text-foreground">{graphic.columns[1]}</th>
              </tr>
            </thead>
            <tbody>
              {graphic.rows.map((row) => (
                <tr key={row.label} className="border-b border-border last:border-0">
                  <th scope="row" className="py-2 pr-3 font-medium text-foreground">{row.label}</th>
                  <td className="py-2 text-center"><SupportMark value={row.a} /></td>
                  <td className="py-2 text-center"><SupportMark value={row.b} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-muted-foreground" aria-hidden="true">
            <span className="inline-flex items-center gap-1.5"><Check className="h-3 w-3" /> Opens</span>
            <span className="inline-flex items-center gap-1.5"><Minus className="h-3 w-3" /> Depends on version</span>
            <span className="inline-flex items-center gap-1.5"><X className="h-3 w-3" /> Does not open</span>
          </p>
        </Figure>
      );
  }
}
