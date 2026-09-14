import Image from 'next/image';

export default function SiteHeader() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="MomentFrame home">
        <Image src="/logo_circle.png" alt="MomentFrame logo" width={60} height={60} priority />
        <span>Moment<span className="brand-accent">Frame</span></span>
      </a>
      <nav aria-label="Main navigation"><a href="#collection">Collection</a><a href="#our-story">Our story</a></nav>
      <a className="header-cta" href="#collection">Explore frames <span aria-hidden="true">↗</span></a>
    </header>
  );
}
