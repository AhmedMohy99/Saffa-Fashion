'use client';

import { useSaffaLanguage } from './SaffaHeader';

export default function InspectionBanner() {
  const [language] = useSaffaLanguage();
  const ar = language === 'ar';
  return <div className="saffa-inspection-banner" role="status">{ar ? '📦 متاح معاينة المنتج قبل الاستلام' : '📦 Inspection available before receipt'}</div>;
}
