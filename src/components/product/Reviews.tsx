import { Stars } from "@/components/ProductCard";
import type { Product } from "@/data/products";
import { Reveal } from "@/components/Reveal";

export function Reviews({ product }: { product: Product }) {
  const dist = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: product.reviews.filter((r) => Math.round(r.rating) === star).length,
  }));
  const total = Math.max(product.reviews.length, 1);

  return (
    <section className="border-t border-white/10 py-16 lg:py-24">
      <Reveal>
        <p className="eyebrow">Verified Reviews</p>
        <h2 className="mt-3 font-serif text-3xl sm:text-4xl">What women are saying</h2>
      </Reveal>

      <div className="mt-10 grid gap-10 lg:grid-cols-[300px_1fr]">
        <div className="lg:sticky lg:top-24 lg:h-fit">
          <div className="flex items-end gap-3">
            <span className="font-serif text-6xl text-gold">{product.rating}</span>
            <div className="pb-2">
              <Stars rating={product.rating} size={16} />
              <p className="mt-1 text-[12px] text-stone">{product.reviewCount} reviews</p>
            </div>
          </div>
          <div className="mt-6 space-y-2">
            {dist.map((d) => (
              <div key={d.star} className="flex items-center gap-3 text-[12px] text-stone">
                <span className="w-3">{d.star}</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink-800">
                  <div
                    className="h-full bg-gold-gradient"
                    style={{ width: `${(d.count / total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="divide-y divide-white/10">
          {product.reviews.length === 0 && (
            <p className="py-8 text-stone-light">
              Be the first to review this piece.
            </p>
          )}
          {product.reviews.map((r) => (
            <article key={r.title} className="py-6">
              <div className="flex items-center justify-between">
                <Stars rating={r.rating} />
                {r.verified && (
                  <span className="rounded-full bg-gold/10 px-3 py-1 text-[10px] uppercase tracking-wide2 text-gold">
                    ✓ Verified Buyer
                  </span>
                )}
              </div>
              <h3 className="mt-3 font-serif text-lg text-pearl">{r.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-stone-light">{r.body}</p>
              <p className="mt-3 text-[11px] uppercase tracking-wide2 text-stone">
                {r.name} · {r.city} ·{" "}
                {new Date(r.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
