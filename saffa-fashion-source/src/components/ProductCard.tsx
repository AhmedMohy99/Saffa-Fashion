import { type Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  onOpen: (product: Product) => void;
}

const formatPrice = (n: number) => `$${n.toFixed(2)}`;

export function ProductCard({ product, onOpen }: ProductCardProps) {
  const hasHover = product.images.length > 1;

  return (
    <button
      onClick={() => onOpen(product)}
      className="group relative block w-full overflow-hidden rounded-xl border border-border bg-card text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.10)]"
      aria-label={`${product.name}, ${formatPrice(product.price)} — open details`}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
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
            className="absolute inset-0 h-full w-full scale-[1.02] object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}

        {/* "Open" pill affordance on hover */}
        <span className="pointer-events-none absolute bottom-3 right-3 translate-y-2 rounded-full bg-primary px-4 py-1.5 text-[10px] uppercase tracking-wide text-primary-foreground opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
          Open
        </span>
      </div>

      {/* Meta */}
      <div className="flex items-center justify-between px-4 py-3.5 text-[13px]">
        <span className="font-medium">{product.name}</span>
        <span className="text-muted-foreground">
          {formatPrice(product.price)}
        </span>
      </div>
    </button>
  );
}
