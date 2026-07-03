import Link from "next/link";
import { getOrders, getProducts } from "@/lib/db";
import { formatPKR } from "@/data/products";

export const dynamic = "force-dynamic";

export default function AdminDashboard() {
  const products = getProducts();
  const orders = getOrders();
  const pending = orders.filter((o) => o.status === "pending");
  const revenue = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((n, o) => n + o.total, 0);
  const recent = orders.slice(0, 6);

  const stats = [
    { label: "Products", value: String(products.length), href: "/admin/products" },
    { label: "Total Orders", value: String(orders.length), href: "/admin/orders" },
    { label: "Pending Orders", value: String(pending.length), href: "/admin/orders" },
    { label: "Revenue", value: formatPKR(revenue), href: "/admin/orders" },
  ];

  return (
    <div>
      <h1 className="font-serif text-4xl font-light">Dashboard</h1>

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="glass p-5 transition-colors hover:border-gold/40"
          >
            <p className="text-[10px] uppercase tracking-luxe text-stone">
              {s.label}
            </p>
            <p className="mt-2 font-serif text-3xl font-light text-gold">
              {s.value}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-12">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl font-light">Recent Orders</h2>
          <Link
            href="/admin/orders"
            className="text-[11px] uppercase tracking-wide2 text-gold hover:text-gold-light"
          >
            View all →
          </Link>
        </div>
        {recent.length === 0 ? (
          <p className="mt-6 text-sm text-stone-light">
            No orders yet. They&apos;ll appear here the moment a customer checks out.
          </p>
        ) : (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-[10px] uppercase tracking-wide2 text-stone">
                  <th className="py-3 pr-4 font-medium">Order</th>
                  <th className="py-3 pr-4 font-medium">Customer</th>
                  <th className="py-3 pr-4 font-medium">City</th>
                  <th className="py-3 pr-4 font-medium">Total</th>
                  <th className="py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((o) => (
                  <tr key={o.id} className="border-b border-white/5">
                    <td className="py-3 pr-4 text-gold">{o.number}</td>
                    <td className="py-3 pr-4">{o.customer.name}</td>
                    <td className="py-3 pr-4 text-stone-light">{o.customer.city}</td>
                    <td className="py-3 pr-4">{formatPKR(o.total)}</td>
                    <td className="py-3 capitalize text-stone-light">{o.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
