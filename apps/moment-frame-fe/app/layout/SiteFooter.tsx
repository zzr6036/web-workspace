import Image from 'next/image';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div><a className="brand" href="#top" aria-label="MomentFrame home"><Image src="/logo_circle.png" alt="MomentFrame logo" width={76} height={76} /><span>Moment<span className="brand-accent">Frame</span></span></a><p>Print Your Story. Frame Your Memories.</p></div>
        <nav aria-label="Footer navigation"><a href="#collection">Collection</a><a href="#our-story">Our story</a><a href="#top">Back to top <span aria-hidden="true">↑</span></a></nav>
      </div>
      <div className="footer-bottom"><small>© {new Date().getFullYear()} MomentFrame. All rights reserved.</small><span>A little moment. A lasting memory.</span></div>
    </footer>
  );
}
