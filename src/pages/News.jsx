import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BaseStyles } from "../lib/BaseStyles";
import { SharedFooter } from "../lib/SharedFooter";
import { posts } from "../data/posts";

export default function News() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Scroll to top on page load
  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Dynamic page title for SEO
  useEffect(() => {
    document.title = "News & Blog · Dr. Kunle Hamilton";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", "Essays, sermons, media commentary and ministry updates from Dr. Kunle Hamilton — Nigeria's foremost prophet-scholar.");
  }, []);

  const categories = ["All", ...new Set(posts.map((p) => p.category))];
  const filtered = posts.filter((p) => {
    const matchCat = category === "All" || p.category === category;
    const matchSearch =
      search === "" ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const fmt = (d) =>
    new Date(d).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <>
      <BaseStyles />
      <style>{`
        .news-hero { padding: 10rem 7vw 5rem; background: var(--ink); color: var(--white); }
        .news-hero-stag { font-size: .58rem; font-weight: 700; letter-spacing: .32em; text-transform: uppercase; color: #93C5FD; margin-bottom: 1.4rem; display: inline-flex; align-items: center; gap: .8rem; }
        .news-hero-stag::before { content: ''; width: 32px; height: 1.5px; background: #93C5FD; }
        .news-hero h1 { font-family: var(--serif); font-size: clamp(2.8rem, 7vw, 6rem); font-weight: 300; line-height: .95; letter-spacing: -.02em; margin-bottom: 1.4rem; }
        .news-hero h1 em { font-style: italic; color: #93C5FD; }
        .news-hero p { font-size: clamp(.92rem, 1.4vw, 1.05rem); font-weight: 300; line-height: 1.7; color: rgba(255,255,255,.65); max-width: 640px; }

        /* Filters */
        .news-filters { padding: 2rem 7vw; background: var(--warm2); border-bottom: 1px solid var(--border-l); display: flex; justify-content: space-between; align-items: center; gap: 2rem; flex-wrap: wrap; }
        .news-cats { display: flex; gap: .6rem; flex-wrap: wrap; }
        .news-cat {
          font-size: .62rem; font-weight: 700; letter-spacing: .15em; text-transform: uppercase;
          padding: .55rem 1.1rem; border: 1px solid var(--border-l); background: transparent;
          color: var(--muted-l); cursor: pointer; border-radius: 3px;
          transition: all .2s;
        }
        .news-cat:hover { color: var(--ink); border-color: var(--ink); }
        .news-cat.on { background: var(--gold); color: var(--white); border-color: var(--gold); }
        .news-search {
          padding: .65rem 1rem; border: 1px solid var(--border-l); background: var(--warm);
          font-family: var(--sans); font-size: .82rem; font-weight: 300; outline: none;
          border-radius: 3px; min-width: 240px;
          transition: border-color .2s;
        }
        .news-search:focus { border-color: var(--gold); }

        /* Grid */
        .news-grid { padding: 4rem 7vw 6rem; display: grid; grid-template-columns: repeat(3, 1fr); gap: 3rem; background: var(--warm); }
        @media(max-width:1000px){ .news-grid { grid-template-columns: repeat(2, 1fr); } }
        @media(max-width:640px){ .news-grid { grid-template-columns: 1fr; padding: 3rem 7vw; gap: 2rem; } }

        .post-card { background: var(--warm); border: 1px solid var(--border-l); overflow: hidden; transition: all .35s; display: flex; flex-direction: column; cursor: pointer; }
        .post-card:hover { transform: translateY(-4px); box-shadow: 0 18px 50px -20px rgba(9,21,42,.20); border-color: var(--gold); }
        .post-card-img { aspect-ratio: 16/10; overflow: hidden; }
        .post-card-img img { width: 100%; height: 100%; object-fit: cover; object-position: center 25%; transition: transform .6s; }
        .post-card:hover .post-card-img img { transform: scale(1.05); }
        .post-card-body { padding: 1.8rem; display: flex; flex-direction: column; flex: 1; }
        .post-card-meta { display: flex; gap: .8rem; align-items: center; margin-bottom: .9rem; }
        .post-card-cat { font-size: .55rem; font-weight: 700; letter-spacing: .2em; text-transform: uppercase; color: var(--gold); }
        .post-card-sep { width: 3px; height: 3px; border-radius: 50%; background: var(--border-l); }
        .post-card-date { font-size: .65rem; font-weight: 400; color: var(--muted-l); }
        .post-card-title { font-family: var(--serif); font-size: 1.35rem; font-weight: 300; line-height: 1.25; color: var(--ink); margin-bottom: .8rem; font-style: italic; }
        .post-card-excerpt { font-size: .82rem; font-weight: 300; line-height: 1.65; color: var(--muted-l); margin-bottom: 1.4rem; flex: 1; }
        .post-card-foot { display: flex; justify-content: space-between; align-items: center; padding-top: 1rem; border-top: 1px solid var(--border-l); }
        .post-card-read { font-size: .6rem; font-weight: 700; letter-spacing: .15em; text-transform: uppercase; color: var(--muted-l); }
        .post-card-arrow { font-size: .65rem; font-weight: 700; letter-spacing: .15em; text-transform: uppercase; color: var(--ink); display: inline-flex; align-items: center; gap: .35rem; transition: gap .25s, color .25s; }
        .post-card:hover .post-card-arrow { color: var(--gold); gap: .65rem; }

        .empty { padding: 6rem 7vw; text-align: center; color: var(--muted-l); font-size: 1rem; }
      `}</style>

      {/* Nav */}
      <motion.header
        className={`nav${scrolled ? " s" : ""}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: .7, ease: [.22, 1, .36, 1] }}
      >
        <Link to="/" className="logo">Dr. Kunle <em>Hamilton</em></Link>
        <div className="nav-links">
          <Link to="/#about" className="nl">About</Link>
          <Link to="/#books" className="nl">Books</Link>
          <Link to="/#press" className="nl">Press</Link>
          <Link to="/news" className="nl active">News</Link>
          <Link to="/#speaking" className="nl">Speaking</Link>
        </div>
        <Link to="/#contact" className="nav-cta">Invite Dr. Hamilton</Link>
        <button className="ham" onClick={() => setOpen(!open)} aria-label="Menu">
          <span className="hl" />
          <span className="hl" />
          <span className="hl" />
        </button>
      </motion.header>

      {open && (
        <div className="mob">
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/#about" onClick={() => setOpen(false)}>About</Link>
          <Link to="/#books" onClick={() => setOpen(false)}>Books</Link>
          <Link to="/#press" onClick={() => setOpen(false)}>Press</Link>
          <Link to="/news" onClick={() => setOpen(false)}>News</Link>
          <Link to="/#speaking" onClick={() => setOpen(false)}>Speaking</Link>
          <Link to="/#contact" onClick={() => setOpen(false)} className="nav-cta">Invite Dr. Hamilton</Link>
        </div>
      )}

      {/* Hero */}
      <section className="news-hero">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .8, ease: [.22, 1, .36, 1] }}
        >
          <div className="news-hero-stag">News · Blog · Commentary</div>
          <h1>
            The <em>Hamilton</em> Journal
          </h1>
          <p>
            Essays, sermons in print, media commentary, ministry updates and exclusive features.
            Direct from Dr. Hamilton's desk, in the same prophetic-scholarly voice that has shaped
            Nigerian discourse for four decades.
          </p>
        </motion.div>
      </section>

      {/* Filters */}
      <div className="news-filters">
        <div className="news-cats">
          {categories.map((c) => (
            <button
              key={c}
              className={`news-cat${c === category ? " on" : ""}`}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <input
          className="news-search"
          type="search"
          placeholder="Search articles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="empty">No articles match your search. Try a different category or keyword.</div>
      ) : (
        <div className="news-grid">
          {filtered.map((post, i) => (
            <motion.article
              key={post.slug}
              className="post-card"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * .07, duration: .5, ease: [.22, 1, .36, 1] }}
              onClick={() => navigate(`/news/${post.slug}`)}
            >
              <div className="post-card-img">
                <img src={post.image} alt={post.title} loading="lazy" />
              </div>
              <div className="post-card-body">
                <div className="post-card-meta">
                  <span className="post-card-cat">{post.category}</span>
                  <span className="post-card-sep" />
                  <span className="post-card-date">{fmt(post.date)}</span>
                </div>
                <h2 className="post-card-title">{post.title}</h2>
                <p className="post-card-excerpt">{post.excerpt}</p>
                <div className="post-card-foot">
                  <span className="post-card-read">{post.readTime}</span>
                  <span className="post-card-arrow">Read →</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      )}

      <SharedFooter />
    </>
  );
}
