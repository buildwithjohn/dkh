import Layout from "../components/Layout";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import { SITE } from "../lib/config";

export default function Privacy() {
  return (
    <Layout
      title="Privacy Policy"
      description="How Dr. Kunle Hamilton handles your personal data, subscriptions, and purchase information."
    >
      <PageHero
        eyebrow={<><i className="bi bi-shield-lock-fill" /> Legal</>}
        title={<><em>Privacy</em> Policy</>}
        subtitle={`Last updated: ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}. This policy explains what data we collect on kunlehamilton.com, why, and what we do with it.`}
        variant="light"
      />

      <LegalBody>
        <h2>Who we are</h2>
        <p>
          This website ({SITE.url}) is operated by <strong>Dr. Kunle Hamilton</strong>, a Nigerian author, prophet-scholar
          and veteran journalist. For any privacy-related questions, contact us at <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>

        <h2>What data we collect</h2>
        <p>We only collect personal data that you give us directly:</p>
        <ul>
          <li><strong>Newsletter subscription</strong> — your email address. Optionally, your name if you choose to share it.</li>
          <li><strong>Contact form</strong> — your name, email, phone number (optional), organisation (optional), and the message you send.</li>
          <li><strong>Ebook purchases</strong> — your name, email, and payment details. Payment details are processed entirely by Paystack and never stored on our servers.</li>
          <li><strong>Analytics</strong> — we collect aggregated, anonymous visit counts (no personal identification) via CounterAPI to show a live visitor count.</li>
        </ul>

        <h2>How we use your data</h2>
        <ul>
          <li>To send you Dr. Hamilton's newsletters, book announcements, and ministry updates — only if you subscribed.</li>
          <li>To respond to your contact form messages, speaking requests, and inquiries.</li>
          <li>To deliver ebooks you purchase and provide ongoing download access for 30 days.</li>
          <li>To fulfil signed hard-copy orders you request by phone or WhatsApp.</li>
          <li>To improve the site by understanding overall visit patterns (counts only).</li>
        </ul>
        <p>We do <strong>not</strong> sell or rent your data to third parties. Ever.</p>

        <h2>Third-party services we use</h2>
        <ul>
          <li><strong>Paystack</strong> — processes all payments. See <a href="https://paystack.com/privacy" target="_blank" rel="noopener noreferrer">paystack.com/privacy</a>.</li>
          <li><strong>Beehiiv</strong> — sends our newsletter emails. See <a href="https://www.beehiiv.com/privacy" target="_blank" rel="noopener noreferrer">beehiiv.com/privacy</a>.</li>
          <li><strong>Formspree</strong> — routes contact form submissions to our inbox. See <a href="https://formspree.io/legal/privacy-policy" target="_blank" rel="noopener noreferrer">formspree.io/legal/privacy-policy</a>.</li>
          <li><strong>Vercel</strong> — hosts the website. See <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">vercel.com/legal/privacy-policy</a>.</li>
          <li><strong>Google Drive</strong> — hosts ebook PDFs for delivery (links are private and rotated periodically).</li>
        </ul>

        <h2>Cookies and local storage</h2>
        <p>
          We use minimal local storage in your browser to:
        </p>
        <ul>
          <li>Remember your ebook purchases so you can re-download them at <a href="/library">/library</a>.</li>
          <li>Remember your newsletter subscription as a safety backup.</li>
        </ul>
        <p>We do not use third-party tracking cookies or advertising cookies.</p>

        <h2>Your rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Request a copy of any personal data we hold about you.</li>
          <li>Ask us to correct or delete your data.</li>
          <li>Unsubscribe from our newsletter at any time (every email has an unsubscribe link).</li>
          <li>Withdraw consent for further communications.</li>
        </ul>
        <p>To exercise any of these rights, email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>

        <h2>Data retention</h2>
        <p>
          We retain your data only as long as we have a legitimate reason. Newsletter subscriptions until you unsubscribe.
          Purchase records for 7 years (for tax and accounting). Contact form messages for 2 years.
        </p>

        <h2>Security</h2>
        <p>
          All traffic to {SITE.domain} is encrypted via HTTPS. Payment details never touch our servers — they go directly to
          Paystack's PCI-DSS compliant infrastructure. Newsletter and contact data is stored encrypted at Beehiiv and Formspree.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          We may update this policy from time to time. The "last updated" date at the top will always reflect the latest version.
          For material changes, we'll notify subscribers by email.
        </p>

        <h2>Contact</h2>
        <p>
          Privacy questions? Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or call <a href={`tel:${SITE.phoneE164}`}>{SITE.phone}</a>.
        </p>
      </LegalBody>
    </Layout>
  );
}

function LegalBody({ children }) {
  return (
    <>
      <style>{`
        .legal-body { max-width: 760px; margin: 0 auto; padding: 4.5rem var(--gutter) 6rem; }
        .legal-body h2 { font-family: var(--serif); font-size: 1.6rem; font-weight: 400; font-style: italic; color: var(--ink); margin: 2.5rem 0 1rem; line-height: 1.2; }
        .legal-body h2:first-child { margin-top: 0; }
        .legal-body p { font-size: 1rem; line-height: 1.85; color: var(--ink); margin-bottom: 1.2rem; font-weight: 300; }
        .legal-body p strong { font-weight: 600; }
        .legal-body ul { margin: 0 0 1.4rem 0; padding-left: 1.2rem; }
        .legal-body li { font-size: 0.98rem; line-height: 1.8; color: var(--ink); margin-bottom: 0.7rem; font-weight: 300; }
        .legal-body li strong { font-weight: 600; color: var(--ink); }
        .legal-body a { color: var(--gold); font-weight: 500; transition: color 0.2s; }
        .legal-body a:hover { color: var(--gold2); text-decoration: underline; }
      `}</style>
      <article className="legal-body">{children}</article>
    </>
  );
}
