import type { Product } from "@/data/products";

// Synonym map to give the search an "understands-what-you-mean" feel.
const SYNONYMS: Record<string, string[]> = {
  wedding: ["bridal", "shaadi", "walima", "nikkah", "dulhan"],
  bridal: ["wedding", "shaadi", "bridal sets"],
  gift: ["present", "gifting"],
  earring: ["jhumka", "chandbali", "studs", "earrings"],
  necklace: ["choker", "haar", "rani-haar", "necklaces", "polki", "kundan"],
  bracelet: ["bangle", "kara", "tennis", "bracelets"],
  ring: ["rings", "cocktail"],
  gold: ["golden", "antique"],
  pearl: ["moti", "pearls"],
  cheap: ["budget", "affordable", "under"],
  everyday: ["daily", "casual", "office"],
};

function expand(token: string): string[] {
  const out = new Set([token]);
  for (const [key, list] of Object.entries(SYNONYMS)) {
    if (key.startsWith(token) || token.startsWith(key)) out.add(key);
    for (const s of list) {
      if (s.includes(token) || token.includes(s)) {
        out.add(key);
        list.forEach((x) => out.add(x));
      }
    }
  }
  return [...out];
}

export type SearchResult = { product: Product; score: number };

export function smartSearch(
  products: Product[],
  query: string,
  limit = 6
): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  // Price intent: "under 5000", "below 3k", "less than 10000"
  let maxPrice = Infinity;
  const priceMatch = q.match(/(under|below|less than|upto|up to)\s*(?:rs)?\s*(\d+)\s*(k)?/);
  if (priceMatch) {
    maxPrice = parseInt(priceMatch[2], 10) * (priceMatch[3] ? 1000 : 1);
  }

  const tokens = q
    .replace(/(under|below|less than|upto|up to|rs)\s*\d*\s*k?/g, " ")
    .split(/[\s,]+/)
    .filter((t) => t.length > 1);
  const expanded = new Set(tokens.flatMap(expand));

  const results: SearchResult[] = products
    .map((product) => {
      if (product.price > maxPrice) return { product, score: -1 };
      const haystack = [
        product.name,
        product.tagline,
        product.category,
        product.collection,
        product.story,
        ...product.colors,
        ...product.features,
      ]
        .join(" ")
        .toLowerCase();

      let score = 0;
      for (const t of expanded) {
        if (!t) continue;
        if (product.name.toLowerCase().includes(t)) score += 5;
        if (product.category.toLowerCase().includes(t)) score += 4;
        if (product.collection.toLowerCase().includes(t)) score += 3;
        if (haystack.includes(t)) score += 1;
      }
      if (maxPrice !== Infinity && product.price <= maxPrice) score += 1;
      if (product.bestseller) score += 0.3;
      return { product, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return results;
}

export const trendingSearches = [
  "Bridal sets",
  "Jhumka earrings",
  "Polki choker",
  "Under 3000",
  "Gift for her",
];
