import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Nav from "./Nav";
import Footer from "./Footer";

/**
 * Layout — every page should be wrapped in this.
 * Provides: nav, footer, scroll-to-top on route change, page-fade animation, SEO title.
 */
export default function Layout({ children, title, description, hideFooter = false }) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (title) {
      document.title = `${title} · Dr. Kunle Hamilton`;
    } else {
      document.title = "Dr. Kunle Hamilton — Prophet · Author · Shepherd";
    }
    if (description) {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", description);
    }
  }, [location.pathname, title, description]);

  return (
    <>
      <Nav />
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ minHeight: "60vh" }}
      >
        {children}
      </motion.main>
      {!hideFooter && <Footer />}
    </>
  );
}
