import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../components/Layout";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import MagneticWrap from "../components/MagneticWrap";
import { BlobAccent, DotPattern, Sparkles } from "../components/Illustrations";
import { CONTACT_FORM } from "../lib/config";

const INQUIRY_TYPES = [
  { value: "speaking", label: "Speaking Engagement", icon: "bi-mic-fill" },
  { value: "conference", label: "Conference Keynote", icon: "bi-stars" },
  { value: "corporate", label: "Corporate Devotional", icon: "bi-briefcase-fill" },
  { value: "media", label: "Media / Interview Request", icon: "bi-broadcast" },
  { value: "books", label: "Book Order or Bulk", icon: "bi-book" },
  { value: "ministry", label: "Ministry Partnership", icon: "bi-person-arms-up" },
  { value: "general", label: "General Inquiry", icon: "bi-chat-dots" },
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    inquiry: "speaking",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("submitting");
    setErrorMsg("");

    // Save to localStorage immediately as a safety net
    try {
      const existing = JSON.parse(localStorage.getItem("dkh-contact-messages") || "[]");
      existing.push({ ...form, submittedAt: new Date().toISOString() });
      localStorage.setItem("dkh-contact-messages", JSON.stringify(existing));
    } catch {}

    const formspreeReady = !CONTACT_FORM.endpoint.includes("YOUR_CONTACT_FORM_ID");
    if (formspreeReady) {
      try {
        const res = await fetch(CONTACT_FORM.endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error("Network error");
      } catch (err) {
        console.warn("Formspree submission failed; saved locally only.", err);
      }
    }

    setStatus("success");
  };

  const reset = () => {
    setForm({ name: "", email: "", phone: "", organization: "", inquiry: "speaking", message: "" });
    setStatus("idle");
  };

  return (
    <Layout
      title="Contact"
      description="Get in touch with Dr. Kunle Hamilton — speaking requests, interviews, ministry partnerships and general inquiries."
    >
      <style>{`
        .ct-grid { padding: 5rem var(--gutter); background: var(--warm); display: grid; grid-template-columns: 1fr 1.4fr; gap: 4rem; align-items: start; position: relative; overflow: hidden; }
        @media (max-width: 1000px) { .ct-grid { grid-template-columns: 1fr; gap: 3rem; } }
        .ct-grid-blob { position: absolute; top: 5%; right: -200px; width: 450px; height: 450px; opacity: 0.4; pointer-events: none; }

        .ct-info { position: sticky; top: 100px; }
        @media (max-width: 1000px) { .ct-info { position: static; } }
        .ct-info-eyebrow { display: inline-flex; align-items: center; gap: 0.8rem; font-size: var(--t-eyebrow); font-weight: 700; letter-spacing: 0.32em; text-transform: uppercase; color: var(--gold); margin-bottom: 1.4rem; }
        .ct-info-eyebrow::before { content: ''; width: 28px; height: 1.5px; background: var(--gold); }
        .ct-info-title { font-family: var(--serif); font-size: clamp(1.9rem, 3.5vw, 2.8rem); font-weight: 300; line-height: 1.05; letter-spacing: -0.015em; margin-bottom: 1.4rem; }
        .ct-info-title em { font-style: italic; color: var(--gold); }
        .ct-info-title strong { font-weight: 700; }
        .ct-info-lead { font-size: 1rem; font-weight: 300; line-height: 1.75; color: var(--muted-l); margin-bottom: 2.5rem; }

        .ct-details { display: flex; flex-direction: column; gap: 1.4rem; }
        .ct-detail { display: flex; align-items: flex-start; gap: 1rem; padding: 1.2rem; background: var(--warm2); border-radius: 4px; border: 1px solid var(--border-l); transition: all 0.25s; }
        .ct-detail:hover { background: var(--warm); border-color: var(--gold); transform: translateX(2px); }
        .ct-detail-icon { width: 42px; height: 42px; display: flex; align-items: center; justify-content: center; background: var(--gold); color: var(--white); border-radius: 4px; font-size: 1.1rem; flex-shrink: 0; }
        .ct-detail-label { font-size: 0.55rem; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: var(--muted-l); margin-bottom: 0.25rem; }
        .ct-detail-val { font-family: var(--serif); font-size: 1.05rem; font-weight: 400; color: var(--ink); font-style: italic; word-break: break-word; }

        .ct-photo { margin-top: 2.5rem; aspect-ratio: 4/5; overflow: hidden; border-radius: 4px; box-shadow: var(--shadow-2); }
        .ct-photo img { width: 100%; height: 100%; object-fit: cover; object-position: center 15%; }

        /* Form */
        .ct-form-card { background: var(--warm); border: 1px solid var(--border-l); border-radius: 4px; padding: 2.5rem; box-shadow: var(--shadow-1); }
        @media (max-width: 600px) { .ct-form-card { padding: 1.8rem 1.4rem; } }

        .ct-form-eyebrow { display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.58rem; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: var(--gold); margin-bottom: 0.7rem; }
        .ct-form-title { font-family: var(--serif); font-size: 1.7rem; font-weight: 400; font-style: italic; line-height: 1.2; color: var(--ink); margin-bottom: 0.6rem; }
        .ct-form-sub { font-size: 0.88rem; color: var(--muted-l); margin-bottom: 2rem; }

        .ct-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
        @media (max-width: 600px) { .ct-row { grid-template-columns: 1fr; } }
        .ct-field { display: flex; flex-direction: column; gap: 0.4rem; margin-bottom: 1rem; }
        .ct-field label { font-size: 0.55rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted-l); }
        .ct-field input, .ct-field textarea, .ct-field select { background: var(--warm2); border: 1px solid var(--border-l); padding: 0.85rem 0.95rem; font-family: var(--sans); font-size: 0.92rem; font-weight: 400; color: var(--ink); outline: none; border-radius: 3px; transition: all 0.2s; width: 100%; }
        .ct-field input:focus, .ct-field textarea:focus, .ct-field select:focus { border-color: var(--gold); background: var(--warm); }
        .ct-field textarea { resize: vertical; min-height: 120px; line-height: 1.6; }
        .ct-field select { cursor: pointer; appearance: none; -webkit-appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%234E6389'%3E%3Cpath d='M3.204 5L8 10.481 12.796 5H3.204z'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 1rem center; background-size: 16px; padding-right: 2.5rem; }

        .ct-submit-row { display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap; margin-top: 0.5rem; padding-top: 1.5rem; border-top: 1px solid var(--border-l); }
        .ct-submit-note { font-size: 0.7rem; color: var(--muted-l); }
        .ct-submit-note i { color: var(--gold); }

        /* Success state */
        .ct-success { text-align: center; padding: 2.5rem 1rem; position: relative; }
        .ct-success-icon { position: relative; width: 80px; height: 80px; margin: 0 auto 1.4rem; background: var(--gold); color: var(--white); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.4rem; box-shadow: 0 12px 30px -10px rgba(37,99,235,0.5); }
        .ct-success-sparkle { position: absolute; width: 130px; height: 130px; top: 50%; left: 50%; transform: translate(-50%, -50%); color: var(--gold); pointer-events: none; }
        .ct-success h3 { font-family: var(--serif); font-size: 2rem; font-weight: 300; font-style: italic; color: var(--ink); margin-bottom: 0.7rem; }
        .ct-success p { font-size: 0.95rem; color: var(--muted-l); line-height: 1.7; margin-bottom: 1.8rem; max-width: 420px; margin-left: auto; margin-right: auto; }
      `}</style>

      <PageHero
        eyebrow={<><i className="bi bi-envelope-paper-fill" /> Get In Touch</>}
        title={<><em>Reach out</em> to Dr. Hamilton</>}
        subtitle="Speaking requests, interviews, ministry partnerships, book orders or general inquiries — your message reaches his desk within 48 hours."
        image="/contact.jpg"
        variant="dark"
      />

      <section className="ct-grid">
        <div className="ct-grid-blob"><BlobAccent color="#2563EB" opacity={0.05} /></div>

        {/* Left: Info */}
        <div className="ct-info">
          <Reveal>
            <div className="ct-info-eyebrow">Contact Details</div>
            <h2 className="ct-info-title">
              Let's <em>connect</em>
            </h2>
            <p className="ct-info-lead">
              Whether you're inviting Dr. Hamilton to your platform, requesting an interview, or partnering on
              a project — please reach out using the form or any of the channels below.
            </p>
          </Reveal>

          <div className="ct-details">
            <Reveal delay={0.1}>
              <div className="ct-detail">
                <div className="ct-detail-icon"><i className="bi bi-envelope-fill" /></div>
                <div>
                  <div className="ct-detail-label">Email</div>
                  <div className="ct-detail-val">info@kunlehamilton.com</div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="ct-detail">
                <div className="ct-detail-icon"><i className="bi bi-geo-alt-fill" /></div>
                <div>
                  <div className="ct-detail-label">Headquarters</div>
                  <div className="ct-detail-val">Lagos, Nigeria</div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="ct-detail">
                <div className="ct-detail-icon"><i className="bi bi-globe2" /></div>
                <div>
                  <div className="ct-detail-label">Branches</div>
                  <div className="ct-detail-val">Berlin · London · USA</div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.25}>
              <div className="ct-detail">
                <div className="ct-detail-icon"><i className="bi bi-clock-fill" /></div>
                <div>
                  <div className="ct-detail-label">Typical Response</div>
                  <div className="ct-detail-val">Within 48 hours</div>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.3}>
            <div className="ct-photo">
              <img src="/contact.jpg" alt="Dr. Kunle Hamilton" loading="lazy" />
            </div>
          </Reveal>
        </div>

        {/* Right: Form */}
        <Reveal delay={0.2}>
          <div className="ct-form-card">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  className="ct-success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <div style={{ position: "relative", width: "fit-content", margin: "0 auto" }}>
                    <div className="ct-success-icon">
                      <i className="bi bi-check-lg" />
                    </div>
                    <div className="ct-success-sparkle"><Sparkles color="currentColor" /></div>
                  </div>
                  <h3>Message Received</h3>
                  <p>
                    Thank you for reaching out. Dr. Hamilton's team will respond to you directly
                    within 48 hours — usually much sooner.
                  </p>
                  <button onClick={reset} className="btn btn-ghost">
                    Send Another Message <i className="bi bi-arrow-clockwise" />
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={submit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="ct-form-eyebrow"><i className="bi bi-pencil-square" /> Send a Message</div>
                  <h2 className="ct-form-title">Tell us what you need</h2>
                  <p className="ct-form-sub">Fields marked with * are required.</p>

                  <div className="ct-row">
                    <div className="ct-field">
                      <label htmlFor="ct-name">Your Name *</label>
                      <input id="ct-name" type="text" required value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Full name" />
                    </div>
                    <div className="ct-field">
                      <label htmlFor="ct-email">Email *</label>
                      <input id="ct-email" type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="your@email.com" />
                    </div>
                  </div>

                  <div className="ct-row">
                    <div className="ct-field">
                      <label htmlFor="ct-phone">Phone</label>
                      <input id="ct-phone" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+234..." />
                    </div>
                    <div className="ct-field">
                      <label htmlFor="ct-org">Organization</label>
                      <input id="ct-org" type="text" value={form.organization} onChange={(e) => update("organization", e.target.value)} placeholder="Church, company, school..." />
                    </div>
                  </div>

                  <div className="ct-field">
                    <label htmlFor="ct-inquiry">Inquiry Type *</label>
                    <select id="ct-inquiry" value={form.inquiry} onChange={(e) => update("inquiry", e.target.value)}>
                      {INQUIRY_TYPES.map((t) => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="ct-field">
                    <label htmlFor="ct-message">Message *</label>
                    <textarea id="ct-message" required value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="Tell Dr. Hamilton what you have in mind..." rows="5" />
                  </div>

                  <div className="ct-submit-row">
                    <div className="ct-submit-note">
                      <i className="bi bi-shield-check" /> Your details stay private
                    </div>
                    <MagneticWrap strength={14}>
                      <button type="submit" className="btn" disabled={status === "submitting"}>
                        {status === "submitting" ? (
                          <><i className="bi bi-arrow-clockwise" /> Sending...</>
                        ) : (
                          <>Send Message <i className="bi bi-send-fill" /></>
                        )}
                      </button>
                    </MagneticWrap>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </section>
    </Layout>
  );
}
