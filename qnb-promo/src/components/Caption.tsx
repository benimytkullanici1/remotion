import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { FONT_FAMILY } from "../fonts";

export const ACCENT = "#E8579F"; // lighter tint of #870454 for legibility on dark

// Fades in, holds, fades out. `from`/`to` are frames within the parent sequence.
export const Caption: React.FC<{
  from: number;
  to: number;
  title?: string; // accent heading, e.g. "Quick Access"
  text: string;
  size?: number;
  left?: number;
  width?: number;
  top?: number;
  fade?: number;
}> = ({ from, to, title, text, size = 64, left = 150, width = 720, top, fade = 18 }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [from, from + fade, to - fade, to], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.33, 0, 0.2, 1),
  });
  if (frame < from || frame > to) return null;
  return (
    <div
      style={{
        position: "absolute",
        left,
        width,
        top: top ?? undefined,
        bottom: top === undefined ? 0 : undefined,
        height: top === undefined ? "100%" : undefined,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        fontFamily: FONT_FAMILY,
        color: "#fff",
        opacity,
        translate: `0 ${interpolate(frame, [from, from + fade * 2], [14, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        })}px`,
        textShadow: "0 4px 30px rgba(0,0,0,0.5)",
      }}
    >
      {title ? (
        <div style={{ fontSize: size * 0.62, fontWeight: 800, color: ACCENT, letterSpacing: 0.5, marginBottom: 18 }}>
          {title}
        </div>
      ) : null}
      <div style={{ fontSize: size, fontWeight: title ? 600 : 700, lineHeight: 1.15, letterSpacing: -0.5 }}>{text}</div>
    </div>
  );
};
