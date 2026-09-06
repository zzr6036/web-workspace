import { Title } from "elij-ui-library";

const faqs = [
  [
    "How much space do you need?",
    "A comfortable 2.5m × 2.5m area is usually enough for the booth, lighting, and a small prop table.",
  ],
  [
    "Can the prints match our event?",
    "Yes. We personalise the print design using your names, date, colours, and event style.",
  ],
  [
    "Where do you operate?",
    "Moment Booth serves events across Singapore. Share your venue and we will confirm the setup details.",
  ],
];

export default function FAQSection() {
  return (
    <section className="section faq-section" id="faq">
      <div>
        <p className="eyebrow">FAQ</p>
        <Title level={2}>
          A few things
          <br />
          to know.
        </Title>
      </div>
      <div className="faq-list">
        {faqs.map(([question, answer], index) => (
          <details key={question} open={index === 0}>
            <summary>
              {question}
              <span>+</span>
            </summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
