import type { Metadata } from "next";
import FAQPage from "../page/FAQPage";
import StructuredData from "../component/StructuredData";

export const metadata: Metadata = {
  title: "Photobooth FAQ | Moment Booth Singapore",
  description:
    "Find answers about Moment Booth space requirements, print customisation, and service coverage across Singapore.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Photobooth FAQ | Moment Booth Singapore",
    description:
      "Answers to common questions about Moment Booth photobooth experiences in Singapore.",
    url: "/faq",
    type: "website",
    images: ["/og.png"],
  },
};

export default function FAQRoute() {
  return <>
    <StructuredData data={{
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        ['Do you provide wedding photo booth rental in Singapore?', 'Yes. Moment Booth provides wedding and event photobooth rental across Singapore, including instant prints and on-site support.'],
        ['Can you provide wedding photo prints and frames?', 'Yes. We provide instant wedding photo prints, personalised photo frames and coordinated gallery displays.'],
        ['What is a wedding signature photo gallery?', 'It is a styled multi-panel wedding photo display with printed photos, floral styling and space for guests to leave messages.'],
        ['Do you provide wedding decoration packages?', 'Our Wedding Essential Packages combine photobooth entertainment, photo prints, frames and signature gallery styling into one coordinated wedding experience.'],
      ].map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })),
    }} />
    <StructuredData data={{
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://momentboothsg.com/' },
        { '@type': 'ListItem', position: 2, name: 'FAQ', item: 'https://momentboothsg.com/faq' },
      ],
    }} />
    <FAQPage />
  </>;
}
