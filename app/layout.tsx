import './globals.css';

export const metadata = {
  title: 'Saffa Fashion | صفا فاشون',
  description: 'Elegant modest fashion for the modern hijabi.',
  metadataBase: new URL('https://saffafashion.shop'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
