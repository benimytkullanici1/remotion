import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Stage } from "../components/Stage";
import { Caption } from "../components/Caption";
import { HomeScreen, computeLayout, DEFAULT_ORDER, VIEWPORT_H } from "../components/HomeScreen";

export const SCENE1_DURATION = 540;

const ease = Easing.bezier(0.45, 0, 0.55, 1);
const k = (frame: number, input: number[], output: number[]) =>
  interpolate(frame, input, output, { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });

export const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const maxScroll = computeLayout(DEFAULT_ORDER, { accounts: 0, cards: 0 }).total - VIEWPORT_H;

  return (
    <AbsoluteFill>
      <Stage
        camera={{
          x: k(frame, [0, 540], [400, 380]),
          y: 0,
          scale: k(frame, [0, 540], [1.02, 1.08]),
          rx: k(frame, [0, 540], [7, 2]),
          ry: k(frame, [0, 540], [-18, -6]),
          rz: k(frame, [0, 540], [-1.5, 0.5]),
        }}
        overlay={
          <>
            <Caption from={8} to={118} text="The new QNB Mobil home page" size={84} />
            <Caption from={132} to={242} text="Built around the way you bank" />
            <Caption from={256} to={366} text="Personalised banking, from the first screen" />
            <Caption from={380} to={490} text="Everything you need, in one place" />
          </>
        }
      >
        <HomeScreen scrollY={k(frame, [60, 520], [0, maxScroll])} />
      </Stage>
    </AbsoluteFill>
  );
};
