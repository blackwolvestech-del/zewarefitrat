"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <div className="border-b border-white/10">
      <div className="container-lux grid gap-8 py-16 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="eyebrow">The Fitrat List</p>
          <h3 className="mt-3 font-serif text-3xl leading-tight text-pearl sm:text-4xl">
            Rs 500 off your first order
          </h3>
          <p className="mt-3 max-w-md text-sm text-stone-light">
            Join for early access to new drops, private bridal previews and
            members-only pricing.
          </p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (email) setDone(true);
          }}
          className="flex w-full max-w-md flex-col gap-3 sm:flex-row lg:ml-auto"
        >
          {done ? (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="gold-text font-serif text-lg"
            >
              ✦ Welcome to the list — check your inbox.
            </motion.p>
          ) : (
            <>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 border-b border-white/20 bg-transparent px-1 py-3 text-sm text-pearl outline-none transition-colors placeholder:text-stone focus:border-gold"
              />
              <button type="submit" className="btn-gold shrink-0">
                Subscribe
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
