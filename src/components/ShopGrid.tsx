"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { categories, collections, type Product } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

type Sort = "featured" | "price-asc" | "price-desc" | "rating";

export function ShopGrid({
  products,
  initialCategory,
  initialCollection,
  initialQuery,
}: {
  products: Product[];
  initialCategory?: string;
  initialCollection?: string;
  initialQuery?: string;
}) {
  const [category, setCategory] = useState<string>(initialCategory ?? "All");
  const [collection, setCollection] = useState<string>(initialCollection ?? "");
  const [sort, setSort] = useState<Sort>("featured");
  const query = (initialQuery ?? "").toLowerCase();

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      const catOk = category === "All" || p.category === category;
      const colOk =
        !collection ||
        collections.find((c) => c.slug === collection)?.name === p.collection;
      const qOk =
        !query ||
        p.name.toLowerCase().includes(query) ||
        p.collection.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query);
      return catOk && colOk && qOk;
    });
    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      default:
        list = [...list].sort(
          (a, b) => Number(b.featured) - Number(a.featured)
        );
    }
    return list;
  }, [products, category, collection, sort, query]);

  return (
    <div>
      {/* Filter bar */}
      <div className="sticky top-[64px] z-20 -mx-5 border-b border-white/10 bg-ink/85 px-5 py-4 backdrop-blur-xl sm:mx-0 sm:rounded-none sm:px-0">
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
          <div className="flex gap-2">
            {["All", ...categories].map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`shrink-0 rounded-full border px-4 py-2 text-[11px] font-medium uppercase tracking-wide2 transition-all ${
                  category === c
                    ? "border-gold bg-gold-gradient text-ink"
                    : "border-white/15 text-stone-light hover:border-gold hover:text-gold"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="ml-auto hidden shrink-0 sm:block">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="cursor-pointer border-b border-white/20 bg-ink py-2 pr-6 text-[11px] uppercase tracking-wide2 text-stone-light outline-none focus:border-gold"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      <p className="mt-6 text-[12px] uppercase tracking-wide2 text-stone">
        {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
      </p>

      <motion.div
        key={`${category}-${collection}-${sort}`}
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
        className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4"
      >
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <p className="py-20 text-center text-stone-light">
          No pieces match your filters yet.
        </p>
      )}
    </div>
  );
}
