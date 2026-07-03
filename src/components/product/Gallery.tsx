"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function Gallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPos({ x, y });
  };

  return (
    <div className="flex flex-col-reverse gap-4 lg:flex-row">
      {/* Thumbnails */}
      <div className="flex gap-3 lg:flex-col">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => setActive(i)}
            aria-label={`View image ${i + 1}`}
            className={`relative h-16 w-14 shrink-0 overflow-hidden rounded-sm transition-all lg:h-20 lg:w-16 ${
              active === i ? "ring-2 ring-gold" : "ring-1 ring-white/10 opacity-60 hover:opacity-100"
            }`}
          >
            <Image src={src} alt="" fill sizes="64px" className="object-cover" />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div
        ref={containerRef}
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onMouseMove={onMove}
        className="relative aspect-[4/5] flex-1 cursor-zoom-in overflow-hidden rounded-sm bg-ink-soft"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={images[active]}
              alt={`${name} — view ${active + 1}`}
              fill
              priority
              sizes="(max-width:1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-200"
              style={
                zoom
                  ? { transform: "scale(1.8)", transformOrigin: `${pos.x}% ${pos.y}%` }
                  : undefined
              }
            />
          </motion.div>
        </AnimatePresence>
        <span className="pointer-events-none absolute bottom-3 right-3 hidden rounded-full bg-ink/70 px-3 py-1 text-[10px] uppercase tracking-wide2 text-stone-light backdrop-blur sm:block">
          Hover to zoom
        </span>
      </div>
    </div>
  );
}
