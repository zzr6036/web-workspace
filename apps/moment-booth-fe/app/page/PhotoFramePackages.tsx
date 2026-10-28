"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { whatsappHref } from "../lib/contact";
import PhotoFrameProductDetails from "./PhotoFrameProductDetails";
import { packagePricing } from "./frame-package-pricing.generated";

const wallGallerySets = [
  [
    "/frames/home/wall-gallery-sets/set-a.png",
    "A Set",
    "A refined six-piece arrangement",
    "Approx. 140 × 55 cm · Best for a 2.2 m wall",
  ],
  [
    "/frames/home/wall-gallery-sets/set-b.png",
    "B Set",
    "A statement twelve-piece gallery",
    "Approx. 170 × 74 cm · Best for a 2.2 m wall",
  ],
  [
    "/frames/home/wall-gallery-sets/set-c.png",
    "C Set",
    "A balanced ten-piece collection",
    "Approx. 131 × 81 cm · Best for a 2 m wall",
  ],
  [
    "/frames/home/wall-gallery-sets/set-d.png",
    "D Set",
    "An inviting eight-piece welcome",
    "Approx. 98 × 64 cm · Best for a 1.5 m wall",
  ],
];

const packages = [
  {
    id: "six",
    name: "6 Photo Frame Package",
    original: "$200",
    price: "$100",
    total: 6,
    items: [
      [2, "8 inches", "20.3cm x 25.4cm"],
      [2, "10 inches", "25.4cm x 30.5cm"],
      [2, "12 inches", "30.5cm x 40.6cm"],
    ],
  },
  {
    id: "eight",
    name: "8 Photo Frame Package",
    original: "$200",
    price: "$100",
    total: 8,
    items: [
      [4, "8 inches", "20.3cm x 25.4cm"],
      [2, "10 inches", "25.4cm x 30.5cm"],
      [2, "12 inches", "30.5cm x 40.6cm"],
    ],
  },
  {
    id: "ten",
    name: "10 Photo Frame Package",
    original: "$200",
    price: "$100",
    total: 10,
    featured: true,
    items: [
      [6, "8 inches", "20.3cm x 25.4cm"],
      [2, "10 inches", "25.4cm x 30.5cm"],
      [2, "12 inches", "30.5cm x 40.6cm"],
    ],
  },
];

const materials = [
  [
    "Frameless Rounded Corner",
    "/frame-products/1-Frameless Rounded Corner/combine.png",
  ],
  [
    "White Rounded Border",
    "/frame-products/2-White Rounded Border/combine.png",
  ],
  [
    "Silver Rounded Border",
    "/frame-products/3-Silver Rounded Border/combine.png",
  ],
  [
    "Black Rounded Border",
    "/frame-products/4-Black Rounded Border/combine.png",
  ],
  ["Gold Square Corner", "/frame-products/5-Gold Square Corner/combine.png"],
  [
    "Solid Wood - Warm Walnut",
    "/frame-products/6-Solid Wood-Warm Walnut/combine.png",
  ],
  ["Fresh Light Wheat", "/frame-products/7-Fresh Light Wheat/combine.png"],
  ["Roasted Tea", "/frame-products/8-Roasted Tea/combine.png"],
  ["Black Walnut", "/frame-products/9-Black Walnut/combine.png"],
] as const;

const woodenMaterials = new Set([
  "Solid Wood - Warm Walnut",
  "Fresh Light Wheat",
  "Roasted Tea",
  "Black Walnut",
]);

const pvcDescription =
  "Photo and frame are printed together on premium studio-grade PVC material for a sleek, fashion-forward finish.";
const woodDescription =
  "Photo and frame are supplied separately. Each frame includes a removable white border that can be used or left off for a different look.";

