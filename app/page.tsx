import Link from 'next/link';
import { products, PRICE } from '../lib-products';

export default function Home() {
  return <main>
    <section className="hero"><div className="container hero-grid">
      <div>
        <div className="kicker">Saffa Fashion · صفا فاشون</div>
        <h1 className="serif">Modest fashion, shaped beautifully.</h1>
        <p>Discover Saffa's collection of elegant modest dresses with soft crinkled wavy textures, flowing silhouettes and effortless coverage.</p>
        <div className="hero-actions">
          <Link href="#collection" className="btn btn-dark">Shop the collection</Link>
          <Link href="/contact" className="btn btn-light">Order on WhatsApp</Link>
        </div>
      </div>
      <div className="hero-visual"><div className="hero-orb"><img src="/products/safa-mocha.png" alt="Saffa Fashion dress" /></div></div>
    </div></section>

    <section className="section" id="collection"><div className="container">
      <div className="section-head"><div><div className="kicker">The collection</div><h2 className="serif">Saffa Dresses</h2></div><div className="section-sub">Seven individual styles. Every dress is <strong>{PRICE.toLocaleString()} EGP</strong> and available in <strong>L</strong> (50–75 kg) and <strong>XL</strong> (75–110 kg).</div></div>
      <div className="grid">{products.map(p=><Link href={`/products/${p.slug}`} className="product-card" key={p.slug}><span className="product-image"><img src={p.image} alt={p.name}/></span><div className="product-info"><h3 className="product-name">{p.name}</h3><div className="product-ar">{p.arName}</div><div className="product-meta"><span className="price">{PRICE.toLocaleString()} EGP</span><span className="pill">L · XL</span></div></div></Link>)}</div>
    </div></section>

    <section className="section"><div className="container"><div className="feature"><div><div className="kicker">Simple ordering</div><h2 className="serif">Choose your style. Pick your size. Order directly.</h2><p>Select a dress, choose L or XL, and send the complete order details through WhatsApp.</p></div><div className="arabic"><h2 className="serif">اختاري إطلالتك بكل سهولة</h2><p>اختاري الفستان والمقاس، ثم أرسلي تفاصيل طلبك مباشرة عبر واتساب.</p><Link href="/contact" className="btn btn-light">Contact Us · تواصل معنا</Link></div></div></div></section>
  </main>;
}
