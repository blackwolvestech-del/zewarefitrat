"use client";

import Image from "next/image";
import { useState, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function Gallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [mode, setMode] = useState<"gallery" | "360">("gallery");
  const [spin, setSpin] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const lastX = useRef(0);

  const onMove = (e: React.MouseEvent) => {
    if (mode !== "gallery") return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  // 360: map horizontal drag to image index for a rotate-to-spin feel
  const onSpin = useCallback(
    (clientX: number) => {
      if (!dragging.current) return;
      const dx = clientX - lastX.current;
      if (Math.abs(dx) > 14) {
        setSpin((s) => (s + (dx > 0 ? 1 : -1) + images.length) % images.length);
        lastX.current = clientX;
      }
    },
    [images.length]
  );

  return (
    <div className="flex flex-col-reverse gap-4 lg:flex-row">
      {/* Thumbnails */}
      <div className="flex gap-3 lg:flex-col">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => {
              setMode("gallery");
              setActive(i);
            }}
            aria-label={`View image ${i + 1}`}
            className={`relative h-16 w-14 shrink-0 overflow-hidden transition-all lg:h-20 lg:w-16 ${
              mode === "gallery" && active === i
                ? "ring-1 ring-gold"
                : "opacity-50 ring-1 ring-white/10 hover:opacity-100"
            }`}
          >
            <Image src={src} alt="" fill sizes="64px" className="object-cover" />
          </button>
        ))}
        {/* 360 toggle */}
        <button
          onClick={() => setMode(mode === "360" ? "gallery" : "360")}
          aria-label="360 degree view"
          className={`flex h-16 w-14 shrink-0 flex-col items-center justify-center gap-1 border transition-all lg:h-20 lg:w-16 ${
            mode === "360" ? "border-gold text-gold" : "border-white/15 text-stone-light hover:border-gold"
          }`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
            <ellipse cx="12" cy="12" rx="10" ry="5" />
            <path d="M4 12a8 4 0 0 0 16 0" opacity=".4" />
            <path d="m9 9 3-3 3 3" />
          </svg>
          <span className="text-[8px] uppercase tracking-wide2">360°</span>
        </button>
      </div>

      {/* Main stage */}
      <div
        ref={containerRef}
        onMouseEnter={() => mode === "gallery" && setZoom(true)}
        onMouseLeave={() => {
          setZoom(false);
          dragging.current = false;
        }}
        onMouseMove={(e) => {
          onMove(e);
          onSpin(e.clientX);
        }}
        onMouseDown={(e) => {
          if (mode === "360") {
            dragging.current = true;
            lastX.current = e.clientX;
          }
        }}
        onMouseUp={() => (dragging.current = false)}
        onTouchStart={(e) => {
          if (mode === "360") {
            dragging.current = true;
            lastX.current = e.touches[0].clientX;
          }
        }}
        onTouchMove={(e) => mode === "360" && onSpin(e.touches[0].clientX)}
        onTouchEnd={() => (dragging.current = false)}
        className={`relative aspect-[4/5] flex-1 overflow-hidden bg-ink-soft ${
          mode === "360" ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"
        }`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={mode === "360" ? `spin-${spin}` : `g-${active}`}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: mode === "360" ? 0.15 : 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={images[mode === "360" ? spin : active]}
              alt={`${name} — view`}
              fill
              priority
              sizes="(max-width:1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-200"
              style={
                zoom && mode === "gallery"
                  ? { transform: "scale(1.85)", transformOrigin: `${pos.x}% ${pos.y}%` }
                  : undefined
              }
            />
          </motion.div>
        </AnimatePresence>

        <span className="pointer-events-none absolute bottom-3 right-3 hidden bg-ink/60 px-3 py-1 text-[9px] uppercase tracking-luxe text-pearl backdrop-blur sm:block">
          {mode === "360" ? "Drag to rotate" : "Hover to zoom"}
        </span>
      </div>
    </div>
  );
}
