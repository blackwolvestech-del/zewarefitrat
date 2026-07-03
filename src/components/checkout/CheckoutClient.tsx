"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { formatPKR } from "@/data/products";
import { site } from "@/lib/site";

const cities = [
  "Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", "Multan",
  "Peshawar", "Quetta", "Sialkot", "Gujranwala", "Hyderabad", "Other",
];

type Payment = "cod" | "card" | "wallet";

export function CheckoutClient() {
  const { items, subtotal, clear } = useCart();
  const [payment, setPayment] = useState<Payment>("cod");
  const [giftNote, setGiftNote] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [placed, setPlaced] = useState<{ number: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const placeOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer: {
          name: fd.get("name"),
          phone: fd.get("phone"),
          email: fd.get("email") || undefined,
          address: fd.get("address"),
          city: fd.get("city"),
          postal: fd.get("postal") || undefined,
        },
        payment,
        items: items.map((i) => ({ id: i.id, color: i.color, qty: i.qty })),
        coupon: couponApplied ? coupon.trim() : undefined,
        giftNote: giftNote ? String(fd.get("giftMessage") || "") : undefined,
      }),
    }).catch(() => null);

    const json = await res?.json().catch(() => ({}));
    if (!res?.ok) {
      setSubmitError(json?.error || "Something went wrong — please try again.");
      setSubmitting(false);
      return;
    }
    setPlaced({ number: json.number });
    clear();
    window.scrollTo({ top: 0 });
  };

  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const shipping =
    subtotal - discount >= site.shipping.freeThreshold || items.length === 0
      ? 0
      : site.shipping.flatRate;
  const total = subtotal - discount + shipping;

  if (placed) {
    return (
      <div className="container-lux flex min-h-[70svh] flex-col items-center justify-center py-20 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="flex h-20 w-20 items-center justify-center rounded-full bg-gold-gradient"
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="2.5"><path d="M5 13l4 4L19 7" /></svg>
        </motion.div>
        <h1 className="mt-8 font-serif text-4xl sm:text-5xl">Shukriya! Order placed</h1>
        <p className="mt-3 text-[13px] uppercase tracking-wide2 text-gold">
          Order {placed.number}
        </p>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-stone-light">
          Your pieces are being prepared with care. You&apos;ll receive a
          confirmation on WhatsApp shortly — quote{" "}
          <span className="text-pearl">{placed.number}</span> for any queries.
        </p>
        <Link href="/shop" className="btn-gold mt-9">Continue Shopping</Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-lux flex min-h-[60svh] flex-col items-center justify-center py-20 text-center">
        <h1 className="font-serif text-4xl">Your bag is empty</h1>
        <p className="mt-3 text-stone-light">Add something beautiful first.</p>
        <Link href="/shop" className="btn-gold mt-8">Explore the Collection</Link>
      </div>
    );
  }

  return (
    <div className="container-lux py-10 lg:py-14">
      <h1 className="font-serif text-4xl sm:text-5xl">Checkout</h1>
      <p className="mt-2 flex items-center gap-2 text-[12px] uppercase tracking-wide2 text-stone">
        <LockIcon /> Secure &amp; encrypted · Guest checkout
      </p>

      <form
        className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]"
        onSubmit={placeOrder}
      >
        {/* Left: forms */}
        <div className="space-y-10">
          <section>
            <h2 className="flex items-center gap-3 font-serif text-xl">
              <Step n={1} /> Contact
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="Full name" name="name" autoComplete="name" required />
              <Field label="Phone (WhatsApp)" name="phone" type="tel" autoComplete="tel" placeholder="03XX XXXXXXX" required />
              <Field label="Email" name="email" type="email" autoComplete="email" className="sm:col-span-2" />
            </div>
          </section>

          <section>
            <h2 className="flex items-center gap-3 font-serif text-xl">
              <Step n={2} /> Delivery
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="Street address" name="address" autoComplete="street-address" required className="sm:col-span-2" />
              <label className="flex flex-col gap-2">
                <span className="text-[11px] uppercase tracking-wide2 text-stone">City *</span>
                <select
                  name="city"
                  required
                  className="border-b border-white/20 bg-ink py-3 text-[15px] text-pearl outline-none focus:border-gold"
                >
                  {cities.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </label>
              <Field label="Postal code" name="postal" autoComplete="postal-code" />
            </div>
          </section>

          <section>
            <h2 className="flex items-center gap-3 font-serif text-xl">
              <Step n={3} /> Payment
            </h2>
            <div className="mt-5 space-y-3">
              <PayOption
                active={payment === "cod"}
                onClick={() => setPayment("cod")}
                title="Cash on Delivery"
                sub="Pay when your order arrives — most popular"
                badge="Recommended"
              />
              <PayOption
                active={payment === "card"}
                onClick={() => setPayment("card")}
                title="Debit / Credit Card"
                sub="Visa, Mastercard — secure payment"
              />
              <PayOption
                active={payment === "wallet"}
                onClick={() => setPayment("wallet")}
                title="Easypaisa / JazzCash"
                sub="Pay instantly from your mobile wallet"
              />
              <AnimatePresence>
                {payment === "card" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-4 pt-2 sm:grid-cols-2">
                      <Field label="Card number" name="card" inputMode="numeric" placeholder="1234 5678 9012 3456" className="sm:col-span-2" />
                      <Field label="Expiry" name="expiry" placeholder="MM/YY" />
                      <Field label="CVC" name="cvc" inputMode="numeric" placeholder="123" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>

          <section>
            <label className="flex cursor-pointer items-center gap-3 text-sm text-stone-light">
              <input
                type="checkbox"
                checked={giftNote}
                onChange={(e) => setGiftNote(e.target.checked)}
                className="h-4 w-4 accent-[#D4AF37]"
              />
              This is a gift — add a complimentary note &amp; gift wrap
            </label>
            <AnimatePresence>
              {giftNote && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <textarea
                    name="giftMessage"
                    rows={3}
                    placeholder="Your message (we'll write it on a gold-foiled card)"
                    className="mt-4 w-full border border-white/15 bg-transparent p-4 text-sm text-pearl outline-none placeholder:text-stone focus:border-gold"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </div>

        {/* Right: summary */}
        <aside className="h-fit lg:sticky lg:top-24">
          <div className="glass rounded-sm p-6">
            <h2 className="font-serif text-xl">Order Summary</h2>
            <div className="mt-5 max-h-72 space-y-4 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={`${item.id}-${item.color}`} className="flex gap-3">
                  <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-sm">
                    <Image src={item.image} alt="" fill sizes="56px" className="object-cover" />
                    <span className="absolute -right-0 -top-0 flex h-5 w-5 items-center justify-center rounded-bl bg-accent text-[10px] font-bold text-ink">
                      {item.qty}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-serif text-sm text-pearl">{item.name}</p>
                    <p className="text-[11px] uppercase tracking-wide2 text-stone">{item.color}</p>
                  </div>
                  <span className="text-sm text-stone-light">{formatPKR(item.price * item.qty)}</span>
                </div>
              ))}
            </div>

            {/* Coupon */}
            <div className="mt-5 flex gap-2">
              <input
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Coupon code"
                className="flex-1 border-b border-white/20 bg-transparent px-1 py-2 text-sm text-pearl outline-none placeholder:text-stone focus:border-gold"
              />
              <button
                type="button"
                onClick={() => coupon.trim() && setCouponApplied(true)}
                className="text-[11px] font-semibold uppercase tracking-wide2 text-gold hover:text-gold-light"
              >
                Apply
              </button>
            </div>
            {couponApplied && (
              <p className="mt-2 text-[12px] text-gold">✦ 10% welcome discount applied</p>
            )}

            <div className="mt-5 space-y-2.5 border-t border-white/10 pt-5 text-sm">
              <Row label="Subtotal" value={formatPKR(subtotal)} />
              {discount > 0 && <Row label="Discount" value={`− ${formatPKR(discount)}`} gold />}
              <Row
                label="Delivery"
                value={shipping === 0 ? "Free" : formatPKR(shipping)}
                gold={shipping === 0}
              />
              <div className="flex items-center justify-between border-t border-white/10 pt-4">
                <span className="text-[12px] uppercase tracking-wide2 text-stone-light">Total</span>
                <span className="font-serif text-2xl text-gold">{formatPKR(total)}</span>
              </div>
            </div>

            {submitError && (
              <p className="mt-4 border border-red-400/40 bg-red-400/10 px-4 py-3 text-[13px] text-red-300">
                {submitError}
              </p>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="btn-gold mt-6 w-full disabled:opacity-60"
            >
              {submitting
                ? "Placing order…"
                : payment === "cod"
                  ? "Place Order — Pay on Delivery"
                  : "Pay & Place Order"}
            </button>
            <p className="mt-4 flex items-center justify-center gap-2 text-[11px] text-stone">
              <LockIcon /> 256-bit SSL secure · 7-day easy returns
            </p>
          </div>
        </aside>
      </form>
    </div>
  );
}

