import type { Metadata } from "next";
import { ShopContent } from "../components/shop/ShopContent";

export const metadata: Metadata = {
  title: "Personalised Photo Frames & Photo Frame Prints",
  description: "Shop personalised photo frames and high-definition photo frame printing in Singapore. Choose frameless panels, bordered frames and wooden photo frames.",
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  return <ShopContent />;
}
