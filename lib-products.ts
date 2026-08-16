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

const twoPieceSizes: ProductSize[] = ['L', 'XL'];
const twoPieceSizeInfo = { L: '55–75 kg', XL: '76–110 kg' };
const twoPieceDescription = 'The Most Practical Dress is a two-piece modest set made from imported Freska linen. It includes an oversized blouse worn over a dress with an elasticated waist. Each piece can also be worn separately.';
const twoPieceArDescription = 'The Most Practical Dress دريس عملي قطعتين من كتان فريسكا مستورد. يتكون من بلوزة أوفر سايز فوق الدريس، والدريس بوسط أستيك. يمكن ارتداء كل قطعة بمفردها.';
const longShirtDescription = 'The Joyful Dress is a long shirt dress made from textured printed linen, finished with a waist belt to define the silhouette. It can be worn as a long shirt or shirt dress. Free size up to 110 kg.';
const longShirtArDescription = 'الفستان المبهج لونج شميز من كتان بطباعة بارزة، مع حزام من الوسط ليأخذ شكل الجسم. يمكن ارتداؤه كلونج شميز أو شميز دريس. فري سايز حتى 110 كجم.';
const placeholder = '/products/product-coming-soon.svg';

export const products: Product[] = [
  { slug:'most-practical-brown', name:'The Most Practical Dress', arName:'The Most Practical Dress', color:'Brown', arColor:'بني', image:placeholder, description:twoPieceDescription, arDescription:twoPieceArDescription, category:'summer', kind:'two-piece', price:600, originalPrice:800, saleLabel:'SALE', sizeOptions:twoPieceSizes, sizeInfo:twoPieceSizeInfo, material:'Imported Freska linen', arMaterial:'كتان فريسكا مستورد', availableForInspection:true },
  { slug:'most-practical-beige', name:'The Most Practical Dress', arName:'The Most Practical Dress', color:'Beige', arColor:'بيج', image:placeholder, description:twoPieceDescription, arDescription:twoPieceArDescription, category:'summer', kind:'two-piece', price:600, originalPrice:800, saleLabel:'SALE', sizeOptions:twoPieceSizes, sizeInfo:twoPieceSizeInfo, material:'Imported Freska linen', arMaterial:'كتان فريسكا مستورد', availableForInspection:true },
  { slug:'most-practical-burgundy', name:'The Most Practical Dress', arName:'The Most Practical Dress', color:'Burgundy', arColor:'برجاندي', image:placeholder, description:twoPieceDescription, arDescription:twoPieceArDescription, category:'summer', kind:'two-piece', price:600, originalPrice:800, saleLabel:'SALE', sizeOptions:twoPieceSizes, sizeInfo:twoPieceSizeInfo, material:'Imported Freska linen', arMaterial:'كتان فريسكا مستورد', availableForInspection:true },
  { slug:'most-practical-olive', name:'The Most Practical Dress', arName:'The Most Practical Dress', color:'Olive', arColor:'زيتي', image:placeholder, description:twoPieceDescription, arDescription:twoPieceArDescription, category:'summer', kind:'two-piece', price:600, originalPrice:800, saleLabel:'SALE', sizeOptions:twoPieceSizes, sizeInfo:twoPieceSizeInfo, material:'Imported Freska linen', arMaterial:'كتان فريسكا مستورد', availableForInspection:true },
  { slug:'most-practical-baby-blue', name:'The Most Practical Dress', arName:'The Most Practical Dress', color:'Baby Blue', arColor:'بيبي بلو', image:placeholder, description:twoPieceDescription, arDescription:twoPieceArDescription, category:'summer', kind:'two-piece', price:600, originalPrice:800, saleLabel:'SALE', sizeOptions:twoPieceSizes, sizeInfo:twoPieceSizeInfo, material:'Imported Freska linen', arMaterial:'كتان فريسكا مستورد', availableForInspection:true },
  { slug:'most-practical-kiwi', name:'The Most Practical Dress', arName:'The Most Practical Dress', color:'Kiwi', arColor:'كيوي', image:placeholder, description:twoPieceDescription, arDescription:twoPieceArDescription, category:'summer', kind:'two-piece', price:600, originalPrice:800, saleLabel:'SALE', sizeOptions:twoPieceSizes, sizeInfo:twoPieceSizeInfo, material:'Imported Freska linen', arMaterial:'كتان فريسكا مستورد', availableForInspection:true },

  { slug:'joyful-beige', name:'The Joyful Dress', arName:'الفستان المبهج', color:'Beige', arColor:'بيج', image:'/products/The Cheerful Dress  Beige.png', description:longShirtDescription, arDescription:longShirtArDescription, category:'summer', kind:'long-shirt', price:700, originalPrice:950, saleLabel:'SALE', sizeOptions:['FREE SIZE'], sizeInfo:{'FREE SIZE':'Up to 110 kg'}, material:'Textured printed linen', arMaterial:'كتان بطباعة بارزة', availableForInspection:true },
  { slug:'joyful-burgundy', name:'The Joyful Dress', arName:'الفستان المبهج', color:'Burgundy', arColor:'برجاندي', image:'/products/The Cheerful Dress  Burgundy.png', description:longShirtDescription, arDescription:longShirtArDescription, category:'summer', kind:'long-shirt', price:700, originalPrice:950, saleLabel:'SALE', sizeOptions:['FREE SIZE'], sizeInfo:{'FREE SIZE':'Up to 110 kg'}, material:'Textured printed linen', arMaterial:'كتان بطباعة بارزة', availableForInspection:true },
  { slug:'joyful-turquoise', name:'The Joyful Dress', arName:'الفستان المبهج', color:'Turquoise', arColor:'فيروزي', image:placeholder, description:longShirtDescription, arDescription:longShirtArDescription, category:'summer', kind:'long-shirt', price:700, originalPrice:950, saleLabel:'SALE', sizeOptions:['FREE SIZE'], sizeInfo:{'FREE SIZE':'Up to 110 kg'}, material:'Textured printed linen', arMaterial:'كتان بطباعة بارزة', availableForInspection:true },
  { slug:'joyful-denim', name:'The Joyful Dress', arName:'الفستان المبهج', color:'Denim Blue', arColor:'أزرق جينز', image:'/products/The Basic Dress Denim.png', description:longShirtDescription, arDescription:longShirtArDescription, category:'summer', kind:'long-shirt', price:700, originalPrice:950, saleLabel:'SALE', sizeOptions:['FREE SIZE'], sizeInfo:{'FREE SIZE':'Up to 110 kg'}, material:'Textured printed linen', arMaterial:'كتان بطباعة بارزة', availableForInspection:true },
  { slug:'joyful-pink', name:'The Joyful Dress', arName:'الفستان المبهج', color:'Pink', arColor:'بينك', image:placeholder, description:longShirtDescription, arDescription:longShirtArDescription, category:'summer', kind:'long-shirt', price:700, originalPrice:950, saleLabel:'SALE', sizeOptions:['FREE SIZE'], sizeInfo:{'FREE SIZE':'Up to 110 kg'}, material:'Textured printed linen', arMaterial:'كتان بطباعة بارزة', availableForInspection:true },

  { slug:'blazer-dress', name:'Blazer Dress', arName:'بليزر دريس', color:'Black', arColor:'أسود', image:'/products/Blazer Dress 1.jpeg', description:'A winter blazer dress made from imported soft velvet, with a fixed waist belt for a defined silhouette and two gold stainless-steel buttons. Fits up to 90 kg.', arDescription:'بليزر دريس شتوي من خامة قطيفة مستوردة ناعمة، بحزام ثابت من الوسط ليأخذ شكل الجسم، وزرارين استانلس دهبي. يلبس حتى 90 كجم.', category:'winter', kind:'blazer-dress', price:1200, originalPrice:1500, saleLabel:'SALE', sizeOptions:['FREE SIZE'], sizeInfo:{'FREE SIZE':'Up to 90 kg'}, material:'Imported soft velvet', arMaterial:'قطيفة مستوردة ناعمة', availableForInspection:true },
  { slug:'formal-black-suite', name:'Formal Black Suite', arName:'Formal Black Suite', color:'Black', arColor:'أسود', image:'/products/Formal Black Suite.jpeg', description:'A polished formal black modest suit designed for elevated occasions. Choose L or XL and confirm the order through WhatsApp.', arDescription:'بدلة سوداء فورمال محتشمة بإطلالة راقية للمناسبات. اختاري L أو XL وأكدي الطلب عبر واتساب.', category:'winter', kind:'formal-suite', price:1000, sizeOptions:twoPieceSizes, sizeInfo:{ L:'50–75 kg', XL:'76–110 kg' }, availableForInspection:true },
];

export const SIZE_INFO = { L:'55–75 kg', XL:'76–110 kg' } as const;
export const PRICE = 700;
