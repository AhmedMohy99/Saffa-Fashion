'use client';

import { useState } from 'react';
import { products, PRICE } from '../../lib-products';
import './grid.css';

export default function GridPage() {
  const [active, setActive] = useState<string | null>(null);
  const product = products.find(item => item.slug === active);

  return (
    <main className="saffa-grid-page">
      <header className="grid-header">
        <a className="grid-brand" href="/">SAFFA <span>FASHION</span></a>
        <nav><a href="/">Home</a><a className="active" href="/grid">Collection</a><a href="/about">About</a><a href="/contact">Contact</a></nav>
        <a className="grid-cart" href="/">Cart</a>
      </header>

      <section className="grid-intro"><div><span>SAFFA FASHION · COLLECTION</span><h1>The Collection</h1></div><p>Explore every piece in a clean gallery. Select a product to view its story and details.</p></section>

      <section className="saffa-product-grid">
        {products.map((item, index) => (
          <button key={item.slug} className="grid-card" onClick={() => setActive(item.slug)}>
            <div className="grid-image"><img src={item.image} alt={item.name} loading={index < 4 ? 'eager' : 'lazy'} /></div>
            <div className="grid-card-meta"><span>{String(index + 1).padStart(2, '0')}</span><div><h2>{item.name}</h2><p>{item.color}</p></div><strong>EGP {PRICE.toFixed(2)}</strong></div>
          </button>
        ))}
      </section>

      <footer className="grid-footer"><span>© Saffa Fashion</span><div><a href="/about">About</a><a href="/contact">Contact</a><a href="#">Privacy</a></div></footer>

      {product && <div className="grid-modal-backdrop" onClick={() => setActive(null)}><aside className="grid-modal" onClick={event => event.stopPropagation()}><button className="grid-close" onClick={() => setActive(null)}>Close ×</button><div className="grid-modal-image"><img src={product.image} alt={product.name} /></div><span>{product.color}</span><h2>{product.name}</h2><strong>EGP {PRICE.toFixed(2)}</strong><p>{product.description}</p><a href="/" className="grid-open-product">Open Product →</a></aside></div>}
    </main>
  );
}
