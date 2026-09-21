import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://momentboothsg.com'),
  title: 'Moment Booth | Singapore Photobooth Experiences',
  description: 'Moment Booth provides premium photobooth experiences, instant prints, custom templates, and event keepsakes for weddings, birthdays, and celebrations across Singapore.',
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
  openGraph: { title: 'Moment Booth | Singapore Photobooth Experiences', description: 'Premium photobooth experiences, instant prints, and personalised keepsakes for celebrations across Singapore.', type: 'website', images: ['/og.png'] },
  twitter: { card: 'summary_large_image', title: 'Moment Booth | Singapore Photobooth Experiences', description: 'Premium photobooth experiences, instant prints, and personalised keepsakes for celebrations across Singapore.', images: ['/og.png'] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}<Analytics /></body></html>;
}
