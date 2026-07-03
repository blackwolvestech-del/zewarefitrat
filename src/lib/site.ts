export const site = {
  name: "ZEWARE FITRAT",
  nameUrdu: "زیورِ فطرت",
  tagline: "Premium Artificial & Fashion Jewellery",
  description:
    "ZEWARE FITRAT crafts premium artificial and fashion jewellery for weddings, parties and everyday elegance across Pakistan. Anti-tarnish, skin-safe, and delivered nationwide with Cash on Delivery.",
  url: "https://www.zewarefitrat.com",
  locale: "en_PK",
  currency: "PKR",
  email: "care@zewarefitrat.com",
  phone: "+92 300 0000000",
  whatsapp: "923000000000",
  address: "Lahore, Pakistan",
  social: {
    instagram: "https://instagram.com/zewarefitrat",
    facebook: "https://facebook.com/zewarefitrat",
    tiktok: "https://tiktok.com/@zewarefitrat",
  },
  shipping: {
    freeThreshold: 5000,
    flatRate: 250,
    codFee: 0,
    deliveryDays: "2–4 working days",
  },
} as const;

export const nav = [
  { label: "Shop All", href: "/shop" },
  { label: "Bridal", href: "/shop?collection=shaadi-couture" },
  { label: "Necklaces", href: "/shop?category=Necklaces" },
  { label: "Earrings", href: "/shop?category=Earrings" },
  { label: "Our Story", href: "/about" },
];
