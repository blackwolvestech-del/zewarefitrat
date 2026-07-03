"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./Logo";
import { nav } from "@/lib/site";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

const ease = [0.22, 1, 0.36, 1] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, open } = useCart();
  const { count: wishCount } = useWishlist();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const openSearch = () => window.dispatchEvent(new Event("zf:open-search"));

  return (
    <>
      {/* Announcement */}
      <div className="relative z-50 bg-ink-soft text-center text-[10px] uppercase tracking-luxe text-stone-light">
        <div className="container-lux flex items-center justify-center gap-3 py-2.5">
          <span className="text-gold">Complimentary delivery over Rs 5,000</span>
          <span className="hidden h-3 w-px bg-white/15 sm:block" />
          <span className="hidden sm:inline">Cash on Delivery Nationwide</span>
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 transition-all duration-500 ${
          scrolled
            ? "border-b border-white/[0.07] bg-ink/80 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <nav className="container-lux flex items-center justify-between py-5">
          <button
            aria-label="Open menu"
            className="flex h-9 w-9 items-center justify-center lg:hidden"
            onClick={() => setMenuOpen(true)}
          >
            <span className="flex flex-col gap-[6px]">
              <span className="h-px w-6 bg-pearl" />
              <span className="h-px w-6 bg-pearl" />
              <span className="h-px w-4 bg-gold" />
            </span>
          </button>

          <div className="hidden lg:flex lg:flex-1 lg:items-center lg:gap-9">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="link-underline text-[11px] font-medium uppercase tracking-wide2 text-pearl/80 transition-colors hover:text-pearl"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-1 justify-center lg:flex-none">
            <Logo />
          </div>

          <div className="flex flex-1 items-center justify-end gap-4 sm:gap-6">
            <button
              aria-label="Search"
              onClick={openSearch}
              className="text-pearl/80 transition-colors hover:text-gold"
            >
              <SearchIcon />
            </button>
            <Link
              href="/wishlist"
              aria-label={`Wishlist, ${wishCount} items`}
              className="relative hidden text-pearl/80 transition-colors hover:text-gold sm:block"
            >
              <HeartIcon />
              {wishCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[9px] font-bold text-ink">
                  {wishCount}
                </span>
              )}
            </Link>
            <button
              aria-label={`Open cart, ${count} items`}
              onClick={open}
              className="relative text-pearl/80 transition-colors hover:text-gold"
            >
              <BagIcon />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[9px] font-bold text-ink"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <div className="absolute inset-0 bg-ink/85 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", ease, duration: 0.55 }}
              className="absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col bg-ink-soft p-8"
            >
              <div className="flex items-center justify-between">
                <Logo />
                <button
                  aria-label="Close menu"
                  onClick={() => setMenuOpen(false)}
                  className="text-2xl font-light text-stone-light hover:text-gold"
                >
                  ×
                </button>
              </div>
              <div className="my-8 h-px w-full bg-white/10" />
              <div className="flex flex-col gap-7">
                {nav.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 + i * 0.07 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="font-serif text-3xl font-light text-pearl hover:text-gold"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="mt-auto flex flex-col gap-4 text-[11px] uppercase tracking-wide2 text-stone-light">
                <Link href="/wishlist" onClick={() => setMenuOpen(false)}>
                  Wishlist ({wishCount})
                </Link>
                <Link href="/account" onClick={() => setMenuOpen(false)}>
                  Account &amp; Tracking
                </Link>
                <Link href="/faq" onClick={() => setMenuOpen(false)}>
                  Help &amp; FAQ
                </Link>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function BagIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="M6 8h12l-1 12H7L6 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}
function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}
function HeartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="M12 21s-7-4.35-9.5-8.5C1 9 2.5 5.5 6 5.5c2 0 3.2 1.2 4 2.4.8-1.2 2-2.4 4-2.4 3.5 0 5 3.5 3.5 7C19 16.65 12 21 12 21Z" />
    </svg>
  );
}
