"use client";

/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import { formatPKR } from "@/data/products";
import type { Order, OrderStatus } from "@/lib/db";

const STATUSES: OrderStatus[] = [
  "pending",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled",
];

const statusColor: Record<OrderStatus, string> = {
  pending: "text-yellow-400",
  confirmed: "text-gold",
  shipped: "text-blue-300",
  delivered: "text-green-400",
  cancelled: "text-red-400",
};

export function OrdersTable({ initial }: { initial: Order[] }) {
  const [orders, setOrders] = useState(initial);
  const [openId, setOpenId] = useState<string | null>(null);

  const setStatus = async (order: Order, status: OrderStatus) => {
    // optimistic update
    setOrders((list) =>
      list.map((o) => (o.id === order.id ? { ...o, status } : o))
    );
    const res = await fetch(`/api/admin/orders/${order.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) {
      setOrders((list) =>
        list.map((o) => (o.id === order.id ? { ...o, status: order.status } : o))
      );
    }
  };

  return (
    <div>
      <h1 className="font-serif text-4xl font-light">Orders</h1>
      {orders.length === 0 ? (
        <p className="mt-8 text-sm text-stone-light">
          No orders yet. New orders from checkout land here instantly.
        </p>
      ) : (
        <div className="mt-8 space-y-2">
          {orders.map((o) => {
            const open = openId === o.id;
            return (
              <div key={o.id} className="border border-white/10">
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : o.id)}
                  className="grid w-full grid-cols-2 items-center gap-2 px-4 py-4 text-left sm:grid-cols-[100px_1fr_120px_110px_110px]"
                >
                  <span className="text-gold">{o.number}</span>
                  <span className="min-w-0">
                    <span className="block truncate text-pearl">{o.customer.name}</span>
                    <span className="block text-[11px] text-stone">
                      {o.customer.city} ·{" "}
                      {new Date(o.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                  </span>
                  <span className="text-[11px] uppercase tracking-wide2 text-stone-light">
                    {o.payment === "cod" ? "COD" : o.payment === "card" ? "Card" : "Wallet"}
                  </span>
                  <span className="text-pearl">{formatPKR(o.total)}</span>
                  <span className={`text-[11px] uppercase tracking-wide2 ${statusColor[o.status]}`}>
                    ● {o.status}
                  </span>
                </button>

                {open && (
                  <div className="border-t border-white/10 px-4 py-5">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <p className="text-[10px] uppercase tracking-luxe text-stone">
                          Customer
                        </p>
                        <p className="mt-2 text-sm text-pearl">{o.customer.name}</p>
                        <p className="text-sm text-stone-light">{o.customer.phone}</p>
                        {o.customer.email && (
                          <p className="text-sm text-stone-light">{o.customer.email}</p>
                        )}
                        <p className="mt-2 text-sm text-stone-light">
                          {o.customer.address}, {o.customer.city}
                          {o.customer.postal ? ` ${o.customer.postal}` : ""}
                        </p>
                        {o.giftNote && (
                          <p className="mt-3 border-l-2 border-gold/40 pl-3 text-[13px] italic text-stone-light">
                            🎁 {o.giftNote}
                          </p>
                        )}
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-luxe text-stone">
                          Items
                        </p>
                        <div className="mt-2 space-y-2">
                          {o.items.map((item) => (
                            <div key={`${item.id}-${item.color}`} className="flex items-center gap-3">
                              {item.image && (
                                <img
                                  src={item.image}
                                  alt=""
                                  className="h-10 w-8 object-cover"
                                />
                              )}
                              <span className="flex-1 text-sm text-pearl">
                                {item.name}{" "}
                                <span className="text-stone">
                                  · {item.color} × {item.qty}
                                </span>
                              </span>
                              <span className="text-sm text-stone-light">
                                {formatPKR(item.price * item.qty)}
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 space-y-1 border-t border-white/10 pt-3 text-[13px]">
                          <Row l="Subtotal" v={formatPKR(o.subtotal)} />
                          {o.discount > 0 && <Row l={`Discount${o.coupon ? ` (${o.coupon})` : ""}`} v={`− ${formatPKR(o.discount)}`} />}
                          <Row l="Delivery" v={o.shipping === 0 ? "Free" : formatPKR(o.shipping)} />
                          <Row l="Total" v={formatPKR(o.total)} strong />
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-white/10 pt-4">
                      <span className="mr-2 text-[10px] uppercase tracking-luxe text-stone">
                        Set status
                      </span>
                      {STATUSES.map((s) => (
                        <button
                          key={s}
                          onClick={() => setStatus(o, s)}
                          className={`border px-4 py-1.5 text-[11px] uppercase tracking-wide2 transition-colors ${
                            o.status === s
                              ? "border-gold bg-gold/10 text-gold"
                              : "border-white/15 text-stone-light hover:border-gold/60"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                      <a
                        href={`https://wa.me/${o.customer.phone.replace(/\D/g, "").replace(/^0/, "92")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto text-[11px] uppercase tracking-wide2 text-gold hover:text-gold-light"
                      >
                        WhatsApp customer →
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Row({ l, v, strong = false }: { l: string; v: string; strong?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className="text-stone-light">{l}</span>
      <span className={strong ? "font-medium text-gold" : "text-pearl"}>{v}</span>
    </div>
  );
}
