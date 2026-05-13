import { useEffect, useState, useRef } from "react";
import { COUNTER } from "./config";

/**
 * useVisitorCount — increments and reads a global visitor counter on page load.
 *
 * Uses CounterAPI (free, no auth) - https://counterapi.dev
 * Calls /up endpoint to increment, then keeps reading every 8 seconds for "live" feel.
 *
 * Returns { total, loading, error }
 */
export function useVisitorCount() {
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const incremented = useRef(false);

  useEffect(() => {
    let alive = true;
    let pollId = null;

    const up = async () => {
      try {
        const url = `${COUNTER.apiBase}/${COUNTER.namespace}/${COUNTER.key}/up`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("CounterAPI error");
        const data = await res.json();
        if (!alive) return;
        setTotal(data.count);
        setLoading(false);
      } catch (e) {
        if (!alive) return;
        setError(e.message);
        setLoading(false);
      }
    };

    const read = async () => {
      try {
        const url = `${COUNTER.apiBase}/${COUNTER.namespace}/${COUNTER.key}`;
        const res = await fetch(url);
        if (!res.ok) return;
        const data = await res.json();
        if (!alive) return;
        setTotal(data.count);
      } catch {}
    };

    // First load: increment by 1 to count this visit
    if (!incremented.current) {
      incremented.current = true;
      up();
    }

    // Poll every 8 seconds for "live" updates
    pollId = setInterval(read, 8000);

    return () => {
      alive = false;
      if (pollId) clearInterval(pollId);
    };
  }, []);

  return { total, loading, error };
}
