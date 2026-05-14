import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

// Eager-load Home (it's the entry point)
import Home from "./pages/Home";

// Lazy-load every other page for code splitting
const About = lazy(() => import("./pages/About"));
const Ministries = lazy(() => import("./pages/Ministries"));
const Books = lazy(() => import("./pages/Books"));
const Press = lazy(() => import("./pages/Press"));
const Videos = lazy(() => import("./pages/Videos"));
const Speaking = lazy(() => import("./pages/Speaking"));
const Contact = lazy(() => import("./pages/Contact"));
const News = lazy(() => import("./pages/News"));
const NewsPost = lazy(() => import("./pages/NewsPost"));

// Branded loading indicator while lazy-loaded routes fetch
function Loading() {
  return (
    <div style={{
      minHeight: "70vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: "1.6rem",
      background: "var(--warm)",
      paddingTop: "70px",
    }}>
      <div style={{
        position: "relative",
        width: "70px",
        height: "70px",
      }}>
        <img src="/kh-logo-nav.png" alt="" width="70" height="70" style={{
          width: "70px",
          height: "70px",
          objectFit: "contain",
          animation: "logoFloat 2s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute",
          inset: "-12px",
          border: "2px solid rgba(37,99,235,0.15)",
          borderTopColor: "var(--gold)",
          borderRadius: "50%",
          animation: "spin 1.2s linear infinite",
        }} />
      </div>
      <div style={{
        fontFamily: "var(--serif)",
        fontSize: "0.9rem",
        fontStyle: "italic",
        color: "var(--muted-l)",
        letterSpacing: "0.04em",
      }}>
        Loading...
      </div>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes logoFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
      `}</style>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/ministries" element={<Ministries />} />
          <Route path="/books" element={<Books />} />
          <Route path="/press" element={<Press />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/speaking" element={<Speaking />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:slug" element={<NewsPost />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>,
)
