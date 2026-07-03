import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/adminAuth";
import { deleteProduct, getProductById, upsertProduct } from "@/lib/db";
import type { Product } from "@/data/products";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, ctx: Ctx) {
  if (!(await isAdmin()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  const product = getProductById(id);
  if (!product)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(product);
}

export async function PUT(req: NextRequest, ctx: Ctx) {
  if (!(await isAdmin()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  const current = getProductById(id);
  if (!current)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  const body = (await req.json()) as Partial<Product>;
  const updated: Product = {
    ...current,
    ...body,
    id: current.id, // immutable
    currency: "PKR",
    compareAt: body.compareAt || undefined,
    badge: body.badge || undefined,
    video: body.video || undefined,
    stock: typeof body.stock === "number" ? body.stock : undefined,
    images: (body.images ?? current.images).filter(Boolean),
    inStock:
      typeof body.stock === "number" && body.stock <= 0
        ? false
        : body.inStock ?? current.inStock,
  };
  upsertProduct(updated);
  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, ctx: Ctx) {
  if (!(await isAdmin()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  const ok = deleteProduct(id);
  return ok
    ? NextResponse.json({ ok: true })
    : NextResponse.json({ error: "Not found" }, { status: 404 });
}
