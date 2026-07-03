import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How ZEWARE FITRAT collects, uses and protects your information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <InfoPage
      eyebrow="Your Trust"
      title="Privacy Policy"
      intro="We collect only what we need to serve you — and we protect it."
    >
      <h2>What we collect</h2>
      <p>
        Your name, phone number, delivery address and email — used solely to
        process orders, arrange delivery and provide support. Payment details
        entered at checkout are processed securely and are never stored on our
        servers.
      </p>
      <h2>How we use it</h2>
      <p>
        To fulfil your orders, send order updates (WhatsApp/email/SMS), and —
        only if you opt in — share new collections and offers. You can
        unsubscribe anytime.
      </p>
      <h2>What we never do</h2>
      <p>We never sell your data. We never share it with third parties beyond our courier and payment partners, who receive only what they need to deliver your order.</p>
      <h2>Cookies</h2>
      <p>We use essential cookies to keep your bag saved and basic analytics to improve the store. No invasive tracking.</p>
      <h2>Your rights</h2>
      <p>
        Ask us anytime to see, correct or delete your data at{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
      <p className="text-[13px] text-stone">Last updated: July 2026</p>
    </InfoPage>
  );
}
