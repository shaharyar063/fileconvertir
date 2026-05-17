import { Link } from 'react-router-dom';
import type { NavLink, NavSection } from '@/lib/site-navigation';

interface InternalLinkGridProps {
  sections: NavSection[];
  /** Max links shown per section before "Show all" expands (0 = show all). */
  maxPerSection?: number;
  columns?: string;
  className?: string;
}

export function InternalLinkGrid({
  sections,
  maxPerSection = 0,
  columns = 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6',
  className = '',
}: InternalLinkGridProps) {
  return (
    <div className={`grid gap-8 md:grid-cols-2 ${className}`}>
      {sections.map((section) => (
        <div key={section.title}>
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            {section.title}
          </h3>
          <ul className={`mt-3 grid gap-1 ${columns}`}>
            {(maxPerSection > 0
              ? section.links.slice(0, maxPerSection)
              : section.links
            ).map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className="block truncate rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {maxPerSection > 0 && section.links.length > maxPerSection && (
              <li className="col-span-full pt-1">
                <span className="text-[10px] text-muted-foreground">
                  +{section.links.length - maxPerSection} more in footer
                </span>
              </li>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
}
