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
  images?: string[];
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
// IMPORTANT: the GitHub folder is named `long-chemis` (without the final `e`).
const LONG_CHEMISE_PATH = '/product/long-chemis/';
const VELVET_BLAZER_DRESS_PATH = '/product/velvet-blazer-dress/';

const twoPieceSizes: ProductSize[] = ['L', 'XL'];

const twoPieceSizeInfo: Record<string, string> = {
  L: '55–75 kg',
  XL: '76–110 kg',
};

const twoPieceDescription =
  'The Most Practical Dress is a 2-in-1 two-piece set made from imported Freska linen. It includes an oversized blouse and a dress with an elasticated waist. Each piece can be worn separately, or both pieces can be styled together for a complete, practical and versatile look.';

const twoPieceArDescription = `✨ دريس 2 في 1 – الأناقة والعملية في طقم واحد!

تصميم ذكي يمنحكِ أقصى درجات الراحة والمرونة لتنسيق أكثر من إطلالة بكل سهولة.

تفاصيل التصميم:

بلوزة أوفر سايز (Oversized): بتصميم عصري ومريح يناسب يومكِ بأسلوب راقٍ.

دريس بأستيك مرن من الوسط: يحدد الخصر بشكل مريح وأنيق دون أي تقييد للحركة.

حرية التنسيق: اعتمدي كل قطعة منفردة لتنسيقات مختلفة، أو اجمعيهما معاً لإطلالة متكاملة، عملية، وجذابة.

الخامة:

كتان فريسكا مستورد: خامة فاخرة عالية الجودة، خفيفة على البشرة، وتضمن لكِ الراحة والانتعاش طوال اليوم.

جدول المقاسات:

L: مناسب من 55 إلى 75 كجم
XL: مناسب من 76 إلى 110 كجم`;

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
  'The Joyful Dress is an elegant and comfortable Long Chemise / Shirt Dress made from textured printed linen. It comes with a waist belt that defines the silhouette and gives the dress a flattering, modern shape. Free size up to 110 kg.';

const longChemiseArDescription = `لونج شميز / شميز دريس أنيق ومريح، بتصميم مبهج وعصري.

تفاصيل التصميم:

لونج شميز أو شميز دريس بتصميم أنيق ومريح، مزود بحزام من الوسط عشان يحدد القوام وياخد شكل الجسم بطريقة أنيقة ومريحة.

الخامة:

كتان طباعة بارزة، بخامة مميزة تضيف شكل وملمس أنيق للتصميم.

المقاس:

Free Size: يلبس حتى 110 كيلو.`;

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

const velvetBlazerDressDescription =
  'Velvet Blazer Dress combines the luxury of soft imported velvet with the structure and elegance of a modern blazer. Its fitted waist creates a polished silhouette, while the gold stainless-steel buttons add a refined finishing touch. Wear it closed as a complete dress or open as an elegant cardigan.';

const velvetBlazerDressArDescription = `✨ فستان بليزر قطيفة – الأناقة الفاخرة في إطلالة واحدة!

تصميم يجمع بين فخامة القطيفة وأناقة البليزر العصرية، ليمنحكِ إطلالة راقية وجذابة في مختلف المناسبات.

مميزات التصميم:

قصّة مجسّمة وأنيقة: مزوّد بحزام ثابت عند الوسط لتحديد القوام وتجسيم الجسم بشكل مريح وجذاب.

لمسة ذهبية فاخرة: مزيّن بأزرار استانلس ذهبية مقاومة لتغيّر اللون، تضيف رونقاً وفخامة استثنائية.

مرونة في التنسيق: يمكن ارتداؤه مقفولاً كدريس كامل أو تنسيقه مفتوحاً ككارديجان راقٍ.

المواصفات:

الخامة: قطيفة مستوردة ناعمة جداً عالية الجودة تمنحكِ الدفء والراحة.

المقاس: وان سايز (Free Size) مريح يلبس حتى 90 كجم.

العرض الخاص:

السعر: 1,200 جنيه فقط بدلاً من 1,500 جنيه.`;

const velvetBlazerDressSharedFields = {
  description: velvetBlazerDressDescription,
  arDescription: velvetBlazerDressArDescription,
  category: 'winter' as ProductCategory,
  kind: 'blazer-dress' as ProductKind,
  price: 1200,
  originalPrice: 1500,
  saleLabel: 'SPECIAL OFFER · SALE 20%',
  sizeOptions: ['FREE SIZE'] as ProductSize[],
  sizeInfo: {
    'FREE SIZE': 'Up to 90 kg',
  },
  material: 'Imported premium velvet',
  arMaterial: 'قطيفة مستوردة ناعمة جداً عالية الجودة',
  availableForInspection: true,
};

export const products: Product[] = [
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
  {
    slug: 'joyful-dress-beige',
    name: 'The Joyful Dress',
    arName: 'الفستان المبهج',
    color: 'Beige',
    arColor: 'بيج',
    image: `${LONG_CHEMISE_PATH}Beige.png`,
    ...longChemiseSharedFields,
  },
  {
    slug: 'joyful-dress-burgundy',
    name: 'The Joyful Dress',
    arName: 'الفستان المبهج',
    color: 'Burgundy',
    arColor: 'برجاندي',
    image: `${LONG_CHEMISE_PATH}Burgundy.png`,
    ...longChemiseSharedFields,
  },
  {
    slug: 'joyful-dress-turquoise',
    name: 'The Joyful Dress',
    arName: 'الفستان المبهج',
    color: 'Turquoise',
    arColor: 'فيروزي',
    image: `${LONG_CHEMISE_PATH}Turquoise.png`,
    ...longChemiseSharedFields,
  },
  {
    slug: 'joyful-dress-denim-blue',
    name: 'The Joyful Dress',
    arName: 'الفستان المبهج',
    color: 'Denim Blue',
    arColor: 'أزرق جينز',
    image: `${LONG_CHEMISE_PATH}Denim-Blue.png`,
    ...longChemiseSharedFields,
  },
  {
    slug: 'joyful-dress-pink',
    name: 'The Joyful Dress',
    arName: 'الفستان المبهج',
    color: 'Pink',
    arColor: 'بينك',
    image: `${LONG_CHEMISE_PATH}Pink.png`,
    ...longChemiseSharedFields,
  },
  {
    slug: 'velvet-blazer-dress',
    name: 'Velvet Blazer Dress',
    arName: 'فستان بليزر قطيفة',
    color: 'Black',
    arColor: 'أسود',
    image: `${VELVET_BLAZER_DRESS_PATH}velvet-blazer-dress-01.jpg`,
    images: [
      `${VELVET_BLAZER_DRESS_PATH}velvet-blazer-dress-01.jpg`,
      `${VELVET_BLAZER_DRESS_PATH}velvet-blazer-dress-02.jpg`,
    ],
    ...velvetBlazerDressSharedFields,
  },
];

export const SIZE_INFO = {
  L: '55–75 kg',
  XL: '76–110 kg',
} as const;

export const PRICE = 600;
