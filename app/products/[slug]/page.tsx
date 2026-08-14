'use client';
import { useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { products, PRICE, SIZE_INFO } from '../../../lib-products';

export default function ProductPage({ params }: { params: { slug: string } }) {
 const product = products.find(p=>p.slug===params.slug); if(!product) return notFound();
 const [size,setSize]=useState<'L'|'XL'>('L');
 const [weight,setWeight]=useState('');
 const message = `Hello Saffa Fashion, I would like to order:\n\nProduct: ${product.name}\nArabic: ${product.arName}\nColor: ${product.color} / ${product.arColor}\nPrice: ${PRICE} EGP\nSize: ${size}\nWeight: ${weight || 'Not provided'} kg\n\nPlease confirm availability and delivery details.`;
 const whatsapp='https://api.whatsapp.com/message/3RRGEUO5XNISD1?autoload=1&app_absent=0';
 const order=()=>{ navigator.clipboard?.writeText(message); window.open(whatsapp,'_blank'); };
 return <main className="detail"><div className="container"><div className="detail-grid"><div className="detail-image"><img src={product.image} alt={product.name}/></div><div><div className="kicker">Saffa Fashion · 1,000 EGP</div><h1 className="serif">{product.name}</h1><div className="detail-ar">{product.arName}</div><p className="desc">{product.description}</p><p className="desc arabic">{product.arDescription}</p><div className="option-label">Size / المقاس</div><div className="size-row">{(['L','XL'] as const).map(s=><button key={s} onClick={()=>setSize(s)} className={`size-btn ${size===s?'active':''}`}><strong>{s}</strong><br/><small>{SIZE_INFO[s]}</small></button>)}</div><label className="option-label" htmlFor="weight">Weight / الوزن (optional)</label><input id="weight" value={weight} onChange={e=>setWeight(e.target.value)} placeholder="e.g. 68 kg" style={{width:'100%',padding:'14px 16px',border:'1px solid var(--line)',borderRadius:14,background:'#fff'}}/><div className="weight-box">L: 50–75 kg · XL: 75–110 kg</div><div className="order-box"><button className="order-btn" onClick={order}>Order via WhatsApp · اطلب عبر واتساب</button><div className="note">Your order details are copied automatically before WhatsApp opens. If your browser blocks clipboard access, simply copy the details from this page and send them in the chat.</div><Link href="/contact" className="btn btn-light">View Contact Us · صفحة التواصل</Link></div></div></div></div></main>;
}
