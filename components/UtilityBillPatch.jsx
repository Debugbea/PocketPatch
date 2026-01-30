"use client";

import { useState } from "react";

export default function UtilityBillPatch({ onAnalyze }) {
  const [provider, setProvider] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");

  function handleAnalyze() {
    const cleanAmount = Number(amount);

    if (!provider.trim() || !amount || Number.isNaN(cleanAmount) || cleanAmount <= 0) {
      alert("Please enter a provider and a valid amount.");
      return;
    }

    onAnalyze?.({
      provider: provider.trim(),
      amount: cleanAmount,
      dueDate: dueDate.trim() || "N/A",
    });
  }

  return (
    <div
      style={{
        border: "1px solid #eee",
        borderRadius: "12px",
        padding: "16px",
        marginBottom: "12px",
        background: "#fafafa",
      }}
    >
      <h2 style={{ margin: "0 0 8px 0" }}>Utility Bill Patch</h2>
      <p style={{ margin: "0 0 12px 0", color: "#555" }}>
        Enter your bill info — Mylin will help you reduce the hit and plan the next move.
      </p>

      <div style={{ display: "grid", gap: "10px" }}>
        <input
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
          placeholder="Provider (ex: We Energies)"
          style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ddd" }}
        />

        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount (ex: 185.42)"
          inputMode="decimal"
          style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ddd" }}
        />

        <input
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          placeholder="Due date (optional)"
          style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ddd" }}
        />

        <button
          onClick={handleAnalyze}
          style={{
            padding: "10px",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Analyze with Mylin
        </button>
      </div>
    </div>
  );
}
