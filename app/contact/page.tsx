'use client';
import { useState } from 'react';
import { products, PRICE, SIZE_INFO } from '../../lib-products';

const WHATSAPP_NUMBER = '201069473693';
const INSTAGRAM_URL = 'https://www.instagram.com/_saffa_01/';
const TIKTOK_URL = 'https://www.tiktok.com/@saffa_0190';

export default function ContactPage(){
 const [product,setProduct]=useState(products[0].slug);
 const [size,setSize]=useState<'L'|'XL'>('L');
 const [weight,setWeight]=useState('');
 const p=products.find(x=>x.slug===product)!;
 const message=`Hello Saffa Fashion 👋\n\nI would like to place an order:\n\nProduct: ${p.name}\nArabic: ${p.arName}\nColor: ${p.color} / ${p.arColor}\nPrice: ${PRICE} EGP\nSize: ${size}\nWeight: ${weight || 'Not provided'} kg\n\nPlease confirm availability and delivery details.`;
 const send=()=>{navigator.clipboard?.writeText(message); window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,'_blank','noopener,noreferrer');};
 return <main className="saffa-contact-page">
   <header className="saffa-contact-header">
     <a href="/" className="saffa-contact-logo" aria-label="Saffa Fashion home"><img src="/logo.jpeg" alt="Saffa Modesty"/></a>
     <nav className="saffa-contact-nav" aria-label="Main navigation">
       <a href="/">Home</a><a href="/#collection">Collection</a><a href="/contact" className="active">Contact Us</a>
       <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram</a><a href={TIKTOK_URL} target="_blank" rel="noreferrer">TikTok</a><a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">WhatsApp</a>
     </nav>
   </header>
   <div className="saffa-contact-container">
     <section className="saffa-contact-hero"><div><span className="saffa-contact-eyebrow">SAFFA FASHION · صفا فاشون</span><h1>Contact<br/><em>Us.</em></h1><p>Ready to order? Choose your dress and size below. Your complete order is prepared and sent directly to our WhatsApp.</p></div><div className="saffa-contact-orbit" aria-hidden="true"><span>SAFFA</span><strong>01</strong><small>CONTACT</small></div></section>
     <section className="saffa-contact-grid">
       <div className="saffa-contact-card saffa-order-card"><span className="saffa-card-number">01</span><span className="saffa-card-label">PLACE YOUR ORDER</span><h2>Order via<br/>WhatsApp</h2><p>Select your product, size and optional weight. We will include every detail in the WhatsApp order.</p>
         <label>Product / المنتج</label><select value={product} onChange={e=>setProduct(e.target.value)}>{products.map(x=><option value={x.slug} key={x.slug}>{x.name} — {x.color}</option>)}</select>
         <label>Size / المقاس</label><div className="saffa-size-row">{(['L','XL'] as const).map(s=><button type="button" key={s} onClick={()=>setSize(s)} className={size===s?'selected':''}><strong>{s}</strong><small>{SIZE_INFO[s]}</small></button>)}</div>
         <label>Weight / الوزن <small>(optional)</small></label><input value={weight} onChange={e=>setWeight(e.target.value)} inputMode="numeric" placeholder="e.g. 68 kg"/>
         <div className="saffa-order-preview"><strong>{p.name}</strong><span>{p.arName}</span><span>Color: {p.color}</span><span>Price: {PRICE.toLocaleString()} EGP</span><span>Size: {size} · {SIZE_INFO[size]}</span></div>
         <button className="saffa-order-button" onClick={send}>Place Order on WhatsApp <span>→</span></button>
         <p className="saffa-order-note">The order opens WhatsApp with your product, color, size, weight and price already prepared.</p>
       </div>
       <aside className="saffa-contact-card saffa-connect-card"><span className="saffa-card-number">02</span><span className="saffa-card-label">CONNECT</span><h2>Follow<br/>Saffa.</h2><p>For questions, availability, delivery or anything else, reach us through your preferred platform.</p><div className="saffa-social-links"><a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer"><span>WhatsApp</span><strong>↗</strong></a><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer"><span>Instagram</span><strong>↗</strong></a><a href={TIKTOK_URL} target="_blank" rel="noreferrer"><span>TikTok</span><strong>↗</strong></a></div><div className="saffa-size-info"><span>SIZE GUIDE</span><p><strong>L</strong> — 50–75 kg<br/><strong>XL</strong> — 75–110 kg</p><p>All dresses: <strong>{PRICE.toLocaleString()} EGP</strong></p></div></aside>
     </section>
   </div>
   <footer className="saffa-contact-footer"><a href="/">Saffa Fashion</a><span>© {new Date().getFullYear()} Saffa Fashion</span></footer>
 </main>;
}
