"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { categories, type Product } from "@/data/products";

const collections = ["Shaadi Couture", "Heritage", "Everyday Luxe"];

type FormState = {
  name: string;
  tagline: string;
  category: string;
  collection: string;
  price: string;
  compareAt: string;
  badge: string;
  featured: boolean;
  bestseller: boolean;
  stock: string;
  inStock: boolean;
  colors: string;
  images: string[];
  video: string;
  story: string;
  features: string;
  specs: string;
  care: string;
};

function toForm(p: Product | null): FormState {
  return {
    name: p?.name ?? "",
    tagline: p?.tagline ?? "",
    category: p?.category ?? "Necklaces",
    collection: p?.collection ?? "Everyday Luxe",
    price: p ? String(p.price) : "",
    compareAt: p?.compareAt ? String(p.compareAt) : "",
    badge: p?.badge ?? "",
    featured: p?.featured ?? false,
    bestseller: p?.bestseller ?? false,
    stock: typeof p?.stock === "number" ? String(p.stock) : "",
    inStock: p?.inStock ?? true,
    colors: p?.colors.join(", ") ?? "Gold",
    images: p?.images ?? [],
    video: p?.video ?? "",
    story: p?.story ?? "",
    features: p?.features.join("\n") ?? "",
    specs: p?.specs.map((s) => `${s.label}: ${s.value}`).join("\n") ?? "",
    care: p?.care.join("\n") ?? "",
  };
}

