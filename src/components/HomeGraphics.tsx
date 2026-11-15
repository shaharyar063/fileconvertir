import type { ReactNode } from 'react';
import { conversionMap } from '@/lib/conversion-map';

/** Original diagrams for the homepage. Theme colours, text alternatives and captions. */

const INK = 'hsl(var(--foreground))';
const PAPER = 'hsl(var(--background))';
const SOFT = 'hsl(var(--muted-foreground))';
const LINE = 'hsl(var(--border))';

function Figure({ caption, label, children }: { caption: string; label: string; children: ReactNode }) {
  return (
    <figure className="mt-8 rounded-xl border border-border bg-card p-4 md:p-5">
      <div role="img" aria-label={label}>{children}</div>
      <figcaption className="mt-3 text-xs leading-relaxed text-muted-foreground">{caption}</figcaption>
    </figure>
  );
}

const Arrow = ({ x1, x2, y }: { x1: number; x2: number; y: number }) => (
  <g stroke={INK} strokeWidth="2" fill="none">
    <line x1={x1} y1={y} x2={x2 - 6} y2={y} />
    <path d={`M${x2 - 10} ${y - 5} L${x2} ${y} L${x2 - 10} ${y + 5}`} />
  </g>
);

function FileIcon({ x, y, ext, dark = false }: { x: number; y: number; ext: string; dark?: boolean }) {
  return (
    <g>
      <path d={`M${x} ${y} h34 l14 14 v46 h-48 z`} fill={dark ? INK : PAPER} stroke={INK} strokeWidth="2" />
      <path d={`M${x + 34} ${y} v14 h14`} fill="none" stroke={dark ? PAPER : INK} strokeWidth="2" />
      <text x={x + 24} y={y + 50} textAnchor="middle" fontSize="12" fontWeight="700" fill={dark ? PAPER : INK}>
        {ext}
      </text>
    </g>
  );
}

/** Step 1–3: the file goes in, the browser converts it, the result comes out, all inside one device. */
export function HowItWorksFigure() {
  return (
    <Figure
      label="A file named photo.png enters a browser tab on your device, which converts it, and a file named photo.jpg comes out. The whole path stays inside your device."
      caption="Everything between adding a file and downloading the result happens inside your own browser."
    >
      <svg viewBox="0 0 600 150" className="h-auto w-full" aria-hidden="true">
        <rect x="6" y="6" width="588" height="138" rx="14" fill="none" stroke={SOFT} strokeWidth="1.5" strokeDasharray="6 5" />
        <text x="22" y="26" fontSize="11" fontWeight="700" letterSpacing="1" fill={SOFT}>YOUR DEVICE</text>
        <FileIcon x={40} y={48} ext="PNG" />
        <text x="64" y="128" textAnchor="middle" fontSize="11" fill={INK}>1. Add</text>
        <Arrow x1={110} x2={196} y={78} />
        <rect x="200" y="46" width="200" height="66" rx="8" fill={PAPER} stroke={INK} strokeWidth="2" />
        <line x1="200" y1="62" x2="400" y2="62" stroke={INK} strokeWidth="2" />
        <circle cx="212" cy="54" r="2.5" fill={INK} />
        <circle cx="222" cy="54" r="2.5" fill={INK} />
        <text x="300" y="92" textAnchor="middle" fontSize="13" fontWeight="700" fill={INK}>Browser converts</text>
        <text x="300" y="128" textAnchor="middle" fontSize="11" fill={INK}>2. Convert</text>
        <Arrow x1={404} x2={490} y={78} />
        <FileIcon x={506} y={48} ext="JPG" dark />
        <text x="530" y="128" textAnchor="middle" fontSize="11" fill={INK}>3. Download</text>
      </svg>
    </Figure>
  );
}

const CATEGORY_NAMES: Record<string, string> = {
  image: 'Images',
  document: 'Documents',
  audio: 'Audio',
  video: 'Video',
  font: 'Fonts',
  archive: 'Archives',
};

