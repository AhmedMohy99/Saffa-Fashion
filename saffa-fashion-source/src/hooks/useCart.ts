import { useCallback, useMemo, useState } from "react";
import { PRODUCTS, type Product } from "@/data/products";

export interface CartLine {
  key: string;      // `${productId}::${size}`
  product: Product;
  size: string;
  qty: number;
}

const makeKey = (productId: string, size: string) => `${productId}::${size}`;

export function useCart() {
  // key -> qty
  const [items, setItems] = useState<Record<string, number>>({});

  const add = useCallback((productId: string, size: string, qty = 1) => {
    const key = makeKey(productId, size);
    setItems((prev) => ({ ...prev, [key]: (prev[key] ?? 0) + qty }));
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setItems((prev) => {
      const next = { ...prev };
      if (qty <= 0) delete next[key];
      else next[key] = qty;
      return next;
    });
  }, []);

  const remove = useCallback((key: string) => {
    setItems((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const clear = useCallback(() => setItems({}), []);

  const lines = useMemo<CartLine[]>(() => {
    return Object.entries(items)
      .map(([key, qty]) => {
        const [productId, size] = key.split("::");
        const product = PRODUCTS.find((p) => p.id === productId);
        if (!product) return null;
        return { key, product, size, qty } as CartLine;
      })
      .filter((l): l is CartLine => l !== null);
  }, [items]);

  const count = useMemo(
    () => lines.reduce((sum, l) => sum + l.qty, 0),
    [lines]
  );

  const subtotal = useMemo(
    () => lines.reduce((sum, l) => sum + l.product.price * l.qty, 0),
    [lines]
  );

  return { lines, count, subtotal, add, setQty, remove, clear };
}

export type CartApi = ReturnType<typeof useCart>;
