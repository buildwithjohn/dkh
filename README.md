# Dr. Kunle Hamilton — Personal Website

The official personal website of **Dr. Kunle Hamilton** — Nigeria's foremost prophet-scholar. Prophet of the Celestial Church of Christ, Senior Shepherd of CCC PraiseVille Global, Founder of ShaddaiVille Ministries International, international author, veteran journalist, and pioneer of *The Glitterati* in ThisDAY newspaper.

Live: [kunlehamilton.com](https://kunlehamilton.com)

---

## Tech Stack

- **React 19** + **Vite 8**
- **Framer Motion** for animation
- **React Router** for `/news` routing
- **Paystack** for Nigerian Naira book purchases
- **Formspree** for email collection (free tier)
- **CounterAPI** for live visitor counting (free tier, no auth)
- **Vercel** for hosting

---

## What's on the Site

### Sections (single-page)
1. **Hero** — Full-bleed editorial portrait + name + tagline
2. **Marquee** — Animated descriptor strip
3. **Stats** — 40+ years, 18 countries, 5 nations, 1985 First Class graduate
4. **About** — "Prophet · Scholar · Voice" — his full story with photo
5. **Ministries** — CCC PraiseVille + ShaddaiVille (links to shaddaiville.org)
6. **Videos** — 4 real YouTube embeds from @cccpraiseville
7. **Books** — 4 verified Lambert Academic Publishing titles **with Paystack Buy Now**
8. **Press** — Glitterati banner + 6 media features + career timeline
9. **Speaking** — Speaker-for-hire positioning + upcoming events
10. **Journal Teaser** — Latest 3 blog posts (links to /news)
11. **Contact** — Form with inquiry-type dropdown
12. **Footer** — Email subscribe + live visitor count

### Separate Pages
- `/news` — Blog listing with category filter + search
- `/news/:slug` — Individual articles with subscribe CTA + related posts

---

## Three Live Integrations

### 1. Email Newsletter (Formspree)

The site collects emails in **two places**: the footer (every page) and below every news article.

**Setup (free, 5 minutes):**

1. Go to [formspree.io](https://formspree.io/) and sign up (free tier: 50 submissions/month).
2. Create a new form named "Newsletter Subscribers".
3. Copy the form ID (looks like `xpzgkqyw`).
4. Open `src/lib/config.js` and replace:
   ```js
   endpoint: "https://formspree.io/f/YOUR_FORMSPREE_ID",
   ```
   with:
   ```js
   endpoint: "https://formspree.io/f/xpzgkqyw",
   ```
5. Do the same for the contact form — create a second Formspree form named "Contact Form" and update `CONTACT_FORM.endpoint`.

**Important:** Until these are set up, subscriber emails are saved to `localStorage` in the visitor's browser so nothing is lost. As soon as you add the Formspree IDs, all future submissions go to your Formspree inbox.

For higher volume: swap Formspree for Mailchimp, ConvertKit, or Beehiiv. Same pattern, different URL.

### 2. Real-time Visitor Counter (CounterAPI)

The footer shows a pulsing green dot with the total site visit count. Updates live every 8 seconds.

Uses **CounterAPI.dev** — completely free, no signup, no auth required. The namespace is already configured for `kunlehamilton`. No setup needed.

### 3. Paystack Book Purchase

Every book card has a **Buy Now** button. Clicking opens a modal where the visitor enters name and email, then Paystack handles payment (all Nigerian cards, USSD, bank transfer).

**Setup (5 minutes):**

1. Sign up at [paystack.com](https://paystack.com/).
2. Go to Settings → Developer → Copy your **Public Key**.
3. Use the `pk_test_...` key during testing; switch to `pk_live_...` before launch.
4. Open `src/lib/config.js` and replace `pk_test_YOUR_PAYSTACK_PUBLIC_KEY` with your actual key.

**Book prices** are set in `src/App.jsx` (find the `books` array in the `Books()` component). All amounts are in Naira; Paystack converts to kobo internally.

**Receiving notifications:** Paystack sends payment confirmations to the merchant email registered on your Paystack dashboard. You'll see every purchase in your dashboard with the buyer's name, email, and which book they bought.

---

## News & Blog System

### Adding a new post

Edit `src/data/posts.js` and add to the top of the `posts` array:

```js
{
  slug: "your-post-url-slug",
  title: "Your Post Title",
  excerpt: "Short one-paragraph summary",
  category: "Doctrine",
  date: "2026-05-13",
  readTime: "5 min read",
  image: "/some-photo.jpg",
  body: `
First paragraph here.

**Subheading**

Another paragraph. Use **bold** for emphasis.
  `
}
```

The post appears immediately on `/news` with full filtering, search, and an individual page at `/news/your-post-url-slug`.

---

## File Structure

```
src/
├── App.jsx               # Single-page main site
├── main.jsx              # Router: /, /news, /news/:slug
├── data/
│   └── posts.js          # All blog posts — add new ones here
├── pages/
│   ├── News.jsx          # Blog listing page
│   └── NewsPost.jsx      # Individual article page
└── lib/
    ├── config.js         # ALL integration keys — edit this first
    ├── subscribe.js      # Email subscribe hook
    ├── visitorCount.js   # Live visitor counter hook
    ├── paystack.js       # Paystack inline checkout hook
    ├── BaseStyles.jsx    # Shared CSS for News pages
    └── SharedFooter.jsx  # Footer with subscribe + live count
```

---

## Local Development

```bash
npm install
npm run dev
```

Site runs at `http://localhost:5173`.

---

## Deployment

Push to `main` and Vercel auto-deploys.

```bash
git add -A
git commit -m "Your commit message"
git push origin main
```

`vercel.json` is configured to rewrite all routes to `/` so React Router handles `/news` and `/news/:slug` correctly.

---

## Launch Checklist

- [ ] Replaced `YOUR_FORMSPREE_ID` in `src/lib/config.js` (twice — newsletter + contact)
- [ ] Replaced `pk_test_YOUR_PAYSTACK_PUBLIC_KEY` with real Paystack key
- [ ] Switched from `pk_test_` to `pk_live_` before going live
- [ ] Verified each book's price in `src/App.jsx`
- [ ] Tested the buy flow end-to-end with a test Paystack card
- [ ] Tested subscribe form (footer + news article)
- [ ] Pointed `kunlehamilton.com` DNS to Vercel

---

## Credits

Built by [JAA](https://github.com/buildwithjohn) (John Ayomide Akinola) for Dr. Kunle Hamilton.

© 2026 Dr. Kunle Hamilton. All rights reserved.
