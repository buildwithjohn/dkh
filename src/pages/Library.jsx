import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../components/Layout";
import Reveal from "../components/Reveal";
import EbookReader from "../components/EbookReader";
import { Sparkles, BlobAccent } from "../components/Illustrations";
import { getPurchase, hasValidAccess, getAllPurchases } from "../lib/purchases";
import { getBookBySlug } from "../data/books";
import { SITE, EBOOK_DELIVERY } from "../lib/config";

export default function Library() {
  const { reference } = useParams();
  const [purchase, setPurchase] = useState(null);
  const [book, setBook] = useState(null);
  const [allPurchases, setAllPurchases] = useState([]);
  const [readerOpen, setReaderOpen] = useState(false);

  useEffect(() => {
    if (reference) {
      const p = getPurchase(reference);
      if (p) {
        setPurchase(p);
        setBook(getBookBySlug(p.bookSlug));
      }
    }
    setAllPurchases(getAllPurchases());
  }, [reference]);

  const fmt = (d) =>
    new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  /* ── In-reader mode: full-screen reader takes over ──────────────────── */
  if (readerOpen && purchase && book) {
    return (
      <EbookReader
        file={book.file}
        reference={purchase.reference}
        title={book.title}
        watermarkText={`${purchase.name} · ${purchase.email}`}
        onClose={() => setReaderOpen(false)}
      />
    );
  }

  /* ── /library (no ref) — show all the user's purchases ─────────────── */
  if (!reference) {
    return (
      <Layout title="My Library" description="Your purchased ebooks from Dr. Kunle Hamilton.">
        <PageHeader>
          <h1>Your <em>Library</em></h1>
          <p>All your purchased ebooks. Bookmark this page — your purchase records are saved on this device.</p>
        </PageHeader>

        <section className="lib-section">
          {allPurchases.length === 0 ? <EmptyLibrary /> : (
            <div className="lib-list">
              {allPurchases.map((p, i) => {
                const b = getBookBySlug(p.bookSlug);
                if (!b) return null;
                const valid = hasValidAccess(p);
                return (
                  <Reveal key={p.reference} delay={i * 0.08}>
                    <Link to={`/library/${p.reference}`} className={`lib-row${!valid ? " expired" : ""}`}>
                      <div className="lib-row-icon"><i className="bi bi-book-half" /></div>
                      <div className="lib-row-info">
                        <h3>{b.title}</h3>
                        <p>Purchased {fmt(p.purchasedAt)} · {b.pages} pages</p>
                      </div>
                      <div className="lib-row-status">
                        {valid ? <><i className="bi bi-check-circle-fill" /> Read</> : <><i className="bi bi-clock-history" /> Expired</>}
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          )}
        </section>
      </Layout>
    );
  }

  /* ── Reference exists but no purchase found ──────────────────────────── */
  if (!purchase || !book) {
    return (
      <Layout title="Library">
        <PageHeader>
          <h1>Purchase <em>not found</em></h1>
          <p>We couldn't find a purchase with that reference. If you just bought an ebook, please make sure you're on the same device you used at checkout — your access is saved in this browser.</p>
        </PageHeader>
        <section className="lib-empty-cta">
          <p>Need to recover your purchase?</p>
          <div className="lib-empty-actions">
            <a href={`mailto:${SITE.email}?subject=Purchase recovery&body=Reference: ${reference}`} className="btn">
              <i className="bi bi-envelope-fill" /> Email Support
            </a>
            <a href={`https://wa.me/${SITE.whatsapp.replace(/\D/g, "")}?text=Hi, I need help with my purchase. Reference: ${reference}`} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <i className="bi bi-whatsapp" /> WhatsApp
            </a>
          </div>
        </section>
      </Layout>
    );
  }

  /* ── Valid purchase: show book details + Read button ─────────────────── */
  const valid = hasValidAccess(purchase);
  const progressKey = `dkh-progress-${purchase.reference}`;
  const lastPage = parseInt(localStorage.getItem(progressKey), 10);
  const hasProgress = !isNaN(lastPage) && lastPage > 1;

  return (
    <Layout title={`Read: ${book.title}`} description="Your ebook is ready to read.">
      <PageHeader>
        <div className="lib-success-icon-wrap">
          <div className="lib-success-icon">
            <i className="bi bi-check-lg" />
          </div>
          <div className="lib-success-sparkles">
            <Sparkles color="currentColor" />
          </div>
        </div>
        <div style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1rem" }}>
          <i className="bi bi-bag-check" /> Purchase Confirmed
        </div>
        <h1>
          Welcome, <em>{purchase.name?.split(" ")[0] || "Reader"}</em>.
          <br />
          Your book is ready.
        </h1>
        <p>
          Read securely in your browser — no downloads, no installation. Your reading progress is saved automatically.
          Return to this page anytime within {EBOOK_DELIVERY.accessDays} days.
        </p>
      </PageHeader>

      <section className="lib-download">
        <div className="lib-download-card">
          <div className="lib-download-cover">
            <div className="lib-cover-num">{book.n}</div>
            <i className="bi bi-book lib-cover-icon" />
            <div className="lib-cover-label">EBOOK</div>
          </div>
          <div className="lib-download-info">
            <div className="lib-book-tag">{book.tag}</div>
            <h2 className="lib-book-title">{book.title}</h2>
            <p className="lib-book-meta">
              {book.pages} pages · {book.year} · {book.pub.split(" · ")[0]}
            </p>
            <p className="lib-book-desc">{book.longDesc || book.desc}</p>

            <div className="lib-download-actions">
              {valid ? (
                <>
                  <button onClick={() => setReaderOpen(true)} className="btn lib-read-btn">
                    <i className="bi bi-book-half" /> {hasProgress ? `Continue Reading · Page ${lastPage}` : "Start Reading"}
                  </button>
                  {hasProgress && (
                    <button
                      onClick={() => { localStorage.removeItem(progressKey); setReaderOpen(true); }}
                      className="lib-read-restart"
                    >
                      <i className="bi bi-arrow-counterclockwise" /> Start from beginning
                    </button>
                  )}
                </>
              ) : (
                <div className="lib-expired-note">
                  <i className="bi bi-clock-history" /> Your access expired {fmt(new Date(new Date(purchase.purchasedAt).getTime() + EBOOK_DELIVERY.accessDays * 86400000))}. Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> to renew.
                </div>
              )}
            </div>

            <details className="lib-receipt">
              <summary><i className="bi bi-receipt" /> Purchase receipt</summary>
              <div className="lib-receipt-body">
                <div><span>Customer</span><strong>{purchase.name}</strong></div>
                <div><span>Email</span><strong>{purchase.email}</strong></div>
                <div><span>Amount</span><strong>₦{purchase.amount?.toLocaleString()}</strong></div>
                <div><span>Date</span><strong>{fmt(purchase.purchasedAt)}</strong></div>
                <div><span>Reference</span><strong style={{ fontFamily: "monospace", fontSize: "0.78rem" }}>{purchase.reference}</strong></div>
              </div>
            </details>
          </div>
        </div>

        <div className="lib-perks">
          <div className="lib-perk">
            <i className="bi bi-shield-check" />
            <strong>Read securely on-site</strong>
            <span>No downloads. Watermarked. Yours alone.</span>
          </div>
          <div className="lib-perk">
            <i className="bi bi-bookmark-check" />
            <strong>Progress auto-saved</strong>
            <span>Pick up where you left off, any time</span>
          </div>
          <div className="lib-perk">
            <i className="bi bi-book-half" />
            <strong>Want a signed hard copy?</strong>
            <span><a href={`tel:${SITE.phoneE164}`}>Call {SITE.phone}</a></span>
          </div>
        </div>

        <div className="lib-back">
          <Link to="/books" className="btn btn-ghost">
            <i className="bi bi-arrow-left" /> Browse more books
          </Link>
        </div>
      </section>

      <style>{`
        .lib-success-icon-wrap { position: relative; width: 90px; height: 90px; margin-bottom: 1.6rem; }
        .lib-success-icon { width: 90px; height: 90px; background: var(--gold); color: var(--white); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.6rem; box-shadow: 0 14px 40px -10px rgba(37,99,235,0.55); }
        .lib-success-sparkles { position: absolute; inset: -20px; pointer-events: none; color: var(--gold3); }

        .lib-download { padding: 3rem var(--gutter) 6rem; background: var(--warm); }
        .lib-download-card { max-width: 980px; margin: 0 auto; display: grid; grid-template-columns: 260px 1fr; gap: 3rem; padding: 2.5rem; background: var(--warm); border: 1px solid var(--border-l); border-radius: 12px; box-shadow: 0 30px 60px -25px rgba(9,21,42,0.15); }
        @media (max-width: 800px) { .lib-download-card { grid-template-columns: 1fr; padding: 1.8rem; gap: 1.8rem; } }

        .lib-download-cover { aspect-ratio: 3/4; background: linear-gradient(135deg, var(--ink) 0%, var(--ink3) 100%); border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; overflow: hidden; }
        .lib-download-cover::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 70% 30%, rgba(37,99,235,0.30), transparent 60%); }
        .lib-cover-num { font-family: var(--serif); font-size: 4.5rem; font-style: italic; font-weight: 300; color: var(--gold3); position: relative; z-index: 1; }
        .lib-cover-icon { font-size: 2.6rem; color: rgba(255,255,255,0.3); position: relative; z-index: 1; margin-top: 0.5rem; }
        .lib-cover-label { position: absolute; bottom: 1rem; font-size: 0.55rem; font-weight: 700; letter-spacing: 0.25em; color: var(--gold3); z-index: 1; }

        .lib-book-tag { font-size: 0.58rem; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: var(--gold); margin-bottom: 0.7rem; }
        .lib-book-title { font-family: var(--serif); font-size: clamp(1.6rem, 3vw, 2.2rem); font-weight: 400; font-style: italic; line-height: 1.2; color: var(--ink); margin-bottom: 0.7rem; }
        .lib-book-meta { font-size: 0.78rem; color: var(--muted-l); margin-bottom: 1rem; }
        .lib-book-desc { font-size: 0.95rem; font-weight: 300; line-height: 1.7; color: var(--muted-l); margin-bottom: 1.8rem; }

        .lib-read-btn { font-size: 0.8rem !important; padding: 1.1rem 1.8rem !important; }
        .lib-read-restart { display: inline-flex; align-items: center; gap: 0.4rem; background: transparent; border: none; color: var(--muted-l); font-size: 0.78rem; cursor: pointer; padding: 0.7rem 0; margin-left: 1rem; transition: color 0.2s; }
        .lib-read-restart:hover { color: var(--gold); }
        .lib-download-actions { margin-bottom: 1.5rem; display: flex; align-items: center; flex-wrap: wrap; }

        .lib-expired-note { padding: 1rem 1.2rem; background: rgba(220,38,38,0.06); border-left: 3px solid #DC2626; border-radius: 4px; font-size: 0.85rem; color: var(--ink); line-height: 1.6; }
        .lib-expired-note i { color: #DC2626; }
        .lib-expired-note a { color: var(--gold); font-weight: 600; }

        .lib-receipt { font-size: 0.85rem; color: var(--muted-l); padding-top: 1.5rem; border-top: 1px solid var(--border-l); cursor: pointer; }
        .lib-receipt summary { font-weight: 600; padding: 0.4rem 0; list-style: none; display: inline-flex; align-items: center; gap: 0.5rem; }
        .lib-receipt summary::-webkit-details-marker { display: none; }
        .lib-receipt summary i { color: var(--gold); }
        .lib-receipt-body { margin-top: 1rem; display: grid; gap: 0.6rem; }
        .lib-receipt-body div { display: grid; grid-template-columns: 100px 1fr; gap: 1rem; padding: 0.4rem 0; border-bottom: 1px dashed var(--border-l); }
        .lib-receipt-body span { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--muted-l); }
        .lib-receipt-body strong { color: var(--ink); font-weight: 500; }

        .lib-perks { max-width: 980px; margin: 2.5rem auto 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.2rem; }
        @media (max-width: 800px) { .lib-perks { grid-template-columns: 1fr; } }
        .lib-perk { padding: 1.5rem; background: var(--warm2); border: 1px solid var(--border-l); border-radius: 8px; text-align: center; }
        .lib-perk i { font-size: 1.5rem; color: var(--gold); margin-bottom: 0.7rem; display: block; }
        .lib-perk strong { display: block; font-size: 0.85rem; font-weight: 700; color: var(--ink); margin-bottom: 0.3rem; }
        .lib-perk span { font-size: 0.78rem; color: var(--muted-l); line-height: 1.5; }
        .lib-perk a { color: var(--gold); font-weight: 600; }

        .lib-back { max-width: 980px; margin: 3rem auto 0; text-align: center; }

        .lib-section { padding: 3rem var(--gutter) 5rem; background: var(--warm); }
        .lib-list { max-width: 880px; margin: 0 auto; display: flex; flex-direction: column; gap: 1rem; }
        .lib-row { display: grid; grid-template-columns: 56px 1fr auto; gap: 1.5rem; align-items: center; padding: 1.3rem 1.5rem; background: var(--warm); border: 1px solid var(--border-l); border-radius: 8px; transition: all 0.3s var(--ease-out); }
        .lib-row:hover { transform: translateY(-2px); border-color: var(--gold); box-shadow: var(--shadow-2); }
        .lib-row.expired { opacity: 0.6; }
        .lib-row-icon { width: 56px; height: 56px; display: flex; align-items: center; justify-content: center; background: var(--gold); color: var(--white); border-radius: 8px; font-size: 1.6rem; }
        .lib-row-info h3 { font-family: var(--serif); font-size: 1.15rem; font-weight: 400; font-style: italic; color: var(--ink); margin-bottom: 0.25rem; }
        .lib-row-info p { font-size: 0.75rem; color: var(--muted-l); }
        .lib-row-status { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--gold); display: inline-flex; align-items: center; gap: 0.4rem; white-space: nowrap; }
        .lib-row.expired .lib-row-status { color: var(--muted-l); }

        .lib-empty-cta { padding: 2rem var(--gutter) 6rem; text-align: center; background: var(--warm); }
        .lib-empty-cta p { color: var(--muted-l); margin-bottom: 1.5rem; }
        .lib-empty-actions { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
      `}</style>
    </Layout>
  );
}

function PageHeader({ children }) {
  return (
    <>
      <style>{`
        .lib-header { position: relative; padding: 9rem var(--gutter) 4rem; background: var(--ink); color: var(--white); overflow: hidden; text-align: center; }
        .lib-header::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 50% 50%, rgba(37,99,235,0.22), transparent 55%); }
        .lib-header-blob { position: absolute; top: -120px; right: -180px; width: 500px; height: 500px; pointer-events: none; opacity: 0.6; }
        .lib-header-inner { position: relative; z-index: 2; max-width: 760px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; }
        .lib-header-inner h1 { font-family: var(--serif); font-size: clamp(2.2rem, 5vw, 4rem); font-weight: 300; line-height: 1.05; letter-spacing: -0.02em; margin-bottom: 1.4rem; }
        .lib-header-inner h1 em { font-style: italic; color: var(--gold3); }
        .lib-header-inner p { font-size: clamp(0.95rem, 1.3vw, 1.05rem); font-weight: 300; line-height: 1.7; color: rgba(255,255,255,0.72); max-width: 600px; }
      `}</style>
      <section className="lib-header">
        <div className="lib-header-blob"><BlobAccent color="#2563EB" opacity={0.18} /></div>
        <div className="lib-header-inner">{children}</div>
      </section>
    </>
  );
}

function EmptyLibrary() {
  return (
    <>
      <style>{`
        .lib-empty { max-width: 600px; margin: 2rem auto; text-align: center; padding: 3rem 2rem; background: var(--warm2); border-radius: 12px; }
        .lib-empty-icon { width: 64px; height: 64px; margin: 0 auto 1.4rem; background: var(--warm3); color: var(--gold); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; }
        .lib-empty h2 { font-family: var(--serif); font-size: 1.6rem; font-weight: 300; font-style: italic; color: var(--ink); margin-bottom: 0.7rem; }
        .lib-empty p { color: var(--muted-l); line-height: 1.7; margin-bottom: 1.5rem; }
      `}</style>
      <div className="lib-empty">
        <div className="lib-empty-icon"><i className="bi bi-bookshelf" /></div>
        <h2>Your library is empty</h2>
        <p>Once you purchase an ebook, it will appear here. Your purchases are saved on this device — bookmark this page after each purchase.</p>
        <Link to="/books" className="btn"><i className="bi bi-book-half" /> Browse Books</Link>
      </div>
    </>
  );
}
