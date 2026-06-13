import Layout from "../components/Layout";
import PageHero from "../components/PageHero";
import { SITE } from "../lib/config";

export default function Refund() {
  return (
    <Layout
      title="Refund Policy"
      description="Our refund policy for ebook purchases and signed hard-copy book orders."
    >
      <PageHero
        eyebrow={<><i className="bi bi-arrow-counterclockwise" /> Legal</>}
        title={<><em>Refund</em> Policy</>}
        subtitle={`Last updated: ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}. We want every reader to be satisfied. Here's how we handle refunds for ebooks and hard copies.`}
        variant="light"
      />

      <article className="legal-body">
        <style>{`
          .legal-body { max-width: 760px; margin: 0 auto; padding: 4.5rem var(--gutter) 6rem; }
          .legal-body h2 { font-family: var(--serif); font-size: 1.6rem; font-weight: 400; font-style: italic; color: var(--ink); margin: 2.5rem 0 1rem; line-height: 1.2; }
          .legal-body h2:first-child { margin-top: 0; }
          .legal-body h3 { font-family: var(--serif); font-size: 1.2rem; font-weight: 500; color: var(--ink); margin: 1.6rem 0 0.7rem; line-height: 1.3; }
          .legal-body p { font-size: 1rem; line-height: 1.85; color: var(--ink); margin-bottom: 1.2rem; font-weight: 300; }
          .legal-body p strong { font-weight: 600; }
          .legal-body ul { margin: 0 0 1.4rem 0; padding-left: 1.2rem; }
          .legal-body li { font-size: 0.98rem; line-height: 1.8; color: var(--ink); margin-bottom: 0.7rem; font-weight: 300; }
          .legal-body a { color: var(--gold); font-weight: 500; }
          .legal-body a:hover { color: var(--gold2); text-decoration: underline; }
          .legal-body .highlight-box { padding: 1.5rem 1.7rem; background: var(--warm2); border-left: 3px solid var(--gold); border-radius: 4px; margin: 1.5rem 0; }
          .legal-body .highlight-box p { margin-bottom: 0; }
        `}</style>

        <div className="highlight-box">
          <p><strong>The short version:</strong> Refunds are issued within 7 days for ebooks that fail to download, hard copies that arrive damaged, and orders that never arrive. Ebooks that have already been downloaded are non-refundable, as the digital content cannot be returned.</p>
        </div>

        <h2>Ebooks (digital downloads)</h2>

        <h3>You can request a refund if:</h3>
        <ul>
          <li>The download link does not work and our support team cannot resolve the issue within 48 hours.</li>
          <li>You were charged but never reached the download page.</li>
          <li>The PDF file is corrupted or incomplete.</li>
        </ul>

        <h3>We cannot offer a refund if:</h3>
        <ul>
          <li>You have successfully downloaded the ebook (the digital content cannot be returned).</li>
          <li>You changed your mind after downloading.</li>
          <li>You have technical issues unrelated to the file itself (e.g., your device doesn't open PDFs).</li>
        </ul>

        <p>
          Ebook refund requests must be submitted within <strong>7 days</strong> of purchase. Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> with your purchase reference number.
        </p>

        <h2>Hard copies (physical books)</h2>

        <h3>You can request a refund or replacement if:</h3>
        <ul>
          <li>The book arrives damaged. Please photograph the damage and email us within 48 hours of receipt.</li>
          <li>The book never arrives. We will trace the shipment first; if it cannot be recovered, we will refund or re-ship.</li>
          <li>You receive the wrong title.</li>
        </ul>

        <h3>We cannot offer a refund for hard copies if:</h3>
        <ul>
          <li>You received the correct book in good condition but no longer want it (buyer's remorse).</li>
          <li>You provided an incorrect delivery address and the parcel is lost.</li>
          <li>The book is returned to us with signs of use.</li>
        </ul>

        <h2>How to request a refund</h2>
        <ol style={{ paddingLeft: "1.2rem", marginBottom: "1.4rem" }}>
          <li style={{ fontSize: "0.98rem", lineHeight: 1.8, color: "var(--ink)", marginBottom: "0.7rem", fontWeight: 300 }}>Email <a href={`mailto:${SITE.email}?subject=Refund request`}>{SITE.email}</a> with your purchase reference number.</li>
          <li style={{ fontSize: "0.98rem", lineHeight: 1.8, color: "var(--ink)", marginBottom: "0.7rem", fontWeight: 300 }}>Briefly describe the issue. Attach photos if relevant (for damaged hard copies).</li>
          <li style={{ fontSize: "0.98rem", lineHeight: 1.8, color: "var(--ink)", marginBottom: "0.7rem", fontWeight: 300 }}>We respond within <strong>48 hours</strong> with a decision.</li>
          <li style={{ fontSize: "0.98rem", lineHeight: 1.8, color: "var(--ink)", marginBottom: "0.7rem", fontWeight: 300 }}>Approved refunds are processed within <strong>5 business days</strong> via Paystack back to your original payment method.</li>
        </ol>

        <h2>Chargebacks</h2>
        <p>
          Please reach out to us before initiating a chargeback with your bank. Most issues can be resolved within 48
          hours by emailing <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. Chargebacks issued without prior contact may
          delay resolution and incur additional review.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about a specific purchase? Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or call <a href={`tel:${SITE.phoneE164}`}>{SITE.phone}</a>.
        </p>
      </article>
    </Layout>
  );
}
