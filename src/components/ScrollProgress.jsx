import { motion, useScroll, useSpring } from "framer-motion";

/**
 * ScrollProgress — a thin progress bar at the very top of the viewport.
 * Width matches reading progress through the current page.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "3px",
        background: "linear-gradient(90deg, var(--gold) 0%, var(--gold2) 50%, var(--gold3) 100%)",
        transformOrigin: "0%",
        zIndex: 250,
        scaleX,
        boxShadow: "0 1px 8px rgba(37,99,235,0.4)",
      }}
    />
  );
}
