"use client";

import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { getProductSlides, ProductSlide } from "../../../lib/productSlideLists";

import { MultiFormatImage } from "../../MultiFormatImage";

function SlideMedia({ slide, alt, thumbnail = false }: { slide: ProductSlide; alt: string; thumbnail?: boolean }) {
  if (slide.mediaType === "video") return <video src={slide.src} muted={thumbnail} controls={!thumbnail} playsInline preload="metadata" aria-label={alt} />;

  // If the src contains an extension (like .mp4 for video, or specifically overridden images),
  // we could just render it directly, but since we updated placeholders to omit extension:
  const hasExtension = /\.[a-z0-9]+$/i.test(slide.src);
  if (hasExtension) {
    return <Image src={slide.src} alt={alt} fill sizes={thumbnail ? "64px" : "(max-width: 800px) 88vw, 500px"} priority={!thumbnail} />;
  }

  return <MultiFormatImage baseSrc={slide.src} alt={alt} fill sizes={thumbnail ? "64px" : "(max-width: 800px) 88vw, 500px"} priority={!thumbnail} useNextImage />;
}

export function ProductMediaGallery({ subcategoryKey, productName, imageSku }: { subcategoryKey: string; productName: string; imageSku?: string }) {
  const slides = useMemo(() => getProductSlides(subcategoryKey), [subcategoryKey]);
  const variantSlide = useMemo(() => imageSku ? { src: `/frames/product-placeholders/${imageSku}`, mediaType: "image" as const } : undefined, [imageSku]);
  const [selectedSrc, setSelectedSrc] = useState(variantSlide?.src ?? slides[0]?.src);

  useEffect(() => {
    setSelectedSrc(variantSlide?.src ?? slides[0]?.src);
  }, [variantSlide?.src, slides]);

  const selectedSlide = variantSlide?.src === selectedSrc
    ? variantSlide
    : slides.find((slide) => slide.src === selectedSrc) ?? variantSlide ?? slides[0];

  return <div className="shop-product-media-column"><div className="shop-product-images">
    <div className="shop-product-rail" aria-label={`${productName} product images`}>
      {slides.map((slide, index) => <button className={`shop-product-thumbnail${selectedSrc === slide.src ? " is-active" : ""}`} type="button" key={slide.src} onClick={() => setSelectedSrc(slide.src)} aria-label={`View product slide ${index + 1}`}><SlideMedia slide={slide} alt="" thumbnail /></button>)}
    </div>
    <div className="shop-product-image">{selectedSlide ? <SlideMedia slide={selectedSlide} alt={`${productName} product image`} /> : null}</div>
  </div></div>;
}
