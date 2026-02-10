export function SiteFooter() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-5 text-xs text-muted-foreground">
        <span>© {new Date().getFullYear()} QuickConvert — All conversions run in your browser.</span>
        <div className="flex gap-4">
          <a href="#" className="transition-colors hover:text-primary">About</a>
          <a href="#" className="transition-colors hover:text-primary">Privacy</a>
          <a href="#" className="transition-colors hover:text-primary">Terms</a>
        </div>
      </div>
    </footer>
  );
}
