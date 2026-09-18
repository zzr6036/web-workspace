import Image from "next/image";

export function PrintColourGuideSection() {
  return (
    <section
      className="print-colour-guide"
      aria-labelledby="print-colour-guide-title"
    >
      <div>
        <h3 id="print-colour-guide-title">Print Colour Guide</h3>
      </div>
      <article>
        <Image
          src="/frames/product-information/print-colour-guide/print-colour-guide.png"
          alt="Print colour guidance showing the same photo on several devices"
          width={800}
          height={800}
          sizes="(max-width: 800px) 100vw, 800px"
        />
      </article>
    </section>
  );
}
