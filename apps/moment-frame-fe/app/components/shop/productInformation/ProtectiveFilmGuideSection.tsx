import Image from "next/image";

export function ProtectiveFilmGuideSection() {
  return (
    <section
      className="protective-film-guide"
      aria-labelledby="protective-film-guide-title"
    >
      <div>
        <h3 id="protective-film-guide-title">Protective Film Guide</h3>
      </div>
      <article>
        <Image
          src="/frames/product-information/protective-film-guide/protective-film-guide.png"
          alt="Instructions for removing the surface protective film from a photo panel"
          width={800}
          height={442}
          sizes="(max-width: 800px) 100vw, 800px"
        />
      </article>
    </section>
  );
}
