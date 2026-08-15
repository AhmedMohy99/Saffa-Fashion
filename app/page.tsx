'use client';

import { useEffect, useRef, useState } from 'react';
import './responsive.css';
import './product-detail.css';
import './circle-fix.css';
import './swipe-viewer.css';
import { products, PRICE, type Product } from '../lib-products';

type CartItem = { slug: string; name: string; image: string; price: number; quantity: number };
const WHATSAPP_NUMBER = '201069473693';

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [detailOpen, setDetailOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const wheelLock = useRef(false);
  const activeProduct = products[activeIndex];
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

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

  function handleWheel(event: React.WheelEvent<HTMLDivElement>) {
    if (Math.abs(event.deltaY) < 10 || wheelLock.current) return;
    event.preventDefault();
    if ((event.deltaY > 0 && activeIndex === products.length - 1) || (event.deltaY < 0 && activeIndex === 0)) return;
    wheelLock.current = true;
    moveProduct(event.deltaY > 0 ? 1 : -1);
    window.setTimeout(() => { wheelLock.current = false; }, 650);
  }

  function handleTouchStart(event: React.TouchEvent<HTMLDivElement>) {
    setTouchStart(event.touches[0]?.clientY ?? null);
  }

  function handleTouchEnd(event: React.TouchEvent<HTMLDivElement>) {
    if (touchStart === null) return;
    const distance = touchStart - (event.changedTouches[0]?.clientY ?? touchStart);
    setTouchStart(null);
    if (Math.abs(distance) >= 50) moveProduct(distance > 0 ? 1 : -1);
  }

  function openProduct() { setDetailOpen(true); }

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

  function removeFromCart(slug: string) {
    setCart(current => current.filter(item => item.slug !== slug));
  }

  function clearCart() {
    setCart([]);
  }

  function orderOnWhatsApp() {
    if (!cart.length) return;
    const lines = cart.map(item => `• ${item.name}\n  Quantity: ${item.quantity}\n  Price: EGP ${item.price.toFixed(2)}`).join('\n\n');
    const message = `Hello Saffa Fashion 👋\n\nI would like to place an order:\n\n${lines}\n\nTotal: EGP ${cartTotal.toFixed(2)}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  }

  return (
    <main className="saffa-home" id="top">
      <header className="store-header saffa-minimal-header">
        <a className="brand-wordmark" href="/">SAFFA <span>FASHION</span></a>
        <nav className="saffa-main-nav" aria-label="Main navigation">
          <a className="active" href="/">Home</a>
          <a href="/grid">Collection</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </nav>
        <button className="saffa-cart-button" type="button" aria-label={`Open cart, ${cartCount} items`} onClick={() => setCartOpen(true)}>
          <span className="saffa-cart-label">Cart</span><span>{cartCount}</span>
        </button>
      </header>

      <section className="saffa-product-stage" onWheel={handleWheel} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} aria-label="Saffa Fashion product showcase">
        <div className="saffa-product-track" style={{ transform: `translate3d(0, -${activeIndex * 100}%, 0)` }}>
          {products.map((product, index) => (
            <article className="saffa-product-slide" key={product.slug} aria-hidden={index !== activeIndex}>
              <button className="saffa-product-visual" onClick={openProduct} aria-label={`Open ${product.name}`}>
                <img src={product.image} alt={product.name} draggable={false} />
              </button>
            </article>
          ))}
        </div>

        <div className="saffa-product-index"><span className="index-active">{String(activeIndex + 1).padStart(2, '0')}</span><span>/</span><span>{String(products.length).padStart(2, '0')}</span></div>

        <div className="saffa-product-meta">
          <span>{activeProduct.color}</span>
          <h1>{activeProduct.name}</h1>
          <strong>EGP {PRICE.toFixed(2)}</strong>
          <button onClick={openProduct}>Open</button>
        </div>

        <div className="saffa-scroll-hint"><span>Scroll</span><i>↓</i></div>
        <div className="saffa-progress" style={{ width: `${((activeIndex + 1) / products.length) * 100}%` }} />
      </section>

      {detailOpen && (
        <div className="swipe-detail-backdrop" onClick={() => setDetailOpen(false)}>
          <aside className="swipe-detail" onClick={event => event.stopPropagation()}>
            <div className="swipe-detail-head"><span className="swipe-eyebrow">SAFFA FASHION</span><button type="button" onClick={() => setDetailOpen(false)}>Close ×</button></div>
            <div className="swipe-detail-image"><img src={activeProduct.image} alt={activeProduct.name} /></div>
            <span className="swipe-eyebrow">{activeProduct.color}</span>
            <h2>{activeProduct.name}</h2>
            <strong className="swipe-detail-price">EGP {PRICE.toFixed(2)}</strong>
            <p>{activeProduct.description}</p>
            <p>{activeProduct.arDescription}</p>
            <div className="swipe-detail-actions"><button type="button" onClick={() => addToCart()}>Add to Cart</button><button type="button" className="secondary" onClick={() => setDetailOpen(false)}>Keep Browsing</button></div>
          </aside>
        </div>
      )}

      {cartOpen && (
        <div className="saffa-cart-overlay" role="dialog" aria-modal="true" aria-label="Shopping cart" onClick={() => setCartOpen(false)}>
          <aside className="saffa-cart-drawer" onClick={event => event.stopPropagation()}>
            <div className="saffa-cart-head">
              <div><span className="swipe-eyebrow">YOUR SELECTION</span><h2>Your Cart</h2><p>{cartCount} {cartCount === 1 ? 'item' : 'items'}</p></div>
              <button type="button" className="saffa-cart-close" onClick={() => setCartOpen(false)} aria-label="Close cart">×</button>
            </div>

            {!cart.length ? (
              <div className="saffa-cart-empty"><div className="saffa-cart-empty-circle">0</div><h3>Your cart is empty.</h3><p>Open a dress and tap “Add to Cart” to add it here.</p><button type="button" onClick={() => setCartOpen(false)}>Continue Shopping</button></div>
            ) : (
              <>
                <div className="saffa-cart-items">
                  {cart.map(item => (
                    <div key={item.slug} className="saffa-cart-item">
                      <div className="saffa-cart-image"><img src={item.image} alt="" /></div>
                      <div className="saffa-cart-item-main">
                        <strong>{item.name}</strong>
                        <span>EGP {item.price.toFixed(2)}</span>
                        <div className="saffa-quantity" aria-label={`Quantity for ${item.name}`}>
                          <button type="button" onClick={() => changeQuantity(item.slug, -1)} aria-label="Decrease quantity">−</button>
                          <b>{item.quantity}</b>
                          <button type="button" onClick={() => changeQuantity(item.slug, 1)} aria-label="Increase quantity">+</button>
                        </div>
                      </div>
                      <button type="button" className="saffa-remove" onClick={() => removeFromCart(item.slug)} aria-label={`Remove ${item.name}`}>Remove</button>
                    </div>
                  ))}
                </div>
                <div className="saffa-cart-total"><span>Total</span><strong>EGP {cartTotal.toFixed(2)}</strong></div>
                <div className="saffa-cart-actions"><button type="button" className="saffa-clear-cart" onClick={clearCart}>Clear Cart</button><button type="button" className="saffa-checkout" onClick={orderOnWhatsApp}>Checkout via WhatsApp <span>↗</span></button></div>
              </>
            )}
          </aside>
        </div>
      )}

      <footer className="saffa-minimal-footer"><span>© Saffa Fashion</span><div><a href="/about">About</a><a href="/contact">Contact</a><a href="#">Privacy</a></div></footer>
    </main>
  );
}
