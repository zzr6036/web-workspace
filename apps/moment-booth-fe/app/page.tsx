import HomePage from './page/HomePage';
import type { Metadata } from 'next';
import StructuredData from './component/StructuredData';

export const metadata: Metadata = {
  title: 'Photobooth, Wedding Photo Prints & Decoration Singapore | Moment Booth',
  description: 'Moment Booth creates photobooth experiences, instant wedding photo prints, signature photo displays and coordinated wedding decoration in Singapore.',
  alternates: { canonical: '/' },
};

export default function Home() {
  return <>
    <StructuredData data={{
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': 'https://momentboothsg.com/#business',
      name: 'Moment Booth',
      url: 'https://momentboothsg.com/',
      image: 'https://momentboothsg.com/og.png',
      description: 'Photobooth experiences, wedding photo prints, signature photo displays and wedding decoration in Singapore.',
      areaServed: { '@type': 'City', name: 'Singapore' },
      priceRange: '$$',
      makesOffer: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Wedding Photo Booth Rental' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Wedding Photo Prints' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Signature Photo Gallery' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Wedding Decoration' } },
      ],
    }} />
    <HomePage />
  </>;
}
