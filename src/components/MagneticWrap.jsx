import { useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * MagneticWrap — wraps any element to give it subtle magnetic hover.
 * The element gently pulls toward the cursor when hovered.
 */
export default function MagneticWrap({ children, strength = 18, className = "" }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    setPos({ x: (dx / rect.width) * strength, y: (dy / rect.height) * strength });
  };

  const onLeave = () => setPos({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 250, damping: 18 }}
      style={{ display: "inline-block" }}
    >
      {children}
    </motion.div>
  );
}
