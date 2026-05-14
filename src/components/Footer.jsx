import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useSubscribe } from "../lib/subscribe";
import { useVisitorCount } from "../lib/visitorCount";

export default function Footer() {
  const { status, message, subscribe } = useSubscribe();
  const { total, loading } = useVisitorCount();
  const [email, setEmail] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!email) return;
    const ok = await subscribe(email, { source: "footer" });
    if (ok) setEmail("");
  };

  return (
    <>
      <style>{`
        .footer { background: var(--ink); color: var(--white); border-top: 2px solid var(--gold); position: relative; overflow: hidden; }
        .footer::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 15% 30%, rgba(37,99,235,0.10), transparent 50%); pointer-events: none; }

        .footer-inner { position: relative; padding: 5.5rem var(--gutter) 2rem; }

        .footer-top { display: grid; grid-template-columns: 1.5fr 1fr 1fr 1fr; gap: 4rem; margin-bottom: 4rem; }
        @media (max-width: 1000px) { .footer-top { grid-template-columns: 1fr 1fr; gap: 3rem; } }
        @media (max-width: 600px) { .footer-top { grid-template-columns: 1fr; gap: 2.5rem; } }

        .footer-brand-row { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
        .footer-brand-logo { width: 52px; height: 52px; flex-shrink: 0; }
        .footer-brand { font-family: var(--serif); font-size: 1.7rem; font-weight: 400; line-height: 1; letter-spacing: -0.01em; }
        .footer-brand em { font-style: italic; color: var(--gold3); }
        .footer-tag { font-size: 0.85rem; font-weight: 300; line-height: 1.7; color: rgba(255,255,255,0.62); margin-bottom: 1.8rem; max-width: 380px; }

        .sub-label { font-size: 0.55rem; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase; color: var(--gold3); margin-bottom: 0.7rem; display: flex; align-items: center; gap: 0.5rem; }
        .sub-form { display: flex; max-width: 380px; }
        .sub-input { flex: 1; min-width: 0; padding: 0.85rem 1rem; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); color: var(--white); font-family: var(--sans); font-size: 0.85rem; outline: none; border-radius: 3px 0 0 3px; transition: all 0.2s; }
        .sub-input::placeholder { color: rgba(255,255,255,0.35); }
        .sub-input:focus { border-color: var(--gold); background: rgba(255,255,255,0.10); }
        .sub-btn { background: var(--gold); color: var(--white); border: none; padding: 0 1.4rem; border-radius: 0 3px 3px 0; font-size: 0.95rem; transition: background 0.25s; }
        .sub-btn:hover { background: var(--gold2); }
        .sub-btn:disabled { opacity: 0.5; cursor: wait; }
        .sub-msg { margin-top: 0.8rem; font-size: 0.75rem; font-weight: 300; line-height: 1.55; }
        .sub-msg.ok { color: var(--gold3); }
        .sub-msg.err { color: #fca5a5; }

        .ft-col-h { font-size: 0.6rem; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(255,255,255,0.90); margin-bottom: 1.4rem; }
        .ft-col a { display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; font-weight: 300; color: rgba(255,255,255,0.65); padding: 0.4rem 0; transition: color 0.2s, transform 0.2s; }
        .ft-col a:hover { color: var(--white); transform: translateX(4px); }
        .ft-col a i { font-size: 0.7rem; opacity: 0.5; }

        .footer-bottom { padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.08); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; }
        .ft-copy { font-size: 0.72rem; color: rgba(255,255,255,0.5); }
        .ft-socials { display: flex; gap: 0.8rem; }
        .ft-socials a { width: 36px; height: 36px; border: 1px solid rgba(255,255,255,0.15); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.6); font-size: 1rem; transition: all 0.25s; }
        .ft-socials a:hover { background: var(--gold); border-color: var(--gold); color: var(--white); transform: translateY(-2px); }

        .live-count { display: flex; align-items: center; gap: 0.7rem; font-size: 0.72rem; color: rgba(255,255,255,0.6); font-weight: 500; }
        .pulse { width: 9px; height: 9px; border-radius: 50%; background: #22c55e; position: relative; flex-shrink: 0; box-shadow: 0 0 8px rgba(34,197,94,0.5); }
        .pulse::after { content: ''; position: absolute; inset: -3px; border-radius: 50%; background: #22c55e; opacity: 0.4; animation: pulse-ring 1.6s ease-out infinite; }
        @keyframes pulse-ring { 0% { transform: scale(0.6); opacity: 0.8; } 100% { transform: scale(2); opacity: 0; } }
        .live-num { color: var(--white); font-weight: 600; font-variant-numeric: tabular-nums; }
      `}</style>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-top">
            {/* Brand + subscribe */}
            <div>
              <div className="footer-brand-row">
                <img src="/kh-logo-nav.png" alt="KH" className="footer-brand-logo" width="52" height="52" />
                <h3 className="footer-brand">Dr. Kunle <em>Hamilton</em></h3>
              </div>
              <p className="footer-tag">
                Nigeria's foremost prophet-scholar. Subscribe for new books, sermons,
                press features and ministry updates — delivered to your inbox.
              </p>
              <div className="sub-label">
                <i className="bi bi-envelope-paper" /> Join the Newsletter
              </div>
              <form className="sub-form" onSubmit={submit}>
                <input
                  type="email"
                  className="sub-input"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Email address"
                />
                <button
                  type="submit"
                  className="sub-btn"
                  disabled={status === "submitting" || status === "success"}
                  aria-label="Subscribe"
                >
                  {status === "submitting" ? (
                    <i className="bi bi-arrow-clockwise" />
                  ) : status === "success" ? (
                    <i className="bi bi-check-lg" />
                  ) : (
                    <i className="bi bi-arrow-right" />
                  )}
                </button>
              </form>
              <AnimatePresence>
                {(status === "success" || status === "error") && (
                  <motion.p
                    className={`sub-msg ${status === "success" ? "ok" : "err"}`}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    {message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Explore */}
            <div className="ft-col">
              <h4 className="ft-col-h">Explore</h4>
              <Link to="/about"><i className="bi bi-chevron-right" /> About</Link>
              <Link to="/books"><i className="bi bi-chevron-right" /> Books</Link>
              <Link to="/press"><i className="bi bi-chevron-right" /> Press</Link>
              <Link to="/news"><i className="bi bi-chevron-right" /> News & Blog</Link>
              <Link to="/videos"><i className="bi bi-chevron-right" /> Videos</Link>
            </div>

            {/* Engage */}
            <div className="ft-col">
              <h4 className="ft-col-h">Engage</h4>
              <Link to="/speaking"><i className="bi bi-chevron-right" /> Book as Speaker</Link>
              <Link to="/contact"><i className="bi bi-chevron-right" /> Request Interview</Link>
              <Link to="/ministries"><i className="bi bi-chevron-right" /> Ministries</Link>
              <Link to="/contact"><i className="bi bi-chevron-right" /> Contact</Link>
            </div>

            {/* External */}
            <div className="ft-col">
              <h4 className="ft-col-h">External</h4>
              <a href="https://www.shaddaiville.org" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-box-arrow-up-right" /> ShaddaiVille.org
              </a>
              <a href="https://www.youtube.com/@cccpraiseville" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-youtube" /> YouTube Channel
              </a>
              <a href="https://www.amazon.com" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-cart" /> Buy Books on Amazon
              </a>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="ft-copy">© 2026 Dr. Kunle Hamilton · kunlehamilton.com</div>

            <div className="ft-socials">
              <a href="https://www.youtube.com/@cccpraiseville" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <i className="bi bi-youtube" />
              </a>
              <a href="https://www.shaddaiville.org" target="_blank" rel="noopener noreferrer" aria-label="ShaddaiVille">
                <i className="bi bi-globe" />
              </a>
              <a href="mailto:info@kunlehamilton.com" aria-label="Email">
                <i className="bi bi-envelope" />
              </a>
            </div>

            <div className="live-count" title="Total page visits — live">
              <span className="pulse" aria-hidden="true" />
              <span>
                <span className="live-num">{loading || total === null ? "•••" : total.toLocaleString()}</span>{" "}
                visits · live
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
