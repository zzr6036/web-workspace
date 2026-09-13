"use client";

import { useState } from "react";
import { Paragraph, SectionHeading } from "elij-ui-library";

type ProductSlide = {
  label: string;
  blank?: string;
  photo?: string;
  image?: string;
  video?: string;
};

const cardSlides: ProductSlide[] = Array.from({ length: 12 }, (_, index) => {
  const number = String(index + 1).padStart(2, "0");
  return {
    label: `Style ${number}`,
    blank: `/card/${number}-blank.png`,
    photo: `/card/${number}-photo.png`,
  };
});

const bagSlides: ProductSlide[] = Array.from({ length: 6 }, (_, index) => ({
  label: `Style ${String(index + 1).padStart(2, "0")}`,
}));

const albumSlides: ProductSlide[] = [
  { label: "Album preview 1", image: "/gallery/day8/2.png" },
  { label: "Album preview 2", image: "/gallery/day8/5.png" },
  { label: "Album preview 3", image: "/gallery/day9/3.png" },
  { label: "Album preview video", video: "/gallery/day11/video3.mp4" },
];

type ProductCarouselProps = {
  slides: ProductSlide[];
  kind: "bags" | "cards" | "album";
};

function ProductCarousel({ slides, kind }: ProductCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = slides[activeIndex];
  const move = (direction: -1 | 1) => {
    setActiveIndex((current) => (current + direction + slides.length) % slides.length);
  };

  return (
    <div className={`product-carousel product-carousel--${kind}`}>
      <div className="product-carousel__header">
        <span>{activeSlide.label}</span>
        <strong>{activeIndex + 1} / {slides.length}</strong>
      </div>
      <div className="product-carousel__viewport">
        <button type="button" className="product-carousel__control product-carousel__control--prev" aria-label="Show previous product style" onClick={() => move(-1)}>
          ‹
        </button>
        <div className="product-carousel__slide">
          {activeSlide.blank && activeSlide.photo ? (
            <div className="product-carousel__pair">
              <img src={activeSlide.blank} alt={`${activeSlide.label} without photo`} />
              <img src={activeSlide.photo} alt={`${activeSlide.label} with photo`} />
            </div>
          ) : activeSlide.image ? (
            <img src={activeSlide.image} alt={activeSlide.label} />
          ) : activeSlide.video ? (
            <video controls preload="metadata" aria-label={activeSlide.label}>
              <source src={activeSlide.video} type="video/mp4" />
            </video>
          ) : (
            <div className="product-carousel__empty">
              <strong>{activeSlide.label}</strong>
              <span>Product photo coming soon</span>
            </div>
          )}
        </div>
        <button type="button" className="product-carousel__control product-carousel__control--next" aria-label="Show next product style" onClick={() => move(1)}>
          ›
        </button>
      </div>
      <div className="product-carousel__dots" aria-label="Product styles">
        {slides.map((slide, index) => (
          <button type="button" key={slide.label} aria-label={`Show ${slide.label}`} aria-current={index === activeIndex ? "true" : undefined} onClick={() => setActiveIndex(index)} />
        ))}
      </div>
    </div>
  );
}

const pricing = ["2-hour event · $38", "3-hour event · $50", "Unlimited use"];

export default function AddOnProductsSection() {
  return (
    <section className="section add-on-products-section" id="add-on-products">
      <SectionHeading
        className="section-heading"
        eyebrow="Add-on products"
        title="Little keepsakes for every guest."
        description="Choose from our photo bags, decoration cards, and wedding albums to make printed memories easier to share and keep."
      />
      <div className="add-on-products-grid">
        <article className="add-on-product-card" aria-label="Photobooth photo bags">
          <span className="add-on-product-card__eyebrow">Keepsake extra</span>
          <h3>Photobooth Photo Bags</h3>
          <ProductCarousel slides={bagSlides} kind="bags" />
          <Paragraph>Choose from our available bag styles for guests to carry their prints home.</Paragraph>
          <p className="add-on-product-card__notice">Please confirm your preferred style at least 1 month before your event so we can prepare and print it in advance.</p>
          <ul className="add-on-product-card__pricing">{pricing.map((item) => <li key={item}>{item}</li>)}</ul>
        </article>

        <article className="add-on-product-card" aria-label="Photobooth photo decoration cards">
          <span className="add-on-product-card__eyebrow">Keepsake extra</span>
          <h3>Photobooth Photo Decoration Cards</h3>
          <ProductCarousel slides={cardSlides} kind="cards" />
          <Paragraph>Browse our styles with and without a photo to find the look that suits your event.</Paragraph>
          <p className="add-on-product-card__notice">Please confirm your preferred style at least 1 month before your event so we can prepare and print it in advance.</p>
          <ul className="add-on-product-card__pricing">{pricing.map((item) => <li key={item}>{item}</li>)}</ul>
        </article>

        <article className="add-on-product-card add-on-product-card--album" aria-label="Wedding photobooth album">
          <span className="add-on-product-card__eyebrow">Wedding keepsake</span>
          <h3>Wedding Photobooth Album</h3>
          <ProductCarousel slides={albumSlides} kind="album" />
          <Paragraph>A dedicated album for collecting photobooth memories from your wedding celebration.</Paragraph>
        </article>
      </div>
      <p className="add-on-products-note">Ask us about current availability and pricing when you enquire.</p>
    </section>
  );
}
