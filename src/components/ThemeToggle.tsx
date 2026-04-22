import { useTheme } from '@/hooks/use-theme';

/**
 * Color-swap button. The circle is split in half — left half is the
 * current foreground color, right half is the current background color.
 * Clicking flips the two brand colors globally, and the button itself
 * visually swaps too (because both halves are CSS variables).
 */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Swap colors"
      title="Swap colors"
      aria-pressed={theme === 'dark'}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-foreground transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/60"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <defs>
          <clipPath id="tt-circle">
            <circle cx="12" cy="12" r="11" />
          </clipPath>
        </defs>
        <g clipPath="url(#tt-circle)">
          {/* Left half = foreground */}
          <rect x="0" y="0" width="12" height="24" fill="hsl(var(--foreground))" />
          {/* Right half = background */}
          <rect x="12" y="0" width="12" height="24" fill="hsl(var(--background))" />
        </g>
        <circle
          cx="12"
          cy="12"
          r="11"
          fill="none"
          stroke="hsl(var(--foreground))"
          strokeWidth="1.5"
        />
      </svg>
    </button>
  );
}
