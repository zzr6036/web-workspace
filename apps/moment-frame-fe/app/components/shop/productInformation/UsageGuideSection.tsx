import Image from "next/image";

const guides = [
  {
    title: "Tabletop display",
    description:
      "Panels from 7 to 14 inches include a fold-out stand for easy display.",
    src: "/frames/product-information/usage-guide/tabletop-display.png",
    alt: "Tabletop photo panel with its fold-out support stand",
    height: 1006,
  },
  {
    title: "Wall mounting",
    description:
      "Panels from 16 inches upward include rear hanging hardware for wall display.",
    src: "/frames/product-information/usage-guide/wall-mounting.png",
    alt: "Rear hanging hardware on a wall-mount photo panel",
    height: 823,
  },
  {
    title: "Hanging hardware",
    description:
      "Choose the included hanging hardware that matches your selected panel size.",
    src: "/frames/product-information/usage-guide/hanging-hardware.png",
    alt: "Hanging hardware options and no-drill hook installation guide",
    height: 722,
  },
];

export function UsageGuideSection() {
  return (
    <section className="usage-guide" aria-labelledby="usage-guide-title">
      <div>
        <h3 id="usage-guide-title">Usage Guide</h3>
      </div>
      <div className="usage-guide-list">
        {guides.map((guide) => (
          <article key={guide.title}>
            <Image
              src={guide.src}
              alt={guide.alt}
              width={800}
              height={guide.height}
              sizes="(max-width: 800px) 100vw, 800px"
            />
            <div>
              <h4>{guide.title}</h4>
              <p>{guide.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
