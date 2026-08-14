import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Saffa Fashion | صفا فاشون',
  description: 'Elegant modest fashion for the modern hijabi.',
  metadataBase: new URL('https://saffafashion.shop'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>
    <header className="header"><div className="container nav">
      <Link href="/" className="brand"><span className="logo-circle"><img src="/logo.jpeg" alt="Saffa Fashion logo" /></span><span>SAFFA</span></Link>
      <nav className="navlinks"><Link href="/">Home</Link><Link href="/#collection">Collection</Link><Link href="/contact">Contact Us</Link><a href="https://www.instagram.com/_saffa_01" target="_blank">Instagram</a><a href="https://www.tiktok.com/@saffa_0190" target="_blank">TikTok</a></nav>
      <a className="btn btn-dark" href="https://api.whatsapp.com/message/3RRGEUO5XNISD1?autoload=1&app_absent=0" target="_blank">WhatsApp</a>
    </div></header>
    {children}
    <footer className="footer"><div className="container footer-grid"><div>© {new Date().getFullYear()} Saffa Fashion — صفا فاشون</div><div className="socials"><a className="social" href="https://www.instagram.com/_saffa_01" target="_blank">Instagram</a><a className="social" href="https://www.tiktok.com/@saffa_0190" target="_blank">TikTok</a><a className="social" href="/contact">WhatsApp Orders</a></div></div></footer>
  </body></html>;
}
