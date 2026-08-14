import { PRODUCTS, type Product } from "@/data/products";

interface CircleLayoutProps {
  onOpen: (product: Product) => void;
}

const formatPrice = (n: number) => `$${n.toFixed(2)}`;

/* ORBIT_RADIUS — distance from centre to each product (% of the ring). */
const ORBIT_RADIUS = 40;

/**
 * Radial "Circle" view — products are arranged evenly around a static ring
 * (no auto-rotation; each product stays upright and still). The stage is
 * capped to the viewport width so it never causes horizontal scroll.
 */
export function CircleLayout({ onOpen }: CircleLayoutProps) {
  const n = PRODUCTS.length;

  return (
    <div className="flex items-center justify-center py-4">
      <div className="relative aspect-square w-full max-w-[min(86vw,72vh,620px)]">
        {/* Ring outline */}
        <div className="pointer-events-none absolute inset-0 rounded-full border border-border" />

        {/* Center label */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <p className="tracking-wordmark text-[10px] font-semibold uppercase text-muted-foreground sm:text-xs">
            Saffa&nbsp;Fashion
          </p>
        </div>

        {/* Products (static) */}
        <div className="absolute inset-0">
          {PRODUCTS.map((product, i) => {
            // Start at the top (−90°) and step evenly around the circle.
            const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
            const x = 50 + ORBIT_RADIUS * Math.cos(angle);
            const y = 50 + ORBIT_RADIUS * Math.sin(angle);
            const hasHover = product.images.length > 1;

            return (
              <button
                key={product.id}
                onClick={() => onOpen(product)}
                className="group absolute z-10 w-[17%] -translate-x-1/2 -translate-y-1/2 hover:z-20"
                style={{ left: `${x}%`, top: `${y}%` }}
                aria-label={`${product.name}, ${formatPrice(product.price)} — open details`}
              >
                <div className="transition-transform duration-300 group-hover:scale-110">
                  {/* Framed thumbnail — reads cleanly with any image */}
                  <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      loading="lazy"
                      className={`h-full w-full object-cover transition-opacity duration-500 ${
                        hasHover ? "group-hover:opacity-0" : ""
                      }`}
                    />
                    {hasHover && (
                      <img
                        src={product.images[1]}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      />
                    )}
                  </div>

                  {/* Name / price on hover */}
                  <div className="pointer-events-none absolute inset-x-0 top-full mt-1.5 flex flex-col items-center text-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <span className="whitespace-nowrap rounded-full bg-background/90 px-2 py-0.5 text-[10px] font-medium leading-tight">
                      {product.name} · {formatPrice(product.price)}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
