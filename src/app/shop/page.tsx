import type { Metadata } from "next";
import { ShopGrid } from "@/components/ShopGrid";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Shop All Jewellery",
  description:
    "Browse premium artificial and fashion jewellery — bridal sets, necklaces, earrings, bracelets and rings. Anti-tarnish, skin-safe, delivered across Pakistan.",
  alternates: { canonical: "/shop" },
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; collection?: string; q?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="container-lux py-10 lg:py-14">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Shop" }]} />
      <header className="mt-6 max-w-2xl">
        <p className="eyebrow">The Collection</p>
        <h1 className="mt-3 font-serif text-5xl leading-tight sm:text-6xl">
          {params.q ? `Results for “${params.q}”` : "All Jewellery"}
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-stone-light">
          Hand-finished pieces made to be remembered — for weddings,
          celebrations, gifts and everyday glow.
        </p>
      </header>

      <div className="mt-10">
        <ShopGrid
          initialCategory={params.category}
          initialCollection={params.collection}
          initialQuery={params.q}
        />
      </div>
    </div>
  );
}
