import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { StudioBackground } from "./StudioBackground";
import { Phone } from "./Phone";

export type Camera = {
  x: number; // px offset of the phone from frame centre
  y: number;
  scale: number;
  rx: number; // deg
  ry: number;
  rz: number;
};

// Background + floating phone viewed through a gently moving "camera".
export const Stage: React.FC<{
  camera: Camera;
  children: React.ReactNode;
  overlay?: React.ReactNode; // rendered in screen space on top of everything
}> = ({ camera, children, overlay }) => {
  const frame = useCurrentFrame();
  // subtle floating
  const bob = Math.sin(frame / 38) * 6;
  return (
    <AbsoluteFill>
      <StudioBackground />
      {/* soft shadow / glow under the phone */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div
          style={{
            position: "absolute",
            left: 960 + camera.x - 260 * camera.scale,
            top: 540 + camera.y + 470 * camera.scale,
            width: 520 * camera.scale,
            height: 60 * camera.scale,
            borderRadius: "50%",
            background: "radial-gradient(closest-side, rgba(0,0,0,0.55), transparent)",
            filter: "blur(18px)",
            opacity: 0.8 - bob / 40,
          }}
        />
      </AbsoluteFill>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", perspective: 2400 }}>
        <div
          style={{
            translate: `${camera.x}px ${camera.y + bob}px`,
            scale: camera.scale,
            transform: `rotateX(${camera.rx}deg) rotateY(${camera.ry}deg) rotateZ(${camera.rz}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          <Phone>{children}</Phone>
        </div>
      </AbsoluteFill>
      {overlay}
    </AbsoluteFill>
  );
};
