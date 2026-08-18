'use client';

import { useEffect, useMemo, useState } from 'react';
import { products, PRICE, type Product } from '../../lib-products';
import './admin.css';

type AdminProduct = Product & { active: boolean };
const STORAGE_KEY = 'saffa-admin-products';
const SETTINGS_KEY = 'saffa-admin-settings';

const freshCatalog = () => products.map(product => ({ ...product, active: true }));

export default function AdminPage() {
  const [section, setSection] = useState<'overview' | 'products' | 'orders' | 'settings'>('overview');
  const [search, setSearch] = useState('');
  const [saved, setSaved] = useState(false);
  const [editing, setEditing] = useState<AdminProduct | null>(null);
  const [settings, setSettings] = useState({ price: PRICE, whatsapp: '201069473693', storeName: 'Saffa Fashion' });
  const [catalog, setCatalog] = useState<AdminProduct[]>(freshCatalog);

  useEffect(() => {
    try {
      const savedCatalog = localStorage.getItem(STORAGE_KEY);
      const savedSettings = localStorage.getItem(SETTINGS_KEY);
      if (savedCatalog) setCatalog(JSON.parse(savedCatalog));
      if (savedSettings) setSettings(current => ({ ...current, ...JSON.parse(savedSettings) }));
    } catch {}
  }, []);

  const visibleProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return catalog;
    return catalog.filter(product => `${product.name} ${product.arName} ${product.color} ${product.arColor} ${product.slug}`.toLowerCase().includes(q));
  }, [catalog, search]);

  const activeCount = catalog.filter(product => product.active).length;
  const saleCount = catalog.filter(product => product.originalPrice && product.originalPrice > product.price).length;
  const totalValue = catalog.reduce((sum, product) => sum + product.price, 0);
  const averagePrice = catalog.length ? Math.round(totalValue / catalog.length) : 0;
  const summerCount = catalog.filter(product => product.category === 'summer').length;
  const winterCount = catalog.filter(product => product.category === 'winter').length;

  function updateProduct(slug: string, patch: Partial<AdminProduct>) {
    setCatalog(current => current.map(product => product.slug === slug ? { ...product, ...patch } : product));
    setEditing(current => current?.slug === slug ? { ...current, ...patch } : current);
    setSaved(false);
  }

  function saveCatalog() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(catalog));
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
      setSaved(true);
      window.setTimeout(() => setSaved(false), 2200);
    } catch {}
  }

  function resetCatalog() {
    const fresh = freshCatalog();
    setCatalog(fresh);
    setSettings({ price: PRICE, whatsapp: '201069473693', storeName: 'Saffa Fashion' });
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(SETTINGS_KEY);
    setSaved(true);
  }

  function exportCatalog() {
    const blob = new Blob([JSON.stringify({ settings, products: catalog }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'saffa-fashion-catalog.json';
    link.click();
    URL.revokeObjectURL(url);
  }

  async function logout() {
    await fetch('/admin/api/login', { method: 'DELETE' });
    window.location.href = '/admin/login';
  }

  return (
    <main className="saffa-admin">
      <div className="admin-mobile-bar"><strong>Saffa Fashion</strong><div><button className="admin-icon-btn" onClick={logout}>Sign out</button><a className="admin-btn" href="/">Store</a></div></div>
      <div className="admin-shell">
        <aside className="admin-sidebar">
          <div className="admin-brand"><span className="admin-brand-mark">SF</span><div>Saffa Fashion<small>CONTROL CENTER · صفا فاشون</small></div></div>
          <div className="admin-account"><span className="account-avatar">A</span><div><strong>Store Owner</strong><small>Administrator</small></div><button onClick={logout} aria-label="Sign out">↗</button></div>
          <nav className="admin-nav">
            <span className="admin-nav-label">Workspace</span>
            <button className={section === 'overview' ? 'active' : ''} onClick={() => setSection('overview')}><span>⌂</span> Overview</button>
            <button className={section === 'products' ? 'active' : ''} onClick={() => setSection('products')}><span>▦</span> Products <em>{catalog.length}</em></button>
            <button className={section === 'orders' ? 'active' : ''} onClick={() => setSection('orders')}><span>◷</span> Orders</button>
            <span className="admin-nav-label">Configuration</span>
            <button className={section === 'settings' ? 'active' : ''} onClick={() => setSection('settings')}><span>⚙</span> Store settings</button>
            <a href="/"><span>↗</span> View storefront</a>
          </nav>
          <div className="admin-side-note"><span className="live-dot" /> Storefront online<br/><small>Admin session protected</small></div>
        </aside>

        <section className="admin-main">
          <header className="admin-topbar">
            <div><span className="admin-kicker">Saffa Fashion · Control Center</span><h1>{section === 'overview' ? 'Overview.' : section === 'products' ? 'Products.' : section === 'orders' ? 'Orders.' : 'Settings.'}</h1><p className="admin-subtitle">Manage your fashion store from one focused workspace.</p></div>
            <div className="admin-actions"><button className="admin-btn" onClick={exportCatalog}>Export</button><a className="admin-btn" href="/">View store</a><button className="admin-btn dark" onClick={saveCatalog}>{saved ? 'Saved ✓' : 'Save changes'}</button></div>
          </header>

          {section === 'overview' && <>
            <div className="admin-grid">
              <div className="admin-stat"><div className="stat-icon">▦</div><span>Products</span><strong>{catalog.length}</strong><small>{activeCount} currently visible</small></div>
              <div className="admin-stat"><div className="stat-icon">◉</div><span>Active</span><strong>{activeCount}</strong><small>{catalog.length - activeCount} hidden</small></div>
              <div className="admin-stat"><div className="stat-icon">%</div><span>On sale</span><strong>{saleCount}</strong><small>Products with offers</small></div>
              <div className="admin-stat"><div className="stat-icon">EG</div><span>Average price</span><strong>{averagePrice.toLocaleString()}</strong><small>EGP per item</small></div>
            </div>
            <div className="admin-cards">
              <section className="admin-section"><div className="admin-section-head"><div><span className="section-eyebrow">Catalog</span><h2>Product performance</h2></div><button className="admin-btn" onClick={() => setSection('products')}>Manage products →</button></div><div className="insight-grid"><div className="insight-card"><span>Summer</span><strong>{summerCount}</strong><small>catalog items</small><div className="progress"><i style={{ width: `${catalog.length ? (summerCount / catalog.length) * 100 : 0}%` }} /></div></div><div className="insight-card"><span>Winter</span><strong>{winterCount}</strong><small>catalog items</small><div className="progress"><i style={{ width: `${catalog.length ? (winterCount / catalog.length) * 100 : 0}%` }} /></div></div><div className="insight-card"><span>Catalog value</span><strong>{totalValue.toLocaleString()}</strong><small>EGP · one unit each</small></div></div></section>
              <section className="admin-section"><div className="admin-section-head"><div><span className="section-eyebrow">Smart insights</span><h2>Store health</h2></div><span className="health-badge">Healthy</span></div><div className="admin-activity"><div className="admin-activity-item"><div><strong>Storefront</strong><small>Public website availability</small></div><span className="good">LIVE</span></div><div className="admin-activity-item"><div><strong>Pricing</strong><small>{saleCount} products have a sale price</small></div><span>READY</span></div><div className="admin-activity-item"><div><strong>Catalog coverage</strong><small>{activeCount} of {catalog.length} products visible</small></div><span>{catalog.length ? Math.round(activeCount / catalog.length * 100) : 0}%</span></div></div></section>
            </div>
            <section className="admin-section"><div className="admin-section-head"><div><span className="section-eyebrow">Latest catalog</span><h2>Quick edit</h2></div><button className="admin-btn" onClick={() => setSection('products')}>Open full catalog</button></div><div className="quick-products">{catalog.slice(0, 6).map(product => <button className="quick-product" key={product.slug} onClick={() => { setEditing(product); setSection('products'); }}><img src={product.image} alt=""/><span><strong>{product.name}</strong><small>{product.color} · {product.category}</small></span><b>{product.price.toLocaleString()} EGP</b></button>)}</div></section>
          </>}

          {section === 'products' && <section className="admin-section"><div className="admin-section-head product-head"><div><span className="section-eyebrow">Catalog manager</span><h2>Every product, one place.</h2><p className="admin-note-inline">Edit pricing, names, descriptions, material, sizes and visibility. Save when you are ready.</p></div><input className="admin-search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Search products…" /></div><div className="product-table-wrap"><table className="admin-table"><thead><tr><th>Product</th><th>Price</th><th>Sale</th><th>Status</th><th>Actions</th></tr></thead><tbody>{visibleProducts.map(product => <tr key={product.slug}><td><button className="admin-product" onClick={() => setEditing(product)}><img src={product.image} alt=""/><span><strong>{product.name}</strong><small>{product.color} · {product.slug}</small></span></button></td><td><strong>{product.price.toLocaleString()} EGP</strong></td><td>{product.originalPrice ? <span className="sale-pill">{Math.max(0, Math.round((1 - product.price / product.originalPrice) * 100))}% OFF</span> : '—'}</td><td><button className={`admin-status ${product.active ? 'on' : ''}`} onClick={() => updateProduct(product.slug, { active: !product.active })}>{product.active ? 'Active' : 'Hidden'}</button></td><td><button className="edit-link" onClick={() => setEditing(product)}>Edit product →</button></td></tr>)}</tbody></table></div>{!visibleProducts.length && <div className="admin-empty">No products match your search.</div>}<div className="admin-note">Current catalog edits are saved to this browser. The next production step is moving this source of truth to your private Sanity dataset so changes sync across devices.</div></section>}

          {section === 'orders' && <section className="admin-section"><div className="admin-section-head"><div><span className="section-eyebrow">Commerce</span><h2>Orders.</h2></div><span className="coming-badge">Backend recommended</span></div><div className="order-roadmap"><div><span>01</span><strong>WhatsApp checkout</strong><p>Customers can continue placing orders through your existing WhatsApp flow.</p></div><div><span>02</span><strong>Central order database</strong><p>Connect Sanity or Supabase to store order status, customer details and payment confirmation securely.</p></div><div><span>03</span><strong>Operations dashboard</strong><p>Add filters for New, Confirmed, Preparing, Shipped and Completed orders.</p></div></div></section>}

          {section === 'settings' && <div className="settings-stack"><section className="admin-section"><div className="admin-section-head"><div><span className="section-eyebrow">Store profile</span><h2>Store settings</h2></div></div><div className="settings-form"><label>Store name<input value={settings.storeName} onChange={event => setSettings({ ...settings, storeName: event.target.value })} /></label><label>Default display price<input type="number" value={settings.price} onChange={event => setSettings({ ...settings, price: Number(event.target.value) })} /></label><label>WhatsApp number<input value={settings.whatsapp} onChange={event => setSettings({ ...settings, whatsapp: event.target.value })} /></label></div><div className="settings-actions"><button className="admin-btn dark" onClick={saveCatalog}>Save settings</button><button className="admin-btn" onClick={resetCatalog}>Reset local dashboard</button></div></section><section className="admin-section security-panel"><div className="admin-section-head"><div><span className="section-eyebrow">Security</span><h2>Administrator access</h2></div><span className="health-badge">Protected</span></div><div className="security-grid"><div><strong>Login protection</strong><p>Your /admin area now requires a server-side username/password and an HTTP-only signed session cookie.</p></div><div><strong>Change password</strong><p>For security, credentials are stored as Vercel environment variables, never in GitHub. Change <code>ADMIN_PASSWORD</code> in Vercel and redeploy.</p></div><div><strong>Recommended</strong><p>Use a unique password, enable 2FA on your GitHub, Vercel and Sanity accounts, and keep the private production dataset enabled.</p></div></div></section></div>}

          <p className="admin-footer-note">Saffa Fashion Admin · Private control center · Sanity project <strong>ru7e0sy6</strong> is prepared for the production CMS migration.</p>
        </section>
      </div>

      {editing && <div className="editor-overlay" onMouseDown={event => { if (event.target === event.currentTarget) setEditing(null); }}><section className="product-editor"><div className="editor-head"><div><span className="section-eyebrow">Product editor</span><h2>{editing.name}</h2><small>{editing.slug}</small></div><button className="close-btn" onClick={() => setEditing(null)}>×</button></div><div className="editor-body"><div className="editor-preview"><img src={editing.image} alt=""/><span className={`admin-status ${editing.active ? 'on' : ''}`}>{editing.active ? 'Visible' : 'Hidden'}</span></div><div className="editor-fields"><label>English name<input value={editing.name} onChange={e => updateProduct(editing.slug, { name: e.target.value })} /></label><label>Arabic name<input dir="rtl" value={editing.arName} onChange={e => updateProduct(editing.slug, { arName: e.target.value })} /></label><div className="field-grid"><label>Color<input value={editing.color} onChange={e => updateProduct(editing.slug, { color: e.target.value })} /></label><label>Arabic color<input dir="rtl" value={editing.arColor} onChange={e => updateProduct(editing.slug, { arColor: e.target.value })} /></label><label>Current price<input type="number" min="0" value={editing.price} onChange={e => updateProduct(editing.slug, { price: Number(e.target.value) })} /></label><label>Original price<input type="number" min="0" value={editing.originalPrice ?? ''} onChange={e => updateProduct(editing.slug, { originalPrice: e.target.value ? Number(e.target.value) : undefined })} /></label></div><label>Image path<input value={editing.image} onChange={e => updateProduct(editing.slug, { image: e.target.value })} /></label><label>Material<input value={editing.material ?? ''} onChange={e => updateProduct(editing.slug, { material: e.target.value })} /></label><label>English description<textarea rows={4} value={editing.description} onChange={e => updateProduct(editing.slug, { description: e.target.value })} /></label><label>Arabic description<textarea dir="rtl" rows={5} value={editing.arDescription} onChange={e => updateProduct(editing.slug, { arDescription: e.target.value })} /></label><label className="switch-row"><span><strong>Visible in storefront</strong><small>Hide a product without deleting its data.</small></span><input type="checkbox" checked={editing.active} onChange={e => updateProduct(editing.slug, { active: e.target.checked })} /></label></div></div><div className="editor-foot"><button className="admin-btn" onClick={() => setEditing(null)}>Close</button><button className="admin-btn dark" onClick={() => { saveCatalog(); setEditing(null); }}>Save product</button></div></section></div>}
    </main>
  );
}
