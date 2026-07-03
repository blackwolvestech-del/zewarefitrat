import Link from "next/link";
import type { Product } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Reveal, Stagger } from "@/components/Reveal";

export function FeaturedProducts({ products }: { products: Product[] }) {
  return (
    <section className="container-lux py-section">
      <Reveal className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Signature Pieces</p>
          <h2 className="mt-4 font-serif text-h2 font-light">The Most Coveted</h2>
        </div>
        <Link
          href="/shop"
          className="link-underline w-fit text-[11px] font-medium uppercase tracking-wide2 text-gold"
        >
          View all jewellery →
        </Link>
      </Reveal>

      <div className="mt-8 hairline opacity-50" />

      <Stagger className="mt-12 grid grid-cols-2 gap-x-5 gap-y-14 sm:gap-x-8 lg:grid-cols-4">
        {products.slice(0, 4).map((product, i) => (
          <ProductCard key={product.id} product={product} priority={i < 2} />
        ))}
      </Stagger>
    </section>
  );
}
