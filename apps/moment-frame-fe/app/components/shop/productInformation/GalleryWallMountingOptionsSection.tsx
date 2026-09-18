import Image from "next/image";

export function GalleryWallMountingOptionsSection() {
  return (
    <section
      className="gallery-wall-mounting-options"
      aria-labelledby="gallery-wall-mounting-options-title"
    >
      <div>
        <h3 id="gallery-wall-mounting-options-title">Wall Mounting Options</h3>
      </div>
      <article>
        <Image
          src="/frames/product-information/gallery/wall-mounting-options/wall-mounting-options.png"
          alt="No-drill and stainless steel wall mounting options for gallery wooden frames"
          width={800}
          height={567}
          sizes="(max-width: 800px) 100vw, 800px"
        />
      </article>
    </section>
  );
}
