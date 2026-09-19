type OrderingStep = {
  number: string;
  title: string;
  description?: string;
  points?: string[];
};

const steps: OrderingStep[] = [
  { number: "01", title: "Choose your frame", description: "Select your frame style, finish, size and orientation." },
  { number: "02", title: "Upload your photo", description: "Upload your image and adjust the crop for your selected format." },
  { number: "03", title: "Review your cart", description: "Check your photo, frame selection, size and quantity." },
  { number: "04", title: "Request your quote", description: "Enter delivery details and send your quote request to WhatsApp." },
  {
    number: "05",
    title: "Share photos and confirm",
    points: [
      "Upload your high-resolution photos to Google Drive.",
      "Share the Drive link with us.",
      "We confirm your quote and payment details before production begins.",
    ],
  },
];

export function OrderingProcessSection() {
  return <section className="ordering-process" id="how-it-works" aria-labelledby="how-it-works-title">
    <div className="section-wrap">
      <div className="section-heading">
        <p className="eyebrow">HOW ORDERING WORKS</p>
        <h2 id="how-it-works-title">Made to order, confirmed with care.</h2>
        <p>There is no online payment step. You review your choices first, then we confirm every detail with you on WhatsApp.</p>
      </div>
      <ol className="ordering-process-list">
        {steps.map((step) => <li key={step.number}><span>{step.number}</span><div><h3>{step.title}</h3>{step.points ? <ul className="ordering-process-points">{step.points.map((point) => <li key={point}>{point}</li>)}</ul> : <p>{step.description}</p>}</div></li>)}
      </ol>
      <div className="ordering-process-actions"><a className="home-cta" href="#collection">Start creating <span aria-hidden="true">→</span></a><a className="text-link" href="/faq">Read the FAQ <span aria-hidden="true">→</span></a></div>
    </div>
  </section>;
}
