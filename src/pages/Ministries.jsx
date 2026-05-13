import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";

export default function Ministries() {
  return (
    <Layout
      title="Ministries"
      description="CCC PraiseVille Global and ShaddaiVille Ministries International — Dr. Hamilton's twin pillars of ministry."
    >
      <style>{`
        .mn-intro { padding: 6rem var(--gutter); background: var(--warm); text-align: center; }
        .mn-intro-lead { font-family: var(--serif); font-size: clamp(1.3rem, 2.4vw, 1.85rem); font-style: italic; font-weight: 300; line-height: 1.5; color: var(--muted-l); max-width: 760px; margin: 0 auto; }
        .mn-intro-lead em { color: var(--gold); font-style: italic; }

        .mn-panel { display: grid; grid-template-columns: 1fr 1fr; min-height: 600px; }
        @media (max-width: 900px) { .mn-panel { grid-template-columns: 1fr; min-height: auto; } }
        .mn-panel.reverse { grid-template-columns: 1fr 1fr; }
        @media (max-width: 900px) { .mn-panel.reverse { grid-template-columns: 1fr; } }
        .mn-panel.reverse .mn-image { order: 1; }
        @media (max-width: 900px) { .mn-panel.reverse .mn-image { order: 0; } }

        .mn-image { position: relative; overflow: hidden; min-height: 400px; }
        .mn-image img { width: 100%; height: 100%; object-fit: cover; object-position: center 18%; transition: transform 0.8s; }
        .mn-image:hover img { transform: scale(1.03); }
        .mn-image-ov { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(9,21,42,0.3) 0%, transparent 60%); }

        .mn-content { padding: 5rem var(--gutter-sm); display: flex; flex-direction: column; justify-content: center; background: var(--ink); color: var(--white); }
        .mn-content.warm { background: var(--warm); color: var(--ink); }
        .mn-eyebrow { display: inline-flex; align-items: center; gap: 0.8rem; font-size: var(--t-eyebrow); font-weight: 700; letter-spacing: 0.32em; text-transform: uppercase; margin-bottom: 1.4rem; }
        .mn-content .mn-eyebrow { color: var(--gold3); }
        .mn-content .mn-eyebrow::before { content: ''; width: 28px; height: 1.5px; background: var(--gold3); }
        .mn-content.warm .mn-eyebrow { color: var(--gold); }
        .mn-content.warm .mn-eyebrow::before { content: ''; width: 28px; height: 1.5px; background: var(--gold); }

        .mn-title { font-family: var(--serif); font-size: clamp(2rem, 4vw, 3.4rem); font-weight: 300; line-height: 1.02; letter-spacing: -0.02em; margin-bottom: 1.4rem; }
        .mn-title em { font-style: italic; }
        .mn-content .mn-title em { color: var(--gold3); }
        .mn-content.warm .mn-title em { color: var(--gold); }
        .mn-title strong { font-weight: 700; }

        .mn-tagline { font-family: var(--serif); font-size: 1.15rem; font-style: italic; line-height: 1.5; margin-bottom: 1.5rem; }
        .mn-content .mn-tagline { color: rgba(255,255,255,0.78); }
        .mn-content.warm .mn-tagline { color: var(--muted-l); }

        .mn-desc { font-size: 0.95rem; font-weight: 300; line-height: 1.75; margin-bottom: 2rem; }
        .mn-content .mn-desc { color: rgba(255,255,255,0.65); }
        .mn-content.warm .mn-desc { color: var(--muted-l); }

        .mn-facts { display: flex; gap: 2rem; margin-bottom: 2rem; flex-wrap: wrap; padding-top: 1.5rem; border-top: 1px solid; }
        .mn-content .mn-facts { border-top-color: var(--border-d); }
        .mn-content.warm .mn-facts { border-top-color: var(--border-l); }
        .mn-fact-n { font-family: var(--serif); font-size: 2rem; font-weight: 300; line-height: 1; }
        .mn-content .mn-fact-n { color: var(--gold3); }
        .mn-content.warm .mn-fact-n { color: var(--gold); }
        .mn-fact-l { font-size: 0.6rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; margin-top: 0.4rem; }
        .mn-content .mn-fact-l { color: rgba(255,255,255,0.5); }
        .mn-content.warm .mn-fact-l { color: var(--muted-l); }

        .mn-buttons { display: flex; gap: 0.8rem; flex-wrap: wrap; }

        .mn-festival { padding: 6rem var(--gutter); background: linear-gradient(135deg, var(--ink) 0%, var(--ink3) 100%); color: var(--white); text-align: center; position: relative; overflow: hidden; }
        .mn-festival::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 50% 30%, rgba(37,99,235,0.20), transparent 50%); }
        .mn-festival-inner { position: relative; z-index: 2; max-width: 820px; margin: 0 auto; }
        .mn-festival-eyebrow { display: inline-flex; align-items: center; justify-content: center; gap: 0.8rem; font-size: var(--t-eyebrow); font-weight: 700; letter-spacing: 0.32em; text-transform: uppercase; color: var(--gold3); margin-bottom: 1.4rem; }
        .mn-festival-eyebrow::before, .mn-festival-eyebrow::after { content: ''; width: 28px; height: 1.5px; background: var(--gold3); }
        .mn-festival-title { font-family: var(--serif); font-size: var(--t-h2); font-weight: 300; line-height: 1.05; margin-bottom: 1.4rem; }
        .mn-festival-title em { font-style: italic; color: var(--gold3); }
      `}</style>

      <PageHero
        eyebrow={<><i className="bi bi-globe2" /> His Legacy in Action</>}
        title={<>Two <em>ministries</em>. <strong>Five</strong> nations.</>}
        subtitle="Dr. Hamilton's prophetic work expresses itself through two distinct but complementary platforms — one denominational, one not — each serving a different facet of his calling to disciple the nations."
        image="/ministry-praiseville.jpg"
        variant="dark"
      />

      <section className="mn-intro">
        <Reveal>
          <p className="mn-intro-lead">
            <em>One is the church</em> — a Celestial Church of Christ parish with global reach.
            <em> The other is the school</em> — a non-denominational leadership academy training the
            next generation of Nigerian and African leaders. Both are free. Both are growing.
          </p>
        </Reveal>
      </section>

      {/* CCC PraiseVille */}
      <div className="mn-panel">
        <div className="mn-image">
          <img src="/ministry-praiseville.jpg" alt="CCC PraiseVille Global" loading="lazy" />
          <div className="mn-image-ov" />
        </div>
        <div className="mn-content">
          <Reveal>
            <div className="mn-eyebrow"><i className="bi bi-person-arms-up" /> Celestial Church of Christ</div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mn-title">
              CCC <em>PraiseVille</em> <strong>Global</strong>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mn-tagline">
              "Disciple the nations with God in the House." — Matthew 28:19
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mn-desc">
              Founded by Dr. Hamilton in Berlin on <strong style={{color:"var(--white)"}}>May 8, 2016</strong>, CCC PraiseVille Global is a Celestial Church parish teaching Villers to succeed in their marriages (monogamy), ministries, academics, professions and the marketplace — in line with God's eternal will. The branches now span four nations.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mn-facts">
              <div><div className="mn-fact-n">2016</div><div className="mn-fact-l">Founded</div></div>
              <div><div className="mn-fact-n">4</div><div className="mn-fact-l">Nations</div></div>
              <div><div className="mn-fact-n">7+</div><div className="mn-fact-l">Annual Festivals</div></div>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mn-buttons">
              <a href="https://www.youtube.com/@cccpraiseville" target="_blank" rel="noopener noreferrer" className="btn">
                <i className="bi bi-youtube" /> Watch on YouTube
              </a>
              <Link to="/videos" className="btn btn-ghost-light">
                Latest Sermons <i className="bi bi-arrow-right" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ShaddaiVille */}
      <div className="mn-panel reverse">
        <div className="mn-image">
          <img src="/ministry-shaddaiville.jpg" alt="ShaddaiVille Ministries" loading="lazy" />
          <div className="mn-image-ov" />
        </div>
        <div className="mn-content warm">
          <Reveal>
            <div className="mn-eyebrow"><i className="bi bi-mortarboard-fill" /> Non-Denominational · Global Training</div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mn-title">
              <strong>ShaddaiVille</strong> <em>Ministries Int'l</em>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mn-tagline">
              "Moulding believers, influencing the world."
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mn-desc">
              "God's City" — UK-certified leadership, entrepreneurship and discipleship training since <strong style={{color:"var(--ink)"}}>2007</strong>. Free of charge to Christians, Muslims, and secular professionals. Graduates have served in churches, businesses, governments and NGOs across Nigeria, the UK, Germany, the USA and beyond.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mn-facts">
              <div><div className="mn-fact-n">2007</div><div className="mn-fact-l">Founded</div></div>
              <div><div className="mn-fact-n">5</div><div className="mn-fact-l">Nations</div></div>
              <div><div className="mn-fact-n">UK</div><div className="mn-fact-l">Certified</div></div>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mn-buttons">
              <a href="https://www.shaddaiville.org" target="_blank" rel="noopener noreferrer" className="btn">
                <i className="bi bi-box-arrow-up-right" /> Visit ShaddaiVille.org
              </a>
              <Link to="/contact" className="btn btn-ghost">
                Partner With Us <i className="bi bi-arrow-right" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Festival of the Word */}
      <section className="mn-festival">
        <div className="mn-festival-inner">
          <Reveal>
            <div className="mn-festival-eyebrow"><i className="bi bi-calendar-event" /> Flagship Annual Event</div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mn-festival-title">
              The <em>Festival of the Word</em>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.75, color: "rgba(255,255,255,0.7)", marginBottom: "2rem" }}>
              CCC PraiseVille Global's flagship teaching conference — held annually since 2018. The 8th edition runs in
              Lagos with delegates flying in from Berlin, London and the diaspora. A week of teaching, prophecy, leadership
              training and worship that has shaped the spiritual rhythm of a generation of CCC believers.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/speaking" className="btn">
                Upcoming Events <i className="bi bi-arrow-right" />
              </Link>
              <Link to="/videos" className="btn btn-ghost-light">
                Watch Past Sermons <i className="bi bi-play-circle" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
