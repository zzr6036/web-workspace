import Image from "next/image";
import Link from "next/link";
import SiteFooter from "../layout/SiteFooter";
import SiteHeader from "../layout/SiteHeader";
import HomePhotoCarousel from "../component/HomePhotoCarousel";
import HomeBanner from "../component/HomeBanner";

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
      <HomeBanner />
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
            <Link className="hub-text-link" href="/photobooth" prefetch={false}>
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
          <Link className="hub-text-link" href="/photo-frames" prefetch={false}>
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
            Make your wedding memories part of the décor.
          </h2>
          <p>
            A styled three-panel display with high-definition prints, floral
            hedges and space for your guests to leave messages around the
            moments you want to remember.
          </p>
          <p className="hub-section__supporting-copy">
            Delivery, setup and teardown are included, with complimentary
            layout design and photo sizing to match each panel.
          </p>
          <Link className="hub-text-link" href="/signature-photo-gallery" prefetch={false}>
            Explore Signature Photo Gallery ↗
          </Link>
        </div>
        <Image className="hub-feature-image" src="/signature-products/1 - Signature Photo Gallery/A1.png" alt="Signature Photo Gallery wedding display" width={1200} height={900} />
      </section>
      <section
        className="hub-section hub-packages"
        aria-labelledby="hub-packages-title"
      >
        <Image className="hub-feature-image" src="/home-products/wedding-essential-packages-display.png" alt="Wedding Essential Packages wedding display" width={1536} height={1024} />
        <div className="hub-section__heading">
          <p className="eyebrow">Wedding Essential Packages</p>
          <h2 id="hub-packages-title">
            One celebration. More ways to remember it.
          </h2>
          <p>Bring Photo Booth, Photo Frames and Signature Photo Gallery together in one coordinated wedding experience.</p>
          <p className="hub-section__supporting-copy">Choose the combination that fits your celebration, guest count, venue and preferred styling.</p>
          <Link className="hub-text-link" href="/wedding-essential-packages" prefetch={false}>
            Explore Wedding Essential Packages ↗
          </Link>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
