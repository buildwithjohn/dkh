/**
 * Custom inline SVG illustrations for the site.
 *
 * Why inline SVG instead of icon fonts:
 * - Renders instantly with the HTML, no FOUT
 * - Can be styled with CSS, animated with SMIL/CSS, and themed
 * - Smaller than loading an icon font when only a few are used
 * - Crisp at every resolution
 *
 * Each illustration is a self-contained React component.
 */
import { motion } from "framer-motion";

/* ════════════════════════════════════════════════════════════════════════
   PILLAR ILLUSTRATIONS — for the Home "Who He Is" section
   Three large, branded illustrations replacing the plain icon squares.
   ════════════════════════════════════════════════════════════════════════ */

export function IllustrationProphet({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="prophGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1E40AF" />
        </linearGradient>
        <linearGradient id="prophGrad2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#93C5FD" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Background circle - heavenly halo */}
      <circle cx="100" cy="80" r="60" fill="url(#prophGrad2)" />

      {/* Rays of light */}
      <g stroke="#2563EB" strokeOpacity="0.25" strokeWidth="1.5" strokeLinecap="round">
        <line x1="100" y1="10" x2="100" y2="20" />
        <line x1="140" y1="20" x2="135" y2="30" />
        <line x1="160" y1="50" x2="150" y2="55" />
        <line x1="60" y1="20" x2="65" y2="30" />
        <line x1="40" y1="50" x2="50" y2="55" />
      </g>

      {/* Open Bible base */}
      <path d="M40 110 L100 105 L160 110 L160 125 L100 120 L40 125 Z" fill="url(#prophGrad)" />
      <path d="M40 110 L100 105 L100 120 L40 125 Z" fill="#1E3A8A" opacity="0.6" />
      <line x1="100" y1="105" x2="100" y2="120" stroke="#FFFFFF" strokeOpacity="0.3" strokeWidth="0.8" />

      {/* Page lines */}
      <g stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="0.6">
        <line x1="55" y1="112" x2="90" y2="111" />
        <line x1="55" y1="115" x2="85" y2="114" />
        <line x1="55" y1="118" x2="88" y2="117" />
        <line x1="110" y1="111" x2="145" y2="112" />
        <line x1="115" y1="114" x2="145" y2="115" />
        <line x1="112" y1="117" x2="145" y2="118" />
      </g>

      {/* Dove rising */}
      <g>
        <ellipse cx="100" cy="65" rx="10" ry="14" fill="#FFFFFF" />
        <path d="M100 55 L102 50 L100 52 L98 50 Z" fill="#FFFFFF" />
        {/* Wings */}
        <path d="M90 60 Q75 50 70 65 Q80 60 92 65 Z" fill="#FFFFFF" opacity="0.9" />
        <path d="M110 60 Q125 50 130 65 Q120 60 108 65 Z" fill="#FFFFFF" opacity="0.9" />
        {/* Eye */}
        <circle cx="103" cy="60" r="0.8" fill="#1E3A8A" />
      </g>

      {/* Flame above (anointing) */}
      <motion.g
        animate={{ scaleY: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "100px 45px" }}
      >
        <path d="M100 35 Q95 40 100 50 Q105 40 100 35 Z" fill="#DC2626" />
        <path d="M100 38 Q97 41 100 47 Q103 41 100 38 Z" fill="#FCD34D" />
      </motion.g>
    </svg>
  );
}

