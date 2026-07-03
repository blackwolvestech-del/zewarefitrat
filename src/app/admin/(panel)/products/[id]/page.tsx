import { notFound } from "next/navigation";
import { getProductById } from "@/lib/db";
import { ProductForm } from "./ProductForm";

export const dynamic = "force-dynamic";

export default async function AdminProductEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (id === "new") return <ProductForm initial={null} />;
  const product = getProductById(id);
  if (!product) notFound();
  return <ProductForm initial={product} />;
}
