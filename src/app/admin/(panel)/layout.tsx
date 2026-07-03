import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/adminAuth";
import { AdminNav } from "./AdminNav";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAdmin())) redirect("/admin/login");

  return (
    <div className="container-lux flex min-h-[80svh] flex-col gap-10 py-10 lg:flex-row">
      <aside className="shrink-0 lg:w-56">
        <p className="eyebrow">Atelier Admin</p>
        <AdminNav />
        <div className="mt-8 border-t border-white/10 pt-6">
          <Link
            href="/"
            className="text-[11px] uppercase tracking-wide2 text-stone hover:text-gold"
          >
            ← View store
          </Link>
        </div>
      </aside>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
