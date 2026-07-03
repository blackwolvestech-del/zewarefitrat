"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { formatPKR, type Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

export function StickyAddToCart({ product }: { product: Product }) {
  const { add } = useCart();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 560);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.4 }}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-ink/92 backdrop-blur-xl"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <div className="container-lux flex items-center gap-3 py-3">
            <div className="relative hidden h-12 w-10 shrink-0 overflow-hidden rounded-sm sm:block">
              <Image src={product.images[0]} alt="" fill sizes="40px" className="object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-serif text-sm text-pearl">{product.name}</p>
              <p className="text-[13px] text-gold">{formatPKR(product.price)}</p>
            </div>
            <button
              onClick={() => add(product, product.colors[0])}
              className="btn-gold shrink-0 !px-6 !py-3"
            >
              Add to Bag
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
