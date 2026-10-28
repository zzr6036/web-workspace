"use client";

import { useState } from "react";
import Image from "next/image";
import SiteFooter from "../layout/SiteFooter";
import SiteHeader from "../layout/SiteHeader";
import { whatsappHref } from "../lib/contact";

const packages = [
  {
    name: "Photo Booth + Photo Frame",
    titleLines: [
      "Photo Booth - 2 Hour Package",
      "Photo Frame - 10 Piece Package",
    ],
    hasFrames: true,
    eyebrow: "Interactive keepsakes",
    image: "/home-products/photo-booth.png",
    description:
      "For celebrations that combine guest interaction with personalised tabletop memories.",
    includes: [
      "Photo Booth experience",
      "Choice of Frameless Rounded Corner or Black Walnut",
      "HD printing and preview approval",
    ],
    framePrices: [
      { key: "pvc", name: "Frameless Rounded Corner", price: 123.2 },
      { key: "wooden", name: "Black Walnut", price: 220 },
    ],
    boothPrice: 388,
    packagePrices: { pvc: 460, wooden: 548 },
  },
  {
    name: "Photo Booth + Signature Photo Gallery",
    titleLines: ["Photo Booth - 2 Hour Package", "Signature Photo Gallery"],
    eyebrow: "Experience + statement display",
    image: "/home-products/wedding-signature-gallery.png",
    description:
      "For weddings that want lively guest moments and a beautiful visual centrepiece.",
    includes: [
      "Photo Booth experience",
      "Three-panel Signature Photo Gallery",
      "Floral hedges in a selected theme",
      "Delivery, setup and teardown",
    ],
    framePrices: [],
    boothPrice: 388,
    galleryPrice: 488,
    packagePrices: { pvc: 788, wooden: 788 },
  },
  {
    name: "Photo Frame + Signature Photo Gallery",
    titleLines: ["Photo Frame - 10 Piece Package", "Signature Photo Gallery"],
    eyebrow: "Coordinated display",
    image: "/home-products/photo-frame.png",
    hasFrames: true,
    description:
      "For a cohesive photo display across tables, welcome areas and the main venue wall.",
    includes: [
      "10 Photo Frame Package",
      "Choice of Frameless Rounded Corner or Black Walnut",
      "Three-panel Signature Photo Gallery",
      "Complimentary layout design and preview",
    ],
    framePrices: [
      { key: "pvc", name: "Frameless Rounded Corner", price: 123.2 },
      { key: "wooden", name: "Black Walnut", price: 220 },
    ],
    galleryPrice: 488,
    packagePrices: { pvc: 550, wooden: 637 },
  },
  {
    name: "Photo Booth + Photo Frame + Signature Photo Gallery",
    titleLines: [
      "Photo Booth - 2 Hour Package",
      "Photo Frame - 10 Piece Package",
      "Signature Photo Gallery",
    ],
    eyebrow: "Most complete",
    image: "/home-products/wedding-essential-packages.png",
    description:
      "The complete wedding photo experience, from guest interaction to final display.",
    includes: [
      "Full Photo Booth experience",
      "Choice of Frameless Rounded Corner or Black Walnut",
      "Signature Photo Gallery setup",
      "Coordinated printing, styling and delivery",
    ],
    framePrices: [
      { key: "pvc", name: "Frameless Rounded Corner", price: 123.2 },
      { key: "wooden", name: "Black Walnut", price: 220 },
    ],
    boothPrice: 388,
    galleryPrice: 488,
    packagePrices: { pvc: 899, wooden: 986 },
    featured: true,
    hasFrames: true,
  },
];

