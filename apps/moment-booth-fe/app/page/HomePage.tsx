import Image from "next/image";
import Link from "next/link";
import SiteFooter from "../layout/SiteFooter";
import SiteHeader from "../layout/SiteHeader";
import HomePhotoCarousel from "../component/HomePhotoCarousel";

const wallGallerySets = [
  "/frame-products/1-Frameless Rounded Corner/combine.png",
  "/frame-products/2-White Rounded Border/combine.png",
  "/frame-products/3-Silver Rounded Border/combine.png",
  "/frame-products/5-Gold Square Corner/combine.png",
  "/frame-products/9-Black Walnut/combine.png",
];

export default function HomePage() {
  return (
    <main>
      <SiteHeader />
      <section className="hub-hero" aria-labelledby="hub-hero-title">
        <div className="hub-hero__copy">
          <p className="eyebrow">Moment Booth &amp; MomentFrame</p>
          <h1 id="hub-hero-title">Create moments worth keeping.</h1>
          <p>
            From the first pose to the wall you come home to, we help you
            capture, print and display the moments that matter.
          </p>
        </div>
        <div className="hub-hero__cards" aria-label="Our memory products">
          <Link
            className="hub-service-card hub-service-card--photobooth"
            href="/photobooth"
          >
            <Image
              className="hub-service-card__image"
              src="/home-products/photo-booth.png"
              alt="Photo Booth at a wedding with props and instant prints"
              width={1254}
              height={1254}
            />
            <strong>Photo Booth</strong>
            <small>Capture joyful moments, print them instantly.</small>
          </Link>
          <a
            className="hub-service-card hub-service-card--frames"
            href="/photo-frames"
          >
            <Image
              className="hub-service-card__image"
              src="/home-products/photo-frame.png"
              alt="Wedding photo frames displayed as a keepsake collection"
              width={1254}
              height={1254}
            />
            <strong>Photo Frames</strong>
            <small>
              Turn your favourite wedding photos into elegant keepsakes.
            </small>
          </a>
          <Link
            className="hub-service-card hub-service-card--signature"
            href="/signature-photo-gallery"
          >
            <Image
              className="hub-service-card__image"
              src="/home-products/wedding-signature-gallery.png"
              alt="Wedding signature photo gallery display"
              width={1268}
              height={1240}
            />
            <strong>Signature Photo Gallery</strong>
            <small>
              A beautiful display for guests to sign and share their wishes.
            </small>
          </Link>
          <Link
            className="hub-service-card hub-service-card--packages"
            href="/wedding-essential-packages"
          >
            <Image
              className="hub-service-card__image"
              src="/home-products/wedding-essential-packages.png"
              alt="Wedding Essential Packages combining Photo Booth, Photo Frames and Signature Gallery"
              width={1254}
              height={1254}
            />
            <strong>Wedding Essential Packages</strong>
            <small>
              Bring every part of your wedding memory experience together.
            </small>
          </Link>
        </div>
      </section>
      <section
        className="hub-section hub-photobooth-preview"
        aria-labelledby="hub-photobooth-title"
      >
        <div className="hub-section__heading">
          <p className="eyebrow">Photo Booth</p>
          <h2 className="hub-section__title--nowrap" id="hub-photobooth-title">
            A fun experience your guests can take home.
          </h2>
          <p>
            Interactive props, instant prints and on-site help that keep every
            guest involved from the first pose to the final print.
          </p>
          <div className="hub-section__actions">
            <Link className="hub-text-link" href="/photobooth">
              View photobooth gallery and packages ↗
            </Link>
          </div>
        </div>
        <div className="hub-media-carousel" aria-label="Photo Booth highlights">
          <video
            src="/home-media/video2.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
          <video
            src="/home-media/video3.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
          <HomePhotoCarousel
            label="Celebration details"
            day="day6"
            images={["2", "3", "4", "5", "6", "7", "8", "9"]}
          />
          <HomePhotoCarousel
            label="Wedding day moments"
            day="day8"
            images={["2", "3", "4", "5", "6", "7", "8"]}
          />
          <HomePhotoCarousel
            label="Personalised guestbook"
            day="day9"
            images={[
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "10",
              "11",
              "12",
            ]}
          />
        </div>
      </section>
      <section
        className="hub-section hub-wall-gallery hub-wall-gallery--photos-only"
        aria-labelledby="hub-wall-gallery-title"
      >
        <div className="hub-section__heading">
          <p className="eyebrow">Photo Frames</p>
          <h2
            className="hub-section__title--nowrap"
            id="hub-wall-gallery-title"
          >
            Bring your favourite moments together.
          </h2>
          <p>
            Need multiple tabletop frames for your wedding? We offer flexible
            sets in different quantities and can print them together for a
            cohesive display. Our high-definition prints deliver rich colour
            and detail—loved by couples and families alike.
          </p>
          <Link className="hub-text-link" href="/photo-frames">
            View photo frame packages ↗
          </Link>
        </div>
        <div className="hub-wall-gallery__track">
          {wallGallerySets.map((src) => (
            <article className="hub-wall-card" key={src}>
              <Image
                src={src}
                alt="Curated wedding photo frame gallery"
                width={1254}
                height={1254}
              />
            </article>
          ))}
        </div>
      </section>
      <section
        className="hub-section hub-signature"
        id="wedding-signature"
        aria-labelledby="hub-signature-title"
      >
        <div>
          <p className="eyebrow">Signature Photo Gallery</p>
          <h2 id="hub-signature-title">
            A signature gallery for everyone who shared the day.
          </h2>
          <p>
            We are preparing a wedding photo gallery experience for guest
            signatures, messages and photos. Tell us what you would like to see
            first.
          </p>
          <Link className="hub-text-link" href="/#contact">
            Ask about the new gallery ↗
          </Link>
        </div>
      </section>
      <section
        className="hub-section hub-packages"
        aria-labelledby="hub-packages-title"
      >
        <div className="hub-section__heading">
          <p className="eyebrow">Wedding Essential Packages</p>
          <h2 id="hub-packages-title">
            One celebration. More ways to remember it.
          </h2>
          <p>
            Combine a photobooth, framed prints, keepsakes and our future
            wedding signature gallery into a package that fits your event.
          </p>
        </div>
        <Link
          className="hub-button hub-button--primary"
          href="/wedding-essential-packages"
        >
          Explore Wedding Essential Packages ↗
        </Link>
      </section>
      <SiteFooter />
    </main>
  );
}
