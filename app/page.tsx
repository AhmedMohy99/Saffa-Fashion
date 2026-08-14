import Link from 'next/link';
import { products, PRICE } from '../lib-products';

export default function Home() {
 return <main>
  <section className="hero"><div className="container hero-grid">
   <div><div className="kicker">Saffa Fashion · صفا فاشون</div><h1 className="serif">Modesty, with a beautiful flow.</h1><p>Elegant modest dresses made for the modern hijabi. Discover soft crinkled wavy textures, flowing silhouettes and effortless coverage in a curated palette.</p><div className="hero-actions"><Link href="#collection" className="btn btn-dark">Shop the collection</Link><Link href="/contact" className="btn btn-light">Order on WhatsApp</Link></div></div>
   <div className="hero-card"><img src="/products/safa-mocha.png" alt="Saffa modest dress" /></div>
  </div></section>
  <section className="section" id="collection"><div className="container"><div className="section-head"><div><div className="kicker">The collection</div><h2 className="serif">Saffa Dresses</h2></div><div className="section-sub">Every dress is <strong>1,000 EGP</strong> and available in <strong>L</strong> (50–75 kg) and <strong>XL</strong> (75–110 kg).</div></div>
   <div className="grid">{products.map(p=><Link href={`/products/${p.slug}`} className="product-card" key={p.slug}><span className="product-image"><img src={p.image} alt={p.name}/></span><div className="product-info"><h3 className="product-name">{p.name}</h3><div className="product-ar">{p.arName}</div><div className="product-meta"><span className="price">{PRICE.toLocaleString()} EGP</span><span className="pill">L · XL</span></div></div></Link>)}</div>
  </div></section>
  <section className="section"><div className="container"><div className="feature"><div><div className="kicker">Simple ordering</div><h2 className="serif">Choose. Tell us your size. We handle the rest.</h2><p>Select your dress, choose L or XL, then send the order through WhatsApp with the product and size details ready to copy.</p></div><div className="arabic"><h2 className="serif">اختاري إطلالتك بكل سهولة</h2><p>اختاري الفستان والمقاس، ثم تواصلي معنا عبر واتساب لإرسال تفاصيل طلبك مباشرة.</p><Link href="/contact" className="btn btn-light">Contact Us · تواصل معنا</Link></div></div></div></section>
 </main>;
}
