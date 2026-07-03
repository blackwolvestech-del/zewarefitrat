import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/adminAuth";
import { getProducts, newProductId, upsertProduct } from "@/lib/db";
import type { Product } from "@/data/products";

export async function GET() {
  if (!(await isAdmin()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(getProducts());
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = (await req.json()) as Partial<Product>;
  if (!body.name || typeof body.price !== "number") {
    return NextResponse.json(
      { error: "Name and price are required" },
      { status: 400 }
    );
  }
  const slugBase = (body.slug || body.name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const existing = getProducts();
  let slug = slugBase;
  let n = 2;
  while (existing.some((p) => p.slug === slug)) slug = `${slugBase}-${n++}`;

  const product: Product = {
    id: newProductId(),
    slug,
    name: body.name,
    tagline: body.tagline || "",
    category: (body.category as Product["category"]) || "Necklaces",
    collection: body.collection || "Everyday Luxe",
    price: body.price,
    compareAt: body.compareAt || undefined,
    currency: "PKR",
    badge: body.badge || undefined,
    featured: Boolean(body.featured),
    bestseller: Boolean(body.bestseller),
    rating: body.rating ?? 5,
    reviewCount: body.reviewCount ?? 0,
    images: (body.images || []).filter(Boolean),
    colors: body.colors?.length ? body.colors : ["Gold"],
    story: body.story || "",
    features: body.features || [],
    specs: body.specs || [],
    care: body.care || [],
    inStock: body.inStock ?? true,
    stock: typeof body.stock === "number" ? body.stock : undefined,
    video: body.video || undefined,
    reviews: [],
  };
  upsertProduct(product);
  return NextResponse.json(product, { status: 201 });
}
