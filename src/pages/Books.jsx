import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../components/Layout";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import { usePaystack } from "../lib/paystack";

const BOOKS = [
  {
    n: "01",
    tag: "Leadership · Self-Development",
    title: "Releasing the Eagle in You",
    desc: "Dr. Hamilton's landmark inspirational work on leadership and self-actualization — an eight-chapter guide to unlocking the God-given greatness inside every person.",
    pub: "Lambert Academic Publishing",
    countries: "18 European countries",
    link: "https://www.amazon.com",
    price: 8500,
  },
  {
    n: "02",
    tag: "Communication · Church Studies",
    title: "Journey to Understanding",
    desc: "An academic investigation into how style and content shape audience understanding. Uses his Nigerian church congregation and his Raypower 100.5 FM radio programme as the living laboratory.",
    pub: "Lambert Academic Publishing · Amazon.com.be",
    countries: "Available across EU",
    link: "https://www.amazon.com.be",
    price: 9500,
  },
  {
    n: "03",
    tag: "Politics · Digital Media",
    title: "New Media and Democracy",
    desc: "Nigeria's President and the Facebook Example. A pioneering study of how former President Goodluck Jonathan used Facebook in his 2011 campaign — one of Africa's first serious analyses of social media and electoral politics.",
    pub: "Lambert Academic Publishing · Amazon.com",
    countries: "Global distribution",
    link: "https://www.amazon.com",
    price: 9500,
  },
  {
    n: "04",
    tag: "Film · Media Studies",
    title: "Nollywood and the Challenge of Movie Subtitles",
    desc: "Co-authored with Yomi Daramola. A critical assessment of the Nollywood movie industry and the challenge of subtitling for global audiences — bridging Nigeria's film industry with international media scholarship.",
    pub: "Lambert Academic Publishing · Amazon.com.be",
    countries: "Available across EU",
    link: "https://www.amazon.com.be",
    price: 8500,
  },
];

