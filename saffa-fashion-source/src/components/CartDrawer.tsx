import { Minus, Plus, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import type { CartApi } from "@/hooks/useCart";

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cart: CartApi;
}

const formatPrice = (n: number) => `$${n.toFixed(2)}`;

export function CartDrawer({ open, onOpenChange, cart }: CartDrawerProps) {
  const { lines, subtotal, setQty, remove } = cart;
  const empty = lines.length === 0;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 p-0 sm:max-w-md"
      >
        <SheetHeader className="border-b border-border px-6 py-5 text-left">
          <SheetTitle className="text-sm font-semibold uppercase tracking-wide">
            Cart
          </SheetTitle>
        </SheetHeader>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6">
          {empty ? (
            <div className="flex h-full flex-col items-center justify-center gap-1 py-20 text-center">
              <p className="text-sm font-medium">Nothing to see here (yet)</p>
              <p className="text-xs text-muted-foreground">
                Add something you like and it will show up here.
              </p>
            </div>
          ) : (
            <ul>
              {lines.map((line) => (
                <li
                  key={line.key}
                  className="flex gap-4 border-b border-border py-5"
                >
                  <img
                    src={line.product.images[0]}
                    alt={line.product.name}
                    className="h-20 w-20 flex-shrink-0 rounded-lg object-cover"
                  />
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium leading-tight">
                          {line.product.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {line.size} · {formatPrice(line.product.price)}
                        </p>
                      </div>
                      <button
                        onClick={() => remove(line.key)}
                        aria-label={`Remove ${line.product.name}`}
                        className="text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center rounded-full border border-border">
                        <button
                          onClick={() => setQty(line.key, line.qty - 1)}
                          aria-label="Decrease quantity"
                          className="grid h-7 w-7 place-items-center text-muted-foreground transition-colors hover:text-foreground"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-7 text-center text-sm tabular-nums">
                          {line.qty}
                        </span>
                        <button
                          onClick={() => setQty(line.key, line.qty + 1)}
                          aria-label="Increase quantity"
                          className="grid h-7 w-7 place-items-center text-muted-foreground transition-colors hover:text-foreground"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="text-sm font-medium tabular-nums">
                        {formatPrice(line.product.price * line.qty)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border px-6 py-5">
          <div className="mb-4 flex items-center justify-between text-sm">
            <span className="uppercase tracking-wide text-muted-foreground">
              Subtotal
            </span>
            <span className="font-medium tabular-nums">
              {formatPrice(subtotal)}
            </span>
          </div>
          <Button
            className="h-12 w-full rounded-full text-xs uppercase tracking-wide"
            disabled={empty}
            onClick={() => {
              // Checkout is a visual stub in this artifact.
              window.alert("Checkout is a demo stub in this preview.");
            }}
          >
            Checkout
          </Button>
          <p className="mt-3 text-center text-[11px] text-muted-foreground">
            Taxes and shipping calculated at checkout.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
