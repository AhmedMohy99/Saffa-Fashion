'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import './responsive.css';
import './product-detail.css';
import './circle-fix.css';
import './swipe-viewer.css';
import { products, PRICE, type Product } from '../lib-products';

type CartItem = { slug: string; name: string; image: string; price: number; quantity: number };

const WHATSAPP_NUMBER = '201069473693';
const PRICE_LABEL = `${PRICE.toFixed(2)} LE`;

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [detailOpen, setDetailOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const wheelLock = useRef(false);
  const touchMoved = useRef(false);

  const activeProduct = products[activeIndex];
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const progress = products.length ? (activeIndex + 1) / products.length : 0;

  useEffect(() => {
    try {
      const saved = localStorage.getItem('saffa-cart');
      if (saved) setCart(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem('saffa-cart', JSON.stringify(cart)); } catch {}
  }, [cart]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') moveProduct(1);
      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') moveProduct(-1);
      if (event.key === 'Escape') { setDetailOpen(false); setCartOpen(false); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  function moveProduct(direction: 1 | -1) {
    setActiveIndex(current => Math.max(0, Math.min(products.length - 1, current + direction)));
  }

  function openProduct(index: number) {
    setActiveIndex(index);
    setDetailOpen(true);
  }

  function handleWheel(event: React.WheelEvent<HTMLDivElement>) {
    if (Math.abs(event.deltaY) < 12 || wheelLock.current) return;
    event.preventDefault();
    if ((event.deltaY > 0 && activeIndex >= products.length - 1) || (event.deltaY < 0 && activeIndex <= 0)) return;
    wheelLock.current = true;
    moveProduct(event.deltaY > 0 ? 1 : -1);
    window.setTimeout(() => { wheelLock.current = false; }, 430);
  }

  function handleTouchStart(event: React.TouchEvent<HTMLDivElement>) {
    setDragStart(event.touches[0].clientY);
    touchMoved.current = false;
  }

  function handleTouchMove(event: React.TouchEvent<HTMLDivElement>) {
    if (dragStart === null) return;
    touchMoved.current = Math.abs(dragStart - event.touches[0].clientY) > 8;
  }

  function handleTouchEnd(event: React.TouchEvent<HTMLDivElement>) {
    if (dragStart === null) return;
    const distance = dragStart - event.changedTouches[0].clientY;
    setDragStart(null);
    if (Math.abs(distance) < 45) return;
    moveProduct(distance > 0 ? 1 : -1);
  }

  function addToCart(product: Product = activeProduct) {
    setCart(current => {
      const found = current.find(item => item.slug === product.slug);
      if (found) return current.map(item => item.slug === product.slug ? { ...item, quantity: item.quantity + 1 } : item);
      return [...current, { slug: product.slug, name: product.name, image: product.image, price: PRICE, quantity: 1 }];
    });
    setDetailOpen(false);
    setCartOpen(true);
  }

  function changeQuantity(slug: string, delta: number) {
    setCart(current => current.map(item => item.slug === slug ? { ...item, quantity: item.quantity + delta } : item).filter(item => item.quantity > 0));
  }

  function orderOnWhatsApp() {
    if (!cart.length) return;
    const lines = cart.map(item => `• ${item.name}\n  Quantity: ${item.quantity}\n  Price: ${PRICE_LABEL}`).join('\n\n');
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const message = `Hello Saffa Fashion 👋\n\nI would like to place an order:\n\n${lines}\n\nTotal: ${total.toFixed(2)} LE`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  }

  const slideTransform = useMemo(() => `translate3d(0, -${activeIndex * 100}%, 0)`, [activeIndex]);

  return <main className="saffa-store saffa-swipe-viewer" id="top">
    <header className="store-header blueprint-header">
      <a className="brand-wordmark" href="#top">Saffa Fashion</a>
      <button className="ask-ai centered-ai" onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello Saffa Fashion 👋 I need help choosing a dress.')}`, '_blank', 'noopener,noreferrer')}><span>◉</span> Ask Saffa</button>
      <nav className="blueprint-nav" aria-label="Main navigation">
        <a href="#collection">Store</a>
        <label className="region-select"><span>Region</span><select defaultValue="ROW" aria-label="Region"><option>ROW</option><option>EG</option></select></label>
        <button className="nav-view active" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Circle</button>
        <button className="cart-link" onClick={() => setCartOpen(true)}>Cart {cartCount}</button>
        <a href="/contact">Contact</a>
      </nav>
      <button className="mobile-menu-toggle" aria-label="Menu"><span/><span/><span/></button>
    </header>

    <section id="collection" className="saffa-swipe-viewer">
      <div className="swipe-count">{String(products.length).padStart(2, '0')} DRESSES · {PRICE_LABEL} EACH</div>
      <div className="swipe-mobile-title">SAFFA FASHION · صفا فاشون</div>

      <div className="swipe-stage" onWheel={handleWheel} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
        <div className="swipe-track" style={{ transform: slideTransform }}>
          {products.map((product, index) => <article className="swipe-slide" key={product.slug} aria-hidden={index !== activeIndex}>
            <button className="swipe-product-image" onClick={() => openProduct(index)} aria-label={`Open ${product.name}`}>
              <img src={product.image} alt={product.name} draggable={false} />
            </button>
          </article>)}
        </div>

        <button className="swipe-dial" style={{ ['--progress' as string]: progress }} onClick={() => moveProduct(1)} aria-label="Next product">
          <span>{String(activeIndex + 1).padStart(2, '0')}</span>
        </button>
        <div className="swipe-hint">Swipe to swap</div>
      </div>

      <div className="swipe-progress" style={{ width: `${progress * 100}%` }} />

      <div className="swipe-info">
        <div className="swipe-info-copy">
          <span className="swipe-eyebrow">SAFFA FASHION · {String(activeIndex + 1).padStart(2, '0')} / {String(products.length).padStart(2, '0')}</span>
          <h2>{activeProduct.name}</h2>
          <strong className="swipe-price">{PRICE_LABEL}</strong>
        </div>
        <button className="swipe-open" onClick={() => setDetailOpen(true)} aria-label={`Open ${activeProduct.name}`}>
          <img src={activeProduct.image} alt="" />
          <span>Open</span>
        </button>
      </div>
    </section>

    {detailOpen && <div className="swipe-detail-backdrop" onClick={() => setDetailOpen(false)}>
      <aside className="swipe-detail" onClick={event => event.stopPropagation()}>
        <div className="swipe-detail-head"><span className="swipe-eyebrow">SAFFA FASHION · DRESS</span><button onClick={() => setDetailOpen(false)}>Close ×</button></div>
        <div className="swipe-detail-image"><img src={activeProduct.image} alt={activeProduct.name} /></div>
        <span className="swipe-eyebrow">{activeProduct.color}</span>
        <h2>{activeProduct.name}</h2>
        <strong className="swipe-detail-price">{PRICE_LABEL}</strong>
        <p>{activeProduct.description}</p>
        <p>{activeProduct.arDescription}</p>
        <div className="swipe-detail-actions"><button onClick={() => addToCart()}>Add to Cart</button><button className="secondary" onClick={() => setDetailOpen(false)}>Keep Browsing</button></div>
        <div className="swipe-arrows"><button onClick={() => moveProduct(-1)} disabled={activeIndex === 0}>← Previous</button><button onClick={() => moveProduct(1)} disabled={activeIndex === products.length - 1}>Next →</button></div>
      </aside>
    </div>}

    {cartOpen && <div className="swipe-detail-backdrop" onClick={() => setCartOpen(false)}>
      <aside className="swipe-detail" onClick={event => event.stopPropagation()}>
        <div className="swipe-detail-head"><span className="swipe-eyebrow">YOUR SELECTION</span><button onClick={() => setCartOpen(false)}>Close ×</button></div>
        {!cart.length ? <><h2>Your cart is empty.</h2><p>Choose a Saffa dress and tap Open to add it to your selection.</p></> : <>
          {cart.map(item => <div key={item.slug} style={{display:'flex',gap:14,alignItems:'center',padding:'14px 0',borderBottom:'1px solid #eee'}}><img src={item.image} alt="" style={{width:78,height:100,objectFit:'contain',background:'#f5f5f3'}}/><div style={{flex:1}}><strong>{item.name}</strong><p style={{margin:'7px 0'}}>{PRICE_LABEL}</p><div style={{display:'flex',gap:12,alignItems:'center'}}><button onClick={() => changeQuantity(item.slug,-1)}>−</button><span>{item.quantity}</span><button onClick={() => changeQuantity(item.slug,1)}>+</button></div></div></div>)}
          <button className="swipe-detail-actions" style={{width:'100%',border:0}} onClick={orderOnWhatsApp}><button>Checkout via WhatsApp</button></button>
        </>}
      </aside>
    </div>}

    <footer className="blueprint-footer"><span>© Saffa Fashion</span><nav><a href="/contact">Contact</a><a href="#">FAQ</a><a href="#">Terms</a><a href="#">Privacy</a></nav></footer>
  </main>;
}
