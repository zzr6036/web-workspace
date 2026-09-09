import Image from "next/image";
import { whatsappHref } from "../lib/contact";
import { TrackedWhatsAppLink } from "./TrackedWhatsApp";

export default function FloatingContact() {
  return (
    <TrackedWhatsAppLink
      location="floating"
      className="floating-contact-image"
      href={whatsappHref}
      target="_blank"
      rel="noreferrer"
      aria-label="Contact Moment Booth on WhatsApp"
    >
      <Image src="/icons/whatsapp.png" alt="" width={72} height={72} aria-hidden="true" />
    </TrackedWhatsAppLink>
  );
}
