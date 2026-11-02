import type { Metadata } from "next";
import SignaturePhotoGalleryPage from "../page/SignaturePhotoGalleryPage";
import StructuredData from "../component/StructuredData";

export const metadata: Metadata = {
  title: "Wedding Signature Photo Gallery Singapore | Moment Booth",
  description: "Create a styled wedding signature photo gallery in Singapore with printed photos, floral styling, guest messages, delivery, setup and teardown included.",
  alternates: { canonical: "/signature-photo-gallery" },
};

export default function SignaturePhotoGalleryRoute() {
  return <>
    <StructuredData data={{
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Wedding Signature Photo Gallery',
      serviceType: 'Wedding photo display and guest signing gallery',
      provider: { '@id': 'https://momentboothsg.com/#business' },
      areaServed: { '@type': 'City', name: 'Singapore' },
      description: 'A styled multi-panel wedding photo display with high-definition prints, floral hedges and space for guest messages.',
      url: 'https://momentboothsg.com/signature-photo-gallery',
    }} />
    <SignaturePhotoGalleryPage />
  </>;
}