export function ProductForm({ initial }: { initial: Product | null }) {
  const [form, setForm] = useState<FormState>(() => toForm(initial));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState<"image" | "video" | null>(null);
  const imageInput = useRef<HTMLInputElement>(null);
  const videoInput = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const upload = async (file: File, kind: "image" | "video") => {
    setUploading(kind);
    setError("");
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const json = await res.json().catch(() => ({}));
    setUploading(null);
    if (!res.ok) {
      setError(json.error || "Upload failed");
      return;
    }
    if (kind === "image") set("images", [...form.images, json.url]);
    else set("video", json.url);
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      name: form.name.trim(),
      tagline: form.tagline.trim(),
      category: form.category,
      collection: form.collection.trim() || "Everyday Luxe",
      price: Number(form.price) || 0,
      compareAt: form.compareAt ? Number(form.compareAt) : undefined,
      badge: form.badge.trim() || undefined,
      featured: form.featured,
      bestseller: form.bestseller,
      stock: form.stock === "" ? undefined : Math.max(0, Number(form.stock) || 0),
      inStock: form.inStock,
      colors: form.colors.split(",").map((c) => c.trim()).filter(Boolean),
      images: form.images,
      video: form.video.trim() || undefined,
      story: form.story.trim(),
      features: form.features.split("\n").map((x) => x.trim()).filter(Boolean),
      specs: form.specs
        .split("\n")
        .map((line) => {
          const i = line.indexOf(":");
          if (i === -1) return null;
          return { label: line.slice(0, i).trim(), value: line.slice(i + 1).trim() };
        })
        .filter((x): x is { label: string; value: string } => Boolean(x?.label)),
      care: form.care.split("\n").map((x) => x.trim()).filter(Boolean),
    };

    if (!payload.name || !payload.price) {
      setError("Name and price are required");
      setSaving(false);
      return;
    }

    const res = initial
      ? await fetch(`/api/admin/products/${initial.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      : await fetch("/api/admin/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(json.error || "Save failed");
      setSaving(false);
      return;
    }
    router.push("/admin/products");
    router.refresh();
  };

  return (
    <form onSubmit={save}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-serif text-4xl font-light">
          {initial ? `Edit — ${initial.name}` : "Add Product"}
        </h1>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="btn-outline !px-6 !py-3 text-pearl"
          >
            Cancel
          </Link>
          <button type="submit" disabled={saving} className="btn-gold !px-6 !py-3 disabled:opacity-60">
            {saving ? "Saving…" : "Save Product"}
          </button>
        </div>
      </div>

      {error && (
        <p className="mt-4 border border-red-400/40 bg-red-400/10 px-4 py-3 text-[13px] text-red-300">
          {error}
        </p>
      )}

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left column — core details */}
        <div className="space-y-6">
          <Text label="Name *" value={form.name} onChange={(v) => set("name", v)} />
          <Text label="Tagline" value={form.tagline} onChange={(v) => set("tagline", v)} />

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Category"
              value={form.category}
              options={[...categories]}
              onChange={(v) => set("category", v)}
            />
            <Select
              label="Collection"
              value={form.collection}
              options={collections}
              onChange={(v) => set("collection", v)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Text
              label="Price (Rs) *"
              value={form.price}
              onChange={(v) => set("price", v.replace(/[^\d]/g, ""))}
              inputMode="numeric"
            />
            <Text
              label="Compare-at price (Rs)"
              value={form.compareAt}
              onChange={(v) => set("compareAt", v.replace(/[^\d]/g, ""))}
              inputMode="numeric"
              placeholder="Optional — shows a discount"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Text
              label="Stock count"
              value={form.stock}
              onChange={(v) => set("stock", v.replace(/[^\d]/g, ""))}
              inputMode="numeric"
              placeholder="Blank = untracked"
            />
            <Text
              label="Badge"
              value={form.badge}
              onChange={(v) => set("badge", v)}
              placeholder="e.g. New, Bestseller"
            />
          </div>

          <div className="flex flex-wrap gap-6 border-y border-white/10 py-4">
            <Check label="In stock" checked={form.inStock} onChange={(v) => set("inStock", v)} />
            <Check label="Featured (homepage)" checked={form.featured} onChange={(v) => set("featured", v)} />
            <Check label="Bestseller" checked={form.bestseller} onChange={(v) => set("bestseller", v)} />
          </div>

          <Text
            label="Finishes / colours (comma-separated)"
            value={form.colors}
            onChange={(v) => set("colors", v)}
          />
          <Area label="Story" rows={4} value={form.story} onChange={(v) => set("story", v)} />
          <Area
            label="Features (one per line)"
            rows={4}
            value={form.features}
            onChange={(v) => set("features", v)}
          />
          <Area
            label="Specifications (Label: Value per line)"
            rows={4}
            value={form.specs}
            onChange={(v) => set("specs", v)}
            placeholder={"Material: Gold-plated brass\nWeight: ~14g"}
          />
          <Area
            label="Care (one per line)"
            rows={3}
            value={form.care}
            onChange={(v) => set("care", v)}
          />
        </div>

        {/* Right column — media */}
        <div className="space-y-8">
          <div>
            <p className="text-[11px] uppercase tracking-wide2 text-stone">
              Images
            </p>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {form.images.map((src, i) => (
                <div key={`${src}-${i}`} className="group relative aspect-[4/5] overflow-hidden bg-ink-800">
                  <img src={src} alt="" className="h-full w-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 flex justify-between bg-ink/80 px-2 py-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      type="button"
                      title="Move first"
                      onClick={() =>
                        set("images", [src, ...form.images.filter((_, j) => j !== i)])
                      }
                      className="text-[10px] uppercase text-gold"
                    >
                      ★
                    </button>
                    <button
                      type="button"
                      title="Remove"
                      onClick={() => set("images", form.images.filter((_, j) => j !== i))}
                      className="text-[10px] uppercase text-red-400"
                    >
                      ✕
                    </button>
                  </div>
                  {i === 0 && (
                    <span className="absolute left-1 top-1 bg-gold px-1.5 py-0.5 text-[8px] font-bold uppercase text-ink">
                      Main
                    </span>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => imageInput.current?.click()}
                disabled={uploading === "image"}
                className="flex aspect-[4/5] flex-col items-center justify-center gap-2 border border-dashed border-white/20 text-stone transition-colors hover:border-gold hover:text-gold disabled:opacity-50"
              >
                <span className="text-2xl font-light">+</span>
                <span className="text-[10px] uppercase tracking-wide2">
                  {uploading === "image" ? "Uploading…" : "Upload"}
                </span>
              </button>
            </div>
            <input
              ref={imageInput}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) upload(f, "image");
                e.target.value = "";
              }}
            />
            <ImageUrlAdder onAdd={(url) => set("images", [...form.images, url])} />
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-wide2 text-stone">
              Product video
            </p>
            {form.video ? (
              <div className="mt-3">
                <video
                  src={form.video}
                  controls
                  muted
                  playsInline
                  className="aspect-[4/5] w-full bg-ink-800 object-cover"
                />
                <button
                  type="button"
                  onClick={() => set("video", "")}
                  className="mt-2 text-[11px] uppercase tracking-wide2 text-red-400"
                >
                  Remove video
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => videoInput.current?.click()}
                disabled={uploading === "video"}
                className="mt-3 flex w-full flex-col items-center justify-center gap-2 border border-dashed border-white/20 py-10 text-stone transition-colors hover:border-gold hover:text-gold disabled:opacity-50"
              >
                <span className="text-2xl font-light">▶</span>
                <span className="text-[10px] uppercase tracking-wide2">
                  {uploading === "video" ? "Uploading…" : "Upload video (mp4/mov, ≤60MB)"}
                </span>
              </button>
            )}
            <input
              ref={videoInput}
              type="file"
              accept="video/mp4,video/quicktime,video/webm"
              hidden
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) upload(f, "video");
                e.target.value = "";
              }}
            />
          </div>
        </div>
      </div>
    </form>
  );
}

function Text({
  label,
  value,
  onChange,
  placeholder,
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  inputMode?: "numeric";
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[11px] uppercase tracking-wide2 text-stone">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        inputMode={inputMode}
        className="border-b border-white/20 bg-transparent py-2.5 text-[15px] text-pearl outline-none transition-colors placeholder:text-stone-dark focus:border-gold"
      />
    </label>
  );
}

function Area({
  label,
  value,
  onChange,
  rows,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows: number;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[11px] uppercase tracking-wide2 text-stone">{label}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="border border-white/15 bg-transparent p-3 text-[14px] leading-relaxed text-pearl outline-none transition-colors placeholder:text-stone-dark focus:border-gold"
      />
    </label>
  );
}

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[11px] uppercase tracking-wide2 text-stone">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border-b border-white/20 bg-ink py-2.5 text-[15px] text-pearl outline-none focus:border-gold"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function Check({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-[13px] text-pearl">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 accent-[#C7AB78]"
      />
      {label}
    </label>
  );
}

function ImageUrlAdder({ onAdd }: { onAdd: (url: string) => void }) {
  const [url, setUrl] = useState("");
  return (
    <div className="mt-3 flex gap-2">
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="…or paste an image URL"
        className="flex-1 border-b border-white/15 bg-transparent py-2 text-[12px] text-pearl outline-none placeholder:text-stone-dark focus:border-gold"
      />
      <button
        type="button"
        onClick={() => {
          if (url.trim()) {
            onAdd(url.trim());
            setUrl("");
          }
        }}
        className="text-[11px] uppercase tracking-wide2 text-gold hover:text-gold-light"
      >
        Add
      </button>
    </div>
  );
}
