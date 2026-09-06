import Image from "next/image";
import { WhatsAppButton } from "elij-ui-library";
import { whatsappHref } from "../lib/contact";

export default function ContactSection() {
  return (
    <section className="contact-section" id="contact">
      <p className="eyebrow">Serving all across Singapore</p>
      <h2>
        Book early to secure
        <br />
        your preferred date.
      </h2>
      <p>
        Weekend and peak-season slots fill up quickly. Contact us for
        availability, customised packages, and an instant quotation.
      </p>
      <WhatsAppButton href={whatsappHref} icon={<Image src="/icons/whatsapp.png" alt="" width={20} height={20} aria-hidden="true" />}>WhatsApp enquire</WhatsAppButton>
    </section>
  );
}
