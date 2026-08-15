'use client';

import { FormEvent, useEffect, useState } from 'react';
import '../product-detail.css';
import '../white-theme.css';
import SaffaHeader, { useSaffaLanguage } from '../components/SaffaHeader';

const WHATSAPP_NUMBER = '201069473693';
const INSTAGRAM_URL = 'https://www.instagram.com/_saffa_01/';
const TIKTOK_URL = 'https://www.tiktok.com/@saffa_0190';

export default function ContactPage() {
  const [language] = useSaffaLanguage();
  const [submitted, setSubmitted] = useState(false);
  const ar = language === 'ar';
  useEffect(() => { document.documentElement.lang = language; document.documentElement.dir = ar ? 'rtl' : 'ltr'; }, [language, ar]);
  const t = ar ? { label: 'صفا فاشن · تواصل معنا', title: 'تواصل معنا', intro: 'للاستفسارات حول الطلبات أو المقاسات أو أي أسئلة عامة، يرجى تعبئة النموذج. سيتواصل معك فريقنا في أقرب وقت ممكن.', first: 'الاسم الأول', last: 'اسم العائلة', email: 'البريد الإلكتروني', order: 'رقم الطلب', optional: 'اختياري', message: 'الرسالة', firstPh: 'الاسم الأول', lastPh: 'اسم العائلة', emailPh: 'you@example.com', orderPh: '#SAFFA-0000', messagePh: 'كيف يمكننا مساعدتك؟', submit: 'إرسال', success: 'رسالتك جاهزة في واتساب. شكراً لتواصلك مع صفا فاشن.', about: 'من نحن', terms: 'الشروط', privacy: 'الخصوصية' } : { label: 'SAFFA FASHION · CONTACT', title: 'Contact', intro: 'For inquiries regarding orders, sizing, or general questions, please fill out the form below. Our team will respond as soon as possible.', first: 'First Name', last: 'Last Name', email: 'Email Address', order: 'Order Number', optional: 'Optional', message: 'Message', firstPh: 'First name', lastPh: 'Last name', emailPh: 'you@example.com', orderPh: '#SAFFA-0000', messagePh: 'How can we help?', submit: 'Submit', success: 'Your message is ready in WhatsApp. Thank you for contacting Saffa Fashion.', about: 'About', terms: 'Terms', privacy: 'Privacy' };
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const data = new FormData(event.currentTarget); const first = String(data.get('firstName') || ''); const last = String(data.get('lastName') || ''); const email = String(data.get('email') || ''); const order = String(data.get('orderNumber') || 'Not provided'); const message = String(data.get('message') || ''); const whatsapp = `Hello Saffa Fashion 👋\n\nContact inquiry from ${first} ${last}.\nEmail: ${email}\nOrder Number: ${order}\n\nMessage:\n${message}`; setSubmitted(true); window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsapp)}`, '_blank', 'noopener,noreferrer');
  }
  return <main className="saffa-contact-modern">
    <SaffaHeader active="contact" />
    <section className="contact-modern-main"><div className="contact-modern-heading"><span className="quick-label">{t.label}</span><h1>{t.title}</h1><p>{t.intro}</p></div>
      <form className="contact-form" onSubmit={submit}>
        <div className="contact-field-grid"><label><span>{t.first}</span><input name="firstName" required placeholder={t.firstPh} autoComplete="given-name" /></label><label><span>{t.last}</span><input name="lastName" required placeholder={t.lastPh} autoComplete="family-name" /></label></div>
        <label><span>{t.email}</span><input name="email" type="email" required placeholder={t.emailPh} autoComplete="email" /></label>
        <label><span>{t.order} <small>({t.optional})</small></span><input name="orderNumber" placeholder={t.orderPh} /></label>
        <label><span>{t.message}</span><textarea name="message" required rows={7} placeholder={t.messagePh} /></label>
        <button className="contact-submit" type="submit">{t.submit} <span>→</span></button>
        {submitted && <p className="contact-success">{t.success}</p>}
      </form>
    </section>
    <footer className="blueprint-footer contact-modern-footer"><span>© Saffa Fashion</span><nav><a href="/about">{t.about}</a><a href="#">{t.terms}</a><a href="#">{t.privacy}</a><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram</a><a href={TIKTOK_URL} target="_blank" rel="noreferrer">TikTok</a></nav></footer>
  </main>;
}
