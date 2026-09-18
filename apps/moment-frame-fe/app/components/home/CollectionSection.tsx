import { collections } from "./homeContent";
import { Photo } from "./Photo";

export function CollectionSection() {
  return <section className="section-wrap collection" id="collection" aria-labelledby="collection-title"><div className="section-heading"><p className="eyebrow">FIND YOUR FRAME</p><h2 id="collection-title">A little something for every story.</h2><p>Discover a look that feels right for your photos, and your home.</p></div><div className="collection-grid">{collections.map((item) => <article className="collection-card" key={item.key}><a href={`/shop/${item.key}`}><Photo name={item.key} src={item.image} alt={item.alt} /><div className="card-title"><h3>{item.name}</h3><span aria-hidden="true">↗</span></div><p>{item.detail}</p></a></article>)}</div></section>;
}
