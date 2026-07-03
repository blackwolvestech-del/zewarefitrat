"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { formatPKR, type Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

const ease = [0.22, 1, 0.36, 1] as const;

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const { add } = useCart();
  const { has, toggle } = useWishlist();
  const [hover, setHover] = useState(false);
  const discount = product.compareAt
    ? Math.round(((product.compareAt - product.price) / product.compareAt) * 100)
    : 0;
  const wished = has(product.id);

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
      }}
      className="group"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="relative">
        <Link
          href={`/product/${product.slug}`}
          className="card-lux block aspect-[3/4]"
          aria-label={product.name}
        >
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            priority={priority}
            sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
            className={`object-cover transition-all duration-[1100ms] ease-lux ${
              hover && product.images[1] ? "opacity-0" : "opacity-100"
            } group-hover:scale-[1.04]`}
          />
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt=""
              fill
              sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
              className={`object-cover transition-opacity duration-[1100ms] ease-lux ${
                hover ? "opacity-100" : "opacity-0"
              }`}
            />
          )}

          {/* Labels — quiet uppercase, no gradient */}
          <div className="absolute left-0 top-4 flex flex-col gap-2">
            {product.badge && (
              <span className="bg-ink/60 px-3 py-1.5 text-[9px] font-medium uppercase tracking-luxe text-pearl backdrop-blur-sm">
                {product.badge}
              </span>
            )}
            {discount > 0 && (
              <span className="bg-gold px-3 py-1.5 text-[9px] font-semibold uppercase tracking-wide2 text-ink">
                −{discount}%
              </span>
            )}
          </div>
        </Link>

        {/* Wishlist */}
        <button
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => toggle(product.id)}
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center transition-all duration-500 ${
            wished
              ? "text-gold opacity-100"
              : "text-pearl opacity-0 group-hover:opacity-100"
          }`}
        >
          <svg width="19" height="19" viewBox="0 0 24 24" fill={wished ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.4">
            <path d="M12 21s-7-4.35-9.5-8.5C1 9 2.5 5.5 6 5.5c2 0 3.2 1.2 4 2.4.8-1.2 2-2.4 4-2.4 3.5 0 5 3.5 3.5 7C19 16.65 12 21 12 21Z" />
          </svg>
        </button>

        {/* Quick add — slides up on hover (desktop) */}
        <motion.button
          aria-label={`Add ${product.name} to bag`}
          onClick={() => add(product, product.colors[0])}
          initial={false}
          animate={{ y: hover ? 0 : 12, opacity: hover ? 1 : 0 }}
          transition={{ duration: 0.45, ease }}
          className="absolute inset-x-0 bottom-0 hidden bg-pearl/95 py-3.5 text-[10px] font-semibold uppercase tracking-luxe text-ink backdrop-blur transition-colors hover:bg-gold lg:block"
        >
          Add to Bag
        </motion.button>
      </div>

      <div className="pt-5">
        <p className="text-[9px] uppercase tracking-luxe text-stone">
          {product.collection}
        </p>
        <Link href={`/product/${product.slug}`}>
          <h3 className="mt-2 font-serif text-[22px] font-normal leading-none text-pearl transition-colors duration-300 group-hover:text-gold-light">
            {product.name}
          </h3>
        </Link>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-[13px] font-light text-pearl/90">
            {formatPKR(product.price)}
          </span>
          {product.compareAt && (
            <span className="text-[12px] font-light text-stone line-through">
              {formatPKR(product.compareAt)}
            </span>
          )}
          <span className="ml-auto flex items-center gap-1 text-[11px] text-stone">
            <Stars rating={product.rating} size={11} />
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export function Stars({ rating, size = 12 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          className={i <= Math.round(rating) ? "text-gold" : "text-stone-dark"}
        >
          <path
            fill="currentColor"
            d="M12 2l2.9 6.3 6.9.7-5.1 4.7 1.4 6.8L12 17.8 5.9 20.5l1.4-6.8L2.2 9l6.9-.7L12 2z"
          />
        </svg>
      ))}
    </span>
  );
}
