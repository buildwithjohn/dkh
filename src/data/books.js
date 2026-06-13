// ─────────────────────────────────────────────────────────────────────────────
// BOOKS DATA
// Single source of truth for book listings, prices, and ebook delivery.
//
// ebook.type:
//   "local"   — PDF lives in /public/ebooks/<file>.pdf  (deliver value = filename)
//   "drive"   — Google Drive shareable link             (deliver value = full URL)
//   "dropbox" — Dropbox shared link                     (deliver value = full URL)
// ─────────────────────────────────────────────────────────────────────────────

export const books = [
  {
    slug: "releasing-the-eagle",
    n: "01",
    tag: "Leadership · Self-Development",
    title: "Releasing the Eagle in You",
    desc: "Dr. Hamilton's landmark inspirational work on leadership and self-actualization — an eight-chapter guide to unlocking the God-given greatness inside every person.",
    longDesc: "Drawing from four decades of pastoral ministry and corporate leadership coaching, Dr. Hamilton uses the metaphor of the eagle — the bird of the highest altitude — to teach readers how to break free from limiting environments, develop a vision-driven life, and walk in the fullness of their God-given calling.",
    pub: "Lambert Academic Publishing",
    countries: "18 European countries",
    amazonLink: "https://www.amazon.com",
    pages: 168,
    year: 2018,
    price: 4500,  // ebook price
    physicalPrice: 8500,  // physical book price (for context, sold on request)
    ebook: {
      type: "drive",                                    // local | drive | dropbox
      value: "https://drive.google.com/file/d/REPLACE_WITH_FILE_ID/view",
      filename: "Releasing-the-Eagle-in-You.pdf",        // shown to buyer in UI
    },
  },
  {
    slug: "journey-to-understanding",
    n: "02",
    tag: "Communication · Church Studies",
    title: "Journey to Understanding",
    desc: "An academic investigation into how style and content shape audience understanding. Uses his Nigerian church congregation and his Raypower 100.5 FM radio programme as the living laboratory.",
    longDesc: "Published from his Master's research, this volume examines how the same message is received differently when delivered through different media, registers and audiences. Required reading for pastors, broadcasters and communicators serious about the craft.",
    pub: "Lambert Academic Publishing · Amazon.com.be",
    countries: "Available across EU",
    amazonLink: "https://www.amazon.com.be",
    pages: 156,
    year: 2017,
    price: 5000,
    physicalPrice: 9500,
    ebook: {
      type: "drive",
      value: "https://drive.google.com/file/d/REPLACE_WITH_FILE_ID/view",
      filename: "Journey-to-Understanding.pdf",
    },
  },
  {
    slug: "new-media-and-democracy",
    n: "03",
    tag: "Politics · Digital Media",
    title: "New Media and Democracy",
    desc: "Nigeria's President and the Facebook Example. A pioneering study of how former President Goodluck Jonathan used Facebook in his 2011 campaign — one of Africa's first serious analyses of social media and electoral politics.",
    longDesc: "Before social-media-as-political-tool became the global conversation, Dr. Hamilton was already documenting how the Jonathan campaign had cracked the code. A foundational text for anyone studying African digital democracy.",
    pub: "Lambert Academic Publishing · Amazon.com",
    countries: "Global distribution",
    amazonLink: "https://www.amazon.com",
    pages: 184,
    year: 2016,
    price: 5000,
    physicalPrice: 9500,
    ebook: {
      type: "drive",
      value: "https://drive.google.com/file/d/REPLACE_WITH_FILE_ID/view",
      filename: "New-Media-and-Democracy.pdf",
    },
  },
  {
    slug: "nollywood-movie-subtitles",
    n: "04",
    tag: "Film · Media Studies",
    title: "Nollywood and the Challenge of Movie Subtitles",
    desc: "Co-authored with Yomi Daramola. A critical assessment of the Nollywood movie industry and the challenge of subtitling for global audiences — bridging Nigeria's film industry with international media scholarship.",
    longDesc: "A practical and theoretical exploration of why Nollywood's global expansion has been bottlenecked by subtitle quality, and what the industry can do to break through to international audiences.",
    pub: "Lambert Academic Publishing · Amazon.com.be",
    countries: "Available across EU",
    amazonLink: "https://www.amazon.com.be",
    pages: 142,
    year: 2019,
    price: 4500,
    physicalPrice: 8500,
    ebook: {
      type: "drive",
      value: "https://drive.google.com/file/d/REPLACE_WITH_FILE_ID/view",
      filename: "Nollywood-Movie-Subtitles.pdf",
    },
  },
];

export function getBookBySlug(slug) {
  return books.find((b) => b.slug === slug);
}
