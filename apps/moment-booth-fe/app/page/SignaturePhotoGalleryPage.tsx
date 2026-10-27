"use client";
import Image from "next/image";
import SiteFooter from "../layout/SiteFooter";
import SiteHeader from "../layout/SiteHeader";
import { whatsappHref } from "../lib/contact";
import { useState } from "react";

const galleryImages = [
  [
    "/signature-products/1 - Signature Photo Gallery/A1.png",
    "Signature gallery display",
  ],
  [
    "/signature-products/1 - Signature Photo Gallery/A2.png",
    "Gold frame gallery at a wedding",
  ],
  [
    "/signature-products/1 - Signature Photo Gallery/A3.png",
    "Wedding photo signing display",
  ],
  [
    "/signature-products/1 - Signature Photo Gallery/A4.png",
    "Signature gallery arrangement",
  ],
  [
    "/signature-products/1 - Signature Photo Gallery/A5.png",
    "Wedding gallery styling",
  ],
  [
    "/signature-products/1 - Signature Photo Gallery/A6.png",
    "Gold frame panel display",
  ],
  [
    "/signature-products/1 - Signature Photo Gallery/A7.png",
    "Guest photo gallery",
  ],
  ["/signature-products/floral /B1.png", "Floral hedge styling"],
  ["/signature-products/floral /B2.png", "Floral frame panel styling"],
  ["/signature-products/floral /B3.png", "Floral gallery arrangement"],
  ["/signature-products/floral /B4.png", "Floral hedge catalogue option"],
  ["/signature-products/floral /B5.png", "Floral hedge colour option"],
  ["/signature-products/floral /B6.png", "Floral hedge styling option"],
  ["/signature-products/floral /B7.png", "Floral hedge theme option"],
  ["/signature-products/floral /combine.png", "Complete floral hedge catalogue"],
] as const;

export default function SignaturePhotoGalleryPage() {
  const [activeImage, setActiveImage] = useState(0);
  const signatureEnquiryHref = `${whatsappHref.split("?", 1)[0]}?text=${encodeURIComponent("Hi, I’d like to learn more about your Signature Photo Gallery service, including the available designs, setup options and pricing.")}`;

  return (
    <main>
      <SiteHeader />
      <section
        className="signature-hero"
        aria-labelledby="signature-gallery-title"
      >
        <p className="eyebrow">Signature Photo Gallery</p>
        <h1 id="signature-gallery-title">
          A beautiful place for your guests’ memories.
        </h1>
        <p>
          We are preparing a signature photo gallery experience for weddings and
          celebrations. More details will be added soon.
        </p>
      </section>
      <section
        className="signature-product"
        aria-labelledby="signature-product-title"
      >
        <div className="signature-product__gallery">
          <div className="signature-product__main">
            <Image
              src={galleryImages[activeImage][0]}
              alt={galleryImages[activeImage][1]}
              width={1200}
              height={900}
              priority
            />
          </div>
          <div
            className="signature-product__thumbs"
            aria-label="Signature Photo Gallery images"
          >
            {galleryImages.map(([src, alt], index) => (
              <button
                type="button"
                key={src}
                className={index === activeImage ? "is-selected" : ""}
                onClick={() => setActiveImage(index)}
                aria-label={`View ${alt}`}
                aria-pressed={index === activeImage}
              >
                <Image src={src} alt="" width={120} height={90} />
              </button>
            ))}
          </div>
        </div>
        <div className="signature-product__details">
          <p className="eyebrow">Signature Photo Gallery</p>
          <h2 id="signature-product-title">Signature Photo Gallery</h2>
          <p className="signature-product__price">$588.00</p>
          <p>
            Includes delivery, setup and teardown, plus all styling items
            included in your booking.
          </p>
          <h3>Package includes</h3>
          <ul>
            <li>
              Three gold frame panels: one 1.8 m × 0.8 m centre panel and two
              1.5 m × 0.5 m side panels
            </li>
            <li>
              High-definition prints on foam board or canvas, with no surcharge
              for matching dimensions
            </li>
            <li>Floral hedges in your selected theme</li>
            <li>Pleated stands and decorative props</li>
            <li>
              Complimentary photo layout design, including HD resizing and
              precise matching to each frame panel
            </li>
            <li>
              Complimentary wording additions for selected photos, upon request
            </li>
          </ul>
          <p className="signature-product__note">
            Choose your preferred floral hedge style from our catalogue.
          </p>
          <a className="hub-button hub-button--primary" href={signatureEnquiryHref} target="_blank" rel="noreferrer">
            Enquire about Signature Photo Gallery ↗
          </a>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
