import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../components/Layout";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import MagneticWrap from "../components/MagneticWrap";
import { BlobAccent, IconBook } from "../components/Illustrations";
import { usePaystack } from "../lib/paystack";
import { recordPurchase } from "../lib/purchases";
import { books as BOOKS } from "../data/books";
import { SITE } from "../lib/config";

export default function Books() {
  const navigate = useNavigate();
  const { pay, ready: paystackReady } = usePaystack();
  const [modal, setModal] = useState(null);
  const [buyer, setBuyer] = useState({ name: "", email: "" });
  const [paying, setPaying] = useState(false);

  const handleBuy = (book) => {
    setBuyer({ name: "", email: "" });
    setModal({ book });
  };

  const confirm = (e) => {
    e.preventDefault();
    if (!buyer.email || !buyer.name) return;
    const book = modal.book;
    setPaying(true);
    pay({
      email: buyer.email,
      amount: book.price,
      reference: `dkh-${book.slug}-${Date.now()}`,
      metadata: {
        custom_fields: [
          { display_name: "Book", variable_name: "book", value: book.title },
          { display_name: "Customer", variable_name: "customer", value: buyer.name },
          { display_name: "Type", variable_name: "type", value: "ebook" },
        ],
      },
      onSuccess: (ref) => {
        setPaying(false);
        // Save the purchase so /library/[ref] can show the download
        recordPurchase({
          reference: ref,
          bookSlug: book.slug,
          email: buyer.email,
          name: buyer.name,
          amount: book.price,
        });
        // Redirect to the download page
        setModal(null);
        navigate(`/library/${ref}`);
      },
      onClose: () => setPaying(false),
    });
  };

  const requestHardCopy = (book) => {
    const message = `Hi Dr. Hamilton — I'd like to order a signed hard copy of "${book.title}" (₦${book.physicalPrice.toLocaleString()}). Please let me know about delivery options.`;
    const wa = `https://wa.me/${SITE.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
    window.open(wa, "_blank", "noopener,noreferrer");
  };

  return (
    <Layout
      title="Books"
      description="Dr. Kunle Hamilton's four published works — available as instant ebook downloads, with signed hard copies on request."
    >
      <style>{`
        .bk-intro { padding: 5rem var(--gutter); background: var(--warm); text-align: center; position: relative; overflow: hidden; }
        .bk-intro-lead { font-family: var(--serif); font-size: clamp(1.3rem, 2.4vw, 1.85rem); font-style: italic; font-weight: 300; line-height: 1.5; color: var(--muted-l); max-width: 760px; margin: 0 auto; position: relative; z-index: 2; }
        .bk-intro-lead em { color: var(--gold); }

        .bk-instructions { max-width: 880px; margin: 2.5rem auto 0; display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; position: relative; z-index: 2; }
        @media (max-width: 700px) { .bk-instructions { grid-template-columns: 1fr; } }
        .bk-inst { padding: 1.5rem 1.6rem; background: var(--warm2); border: 1px solid var(--border-l); border-radius: 8px; text-align: left; display: flex; gap: 1rem; align-items: flex-start; }
        .bk-inst-icon { width: 42px; height: 42px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; background: var(--gold); color: var(--white); border-radius: 8px; font-size: 1.1rem; }
        .bk-inst strong { display: block; font-family: var(--serif); font-size: 1.1rem; font-style: italic; color: var(--ink); font-weight: 400; margin-bottom: 0.3rem; }
        .bk-inst span { display: block; font-size: 0.82rem; color: var(--muted-l); line-height: 1.55; }

        .bk-publisher-strip { background: var(--ink); color: var(--white); padding: 2.5rem var(--gutter); border-top: 1px solid var(--border-d); border-bottom: 1px solid var(--border-d); display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 2rem; align-items: center; }
        @media (max-width: 800px) { .bk-publisher-strip { grid-template-columns: 1fr; text-align: center; gap: 1rem; padding: 3rem var(--gutter); } }
        .bk-publisher-stat { display: flex; align-items: center; gap: 1rem; }
        @media (max-width: 800px) { .bk-publisher-stat { justify-content: center; } }
        .bk-publisher-icon { width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; background: var(--gold); border-radius: 4px; font-size: 1.3rem; flex-shrink: 0; }
        .bk-publisher-text strong { display: block; font-family: var(--serif); font-size: 1.4rem; font-weight: 400; color: var(--white); line-height: 1; }
        .bk-publisher-text em { display: block; font-size: 0.65rem; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold3); margin-top: 0.3rem; font-style: normal; }

        .bk-grid { padding: 6rem var(--gutter); background: var(--warm); display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; position: relative; overflow: hidden; }
        @media (max-width: 900px) { .bk-grid { grid-template-columns: 1fr; padding: 4rem var(--gutter); } }
        .bk-grid-blob1 { position: absolute; top: 10%; left: -180px; width: 400px; height: 400px; opacity: 0.4; pointer-events: none; }
        .bk-grid-blob2 { position: absolute; bottom: 5%; right: -180px; width: 400px; height: 400px; opacity: 0.4; pointer-events: none; }

        .bk-card { background: var(--warm); border: 1px solid var(--border-l); border-radius: 8px; padding: 2.5rem; transition: all 0.4s var(--ease-out); position: relative; overflow: hidden; display: flex; flex-direction: column; z-index: 2; }
        .bk-card::before { content: ''; position: absolute; top: 0; left: 0; width: 0; height: 3px; background: var(--gold); transition: width 0.5s; }
        .bk-card:hover::before { width: 100%; }
        .bk-card:hover { border-color: var(--gold); box-shadow: 0 30px 60px -25px rgba(37,99,235,0.25); transform: translateY(-5px); }
        .bk-card-spine { position: absolute; top: 0; right: 0; width: 8px; height: 100%; background: linear-gradient(180deg, var(--gold) 0%, var(--gold2) 50%, var(--gold) 100%); opacity: 0; transition: opacity 0.35s; }
        .bk-card:hover .bk-card-spine { opacity: 1; }

        .bk-card-num { font-family: var(--serif); font-size: 4.5rem; font-weight: 300; color: var(--warm3); line-height: 1; margin-bottom: 1rem; transition: color 0.3s; font-style: italic; }
        .bk-card:hover .bk-card-num { color: var(--gold3); }
        .bk-card-icon { position: absolute; top: 2rem; right: 2.5rem; width: 40px; height: 40px; color: var(--warm3); transition: color 0.3s, transform 0.3s; }
        .bk-card-icon svg { width: 100%; height: 100%; }
        .bk-card:hover .bk-card-icon { color: var(--gold3); transform: rotate(-8deg); }

        .bk-card-tag { font-size: 0.58rem; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: var(--gold); margin-bottom: 0.8rem; }
        .bk-card-title { font-family: var(--serif); font-size: 1.6rem; font-weight: 400; font-style: italic; line-height: 1.2; color: var(--ink); margin-bottom: 1rem; }
        .bk-card-desc { font-size: 0.92rem; font-weight: 300; line-height: 1.7; color: var(--muted-l); margin-bottom: 1.4rem; flex: 1; }
        .bk-card-pub { display: flex; align-items: center; gap: 0.5rem; font-size: 0.7rem; font-weight: 500; color: var(--muted-l); padding: 0.8rem 0; border-top: 1px solid var(--border-l); border-bottom: 1px solid var(--border-l); margin-bottom: 1.2rem; }
        .bk-card-pub i { color: var(--gold); }

        .bk-card-price-row { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; margin-bottom: 1.2rem; flex-wrap: wrap; }
        .bk-card-price { display: flex; align-items: baseline; gap: 0.5rem; }
        .bk-card-amount { font-family: var(--serif); font-size: 1.9rem; font-weight: 400; color: var(--gold); line-height: 1; }
        .bk-card-type { font-size: 0.6rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--muted-l); }
        .bk-card-badge { display: inline-flex; align-items: center; gap: 0.4rem; font-size: 0.6rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--gold); padding: 0.4rem 0.7rem; background: rgba(37,99,235,0.08); border-radius: 4px; }
        .bk-card-badge i { font-size: 0.7rem; }

        .bk-card-actions { display: flex; flex-direction: column; gap: 0.6rem; }
        .bk-card-actions .btn { justify-content: center; padding: 0.85rem 1.2rem; }
        .bk-card-hardcopy { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; font-size: 0.65rem; font-weight: 600; letter-spacing: 0.1em; color: var(--muted-l); padding: 0.6rem; text-decoration: none; cursor: pointer; background: transparent; border: 1px dashed var(--border-l); border-radius: 4px; transition: all 0.25s; }
        .bk-card-hardcopy:hover { color: var(--gold); border-color: var(--gold); }

        /* Modal */
        .modal-overlay { position: fixed; inset: 0; z-index: 9000; background: rgba(9,21,42,0.75); backdrop-filter: blur(6px); display: flex; align-items: center; justify-content: center; padding: 1.5rem; }
        .modal { background: var(--warm); width: 100%; max-width: 480px; border-top: 4px solid var(--gold); border-radius: 4px; padding: 2.5rem 2rem; box-shadow: 0 30px 80px rgba(0,0,0,0.4); max-height: 92vh; overflow-y: auto; }
        .modal-eyebrow { font-size: 0.58rem; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: var(--gold); margin-bottom: 0.7rem; display: flex; align-items: center; gap: 0.5rem; }
        .modal-title { font-family: var(--serif); font-size: 1.6rem; font-weight: 400; font-style: italic; line-height: 1.2; color: var(--ink); margin-bottom: 0.5rem; }
        .modal-sub { font-size: 0.78rem; color: var(--muted-l); margin-bottom: 1.6rem; line-height: 1.55; }
        .modal-form { display: flex; flex-direction: column; gap: 1rem; }
        .modal-field label { display: block; font-size: 0.55rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted-l); margin-bottom: 0.4rem; }
        .modal-field input { width: 100%; background: var(--warm2); border: 1px solid var(--border-l); padding: 0.85rem 0.95rem; font-family: var(--sans); font-size: 0.9rem; outline: none; border-radius: 3px; transition: border-color 0.2s; }
        .modal-field input:focus { border-color: var(--gold); background: var(--warm); }
        .modal-cancel { background: transparent; border: none; color: var(--muted-l); font-size: 0.78rem; cursor: pointer; padding: 0.5rem 0; }
        .modal-cancel:hover { color: var(--ink); }
        .modal-footer { padding-top: 1rem; border-top: 1px solid var(--border-l); margin-top: 0.5rem; font-size: 0.7rem; color: var(--muted-l); text-align: center; }
        .modal-footer i { color: var(--gold); }
        .modal-perks { display: flex; flex-direction: column; gap: 0.5rem; padding: 1rem 1.1rem; background: var(--warm2); border-radius: 6px; margin-bottom: 1.4rem; }
        .modal-perk { display: flex; align-items: center; gap: 0.7rem; font-size: 0.78rem; color: var(--muted-l); }
        .modal-perk i { color: var(--gold); font-size: 0.95rem; }
        .modal-perk strong { color: var(--ink); }
      `}</style>

      <PageHero
        eyebrow={<><i className="bi bi-book-half" /> Published Works</>}
        title={<><strong>Four</strong> books. <em>Eighteen</em> countries. <em>Read</em> on-site.</>}
        subtitle="Dr. Hamilton's written legacy — leadership, communication, political philosophy and film studies. Buy the ebook now and read tonight. Want a signed hard copy? One call away."
        image="/about.jpg"
        variant="dark"
      />

      <section className="bk-intro">
        <Reveal>
          <p className="bk-intro-lead">
            <em>Buy the ebook</em>, read it instantly in your browser. <em>Want a signed hard copy?</em> Call or WhatsApp to arrange delivery anywhere in the world.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="bk-instructions">
            <div className="bk-inst">
              <div className="bk-inst-icon"><i className="bi bi-book-half" /></div>
              <div>
                <strong>1. Ebook</strong>
                <span>Pay with Paystack (cards, USSD, bank transfer). Read instantly in your browser. Re-read for 30 days. No downloads.</span>
              </div>
            </div>
            <div className="bk-inst">
              <div className="bk-inst-icon"><i className="bi bi-telephone-fill" /></div>
              <div>
                <strong>2. Signed Hard Copy</strong>
                <span>Call <a href={`tel:${SITE.phoneE164}`} style={{ color: "var(--gold)", fontWeight: 600 }}>{SITE.phone}</a> or WhatsApp to request — anywhere in the world.</span>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="bk-publisher-strip">
        <Reveal>
          <div className="bk-publisher-stat">
            <div className="bk-publisher-icon"><i className="bi bi-bookshelf" /></div>
            <div className="bk-publisher-text">
              <strong>Lambert Academic</strong>
              <em>Publisher · Germany</em>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="bk-publisher-stat">
            <div className="bk-publisher-icon"><i className="bi bi-globe-europe-africa" /></div>
            <div className="bk-publisher-text">
              <strong>18 Countries</strong>
              <em>European Distribution</em>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="bk-publisher-stat">
            <div className="bk-publisher-icon"><i className="bi bi-translate" /></div>
            <div className="bk-publisher-text">
              <strong>Academic Press</strong>
              <em>Print on Demand</em>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="bk-grid">
        <div className="bk-grid-blob1"><BlobAccent color="#2563EB" opacity={0.05} /></div>
        <div className="bk-grid-blob2"><BlobAccent color="#DC2626" opacity={0.04} /></div>
        {BOOKS.map((book, i) => (
          <Reveal key={book.slug} delay={i * 0.08}>
            <article className="bk-card">
              <div className="bk-card-spine" />
              <div className="bk-card-icon"><IconBook /></div>
              <div className="bk-card-num">{book.n}</div>
              <div className="bk-card-tag">{book.tag}</div>
              <h2 className="bk-card-title">{book.title}</h2>
              <p className="bk-card-desc">{book.desc}</p>
              <div className="bk-card-pub">
                <i className="bi bi-award-fill" />
                <span>{book.pub} · {book.countries}</span>
              </div>
              <div className="bk-card-price-row">
                <div className="bk-card-price">
                  <span className="bk-card-amount">₦{book.price.toLocaleString()}</span>
                  <span className="bk-card-type">Ebook · PDF</span>
                </div>
                <span className="bk-card-badge">
                  <i className="bi bi-book-half" /> Read on-site
                </span>
              </div>
              <div className="bk-card-actions">
                <MagneticWrap strength={12}>
                  <button onClick={() => handleBuy(book)} className="btn" disabled={!paystackReady}>
                    <i className="bi bi-cart-plus" /> Buy Ebook · ₦{book.price.toLocaleString()}
                  </button>
                </MagneticWrap>
                <button onClick={() => requestHardCopy(book)} className="bk-card-hardcopy">
                  <i className="bi bi-telephone" /> Want a signed hard copy? Call us
                </button>
              </div>
            </article>
          </Reveal>
        ))}
      </section>

      {/* Purchase Modal */}
      <AnimatePresence>
        {modal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !paying && setModal(null)}
          >
            <motion.div
              className="modal"
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-eyebrow"><i className="bi bi-book-half" /> Buy Ebook</div>
              <h3 className="modal-title">{modal.book.title}</h3>
              <p className="modal-sub">
                ₦{modal.book.price.toLocaleString()} · {modal.book.pages} pages · Read securely in your browser

              </p>

              <div className="modal-perks">
                <div className="modal-perk"><i className="bi bi-book-half" /> <strong>Start reading instantly</strong> — opens in your browser</div>
                <div className="modal-perk"><i className="bi bi-shield-check" /> <strong>No downloads</strong> — watermarked & licensed to you</div>
                <div className="modal-perk"><i className="bi bi-bookmark-check" /> Progress saved · re-read for 30 days</div>
              </div>

              <form onSubmit={confirm} className="modal-form">
                <div className="modal-field">
                  <label htmlFor="buy-name">Your Name</label>
                  <input id="buy-name" type="text" required value={buyer.name} onChange={(e) => setBuyer({ ...buyer, name: e.target.value })} placeholder="Full name" />
                </div>
                <div className="modal-field">
                  <label htmlFor="buy-email">Email Address</label>
                  <input id="buy-email" type="email" required value={buyer.email} onChange={(e) => setBuyer({ ...buyer, email: e.target.value })} placeholder="your@email.com" />
                </div>
                <button type="submit" className="btn" disabled={paying || !paystackReady} style={{ marginTop: "0.4rem", justifyContent: "center" }}>
                  {paying ? (<><i className="bi bi-arrow-clockwise" /> Processing...</>)
                    : !paystackReady ? "Loading..."
                    : (<>Pay ₦{modal.book.price.toLocaleString()} via Paystack <i className="bi bi-arrow-right" /></>)}
                </button>
                <button type="button" onClick={() => setModal(null)} disabled={paying} className="modal-cancel">Cancel</button>
                <div className="modal-footer">
                  <i className="bi bi-shield-lock-fill" /> Secure payment by <strong style={{ color: "var(--ink)" }}>Paystack</strong> · All cards & USSD accepted
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
