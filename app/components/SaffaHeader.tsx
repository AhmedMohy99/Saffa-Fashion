'use client';

import { useEffect, useState } from 'react';
import '../mobile-touch-fix.css';

export type SaffaLanguage = 'en' | 'ar';

export function useSaffaLanguage(): [SaffaLanguage, (value: SaffaLanguage) => void] {
  const [language, setLanguageState] = useState<SaffaLanguage>('en');
  useEffect(() => {
    const saved = window.localStorage.getItem('saffa-language');
    if (saved === 'ar' || saved === 'en') setLanguageState(saved);
    const sync = (event: Event) => { const value = (event as CustomEvent<SaffaLanguage>).detail; if (value === 'ar' || value === 'en') setLanguageState(value); };
    window.addEventListener('saffa-language-change', sync);
    return () => window.removeEventListener('saffa-language-change', sync);
  }, []);
  function setLanguage(value: SaffaLanguage) {
    setLanguageState(value);
    window.localStorage.setItem('saffa-language', value);
    window.dispatchEvent(new CustomEvent('saffa-language-change', { detail: value }));
    document.documentElement.lang = value;
    document.documentElement.dir = value === 'ar' ? 'rtl' : 'ltr';
  }
  return [language, setLanguage];
}

const labels = {
  en: { home: 'Home', collection: 'Collection', about: 'About', contact: 'Contact', cart: 'Cart', menu: 'Menu', close: 'Close' },
  ar: { home: 'الرئيسية', collection: 'المجموعة', about: 'من نحن', contact: 'تواصل معنا', cart: 'السلة', menu: 'القائمة', close: 'إغلاق' },
};

function CartIcon() {
  return <svg className="saffa-cart-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 5h2l1.5 10.5a1.5 1.5 0 0 0 1.48 1.29h8.8a1.5 1.5 0 0 0 1.47-1.2L21 8H7"/><circle cx="10" cy="20" r="1.2"/><circle cx="18" cy="20" r="1.2"/></svg>;
}

export default function SaffaHeader({ active = 'home', cartCount, cartAction }: { active?: 'home' | 'collection' | 'about' | 'contact'; cartCount?: number; cartAction?: () => void }) {
  const [language, setLanguage] = useSaffaLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [liveCartCount, setLiveCartCount] = useState(cartCount ?? 0);
  const t = labels[language];

  useEffect(() => {
    const readCart = () => {
      try {
        const cart = JSON.parse(window.localStorage.getItem('saffa-cart') || '[]') as Array<{ quantity?: number }>;
        setLiveCartCount(cart.reduce((sum, item) => sum + (item.quantity || 0), 0));
      } catch { setLiveCartCount(0); }
    };
    readCart();
    window.addEventListener('storage', readCart);
    window.addEventListener('saffa-cart-change', readCart);
    return () => { window.removeEventListener('storage', readCart); window.removeEventListener('saffa-cart-change', readCart); };
  }, []);

  const count = cartCount !== undefined && cartCount !== 0 ? cartCount : liveCartCount;

  return <header className="saffa-site-header">
    <a className="saffa-site-brand" href="/" aria-label="Saffa Fashion home">
      <img className="saffa-site-brand-logo" src="/logo-transparent.png" alt="SAFA FASHION" width={112} height={52} decoding="async" />
    </a>
    <nav className="saffa-site-nav" aria-label="Main navigation">
      <a className={active === 'home' ? 'active' : ''} href="/">{t.home}</a>
      <a className={active === 'collection' ? 'active' : ''} href="/grid">{t.collection}</a>
      <a className={active === 'about' ? 'active' : ''} href="/about">{t.about}</a>
      <a className={active === 'contact' ? 'active' : ''} href="/contact">{t.contact}</a>
    </nav>
    <div className="saffa-site-actions">
      <div className="saffa-language" aria-label="Language selector"><button className={language === 'en' ? 'active' : ''} onClick={() => setLanguage('en')} type="button">EN</button><span>/</span><button className={language === 'ar' ? 'active' : ''} onClick={() => setLanguage('ar')} type="button">AR</button></div>
      <button className="saffa-site-cart" type="button" onClick={cartAction || (() => { window.location.href = '/cart'; })} aria-label={`${t.cart}, ${count}`}><CartIcon /><span>{t.cart}</span><b>{count}</b></button>
      <button className="saffa-mobile-menu-button" type="button" onClick={() => setMobileOpen(value => !value)} aria-expanded={mobileOpen} aria-label={mobileOpen ? t.close : t.menu}>
        <i /><i /><i />
      </button>
    </div>
    {mobileOpen && <div className="saffa-mobile-menu"><a href="/" onClick={() => setMobileOpen(false)}>{t.home}</a><a href="/grid" onClick={() => setMobileOpen(false)}>{t.collection}</a><a href="/about" onClick={() => setMobileOpen(false)}>{t.about}</a><a href="/contact" onClick={() => setMobileOpen(false)}>{t.contact}</a><div className="saffa-mobile-language"><button className={language === 'en' ? 'active' : ''} onClick={() => setLanguage('en')} type="button">English</button><button className={language === 'ar' ? 'active' : ''} onClick={() => setLanguage('ar')} type="button">العربية</button></div><button className="saffa-mobile-menu-close" type="button" onClick={() => setMobileOpen(false)} aria-label={t.close}><span aria-hidden="true">×</span><small>{t.close}</small></button></div>}
  </header>;
}
