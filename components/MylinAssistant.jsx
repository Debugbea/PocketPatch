"use client";

export default function MylinAssistant({ context }) {
  function getAdvice() {
    if (!context) {
      return [
        "Hi, I’m MyLin 💛",
        "Create a Patch and I’ll guide you — before purchase (save) or after purchase (refocus).",
      ];
    }

    if (context.type === "flight" && context.mode === "before") {
      const from = context.from || "your departure airport";
      const to = context.to || "your destination";

      const msgs = [];
      msgs.push(`✈️ Before you buy: ${from} → ${to}`);
      msgs.push("Quick save checks:");

      if (context.flexible) {
        msgs.push("• Since your dates are flexible (±2 days), check Tues/Wed departures + early morning flights.");
        msgs.push("• Also check nearby airports if possible (sometimes big savings).");
      } else {
        msgs.push("• If you can wait 12–24 hours, prices sometimes dip (not always, but worth a quick recheck).");
        msgs.push("• Try one nearby airport or a different return day if possible.");
      }

      msgs.push("Want a reminder patch: “Recheck flight price tomorrow” ?");
      return msgs;
    }

    if (context.type === "flight" && context.mode === "after") {
      const airline = context.airline || "your airline";
      const price = context.price != null ? `$${context.price}` : "your price";

      const msgs = [];
      msgs.push(`✅ After purchase: ${airline} flight (${price})`);
      msgs.push("Now we protect you (money + peace):");
      msgs.push("• If you JUST bought it: check the airline’s 24-hour cancel window (often free).");
      msgs.push("• Set a recheck reminder in 48 hours — if price drops, you may get credit (depends on airline/fare).");
      msgs.push("• Reframe: This is handled. Next step is controlling the rest of the month.");
      return msgs;
    }

    return ["I’m here — create a Patch and I’ll guide you."];
  }

  const advice = getAdvice();

  return (
    <div style={{ border: "1px solid #eee", padding: "1rem", borderRadius: "12px", marginBottom: "1rem" }}>
      <h2 style={{ marginTop: 0, marginBottom: "0.5rem" }}>MyLin Assistant</h2>
      <div style={{ display: "grid", gap: "0.5rem" }}>
        {advice.map((line, idx) => (
          <div key={idx} style={{ padding: "0.6rem", background: "#fafafa", borderRadius: "10px" }}>
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}
