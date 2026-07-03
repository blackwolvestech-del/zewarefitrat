import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";
import { homeFaqs } from "@/data/faqs";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers about delivery, Cash on Delivery, returns, anti-tarnish quality and more at ZEWARE FITRAT.",
  alternates: { canonical: "/faq" },
};

const extraFaqs = [
  {
    q: "Do you deliver to my city?",
    a: "We deliver everywhere in Pakistan — all major cities in 2–4 working days, and smaller towns within 3–6 working days via our courier partners.",
  },
  {
    q: "How do I track my order?",
    a: "As soon as your order ships, you receive a tracking number by WhatsApp and email. You can also message us anytime for a live update.",
  },
  {
    q: "How should I care for my jewellery?",
    a: "Keep pieces away from perfume, moisture and direct sunlight; store them in the pouch provided; and wipe gently with the included cloth after wearing. See our full Care Guide.",
  },
  {
    q: "Can I order for a wedding in bulk?",
    a: `Yes — for bridal parties and event orders, message us at ${site.email} or on WhatsApp and our concierge will help you curate matching sets.`,
  },
];

export default function FaqPage() {
  const all = [...homeFaqs, ...extraFaqs];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: all.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <InfoPage
      eyebrow="Help Centre"
      title="Frequently Asked Questions"
      intro="Everything you need to shop with complete confidence."
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {all.map((f) => (
        <div key={f.q}>
          <h3>{f.q}</h3>
          <p className="mt-2">{f.a}</p>
        </div>
      ))}
    </InfoPage>
  );
}
