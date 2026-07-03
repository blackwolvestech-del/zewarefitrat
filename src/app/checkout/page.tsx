import type { Metadata } from "next";
import { CheckoutClient } from "@/components/checkout/CheckoutClient";

export const metadata: Metadata = {
  title: "Secure Checkout",
  description: "Fast, secure checkout with Cash on Delivery across Pakistan.",
  robots: { index: false },
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
