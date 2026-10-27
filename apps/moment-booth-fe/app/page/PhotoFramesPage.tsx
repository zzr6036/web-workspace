import Link from "next/link";
import SiteFooter from "../layout/SiteFooter";
import SiteHeader from "../layout/SiteHeader";
import PhotoFramePackages from "./PhotoFramePackages";

export default function PhotoFramesPage() {
  return <main><SiteHeader />
    <section className="frames-hero" aria-labelledby="frames-page-title"><div><p className="eyebrow">Photo frames</p><h1 id="frames-page-title">Give your favourite moments a place to stay.</h1><p>Personalised photo panels, framed prints and curated wall gallery sets for weddings, families, celebrations and everyday memories.</p><div className="hub-hero__actions"><Link className="hub-button hub-button--primary" href="/#contact">Ask about a frame</Link><Link className="hub-button hub-button--secondary" href="/">Back to all moments ↗</Link></div></div></section>
    <PhotoFramePackages />
    <SiteFooter /></main>;
}
