"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Gallery } from "./Gallery";
import { Stars } from "@/components/ProductCard";
import { formatPKR, type Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { site } from "@/lib/site";

const tabs = ["Story", "Features", "Specifications", "Care"] as const;
type Tab = (typeof tabs)[number];

export function ProductDetail({ product }: { product: Product }) {
  const { add } = useCart();
  const [color, setColor] = useState(product.colors[0]);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<Tab>("Story");
  const [wish, setWish] = useState(false);
  const discount = product.compareAt
    ? Math.round(((product.compareAt - product.price) / product.compareAt) * 100)
    : 0;

  return (
    <div>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="lg:sticky lg:top-24 lg:h-fit">
          <Gallery images={product.images} name={product.name} />
        </div>

        <div>
          <p className="eyebrow">{product.collection}</p>
          <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
            {product.name}
          </h1>
          <p className="mt-2 text-[15px] italic text-stone-light">{product.tagline}</p>

          <div className="mt-4 flex items-center gap-3">
            <Stars rating={product.rating} size={15} />
            <span className="text-[13px] text-stone-light">
              {product.rating} · {product.reviewCount} reviews
            </span>
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-serif text-3xl text-gold">{formatPKR(product.price)}</span>
            {product.compareAt && (
              <>
                <span className="text-lg text-stone line-through">{formatPKR(product.compareAt)}</span>
                <span className="rounded-full bg-gold/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide2 text-gold">
                  Save {discount}%
                </span>
              </>
            )}
          </div>
          <p className="mt-1 text-[12px] text-stone">Inclusive of all taxes · COD available</p>

          <div className="hairline my-7 opacity-40" />

          {/* Colours */}
          <div>
            <p className="text-[11px] uppercase tracking-luxe text-stone">
              Finish — <span className="text-pearl">{color}</span>
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`rounded-full border px-4 py-2 text-[12px] transition-all ${
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

          {/* Quantity + add */}
          <div className="mt-7 flex items-stretch gap-3">
            <div className="flex items-center border border-white/15">
              <button
                aria-label="Decrease quantity"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-4 py-3 text-stone-light hover:text-gold"
              >
                −
              </button>
              <span className="w-8 text-center">{qty}</span>
              <button
                aria-label="Increase quantity"
                onClick={() => setQty((q) => q + 1)}
                className="px-4 py-3 text-stone-light hover:text-gold"
              >
                +
              </button>
            </div>
            <button
              onClick={() => add(product, color, qty)}
              className="btn-gold flex-1"
            >
              Add to Bag — {formatPKR(product.price * qty)}
            </button>
            <button
              aria-label="Add to wishlist"
              onClick={() => setWish((w) => !w)}
              className={`flex w-14 items-center justify-center border transition-all ${
                wish ? "border-gold text-gold" : "border-white/15 text-stone-light hover:border-gold"
              }`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill={wish ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
                <path d="M12 21s-7-4.35-9.5-8.5C1 9 2.5 5.5 6 5.5c2 0 3.2 1.2 4 2.4.8-1.2 2-2.4 4-2.4 3.5 0 5 3.5 3.5 7C19 16.65 12 21 12 21Z" />
              </svg>
            </button>
          </div>

          {/* Trust mini */}
          <div className="mt-7 grid grid-cols-3 gap-3 border-y border-white/10 py-5 text-center">
            {[
              { t: "Free over Rs 5k", s: site.shipping.deliveryDays },
              { t: "7-Day Returns", s: "Easy & free" },
              { t: "Anti-Tarnish", s: "Skin-safe" },
            ].map((x) => (
              <div key={x.t}>
                <p className="text-[12px] font-medium text-pearl">{x.t}</p>
                <p className="mt-0.5 text-[10px] uppercase tracking-wide2 text-stone">{x.s}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="mt-8">
            <div className="flex gap-6 border-b border-white/10">
              {tabs.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`relative pb-3 text-[12px] font-medium uppercase tracking-wide2 transition-colors ${
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
                className="py-6 text-[14px] leading-relaxed text-stone-light"
              >
                {tab === "Story" && <p>{product.story}</p>}
                {tab === "Features" && (
                  <ul className="space-y-2">
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
                      <div key={s.label} className="flex justify-between py-2.5">
                        <dt className="text-stone">{s.label}</dt>
                        <dd className="text-pearl">{s.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                {tab === "Care" && (
                  <ul className="space-y-2">
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
    </div>
  );
}
