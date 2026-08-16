import './globals.css';
import './device.css';
import './white-theme.css';
import './site-header.css';
import './rtl.css';
import './banner.css';
import './product-detail.css';
import './product-detail-layout.css';
import InspectionBanner from './components/InspectionBanner';

export const metadata = {
  title: 'Saffa Fashion | صفا فاشون',
  description: 'Elegant modest fashion for the modern hijabi.',
  metadataBase: new URL('https://saffafashion.shop'),
  icons: { icon: '/logo.jpeg' },
  viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <InspectionBanner />
        {children}
      </body>
    </html>
  );
}
