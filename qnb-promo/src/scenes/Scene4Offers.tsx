import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Stage } from "../components/Stage";
import { Caption } from "../components/Caption";
import { HomeScreen } from "../components/HomeScreen";

export const SCENE4_DURATION = 420;

const ease = Easing.bezier(0.45, 0, 0.55, 1);
const k = (f: number, i: number[], o: number[], e = ease) =>
  interpolate(f, i, o, { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: e });
const reveal = Easing.bezier(0.3, 0, 0.2, 1);

export const Scene4Offers: React.FC = () => {
  const f = useCurrentFrame();
  const accounts = k(f, [80, 125], [0, 1], reveal);
  const cards = k(f, [245, 290], [0, 1], reveal);
  return (
    <AbsoluteFill>
      <Stage
        camera={{
          x: k(f, [0, 420], [430, 420]),
          y: k(f, [0, 70, 160, 240], [60, 40, -200, -230]),
          scale: k(f, [0, 70, 420], [1.15, 1.55, 1.6]),
          rx: k(f, [0, 180, 420], [5, 2, 4]),
          ry: k(f, [0, 420], [-12, -6]),
          rz: k(f, [0, 420], [-0.6, 0.4]),
        }}
        overlay={
          <Caption
            from={25}
            to={SCENE4_DURATION - 10}
            title="Personalised offers"
            text="Offers that fit your needs, right where you need them"
          />
        }
      >
        <HomeScreen offers={{ accounts, cards }} scrollY={k(f, [150, 240], [0, 120])} />
      </Stage>
    </AbsoluteFill>
  );
};
