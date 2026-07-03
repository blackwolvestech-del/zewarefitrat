"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { smartSearch, trendingSearches } from "@/lib/search";
import { formatPKR } from "@/data/products";

const ease = [0.22, 1, 0.36, 1] as const;

export function SearchOverlay() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    const openHandler = () => setOpen(true);
    window.addEventListener("zf:open-search", openHandler);
    const keyHandler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", keyHandler);
    return () => {
      window.removeEventListener("zf:open-search", openHandler);
      window.removeEventListener("keydown", keyHandler);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const results = useMemo(() => smartSearch(q, 6), [q]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90]"
        >
          <div
            className="absolute inset-0 bg-ink/85 backdrop-blur-md"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.5, ease }}
            className="container-lux relative mx-auto max-w-3xl pt-24"
          >
            <div className="border-b border-white/15 pb-4">
              <div className="flex items-center gap-3">
                <span className="text-[9px] uppercase tracking-luxe text-gold">
                  AI Search
                </span>
                <span className="h-3 w-px bg-white/20" />
                <span className="text-[10px] uppercase tracking-wide2 text-stone">
                  Try “bridal under 10000” or “gift for her”
                </span>
              </div>
              <div className="mt-4 flex items-center gap-4">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="shrink-0 text-gold">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
                <input
                  autoFocus
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search the collection…"
                  className="w-full bg-transparent font-serif text-3xl font-light text-pearl outline-none placeholder:text-stone-dark sm:text-4xl"
                />
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close search"
                  className="text-[11px] uppercase tracking-wide2 text-stone hover:text-gold"
                >
                  Esc
                </button>
              </div>
            </div>

            <div className="mt-6 max-h-[55vh] overflow-y-auto no-scrollbar">
              {!q && (
                <div>
                  <p className="text-[10px] uppercase tracking-luxe text-stone">
                    Trending
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {trendingSearches.map((t) => (
                      <button
                        key={t}
                        onClick={() => setQ(t)}
                        className="border border-white/15 px-4 py-2 text-[12px] text-pearl/80 transition-colors hover:border-gold hover:text-gold"
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {q && results.length === 0 && (
                <p className="py-10 text-center text-stone-light">
                  No pieces match “{q}”. Try “bridal”, “earrings” or “under 5000”.
                </p>
              )}

              <div className="grid gap-1">
                {results.map(({ product }) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    onClick={() => setOpen(false)}
                    className="group flex items-center gap-4 border-b border-white/5 py-3 transition-colors hover:bg-white/[0.02]"
                  >
                    <div className="relative h-16 w-14 shrink-0 overflow-hidden bg-ink-800">
                      <Image src={product.images[0]} alt="" fill sizes="56px" className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[9px] uppercase tracking-luxe text-stone">
                        {product.collection}
                      </p>
                      <p className="font-serif text-lg text-pearl transition-colors group-hover:text-gold-light">
                        {product.name}
                      </p>
                    </div>
                    <span className="text-[13px] font-light text-gold">
                      {formatPKR(product.price)}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
