import type { Metadata } from 'next';
import SiteHeader from './layout/SiteHeader';
import SiteFooter from './layout/SiteFooter';
import { FloatingWhatsAppButton } from './layout/FloatingWhatsAppButton';
import { Analytics } from '@vercel/analytics/next';
import { CartProvider } from './components/cart/CartProvider';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL("https://www.momentframesg.com"),
  title: {
    default: "Custom Photo Frames & Photo Frame Printing in Singapore | MomentFrame",
    template: "%s | MomentFrame Singapore",
  },
  description: "Personalised photo frames, high-definition photo frame printing and curated wall gallery sets in Singapore. Create wedding, family, baby and graduation displays with MomentFrame.",
  applicationName: "MomentFrame",
  keywords: [
    "custom photo frames Singapore",
    "photo frame printing Singapore",
    "personalised photo frames",
    "framed photo prints",
    "wedding photo frames",
    "family photo frames",
    "wall gallery frames Singapore",
    "MomentFrame Singapore",
  ],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_SG",
    url: "/",
    siteName: "MomentFrame",
    title: "Custom Photo Frames & Photo Frame Printing in Singapore | MomentFrame",
    description: "Personalised photo frames, HD photo printing and wall gallery sets made for your favourite moments.",
    images: [{ url: "/frames/hero-panels.png", width: 1200, height: 800, alt: "MomentFrame custom photo frames in Singapore" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Photo Frames & Photo Frame Printing in Singapore | MomentFrame",
    description: "Personalised photo frames, HD photo printing and wall gallery sets made for your favourite moments.",
    images: ["/frames/hero-panels.png"],
  },
  icons: { icon: "/logo_circle.png", apple: "/logo_circle.png" },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MomentFrame",
  url: "https://www.momentframesg.com",
  logo: "https://www.momentframesg.com/logo_circle.png",
  description: "Custom photo frames, photo frame printing and wall gallery sets in Singapore.",
  areaServed: { "@type": "Country", name: "Singapore" },
  sameAs: ["https://www.momentframesg.com"],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "MomentFrame",
  url: "https://www.momentframesg.com",
  description: "Personalised photo frames and photo frame printing in Singapore.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationSchema, websiteSchema]) }}
        />
        <CartProvider>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <SiteHeader />
          {children}
          <SiteFooter />
          <FloatingWhatsAppButton />
          <Analytics />
        </CartProvider>
      </body>
    </html>
  );
}
