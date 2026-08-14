export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-baseline gap-2">
          <span className="tracking-wordmark text-sm font-semibold uppercase">
            Saffa&nbsp;Fashion
          </span>
          <span className="text-xs text-muted-foreground">
            © {year}
          </span>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-[11px] uppercase tracking-wide text-muted-foreground">
          <a href="#" className="transition-colors hover:text-foreground">
            FAQ
          </a>
          <a href="#" className="transition-colors hover:text-foreground">
            Shipping
          </a>
          <a href="#" className="transition-colors hover:text-foreground">
            Terms
          </a>
          <a href="#" className="transition-colors hover:text-foreground">
            Privacy
          </a>
        </nav>
      </div>
    </footer>
  );
}
