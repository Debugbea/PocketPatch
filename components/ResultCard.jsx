export default function ResultCard({ status = "green", label, amount }) {
  const isGreen = status === "green";
  const accent = isGreen ? "#10b981" : "#f59e0b";
  const title = isGreen ? "You’re good 💚" : "Let’s adjust 🧡";

  return (
    <div
      style={{
        border: `1px solid ${accent}`,
        borderRadius: "14px",
        padding: "16px",
        background: "#ffffff",
        boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "999px",
            background: accent,
            display: "inline-block",
          }}
        />
        <h2 style={{ margin: 0, fontSize: "18px" }}>{title}</h2>
      </div>

      <div style={{ marginTop: "12px" }}>
        <div style={{ color: "#6b7280", fontSize: "13px" }}>
          {label || "Checked amount"}
        </div>

        <div style={{ fontSize: "28px", fontWeight: 700, marginTop: "4px" }}>
          {typeof amount === "number" ? `$${amount.toFixed(2)}` : amount}
        </div>

        <p style={{ marginTop: "10px", marginBottom: 0, color: "#374151" }}>
          {isGreen
            ? "This fits within what was safe to spend. No changes needed right now."
            : "This came out higher than expected. That happens. Want one small option to make the rest of the week feel easier?"}
        </p>

        {!isGreen && (
          <div style={{ display: "flex", gap: "10px", marginTop: "14px" }}>
            <button
              style={{
                background: accent,
                color: "white",
                border: "none",
                borderRadius: "10px",
                padding: "10px 12px",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Show one option
            </button>

            <button
              style={{
                background: "#f3f4f6",
                color: "#111827",
                border: "1px solid #e5e7eb",
                borderRadius: "10px",
                padding: "10px 12px",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Not now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
