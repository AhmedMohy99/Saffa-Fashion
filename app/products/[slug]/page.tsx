'use client';
import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { products } from '../../../lib-products';
import SaffaHeader, { useSaffaLanguage } from '../../components/SaffaHeader';

type CartItem = { slug:string; name:string; arName:string; image:string; price:number; quantity:number; color:string; arColor:string; size?:string };

export default function ProductPage({ params }: { params: { slug: string } }) {
 const product = products.find(p => p.slug === params.slug);
 const [language] = useSaffaLanguage();
 const [size,setSize]=useState<string>('');
 const [weight,setWeight]=useState('');
 const [added,setAdded]=useState(false);
 const [selectedImage,setSelectedImage]=useState('');
 const ar=language==='ar';
 useEffect(()=>{document.documentElement.lang=language;document.documentElement.dir=ar?'rtl':'ltr';},[language,ar]);
 useEffect(()=>{if(product){setSize(product.sizeOptions[0] ?? '');setSelectedImage(product.image);}},[product]);
 if (!product) return notFound();
 const currentProduct = product;
 const gallery = currentProduct.images?.length ? currentProduct.images : [currentProduct.image];
 function addToCart(){try{const current=JSON.parse(localStorage.getItem('saffa-cart')||'[]') as CartItem[];const found=current.find(item=>item.slug===currentProduct.slug);const next=found?current.map(item=>item.slug===currentProduct.slug?{...item,quantity:item.quantity+1,size,color:currentProduct.color,arColor:currentProduct.arColor,image:currentProduct.image,name:currentProduct.name,arName:currentProduct.arName,price:currentProduct.price}:item):[...current,{slug:currentProduct.slug,name:currentProduct.name,arName:currentProduct.arName,image:currentProduct.image,price:currentProduct.price,quantity:1,color:currentProduct.color,arColor:currentProduct.arColor,size}];localStorage.setItem('saffa-cart',JSON.stringify(next));window.dispatchEvent(new CustomEvent('saffa-cart-change'));setAdded(true);}catch{}}
 function buyNow(){addToCart();window.location.href='/checkout';}
 return <main className="detail"><SaffaHeader active="collection" cartAction={()=>{window.location.href='/cart';}}/><div className="container"><div className="detail-back"><Link href="/grid">← {ar?'العودة للمجموعة':'Back to Collection'}</Link></div><div className="detail-grid"><div className="detail-media"><div className="detail-image"><img src={selectedImage || currentProduct.image} alt={`${ar?currentProduct.arName:currentProduct.name} - ${ar?currentProduct.arColor:currentProduct.color}`} /></div>{gallery.length>1&&<div className="detail-thumbnails">{gallery.map((src,index)=><button type="button" key={src} className={selectedImage===src?'active':''} onClick={()=>setSelectedImage(src)} aria-label={`${ar?'صورة':'Image'} ${index+1}`}><img src={src} alt=""/></button>)}</div>}</div><div><div className="kicker">SAFFA FASHION · {ar?currentProduct.arColor:currentProduct.color}</div><h1 className="serif">{ar?currentProduct.arName:currentProduct.name}</h1><div className="detail-ar">{ar?currentProduct.name:currentProduct.arName}</div><div className="detail-price">EGP {currentProduct.price.toFixed(2)} {currentProduct.originalPrice&&<del>EGP {currentProduct.originalPrice.toFixed(2)}</del>}</div>{currentProduct.saleLabel&&<div className="sale-label">{currentProduct.saleLabel}</div>}<p className="desc">{ar?currentProduct.arDescription:currentProduct.description}</p>{currentProduct.material&&<p className="shipping-note"><strong>{ar?'الخامة: ':'Material: '}</strong>{ar?currentProduct.arMaterial:currentProduct.material}</p>}<div className="option-label">{ar?'المقاس':'Size'}</div><div className="size-row">{currentProduct.sizeOptions.map(s=><button key={s} onClick={()=>setSize(s)} className={`size-btn ${size===s?'active':''}`}><strong>{s}</strong><br/><small>{currentProduct.sizeInfo[s]}</small></button>)}</div><label className="option-label" htmlFor="weight">{ar?'الوزن':'Weight'} <small>({ar?'اختياري':'optional'})</small></label><input id="weight" value={weight} onChange={e=>setWeight(e.target.value)} placeholder={ar?'مثال: 68 كجم':'e.g. 68 kg'} /><div className="detail-actions"><button className="btn" onClick={addToCart}>🛒 {added?(ar?'تمت الإضافة':'Added to Cart'):(ar?'أضف إلى السلة':'Add to Cart')}</button><button className="btn btn-dark" onClick={buyNow}>{ar?'شراء الآن':'Buy Now'} →</button><Link href="/cart" className="btn btn-light">{ar?'عرض السلة':'View Cart'} →</Link></div><p className="shipping-note">{ar?'متاح المعاينة قبل الاستلام. عند الشراء الآن سيتم إدخال بيانات العميل أولاً ثم فتح واتساب بالتفاصيل الدقيقة للمنتج واللون والمقاس.':'Inspection before receipt is available. Buy Now takes you to customer details first, then opens WhatsApp with the exact product, selected color and size.'}</p></div></div></div></main>;
}
