import React from "react";

// Semi-transparent finger-touch indicator (screen coordinates, logical px).
export const TouchDot: React.FC<{
  x: number;
  y: number;
  opacity: number;
  press?: number; // 0..1, shrinks the dot slightly while pressed
  ripple?: number; // 0..1, expanding ring after a tap
}> = ({ x, y, opacity, press = 0, ripple = 0 }) => {
  if (opacity <= 0) return null;
  const size = 46;
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: 100, pointerEvents: "none" }}>
      {ripple > 0 && ripple < 1 ? (
        <div
          style={{
            position: "absolute",
            left: -size * (0.5 + ripple * 0.6),
            top: -size * (0.5 + ripple * 0.6),
            width: size * (1 + ripple * 1.2),
            height: size * (1 + ripple * 1.2),
            borderRadius: "50%",
            border: "2px solid rgba(255,255,255,0.9)",
            boxShadow: "0 0 0 1px rgba(30,38,72,0.25)",
            opacity: (1 - ripple) * opacity,
          }}
        />
      ) : null}
      <div
        style={{
          position: "absolute",
          left: -size / 2,
          top: -size / 2,
          width: size,
          height: size,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.55) 0%, rgba(210,215,230,0.45) 60%, rgba(160,165,190,0.35) 100%)",
          border: "1.5px solid rgba(255,255,255,0.85)",
          boxShadow: "0 2px 10px rgba(30,38,72,0.35)",
          opacity,
          scale: 1 - press * 0.15,
        }}
      />
    </div>
  );
};

// Dims the whole screen except a rounded rectangle (screen coordinates).
export const Spotlight: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  amount: number; // 0..1
  radius?: number;
}> = ({ x, y, w, h, amount, radius = 14 }) => {
  if (amount <= 0) return null;
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 40, pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: w,
          height: h,
          borderRadius: radius,
          boxShadow: `0 0 0 2000px rgba(8,10,24,${0.6 * amount})`,
        }}
      />
    </div>
  );
};
