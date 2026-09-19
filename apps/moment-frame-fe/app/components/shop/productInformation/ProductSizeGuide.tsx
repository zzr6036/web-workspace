export const compactSizes = [
  ['6"', "10.2 × 15.2 cm"],
  ['7"', "12.7 × 17.8 cm"],
  ['8"', "15 × 20 cm"],
  ['10"', "18 × 27 cm / 20 × 25 cm"],
  ['12"', "20 × 30 cm / 25 × 30 cm"],
  ['14"', "25 × 35 cm"],
  ["A4", "21 × 29.7 cm"],
  ["A3", "29.7 × 42 cm"],
  ['16"', "30 × 40 cm"],
];

export const largeSizes = [
  ['18"', "35 × 45 cm"],
  ['20"', "40 × 50 cm"],
  ['24"', "40 × 60 cm / 50 × 60 cm"],
  ['30"', "60 × 75 cm"],
  ['32"', "60 × 80 cm"],
  ['36"', "60 × 90 cm"],
  ['40"', "75 × 100 cm"],
  ['42"', "75 × 110 cm"],
  ['48"', "75 × 120 cm"],
];

function SizeColumn({ sizes }: { sizes: string[][] }) {
  return (
    <div className="product-size-column">
      <table>
        <thead>
          <tr>
            <th>Panel size</th>
            <th>Image area</th>
          </tr>
        </thead>
        <tbody>
          {sizes.map(([size, dimensions]) => (
            <tr key={size}>
              <td>{size}</td>
              <td>{dimensions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ProductSizeGuide() {
  return (
    <section
      className="product-size-guide"
      aria-labelledby="product-size-guide-title"
    >
      <div>
        <p className="eyebrow">PRODUCT SIZE GUIDE</p>
        <h3 id="product-size-guide-title">Product size information</h3>
        <ul>
          <li>Measurements are a guide for your image layout</li>
          <li>Final cropping preserves the strongest composition</li>
          <li>Selected format may change the visible image area slightly</li>
        </ul>
      </div>
      <div className="product-size-columns">
        <SizeColumn sizes={compactSizes} />
        <SizeColumn sizes={largeSizes} />
      </div>
    </section>
  );
}
