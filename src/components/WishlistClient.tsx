"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useWishlist } from "@/context/WishlistContext";
import { useProducts } from "@/lib/useProducts";
import { ProductCard } from "@/components/ProductCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export function WishlistClient() {
  const { ids } = useWishlist();
  const { products } = useProducts();
  const items = products.filter((p) => ids.includes(p.id));

  return (
    <div className="container-lux py-14 lg:py-20">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Wishlist" }]} />
      <header className="mt-8 max-w-2xl">
        <p className="eyebrow">Saved for you</p>
        <h1 className="mt-4 font-serif text-h1 font-light">Your Wishlist</h1>
      </header>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="font-serif text-2xl font-light text-pearl">
            Nothing saved yet
          </p>
          <p className="mt-3 max-w-sm text-sm text-stone-light">
            Tap the heart on any piece to keep it here for later.
          </p>
          <Link href="/shop" className="btn-gold mt-8">
            Explore the Collection
          </Link>
        </div>
      ) : (
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="mt-12 grid grid-cols-2 gap-x-5 gap-y-14 sm:gap-x-8 lg:grid-cols-4"
        >
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </motion.div>
      )}
    </div>
  );
}
