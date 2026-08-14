import { PRODUCTS, type Product } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { CircleLayout } from "./CircleLayout";
import type { ViewMode } from "./Header";

interface ProductGridProps {
  view: ViewMode;
  onOpen: (product: Product) => void;
}

export function ProductGrid({ view, onOpen }: ProductGridProps) {
  if (view === "circle") {
    return <CircleLayout onOpen={onOpen} />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {PRODUCTS.map((product) => (
        <ProductCard key={product.id} product={product} onOpen={onOpen} />
      ))}
    </div>
  );
}
