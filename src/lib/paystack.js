import { useEffect, useState, useCallback } from "react";
import { PAYSTACK } from "./config";

/**
 * usePaystack — load Paystack inline.js and expose a `pay` function.
 *
 * Usage:
 *   const { ready, pay } = usePaystack();
 *   pay({
 *     email: "buyer@example.com",
 *     amount: 5000, // in Naira; converted to kobo internally
 *     reference: "BOOK-XYZ-123",
 *     metadata: { bookTitle: "Releasing the Eagle in You" },
 *     onSuccess: (ref) => alert("Paid! " + ref),
 *     onClose: () => console.log("Modal closed"),
 *   });
 */
export function usePaystack() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.PaystackPop) {
      setReady(true);
      return;
    }
    if (document.getElementById("paystack-inline")) return;

    const script = document.createElement("script");
    script.id = "paystack-inline";
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    script.onload = () => setReady(true);
    script.onerror = () => console.error("Paystack script failed to load");
    document.body.appendChild(script);
  }, []);

  const pay = useCallback(({ email, amount, reference, metadata = {}, onSuccess, onClose }) => {
    if (!window.PaystackPop) {
      alert("Payment system loading. Please try again in a moment.");
      return;
    }

    // Safety net: warn before charging a real card while developing
    const isLiveKey = PAYSTACK.publicKey.startsWith("pk_live_");
    const isLocalhost =
      typeof window !== "undefined" &&
      (window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1" ||
        window.location.hostname.startsWith("192.168."));

    if (isLiveKey && isLocalhost) {
      const proceed = window.confirm(
        "⚠️ LIVE PAYSTACK KEY DETECTED ON LOCALHOST\n\n" +
        "You're about to make a real charge using the live key from your local machine.\n\n" +
        "Click OK only if this is intentional (e.g., testing the live flow).\n" +
        "Click Cancel to abort."
      );
      if (!proceed) {
        if (onClose) onClose();
        return;
      }
    }

    const handler = window.PaystackPop.setup({
      key: PAYSTACK.publicKey,
      email,
      amount: Math.round(amount * 100), // Paystack expects amount in kobo
      currency: PAYSTACK.currency,
      ref: reference || `dkh-${Date.now()}`,
      metadata: { custom_fields: [], ...metadata },
      callback: (response) => {
        if (onSuccess) onSuccess(response.reference);
      },
      onClose: () => {
        if (onClose) onClose();
      },
    });
    handler.openIframe();
  }, []);

  return { ready, pay };
}
