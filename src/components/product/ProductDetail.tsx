"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Gallery } from "./Gallery";
import { Stars } from "@/components/ProductCard";
import { formatPKR, type Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useRecentlyViewed } from "@/context/RecentlyViewedContext";

const tabs = ["Story", "Features", "Specifications", "Care"] as const;
type Tab = (typeof tabs)[number];

export function ProductDetail({ product }: { product: Product }) {
  const { add } = useCart();
  const router = useRouter();
  const { has, toggle } = useWishlist();
  const { track } = useRecentlyViewed();
  const [color, setColor] = useState(product.colors[0]);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<Tab>("Story");
  const wished = has(product.id);

  useEffect(() => {
    track(product.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.id]);

  const discount = product.compareAt
    ? Math.round(((product.compareAt - product.price) / product.compareAt) * 100)
    : 0;

  // Live inventory — real stock when tracked in admin, subtle fallback otherwise
  const stock =
    typeof product.stock === "number"
      ? product.stock
      : 4 + ((parseInt(product.id.replace(/\D/g, ""), 16) || 3) % 8);
  const outOfStock = !product.inStock || stock === 0;
  const lowStock = !outOfStock && stock <= 7;

  const buyNow = () => {
    add(product, color, qty);
    router.push("/checkout");
  };

  return (
    <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
      <div className="lg:sticky lg:top-28 lg:h-fit">
        <Gallery images={product.images} name={product.name} video={product.video} />
      </div>

      <div>
        <p className="eyebrow">{product.collection}</p>
        <h1 className="mt-4 font-serif text-h2 font-light leading-[1.06]">
          {product.name}
        </h1>
        <p className="mt-3 font-serif text-[19px] italic text-stone-light">
          {product.tagline}
        </p>

        <div className="mt-5 flex items-center gap-3">
          <Stars rating={product.rating} size={15} />
          <span className="text-[13px] font-light text-stone-light">
            {product.rating} · {product.reviewCount} reviews
          </span>
        </div>

        <div className="mt-7 flex items-baseline gap-3">
          <span className="font-serif text-4xl font-light text-pearl">
            {formatPKR(product.price)}
          </span>
          {product.compareAt && (
            <>
              <span className="text-lg font-light text-stone line-through">
                {formatPKR(product.compareAt)}
              </span>
              <span className="bg-gold/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide2 text-gold">
                Save {discount}%
              </span>
            </>
          )}
        </div>
        <p className="mt-2 text-[12px] font-light text-stone">
          Inclusive of all taxes · COD available
        </p>

        {/* Live inventory */}
        {lowStock && (
          <div className="mt-5 flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            </span>
            <span className="text-[12px] font-light text-gold-light">
              Selling fast — only {stock} left in stock
            </span>
          </div>
        )}

        <div className="my-8 h-px w-full bg-white/10" />

        {/* Finish */}
        <div>
          <p className="text-[10px] uppercase tracking-luxe text-stone">
            Finish — <span className="text-pearl">{color}</span>
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.colors.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`border px-5 py-2.5 text-[12px] font-light transition-all ${
                  color === c
                    ? "border-gold text-gold"
                    : "border-white/15 text-stone-light hover:border-gold/60"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity + actions */}
        <div className="mt-8 flex items-stretch gap-3">
          <div className="flex items-center border border-white/15">
            <button
              aria-label="Decrease quantity"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="px-4 py-4 text-stone-light transition-colors hover:text-gold"
            >
              −
            </button>
            <span className="w-8 text-center text-sm">{qty}</span>
            <button
              aria-label="Increase quantity"
              onClick={() => setQty((q) => q + 1)}
              className="px-4 py-4 text-stone-light transition-colors hover:text-gold"
            >
              +
            </button>
          </div>
          <button
            onClick={() => add(product, color, qty)}
            disabled={outOfStock}
            className="btn-outline flex-1 text-pearl disabled:pointer-events-none disabled:opacity-40"
          >
            {outOfStock ? "Out of Stock" : "Add to Bag"}
          </button>
          <button
            aria-label="Add to wishlist"
            onClick={() => toggle(product.id)}
            className={`flex w-14 items-center justify-center border transition-all ${
              wished ? "border-gold text-gold" : "border-white/15 text-stone-light hover:border-gold"
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill={wished ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.4">
              <path d="M12 21s-7-4.35-9.5-8.5C1 9 2.5 5.5 6 5.5c2 0 3.2 1.2 4 2.4.8-1.2 2-2.4 4-2.4 3.5 0 5 3.5 3.5 7C19 16.65 12 21 12 21Z" />
            </svg>
          </button>
        </div>

        {/* Buy Now */}
        <button
          onClick={buyNow}
          disabled={outOfStock}
          className="btn-gold mt-3 w-full disabled:pointer-events-none disabled:opacity-40"
        >
          {outOfStock ? "Currently Unavailable" : `Buy Now — ${formatPKR(product.price * qty)}`}
        </button>

        {/* Trust mini */}
        <div className="mt-8 grid grid-cols-3 gap-3 border-y border-white/10 py-6 text-center">
          {[
            { t: "Free over Rs 5k", s: "2–4 day delivery" },
            { t: "7-Day Returns", s: "Easy & free" },
            { t: "Anti-Tarnish", s: "Skin-safe" },
          ].map((x) => (
            <div key={x.t}>
              <p className="text-[12px] font-medium text-pearl">{x.t}</p>
              <p className="mt-1 text-[9px] uppercase tracking-luxe text-stone">{x.s}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mt-8">
          <div className="flex gap-7 border-b border-white/10">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`relative pb-3 text-[11px] font-medium uppercase tracking-wide2 transition-colors ${
                  tab === t ? "text-gold" : "text-stone hover:text-pearl"
                }`}
              >
                {t}
                {tab === t && (
                  <motion.span layoutId="tab" className="absolute -bottom-px left-0 h-px w-full bg-gold" />
                )}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="py-7 text-[15px] font-light leading-relaxed text-stone-light"
            >
              {tab === "Story" && <p>{product.story}</p>}
              {tab === "Features" && (
                <ul className="space-y-3">
                  {product.features.map((f) => (
                    <li key={f} className="flex gap-3">
                      <span className="text-gold">✦</span>
                      {f}
                    </li>
                  ))}
                </ul>
              )}
              {tab === "Specifications" && (
                <dl className="divide-y divide-white/5">
                  {product.specs.map((s) => (
                    <div key={s.label} className="flex justify-between py-3">
                      <dt className="text-stone">{s.label}</dt>
                      <dd className="text-pearl">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {tab === "Care" && (
                <ul className="space-y-3">
                  {product.care.map((c) => (
                    <li key={c} className="flex gap-3">
                      <span className="text-gold">–</span>
                      {c}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
