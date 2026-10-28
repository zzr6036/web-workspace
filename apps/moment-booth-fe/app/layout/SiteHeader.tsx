"use client";

/* eslint-disable @next/next/no-html-link-for-pages -- Vinext client transitions are unavailable in the deployed runtime. */

import Image from "next/image";
import { Menu, MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { whatsappHref } from "../lib/contact";
import { TrackedWhatsAppLink } from "../component/TrackedWhatsApp";

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header${menuOpen ? " is-menu-open" : ""}`}>
      <a className="header-logo" href="/" aria-label="Moment Booth home">
        <Image
          src="/moment-booth-logo.png"
          alt="Moment Booth logo"
          width={1536}
          height={1536}
          priority
        />
      </a>
      <nav aria-label="Main navigation">
        <a href="/" onClick={closeMenu}>Home</a>
        <a href="/photobooth" onClick={closeMenu}>Photo Booth</a>
        <a href="/photo-frames" onClick={closeMenu}>Photo Frames</a>
        <a href="/signature-photo-gallery" onClick={closeMenu}>Signature Photo Gallery</a>
        <a href="/wedding-essential-packages" onClick={closeMenu}>Wedding Essential Packages</a>
        <a href="/faq" onClick={closeMenu}>FAQ</a>
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
        <a href="/" onClick={closeMenu}>Home</a>
        <a href="/photobooth" onClick={closeMenu}>Photo Booth</a>
        <a href="/photo-frames" onClick={closeMenu}>Photo Frames</a>
        <a href="/signature-photo-gallery" onClick={closeMenu}>Signature Photo Gallery</a>
        <a href="/wedding-essential-packages" onClick={closeMenu}>Wedding Essential Packages</a>
        <a href="/faq" onClick={closeMenu}>FAQ</a>
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
