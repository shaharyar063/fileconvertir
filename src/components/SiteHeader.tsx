import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-lg font-extrabold text-foreground hover:text-primary transition-colors">
          <Zap className="h-5 w-5 text-primary" />
          QuickConvert
        </Link>
      </div>
    </header>
  );
}
