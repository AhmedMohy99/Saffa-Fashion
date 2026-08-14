'use client';

import { useEffect, useState } from 'react';
import './responsive.css';
import { products, PRICE, SIZE_INFO } from '../lib-products';

type Size = 'L' | 'XL';
type ViewMode = 'circle' | 'grid' | 'row';
type CartItem = { slug: string; name: string; image: string; price: number; size: Size; quantity: number };

const WHATSAPP_NUMBER = '201069473693';
const INSTAGRAM_URL = 'https://www.instagram.com/_saffa_01/';
const TIKTOK_URL = 'https://www.tiktok.com/@saffa_0190';
const PRICE_LABEL = `${PRICE.toFixed(2)} LE`;

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<(typeof products)[number] | null>(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedSize, setSelectedSize] = useState<Size>('L');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('circle');

  useEffect(() => {
    try { const saved = localStorage.getItem('saffa-cart'); if (saved) setCart(JSON.parse(saved)); } catch {}
  }, []);
  useEffect(() => { localStorage.setItem('saffa-cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setSelectedProduct(null); setCartOpen(false); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function openProduct(product: (typeof products)[number]) { setSelectedProduct(product); setSelectedImage(product.image); setSelectedSize('L'); }
  function addToCart() {
    if (!selectedProduct) return;
    setCart(current => {
      const existing = current.find(item => item.slug === selectedProduct.slug && item.size === selectedSize);
      if (existing) return current.map(item => item.slug === selectedProduct.slug && item.size === selectedSize ? { ...item, quantity: item.quantity + 1 } : item);
      return [...current, { slug: selectedProduct.slug, name: selectedProduct.name, image: selectedProduct.image, price: PRICE, size: selectedSize, quantity: 1 }];
    });
    setSelectedProduct(null);
  }
  function removeFromCart(slug: string, size: Size) { setCart(current => current.filter(item => !(item.slug === slug && item.size === size))); }
  function changeQuantity(slug: string, size: Size, direction: 'plus' | 'minus') {
    setCart(current => current.map(item => item.slug !== slug || item.size !== size ? item : { ...item, quantity: direction === 'plus' ? item.quantity + 1 : item.quantity - 1 }).filter(item => item.quantity > 0));
  }
  function orderOnWhatsApp() {
    if (!cart.length) return;
    const lines = cart.map(item => `• ${item.name}\n  Size: ${item.size}\n  Quantity: ${item.quantity}\n  Price: ${item.price.toFixed(2)} LE`).join('\n\n');
    const message = `Hello Saffa Fashion 👋\n\nI would like to place an order:\n\n${lines}\n\nSubtotal: ${subtotal.toFixed(2)} LE\nTotal: ${subtotal.toFixed(2)} LE\n\nPlease confirm my order and delivery details.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  }
  function askAI() {
    const message = 'Hello Saffa Fashion 👋 I need help choosing a dress and the right size.';
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  }
  function browseProduct(direction: 'next' | 'previous') {
    if (!selectedProduct) return;
    const currentIndex = products.findIndex(product => product.slug === selectedProduct.slug);
    const nextIndex = direction === 'next' ? (currentIndex + 1) % products.length : (currentIndex - 1 + products.length) % products.length;
    openProduct(products[nextIndex]);
  }

  return (
    <main className="saffa-store">
      <header className="store-header">
        <a className="saffa-brand" href="#top" aria-label="Saffa Fashion home"><img className="saffa-logo-image" src="/logo.jpeg" alt="Saffa Fashion" /></a>
        <nav className={`saffa-nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`} aria-label="Main navigation">
          <a href="#top" onClick={() => setMobileMenuOpen(false)}>Home</a><a href="#collection" onClick={() => setMobileMenuOpen(false)}>Collection</a><a href="/contact" onClick={() => setMobileMenuOpen(false)}>Contact Us</a><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram</a><a href={TIKTOK_URL} target="_blank" rel="noreferrer">TikTok</a><a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">WhatsApp</a>
        </nav>
        <div className="header-actions"><button className="ask-ai" onClick={askAI}>Ask AI</button><button className="cart-button" onClick={() => setCartOpen(true)} aria-label={`Open cart, ${cartCount} items`}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M6 8h12l-1 12H7L6 8Z"/><path d="M9 8a3 3 0 0 1 6 0"/></svg>{cartCount > 0 && <span className="cart-badge">{cartCount}</span>}</button><button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(value => !value)} aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileMenuOpen}><span/><span/><span/></button></div>
      </header>
      <div id="top" />

      <section className="hero-section"><div className="hero-copy"><span className="eyebrow">SAFFA FASHION · صفا فاشون</span><h1>The Saffa<br />Collection</h1><p>Elegant modest dresses designed for effortless everyday style.</p><a className="hero-cta" href="#collection">Explore Collection <span>↓</span></a></div><div className="hero-meta"><span>07 DRESSES</span><span>700.00 LE EACH</span></div></section>

      <section id="collection" className={`collection-section gallery-${viewMode}`} aria-label="Product collection">
        <div className="collection-heading"><div><span className="eyebrow">THE COLLECTION</span><h2>Seven expressions.<br />One Saffa style.</h2></div><div className="collection-tools"><span className="collection-count">{String(products.length).padStart(2, '0')} PIECES</span><div className="view-toggle" role="group" aria-label="Choose product view"><button className={viewMode === 'row' ? 'active' : ''} onClick={() => setViewMode('row')} aria-pressed={viewMode === 'row'}>Row</button><button className={viewMode === 'grid' ? 'active' : ''} onClick={() => setViewMode('grid')} aria-pressed={viewMode === 'grid'}>Grid</button><button className={viewMode === 'circle' ? 'active' : ''} onClick={() => setViewMode('circle')} aria-pressed={viewMode === 'circle'}>Circle</button></div></div></div>
        <div className="gallery-stage">
          <div className="circle-ring" aria-hidden="true"/><div className="circle-center" aria-hidden="true"><span>SAFFA</span><strong>{String(products.length).padStart(2, '0')}</strong><small>DRESSES</small></div>
          {products.map((product, index) => {
            const angle = (index / products.length) * 360 - 90;
            const positions = [{top:'4%',left:'43%',size:138},{top:'21%',left:'73%',size:108},{top:'58%',left:'77%',size:132},{top:'78%',left:'48%',size:116},{top:'65%',left:'12%',size:142},{top:'27%',left:'7%',size:112},{top:'8%',left:'20%',size:124}][index % 7];
            return <button key={product.slug} className="gallery-product" style={{'--angle':`${angle}deg`,'--circle-top':positions.top,'--circle-left':positions.left,'--circle-size':`${positions.size}px`} as React.CSSProperties} onClick={() => openProduct(product)} aria-label={`Open ${product.name}`}><span className="gallery-image"><img src={product.image} alt={product.name}/></span><span className="gallery-number">{String(index+1).padStart(2,'0')}</span><span className="gallery-hover-label">{product.name} · {PRICE_LABEL}</span></button>;
          })}
        </div>
      </section>

      <section className="store-footer"><div className="size-section"><span className="eyebrow">AVAILABLE SIZES</span><div className="size-guide"><div className="size-card"><strong>L</strong><span>{SIZE_INFO.L}</span></div><div className="size-card"><strong>XL</strong><span>{SIZE_INFO.XL}</span></div></div></div><div className="footer-price"><span>EVERY DRESS · FLAT RATE</span><strong>{PRICE_LABEL}</strong></div></section>
      <footer className="social-footer"><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram</a><a href={TIKTOK_URL} target="_blank" rel="noreferrer">TikTok</a><a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">WhatsApp</a><a href="/contact">Contact Us</a></footer>

      {selectedProduct && <div className="sheet-overlay" onClick={() => setSelectedProduct(null)}><section className="product-sheet" onClick={event => event.stopPropagation()} role="dialog" aria-modal="true" aria-label={selectedProduct.name}>
        <div className="sheet-top"><div><span className="sheet-label">DRESSES · SAFFA FASHION</span><h2>{selectedProduct.name}</h2><div className="sheet-price">{PRICE_LABEL}</div></div><button className="sheet-close" onClick={() => setSelectedProduct(null)} aria-label="Close product"><span className="close-icon">×</span></button></div>
        <div className="sheet-content"><div className="sheet-main-image"><img src={selectedImage || selectedProduct.image} alt={selectedProduct.name}/></div><p className="sheet-description">{selectedProduct.description}</p><p className="sheet-arabic">{selectedProduct.arDescription}</p>
          <div className="sheet-swatches" aria-label="Product images">{[selectedProduct.image,selectedProduct.image,selectedProduct.image].map((image,index)=><button key={`${image}-${index}`} className={selectedImage===image&&index===0?'selected':''} onClick={()=>setSelectedImage(image)} aria-label={`View image ${index+1}`}><img src={image} alt=""/></button>)}</div>
          <div className="sheet-option"><div className="option-heading"><span>Select Size</span><small>Choose your weight range</small></div><div className="sheet-sizes">{(['L','XL'] as Size[]).map(size=><button key={size} className={selectedSize===size?'selected':''} onClick={()=>setSelectedSize(size)}><strong>{size}</strong><span>{SIZE_INFO[size]}</span></button>)}</div></div>
          <button className="add-cart-button" onClick={addToCart}><span>Add to Cart</span><strong>{PRICE_LABEL}</strong></button><p className="sheet-helper">Swipe, scroll, or use ← → to browse</p><div className="sheet-browse"><button onClick={()=>browseProduct('previous')}>← Previous</button><button onClick={()=>browseProduct('next')}>Next →</button></div>
        </div>
      </section></div>}

      {cartOpen && <div className="cart-overlay" onClick={() => setCartOpen(false)}><section className="cart-drawer" onClick={event => event.stopPropagation()} role="dialog" aria-modal="true"><div className="cart-header"><div><span className="sheet-label">YOUR SELECTION</span><h2>Cart</h2></div><button className="cart-close" onClick={() => setCartOpen(false)}>Close <span>×</span></button></div>{!cart.length?<div className="empty-cart"><div className="empty-circle">0</div><h3>Your cart is empty</h3><p>Choose one of the Saffa dresses to begin your order.</p><button className="white-pill" onClick={()=>setCartOpen(false)}>Browse Collection</button></div>:<><div className="cart-items">{cart.map(item=><div className="cart-item" key={`${item.slug}-${item.size}`}><span className="cart-item-image"><img src={item.image} alt={item.name}/></span><span className="cart-item-info"><strong>{item.name}</strong><small>Size {item.size} · {item.price.toFixed(2)} LE</small><span className="quantity"><button onClick={()=>changeQuantity(item.slug,item.size,'minus')}>−</button><span>{item.quantity}</span><button onClick={()=>changeQuantity(item.slug,item.size,'plus')}>+</button></span></span><button className="delete-item" onClick={()=>removeFromCart(item.slug,item.size)}>⌫</button></div>)}</div><div className="cart-summary"><div><span>Subtotal</span><strong>{subtotal.toFixed(2)} LE</strong></div><div><span>Tax</span><span>Calculated at checkout</span></div><div className="total-row"><span>Total</span><strong>{subtotal.toFixed(2)} LE</strong></div></div><button className="checkout-button" onClick={orderOnWhatsApp}>Order via WhatsApp <span>→</span></button><p className="checkout-note">Your products, sizes and quantities will be sent directly to Saffa Fashion on WhatsApp.</p></>}</section></div>}
    </main>
  );
}
