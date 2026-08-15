'use client';

import { useEffect, useMemo, useState } from 'react';
import { products, PRICE, type Product } from '../../lib-products';
import './admin.css';

type AdminProduct = Product & { price: number; active: boolean };

const STORAGE_KEY = 'saffa-admin-products';
const SETTINGS_KEY = 'saffa-admin-settings';

export default function AdminPage() {
  const [section, setSection] = useState<'overview' | 'products' | 'orders' | 'settings'>('overview');
  const [search, setSearch] = useState('');
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({ price: PRICE, whatsapp: '201069473693', storeName: 'Saffa Fashion' });
  const [catalog, setCatalog] = useState<AdminProduct[]>(() => products.map(product => ({ ...product, price: PRICE, active: true })));

  useEffect(() => {
    try {
      const savedCatalog = localStorage.getItem(STORAGE_KEY);
      const savedSettings = localStorage.getItem(SETTINGS_KEY);
      if (savedCatalog) setCatalog(JSON.parse(savedCatalog));
      if (savedSettings) setSettings({ ...settings, ...JSON.parse(savedSettings) });
    } catch {}
  }, []);

  const visibleProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return catalog;
    return catalog.filter(product => `${product.name} ${product.color} ${product.slug}`.toLowerCase().includes(q));
  }, [catalog, search]);

  const activeCount = catalog.filter(product => product.active).length;
  const totalValue = catalog.reduce((sum, product) => sum + product.price, 0);

  function updateProduct(slug: string, patch: Partial<AdminProduct>) {
    setCatalog(current => current.map(product => product.slug === slug ? { ...product, ...patch } : product));
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
    const fresh = products.map(product => ({ ...product, price: PRICE, active: true }));
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

  return (
    <main className="saffa-admin">
      <div className="admin-mobile-bar"><strong>Saffa Admin</strong><a className="admin-btn" href="/">View Store</a></div>
      <div className="admin-shell">
        <aside className="admin-sidebar">
          <div className="admin-brand">Saffa Fashion<small>ADMIN · صفا فاشون</small></div>
          <nav className="admin-nav" aria-label="Admin navigation">
            <button className={section === 'overview' ? 'active' : ''} onClick={() => setSection('overview')}>Overview</button>
            <button className={section === 'products' ? 'active' : ''} onClick={() => setSection('products')}>Products · {catalog.length}</button>
            <button className={section === 'orders' ? 'active' : ''} onClick={() => setSection('orders')}>Orders</button>
            <button className={section === 'settings' ? 'active' : ''} onClick={() => setSection('settings')}>Store Settings</button>
            <a href="/">← Back to Store</a>
          </nav>
          <p className="admin-side-note">A clean control panel for the Saffa catalog. Connect authentication and a database before using this as a production multi-user admin system.</p>
        </aside>

        <section className="admin-main">
          <header className="admin-topbar">
            <div><span className="admin-kicker">Saffa Fashion · Control Center</span><h1>{section === 'overview' ? 'Overview.' : section === 'products' ? 'Products.' : section === 'orders' ? 'Orders.' : 'Settings.'}</h1></div>
            <div className="admin-actions"><button className="admin-btn" onClick={exportCatalog}>Export Catalog</button><a className="admin-btn" href="/">View Store</a><button className="admin-btn dark" onClick={saveCatalog}>{saved ? 'Saved ✓' : 'Save Changes'}</button></div>
          </header>

          {section === 'overview' && <>
            <div className="admin-grid">
              <div className="admin-stat"><span>Products</span><strong>{catalog.length}</strong><small>Catalog items</small></div>
              <div className="admin-stat"><span>Active</span><strong>{activeCount}</strong><small>Visible products</small></div>
              <div className="admin-stat"><span>Price</span><strong>{settings.price}</strong><small>LE per dress</small></div>
              <div className="admin-stat"><span>Catalog Value</span><strong>{totalValue.toLocaleString()}</strong><small>LE at one unit each</small></div>
            </div>
            <div className="admin-cards">
              <section className="admin-section"><div className="admin-section-head"><h2>Quick Product View</h2><button className="admin-btn" onClick={() => setSection('products')}>Manage Products</button></div><div className="admin-activity">{catalog.slice(0, 5).map((product, index) => <div className="admin-activity-item" key={product.slug}><div><strong>{String(index + 1).padStart(2, '0')} · {product.name}</strong><div>{product.color}</div></div><span>{product.price.toFixed(2)} LE</span></div>)}</div></section>
              <section className="admin-section"><div className="admin-section-head"><h2>Store Status</h2></div><div className="admin-activity"><div className="admin-activity-item"><strong>Storefront</strong><span>LIVE</span></div><div className="admin-activity-item"><strong>Catalog</strong><span>{activeCount} ACTIVE</span></div><div className="admin-activity-item"><strong>Checkout</strong><span>WHATSAPP</span></div><div className="admin-activity-item"><strong>Theme</strong><span>WHITE</span></div></div></section>
            </div>
            <section className="admin-section"><div className="admin-section-head"><h2>Recent Activity</h2></div><div className="admin-activity"><div className="admin-activity-item"><strong>White background theme applied</strong><span>NOW</span></div><div className="admin-activity-item"><strong>12-dress catalog loaded</strong><span>12 ITEMS</span></div><div className="admin-activity-item"><strong>All dress prices set to 650 LE</strong><span>650.00 LE</span></div></div></section>
          </>}

          {section === 'products' && <section className="admin-section">
            <div className="admin-section-head"><div><h2>Product Catalog</h2><div className="admin-note" style={{padding:'8px 0 0'}}>Edit price and visibility, then press Save Changes.</div></div><input className="admin-search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Search dresses…" /></div>
            <table className="admin-table"><thead><tr><th>Product</th><th>Color</th><th>Price</th><th>Status</th><th>Actions</th></tr></thead><tbody>{visibleProducts.map(product => <tr key={product.slug}><td><div className="admin-product"><img src={product.image} alt=""/><div><strong>{product.name}</strong><small>{product.slug}</small></div></div></td><td>{product.color}</td><td><input className="admin-price-input" type="number" min="0" value={product.price} onChange={event => updateProduct(product.slug, { price: Number(event.target.value) })} /> LE</td><td><span className={`admin-status ${product.active ? 'on' : ''}`}>{product.active ? 'Active' : 'Hidden'}</span></td><td><div className="admin-row-actions"><button onClick={() => updateProduct(product.slug, { active: !product.active })}>{product.active ? 'Hide' : 'Show'}</button><a className="admin-btn" href={`/products/${product.slug}`}>Open</a></div></td></tr>)}</tbody></table>
            {!visibleProducts.length && <div className="admin-empty">No products match your search.</div>}
            <div className="admin-note">The current catalog is defined in <strong>lib-products.ts</strong>. This dashboard stores edits in the browser until a database/API is connected.</div>
          </section>}

          {section === 'orders' && <section className="admin-section"><div className="admin-section-head"><h2>Orders</h2></div><div className="admin-empty"><strong>No order database is connected yet.</strong><br/>The storefront currently sends checkout requests through WhatsApp. A production order dashboard can be connected to a database and payment gateway next.</div></section>}

          {section === 'settings' && <section className="admin-section"><div className="admin-section-head"><h2>Store Settings</h2></div><div className="admin-activity"><label className="admin-activity-item"><strong>Store name</strong><input className="admin-search" value={settings.storeName} onChange={event => setSettings({ ...settings, storeName: event.target.value })} /></label><label className="admin-activity-item"><strong>Dress price · LE</strong><input className="admin-price-input" type="number" value={settings.price} onChange={event => setSettings({ ...settings, price: Number(event.target.value) })} /></label><label className="admin-activity-item"><strong>WhatsApp number</strong><input className="admin-search" value={settings.whatsapp} onChange={event => setSettings({ ...settings, whatsapp: event.target.value })} /></label><div style={{paddingTop:18,display:'flex',gap:8,flexWrap:'wrap'}}><button className="admin-btn dark" onClick={saveCatalog}>Save Settings</button><button className="admin-btn" onClick={resetCatalog}>Reset Dashboard Data</button></div></div></section>}

          <p className="admin-note" style={{marginTop:20}}>Important: this is a front-end admin interface. For real secure product editing, orders, users, inventory and payments across devices, connect it to an authenticated backend/database.</p>
        </section>
      </div>
    </main>
  );
}
