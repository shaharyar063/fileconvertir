import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';

export function SiteFooter() {
  return (
    <footer className="border-t border-border mt-auto bg-card/30">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 text-sm font-extrabold text-foreground">
              <Zap className="h-4 w-4 text-primary" />
              QuickConvert
            </Link>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              Free online file converter. All conversions run locally in your browser — your files never leave your device.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Categories</h4>
            <ul className="mt-3 space-y-2 text-xs">
              <li><Link to="/converters" className="text-muted-foreground transition-colors hover:text-primary">Image Converters</Link></li>
              <li><Link to="/converters" className="text-muted-foreground transition-colors hover:text-primary">Document Converters</Link></li>
              <li><Link to="/converters" className="text-muted-foreground transition-colors hover:text-primary">Audio Converters</Link></li>
              <li><Link to="/converters" className="text-muted-foreground transition-colors hover:text-primary">Font Converters</Link></li>
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
          © {new Date().getFullYear()} QuickConvert — All conversions run in your browser. No data is uploaded.
        </div>
      </div>
    </footer>
  );
}
