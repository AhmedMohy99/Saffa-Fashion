'use client';

import { useEffect, useMemo, useState } from 'react';
import SaffaHeader, { useSaffaLanguage } from '../components/SaffaHeader';
import { products, PRICE } from '../../lib-products';
import './cart.css';

type CartItem = { slug: string; name: string; image: string; price: number; quantity: number; color?: string; arColor?: string };
const WHATSAPP_NUMBER = '201069473693';

export default function CartPage() {
  const [language] = useSaffaLanguage();
  const [cart, setCart] = useState<CartItem[]>([]);
  const ar = language === 'ar';

  const text = ar
    ? { cart:'سلة التسوق', item:'منتج', items:'منتجات', remove:'حذف', total:'الإجمالي', clear:'إفراغ السلة', buy:'شراء الآن عبر واتساب', checkout:'إتمام الطلب', empty:'سلتك فارغة', continue:'متابعة التسوق', add:'اختاري منتجًا من المجموعة أولاً' }
    : { cart:'Your Cart', item:'item', items:'items', remove:'Remove', total:'Total', clear:'Clear Cart', buy:'Buy Now via WhatsApp', checkout:'Checkout', empty:'Your cart is empty', continue:'Continue Shopping', add:'Choose a product from the collection first' };

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('saffa-cart') || '[]') as CartItem[];
      setCart(saved.map(item => {
        const product = products.find(p => p.slug === item.slug);
        return { ...item, price: PRICE, color: item.color || product?.color, arColor: item.arColor || product?.arColor };
      }));
    } catch { setCart([]); }
  }, []);

  useEffect(() => {
    try { localStorage.setItem('saffa-cart', JSON.stringify(cart)); } catch {}
  }, [cart]);

  const total = useMemo(() => cart.reduce((sum, item) => sum + PRICE * item.quantity, 0), [cart]);

  function changeQuantity(slug: string, delta: number) {
    setCart(current => current.map(item => item.slug === slug ? { ...item, quantity: item.quantity + delta } : item).filter(item => item.quantity > 0));
  }
  function removeItem(slug: string) { setCart(current => current.filter(item => item.slug !== slug)); }
  function clearCart() { setCart([]); }

  function orderOnWhatsApp() {
    if (!cart.length) return;
    const lines = cart.map(item => {
      const color = ar ? (item.arColor || item.color || 'غير محدد') : (item.color || 'Not specified');
      const name = ar ? (products.find(p => p.slug === item.slug)?.arName || item.name) : item.name;
      return `• ${name}\n  ${ar ? 'اللون' : 'Color'}: ${color}\n  ${ar ? 'الكمية' : 'Quantity'}: ${item.quantity}\n  ${ar ? 'السعر' : 'Price'}: EGP ${PRICE.toFixed(2)}`;
    }).join('\n\n');
    const message = ar
      ? `مرحباً صفا فاشن 👋\n\nأرغب في تأكيد الطلب:\n\n${lines}\n\nالإجمالي: EGP ${total.toFixed(2)}\n\nيرجى تأكيد التوفر والتوصيل.`
      : `Hello Saffa Fashion 👋\n\nI would like to place an order:\n\n${lines}\n\nTotal: EGP ${total.toFixed(2)}\n\nPlease confirm availability and delivery.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  }

  return <main className="saffa-cart-page">
    <SaffaHeader active="home" cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} cartAction={() => {}} />
    <section className="cart-page-inner">
      <div className="cart-page-heading"><span>SAFFA FASHION</span><h1>{text.cart}</h1><p>{cart.length} {cart.length === 1 ? text.item : text.items}</p></div>
      {!cart.length ? <div className="cart-empty-state"><div>0</div><h2>{text.empty}</h2><p>{text.add}</p><a href="/grid">{text.continue} →</a></div> : <>
        <div className="cart-list">{cart.map(item => <article className="cart-page-item" key={item.slug}>
          <div className="cart-page-image"><img src={item.image} alt={item.name} /></div>
          <div className="cart-page-info"><span className="cart-page-color">{ar ? (item.arColor || item.color) : item.color}</span><h2>{ar ? (products.find(p => p.slug === item.slug)?.arName || item.name) : item.name}</h2><strong>EGP {PRICE.toFixed(2)}</strong><div className="cart-page-quantity"><button type="button" onClick={() => changeQuantity(item.slug, -1)}>−</button><b>{item.quantity}</b><button type="button" onClick={() => changeQuantity(item.slug, 1)}>+</button></div></div>
          <button className="cart-page-remove" type="button" onClick={() => removeItem(item.slug)}>{text.remove}</button>
        </article>)}</div>
        <div className="cart-page-total"><span>{text.total}</span><strong>EGP {total.toFixed(2)}</strong></div>
        <div className="cart-page-actions"><button className="cart-whatsapp" type="button" onClick={orderOnWhatsApp}>💬 {text.buy}</button><a className="cart-checkout" href="/checkout">{text.checkout} <span>→</span></a><button className="cart-clear" type="button" onClick={clearCart}>{text.clear}</button></div>
      </>}
    </section>
    <a className="cart-floating-whatsapp" href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" aria-label={ar ? 'التواصل عبر واتساب' : 'Contact via WhatsApp'}>💬 <span>{ar ? 'واتساب' : 'WhatsApp'}</span></a>
  </main>;
}
