/* eslint-disable @next/next/no-html-link-for-pages -- Vinext client transitions are unavailable in the deployed runtime. */

import Image from 'next/image';
import { whatsappHref } from '../lib/contact';
import { TrackedWhatsAppLink } from '../component/TrackedWhatsApp';

export default function SiteFooter() {
  return (
    <footer>
      <a className="wordmark wordmark--footer" href="/">
        <Image className="footer-logo" src="/moment-booth-logo.png" alt="Moment Booth logo" width={1536} height={1536} priority />
        <span>Moment Booth</span>
      </a>
      <p>Capture Every Smile. Print Every Memory.</p>
      <div>
        <a href="/photobooth">Photo Booth</a>
        <a href="/photo-frames">Photo Frames</a>
        <a href="/signature-photo-gallery">Signature Gallery</a>
        <a href="/wedding-essential-packages">Wedding Packages</a>
        <a href="/gifts">Gift</a>
        <a href="/faq">FAQ</a>
        <TrackedWhatsAppLink location="footer" href={whatsappHref} target="_blank" rel="noreferrer"><Image className="whatsapp-icon" src="/icons/whatsapp.png" alt="" width={16} height={16} aria-hidden="true" /> WhatsApp</TrackedWhatsAppLink>
      </div>
      <small>© {new Date().getFullYear()} Moment Booth · Singapore</small>
    </footer>
  );
}
