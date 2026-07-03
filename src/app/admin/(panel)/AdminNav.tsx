"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/orders", label: "Orders" },
];

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <nav className="mt-6 flex gap-2 overflow-x-auto no-scrollbar lg:flex-col lg:gap-1">
      {links.map((l) => {
        const active =
          l.href === "/admin" ? pathname === "/admin" : pathname.startsWith(l.href);
        return (
          <Link
            key={l.href}
            href={l.href}
            className={`shrink-0 px-4 py-2.5 text-[12px] font-medium uppercase tracking-wide2 transition-colors ${
              active
                ? "bg-gold/10 text-gold"
                : "text-stone-light hover:text-pearl"
            }`}
          >
            {l.label}
          </Link>
        );
      })}
      <button
        onClick={logout}
        className="shrink-0 px-4 py-2.5 text-left text-[12px] font-medium uppercase tracking-wide2 text-stone hover:text-red-400"
      >
        Logout
      </button>
    </nav>
  );
}
