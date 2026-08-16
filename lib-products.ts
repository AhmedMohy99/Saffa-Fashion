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

const twoPieceSharedFields = {
  description: twoPieceDescription,
  arDescription: twoPieceArDescription,
  category: 'summer' as ProductCategory,
  kind: 'two-piece' as ProductKind,
  price: 600,
  originalPrice: 800,
  saleLabel: 'SALE 20%',
  sizeOptions: twoPieceSizes,
  sizeInfo: twoPieceSizeInfo,
  material: 'Imported Freska linen',
  arMaterial: 'كتان فريسكا مستورد',
  availableForInspection: true,
};

/**
 * The product colors are ordered intentionally.
 * Olive is the first/default advertised color.
 * Each color points to its own real uploaded image.
 */
export const products: Product[] = [
  {
    slug: 'most-practical-dress-olive',
    name: 'The Most Practical Dress',
    arName: 'الدريس القطعتين',
    color: 'Olive',
    arColor: 'زيتي',
    image: `${PRODUCT_PATH}olive.png`,
    ...twoPieceSharedFields,
  },
  {
    slug: 'most-practical-dress-brown',
    name: 'The Most Practical Dress',
    arName: 'الدريس القطعتين',
    color: 'Brown',
    arColor: 'بني',
    image: `${PRODUCT_PATH}Brown.jpg`,
    ...twoPieceSharedFields,
  },
  {
    slug: 'most-practical-dress-beige',
    name: 'The Most Practical Dress',
    arName: 'الدريس القطعتين',
    color: 'Beige',
    arColor: 'بيج',
    image: `${PRODUCT_PATH}Beige.jpg`,
    ...twoPieceSharedFields,
  },
  {
    slug: 'most-practical-dress-burgundy',
    name: 'The Most Practical Dress',
    arName: 'الدريس القطعتين',
    color: 'Burgundy',
    arColor: 'برجاندي',
    image: `${PRODUCT_PATH}Burgundy.jpg`,
    ...twoPieceSharedFields,
  },
  {
    slug: 'most-practical-dress-baby-blue',
    name: 'The Most Practical Dress',
    arName: 'الدريس القطعتين',
    color: 'Baby Blue',
    arColor: 'بيبي بلو',
    image: `${PRODUCT_PATH}Baby-Blue.jpg`,
    ...twoPieceSharedFields,
  },
  {
    slug: 'most-practical-dress-kiwi',
    name: 'The Most Practical Dress',
    arName: 'الدريس القطعتين',
    color: 'Kiwi',
    arColor: 'كيوي',
    image: `${PRODUCT_PATH}Kiwi.jpg`,
    ...twoPieceSharedFields,
  },
];

export const SIZE_INFO = {
  L: '55–75 kg',
  XL: '76–110 kg',
} as const;

export const PRICE = 600;
