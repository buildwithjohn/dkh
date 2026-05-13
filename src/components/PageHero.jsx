import { motion } from "framer-motion";

/**
 * PageHero — standard page header used at the top of every section page.
 *
 * Props:
 *   eyebrow   — small uppercase tag at top
 *   title     — JSX. Use <em> for italic accent color, <strong> for bold.
 *   subtitle  — body paragraph below title
 *   image     — optional image URL — shown faded behind
 *   variant   — 'dark' (default, ink background) | 'light' (white)
 *   children  — extra content (buttons, stats, etc.) below subtitle
 */
export default function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  variant = "dark",
  children,
}) {
  return (
    <>
      <style>{`
        .ph { position: relative; padding: 9.5rem var(--gutter) 5rem; overflow: hidden; }
        .ph.dark { background: var(--ink); color: var(--white); }
        .ph.light { background: var(--warm); color: var(--ink); border-bottom: 1px solid var(--border-l); }

        .ph-bg { position: absolute; inset: 0; opacity: 0.18; }
        .ph-bg img { width: 100%; height: 100%; object-fit: cover; object-position: center 22%; filter: saturate(0.6); }
        .ph.dark .ph-bg::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(9,21,42,0.4) 0%, rgba(9,21,42,0.92) 100%); }
        .ph.light .ph-bg { opacity: 0.10; }
        .ph.light .ph-bg::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.95) 100%); }

        .ph-glow { position: absolute; inset: 0; pointer-events: none; }
        .ph.dark .ph-glow { background: radial-gradient(circle at 80% 30%, rgba(37,99,235,0.18), transparent 50%); }

        .ph-inner { position: relative; z-index: 2; max-width: 880px; }

        .ph-eyebrow { display: inline-flex; align-items: center; gap: 0.8rem; font-size: var(--t-eyebrow); font-weight: 700; letter-spacing: 0.32em; text-transform: uppercase; margin-bottom: 1.6rem; }
        .ph.dark .ph-eyebrow { color: var(--gold3); }
        .ph.dark .ph-eyebrow::before { content: ''; width: 32px; height: 1.5px; background: var(--gold3); }
        .ph.light .ph-eyebrow { color: var(--gold); }
        .ph.light .ph-eyebrow::before { content: ''; width: 32px; height: 1.5px; background: var(--gold); }

        .ph-title { font-family: var(--serif); font-size: var(--t-h1); font-weight: 300; line-height: 0.97; letter-spacing: -0.02em; margin-bottom: 1.6rem; }
        .ph-title em { font-style: italic; }
        .ph.dark .ph-title em { color: var(--gold3); }
        .ph.light .ph-title em { color: var(--gold); }
        .ph-title strong { font-weight: 700; }

        .ph-subtitle { font-size: clamp(0.98rem, 1.4vw, 1.15rem); font-weight: 300; line-height: 1.7; max-width: 660px; }
        .ph.dark .ph-subtitle { color: rgba(255,255,255,0.72); }
        .ph.light .ph-subtitle { color: var(--muted-l); }

        .ph-extras { margin-top: 2.5rem; }
      `}</style>

      <section className={`ph ${variant}`}>
        {image && (
          <div className="ph-bg">
            <img src={image} alt="" aria-hidden="true" />
          </div>
        )}
        <div className="ph-glow" />
        <div className="ph-inner">
          {eyebrow && (
            <motion.div
              className="ph-eyebrow"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {eyebrow}
            </motion.div>
          )}
          <motion.h1
            className="ph-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              className="ph-subtitle"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {subtitle}
            </motion.p>
          )}
          {children && (
            <motion.div
              className="ph-extras"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {children}
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
