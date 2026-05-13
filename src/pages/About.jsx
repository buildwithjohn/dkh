import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";

export default function About() {
  const roles = [
    { icon: "bi-newspaper", title: "Newspaper Editor & PR Veteran", detail: "35+ years in Nigerian media, advertising & reputation management. Editor at Vanguard and ThisDAY. Pioneer of The Glitterati Sunday pull-out." },
    { icon: "bi-book", title: "International Author", detail: "Four titles published by Lambert Academic Publishing across 18 European countries — leadership, communication, politics, film studies." },
    { icon: "bi-person-arms-up", title: "Senior Shepherd", detail: "CCC PraiseVille Global — founded in Berlin (May 8, 2016). Now in Nigeria, Germany, UK and USA." },
    { icon: "bi-mortarboard", title: "Founder & President", detail: "ShaddaiVille Ministries International — UK-certified leadership academy, free of charge, since 2007." },
    { icon: "bi-mic-fill", title: "Radio Host & Public Speaker", detail: "Raypower 100.5 FM host. Keynote speaker at churches, universities, corporates and conferences across five nations." },
    { icon: "bi-briefcase", title: "CEO", detail: "Virgin Outdoor — Reputation & Brand Management consultancy, Lagos." },
  ];

  return (
    <Layout title="About" description="The full story of Dr. Kunle Hamilton — prophet, scholar, journalist, author, speaker.">
      <style>{`
        .ab-quote { padding: 5rem var(--gutter); background: var(--warm); border-bottom: 1px solid var(--border-l); }
        .ab-quote-inner { max-width: 900px; margin: 0 auto; }
        .ab-quote-mark { font-family: var(--serif); font-size: 5rem; font-style: italic; line-height: 1; color: var(--gold); margin-bottom: 1rem; }
        .ab-quote-text { font-family: var(--serif); font-size: clamp(1.4rem, 2.6vw, 2.1rem); font-weight: 300; font-style: italic; line-height: 1.4; color: var(--ink); margin-bottom: 1.4rem; }
        .ab-quote-by { font-size: 0.7rem; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted-l); }

        .ab-story { padding: 6rem var(--gutter); background: var(--warm); display: grid; grid-template-columns: 420px 1fr; gap: 5rem; align-items: start; }
        @media (max-width: 1000px) { .ab-story { grid-template-columns: 1fr; gap: 3rem; } }

        .ab-photo { position: sticky; top: 100px; aspect-ratio: 3/4; overflow: hidden; border-radius: 4px; box-shadow: var(--shadow-2); }
        @media (max-width: 1000px) { .ab-photo { position: static; max-width: 500px; } }
        .ab-photo img { width: 100%; height: 100%; object-fit: cover; object-position: center 15%; }

        .ab-prose h2 { font-family: var(--serif); font-size: clamp(2rem, 4vw, 3.4rem); font-weight: 300; line-height: 1.05; letter-spacing: -0.015em; margin-bottom: 1.8rem; }
        .ab-prose h2 em { font-style: italic; color: var(--gold); }
        .ab-prose h2 strong { font-weight: 700; }
        .ab-prose p { font-size: 1.05rem; font-weight: 300; line-height: 1.8; color: var(--ink); margin-bottom: 1.4rem; }
        .ab-prose p strong { font-weight: 600; color: var(--ink); }
        .ab-prose .lead { font-size: 1.15rem; font-style: italic; color: var(--muted-l); font-family: var(--serif); font-weight: 400; line-height: 1.55; margin-bottom: 2rem; padding-left: 1.5rem; border-left: 3px solid var(--gold); }

        .ab-roles { padding: 6rem var(--gutter); background: var(--ink); color: var(--white); }
        .ab-roles-hd { text-align: center; max-width: 720px; margin: 0 auto 4rem; }
        .ab-roles-eyebrow { display: inline-flex; align-items: center; gap: 0.8rem; font-size: var(--t-eyebrow); font-weight: 700; letter-spacing: 0.32em; text-transform: uppercase; color: var(--gold3); margin-bottom: 1.4rem; }
        .ab-roles-eyebrow::before, .ab-roles-eyebrow::after { content: ''; width: 28px; height: 1.5px; background: var(--gold3); }
        .ab-roles-title { font-family: var(--serif); font-size: var(--t-h2); font-weight: 300; line-height: 1.05; }
        .ab-roles-title em { font-style: italic; color: var(--gold3); }

        .ab-roles-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
        @media (max-width: 800px) { .ab-roles-grid { grid-template-columns: 1fr; } }

        .ab-role { padding: 2rem; background: rgba(255,255,255,0.03); border: 1px solid var(--border-d); border-radius: 4px; transition: all 0.3s var(--ease-out); position: relative; }
        .ab-role::before { content: ''; position: absolute; left: 0; top: 0; width: 2px; height: 0; background: var(--gold); transition: height 0.4s; }
        .ab-role:hover::before { height: 100%; }
        .ab-role:hover { background: rgba(255,255,255,0.06); border-color: var(--gold); transform: translateX(4px); }

        .ab-role-hd { display: flex; align-items: center; gap: 1rem; margin-bottom: 0.8rem; }
        .ab-role-icon { width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; background: var(--gold); color: var(--white); border-radius: 4px; font-size: 1.2rem; flex-shrink: 0; }
        .ab-role-title { font-family: var(--serif); font-size: 1.2rem; font-weight: 500; color: var(--white); font-style: italic; }
        .ab-role-detail { font-size: 0.88rem; font-weight: 300; line-height: 1.7; color: rgba(255,255,255,0.65); }

        .ab-edu { padding: 6rem var(--gutter); background: var(--warm); text-align: center; }
        .ab-edu-eyebrow { display: inline-flex; align-items: center; justify-content: center; gap: 0.8rem; font-size: var(--t-eyebrow); font-weight: 700; letter-spacing: 0.32em; text-transform: uppercase; color: var(--gold); margin-bottom: 1.6rem; }
        .ab-edu-eyebrow::before, .ab-edu-eyebrow::after { content: ''; width: 28px; height: 1.5px; background: var(--gold); }
        .ab-edu-title { font-family: var(--serif); font-size: var(--t-h2); font-weight: 300; line-height: 1.05; margin-bottom: 1.4rem; }
        .ab-edu-title em { font-style: italic; color: var(--gold); }
        .ab-edu-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; max-width: 880px; margin: 3rem auto 0; }
        @media (max-width: 700px) { .ab-edu-grid { grid-template-columns: 1fr; } }
        .ab-edu-card { padding: 2.5rem 2rem; background: var(--warm2); border: 1px solid var(--border-l); border-radius: 4px; }
        .ab-edu-year { font-family: var(--serif); font-size: 3rem; font-weight: 300; color: var(--gold); line-height: 1; margin-bottom: 0.5rem; }
        .ab-edu-degree { font-family: var(--serif); font-size: 1.25rem; font-style: italic; color: var(--ink); margin-bottom: 0.5rem; }
        .ab-edu-school { font-size: 0.75rem; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: var(--muted-l); }
      `}</style>

      <PageHero
        eyebrow={<><i className="bi bi-person-fill" /> The Full Story</>}
        title={<>Prophet. <strong>Scholar.</strong> <em>Voice.</em></>}
        subtitle="A rare convergence of pulpit, press, pen and pedagogy. Dr. Kunle Hamilton's life is the living proof that faith and intellect are not opposites — they are partners in shaping nations."
        image="/about.jpg"
        variant="dark"
      />

      {/* Story */}
      <section className="ab-story">
        <Reveal>
          <div className="ab-photo">
            <img src="/about.jpg" alt="Dr. Kunle Hamilton" loading="lazy" />
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="ab-prose">
            <h2>
              The <em>journey</em> from <strong>philosophy class</strong> to <em>prophet's altar</em>
            </h2>

            <p className="lead">
              "I never imagined a Best Student in Philosophy at the University of Lagos
              would one day stand before nations as a prophet of God. But that is the
              story God has written with my life."
            </p>

            <p>
              Dr. Kunle Hamilton is one of Nigeria's most remarkable public figures — <strong>a prophet, a scholar, a journalist, a speaker and an author</strong> whose singular journey is unlike any other.
            </p>

            <p>
              He emerged from the <strong>University of Lagos as a First Class graduate in Philosophy (1985)</strong>, the Best Student of his class. He went on to a Master's in Mass Communication from the same university. Few people fuse rigorous academic thought with prophetic grace the way he does.
            </p>

            <p>
              In the years that followed, he became a celebrated <strong>newspaper editor at Vanguard and ThisDAY</strong>, where he conceived and pioneered <em>The Glitterati</em> — the lifestyle and celebrity pull-out of ThisDAY's Sunday edition. The page became, and remains, the defining society chronicle of contemporary Nigerian elite life.
            </p>

            <p>
              While building his media career, he founded <strong>ShaddaiVille Ministries International in 2007</strong> — a non-denominational leadership and discipleship academy, delivering UK-certified training at no charge to Christians, Muslims and secular professionals across five nations.
            </p>

            <p>
              Nine years later, on <strong>May 8, 2016</strong>, in a rented hall in Berlin, he inaugurated <strong>CCC PraiseVille Global</strong> — a Celestial Church of Christ parish that today spans Germany, Nigeria, the UK and the USA.
            </p>

            <p>
              He is also <strong>CEO of Virgin Outdoor</strong>, a Lagos-based reputation and brand management consultancy, and an <strong>international author</strong> with four titles published by Lambert Academic Publishing across 18 European countries.
            </p>

            <p>
              Married to Taiwo, blessed with three children, Dr. Hamilton is the living proof that the church and the newsroom, the prophet's altar and the philosopher's chair, can be carried in one life — with excellence on every side.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Roles grid */}
      <section className="ab-roles">
        <Reveal>
          <div className="ab-roles-hd">
            <div className="ab-roles-eyebrow">Roles & Responsibilities</div>
            <h2 className="ab-roles-title">
              Six <em>chairs</em>. One <em>life</em>.
            </h2>
          </div>
        </Reveal>

        <div className="ab-roles-grid">
          {roles.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.08}>
              <div className="ab-role">
                <div className="ab-role-hd">
                  <div className="ab-role-icon"><i className={`bi ${r.icon}`} /></div>
                  <h3 className="ab-role-title">{r.title}</h3>
                </div>
                <p className="ab-role-detail">{r.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="ab-edu">
        <Reveal>
          <div className="ab-edu-eyebrow">Academic Foundation</div>
          <h2 className="ab-edu-title">
            Trained at <em>UNILAG</em>
          </h2>
        </Reveal>

        <div className="ab-edu-grid">
          <Reveal delay={0.1}>
            <div className="ab-edu-card">
              <div className="ab-edu-year">1985</div>
              <div className="ab-edu-degree">BA Philosophy — Best Student</div>
              <div className="ab-edu-school">University of Lagos · First Class Honours</div>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="ab-edu-card">
              <div className="ab-edu-year">1990</div>
              <div className="ab-edu-degree">M.Sc. Mass Communication</div>
              <div className="ab-edu-school">University of Lagos</div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.3}>
          <div style={{ marginTop: "3.5rem", display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/ministries" className="btn">
              His Ministries <i className="bi bi-arrow-right" />
            </Link>
            <Link to="/press" className="btn btn-ghost">
              Press & Media <i className="bi bi-newspaper" />
            </Link>
          </div>
        </Reveal>
      </section>
    </Layout>
  );
}
