"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "@/components/Reveal";

export function BrandStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className="section-light overflow-hidden py-section">
      <div className="container-lux grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="relative order-1 aspect-[4/5] overflow-hidden lg:order-none">
          <motion.div style={{ y }} className="absolute inset-[-8%]">
            <Image
              src="https://images.unsplash.com/photo-1633934542430-0905ccb5f050?auto=format&fit=crop&w=1920&q=85"
              alt="Artisan hand-setting a ZEWARE FITRAT jewellery piece"
              fill
              sizes="(max-width:1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
        </div>

        <Reveal>
          <p className="eyebrow">The House of Fitrat</p>
          <h2 className="mt-5 font-serif text-h2 font-light">
            Jewellery with a<br />
            <span className="italic text-gold-deep">soul of gold</span>
          </h2>
          <p className="mt-8 max-w-prose2 text-[16px] font-light leading-relaxed text-stone-dark">
            <span className="font-urdu text-gold-deep" dir="rtl">
              زیورِ فطرت
            </span>{" "}
            means &ldquo;the jewellery of nature.&rdquo; We believe elegance is
            your natural state — and the right piece simply reveals it.
          </p>
          <p className="mt-4 max-w-prose2 text-[16px] font-light leading-relaxed text-stone-dark">
            Every design is hand-finished, plated to resist tarnish, and tested
            to be gentle on your skin. Atelier craft, made accessible for every
            celebration in Pakistan.
          </p>

          <div className="mt-12 grid grid-cols-3 gap-8 border-t border-ink/10 pt-8">
            {[
              { n: "20k+", l: "Happy customers" },
              { n: "4.9", l: "Average rating" },
              { n: "48h", l: "Dispatch time" },
            ].map((stat) => (
              <div key={stat.l}>
                <p className="font-serif text-4xl font-light text-ink">{stat.n}</p>
                <p className="mt-2 text-[10px] uppercase tracking-wide2 text-stone-dark">
                  {stat.l}
                </p>
              </div>
            ))}
          </div>

          <Link href="/about" className="btn-outline mt-12 text-ink">
            Read Our Story
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
