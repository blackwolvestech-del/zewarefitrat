import Link from "next/link";
import Image from "next/image";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="ZEWARE FITRAT — home"
      className={`group inline-flex items-center gap-3 ${className}`}
    >
      <Image
        src="/brand/logo.png"
        alt="ZEWARE FITRAT"
        width={262}
        height={120}
        priority
        className="h-7 w-auto sm:h-8"
      />
      <span className="hidden flex-col leading-none sm:flex" aria-hidden>
        <span className="font-serif text-[13px] font-normal tracking-[0.3em] text-pearl">
          ZEWARE
        </span>
        <span className="mt-0.5 font-serif text-[13px] font-normal tracking-[0.3em] text-gold">
          FITRAT
        </span>
      </span>
    </Link>
  );
}
