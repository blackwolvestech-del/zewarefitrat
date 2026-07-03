const items = [
  { title: "Nationwide Delivery", sub: "2–4 days · COD available" },
  { title: "Anti-Tarnish Finish", sub: "Skin-safe & nickel-free" },
  { title: "7-Day Easy Returns", sub: "Shop with confidence" },
  { title: "Atelier Packaging", sub: "Gift-ready keepsake box" },
];

export function TrustBar() {
  return (
    <section className="border-y border-white/[0.07] bg-ink-soft">
      <div className="container-lux grid grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => (
          <div
            key={item.title}
            className={`flex flex-col items-center gap-2 px-4 py-9 text-center ${
              i % 2 === 0 ? "border-r border-white/[0.05]" : ""
            } lg:border-r ${i === 3 ? "lg:border-r-0" : ""} ${
              i < 2 ? "border-b border-white/[0.05] lg:border-b-0" : ""
            }`}
          >
            <span className="font-serif text-xl font-light text-pearl">
              {item.title}
            </span>
            <span className="text-[10px] uppercase tracking-luxe text-stone">
              {item.sub}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
