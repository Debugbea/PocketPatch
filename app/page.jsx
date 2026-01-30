"use client";

import { useState } from "react";
import MylinAssistant from "../components/MylinAssistant";
import FlightPatch from "../components/FlightPatch";
import PatchCard from "../components/PatchCard";

export default function Page() {
  const [mylinContext, setMylinContext] = useState(null);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f4f6f8",
        padding: "2rem",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "480px",
          margin: "0 auto",
          background: "white",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <h1 style={{ fontSize: "2.5rem", marginBottom: "0.25rem" }}>PocketPatch</h1>

        <p style={{ color: "#555", marginBottom: "1.25rem" }}>
          Lightweight habit & micro-task tracker (now adding smart spending patches).
        </p>

        {/* MyLin shows guidance based on the latest patch created */}
        <MylinAssistant context={mylinContext} />

        {/* NEW: Flight Patch creator */}
        <FlightPatch onCreate={setMylinContext} />

        {/* Existing patch cards (keep your MVP habits) */}
        <div style={{ display: "grid", gap: "12px" }}>
          <PatchCard
            title="Take a Breath"
            description="Pause for 30 seconds and take three deep breaths."
            buttonText="Complete Patch"
          />
          <PatchCard
            title="Drink Water"
            description="Hydrate yourself with a full glass of water."
            buttonText="Done"
          />
          <PatchCard
            title="Stretch"
            description="Stand up and stretch your body for 1 minute."
            buttonText="Finished"
          />
        </div>
      </div>
    </main>
  );
}
