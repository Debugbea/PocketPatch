"use client";

import { useState } from "react";
import { MYLIN_MESSAGES } from "../lib/mylinMessages";

export default function MylinAssistant() {
  const [mode, setMode] = useState("beforePurchase"); // beforePurchase | afterPurchase | utilities

  const data = MYLIN_MESSAGES[mode];

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div>
          <div style={styles.name}>Mylin</div>
          <div style={styles.subtitle}>{data.title}</div>
        </div>

        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          style={styles.select}
        >
          <option value="beforePurchase">Before Purchase</option>
          <option value="afterPurchase">After Purchase</option>
          <option value="utilities">Utilities</option>
        </select>
      </div>

      <div style={styles.list}>
        {data.prompts.map((text, i) => (
          <div key={i} style={styles.bubble}>
            {text}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: 16,
    padding: 16,
    maxWidth: 520,
    background: "rgba(0,0,0,0.35)",
    backdropFilter: "blur(10px)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  name: { fontWeight: 700, fontSize: 18 },
  subtitle: { opacity: 0.85, fontSize: 13, marginTop: 2 },
  select: {
    borderRadius: 10,
    padding: "8px 10px",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(0,0,0,0.25)",
    color: "inherit",
  },
  list: { display: "grid", gap: 10 },
  bubble: {
    padding: 12,
    borderRadius: 14,
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.12)",
  },
};
