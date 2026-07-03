import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "ZEWARE FITRAT — the jewellery of nature. Discover the story behind Pakistan's premium artificial jewellery brand.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <InfoPage
      eyebrow="Our Fitrat"
      title="Born to Adorn"
      intro="زیورِ فطرت — the jewellery of nature. We believe elegance is your natural state; the right piece simply reveals it."
    >
      <p>
        ZEWARE FITRAT began with a simple frustration: beautiful jewellery in
        Pakistan was either priceless or poorly made. Brides borrowed sets they
        couldn&apos;t keep. Everyday pieces tarnished in a season. We set out to
        close that gap — jewellery with the presence of gold and the price of
        possibility.
      </p>
      <h2>What we stand for</h2>
      <p>
        <strong>Craft first.</strong> Every piece is hand-finished, inspected
        twice, and plated with an 18k anti-tarnish layer that keeps its glow.
      </p>
      <p>
        <strong>Kind to skin.</strong> Nickel-free, hypoallergenic finishes —
        because jewellery should never leave a mark you didn&apos;t choose.
      </p>
      <p>
        <strong>Made for our occasions.</strong> From mayun to walima, Eid to
        everyday — our collections are designed for the way Pakistan celebrates.
      </p>
      <h2>The promise</h2>
      <p>
        Every order arrives in a velvet keepsake box, gift-ready. If it
        doesn&apos;t make you feel extraordinary, return it within 7 days — no
        questions, no hassle.
      </p>
    </InfoPage>
  );
}