export default function Books() {
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
      reference: `dkh-${book.title.toLowerCase().replace(/\s+/g, "-").slice(0, 30)}-${Date.now()}`,
      metadata: {
        custom_fields: [
          { display_name: "Book", variable_name: "book", value: book.title },
          { display_name: "Customer", variable_name: "customer", value: buyer.name },
        ],
      },
      onSuccess: (ref) => {
        setPaying(false);
        setModal({ book, success: true, ref });
      },
      onClose: () => setPaying(false),
    });
  };

  return (
    <Layout
      title="Books"
      description="Dr. Kunle Hamilton's four published works — leadership, communication, politics, film studies. Published by Lambert Academic Publishing."
    >
      <style>{`
        .bk-intro { padding: 5rem var(--gutter); background: var(--warm); text-align: center; }
        .bk-intro-lead { font-family: var(--serif); font-size: clamp(1.3rem, 2.4vw, 1.85rem); font-style: italic; font-weight: 300; line-height: 1.5; color: var(--muted-l); max-width: 760px; margin: 0 auto; }
        .bk-intro-lead em { color: var(--gold); }

        .bk-publisher-strip { background: var(--ink); color: var(--white); padding: 2.5rem var(--gutter); border-top: 1px solid var(--border-d); border-bottom: 1px solid var(--border-d); display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 2rem; align-items: center; }
        @media (max-width: 800px) { .bk-publisher-strip { grid-template-columns: 1fr; text-align: center; gap: 1rem; padding: 3rem var(--gutter); } }
        .bk-publisher-stat { display: flex; align-items: center; gap: 1rem; }
        @media (max-width: 800px) { .bk-publisher-stat { justify-content: center; } }
        .bk-publisher-icon { width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; background: var(--gold); border-radius: 4px; font-size: 1.3rem; flex-shrink: 0; }
        .bk-publisher-text strong { display: block; font-family: var(--serif); font-size: 1.4rem; font-weight: 400; color: var(--white); line-height: 1; }
        .bk-publisher-text em { display: block; font-size: 0.65rem; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold3); margin-top: 0.3rem; font-style: normal; }

        .bk-grid { padding: 5rem var(--gutter); background: var(--warm); display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; }
        @media (max-width: 900px) { .bk-grid { grid-template-columns: 1fr; padding: 4rem var(--gutter); } }

        .bk-card { background: var(--warm); border: 1px solid var(--border-l); border-radius: 4px; padding: 2.5rem; transition: all 0.35s var(--ease-out); position: relative; overflow: hidden; display: flex; flex-direction: column; }
        .bk-card::before { content: ''; position: absolute; top: 0; left: 0; width: 0; height: 2px; background: var(--gold); transition: width 0.5s; }
        .bk-card:hover::before { width: 100%; }
        .bk-card:hover { border-color: var(--gold); box-shadow: var(--shadow-2); transform: translateY(-3px); }

        .bk-card-num { font-family: var(--serif); font-size: 4rem; font-weight: 300; color: var(--warm3); line-height: 1; margin-bottom: 1rem; transition: color 0.3s; }
        .bk-card:hover .bk-card-num { color: var(--gold3); }

        .bk-card-tag { font-size: 0.58rem; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: var(--gold); margin-bottom: 0.8rem; }
        .bk-card-title { font-family: var(--serif); font-size: 1.6rem; font-weight: 400; font-style: italic; line-height: 1.2; color: var(--ink); margin-bottom: 1rem; }
        .bk-card-desc { font-size: 0.92rem; font-weight: 300; line-height: 1.7; color: var(--muted-l); margin-bottom: 1.4rem; flex: 1; }

        .bk-card-pub { display: flex; align-items: center; gap: 0.5rem; font-size: 0.7rem; font-weight: 500; color: var(--muted-l); padding: 0.8rem 0; border-top: 1px solid var(--border-l); border-bottom: 1px solid var(--border-l); margin-bottom: 1.4rem; }
        .bk-card-pub i { color: var(--gold); }

        .bk-card-price-row { display: flex; align-items: baseline; gap: 0.5rem; margin-bottom: 1.2rem; }
        .bk-card-price { font-family: var(--serif); font-size: 1.7rem; font-weight: 400; color: var(--gold); }
        .bk-card-signed { font-size: 0.6rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--muted-l); }

        .bk-card-actions { display: flex; gap: 0.7rem; flex-wrap: wrap; }
        .bk-card-actions .btn { flex: 1; min-width: 0; justify-content: center; padding: 0.85rem 1.2rem; }
        .bk-card-actions .btn-ghost { flex: 0 0 auto; padding: 0.85rem 1.2rem; }

        /* Modal */
        .modal-overlay { position: fixed; inset: 0; z-index: 9000; background: rgba(9,21,42,0.75); backdrop-filter: blur(6px); display: flex; align-items: center; justify-content: center; padding: 1.5rem; }
        .modal { background: var(--warm); width: 100%; max-width: 480px; border-top: 4px solid var(--gold); border-radius: 4px; padding: 2.5rem 2rem; box-shadow: 0 30px 80px rgba(0,0,0,0.4); max-height: 92vh; overflow-y: auto; }
        .modal-eyebrow { font-size: 0.58rem; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: var(--gold); margin-bottom: 0.7rem; display: flex; align-items: center; gap: 0.5rem; }
        .modal-title { font-family: var(--serif); font-size: 1.6rem; font-weight: 400; font-style: italic; line-height: 1.2; color: var(--ink); margin-bottom: 0.5rem; }
        .modal-sub { font-size: 0.78rem; color: var(--muted-l); margin-bottom: 1.6rem; }
        .modal-form { display: flex; flex-direction: column; gap: 1rem; }
        .modal-field label { display: block; font-size: 0.55rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted-l); margin-bottom: 0.4rem; }
        .modal-field input { width: 100%; background: var(--warm2); border: 1px solid var(--border-l); padding: 0.85rem 0.95rem; font-family: var(--sans); font-size: 0.9rem; outline: none; border-radius: 3px; transition: border-color 0.2s; }
        .modal-field input:focus { border-color: var(--gold); background: var(--warm); }
        .modal-cancel { background: transparent; border: none; color: var(--muted-l); font-size: 0.78rem; cursor: pointer; padding: 0.5rem 0; }
        .modal-cancel:hover { color: var(--ink); }
        .modal-footer { padding-top: 1rem; border-top: 1px solid var(--border-l); margin-top: 0.5rem; font-size: 0.7rem; color: var(--muted-l); text-align: center; }
        .modal-footer i { color: var(--gold); }
      `}</style>

      <PageHero
        eyebrow={<><i className="bi bi-book-half" /> Published Works</>}
        title={<><strong>Four</strong> books. <em>Eighteen</em> countries.</>}
        subtitle="Dr. Hamilton's written legacy spans leadership, communication, political philosophy and film studies — published by Lambert Academic Publishing and distributed across Europe and beyond."
        image="/about.jpg"
        variant="dark"
      />

      <section className="bk-intro">
        <Reveal>
          <p className="bk-intro-lead">
            <em>Buy a signed copy</em> directly from Dr. Hamilton — secure payment by Paystack,
            delivered within Nigeria. Or view the academic editions on Amazon worldwide.
          </p>
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
        {BOOKS.map((book, i) => (
          <Reveal key={book.n} delay={i * 0.08}>
            <article className="bk-card">
              <div className="bk-card-num">{book.n}</div>
              <div className="bk-card-tag">{book.tag}</div>
              <h2 className="bk-card-title">{book.title}</h2>
              <p className="bk-card-desc">{book.desc}</p>
              <div className="bk-card-pub">
                <i className="bi bi-award-fill" />
                <span>{book.pub} · {book.countries}</span>
              </div>
              <div className="bk-card-price-row">
                <span className="bk-card-price">₦{book.price.toLocaleString()}</span>
                <span className="bk-card-signed">Signed Copy</span>
              </div>
              <div className="bk-card-actions">
                <button onClick={() => handleBuy(book)} className="btn" disabled={!paystackReady}>
                  <i className="bi bi-cart-plus" /> Buy Now
                </button>
                <a href={book.link} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                  <i className="bi bi-box-arrow-up-right" /> Amazon
                </a>
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
              {modal.success ? (
                <div style={{ textAlign: "center", padding: "0.5rem 0" }}>
                  <div style={{ width: "72px", height: "72px", margin: "0 auto 1.2rem", background: "var(--gold)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", color: "var(--white)" }}>
                    <i className="bi bi-check-lg" />
                  </div>
                  <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.7rem", fontWeight: 300, fontStyle: "italic", color: "var(--ink)", marginBottom: "0.7rem" }}>Thank You</h3>
                  <p style={{ fontSize: "0.92rem", color: "var(--muted-l)", lineHeight: 1.65, marginBottom: "0.5rem" }}>
                    Your purchase of <strong style={{ color: "var(--ink)" }}>{modal.book.title}</strong> is confirmed.
                  </p>
                  <p style={{ fontSize: "0.7rem", color: "var(--muted-l)", fontFamily: "monospace", marginBottom: "1.5rem" }}>
                    Reference: {modal.ref}
                  </p>
                  <button className="btn" onClick={() => setModal(null)}>Close</button>
                </div>
              ) : (
                <>
                  <div className="modal-eyebrow"><i className="bi bi-cart-fill" /> Order Book</div>
                  <h3 className="modal-title">{modal.book.title}</h3>
                  <p className="modal-sub">₦{modal.book.price.toLocaleString()} · Signed by Dr. Hamilton · Delivered within Nigeria</p>
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
                      <i className="bi bi-shield-lock-fill" /> Secure payment by <strong style={{ color: "var(--ink)" }}>Paystack</strong> · All Nigerian cards accepted
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
