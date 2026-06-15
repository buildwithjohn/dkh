// ─────────────────────────────────────────────────────────────────────────────
// SITE CONFIG — All integration keys & endpoints in one place.
// John: replace these with real keys before launch.
// ─────────────────────────────────────────────────────────────────────────────

export const SITE = {
  name: "Dr. Kunle Hamilton",
  domain: "kunlehamilton.com",
  url: "https://www.kunlehamilton.com",
  email: "info@kunlehamilton.com",
  phone: "+234 705 149 1583",
  phoneE164: "+2347051491583", // for tel: links
  whatsapp: "+2347051491583",  // for wa.me links
};

// ── EMAIL SUBSCRIBE (Beehiiv — primary newsletter service) ──
// 1. Go to https://beehiiv.com — create your publication
// 2. Settings → Integrations → API → Create a Publication API key
// 3. Find your publication ID at the same URL
// 4. Paste both below
// Until configured, submissions fall back to localStorage so nothing is lost.
export const BEEHIIV = {
  publicationId: "pub_1c84ed93-456a-43ab-95eb-fe2f348fed35",  // V2 ID — modern API
  apiKey: "YOUR_BEEHIIV_API_KEY",                              // ⚠ Still needed — get from Beehiiv → Settings → Integrations → API Keys (Generate a key)
};

// ── EMAIL SUBSCRIBE (Formspree fallback / contact form) ──
// Formspree handles the contact form. It's also a backup destination
// for subscribers if Beehiiv ever fails.
// Sign up at https://formspree.io/ (free 50/mo)
export const SUBSCRIBE = {
  endpoint: "https://formspree.io/f/YOUR_FORMSPREE_NEWSLETTER_ID",
  localStorageKey: "dkh-subscribers",
};

export const CONTACT_FORM = {
  endpoint: "https://formspree.io/f/YOUR_FORMSPREE_CONTACT_ID",
};

// ── PAYSTACK (Book Purchase) ──
// 1. Get your public key from https://dashboard.paystack.com/#/settings/developer
// 2. Use TEST key during development (starts with pk_test_)
// 3. Replace with LIVE key (pk_live_) once Paystack approves your business
export const PAYSTACK = {
  publicKey: "pk_test_cdc139b1bcf5ca89d0afc5a86cc2083aa09aef9e",
  currency: "NGN",
  merchantEmail: "info@kunlehamilton.com",
};

// ── EBOOK DELIVERY ──
// After successful Paystack payment, the buyer is redirected to:
//   /library/{paystackReference}
// That page reads the slug from posts.js + verifies the reference,
// then shows the download link. Downloads can be:
//   - "local"   → file in /public/ebooks/<filename>.pdf
//   - "drive"   → Google Drive shareable link
//   - "dropbox" → Dropbox shared link
// Set the type + url for each book in src/data/books.js
export const EBOOK_DELIVERY = {
  // How long after purchase the download remains accessible (in days).
  // After this, the buyer must request a new link via contact form.
  accessDays: 30,
};

// ── VISITOR COUNTER (CounterAPI — free, no auth) ──
export const COUNTER = {
  namespace: "kunlehamilton",
  key: "site-visits",
  apiBase: "https://api.counterapi.dev/v1",
};
