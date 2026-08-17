'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { products } from '../../../lib-products';
import SaffaHeader, { useSaffaLanguage } from '../../components/SaffaHeader';
import ProductGallery from '../../components/ProductGallery';

type CartItem = { slug:string; name:string; arName:string; image:string; price:number; quantity:number; color:string; arColor:string; size?:string };

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find(p => p.slug === params.slug);
  const [language] = useSaffaLanguage();
  const [size,setSize] = useState('');
  const [weight,setWeight] = useState('');
  const [added,setAdded] = useState(false);
  const ar = language === 'ar';

  useEffect(() => { document.documentElement.lang=language; document.documentElement.dir=ar?'rtl':'ltr'; }, [language,ar]);
  useEffect(() => { if(product) setSize(product.sizeOptions[0] ?? ''); }, [product]);
  if (!product) return notFound();

  const gallery = product.images?.length ? product.images : [product.image];
  const name = ar ? product.arName : product.name;
  const color = ar ? product.arColor : product.color;

  function addToCart(){
    try {
      const current=JSON.parse(localStorage.getItem('saffa-cart')||'[]') as CartItem[];
      const found=current.find(item=>item.slug===product.slug);
      const next=found
        ? current.map(item=>item.slug===product.slug?{...item,quantity:item.quantity+1,size,color:product.color,arColor:product.arColor,image:product.image,name:product.name,arName:product.arName,price:product.price}:item)
        : [...current,{slug:product.slug,name:product.name,arName:product.arName,image:product.image,price:product.price,quantity:1,color:product.color,arColor:product.arColor,size}];
      localStorage.setItem('saffa-cart',JSON.stringify(next));
      window.dispatchEvent(new CustomEvent('saffa-cart-change'));
      setAdded(true);
    } catch {}
  }
  function buyNow(){ addToCart(); window.location.href='/checkout'; }

  return <main className="detail">
    <SaffaHeader active="collection" cartAction={()=>{window.location.href='/cart';}}/>
    <div className="container">
      <div className="detail-back"><Link href="/grid">← {ar?'العودة للمجموعة':'Back to Collection'}</Link></div>
      <div className="detail-grid">
        <div className="detail-media">
          <ProductGallery images={gallery} alt={`${name} - ${color}`} className="detail-product-gallery" />
        </div>
        <div>
          <div className="detail-collection-label">SAFA COLLECTION</div>
          <div className="kicker"><span className="detail-color-label">{color}</span></div>
          <h1 className="serif">{name}</h1>
          <div className="detail-ar">{ar?product.name:product.arName}</div>
          <div className="detail-price">EGP {product.price.toFixed(2)} {product.originalPrice&&<del>EGP {product.originalPrice.toFixed(2)}</del>}</div>
          {product.saleLabel&&<div className="sale-label">{product.saleLabel}</div>}
          <p className="desc">{ar?product.arDescription:product.description}</p>
          {product.material&&<p className="shipping-note"><strong>{ar?'الخامة: ':'Material: '}</strong>{ar?product.arMaterial:product.material}</p>}
          <div className="option-label">{ar?'المقاس':'Size'}</div>
          <div className="size-row">{product.sizeOptions.map(s=><button type="button" key={s} onClick={()=>setSize(s)} className={`size-btn ${size===s?'active':''}`}><strong>{s}</strong><br/><small>{product.sizeInfo[s]}</small></button>)}</div>
          <label className="option-label" htmlFor="weight">{ar?'الوزن':'Weight'} <small>({ar?'اختياري':'optional'})</small></label>
          <input id="weight" value={weight} onChange={e=>setWeight(e.target.value)} placeholder={ar?'مثال: 68 كجم':'e.g. 68 kg'} />
          <div className="detail-actions"><button className="btn" onClick={addToCart}>🛒 {added?(ar?'تمت الإضافة':'Added to Cart'):(ar?'أضف إلى السلة':'Add to Cart')}</button><button className="btn btn-dark" onClick={buyNow}>{ar?'شراء الآن':'Buy Now'} →</button><Link href="/cart" className="btn btn-light">{ar?'عرض السلة':'View Cart'} →</Link></div>
          <p className="shipping-note">{ar?'متاح المعاينة قبل الاستلام. عند الشراء الآن سيتم إدخال بيانات العميل أولاً ثم فتح واتساب بالتفاصيل الدقيقة للمنتج واللون والمقاس.':'Inspection before receipt is available. Buy Now takes you to customer details first, then opens WhatsApp with the exact product, selected color and size.'}</p>
        </div>
      </div>
    </div>
  </main>;
}
