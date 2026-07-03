import Link from "next/link";

export function Logo({
  stacked = false,
  className = "",
}: {
  stacked?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label="ZEWARE FITRAT — home"
      className={`group inline-flex select-none items-center gap-3 ${
        stacked ? "flex-col gap-1" : ""
      } ${className}`}
    >
      <span
        className="gold-text font-urdu text-2xl leading-none sm:text-[28px]"
        style={{ direction: "rtl" }}
        dir="rtl"
        aria-hidden
      >
        زیورِ فطرت
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-serif text-[13px] font-medium tracking-luxe text-pearl sm:text-sm">
          ZEWARE
        </span>
        <span className="font-serif text-[13px] font-medium tracking-luxe text-gold sm:text-sm">
          FITRAT
        </span>
      </span>
    </Link>
  );
}
