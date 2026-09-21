import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photo Frame Printing FAQ",
  description: "Answers about custom photo frames, photo frame printing, image cropping, delivery and quote requests in Singapore.",
  alternates: { canonical: "/faq" },
};

const groups = [
  {
    title: "Ordering & Quotes",
    items: [
      ["How do I place an order?", "Choose your frame, upload your photo, add your selections to cart, then submit your delivery details and send a quote request through WhatsApp."],
      ["Is my order confirmed when I send a quote request?", "Not yet. We confirm your quote and payment details with you on WhatsApp before production begins."],
      ["Can I pay directly on the website?", "Payment is currently confirmed through WhatsApp after your quote request has been reviewed."],
      ["Can I change my order?", "Please contact us as soon as possible. Changes may be possible before production begins."],
    ],
  },
  {
    title: "Photos & Printing",
    items: [
      ["What kind of photo should I upload?", "Use the original, highest-resolution version of your image whenever possible. Clear, well-lit images produce the best result."],
      ["Will my photo be cropped?", "Your selected frame size may require slight cropping. You can review and adjust the crop before adding the item to your cart."],
      ["Why can printed colours look slightly different from my screen?", "Phone and computer screens vary in colour settings, brightness and display technology. We calibrate our print output for faithful colour, though small differences are normal."],
      ["Are Classic panels printed directly onto the frame?", "Yes. Classic Frameless Photo Panels and Classic Bordered Frames are printed directly onto the finished surface, creating a seamless result."],
    ],
  },
  {
    title: "Frames & Display",
    items: [
      ["What is the difference between Classic and Gallery Wooden Frames?", "Classic options focus on a clean, direct-to-frame photo finish. Gallery Wooden Frames pair a high-quality photo presentation with selected solid-wood frame styles."],
      ["Can I choose portrait or landscape orientation?", "Yes. The best orientation depends on your image. You can review the crop before adding your selection to cart."],
      ["Are frames ready to display?", "Display and wall-mounting options vary by size and product. Each product page includes its relevant display guidance."],
      ["Which size should I choose?", "Choose based on your room, viewing distance and image composition. The Product Size Guide shows the printable image area for each format."],
    ],
  },
  {
    title: "Delivery",
    items: [
      ["Where do you deliver?", "Delivery details are confirmed with you during the quote process."],
      ["How much is delivery?", "Delivery is free for orders over SGD 160. Orders below SGD 160 have a SGD 10 delivery fee."],
      ["How long will my order take?", "Delivery takes around 2 weeks after order confirmation."],
      ["How is my frame protected during delivery?", "Frames are packed with protective materials to help keep them secure in transit."],
    ],
  },
];

export default function FaqPage() {
  return <main className="faq-page" id="main">
    <div className="faq-intro"><p className="eyebrow">MOMENTFRAME FAQ</p><h1>Frequently asked questions.</h1><p>Everything you need to know before creating your frame and requesting a quote.</p></div>
    <div className="faq-groups">{groups.map((group) => <section key={group.title} aria-labelledby={group.title.replaceAll(" ", "-").toLowerCase()}><h2 id={group.title.replaceAll(" ", "-").toLowerCase()}>{group.title}</h2>{group.items.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</section>)}</div>
    <aside className="faq-help"><h2>Still need help?</h2><p>Send us a message on WhatsApp and we will help you choose the right frame, format and size.</p><a className="home-cta" href="https://wa.me/6588467972?text=Hi%20MomentFrame%2C%20I%20have%20a%20question%20about%20my%20frame." target="_blank" rel="noreferrer">Message us on WhatsApp <span aria-hidden="true">→</span></a></aside>
  </main>;
}
