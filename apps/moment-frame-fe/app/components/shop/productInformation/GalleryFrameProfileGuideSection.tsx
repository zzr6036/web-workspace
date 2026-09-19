const finishes = [
  {
    label: "INK SHADOW TIME",
    width: "5.8 cm",
    depth: "4.7 cm",
    widthX: 278,
    widthY: 232,
    depthX: 82,
    depthY: 348,
  },
  {
    label: "GOLDEN SAND WALNUT",
    width: "5.7 cm",
    depth: "4.7 cm",
    widthX: 658,
    widthY: 232,
    depthX: 462,
    depthY: 348,
  },
  {
    label: "WALNUT POEM",
    width: "5 cm",
    depth: "3.1 cm",
    widthX: 1038,
    widthY: 232,
    depthX: 842,
    depthY: 348,
  },
  {
    label: "WALNUT GRAIN",
    width: "2.1 cm",
    depth: "3.5 cm",
    widthX: 278,
    widthY: 663,
    depthX: 82,
    depthY: 778,
  },
  {
    label: "LINEN GREY",
    width: "4.9 cm",
    depth: "2.7 cm",
    widthX: 658,
    widthY: 663,
    depthX: 462,
    depthY: 778,
  },
  {
    label: "BREEZE ELEGANCE",
    width: "5.5 cm",
    depth: "3 cm",
    widthX: 1038,
    widthY: 663,
    depthX: 842,
    depthY: 778,
  },
  {
    label: "GOLDEN YEARS FRAME",
    width: "5.5 cm",
    depth: "3 cm",
    widthX: 278,
    widthY: 1093,
    depthX: 82,
    depthY: 1210,
  },
  {
    label: "TIME IMPRINT",
    width: "4.8 cm",
    depth: "3.1 cm",
    widthX: 658,
    widthY: 1093,
    depthX: 462,
    depthY: 1210,
  },
  {
    label: "MONET WINDOW",
    width: "4.8 cm",
    depth: "3 cm",
    widthX: 1038,
    widthY: 1093,
    depthX: 842,
    depthY: 1210,
  },
];

const detailFinishes = [
  {
    label: "GILDED ELEGANCE",
    width: "6.2 cm",
    depth: "4.1 cm",
    widthX: 496,
    widthY: 1540,
    depthX: 83,
    depthY: 1818,
  },
  {
    label: "MOONLIGHT WHITE",
    width: "6.5 cm",
    depth: "3 cm",
    widthX: 1068,
    widthY: 1540,
    depthX: 654,
    depthY: 1818,
  },
];

function Measurement({ value, x, y }: { value: string; x: number; y: number }) {
  return (
    <text
      x={x}
      y={y}
      fill="#c91818"
      stroke="#fff"
      strokeWidth="5"
      paintOrder="stroke"
      fontSize="29"
      fontWeight="800"
      fontFamily="Arial, sans-serif"
      textAnchor="middle"
    >
      {value}
    </text>
  );
}

export function GalleryFrameProfileGuideSection() {
  return (
    <section
      className="gallery-frame-profile-guide"
      aria-labelledby="gallery-frame-profile-guide-title"
      style={{
        padding: "clamp(24px, 3vw, 38px)",
        border: "1px solid #e9ddfa",
        borderRadius: 22,
        background: "#fbf9ff",
      }}
    >
      <div>
        <h3
          id="gallery-frame-profile-guide-title"
          style={{
            margin: 0,
            color: "#32176b",
            fontSize: "clamp(25px, 2.5vw, 36px)",
          }}
        >
          Frame Profile Guide
        </h3>
      </div>
      <div
        className="gallery-frame-profile-chart"
        role="img"
        aria-label="Gallery wooden frame profiles and dimensions"
        style={{
          width: "min(100%, 800px)",
          margin: "18px auto 0",
          overflow: "hidden",
          border: "1px solid #eee8f8",
          borderRadius: 14,
          background: "#fff",
        }}
      >
        <svg
          viewBox="0 0 1195 2002"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block", width: "100%", height: "auto" }}
        >
          <image
            href="/frames/product-information/gallery/frame-finishes.png"
            x="0"
            y="0"
            width="1195"
            height="1316"
          />
          {finishes.map((finish, index) => (
            <g key={finish.label}>
              <Measurement
                value={finish.width}
                x={finish.widthX}
                y={finish.widthY}
              />
              <Measurement
                value={finish.depth}
                x={finish.depthX}
                y={finish.depthY}
              />
              <text
                x={238 + (index % 3) * 380}
                y={407 + Math.floor(index / 3) * 431}
                fill="#fff"
                fontSize="19"
                fontWeight="800"
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                letterSpacing="0.2"
              >
                {finish.label}
              </text>
            </g>
          ))}
          <image
            href="/frames/product-information/gallery/frame-detail-finishes.png"
            x="0"
            y="1340"
            width="1195"
            height="662"
          />
          {detailFinishes.map((finish) => (
            <g key={finish.label}>
              <Measurement
                value={finish.width}
                x={finish.widthX}
                y={finish.widthY}
              />
              <Measurement
                value={finish.depth}
                x={finish.depthX}
                y={finish.depthY}
              />
              <text
                x={finish.widthX}
                y="1973"
                fill="#29233d"
                fontSize="25"
                fontWeight="800"
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
              >
                {finish.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </section>
  );
}
