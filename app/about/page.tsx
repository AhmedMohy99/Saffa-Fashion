'use client';

import { useEffect } from 'react';
import SaffaHeader, { useSaffaLanguage } from '../components/SaffaHeader';
import './about.css';

export default function AboutPage() {
  const [language] = useSaffaLanguage();
  const ar = language === 'ar';
  useEffect(() => { document.documentElement.lang = language; document.documentElement.dir = ar ? 'rtl' : 'ltr'; }, [language, ar]);
  const t = ar ? {
    label: 'صفا فاشن · من نحن', hero: <>ارتدي ما<br /><em>يشبهك.</em></>, heroText: 'نصمم أزياء محتشمة وعصرية للمرأة التي تريد أن تجتمع الأناقة والراحة والتفرّد في القطعة نفسها.', storyLabel: '01 · قصتنا', storyTitle: 'الموضة يجب أن تكون شخصية.', story: ['نشأت صفا فاشن من إيمان بسيط: الموضة المحتشمة يمكن أن تكون راقية، معبّرة وعصرية بسهولة.', 'تركّز مجموعاتنا على القصّات الأنيقة، والتفاصيل المدروسة، والتغطية المريحة، والقطع التي تتحرك بشكل طبيعي مع تفاصيل الحياة اليومية.', 'نبني صفا لتكون أكثر من مجرد متجر ملابس. نريد أن نصنع علامة وتجربة تسوق تساعد كل امرأة على اكتشاف قطع تشبهها حقاً.'], visionLabel: '02 · رؤيتنا', visionTitle: 'أن يصبح التفرّد هو القاعدة.', vision: 'رؤيتنا هي تطوير صفا فاشن كدار أزياء عصرية تجمع بين التصميم والثقافة والتقنية لصناعة تجربة أزياء أكثر شخصية.', missionLabel: '03 · رسالتنا', missionTitle: 'نصمم بقصد.', mission: 'رسالتنا هي تقديم أزياء محتشمة مميزة مع التركيز على التصميم والجودة والراحة وإمكانية الوصول، مع تطوير طريقة اكتشاف العملاء للموضة وتجربتها عبر الإنترنت.', philosophyLabel: '04 · فلسفتنا', philosophy: <>«لا قواعد غير ضرورية.<br />لا حاجة لأن تنسجمي مع تعريف شخص آخر للأناقة.»</>, philosophyText: 'صفا موجودة للمرأة التي تختار أن تصنع تعريفها الخاص.', collection: 'المجموعة', contact: 'تواصل معنا'
  } : {
    label: 'SAFFA FASHION · ABOUT US', hero: <>Wear what<br /><em>feels like you.</em></>, heroText: 'We create modern modest fashion for women who want elegance, comfort, and individuality to exist in the same piece.', storyLabel: '01 · OUR STORY', storyTitle: 'Fashion should feel personal.', story: ['Saffa Fashion was created around a simple belief: modest fashion can be refined, expressive, and effortlessly modern.', 'Our collections focus on graceful silhouettes, thoughtful details, comfortable coverage, and pieces that can move naturally through everyday life.', 'We are building Saffa as more than a clothing store. We are creating a brand and shopping experience where every woman can discover pieces that feel authentically hers.'], visionLabel: '02 · VISION', visionTitle: 'Make individuality the standard.', vision: 'Our vision is to grow Saffa Fashion into a modern fashion house where design, culture, and technology come together to create a more personal fashion experience.', missionLabel: '03 · MISSION', missionTitle: 'Create with intention.', mission: 'Our mission is to create distinctive modest clothing with a focus on design, quality, comfort, and accessibility while continuously improving how customers discover and experience fashion online.', philosophyLabel: '04 · OUR PHILOSOPHY', philosophy: <>“No unnecessary rules.<br />No need to fit into someone else's definition of style.”</>, philosophyText: 'Saffa exists for women who choose to define their own.', collection: 'Collection', contact: 'Contact'
  };
  return <main className="saffa-about">
    <SaffaHeader active="about" />
    <section className="about-hero"><span>{t.label}</span><h1>{t.hero}</h1><p>{t.heroText}</p></section>
    <section className="about-story"><div className="about-label">{t.storyLabel}</div><div className="about-copy"><h2>{t.storyTitle}</h2>{t.story.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div></section>
    <section className="about-values"><article><span>{t.visionLabel}</span><h2>{t.visionTitle}</h2><p>{t.vision}</p></article><article><span>{t.missionLabel}</span><h2>{t.missionTitle}</h2><p>{t.mission}</p></article></section>
    <section className="about-philosophy"><span>{t.philosophyLabel}</span><blockquote>{t.philosophy}</blockquote><p>{t.philosophyText}</p></section>
    <footer className="about-footer"><span>© Saffa Fashion</span><div><a href="/grid">{t.collection}</a><a href="/contact">{t.contact}</a></div></footer>
  </main>;
}
