export type ShippingOption = {
  id: string;
  name: string;
  arName: string;
  fee: number;
  deliveryDays: string;
};

// Delivery fees from the Saffa Fashion shipping table provided by the store.
export const shippingOptions: ShippingOption[] = [
  { id: 'menoufia', name: 'Menoufia', arName: 'المنوفية', fee: 50, deliveryDays: '2–3 days' },
  { id: 'cairo', name: 'Cairo', arName: 'القاهرة', fee: 85, deliveryDays: '3–4 days' },
  { id: 'giza', name: 'Giza', arName: 'الجيزة', fee: 85, deliveryDays: '3–4 days' },
  { id: 'cairo-giza-outskirts', name: 'Cairo / Giza outskirts, new & remote areas', arName: 'أطراف القاهرة والجيزة — المدن الجديدة والمناطق البعيدة', fee: 90, deliveryDays: '5–7 days' },
  { id: 'qalyubia', name: 'Qalyubia', arName: 'القليوبية', fee: 90, deliveryDays: '4–5 days' },
  { id: 'sharqia', name: 'Sharqia', arName: 'الشرقية', fee: 90, deliveryDays: '4–5 days' },
  { id: 'gharbia', name: 'Gharbia', arName: 'الغربية', fee: 90, deliveryDays: '4–5 days' },
  { id: 'kafr-el-sheikh', name: 'Kafr El Sheikh', arName: 'كفر الشيخ', fee: 90, deliveryDays: '4–5 days' },
  { id: 'beheira', name: 'Beheira', arName: 'البحيرة', fee: 90, deliveryDays: '4–5 days' },
  { id: 'dakahlia', name: 'Dakahlia', arName: 'الدقهلية', fee: 90, deliveryDays: '4–5 days' },
  { id: 'damietta', name: 'Damietta', arName: 'دمياط', fee: 90, deliveryDays: '4–5 days' },
  { id: 'ismailia', name: 'Ismailia', arName: 'الإسماعيلية', fee: 90, deliveryDays: '4–5 days' },
  { id: 'suez', name: 'Suez', arName: 'السويس', fee: 90, deliveryDays: '4–5 days' },
  { id: 'port-said', name: 'Port Said', arName: 'بورسعيد', fee: 90, deliveryDays: '4–5 days' },
  { id: 'beni-suef', name: 'Beni Suef', arName: 'بني سويف', fee: 100, deliveryDays: '5–7 days' },
  { id: 'fayoum', name: 'Fayoum', arName: 'الفيوم', fee: 100, deliveryDays: '5–7 days' },
  { id: 'minya', name: 'Minya', arName: 'المنيا', fee: 100, deliveryDays: '5–7 days' },
  { id: 'asyut', name: 'Assiut', arName: 'أسيوط', fee: 100, deliveryDays: '5–7 days' },
  { id: 'sohag', name: 'Sohag', arName: 'سوهاج', fee: 100, deliveryDays: '5–7 days' },
  { id: 'qena', name: 'Qena', arName: 'قنا', fee: 100, deliveryDays: '5–7 days' },
  { id: 'luxor', name: 'Luxor', arName: 'الأقصر', fee: 100, deliveryDays: '5–7 days' },
  { id: 'aswan', name: 'Aswan', arName: 'أسوان', fee: 100, deliveryDays: '5–7 days' },
  { id: 'matrouh', name: 'Matrouh', arName: 'مطروح', fee: 120, deliveryDays: '5–7 days' },
  { id: 'north-coast', name: 'North Coast', arName: 'الساحل الشمالي', fee: 120, deliveryDays: '5–7 days' },
  { id: 'red-sea', name: 'Red Sea', arName: 'البحر الأحمر', fee: 120, deliveryDays: '5–7 days' },
  { id: 'new-valley', name: 'New Valley', arName: 'الوادي الجديد', fee: 120, deliveryDays: '5–7 days' },
  { id: 'hurghada', name: 'Hurghada', arName: 'الغردقة', fee: 120, deliveryDays: '5–7 days' },
  { id: 'ain-sokhna', name: 'Ain Sokhna', arName: 'العين السخنة', fee: 120, deliveryDays: '5–7 days' },
];

export function getShippingOption(id: string) {
  return shippingOptions.find((option) => option.id === id);
}
