"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { formatPKR, type Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const { add } = useCart();
  const [hover, setHover] = useState(false);
  const discount = product.compareAt
    ? Math.round(((product.compareAt - product.price) / product.compareAt) * 100)
    : 0;

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 28 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
      }}
      className="group"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link href={`/product/${product.slug}`} className="card-lux block aspect-[4/5]">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          priority={priority}
          sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
          className={`object-cover transition-all duration-[900ms] ease-out ${
            hover && product.images[1] ? "opacity-0" : "opacity-100"
          } group-hover:scale-[1.05]`}
        />
        {product.images[1] && (
          <Image
            src={product.images[1]}
            alt={`${product.name} alternate view`}
            fill
            sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
            className={`object-cover transition-opacity duration-[900ms] ease-out ${
              hover ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.badge && (
            <span className="rounded-full bg-ink/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide2 text-gold backdrop-blur">
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="rounded-full bg-gold-gradient px-3 py-1 text-[10px] font-bold uppercase tracking-wide2 text-ink">
              −{discount}%
            </span>
          )}
        </div>

        {/* Quick add */}
        <motion.button
          aria-label={`Add ${product.name} to bag`}
          onClick={(e) => {
            e.preventDefault();
            add(product, product.colors[0]);
          }}
          initial={false}
          animate={{ y: hover ? 0 : 14, opacity: hover ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-x-3 bottom-3 hidden rounded-full bg-ink/80 py-3 text-[11px] font-semibold uppercase tracking-wide2 text-pearl backdrop-blur transition-colors hover:bg-gold hover:text-ink sm:block"
        >
          Quick Add
        </motion.button>
      </Link>

      <div className="pt-4">
        <p className="text-[10px] uppercase tracking-luxe text-stone">{product.collection}</p>
        <Link href={`/product/${product.slug}`}>
          <h3 className="mt-1 font-serif text-[17px] leading-tight text-pearl transition-colors group-hover:text-gold">
            {product.name}
          </h3>
        </Link>
        <div className="mt-1.5 flex items-center gap-1 text-[11px] text-stone-light">
          <Stars rating={product.rating} />
          <span>({product.reviewCount})</span>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-[15px] text-gold">{formatPKR(product.price)}</span>
          {product.compareAt && (
            <span className="text-[12px] text-stone line-through">
              {formatPKR(product.compareAt)}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export function Stars({ rating, size = 12 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" className={i <= Math.round(rating) ? "text-gold" : "text-stone-dark"}>
          <path fill="currentColor" d="M12 2l2.9 6.3 6.9.7-5.1 4.7 1.4 6.8L12 17.8 5.9 20.5l1.4-6.8L2.2 9l6.9-.7L12 2z" />
        </svg>
      ))}
    </span>
  );
}
