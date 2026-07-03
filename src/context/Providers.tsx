"use client";

import type { ReactNode } from "react";
import { CartProvider } from "./CartContext";
import { WishlistProvider } from "./WishlistContext";
import { RecentlyViewedProvider } from "./RecentlyViewedContext";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <WishlistProvider>
        <RecentlyViewedProvider>{children}</RecentlyViewedProvider>
      </WishlistProvider>
    </CartProvider>
  );
}
