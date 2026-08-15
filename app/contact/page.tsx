'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import '../product-detail.css';
import '../white-theme.css';
import SaffaHeader, { useSaffaLanguage } from '../components/SaffaHeader';
import { products, PRICE } from '../../lib-products';

const WHATSAPP_NUMBER = '201069473693';
const INSTAGRAM_URL = 'https://www.instagram.com/_saffa_01/';
const TIKTOK_URL = 'https://www.tiktok.com/@saffa_0190';

export default function ContactPage() {
  const [language] = useSaffaLanguage();
  const [productSlug, setProductSlug] = useState(products[0]?.slug ?? '');
  const [size, setSize] = useState('L');
  const [weight, setWeight] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const ar = language === 'ar';
  const product = products.find(item => item.slug === productSlug) ?? products[0];

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = ar ? 'rtl' : 'ltr';
  }, [language, ar]);

  const t = ar ? {
    label: 'ضعي طلبك', title: 'اطلبي عبر واتساب', intro: 'اختاري المنتج والمقاس والوزن الاختياري. سنضع كل التفاصيل في رسالة واتساب جاهزة.', product: 'المنتج', size: 'المقاس', weight: 'الوزن', optional: 'اختياري', lRange: '50–75 كجم', xlRange: '75–110 كجم', summary: 'ملخص الطلب', color: 'اللون', price: 'السعر', orderSize: 'المقاس', place: 'إرسال الطلب عبر واتساب', ready: 'سيتم فتح واتساب مع تفاصيل المنتج والمقاس والوزن والسعر جاهزة.', about: 'من نحن', contact: 'تواصل معنا', privacy: 'الخصوصية', terms: 'الشروط'
  } : {
    label: 'PLACE YOUR ORDER', title: 'Order via WhatsApp', intro: 'Select your product, size and optional weight. We will include every detail in the WhatsApp order.', product: 'PRODUCT', size: 'SIZE', weight: 'WEIGHT', optional: 'optional', lRange: '50–75 kg', xlRange: '75–110 kg', summary: 'ORDER SUMMARY', color: 'Color', price: 'Price', orderSize: 'Size', place: 'Place Order on WhatsApp', ready: 'The order opens WhatsApp with your product, color, size, weight and price already prepared.', about: 'About', contact: 'Contact', privacy: 'Privacy', terms: 'Terms'
  };

  const ranges = useMemo(() => ({ L: t.lRange, XL: t.xlRange }), [t.lRange, t.xlRange]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!product) return;
    const range = ranges[size as keyof typeof ranges] ?? '';
    const message = ar
      ? `مرحباً صفا فاشن 👋\n\nأرغب في طلب:\n${product.name}\nاللون: ${product.color}\nالمقاس: ${size} (${range})\nالوزن: ${weight || 'غير محدد'}\nالسعر: ${PRICE.toFixed(2)} جنيه مصري`
      : `Hello Saffa Fashion 👋\n\nI would like to place an order:\n${product.name}\nColor: ${product.color}\nSize: ${size} (${range})\nWeight: ${weight || 'Not provided'}\nPrice: EGP ${PRICE.toFixed(2)}`;
    setSubmitted(true);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  }

  if (!product) return null;

  return (
    <main className="saffa-order-page">
      <SaffaHeader active="contact" />

      <section className="saffa-order-main">
        <div className="saffa-order-heading">
          <span>{t.label}</span>
          <h1>{t.title}</h1>
          <p>{t.intro}</p>
          <b>01</b>
        </div>

        <form className="saffa-order-card" onSubmit={submit}>
          <div className="saffa-order-card-top"><span>{t.label}</span><span>01</span></div>
          <h2>{t.title}</h2>
          <p className="saffa-order-card-intro">{t.intro}</p>

          <label className="saffa-order-field">
            <span>{t.product} / {ar ? 'المنتج' : 'Product'}</span>
            <select value={productSlug} onChange={event => setProductSlug(event.target.value)}>
              {products.map(item => <option key={item.slug} value={item.slug}>{item.name} — {item.color}</option>)}
            </select>
          </label>

          <fieldset className="saffa-order-field saffa-size-field">
            <legend>{t.size} / {ar ? 'المقاس' : 'Size'}</legend>
            <div className="saffa-size-options">
              <button type="button" className={size === 'L' ? 'selected' : ''} onClick={() => setSize('L')}><strong>L</strong><span>{t.lRange}</span></button>
              <button type="button" className={size === 'XL' ? 'selected' : ''} onClick={() => setSize('XL')}><strong>XL</strong><span>{t.xlRange}</span></button>
            </div>
          </fieldset>

          <label className="saffa-order-field">
            <span>{t.weight} / {ar ? 'الوزن' : 'Weight'} <small>({t.optional})</small></span>
            <input value={weight} onChange={event => setWeight(event.target.value)} inputMode="decimal" placeholder={ar ? 'مثال: 68 كجم' : 'e.g. 68 kg'} />
          </label>

          <div className="saffa-order-summary">
            <strong>{product.name}</strong>
            <p>{ar ? product.arDescription : product.description}</p>
            <span>{t.color}: {product.color}</span>
            <span>{t.price}: {PRICE.toFixed(2)} EGP</span>
            <span>{t.orderSize}: {size} · {ranges[size as keyof typeof ranges]}</span>
          </div>

          <button className="saffa-order-submit" type="submit"><span>{t.place}</span><b>→</b></button>
          <p className="saffa-order-ready">{t.ready}</p>
          {submitted && <p className="saffa-order-success">{ar ? 'تم تجهيز طلبك لواتساب.' : 'Your WhatsApp order is ready.'}</p>}
        </form>
      </section>

      <footer className="saffa-order-footer"><span>© Saffa Fashion</span><nav><a href="/about">{t.about}</a><a href="/contact">{t.contact}</a><a href="#">{t.privacy}</a><a href="#">{t.terms}</a><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram</a><a href={TIKTOK_URL} target="_blank" rel="noreferrer">TikTok</a></nav></footer>
    </main>
  );
}
