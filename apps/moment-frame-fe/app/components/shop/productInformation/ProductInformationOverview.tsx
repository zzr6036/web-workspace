import Image from "next/image";

const cards = [
  {
    image: "/frames/product-information/product-overview/showroom.png",
    title: "Made for the moments on your wall",
    points: [
      "Custom panels for the stories you want close",
      "A refined finish for home or gallery walls",
    ],
  },
  {
    image: "/frames/product-information/product-overview/print-quality.png",
    title: "Sharp detail, true-to-life colour",
    points: [
      "High-definition print preparation",
      "Natural skin tones and rich colour",
    ],
  },
  {
    image: "/frames/product-information/product-overview/colour-and-uv.png",
    title: "Colour that stays beautifully vivid",
    points: [
      "Clear reproduction of fine detail",
      "Protective finish helps reduce UV exposure",
    ],
  },
];

export function ProductInformationOverview() {
  return (
    <section
      className="product-information-overview"
      aria-labelledby="product-information-overview-title"
    >
      <div className="product-information-overview-heading">
        <h3 id="product-information-overview-title">
          Made to display your story
        </h3>
      </div>
      <div className="product-information-overview-grid">
        {cards.map((card) => (
          <article key={card.title}>
            <Image src={card.image} alt="" width={1200} height={900} />
            <div>
              <h4>{card.title}</h4>
              <ul>
                {card.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
