import Image from "next/image";
import Link from "next/link";
import SiteFooter from "../layout/SiteFooter";
import SiteHeader from "../layout/SiteHeader";
import PhotoFramePackages from "./PhotoFramePackages";

const wallGallerySets = [
  ["/frames/home/wall-gallery-sets/set-a.png", "A Set", "A refined six-piece arrangement", "Approx. 140 × 55 cm · Best for a 2.2 m wall"],
  ["/frames/home/wall-gallery-sets/set-b.png", "B Set", "A statement twelve-piece gallery", "Approx. 170 × 74 cm · Best for a 2.2 m wall"],
  ["/frames/home/wall-gallery-sets/set-c.png", "C Set", "A balanced ten-piece collection", "Approx. 131 × 81 cm · Best for a 2 m wall"],
  ["/frames/home/wall-gallery-sets/set-d.png", "D Set", "An inviting eight-piece welcome", "Approx. 98 × 64 cm · Best for a 1.5 m wall"],
];

export default function PhotoFramesPage() {
  return <main><SiteHeader />
    <section className="frames-hero" aria-labelledby="frames-page-title"><div><p className="eyebrow">Photo frames</p><h1 id="frames-page-title">Give your favourite moments a place to stay.</h1><p>Personalised photo panels, framed prints and curated wall gallery sets for weddings, families, celebrations and everyday memories.</p><div className="hub-hero__actions"><Link className="hub-button hub-button--primary" href="/#contact">Ask about a frame</Link><Link className="hub-button hub-button--secondary" href="/">Back to all moments ↗</Link></div></div></section>
    <section className="hub-section hub-wall-gallery frames-gallery" aria-labelledby="frames-gallery-title"><div className="hub-section__heading"><p className="eyebrow">Curated wall gallery sets</p><h2 id="frames-gallery-title">Bring your favourite moments together.</h2><p>Explore ready-made layouts designed to help you choose the right balance of sizes for your wall.</p></div><div className="hub-wall-gallery__track">{wallGallerySets.map(([src, label, title, detail]) => <article className="hub-wall-card" key={src}><Image src={src} alt={title} width={1086} height={1448} /><div><p className="eyebrow">{label}</p><h3>{title}</h3><p>{detail}</p></div></article>)}</div></section>
    <PhotoFramePackages />
    <SiteFooter /></main>;
}
