"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatPKR, type Product } from "@/data/products";

export function ProductsTable({ initial }: { initial: Product[] }) {
  const [products, setProducts] = useState(initial);
  const [busy, setBusy] = useState<string | null>(null);
  const router = useRouter();

  const remove = async (p: Product) => {
    if (!confirm(`Delete “${p.name}”? This cannot be undone.`)) return;
    setBusy(p.id);
    const res = await fetch(`/api/admin/products/${p.id}`, { method: "DELETE" });
    if (res.ok) {
      setProducts((list) => list.filter((x) => x.id !== p.id));
      router.refresh();
    }
    setBusy(null);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-serif text-4xl font-light">Products</h1>
        <Link href="/admin/products/new" className="btn-gold !px-6 !py-3">
          + Add Product
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-[10px] uppercase tracking-wide2 text-stone">
              <th className="py-3 pr-4 font-medium">Product</th>
              <th className="py-3 pr-4 font-medium">Category</th>
              <th className="py-3 pr-4 font-medium">Price</th>
              <th className="py-3 pr-4 font-medium">Stock</th>
              <th className="py-3 pr-4 font-medium">Flags</th>
              <th className="py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-white/5">
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-10 shrink-0 overflow-hidden bg-ink-800">
                      {p.images[0] && (
                        <Image
                          src={p.images[0]}
                          alt=""
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-serif text-base text-pearl">
                        {p.name}
                      </p>
                      <p className="text-[11px] text-stone">/{p.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 pr-4 text-stone-light">{p.category}</td>
                <td className="py-3 pr-4">
                  <span className="text-gold">{formatPKR(p.price)}</span>
                  {p.compareAt && (
                    <span className="ml-2 text-[11px] text-stone line-through">
                      {formatPKR(p.compareAt)}
                    </span>
                  )}
                </td>
                <td className="py-3 pr-4">
                  {typeof p.stock === "number" ? (
                    <span className={p.stock <= 5 ? "text-red-400" : "text-pearl"}>
                      {p.stock}
                    </span>
                  ) : (
                    <span className="text-stone">∞</span>
                  )}
                  {!p.inStock && (
                    <span className="ml-2 text-[10px] uppercase text-red-400">
                      out
                    </span>
                  )}
                </td>
                <td className="py-3 pr-4 text-[10px] uppercase tracking-wide2 text-stone-light">
                  {[p.featured && "Featured", p.bestseller && "Bestseller", p.video && "Video"]
                    .filter(Boolean)
                    .join(" · ") || "—"}
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/admin/products/${p.id}`}
                      className="text-[11px] uppercase tracking-wide2 text-gold hover:text-gold-light"
                    >
                      Edit
                    </Link>
                    <Link
                      href={`/product/${p.slug}`}
                      target="_blank"
                      className="text-[11px] uppercase tracking-wide2 text-stone hover:text-pearl"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => remove(p)}
                      disabled={busy === p.id}
                      className="text-[11px] uppercase tracking-wide2 text-stone hover:text-red-400 disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && (
          <p className="py-10 text-center text-stone-light">
            No products yet — add your first piece.
          </p>
        )}
      </div>
    </div>
  );
}
