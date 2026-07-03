import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Reach ZEWARE FITRAT customer care — WhatsApp, email and social. We reply within hours.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <InfoPage
      eyebrow="We're Here"
      title="Contact Us"
      intro="Real people, quick replies. Reach us any way you like."
    >
      <h2>WhatsApp (fastest)</h2>
      <p>
        Message us at{" "}
        <a
          href={`https://wa.me/${site.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {site.phone}
        </a>{" "}
        — for order help, styling advice or bridal consultations.
      </p>
      <h2>Email</h2>
      <p>
        <a href={`mailto:${site.email}`}>{site.email}</a> — we respond within
        one working day.
      </p>
      <h2>Social</h2>
      <p>
        DM us on <a href={site.social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a> or{" "}
        <a href={site.social.facebook} target="_blank" rel="noopener noreferrer">Facebook</a> — we love seeing how you style your pieces. Tag
        #ZewareFitrat to be featured.
      </p>
      <h2>Hours</h2>
      <p>Monday–Saturday, 10am–8pm PKT. Orders can be placed online 24/7.</p>
    </InfoPage>
  );
}
