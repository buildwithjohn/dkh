import { useState, useEffect } from "react";
import { Link, useParams, useNavigate, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BaseStyles } from "../lib/BaseStyles";
import { SharedFooter } from "../lib/SharedFooter";
import { useSubscribe } from "../lib/subscribe";
import { getPostBySlug, getRelatedPosts } from "../data/posts";

export default function NewsPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const { status, message, subscribe } = useSubscribe();

  const post = getPostBySlug(slug);
  const related = getRelatedPosts(slug, 3);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  // Update document title and meta description for SEO + social sharing
  useEffect(() => {
    if (!post) return;
    document.title = `${post.title} · Dr. Kunle Hamilton`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", post.excerpt);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", post.title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", post.excerpt);
  }, [post]);

  if (!post) return <Navigate to="/news" replace />;

  const fmt = (d) =>
    new Date(d).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  // Parse body — split on blank lines, render paragraphs.
  // Bold inline: **text** → <strong>text</strong>
  const renderParagraph = (text, key) => {
    const isHeading = text.startsWith("**") && text.endsWith("**") && !text.slice(2, -2).includes("**");
    if (isHeading) {
      return <h3 key={key} className="post-h3">{text.slice(2, -2)}</h3>;
    }
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return (
      <p key={key} className="post-p">
        {parts.map((part, i) =>
          part.startsWith("**") && part.endsWith("**") ? (
            <strong key={i}>{part.slice(2, -2)}</strong>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </p>
    );
  };

  const paragraphs = post.body
    .trim()
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    const ok = await subscribe(email, { source: `article-${slug}` });
    if (ok) setEmail("");
  };

  return (
    <>
      <BaseStyles />
      <style>{`
        .post-hero { position: relative; padding: 10rem 7vw 4rem; background: var(--ink); color: var(--white); overflow: hidden; }
        .post-hero-bg { position: absolute; inset: 0; opacity: .25; }
        .post-hero-bg img { width: 100%; height: 100%; object-fit: cover; filter: blur(20px) saturate(0.6); }
        .post-hero-bg::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(9,21,42,.6) 0%, rgba(9,21,42,.95) 100%); }
        .post-hero-inner { position: relative; z-index: 2; max-width: 920px; }
        .post-hero-back { display: inline-flex; align-items: center; gap: .5rem; font-size: .65rem; font-weight: 700; letter-spacing: .15em; text-transform: uppercase; color: #93C5FD; margin-bottom: 2.5rem; transition: gap .2s; }
        .post-hero-back:hover { gap: .8rem; }
        .post-hero-meta { display: flex; gap: 1rem; align-items: center; margin-bottom: 1.2rem; flex-wrap: wrap; }
        .post-hero-cat { font-size: .58rem; font-weight: 700; letter-spacing: .22em; text-transform: uppercase; color: var(--gold); padding: .35rem .75rem; border: 1px solid var(--gold); border-radius: 2px; }
        .post-hero-date { font-size: .72rem; font-weight: 300; color: rgba(255,255,255,.55); }
        .post-hero-read { font-size: .72rem; font-weight: 300; color: rgba(255,255,255,.55); }
        .post-hero h1 { font-family: var(--serif); font-size: clamp(2.2rem, 5.5vw, 4.4rem); font-weight: 300; line-height: 1.08; letter-spacing: -.015em; margin-bottom: 1.5rem; }
        .post-hero-excerpt { font-size: clamp(.95rem, 1.4vw, 1.1rem); font-weight: 300; line-height: 1.65; color: rgba(255,255,255,.75); max-width: 720px; font-style: italic; font-family: var(--serif); }

        .post-image-feature { width: 100%; aspect-ratio: 16/8; overflow: hidden; }
        .post-image-feature img { width: 100%; height: 100%; object-fit: cover; object-position: center 22%; }

        .post-body { max-width: 720px; margin: 0 auto; padding: 4.5rem 7vw 5rem; }
        .post-p { font-family: 'Charter', 'Georgia', serif; font-size: 1.1rem; line-height: 1.85; color: var(--ink); margin-bottom: 1.4rem; font-weight: 400; }
        .post-p:first-letter { /* could add drop-cap if desired */ }
        .post-h3 { font-family: var(--serif); font-size: 1.5rem; font-weight: 400; color: var(--ink); margin: 2.5rem 0 1rem; line-height: 1.3; letter-spacing: -.005em; }

        /* Mid-content subscribe block */
        .post-subscribe { background: var(--warm2); border-top: 3px solid var(--gold); padding: 4rem 7vw; }
        .post-subscribe-inner { max-width: 720px; margin: 0 auto; text-align: center; }
        .post-subscribe-tag { font-size: .6rem; font-weight: 700; letter-spacing: .25em; text-transform: uppercase; color: var(--gold); margin-bottom: 1rem; }
        .post-subscribe h2 { font-family: var(--serif); font-size: clamp(1.5rem, 3vw, 2.2rem); font-weight: 300; color: var(--ink); margin-bottom: .8rem; line-height: 1.2; }
        .post-subscribe h2 em { font-style: italic; color: var(--gold); }
        .post-subscribe p { font-size: .9rem; font-weight: 300; line-height: 1.65; color: var(--muted-l); margin-bottom: 1.8rem; }
        .post-subscribe-form { display: flex; gap: .6rem; max-width: 460px; margin: 0 auto; flex-wrap: wrap; justify-content: center; }
        .post-subscribe-form input { flex: 1; min-width: 200px; padding: .85rem 1rem; border: 1px solid var(--border-l); background: var(--warm); font-family: var(--sans); font-size: .9rem; outline: none; border-radius: 3px; }
        .post-subscribe-form input:focus { border-color: var(--gold); }
        .post-subscribe-form button { background: var(--gold); color: var(--white); border: none; font-size: .68rem; font-weight: 700; letter-spacing: .15em; text-transform: uppercase; padding: 0 1.6rem; border-radius: 3px; cursor: pointer; transition: background .25s; }
        .post-subscribe-form button:hover { background: var(--gold2); }
        .post-subscribe-form button:disabled { opacity: .5; }
        .post-subscribe-msg { margin-top: 1rem; font-size: .8rem; color: var(--gold); }

        /* Related */
        .related { padding: 5rem 7vw; background: var(--warm); }
        .related-hd { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2.5rem; flex-wrap: wrap; gap: 1rem; }
        .related h3 { font-family: var(--serif); font-size: clamp(1.6rem, 3.5vw, 2.4rem); font-weight: 300; color: var(--ink); }
        .related h3 em { font-style: italic; color: var(--gold); }
        .related-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
        @media(max-width:900px){ .related-grid { grid-template-columns: 1fr; } }
        .related-card { border: 1px solid var(--border-l); overflow: hidden; cursor: pointer; transition: all .35s; display: flex; flex-direction: column; }
        .related-card:hover { transform: translateY(-3px); box-shadow: 0 12px 40px -20px rgba(9,21,42,.2); border-color: var(--gold); }
        .related-card-img { aspect-ratio: 16/10; overflow: hidden; }
        .related-card-img img { width: 100%; height: 100%; object-fit: cover; object-position: center 25%; transition: transform .5s; }
        .related-card:hover .related-card-img img { transform: scale(1.04); }
        .related-card-body { padding: 1.3rem 1.4rem; }
        .related-card-cat { font-size: .55rem; font-weight: 700; letter-spacing: .2em; text-transform: uppercase; color: var(--gold); margin-bottom: .5rem; display: block; }
        .related-card-title { font-family: var(--serif); font-size: 1.1rem; font-weight: 300; font-style: italic; color: var(--ink); line-height: 1.3; }
      `}</style>

      {/* Nav */}
      <motion.header
        className={`nav${scrolled ? " s" : ""}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: .7 }}
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
          <span className="hl" /><span className="hl" /><span className="hl" />
        </button>
      </motion.header>

      {open && (
        <div className="mob">
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/news" onClick={() => setOpen(false)}>News</Link>
          <Link to="/#contact" onClick={() => setOpen(false)} className="nav-cta">Invite Dr. Hamilton</Link>
        </div>
      )}

      {/* Hero */}
      <section className="post-hero">
        <div className="post-hero-bg">
          <img src={post.image} alt="" />
        </div>
        <motion.div
          className="post-hero-inner"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .7 }}
        >
          <Link to="/news" className="post-hero-back">← Back to all articles</Link>
          <div className="post-hero-meta">
            <span className="post-hero-cat">{post.category}</span>
            <span className="post-hero-date">{fmt(post.date)}</span>
            <span className="post-hero-read">· {post.readTime}</span>
          </div>
          <h1>{post.title}</h1>
          <p className="post-hero-excerpt">{post.excerpt}</p>
        </motion.div>
      </section>

      {/* Feature image */}
      <div className="post-image-feature">
        <img src={post.image} alt={post.title} />
      </div>

      {/* Body */}
      <article className="post-body">
        {paragraphs.map((p, i) => renderParagraph(p, i))}
      </article>

      {/* Subscribe CTA */}
      <section className="post-subscribe">
        <div className="post-subscribe-inner">
          <div className="post-subscribe-tag">Stay Connected</div>
          <h2>Get more from <em>Dr. Hamilton</em></h2>
          <p>New articles, books, sermons and media features — delivered directly to your inbox. No spam, ever.</p>
          <form className="post-subscribe-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" disabled={status === "submitting" || status === "success"}>
              {status === "success" ? "Subscribed ✓" : status === "submitting" ? "..." : "Subscribe"}
            </button>
          </form>
          {status === "success" && <p className="post-subscribe-msg">{message}</p>}
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="related">
          <div className="related-hd">
            <h3>More <em>articles</em></h3>
            <Link to="/news" className="btn-ghost">All Articles →</Link>
          </div>
          <div className="related-grid">
            {related.map((r) => (
              <article key={r.slug} className="related-card" onClick={() => navigate(`/news/${r.slug}`)}>
                <div className="related-card-img"><img src={r.image} alt={r.title} loading="lazy" /></div>
                <div className="related-card-body">
                  <span className="related-card-cat">{r.category}</span>
                  <h4 className="related-card-title">{r.title}</h4>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      <SharedFooter />
    </>
  );
}
