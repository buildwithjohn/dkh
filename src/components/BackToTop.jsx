import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * BackToTop — fixed-position button that appears after scrolling 400px.
 * Smooth scrolls to top when clicked.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          className="back-to-top"
          onClick={toTop}
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.08, rotate: -6 }}
          whileTap={{ scale: 0.95 }}
        >
          <style>{`
            .back-to-top {
              position: fixed;
              right: 1.8rem;
              bottom: 1.8rem;
              z-index: 180;
              width: 52px;
              height: 52px;
              border-radius: 50%;
              background: var(--gold);
              color: var(--white);
              border: none;
              box-shadow: 0 12px 30px -8px rgba(37,99,235,0.55);
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 1.3rem;
              transition: background 0.25s;
            }
            .back-to-top:hover { background: var(--gold2); }
            @media (max-width: 600px) {
              .back-to-top { right: 1.2rem; bottom: 1.2rem; width: 46px; height: 46px; font-size: 1.15rem; }
            }
          `}</style>
          <i className="bi bi-arrow-up" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
