"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { Stars } from "@/components/ProductCard";

const testimonials = [
  {
    name: "Ayesha K.",
    city: "Lahore",
    rating: 5,
    body: "Wore the Noor set for my nikkah — five people asked where it was from. Looked more expensive than real gold.",
  },
  {
    name: "Sana R.",
    city: "Islamabad",
    rating: 5,
    body: "The jhumkas are so light I forgot I had them on. Perfect for a full day of Eid visits.",
  },
  {
    name: "Mahnoor A.",
    city: "Faisalabad",
    rating: 5,
    body: "I wear the polki choker with plain kurtas and get compliments every single time. Obsessed.",
  },
  {
    name: "Hira M.",
    city: "Karachi",
    rating: 5,
    body: "Packaging felt like a proper gift. Delivery was quick and COD made it stress-free.",
  },
];

export function Testimonials() {
  return (
    <section className="border-y border-white/10 bg-ink-soft py-20 lg:py-28">
      <div className="container-lux">
        <Reveal className="text-center">
          <p className="eyebrow">Loved Across Pakistan</p>
          <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
            20,000+ Women Adorned
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <Stars rating={5} size={16} />
            <span className="text-sm text-stone-light">4.9 average · verified reviews</span>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="glass flex flex-col gap-4 rounded-sm p-6"
            >
              <Stars rating={t.rating} />
              <blockquote className="flex-1 text-[14px] leading-relaxed text-pearl/90">
                &ldquo;{t.body}&rdquo;
              </blockquote>
              <figcaption className="flex items-center justify-between border-t border-white/5 pt-4">
                <span className="font-serif text-sm text-gold">{t.name}</span>
                <span className="text-[11px] uppercase tracking-wide2 text-stone">
                  {t.city}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
