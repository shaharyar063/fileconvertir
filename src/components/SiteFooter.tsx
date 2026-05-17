import { Link } from 'react-router-dom';
import { BrandLogo } from './BrandLogo';
import {
  getSourceHubSections,
  getTargetHubSections,
  POPULAR_LINKS,
} from '@/lib/site-navigation';

const sourceSections = getSourceHubSections();
const targetSections = getTargetHubSections();

export function SiteFooter() {
  return (
    <footer className="bg-background text-foreground border-t border-border mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6">
          <div className="col-span-2 md:col-span-2 lg:col-span-2">
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
              Free online file converter. All conversions run locally in your browser — your files
              never leave your device.
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

          {sourceSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                {section.title}
              </h4>
              <ul className="mt-3 max-h-48 space-y-1 overflow-y-auto text-xs">
                {section.links.map((link) => (
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
          ))}
        </div>

        <div className="mt-10 grid gap-8 border-t border-border pt-8 md:grid-cols-2">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Popular converters
            </h4>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
              {POPULAR_LINKS.map((link) => (
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
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Convert to format
            </h4>
            <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs">
              {targetSections.flatMap((s) => s.links).map((link) => (
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
