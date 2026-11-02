import PhotoFramesPage from "../page/PhotoFramesPage";
import type { Metadata } from "next";
import StructuredData from "../component/StructuredData";

export const metadata: Metadata = {
  title: "Wedding Photo Prints & Custom Photo Frames Singapore | Moment Booth",
  description:
    "Order high-quality wedding photo prints, personalised photo frames and curated wall gallery sets in Singapore for weddings, families and meaningful moments.",
  alternates: { canonical: "/photo-frames" },
};

export default function PhotoFramesRoute() {
  return <>
    <StructuredData data={{
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Wedding Photo Prints and Custom Photo Frames',
      serviceType: 'Photo printing and framing',
      provider: { '@id': 'https://momentboothsg.com/#business' },
      areaServed: { '@type': 'City', name: 'Singapore' },
      description: 'Personalised wedding photo prints, classic frames, signature wooden frames and gallery displays.',
      url: 'https://momentboothsg.com/photo-frames',
    }} />
    <PhotoFramesPage />
  </>;
}
