'use client';

import { useEffect, useState } from 'react';
import { products, PRICE } from '../../lib-products';
import SaffaHeader, { useSaffaLanguage } from '../components/SaffaHeader';
import './grid.css';

export default function GridPage() {
  const [language] = useSaffaLanguage();
  const [active, setActive] = useState<string | null>(null);
  const product = products.find(item => item.slug === active);
  const ar = language === 'ar';
  const t = ar ? { label: 'صفا فاشن · المجموعة', title: 'المجموعة', intro: 'استكشفي كل القطع في معرض نظيف. اختاري أي منتج لمعرفة التفاصيل والقصة.', close: 'إغلاق', open: 'فتح المنتج', about: 'من نحن', contact: 'تواصل معنا', privacy: 'الخصوصية' } : { label: 'SAFFA FASHION · COLLECTION', title: 'The Collection', intro: 'Explore every piece in a clean gallery. Select a product to view its story and details.', close: 'Close', open: 'Open Product', about: 'About', contact: 'Contact', privacy: 'Privacy' };
  useEffect(() => { document.documentElement.lang = language; document.documentElement.dir = ar ? 'rtl' : 'ltr'; }, [language, ar]);
  return (
    <main className="saffa-grid-page">
      <SaffaHeader active="collection" />
      <section className="grid-intro"><div><span>{t.label}</span><h1>{t.title}</h1></div><p>{t.intro}</p></section>
      <section className="saffa-product-grid">
        {products.map((item, index) => <button key={item.slug} className="grid-card" onClick={() => setActive(item.slug)}><div className="grid-image"><img src={item.image} alt={item.name} loading={index < 4 ? 'eager' : 'lazy'} /></div><div className="grid-card-meta"><span>{String(index + 1).padStart(2, '0')}</span><div><h2>{item.name}</h2><p>{item.color}</p></div><strong>EGP {PRICE.toFixed(2)}</strong></div></button>)}
      </section>
      <footer className="grid-footer"><span>© Saffa Fashion</span><div><a href="/about">{t.about}</a><a href="/contact">{t.contact}</a><a href="#">{t.privacy}</a></div></footer>
      {product && <div className="grid-modal-backdrop" onClick={() => setActive(null)}><aside className="grid-modal" onClick={event => event.stopPropagation()}><button className="grid-close" onClick={() => setActive(null)}>{t.close} ×</button><div className="grid-modal-image"><img src={product.image} alt={product.name} /></div><span>{product.color}</span><h2>{product.name}</h2><strong>EGP {PRICE.toFixed(2)}</strong><p>{ar ? product.arDescription : product.description}</p><a href="/" className="grid-open-product">{t.open} →</a></aside></div>}
    </main>
  );
}
