import Image from "next/image";
import SiteFooter from "../layout/SiteFooter";
import SiteHeader from "../layout/SiteHeader";
import { whatsappHref } from "../lib/contact";
import PhotoFramePackages from "./PhotoFramePackages";

export default function PhotoFramesPage() {
  const frameEnquiryHref = `${whatsappHref.split("?", 1)[0]}?text=${encodeURIComponent("Hi, I’d like to learn more about your photo frames, including the available packages, materials and customisation options.")}`;

  return (
    <main>
      <SiteHeader />
      <section className="frames-hero" aria-labelledby="frames-page-title">
        <div>
          <p className="eyebrow">Photo frames</p>
          <h1 id="frames-page-title">
            Give your favourite moments a place to stay.
          </h1>
          <p>
            Personalised photo panels, framed prints and curated wall gallery
            sets for weddings, families, celebrations and everyday memories.
          </p>
          <div className="hub-hero__actions">
            <a
              className="hub-button hub-button--primary"
              href={frameEnquiryHref}
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src="/icons/whatsapp.png"
                alt=""
                width={20}
                height={20}
                aria-hidden="true"
              />
              Ask about a frame
            </a>
          </div>
        </div>
      </section>
      <PhotoFramePackages />
      <SiteFooter />
    </main>
  );
}
