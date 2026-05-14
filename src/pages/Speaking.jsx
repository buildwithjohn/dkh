import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import MagneticWrap from "../components/MagneticWrap";
import {
  IconMic, IconChurch, IconBook, IconGraduation, IconBriefcase,
  BlobAccent, DotPattern, ScribbleUnderline, QuoteMark, Sparkles
} from "../components/Illustrations";

const EVENTS = [
  { d: "07", m: "Sep", yr: "2025", name: "Festival of the Word 8.0 — Annual Harvest", loc: "Yaba, Lagos", type: "Church · Keynote", icon: "bi-stars" },
  { d: "Oct", m: "", yr: "2025", name: "Celestial Showers Convention — 10XBetter", loc: "CCC PraiseVille, Lagos", type: "Leadership · Evangelism", icon: "bi-trophy" },
  { d: "TBC", m: "", yr: "2026", name: "ShaddaiVille Leadership Academy — UK Cohort", loc: "London, United Kingdom", type: "Leadership Training", icon: "bi-mortarboard" },
  { d: "TBC", m: "", yr: "2026", name: "Corporate Devotional & Leadership Keynote", loc: "Lagos Business Community", type: "Corporate Speaking", icon: "bi-briefcase" },
  { d: "TBC", m: "", yr: "2026", name: "Teenagers' Motivational Retreat — Berlin", loc: "Berlin, Germany", type: "Youth Empowerment", icon: "bi-people" },
];

const TOPICS = [
  { Icon: IconMic, title: "Keynotes", desc: "Headline speaking slots for major conferences, conventions and summits." },
  { Icon: IconChurch, title: "Church Revivals", desc: "Multi-day teaching engagements with depth — for congregations of any tradition." },
  { Icon: IconGraduation, title: "Leadership Conferences", desc: "Pastoral and corporate leadership training drawn from four decades of practice." },
  { Icon: IconBook, title: "University Lectures", desc: "Media studies, philosophy of communication, faith and intellect." },
  { Icon: IconMic, title: "Media Appearances", desc: "TV, radio and podcast interviews on doctrine, society, leadership." },
  { Icon: IconBriefcase, title: "Corporate Devotionals", desc: "Monday-morning devotionals for Christian-led companies and boardrooms." },
];

