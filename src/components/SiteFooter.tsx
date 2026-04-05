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

export function SiteFooter() {
  return (
    <footer className="border-t border-border mt-auto bg-card/30">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 rounded-lg">
              <ConvertIcon className="h-5 w-5 text-primary shrink-0" />
              <span className="text-sm font-extrabold tracking-tight">
                <span className="text-foreground">File</span>
                <span className="text-primary">Convertir</span>
              </span>
            </Link>
            <p className="mt-2.5 text-xs text-muted-foreground leading-relaxed">
              Free online file converter. All conversions run locally in your browser — your files never leave your device.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Categories</h4>
            <ul className="mt-3 space-y-2 text-xs">
              <li><Link to="/png-to-jpg" className="text-muted-foreground transition-colors hover:text-primary">Image Converters</Link></li>
              <li><Link to="/txt-to-pdf" className="text-muted-foreground transition-colors hover:text-primary">Document Converters</Link></li>
              <li><Link to="/wav-to-mp3" className="text-muted-foreground transition-colors hover:text-primary">Audio Converters</Link></li>
              <li><Link to="/ttf-to-woff" className="text-muted-foreground transition-colors hover:text-primary">Font Converters</Link></li>
            </ul>
          </div>

          {/* Popular */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Popular</h4>
            <ul className="mt-3 space-y-2 text-xs">
              <li><Link to="/png-to-jpg" className="text-muted-foreground transition-colors hover:text-primary">PNG to JPG</Link></li>
              <li><Link to="/jpg-to-png" className="text-muted-foreground transition-colors hover:text-primary">JPG to PNG</Link></li>
              <li><Link to="/png-to-webp" className="text-muted-foreground transition-colors hover:text-primary">PNG to WebP</Link></li>
              <li><Link to="/wav-to-mp3" className="text-muted-foreground transition-colors hover:text-primary">WAV to MP3</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Company</h4>
            <ul className="mt-3 space-y-2 text-xs">
              <li><a href="#" className="text-muted-foreground transition-colors hover:text-primary">About</a></li>
              <li><a href="#" className="text-muted-foreground transition-colors hover:text-primary">Contact</a></li>
              <li><a href="#" className="text-muted-foreground transition-colors hover:text-primary">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground transition-colors hover:text-primary">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} FileConvertir — All conversions run in your browser. No data is uploaded.
        </div>
      </div>
    </footer>
  );
}
