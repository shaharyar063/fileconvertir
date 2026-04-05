import { Link } from 'react-router-dom';

function ConvertIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect width="24" height="24" rx="5.5" fill="currentColor" />
      <path d="M5 9h9" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M11 6.5L14.5 9 11 11.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19 15H10" stroke="#a5f3fc" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M13 12.5L9.5 15 13 17.5" stroke="#a5f3fc" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-card/60 backdrop-blur-md sticky top-0 z-50">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
        <Link
          to="/"
          className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 rounded-lg px-1"
          aria-label="FileConvertir — Home"
        >
          <ConvertIcon className="h-7 w-7 text-primary shrink-0 transition-transform duration-200 group-hover:scale-105" />
          <span className="text-base font-extrabold tracking-tight">
            <span className="text-foreground">File</span>
            <span className="text-primary">Convertir</span>
          </span>
        </Link>

        <nav className="flex items-center gap-1" aria-label="Site navigation">
          <a
            href="#categories"
            className="hidden sm:inline-flex items-center text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg hover:bg-secondary"
          >
            All Formats
          </a>
        </nav>
      </div>
    </header>
  );
}
