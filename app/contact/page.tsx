'use client';

import { FormEvent, useState } from 'react';
import '../product-detail.css';
import '../white-theme.css';

const WHATSAPP_NUMBER = '201069473693';
const INSTAGRAM_URL = 'https://www.instagram.com/_saffa_01/';
const TIKTOK_URL = 'https://www.tiktok.com/@saffa_0190';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const first = String(data.get('firstName') || '');
    const last = String(data.get('lastName') || '');
    const email = String(data.get('email') || '');
    const order = String(data.get('orderNumber') || 'Not provided');
    const message = String(data.get('message') || '');
    const whatsapp = `Hello Saffa Fashion 👋\n\nContact inquiry from ${first} ${last}.\nEmail: ${email}\nOrder Number: ${order}\n\nMessage:\n${message}`;
    setSubmitted(true);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsapp)}`, '_blank', 'noopener,noreferrer');
  }
  return <main className="saffa-contact-modern">
    <header className="store-header blueprint-header contact-modern-header">
      <a className="brand-wordmark" href="/">SAFFA <span>FASHION</span></a>
      <nav className="blueprint-nav" aria-label="Main navigation"><a href="/">Home</a><a href="/grid">Collection</a><a href="/about">About</a><a href="/contact" className="active">Contact</a><a className="cart-link" href="/">Cart</a></nav>
    </header>
    <section className="contact-modern-main">
      <div className="contact-modern-heading"><span className="quick-label">SAFFA FASHION · CONTACT</span><h1>Contact</h1><p>For inquiries regarding orders, sizing, or general questions, please fill out the form below. Our team will respond as soon as possible.</p></div>
      <form className="contact-form" onSubmit={submit}>
        <div className="contact-field-grid"><label><span>First Name</span><input name="firstName" required placeholder="First name" autoComplete="given-name" /></label><label><span>Last Name</span><input name="lastName" required placeholder="Last name" autoComplete="family-name" /></label></div>
        <label><span>Email Address</span><input name="email" type="email" required placeholder="you@example.com" autoComplete="email" /></label>
        <label><span>Order Number <small>(Optional)</small></span><input name="orderNumber" placeholder="#SAFFA-0000" /></label>
        <label><span>Message</span><textarea name="message" required rows={7} placeholder="How can we help?" /></label>
        <button className="contact-submit" type="submit">Submit <span>→</span></button>
        {submitted && <p className="contact-success">Your message is ready in WhatsApp. Thank you for contacting Saffa Fashion.</p>}
      </form>
    </section>
    <footer className="blueprint-footer contact-modern-footer"><span>© Saffa Fashion</span><nav><a href="/about">About</a><a href="#">Terms</a><a href="#">Privacy</a><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram</a><a href={TIKTOK_URL} target="_blank" rel="noreferrer">TikTok</a></nav></footer>
  </main>;
}
