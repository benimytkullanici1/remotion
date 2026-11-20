import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

export const NAVY = "#1E2648";
export const MAGENTA = "#870454";

// Dark studio backdrop with very soft navy / magenta light pools.
// `drift` slowly moves the light pools so the background is never fully static.
export const StudioBackground: React.FC<{ drift?: boolean }> = ({
  drift = true,
}) => {
  const frame = useCurrentFrame();
  const t = drift ? frame / 30 : 0;
  const mx = 72 + Math.sin(t * 0.12) * 4;
  const my = 30 + Math.cos(t * 0.1) * 3;
  const nx = 24 + Math.cos(t * 0.09) * 4;
  const ny = 68 + Math.sin(t * 0.11) * 3;

  return (
    <AbsoluteFill style={{ backgroundColor: "#050508" }}>
      {/* navy light pool, lower left */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 55% 60% at ${nx}% ${ny}%, ${NAVY}cc 0%, ${NAVY}55 35%, transparent 70%)`,
        }}
      />
      {/* magenta light pool, upper right */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 45% 50% at ${mx}% ${my}%, ${MAGENTA}66 0%, ${MAGENTA}22 40%, transparent 70%)`,
        }}
      />
      {/* top studio key light (soft cone) */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 30% 55% at 50% -5%, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 45%, transparent 75%)",
        }}
      />
      {/* faint floor reflection / horizon glow */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 50% 18% at 50% 96%, rgba(120,110,170,0.10) 0%, transparent 70%)",
        }}
      />
      {/* vignette */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 85% 85% at 50% 50%, transparent 55%, rgba(0,0,0,0.75) 100%)",
        }}
      />
      {/* film grain to avoid banding */}
      <AbsoluteFill style={{ opacity: 0.06, mixBlendMode: "overlay" }}>
        <svg width="100%" height="100%">
          <filter id="grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="2"
              seed={drift ? frame % 8 : 1}
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
