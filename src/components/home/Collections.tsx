"use client";

import Image from "next/image";
import Link from "next/link";
import { collections } from "@/data/products";
import { Reveal, Stagger, staggerItem } from "@/components/Reveal";
import { motion } from "framer-motion";

export function Collections() {
  return (
    <section className="container-lux py-section">
      <Reveal className="mx-auto max-w-xl text-center">
        <p className="eyebrow">Curated Worlds</p>
        <h2 className="mt-4 font-serif text-h2 font-light">Shop by Collection</h2>
        <p className="mx-auto mt-5 max-w-md text-[15px] font-light leading-relaxed text-stone-light">
          Three edits, one philosophy — jewellery that reveals the elegance you
          already carry.
        </p>
      </Reveal>

      <Stagger className="mt-16 grid gap-6 md:grid-cols-3">
        {collections.map((c, i) => (
          <motion.div key={c.slug} variants={staggerItem}>
            <Link
              href={`/shop?collection=${c.slug}`}
              className="card-lux group block aspect-[3/4]"
            >
              <Image
                src={c.image}
                alt={c.name}
                fill
                sizes="(max-width:768px) 100vw, 33vw"
                className="object-cover transition-transform duration-[1400ms] ease-lux group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent transition-opacity duration-700 group-hover:from-ink" />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <span className="text-[10px] uppercase tracking-luxe text-gold">
                  N&deg; {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-serif text-3xl font-light text-pearl">
                  {c.name}
                </h3>
                <p className="mt-2 max-w-[26ch] text-[13px] font-light text-stone-light">
                  {c.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-luxe text-pearl">
                  <span className="h-px w-6 bg-gold transition-all duration-500 group-hover:w-10" />
                  Discover
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </Stagger>
    </section>
  );
}
