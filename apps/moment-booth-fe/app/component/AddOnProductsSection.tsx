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
  { label: "Soft Floral Moments", image: "/products/bags/20.png" },
  { label: "Modern Love", image: "/products/bags/21.png" },
  { label: "Joyful Floral", image: "/products/bags/24.png" },
  { label: "Classic Thank You", image: "/products/bags/18.png" },
  { label: "Pastel Celebration", image: "/products/bags/22.png" },
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

const albumVideoSlides: ProductSlide[] = [
  { label: "Wedding album video", video: "/products/photoframe/video.mp4" },
];

const albumPhotoSlides: ProductSlide[] = [
  { label: "Wedding album detail 1", image: "/products/photoframe/2.png" },
  { label: "Wedding album detail 2", image: "/products/photoframe/3.jpg" },
  { label: "Wedding album detail 3", image: "/products/photoframe/4.png" },
  { label: "Wedding album detail 4", image: "/products/photoframe/5.png" },
];

type ProductCarouselProps = {
  slides: ProductSlide[];
  kind: "bags" | "cards" | "album";
};

function ProductCarousel({ slides, kind }: ProductCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = slides[activeIndex];
  const move = (direction: -1 | 1) => {
    setActiveIndex(
      (current) => (current + direction + slides.length) % slides.length,
    );
  };

  if (kind === "bags") {
    return (
      <div
        className="product-carousel product-carousel--bags"
        aria-label="Photobooth photo bag styles"
      >
        <div className="product-carousel__bag-grid">
          {slides.map((slide) => (
            <article className="product-carousel__bag-card" key={slide.label}>
              {slide.image ? <img src={slide.image} alt={slide.label} /> : null}
              <strong>{slide.label}</strong>
            </article>
          ))}
        </div>
      </div>
    );
  }

  if (kind === "cards") {
    return (
      <div
        className="product-carousel product-carousel--cards"
        aria-label="Photobooth photo decoration card styles"
      >
        <div className="product-carousel__card-grid">
          {slides.map((slide) => (
            <DecorationCardCarousel key={slide.label} slide={slide} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`product-carousel product-carousel--${kind}`}>
      {kind !== "album" ? (
        <div className="product-carousel__header">
          <span>{activeSlide.label}</span>
          <strong>
            {activeIndex + 1} / {slides.length}
          </strong>
        </div>
      ) : null}
      <div className="product-carousel__viewport">
        <button
          type="button"
          className="product-carousel__control product-carousel__control--prev"
          aria-label="Show previous product style"
          onClick={() => move(-1)}
        >
          ‹
        </button>
        <div className="product-carousel__slide">
          {activeSlide.blank && activeSlide.photo ? (
            <div className="product-carousel__pair">
              <img
                src={activeSlide.blank}
                alt={`${activeSlide.label} without photo`}
              />
              <img
                src={activeSlide.photo}
                alt={`${activeSlide.label} with photo`}
              />
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
        <button
          type="button"
          className="product-carousel__control product-carousel__control--next"
          aria-label="Show next product style"
          onClick={() => move(1)}
        >
          ›
        </button>
      </div>
      <div className="product-carousel__dots" aria-label="Product styles">
        {slides.map((slide, index) => (
          <button
            type="button"
            key={slide.label}
            aria-label={`Show ${slide.label}`}
            aria-current={index === activeIndex ? "true" : undefined}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}

function DecorationCardCarousel({ slide }: { slide: ProductSlide }) {
  const images = [slide.blank, slide.photo].filter(Boolean) as string[];
  const [activeIndex, setActiveIndex] = useState(0);
  const move = (direction: -1 | 1) => {
    setActiveIndex(
      (current) => (current + direction + images.length) % images.length,
    );
  };

  return (
    <article className="product-carousel__card-item">
      <div className="product-carousel__card-viewport">
        <button
          type="button"
          className="product-carousel__mini-control product-carousel__mini-control--prev"
          aria-label={`Show previous ${slide.label} view`}
          onClick={() => move(-1)}
        >
          ‹
        </button>
        <img
          src={images[activeIndex]}
          alt={`${slide.label} ${activeIndex === 0 ? "without photo" : "with photo"}`}
        />
        <button
          type="button"
          className="product-carousel__mini-control product-carousel__mini-control--next"
          aria-label={`Show next ${slide.label} view`}
          onClick={() => move(1)}
        >
          ›
        </button>
      </div>
      <div
        className="product-carousel__mini-dots"
        aria-label={`${slide.label} views`}
      >
        {images.map((_, index) => (
          <button
            type="button"
            key={`${slide.label}-${index}`}
            aria-label={`Show ${slide.label} ${index === 0 ? "without photo" : "with photo"}`}
            aria-current={index === activeIndex ? "true" : undefined}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
      <strong>{slide.label}</strong>
    </article>
  );
}

const bagPricing = [
  "2-hour event - $38 for unlimited use",
  "3-hour event - $48 for unlimited use",
];

export default function AddOnProductsSection() {
  return (
    <section className="section add-on-products-section" id="add-on-products">
      <SectionHeading
        className="section-heading"
        eyebrow="Product Add-ons"
        title="Little keepsakes for every guest."
        description="Choose from our photo bags, decoration cards, and wedding albums to make printed memories easier to share and keep."
      />
      <div className="add-on-products-grid">
        <article
          className="add-on-product-card"
          aria-label="Photobooth photo bags"
        >
          <span className="add-on-product-card__eyebrow">Keepsake extra</span>
          <div className="add-on-product-card__title-row">
            <h3>Photo Print Bags</h3>
            <strong>From $38</strong>
          </div>
          <p className="add-on-product-card__subtitle">
            Suitable for 4 × 6 in photos, including 1-photo, 2-photo, and
            6-photo layouts.
          </p>
          <div className="add-on-product-card__info">
            <Paragraph>
              Choose from our available bag styles for guests to carry their
              prints home.
            </Paragraph>
            <ul className="add-on-product-card__pricing">
              {bagPricing.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="add-on-product-card__notice add-on-product-card__notice--soft">
              Please confirm your preferred style at least 1 month before your
              event so we can prepare and print it in advance.
            </p>
          </div>
          <ProductCarousel slides={bagSlides} kind="bags" />
        </article>

        <article
          className="add-on-product-card"
          aria-label="Photobooth photo decoration cards"
        >
          <span className="add-on-product-card__eyebrow">Keepsake extra</span>
          <div className="add-on-product-card__title-row">
            <h3>Photo Keepsake Cards</h3>
            <strong>From $38</strong>
          </div>
          <p className="add-on-product-card__subtitle">
            Suitable for 4 × 6 in photos, including 1-photo, 2-photo, and
            6-photo layouts.
          </p>
          <div className="add-on-product-card__info">
            <ul className="add-on-product-card__pricing">
              {bagPricing.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Paragraph>
              Browse our styles with and without a photo to find the look that
              suits your event.
            </Paragraph>
            <p className="add-on-product-card__notice add-on-product-card__notice--soft">
              Please confirm your preferred style at least 1 month before your
              event so we can prepare and print it in advance.
            </p>
          </div>
          <ProductCarousel slides={cardSlides} kind="cards" />
        </article>

        <article
          className="add-on-product-card add-on-product-card--album"
          aria-label="Wedding photobooth album"
        >
          <span className="add-on-product-card__eyebrow">Wedding keepsake</span>
          <div className="add-on-product-card__title-row">
            <h3>Wedding Photo Album</h3>
            <strong>$30</strong>
          </div>
          <div className="add-on-product-card__album-layout">
            <div className="add-on-product-card__album-media-grid">
              <ProductCarousel slides={albumVideoSlides} kind="album" />
              <ProductCarousel slides={albumPhotoSlides} kind="album" />
            </div>
            <div className="add-on-product-card__album-info">
              <Paragraph>
                A dedicated album for collecting photobooth memories from your
                wedding celebration.
              </Paragraph>
              <ul className="add-on-product-card__benefits">
                <li>
                  Holds up to 200 photos and is recommended for 3 × 7 in prints
                </li>
                <li>
                  Add messages and photos to preserve your favourite memories
                </li>
                <li>Arrange photos freely with a secure adhesive</li>
                <li>
                  Transparent protective film stays clear and resists yellowing
                </li>
                <li>No glue required, with high-definition lamination</li>
                <li>Reposition photos easily—peel off and reapply if needed</li>
              </ul>
            </div>
          </div>
        </article>
      </div>
      <p className="add-on-products-note">
        Ask us about current availability and pricing when you enquire.
      </p>
    </section>
  );
}
