import React from "react";

// Simple modern smartphone frame. Screen is 390 x 844 logical px (iPhone-like),
// `children` are rendered inside the screen at that size.
export const SCREEN_W = 390;
export const SCREEN_H = 844;
const BEZEL = 14;

export const Phone: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => {
  return (
    <div
      style={{
        position: "relative",
        width: SCREEN_W + BEZEL * 2,
        height: SCREEN_H + BEZEL * 2,
        borderRadius: 68,
        background:
          "linear-gradient(145deg, #3a3b42 0%, #17181c 30%, #0c0c0f 60%, #2a2b31 100%)",
        padding: BEZEL,
        boxShadow:
          "0 0 0 2px #45464d inset, 0 0 0 1px #000, 0 60px 120px rgba(0,0,0,0.75), 0 20px 50px rgba(0,0,0,0.6), 0 0 80px rgba(135,4,84,0.12)",
        ...style,
      }}
    >
      {/* side buttons */}
      <div style={{ position: "absolute", left: -3, top: 170, width: 4, height: 60, borderRadius: 2, background: "#2b2c31" }} />
      <div style={{ position: "absolute", left: -3, top: 245, width: 4, height: 60, borderRadius: 2, background: "#2b2c31" }} />
      <div style={{ position: "absolute", right: -3, top: 210, width: 4, height: 95, borderRadius: 2, background: "#2b2c31" }} />
      <div
        style={{
          position: "relative",
          width: SCREEN_W,
          height: SCREEN_H,
          borderRadius: 54,
          overflow: "hidden",
          background: "#fff",
        }}
      >
        {children}
        {/* dynamic island */}
        <div
          style={{
            position: "absolute",
            top: 11,
            left: "50%",
            translate: "-50% 0",
            width: 120,
            height: 34,
            borderRadius: 20,
            background: "#000",
            zIndex: 50,
          }}
        />
        {/* glass reflection */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(115deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.0) 35%)",
            pointerEvents: "none",
            zIndex: 60,
          }}
        />
      </div>
    </div>
  );
};
