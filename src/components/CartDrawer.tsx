"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { formatPKR } from "@/data/products";
import { site } from "@/lib/site";

export function CartDrawer() {
  const { isOpen, close, items, subtotal, setQty, remove, count } = useCart();
  const remaining = site.shipping.freeThreshold - subtotal;
  const progress = Math.min(100, (subtotal / site.shipping.freeThreshold) * 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70]"
        >
          <div className="absolute inset-0 bg-ink/80 backdrop-blur-sm" onClick={close} />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.5 }}
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-ink-soft"
          >
            <div className="flex items-center justify-between border-b border-white/10 p-6">
              <h2 className="font-serif text-xl">
                Your Bag{" "}
                <span className="text-gold">({count})</span>
              </h2>
              <button aria-label="Close cart" onClick={close} className="text-2xl text-stone-light hover:text-gold">
                ×
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-5 p-8 text-center">
                <p className="font-serif text-lg text-pearl">Your bag is empty</p>
                <p className="text-sm text-stone-light">
                  Discover pieces made to be remembered.
                </p>
                <Link href="/shop" onClick={close} className="btn-gold mt-2">
                  Explore the Collection
                </Link>
              </div>
            ) : (
              <>
                <div className="border-b border-white/10 px-6 py-4">
                  {remaining > 0 ? (
                    <p className="text-[12px] text-stone-light">
                      Add <span className="text-gold">{formatPKR(remaining)}</span> more for{" "}
                      <span className="text-pearl">free delivery</span>
                    </p>
                  ) : (
                    <p className="text-[12px] text-gold">
                      ✦ You&apos;ve unlocked free delivery
                    </p>
                  )}
                  <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-ink-800">
                    <motion.div
                      className="h-full bg-gold-gradient"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-4">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.div
                        key={`${item.id}-${item.color}`}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex gap-4 py-4"
                      >
                        <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-sm bg-ink-800">
                          <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="flex justify-between gap-2">
                            <Link
                              href={`/product/${item.slug}`}
                              onClick={close}
                              className="font-serif text-sm text-pearl hover:text-gold"
                            >
                              {item.name}
                            </Link>
                            <button
                              aria-label="Remove"
                              onClick={() => remove(item.id, item.color)}
                              className="text-stone hover:text-gold"
                            >
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 7h16M9 7V5h6v2m-7 0 1 12h6l1-12"/></svg>
                            </button>
                          </div>
                          <p className="mt-0.5 text-[11px] uppercase tracking-wide2 text-stone">
                            {item.color}
                          </p>
                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center border border-white/10">
                              <button
                                aria-label="Decrease quantity"
                                className="px-2.5 py-1 text-stone-light hover:text-gold"
                                onClick={() => setQty(item.id, item.color, item.qty - 1)}
                              >
                                −
                              </button>
                              <span className="w-6 text-center text-sm">{item.qty}</span>
                              <button
                                aria-label="Increase quantity"
                                className="px-2.5 py-1 text-stone-light hover:text-gold"
                                onClick={() => setQty(item.id, item.color, item.qty + 1)}
                              >
                                +
                              </button>
                            </div>
                            <span className="text-sm text-gold">
                              {formatPKR(item.price * item.qty)}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <div className="border-t border-white/10 p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm uppercase tracking-wide2 text-stone-light">
                      Subtotal
                    </span>
                    <span className="font-serif text-xl text-gold">
                      {formatPKR(subtotal)}
                    </span>
                  </div>
                  <Link href="/checkout" onClick={close} className="btn-gold w-full">
                    Secure Checkout
                  </Link>
                  <p className="mt-3 text-center text-[11px] text-stone">
                    Shipping & taxes calculated at checkout
                  </p>
                </div>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
