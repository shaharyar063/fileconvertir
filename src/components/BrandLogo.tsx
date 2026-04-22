/**
 * Strict two-color brand mark.
 *
 * A bold rounded square in the foreground color, with a single solid
 * "swap" glyph cut to the background color: two thick filled arrows
 * — the top one pointing right, the bottom one pointing left — locked
 * together to read instantly as "convert".
 *
 * No third color, no strokes, no gradients. The mark inverts perfectly
 * when light/dark modes swap because both colors are CSS variables.
 */
export function BrandLogo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      className={className}
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="7" fill="hsl(var(--foreground))" />
      {/* Top arrow — solid, pointing right */}
      <path
        d="M25 10 L17 15 L17 12.5 L5 12.5 L5 7.5 L17 7.5 L17 5 Z"
        fill="hsl(var(--background))"
      />
      {/* Bottom arrow — solid, pointing left */}
      <path
        d="M7 22 L15 17 L15 19.5 L27 19.5 L27 24.5 L15 24.5 L15 27 Z"
        fill="hsl(var(--background))"
      />
    </svg>
  );
}
