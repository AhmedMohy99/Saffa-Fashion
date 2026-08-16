'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import './responsive.css';
import './product-detail.css';
import './circle-fix.css';
import './swipe-viewer.css';
import './cart-actions.css';
import './collection-gate.css';
import SaffaHeader, { useSaffaLanguage } from './components/SaffaHeader';
import { products, type Product, type ProductCategory } from '../lib-products';

type CartItem = { slug: string; name: string; image: string; price: number; quantity: number; color?: string; arColor?: string; size?: string };

export default function Home() {
  const [language] = useSaffaLanguage();
  const [collectionChoice, setCollectionChoice] = useState<ProductCategory | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [view, setView] = useState<'circle' | 'product'>('circle');
  const [detailOpen, setDetailOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const wheelLock = useRef(false);
  const ar = language === 'ar';
  const catalog = useMemo(() => products.filter(product => product.category === collectionChoice), [collectionChoice]);
  const activeProduct = catalog[activeIndex] ?? catalog[0];
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const text = ar
    ? { scroll:'اسحب', open:'فتح', close:'إغلاق', add:'🛒 أضف إلى السلة', buy:'شراء الآن', selection:'اختياراتك', yourCart:'سلة التسوق', item:'منتج', items:'منتجات', empty:'سلتك فارغة', emptyText:'افتحي المنتج واضغطي على أضف إلى السلة لإضافته هنا.', continue:'متابعة التسوق', total:'الإجمالي', clear:'إفراغ السلة', checkout:'إتمام الطلب', buyCart:'شراء الآن', circle:'دائرة', product:'المنتج', sale:'خصم', switchCollection:'تغيير المجموعة' }
    : { scroll:'Scroll', open:'Open', close:'Close', add:'🛒 Add to Cart', buy:'Buy Now', selection:'Your Selection', yourCart:'Your Cart', item:'item', items:'items', empty:'Your cart is empty.', emptyText:'Open a product and tap “Add to Cart” to add it here.', continue:'Continue Shopping', total:'Total', clear:'Clear Cart', checkout:'Checkout', buyCart:'Buy Now', circle:'Circle', product:'Product', sale:'SALE', switchCollection:'Switch Collection' };
  const gateText = ar
    ? { kicker:'صفا فاشن · اختاري المجموعة', title:'أي مجموعة تحبي تشوفي؟', intro:'اختاري الصيف أو الشتاء لعرض القطع المتاحة والأسعار الحالية.', summer:'مجموعة الصيف', summerSub:'دريسات وقطع خفيفة', winter:'مجموعة الشتاء', winterSub:'بليزر وقطع دافئة' }
    : { kicker:'SAFFA FASHION · CHOOSE YOUR COLLECTION', title:'Which collection would you like to see?', intro:'Pick Summer or Winter to browse the available pieces and current prices.', summer:'Summer Collection', summerSub:'Light dresses & sets', winter:'Winter Collection', winterSub:'Blazer & warm pieces' };

  useEffect(() => { try { const saved = localStorage.getItem('saffa-cart'); if (saved) setCart(JSON.parse(saved)); } catch {} }, []);
  useEffect(() => { try { localStorage.setItem('saffa-cart', JSON.stringify(cart)); } catch {} }, [cart]);
  useEffect(() => { document.documentElement.lang = language; document.documentElement.dir = ar ? 'rtl' : 'ltr'; }, [language, ar]);
  useEffect(() => { try { const saved = sessionStorage.getItem('saffa-collection-choice'); if (saved === 'summer' || saved === 'winter') setCollectionChoice(saved); } catch {} }, []);
  useEffect(() => { if (!collectionChoice) return; const timer = window.setTimeout(() => setView('product'), 2200); return () => window.clearTimeout(timer); }, [collectionChoice]);
  useEffect(() => { setActiveIndex(0); setView('circle'); }, [collectionChoice]);
  useEffect(() => { const onKey = (event: KeyboardEvent) => { if (event.key === 'ArrowDown' || event.key === 'ArrowRight') moveProduct(1); if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') moveProduct(-1); if (event.key === 'Escape') { setDetailOpen(false); setCartOpen(false); } }; window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey); });

  function chooseCollection(value: ProductCategory) { setCollectionChoice(value); try { sessionStorage.setItem('saffa-collection-choice', value); } catch {} }
  function switchCollection() { setCollectionChoice(null); try { sessionStorage.removeItem('saffa-collection-choice'); } catch {} }
  function enterProduct(index = activeIndex) { setActiveIndex(index); setView('product'); }
  function moveProduct(direction: 1 | -1) { setView('product'); setActiveIndex(current => { const next = current + direction; if (next < 0) return catalog.length - 1; if (next >= catalog.length) return 0; return next; }); }
  function handleWheel(event: React.WheelEvent<HTMLDivElement>) { if (Math.abs(event.deltaY) < 10 || wheelLock.current) return; event.preventDefault(); wheelLock.current = true; moveProduct(event.deltaY > 0 ? 1 : -1); window.setTimeout(() => { wheelLock.current = false; }, 720); }
  function handleTouchStart(event: React.TouchEvent<HTMLDivElement>) { setTouchStart(event.touches[0]?.clientY ?? null); }
  function handleTouchEnd(event: React.TouchEvent<HTMLDivElement>) { if (touchStart === null) return; const distance = touchStart - (event.changedTouches[0]?.clientY ?? touchStart); setTouchStart(null); if (Math.abs(distance) >= 50) moveProduct(distance > 0 ? 1 : -1); }
  function addToCart(product: Product = activeProduct) { setCart(current => { const found = current.find(item => item.slug === product.slug); if (found) return current.map(item => item.slug === product.slug ? { ...item, quantity: item.quantity + 1, price: product.price, color: product.color, arColor: product.arColor } : item); return [...current, { slug: product.slug, name: product.name, image: product.image, price: product.price, quantity: 1, color: product.color, arColor: product.arColor }]; }); setDetailOpen(false); setCartOpen(true); }
  function changeQuantity(slug: string, delta: number) { setCart(current => current.map(item => item.slug === slug ? { ...item, quantity: item.quantity + delta } : item).filter(item => item.quantity > 0)); }
  function removeFromCart(slug: string) { setCart(current => current.filter(item => item.slug !== slug)); }
  function clearCart() { setCart([]); }
  function orderOnWhatsApp() { if (!cart.length) return; localStorage.setItem('saffa-cart', JSON.stringify(cart)); window.location.href='/checkout'; }
  function buyNow(product: Product = activeProduct) { const next = [{ slug: product.slug, name: product.name, image: product.image, price: product.price, quantity: 1, color: product.color, arColor: product.arColor }]; localStorage.setItem('saffa-cart', JSON.stringify(next)); window.location.href='/checkout'; }
  const circleProducts = useMemo(() => catalog.map((product, index) => ({ product, index, angle: -90 + index * (360 / catalog.length) })), [catalog]);

  if (!collectionChoice) {
    return <main className="saffa-collection-gate" dir={ar ? 'rtl' : 'ltr'}>
      <span>{gateText.kicker}</span>
      <h1>{gateText.title}</h1>
      <p>{gateText.intro}</p>
      <div className="saffa-collection-gate-options">
        <button type="button" onClick={() => chooseCollection('summer')}><strong>{gateText.summer}</strong><span>{gateText.summerSub}</span></button>
        <button type="button" onClick={() => chooseCollection('winter')}><strong>{gateText.winter}</strong><span>{gateText.winterSub}</span></button>
      </div>
    </main>;
  }

  if (!activeProduct) return null;

  return <main className="saffa-home" id="top">
    <SaffaHeader active="home" cartCount={cartCount} cartAction={() => setCartOpen(true)} />
    <section className={`saffa-product-stage saffa-${view}-view`} onWheel={handleWheel} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} aria-label={ar ? 'عرض منتجات صفا فاشن' : 'Saffa Fashion product showcase'}>
      <div className={`saffa-circle-intro ${view === 'circle' ? 'is-visible' : 'is-hidden'}`}><div className="saffa-circle-heading"><span>SAFFA FASHION · {ar ? 'صفا فاشن' : 'COLLECTION'}</span><h1>{ar ? 'مجموعة صفا' : 'The Saffa Collection'}</h1></div><div className="saffa-view-switch"><button className="selected" type="button">{text.circle}</button><button type="button" onClick={() => setView('product')}>{text.product}</button></div><div className="saffa-clock" aria-label="Saffa collection selector"><div className="saffa-clock-ring" /><div className="saffa-clock-center"><span>SAFFA</span><strong>{String(catalog.length).padStart(2, '0')}</strong><small>{ar ? 'قطعة' : 'PIECES'}</small></div>{circleProducts.map(({ product, index, angle }) => <button key={product.slug} className={`saffa-clock-item ${index === activeIndex ? 'active' : ''}`} style={{ '--angle': `${angle}deg` } as React.CSSProperties} onClick={() => enterProduct(index)} aria-label={`${text.open} ${product.name} ${product.color}`}><span><img src={product.image} alt="" /></span><small>{String(index + 1).padStart(2, '0')}</small></button>)}</div><div className="saffa-circle-scroll">{text.scroll}<i>↓</i></div></div>
      <div className={`saffa-product-zoom ${view === 'product' ? 'is-visible' : 'is-hidden'}`}><div className="saffa-product-track" style={{ transform: `translate3d(0, -${activeIndex * 100}%, 0)` }}>{catalog.map((product, index) => <article className="saffa-product-slide" key={product.slug} aria-hidden={index !== activeIndex}><button className="saffa-product-visual" onClick={() => setDetailOpen(true)} aria-label={`${text.open} ${product.name}`}><img src={product.image} alt={product.name} draggable={false} /></button></article>)}</div><div className="saffa-product-index"><span className="index-active">{String(activeIndex + 1).padStart(2, '0')}</span><span>/</span><span>{String(catalog.length).padStart(2, '0')}</span></div><div className="saffa-product-meta"><span>{activeProduct.color}</span><h1>{activeProduct.name}</h1><strong>EGP {activeProduct.price.toFixed(2)} {activeProduct.originalPrice && <del>EGP {activeProduct.originalPrice.toFixed(2)}</del>}</strong>{activeProduct.saleLabel && <em>{activeProduct.saleLabel}</em>}<button onClick={() => setDetailOpen(true)}>{text.open}</button></div><div className="saffa-scroll-hint"><span>{text.scroll}</span><i>↓</i></div><div className="saffa-progress" style={{ width: `${((activeIndex + 1) / catalog.length) * 100}%` }} /><button className="saffa-return-circle" type="button" onClick={() => setView('circle')}>{text.circle}</button><button className="saffa-switch-collection" type="button" onClick={switchCollection}>{text.switchCollection}</button></div>
    </section>
    {detailOpen && <div className="swipe-detail-backdrop" onClick={() => setDetailOpen(false)}><aside className="swipe-detail" onClick={event => event.stopPropagation()}><div className="swipe-detail-head"><span className="swipe-eyebrow">SAFFA FASHION</span><button type="button" onClick={() => setDetailOpen(false)}>{text.close} ×</button></div><div className="swipe-detail-image"><img src={activeProduct.image} alt={activeProduct.name} /></div><span className="swipe-eyebrow">{activeProduct.color}</span><h2>{activeProduct.name}</h2><strong className="swipe-detail-price">EGP {activeProduct.price.toFixed(2)} {activeProduct.originalPrice && <del>EGP {activeProduct.originalPrice.toFixed(2)}</del>}</strong>{activeProduct.saleLabel && <div className="swipe-sale">{activeProduct.saleLabel}</div>}<p>{ar ? activeProduct.arDescription : activeProduct.description}</p><div className="swipe-detail-specs"><span>{ar ? 'الخامة' : 'Material'}: {ar ? activeProduct.arMaterial : activeProduct.material}</span><span>{ar ? 'المقاسات' : 'Sizes'}: {activeProduct.sizeOptions.join(' / ')}</span></div><div className="swipe-detail-actions"><button type="button" onClick={() => addToCart()}>{text.add}</button><button type="button" className="secondary" onClick={() => buyNow()}>{text.buy}</button></div></aside></div>}
    {cartOpen && <div className="saffa-cart-overlay" role="dialog" aria-modal="true" aria-label={text.yourCart} onClick={() => setCartOpen(false)}><aside className="saffa-cart-drawer" onClick={event => event.stopPropagation()}><div className="saffa-cart-head"><div><span className="swipe-eyebrow">{text.selection}</span><h2>{text.yourCart}</h2><p>{cartCount} {cartCount === 1 ? text.item : text.items}</p></div><button type="button" className="saffa-cart-close" onClick={() => setCartOpen(false)}>×</button></div>{!cart.length ? <div className="saffa-cart-empty"><div className="saffa-cart-empty-circle">0</div><h3>{text.empty}</h3><p>{text.emptyText}</p><button type="button" onClick={() => setCartOpen(false)}>{text.continue}</button></div> : <><div className="saffa-cart-items">{cart.map(item => <div key={item.slug} className="saffa-cart-item"><div className="saffa-cart-image"><img src={item.image} alt="" /></div><div className="saffa-cart-item-main"><strong>{item.name}</strong><span>{item.color}</span><span>EGP {item.price.toFixed(2)}</span><div className="saffa-quantity"><button type="button" onClick={() => changeQuantity(item.slug, -1)}>−</button><b>{item.quantity}</b><button type="button" onClick={() => changeQuantity(item.slug, 1)}>+</button></div></div><button type="button" className="saffa-remove" onClick={() => removeFromCart(item.slug)}>Remove</button></div>)}</div><div className="saffa-cart-total"><span>{text.total}</span><strong>EGP {cartTotal.toFixed(2)}</strong></div><div className="saffa-cart-actions"><button type="button" className="saffa-cart-buy" onClick={orderOnWhatsApp}>🛍️ {text.buyCart}</button><a className="saffa-cart-checkout" href="/checkout">{text.checkout} <span>→</span></a><button type="button" className="saffa-cart-clear" onClick={clearCart}>{text.clear}</button></div></>}</aside></div>}
    <footer className="saffa-minimal-footer"><span>© Saffa Fashion</span><div><a href="/about">{ar ? 'من نحن' : 'About'}</a><a href="/contact">{ar ? 'تواصل معنا' : 'Contact'}</a><a href="#">{ar ? 'الخصوصية' : 'Privacy'}</a></div></footer>
  </main>;
}
