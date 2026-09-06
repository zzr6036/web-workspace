import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://moment-booth.snowy-dog-2665.chatgpt.site'),
  title: 'Moment Booth | Capture Every Smile. Print Every Memory',
  description: 'Relaxed, beautifully designed photobooth experiences for weddings, birthdays, and celebrations across Singapore.',
  icons: {
    icon: '/moment-booth-logo.png',
    shortcut: '/moment-booth-logo.png',
    apple: '/moment-booth-logo.png',
  },
  openGraph: { title: 'Moment Booth | Capture Every Smile. Print Every Memory', description: 'Modern photobooth experiences and instant keepsakes for celebrations in Singapore.', type: 'website', images: ['/og.png'] },
  twitter: { card: 'summary_large_image', title: 'Moment Booth | Capture Every Smile. Print Every Memory', description: 'Modern photobooth experiences and instant keepsakes for celebrations in Singapore.', images: ['/og.png'] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
