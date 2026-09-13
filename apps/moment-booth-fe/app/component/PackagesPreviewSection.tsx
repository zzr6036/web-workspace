import { Button, SectionHeading } from "elij-ui-library";

export default function PackagesPreviewSection() {
  return (
    <section className="section packages-preview-section" aria-labelledby="packages-preview-title">
      <SectionHeading
        className="section-heading"
        eyebrow="Packages & extras"
        title="Simple packages. Thoughtful finishing touches."
        description="Explore our photobooth packages, service add-ons, and keepsake products in one place."
      />
      <div className="packages-preview-card">
        <div>
          <span className="eyebrow">Plan your setup</span>
          <h3 id="packages-preview-title">Find the right fit for your celebration.</h3>
          <p>Compare coverage, then add a backdrop, customised templates, or printed keepsakes if you need them.</p>
        </div>
        <a href="/packages">
          <Button variant="primary" size="large">View packages & add-ons</Button>
        </a>
      </div>
    </section>
  );
}
