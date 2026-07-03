import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, products, relatedProducts } from "@/data/products";
import { ProductDetail } from "@/components/product/ProductDetail";
import { Reviews } from "@/components/product/Reviews";
import { StickyAddToCart } from "@/components/product/StickyAddToCart";
import { ProductCard } from "@/components/ProductCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Reveal, Stagger } from "@/components/Reveal";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.name} — ${product.category}`,
    description: `${product.tagline}. ${product.story.slice(0, 140)}…`,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: {
      title: product.name,
      description: product.tagline,
      images: [{ url: product.images[0], width: 1200, height: 1500 }],
      type: "website",
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = relatedProducts(product);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.story,
    image: product.images,
    sku: product.id,
    brand: { "@type": "Brand", name: site.name },
    category: product.category,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
    review: product.reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      datePublished: r.date,
      reviewBody: r.body,
      name: r.title,
      reviewRating: { "@type": "Rating", ratingValue: r.rating },
    })),
    offers: {
      "@type": "Offer",
      url: `${site.url}/product/${product.slug}`,
      priceCurrency: "PKR",
      price: product.price,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: site.shipping.flatRate,
          currency: "PKR",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "PK",
        },
      },
    },
  };

  return (
    <div className="container-lux py-8 lg:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          {
            label: product.category,
            href: `/shop?category=${encodeURIComponent(product.category)}`,
          },
          { label: product.name },
        ]}
      />

      <div className="mt-8">
        <ProductDetail product={product} />
      </div>

      <Reviews product={product} />

      {/* Related */}
      <section className="border-t border-white/10 py-16 lg:py-24">
        <Reveal className="flex items-end justify-between">
          <div>
            <p className="eyebrow">Complete the look</p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
              You may also love
            </h2>
          </div>
        </Reveal>
        <Stagger className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </Stagger>
      </section>

      <StickyAddToCart product={product} />
    </div>
  );
}
