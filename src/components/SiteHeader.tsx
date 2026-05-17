import { Link } from 'react-router-dom';
import { BrandLogo } from './BrandLogo';
import { ThemeToggle } from './ThemeToggle';

export function SiteHeader() {
  return (
    <header className="section-invert bg-background text-foreground border-b border-border sticky top-0 z-50">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link
          to="/"
          className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/60 rounded-lg px-1"
          aria-label="FileConvertir — Home"
        >
          <BrandLogo className="h-7 w-7 shrink-0 transition-transform duration-200 group-hover:scale-105" />
          <span className="text-base font-extrabold tracking-tight text-foreground">
            FileConvertir
          </span>
        </Link>

        <nav className="flex items-center gap-2" aria-label="Site navigation">
          <Link
            to="/#categories"
            className="hidden sm:inline-flex items-center text-xs font-bold uppercase tracking-wider text-foreground hover:opacity-70 transition-opacity px-3 py-1.5 rounded-lg"
          >
            All Formats
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
