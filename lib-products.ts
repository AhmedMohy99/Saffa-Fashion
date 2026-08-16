export type ProductCategory = 'summer' | 'winter';

export type ProductKind =
  | 'two-piece'
  | 'long-shirt'
  | 'blazer-dress'
  | 'formal-suite';

export type ProductSize = 'L' | 'XL' | 'FREE SIZE';

export type Product = {
  slug: string;
  name: string;
  arName: string;
  color: string;
  arColor: string;
  image: string;
  description: string;
  arDescription: string;
  category: ProductCategory;
  kind: ProductKind;
  price: number;
  originalPrice?: number;
  saleLabel?: string;
  sizeOptions: ProductSize[];
  sizeInfo: Record<string, string>;
  material?: string;
  arMaterial?: string;
  availableForInspection?: boolean;
};

const PRODUCT_PATH = '/product/most-practical-dress/';

const twoPieceSizes: ProductSize[] = ['L', 'XL'];

const twoPieceSizeInfo: Record<string, string> = {
  L: '55–75 kg',
  XL: '76–110 kg',
};

const twoPieceDescription =
  'The Most Practical Dress is a two-piece modest set consisting of a dress with an elasticated waist and an oversized blouse. Each piece can be worn separately, or both pieces can be styled together for a complete, practical look.';

const twoPieceArDescription =
  'دريس قطعتين مكون من (دريس كَــت بأستيك من الوسط + بلوزة أوفر سايز). تقدري تستغلي كل قطعة لوحدها أو تلبسي القطعتين على بعض لستايل كامل وعملي جداً.';

export const products: Product[] = [
  {
    slug: 'most-practical-dress-olive',
    name: 'The Most Practical Dress',
    arName: 'الدريس القطعتين',
    color: 'Olive',
    arColor: 'زيتي',
    // Olive is intentionally the first/default advertised color.
    // Upload the real Olive image using this exact filename.
    image: `${PRODUCT_PATH}olive.png`,
    description: twoPieceDescription,
    arDescription: twoPieceArDescription,
    category: 'summer',
    kind: 'two-piece',
    price: 600,
    originalPrice: 800,
    // Keep the campaign label exactly as supplied by the brand.
    // Although 600 vs 800 is mathematically a 25% reduction, the requested
    // marketing offer is 20% OFF / SALE, so we do not recalculate it.
    saleLabel: 'SALE 20%',
    sizeOptions: twoPieceSizes,
    sizeInfo: twoPieceSizeInfo,
    material: 'Imported Freska linen',
    arMaterial: 'كتان فريسكا مستورد',
    availableForInspection: true,
  },
];

export const SIZE_INFO = {
  L: '55–75 kg',
  XL: '76–110 kg',
} as const;

export const PRICE = 600;
