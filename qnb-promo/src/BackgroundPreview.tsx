import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { StudioBackground } from "./components/StudioBackground";
import { Phone, SCREEN_W } from "./components/Phone";

export const BackgroundOnly: React.FC = () => <StudioBackground drift={false} />;

export const BackgroundWithPhone: React.FC = () => (
  <AbsoluteFill>
    <StudioBackground drift={false} />
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", perspective: 2200 }}>
      <div style={{ scale: 1.08, rotate: "y -14deg", transformStyle: "preserve-3d", translate: "260px 0" }}>
        <Phone>
          <Img src={staticFile("img/home.png")} style={{ width: SCREEN_W, display: "block" }} />
        </Phone>
      </div>
    </AbsoluteFill>
  </AbsoluteFill>
);
