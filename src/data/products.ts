export type Review = {
  name: string;
  city: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verified: boolean;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: "Necklaces" | "Earrings" | "Bracelets" | "Rings" | "Bridal Sets";
  collection: string;
  price: number; // PKR
  compareAt?: number; // PKR (original)
  currency: "PKR";
  badge?: string;
  featured?: boolean;
  bestseller?: boolean;
  rating: number;
  reviewCount: number;
  images: string[];
  colors: string[];
  story: string;
  features: string[];
  specs: { label: string; value: string }[];
  care: string[];
  inStock: boolean;
  reviews: Review[];
};

// High-end placeholder photography (Unsplash). Replace with your own studio shots.
const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

export const products: Product[] = [
  {
    id: "zf-001",
    slug: "noor-bridal-set",
    name: "Noor Bridal Set",
    tagline: "A crown of light for your most cherished day",
    category: "Bridal Sets",
    collection: "Shaadi Couture",
    price: 14500,
    compareAt: 19000,
    currency: "PKR",
    badge: "Bestseller",
    featured: true,
    bestseller: true,
    rating: 4.9,
    reviewCount: 214,
    images: [
      img("photo-1599643478518-a784e5dc4c8f"),
      img("photo-1611652022419-a9419f74343d"),
      img("photo-1535632066927-ab7c9ab60908"),
    ],
    colors: ["Antique Gold", "Rose Gold", "Kundan White"],
    story:
      "The Noor Bridal Set is our signature statement — a hand-finished maang tikka, choker and jhumka ensemble inspired by Mughal jharokha work. Each facet is set to catch candlelight, so you glow from across the room.",
    features: [
      "Complete 5-piece bridal ensemble",
      "Hand-set kundan & cubic zirconia stones",
      "Anti-tarnish 18k gold-plated brass",
      "Adjustable choker & sahara chains",
      "Presented in a velvet keepsake box",
    ],
    specs: [
      { label: "Material", value: "Gold-plated brass, kundan, CZ" },
      { label: "Plating", value: "18k anti-tarnish" },
      { label: "Pieces", value: "Tikka, choker, earrings, jhumar" },
      { label: "Weight", value: "~180g (set)" },
      { label: "Nickel-free", value: "Yes — skin safe" },
    ],
    care: [
      "Store in the velvet pouch, away from moisture.",
      "Apply perfume before wearing, never on the jewellery.",
      "Wipe gently with the enclosed microfibre cloth.",
    ],
    inStock: true,
    reviews: [
      {
        name: "Ayesha K.",
        city: "Lahore",
        rating: 5,
        date: "2026-05-18",
        title: "Looked more expensive than gold",
        body: "Wore this for my nikkah and had five people ask where it was from. The finish is unreal for the price.",
        verified: true,
      },
      {
        name: "Hira M.",
        city: "Karachi",
        rating: 5,
        date: "2026-04-02",
        title: "Packaging felt like a gift",
        body: "Came in a gorgeous velvet box. Delivery to Karachi took 3 days. Highly recommend.",
        verified: true,
      },
    ],
  },
  {
    id: "zf-002",
    slug: "gulnar-jhumka-earrings",
    name: "Gulnar Jhumka Earrings",
    tagline: "The swing of tradition, reimagined",
    category: "Earrings",
    collection: "Heritage",
    price: 3200,
    compareAt: 4500,
    currency: "PKR",
    badge: "New",
    featured: true,
    bestseller: true,
    rating: 4.8,
    reviewCount: 176,
    images: [
      img("photo-1630019852942-f89202989a59"),
      img("photo-1617038220319-276d3cfab638"),
      img("photo-1596944924616-7b38e7cfac36"),
    ],
    colors: ["Antique Gold", "Meenakari Red", "Emerald"],
    story:
      "Gulnar jhumkas carry the weight of tradition without the weight on your ears — feather-light domes finished in hand-painted meenakari and a fringe of pearl drops.",
    features: [
      "Feather-light hollow dome construction",
      "Hand-painted meenakari enamel",
      "Freshwater-style pearl fringe",
      "Secure push-back closure",
    ],
    specs: [
      { label: "Material", value: "Gold-plated alloy, enamel, pearl" },
      { label: "Drop length", value: "6.5 cm" },
      { label: "Closure", value: "Push-back" },
      { label: "Weight", value: "~14g (pair)" },
    ],
    care: [
      "Keep enamel away from harsh chemicals.",
      "Store flat to protect the pearl fringe.",
    ],
    inStock: true,
    reviews: [
      {
        name: "Sana R.",
        city: "Islamabad",
        rating: 5,
        date: "2026-06-01",
        title: "So light I forgot I had them on",
        body: "Perfect for a full day of Eid visits. Zero ear pain.",
        verified: true,
      },
    ],
  },
  {
    id: "zf-003",
    slug: "meher-polki-choker",
    name: "Meher Polki Choker",
    tagline: "Old-world polki, everyday grace",
    category: "Necklaces",
    collection: "Shaadi Couture",
    price: 8900,
    compareAt: 11500,
    currency: "PKR",
    featured: true,
    bestseller: true,
    rating: 4.9,
    reviewCount: 132,
    images: [
      img("photo-1602751584552-8ba73aad10e1"),
      img("photo-1535556116002-6281ff3e9f36"),
      img("photo-1611591437281-460bfbe1220a"),
    ],
    colors: ["Uncut Polki", "Champagne", "Ivory Pearl"],
    story:
      "A polki-style choker that sits close to the neckline — designed to elevate a simple sari or lawn kurta into an occasion in seconds.",
    features: [
      "Uncut polki-style stones",
      "Adjustable dori for a custom fit",
      "Matching stud earrings included",
      "Anti-tarnish finish",
    ],
    specs: [
      { label: "Material", value: "Brass, polki-style glass, CZ" },
      { label: "Length", value: "Adjustable 30–38 cm" },
      { label: "Set", value: "Choker + earrings" },
      { label: "Weight", value: "~95g" },
    ],
    care: ["Remove before sleeping and bathing.", "Store in provided pouch."],
    inStock: true,
    reviews: [
      {
        name: "Mahnoor A.",
        city: "Faisalabad",
        rating: 5,
        date: "2026-03-22",
        title: "Elevated my whole outfit",
        body: "I wear this with plain kurtas and get compliments every time.",
        verified: true,
      },
    ],
  },
  {
    id: "zf-004",
    slug: "sadaf-pearl-bracelet",
    name: "Sadaf Pearl Bracelet",
    tagline: "Quiet luxury for the wrist",
    category: "Bracelets",
    collection: "Everyday Luxe",
    price: 2400,
    currency: "PKR",
    badge: "New",
    featured: true,
    rating: 4.7,
    reviewCount: 88,
    images: [
      img("photo-1611085583191-a3b181a88401"),
      img("photo-1573408301185-9146fe634ad0"),
      img("photo-1515562141207-7a88fb7ce338"),
    ],
    colors: ["Ivory Pearl", "Grey Pearl", "Rose"],
    story:
      "Sadaf pairs shell pearls with a whisper-thin gold chain — the kind of piece you never take off.",
    features: [
      "Shell pearl & gold-plated chain",
      "Adjustable lobster clasp",
      "Tarnish-resistant finish",
    ],
    specs: [
      { label: "Material", value: "Shell pearl, gold-plated brass" },
      { label: "Length", value: "Adjustable 16–20 cm" },
      { label: "Weight", value: "~8g" },
    ],
    care: ["Avoid contact with lotions and perfume."],
    inStock: true,
    reviews: [
      {
        name: "Zoya H.",
        city: "Rawalpindi",
        rating: 5,
        date: "2026-05-30",
        title: "Dainty and elegant",
        body: "Perfect everyday piece. Feels premium.",
        verified: true,
      },
    ],
  },
  {
    id: "zf-005",
    slug: "roshni-statement-ring",
    name: "Roshni Statement Ring",
    tagline: "One ring, all eyes",
    category: "Rings",
    collection: "Everyday Luxe",
    price: 1800,
    compareAt: 2600,
    currency: "PKR",
    rating: 4.6,
    reviewCount: 64,
    images: [
      img("photo-1605100804763-247f67b3557e"),
      img("photo-1603561591411-07134e71a2a9"),
    ],
    colors: ["Gold", "Rose Gold"],
    story:
      "A sculptural cocktail ring crowned with a solitaire-cut zirconia — understated from afar, dazzling up close.",
    features: [
      "Solitaire-cut cubic zirconia",
      "Adjustable band fits most sizes",
      "Hypoallergenic finish",
    ],
    specs: [
      { label: "Material", value: "Gold-plated brass, CZ" },
      { label: "Band", value: "Adjustable" },
      { label: "Weight", value: "~6g" },
    ],
    care: ["Remove before washing hands frequently."],
    inStock: true,
    reviews: [],
  },
  {
    id: "zf-006",
    slug: "afreen-kundan-necklace",
    name: "Afreen Kundan Necklace",
    tagline: "Regal drama for the reception",
    category: "Necklaces",
    collection: "Shaadi Couture",
    price: 10500,
    compareAt: 13500,
    currency: "PKR",
    rating: 4.9,
    reviewCount: 97,
    images: [
      img("photo-1620656798932-902cc7e2c1a1"),
      img("photo-1608042314453-ae338d80c427"),
    ],
    colors: ["Kundan Gold", "Emerald", "Ruby"],
    story:
      "A layered kundan rani-haar that commands attention — built for the walima entrance you'll remember forever.",
    features: [
      "Layered rani-haar silhouette",
      "Kundan & coloured-stone detailing",
      "Matching earrings & tikka included",
    ],
    specs: [
      { label: "Material", value: "Brass, kundan, glass stones" },
      { label: "Set", value: "Necklace + earrings + tikka" },
      { label: "Weight", value: "~150g" },
    ],
    care: ["Store flat in the keepsake box."],
    inStock: true,
    reviews: [],
  },
  {
    id: "zf-007",
    slug: "laila-chandbali-earrings",
    name: "Laila Chandbali Earrings",
    tagline: "The moon, worn well",
    category: "Earrings",
    collection: "Heritage",
    price: 2900,
    currency: "PKR",
    rating: 4.8,
    reviewCount: 71,
    images: [
      img("photo-1588444650733-d0767b753fef"),
      img("photo-1573408301185-9146fe634ad0"),
    ],
    colors: ["Antique Gold", "Silver"],
    story:
      "Crescent chandbalis with a delicate pearl fringe — a timeless silhouette that flatters every face.",
    features: ["Crescent chandbali shape", "Pearl fringe", "Push-back closure"],
    specs: [
      { label: "Material", value: "Gold-plated alloy, pearl" },
      { label: "Drop length", value: "5.5 cm" },
      { label: "Weight", value: "~12g (pair)" },
    ],
    care: ["Keep away from moisture."],
    inStock: true,
    reviews: [],
  },
  {
    id: "zf-008",
    slug: "yasmin-tennis-bracelet",
    name: "Yasmin Tennis Bracelet",
    tagline: "A line of light",
    category: "Bracelets",
    collection: "Everyday Luxe",
    price: 3600,
    compareAt: 4900,
    currency: "PKR",
    rating: 4.7,
    reviewCount: 53,
    images: [
      img("photo-1611955167811-4711904bb9f8"),
      img("photo-1515562141207-7a88fb7ce338"),
    ],
    colors: ["Gold", "Silver"],
    story:
      "A classic tennis bracelet lined with brilliant-cut zirconia — the definition of effortless sparkle.",
    features: ["Brilliant-cut CZ line", "Secure box clasp", "Anti-tarnish"],
    specs: [
      { label: "Material", value: "Gold-plated brass, CZ" },
      { label: "Length", value: "18 cm" },
      { label: "Weight", value: "~15g" },
    ],
    care: ["Wipe after each wear."],
    inStock: true,
    reviews: [],
  },
];

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);

export const featuredProducts = products.filter((p) => p.featured);

export const relatedProducts = (product: Product, count = 4) =>
  products
    .filter((p) => p.id !== product.id && p.collection === product.collection)
    .concat(products.filter((p) => p.id !== product.id))
    .filter((p, i, arr) => arr.findIndex((x) => x.id === p.id) === i)
    .slice(0, count);

export const categories = [
  "Necklaces",
  "Earrings",
  "Bracelets",
  "Rings",
  "Bridal Sets",
] as const;

export const collections = [
  {
    slug: "shaadi-couture",
    name: "Shaadi Couture",
    description: "Bridal statement pieces for the big day.",
    image: img("photo-1599643478518-a784e5dc4c8f"),
  },
  {
    slug: "heritage",
    name: "Heritage",
    description: "Traditional silhouettes, reimagined light.",
    image: img("photo-1630019852942-f89202989a59"),
  },
  {
    slug: "everyday-luxe",
    name: "Everyday Luxe",
    description: "Quiet luxury for every day.",
    image: img("photo-1611085583191-a3b181a88401"),
  },
];

export const formatPKR = (amount: number) =>
  `Rs ${amount.toLocaleString("en-PK")}`;
