import SiteFooter from "../layout/SiteFooter";
import SiteHeader from "../layout/SiteHeader";
import { whatsappHref } from "../lib/contact";

export default function SignaturePhotoGalleryPage() {
  const signatureEnquiryHref = `${whatsappHref.split("?", 1)[0]}?text=${encodeURIComponent("Hi, I’d like to learn more about your Signature Photo Gallery service, including the available designs, setup options and pricing.")}`;

  return (
    <main>
      <SiteHeader />
      <section className="hub-hero" aria-labelledby="signature-gallery-title">
        <div className="hub-hero__copy">
          <p className="eyebrow">Signature Photo Gallery</p>
          <h1 id="signature-gallery-title">
            A beautiful place for your guests’ memories.
          </h1>
          <p>
            We are preparing a signature photo gallery experience for weddings
            and celebrations. More details will be added soon.
          </p>
          <div className="hub-hero__actions">
            <a
              className="hub-button hub-button--secondary"
              href={signatureEnquiryHref}
              target="_blank"
              rel="noreferrer"
            >
              Explore Signature Photo Gallery ↗
            </a>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
