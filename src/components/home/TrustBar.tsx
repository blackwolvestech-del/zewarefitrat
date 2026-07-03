const items = [
  { title: "Nationwide Delivery", sub: "2–4 days · COD available" },
  { title: "Anti-Tarnish Finish", sub: "Skin-safe & nickel-free" },
  { title: "7-Day Easy Returns", sub: "Shop with confidence" },
  { title: "Premium Packaging", sub: "Gift-ready keepsake box" },
];

export function TrustBar() {
  return (
    <section className="border-y border-white/10 bg-ink-soft">
      <div className="container-lux grid grid-cols-2 divide-x divide-white/5 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.title} className="flex flex-col items-center gap-1 px-3 py-7 text-center">
            <span className="gold-text font-serif text-[15px] sm:text-base">{item.title}</span>
            <span className="text-[11px] uppercase tracking-wide2 text-stone">{item.sub}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
