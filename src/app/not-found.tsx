import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-lux flex min-h-[70svh] flex-col items-center justify-center py-20 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 font-serif text-5xl sm:text-6xl">
        This page slipped <span className="gold-text italic">away</span>
      </h1>
      <p className="mt-5 max-w-md text-[15px] text-stone-light">
        Like a lost earring, it&apos;s somewhere — just not here. Let&apos;s get
        you back to something beautiful.
      </p>
      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="btn-gold">Back Home</Link>
        <Link href="/shop" className="btn-outline">Shop the Collection</Link>
      </div>
    </div>
  );
}
