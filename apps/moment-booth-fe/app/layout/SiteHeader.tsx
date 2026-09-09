import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { whatsappHref } from "../lib/contact";
import { TrackedWhatsAppLink } from "../component/TrackedWhatsApp";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <a className="header-logo" href="#top" aria-label="Moment Booth home">
        <Image
          src="/moment-booth-logo.png"
          alt="Moment Booth logo"
          width={1536}
          height={1536}
          priority
        />
      </a>
      <nav aria-label="Main navigation">
        <a href="#gallery">Gallery</a>
        <a href="#library">Collection</a>
        <a href="#packages">Packages</a>
        <a href="#faq">FAQ</a>
      </nav>
      <TrackedWhatsAppLink
        location="header"
        className="header-cta"
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
      >
        <MessageCircle size={15} aria-hidden="true" /> Get a quote
        <span>↗</span>
      </TrackedWhatsAppLink>
    </header>
  );
}
