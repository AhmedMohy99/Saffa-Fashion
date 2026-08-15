'use client';

import { useEffect, useState } from 'react';
import { PRICE } from '../../lib-products';
import './checkout.css';

type CartItem = { slug: string; name: string; image: string; price: number; size: 'L' | 'XL'; quantity: number };
const WHATSAPP_NUMBER = '201069473693';

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [payment, setPayment] = useState('card');
  const [submitted, setSubmitted] = useState(false);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    try { const saved = localStorage.getItem('saffa-cart'); if (saved) setCart(JSON.parse(saved)); } catch {}
  }, []);

  function placeOrder() {
    if (!cart.length) return;
    const lines = cart.map(item => `• ${item.name} — Size ${item.size} — x${item.quantity} — ${item.price.toFixed(2)} LE`).join('\n');
    const message = `Hello Saffa Fashion 👋\n\nCheckout order:\n${lines}\n\nTotal: ${subtotal.toFixed(2)} LE\n\nName: [customer]\nPhone: [phone]\nAddress: [address]`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  }

  return <main className="saffa-checkout">
    <section className="checkout-form-side">
      <header className="checkout-brand"><a href="/">Saffa Fashion</a><a href="/">Return to store</a></header>
      <div className="checkout-inner">
        <div className="express"><button>Shop Pay</button><button>PayPal</button><button>Google Pay</button></div>
        <div className="or-divider"><span>OR</span></div>
        <section><h2>Contact</h2><label>Email or mobile phone number<input type="text" placeholder="Email or phone"/></label></section>
        <section><h2>Delivery</h2><div className="field-grid"><label>First name<input type="text"/></label><label>Last name<input type="text"/></label><label className="full">Address<input type="text" placeholder="Street and building"/></label><label>City<input type="text" placeholder="Cairo"/></label><label>Region / Governorate<input type="text" placeholder="Cairo"/></label><label>Phone<input type="tel" placeholder="+20"/></label></div></section>
        <section><h2>Payment</h2><div className="payment-options"><label className={payment === 'card' ? 'selected' : ''}><input type="radio" checked={payment === 'card'} onChange={() => setPayment('card')}/>Credit card</label><label className={payment === 'paypal' ? 'selected' : ''}><input type="radio" checked={payment === 'paypal'} onChange={() => setPayment('paypal')}/>PayPal</label></div>{payment === 'card' && <div className="card-fields"><input placeholder="Card number"/><div><input placeholder="MM / YY"/><input placeholder="CVV"/></div></div>}</section>
        <button className="pay-now" onClick={placeOrder}>{submitted ? 'Order Sent — Continue on WhatsApp' : `Pay now · ${subtotal.toFixed(2)} LE`}</button>
        <p className="checkout-note">Secure payment processing can be connected to Shopify Payments or another Egyptian/international gateway when the store backend is connected.</p>
      </div>
    </section>
    <aside className="checkout-summary"><div className="summary-inner"><span className="summary-eyebrow">SAFFA FASHION</span><h1>Order summary</h1>{!cart.length ? <p>Your cart is empty.</p> : <div className="summary-items">{cart.map(item => <div className="summary-item" key={`${item.slug}-${item.size}`}><div className="summary-image"><img src={item.image} alt=""/><span>{item.quantity}</span></div><div><strong>{item.name}</strong><small>Size {item.size}</small></div><b>{(item.price * item.quantity).toFixed(2)} LE</b></div>)}</div>}<div className="discount"><input placeholder="Discount code"/><button>Apply</button></div><div className="costs"><div><span>Subtotal</span><b>{subtotal.toFixed(2)} LE</b></div><div><span>Shipping</span><span>Calculated at checkout</span></div><div className="final"><strong>Total</strong><strong>{subtotal.toFixed(2)} LE</strong></div></div></div></aside>
  </main>;
}
