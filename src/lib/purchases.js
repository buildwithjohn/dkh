// ─────────────────────────────────────────────────────────────────────────────
// PURCHASE STORAGE
// Stores successful Paystack purchases in localStorage so the buyer can
// return to /library/[reference] and re-download their ebook(s).
//
// NOTE: this is client-side only — fine for ebook access since the actual
// PDF files (Drive/Dropbox links) can be revoked by the publisher at any
// time. For a fully secure setup, John can later add a serverless function
// that verifies the Paystack reference against the live API.
// ─────────────────────────────────────────────────────────────────────────────

import { EBOOK_DELIVERY } from "./config";

const KEY = "dkh-purchases";

export function recordPurchase({ reference, bookSlug, email, name, amount }) {
  try {
    const list = readAll();
    // Don't duplicate if same reference exists
    if (list.find((p) => p.reference === reference)) return;
    list.push({
      reference,
      bookSlug,
      email,
      name,
      amount,
      purchasedAt: new Date().toISOString(),
    });
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch (err) {
    console.warn("Could not save purchase:", err);
  }
}

export function getPurchase(reference) {
  if (!reference) return null;
  const all = readAll();
  return all.find((p) => p.reference === reference) || null;
}

export function getAllPurchases() {
  return readAll();
}

export function hasValidAccess(purchase) {
  if (!purchase) return false;
  const purchaseDate = new Date(purchase.purchasedAt);
  const now = new Date();
  const ageMs = now - purchaseDate;
  const maxAgeMs = EBOOK_DELIVERY.accessDays * 24 * 60 * 60 * 1000;
  return ageMs <= maxAgeMs;
}

function readAll() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}
