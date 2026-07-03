"use client";

import { useRecentlyViewed } from "@/context/RecentlyViewedContext";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export function RecentlyViewed({ excludeId }: { excludeId?: string }) {
  const { ids } = useRecentlyViewed();
  const items = ids
    .filter((id) => id !== excludeId)
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is (typeof products)[number] => Boolean(p))
    .slice(0, 4);

  if (items.length === 0) return null;

  return (
    <section className="border-t border-white/10 py-section">
      <div className="flex items-end justify-between">
        <div>
          <p className="eyebrow">Your Journey</p>
          <h2 className="mt-4 font-serif text-h3 font-light">Recently Viewed</h2>
        </div>
      </div>
      <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-14 sm:gap-x-8 lg:grid-cols-4">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
