import { Link } from 'react-router-dom';

export function SiteHeader() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-lg font-bold text-foreground hover:text-primary">
          QuickConvert
        </Link>
        <Link to="/converters" className="text-sm text-muted-foreground hover:text-foreground">
          All Converters
        </Link>
      </div>
    </header>
  );
}
