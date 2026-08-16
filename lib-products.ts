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

const TWO_PIECE_PATH = '/product/most-practical-dress/';
const LONG_CHEMISE_PATH = '/product/long-chemise/';

const twoPieceSizes: ProductSize[] = ['L', 'XL'];

const twoPieceSizeInfo: Record<string, string> = {
  L: '55–75 kg',
  XL: '76–110 kg',
};

const twoPieceDescription =
  'The Most Practical Dress is a 2-in-1 two-piece set made from imported Freska linen. It includes an oversized blouse and a dress with an elasticated waist. Each piece can be worn separately, or both pieces can be styled together for a complete, practical and versatile look.';

const twoPieceArDescription = `✨ **دريس 2 في 1 – الأناقة والعملية في طقم واحد!**

تصميم ذكي يمنحكِ أقصى درجات الراحة والمرونة لتنسيق أكثر من إطلالة بكل سهولة.

**تفاصيل التصميم:**

- **بلوزة أوفر سايز (Oversized):** بتصميم عصري ومريح يناسب يومكِ بأسلوب راقٍ.
- **دريس بأستيك مرن من الوسط:** يحدد الخصر بشكل مريح وأنيق دون أي تقييد للحركة.
- **حرية التنسيق:** اعتمدي كل قطعة منفردة لتنسيقات مختلفة، أو اجمعيهما معاً لإطلالة متكاملة، عملية، وجذابة.

**الخامة:**

- **كتان فريسكا مستورد:** خامة فاخرة عالية الجودة، خفيفة على البشرة، وتضمن لكِ الراحة والانتعاش طوال اليوم.

**جدول المقاسات:**

- **L:** مناسب من 55 إلى 75 كجم
- **XL:** مناسب من 76 إلى 110 كجم`;

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
  arMaterial: 'كتان فريسكا مستورده',
  availableForInspection: true,
};

const longChemiseDescription =
  'The Joyful Dress is an elegant and comfortable long chemise / shirt dress made from textured printed linen. It comes with a waist belt that defines the silhouette and gives the dress a flattering, modern shape. Free size up to 110 kg.';

const longChemiseArDescription =
  'لونج شميز / شميز دريس أنيق ومريح، من كتان طباعة بارزة، مزود بحزام من الوسط عشان يحدد القوام وياخد شكل الجسم بأسلوب مبهج وعصري.';

const longChemiseSizeInfo: Record<string, string> = {
  'FREE SIZE': 'Up to 110 kg',
};

const longChemiseSharedFields = {
  description: longChemiseDescription,
  arDescription: longChemiseArDescription,
  category: 'summer' as ProductCategory,
  kind: 'long-shirt' as ProductKind,
  price: 700,
  originalPrice: 950,
  saleLabel: 'SALE 20%',
  sizeOptions: ['FREE SIZE'] as ProductSize[],
  sizeInfo: longChemiseSizeInfo,
  material: 'Textured printed linen',
  arMaterial: 'كتان طباعة بارزة',
  availableForInspection: true,
};

/**
 * Product variants are ordered by the brand's preferred/default color.
 * Every color has its own image path so the UI can switch images by color.
 */
export const products: Product[] = [
  // =========================================================
  // THE MOST PRACTICAL DRESS — الدريس القطعتين
  // =========================================================
  {
    slug: 'most-practical-dress-olive',
    name: 'The Most Practical Dress',
    arName: 'الدريس القطعتين',
    color: 'Olive',
    arColor: 'زيتي',
    image: `${TWO_PIECE_PATH}olive.png`,
    ...twoPieceSharedFields,
  },
  {
    slug: 'most-practical-dress-brown',
    name: 'The Most Practical Dress',
    arName: 'الدريس القطعتين',
    color: 'Brown',
    arColor: 'بني',
    image: `${TWO_PIECE_PATH}Brown.jpg`,
    ...twoPieceSharedFields,
  },
  {
    slug: 'most-practical-dress-beige',
    name: 'The Most Practical Dress',
    arName: 'الدريس القطعتين',
    color: 'Beige',
    arColor: 'بيج',
    image: `${TWO_PIECE_PATH}Beige.jpg`,
    ...twoPieceSharedFields,
  },
  {
    slug: 'most-practical-dress-burgundy',
    name: 'The Most Practical Dress',
    arName: 'الدريس القطعتين',
    color: 'Burgundy',
    arColor: 'برجاندي',
    image: `${TWO_PIECE_PATH}Burgundy.jpg`,
    ...twoPieceSharedFields,
  },
  {
    slug: 'most-practical-dress-baby-blue',
    name: 'The Most Practical Dress',
    arName: 'الدريس القطعتين',
    color: 'Baby Blue',
    arColor: 'بيبي بلو',
    image: `${TWO_PIECE_PATH}Baby-Blue.jpg`,
    ...twoPieceSharedFields,
  },
  {
    slug: 'most-practical-dress-kiwi',
    name: 'The Most Practical Dress',
    arName: 'الدريس القطعتين',
    color: 'Kiwi',
    arColor: 'كيوي',
    image: `${TWO_PIECE_PATH}Kiwi.jpg`,
    ...twoPieceSharedFields,
  },

  // =========================================================
  // THE JOYFUL DRESS — الفستان المبهج / LONG CHEMISE
  // =========================================================
  {
    slug: 'joyful-dress-beige',
    name: 'The Joyful Dress',
    arName: 'الفستان المبهج',
    color: 'Beige',
    arColor: 'بيج',
    image: `${LONG_CHEMISE_PATH}Beige.jpg`,
    ...longChemiseSharedFields,
  },
  {
    slug: 'joyful-dress-burgundy',
    name: 'The Joyful Dress',
    arName: 'الفستان المبهج',
    color: 'Burgundy',
    arColor: 'برجاندي',
    image: `${LONG_CHEMISE_PATH}Burgundy.jpg`,
    ...longChemiseSharedFields,
  },
  {
    slug: 'joyful-dress-turquoise',
    name: 'The Joyful Dress',
    arName: 'الفستان المبهج',
    color: 'Turquoise',
    arColor: 'فيروزي',
    image: `${LONG_CHEMISE_PATH}Turquoise.jpg`,
    ...longChemiseSharedFields,
  },
  {
    slug: 'joyful-dress-denim-blue',
    name: 'The Joyful Dress',
    arName: 'الفستان المبهج',
    color: 'Denim Blue',
    arColor: 'أزرق جينز',
    image: `${LONG_CHEMISE_PATH}Denim-Blue.jpg`,
    ...longChemiseSharedFields,
  },
  {
    slug: 'joyful-dress-pink',
    name: 'The Joyful Dress',
    arName: 'الفستان المبهج',
    color: 'Pink',
    arColor: 'بينك',
    image: `${LONG_CHEMISE_PATH}Pink.jpg`,
    ...longChemiseSharedFields,
  },
];

export const SIZE_INFO = {
  L: '55–75 kg',
  XL: '76–110 kg',
} as const;

export const PRICE = 600;
