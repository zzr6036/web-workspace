import { Paragraph, SectionHeading } from "elij-ui-library";

export default function OptionalAddOnsSection() {
  return (
    <section className="section optional-addons-section" id="optional-add-ons">
      <SectionHeading
        className="section-heading"
        eyebrow="Optional add-ons"
        title="Make your setup your own."
        description="Standard packages stay simple. Add only the extras that suit your event."
      />
      <div className="optional-addons-grid">
        <article
          className="optional-addon-card"
          aria-label="Optional backdrop add-on"
        >
          <div className="optional-addon-card__title-row">
            <div>
              <span className="optional-addon-card__eyebrow">
                Backdrop rental
              </span>
              <p className="optional-addon-card__subtitle">2 × 2 m backdrop</p>
            </div>
            <h3>$30</h3>
          </div>
          <Paragraph>
            Choose one solid colour: white, red, blue, or pink.
          </Paragraph>
          <ul>
            <li>We provide the backdrop and setup only.</li>
            <li>
              Any additional decorations must be supplied and installed by you.
            </li>
            <li>
              Please do not sew, patch, paint, tape, puncture, alter, or damage
              the backdrop.
            </li>
          </ul>
        </article>
        <article
          className="optional-addon-card optional-addon-card--design"
          aria-label="Custom design add-on"
        >
          <div className="optional-addon-card__title-row">
            <span className="optional-addon-card__eyebrow">
              Customised Photobooth Template
            </span>
            <h3>$128</h3>
          </div>
          <Paragraph>
            Your package includes a choice from our template library. We can
            customise a specific photobooth template for your event based on
            your theme and requirements.
          </Paragraph>
          <p>The custom design package includes:</p>
          <ul>
            <li>1 photobooth welcome screen</li>
            <li>1 single-photo template</li>
            <li>1 two-photo template</li>
            <li>1 six-photo template</li>
          </ul>
          <p>
            We create the artwork using your theme, colours, logo, and design
            assets.
          </p>
        </article>
      </div>
    </section>
  );
}
