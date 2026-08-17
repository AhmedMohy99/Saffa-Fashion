import './globals.css';
import './device.css';
import './white-theme.css';
import './site-header.css';
import './rtl.css';
import './banner.css';
import './product-detail.css';
import './product-detail-layout.css';
import './showcase-video.css';
import './saffa-polish.css';
import './mobile-polish.css';
import './product-gallery.css';
import './header-fix.css';
import InspectionBanner from './components/InspectionBanner';

export const metadata = {
  title: 'Saffa Fashion | صفا فاشون',
  description: 'Elegant modest fashion for the modern hijabi.',
  metadataBase: new URL('https://saffafashion.shop'),
  icons: { icon: '/logo-transparent.png', apple: '/logo-transparent.png' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><InspectionBanner />{children}</body></html>;
}
