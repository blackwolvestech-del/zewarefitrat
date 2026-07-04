"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function Gallery({
  images,
  name,
  video,
}: {
  images: string[];
  name: string;
  video?: string;
}) {
  // slide list: video first (so it's the main media when a customer opens
  // the product), then images. No video → first image is the main view.
  const slides = [
    ...(video ? [{ type: "video" as const, src: video }] : []),
    ...images.map((src) => ({ type: "image" as const, src })),
  ];
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);
  const current = slides[active] ?? slides[0];

  const onMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  if (!current) return null;

  return (
    <div className="flex flex-col-reverse gap-4 lg:flex-row">
      {/* Thumbnails */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar lg:flex-col">
        {slides.map((slide, i) => (
          <button
            key={`${slide.src}-${i}`}
            onClick={() => setActive(i)}
            aria-label={slide.type === "video" ? "Play product video" : `View image ${i + 1}`}
            className={`relative h-16 w-14 shrink-0 overflow-hidden transition-all lg:h-20 lg:w-16 ${
              active === i
                ? "ring-1 ring-gold"
                : "opacity-60 ring-1 ring-white/10 hover:opacity-100"
            }`}
          >
            {slide.type === "image" ? (
              <Image src={slide.src} alt="" fill sizes="64px" className="object-cover" />
            ) : (
              <>
                {/* real video frame as the thumbnail */}
                <video
                  src={slide.src}
                  muted
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover"
                />
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-ink/30">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-gold bg-ink/50 text-[10px] text-gold">
                    ▶
                  </span>
                </span>
              </>
            )}
          </button>
        ))}
      </div>

      {/* Main viewer */}
      <div
        ref={containerRef}
        onMouseEnter={() => current.type === "image" && setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onMouseMove={onMove}
        className={`relative aspect-[4/5] flex-1 overflow-hidden bg-ink-soft ${
          current.type === "image" ? "cursor-zoom-in" : ""
        }`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            {current.type === "image" ? (
              <Image
                src={current.src}
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
            ) : (
              <video
                src={current.src}
                controls
                playsInline
                autoPlay
                muted
                loop
                className="h-full w-full object-cover"
                aria-label={`${name} product video`}
              />
            )}
          </motion.div>
        </AnimatePresence>
        {current.type === "image" && (
          <span className="pointer-events-none absolute bottom-3 right-3 hidden rounded-full bg-ink/70 px-3 py-1 text-[10px] uppercase tracking-wide2 text-stone-light backdrop-blur sm:block">
            Hover to zoom
          </span>
        )}
      </div>
    </div>
  );
}
