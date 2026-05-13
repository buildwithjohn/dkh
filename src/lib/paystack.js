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
