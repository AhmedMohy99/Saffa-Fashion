import { useEffect, useState } from "react";
import { Header, type ViewMode } from "@/components/Header";
import { ProductGrid } from "@/components/ProductGrid";
import { FocusView } from "@/components/FocusView";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";
import { useCart } from "@/hooks/useCart";
import { PRODUCTS, type Product } from "@/data/products";

export default function App() {
  const cart = useCart();
  const [view, setView] = useState<ViewMode>("grid");
  const [focusStart, setFocusStart] = useState<number | null>(null);
  const [cartOpen, setCartOpen] = useState(false);

  const openProduct = (product: Product) => {
    const idx = PRODUCTS.findIndex((p) => p.id === product.id);
    setFocusStart(idx < 0 ? 0 : idx);
  };

  const handleAdd = (product: Product, size: string) => {
    cart.add(product.id, size);
    setCartOpen(true);
  };

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // Lock body scroll while the focus view (or cart) is open.
  useEffect(() => {
    const locked = focusStart !== null;
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [focusStart]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header
        view={view}
        onViewChange={setView}
        cartCount={cart.count}
        onOpenCart={() => setCartOpen(true)}
        onHome={scrollTop}
      />

      <main className="mx-auto max-w-[1440px] px-4 pb-16 pt-8 sm:px-6 sm:pt-12">
        {/* Intro */}
        <section className="mb-10 max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            The Saffa Fashion Store
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            A small, considered collection of everyday essentials. Made well,
            priced fairly, built to last.
          </p>
        </section>

        <ProductGrid view={view} onOpen={openProduct} />
      </main>

      <Footer />

      {focusStart !== null && (
        <FocusView
          startIndex={focusStart}
          onClose={() => setFocusStart(null)}
          onAdd={handleAdd}
        />
      )}

      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} cart={cart} />
    </div>
  );
}
