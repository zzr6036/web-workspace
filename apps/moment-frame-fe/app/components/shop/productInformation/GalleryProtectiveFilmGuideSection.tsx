import Image from "next/image";

export function GalleryProtectiveFilmGuideSection() {
  return (
    <section
      className="gallery-protective-film-guide"
      aria-labelledby="gallery-protective-film-guide-title"
    >
      <div>
        <h3 id="gallery-protective-film-guide-title">
          Carefully Packed for Delivery
        </h3>
      </div>
      <article>
        <Image
          src="/frames/product-information/gallery/protective-packaging/protective-packaging.png"
          alt="Gallery wooden frame protected with foam corner protectors in a five-layer corrugated carton"
          width={800}
          height={400}
          sizes="(max-width: 800px) 100vw, 800px"
        />
      </article>
    </section>
  );
}
