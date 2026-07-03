"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/data/products";

let cache: Product[] | null = null;

/** Client-side live catalogue (cached per page load). */
export function useProducts(enabled = true) {
  const [products, setProducts] = useState<Product[]>(cache ?? []);
  const [loading, setLoading] = useState(enabled && !cache);

  useEffect(() => {
    if (!enabled || cache) return;
    let alive = true;
    fetch("/api/products")
      .then((r) => (r.ok ? r.json() : []))
      .then((data: Product[]) => {
        cache = data;
        if (alive) {
          setProducts(data);
          setLoading(false);
        }
      })
      .catch(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [enabled]);

  return { products, loading };
}
