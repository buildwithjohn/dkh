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

// Lightweight loading indicator while a lazy chunk fetches
function Loading() {
  return (
    <div style={{
      minHeight: "60vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: "1rem",
      background: "var(--warm)",
    }}>
      <div style={{
        width: "32px",
        height: "32px",
        border: "2px solid rgba(37,99,235,0.15)",
        borderTopColor: "var(--gold)",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
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
