const steps = [
  ["01", "Choose your frame", "Select your frame style, finish, size and orientation."],
  ["02", "Upload your photo", "Upload your image and adjust the crop for your selected format."],
  ["03", "Review your cart", "Check your photo, frame selection, size and quantity."],
  ["04", "Request your quote", "Enter delivery details and send your quote request to WhatsApp."],
  ["05", "Confirm before production", "We confirm your quote and payment details with you before production begins."],
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
        {steps.map(([number, title, description]) => <li key={number}><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div></li>)}
      </ol>
      <div className="ordering-process-actions"><a className="home-cta" href="#collection">Start creating <span aria-hidden="true">→</span></a><a className="text-link" href="/faq">Read the FAQ <span aria-hidden="true">→</span></a></div>
    </div>
  </section>;
}
