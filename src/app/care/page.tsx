import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";

export const metadata: Metadata = {
  title: "Jewellery Care Guide",
  description:
    "Keep your ZEWARE FITRAT jewellery glowing — simple care steps for anti-tarnish artificial jewellery.",
  alternates: { canonical: "/care" },
};

export default function CarePage() {
  return (
    <InfoPage
      eyebrow="Keep the Glow"
      title="Jewellery Care Guide"
      intro="A minute of care keeps your pieces radiant for years."
    >
      <h2>The golden rules</h2>
      <p><strong>Last on, first off.</strong> Wear jewellery after perfume, lotion and hairspray — and remove it before bed.</p>
      <p><strong>Keep it dry.</strong> Remove pieces before washing hands, wuzu, swimming or exercise. Moisture is the enemy of shine.</p>
      <p><strong>Store it right.</strong> Keep each piece in its pouch or box, away from sunlight and humidity. Don&apos;t let pieces rub together.</p>
      <p><strong>Wipe after wear.</strong> A gentle pass with the included microfibre cloth removes oils and keeps the plating bright.</p>
      <h2>Piece-specific care</h2>
      <h3>Kundan & polki sets</h3>
      <p>Store flat. Never use liquid cleaners — they can seep behind the stones.</p>
      <h3>Meenakari (enamel)</h3>
      <p>Keep away from harsh chemicals and knocks; enamel is hand-painted.</p>
      <h3>Pearls</h3>
      <p>Pearls love to be worn but hate chemicals. Wipe with a soft dry cloth only.</p>
    </InfoPage>
  );
}
