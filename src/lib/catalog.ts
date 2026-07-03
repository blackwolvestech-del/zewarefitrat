import "server-only";
import type { Product } from "@/data/products";
import { getProducts as dbProducts, getProduct as dbProduct } from "./db";

/** Server-side catalogue access — always reflects the admin's latest edits. */

export function getProducts(): Product[] {
  return dbProducts();
}

export function getProduct(slug: string): Product | undefined {
  return dbProduct(slug);
}

export function getFeatured(count = 4): Product[] {
  const list = dbProducts();
  const featured = list.filter((p) => p.featured);
  return (featured.length >= count ? featured : list).slice(0, count);
}

export function getRelated(product: Product, count = 4): Product[] {
  const list = dbProducts();
  return list
    .filter((p) => p.id !== product.id && p.collection === product.collection)
    .concat(list.filter((p) => p.id !== product.id))
    .filter((p, i, arr) => arr.findIndex((x) => x.id === p.id) === i)
    .slice(0, count);
}
