import type { Metadata } from "next";
import { WishlistClient } from "@/components/WishlistClient";

export const metadata: Metadata = {
  title: "Your Wishlist",
  description: "Saved ZEWARE FITRAT pieces you love.",
  robots: { index: false },
};

export default function WishlistPage() {
  return <WishlistClient />;
}
