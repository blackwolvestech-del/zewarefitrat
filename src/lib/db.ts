import fs from "fs";
import path from "path";
import crypto from "crypto";
import { products as seedProducts, type Product } from "@/data/products";

/**
 * Lightweight JSON-file database.
 *
 * Set DATA_DIR (e.g. /app/data on Coolify with a volume attached) so
 * products, orders and uploaded media persist across deployments.
 * Defaults to ./data for local development.
 */
const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data");
const PRODUCTS_FILE = path.join(DATA_DIR, "products.json");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");
export const UPLOADS_DIR = path.join(DATA_DIR, "uploads");

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "cancelled";

export type OrderItem = {
  id: string;
  slug: string;
  name: string;
  price: number;
  qty: number;
  color: string;
  image: string;
};

export type Order = {
  id: string;
  number: string;
  createdAt: string;
  status: OrderStatus;
  customer: {
    name: string;
    phone: string;
    email?: string;
    address: string;
    city: string;
    postal?: string;
  };
  payment: "cod" | "card" | "wallet";
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  coupon?: string;
  giftNote?: string;
};

function ensureStore() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  if (!fs.existsSync(PRODUCTS_FILE)) {
    atomicWrite(PRODUCTS_FILE, JSON.stringify(seedProducts, null, 2));
  }
  if (!fs.existsSync(ORDERS_FILE)) {
    atomicWrite(ORDERS_FILE, "[]");
  }
}

function atomicWrite(file: string, contents: string) {
  const tmp = `${file}.${process.pid}.${Date.now()}.tmp`;
  fs.writeFileSync(tmp, contents, "utf8");
  fs.renameSync(tmp, file);
}

function readJson<T>(file: string, fallback: T): T {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8")) as T;
  } catch {
    return fallback;
  }
}

// ————— Products —————

export function getProducts(): Product[] {
  ensureStore();
  return readJson<Product[]>(PRODUCTS_FILE, []);
}

export function getProduct(slug: string): Product | undefined {
  return getProducts().find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return getProducts().find((p) => p.id === id);
}

export function saveProducts(list: Product[]) {
  ensureStore();
  atomicWrite(PRODUCTS_FILE, JSON.stringify(list, null, 2));
}

export function upsertProduct(product: Product): Product {
  const list = getProducts();
  const i = list.findIndex((p) => p.id === product.id);
  if (i >= 0) list[i] = product;
  else list.unshift(product);
  saveProducts(list);
  return product;
}

export function deleteProduct(id: string): boolean {
  const list = getProducts();
  const next = list.filter((p) => p.id !== id);
  if (next.length === list.length) return false;
  saveProducts(next);
  return true;
}

export function newProductId(): string {
  return `zf-${crypto.randomBytes(4).toString("hex")}`;
}

// ————— Orders —————

export function getOrders(): Order[] {
  ensureStore();
  return readJson<Order[]>(ORDERS_FILE, []);
}

export function saveOrders(list: Order[]) {
  ensureStore();
  atomicWrite(ORDERS_FILE, JSON.stringify(list, null, 2));
}

export function createOrder(
  input: Omit<Order, "id" | "number" | "createdAt" | "status">
): Order {
  const orders = getOrders();
  const seq = orders.length + 1;
  const order: Order = {
    ...input,
    id: crypto.randomUUID(),
    number: `ZF-${String(seq).padStart(4, "0")}`,
    createdAt: new Date().toISOString(),
    status: "pending",
  };
  orders.unshift(order);
  saveOrders(orders);

  // Decrement stock for ordered items
  const products = getProducts();
  let changed = false;
  for (const item of order.items) {
    const p = products.find((x) => x.id === item.id);
    if (p && typeof p.stock === "number") {
      p.stock = Math.max(0, p.stock - item.qty);
      if (p.stock === 0) p.inStock = false;
      changed = true;
    }
  }
  if (changed) saveProducts(products);

  return order;
}

export function updateOrderStatus(id: string, status: OrderStatus): Order | null {
  const orders = getOrders();
  const order = orders.find((o) => o.id === id);
  if (!order) return null;
  order.status = status;
  saveOrders(orders);
  return order;
}