export default function WeddingEssentialPackagesPage() {
  const [frameTypes, setFrameTypes] = useState(() =>
    Object.fromEntries(
      packages.map((item) => [item.name, "Frameless Rounded Corner"]),
    ),
  );
  const enquiryHref = `${whatsappHref}%20I%27d%20like%20to%20compare%20your%20Wedding%20Essential%20Packages%20and%20learn%20what%20is%20included%20in%20each%20option.`;
  const formatPrice = (value) => `$${value.toFixed(2)}`;

  return (
    <main>
      <SiteHeader />
      <section
        className="essential-hero"
        aria-labelledby="wedding-packages-title"
      >
        <div className="essential-hero__copy">
          <p className="eyebrow">Wedding Essential Packages</p>
          <h1 id="wedding-packages-title">
            Bring every wedding moment together.
          </h1>
          <p>
            Combine Photo Booth, Photo Frames and Signature Photo Gallery
            services into one coordinated wedding experience.
          </p>
          <div className="hub-hero__actions">
            <a
              className="hub-button hub-button--primary"
              href="#package-options"
            >
              Compare packages ↓
            </a>
            <a
              className="hub-button hub-button--secondary"
              href={enquiryHref}
              target="_blank"
              rel="noreferrer"
            >
              Enquire on WhatsApp ↗
            </a>
          </div>
        </div>
        <Image
          className="essential-hero__image"
          src="/home-products/wedding-essential-packages.png"
          alt="Wedding Essential Packages combining Photo Booth, Photo Frames and Signature Photo Gallery"
          width={1254}
          height={1254}
          priority
        />
      </section>

      <section
        className="essential-packages"
        id="package-options"
        aria-labelledby="package-options-title"
      >
        <div className="essential-section-heading">
          <p className="eyebrow">Package options</p>
          <h2 id="package-options-title">
            Choose the combination that fits your celebration.
          </h2>
          <p>
            Each package can be confirmed with our team based on your guest
            count, venue and preferred styling.
          </p>
        </div>
        <div className="essential-package-grid">
          {packages.map((item) => (
            <article
              className={`essential-package-card${item.featured ? " is-featured" : ""}`}
              key={item.name}
            >
              {item.featured && (
                <span className="essential-package-card__badge">
                  Most complete
                </span>
              )}
              <Image src={item.image} alt="" width={800} height={560} />
              <div className="essential-package-card__body">
                <p className="eyebrow">{item.eyebrow}</p>
                <h3>
                  {item.titleLines ? (
                    <ul className="essential-package-card__title-list">
                      {item.titleLines.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  ) : (
                    item.name
                  )}
                </h3>
                <p>{item.description}</p>
                <h4>Includes</h4>
                <ul className="essential-package-card__includes">
                  {item.includes.map((entry) =>
                    entry ===
                    "Choice of Frameless Rounded Corner or Black Walnut" ? (
                      <li key={entry}>
                        10 Photo Frame Package{" "}
                        <em>(Frameless Rounded Corner or Black Walnut)</em>
                      </li>
                    ) : (
                      <li key={entry}>{entry}</li>
                    ),
                  )}
                </ul>
                <div className="essential-package-card__selector">
                  <label htmlFor={`frame-type-${item.name}`}>Frame type</label>
                  <select
                    id={`frame-type-${item.name}`}
                    value={frameTypes[item.name]}
                    disabled={item.name === "Photo Booth + Signature Photo Gallery"}
                    onChange={(event) =>
                      setFrameTypes((current) => ({
                        ...current,
                        [item.name]: event.target.value,
                      }))
                    }
                  >
                    <option>Frameless Rounded Corner</option>
                    <option>Black Walnut</option>
                  </select>
                  {item.name === "Photo Booth + Signature Photo Gallery" && (
                    <s className="essential-package-card__selector-note">
                      Frameless Rounded Corner or Black Walnut
                    </s>
                  )}
                </div>
                <div className="essential-package-card__price">
                  {(() => {
                    const selectedFrame = item.framePrices.find(
                      (frame) => frame.name === frameTypes[item.name],
                    );
                    const originalPrice =
                      (selectedFrame?.price ?? 0) +
                      (item.boothPrice ?? 0) +
                      (item.galleryPrice ?? 0);
                    const packageKey =
                      frameTypes[item.name] === "Black Walnut" ? "wooden" : "pvc";
                    const packagePrice = item.packagePrices?.[packageKey] ?? Math.round(originalPrice * 0.9 * 100) / 100;
                    return (
                      <>
                        <s>Original price · {formatPrice(originalPrice)}</s>
                        <strong>
                          Package price · {formatPrice(packagePrice)}
                        </strong>
                      </>
                    );
                  })()}
                </div>
                <a
                  className="hub-button hub-button--primary"
                  href={enquiryHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  Enquire ↗
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="essential-cta" aria-labelledby="essential-cta-title">
        <p className="eyebrow">Ready to plan yours?</p>
        <h2 id="essential-cta-title">
          Bring every part of your wedding photo experience together.
        </h2>
        <p>
          We’ll help you confirm the package, styling, photo layout and final
          pricing.
        </p>
        <a
          className="hub-button hub-button--primary"
          href={enquiryHref}
          target="_blank"
          rel="noreferrer"
        >
          Enquire about a package ↗
        </a>
      </section>
      <SiteFooter />
    </main>
  );
}
