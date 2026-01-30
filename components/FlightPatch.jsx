"use client";

import { useState } from "react";

export default function FlightPatch({ onCreate }) {
  const [mode, setMode] = useState("before"); // "before" | "after"
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [dates, setDates] = useState("");
  const [flexible, setFlexible] = useState(false);

  const [price, setPrice] = useState("");
  const [airline, setAirline] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const payload =
      mode === "before"
        ? {
            type: "flight",
            mode: "before",
            from: from.trim(),
            to: to.trim(),
            dates: dates.trim(),
            flexible,
          }
        : {
            type: "flight",
            mode: "after",
            airline: airline.trim(),
            price: price === "" ? null : Number(price),
            purchaseDate: purchaseDate.trim(),
          };

    onCreate(payload);
  }

  function reset() {
    setMode("before");
    setFrom("");
    setTo("");
    setDates("");
    setFlexible(false);
    setPrice("");
    setAirline("");
    setPurchaseDate("");
  }

  return (
    <div style={{ border: "1px solid #eee", padding: "1rem", borderRadius: "12px", marginBottom: "1rem" }}>
      <h2 style={{ marginTop: 0, marginBottom: "0.5rem" }}>✈️ Flight Patch</h2>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "0.75rem" }}>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <label style={{ fontWeight: 600 }}>Mode:</label>
          <select value={mode} onChange={(e) => setMode(e.target.value)} style={{ padding: "0.4rem" }}>
            <option value="before">Before purchase (save money)</option>
            <option value="after">After purchase (reduce guilt + protect)</option>
          </select>
        </div>

        {mode === "before" ? (
          <>
            <input
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="From (ex: MKE)"
              style={{ padding: "0.6rem", borderRadius: "10px", border: "1px solid #ddd" }}
            />
            <input
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="To (ex: LAX)"
              style={{ padding: "0.6rem", borderRadius: "10px", border: "1px solid #ddd" }}
            />
            <input
              value={dates}
              onChange={(e) => setDates(e.target.value)}
              placeholder="Dates (ex: Mar 12–16) or 'flexible'"
              style={{ padding: "0.6rem", borderRadius: "10px", border: "1px solid #ddd" }}
            />

            <label style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <input
                type="checkbox"
                checked={flexible}
                onChange={(e) => setFlexible(e.target.checked)}
              />
              Dates flexible (±2 days)
            </label>
          </>
        ) : (
          <>
            <input
              value={airline}
              onChange={(e) => setAirline(e.target.value)}
              placeholder="Airline (ex: Delta)"
              style={{ padding: "0.6rem", borderRadius: "10px", border: "1px solid #ddd" }}
            />
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price paid (ex: 327)"
              inputMode="numeric"
              style={{ padding: "0.6rem", borderRadius: "10px", border: "1px solid #ddd" }}
            />
            <input
              value={purchaseDate}
              onChange={(e) => setPurchaseDate(e.target.value)}
              placeholder="Purchase date/time (ex: 2026-01-28 14:10)"
              style={{ padding: "0.6rem", borderRadius: "10px", border: "1px solid #ddd" }}
            />
          </>
        )}

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            type="submit"
            style={{
              padding: "0.6rem 0.9rem",
              borderRadius: "10px",
              border: "1px solid #ddd",
              background: "#111",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Create Flight Patch
          </button>

          <button
            type="button"
            onClick={reset}
            style={{
              padding: "0.6rem 0.9rem",
              borderRadius: "10px",
              border: "1px solid #ddd",
              background: "#fff",
              cursor: "pointer",
            }}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}
