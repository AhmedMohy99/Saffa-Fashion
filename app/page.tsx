'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import './responsive.css';
import './product-detail.css';
import { products, PRICE } from '../lib-products';

type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | '2XL';
type ViewMode = 'circle' | 'grid';
type CartItem = { slug: string; name: string; image: string; price: number; size: Size; quantity: number };

const WHATSAPP_NUMBER = '201069473693';
const INSTAGRAM_URL = 'https://www.instagram.com/_saffa_01/';
const TIKTOK_URL = 'https://www.tiktok.com/@saffa_0190';
const PRICE_LABEL = `${PRICE.toFixed(2)} LE`;
const SIZES: Size[] = ['XS', 'S', 'M', 'L', 'XL', '2XL'];
const SIZE_GUIDE: Record<Size, { chest: number; body: number; sleeve: number }> = {
  XS: { chest: 48, body: 135, sleeve: 60 }, S: { chest: 50, body: 136, sleeve: 61 }, M: { chest: 52, body: 137, sleeve: 62 },
  L: { chest: 54, body: 138, sleeve: 63 }, XL: { chest: 56, body: 139, sleeve: 64 }, '2XL': { chest: 58, body: 140, sleeve: 65 },
};

export default function Home() {
  const [viewMode, setViewMode] = useState<ViewMode>('circle');
  const [activeIndex, setActiveIndex] = useState(0);
  const [quickView, setQuickView] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedSize, setSelectedSize] = useState<Size>('L');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const wheelLock = useRef(false);

  const activeProduct = products[activeIndex];
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => { try { const saved = localStorage.getItem('saffa-cart'); if (saved) setCart(JSON.parse(saved)); } catch {} }, []);
  useEffect(() => { localStorage.setItem('saffa-cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setQuickView(false); setDetailOpen(false); setCartOpen(false); }
      if ((quickView || detailOpen) && (event.key === 'ArrowRight' || event.key === 'ArrowDown')) setActiveIndex(value => (value + 1) % products.length);
      if ((quickView || detailOpen) && (event.key === 'ArrowLeft' || event.key === 'ArrowUp')) setActiveIndex(value => (value - 1 + products.length) % products.length);
    };
    window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey);
  }, [quickView, detailOpen]);

  function openProduct(index: number) { setActiveIndex(index); setSelectedSize('L'); setQuickView(true); setDetailOpen(false); }

  function moveProduct(direction: 1 | -1) {
    setActiveIndex(value => (value + direction + products.length) % products.length);
    setQuickView(true);
    setDetailOpen(false);
  }

  function handleStageWheel(event: React.WheelEvent<HTMLDivElement>) {
    if (window.innerWidth > 700 || Math.abs(event.deltaY) < 10 || wheelLock.current) return;
    event.preventDefault();
    wheelLock.current = true;
    moveProduct(event.deltaY > 0 ? 1 : -1);
    window.setTimeout(() => { wheelLock.current = false; }, 420);
  }

  function handleTouchEnd(clientY: number) {
    if (touchStartY === null) return;
    const distance = touchStartY - clientY;
    setTouchStartY(null);
    if (Math.abs(distance) < 45) return;
    moveProduct(distance > 0 ? 1 : -1);
  }

  function relativeMobilePosition(index: number) {
    let diff = index - activeIndex;
    const half = products.length / 2;
    if (diff > half) diff -= products.length;
    if (diff < -half) diff += products.length;
    return diff;
  }

  function addToCart() {
    setCart(current => {
      const existing = current.find(item => item.slug === activeProduct.slug && item.size === selectedSize);
      if (existing) return current.map(item => item.slug === activeProduct.slug && item.size === selectedSize ? { ...item, quantity: item.quantity + 1 } : item);
      return [...current, { slug: activeProduct.slug, name: activeProduct.name, image: activeProduct.image, price: PRICE, size: selectedSize, quantity: 1 }];
    });
    setQuickView(false); setDetailOpen(false); setCartOpen(true);
  }

  function changeQuantity(slug: string, size: Size, delta: number) { setCart(current => current.map(item => item.slug === slug && item.size === size ? { ...item, quantity: item.quantity + delta } : item).filter(item => item.quantity > 0)); }

  function orderOnWhatsApp() {
    if (!cart.length) return;
    const lines = cart.map(item => `• ${item.name}\n  Size: ${item.size}\n  Quantity: ${item.quantity}\n  Price: ${item.price.toFixed(2)} LE`).join('\n\n');
    const message = `Hello Saffa Fashion 👋\n\nI would like to place an order:\n\n${lines}\n\nTotal: ${subtotal.toFixed(2)} LE\n\nPlease confirm my order and delivery details.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  }

  function askSaffa() { window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello Saffa Fashion 👋 I need help choosing a dress and the right size.')}`, '_blank', 'noopener,noreferrer'); }
  const ringProducts = useMemo(() => products.map((product, index) => ({ product, index, angle: index * (360 / products.length) - 90 + rotation })), [rotation]);

  return <main className="saffa-store" id="top">
    <header className="store-header blueprint-header">
      <a className="brand-wordmark" href="#top">Saffa Fashion</a>
      <button className="ask-ai centered-ai" onClick={askSaffa}><span>◉</span> Ask Saffa</button>
      <nav className={`blueprint-nav ${mobileMenuOpen ? 'mobile-open' : ''}`} aria-label="Main navigation">
        <a href="#collection" onClick={() => setMobileMenuOpen(false)}>Store</a><label className="region-select"><span>Region</span><select defaultValue="ROW" aria-label="Region"><option>ROW</option><option>EG</option></select></label>
        <button className={viewMode === 'grid' ? 'nav-view active' : 'nav-view'} onClick={() => setViewMode('grid')}>Grid</button><button className={viewMode === 'circle' ? 'nav-view active' : 'nav-view'} onClick={() => setViewMode('circle')}>Circle</button>
        <button className="cart-link" onClick={() => setCartOpen(true)}>Cart {cartCount}</button><a href="/contact">Contact</a>
      </nav><button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(value => !value)} aria-label="Menu"><span/><span/><span/></button>
    </header>

    <section id="collection" className={`blueprint-showcase ${viewMode === 'grid' ? 'is-grid' : 'is-circle'} ${quickView ? 'is-zoomed' : ''}`}>
      <div className="showcase-topline"><span>SAFFA FASHION · صفا فاشون</span><span>{String(products.length).padStart(2, '0')} DRESSES · {PRICE_LABEL} EACH</span></div>
      <div className="showcase-copy"><span className="eyebrow">THE SAFFA COLLECTION</span><h1>Seven expressions.<br/>One Saffa style.</h1><p>Modest silhouettes designed for effortless everyday elegance.</p></div>
      <div className="showcase-stage" style={{ ['--wheel-rotation' as string]: `${rotation}deg` }} onWheel={handleStageWheel} onTouchStart={event => setTouchStartY(event.touches[0].clientY)} onTouchEnd={event => handleTouchEnd(event.changedTouches[0].clientY)}>
        <div className="wheel-orbit" aria-hidden="true"/><div className="wheel-center"><span>SAFFA</span><strong>07</strong><small>DRESSES</small></div>
        {viewMode === 'circle' ? ringProducts.map(({ product, index, angle }) => <button key={product.slug} className={`showcase-product ${activeIndex === index ? 'is-current' : ''} ${activeIndex === index && quickView ? 'is-active' : ''}`} style={{ ['--angle' as string]: `${angle}deg`, ['--distance' as string]: 'min(31vw, 410px)', ['--mobile-offset' as string]: relativeMobilePosition(index) }} onClick={() => openProduct(index)} aria-label={`Open ${product.name}`}><span className="showcase-product-image"><img src={product.image} alt={product.name}/></span><span className="showcase-product-index">{String(index + 1).padStart(2,'0')}</span><span className="showcase-label">{product.name} · {PRICE_LABEL}</span></button>) : products.map((product, index) => <button key={product.slug} className={`showcase-product grid-product ${activeIndex === index ? 'is-current is-active' : ''}`} onClick={() => openProduct(index)} aria-label={`Open ${product.name}`}><span className="showcase-product-image"><img src={product.image} alt={product.name}/></span><span className="showcase-product-index">{String(index + 1).padStart(2,'0')}</span><span className="showcase-label">{product.name} · {PRICE_LABEL}</span></button>)}
      </div><div className="showcase-footer"><span>FAQ</span><span>Terms</span><span>Privacy</span><span>Swipe / scroll to swap · Tap a piece to zoom</span></div>
    </section>

    {quickView && <div className="quick-view-card" onClick={() => setDetailOpen(true)} role="button" tabIndex={0}><div><span className="quick-label">QUICK VIEW</span><h2>{activeProduct.name}</h2><strong>{PRICE_LABEL}</strong></div><span className="quick-thumb"><img src={activeProduct.image} alt=""/><em>Open</em></span><button className="quick-close" onClick={event => { event.stopPropagation(); setQuickView(false); }}>×</button></div>}

    {detailOpen && <div className="detail-backdrop" onClick={() => setDetailOpen(false)}><aside className="detail-panel" onClick={event => event.stopPropagation()}>
      <div className="detail-header"><span className="quick-label">SAFFA FASHION · DRESSES</span><button onClick={() => setDetailOpen(false)}>Close ×</button></div>
      <div className="detail-image"><img src={activeProduct.image} alt={activeProduct.name}/></div>
      <div className="detail-gallery"><button className="selected"><img src={activeProduct.image} alt="Front view"/></button><button><img src={activeProduct.image} alt="Alternate view"/></button><button><img src={activeProduct.image} alt="Detail view"/></button></div>
      {'video' in activeProduct && typeof activeProduct.video === 'string' && activeProduct.video ? <div className="detail-video"><video src={activeProduct.video} poster={activeProduct.image} controls playsInline preload="metadata"/></div> : null}
      <span className="eyebrow">{activeProduct.color}</span><h2>{activeProduct.name}</h2><strong className="detail-price">{PRICE_LABEL}</strong><p>{activeProduct.description}</p><p className="arabic-copy">{activeProduct.arDescription}</p><p className="shipping-note">Delivery and shipping details are confirmed with your Saffa order.</p>
      <div className="detail-swatches">{products.slice(Math.max(0, activeIndex - 1), activeIndex + 2).map((item, index) => <button key={item.slug} onClick={() => setActiveIndex(Math.max(0, activeIndex - 1) + index)}><img src={item.image} alt={item.name}/></button>)}</div>
      <section className="sizing-section"><div className="sizing-heading"><div><span className="quick-label">SIZE GUIDE</span><h3>Select your size</h3></div><span>All measurements in cm</span></div><div className="size-selector">{SIZES.map(size => <button key={size} className={selectedSize === size ? 'selected' : ''} onClick={() => setSelectedSize(size)}>{size}</button>)}</div><div className="sizing-table-wrap"><table className="sizing-table"><thead><tr><th>Measurement</th>{SIZES.map(size => <th key={size}>{size}</th>)}</tr></thead><tbody><tr><td>Chest Width</td>{SIZES.map(size => <td key={size}>{SIZE_GUIDE[size].chest}</td>)}</tr><tr><td>Body Length</td>{SIZES.map(size => <td key={size}>{SIZE_GUIDE[size].body}</td>)}</tr><tr><td>Sleeve Length</td>{SIZES.map(size => <td key={size}>{SIZE_GUIDE[size].sleeve}</td>)}</tr></tbody></table></div><p className="size-footnote">* All measurements are in centimeters. For the best fit, compare these garment measurements with a similar dress you already own.</p></section>
      <button className="detail-cart" onClick={addToCart}>Add to Cart <span>{PRICE_LABEL}</span></button><p className="detail-helper">Swipe, scroll, or use ← → to browse.</p><div className="detail-arrows"><button onClick={() => setActiveIndex(value => (value - 1 + products.length) % products.length)}>← Previous</button><button onClick={() => setActiveIndex(value => (value + 1) % products.length)}>Next →</button></div>
    </aside></div>}

    {cartOpen && <div className="cart-backdrop" onClick={() => setCartOpen(false)}><aside className="blueprint-cart" onClick={event => event.stopPropagation()}><div className="cart-head"><div><span className="quick-label">YOUR SELECTION</span><h2>Cart</h2></div><button onClick={() => setCartOpen(false)}>Close ×</button></div>{!cart.length ? <div className="empty-cart"><h3>Your cart is empty.</h3><p>Select a Saffa dress to start your order.</p><button onClick={() => { setCartOpen(false); setViewMode('circle'); }}>Browse Store</button></div> : <><div className="cart-list">{cart.map(item => <div className="cart-row" key={`${item.slug}-${item.size}`}><img src={item.image} alt=""/><div><strong>{item.name}</strong><small>{item.size} · {item.price.toFixed(2)} LE</small><div className="qty"><button onClick={() => changeQuantity(item.slug,item.size,-1)}>−</button><span>{item.quantity}</span><button onClick={() => changeQuantity(item.slug,item.size,1)}>+</button></div></div><b>{(item.price * item.quantity).toFixed(2)} LE</b></div>)}</div><div className="cart-summary"><div><span>Subtotal</span><b>{subtotal.toFixed(2)} LE</b></div><div><span>Tax</span><span>Calculated at checkout</span></div><div className="cart-total"><strong>Total</strong><strong>{subtotal.toFixed(2)} LE</strong></div></div><button className="checkout-pill" onClick={orderOnWhatsApp}>Checkout via WhatsApp <span>→</span></button></>}</aside></div>}
    <footer className="blueprint-footer"><span>© Saffa Fashion</span><nav><a href="/contact">Contact</a><a href="#">FAQ</a><a href="#">Terms</a><a href="#">Privacy</a><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram</a><a href={TIKTOK_URL} target="_blank" rel="noreferrer">TikTok</a></nav></footer>
  </main>;
}
