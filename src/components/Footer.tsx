import Link from "next/link";
import { Logo } from "./Logo";
import { site } from "@/lib/site";
import { Newsletter } from "./Newsletter";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "All Jewellery", href: "/shop" },
      { label: "Bridal Sets", href: "/shop?category=Bridal%20Sets" },
      { label: "Necklaces", href: "/shop?category=Necklaces" },
      { label: "Earrings", href: "/shop?category=Earrings" },
      { label: "Bracelets", href: "/shop?category=Bracelets" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Shipping", href: "/shipping" },
      { label: "Returns & Exchanges", href: "/returns" },
      { label: "FAQ", href: "/faq" },
      { label: "Track Order", href: "/account" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Brand",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Care Guide", href: "/care" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink">
      <Newsletter />

      <div className="container-lux grid gap-12 py-16 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-stone-light">
            {site.tagline}. Hand-finished, anti-tarnish, and skin-safe —
            delivered across Pakistan with Cash on Delivery.
          </p>
          <div className="mt-6 flex gap-4">
            <Social href={site.social.instagram} label="Instagram"><InstaIcon /></Social>
            <Social href={site.social.facebook} label="Facebook"><FbIcon /></Social>
            <Social href={site.social.tiktok} label="TikTok"><TiktokIcon /></Social>
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="text-[11px] font-semibold uppercase tracking-luxe text-gold">
              {col.title}
            </h4>
            <ul className="mt-5 space-y-3">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="link-underline text-sm text-stone-light transition-colors hover:text-pearl"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="hairline opacity-40" />

      <div className="container-lux flex flex-col items-center justify-between gap-4 py-6 text-[11px] text-stone sm:flex-row">
        <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <span className="uppercase tracking-wide2">Secure payments</span>
          <span className="flex gap-2 text-stone-light">
            <span className="rounded border border-white/10 px-2 py-0.5">COD</span>
            <span className="rounded border border-white/10 px-2 py-0.5">Visa</span>
            <span className="rounded border border-white/10 px-2 py-0.5">Master</span>
            <span className="rounded border border-white/10 px-2 py-0.5">Easypaisa</span>
          </span>
        </div>
      </div>
    </footer>
  );
}

function Social({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-stone-light transition-all hover:border-gold hover:text-gold"
    >
      {children}
    </a>
  );
}

function InstaIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>;
}
function FbIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v7h3v-7h2.5l.5-3H14V9.5c0-.3.2-.5.5-.5H14z"/></svg>;
}
function TiktokIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 3c.3 2 1.6 3.5 3.5 3.8V10c-1.4 0-2.6-.4-3.7-1.1V15a5.5 5.5 0 1 1-5.5-5.5c.3 0 .6 0 .9.1v3.2a2.3 2.3 0 1 0 1.6 2.2V3H16z"/></svg>;
}
