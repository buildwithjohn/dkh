import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as pdfjsLib from "pdfjs-dist";

// Use the worker shipped with pdfjs-dist
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

/**
 * EbookReader — Kindle-style in-browser PDF viewer.
 *
 * Features:
 *  - Renders PDF on a <canvas> (no DOM text, harder to copy)
 *  - Watermarks every page with the buyer's name + email (deters resharing)
 *  - Blocks right-click, Ctrl+S, Ctrl+P, Ctrl+C, F12 (anti-download friction)
 *  - Saves reading progress to localStorage per book/reference
 *  - Smooth page navigation, fullscreen, page jump
 *
 * Props:
 *  - file: URL to the PDF (e.g. "/ebooks/a7f3k9-eagle.pdf")
 *  - reference: Paystack reference (used as the progress storage key)
 *  - watermarkText: text to overlay on every page (e.g. "John Doe — john@x.com")
 *  - title: book title (shown in toolbar)
 *  - onClose: optional close callback
 */
export default function EbookReader({ file, reference, watermarkText, title, onClose }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const pdfRef = useRef(null);
  const renderTaskRef = useRef(null);

  const [pageNum, setPageNum] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scale, setScale] = useState(1.0);
  const [fullscreen, setFullscreen] = useState(false);
  const [showJump, setShowJump] = useState(false);
  const [jumpValue, setJumpValue] = useState("");

  const progressKey = `dkh-progress-${reference}`;

  /* ── Load PDF document ────────────────────────────────────────────────── */
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    pdfjsLib.getDocument(file).promise.then(
      (pdf) => {
        if (cancelled) return;
        pdfRef.current = pdf;
        setNumPages(pdf.numPages);

        // Restore reading progress
        try {
          const saved = parseInt(localStorage.getItem(progressKey), 10);
          if (!isNaN(saved) && saved >= 1 && saved <= pdf.numPages) {
            setPageNum(saved);
          }
        } catch {}

        setLoading(false);
      },
      (err) => {
        if (cancelled) return;
        console.error("PDF load failed:", err);
        setError("Could not load this book. Please refresh the page or contact support.");
        setLoading(false);
      }
    );

    return () => {
      cancelled = true;
    };
  }, [file, progressKey]);

  /* ── Compute responsive scale ─────────────────────────────────────────── */
  useEffect(() => {
    const computeScale = () => {
      const containerWidth = containerRef.current?.clientWidth || 800;
      const targetWidth = Math.min(containerWidth - 40, fullscreen ? 1200 : 900);
      // Approximate: A4 PDF page is ~600pt wide at scale 1.0
      // We compute exact in render but use this initial scale as a hint
      setScale(targetWidth / 700);
    };
    computeScale();
    window.addEventListener("resize", computeScale);
    return () => window.removeEventListener("resize", computeScale);
  }, [fullscreen]);

  /* ── Render current page on canvas + watermark ────────────────────────── */
  const renderPage = useCallback(async () => {
    if (!pdfRef.current || !canvasRef.current) return;

    // Cancel any in-flight render
    if (renderTaskRef.current) {
      try { renderTaskRef.current.cancel(); } catch {}
    }

    try {
      const page = await pdfRef.current.getPage(pageNum);
      const containerWidth = containerRef.current?.clientWidth || 800;
      const targetWidth = Math.min(containerWidth - 40, fullscreen ? 1200 : 900);
      const baseViewport = page.getViewport({ scale: 1 });
      const computedScale = targetWidth / baseViewport.width;
      const viewport = page.getViewport({ scale: computedScale });

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      // Set high-DPI canvas
      const dpr = window.devicePixelRatio || 1;
      canvas.width = viewport.width * dpr;
      canvas.height = viewport.height * dpr;
      canvas.style.width = `${viewport.width}px`;
      canvas.style.height = `${viewport.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Render PDF page
      renderTaskRef.current = page.render({ canvasContext: ctx, viewport, canvas });
      await renderTaskRef.current.promise;
      renderTaskRef.current = null;

      // ── Draw watermark on top of the rendered page ──
      drawWatermark(ctx, viewport.width, viewport.height, watermarkText);

      // Save reading progress
      try {
        localStorage.setItem(progressKey, String(pageNum));
      } catch {}
    } catch (err) {
      if (err?.name === "RenderingCancelledException") return;
      console.error("Page render failed:", err);
    }
  }, [pageNum, fullscreen, watermarkText, progressKey]);

  useEffect(() => {
    renderPage();
  }, [renderPage]);

  /* ── Anti-copy / anti-download key bindings ───────────────────────────── */
  useEffect(() => {
    const blockKeys = (e) => {
      // Block Ctrl+S (save), Ctrl+P (print), Ctrl+C (copy), Ctrl+A (select all)
      const ctrl = e.ctrlKey || e.metaKey;
      if (ctrl && ["s", "p", "c", "a", "u"].includes(e.key.toLowerCase())) {
        e.preventDefault();
        return false;
      }
      // Block F12 (DevTools)
      if (e.key === "F12") {
        e.preventDefault();
        return false;
      }
      // Arrow / PageUp / PageDown for navigation
      if (e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        setPageNum((p) => Math.min(p + 1, numPages));
      }
      if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        setPageNum((p) => Math.max(p - 1, 1));
      }
    };

    const blockContextMenu = (e) => e.preventDefault();
    const blockSelection = (e) => e.preventDefault();
    const blockDrag = (e) => e.preventDefault();

    document.addEventListener("keydown", blockKeys);
    document.addEventListener("contextmenu", blockContextMenu);
    document.addEventListener("selectstart", blockSelection);
    document.addEventListener("dragstart", blockDrag);

    return () => {
      document.removeEventListener("keydown", blockKeys);
      document.removeEventListener("contextmenu", blockContextMenu);
      document.removeEventListener("selectstart", blockSelection);
      document.removeEventListener("dragstart", blockDrag);
    };
  }, [numPages]);

  /* ── Fullscreen API ───────────────────────────────────────────────────── */
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.();
      setFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setFullscreen(false);
    }
  };

  useEffect(() => {
    const onFs = () => setFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  const prev = () => setPageNum((p) => Math.max(p - 1, 1));
  const next = () => setPageNum((p) => Math.min(p + 1, numPages));

  const handleJump = (e) => {
    e.preventDefault();
    const n = parseInt(jumpValue, 10);
    if (!isNaN(n) && n >= 1 && n <= numPages) {
      setPageNum(n);
      setShowJump(false);
      setJumpValue("");
    }
  };

  const progressPct = numPages > 0 ? (pageNum / numPages) * 100 : 0;

  return (
    <div ref={containerRef} className={`reader${fullscreen ? " reader-fs" : ""}`}>
      <style>{`
        .reader {
          background: #1a1410;
          color: #f5efe6;
          display: flex; flex-direction: column;
          min-height: 100vh;
          user-select: none;
          -webkit-user-select: none;
        }
        .reader-fs { min-height: 100vh; }

        /* Toolbar */
        .reader-bar {
          position: sticky; top: 0; z-index: 50;
          background: rgba(26,20,16,0.94);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(255,255,255,0.08);
          padding: 0.9rem 1.5rem;
          display: flex; align-items: center; justify-content: space-between; gap: 1rem;
        }
        .reader-bar-title { font-family: var(--serif); font-style: italic; font-size: 1.05rem; font-weight: 400; color: #f5efe6; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 40vw; }
        .reader-bar-actions { display: flex; gap: 0.4rem; align-items: center; }
        .reader-btn {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.10);
          color: #f5efe6;
          width: 38px; height: 38px; border-radius: 6px;
          display: inline-flex; align-items: center; justify-content: center;
          font-size: 1rem; cursor: pointer;
          transition: all 0.2s;
        }
        .reader-btn:hover { background: rgba(255,255,255,0.10); border-color: rgba(255,255,255,0.20); }
        .reader-btn:disabled { opacity: 0.3; cursor: not-allowed; }
        .reader-btn-text {
          width: auto; padding: 0 0.9rem; gap: 0.5rem;
          font-size: 0.72rem; font-weight: 600; letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        /* Stage */
        .reader-stage {
          flex: 1;
          display: flex; flex-direction: column; align-items: center;
          padding: 2rem 1.5rem 6rem;
          position: relative;
          overflow: hidden;
        }
        @media (max-width: 700px) { .reader-stage { padding: 1rem 0.5rem 7rem; } }

        .reader-canvas-wrap {
          position: relative;
          background: white;
          box-shadow: 0 30px 80px rgba(0,0,0,0.5), 0 6px 20px rgba(0,0,0,0.3);
          border-radius: 4px;
          overflow: hidden;
          max-width: 100%;
        }
        .reader-canvas-wrap canvas { display: block; max-width: 100%; height: auto; -webkit-user-drag: none; pointer-events: none; }

        /* Loading state */
        .reader-loading {
          min-height: 60vh;
          display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1.4rem;
          color: #c9b69a;
        }
        .reader-loading-spinner {
          width: 38px; height: 38px;
          border: 3px solid rgba(255,255,255,0.10);
          border-top-color: #d4a574;
          border-radius: 50%;
          animation: rspin 1s linear infinite;
        }
        @keyframes rspin { to { transform: rotate(360deg); } }
        .reader-loading-msg { font-family: var(--serif); font-style: italic; font-size: 0.95rem; }
        .reader-loading-hint { font-size: 0.75rem; color: rgba(255,255,255,0.4); }

        /* Error state */
        .reader-error {
          min-height: 60vh;
          display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1rem;
          color: #f5efe6; text-align: center; padding: 0 1.5rem;
        }
        .reader-error i { font-size: 3rem; color: #d4a574; }
        .reader-error p { max-width: 420px; line-height: 1.7; color: rgba(255,255,255,0.6); }

        /* Bottom controls */
        .reader-controls {
          position: fixed; bottom: 0; left: 0; right: 0; z-index: 50;
          background: rgba(26,20,16,0.96);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-top: 1px solid rgba(255,255,255,0.08);
          padding: 0.9rem 1.5rem;
          display: flex; align-items: center; justify-content: space-between; gap: 1rem;
        }
        @media (max-width: 600px) { .reader-controls { padding: 0.7rem 0.8rem; gap: 0.5rem; } }
        .reader-progress-wrap { flex: 1; max-width: 600px; }
        .reader-progress {
          height: 4px; background: rgba(255,255,255,0.10);
          border-radius: 999px; overflow: hidden;
          margin-bottom: 0.4rem;
        }
        .reader-progress-bar {
          height: 100%; background: linear-gradient(90deg, #d4a574, #e8c498);
          transition: width 0.4s var(--ease-out);
        }
        .reader-page-info {
          font-size: 0.72rem; color: rgba(255,255,255,0.55);
          letter-spacing: 0.08em; text-align: center;
        }
        .reader-page-info button {
          background: transparent; border: none; color: #d4a574;
          font: inherit; cursor: pointer; padding: 0 0.3rem;
          letter-spacing: 0.08em;
        }
        .reader-page-info button:hover { text-decoration: underline; }
        .reader-controls-side { display: flex; gap: 0.4rem; }

        /* Page jump dialog */
        .reader-jump-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.6);
          backdrop-filter: blur(6px); z-index: 100;
          display: flex; align-items: center; justify-content: center;
          padding: 1.5rem;
        }
        .reader-jump {
          background: #1a1410; border: 1px solid rgba(255,255,255,0.15);
          border-radius: 10px; padding: 2rem;
          max-width: 360px; width: 100%;
        }
        .reader-jump h3 {
          font-family: var(--serif); font-style: italic; font-size: 1.3rem;
          margin-bottom: 1rem; color: #f5efe6;
        }
        .reader-jump input {
          width: 100%; padding: 0.85rem 1rem;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.15);
          color: #f5efe6;
          border-radius: 6px; font-size: 1rem;
          outline: none; margin-bottom: 1rem;
        }
        .reader-jump input:focus { border-color: #d4a574; }
        .reader-jump-actions { display: flex; gap: 0.5rem; justify-content: flex-end; }
        .reader-jump-btn {
          padding: 0.6rem 1.2rem;
          background: #d4a574; color: #1a1410;
          border: none; border-radius: 6px;
          font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
          cursor: pointer;
        }
        .reader-jump-cancel {
          padding: 0.6rem 1.2rem;
          background: transparent; color: rgba(255,255,255,0.6);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 6px;
          font-size: 0.72rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
          cursor: pointer;
        }

        /* Watermark notice */
        .reader-wmark-notice {
          position: fixed; top: 78px; right: 1.5rem; z-index: 30;
          font-size: 0.65rem; color: rgba(255,255,255,0.35);
          font-family: var(--sans); letter-spacing: 0.06em;
          pointer-events: none;
        }
        @media (max-width: 600px) { .reader-wmark-notice { display: none; } }
      `}</style>

      {/* Toolbar */}
      <div className="reader-bar">
        <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", minWidth: 0 }}>
          {onClose && (
            <button onClick={onClose} className="reader-btn" aria-label="Close reader" title="Back to Library">
              <i className="bi bi-arrow-left" />
            </button>
          )}
          <div className="reader-bar-title">{title}</div>
        </div>
        <div className="reader-bar-actions">
          <button onClick={toggleFullscreen} className="reader-btn" title={fullscreen ? "Exit fullscreen" : "Fullscreen"} aria-label="Toggle fullscreen">
            <i className={`bi ${fullscreen ? "bi-fullscreen-exit" : "bi-arrows-fullscreen"}`} />
          </button>
        </div>
      </div>

      <div className="reader-wmark-notice">
        <i className="bi bi-shield-lock" /> Licensed to: {watermarkText}
      </div>

      <div className="reader-stage">
        {loading && (
          <div className="reader-loading">
            <div className="reader-loading-spinner" />
            <div className="reader-loading-msg">Preparing your book…</div>
            <div className="reader-loading-hint">Loading securely — this may take a moment</div>
          </div>
        )}
        {error && (
          <div className="reader-error">
            <i className="bi bi-exclamation-triangle" />
            <h3 style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "1.5rem" }}>Something went wrong</h3>
            <p>{error}</p>
          </div>
        )}
        {!loading && !error && (
          <div className="reader-canvas-wrap">
            <canvas ref={canvasRef} />
          </div>
        )}
      </div>

      {/* Bottom controls */}
      {!loading && !error && (
        <div className="reader-controls">
          <div className="reader-controls-side">
            <button onClick={prev} disabled={pageNum <= 1} className="reader-btn" title="Previous page" aria-label="Previous page">
              <i className="bi bi-chevron-left" />
            </button>
          </div>

          <div className="reader-progress-wrap">
            <div className="reader-progress">
              <motion.div
                className="reader-progress-bar"
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
            <div className="reader-page-info">
              Page <button onClick={() => setShowJump(true)}>{pageNum}</button> of {numPages} · {Math.round(progressPct)}%
            </div>
          </div>

          <div className="reader-controls-side">
            <button onClick={next} disabled={pageNum >= numPages} className="reader-btn" title="Next page" aria-label="Next page">
              <i className="bi bi-chevron-right" />
            </button>
          </div>
        </div>
      )}

      {/* Page jump dialog */}
      <AnimatePresence>
        {showJump && (
          <motion.div
            className="reader-jump-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowJump(false)}
          >
            <motion.form
              onSubmit={handleJump}
              onClick={(e) => e.stopPropagation()}
              className="reader-jump"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <h3>Go to page</h3>
              <input
                type="number"
                min="1"
                max={numPages}
                value={jumpValue}
                onChange={(e) => setJumpValue(e.target.value)}
                placeholder={`1 – ${numPages}`}
                autoFocus
              />
              <div className="reader-jump-actions">
                <button type="button" onClick={() => setShowJump(false)} className="reader-jump-cancel">Cancel</button>
                <button type="submit" className="reader-jump-btn">Go</button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/* Watermark — drawn on the canvas after each page render                     */
/* ────────────────────────────────────────────────────────────────────────── */

function drawWatermark(ctx, w, h, text) {
  if (!text) return;
  ctx.save();

  // Diagonal repeating watermark across the page
  const fontSize = Math.max(14, Math.round(w * 0.022));
  ctx.font = `${fontSize}px sans-serif`;
  ctx.fillStyle = "rgba(150, 100, 60, 0.10)"; // very subtle
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const angle = -Math.PI / 6;
  ctx.translate(w / 2, h / 2);
  ctx.rotate(angle);

  const stepX = Math.max(280, w * 0.5);
  const stepY = Math.max(140, h * 0.18);
  const reach = Math.max(w, h) * 1.5;

  for (let y = -reach; y < reach; y += stepY) {
    for (let x = -reach; x < reach; x += stepX) {
      ctx.fillText(text, x, y);
    }
  }
  ctx.restore();

  // Single high-contrast watermark in the corner (so a screenshot still carries it)
  ctx.save();
  ctx.font = `${Math.max(10, Math.round(w * 0.012))}px sans-serif`;
  ctx.fillStyle = "rgba(80, 50, 30, 0.35)";
  ctx.textAlign = "right";
  ctx.textBaseline = "bottom";
  ctx.fillText(`Licensed to ${text}`, w - 18, h - 14);
  ctx.restore();
}
