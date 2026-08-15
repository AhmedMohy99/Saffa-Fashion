'use client';
import { useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { products, PRICE, SIZE_INFO } from '../../../lib-products';

const WHATSAPP_NUMBER = '201069473693';

export default function ProductPage({ params }: { params: { slug: string } }) {
 const product = products.find(p=>p.slug===params.slug); if(!product) return notFound();
 const [language,setLanguage]=useState<'en'|'ar'>('en');
 const [size,setSize]=useState<'L'|'XL'>('L');
 const [weight,setWeight]=useState('');
 const ar=language==='ar';
 const name=ar?product.arName:product.name;
 const color=ar?product.arColor:product.color;
 const description=ar?product.arDescription:product.description;
 function order(){
   const message=ar
    ? `مرحباً صفا فاشن 👋\n\nأرغب في طلب:\n\nالمنتج: ${product.arName}\nاللون: ${product.arColor}\nالسعر: EGP ${PRICE.toFixed(2)}\nالمقاس: ${size}\nالوزن: ${weight || 'غير محدد'} kg\n\nيرجى تأكيد التوفر والتوصيل.`
    : `Hello Saffa Fashion 👋\n\nI would like to order:\n\nProduct: ${product.name}\nColor: ${product.color}\nPrice: EGP ${PRICE.toFixed(2)}\nSize: ${size}\nWeight: ${weight || 'Not provided'} kg\n\nPlease confirm availability and delivery details.`;
   window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,'_blank','noopener,noreferrer');
 }
 return <main className="detail"><div className="container"><div className="detail-grid"><div className="detail-image"><img src={product.image} alt={product.name}/></div><div><div className="kicker">SAFFA FASHION · {color}</div><div style={{display:'flex',gap:8,marginBottom:18}}><button type="button" onClick={()=>setLanguage('en')} className={ar?'btn btn-light':'btn'}>English</button><button type="button" onClick={()=>setLanguage('ar')} className={ar?'btn':'btn btn-light'}>العربية</button></div><h1 className="serif">{name}</h1><div className="detail-ar">{ar?product.name:product.arName}</div><div style={{fontSize:22,fontWeight:700,margin:'18px 0'}}>EGP {PRICE.toFixed(2)}</div><p className="desc">{description}</p><div className="option-label">Size / المقاس</div><div className="size-row">{(['L','XL'] as const).map(s=><button key={s} onClick={()=>setSize(s)} className={`size-btn ${size===s?'active':''}`}><strong>{s}</strong><br/><small>{SIZE_INFO[s]}</small></button>)}</div><label className="option-label" htmlFor="weight">Weight / الوزن (optional)</label><input id="weight" value={weight} onChange={e=>setWeight(e.target.value)} placeholder="e.g. 68 kg" style={{width:'100%',padding:'14px 16px',border:'1px solid var(--line)',borderRadius:14,background:'#fff'}}/><div className="weight-box">L: 50–75 kg · XL: 75–110 kg</div><div className="order-box"><button className="order-btn" onClick={order}>💬 {ar?'اطلب عبر واتساب':'Order via WhatsApp'}</button><div className="note">{ar?'سيتم فتح واتساب برسالة تحتوي على اسم المنتج واللون والسعر والمقاس والوزن.':'WhatsApp opens with the exact product, color, price, size and weight already included.'}</div><Link href="/cart" className="btn btn-light">{ar?'عرض السلة':'View Cart'} →</Link></div></div></div></div></main>;
}
