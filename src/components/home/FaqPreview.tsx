"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { homeFaqs } from "@/data/faqs";

export function FaqPreview() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="container-lux py-section">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow">Good to Know</p>
          <h2 className="mt-4 font-serif text-h2 font-light">
            Questions,
            <br />
            <span className="italic text-gold">answered</span>
          </h2>
          <p className="mt-6 max-w-xs text-[15px] font-light leading-relaxed text-stone-light">
            Everything you need to shop with total confidence.
          </p>
        </Reveal>

        <div className="divide-y divide-white/10 border-y border-white/10">
          {homeFaqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={faq.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className={`font-serif text-xl font-light transition-colors ${isOpen ? "text-gold" : "text-pearl"}`}>
                    {faq.q}
                  </span>
                  <span className={`text-xl font-light text-gold transition-transform duration-500 ${isOpen ? "rotate-45" : ""}`}>
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-7 pr-8 text-[15px] font-light leading-relaxed text-stone-light">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
