import Image from "next/image";

export function HighDefinitionQualitySection() {
  return (
    <section
      className="high-definition-quality"
      aria-labelledby="high-definition-quality-title"
    >
      <div>
        <h3 id="high-definition-quality-title">High-Definition Quality</h3>
      </div>
      <Image
        src="/frames/product-information/high-definition-quality.png"
        alt="High-definition printing, colour reproduction and UV protective finish"
        width={600}
        height={400}
      />
    </section>
  );
}
