"use client";

import Image from "next/image";
import { useState } from "react";

type HomePhotoCarouselProps = {
  label: string;
  day: string;
  images: string[];
};

export default function HomePhotoCarousel({ label, day, images }: HomePhotoCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const move = (direction: -1 | 1) => {
    setActiveIndex((current) => (current + direction + images.length) % images.length);
  };

  return (
    <article className="home-photo-carousel" aria-label={`${label} photo carousel`}>
      <div className="home-photo-carousel__viewport">
        <Image
          src={`/gallery/${day}/${images[activeIndex]}.png`}
          alt={`${label} photo ${activeIndex + 1}`}
          width={1086}
          height={1448}
        />
        <button type="button" className="home-photo-carousel__control home-photo-carousel__control--prev" onClick={() => move(-1)} aria-label={`Previous ${label} photo`}>
          ‹
        </button>
        <button type="button" className="home-photo-carousel__control home-photo-carousel__control--next" onClick={() => move(1)} aria-label={`Next ${label} photo`}>
          ›
        </button>
      </div>
      <div className="home-photo-carousel__dots" aria-label={`${label} photo pages`}>
        {images.map((image, index) => (
          <button
            type="button"
            key={image}
            aria-label={`Show ${label} photo ${index + 1}`}
            aria-current={index === activeIndex ? "true" : undefined}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </article>
  );
}
