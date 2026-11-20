import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Scene1Intro, SCENE1_DURATION } from "./scenes/Scene1Intro";
import { Scene2QuickAccess, SCENE2_DURATION } from "./scenes/Scene2QuickAccess";
import { Scene4Offers, SCENE4_DURATION } from "./scenes/Scene4Offers";
import { Scene5Panels, SCENE5_DURATION } from "./scenes/Scene5Panels";

export const XFADE = 24;
export const FULL_DURATION =
  SCENE1_DURATION + SCENE2_DURATION + SCENE4_DURATION + SCENE5_DURATION - 3 * XFADE;

const t = () => <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: XFADE })} />;

export const FullVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  // fade from / to black at the very start and end
  const master = interpolate(frame, [0, 15, durationInFrames - 25, durationInFrames - 1], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <AbsoluteFill style={{ opacity: master }}>
        <TransitionSeries>
          <TransitionSeries.Sequence durationInFrames={SCENE1_DURATION}>
            <Scene1Intro />
          </TransitionSeries.Sequence>
          {t()}
          <TransitionSeries.Sequence durationInFrames={SCENE2_DURATION}>
            <Scene2QuickAccess />
          </TransitionSeries.Sequence>
          {t()}
          <TransitionSeries.Sequence durationInFrames={SCENE4_DURATION}>
            <Scene4Offers />
          </TransitionSeries.Sequence>
          {t()}
          <TransitionSeries.Sequence durationInFrames={SCENE5_DURATION}>
            <Scene5Panels />
          </TransitionSeries.Sequence>
        </TransitionSeries>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
