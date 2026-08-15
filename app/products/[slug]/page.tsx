'use client';
import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { products } from '../../../lib-products';
import SaffaHeader, { useSaffaLanguage } from '../../components/SaffaHeader';

type CartItem = { slug:string; name:string; image:string; price:number; quantity:number; color:string; arColor:string; size?:string };

export default function ProductPage({ params }: { params: { slug: string } }) {
 const product = products.find(p => p.slug === params.slug);
 const [language] = useSaffaLanguage();
 const [size,setSize]=useState<string>('');
 const [weight,setWeight]=useState('');
 const [added,setAdded]=useState(false);
 const ar=language==='ar';
 useEffect(()=>{document.documentElement.lang=language;document.documentElement.dir=ar?'rtl':'ltr';},[language,ar]);
 useEffect(()=>{if(product) setSize(product.sizeOptions[0] ?? '');},[product]);
 if (!product) return notFound();
 function addToCart(){try{const current=JSON.parse(localStorage.getItem('saffa-cart')||'[]') as CartItem[];const found=current.find(item=>item.slug===product.slug);const next=found?current.map(item=>item.slug===product.slug?{...item,quantity:item.quantity+1,size}:item):[...current,{slug:product.slug,name:product.name,image:product.image,price:product.price,quantity:1,color:product.color,arColor:product.arColor,size}];localStorage.setItem('saffa-cart',JSON.stringify(next));setAdded(true);}catch{}}
 function buyNow(){addToCart();window.location.href='/checkout';}
 return <main className="detail"><SaffaHeader active="collection" cartCount={0} cartAction={()=>{window.location.href='/cart';}}/><div className="container"><div className="detail-back"><Link href="/grid">← {ar?'العودة للمجموعة':'Back to Collection'}</Link></div><div className="detail-grid"><div className="detail-image"><img src={product.image} alt={`${product.name} - ${product.color}`}/></div><div><div className="kicker">SAFFA FASHION · {ar?product.arColor:product.color}</div><h1 className="serif">{ar?product.arName:product.name}</h1><div className="detail-ar">{ar?product.name:product.arName}</div><div style={{fontSize:22,fontWeight:700,margin:'18px 0'}}>EGP {product.price.toFixed(2)} {product.originalPrice&&<del style={{fontSize:14,color:'#888',marginInlineStart:10}}>EGP {product.originalPrice.toFixed(2)}</del>}</div>{product.saleLabel&&<div style={{display:'inline-block',fontWeight:800,letterSpacing:'.12em',fontSize:11,marginBottom:18,borderRadius:999,padding:'8px 12px',background:'#111',color:'#fff'}}>{product.saleLabel}</div>}<p className="desc">{ar?product.arDescription:product.description}</p>{product.material&&<p className="shipping-note"><strong>{ar?'الخامة: ':'Material: '}</strong>{ar?product.arMaterial:product.material}</p>}<div className="option-label">{ar?'المقاس':'Size'}</div><div className="size-row">{product.sizeOptions.map(s=><button key={s} onClick={()=>setSize(s)} className={`size-btn ${size===s?'active':''}`}><strong>{s}</strong><br/><small>{product.sizeInfo[s]}</small></button>)}</div><label className="option-label" htmlFor="weight">{ar?'الوزن':'Weight'} <small>({ar?'اختياري':'optional'})</small></label><input id="weight" value={weight} onChange={e=>setWeight(e.target.value)} placeholder={ar?'مثال: 68 كجم':'e.g. 68 kg'} style={{width:'100%',padding:'14px 16px',border:'1px solid var(--line)',borderRadius:14,background:'#fff'}}/><div style={{display:'flex',gap:10,flexWrap:'wrap',marginTop:20}}><button className="btn" onClick={addToCart}>🛒 {added?(ar?'تمت الإضافة':'Added to Cart'):(ar?'أضف إلى السلة':'Add to Cart')}</button><button className="btn btn-dark" onClick={buyNow}>{ar?'شراء الآن':'Buy Now'} →</button><Link href="/cart" className="btn btn-light">{ar?'عرض السلة':'View Cart'} →</Link></div><p className="shipping-note">{ar?'متاح المعاينة قبل الاستلام. عند الشراء الآن سيتم إدخال بيانات العميل أولاً ثم فتح واتساب بالتفاصيل الدقيقة للمنتج واللون والمقاس.':'Inspection before receipt is available. Buy Now takes you to customer details first, then opens WhatsApp with the exact product, selected color and size.'}</p></div></div></div></main>;
}