export function IllustrationAuthor({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="authGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1E40AF" />
        </linearGradient>
        <linearGradient id="authBookCover" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1E40AF" />
        </linearGradient>
        <linearGradient id="authBlue2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
      </defs>

      {/* Stacked books with shadow */}
      <ellipse cx="100" cy="142" rx="55" ry="6" fill="#000" opacity="0.08" />

      {/* Bottom book */}
      <rect x="50" y="115" width="100" height="22" rx="2" fill="#1E40AF" />
      <rect x="50" y="115" width="100" height="22" rx="2" fill="url(#authBookCover)" />
      <rect x="50" y="115" width="5" height="22" fill="#1E3A8A" />
      <line x1="58" y1="120" x2="142" y2="120" stroke="#FFFFFF" strokeOpacity="0.3" strokeWidth="0.7" />
      <line x1="58" y1="124" x2="120" y2="124" stroke="#FFFFFF" strokeOpacity="0.3" strokeWidth="0.7" />
      <line x1="58" y1="128" x2="135" y2="128" stroke="#FFFFFF" strokeOpacity="0.3" strokeWidth="0.7" />

      {/* Middle book */}
      <rect x="55" y="95" width="90" height="22" rx="2" fill="url(#authBlue2)" />
      <rect x="55" y="95" width="4" height="22" fill="#1E40AF" />
      <text x="100" y="109" textAnchor="middle" fontFamily="serif" fontSize="6" fill="#FFFFFF" opacity="0.7" fontStyle="italic">Releasing</text>

      {/* Top book - tilted */}
      <g transform="rotate(-6 100 80)">
        <rect x="60" y="73" width="80" height="22" rx="2" fill="#2563EB" />
        <rect x="60" y="73" width="4" height="22" fill="#1E3A8A" />
        <line x1="68" y1="78" x2="135" y2="78" stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="0.7" />
        <line x1="68" y1="82" x2="120" y2="82" stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="0.7" />
        <line x1="68" y1="86" x2="130" y2="86" stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="0.7" />
        <line x1="68" y1="90" x2="115" y2="90" stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="0.7" />
      </g>

      {/* Floating quill pen */}
      <motion.g
        animate={{ y: [0, -3, 0], rotate: [0, -2, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "150px 50px" }}
      >
        <path d="M155 30 Q160 35 158 50 Q156 55 152 58 L148 54 Q150 50 152 38 Z" fill="#FFFFFF" stroke="#2563EB" strokeWidth="1" />
        <line x1="148" y1="54" x2="142" y2="62" stroke="#1E3A8A" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M152 38 Q154 45 152 50" stroke="#2563EB" strokeWidth="0.5" fill="none" />
        <path d="M154 36 Q156 43 154 48" stroke="#2563EB" strokeWidth="0.5" fill="none" />
      </motion.g>

      {/* Ink droplet */}
      <motion.circle
        cx="140" cy="66" r="2" fill="#2563EB"
        animate={{ opacity: [0, 1, 0], y: [0, 5, 10] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
      />

      {/* Tiny floating words/letters */}
      <motion.g
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <text x="35" y="50" fontFamily="serif" fontSize="14" fill="#2563EB" opacity="0.2" fontStyle="italic">A</text>
        <text x="170" y="100" fontFamily="serif" fontSize="11" fill="#2563EB" opacity="0.2" fontStyle="italic">b</text>
        <text x="25" y="80" fontFamily="serif" fontSize="9" fill="#2563EB" opacity="0.15">·</text>
      </motion.g>
    </svg>
  );
}

export function IllustrationJournalist({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="jrnGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1E40AF" />
        </linearGradient>
      </defs>

      {/* Background paper */}
      <rect x="30" y="35" width="140" height="100" rx="3" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
      <rect x="30" y="35" width="140" height="100" rx="3" fill="url(#jrnGrad)" opacity="0.04" />

      {/* Folded corner */}
      <path d="M155 35 L170 50 L155 50 Z" fill="#E2E8F0" />

      {/* Masthead */}
      <text x="100" y="55" textAnchor="middle" fontFamily="serif" fontSize="9" fontWeight="700" fill="#1E3A8A" fontStyle="italic">The Glitterati</text>
      <line x1="50" y1="60" x2="150" y2="60" stroke="#1E3A8A" strokeWidth="0.5" />

      {/* Date/issue line */}
      <line x1="50" y1="64" x2="80" y2="64" stroke="#94A3B8" strokeWidth="0.4" />
      <line x1="120" y1="64" x2="150" y2="64" stroke="#94A3B8" strokeWidth="0.4" />

      {/* Headline */}
      <rect x="50" y="70" width="100" height="2.5" rx="1" fill="#1E3A8A" />
      <rect x="50" y="75" width="80" height="2.5" rx="1" fill="#1E3A8A" />

      {/* Image block in article */}
      <rect x="50" y="83" width="40" height="28" rx="1" fill="url(#jrnGrad)" />
      <circle cx="62" cy="93" r="3" fill="#FFFFFF" opacity="0.4" />
      <path d="M50 105 L60 98 L70 103 L90 95 L90 111 L50 111 Z" fill="#FFFFFF" opacity="0.2" />

      {/* Article body lines */}
      <g stroke="#94A3B8" strokeWidth="0.7">
        <line x1="95" y1="86" x2="148" y2="86" />
        <line x1="95" y1="90" x2="148" y2="90" />
        <line x1="95" y1="94" x2="145" y2="94" />
        <line x1="95" y1="98" x2="148" y2="98" />
        <line x1="95" y1="102" x2="140" y2="102" />
        <line x1="95" y1="106" x2="148" y2="106" />
        <line x1="50" y1="117" x2="148" y2="117" />
        <line x1="50" y1="121" x2="148" y2="121" />
        <line x1="50" y1="125" x2="140" y2="125" />
      </g>

      {/* Floating pen writing */}
      <motion.g
        animate={{ x: [0, 3, 0, -3, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <line x1="165" y1="20" x2="178" y2="33" stroke="#1E3A8A" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M178 33 L182 37 L178 33 Z" fill="#1E3A8A" />
        <circle cx="180" cy="35" r="1.5" fill="#FCD34D" />
      </motion.g>

      {/* Floating ink star */}
      <motion.g
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "25px 25px" }}
      >
        <path d="M25 18 L27 23 L32 25 L27 27 L25 32 L23 27 L18 25 L23 23 Z" fill="#2563EB" />
      </motion.g>

      {/* Camera/photo icon corner */}
      <motion.g
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <rect x="160" y="115" width="22" height="16" rx="2" fill="#1E40AF" />
        <circle cx="171" cy="123" r="4" fill="#FFFFFF" />
        <circle cx="171" cy="123" r="2" fill="#1E3A8A" />
        <rect x="163" y="113" width="6" height="3" rx="1" fill="#1E40AF" />
      </motion.g>
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   ROLE/SECTION ICONS — for the About roles grid, Speaking topics, etc.
   Smaller, more focused branded SVG icons.
   ════════════════════════════════════════════════════════════════════════ */

export function IconMic({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="9" y="3" width="6" height="12" rx="3" fill="currentColor" />
      <path d="M5 10v1a7 7 0 0 0 14 0v-1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="12" y1="18" x2="12" y2="22" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="8" y1="22" x2="16" y2="22" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function IconNewspaper({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="5" width="15" height="14" rx="1.5" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.4" />
      <rect x="18" y="9" width="3" height="10" rx="1" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <line x1="6" y1="9" x2="15" y2="9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="6" y1="12" x2="15" y2="12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="6" y1="15" x2="12" y2="15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function IconBook({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4h6a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4V4Z" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.4" />
      <path d="M20 4h-6a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h7V4Z" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <line x1="6" y1="9" x2="11" y2="9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="6" y1="12" x2="11" y2="12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function IconChurch({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="12" y1="2" x2="12" y2="6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="10" y1="4" x2="14" y2="4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12 6 L5 11 V21 H19 V11 L12 6Z" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <rect x="10.5" y="14" width="3" height="7" fill="currentColor" />
      <line x1="12" y1="14" x2="12" y2="21" stroke="white" strokeWidth="0.5" />
    </svg>
  );
}

export function IconGraduation({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 10 L12 5 L22 10 L12 15 Z" fill="currentColor" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M6 11.5 V16 Q12 19 18 16 V11.5" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinejoin="round" />
      <line x1="22" y1="10" x2="22" y2="15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function IconBriefcase({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="7" width="18" height="13" rx="2" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.4" />
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="1.4" />
      <line x1="3" y1="13" x2="21" y2="13" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function IconGlobe({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" fill="currentColor" opacity="0.12" stroke="currentColor" strokeWidth="1.4" />
      <ellipse cx="12" cy="12" rx="4" ry="9" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   DECORATIVE FLOATING BLOBS — background ambient shapes
   Used as subtle decorative elements behind sections.
   ════════════════════════════════════════════════════════════════════════ */

export function BlobAccent({ className = "", color = "#2563EB", opacity = 0.06 }) {
  return (
    <svg className={className} viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <motion.path
        d="M 200 50 Q 320 80 340 180 Q 360 280 250 330 Q 140 380 80 280 Q 20 180 70 100 Q 120 20 200 50 Z"
        fill={color}
        opacity={opacity}
        animate={{
          d: [
            "M 200 50 Q 320 80 340 180 Q 360 280 250 330 Q 140 380 80 280 Q 20 180 70 100 Q 120 20 200 50 Z",
            "M 200 60 Q 310 100 350 200 Q 340 290 230 320 Q 130 360 70 270 Q 30 170 80 90 Q 130 30 200 60 Z",
            "M 200 50 Q 320 80 340 180 Q 360 280 250 330 Q 140 380 80 280 Q 20 180 70 100 Q 120 20 200 50 Z",
          ],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   ANIMATED UNDERLINE — for headings, with a hand-drawn feel
   ════════════════════════════════════════════════════════════════════════ */
export function ScribbleUnderline({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <motion.path
        d="M2 6 Q 50 2, 100 6 T 198 6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   SECTION DIVIDERS — wave shapes between sections
   ════════════════════════════════════════════════════════════════════════ */
export function WaveDivider({ flip = false, color = "var(--ink)", className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 100"
      preserveAspectRatio="none"
      style={{
        display: "block",
        width: "100%",
        height: "60px",
        transform: flip ? "scaleY(-1)" : "none",
      }}
      aria-hidden="true"
    >
      <path
        d="M0,60 C320,100 640,20 960,40 C1280,60 1440,30 1440,30 L1440,100 L0,100 Z"
        fill={color}
      />
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   QUOTE MARK — large decorative serif quote for testimonials/quotes
   ════════════════════════════════════════════════════════════════════════ */
export function QuoteMark({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 60 50" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M10 35 Q 5 35 5 28 Q 5 18 12 12 Q 18 8 22 8 L 22 14 Q 16 16 14 22 L 18 22 Q 22 22 22 26 L 22 32 Q 22 35 18 35 Z M 38 35 Q 33 35 33 28 Q 33 18 40 12 Q 46 8 50 8 L 50 14 Q 44 16 42 22 L 46 22 Q 50 22 50 26 L 50 32 Q 50 35 46 35 Z"
        fill="currentColor"
      />
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   DOT PATTERN — subtle dotted background texture
   ════════════════════════════════════════════════════════════════════════ */
export function DotPattern({ className = "", color = "currentColor", opacity = 0.15 }) {
  return (
    <svg className={className} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill={color} opacity={opacity} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots)" />
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   GRID PATTERN — architectural grid backdrop
   ════════════════════════════════════════════════════════════════════════ */
export function GridPattern({ className = "", color = "currentColor", opacity = 0.08 }) {
  return (
    <svg className={className} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke={color} strokeOpacity={opacity} strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   ARROW WITH FLOURISH — decorative arrow for CTA areas
   ════════════════════════════════════════════════════════════════════════ */
export function ArrowFlourish({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <motion.path
        d="M5 20 Q 25 5, 45 20 Q 55 28, 70 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      />
      <motion.path
        d="M62 12 L72 18 L65 24"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 1.2 }}
      />
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   SPARKLES — celebratory stars for CTA buttons
   ════════════════════════════════════════════════════════════════════════ */
export function Sparkles({ className = "", color = "currentColor" }) {
  return (
    <svg className={className} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <motion.g
        animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M30 5 L32 14 L41 16 L32 18 L30 27 L28 18 L19 16 L28 14 Z" fill={color} />
      </motion.g>
      <motion.g
        animate={{ scale: [0.6, 1, 0.6], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <path d="M10 35 L11 39 L15 40 L11 41 L10 45 L9 41 L5 40 L9 39 Z" fill={color} />
      </motion.g>
      <motion.g
        animate={{ scale: [0.7, 1.1, 0.7], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <path d="M48 38 L49 42 L53 43 L49 44 L48 48 L47 44 L43 43 L47 42 Z" fill={color} />
      </motion.g>
    </svg>
  );
}
