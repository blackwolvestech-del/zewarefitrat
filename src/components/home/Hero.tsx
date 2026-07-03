"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const fade = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-ink"
    >
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <video
          className="h-full w-full object-cover object-center"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/videos/hero-poster.jpg"
          aria-label="ZEWARE FITRAT editorial jewellery film"
        >
          <source src="/videos/newbanner.mov" type="video/quicktime" />
          <source src="/videos/newbanner.mov" type="video/mp4" />
        </video>
      </motion.div>

      {/* Editorial tonal overlays — restrained */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-ink/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-transparent" />

      {/* Content — bottom-left editorial on desktop, centered on mobile */}
      <motion.div
        style={{ opacity: fade }}
        className="container-lux absolute inset-0 flex flex-col items-center justify-end pb-24 text-center sm:pb-28 lg:items-start lg:justify-end lg:pb-24 lg:text-left"
      >
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 1, ease }}
          className="mb-7 h-px w-16 origin-left bg-gold"
        />
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9, ease }}
          className="eyebrow text-pearl/70"
        >
          Fine Fashion Jewellery · Pakistan
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.62, duration: 1, ease }}
          className="mt-5 max-w-[14ch] text-balance font-serif text-display font-light text-pearl"
        >
          Adorn your{" "}
          <span className="italic text-gold-light">Fitrat</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.9, ease }}
          className="mt-6 max-w-md text-pretty text-[15px] font-light leading-relaxed text-pearl/75"
        >
          Hand-finished pieces with the presence of fine jewellery — composed
          for weddings, celebrations, and the everyday extraordinary.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.88, duration: 0.9, ease }}
          className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4"
        >
          <Link href="/shop" className="btn-gold w-full sm:w-auto">
            Explore the Collection
          </Link>
          <Link
            href="/shop?collection=shaadi-couture"
            className="btn-outline w-full text-pearl sm:w-auto"
          >
            The Bridal Édit
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        style={{ opacity: fade }}
        className="absolute bottom-8 right-8 hidden flex-col items-center gap-3 lg:flex"
      >
        <span className="text-[10px] uppercase tracking-luxe text-pearl/50 [writing-mode:vertical-rl]">
          Scroll
        </span>
        <motion.span
          animate={{ scaleY: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="h-10 w-px origin-top bg-gradient-to-b from-gold to-transparent"
        />
      </motion.div>
    </section>
  );
}
