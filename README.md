# Dr. Kunle Hamilton — Personal Website

The official personal website of **Dr. Kunle Hamilton** — Nigeria's foremost prophet-scholar. Prophet of the Celestial Church of Christ, Senior Shepherd of CCC PraiseVille Global, Founder of ShaddaiVille Ministries International, international author, veteran journalist, and pioneer of *The Glitterati* in ThisDAY newspaper.

Live: [kunlehamilton.com](https://kunlehamilton.com)

---

## Tech Stack

- **React 19** + **Vite 8**
- **React Router 7** — multi-page architecture with code splitting via `React.lazy`
- **Framer Motion** — scroll-triggered reveals, page transitions
- **Bootstrap Icons 1.11** — via CDN
- **Paystack** — Nigerian Naira book purchases
- **Formspree** — email collection (free tier)
- **CounterAPI** — live visitor counting (free, no auth)
- **Vercel** — hosting + SPA routing

---

## Architecture

The site is now **multi-page**. Each major topic has its own route. The home page is intentionally lean — hero, three pillar teasers, latest journal posts, and a CTA. Visitors deep-dive into individual pages.

### Routes
| Path | Page |
|---|---|
| `/` | Home — lean overview, hero, pillars, latest articles |
| `/about` | Full biography, roles, education |
| `/ministries` | CCC PraiseVille Global + ShaddaiVille Int'l |
| `/books` | 4 books with Paystack Buy Now |
| `/press` | The Glitterati, media features, career timeline |
| `/videos` | YouTube embeds — featured + grid |
| `/speaking` | Pitch, topics, upcoming events |
| `/contact` | Contact form (Formspree) |
| `/news` | Blog listing — category filter + search |
| `/news/:slug` | Individual article |

### Code Splitting
Only Home loads eagerly. Every other page is dynamically imported when the user navigates to it. This means:

- **First paint** = Home + global CSS ≈ 130KB gzipped
- **Each subsequent page** = 1-5KB gzipped chunk loaded on demand
- **Better Core Web Vitals** — LCP, FID, CLS all improve

### File Structure
```
src/
├── index.css                 # Global design tokens (CSS variables, fonts, btn)
├── main.jsx                  # Router setup + lazy loading
├── components/               # Shared UI
│   ├── Layout.jsx            # Page wrapper (Nav + Footer + page transitions)
│   ├── Nav.jsx               # Fixed top nav with active state
│   ├── Footer.jsx            # Subscribe form + live visitor count
│   ├── PageHero.jsx          # Reusable section page header
│   └── Reveal.jsx            # Scroll-triggered fade-up animation
├── pages/                    # One file per route
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Ministries.jsx
│   ├── Books.jsx
│   ├── Press.jsx
│   ├── Videos.jsx
│   ├── Speaking.jsx
│   ├── Contact.jsx
│   ├── News.jsx
│   └── NewsPost.jsx
├── lib/                      # Integration hooks
│   ├── config.js             # ⚠ All API keys live here
│   ├── subscribe.js          # useSubscribe — Formspree + localStorage fallback
│   ├── visitorCount.js       # useVisitorCount — CounterAPI live count
│   └── paystack.js           # usePaystack — book purchase modal
└── data/
    └── posts.js              # Blog post array (add new posts here)

public/
├── *.jpg                     # Full-size optimized photos (1400px max, q75)
└── thumbs/*.jpg              # 600px thumbnails for grids (q78)
```

---

## Performance

- **Photos**: Aggressively compressed. Originals 1400px @ q75 (~150-300KB each), thumbnails 600px @ q78 (~30-60KB each). All thumbs lazy-loaded.
- **Hero image** preloaded with `fetchpriority="high"` in `index.html`.
- **Code splitting**: Each route is its own JS chunk.
- **Bootstrap Icons**: CDN-served, cached by browser.
- **Fonts**: Preconnect + display:swap.
- **Framer Motion**: Single instance, used only where needed.

---

## Design System

Defined in `src/index.css` as CSS variables.

- **Colours**: Deep navy (`--ink`), electric blue (`--gold`), warm white (`--warm`).
- **Typography**: Fraunces (serif display, italic accents) + Manrope (sans, 200-800 weights).
- **Type scale**: Fluid clamp() — `--t-display`, `--t-h1`, `--t-h2`, `--t-h3`, `--t-body`.
- **Easing**: `cubic-bezier(0.22, 1, 0.36, 1)` everywhere.
- **Shadows**: Three layers (`--shadow-1`, `--shadow-2`, `--shadow-3`).

To rebrand: change the CSS variables in `:root` of `index.css`.

---

## Integrations

### 1. Email Newsletter (Formspree)

The site collects emails in two places: the footer (every page) and below every news article.

**Setup (free, 5 minutes):**

1. Go to [formspree.io](https://formspree.io) and sign up.
2. Create a form named "Newsletter Subscribers". Copy the form ID.
3. Open `src/lib/config.js` and replace `YOUR_FORMSPREE_ID` in `SUBSCRIBE.endpoint`.
4. Create a second form named "Contact Form" and update `CONTACT_FORM.endpoint`.

Until configured, submissions are saved to `localStorage` so nothing is lost.

### 2. Live Visitor Counter (CounterAPI)

Footer shows pulsing green dot + total visit count, updated every 8 seconds.

Uses [CounterAPI.dev](https://counterapi.dev) — free, no signup. Namespace `kunlehamilton` is pre-configured. No setup needed.

### 3. Paystack Book Purchase

Each book card opens a modal → captures buyer details → Paystack inline checkout.

**Setup:**

1. Sign up at [paystack.com](https://paystack.com).
2. Get your public key from Settings → Developer.
3. Replace `pk_test_YOUR_PAYSTACK_PUBLIC_KEY` in `src/lib/config.js`.
4. Switch from `pk_test_` to `pk_live_` before going live.

Book prices are in `src/pages/Books.jsx` (the `BOOKS` array, in Naira).

---

## News & Blog System

Add a new post by appending to the `posts` array in `src/data/posts.js`:

```js
{
  slug: "your-post-url-slug",
  title: "Your Post Title",
  excerpt: "Short summary",
  category: "Doctrine",
  date: "2026-05-14",
  readTime: "5 min read",
  image: "/some-photo.jpg",
  body: `
First paragraph.

**Subheading**

More content.
  `
}
```

The post appears immediately at `/news` and `/news/your-post-url-slug`.

---

## Local Development

```bash
npm install
npm run dev
```

Site runs at `http://localhost:5173`.

## Deployment

Push to `main` and Vercel auto-deploys. `vercel.json` is configured for SPA routing.

```bash
git add -A
git commit -m "Your commit message"
git push origin main
```

---

## Launch Checklist

- [ ] Replaced `YOUR_FORMSPREE_ID` in `src/lib/config.js` (twice — newsletter + contact)
- [ ] Replaced `pk_test_YOUR_PAYSTACK_PUBLIC_KEY` with real Paystack key
- [ ] Switched from `pk_test_` to `pk_live_` before going live
- [ ] Verified each book's price in `src/pages/Books.jsx`
- [ ] Tested the buy flow end-to-end with a test Paystack card
- [ ] Tested subscribe form (footer + news article)
- [ ] Pointed `kunlehamilton.com` DNS to Vercel

---

## Credits

Built by [JAA](https://github.com/buildwithjohn) (John Ayomide Akinola) for Dr. Kunle Hamilton.

© 2026 Dr. Kunle Hamilton. All rights reserved.
