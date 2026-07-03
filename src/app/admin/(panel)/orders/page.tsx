import { getOrders } from "@/lib/db";
import { OrdersTable } from "./OrdersTable";

export const dynamic = "force-dynamic";

export default function AdminOrdersPage() {
  const orders = getOrders();
  return <OrdersTable initial={orders} />;
}
