import Image from 'next/image';
import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div><Link className="brand" href="/" aria-label="MomentFrame home"><Image src="/logo_circle.png" alt="MomentFrame logo" width={76} height={76} /><span>Moment<span className="brand-accent">Frame</span></span></Link><p>Print Your Story. Frame Your Memories.</p></div>
        <nav aria-label="Footer navigation"><Link href="/">Home</Link><Link href="/shop">Shop</Link><Link href="/faq">FAQ</Link><a href="https://wa.me/6588467972?text=Hi%20MomentFrame%2C%20I%20have%20a%20question." target="_blank" rel="noreferrer">Message us on WhatsApp</a><Link href="/terms">Terms & Conditions</Link><a href="#top">Back to top <span aria-hidden="true">↑</span></a></nav>
      </div>
      <div className="footer-bottom"><small>© {new Date().getFullYear()} MomentFrame. All rights reserved.</small><span>A little moment. A lasting memory.</span></div>
    </footer>
  );
}
