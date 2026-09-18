import { inspirationFeatures } from "./homeContent";
import { Photo } from "./Photo";

export function InspirationSection() {
  return <section className="section-wrap inspiration" id="inspiration" aria-labelledby="inspiration-title"><div className="section-heading"><p className="eyebrow">A LITTLE INSPIRATION</p><h2 id="inspiration-title">Your memories, at home.</h2></div>{inspirationFeatures.map((feature) => <div className={`feature${feature.reverse ? " feature-reverse" : ""}`} id={feature.id} key={feature.id}><Photo name={feature.image} alt={feature.alt} /><div className="feature-copy"><p className="eyebrow">{feature.eyebrow}</p><h2>{feature.title[0]}<br />{feature.title[1]}</h2><p>{feature.description}</p><a className="text-link" href="#collection">{feature.linkLabel} <span aria-hidden="true">→</span></a></div></div>)}</section>;
}
