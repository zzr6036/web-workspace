const previews = [
  { name: 'Everyday favourites', label: 'The little things, kept close.', style: 'sunrise' },
  { name: 'Together moments', label: 'Your favourite people, in the picture.', style: 'coast' },
  { name: 'Places to remember', label: 'A little reminder of somewhere special.', style: 'dusk' },
];

function FrameArt({ style, className = '' }: { style: string; className?: string }) {
  return <div className={`frame-art ${style} ${className}`} aria-hidden="true"><div className="art-scene"><span className="sun" /><span className="hill hill-back" /><span className="hill hill-front" /></div></div>;
}

export default function Home() {
  return (
    <main id="main">
      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-copy"><p className="eyebrow"><span /> LITTLE MOMENTS, BEAUTIFULLY KEPT</p><h1 id="hero-title">Print Your Story.<br /><em>Frame Your</em><br /><em>Memories.</em></h1><p className="hero-description">The everyday smiles. The places you love. The moments you want to keep a little closer.</p><a className="primary-link" href="#collection">Find your inspiration <span aria-hidden="true">↗</span></a><p className="hero-note">A first look at MomentFrame</p></div>
        <div className="hero-art" role="img" aria-label="Illustrated orange and teal landscapes in overlapping photo frames"><span className="art-orbit" /><FrameArt style="coast" className="frame-back" /><FrameArt style="sunrise" className="frame-main" /><span className="art-caption">made for your memories</span><span className="art-spark" aria-hidden="true">✳</span></div>
      </section>
      <div className="brand-strip"><span>YOUR PHOTOS.</span><span aria-hidden="true">✳</span><span>YOUR STORIES.</span><span aria-hidden="true">✳</span><span>YOUR LITTLE PIECE OF HAPPY.</span></div>
      <section className="collection section-wrap" id="collection" aria-labelledby="collection-title"><div className="section-heading"><div><p className="eyebrow">THE INSPIRATION EDIT</p><h2 id="collection-title">Make room for your memories.</h2></div><p>Every picture has a story.<br />Here’s a little inspiration for yours.</p></div><div className="preview-grid">{previews.map((item, index) => <article className="preview-card" key={item.style}><div className={`preview-art preview-${item.style}`}><span className="preview-badge">CONCEPT {String(index + 1).padStart(2, '0')}</span><FrameArt style={item.style} /></div><div className="card-title"><h3>{item.name}</h3><span aria-hidden="true">✳</span></div><p>{item.label}</p></article>)}</div><p className="preview-note">Illustrative previews · Product details coming soon.</p></section>
      <section className="story section-wrap" id="our-story" aria-labelledby="story-title"><p className="eyebrow">HELLO, WE’RE MOMENTFRAME</p><h2 id="story-title">Some moments deserve<br />a place beyond your phone.</h2><p>We’re creating a space to celebrate the photos and stories that mean something to you. This is just the beginning.</p><a className="text-link" href="#top">Print your story. Frame your memories. <span aria-hidden="true">↗</span></a></section>
    </main>
  );
}
