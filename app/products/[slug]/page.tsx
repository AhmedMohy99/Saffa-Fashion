'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { products } from '../../../lib-products';
import SaffaHeader, { useSaffaLanguage } from '../../components/SaffaHeader';
import ProductGallery from '../../components/ProductGallery';

type CartItem = { slug: string; name: string; arName: string; image: string; price: number; quantity: number; color: string; arColor: string; size?: string };
const FREE_SHIPPING_THRESHOLD = 2000;

export default function ProductPage({ params }: { params: { slug: string } }) {
  const selectedProduct = products.find((p) => p.slug === params.slug);
  const [language] = useSaffaLanguage();
  const [size, setSize] = useState('');
  const [weight, setWeight] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const ar = language === 'ar';

  useEffect(() => { document.documentElement.lang = language; document.documentElement.dir = ar ? 'rtl' : 'ltr'; }, [language, ar]);
  if (!selectedProduct) return notFound();
  const product = selectedProduct;
  useEffect(() => { setSize(product.sizeOptions[0] ?? ''); }, [product]);

  const gallery = product.images?.length ? product.images : [product.image];
  const name = ar ? product.arName : product.name;
  const color = ar ? product.arColor : product.color;
  const cartValue = product.price * quantity;
  const remaining = Math.max(FREE_SHIPPING_THRESHOLD - cartValue, 0);
  const freeShipping = cartValue >= FREE_SHIPPING_THRESHOLD;

  function addToCart() {
    try {
      const current = JSON.parse(localStorage.getItem('saffa-cart') || '[]') as CartItem[];
      const found = current.find((item) => item.slug === product.slug);
      const next = found ? current.map((item) => item.slug === product.slug ? { ...item, quantity: item.quantity + quantity, size, color: product.color, arColor: product.arColor, image: product.image, name: product.name, arName: product.arName, price: product.price } : item) : [...current, { slug: product.slug, name: product.name, arName: product.arName, image: product.image, price: product.price, quantity, color: product.color, arColor: product.arColor, size }];
      localStorage.setItem('saffa-cart', JSON.stringify(next));
      window.dispatchEvent(new CustomEvent('saffa-cart-change'));
      setAdded(true);
    } catch {}
  }

  function buyNow() { addToCart(); window.location.href = '/checkout'; }

  return (
    <main className="detail">
      <SaffaHeader active="collection" cartAction={() => { window.location.href = '/cart'; }} />
      <div className="container">
        <div className="detail-back"><Link href="/grid">← {ar ? 'العودة للمجموعة' : 'Back to Collection'}</Link></div>
        <div className="detail-grid">
          <div className="detail-media"><ProductGallery images={gallery} alt={`${name} - ${color}`} className="detail-product-gallery" /></div>
          <div className="detail-info-column">
            <div className="detail-collection-label">SAFA COLLECTION</div>
            <div className="kicker"><span className="detail-color-label">{color}</span></div>
            <h1 className="serif">{name}</h1>
            <div className="detail-ar">{ar ? product.name : product.arName}</div>
            <div className="detail-price">EGP {product.price.toFixed(2)} {product.originalPrice && <del>EGP {product.originalPrice.toFixed(2)}</del>}</div>
            {product.saleLabel && <div className="sale-label">{product.saleLabel}</div>}

            <div className="product-benefits">
              <span>✓ {ar ? 'معاينة قبل الاستلام' : 'Inspect before receipt'}</span>
              <span>✓ {ar ? 'توصيل آمن' : 'Secure delivery'}</span>
              <span className={freeShipping ? 'free' : ''}>✓ {freeShipping ? (ar ? 'شحن مجاني' : 'Free shipping') : (ar ? `متبقي EGP ${remaining.toFixed(0)} للشحن المجاني` : `EGP ${remaining.toFixed(0)} away from free shipping`)}</span>
            </div>

            <p className="desc">{ar ? product.arDescription : product.description}</p>
            {product.material && <p className="shipping-note"><strong>{ar ? 'الخامة: ' : 'Material: '}</strong>{ar ? product.arMaterial : product.material}</p>}

            <div className="option-label">{ar ? 'المقاس' : 'Size'}</div>
            <div className="size-row">{product.sizeOptions.map((option) => <button type="button" key={option} onClick={() => setSize(option)} className={`size-btn ${size === option ? 'active' : ''}`}><strong>{option}</strong><br /><small>{product.sizeInfo[option]}</small></button>)}</div>

            <div className="quantity-block">
              <span className="option-label">{ar ? 'الكمية' : 'Quantity'}</span>
              <div className="quantity-control"><button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>−</button><strong>{quantity}</strong><button type="button" onClick={() => setQuantity((q) => Math.min(20, q + 1))}>+</button></div>
            </div>

            <label className="option-label" htmlFor="weight">{ar ? 'الوزن' : 'Weight'} <small>({ar ? 'اختياري' : 'optional'})</small></label>
            <input id="weight" value={weight} onChange={(event) => setWeight(event.target.value)} placeholder={ar ? 'مثال: 68 كجم' : 'e.g. 68 kg'} />

            <div className="detail-actions">
              <button className="btn" type="button" onClick={addToCart}>🛒 {added ? (ar ? 'تمت الإضافة' : 'Added to Cart') : (ar ? 'أضف إلى السلة' : 'Add to Cart')}</button>
              <button className="btn btn-dark" type="button" onClick={buyNow}>{ar ? 'شراء الآن' : 'Buy Now'} →</button>
              <Link href="/cart" className="btn btn-light">{ar ? 'عرض السلة' : 'View Cart'} →</Link>
            </div>
            <p className="shipping-note">{ar ? 'متاح المعاينة قبل الاستلام. افتح معرض الصور، كبّر الصورة وراجع كل صور المنتج قبل الطلب.' : 'Inspection before receipt is available. Open the gallery, zoom in and review every product photo before ordering.'}</p>
          </div>
        </div>
      </div>
      <div className="mobile-purchase-bar"><div><small>{quantity} × EGP {product.price.toFixed(2)}</small><strong>EGP {cartValue.toFixed(2)}</strong></div><button type="button" onClick={buyNow}>{ar ? 'شراء الآن' : 'Buy Now'} →</button></div>
    </main>
  );
}
