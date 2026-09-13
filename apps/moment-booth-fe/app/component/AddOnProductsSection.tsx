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

const bagSlides: ProductSlide[] = [
  { label: "Botanical Thank You", image: "/products/bags/13.png" },
  { label: "Blush Floral Celebration", image: "/products/bags/14.png" },
  { label: "Mint Love", image: "/products/bags/15.png" },
  { label: "Cherry Blossom Thank You", image: "/products/bags/16.png" },
  { label: "Garden Celebration", image: "/products/bags/17.png" },
  { label: "Classic Thank You", image: "/products/bags/18.png" },
  { label: "Soft Floral Moments", image: "/products/bags/20.png" },
  { label: "Modern Love", image: "/products/bags/21.png" },
  { label: "Pastel Celebration", image: "/products/bags/22.png" },
  { label: "Elegant Keepsake", image: "/products/bags/23.png" },
  { label: "Joyful Floral", image: "/products/bags/24.png" },
];

const cardSlides: ProductSlide[] = [
  ["Heart Frame", "01"],
  ["Floral Thank You", "02"],
  ["Garden Love", "03"],
  ["Blush Petals", "04"],
  ["Modern Monogram", "05"],
  ["Sweet Celebration", "06"],
  ["Classic Keepsake", "07"],
  ["Pastel Moments", "08"],
  ["Botanical Note", "09"],
  ["Wedding Bloom", "10"],
  ["Joyful Confetti", "11"],
  ["Timeless Thank You", "12"],
].map(([label, number]) => ({
  label,
  blank: `/products/cards/${number}-blank.png`,
  photo: `/products/cards/${number}-photo.png`,
}));

const albumSlides: ProductSlide[] = [
  { label: "Wedding album detail 1", image: "/products/photoframe/2.png" },
  { label: "Wedding album detail 2", image: "/products/photoframe/3.jpg" },
  { label: "Wedding album detail 3", image: "/products/photoframe/4.png" },
  { label: "Wedding album detail 4", image: "/products/photoframe/5.png" },
  { label: "Wedding album video", video: "/products/photoframe/video.mp4" },
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
