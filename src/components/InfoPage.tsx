import { Breadcrumbs } from "./Breadcrumbs";

export function InfoPage({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="container-lux py-12 lg:py-16">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: title }]} />
      <header className="mt-8 max-w-2xl">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-3 font-serif text-5xl leading-tight sm:text-6xl">{title}</h1>
        {intro && (
          <p className="mt-5 text-[15px] leading-relaxed text-stone-light">{intro}</p>
        )}
      </header>
      <div className="hairline my-10 opacity-40" />
      <div className="prose-lux max-w-3xl space-y-8 text-[15px] leading-relaxed text-stone-light [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:text-pearl [&_h3]:font-serif [&_h3]:text-lg [&_h3]:text-gold [&_strong]:text-pearl [&_a]:text-gold">
        {children}
      </div>
    </div>
  );
}
