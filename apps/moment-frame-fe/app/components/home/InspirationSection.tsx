export function InspirationSection() {
  return (
    <section className="section-wrap why-momentframe" id="why-momentframe" aria-labelledby="why-momentframe-title">
      <div className="section-heading">
        <p className="eyebrow">WHY MOMENTFRAME</p>
        <h2 id="why-momentframe-title">Your photo, finished as art.</h2>
        <p>From clean modern panels to refined wooden frames, each piece gives your favourite photograph a more considered place at home.</p>
      </div>
      <div className="why-momentframe-grid">
        <article className="why-momentframe-card why-momentframe-summary-card">
          <section>
            <p className="eyebrow">01 / CLASSIC COLLECTIONS</p>
            <h3>Printed as one finished piece.</h3>
            <p>Our Classic Frameless Photo Panels and Classic Bordered Frames are printed directly onto the selected frame surface, rather than placing a separate print inside a frame.</p>
          </section>
          <section>
            <p className="eyebrow">02 / IMAGE QUALITY</p>
            <h3>Detail worth keeping.</h3>
            <p>Clear image detail and rich colour help your photographs stay vivid on display.</p>
          </section>
        </article>
        <article className="why-momentframe-card why-momentframe-video-card">
          <video src="/frames/home/gallery-wooden-detail.mp4" muted loop playsInline controls preload="metadata" aria-label="Close view of a Gallery Wooden Frame" />
          <div>
            <p className="eyebrow">03 / GALLERY WOODEN FRAMES</p>
            <h3>Made for your space.</h3>
            <p>Selected solid-wood frame options bring warmth, character and an elevated finish to your walls.</p>
          </div>
        </article>
        <article className="why-momentframe-card why-momentframe-video-card">
          <video src="/frames/home/solid-wood-quality.mp4" muted loop playsInline controls preload="metadata" aria-label="MomentFrame solid wood quality" />
          <div>
            <p className="eyebrow">04 / SOLID WOOD QUALITY</p>
            <h3>Solid wood, naturally refined.</h3>
            <p>Natural grain and a considered finish give your favourite photographs a warm, lasting place at home.</p>
          </div>
        </article>
      </div>
    </section>
  );
}
