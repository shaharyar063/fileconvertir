import { Link } from 'react-router-dom';
import { BrandLogo } from './BrandLogo';
import { ThemeToggle } from './ThemeToggle';

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-background sticky top-0 z-50">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
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

        <div className="flex items-center gap-2" aria-label="Site navigation">
          <a
            href="#categories"
            className="hidden sm:inline-flex items-center text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg hover:bg-secondary"
          >
            All Formats
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
