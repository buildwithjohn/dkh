// ─────────────────────────────────────────────────────────────────────────────
// SITE CONFIG — All integration keys & endpoints in one place.
// John: replace these with real keys before launch.
// ─────────────────────────────────────────────────────────────────────────────

export const SITE = {
  name: "Dr. Kunle Hamilton",
  domain: "kunlehamilton.com",
  email: "info@kunlehamilton.com",
  phone: "+234-XXX-XXX-XXXX",
};

// ── EMAIL SUBSCRIBE (Formspree — free tier, no backend required) ──
// 1. Go to https://formspree.io/  →  Create account (free)
// 2. Create a new form named "Newsletter Subscribers"
// 3. Copy your form ID (e.g. xpzgkqyw)
// 4. Replace the value below
// Until then, submissions fall back to localStorage so nothing is lost.
export const SUBSCRIBE = {
  endpoint: "https://formspree.io/f/YOUR_FORMSPREE_ID",
  localStorageKey: "dkh-subscribers",
};

// ── PAYSTACK (Book Purchase) ──
// 1. Get your public key from https://dashboard.paystack.com/#/settings/developer
// 2. Use the TEST key during development (starts with pk_test_)
// 3. Replace with LIVE key (pk_live_) before launch
export const PAYSTACK = {
  publicKey: "pk_test_YOUR_PAYSTACK_PUBLIC_KEY",
  currency: "NGN",
  merchantEmail: "akinolajohnayomide@gmail.com", // payments confirmation to this email
};

// ── VISITOR COUNTER (CounterAPI — free, no auth) ──
// Namespace is unique to your domain. Pre-configured below.
// Counter increments on every page load; data is global.
export const COUNTER = {
  namespace: "kunlehamilton",
  key: "site-visits",
  apiBase: "https://api.counterapi.dev/v1",
};

// ── CONTACT FORM (also Formspree, separate form) ──
export const CONTACT_FORM = {
  endpoint: "https://formspree.io/f/YOUR_CONTACT_FORM_ID",
};
