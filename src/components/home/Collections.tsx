"use client";

import Image from "next/image";
import Link from "next/link";
import { collections } from "@/data/products";
import { Reveal, Stagger, staggerItem } from "@/components/Reveal";
import { motion } from "framer-motion";

export function Collections() {
  return (
    <section className="container-lux py-20 lg:py-28">
      <Reveal className="text-center">
        <p className="eyebrow">Curated Worlds</p>
        <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
          Shop by Collection
        </h2>
      </Reveal>

      <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
        {collections.map((c) => (
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
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent transition-opacity duration-500 group-hover:from-ink/95" />
              <div className="absolute inset-x-0 bottom-0 p-7">
                <h3 className="font-serif text-2xl text-pearl">{c.name}</h3>
                <p className="mt-1 text-[13px] text-stone-light">{c.description}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-wide2 text-gold opacity-0 transition-all duration-500 group-hover:opacity-100">
                  Discover <span aria-hidden>→</span>
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </Stagger>
    </section>
  );
}
