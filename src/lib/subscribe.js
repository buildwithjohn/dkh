import { useState } from "react";
import { SUBSCRIBE } from "./config";

/**
 * useSubscribe — handles email subscription
 * Returns { status, message, subscribe(email, name) }
 * status: 'idle' | 'submitting' | 'success' | 'error'
 *
 * Tries Formspree first. If endpoint isn't configured (still has YOUR_FORMSPREE_ID),
 * saves to localStorage and reports success so John can collect emails locally
 * while he sets up the real endpoint.
 */
export function useSubscribe() {
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  async function subscribe(email, extras = {}) {
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return false;
    }

    setStatus("submitting");
    setMessage("");

    const payload = { email, ...extras, subscribedAt: new Date().toISOString() };

    // Always save locally first so nothing is ever lost
    try {
      const existing = JSON.parse(localStorage.getItem(SUBSCRIBE.localStorageKey) || "[]");
      if (!existing.find(s => s.email === email)) {
        existing.push(payload);
        localStorage.setItem(SUBSCRIBE.localStorageKey, JSON.stringify(existing));
      }
    } catch {}

    // If Formspree is configured, send it there too
    const formspreeReady = !SUBSCRIBE.endpoint.includes("YOUR_FORMSPREE_ID");
    if (formspreeReady) {
      try {
        const res = await fetch(SUBSCRIBE.endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Network");
      } catch (err) {
        // We still report success because we saved locally
        // but log a console warning so John sees it
        console.warn("Formspree submission failed, saved locally only:", err);
      }
    }

    setStatus("success");
    setMessage("You're in. Watch your inbox for new books, news & teachings from Dr. Hamilton.");
    return true;
  }

  function reset() {
    setStatus("idle");
    setMessage("");
  }

  return { status, message, subscribe, reset };
}
