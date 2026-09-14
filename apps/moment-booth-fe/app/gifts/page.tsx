import type { Metadata } from "next";
import GiftsPage from "../page/GiftsPage";

export const metadata: Metadata = {
  title: "Event Gifts | Moment Booth",
  description: "Explore personalised keepsake gifts for your event, starting with custom round shape badges.",
  alternates: { canonical: "/gifts" },
  openGraph: {
    title: "Event Gifts | Moment Booth",
    description: "Personalised keepsake gifts for events, starting with custom round shape badges.",
    url: "/gifts",
    type: "website",
    images: ["/og.png"],
  },
};

export default function GiftsRoute() { return <GiftsPage />; }
