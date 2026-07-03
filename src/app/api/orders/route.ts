import { NextRequest, NextResponse } from "next/server";
import { createOrder, getProducts } from "@/lib/db";
import { site } from "@/lib/site";

type IncomingItem = { id: string; color: string; qty: number };

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid body" }, { status: 400 });

  const { customer, payment, items, coupon, giftNote } = body as {
    customer?: Record<string, string>;
    payment?: "cod" | "card" | "wallet";
    items?: IncomingItem[];
    coupon?: string;
    giftNote?: string;
  };

  if (
    !customer?.name?.trim() ||
    !customer?.phone?.trim() ||
    !customer?.address?.trim() ||
    !customer?.city?.trim()
  ) {
    return NextResponse.json(
      { error: "Name, phone, address and city are required" },
      { status: 400 }
    );
  }
  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "Your bag is empty" }, { status: 400 });
  }
  if (!["cod", "card", "wallet"].includes(payment || "")) {
    return NextResponse.json({ error: "Invalid payment method" }, { status: 400 });
  }

  // Recompute all money server-side from the live catalogue
  const catalogue = getProducts();
  const orderItems = [];
  for (const item of items) {
    const p = catalogue.find((x) => x.id === item.id);
    if (!p) continue;
    const qty = Math.max(1, Math.min(20, Math.floor(item.qty || 1)));
    orderItems.push({
      id: p.id,
      slug: p.slug,
      name: p.name,
      price: p.price,
      qty,
      color: item.color || p.colors[0],
      image: p.images[0] || "",
    });
  }
  if (orderItems.length === 0) {
    return NextResponse.json({ error: "Items no longer available" }, { status: 400 });
  }

  const subtotal = orderItems.reduce((n, i) => n + i.price * i.qty, 0);
  const discount = coupon?.trim() ? Math.round(subtotal * 0.1) : 0;
  const shipping =
    subtotal - discount >= site.shipping.freeThreshold ? 0 : site.shipping.flatRate;
  const total = subtotal - discount + shipping;

  const order = createOrder({
    customer: {
      name: customer.name.trim(),
      phone: customer.phone.trim(),
      email: customer.email?.trim() || undefined,
      address: customer.address.trim(),
      city: customer.city.trim(),
      postal: customer.postal?.trim() || undefined,
    },
    payment: payment as "cod" | "card" | "wallet",
    items: orderItems,
    subtotal,
    discount,
    shipping,
    total,
    coupon: coupon?.trim() || undefined,
    giftNote: giftNote?.trim() || undefined,
  });

  return NextResponse.json(
    { ok: true, number: order.number, total: order.total },
    { status: 201 }
  );
}
