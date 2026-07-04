import type { Metadata, Viewport } from "next";
import { Jost, Bodoni_Moda, Noto_Nastaliq_Urdu } from "next/font/google";
import "./globals.css";
import { Providers } from "@/context/Providers";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { LoadingScreen } from "@/components/LoadingScreen";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SearchOverlay } from "@/components/SearchOverlay";
import { site } from "@/lib/site";

// Jost — Futura-style geometric sans (the Louis Vuitton letterform family).
// Light-to-medium uppercase with wide tracking for labels, nav, buttons.
const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jost",
  display: "swap",
});
// Bodoni Moda — high-contrast Didone with optical sizing; hairline serifs
// sharpen at display sizes (Vogue / high-jewellery editorial look).
const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-bodoni",
  display: "swap",
});
const nastaliq = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  weight: ["500", "700"],
  variable: "--font-nastaliq",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "artificial jewellery Pakistan",
    "fashion jewellery",
    "bridal jewellery Pakistan",
    "kundan set",
    "jhumka earrings",
    "polki choker",
    "anti tarnish jewellery",
    "ZEWARE FITRAT",
  ],
  authors: [{ name: site.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: `${site.url}/logo.png`,
  description: site.description,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lahore",
    addressCountry: "PK",
  },
  sameAs: [site.social.instagram, site.social.facebook, site.social.tiktok],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${jost.variable} ${bodoni.variable} ${nastaliq.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <LoadingScreen />
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
          <SearchOverlay />
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  );
}
