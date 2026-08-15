'use client';

import { useEffect, useState } from 'react';

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
    setLanguageState(value); window.localStorage.setItem('saffa-language', value); window.dispatchEvent(new CustomEvent('saffa-language-change', { detail: value })); document.documentElement.lang = value; document.documentElement.dir = value === 'ar' ? 'rtl' : 'ltr';
  }
  return [language, setLanguage];
}

const labels = { en: { home: 'Home', collection: 'Collection', about: 'About', contact: 'Contact', cart: 'Cart', menu: 'Menu', close: 'Close' }, ar: { home: 'الرئيسية', collection: 'المجموعة', about: 'من نحن', contact: 'تواصل معنا', cart: 'السلة', menu: 'القائمة', close: 'إغلاق' } };

export default function SaffaHeader({ active = 'home', cartCount, cartAction }: { active?: 'home' | 'collection' | 'about' | 'contact'; cartCount?: number; cartAction?: () => void }) {
  const [language, setLanguage] = useSaffaLanguage(); const [mobileOpen, setMobileOpen] = useState(false); const t = labels[language];
  return <header className="saffa-site-header">
    <a className="saffa-site-brand" href="/">SAFFA <span>FASHION</span></a>
    <nav className="saffa-site-nav" aria-label="Main navigation"><a className={active === 'home' ? 'active' : ''} href="/">{t.home}</a><a className={active === 'collection' ? 'active' : ''} href="/grid">{t.collection}</a><a className={active === 'about' ? 'active' : ''} href="/about">{t.about}</a><a className={active === 'contact' ? 'active' : ''} href="/contact">{t.contact}</a></nav>
    <div className="saffa-site-actions">
      <div className="saffa-language" aria-label="Language selector"><button className={language === 'en' ? 'active' : ''} onClick={() => setLanguage('en')} type="button">EN</button><span>/</span><button className={language === 'ar' ? 'active' : ''} onClick={() => setLanguage('ar')} type="button">AR</button></div>
      <button className="saffa-site-cart" type="button" onClick={cartAction} aria-label={`${t.cart}${cartCount !== undefined ? `, ${cartCount}` : ''}`}><span>{t.cart}</span>{cartCount !== undefined && <b>{cartCount}</b>}</button>
      <button className="saffa-mobile-menu-button" type="button" onClick={() => setMobileOpen(value => !value)} aria-expanded={mobileOpen} aria-label={mobileOpen ? t.close : t.menu}><i /><i /></button>
    </div>
    {mobileOpen && <div className="saffa-mobile-menu"><a href="/" onClick={() => setMobileOpen(false)}>{t.home}</a><a href="/grid" onClick={() => setMobileOpen(false)}>{t.collection}</a><a href="/about" onClick={() => setMobileOpen(false)}>{t.about}</a><a href="/contact" onClick={() => setMobileOpen(false)}>{t.contact}</a><div className="saffa-mobile-language"><button className={language === 'en' ? 'active' : ''} onClick={() => setLanguage('en')} type="button">English</button><button className={language === 'ar' ? 'active' : ''} onClick={() => setLanguage('ar')} type="button">العربية</button></div></div>}
  </header>;
}
