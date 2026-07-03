"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type RecentValue = {
  ids: string[];
  track: (id: string) => void;
};

const RecentContext = createContext<RecentValue | null>(null);
const KEY = "zf-recent-v1";
const MAX = 8;

export function RecentlyViewedProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setIds(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  const value: RecentValue = {
    ids,
    track: (id) =>
      setIds((prev) => {
        const next = [id, ...prev.filter((x) => x !== id)].slice(0, MAX);
        try {
          localStorage.setItem(KEY, JSON.stringify(next));
        } catch {}
        return next;
      }),
  };

  // avoid unused warning while keeping hydration gate explicit
  void hydrated;

  return (
    <RecentContext.Provider value={value}>{children}</RecentContext.Provider>
  );
}

export function useRecentlyViewed() {
  const ctx = useContext(RecentContext);
  if (!ctx)
    throw new Error("useRecentlyViewed must be used within RecentlyViewedProvider");
  return ctx;
}
