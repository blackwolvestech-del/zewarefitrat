"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./Logo";
import { nav } from "@/lib/site";
import { useCart } from "@/context/CartContext";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, open } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  return (
    <>
      {/* Announcement bar */}
      <div className="relative z-50 bg-ink-soft text-center text-[11px] tracking-wide2 text-stone-light">
        <div className="container-lux flex items-center justify-center gap-2 py-2 uppercase">
          <span className="gold-text font-medium">Free delivery over Rs 5,000</span>
          <span className="hidden text-stone sm:inline">·</span>
          <span className="hidden sm:inline">Cash on Delivery Nationwide</span>
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 transition-all duration-500 ${
          scrolled
            ? "border-b border-white/10 bg-ink/85 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <nav className="container-lux flex items-center justify-between py-4">
          <button
            aria-label="Open menu"
            className="flex h-9 w-9 items-center justify-center lg:hidden"
            onClick={() => setMenuOpen(true)}
          >
            <span className="flex flex-col gap-[5px]">
              <span className="h-px w-6 bg-pearl" />
              <span className="h-px w-6 bg-pearl" />
              <span className="h-px w-4 bg-gold" />
            </span>
          </button>

          <div className="hidden lg:flex lg:flex-1 lg:items-center lg:gap-8">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="link-underline text-[12px] font-medium uppercase tracking-wide2 text-pearl/85 transition-colors hover:text-gold"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-1 justify-center lg:flex-none">
            <Logo />
          </div>

          <div className="flex flex-1 items-center justify-end gap-4 sm:gap-5">
            <Link
              href="/shop"
              aria-label="Search"
              className="hidden text-pearl/85 transition-colors hover:text-gold sm:block"
            >
              <SearchIcon />
            </Link>
            <Link
              href="/account"
              aria-label="Account"
              className="hidden text-pearl/85 transition-colors hover:text-gold sm:block"
            >
              <UserIcon />
            </Link>
            <button
              aria-label={`Open cart, ${count} items`}
              onClick={open}
              className="relative text-pearl/85 transition-colors hover:text-gold"
            >
              <BagIcon />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold-gradient px-1 text-[10px] font-bold text-ink"
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
            <div
              className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.5 }}
              className="absolute inset-y-0 left-0 flex w-[82%] max-w-sm flex-col bg-ink-soft p-7"
            >
              <div className="flex items-center justify-between">
                <Logo />
                <button
                  aria-label="Close menu"
                  onClick={() => setMenuOpen(false)}
                  className="text-2xl text-pearl/70 hover:text-gold"
                >
                  ×
                </button>
              </div>
              <div className="hairline my-7" />
              <div className="flex flex-col gap-6">
                {nav.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.07 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="font-serif text-2xl text-pearl hover:text-gold"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="mt-auto flex flex-col gap-3 text-[12px] uppercase tracking-wide2 text-stone-light">
                <Link href="/account" onClick={() => setMenuOpen(false)}>
                  Account
                </Link>
                <Link href="/faq" onClick={() => setMenuOpen(false)}>
                  Help & FAQ
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
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M6 8h12l-1 12H7L6 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}
function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}
function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
    </svg>
  );
}
