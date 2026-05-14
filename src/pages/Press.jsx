import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import {
  IconNewspaper, IconMic, BlobAccent, DotPattern, QuoteMark
} from "../components/Illustrations";

const FEATURES = [
  {
    type: "Exclusive Interview",
    pub: "Naija Standard Newspaper",
    title: "Untold Story of How I Pioneered The Glitterati in ThisDAY",
    desc: "Dr. Hamilton reveals how he created Nigeria's most iconic celebrity and lifestyle column — The Glitterati — inside ThisDAY's Sunday newspaper.",
    link: "https://nigeriastandardnewspaper.com/a/exclusive-interview-untold-story-of-how-i-pioneered-the-glitterati-in-thisday-newspaper-dr-kunle-hamilton-nigerias-ace-celebrity-editor-president-shaddaiville-ministries-international/",
    icon: "bi-newspaper",
  },
  {
    type: "Interview",
    pub: "Sunday Telegraph",
    title: "GOs Living Lavish Lifestyles Have Given Church a Bad Image",
    desc: "Dr. Hamilton speaks candidly on prosperity gospel excess, the state of the Celestial Church, and why he chose discipleship over denomination.",
    link: "https://jimidisu.com/gos-living-lavish-lifestyles-have-given-church-a-bad-image/",
    icon: "bi-chat-quote",
  },
  {
    type: "News Feature",
    pub: "Sunday Punch",
    title: "Seven Nigerians Awarded UK Leadership Fellowships",
    desc: "Coverage of the ShaddaiVille Leadership Academy UK fellowship awards presented at CCC PraiseVille's Festival of the Word 7.0.",
    link: "https://punchng.com/seven-nigerians-win-uk-fellowship-awards/",
    icon: "bi-award",
  },
  {
    type: "News Report",
    pub: "Legit.ng",
    title: "Kunle Hamilton Knocks BBNaija's Imisi — Sends Memo to CCC Youths",
    desc: "His widely-shared pastoral address on the BBNaija controversy sparked a national conversation about faith, fame, and church responsibility.",
    link: "https://www.legit.ng/entertainment/tv-shows/1678350-kunle-hamilton-knocks-bbnaijas-imisi-osoffas-grandson-sends-memo-cele-youths-proud/",
    icon: "bi-megaphone",
  },
  {
    type: "Event Coverage",
    pub: "Champion Newspapers",
    title: "10th Anniversary Thanksgiving at CCC PraiseVille, Lagos",
    desc: "Dr. Hamilton hosted the 10th anniversary thanksgiving of Lifestyle Initiatives, with professors and faith leaders gathering at CCC PraiseVille.",
    link: "https://championnews.com.ng/2025/10/20/10th-anniversary-thanksgiving-celebration-of-lifestyle-initiatives-held-in-ccc-praiseville-lagos/",
    icon: "bi-calendar-check",
  },
  {
    type: "Profile",
    pub: "Hamiltonstyle.org",
    title: "Celestial Church Gets PraiseVille: A New Parish in Berlin",
    desc: "The story of Dr. Hamilton founding CCC PraiseVille in Berlin on May 8, 2016 — how thirteen years of ShaddaiVille gave birth to a Celestial parish on German soil.",
    link: "http://www.hamiltonstyle.org/celestial-church-gets-new-parish-berlin-germany/",
    icon: "bi-globe",
  },
];

const TIMELINE = [
  { yr: "1985", role: "BA Philosophy", detail: "Best Student, University of Lagos" },
  { yr: "1989", role: "Media Career Begins", detail: "Newspaper Editor, PR & Advertising Consultant" },
  { yr: "1990", role: "M.Sc Mass Comm", detail: "University of Lagos" },
  { yr: "~00s", role: "Vanguard & ThisDAY", detail: "Editor · pioneered The Glitterati column" },
  { yr: "2007", role: "ShaddaiVille Founded", detail: "Ministries Int'l · UK Leadership Academy" },
  { yr: "2016", role: "CCC PraiseVille", detail: "Founded in Berlin, Germany" },
];

