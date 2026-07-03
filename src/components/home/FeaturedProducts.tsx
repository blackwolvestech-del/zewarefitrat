import Link from "next/link";
import { featuredProducts } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Reveal, Stagger } from "@/components/Reveal";

export function FeaturedProducts() {
  return (
    <section className="container-lux py-20 lg:py-28">
      <Reveal className="flex flex-col items-end justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow">Signature Pieces</p>
          <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
            The Most Coveted
          </h2>
        </div>
        <Link
          href="/shop"
          className="link-underline text-[12px] font-medium uppercase tracking-wide2 text-gold"
        >
          View all jewellery →
        </Link>
      </Reveal>

      <div className="mt-6 hairline opacity-40" />

      <Stagger className="mt-10 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4">
        {featuredProducts.slice(0, 4).map((product, i) => (
          <ProductCard key={product.id} product={product} priority={i < 2} />
        ))}
      </Stagger>
    </section>
  );
}
