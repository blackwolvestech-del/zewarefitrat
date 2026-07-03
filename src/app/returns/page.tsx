import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Returns & Exchanges",
  description:
    "Easy 7-day returns and exchanges at ZEWARE FITRAT. Shop with complete confidence.",
  alternates: { canonical: "/returns" },
};

export default function ReturnsPage() {
  return (
    <InfoPage
      eyebrow="Peace of Mind"
      title="Returns & Exchanges"
      intro="If it doesn't make you feel extraordinary, send it back — it's that simple."
    >
      <h2>7-day easy returns</h2>
      <p>
        You may return or exchange any item within <strong>7 days of
        delivery</strong>, provided it is unused, in its original condition and
        packaging. Refunds are processed within 3–5 working days of us
        receiving the item.
      </p>
      <h2>How to start a return</h2>
      <p>
        Message us on WhatsApp or email <a href={`mailto:${site.email}`}>{site.email}</a> with
        your order number and reason. We&apos;ll arrange pickup or share the
        return address — whichever is easier for you.
      </p>
      <h2>Exchanges</h2>
      <p>
        Want a different finish or piece? We&apos;ll ship the replacement as
        soon as the original is on its way back.
      </p>
      <h2>Damaged or incorrect items</h2>
      <p>
        In the rare case an item arrives damaged or incorrect, send us a photo
        within 48 hours and we&apos;ll replace it immediately — shipping on us,
        no return required in most cases.
      </p>
      <h2>Non-returnable</h2>
      <p>For hygiene, earrings that have been worn cannot be returned unless faulty.</p>
    </InfoPage>
  );
}
