"use client";

import { useState } from "react";

export default function PatchCard() {
  const [patchText, setPatchText] = useState("");
  const [patches, setPatches] = useState([]);

  function addPatch() {
    const text = patchText.trim();
    if (!text) return;

    setPatches((prev) => [{ id: Date.now(), text, done: false }, ...prev]);
    setPatchText("");
  }

  function toggleDone(id) {
    setPatches((prev) =>
      prev.map((p) => (p.id === id ? { ...p, done: !p.done } : p))
    );
  }

  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      <div style={{ display: "grid", gap: "0.5rem" }}>
        <label style={{ fontWeight: 600 }}>Create a patch</label>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <input
            value={patchText}
            onChange={(e) => setPatchText(e.target.value)}
            placeholder="Example: Drink water, 10-min walk, read 5 pages…"
            style={{
              flex: 1,
              padding: "0.75rem",
              borderRadius: "10px",
              border: "1px solid #ddd",
              outline: "none",
            }}
          />

          <button
            onClick={addPatch}
            style={{
              padding: "0.75rem 1rem",
              borderRadius: "10px",
              border: "1px solid #111",
              background: "#111",
              color: "white",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Add
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gap: "0.5rem" }}>
        <div style={{ fontWeight: 600 }}>Your patches</div>

        {patches.length === 0 ? (
          <div style={{ color: "#666" }}>
            No patches yet — add your first one above.
          </div>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {patches.map((p) => (
              <li
                key={p.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "0.75rem",
                  padding: "0.75rem",
                  border: "1px solid #eee",
                  borderRadius: "12px",
                }}
              >
                <span
                  style={{
                    textDecoration: p.done ? "line-through" : "none",
                    color: p.done ? "#888" : "#111",
                  }}
                >
                  {p.text}
                </span>

                <button
                  onClick={() => toggleDone(p.id)}
                  style={{
                    padding: "0.4rem 0.75rem",
                    borderRadius: "999px",
                    border: "1px solid #ddd",
                    background: "white",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  {p.done ? "Undo" : "Done"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
