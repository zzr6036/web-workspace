import Image from "next/image";

const sections = [
  {
    title: "Portrait or landscape",
    description:
      "Choose the orientation that best complements your photograph before uploading.",
    src: "/frames/product-information/photo-orientation-selection/orientation.png",
    alt: "Portrait and landscape wedding photo examples",
    height: 596,
  },
  {
    title: "Choosing the right photo",
    description:
      "Use an original, high-resolution image for the clearest printed result.",
    src: "/frames/product-information/photo-orientation-selection/photo-selection.png",
    alt: "Photo quality guidance for selecting an image to print",
    height: 893,
  },
];

export function PhotoOrientationSelectionSection() {
  return (
    <section
      className="photo-orientation-selection"
      aria-labelledby="photo-orientation-selection-title"
    >
      <div>
        <h3 id="photo-orientation-selection-title">
          Photo Orientation &amp; Selection
        </h3>
      </div>
      <div className="photo-orientation-selection-list">
        {sections.map((section) => (
          <article key={section.title}>
            <Image
              src={section.src}
              alt={section.alt}
              width={800}
              height={section.height}
              sizes="(max-width: 800px) 100vw, 800px"
            />
            <div>
              <h4>{section.title}</h4>
              <p>{section.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
