import type { Order } from "./db";
import { formatPKR } from "@/data/products";

/**
 * Order notifications — fire-and-forget, never block or break checkout.
 *
 * Configure ANY of these (all optional):
 *   CALLMEBOT_PHONE   + CALLMEBOT_APIKEY   → WhatsApp to the owner via CallMeBot (free)
 *   ORDER_WEBHOOK_URL                      → POST order JSON (n8n / Zapier / custom bot)
 *
 * With none set, this is a no-op (a line is logged server-side).
 */

function orderMessage(order: Order): string {
  const items = order.items
    .map((i) => `• ${i.name} (${i.color}) ×${i.qty} — ${formatPKR(i.price * i.qty)}`)
    .join("\n");
  const pay =
    order.payment === "cod"
      ? "Cash on Delivery"
      : order.payment === "card"
        ? "Card"
        : "Easypaisa / JazzCash";
  const waPhone = order.customer.phone.replace(/\D/g, "").replace(/^0/, "92");

  return [
    `🛍️ New Order ${order.number}`,
    "",
    `👤 ${order.customer.name}`,
    `📞 ${order.customer.phone}`,
    `📍 ${order.customer.address}, ${order.customer.city}`,
    "",
    "🧾 Items:",
    items,
    "",
    `💰 Total: ${formatPKR(order.total)}`,
    `💳 ${pay}`,
    order.giftNote ? `🎁 Gift note: ${order.giftNote}` : "",
    "",
    `Reply: https://wa.me/${waPhone}`,
  ]
    .filter((line) => line !== "")
    .join("\n");
}

async function withTimeout(promise: Promise<Response>, ms = 8000) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), ms);
  try {
    return await promise;
  } finally {
    clearTimeout(t);
  }
}

async function sendCallMeBot(message: string) {
  const phone = process.env.CALLMEBOT_PHONE;
  const apikey = process.env.CALLMEBOT_APIKEY;
  if (!phone || !apikey) return;
  const url =
    `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(phone)}` +
    `&apikey=${encodeURIComponent(apikey)}&text=${encodeURIComponent(message)}`;
  await withTimeout(fetch(url, { method: "GET" }));
}

async function sendWebhook(order: Order, message: string) {
  const url = process.env.ORDER_WEBHOOK_URL;
  if (!url) return;
  await withTimeout(
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "new_order", message, order }),
    })
  );
}

export function notifyNewOrder(order: Order): void {
  const message = orderMessage(order);
  const anyConfigured =
    (process.env.CALLMEBOT_PHONE && process.env.CALLMEBOT_APIKEY) ||
    process.env.ORDER_WEBHOOK_URL;

  if (!anyConfigured) {
    console.log(`[order] ${order.number} placed — no notifier configured.`);
    return;
  }

  // Fire-and-forget: the long-running server keeps the event loop alive.
  void Promise.allSettled([
    sendCallMeBot(message),
    sendWebhook(order, message),
  ]).then((results) => {
    for (const r of results) {
      if (r.status === "rejected") {
        console.error(`[order] ${order.number} notification failed:`, r.reason);
      }
    }
  });
}
