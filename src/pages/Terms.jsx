import Layout from "../components/Layout";
import PageHero from "../components/PageHero";
import { SITE } from "../lib/config";

export default function Terms() {
  return (
    <Layout
      title="Terms of Service"
      description="The terms governing use of kunlehamilton.com, ebook purchases, and Dr. Hamilton's services."
    >
      <PageHero
        eyebrow={<><i className="bi bi-file-earmark-text-fill" /> Legal</>}
        title={<><em>Terms</em> of Service</>}
        subtitle={`Last updated: ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}. By using kunlehamilton.com, you agree to the terms set out here.`}
        variant="light"
      />

      <article className="legal-body">
        <style>{`
          .legal-body { max-width: 760px; margin: 0 auto; padding: 4.5rem var(--gutter) 6rem; }
          .legal-body h2 { font-family: var(--serif); font-size: 1.6rem; font-weight: 400; font-style: italic; color: var(--ink); margin: 2.5rem 0 1rem; line-height: 1.2; }
          .legal-body h2:first-child { margin-top: 0; }
          .legal-body p { font-size: 1rem; line-height: 1.85; color: var(--ink); margin-bottom: 1.2rem; font-weight: 300; }
          .legal-body p strong { font-weight: 600; }
          .legal-body ul { margin: 0 0 1.4rem 0; padding-left: 1.2rem; }
          .legal-body li { font-size: 0.98rem; line-height: 1.8; color: var(--ink); margin-bottom: 0.7rem; font-weight: 300; }
          .legal-body a { color: var(--gold); font-weight: 500; }
          .legal-body a:hover { color: var(--gold2); text-decoration: underline; }
        `}</style>

        <h2>1. Acceptance of terms</h2>
        <p>
          By visiting {SITE.url}, subscribing to the newsletter, purchasing an ebook, or engaging Dr. Kunle Hamilton for
          speaking services, you agree to these Terms of Service. If you do not agree, please discontinue use of the site.
        </p>

        <h2>2. About this website</h2>
        <p>
          {SITE.url} is the official platform of <strong>Dr. Kunle Hamilton</strong> — a Nigerian author, prophet-scholar
          and veteran journalist. The site sells digital books (ebooks), facilitates speaking engagement inquiries,
          and publishes ministry/media commentary.
        </p>

        <h2>3. Ebook purchases</h2>
        <ul>
          <li>All ebook prices are in Nigerian Naira (₦) and inclusive of any applicable taxes.</li>
          <li>Payments are processed by Paystack. We accept Nigerian cards, USSD, and bank transfers.</li>
          <li>After successful payment, you will be redirected to a private download page (/library/[reference]).</li>
          <li>Your download access remains valid for <strong>30 days</strong> from the date of purchase. You may re-download from the same browser within that period.</li>
          <li>If you lose access, email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> with your purchase reference and we will restore your link.</li>
        </ul>

        <h2>4. Hard copies</h2>
        <p>
          Signed physical copies are available on request. Call <a href={`tel:${SITE.phoneE164}`}>{SITE.phone}</a> or WhatsApp
          to arrange. Pricing depends on destination and shipping method. Hard copy orders are subject to a separate written
          agreement and the refund policy stated below.
        </p>

        <h2>5. Intellectual property</h2>
        <p>
          All content on this site — including the ebooks, articles, photographs, illustrations, and the KH brand mark —
          is the property of Dr. Kunle Hamilton or its respective licensors. You may not:
        </p>
        <ul>
          <li>Share, redistribute, or upload purchased ebooks to file-sharing platforms, public servers, or social media.</li>
          <li>Reproduce site content in whole or substantial part without written permission.</li>
          <li>Use Dr. Hamilton's name, likeness, or KH brand mark for commercial purposes without authorization.</li>
        </ul>
        <p>
          Purchasing an ebook grants you a <strong>personal, non-transferable license</strong> to read the book on your own devices.
          It does not transfer any other rights.
        </p>

        <h2>6. Newsletter</h2>
        <p>
          You may subscribe and unsubscribe at any time. Every newsletter email contains an unsubscribe link.
          We will never sell or share your email address.
        </p>

        <h2>7. Speaking engagements</h2>
        <p>
          Speaking inquiries submitted via the contact form are routed to Dr. Hamilton's team. Submitting a request does not
          guarantee acceptance. All accepted bookings are subject to a separate speaking agreement covering fees, travel,
          schedule, and content scope.
        </p>

        <h2>8. User conduct</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use the contact form to send abusive, fraudulent, or solicitation messages.</li>
          <li>Attempt to gain unauthorized access to any part of the site.</li>
          <li>Use automated tools (bots, scrapers) without prior written consent.</li>
        </ul>

        <h2>9. Disclaimer of warranties</h2>
        <p>
          This site and its content are provided "as is." While we work to keep the site accurate and available,
          we make no warranties as to continuous uptime, accuracy of all third-party links, or that every link or
          download will function in every region or browser.
        </p>

        <h2>10. Limitation of liability</h2>
        <p>
          To the maximum extent permitted by Nigerian law, Dr. Kunle Hamilton and the website operators are not liable
          for any indirect, incidental, or consequential losses arising from use of the site. Direct liability for
          ebook purchases is limited to the amount paid for the ebook.
        </p>

        <h2>11. Governing law</h2>
        <p>
          These terms are governed by the laws of the Federal Republic of Nigeria. Any disputes will be resolved in
          the courts of Lagos State.
        </p>

        <h2>12. Changes to terms</h2>
        <p>
          We may update these terms from time to time. The "last updated" date above will always reflect the current version.
        </p>

        <h2>13. Contact</h2>
        <p>
          Questions about these terms? Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or call <a href={`tel:${SITE.phoneE164}`}>{SITE.phone}</a>.
        </p>
      </article>
    </Layout>
  );
}
