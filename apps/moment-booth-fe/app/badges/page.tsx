import type { Metadata } from "next";
import BadgesPage from "../page/BadgesPage";

export const metadata: Metadata = {
  title: "Custom Round Shape Badges | Moment Booth",
  description: "Order custom full-colour round pin badges from one piece, in four sizes, with a scratch-resistant protective finish.",
  alternates: { canonical: "/badges" },
  openGraph: {
    title: "Custom Round Shape Badges | Moment Booth",
    description: "Custom full-colour round pin badges for events, schools, campaigns, merchandise, and personal designs.",
    url: "/badges",
    type: "website",
    images: ["/og.png"],
  },
};

export default function BadgesRoute() { return <BadgesPage />; }
