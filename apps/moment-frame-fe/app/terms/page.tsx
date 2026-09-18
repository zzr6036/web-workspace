import Link from "next/link";

export default function TermsPage() {
  return (
    <main id="main" className="cart-page" style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 20px" }}>
      <div className="cart-page-title-row">
        <h1 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>Terms & Conditions</h1>
      </div>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "24px", lineHeight: "1.6", color: "#413361" }}>
        <section>
          <h2 style={{ fontSize: "1.25rem", marginBottom: "0.5rem", color: "#2d1b5f" }}>1. No Returns or Exchanges</h2>
          <p>As our products are personalized and made-to-order, we incur costs as soon as production begins. Therefore, we do not accept returns, refunds, or exchanges unless the item is defective or there is a verifiable quality issue.</p>
        </section>

        <section>
          <h2 style={{ fontSize: "1.25rem", marginBottom: "0.5rem", color: "#2d1b5f" }}>2. Production & Delivery Time</h2>
          <p>Customized products require dedicated time and care. Standard production and delivery take approximately 2 weeks. We kindly ask that you do not place an order if you require urgent or expedited fulfillment.</p>
        </section>

        <section>
          <h2 style={{ fontSize: "1.25rem", marginBottom: "0.5rem", color: "#2d1b5f" }}>3. Color Accuracy</h2>
          <p>We use professionally calibrated printing equipment to restore the original colors of your photos as accurately as possible. However, natural variations in color display exist across different devices. The colors you see on your phone or computer screen are influenced by your device&apos;s color gamut, temperature, and brightness settings. Therefore, slight color deviations between your screen and the final printed product are unavoidable and are considered normal.</p>
        </section>

        <section>
          <h2 style={{ fontSize: "1.25rem", marginBottom: "0.5rem", color: "#2d1b5f" }}>4. Size Tolerance</h2>
          <p>Please note that some of our custom frames involve manual measurement and craftsmanship. As a result, there may be a slight dimension tolerance of 1-2cm.</p>
        </section>

        <section>
          <h2 style={{ fontSize: "1.25rem", marginBottom: "0.5rem", color: "#2d1b5f" }}>5. Photo Quality & Copyright</h2>
          <p>Customers are responsible for ensuring that the uploaded photos are of sufficient resolution for printing. We are not responsible for pixelated or blurry prints resulting from low-resolution uploads. Furthermore, by uploading an image, you confirm that you own the copyright or have the necessary permissions to use and print the image.</p>
        </section>

        <section>
          <h2 style={{ fontSize: "1.25rem", marginBottom: "0.5rem", color: "#2d1b5f" }}>6. Order Modifications</h2>
          <p>Once an order is confirmed and production has commenced, we are unable to accept any modifications to the design, photo, size, or frame type.</p>
        </section>
      </div>

      <div style={{ marginTop: "40px" }}>
        <Link href="/" className="primary-link">
          Return to Home <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </main>
  );
}
