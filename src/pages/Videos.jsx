import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";

const VIDEOS = [
  { id: "Wq2Zlm4gsRg", tag: "CCC PraiseVille · Teaching", title: "Dr. Kunle Hamilton — CCC PraiseVille Teaching", featured: true },
  { id: "iOkXFJsHvdg", tag: "Doctrine · Short Clip", title: "Polygamy Is Not for Christians" },
  { id: "BDwlGAYeeMs", tag: "Church Issues · Interview", title: "On Jailed Shepherd, Sodomy & Polygamy in CCC" },
  { id: "gzwnl1X3sB8", tag: "Podcast · Conversation", title: "Dr. Kunle Hamilton — Podcast Interview" },
];

export default function Videos() {
  const featured = VIDEOS[0];
  const grid = VIDEOS.slice(1);

  return (
    <Layout
      title="Videos"
      description="Watch Dr. Kunle Hamilton's sermons, teachings and interviews on the CCC PraiseVille YouTube channel."
    >
      <style>{`
        .vd-featured-section { padding: 5rem var(--gutter); background: var(--warm); }
        .vd-featured-hd { text-align: center; max-width: 720px; margin: 0 auto 3rem; }
        .vd-featured-eyebrow { display: inline-flex; align-items: center; justify-content: center; gap: 0.8rem; font-size: var(--t-eyebrow); font-weight: 700; letter-spacing: 0.32em; text-transform: uppercase; color: var(--gold); margin-bottom: 1.4rem; }
        .vd-featured-eyebrow::before, .vd-featured-eyebrow::after { content: ''; width: 28px; height: 1.5px; background: var(--gold); }
        .vd-featured-title { font-family: var(--serif); font-size: var(--t-h2); font-weight: 300; line-height: 1.05; }
        .vd-featured-title em { font-style: italic; color: var(--gold); }

        .vd-featured-card { max-width: 1100px; margin: 0 auto; border-radius: 4px; overflow: hidden; box-shadow: var(--shadow-2); }
        .vd-iframe-wrap { aspect-ratio: 16/9; background: var(--ink); }
        .vd-iframe-wrap iframe { width: 100%; height: 100%; border: 0; }
        .vd-featured-info { padding: 1.8rem 2rem; background: var(--warm); border: 1px solid var(--border-l); border-top: none; }
        .vd-featured-tag { font-size: 0.58rem; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: var(--gold); margin-bottom: 0.5rem; }
        .vd-featured-name { font-family: var(--serif); font-size: 1.4rem; font-weight: 400; font-style: italic; line-height: 1.25; color: var(--ink); }

        .vd-grid-section { padding: 5rem var(--gutter); background: var(--ink); color: var(--white); }
        .vd-grid-hd { display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 1.5rem; margin-bottom: 3rem; }
        .vd-grid-title { font-family: var(--serif); font-size: var(--t-h2); font-weight: 300; line-height: 1.05; }
        .vd-grid-title em { font-style: italic; color: var(--gold3); }
        .vd-grid-sub { font-size: 0.85rem; color: rgba(255,255,255,0.6); margin-top: 0.6rem; max-width: 480px; }

        .vd-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.6rem; }
        @media (max-width: 1000px) { .vd-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .vd-grid { grid-template-columns: 1fr; } }

        .vd-card { background: rgba(255,255,255,0.03); border: 1px solid var(--border-d); border-radius: 4px; overflow: hidden; transition: all 0.35s var(--ease-out); }
        .vd-card:hover { border-color: var(--gold); transform: translateY(-3px); box-shadow: var(--shadow-3); }
        .vd-card-info { padding: 1.3rem 1.5rem; }
        .vd-card-tag { font-size: 0.55rem; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: var(--gold3); margin-bottom: 0.5rem; }
        .vd-card-name { font-family: var(--serif); font-size: 1.05rem; font-weight: 400; font-style: italic; line-height: 1.3; color: var(--white); }

        .vd-cta { padding: 5rem var(--gutter); background: linear-gradient(135deg, var(--ink) 0%, var(--ink3) 100%); color: var(--white); text-align: center; }
      `}</style>

      <PageHero
        eyebrow={<><i className="bi bi-youtube" /> Sermons · Teachings · Interviews</>}
        title={<>Dr. Hamilton <em>live</em> & unfiltered</>}
        subtitle="Sunday services, doctrinal teachings, media interviews and podcast conversations — direct from the CCC PraiseVille YouTube channel."
        image="/speaking.jpg"
        variant="dark"
      />

      <section className="vd-featured-section">
        <Reveal>
          <div className="vd-featured-hd">
            <div className="vd-featured-eyebrow"><i className="bi bi-play-circle-fill" /> Latest Teaching</div>
            <h2 className="vd-featured-title">
              The <em>featured</em> message
            </h2>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="vd-featured-card">
            <div className="vd-iframe-wrap">
              <iframe
                src={`https://www.youtube.com/embed/${featured.id}`}
                title={featured.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
            <div className="vd-featured-info">
              <div className="vd-featured-tag">{featured.tag}</div>
              <h3 className="vd-featured-name">{featured.title}</h3>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="vd-grid-section">
        <Reveal>
          <div className="vd-grid-hd">
            <div>
              <div className="vd-featured-eyebrow" style={{ justifyContent: "flex-start", color: "var(--gold3)" }}>
                <i className="bi bi-collection-play" /> More from the Channel
              </div>
              <h2 className="vd-grid-title">
                Watch <em>recent</em> messages
              </h2>
              <p className="vd-grid-sub">A range of recent teachings, doctrinal clarity, and conversations Dr. Hamilton has had on YouTube and beyond.</p>
            </div>
            <a href="https://www.youtube.com/@cccpraiseville" target="_blank" rel="noopener noreferrer" className="btn">
              <i className="bi bi-youtube" /> Subscribe on YouTube
            </a>
          </div>
        </Reveal>

        <div className="vd-grid">
          {grid.map((v, i) => (
            <Reveal key={v.id} delay={i * 0.08}>
              <article className="vd-card">
                <div className="vd-iframe-wrap">
                  <iframe
                    src={`https://www.youtube.com/embed/${v.id}`}
                    title={v.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                <div className="vd-card-info">
                  <div className="vd-card-tag">{v.tag}</div>
                  <h3 className="vd-card-name">{v.title}</h3>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="vd-cta">
        <Reveal>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "var(--t-h2)", fontWeight: 300, lineHeight: 1.05, marginBottom: "1.4rem" }}>
            Attend a <em style={{ fontStyle: "italic", color: "var(--gold3)" }}>service</em> in person
          </h2>
          <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.7, color: "rgba(255,255,255,0.72)", marginBottom: "2.2rem", maxWidth: "640px", margin: "0 auto 2.2rem" }}>
            Join CCC PraiseVille's Sunday services in Lagos, Berlin, London or visit any branch worldwide. Or partner with ShaddaiVille's leadership training.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/speaking" className="btn">Upcoming Events <i className="bi bi-arrow-right" /></Link>
            <a href="https://www.shaddaiville.org" target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light">
              <i className="bi bi-box-arrow-up-right" /> Visit ShaddaiVille
            </a>
          </div>
        </Reveal>
      </section>
    </Layout>
  );
}
