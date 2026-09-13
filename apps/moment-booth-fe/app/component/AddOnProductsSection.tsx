import { Paragraph, SectionHeading } from "elij-ui-library";

const products = [
  {
    title: "Photobooth Photo Bags",
    description:
      "Keep your printed photos neat and easy for guests to take home.",
  },
  {
    title: "Photobooth Photo Decoration Cards",
    description:
      "Decorative cards designed to add a personal finishing touch to your photobooth keepsakes.",
  },
  {
    title: "Wedding Photobooth Album",
    description:
      "A dedicated album for collecting photobooth memories from your wedding celebration.",
  },
] as const;

export default function AddOnProductsSection() {
  return (
    <section className="section add-on-products-section" id="add-on-products">
      <SectionHeading
        className="section-heading"
        eyebrow="Add-on products"
        title="Little keepsakes for every guest."
        description="Add practical and thoughtful extras to make your printed memories even easier to share and keep."
      />
      <div className="add-on-products-grid">
        {products.map((product) => (
          <article className="add-on-product-card" key={product.title}>
            <span className="add-on-product-card__eyebrow">Optional extra</span>
            <h3>{product.title}</h3>
            <Paragraph>{product.description}</Paragraph>
          </article>
        ))}
      </div>
      <p className="add-on-products-note">
        Ask us about current availability and pricing when you enquire.
      </p>
    </section>
  );
}
