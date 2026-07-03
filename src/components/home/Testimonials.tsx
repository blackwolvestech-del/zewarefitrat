"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { Stars } from "@/components/ProductCard";

const testimonials = [
  {
    name: "Ayesha K.",
    city: "Lahore",
    rating: 5,
    body: "Wore the Noor set for my nikkah — five people asked where it was from. It looked more expensive than real gold.",
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
    body: "The packaging felt like a proper gift. Delivery was quick and COD made it stress-free.",
  },
];

export function Testimonials() {
  return (
    <section className="border-t border-white/[0.07] bg-ink py-section">
      <div className="container-lux">
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="eyebrow">Loved Across Pakistan</p>
          <h2 className="mt-4 font-serif text-h2 font-light">
            20,000+ Women Adorned
          </h2>
          <div className="mt-5 flex items-center justify-center gap-3">
            <Stars rating={5} size={15} />
            <span className="text-[13px] font-light text-stone-light">
              4.9 average · verified reviews
            </span>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-5 border border-white/[0.07] p-8"
            >
              <Stars rating={t.rating} />
              <blockquote className="flex-1 font-serif text-lg font-light italic leading-relaxed text-pearl/90">
                &ldquo;{t.body}&rdquo;
              </blockquote>
              <figcaption className="flex items-center justify-between border-t border-white/[0.06] pt-5">
                <span className="text-[13px] text-gold">{t.name}</span>
                <span className="text-[10px] uppercase tracking-luxe text-stone">
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
