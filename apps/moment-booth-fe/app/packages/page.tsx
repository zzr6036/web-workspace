import type { Metadata } from "next";
import PackagesPage from "../page/PackagesPage";

export const metadata: Metadata = {
  title: "Photobooth Packages & Add-ons | Moment Booth",
  description:
    "Compare Moment Booth photobooth packages, optional event services, and keepsake products for celebrations across Singapore.",
  alternates: { canonical: "/packages" },
  openGraph: {
    title: "Photobooth Packages & Add-ons | Moment Booth",
    description:
      "Compare Moment Booth packages, event add-ons, and printed keepsakes for your celebration.",
    url: "/packages",
    type: "website",
    images: ["/og.png"],
  },
};

export default function PackagesRoute() {
  return <PackagesPage />;
}