export default function PhotoFramePackages() {
  const [selectedPackage, setSelectedPackage] = useState(packages[2].id);
  const [selectedMaterial, setSelectedMaterial] = useState(materials[0][0]);
  const activePackage = useMemo(
    () => packages.find((item) => item.id === selectedPackage) ?? packages[2],
    [selectedPackage],
  );
  const activeMaterial =
    materials.find(([name]) => name === selectedMaterial) ?? materials[0];
  const activeDescription =
    materials.findIndex(([name]) => name === selectedMaterial) < 5
      ? pvcDescription
      : woodDescription;
  const activePricing = packagePricing[activePackage.id][selectedMaterial];
  const enquiryHref = `${whatsappHref}%20I%27m%20interested%20in%20the%20${encodeURIComponent(activePackage.name)}%20with%20${encodeURIComponent(selectedMaterial)}.`;

  return (
    <>
      <section
        className="frame-packages"
        id="packages"
        aria-labelledby="frame-packages-title"
      >
        <div className="frame-packages__intro">
          <p className="eyebrow">Package options</p>
          <h2 id="frame-packages-title">A complete set, made for your wall.</h2>
          <p>
            Choose the number of frames first, then pick a finish that suits
            your space. Every package includes 8&quot;, 10&quot; and either
            12&quot; or A4 prints, depending on the frame type.
          </p>
        </div>
        <div
          className="frame-package-tabs"
          role="tablist"
          aria-label="Photo frame packages"
        >
          {packages.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={selectedPackage === item.id}
              className={`frame-package-tab${selectedPackage === item.id ? " is-selected" : ""}`}
              onClick={() => setSelectedPackage(item.id)}
            >
              {item.featured && <span>Most Popular</span>}
              <strong>{item.name}</strong>
              <small>
                <b>The package includes:</b>
                {item.items.map(([quantity, size, dimensions]) => (
                  <span key={size}>
                    {quantity} pieces of {size} frame ({dimensions})
                  </span>
                ))}
                <span className="frame-package-tab__note">
                  For Solid Wood - Warm Walnut, Fresh Light Wheat, Roasted Tea
                  and Black Walnut, A4 replaces the 12&quot; option.
                </span>
              </small>
            </button>
          ))}
        </div>
      </section>

      <section
        className="frame-materials"
        id="materials"
        aria-labelledby="frame-materials-title"
      >
        <div className="frame-materials__heading">
          <p className="eyebrow">Choose your frame material</p>
          <h2 id="frame-materials-title">
            Find a finish that feels like yours.
          </h2>
          <p>
            Browse the nine available finishes, then select one to see its
            preview, price and production details.
          </p>
        </div>
        <div className="frame-material-showcase">
          <div
            className="frame-material-rail"
            aria-label="Frame material choices"
          >
            {materials.map(([name, src]) => (
              <button
                key={name}
                type="button"
                className={`frame-material-thumb${selectedMaterial === name ? " is-selected" : ""}`}
                onClick={() => setSelectedMaterial(name)}
                aria-label={`Choose ${name}`}
                aria-pressed={selectedMaterial === name}
              >
                <Image src={src} alt="" width={120} height={120} />
              </button>
            ))}
          </div>
          <div className="frame-material-main">
            <Image
              src={activeMaterial[1]}
              alt={`${activeMaterial[0]} frame preview`}
              width={900}
              height={900}
              priority
            />
          </div>
          <aside className="frame-material-selection">
            <p className="eyebrow">Your selection</p>
            <h3 className="frame-material-selection__package">
              {activePackage.name}
            </h3>
            <p className="frame-material-selection__material">
              {activeMaterial[0]}
            </p>
            {woodenMaterials.has(activeMaterial[0]) && (
              <p className="frame-material-selection__size-note">
                A4 replaces the 12&quot; option for this frame type.
              </p>
            )}
            <label htmlFor="frame-material-select">Frame type</label>
            <select
              id="frame-material-select"
              value={selectedMaterial}
              onChange={(event) => setSelectedMaterial(event.target.value)}
            >
              {materials.map(([name]) => (
                <option key={name}>{name}</option>
              ))}
            </select>
            <p className="frame-material-selection__description">
              {activeDescription}
            </p>
            <div className="frame-material-selection__price">
              <span>
                <s>${activePricing.original}</s> original
              </span>
              <strong>${activePricing.price}</strong>
              <small>{activePackage.name}</small>
            </div>
            <a
              className="hub-button hub-button--primary"
              href={enquiryHref}
              target="_blank"
              rel="noreferrer"
            >
              Enquire about this selection ↗
            </a>
          </aside>
        </div>
      </section>
      <section
        className="hub-section hub-wall-gallery frames-gallery"
        aria-labelledby="frames-gallery-title"
      >
        <div className="hub-section__heading">
          <p className="eyebrow">Curated wall gallery sets</p>
          <h2 id="frames-gallery-title">
            Bring your favourite moments together.
          </h2>
          <p>
            Explore ready-made layouts designed to help you choose the right
            balance of sizes for your wall.
          </p>
          <a
            className="hub-button hub-button--primary frames-gallery__cta"
            href="https://www.momentframesg.com/shop"
            target="_blank"
            rel="noreferrer"
          >
            Explore more custom frames on MomentFrame ↗
          </a>
        </div>
        <div className="hub-wall-gallery__track">
          {wallGallerySets.map(([src, label, title, detail]) => (
            <article className="hub-wall-card" key={src}>
              <Image src={src} alt={title} width={1086} height={1448} />
              <div>
                <p className="eyebrow">{label}</p>
                <h3>{title}</h3>
                <p>{detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <PhotoFrameProductDetails />
    </>
  );
}
