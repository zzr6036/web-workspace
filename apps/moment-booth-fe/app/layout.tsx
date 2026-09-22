import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://momentboothsg.com'),
  title: 'Event Photo Booth Rental in Singapore | Moment Booth',
  description: 'Affordable event photo booth rental in Singapore from $368 for 2 hours, with interactive props, on-site help, instant prints, and no hidden fees.',
  keywords: [
    'photobooth Singapore',
    'photo booth Singapore',
    'wedding photobooth Singapore',
    'event photobooth Singapore',
    'instant print photobooth',
    'Moment Booth',
  ],
  icons: {
    icon: '/moment-booth-logo.png',
    shortcut: '/moment-booth-logo.png',
    apple: '/moment-booth-logo.png',
  },
  openGraph: { title: 'Event Photo Booth Rental in Singapore | Moment Booth', description: 'From $368 for 2 hours with interactive props, on-site help, instant prints, and no hidden fees.', type: 'website', images: ['/og.png'] },
  twitter: { card: 'summary_large_image', title: 'Event Photo Booth Rental in Singapore | Moment Booth', description: 'From $368 for 2 hours with interactive props, on-site help, instant prints, and no hidden fees.', images: ['/og.png'] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}<Analytics /></body></html>;
}
