import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "@/components/InfoPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Account & Order Tracking",
  description: "Track your ZEWARE FITRAT order or manage your account.",
  robots: { index: false },
};

export default function AccountPage() {
  return (
    <InfoPage
      eyebrow="Your Space"
      title="Account & Tracking"
      intro="Customer accounts are launching soon — meanwhile, tracking is instant on WhatsApp."
    >
      <h2>Track your order</h2>
      <p>
        Send your order number to us on{" "}
        <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer">
          WhatsApp
        </a>{" "}
        and receive a live tracking update within minutes. Tracking links are
        also sent automatically when your order ships.
      </p>
      <h2>Coming soon</h2>
      <p>
        Full accounts with order history, saved addresses, wishlist sync and
        exclusive member pricing are on the way. Join{" "}
        <Link href="/#newsletter">The Fitrat List</Link> to be first to know.
      </p>
    </InfoPage>
  );
}
