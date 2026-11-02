import type { Metadata } from "next";
import WeddingEssentialPackagesPage from "../page/WeddingEssentialPackagesPage";
import StructuredData from "../component/StructuredData";

export const metadata: Metadata = {
  title: "Wedding Decoration & Photo Booth Packages Singapore | Moment Booth",
  description: "Combine a wedding photo booth, instant photo prints, photo frames and a signature photo gallery into one coordinated wedding decoration package in Singapore.",
  alternates: { canonical: "/wedding-essential-packages" },
};

export default function WeddingEssentialPackagesRoute() {
  return <>
    <StructuredData data={{
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Wedding Essential Packages',
      serviceType: 'Wedding decoration and photo experience package',
      provider: { '@id': 'https://momentboothsg.com/#business' },
      areaServed: { '@type': 'City', name: 'Singapore' },
      description: 'Coordinated wedding decoration packages combining photobooth entertainment, wedding photo prints, photo frames and signature photo gallery styling.',
      url: 'https://momentboothsg.com/wedding-essential-packages',
    }} />
    <WeddingEssentialPackagesPage />
  </>;
}
