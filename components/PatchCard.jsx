"use client";

import { useEffect, useState } from "react";
export default function PatchCard() {
  const [patchText, setPatchText] = useState("");

const [patches, setPatches] = useState(() => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem("pocketpatch_patches");
    return saved ? JSON.parse(saved) : [];
  });  
 useEffect(() => {
    localStorage.setItem("pocketpatch_patches", JSON.stringify(patches));
  }, [patches]);

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
  <div
    style={{
  padding: "2rem",
  maxWidth: "480px",
  margin: "3rem auto",
  background: "#ffffff",
  borderRadius: "16px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  fontFamily: "system-ui, -apple-system, BlinkMacSystemFont",
}
>
    <h2
  style={{
    fontSize: "1.9rem",
    marginBottom: "1rem",
    fontWeight: "700",
    letterSpacing: "-0.5px",
    color: #111827",
    lineHeight: "1.2"
  }}
>
      🌱 PocketPatch
    </h2>

    <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
      <input
        value={patchText}
        onChange={(e) => setPatchText(e.target.value)}
        placeholder="Add a small habit..."
        style={{
          flex: 1,
          padding: "0.6rem",
          borderRadius: "10px",
          border: "1px solid #ddd",
        }}
      />

      <button
        onClick={addPatch}
        style={{
          padding: "0.6rem 1rem",
          borderRadius: "6px",
          border: "none",
          background: "#4f46e5",
          color: "white",
          cursor: "pointer",
        }}
      >
        Add
      </button>
    </div>

    <div style={{ display: "grid", gap: "0.5rem" }}>
      {patches.map((p) => (
        <div
          key={p.id}
          style={{
            padding: "0.6rem",
            borderRadius: "6px",
            background: p.done ? "#dcfce7" : "#f1f5f9",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              textDecoration: p.done ? "line-through" : "none",
            }}
          >
            {p.text}
          </span>

          <button
            onClick={() => toggleDone(p.id)}
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            {p.done ? "Undo" : "Done"}
          </button>
        </div>
      ))}
    </div>
  </div>
);
}  
