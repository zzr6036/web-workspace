import Image from "next/image";

const cards = [
  ["/home-products/photo-booth.png", "Photo Booth", "Capture joyful moments, print them instantly.", "/photobooth"],
  ["/home-products/photo-frame.png", "Photo Frames", "Turn favourite photos into elegant keepsakes.", "/photo-frames"],
  ["/home-products/wedding-signature-gallery.png", "Signature Photo Gallery", "A beautiful display for guests to sign and share their wishes.", "/signature-photo-gallery"],
  ["/home-products/wedding-essential-packages.png", "Wedding Essential Packages", "Bring every part of your wedding memory experience together.", "/wedding-essential-packages"],
];

export default function HomeBanner() {
  return (
    <section className="hub-hero" aria-labelledby="hub-hero-title">
      <div className="hub-hero__copy">
        <p className="eyebrow">Moment Booth &amp; MomentFrame</p>
        <h1 id="hub-hero-title">Create moments worth keeping.</h1>
        <p>From the first pose to the wall you come home to, we help you capture, print and display the moments that matter.</p>
      </div>
      <div className="hub-hero__cards" aria-label="Our memory products">
        {cards.map(([src, title, description, href]) => (
          <a className="hub-service-card" href={href} key={href}>
            <Image className="hub-service-card__image" src={src} alt={title} width={1254} height={1254} />
            <strong>{title}</strong>
            <small>{description}</small>
          </a>
        ))}
      </div>
    </section>
  );
}
