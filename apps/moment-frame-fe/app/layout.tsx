import type { Metadata } from 'next';
import SiteHeader from './layout/SiteHeader';
import SiteFooter from './layout/SiteFooter';
import { CartProvider } from './components/cart/CartProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'MomentFrame | Print Your Story. Frame Your Memories.',
  description: 'A place for your favourite moments. Discover the MomentFrame collection preview.',
  icons: { icon: '/logo_circle.png', apple: '/logo_circle.png' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <CartProvider>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <SiteHeader />
          {children}
          <SiteFooter />
        </CartProvider>
      </body>
    </html>
  );
}
