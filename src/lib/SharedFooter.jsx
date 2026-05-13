import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useSubscribe } from "./subscribe";
import { useVisitorCount } from "./visitorCount";

/**
 * SharedFooter — used on every page.
 * Includes:
 *  - 4-column nav grid
 *  - Email subscribe form
 *  - Live visitor counter (pulsing dot + total)
 */
export function SharedFooter() {
  const { status, message, subscribe } = useSubscribe();
  const { total, loading } = useVisitorCount();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    const ok = await subscribe(email, { source: "footer" });
    if (ok) setEmail("");
  };

  return (
    <>
      <style>{`
        .ftx { background: var(--ink); color: var(--white); border-top: 2px solid var(--gold); }
        .ftx-top { padding: 5rem 7vw 3rem; display: grid; grid-template-columns: 1.4fr 1fr 1fr 1fr; gap: 3.5rem; }
        @media(max-width:1000px) { .ftx-top { grid-template-columns: 1fr 1fr; } }
        @media(max-width:600px) { .ftx-top { grid-template-columns: 1fr; gap: 2.5rem; padding: 4rem 7vw 2rem; } }

        .ftx-brand { font-family: var(--serif); font-size: 1.55rem; font-weight: 300; letter-spacing: -.01em; margin-bottom: .6rem; }
        .ftx-brand em { font-style: italic; color: #93C5FD; }
        .ftx-tag { font-size: .82rem; font-weight: 300; line-height: 1.7; color: rgba(255,255,255,.62); margin-bottom: 1.6rem; max-width: 360px; }

        /* Subscribe form */
        .ftx-sub-label { font-size: .55rem; font-weight: 700; letter-spacing: .22em; text-transform: uppercase; color: rgba(147,197,253,.9); margin-bottom: .7rem; display: block; }
        .ftx-sub { display: flex; gap: 0; max-width: 360px; }
        .ftx-sub-input {
          flex: 1; background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.12);
          color: var(--white); font-family: var(--sans); font-size: .82rem; font-weight: 300;
          padding: .8rem 1rem; outline: none; border-radius: 3px 0 0 3px;
          transition: border-color .2s;
        }
        .ftx-sub-input:focus { border-color: var(--gold); background: rgba(255,255,255,.10); }
        .ftx-sub-input::placeholder { color: rgba(255,255,255,.35); }
        .ftx-sub-btn {
          background: var(--gold); color: var(--white); border: none;
          font-size: .65rem; font-weight: 700; letter-spacing: .15em; text-transform: uppercase;
          padding: 0 1.3rem; border-radius: 0 3px 3px 0;
          cursor: pointer; transition: background .25s;
        }
        .ftx-sub-btn:hover { background: var(--gold2); }
        .ftx-sub-btn:disabled { opacity: .5; cursor: wait; }
        .ftx-sub-msg { margin-top: .8rem; font-size: .72rem; font-weight: 300; line-height: 1.55; }
        .ftx-sub-msg.ok { color: #93C5FD; }
        .ftx-sub-msg.err { color: #fca5a5; }

        .ftx-col h4 { font-size: .58rem; font-weight: 700; letter-spacing: .22em; text-transform: uppercase; color: rgba(255,255,255,.9); margin-bottom: 1.2rem; }
        .ftx-col a { display: block; font-size: .82rem; font-weight: 300; color: rgba(255,255,255,.72); margin-bottom: .65rem; transition: color .2s, transform .2s; }
        .ftx-col a:hover { color: var(--white); transform: translateX(3px); }

        /* Bottom bar */
        .ftx-bottom { padding: 1.8rem 7vw; border-top: 1px solid rgba(255,255,255,.08); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1.5rem; }
        .ftx-copy { font-size: .68rem; color: rgba(255,255,255,.55); }
        .ftx-visitor { display: flex; align-items: center; gap: .8rem; font-size: .68rem; color: rgba(255,255,255,.6); font-weight: 500; letter-spacing: .04em; }
        .ftx-pulse { width: 9px; height: 9px; border-radius: 50%; background: #22c55e; position: relative; flex-shrink: 0; }
        .ftx-pulse::after { content: ''; position: absolute; inset: -3px; border-radius: 50%; background: #22c55e; opacity: .4; animation: pulse-ring 1.6s ease-out infinite; }
        @keyframes pulse-ring { 0% { transform: scale(.5); opacity: .8; } 100% { transform: scale(1.8); opacity: 0; } }
        .ftx-visitor-num { color: var(--white); font-weight: 600; font-variant-numeric: tabular-nums; }
      `}</style>

      <footer className="ftx">
        <div className="ftx-top">
          {/* Brand + Subscribe */}
          <div>
            <div className="ftx-brand">Dr. Kunle <em>Hamilton</em></div>
            <p className="ftx-tag">
              Nigeria's foremost prophet-scholar. Newsletters with new books, sermons,
              press features and ministry updates — delivered to your inbox.
            </p>
            <label className="ftx-sub-label" htmlFor="ftx-email">Join the Newsletter</label>
            <form className="ftx-sub" onSubmit={handleSubmit}>
              <input
                id="ftx-email"
                type="email"
                className="ftx-sub-input"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="ftx-sub-btn"
                disabled={status === "submitting" || status === "success"}
              >
                {status === "submitting" ? "..." : status === "success" ? "✓" : "Join"}
              </button>
            </form>
            <AnimatePresence>
              {status === "success" && (
                <motion.p
                  className="ftx-sub-msg ok"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {message}
                </motion.p>
              )}
              {status === "error" && (
                <motion.p
                  className="ftx-sub-msg err"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Explore column */}
          <div className="ftx-col">
            <h4>Explore</h4>
            <Link to="/#about">About</Link>
            <Link to="/#books">Books</Link>
            <Link to="/#speaking">Speaking</Link>
            <Link to="/#press">Press</Link>
            <Link to="/news">News & Blog</Link>
            <Link to="/#contact">Contact</Link>
          </div>

          {/* Media column */}
          <div className="ftx-col">
            <h4>Media & Press</h4>
            <Link to="/#speaking">Book as Speaker</Link>
            <Link to="/#contact">Request Interview</Link>
            <Link to="/news">Latest Articles</Link>
            <a href="https://www.youtube.com/@cccpraiseville" target="_blank" rel="noopener noreferrer">
              YouTube Channel
            </a>
          </div>

          {/* Ministries column */}
          <div className="ftx-col">
            <h4>Ministries</h4>
            <Link to="/#ministries">CCC PraiseVille Global</Link>
            <Link to="/#ministries">ShaddaiVille Int'l</Link>
            <a href="https://www.shaddaiville.org" target="_blank" rel="noopener noreferrer" style={{ color: "#93C5FD" }}>
              → shaddaiville.org
            </a>
          </div>
        </div>

        <div className="ftx-bottom">
          <div className="ftx-copy">© 2026 Dr. Kunle Hamilton · kunlehamilton.com</div>
          <div className="ftx-visitor" title="Total page visits — live">
            <span className="ftx-pulse" aria-hidden="true" />
            <span>
              Live ·{" "}
              <span className="ftx-visitor-num">
                {loading || total === null ? "•••" : total.toLocaleString()}
              </span>{" "}
              visits
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
