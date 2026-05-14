import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

/**
 * AnimatedNumber — counts up from 0 to the target when visible.
 * Supports number, decimal, suffix.
 */
export default function AnimatedNumber({ to, suffix = "", prefix = "", duration = 1.5, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 70, damping: 18, duration: duration * 1000 });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (inView) {
      motionValue.set(typeof to === "number" ? to : parseFloat(to.replace(/[^0-9.]/g, "")) || 0);
    }
  }, [inView, motionValue, to]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplay(Math.round(latest).toString());
    });
    return unsubscribe;
  }, [springValue]);

  // If the target has non-numeric characters (like "1985"), just show it
  const isPlainNumber = typeof to === "number" || /^\d+$/.test(to);
  const finalDisplay = isPlainNumber ? `${prefix}${display}${suffix}` : `${prefix}${to}`;

  return <span ref={ref} className={className}>{finalDisplay}</span>;
}
