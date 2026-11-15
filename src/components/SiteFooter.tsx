import { Link } from 'react-router-dom';
import { BrandLogo } from './BrandLogo';

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-background text-foreground">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-6">
        <Link
          to="/"
          className="flex items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/60"
          aria-label="FileConvertir — Home"
        >
          <BrandLogo className="h-6 w-6 shrink-0" />
          <span className="text-sm font-extrabold tracking-tight">FileConvertir</span>
        </Link>
        <Link to="/privacy/" className="text-xs font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
}