/** Number of supported conversions in each category, counted from the conversion map. */
function categoryCounts(): { key: string; label: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const e of conversionMap) counts.set(e.category, (counts.get(e.category) ?? 0) + e.targets.length);
  return Object.keys(CATEGORY_NAMES).map((key) => ({ key, label: CATEGORY_NAMES[key], count: counts.get(key) ?? 0 }));
}

export function CategoryBarsFigure() {
  const data = categoryCounts();
  const max = Math.max(...data.map((d) => d.count));
  const total = data.reduce((s, d) => s + d.count, 0);
  const rowH = 30;
  return (
    <Figure
      label={`Number of supported conversions by file type: ${data.map((d) => `${d.label} ${d.count}`).join(', ')}.`}
      caption={`${total} supported conversions, counted from the converter itself. Images and documents also count each choice of output separately.`}
    >
      <svg viewBox={`0 0 600 ${data.length * rowH + 6}`} className="h-auto w-full" aria-hidden="true">
        {data.map((d, i) => {
          const y = i * rowH + 4;
          const w = Math.max(6, (d.count / max) * 400);
          return (
            <g key={d.key}>
              <text x="0" y={y + 17} fontSize="12" fontWeight="600" fill={INK}>{d.label}</text>
              <rect x="100" y={y + 3} width="460" height="18" rx="3" fill="none" stroke={LINE} />
              <rect x="100" y={y + 3} width={w} height="18" rx="3" fill={INK} />
              <text x={100 + w + 8} y={y + 17} fontSize="12" fontWeight="700" fill={INK}>{d.count}</text>
            </g>
          );
        })}
      </svg>
    </Figure>
  );
}

/** Where a file travels with an upload converter and with FileConvertir. */
export function PrivacyPathFigure() {
  return (
    <Figure
      label="With an upload converter your file travels from your device across the internet to a company's server and back. With FileConvertir the file never leaves your device."
      caption="An upload converter has to receive your file before it can convert it. Here there is nothing to receive."
    >
      <svg viewBox="0 0 600 210" className="h-auto w-full" aria-hidden="true">
        <text x="0" y="16" fontSize="11" fontWeight="700" letterSpacing="1" fill={SOFT}>UPLOAD CONVERTER</text>
        <rect x="2" y="28" width="128" height="50" rx="8" fill={PAPER} stroke={INK} strokeWidth="2" />
        <text x="65" y="58" textAnchor="middle" fontSize="13" fontWeight="700" fill={INK}>Your device</text>
        <Arrow x1={134} x2={236} y={46} />
        <text x="185" y="40" textAnchor="middle" fontSize="10" fill={SOFT}>upload</text>
        <rect x="240" y="28" width="130" height="50" rx="8" fill={PAPER} stroke={INK} strokeWidth="2" strokeDasharray="5 4" />
        <text x="305" y="58" textAnchor="middle" fontSize="13" fontWeight="700" fill={INK}>Their server</text>
        <Arrow x1={366} x2={468} y={46} />
        <text x="417" y="40" textAnchor="middle" fontSize="10" fill={SOFT}>download</text>
        <rect x="470" y="28" width="128" height="50" rx="8" fill={PAPER} stroke={INK} strokeWidth="2" />
        <text x="534" y="58" textAnchor="middle" fontSize="13" fontWeight="700" fill={INK}>Your device</text>

        <line x1="0" y1="106" x2="600" y2="106" stroke={LINE} />

        <text x="0" y="134" fontSize="11" fontWeight="700" letterSpacing="1" fill={SOFT}>FILECONVERTIR</text>
        <rect x="2" y="146" width="288" height="50" rx="8" fill={INK} />
        <text x="145" y="176" textAnchor="middle" fontSize="13" fontWeight="700" fill={PAPER}>Your device, converted in the browser</text>
        <text x="320" y="176" fontSize="12" fill={INK}>No server in the path</text>
      </svg>
    </Figure>
  );
}