export default function Speaking() {
  return (
    <Layout
      title="Speaking"
      description="Book Dr. Kunle Hamilton to speak at your church, conference, university or corporate event. Available globally."
    >
      <style>{`
        .sp-pitch { padding: 5rem var(--gutter); background: var(--warm); display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
        @media (max-width: 900px) { .sp-pitch { grid-template-columns: 1fr; gap: 2rem; } }
        .sp-pitch-image { aspect-ratio: 4/5; overflow: hidden; border-radius: 4px; box-shadow: var(--shadow-2); }
        .sp-pitch-image img { width: 100%; height: 100%; object-fit: cover; object-position: center 20%; }

        .sp-pitch-eyebrow { display: inline-flex; align-items: center; gap: 0.8rem; font-size: var(--t-eyebrow); font-weight: 700; letter-spacing: 0.32em; text-transform: uppercase; color: var(--gold); margin-bottom: 1.4rem; }
        .sp-pitch-eyebrow::before { content: ''; width: 28px; height: 1.5px; background: var(--gold); }
        .sp-pitch-title { font-family: var(--serif); font-size: var(--t-h2); font-weight: 300; line-height: 1.05; letter-spacing: -0.02em; margin-bottom: 1.6rem; }
        .sp-pitch-title em { font-style: italic; color: var(--gold); }
        .sp-pitch-title strong { font-weight: 700; }
        .sp-pitch-lead { font-size: 1.05rem; font-weight: 300; line-height: 1.75; color: var(--muted-l); margin-bottom: 1.6rem; }
        .sp-pitch-lead strong { color: var(--ink); font-weight: 600; }
        .sp-pitch-quote { position: relative; padding: 1.5rem 1.5rem 1.5rem 4rem; margin-bottom: 2rem; background: var(--warm2); border-radius: 8px; border-left: 4px solid var(--gold); }
        .sp-pitch-quote-mark { position: absolute; top: 0.5rem; left: 1rem; width: 36px; height: 32px; color: var(--gold); opacity: 0.4; }
        .sp-pitch-quote-text { font-family: var(--serif); font-size: 1.15rem; font-style: italic; font-weight: 300; line-height: 1.55; color: var(--ink); margin-bottom: 0.6rem; }
        .sp-pitch-quote-by { font-size: 0.62rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); }

        .sp-topics { padding: 5rem var(--gutter); background: var(--ink); color: var(--white); }
        .sp-topics-hd { text-align: center; max-width: 720px; margin: 0 auto 4rem; }
        .sp-topics-eyebrow { display: inline-flex; align-items: center; justify-content: center; gap: 0.8rem; font-size: var(--t-eyebrow); font-weight: 700; letter-spacing: 0.32em; text-transform: uppercase; color: var(--gold3); margin-bottom: 1.4rem; }
        .sp-topics-eyebrow::before, .sp-topics-eyebrow::after { content: ''; width: 28px; height: 1.5px; background: var(--gold3); }
        .sp-topics-title { font-family: var(--serif); font-size: var(--t-h2); font-weight: 300; line-height: 1.05; }
        .sp-topics-title em { font-style: italic; color: var(--gold3); }

        .sp-topics-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.4rem; }
        @media (max-width: 900px) { .sp-topics-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .sp-topics-grid { grid-template-columns: 1fr; } }
        .sp-topic { padding: 1.8rem 1.6rem; background: rgba(255,255,255,0.03); border: 1px solid var(--border-d); border-radius: 4px; transition: all 0.3s var(--ease-out); }
        .sp-topic:hover { background: rgba(255,255,255,0.06); border-color: var(--gold); transform: translateY(-2px); }
        .sp-topic-icon { width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; background: var(--gold); color: var(--white); border-radius: 8px; margin-bottom: 1rem; transition: transform 0.3s; }
        .sp-topic-icon svg { width: 24px; height: 24px; }
        .sp-topic:hover .sp-topic-icon { transform: rotate(-8deg) scale(1.05); }
        .sp-topic-title { font-family: var(--serif); font-size: 1.2rem; font-weight: 500; font-style: italic; color: var(--white); margin-bottom: 0.5rem; }
        .sp-topic-desc { font-size: 0.82rem; font-weight: 300; line-height: 1.6; color: rgba(255,255,255,0.6); }

        .sp-events { padding: 5rem var(--gutter); background: var(--warm); }
        .sp-events-hd { display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 1.5rem; margin-bottom: 3rem; }
        .sp-events-title { font-family: var(--serif); font-size: var(--t-h2); font-weight: 300; line-height: 1.05; }
        .sp-events-title em { font-style: italic; color: var(--gold); }

        .sp-event { display: grid; grid-template-columns: 88px 1fr auto; gap: 2rem; padding: 1.8rem 0; border-bottom: 1px solid var(--border-l); transition: background 0.25s, padding-left 0.25s; align-items: center; }
        @media (max-width: 700px) { .sp-event { grid-template-columns: 80px 1fr; gap: 1.5rem; padding: 1.5rem 0; } .sp-event-type-tag { display: none; } }
        .sp-event:hover { padding-left: 1rem; }
        .sp-event-date { text-align: center; }
        .sp-event-d { font-family: var(--serif); font-size: 2.4rem; font-weight: 300; color: var(--gold); line-height: 1; }
        .sp-event-m { font-size: 0.55rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted-l); margin-top: 0.3rem; }
        .sp-event-yr { font-size: 0.55rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted-l2); margin-top: 0.2rem; }
        .sp-event-name { font-family: var(--serif); font-size: 1.2rem; font-style: italic; font-weight: 400; color: var(--ink); margin-bottom: 0.4rem; line-height: 1.3; }
        .sp-event-meta { display: flex; gap: 0.7rem; align-items: center; flex-wrap: wrap; font-size: 0.78rem; color: var(--muted-l); }
        .sp-event-meta i { color: var(--gold); }
        .sp-event-type-tag { font-size: 0.55rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold); padding: 0.45rem 0.85rem; background: var(--warm3); border-radius: 4px; white-space: nowrap; }

        .sp-cta { padding: 5rem var(--gutter); background: linear-gradient(135deg, var(--ink2) 0%, var(--ink) 100%); color: var(--white); text-align: center; }
        .sp-cta-inner { max-width: 720px; margin: 0 auto; }
      `}</style>

      <PageHero
        eyebrow={<><i className="bi bi-mic-fill" /> Speaking & Engagements</>}
        title={<>Book Dr. Hamilton <em>to speak</em></>}
        subtitle="Available globally for churches, conferences, universities, corporate events and media appearances. His rare blend of academic rigour, prophetic authority and four decades of media experience makes every engagement unforgettable."
        image="/speaking.jpg"
        variant="dark"
      >
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Link to="/contact" className="btn">
            <i className="bi bi-envelope" /> Send Speaking Request
          </Link>
          <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.55)", alignSelf: "center", letterSpacing: "0.05em" }}>
            <i className="bi bi-clock" /> Typical response within 48 hours
          </span>
        </div>
      </PageHero>

      {/* Pitch */}
      <section className="sp-pitch">
        <Reveal>
          <div className="sp-pitch-image">
            <img src="/speaking.jpg" alt="Dr. Kunle Hamilton speaking" loading="lazy" />
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div>
            <div className="sp-pitch-eyebrow">A Voice That Travels</div>
            <h2 className="sp-pitch-title">
              When <strong>your audience</strong> deserves <em>more</em>
            </h2>
            <p className="sp-pitch-lead">
              Dr. Hamilton has spoken at <strong>churches, conferences, corporates, universities, leadership summits and media platforms</strong> across Nigeria, Germany, the UK and the USA. He brings the rare gift of a working journalist's clarity, a philosopher's depth and a prophet's authority — all in one voice.
            </p>
            <div className="sp-pitch-quote">
              <QuoteMark className="sp-pitch-quote-mark" />
              <p className="sp-pitch-quote-text">
                "The responsibility of leaders is to guide young people toward righteousness — not to encourage them to chase fame through questionable means."
              </p>
              <div className="sp-pitch-quote-by">— Dr. Kunle Hamilton</div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Topics */}
      <section className="sp-topics">
        <Reveal>
          <div className="sp-topics-hd">
            <div className="sp-topics-eyebrow">Available For</div>
            <h2 className="sp-topics-title">
              Six <em>kinds</em> of engagement
            </h2>
          </div>
        </Reveal>
        <div className="sp-topics-grid">
          {TOPICS.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.06}>
              <div className="sp-topic">
                <div className="sp-topic-icon"><t.Icon /></div>
                <h3 className="sp-topic-title">{t.title}</h3>
                <p className="sp-topic-desc">{t.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Events */}
      <section className="sp-events">
        <Reveal>
          <div className="sp-events-hd">
            <div>
              <div className="sp-pitch-eyebrow"><i className="bi bi-calendar3" /> Upcoming Events</div>
              <h2 className="sp-events-title">
                Where you can <em>find him</em>
              </h2>
            </div>
            <Link to="/contact" className="btn btn-ghost">
              Request a Date <i className="bi bi-arrow-right" />
            </Link>
          </div>
        </Reveal>

        <div>
          {EVENTS.map((e, i) => (
            <Reveal key={e.name} delay={i * 0.05}>
              <div className="sp-event">
                <div className="sp-event-date">
                  <div className="sp-event-d">{e.d}</div>
                  {e.m && <div className="sp-event-m">{e.m}</div>}
                  <div className="sp-event-yr">{e.yr}</div>
                </div>
                <div>
                  <h3 className="sp-event-name">{e.name}</h3>
                  <div className="sp-event-meta">
                    <i className={`bi ${e.icon}`} />
                    <span>{e.type}</span>
                    <span style={{ color: "var(--muted-l2)" }}>·</span>
                    <i className="bi bi-geo-alt" />
                    <span>{e.loc}</span>
                  </div>
                </div>
                <span className="sp-event-type-tag">{e.type}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="sp-cta">
        <div className="sp-cta-inner">
          <Reveal>
            <div className="sp-topics-eyebrow"><i className="bi bi-send-fill" /> Ready to Book?</div>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "var(--t-h2)", fontWeight: 300, lineHeight: 1.05, marginBottom: "1.4rem" }}>
              Let's bring his <em style={{ fontStyle: "italic", color: "var(--gold3)" }}>voice</em> to your platform
            </h2>
            <p style={{ fontSize: "1.05rem", fontWeight: 300, lineHeight: 1.7, color: "rgba(255,255,255,0.72)", marginBottom: "2.2rem" }}>
              Send your speaking request today. Most engagements are confirmed within 48 hours, with full briefing materials shared one week before the event.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/contact" className="btn">
                <i className="bi bi-envelope-fill" /> Send Speaking Request
              </Link>
              <a href="tel:+234" className="btn btn-ghost-light">
                <i className="bi bi-telephone-fill" /> Call Direct
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
