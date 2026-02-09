export function SiteFooter() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 text-xs text-muted-foreground">
        <span>© {new Date().getFullYear()} QuickConvert</span>
        <div className="flex gap-4">
          <a href="#" className="hover:text-foreground">About</a>
          <a href="#" className="hover:text-foreground">Privacy</a>
          <a href="#" className="hover:text-foreground">Terms</a>
        </div>
      </div>
    </footer>
  );
}
