import Image from 'next/image';

const collections = [
  { name: 'Frameless photo panels', detail: 'A clean look. All the focus on your photo.', image: 'desktop', target: 'everyday', alt: 'Four frameless photo panels displaying family portraits' },
  { name: 'Warm wooden frames', detail: 'A familiar warmth for your favourite moments.', image: 'wood', target: 'together', alt: 'Wooden photo frame with a couple portrait beside a lamp' },
  { name: 'Classic matted frames', detail: 'Give your favourite picture room to breathe.', image: 'classic', target: 'details', alt: 'Brown wooden frame with a wide white mat' },
];

function Photo({ name, alt, className = '', priority = false }: { name: string; alt: string; className?: string; priority?: boolean }) {
  return <div className={`photo ${className}`}><Image src={`/frames/${name}.png`} alt={alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 700px" priority={priority} /></div>;
}

export default function Home() {
  return (
    <main id="main">
      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">YOUR PHOTOS. A PLACE TO BELONG.</p>
          <h1 id="hero-title">Good moments.<br />Beautifully<br /><em>framed.</em></h1>
          <p className="hero-description">From everyday smiles to your biggest days. Bring the photos you love into the spaces you call home.</p>
          <a className="primary-link" href="#collection">Explore the collection <span aria-hidden="true">↗</span></a>
          <p className="hero-signature">Print Your Story. Frame Your Memories.</p>
        </div>
        <Photo name="wood" alt="A favourite couple photo in a wooden frame, styled on a sunlit bedside table" priority className="hero-photo" />
      </section>
      <div className="brand-strip"><span>Little everyday joys</span><span aria-hidden="true">✳</span><span>Big life moments</span><span aria-hidden="true">✳</span><span>Memories worth keeping</span></div>

      <section className="section-wrap collection" id="collection" aria-labelledby="collection-title">
        <div className="section-heading"><p className="eyebrow">FIND YOUR FRAME</p><h2 id="collection-title">A little something for every story.</h2><p>Discover a look that feels right for your photos, and your home.</p></div>
        <div className="collection-grid">{collections.map(item => (
          <article className="collection-card" key={item.image}>
            <a href={`#${item.target}`}><Photo name={item.image} alt={item.alt} /><div className="card-title"><h3>{item.name}</h3><span aria-hidden="true">↗</span></div><p>{item.detail}</p></a>
          </article>
        ))}</div>
      </section>

      <section className="section-wrap inspiration" id="inspiration" aria-labelledby="inspiration-title">
        <div className="section-heading"><p className="eyebrow">A LITTLE INSPIRATION</p><h2 id="inspiration-title">Your memories, at home.</h2></div>
        <div className="feature" id="everyday">
          <Photo name="desktop" alt="Family, wedding and baby photos displayed as frameless tabletop panels" />
          <div className="feature-copy"><p className="eyebrow">01 / THE EVERYDAY EDIT</p><h2>Small frames.<br />So much feeling.</h2><p>A smile on your desk. A familiar face on the shelf. Make a little space for the people who make your day.</p><a className="text-link" href="#collection">Discover frameless panels <span aria-hidden="true">→</span></a></div>
        </div>
        <div className="feature feature-reverse" id="together">
          <Photo name="wood" alt="Warm wooden frame displaying a relaxed portrait of a couple" />
          <div className="feature-copy"><p className="eyebrow">02 / BETTER TOGETHER</p><h2>For the moments<br />that feel like us.</h2><p>Wedding days, anniversaries, or an ordinary afternoon together. A warm wooden frame turns a favourite photograph into part of your home.</p><a className="text-link" href="#collection">Explore wooden frames <span aria-hidden="true">→</span></a></div>
        </div>
        <div className="feature" id="details">
          <Photo name="classic" alt="Close view of a wooden picture frame and its white mat" />
          <div className="feature-copy"><p className="eyebrow">03 / ROOM FOR YOUR STORY</p><h2>A timeless frame.<br />A personal touch.</h2><p>Rich wood tones and a simple white border. An understated setting for a portrait, a favourite place, or a memory you want to revisit.</p><a className="text-link" href="#collection">View the collection <span aria-hidden="true">→</span></a></div>
        </div>
      </section>

      <section className="story" id="our-story" aria-labelledby="story-title"><div className="story-inner"><p className="eyebrow">HELLO, WE’RE MOMENTFRAME</p><h2 id="story-title">Life happens in moments.<br />Keep a few where you can see them.</h2><p>We believe your favourite photos deserve a place in everyday life. On the bedside table, beside your books, or in that quiet corner that makes a house feel like home.</p><p>MomentFrame is about giving those stories a little space to stay.</p><a className="primary-link" href="#collection">Find your inspiration <span aria-hidden="true">↗</span></a></div></section>
    </main>
  );
}
