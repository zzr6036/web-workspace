import Image from "next/image";

export function HighDefinitionQualitySection() {
  return (
    <section className="high-definition-quality" aria-labelledby="high-definition-quality-title">
      <h3 id="high-definition-quality-title">High-Definition Quality</h3>
      <article>
        <Image
          src="/frames/product-information/high-definition-quality/high-definition-quality.png"
          alt="Comparison showing clearer colour and detail with Epson S80 printing equipment"
          width={1145}
          height={1374}
          sizes="(max-width: 1080px) 100vw, 34vw"
        />
      </article>
    </section>
  );
}
