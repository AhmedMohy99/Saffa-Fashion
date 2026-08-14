'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { products, PRICE, SIZE_INFO } from '../lib-products';

type ViewMode = 'circle' | 'grid';
type Size = 'L' | 'XL';
type CartItem = { slug: string; name: string; image: string; price: number; size: Size; quantity: number };

const WHATSAPP_NUMBER = '201016286261';
const INSTAGRAM_URL = 'https://www.instagram.com/_saffa_01/';
const TIKTOK_URL = 'https://www.tiktok.com/@saffa_0190';

export default function Home() {
  const [viewMode, setViewMode] = useState<ViewMode>('circle');
  const [selectedProduct, setSelectedProduct] = useState<(typeof products)[number] | null>(null);
  const [selectedSize, setSelectedSize] = useState<Size>('L');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const circleRef = useRef<HTMLDivElement>(null);
  const [circleSize, setCircleSize] = useState(500);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('saffa-cart');
      if (saved) setCart(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem('saffa-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const element = circleRef.current;
    if (!element) return;
    const updateSize = () => setCircleSize(element.clientWidth);
    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const circleProducts = useMemo(() => {
    const radius = circleSize * 0.37;
    return products.map((product, index) => {
      const angle = (360 / products.length) * index - 90;
      const radians = (angle * Math.PI) / 180;
      return { product, x: radius * Math.cos(radians), y: radius * Math.sin(radians), angle };
    });
  }, [circleSize]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function openProduct(product: (typeof products)[number]) {
    setSelectedProduct(product);
    setSelectedSize('L');
  }

  function addToCart() {
    if (!selectedProduct) return;
    setCart(current => {
      const existing = current.find(item => item.slug === selectedProduct.slug && item.size === selectedSize);
      if (existing) {
        return current.map(item => item.slug === selectedProduct.slug && item.size === selectedSize ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...current, { slug: selectedProduct.slug, name: selectedProduct.name, image: selectedProduct.image, price: PRICE, size: selectedSize, quantity: 1 }];
    });
    setSelectedProduct(null);
  }

  function removeFromCart(slug: string, size: Size) {
    setCart(current => current.filter(item => !(item.slug === slug && item.size === size)));
  }

  function changeQuantity(slug: string, size: Size, direction: 'plus' | 'minus') {
    setCart(current => current.map(item => {
      if (item.slug !== slug || item.size !== size) return item;
      return { ...item, quantity: direction === 'plus' ? item.quantity + 1 : item.quantity - 1 };
    }).filter(item => item.quantity > 0));
  }

  function orderOnWhatsApp() {
    if (!cart.length) return;
    const lines = cart.map(item => `• ${item.name}\n  Size: ${item.size}\n  Quantity: ${item.quantity}\n  Price: ${item.price.toLocaleString()} EGP`).join('\n\n');
    const message = `Hello Saffa Fashion 👋\n\nI would like to place an order:\n\n${lines}\n\nSubtotal: ${subtotal.toLocaleString()} EGP\nTotal: ${subtotal.toLocaleString()} EGP\n\nPlease confirm my order and delivery details.\n\nThank you!`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  }

  function askAI() {
    const message = 'Hello Saffa Fashion 👋 I need help choosing a dress and the right size.';
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  }

  return (
    <main className="saffa-store">
      <header className="store-header">
        <a className="brand" href="#top" aria-label="Saffa Fashion home">
          <span className="brand-logo"><img src="/logo.jpeg" alt="Saffa Fashion" /></span>
          <span className="brand-name">SAFFA<span>FASHION</span></span>
        </a>
        <div className="header-actions">
          <button className="ask-ai" onClick={askAI}>Ask AI</button>
          <button className="cart-button" onClick={() => setCartOpen(true)} aria-label={`Open cart, ${cartCount} items`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M6 8h12l-1 12H7L6 8Z"/><path d="M9 8a3 3 0 0 1 6 0"/></svg>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>
      </header>

      <div id="top" />
      <section className="circle-intro">
        <div><span className="eyebrow">SAFFA FASHION · صفا فاشون</span><h1>The Saffa<br />Collection</h1></div>
        <div className="view-toggle" aria-label="Product view">
          <button className={viewMode === 'grid' ? 'active' : ''} onClick={() => setViewMode('grid')}>Grid</button>
          <button className={viewMode === 'circle' ? 'active' : ''} onClick={() => setViewMode('circle')}>Circle</button>
        </div>
      </section>

      {viewMode === 'circle' ? (
        <section className="circle-section" aria-label="Circle product view">
          <div className="circle-stage" ref={circleRef}>
            <div className="orbit-line" aria-hidden="true" />
            <div className="circle-center"><span>SAFFA</span><strong>07</strong><small>DRESSES</small></div>
            {circleProducts.map(({ product, x, y }, index) => (
              <button key={product.slug} className="circle-product" style={{ '--x': `${x}px`, '--y': `${y}px`, '--delay': `${index * 45}ms` } as React.CSSProperties} onClick={() => openProduct(product)} aria-label={`View ${product.name}`}>
                <span className="circle-product-image"><img src={product.image} alt={product.name} /></span>
                <span className="circle-product-number">0{index + 1}</span>
              </button>
            ))}
          </div>
        </section>
      ) : (
        <section className="grid-section" aria-label="Grid product view">
          <div className="product-grid">
            {products.map((product, index) => (
              <button className="grid-product" key={product.slug} onClick={() => openProduct(product)}>
                <span className="grid-product-image"><img src={product.image} alt={product.name} /><span className="grid-number">0{index + 1}</span></span>
                <span className="grid-product-info"><span><strong>{product.name}</strong><small>{product.arName}</small></span><strong>{PRICE.toLocaleString()} EGP</strong></span>
              </button>
            ))}
          </div>
        </section>
      )}

      <section className="store-footer">
        <div><span className="eyebrow">AVAILABLE SIZES</span><h2>L / XL</h2><p>L — {SIZE_INFO.L}<br />XL — {SIZE_INFO.XL}</p></div>
        <div className="footer-price"><span>EVERY DRESS</span><strong>{PRICE.toLocaleString()} EGP</strong></div>
      </section>

      <footer className="social-footer">
        <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram</a>
        <a href={TIKTOK_URL} target="_blank" rel="noreferrer">TikTok</a>
        <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">WhatsApp</a>
        <a href="/contact">Contact Us</a>
      </footer>

      {selectedProduct && (
        <div className="sheet-overlay" onClick={() => setSelectedProduct(null)}>
          <section className="product-sheet" onClick={event => event.stopPropagation()} role="dialog" aria-modal="true" aria-label={selectedProduct.name}>
            <div className="sheet-top">
              <div><span className="sheet-label">SAFFA FASHION</span><h2>{selectedProduct.name}</h2><div className="sheet-price">{PRICE.toLocaleString()} EGP</div></div>
              <button className="sheet-close" onClick={() => setSelectedProduct(null)}><span className="sheet-close-image"><img src={selectedProduct.image} alt="" /></span><span>Close</span><span className="close-icon">×</span></button>
            </div>
            <div className="sheet-content">
              <p className="sheet-description">{selectedProduct.description}</p>
              <p className="sheet-arabic">{selectedProduct.arDescription}</p>
              <div className="sheet-option"><div className="option-heading"><span>Select Size</span><small>Choose your weight range</small></div>
                <div className="sheet-sizes">
                  {(['L', 'XL'] as Size[]).map(size => <button key={size} className={selectedSize === size ? 'selected' : ''} onClick={() => setSelectedSize(size)}><strong>{size}</strong><span>{SIZE_INFO[size]}</span></button>)}
                </div>
              </div>
              <button className="add-cart-button" onClick={addToCart}><span>Add to Cart</span><strong>{PRICE.toLocaleString()} EGP</strong></button>
            </div>
          </section>
        </div>
      )}

      {cartOpen && (
        <div className="cart-overlay" onClick={() => setCartOpen(false)}>
          <section className="cart-drawer" onClick={event => event.stopPropagation()} role="dialog" aria-modal="true" aria-label="Shopping cart">
            <div className="cart-header"><div><span className="sheet-label">YOUR SELECTION</span><h2>Cart</h2></div><button className="cart-close" onClick={() => setCartOpen(false)}>Close <span>×</span></button></div>
            {!cart.length ? (
              <div className="empty-cart"><div className="empty-circle">0</div><h3>Your cart is empty</h3><p>Choose one of the Saffa dresses to begin your order.</p><button className="white-pill" onClick={() => setCartOpen(false)}>Browse Collection</button></div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map(item => (
                    <div className="cart-item" key={`${item.slug}-${item.size}`}>
                      <span className="cart-item-image"><img src={item.image} alt={item.name} /></span>
                      <span className="cart-item-info"><strong>{item.name}</strong><small>Size {item.size} · {item.price.toLocaleString()} EGP</small><span className="quantity"><button onClick={() => changeQuantity(item.slug, item.size, 'minus')} aria-label="Decrease quantity">−</button><span>{item.quantity}</span><button onClick={() => changeQuantity(item.slug, item.size, 'plus')} aria-label="Increase quantity">+</button></span></span>
                      <button className="delete-item" onClick={() => removeFromCart(item.slug, item.size)} aria-label={`Remove ${item.name}`}>⌫</button>
                    </div>
                  ))}
                </div>
                <div className="cart-summary"><div><span>Subtotal</span><strong>{subtotal.toLocaleString()} EGP</strong></div><div><span>Tax</span><span>Calculated at checkout</span></div><div className="total-row"><span>Total</span><strong>{subtotal.toLocaleString()} EGP</strong></div></div>
                <button className="checkout-button" onClick={orderOnWhatsApp}>Order via WhatsApp <span>→</span></button>
                <p className="checkout-note">Your products, sizes and quantities will be sent directly to Saffa Fashion on WhatsApp.</p>
              </>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
