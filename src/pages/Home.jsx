import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import Reveal from "../components/Reveal";
import {
  IllustrationProphet,
  IllustrationAuthor,
  IllustrationJournalist,
  BlobAccent,
  GridPattern,
  DotPattern,
  Sparkles,
  ScribbleUnderline,
} from "../components/Illustrations";
import AnimatedNumber from "../components/AnimatedNumber";
import MagneticWrap from "../components/MagneticWrap";
import { posts as journalPosts } from "../data/posts";

export default function Home() {
  useEffect(() => {
    document.title = "Dr. Kunle Hamilton — Prophet · Author · Shepherd";
  }, []);

  return (
    <Layout>
      <style>{`
        /* ── HERO ── */
        .hm-hero { position: relative; width: 100%; height: calc(100vh - 70px); min-height: 600px; margin-top: 70px; overflow: hidden; background: var(--ink); }
        @media (max-width: 768px) { .hm-hero { height: 88vh; min-height: 540px; } }

        .hm-hero img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 22%; filter: brightness(0.78) contrast(1.05) saturate(0.94); }
        .hm-hero-ov { position: absolute; inset: 0; background:
          linear-gradient(to top, rgba(9,21,42,0.95) 0%, rgba(9,21,42,0.55) 35%, transparent 65%),
          linear-gradient(to right, rgba(9,21,42,0.55) 0%, transparent 55%),
          linear-gradient(160deg, rgba(10,22,65,0.40) 0%, rgba(37,99,235,0.10) 50%, rgba(9,21,42,0.25) 100%);
        }

        .hm-hero-body { position: absolute; left: 0; right: 0; bottom: 0; padding: 0 var(--gutter) 6vh; z-index: 3; }

        .hm-hero-eyebrow { display: inline-flex; align-items: center; gap: 0.8rem; font-size: 0.6rem; font-weight: 700; letter-spacing: 0.32em; text-transform: uppercase; color: var(--gold3); margin-bottom: 1.6rem; }
        .hm-hero-eyebrow::before { content: ''; width: 28px; height: 1.5px; background: var(--gold3); }

        .hm-hero-name { font-family: var(--serif); color: var(--white); font-weight: 300; line-height: 0.88; letter-spacing: -0.025em; font-size: clamp(3.4rem, 9vw, 9rem); margin-bottom: 1.4rem; }
        .hm-hero-name em { font-style: italic; color: var(--gold3); display: block; }
        .hm-hero-name strong { font-weight: 700; }

        .hm-hero-sub { font-size: clamp(0.92rem, 1.3vw, 1.05rem); font-weight: 300; line-height: 1.75; color: rgba(255,255,255,0.72); max-width: 580px; margin-bottom: 2.2rem; }

        .hm-hero-ctas { display: flex; gap: 0.9rem; flex-wrap: wrap; }

        .hm-scroll-cue { position: absolute; right: var(--gutter); bottom: 2rem; display: flex; flex-direction: column; align-items: center; gap: 0.6rem; color: rgba(255,255,255,0.4); font-size: 0.5rem; font-weight: 700; letter-spacing: 0.28em; text-transform: uppercase; }
        .hm-scroll-cue i { font-size: 1.4rem; animation: bounce 2s infinite; }
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(6px); } }
        @media (max-width: 768px) { .hm-scroll-cue { display: none; } }

        /* Floating brand accent — top-right of hero */
        .hm-hero-mark { position: absolute; top: 110px; right: var(--gutter); width: 70px; height: 70px; z-index: 4; opacity: 0; animation: fadeMark 1.2s 0.8s var(--ease-out) forwards; }
        .hm-hero-mark img { width: 100%; height: 100%; filter: drop-shadow(0 4px 20px rgba(220,38,38,0.3)); }
        @keyframes fadeMark { from { opacity: 0; transform: scale(0.7) rotate(-20deg); } to { opacity: 1; transform: scale(1) rotate(0); } }
        @media (max-width: 768px) { .hm-hero-mark { width: 54px; height: 54px; top: 90px; } }

        /* ── Marquee ── */
        .hm-marquee { background: var(--gold); padding: 1.2rem 0; overflow: hidden; }
        .hm-marquee-track { display: flex; gap: 4rem; animation: marquee 40s linear infinite; white-space: nowrap; }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .hm-marquee-item { font-family: var(--serif); font-size: 1rem; font-style: italic; font-weight: 400; color: var(--white); }
        .hm-marquee-dot { color: rgba(255,255,255,0.55); align-self: center; }

        /* ── Pillars section ── */
        .hm-pillars { padding: 7rem var(--gutter); background: var(--warm); position: relative; overflow: hidden; }
        .hm-pillars-bg { position: absolute; inset: 0; pointer-events: none; opacity: 0.4; }
        .hm-pillars-bg svg { width: 100%; height: 100%; }
        .hm-pillars-blob1 { position: absolute; top: -120px; right: -180px; width: 500px; height: 500px; pointer-events: none; }
        .hm-pillars-blob2 { position: absolute; bottom: -100px; left: -200px; width: 450px; height: 450px; pointer-events: none; }

        .hm-pillars-hd { text-align: center; max-width: 760px; margin: 0 auto 5rem; position: relative; z-index: 2; }
        .hm-pillars-eyebrow { display: inline-flex; align-items: center; justify-content: center; gap: 0.8rem; font-size: var(--t-eyebrow); font-weight: 700; letter-spacing: 0.32em; text-transform: uppercase; color: var(--gold); margin-bottom: 1.4rem; }
        .hm-pillars-eyebrow::before, .hm-pillars-eyebrow::after { content: ''; width: 28px; height: 1.5px; background: var(--gold); }
        .hm-pillars-title { font-family: var(--serif); font-size: var(--t-h2); font-weight: 300; line-height: 1.05; letter-spacing: -0.02em; margin-bottom: 1.6rem; position: relative; display: inline-block; }
        .hm-pillars-title em { font-style: italic; color: var(--gold); }
        .hm-pillars-title-underline { display: block; width: 200px; height: 12px; margin: 0.6rem auto 0; color: var(--gold); }
        .hm-pillars-lead { font-size: var(--t-body); font-weight: 300; line-height: 1.7; color: var(--muted-l); margin-top: 1rem; }

        .hm-pillars-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.8rem; position: relative; z-index: 2; }
        @media (max-width: 900px) { .hm-pillars-grid { grid-template-columns: 1fr; gap: 1.2rem; } }

        .hm-pillar {
          padding: 0; background: var(--warm); border: 1px solid var(--border-l); border-radius: 8px;
          transition: all 0.4s var(--ease-out); position: relative; overflow: hidden;
          display: flex; flex-direction: column;
        }
        .hm-pillar::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(37,99,235,0.04) 0%, transparent 60%);
          opacity: 0; transition: opacity 0.4s;
        }
        .hm-pillar:hover::before { opacity: 1; }
        .hm-pillar:hover {
          border-color: var(--gold);
          transform: translateY(-6px);
          box-shadow: 0 30px 60px -20px rgba(37,99,235,0.20);
        }

        .hm-pillar-illo {
          width: 100%; aspect-ratio: 5/4; background: linear-gradient(135deg, var(--warm2) 0%, var(--warm3) 100%);
          display: flex; align-items: center; justify-content: center;
          border-radius: 8px 8px 0 0; overflow: hidden; position: relative;
        }
        .hm-pillar-illo::after {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(circle at 70% 30%, rgba(37,99,235,0.08), transparent 60%);
        }
        .hm-pillar-illo svg { width: 78%; height: auto; position: relative; z-index: 2; transition: transform 0.5s var(--ease-out); }
        .hm-pillar:hover .hm-pillar-illo svg { transform: scale(1.06) rotate(-1deg); }

        .hm-pillar-content { padding: 2rem 2rem 2.2rem; display: flex; flex-direction: column; flex: 1; position: relative; z-index: 2; }

        .hm-pillar-num {
          position: absolute; top: -20px; right: 1.5rem;
          width: 40px; height: 40px; border-radius: 50%;
          background: var(--gold); color: var(--white);
          display: flex; align-items: center; justify-content: center;
          font-family: var(--serif); font-size: 1rem; font-weight: 500; font-style: italic;
          box-shadow: 0 6px 20px rgba(37,99,235,0.35);
        }

        .hm-pillar-title { font-family: var(--serif); font-size: 1.7rem; font-weight: 400; line-height: 1.15; margin-bottom: 0.9rem; color: var(--ink); }
        .hm-pillar-title em { font-style: italic; color: var(--gold); font-weight: 500; }
        .hm-pillar-desc { font-size: 0.92rem; font-weight: 300; line-height: 1.7; color: var(--muted-l); margin-bottom: 1.6rem; flex: 1; }
        .hm-pillar-link {
          display: inline-flex; align-items: center; gap: 0.5rem;
          font-size: 0.65rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--ink); padding-top: 1rem; border-top: 1px solid var(--border-l);
          transition: gap 0.25s, color 0.25s;
        }
        .hm-pillar:hover .hm-pillar-link { gap: 0.9rem; color: var(--gold); }
        .hm-pillar-link i { font-size: 0.9rem; }

        /* ── Stats ── */
        .hm-stats { padding: 6rem var(--gutter); background: var(--ink); color: var(--white); border-top: 1px solid var(--border-d); border-bottom: 1px solid var(--border-d); position: relative; overflow: hidden; }
        .hm-stats-bg { position: absolute; inset: 0; opacity: 0.3; color: var(--gold3); }
        .hm-stats-glow { position: absolute; top: -50%; left: 50%; transform: translateX(-50%); width: 800px; height: 800px; background: radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 60%); pointer-events: none; }
        .hm-stats-inner { position: relative; z-index: 2; display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; }
        @media (max-width: 900px) { .hm-stats-inner { grid-template-columns: repeat(2, 1fr); gap: 2.5rem; } }
        @media (max-width: 480px) { .hm-stats-inner { grid-template-columns: 1fr; } }

        .hm-stat { padding: 0.5rem 1rem; text-align: center; border-right: 1px solid var(--border-d); position: relative; transition: transform 0.3s; }
        .hm-stat:hover { transform: translateY(-3px); }
        .hm-stat:last-child { border-right: none; }
        @media (max-width: 900px) { .hm-stat { border-right: none; } }
        .hm-stat-icon { width: 44px; height: 44px; margin: 0 auto 1rem; border: 1px solid var(--gold3); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--gold3); font-size: 1.1rem; transition: all 0.3s; }
        .hm-stat:hover .hm-stat-icon { background: var(--gold); border-color: var(--gold); color: var(--white); transform: scale(1.05) rotate(8deg); }
        .hm-stat-n { font-family: var(--serif); font-size: clamp(3.2rem, 5.5vw, 5rem); font-weight: 300; color: var(--gold3); line-height: 1; letter-spacing: -0.02em; }
        .hm-stat-n em { font-style: italic; font-size: 0.6em; }
        .hm-stat-l { font-size: 0.65rem; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(255,255,255,0.6); margin-top: 0.9rem; line-height: 1.5; }

        /* ── Latest from Journal ── */
        .hm-journal { padding: 7rem var(--gutter); background: var(--warm2); position: relative; overflow: hidden; }
        .hm-journal-blob { position: absolute; top: 50%; right: -200px; width: 500px; height: 500px; transform: translateY(-50%); pointer-events: none; }
        .hm-journal-hd { display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 1.5rem; margin-bottom: 3rem; position: relative; z-index: 2; }
        .hm-journal-title { font-family: var(--serif); font-size: var(--t-h2); font-weight: 300; line-height: 1.05; }
        .hm-journal-title em { font-style: italic; color: var(--gold); }
        .hm-journal-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.8rem; position: relative; z-index: 2; }
        @media (max-width: 900px) { .hm-journal-grid { grid-template-columns: 1fr; } }
        .hm-post { display: block; background: var(--warm); border: 1px solid var(--border-l); border-radius: 8px; overflow: hidden; transition: all 0.4s var(--ease-out); }
        .hm-post:hover { transform: translateY(-4px); border-color: var(--gold); box-shadow: 0 20px 40px -15px rgba(37,99,235,0.20); }
        .hm-post-img { aspect-ratio: 16/10; overflow: hidden; position: relative; }
        .hm-post-img img { width: 100%; height: 100%; object-fit: cover; object-position: center 25%; transition: transform 0.7s var(--ease-out); }
        .hm-post-img::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to top, rgba(9,21,42,0.2), transparent 50%); opacity: 0; transition: opacity 0.4s; }
        .hm-post:hover .hm-post-img img { transform: scale(1.06); }
        .hm-post:hover .hm-post-img::after { opacity: 1; }
        .hm-post-body { padding: 1.7rem 1.8rem; }
        .hm-post-meta { display: flex; gap: 0.8rem; align-items: center; margin-bottom: 0.8rem; }
        .hm-post-cat { font-size: 0.55rem; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: var(--gold); }
        .hm-post-dot { width: 3px; height: 3px; border-radius: 50%; background: var(--border-l); }
        .hm-post-date { font-size: 0.7rem; color: var(--muted-l); }
        .hm-post-title { font-family: var(--serif); font-size: 1.25rem; font-weight: 400; font-style: italic; line-height: 1.3; color: var(--ink); margin-bottom: 0.8rem; }
        .hm-post-read { display: inline-flex; align-items: center; gap: 0.4rem; font-size: 0.6rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted-l); padding-top: 1rem; border-top: 1px solid var(--border-l); transition: color 0.25s, gap 0.25s; }
        .hm-post:hover .hm-post-read { color: var(--gold); gap: 0.7rem; }

        /* ── Final CTA strip ── */
        .hm-cta { padding: 7rem var(--gutter); background: linear-gradient(135deg, var(--ink) 0%, var(--ink3) 100%); color: var(--white); text-align: center; position: relative; overflow: hidden; }
        .hm-cta::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 30% 50%, rgba(37,99,235,0.20), transparent 50%), radial-gradient(circle at 75% 60%, rgba(220,38,38,0.10), transparent 45%); }
        .hm-cta-grid { position: absolute; inset: 0; opacity: 0.4; color: var(--gold3); }
        .hm-cta-sparkles { position: absolute; pointer-events: none; }
        .hm-cta-sparkles.left { top: 25%; left: 8%; width: 80px; height: 80px; color: var(--gold3); }
        .hm-cta-sparkles.right { bottom: 20%; right: 10%; width: 100px; height: 100px; color: var(--gold3); }
        .hm-cta-inner { position: relative; z-index: 2; max-width: 760px; margin: 0 auto; }
        .hm-cta-eyebrow { display: inline-flex; align-items: center; gap: 0.8rem; font-size: var(--t-eyebrow); font-weight: 700; letter-spacing: 0.32em; text-transform: uppercase; color: var(--gold3); margin-bottom: 1.4rem; justify-content: center; }
        .hm-cta-eyebrow::before, .hm-cta-eyebrow::after { content: ''; width: 28px; height: 1.5px; background: var(--gold3); }
        .hm-cta-title { font-family: var(--serif); font-size: var(--t-h2); font-weight: 300; line-height: 1.05; margin-bottom: 1.4rem; }
        .hm-cta-title em { font-style: italic; color: var(--gold3); }
        .hm-cta-title strong { font-weight: 600; }
        .hm-cta-lead { font-size: clamp(0.95rem, 1.3vw, 1.1rem); font-weight: 300; line-height: 1.7; color: rgba(255,255,255,0.72); margin-bottom: 2.4rem; }
        .hm-cta-buttons { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
      `}</style>

      {/* HERO */}
      <section className="hm-hero">
        <img src="/hero.jpg" alt="Dr. Kunle Hamilton" fetchpriority="high" />
        <div className="hm-hero-ov" />

        {/* Brand mark accent */}
        <div className="hm-hero-mark" aria-hidden="true">
          <img src="/kh-logo-transparent.png" alt="" />
        </div>

        <motion.div
          className="hm-hero-body"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
          }}
        >
          <motion.div className="hm-hero-eyebrow" variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
            <i className="bi bi-stars" /> Prophet · Scholar · Voice
          </motion.div>

          <motion.h1
            className="hm-hero-name"
            variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } } }}
          >
            Dr. Kunle
            <em>Hamilton</em>
          </motion.h1>

          <motion.p className="hm-hero-sub" variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}>
            Nigeria's foremost prophet-scholar. Veteran journalist. Bestselling author.
            The man whose philosophy degree led him to God — and whose faith is reshaping nations.
          </motion.p>

          <motion.div className="hm-hero-ctas" variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}>
            <MagneticWrap strength={20}>
              <Link to="/about" className="btn">
                His Story <i className="bi bi-arrow-right" />
              </Link>
            </MagneticWrap>
            <MagneticWrap strength={20}>
              <Link to="/speaking" className="btn btn-ghost-light">
                Book as Speaker <i className="bi bi-mic-fill" />
              </Link>
            </MagneticWrap>
          </motion.div>
        </motion.div>

        <a href="#pillars" className="hm-scroll-cue" aria-label="Scroll down">
          Scroll
          <i className="bi bi-chevron-down" />
        </a>
      </section>

      {/* MARQUEE */}
      <div className="hm-marquee">
        <div className="hm-marquee-track">
          {[
            "Prophet · Scholar · Author",
            "Veteran Journalist",
            "40 Years of Ministry",
            "International Speaker",
            "Newspaper Editor",
            "Life Coach",
            "Lambert Academic Publishing",
            "18 Countries Published",
            "Nigeria · Germany · UK · USA",
            "University of Lagos Alumni",
          ].concat([
            "Prophet · Scholar · Author",
            "Veteran Journalist",
            "40 Years of Ministry",
            "International Speaker",
            "Newspaper Editor",
            "Life Coach",
            "Lambert Academic Publishing",
            "18 Countries Published",
            "Nigeria · Germany · UK · USA",
            "University of Lagos Alumni",
          ]).map((item, i) => (
            <span key={i} className="hm-marquee-item">
              {item} <span className="hm-marquee-dot">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* PILLARS */}
      <section id="pillars" className="hm-pillars">
        {/* Decorative blob accents */}
        <div className="hm-pillars-blob1">
          <BlobAccent color="#2563EB" opacity={0.05} />
        </div>
        <div className="hm-pillars-blob2">
          <BlobAccent color="#DC2626" opacity={0.04} />
        </div>
        <div className="hm-pillars-bg" style={{ color: "var(--gold)" }}>
          <DotPattern opacity={0.05} />
        </div>

        <Reveal>
          <div className="hm-pillars-hd">
            <div className="hm-pillars-eyebrow">Who He Is</div>
            <h2 className="hm-pillars-title">
              One <em>man</em>. Many <em>fields</em>. One <em>calling</em>.
              <ScribbleUnderline className="hm-pillars-title-underline" />
            </h2>
            <p className="hm-pillars-lead">
              A rare convergence of pulpit, press, and pen. Dr. Hamilton has spent four decades
              moving fluidly between the church, the newsroom, the lecture hall, and the page.
            </p>
          </div>
        </Reveal>

        <div className="hm-pillars-grid">
          {[
            {
              num: "i",
              Illo: IllustrationProphet,
              title: "The Prophet",
              em: "Prophet",
              desc: "Senior Shepherd of CCC PraiseVille Global. Prophet of the Celestial Church of Christ. Forty years of prophetic ministry across five nations.",
              to: "/ministries",
              cta: "Explore Ministries",
            },
            {
              num: "ii",
              Illo: IllustrationAuthor,
              title: "The Author",
              em: "Author",
              desc: "Four titles published by Lambert Academic Publishing across 18 European countries. From leadership to media studies to political philosophy.",
              to: "/books",
              cta: "Browse Books",
            },
            {
              num: "iii",
              Illo: IllustrationJournalist,
              title: "The Journalist",
              em: "Journalist",
              desc: "Pioneer of The Glitterati in ThisDAY. Veteran editor at Vanguard. Thirty-five years shaping Nigerian public discourse through print.",
              to: "/press",
              cta: "Read Press",
            },
          ].map((p, i) => (
            <Reveal key={p.title} delay={0.1 + i * 0.1}>
              <Link to={p.to} className="hm-pillar">
                <div className="hm-pillar-illo">
                  <p.Illo />
                </div>
                <div className="hm-pillar-content">
                  <span className="hm-pillar-num">{p.num}</span>
                  <h3 className="hm-pillar-title">
                    The <em>{p.em}</em>
                  </h3>
                  <p className="hm-pillar-desc">{p.desc}</p>
                  <span className="hm-pillar-link">
                    {p.cta} <i className="bi bi-arrow-right" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="hm-stats">
        <div className="hm-stats-bg">
          <GridPattern color="currentColor" opacity={0.06} />
        </div>
        <div className="hm-stats-glow" />
        <div className="hm-stats-inner">
          {[
            { icon: "bi-clock-history", n: 40, suffix: "+", l: "Years of Ministry & Media" },
            { icon: "bi-globe-europe-africa", n: 18, l: "Countries — Books Published" },
            { icon: "bi-flag-fill", n: 5, l: "Nations of Impact" },
            { icon: "bi-mortarboard-fill", n: 1985, l: "Best Philosophy Graduate · UNILAG" },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="hm-stat">
                <div className="hm-stat-icon"><i className={`bi ${s.icon}`} /></div>
                <div className="hm-stat-n">
                  <AnimatedNumber to={s.n} suffix={s.suffix || ""} duration={1.5} />
                </div>
                <div className="hm-stat-l">{s.l}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* JOURNAL TEASER */}
      <section className="hm-journal">
        <div className="hm-journal-blob">
          <BlobAccent color="#2563EB" opacity={0.04} />
        </div>
        <Reveal>
          <div className="hm-journal-hd">
            <div>
              <div className="hm-pillars-eyebrow" style={{ justifyContent: "flex-start" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.8rem" }}>
                  <i className="bi bi-journal-richtext" /> From the Journal
                </span>
              </div>
              <h2 className="hm-journal-title">
                Latest <em>writings</em>
              </h2>
            </div>
            <Link to="/news" className="btn btn-ghost">
              All Articles <i className="bi bi-arrow-right" />
            </Link>
          </div>
        </Reveal>

        <div className="hm-journal-grid">
          {journalPosts.slice(0, 3).map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.1}>
              <Link to={`/news/${post.slug}`} className="hm-post">
                <div className="hm-post-img">
                  <img src={`/thumbs${post.image}`} alt={post.title} loading="lazy" />
                </div>
                <div className="hm-post-body">
                  <div className="hm-post-meta">
                    <span className="hm-post-cat">{post.category}</span>
                    <span className="hm-post-dot" />
                    <span className="hm-post-date">{new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
                  </div>
                  <h3 className="hm-post-title">{post.title}</h3>
                  <span className="hm-post-read">
                    Read article <i className="bi bi-arrow-right" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="hm-cta">
        <div className="hm-cta-grid">
          <GridPattern color="currentColor" opacity={0.04} />
        </div>
        <div className="hm-cta-sparkles left">
          <Sparkles color="currentColor" />
        </div>
        <div className="hm-cta-sparkles right">
          <Sparkles color="currentColor" />
        </div>
        <div className="hm-cta-inner">
          <Reveal>
            <div className="hm-cta-eyebrow">Engage Dr. Hamilton</div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="hm-cta-title">
              Bring his <em>voice</em> to your <strong>platform</strong>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="hm-cta-lead">
              Churches, conferences, universities, corporates, and media organisations across five
              nations have invited Dr. Hamilton to teach, preach, lecture and consult. Your audience
              deserves the rare clarity only a prophet-scholar can bring.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="hm-cta-buttons">
              <MagneticWrap strength={20}>
                <Link to="/speaking" className="btn">
                  Book as Speaker <i className="bi bi-mic-fill" />
                </Link>
              </MagneticWrap>
              <MagneticWrap strength={20}>
                <Link to="/contact" className="btn btn-ghost-light">
                  Send a Message <i className="bi bi-envelope" />
                </Link>
              </MagneticWrap>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
