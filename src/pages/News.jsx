import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import { BlobAccent, DotPattern, ScribbleUnderline } from "../components/Illustrations";
import { posts } from "../data/posts";

export default function News() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];
  const filtered = posts.filter((p) => {
    const okCat = category === "All" || p.category === category;
    const okSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase());
    return okCat && okSearch;
  });

  const fmt = (d) =>
    new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <Layout
      title="News & Blog"
      description="Essays, sermons, media commentary and ministry updates from Dr. Kunle Hamilton."
    >
      <style>{`
        .nw-filters { padding: 2rem var(--gutter); background: var(--warm2); border-bottom: 1px solid var(--border-l); display: flex; justify-content: space-between; align-items: center; gap: 2rem; flex-wrap: wrap; }
        .nw-cats { display: flex; gap: 0.5rem; flex-wrap: wrap; }
        .nw-cat {
          font-size: 0.62rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase;
          padding: 0.55rem 1.1rem; border: 1px solid var(--border-l); background: transparent;
          color: var(--muted-l); cursor: pointer; border-radius: 3px;
          transition: all 0.2s;
        }
        .nw-cat:hover { color: var(--ink); border-color: var(--ink); }
        .nw-cat.on { background: var(--gold); color: var(--white); border-color: var(--gold); }

        .nw-search-wrap { position: relative; }
        .nw-search-wrap i { position: absolute; left: 0.9rem; top: 50%; transform: translateY(-50%); color: var(--muted-l); font-size: 0.95rem; }
        .nw-search {
          padding: 0.7rem 1rem 0.7rem 2.5rem; border: 1px solid var(--border-l); background: var(--warm);
          font-family: var(--sans); font-size: 0.85rem; font-weight: 400; outline: none;
          border-radius: 3px; min-width: 260px;
          transition: border-color 0.2s;
        }
        .nw-search:focus { border-color: var(--gold); }

        .nw-grid { padding: 4rem var(--gutter) 6rem; display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; background: var(--warm); position: relative; overflow: hidden; }
        @media(max-width:1100px){ .nw-grid { grid-template-columns: repeat(2, 1fr); } }
        @media(max-width:640px){ .nw-grid { grid-template-columns: 1fr; padding: 3rem var(--gutter); } }
        .nw-blob1 { position: absolute; top: 5%; right: -200px; width: 450px; height: 450px; opacity: 0.4; pointer-events: none; z-index: 0; }
        .nw-blob2 { position: absolute; bottom: 10%; left: -200px; width: 400px; height: 400px; opacity: 0.4; pointer-events: none; z-index: 0; }

        .nw-post {
          background: var(--warm); border: 1px solid var(--border-l); border-radius: 8px;
          overflow: hidden; transition: all 0.4s var(--ease-out); cursor: pointer;
          display: flex; flex-direction: column; position: relative; z-index: 2;
        }
        .nw-post:hover { transform: translateY(-5px); box-shadow: 0 25px 50px -20px rgba(37,99,235,0.20); border-color: var(--gold); }
        .nw-post-img { aspect-ratio: 16/10; overflow: hidden; }
        .nw-post-img img { width: 100%; height: 100%; object-fit: cover; object-position: center 25%; transition: transform 0.6s; }
        .nw-post:hover .nw-post-img img { transform: scale(1.05); }
        .nw-post-body { padding: 1.7rem; display: flex; flex-direction: column; flex: 1; }
        .nw-post-meta { display: flex; gap: 0.8rem; align-items: center; margin-bottom: 0.9rem; }
        .nw-post-cat { font-size: 0.55rem; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: var(--gold); }
        .nw-post-dot { width: 3px; height: 3px; border-radius: 50%; background: var(--border-l); }
        .nw-post-date { font-size: 0.7rem; color: var(--muted-l); }
        .nw-post-title { font-family: var(--serif); font-size: 1.3rem; font-weight: 400; font-style: italic; line-height: 1.25; color: var(--ink); margin-bottom: 0.8rem; }
        .nw-post-excerpt { font-size: 0.85rem; font-weight: 300; line-height: 1.65; color: var(--muted-l); margin-bottom: 1.4rem; flex: 1; }
        .nw-post-foot { display: flex; justify-content: space-between; align-items: center; padding-top: 1rem; border-top: 1px solid var(--border-l); }
        .nw-post-read { font-size: 0.6rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--muted-l); display: inline-flex; align-items: center; gap: 0.4rem; }
        .nw-post-arrow { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--ink); display: inline-flex; align-items: center; gap: 0.35rem; transition: gap 0.25s, color 0.25s; }
        .nw-post:hover .nw-post-arrow { color: var(--gold); gap: 0.65rem; }

        .empty { grid-column: 1 / -1; padding: 6rem 0; text-align: center; color: var(--muted-l); font-size: 1rem; }
        .empty i { font-size: 2.5rem; color: var(--border-l); display: block; margin-bottom: 1rem; }
      `}</style>

      <PageHero
        eyebrow={<><i className="bi bi-journals" /> News · Blog · Commentary</>}
        title={<>The <em>Hamilton</em> <strong>Journal</strong></>}
        subtitle="Essays, sermons in print, media commentary, ministry updates and exclusive features. Direct from Dr. Hamilton's desk, in the same prophetic-scholarly voice that has shaped Nigerian discourse for four decades."
        image="/press-thinker.jpg"
        variant="dark"
      />

      <div className="nw-filters">
        <div className="nw-cats">
          {categories.map((c) => (
            <button
              key={c}
              className={`nw-cat${c === category ? " on" : ""}`}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="nw-search-wrap">
          <i className="bi bi-search" />
          <input
            className="nw-search"
            type="search"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search articles"
          />
        </div>
      </div>

      <div className="nw-grid">
        <div className="nw-blob1"><BlobAccent color="#2563EB" opacity={0.04} /></div>
        <div className="nw-blob2"><BlobAccent color="#DC2626" opacity={0.03} /></div>
        {filtered.length === 0 ? (
          <div className="empty">
            <i className="bi bi-search" />
            No articles match your search. Try a different category or keyword.
          </div>
        ) : (
          filtered.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.06}>
              <article className="nw-post" onClick={() => navigate(`/news/${post.slug}`)}>
                <div className="nw-post-img">
                  <img src={`/thumbs${post.image}`} alt={post.title} loading="lazy" />
                </div>
                <div className="nw-post-body">
                  <div className="nw-post-meta">
                    <span className="nw-post-cat">{post.category}</span>
                    <span className="nw-post-dot" />
                    <span className="nw-post-date">{fmt(post.date)}</span>
                  </div>
                  <h2 className="nw-post-title">{post.title}</h2>
                  <p className="nw-post-excerpt">{post.excerpt}</p>
                  <div className="nw-post-foot">
                    <span className="nw-post-read"><i className="bi bi-clock" /> {post.readTime}</span>
                    <span className="nw-post-arrow">Read <i className="bi bi-arrow-right" /></span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))
        )}
      </div>
    </Layout>
  );
}
