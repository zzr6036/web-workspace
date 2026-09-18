import { Photo } from "./Photo";

export function HeroSection() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <Photo
        name="new-hero-panels"
        alt="Premium photo panels across a purple gallery wall, with crisp central prints and softly blurred edges"
        priority
        className="hero-photo"
      />
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-copy">
        <p className="eyebrow">MAKE YOUR PHOTOS PART OF HOME</p>
        <h1 id="hero-title">
          Your moments,
          <br />
          <em>made to stay.</em>
        </h1>
        <p className="hero-description">
          <em>
            Bring your favourite photographs to life in premium, high-definition
            photo panels made for the stories you want to keep close.
          </em>
        </p>
        <a className="primary-link" href="#collection">
          Shopping Now
        </a>
        <p className="hero-signature">Print Your Story. Frame Your Memories.</p>
      </div>
    </section>
  );
}
