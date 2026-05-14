import { useState } from "react";
import { Link, useParams, useNavigate, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../components/Layout";
import Reveal from "../components/Reveal";
import { useSubscribe } from "../lib/subscribe";
import { getPostBySlug, getRelatedPosts } from "../data/posts";

export default function NewsPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = getPostBySlug(slug);
  const related = getRelatedPosts(slug, 3);
  const [email, setEmail] = useState("");
  const { status, message, subscribe } = useSubscribe();

  if (!post) return <Navigate to="/news" replace />;

  const fmt = (d) =>
    new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  const renderParagraph = (text, key) => {
    const isHeading = text.startsWith("**") && text.endsWith("**") && !text.slice(2, -2).includes("**");
    if (isHeading) return <h3 key={key} className="np-h3">{text.slice(2, -2)}</h3>;
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return (
      <p key={key} className="np-p">
        {parts.map((part, i) =>
          part.startsWith("**") && part.endsWith("**") ? <strong key={i}>{part.slice(2, -2)}</strong> : <span key={i}>{part}</span>
        )}
      </p>
    );
  };

  const paragraphs = post.body.trim().split(/\n\n+/).map((p) => p.trim()).filter(Boolean);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    const ok = await subscribe(email, { source: `article-${slug}` });
    if (ok) setEmail("");
  };

  return (
    <Layout title={post.title} description={post.excerpt}>
      <style>{`
        .np-hero { position: relative; padding: 9.5rem var(--gutter) 4.5rem; background: var(--ink); color: var(--white); overflow: hidden; }
        .np-hero-bg { position: absolute; inset: 0; opacity: 0.22; }
        .np-hero-bg img { width: 100%; height: 100%; object-fit: cover; filter: blur(18px) saturate(0.6); }
        .np-hero-bg::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(9,21,42,0.55) 0%, rgba(9,21,42,0.95) 100%); }
        .np-hero-inner { position: relative; z-index: 2; max-width: 900px; }
        .np-hero-back { display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.65rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--gold3); margin-bottom: 2.5rem; transition: gap 0.2s; }
        .np-hero-back:hover { gap: 0.9rem; }
        .np-hero-meta { display: flex; gap: 1rem; align-items: center; margin-bottom: 1.2rem; flex-wrap: wrap; }
        .np-hero-cat { font-size: 0.58rem; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: var(--gold); padding: 0.35rem 0.85rem; border: 1px solid var(--gold); border-radius: 2px; }
        .np-hero-date, .np-hero-read { font-size: 0.72rem; font-weight: 300; color: rgba(255,255,255,0.55); display: inline-flex; align-items: center; gap: 0.35rem; }
        .np-hero-date i, .np-hero-read i { color: var(--gold3); }
        .np-hero h1 { font-family: var(--serif); font-size: clamp(2.2rem, 5.5vw, 4.4rem); font-weight: 300; line-height: 1.05; letter-spacing: -0.015em; margin-bottom: 1.5rem; }
        .np-hero h1 strong { font-weight: 700; }
        .np-hero-excerpt { font-family: var(--serif); font-size: clamp(1rem, 1.4vw, 1.15rem); font-weight: 400; font-style: italic; line-height: 1.65; color: rgba(255,255,255,0.78); max-width: 720px; }

        .np-feature-img { width: 100%; aspect-ratio: 16/8; overflow: hidden; }
        .np-feature-img img { width: 100%; height: 100%; object-fit: cover; object-position: center 22%; }

        .np-body { max-width: 720px; margin: 0 auto; padding: 4.5rem var(--gutter) 5rem; position: relative; }
        .np-p { font-family: 'Charter', 'Georgia', serif; font-size: 1.1rem; line-height: 1.85; color: var(--ink); margin-bottom: 1.4rem; font-weight: 400; }
        .np-p:first-of-type::first-letter {
          font-family: var(--serif);
          font-size: 4.6rem;
          font-weight: 400;
          font-style: italic;
          float: left;
          line-height: 0.85;
          margin: 0.4rem 0.7rem 0 0;
          color: var(--gold);
        }
        .np-h3 { font-family: var(--serif); font-size: 1.5rem; font-weight: 500; color: var(--ink); margin: 2.6rem 0 1rem; line-height: 1.3; letter-spacing: -0.005em; display: flex; align-items: center; gap: 0.7rem; }
        .np-h3::before {
          content: '';
          width: 24px;
          height: 2px;
          background: var(--gold);
          flex-shrink: 0;
        }

        .np-share { max-width: 720px; margin: 0 auto; padding: 1.5rem var(--gutter); border-top: 1px solid var(--border-l); border-bottom: 1px solid var(--border-l); display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }
        .np-share-label { font-size: 0.62rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted-l); }
        .np-share-btns { display: flex; gap: 0.6rem; }
        .np-share-btn { width: 38px; height: 38px; border: 1px solid var(--border-l); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--muted-l); font-size: 1rem; transition: all 0.25s; cursor: pointer; background: transparent; }
        .np-share-btn:hover { background: var(--gold); border-color: var(--gold); color: var(--white); transform: translateY(-2px); }

        .np-subscribe { background: var(--warm2); border-top: 3px solid var(--gold); padding: 4rem var(--gutter); }
        .np-subscribe-inner { max-width: 720px; margin: 0 auto; text-align: center; }
        .np-subscribe-eyebrow { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; font-size: 0.58rem; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: var(--gold); margin-bottom: 1rem; }
        .np-subscribe h2 { font-family: var(--serif); font-size: clamp(1.6rem, 3vw, 2.3rem); font-weight: 300; line-height: 1.2; color: var(--ink); margin-bottom: 0.7rem; }
        .np-subscribe h2 em { font-style: italic; color: var(--gold); }
        .np-subscribe p { font-size: 0.92rem; font-weight: 300; line-height: 1.65; color: var(--muted-l); margin-bottom: 1.8rem; }
        .np-subscribe-form { display: flex; gap: 0.6rem; max-width: 460px; margin: 0 auto; flex-wrap: wrap; justify-content: center; }
        .np-subscribe-form input { flex: 1; min-width: 200px; padding: 0.85rem 1rem; border: 1px solid var(--border-l); background: var(--warm); font-family: var(--sans); font-size: 0.9rem; outline: none; border-radius: 3px; }
        .np-subscribe-form input:focus { border-color: var(--gold); }
        .np-subscribe-msg { margin-top: 1rem; font-size: 0.85rem; color: var(--gold); }

        .np-related { padding: 5rem var(--gutter); background: var(--warm); }
        .np-related-hd { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2.5rem; flex-wrap: wrap; gap: 1rem; }
        .np-related h3 { font-family: var(--serif); font-size: clamp(1.7rem, 3.2vw, 2.4rem); font-weight: 300; color: var(--ink); }
        .np-related h3 em { font-style: italic; color: var(--gold); }
        .np-related-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.6rem; }
        @media (max-width: 900px) { .np-related-grid { grid-template-columns: 1fr; } }
        .np-rcard { border: 1px solid var(--border-l); border-radius: 4px; overflow: hidden; cursor: pointer; transition: all 0.35s var(--ease-out); display: flex; flex-direction: column; }
        .np-rcard:hover { transform: translateY(-3px); box-shadow: var(--shadow-2); border-color: var(--gold); }
        .np-rcard-img { aspect-ratio: 16/10; overflow: hidden; }
        .np-rcard-img img { width: 100%; height: 100%; object-fit: cover; object-position: center 25%; transition: transform 0.5s; }
        .np-rcard:hover .np-rcard-img img { transform: scale(1.04); }
        .np-rcard-body { padding: 1.3rem 1.5rem; }
        .np-rcard-cat { font-size: 0.55rem; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: var(--gold); margin-bottom: 0.5rem; display: block; }
        .np-rcard-title { font-family: var(--serif); font-size: 1.1rem; font-weight: 400; font-style: italic; color: var(--ink); line-height: 1.3; }
      `}</style>

      {/* Hero */}
      <section className="np-hero">
        <div className="np-hero-bg">
          <img src={post.image} alt="" />
        </div>
        <motion.div
          className="np-hero-inner"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Link to="/news" className="np-hero-back">
            <i className="bi bi-arrow-left" /> Back to all articles
          </Link>
          <div className="np-hero-meta">
            <span className="np-hero-cat">{post.category}</span>
            <span className="np-hero-date"><i className="bi bi-calendar3" /> {fmt(post.date)}</span>
            <span className="np-hero-read"><i className="bi bi-clock" /> {post.readTime}</span>
          </div>
          <h1>{post.title}</h1>
          <p className="np-hero-excerpt">{post.excerpt}</p>
        </motion.div>
      </section>

      <div className="np-feature-img">
        <img src={post.image} alt={post.title} />
      </div>

      <article className="np-body">
        {paragraphs.map((p, i) => renderParagraph(p, i))}
      </article>

      {/* Share strip */}
      <div className="np-share">
        <span className="np-share-label"><i className="bi bi-share-fill" /> Share this article</span>
        <div className="np-share-btns">
          <button className="np-share-btn" onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`, "_blank")} aria-label="Share on Twitter">
            <i className="bi bi-twitter-x" />
          </button>
          <button className="np-share-btn" onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, "_blank")} aria-label="Share on Facebook">
            <i className="bi bi-facebook" />
          </button>
          <button className="np-share-btn" onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, "_blank")} aria-label="Share on LinkedIn">
            <i className="bi bi-linkedin" />
          </button>
          <button className="np-share-btn" onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(post.title + " " + window.location.href)}`, "_blank")} aria-label="Share on WhatsApp">
            <i className="bi bi-whatsapp" />
          </button>
          <button className="np-share-btn" onClick={() => { navigator.clipboard.writeText(window.location.href); }} aria-label="Copy link">
            <i className="bi bi-link-45deg" />
          </button>
        </div>
      </div>

      {/* Subscribe */}
      <section className="np-subscribe">
        <div className="np-subscribe-inner">
          <div className="np-subscribe-eyebrow"><i className="bi bi-envelope-paper" /> Stay Connected</div>
          <h2>Get more from <em>Dr. Hamilton</em></h2>
          <p>New articles, books, sermons and media features — delivered directly to your inbox. No spam, ever.</p>
          <form className="np-subscribe-form" onSubmit={handleSubscribe}>
            <input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <button type="submit" className="btn" disabled={status === "submitting" || status === "success"}>
              {status === "success" ? <><i className="bi bi-check-lg" /> Subscribed</> : status === "submitting" ? <><i className="bi bi-arrow-clockwise" /> ...</> : <>Subscribe <i className="bi bi-arrow-right" /></>}
            </button>
          </form>
          {status === "success" && <p className="np-subscribe-msg">{message}</p>}
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="np-related">
          <div className="np-related-hd">
            <h3>More <em>articles</em></h3>
            <Link to="/news" className="btn btn-ghost">All Articles <i className="bi bi-arrow-right" /></Link>
          </div>
          <div className="np-related-grid">
            {related.map((r) => (
              <article key={r.slug} className="np-rcard" onClick={() => navigate(`/news/${r.slug}`)}>
                <div className="np-rcard-img"><img src={`/thumbs${r.image}`} alt={r.title} loading="lazy" /></div>
                <div className="np-rcard-body">
                  <span className="np-rcard-cat">{r.category}</span>
                  <h4 className="np-rcard-title">{r.title}</h4>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </Layout>
  );
}
