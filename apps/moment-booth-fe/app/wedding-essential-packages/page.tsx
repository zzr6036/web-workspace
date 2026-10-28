import type { Metadata } from "next";
import WeddingEssentialPackagesPage from "../page/WeddingEssentialPackagesPage";

export const metadata: Metadata = {
  title: "Wedding Essential Packages | Moment Booth",
  description: "Combine photo booth, photo frames and signature gallery services into one wedding memory package.",
  alternates: { canonical: "/wedding-essential-packages" },
};

export default function WeddingEssentialPackagesRoute() {
  return <WeddingEssentialPackagesPage />;
}
