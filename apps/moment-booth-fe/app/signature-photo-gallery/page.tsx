import type { Metadata } from "next";
import SignaturePhotoGalleryPage from "../page/SignaturePhotoGalleryPage";

export const metadata: Metadata = {
  title: "Signature Photo Gallery | Moment Booth",
  description: "A beautiful signature photo gallery for weddings and celebrations in Singapore.",
  alternates: { canonical: "/signature-photo-gallery" },
};

export default function SignaturePhotoGalleryRoute() {
  return <SignaturePhotoGalleryPage />;
}
