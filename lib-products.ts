export type ProductCategory = 'summer' | 'winter';
export type ProductKind = 'two-piece' | 'long-shirt' | 'blazer-dress' | 'formal-suite';
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

const twoPieceSizes = ['L', 'XL'] as ProductSize[];
const twoPieceSizeInfo = { L: '55–75 kg', XL: '76–110 kg' };

const twoPieceDescription = 'A practical two-piece modest dress made from imported Freska linen. It includes an oversized blouse worn over a dress with an elasticated waist. Each piece can also be worn separately, giving you more than one look from the same set.';
const twoPieceArDescription = 'دريس عملي قطعتين من كتان فريسكا مستورد، يتكون من بلوزة أوفر سايز فوق دريس بكسرات وأستيك من الوسط. يمكن ارتداء كل قطعة بمفردها، ليمنحك أكثر من إطلالة من نفس الطقم.';

const longShirtDescription = 'A joyful long shirt dress made from textured printed linen, finished with a waist belt to define the silhouette. Free size up to 110 kg.';
const longShirtArDescription = 'لونج شميز من كتان بطباعة بارزة، مع حزام من الوسط ليأخذ شكل الجسم. فري سايز حتى 110 كجم، ويمكن ارتداؤه كلونج شميز أو شميز دريس.';

