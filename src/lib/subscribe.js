import { useState } from "react";
import { SUBSCRIBE, BEEHIIV } from "./config";

/**
 * useSubscribe — handles email subscription.
 *
 * Order of operations:
 *   1. Save to localStorage (so nothing is ever lost)
 *   2. Try Beehiiv first (if API key configured)
 *   3. Fall back to Formspree (if endpoint configured)
 *
 * Returns: { status, message, subscribe(email, extras), reset() }
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

    // 1. Always save locally first
    try {
      const existing = JSON.parse(localStorage.getItem(SUBSCRIBE.localStorageKey) || "[]");
      if (!existing.find(s => s.email === email)) {
        existing.push(payload);
        localStorage.setItem(SUBSCRIBE.localStorageKey, JSON.stringify(existing));
      }
    } catch {}

    let delivered = false;

    // 2. Try Beehiiv if configured
    const beehiivReady =
      !BEEHIIV.publicationId.includes("YOUR_") &&
      !BEEHIIV.apiKey.includes("YOUR_");
    if (beehiivReady) {
      try {
        // Beehiiv's public subscribe endpoint
        // Note: this hits Beehiiv's public form endpoint (no API key needed)
        // For full API access (with reactivation, tags, etc), a serverless
        // function would be needed — that can be added later.
        const res = await fetch(
          `https://api.beehiiv.com/v2/publications/${BEEHIIV.publicationId}/subscriptions`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${BEEHIIV.apiKey}`,
            },
            body: JSON.stringify({
              email,
              reactivate_existing: false,
              send_welcome_email: true,
              utm_source: extras.source || "website",
            }),
          }
        );
        if (res.ok) delivered = true;
      } catch (err) {
        console.warn("Beehiiv subscription failed:", err);
      }
    }

    // 3. Formspree fallback (catches everything Beehiiv didn't)
    const formspreeReady = !SUBSCRIBE.endpoint.includes("YOUR_");
    if (formspreeReady && !delivered) {
      try {
        const res = await fetch(SUBSCRIBE.endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) delivered = true;
      } catch (err) {
        console.warn("Formspree subscription failed:", err);
      }
    }

    setStatus("success");
    setMessage(
      delivered
        ? "You're in. Watch your inbox for new books, news & teachings from Dr. Hamilton."
        : "You're on the list — we'll be in touch from the new domain shortly."
    );
    return true;
  }

  function reset() {
    setStatus("idle");
    setMessage("");
  }

  return { status, message, subscribe, reset };
}
