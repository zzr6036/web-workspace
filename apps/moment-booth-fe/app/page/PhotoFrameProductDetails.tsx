import Image from "next/image";

const details = [
  {
    title: "Product size information",
    content: (
      <>
        <p>
          Measurements are a guide for your image layout. Final cropping
          preserves the strongest composition, and the selected format may
          change the visible image area slightly.
        </p>
        <div className="frame-product-details__size-tables">
          {[
            [
              ['6"', "10.2 × 15.2 cm"],
              ['7"', "12.7 × 17.8 cm"],
              ['8"', "15 × 20 cm"],
              ['10"', "18 × 27 cm / 20 × 25 cm"],
              ['12"', "20 × 30 cm / 25 × 30 cm"],
              ['14"', "25 × 35 cm"],
              ["A4", "21 × 29.7 cm"],
              ["A3", "29.7 × 42 cm"],
              ['16"', "30 × 40 cm"],
            ],
            [
              ['18"', "35 × 45 cm"],
              ['20"', "40 × 50 cm"],
              ['24"', "40 × 60 cm / 50 × 60 cm"],
              ['30"', "60 × 75 cm"],
              ['32"', "60 × 80 cm"],
              ['36"', "60 × 90 cm"],
              ['40"', "75 × 100 cm"],
              ['42"', "75 × 110 cm"],
              ['48"', "75 × 120 cm"],
            ],
          ].map((column, index) => (
            <table key={index}>
              <thead>
                <tr>
                  <th>Panel size</th>
                  <th>Image area</th>
                </tr>
              </thead>
              <tbody>
                {column.map(([size, dimensions]) => (
                  <tr key={size}>
                    <td>{size}</td>
                    <td>{dimensions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ))}
        </div>
      </>
    ),
  },
  {
    title: "High-definition quality",
    content: (
      <Image
        src="/frames/product-information/high-definition-quality/high-definition-quality.png"
        alt="Comparison showing clearer colour and detail with high-definition printing"
        width={1145}
        height={1374}
        sizes="(max-width: 800px) 100vw, 800px"
      />
    ),
  },
  {
    title: "Protective film guide",
    content: (
      <Image
        src="/frames/product-information/protective-film-guide/protective-film-guide.png"
        alt="Instructions for removing the surface protective film from a photo panel"
        width={800}
        height={442}
        sizes="(max-width: 800px) 100vw, 800px"
      />
    ),
  },
  {
    title: "Usage guide",
    content: (
      <div className="frame-product-details__image-grid">
        {[
          [
            "Tabletop display",
            "Panels include a fold-out stand for easy display.",
            "/frames/product-information/usage-guide/tabletop-display.png",
            1006,
          ],
          [
            "Wall mounting",
            "Larger panels include rear hanging hardware.",
            "/frames/product-information/usage-guide/wall-mounting.png",
            823,
          ],
          [
            "Hanging hardware",
            "Choose the included hardware for your selected panel size.",
            "/frames/product-information/usage-guide/hanging-hardware.png",
            722,
          ],
        ].map(([title, description, src, height]) => (
          <article key={title as string}>
            <Image
              src={src as string}
              alt={title as string}
              width={800}
              height={height as number}
              sizes="(max-width: 800px) 100vw, 800px"
            />
            <h4>{title}</h4>
            <p>{description}</p>
          </article>
        ))}
      </div>
    ),
  },
  {
    title: "Print colour guide",
    content: (
      <Image
        src="/frames/product-information/print-colour-guide/print-colour-guide.png"
        alt="Print colour guidance showing the same photo on several devices"
        width={800}
        height={800}
        sizes="(max-width: 800px) 100vw, 800px"
      />
    ),
  },
  {
    title: "Photo orientation and selection",
    content: (
      <div className="frame-product-details__image-grid">
        {[
          [
            "Portrait or landscape",
            "Choose the orientation that best complements your photograph.",
            "/frames/product-information/photo-orientation-selection/orientation.png",
            596,
          ],
          [
            "Choosing the right photo",
            "Use an original, high-resolution image for the clearest result.",
            "/frames/product-information/photo-orientation-selection/photo-selection.png",
            893,
          ],
        ].map(([title, description, src, height]) => (
          <article key={title as string}>
            <Image
              src={src as string}
              alt={title as string}
              width={800}
              height={height as number}
              sizes="(max-width: 800px) 100vw, 800px"
            />
            <h4>{title}</h4>
            <p>{description}</p>
          </article>
        ))}
      </div>
    ),
  },
];

export default function PhotoFrameProductDetails() {
  return (
    <section
      className="frame-product-details-collapsed"
      aria-labelledby="frame-product-details-title"
    >
      <div className="frame-product-details-collapsed__intro">
        <p className="eyebrow">Product details</p>
        <h2 id="frame-product-details-title">
          Everything you need to choose and display your frames.
        </h2>
      </div>
      <div className="frame-product-details-collapsed__list">
        {details.map((detail) => (
          <details key={detail.title}>
            <summary>
              {detail.title}
              <span aria-hidden="true">+</span>
            </summary>
            <div className="frame-product-details-collapsed__content">
              {detail.content}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
