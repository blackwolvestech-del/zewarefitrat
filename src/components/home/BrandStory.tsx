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
    <section ref={ref} className="relative overflow-hidden bg-ink-soft py-20 lg:py-28">
      <div className="container-lux grid items-center gap-12 lg:grid-cols-2">
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm lg:aspect-square">
          <motion.div style={{ y }} className="absolute inset-[-8%]">
            <Image
              src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1400&q=85"
              alt="Artisan hand-setting a ZEWARE FITRAT jewellery piece"
              fill
              sizes="(max-width:1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 ring-1 ring-inset ring-gold/20" />
        </div>

        <Reveal>
          <p className="eyebrow">Our Fitrat</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
            Jewellery with a
            <span className="gold-text"> soul of gold</span>
          </h2>
          <p className="mt-6 text-[15px] leading-relaxed text-stone-light">
            <span className="font-urdu text-gold" dir="rtl">زیورِ فطرت</span> means
            &ldquo;the jewellery of nature.&rdquo; We believe elegance is your
            natural state — and the right piece simply reveals it.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-stone-light">
            Every design is hand-finished, plated to resist tarnish, and tested
            to be gentle on your skin. Museum-worthy craft, made accessible for
            every celebration in Pakistan.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-6">
            {[
              { n: "20k+", l: "Happy customers" },
              { n: "4.9★", l: "Average rating" },
              { n: "48h", l: "Dispatch time" },
            ].map((stat) => (
              <div key={stat.l}>
                <p className="gold-text font-serif text-3xl">{stat.n}</p>
                <p className="mt-1 text-[11px] uppercase tracking-wide2 text-stone">
                  {stat.l}
                </p>
              </div>
            ))}
          </div>

          <Link href="/about" className="btn-outline mt-9">
            Read Our Story
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
