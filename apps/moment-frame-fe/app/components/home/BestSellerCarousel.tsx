import Image from "next/image";
import { bestSellerPrints } from "./homeContent";

export function BestSellerCarousel() {
  const printGroup = (copy: number) =>
    bestSellerPrints.map((print) => (
      <article className="best-seller-card" key={`${copy}-${print.image}`}>
        <Image
          src={`/frames/bestsellers/${print.image}`}
          alt={print.alt}
          fill
          sizes="400px"
        />
      </article>
    ));

  return (
    <section className="best-sellers" aria-labelledby="best-sellers-title">
      <div className="best-sellers-heading">
        <h2 id="best-sellers-title">Popular Photo Frames</h2>
      </div>
      <div className="best-sellers-viewport">
        <div className="best-sellers-track">
          <div className="best-sellers-group">{printGroup(1)}</div>
          <div className="best-sellers-group" aria-hidden="true">
            {printGroup(2)}
          </div>
        </div>
      </div>
    </section>
  );
}
