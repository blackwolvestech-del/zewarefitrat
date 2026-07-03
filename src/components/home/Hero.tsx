"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden"
    >
      {/* Cinematic video background */}
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/videos/hero-poster.jpg"
          aria-label="ZEWARE FITRAT jewellery collection film"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Cinematic gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-ink/25" />
      {/* Subtle gold vignette glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 85%, rgba(201,162,75,0.14), transparent 70%)",
        }}
      />

      <motion.div
        style={{ opacity }}
        className="container-lux relative flex h-full flex-col items-center justify-end pb-28 text-center sm:justify-center sm:pb-0"
      >
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="eyebrow"
        >
          Premium Artificial &amp; Fashion Jewellery
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 max-w-4xl text-balance font-serif text-[15vw] leading-[0.95] sm:mt-5 sm:text-6xl lg:text-8xl"
        >
          Adorn Your
          <br />
          <span className="gold-text-shimmer italic">Fitrat</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.9 }}
          className="mt-5 max-w-lg text-balance text-sm leading-relaxed text-pearl/85 sm:mt-6 sm:text-base"
        >
          Hand-finished jewellery that carries the glow of gold — crafted for
          weddings, celebrations and the woman who is her own occasion.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.9 }}
          className="mt-8 flex w-full flex-col items-center gap-3 px-2 sm:mt-9 sm:w-auto sm:flex-row sm:gap-4 sm:px-0"
        >
          <Link href="/shop" className="btn-gold w-full sm:w-auto">
            Shop the Collection
          </Link>
          <Link
            href="/shop?collection=shaadi-couture"
            className="btn-outline w-full sm:w-auto"
          >
            Explore Bridal
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
      >
        <span className="text-[10px] uppercase tracking-luxe text-stone-light">
          Scroll
        </span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="h-8 w-px bg-gradient-to-b from-gold to-transparent"
        />
      </motion.div>
    </section>
  );
}
