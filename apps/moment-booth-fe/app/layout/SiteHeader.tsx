"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { whatsappHref } from "../lib/contact";
import { TrackedWhatsAppLink } from "../component/TrackedWhatsApp";

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header${menuOpen ? " is-menu-open" : ""}`}>
      <Link className="header-logo" href="/" prefetch={false} aria-label="Moment Booth home">
        <Image
          src="/moment-booth-logo.png"
          alt="Moment Booth logo"
          width={1536}
          height={1536}
          priority
        />
      </Link>
      <nav aria-label="Main navigation">
        <Link href="/" prefetch={false} onClick={closeMenu}>Home</Link>
        <Link href="/photobooth" prefetch={false} onClick={closeMenu}>Photo Booth</Link>
        <Link href="/photo-frames" prefetch={false} onClick={closeMenu}>Photo Frames</Link>
        <Link href="/signature-photo-gallery" prefetch={false} onClick={closeMenu}>Signature Photo Gallery</Link>
        <Link href="/wedding-essential-packages" prefetch={false} onClick={closeMenu}>Wedding Essential Packages</Link>
        <Link href="/faq" prefetch={false} onClick={closeMenu}>FAQ</Link>
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
      <button
        className="mobile-menu-toggle"
        type="button"
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
      </button>
      <div id="mobile-navigation" className="mobile-navigation" aria-hidden={!menuOpen}>
        <Link href="/" prefetch={false} onClick={closeMenu}>Home</Link>
        <Link href="/photobooth" prefetch={false} onClick={closeMenu}>Photo Booth</Link>
        <Link href="/photo-frames" prefetch={false} onClick={closeMenu}>Photo Frames</Link>
        <Link href="/signature-photo-gallery" prefetch={false} onClick={closeMenu}>Signature Photo Gallery</Link>
        <Link href="/wedding-essential-packages" prefetch={false} onClick={closeMenu}>Wedding Essential Packages</Link>
        <Link href="/faq" prefetch={false} onClick={closeMenu}>FAQ</Link>
        <TrackedWhatsAppLink
          location="header"
          className="mobile-navigation__cta"
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          onClick={closeMenu}
        >
          <MessageCircle size={15} aria-hidden="true" /> Get a quote
        </TrackedWhatsAppLink>
      </div>
    </header>
  );
}