export default function Press() {
  return (
    <Layout
      title="Press & Media"
      description="Dr. Kunle Hamilton's journalism legacy — pioneering The Glitterati at ThisDAY, plus features and interviews in Sunday Telegraph, Punch, Champion News and more."
    >
      <style>{`
        .pr-glitterati { padding: 5rem var(--gutter); background: linear-gradient(135deg, var(--ink2) 0%, var(--ink) 100%); color: var(--white); position: relative; overflow: hidden; }
        .pr-glitterati::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 80% 30%, rgba(37,99,235,0.20), transparent 50%); }
        .pr-glitterati-pattern { position: absolute; inset: 0; opacity: 0.4; color: var(--gold3); pointer-events: none; }
        .pr-glitterati-inner { position: relative; z-index: 2; display: grid; grid-template-columns: 160px 1fr; gap: 3rem; align-items: center; max-width: 1100px; margin: 0 auto; }
        @media (max-width: 760px) { .pr-glitterati-inner { grid-template-columns: 1fr; gap: 1.8rem; text-align: center; } }
        .pr-badge { width: 160px; height: 160px; border: 2px solid var(--gold3); border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 1rem 0.6rem; position: relative; background: rgba(255,255,255,0.02); }
        .pr-badge::before { content: ''; position: absolute; top: 8px; left: 8px; right: 8px; bottom: 8px; border: 1px solid var(--gold3); opacity: 0.4; border-radius: 4px; }
        @media (max-width: 760px) { .pr-badge { margin: 0 auto; } }
        .pr-badge-t { font-size: 0.55rem; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: var(--gold3); margin-bottom: 0.5rem; }
        .pr-badge-n { font-family: var(--serif); font-size: 2.6rem; font-weight: 300; font-style: italic; color: var(--gold); line-height: 0.95; }
        .pr-badge-s { font-size: 0.45rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.5); margin-top: 0.5rem; }

        .pr-glitterati-tag { font-size: var(--t-eyebrow); font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase; color: var(--gold3); margin-bottom: 0.8rem; }
        .pr-glitterati-title { font-family: var(--serif); font-size: clamp(1.4rem, 2.7vw, 2.2rem); font-weight: 300; font-style: italic; line-height: 1.2; margin-bottom: 1rem; }
        .pr-glitterati-desc { font-size: 0.95rem; font-weight: 300; line-height: 1.7; color: rgba(255,255,255,0.7); margin-bottom: 1.2rem; }
        .pr-glitterati-link { display: inline-flex; align-items: center; gap: 0.6rem; font-size: 0.65rem; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: var(--gold3); transition: gap 0.25s; }
        .pr-glitterati-link:hover { gap: 1rem; }

        .pr-features { padding: 5rem var(--gutter); background: var(--warm); }
        .pr-features-hd { text-align: center; max-width: 720px; margin: 0 auto 4rem; }
        .pr-features-eyebrow { display: inline-flex; align-items: center; justify-content: center; gap: 0.8rem; font-size: var(--t-eyebrow); font-weight: 700; letter-spacing: 0.32em; text-transform: uppercase; color: var(--gold); margin-bottom: 1.4rem; }
        .pr-features-eyebrow::before, .pr-features-eyebrow::after { content: ''; width: 28px; height: 1.5px; background: var(--gold); }
        .pr-features-title { font-family: var(--serif); font-size: var(--t-h2); font-weight: 300; line-height: 1.05; }
        .pr-features-title em { font-style: italic; color: var(--gold); }

        .pr-features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.6rem; }
        @media (max-width: 1000px) { .pr-features-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .pr-features-grid { grid-template-columns: 1fr; } }

        .pr-feature { padding: 2.2rem 1.9rem; background: var(--warm); border: 1px solid var(--border-l); border-radius: 4px; transition: all 0.35s var(--ease-out); position: relative; overflow: hidden; display: flex; flex-direction: column; }
        .pr-feature::before { content: ''; position: absolute; top: 0; left: 0; width: 0; height: 2px; background: var(--gold); transition: width 0.5s; }
        .pr-feature:hover::before { width: 100%; }
        .pr-feature:hover { border-color: var(--gold); box-shadow: var(--shadow-2); transform: translateY(-3px); }

        .pr-feature-icon { width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; background: var(--warm3); color: var(--gold); border-radius: 8px; margin-bottom: 1.2rem; transition: background 0.3s, color 0.3s, transform 0.3s; }
        .pr-feature-icon i { font-size: 1.2rem; }
        .pr-feature:hover .pr-feature-icon { background: var(--gold); color: var(--white); transform: rotate(-6deg) scale(1.05); }
        .pr-feature-type { font-size: 0.55rem; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: var(--gold); margin-bottom: 0.4rem; }
        .pr-feature-pub { font-size: 0.65rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted-l); margin-bottom: 0.5rem; }
        .pr-feature-title { font-family: var(--serif); font-size: 1.1rem; font-weight: 400; font-style: italic; line-height: 1.3; color: var(--ink); margin-bottom: 0.9rem; }
        .pr-feature-desc { font-size: 0.82rem; font-weight: 300; line-height: 1.65; color: var(--muted-l); margin-bottom: 1.2rem; flex: 1; }
        .pr-feature-link { display: inline-flex; align-items: center; gap: 0.4rem; font-size: 0.58rem; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: var(--ink); transition: gap 0.25s, color 0.25s; }
        .pr-feature:hover .pr-feature-link { color: var(--gold); gap: 0.7rem; }

        .pr-timeline { padding: 5rem var(--gutter); background: var(--ink); color: var(--white); border-top: 1px solid var(--border-d); }
        .pr-timeline-hd { text-align: center; max-width: 720px; margin: 0 auto 4rem; }
        .pr-timeline-eyebrow { display: inline-flex; align-items: center; justify-content: center; gap: 0.8rem; font-size: var(--t-eyebrow); font-weight: 700; letter-spacing: 0.32em; text-transform: uppercase; color: var(--gold3); margin-bottom: 1.4rem; }
        .pr-timeline-eyebrow::before, .pr-timeline-eyebrow::after { content: ''; width: 28px; height: 1.5px; background: var(--gold3); }
        .pr-timeline-title { font-family: var(--serif); font-size: var(--t-h2); font-weight: 300; }
        .pr-timeline-title em { font-style: italic; color: var(--gold3); }
        .pr-timeline-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 0; }
        @media (max-width: 1100px) { .pr-timeline-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 600px) { .pr-timeline-grid { grid-template-columns: repeat(2, 1fr); } }
        .pr-tp { padding: 1.5rem; border-right: 1px solid var(--border-d); border-bottom: 1px solid var(--border-d); }
        .pr-tp-yr { font-family: var(--serif); font-size: 2.4rem; font-weight: 300; color: var(--gold3); line-height: 1; margin-bottom: 0.5rem; }
        .pr-tp-role { font-size: 0.7rem; font-weight: 600; color: var(--white); margin-bottom: 0.3rem; }
        .pr-tp-detail { font-size: 0.7rem; font-weight: 300; line-height: 1.5; color: rgba(255,255,255,0.55); }
      `}</style>

      <PageHero
        eyebrow={<><i className="bi bi-megaphone-fill" /> Press · Media · Journalism</>}
        title={<>In the <em>Press</em> & <strong>Published</strong></>}
        subtitle="Before he was a prophet, he was one of Nigeria's most respected newspaper editors. Pioneer of The Glitterati at ThisDAY. Voice in print, online and on-screen for over four decades."
        image="/press-thinker.jpg"
        variant="dark"
      />

      {/* Glitterati hero */}
      <section className="pr-glitterati">
        <div className="pr-glitterati-pattern">
          <DotPattern color="currentColor" opacity={0.06} />
        </div>
        <Reveal>
          <div className="pr-glitterati-inner">
            <div className="pr-badge">
              <div className="pr-badge-t">Pioneer</div>
              <div className="pr-badge-n">The</div>
              <div className="pr-badge-n" style={{ fontSize: "1.2rem" }}>Glitterati</div>
              <div className="pr-badge-s">ThisDAY · Sunday</div>
            </div>
            <div>
              <div className="pr-glitterati-tag"><i className="bi bi-stars" /> Signature Achievement</div>
              <h2 className="pr-glitterati-title">How Dr. Hamilton created Nigeria's most iconic celebrity column</h2>
              <p className="pr-glitterati-desc">
                The Glitterati — ThisDAY Newspaper's lifestyle and entertainment pull-out of the Sunday edition —
                was pioneered by Dr. Hamilton during his editor years. It became the definitive page where Nigeria's
                glitterati converged: celebrities, society figures, politicians, cultural icons. In an exclusive
                interview with Naija Standard, he tells the full untold story for the first time.
              </p>
              <a className="pr-glitterati-link" href="https://nigeriastandardnewspaper.com/a/exclusive-interview-untold-story-of-how-i-pioneered-the-glitterati-in-thisday-newspaper-dr-kunle-hamilton-nigerias-ace-celebrity-editor-president-shaddaiville-ministries-international/" target="_blank" rel="noopener noreferrer">
                Read the Full Interview <i className="bi bi-arrow-right" />
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Features grid */}
      <section className="pr-features">
        <Reveal>
          <div className="pr-features-hd">
            <div className="pr-features-eyebrow">Media Features</div>
            <h2 className="pr-features-title">
              In the <em>news</em>, around the <em>world</em>
            </h2>
          </div>
        </Reveal>
        <div className="pr-features-grid">
          {FEATURES.map((f, i) => (
            <Reveal key={f.link} delay={i * 0.06}>
              <article className="pr-feature">
                <div className="pr-feature-icon"><i className={`bi ${f.icon}`} /></div>
                <div className="pr-feature-type">{f.type}</div>
                <div className="pr-feature-pub">{f.pub}</div>
                <h3 className="pr-feature-title">{f.title}</h3>
                <p className="pr-feature-desc">{f.desc}</p>
                <a className="pr-feature-link" href={f.link} target="_blank" rel="noopener noreferrer">
                  Read Article <i className="bi bi-arrow-up-right" />
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="pr-timeline">
        <Reveal>
          <div className="pr-timeline-hd">
            <div className="pr-timeline-eyebrow"><i className="bi bi-clock-history" /> Career Timeline</div>
            <h2 className="pr-timeline-title">
              Four <em>decades</em> in print
            </h2>
          </div>
        </Reveal>
        <div className="pr-timeline-grid">
          {TIMELINE.map((t, i) => (
            <Reveal key={t.yr + t.role} delay={i * 0.05}>
              <div className="pr-tp">
                <div className="pr-tp-yr">{t.yr}</div>
                <div className="pr-tp-role">{t.role}</div>
                <div className="pr-tp-detail">{t.detail}</div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.3}>
          <div style={{ marginTop: "3.5rem", display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            <Link to="/contact" className="btn">
              <i className="bi bi-envelope" /> Request an Interview
            </Link>
            <Link to="/news" className="btn btn-ghost-light">
              Read His Articles <i className="bi bi-arrow-right" />
            </Link>
          </div>
        </Reveal>
      </section>
    </Layout>
  );
}
