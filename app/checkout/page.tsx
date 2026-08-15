'use client';

import { useEffect, useMemo, useState } from 'react';
import { PRICE, products } from '../../lib-products';
import './checkout.css';

type CartItem = { slug: string; name: string; image: string; price: number; quantity: number; size?: 'L'|'XL'; color?: string; arColor?: string };
const WHATSAPP_NUMBER = '201069473693';

export default function CheckoutPage() {
  const [cart,setCart]=useState<CartItem[]>([]);
  const [language,setLanguage]=useState<'en'|'ar'>('en');
  const [submitted,setSubmitted]=useState(false);
  const [customer,setCustomer]=useState({name:'',phone:'',address:''});
  const ar=language==='ar';
  useEffect(()=>{try{const saved=JSON.parse(localStorage.getItem('saffa-cart')||'[]') as CartItem[];setCart(saved.map(item=>{const p=products.find(x=>x.slug===item.slug);return {...item,price:PRICE,color:item.color||p?.color,arColor:item.arColor||p?.arColor};}));}catch{setCart([])}},[]);
  const subtotal=useMemo(()=>cart.reduce((sum,item)=>sum+PRICE*item.quantity,0),[cart]);
  function placeOrder(){
    if(!cart.length)return;
    const lines=cart.map(item=>{const p=products.find(x=>x.slug===item.slug);const name=ar?(p?.arName||item.name):(p?.name||item.name);const color=ar?(item.arColor||p?.arColor||'غير محدد'):(item.color||p?.color||'Not specified');return `• ${name}\n  ${ar?'اللون':'Color'}: ${color}\n  ${ar?'الكمية':'Quantity'}: ${item.quantity}\n  ${ar?'السعر':'Price'}: EGP ${PRICE.toFixed(2)}`;}).join('\n\n');
    const message=ar?`مرحباً صفا فاشن 👋\n\nأرغب في تأكيد الطلب:\n\n${lines}\n\nالإجمالي: EGP ${subtotal.toFixed(2)}\n\nالاسم: ${customer.name||'غير محدد'}\nالهاتف: ${customer.phone||'غير محدد'}\nالعنوان: ${customer.address||'غير محدد'}\n\nيرجى تأكيد التوفر والتوصيل.`:`Hello Saffa Fashion 👋\n\nI would like to confirm my order:\n\n${lines}\n\nTotal: EGP ${subtotal.toFixed(2)}\n\nName: ${customer.name||'[customer]'}\nPhone: ${customer.phone||'[phone]'}\nAddress: ${customer.address||'[address]'}\n\nPlease confirm availability and delivery.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,'_blank','noopener,noreferrer');setSubmitted(true);
  }
  return <main className="saffa-checkout" dir={ar?'rtl':'ltr'}>
    <section className="checkout-form-side"><header className="checkout-brand"><a href="/">Saffa Fashion</a><a href="/cart">{ar?'العودة للسلة':'Return to cart'}</a></header><div className="checkout-inner">
      <div style={{display:'flex',gap:8,marginBottom:24}}><button type="button" onClick={()=>setLanguage('en')}>English</button><button type="button" onClick={()=>setLanguage('ar')}>العربية</button></div>
      <section><h2>{ar?'بيانات التواصل':'Contact'}</h2><label>{ar?'الاسم':'Name'}<input value={customer.name} onChange={e=>setCustomer({...customer,name:e.target.value})} placeholder={ar?'الاسم بالكامل':'Full name'}/></label><label>{ar?'الهاتف':'Phone'}<input value={customer.phone} onChange={e=>setCustomer({...customer,phone:e.target.value})} placeholder="01xxxxxxxxx"/></label></section>
      <section><h2>{ar?'التوصيل':'Delivery'}</h2><label>{ar?'العنوان':'Address'}<input value={customer.address} onChange={e=>setCustomer({...customer,address:e.target.value})} placeholder={ar?'المحافظة، المنطقة، العنوان':'Governorate, area, street and building'}/></label></section>
      <button className="pay-now" onClick={placeOrder}>💬 {submitted?(ar?'تم تجهيز الطلب — متابعة واتساب':'Order prepared — Continue on WhatsApp'):(ar?`تأكيد الطلب · EGP ${subtotal.toFixed(2)}`:`Confirm Order · EGP ${subtotal.toFixed(2)}`)}</button>
      <p className="checkout-note">{ar?'لن يتم تحصيل أي دفع إلكتروني هنا. سيتم فتح واتساب برسالة الطلب كاملة لتأكيده مع صفا فاشن.':'No online payment is charged here. WhatsApp opens with the complete order for confirmation with Saffa Fashion.'}</p>
    </div></section>
    <aside className="checkout-summary"><div className="summary-inner"><span className="summary-eyebrow">SAFFA FASHION</span><h1>{ar?'ملخص الطلب':'Order summary'}</h1>{!cart.length?<p>{ar?'السلة فارغة.':'Your cart is empty.'}</p>:<div className="summary-items">{cart.map(item=>{const p=products.find(x=>x.slug===item.slug);return <div className="summary-item" key={item.slug}><div className="summary-image"><img src={item.image} alt=""/><span>{item.quantity}</span></div><div><strong>{ar?(p?.arName||item.name):(p?.name||item.name)}</strong><small>{ar?'اللون':'Color'}: {ar?(item.arColor||p?.arColor):(item.color||p?.color)}</small></div><b>EGP {(PRICE*item.quantity).toFixed(2)}</b></div>})}</div>}<div className="costs"><div><span>{ar?'الإجمالي':'Total'}</span><b>EGP {subtotal.toFixed(2)}</b></div></div></div></aside>
  </main>;
}
