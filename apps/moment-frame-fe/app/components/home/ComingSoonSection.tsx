export function ComingSoonSection() {
  const whatsappText = encodeURIComponent("Hi MomentFrame, I would like to know more about the new collection.");
  return <section className="section-wrap coming-soon" aria-labelledby="coming-soon-title">
    <div className="coming-soon-copy">
      <p className="eyebrow">COMING SOON</p>
      <h2 id="coming-soon-title">A new way to keep your favourite moments close.</h2>
      <p>A new personalised photo piece is arriving soon. Preview it now, then message us to be among the first to know when it launches.</p>
      <a className="home-cta" href={`https://wa.me/6588467972?text=${whatsappText}`} target="_blank" rel="noreferrer">Ask about the new collection <span aria-hidden="true">→</span></a>
    </div>
    <video src="/frames/home/new-collection-preview.mp4" muted loop playsInline controls preload="metadata" aria-label="Preview of an upcoming MomentFrame collection" />
  </section>;
}
