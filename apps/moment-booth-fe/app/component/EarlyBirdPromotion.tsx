import Image from "next/image";
import { whatsappHref } from "../lib/contact";

const momentFrameShopUrl = "https://www.momentframesg.com/";

type EarlyBirdPromotionProps = {
  compact?: boolean;
};

export default function EarlyBirdPromotion({ compact = false }: EarlyBirdPromotionProps) {
  return (
    <section className={`early-bird-promotion${compact ? " early-bird-promotion--compact" : ""}`}>
      <span className="early-bird-promotion__ribbon">Early bird offer</span>
      <p className="early-bird-promotion__deal">Book 3 months early and receive a free 10&quot; tabletop photo.</p>
      <div className="early-bird-promotion__images" aria-label="Custom photo frame examples">
        <Image
          src="/promotions/early-bird-photo-stand.png"
          alt="Custom photo stand displaying family and wedding photos"
          width={1254}
          height={1254}
        />
        <Image
          src="/promotions/early-bird-family-frame.png"
          alt="Custom rounded-corner photo frame displaying a family portrait"
          width={1254}
          height={1254}
        />
      </div>
      <div className="early-bird-promotion__copy">
        <h2>Make your event memories part of your home.</h2>
        <p>
          Choose any photo from your wedding, event or photobooth experience and
          turn it into a beautiful display piece for your home.
        </p>
        <p className="early-bird-promotion__note">
          Available for new photobooth bookings confirmed at least 3 months in advance.
        </p>
        <div className="early-bird-promotion__actions">
          <a
            className="early-bird-promotion__primary"
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
          >
            Book your photobooth
          </a>
          <a
            className="early-bird-promotion__secondary"
            href={momentFrameShopUrl}
            target="_blank"
            rel="noreferrer"
          >
            Explore photo frames ↗
          </a>
        </div>
      </div>
    </section>
  );
}
