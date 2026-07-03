"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function LoadingScreen() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Only show on first visit of the session
    if (sessionStorage.getItem("zf-loaded")) {
      setDone(true);
      return;
    }
    const t = setTimeout(() => {
      sessionStorage.setItem("zf-loaded", "1");
      setDone(true);
    }, 1900);
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center"
          >
            <span
              className="font-urdu text-4xl text-gold sm:text-5xl"
              dir="rtl"
              aria-hidden
            >
              زیورِ فطرت
            </span>
            <span className="mt-6 font-serif text-lg tracking-[0.4em] text-pearl">
              ZEWARE FITRAT
            </span>
          </motion.div>

          <div className="mt-10 h-px w-40 overflow-hidden bg-white/10">
            <motion.div
              className="h-full bg-gold"
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 1.7, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
