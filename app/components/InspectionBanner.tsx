'use client';

import { useSaffaLanguage } from './SaffaHeader';

export default function InspectionBanner() {
  const [language] = useSaffaLanguage();
  const ar = language === 'ar';
  const message = ar ? '📦 متاح معاينة المنتج قبل الاستلام' : '📦 Inspection available before receipt';
  return <div className="saffa-inspection-banner" role="status" aria-label={message}>
    <div className="saffa-inspection-track">
      {[0, 1, 2, 3].map(index => <span className="saffa-inspection-message" key={index} aria-hidden={index !== 0}>{message}</span>)}
    </div>
  </div>;
}
