/**
 * Two-color brand mark.
 * The square fills with foreground; the inner conversion arrows are cut to background.
 * As the theme swaps, the mark flips automatically — no JS needed.
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
      {/* Top arrow: pointing right */}
      <path
        d="M8 12.5h11M15 9l4 3.5L15 16"
        stroke="hsl(var(--background))"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Bottom arrow: pointing left — visually conveys "convert / swap" */}
      <path
        d="M24 19.5H13M17 16l-4 3.5L17 23"
        stroke="hsl(var(--background))"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
