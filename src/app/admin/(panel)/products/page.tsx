import { getProducts } from "@/lib/db";
import { ProductsTable } from "./ProductsTable";

export const dynamic = "force-dynamic";

export default function AdminProductsPage() {
  const products = getProducts();
  return <ProductsTable initial={products} />;
}
