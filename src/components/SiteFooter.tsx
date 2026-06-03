import { Link } from 'react-router-dom';
import { BrandLogo } from './BrandLogo';
import { POPULAR_LINKS, FOOTER_FORMAT_LINKS } from '@/lib/site-navigation';

const FOOTER_POPULAR = POPULAR_LINKS.slice(0, 12);

export function SiteFooter() {
  return (
    <footer className="bg-background text-foreground border-t border-border mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-4">

          {/* Brand */}
          <div className="md:col-span-1">
            <Link
              to="/"
              className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/60 rounded-lg"
            >
              <BrandLogo className="h-5 w-5 shrink-0" />
              <span className="text-sm font-extrabold tracking-tight text-foreground">
                FileConvertir
              </span>
            </Link>
            <p className="mt-2.5 text-xs text-muted-foreground leading-relaxed">
              Free online file converter. All conversions run locally in your
              browser — your files never leave your device.
            </p>
            <p className="mt-3">
              <Link
                to="/#browse-formats"
                className="text-xs font-medium text-primary hover:underline"
              >
                Browse all formats →
              </Link>
            </p>
          </div>

          {/* Popular converters */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Popular converters
            </h4>
            <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1.5 text-xs">
              {FOOTER_POPULAR.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Format hubs */}
          <div className="md:col-span-1">
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Format hubs
            </h4>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
              {FOOTER_FORMAT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="mt-8 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} FileConvertir — All conversions run in your browser. No data
          is uploaded.
        </div>
      </div>
    </footer>
  );
}
