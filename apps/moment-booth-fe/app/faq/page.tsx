import type { Metadata } from "next";
import FAQPage from "../page/FAQPage";

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
  return <FAQPage />;
}