export const products: Product[] = [
  { slug:'most-practical-beige', name:'The Most Practical Dress', arName:'The Most Practical Dress', color:'Beige', arColor:'بيج', image:'/products/The Sleeveless Dress Beige.png', description:twoPieceDescription, arDescription:twoPieceArDescription, category:'summer', kind:'two-piece', price:600, originalPrice:800, saleLabel:'SALE 25%', sizeOptions:twoPieceSizes, sizeInfo:twoPieceSizeInfo, material:'Imported Freska linen', arMaterial:'كتان فريسكا مستورد', availableForInspection:true },
  { slug:'most-practical-brown', name:'The Most Practical Dress', arName:'The Most Practical Dress', color:'Brown', arColor:'بني', image:'/products/The Sleeveless Dress Brown.png', description:twoPieceDescription, arDescription:twoPieceArDescription, category:'summer', kind:'two-piece', price:600, originalPrice:800, saleLabel:'SALE 25%', sizeOptions:twoPieceSizes, sizeInfo:twoPieceSizeInfo, material:'Imported Freska linen', arMaterial:'كتان فريسكا مستورد', availableForInspection:true },
  { slug:'most-practical-burgundy', name:'The Most Practical Dress', arName:'The Most Practical Dress', color:'Burgundy', arColor:'برجاندي', image:'/products/The Sleeveless Dress Burgundy.png', description:twoPieceDescription, arDescription:twoPieceArDescription, category:'summer', kind:'two-piece', price:600, originalPrice:800, saleLabel:'SALE 25%', sizeOptions:twoPieceSizes, sizeInfo:twoPieceSizeInfo, material:'Imported Freska linen', arMaterial:'كتان فريسكا مستورد', availableForInspection:true },
  { slug:'most-practical-olive', name:'The Most Practical Dress', arName:'The Most Practical Dress', color:'Olive', arColor:'زيتي', image:'/products/The Sleeveless Dress Dark Green.png', description:twoPieceDescription, arDescription:twoPieceArDescription, category:'summer', kind:'two-piece', price:600, originalPrice:800, saleLabel:'SALE 25%', sizeOptions:twoPieceSizes, sizeInfo:twoPieceSizeInfo, material:'Imported Freska linen', arMaterial:'كتان فريسكا مستورد', availableForInspection:true },
  { slug:'most-practical-baby-blue', name:'The Most Practical Dress', arName:'The Most Practical Dress', color:'Baby Blue', arColor:'بيبي بلو', image:'/products/The Sleeveless Dress Light Blue.png', description:twoPieceDescription, arDescription:twoPieceArDescription, category:'summer', kind:'two-piece', price:600, originalPrice:800, saleLabel:'SALE 25%', sizeOptions:twoPieceSizes, sizeInfo:twoPieceSizeInfo, material:'Imported Freska linen', arMaterial:'كتان فريسكا مستورد', availableForInspection:true },
  { slug:'most-practical-kiwi', name:'The Most Practical Dress', arName:'The Most Practical Dress', color:'Kiwi', arColor:'كيوي', image:'/products/The Two-Piece Dress Dark Teal.png', description:twoPieceDescription, arDescription:twoPieceArDescription, category:'summer', kind:'two-piece', price:600, originalPrice:800, saleLabel:'SALE 25%', sizeOptions:twoPieceSizes, sizeInfo:twoPieceSizeInfo, material:'Imported Freska linen', arMaterial:'كتان فريسكا مستورد', availableForInspection:true },
  { slug:'joyful-beige', name:'The Joyful Dress', arName:'الفستان المبهج', color:'Beige', arColor:'بيج', image:'/products/product-coming-soon.svg', description:longShirtDescription, arDescription:longShirtArDescription, category:'summer', kind:'long-shirt', price:700, originalPrice:950, saleLabel:'SALE 26%', sizeOptions:['FREE SIZE'], sizeInfo:{'FREE SIZE':'Up to 110 kg'}, material:'Textured printed linen', arMaterial:'كتان بطباعة بارزة', availableForInspection:true },
  { slug:'joyful-burgundy', name:'The Joyful Dress', arName:'الفستان المبهج', color:'Burgundy', arColor:'برجاندي', image:'/products/The Basic Dress Burgundy.png', description:longShirtDescription, arDescription:longShirtArDescription, category:'summer', kind:'long-shirt', price:700, originalPrice:950, saleLabel:'SALE 26%', sizeOptions:['FREE SIZE'], sizeInfo:{'FREE SIZE':'Up to 110 kg'}, material:'Textured printed linen', arMaterial:'كتان بطباعة بارزة', availableForInspection:true },
  { slug:'joyful-turquoise', name:'The Joyful Dress', arName:'الفستان المبهج', color:'Turquoise', arColor:'فيروزي', image:'/products/The Basic Dress Light Blue.png', description:longShirtDescription, arDescription:longShirtArDescription, category:'summer', kind:'long-shirt', price:700, originalPrice:950, saleLabel:'SALE 26%', sizeOptions:['FREE SIZE'], sizeInfo:{'FREE SIZE':'Up to 110 kg'}, material:'Textured printed linen', arMaterial:'كتان بطباعة بارزة', availableForInspection:true },
  { slug:'joyful-denim', name:'The Joyful Dress', arName:'الفستان المبهج', color:'Denim Blue', arColor:'أزرق جينز', image:'/products/The Basic Dress Denim.png', description:longShirtDescription, arDescription:longShirtArDescription, category:'summer', kind:'long-shirt', price:700, originalPrice:950, saleLabel:'SALE 26%', sizeOptions:['FREE SIZE'], sizeInfo:{'FREE SIZE':'Up to 110 kg'}, material:'Textured printed linen', arMaterial:'كتان بطباعة بارزة', availableForInspection:true },
  { slug:'joyful-pink', name:'The Joyful Dress', arName:'الفستان المبهج', color:'Pink', arColor:'بينك', image:'/products/The Basic Dress Lilac.png', description:longShirtDescription, arDescription:longShirtArDescription, category:'summer', kind:'long-shirt', price:700, originalPrice:950, saleLabel:'SALE 26%', sizeOptions:['FREE SIZE'], sizeInfo:{'FREE SIZE':'Up to 110 kg'}, material:'Textured printed linen', arMaterial:'كتان بطباعة بارزة', availableForInspection:true },
  { slug:'blazer-dress', name:'Blazer Dress', arName:'بليزر دريس', color:'Black', arColor:'أسود', image:'/products/product-coming-soon.svg', description:'A winter blazer dress in imported soft velvet, finished with a fixed waist belt for a defined silhouette and two gold stainless-steel buttons. Fits up to 90 kg.', arDescription:'بليزر دريس شتوي من خامة قطيفة مستوردة ناعمة، بحزام ثابت من الوسط ليأخذ شكل الجسم، وزرارين استانلس دهبي. يلبس حتى 90 كجم.', category:'winter', kind:'blazer-dress', price:1200, originalPrice:1500, saleLabel:'SALE 20%', sizeOptions:['FREE SIZE'], sizeInfo:{'FREE SIZE':'Up to 90 kg'}, material:'Imported soft velvet', arMaterial:'قطيفة مستوردة ناعمة', availableForInspection:true },
  { slug:'formal-black-suite', name:'Formal Black Suite', arName:'Formal Black Suite', color:'Black', arColor:'أسود', image:'/products/Formal Black Suite.jpeg', description:'A polished formal black modest suit designed for elevated occasions. Select your size and send the complete details through WhatsApp for confirmation.', arDescription:'بدلة سوداء فورمال محتشمة بإطلالة راقية للمناسبات. اختاري المقاس وأرسلي تفاصيل الطلب كاملة عبر واتساب للتأكيد.', category:'winter', kind:'formal-suite', price:1000, sizeOptions:twoPieceSizes, sizeInfo:{ L:'50–75 kg', XL:'75–110 kg' }, availableForInspection:true },
];

export const SIZE_INFO = { L:'55–75 kg', XL:'76–110 kg' } as const;
export const PRICE = 700;
