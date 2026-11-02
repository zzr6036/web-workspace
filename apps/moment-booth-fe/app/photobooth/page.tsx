import PhotoboothPage from "../page/PhotoboothPage";
import type { Metadata } from "next";
import StructuredData from "../component/StructuredData";

export const metadata: Metadata = {
  title: "Wedding Photo Booth Rental Singapore | Moment Booth",
  description: "Book a photobooth in Singapore for weddings and events, with instant wedding photo prints, fun props, live previews, on-site help and digital galleries.",
  alternates: { canonical: "/photobooth" },
};

export default function PhotoboothRoute() {
  return <>
    <StructuredData data={{
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Wedding Photo Booth Rental',
      serviceType: 'Photobooth rental',
      provider: { '@id': 'https://momentboothsg.com/#business' },
      areaServed: { '@type': 'City', name: 'Singapore' },
      description: 'Interactive wedding and event photobooth rental with instant photo prints and digital galleries.',
      url: 'https://momentboothsg.com/photobooth',
    }} />
    <StructuredData data={{
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://momentboothsg.com/' },
        { '@type': 'ListItem', position: 2, name: 'Wedding Photo Booth Rental', item: 'https://momentboothsg.com/photobooth' },
      ],
    }} />
    <PhotoboothPage />
  </>;
}
