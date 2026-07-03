import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";

export const metadata: Metadata = {
  title: "Shipping & Delivery",
  description:
    "Free delivery over Rs 5,000. Nationwide shipping across Pakistan in 2–4 working days with Cash on Delivery.",
  alternates: { canonical: "/shipping" },
};

export default function ShippingPage() {
  return (
    <InfoPage
      eyebrow="Delivery"
      title="Shipping & Delivery"
      intro="Fast, tracked and beautifully packaged — to every corner of Pakistan."
    >
      <h2>Rates & timing</h2>
      <p>
        <strong>Free delivery</strong> on all orders over Rs 5,000. Orders below
        that ship for a flat Rs 250 nationwide.
      </p>
      <p>
        Orders are dispatched within <strong>48 hours</strong>. Major cities
        (Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar)
        receive orders in <strong>2–4 working days</strong>; other areas within
        3–6 working days.
      </p>
      <h2>Cash on Delivery</h2>
      <p>
        COD is available everywhere we ship, with no extra fee. Please keep the
        exact amount ready for the rider.
      </p>
      <h2>Tracking</h2>
      <p>
        The moment your order ships you&apos;ll receive a tracking link on
        WhatsApp and email. Questions? Message us anytime — we reply within
        hours, not days.
      </p>
      <h2>Packaging</h2>
      <p>
        Every piece arrives in a velvet keepsake box inside protective
        packaging — gift-ready, always.
      </p>
    </InfoPage>
  );
}
