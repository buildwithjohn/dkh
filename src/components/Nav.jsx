import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { to: "/about", label: "About" },
  { to: "/ministries", label: "Ministries" },
  { to: "/books", label: "Books" },
  { to: "/press", label: "Press" },
  { to: "/news", label: "News" },
  { to: "/speaking", label: "Speaking" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <>
      <style>{`
        .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 200; height: 70px; display: flex; align-items: center; justify-content: space-between; padding: 0 var(--gutter); background: rgba(255,255,255,0.96); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); border-bottom: 1px solid transparent; transition: box-shadow 0.3s, border-color 0.3s; }
        .nav.scrolled { box-shadow: 0 2px 20px rgba(9,21,42,0.06); border-bottom-color: rgba(9,21,42,0.06); }

        .nav-brand { display: flex; align-items: center; gap: 0.8rem; color: var(--ink); letter-spacing: -0.005em; white-space: nowrap; transition: opacity 0.2s; }
        .nav-brand:hover { opacity: 0.8; }
        .nav-brand-logo { width: 38px; height: 38px; flex-shrink: 0; object-fit: contain; transition: transform 0.4s var(--ease-out); }
        .nav-brand:hover .nav-brand-logo { transform: rotate(-8deg) scale(1.05); }
        .nav-brand-text { font-family: var(--serif); font-size: 1.02rem; font-weight: 500; line-height: 1; }
        .nav-brand-text em { font-style: italic; font-weight: 400; color: var(--gold); }
        @media (max-width: 480px) { .nav-brand-text { display: none; } }

        .nav-center { display: flex; align-items: center; gap: 2.2rem; }
        @media (max-width: 1000px) { .nav-center { display: none; } }

        .nav-link { position: relative; font-size: 0.7rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted-l); transition: color 0.2s; padding: 0.3rem 0; }
        .nav-link::after { content: ''; position: absolute; bottom: -3px; left: 0; height: 1.5px; width: 0; background: var(--gold); transition: width 0.3s var(--ease-out); }
        .nav-link:hover { color: var(--ink); }
        .nav-link:hover::after { width: 100%; }
        .nav-link.active { color: var(--ink); }
        .nav-link.active::after { width: 100%; }

        .nav-cta { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.13em; text-transform: uppercase; padding: 0.65rem 1.5rem; background: var(--gold); color: var(--white); border-radius: 4px; transition: all 0.25s; display: inline-flex; align-items: center; gap: 0.5rem; }
        .nav-cta:hover { background: var(--gold2); transform: translateY(-1px); }
        @media (max-width: 1000px) { .nav-cta { display: none; } }

        .ham { display: none; background: none; border: none; padding: 8px; flex-direction: column; gap: 5px; }
        @media (max-width: 1000px) { .ham { display: flex; } }
        .ham-line { width: 24px; height: 2px; background: var(--ink); border-radius: 1px; transition: transform 0.3s var(--ease-out), opacity 0.2s; }
        .ham.open .ham-line:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .ham.open .ham-line:nth-child(2) { opacity: 0; }
        .ham.open .ham-line:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        .mob { position: fixed; inset: 70px 0 0 0; background: var(--warm); z-index: 195; padding: 3rem var(--gutter); display: flex; flex-direction: column; gap: 0; overflow-y: auto; }
        .mob-link { display: flex; align-items: center; justify-content: space-between; font-family: var(--serif); font-size: 2rem; font-weight: 300; color: var(--ink); padding: 1.2rem 0; border-bottom: 1px solid var(--border-l); }
        .mob-link i { font-size: 1.2rem; color: var(--muted-l); transition: transform 0.25s, color 0.25s; }
        .mob-link:hover i { transform: translateX(4px); color: var(--gold); }
        .mob-link.active { color: var(--gold); font-style: italic; }
        .mob-cta { margin-top: 2rem; align-self: flex-start; }
      `}</style>

      <motion.header
        className={`nav${scrolled ? " scrolled" : ""}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link to="/" className="nav-brand" aria-label="Dr. Kunle Hamilton — Home">
          <img src="/kh-logo-nav.png" alt="KH" className="nav-brand-logo" width="38" height="38" />
          <span className="nav-brand-text">Dr. Kunle <em>Hamilton</em></span>
        </Link>

        <nav className="nav-center">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <Link to="/contact" className="nav-cta">
          <i className="bi bi-envelope-fill" /> Invite Dr. Hamilton
        </Link>

        <button
          className={`ham${open ? " open" : ""}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="ham-line" />
          <span className="ham-line" />
          <span className="ham-line" />
        </button>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mob"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.div
                key={item.to}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + i * 0.05 }}
              >
                <NavLink to={item.to} className={({ isActive }) => `mob-link${isActive ? " active" : ""}`}>
                  {item.label}
                  <i className="bi bi-arrow-right" />
                </NavLink>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + NAV_ITEMS.length * 0.05 }}
            >
              <Link to="/contact" className="btn mob-cta">
                <i className="bi bi-envelope-fill" /> Invite Dr. Hamilton
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
