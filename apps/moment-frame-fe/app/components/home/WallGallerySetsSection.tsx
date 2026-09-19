const gallerySets = [
  { src: "/frames/home/wall-gallery-sets/set-a.png", alt: "A six-piece wall gallery set for a bedroom or living room", label: "A Set", title: "A refined six-piece arrangement", detail: "Approx. 140 × 55 cm · Best for a 2.2 m wall" },
  { src: "/frames/home/wall-gallery-sets/set-b.png", alt: "B twelve-piece wall gallery set for a living or dining room", label: "B Set", title: "A statement twelve-piece gallery", detail: "Approx. 170 × 74 cm · Best for a 2.2 m wall" },
  { src: "/frames/home/wall-gallery-sets/set-c.png", alt: "C ten-piece wall gallery set for a living room or bedroom", label: "C Set", title: "A balanced ten-piece collection", detail: "Approx. 131 × 81 cm · Best for a 2 m wall" },
  { src: "/frames/home/wall-gallery-sets/set-d.png", alt: "D eight-piece wall gallery set for an entryway or foyer", label: "D Set", title: "An inviting eight-piece welcome", detail: "Approx. 98 × 64 cm · Best for a 1.5 m wall" },
  { src: "/frames/home/wall-gallery-sets/size-guide.png", alt: "Gallery frame sizes from six inches to sixteen inches", label: "Size guide", title: "Find the right scale", detail: "A quick view of our 6\", 7\", 8\", 10\" and 16\" frame sizes" },
];

export function WallGallerySetsSection() {
  return (
    <section className="wall-gallery-sets" aria-labelledby="wall-gallery-sets-title">
      <div className="section-wrap">
        <div className="section-heading">
          <p className="eyebrow">CURATED WALL GALLERY SETS</p>
          <h2 id="wall-gallery-sets-title">Bring your favourite moments together.</h2>
          <p>Explore ready-made layouts designed to help you choose the right balance of sizes for your wall.</p>
        </div>
        <div className="wall-gallery-sets-track">
          {gallerySets.map((set) => (
            <article className="wall-gallery-set-card" key={set.src}>
              <img src={set.src} alt={set.alt} />
              <div className="wall-gallery-set-copy">
                <p className="eyebrow">{set.label}</p>
                <h3>{set.title}</h3>
                <p>{set.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
