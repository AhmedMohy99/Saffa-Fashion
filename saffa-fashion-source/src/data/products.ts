export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  sizes: string[];
  images: string[];
  description: string;
}

/**
 * Placeholder catalogue for Saffa Fashion.
 * Swap the `images` URLs for real product photography and adjust
 * names / prices / copy freely — nothing here is load-bearing.
 */
export const PRODUCTS: Product[] = [
  {
    id: "signature-tote",
    name: "Signature Tote",
    price: 48,
    category: "Accessories",
    sizes: ["One Size"],
    images: [
      "https://picsum.photos/seed/saffa-tote-a/900/900",
      "https://picsum.photos/seed/saffa-tote-b/900/900",
      "https://picsum.photos/seed/saffa-tote-c/900/900",
    ],
    description:
      "Heavyweight organic-cotton carryall with a boxed base and reinforced straps. Roomy enough for the everyday, quiet enough for anywhere.",
  },
  {
    id: "kinetic-tee",
    name: "Kinetic Tee",
    price: 42,
    category: "Tops",
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://picsum.photos/seed/saffa-tee-a/900/900",
      "https://picsum.photos/seed/saffa-tee-b/900/900",
      "https://picsum.photos/seed/saffa-tee-c/900/900",
    ],
    description:
      "A relaxed boxy tee cut from mid-weight combed cotton with a ribbed collar that holds its shape wash after wash.",
  },
  {
    id: "core-cap",
    name: "Core Cap",
    price: 34,
    category: "Accessories",
    sizes: ["One Size"],
    images: [
      "https://picsum.photos/seed/saffa-cap-a/900/900",
      "https://picsum.photos/seed/saffa-cap-b/900/900",
    ],
    description:
      "Six-panel brushed-twill cap with an embroidered wordmark and an adjustable metal clasp. Structured, not stiff.",
  },
  {
    id: "atlas-hoodie",
    name: "Atlas Hoodie",
    price: 88,
    category: "Outerwear",
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://picsum.photos/seed/saffa-hoodie-a/900/900",
      "https://picsum.photos/seed/saffa-hoodie-b/900/900",
      "https://picsum.photos/seed/saffa-hoodie-c/900/900",
    ],
    description:
      "Brushed-back fleece hoodie with a double-layer hood, dropped shoulders and a kangaroo pocket. Weighty and warm.",
  },
  {
    id: "reverb-longsleeve",
    name: "Reverb Longsleeve",
    price: 56,
    category: "Tops",
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://picsum.photos/seed/saffa-long-a/900/900",
      "https://picsum.photos/seed/saffa-long-b/900/900",
    ],
    description:
      "Long-sleeve jersey with rib cuffs and a subtle sleeve print. Layer it or wear it on its own.",
  },
  {
    id: "field-bottle",
    name: "Field Bottle",
    price: 30,
    category: "Objects",
    sizes: ["500ml"],
    images: [
      "https://picsum.photos/seed/saffa-bottle-a/900/900",
      "https://picsum.photos/seed/saffa-bottle-b/900/900",
    ],
    description:
      "Insulated stainless-steel bottle with a powder-coated finish. Keeps cold for 24 hours, hot for 12.",
  },
  {
    id: "studio-crew",
    name: "Studio Crew",
    price: 72,
    category: "Outerwear",
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://picsum.photos/seed/saffa-crew-a/900/900",
      "https://picsum.photos/seed/saffa-crew-b/900/900",
      "https://picsum.photos/seed/saffa-crew-c/900/900",
    ],
    description:
      "Mid-weight crewneck sweatshirt with set-in sleeves and a clean, minimal front. An everyday staple.",
  },
  {
    id: "classic-tee",
    name: "Classic Tee",
    price: 38,
    category: "Tops",
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://picsum.photos/seed/saffa-classic-a/900/900",
      "https://picsum.photos/seed/saffa-classic-b/900/900",
    ],
    description:
      "The one you reach for. Straight hem, true-to-size fit, garment-washed for softness from day one.",
  },
  {
    id: "trace-longsleeve",
    name: "Trace Longsleeve",
    price: 58,
    category: "Tops",
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://picsum.photos/seed/saffa-trace-a/900/900",
      "https://picsum.photos/seed/saffa-trace-b/900/900",
    ],
    description:
      "Fine-gauge longsleeve with a slightly fitted body and extended cuffs. Understated and versatile.",
  },
  {
    id: "wave-beanie",
    name: "Wave Beanie",
    price: 32,
    category: "Accessories",
    sizes: ["One Size"],
    images: [
      "https://picsum.photos/seed/saffa-beanie-a/900/900",
      "https://picsum.photos/seed/saffa-beanie-b/900/900",
    ],
    description:
      "Ribbed knit beanie with a folded cuff and a woven tab. Soft, stretchy and warm without the bulk.",
  },
];
