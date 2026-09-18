import Image from "next/image";
import Link from "next/link";
import { CartButton } from "../components/cart/CartButton";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="MomentFrame home">
        <Image
          src="/logo_circle.png"
          alt="MomentFrame logo"
          width={60}
          height={60}
          priority
        />
        <span>
          Moment<span className="brand-accent">Frame</span>
        </span>
      </Link>
      <nav aria-label="Main navigation">
        <Link href="/">Home</Link>
        <Link href="/shop">Shop</Link>
        <Link href="/faq">FAQ</Link>
      </nav>
      <div className="header-actions">
        <CartButton />
        {/* <a className="header-cta" href="/shop">Explore frames <span aria-hidden="true">↗</span></a> */}
      </div>
    </header>
  );
}
