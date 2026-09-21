import type { Metadata } from "next";
import GiftsPage from "../page/GiftsPage";

export const metadata: Metadata = {
  title: "Event Gifts & Photobooth Keepsakes | Moment Booth",
  description: "Explore personalised photobooth keepsakes and event gifts, starting with custom round shape badges, for celebrations in Singapore.",
  alternates: { canonical: "/gifts" },
  openGraph: {
    title: "Event Gifts & Photobooth Keepsakes | Moment Booth",
    description: "Personalised photobooth keepsakes and event gifts, starting with custom round shape badges, for celebrations in Singapore.",
    url: "/gifts",
    type: "website",
    images: ["/og.png"],
  },
};

export default function GiftsRoute() { return <GiftsPage />; }
