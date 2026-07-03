import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms of service for shopping at ZEWARE FITRAT.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <InfoPage
      eyebrow="The Fine Print"
      title="Terms & Conditions"
      intro="Clear, fair terms — the way shopping should be."
    >
      <h2>Products</h2>
      <p>
        ZEWARE FITRAT sells premium <strong>artificial and fashion
        jewellery</strong>. Our pieces are gold-plated brass and alloys with
        kundan, polki-style stones, cubic zirconia and shell pearl — they are
        not solid gold or precious gemstones, and are priced accordingly.
        Colours may vary slightly due to screen settings and photography.
      </p>
      <h2>Orders & pricing</h2>
      <p>
        All prices are in Pakistani Rupees and inclusive of taxes. We reserve
        the right to cancel orders affected by pricing errors or stock issues —
        with a full refund and an apology.
      </p>
      <h2>Delivery</h2>
      <p>
        Delivery timelines are estimates and may vary during sales, weather
        events or courier disruptions. See our Shipping page for details.
      </p>
      <h2>Returns</h2>
      <p>Our 7-day return policy is described on the Returns page and forms part of these terms.</p>
      <h2>Contact</h2>
      <p>
        Questions about these terms: <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
      <p className="text-[13px] text-stone">Last updated: July 2026</p>
    </InfoPage>
  );
}