function PayOption({
  active,
  onClick,
  title,
  sub,
  badge,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  sub: string;
  badge?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex w-full items-center gap-4 rounded-sm border p-4 text-left transition-all ${
        active
          ? "border-gold bg-gold/[0.06]"
          : "border-white/10 hover:border-gold/50"
      }`}
    >
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all ${
          active ? "border-gold" : "border-white/25"
        }`}
      >
        {active && <span className="h-2.5 w-2.5 rounded-full bg-gold-gradient" />}
      </span>
      <span className="flex-1">
        <span className="flex items-center gap-2">
          <span className={`text-[15px] ${active ? "text-gold" : "text-pearl"}`}>{title}</span>
          {badge && (
            <span className="rounded-full bg-accent px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wide2 text-ink">
              {badge}
            </span>
          )}
        </span>
        <span className="mt-0.5 block text-[12px] text-stone">{sub}</span>
      </span>
    </button>
  );
}

function Step({ n }: { n: number }) {
  return (
    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold-gradient font-sans text-[12px] font-bold text-ink">
      {n}
    </span>
  );
}

function Row({ label, value, gold = false }: { label: string; value: string; gold?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className="text-stone-light">{label}</span>
      <span className={gold ? "text-gold" : "text-pearl"}>{value}</span>
    </div>
  );
}

function Field({
  label,
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className={`flex flex-col gap-2 ${className}`}>
      <span className="text-[11px] uppercase tracking-wide2 text-stone">
        {label}
        {props.required && " *"}
      </span>
      <input
        {...props}
        className="border-b border-white/20 bg-transparent py-3 text-[15px] text-pearl outline-none transition-colors placeholder:text-stone focus:border-gold"
      />
    </label>
  );
}

function LockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}
