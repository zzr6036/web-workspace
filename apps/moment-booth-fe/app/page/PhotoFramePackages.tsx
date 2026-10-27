"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { whatsappHref } from "../lib/contact";

const packages = [
  { id: "six", name: "6-piece package", original: "$200", price: "$100", sizes: "2 × 8\" · 2 × 10\" · 2 × 12\"", total: 6 },
  { id: "eight", name: "8-piece package", original: "$200", price: "$100", sizes: "4 × 8\" · 2 × 10\" · 2 × 12\"", total: 8 },
  { id: "ten", name: "10-piece package", original: "$200", price: "$100", sizes: "6 × 8\" · 2 × 10\" · 2 × 12\"", total: 10, featured: true },
];

const materials = [
  ["Frameless Rounded Corner", "/frame-products/1-Frameless Rounded Corner/combine.png"],
  ["White Rounded Border", "/frame-products/2-White Rounded Border/combine.png"],
  ["Silver Rounded Border", "/frame-products/3-Silver Rounded Border/combine.png"],
  ["Black Rounded Border", "/frame-products/4-Black Rounded Border/combine.png"],
  ["Gold Square Corner", "/frame-products/5-Gold Square Corner/combine.png"],
  ["Solid Wood - Warm Walnut", "/frame-products/6-Solid Wood-Warm Walnut/combine.png"],
  ["Fresh Light Wheat", "/frame-products/7-Fresh Light Wheat/combine.png"],
  ["Roasted Tea", "/frame-products/8-Roasted Tea/combine.png"],
  ["Black Walnut", "/frame-products/9-Black Walnut/combine.png"],
] as const;

export default function PhotoFramePackages() {
  const [selectedPackage, setSelectedPackage] = useState(packages[2].id);
  const [selectedMaterial, setSelectedMaterial] = useState(materials[0][0]);
  const activePackage = useMemo(() => packages.find((item) => item.id === selectedPackage) ?? packages[2], [selectedPackage]);
  const enquiryHref = `${whatsappHref}%20I%27m%20interested%20in%20the%20${encodeURIComponent(activePackage.name)}%20with%20${encodeURIComponent(selectedMaterial)}.`;

  return <>
    <section className="frame-packages" id="packages" aria-labelledby="frame-packages-title">
      <div className="frame-packages__intro">
        <p className="eyebrow">Package options</p>
        <h2 id="frame-packages-title">A complete set, made for your wall.</h2>
        <p>Choose the number of frames first, then pick a finish that suits your space. Every package includes 8&quot;, 10&quot; and 12&quot; prints.</p>
      </div>
      <div className="frame-package-options">
        {packages.map((item) => <button key={item.id} type="button" className={`frame-package-option${selectedPackage === item.id ? " is-selected" : ""}`} onClick={() => setSelectedPackage(item.id)} aria-pressed={selectedPackage === item.id}>
          {item.featured && <span className="frame-package-option__badge">Most Popular</span>}
          <span className="frame-package-option__name">{item.name}</span>
          <span className="frame-package-option__price"><s>{item.original}</s> <strong>{item.price}</strong></span>
          <span className="frame-package-option__sizes">{item.sizes}</span>
        </button>)}
      </div>
    </section>

    <section className="frame-materials" id="materials" aria-labelledby="frame-materials-title">
      <div className="frame-materials__heading"><p className="eyebrow">Choose your frame material</p><h2 id="frame-materials-title">Find a finish that feels like yours.</h2><p>Each finish is available across the selected package sizes. Tap a material to preview it below.</p></div>
      <div className="frame-material-grid">
        {materials.map(([name, src]) => <button key={name} type="button" className={`frame-material-card${selectedMaterial === name ? " is-selected" : ""}`} onClick={() => setSelectedMaterial(name)} aria-pressed={selectedMaterial === name}>
          <Image src={src} alt={`${name} photo frame finish`} width={500} height={500} />
          <span>{name}</span>
        </button>)}
      </div>
    </section>

    <section className="frame-package-summary" aria-labelledby="frame-summary-title">
      <div className="frame-package-summary__preview"><p className="eyebrow">Package preview</p><h2 id="frame-summary-title">{activePackage.name} · {selectedMaterial}</h2><p>{activePackage.sizes}</p><Image src={materials.find(([name]) => name === selectedMaterial)?.[1] ?? materials[0][1]} alt={`${selectedMaterial} package preview`} width={900} height={900} /></div>
      <div className="frame-package-summary__price"><p className="eyebrow">Price summary</p><span className="frame-package-summary__old"><s>{activePackage.original}</s> original package price</span><strong>{activePackage.price}</strong><span>for {activePackage.total} personalised frames</span><a className="hub-button hub-button--primary" href={enquiryHref} target="_blank" rel="noreferrer">Enquire about this package ↗</a></div>
    </section>

    <section className="frame-product-details" id="product-details" aria-labelledby="frame-details-title"><div><p className="eyebrow">Product details</p><h2 id="frame-details-title">Made to display your favourite memories.</h2><p>Send your selected photos after enquiry and we will prepare a print preview before production.</p></div><div className="frame-product-details__grid"><span><strong>9 finishes</strong>Choose from modern borders and warm wood tones.</span><span><strong>Three sizes</strong>Every package combines 8&quot;, 10&quot; and 12&quot; frames.</span><span><strong>HD colour print</strong>Clear, vibrant printing for everyday display.</span><span><strong>Preview first</strong>Approve the layout before we produce it.</span></div></section>

    <section className="frame-how-to-order" id="how-to-order" aria-labelledby="frame-order-title"><p className="eyebrow">How to order</p><h2 id="frame-order-title">From favourite photos to finished frames.</h2><ol><li><strong>Choose a package</strong><span>Select 6, 8 or 10 frames.</span></li><li><strong>Choose a material</strong><span>Pick the finish that matches your home or event.</span></li><li><strong>Send your photos</strong><span>We check the crop and prepare a preview.</span></li><li><strong>Approve and print</strong><span>We produce and arrange delivery in Singapore.</span></li></ol></section>

    <section className="frame-enquire" id="enquire"><p className="eyebrow">Ready to create yours?</p><h2>Give your favourite moments a place to stay.</h2><a className="hub-button hub-button--primary" href={enquiryHref} target="_blank" rel="noreferrer">Enquire on WhatsApp ↗</a></section>
  </>;
}
