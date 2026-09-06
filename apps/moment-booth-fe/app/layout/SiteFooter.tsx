import Image from 'next/image';
import { whatsappHref } from '../lib/contact';

export default function SiteFooter() {
  return (
    <footer>
      <a className="wordmark wordmark--footer" href="#top">
        <Image className="footer-logo" src="/moment-booth-logo.png" alt="Moment Booth logo" width={1536} height={1536} priority />
        <span>Moment Booth</span>
      </a>
      <p>Capture Every Smile. Print Every Memory.</p>
      <div>
        <a href="#gallery">Gallery</a>
        <a href="#packages">Packages</a>
        <a href={whatsappHref} target="_blank" rel="noreferrer"><span className="whatsapp-icon" aria-hidden="true">◉</span> WhatsApp</a>
      </div>
      <small>© {new Date().getFullYear()} Moment Booth · Singapore</small>
    </footer>
  );
}
