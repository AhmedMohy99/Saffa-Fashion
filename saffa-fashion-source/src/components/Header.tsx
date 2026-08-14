import { Globe, LayoutGrid, Circle, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

export type ViewMode = "grid" | "circle";

interface HeaderProps {
  view: ViewMode;
  onViewChange: (v: ViewMode) => void;
  cartCount: number;
  onOpenCart: () => void;
  onHome: () => void;
}

export function Header({
  view,
  onViewChange,
  cartCount,
  onOpenCart,
  onHome,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 sm:bg-background/70 sm:backdrop-blur-md">
      <div className="mx-auto flex h-[52px] max-w-[1440px] items-center justify-between px-4 sm:px-6">
        {/* Brand lockup */}
        <button
          onClick={onHome}
          className="flex items-baseline gap-2 text-left"
          aria-label="Saffa Fashion — home"
        >
          <span className="tracking-wordmark text-[13px] font-semibold uppercase sm:text-sm">
            Saffa&nbsp;Fashion
          </span>
          <span className="hidden text-xs font-normal text-muted-foreground sm:inline">
            Store
          </span>
        </button>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-[11px] uppercase tracking-wide text-muted-foreground sm:flex">
            <Globe className="h-3.5 w-3.5" />
            ROW
          </div>

          {/* Grid / Circle segmented toggle */}
          <div className="flex overflow-hidden rounded-full border border-border">
            <ToggleBtn
              active={view === "grid"}
              onClick={() => onViewChange("grid")}
              label="Grid view"
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Grid</span>
            </ToggleBtn>
            <ToggleBtn
              active={view === "circle"}
              onClick={() => onViewChange("circle")}
              label="Circle view"
            >
              <Circle className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Circle</span>
            </ToggleBtn>
          </div>

          {/* Cart */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 rounded-full border border-border px-3.5 py-1.5 text-[11px] uppercase tracking-wide transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Cart</span>
            <span className="inline-flex min-w-[18px] items-center justify-center rounded-full bg-foreground px-1.5 text-[10px] leading-[18px] text-background">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

function ToggleBtn({
  active,
  onClick,
  label,
  children,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={cn(
        "flex items-center gap-1.5 px-3 py-1.5 text-[11px] uppercase tracking-wide transition-colors",
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}
