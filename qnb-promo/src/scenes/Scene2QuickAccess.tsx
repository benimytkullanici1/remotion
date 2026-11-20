import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Stage } from "../components/Stage";
import { Caption } from "../components/Caption";
import { HomeScreen, HEADER_H } from "../components/HomeScreen";
import { Spotlight, TouchDot } from "../components/Touch";
import { EditSheet, ROW_H, ROW_KAREKOD, SHEET_H, rowTop } from "../components/EditSheet";
import { SCREEN_H } from "../components/Phone";

// Scene 2 (quick access highlight + tap Ekle/Çıkar + modal) and
// scene 3 (reorder Karekod ile Öde <-> Ajandam) share the caption,
// so they live in one composition with an internal cross-fade.
export const SCENE2_DURATION = 600;
const CUT = 330; // part B (new camera angle) starts fading in here
const XF = 20;

const ease = Easing.bezier(0.45, 0, 0.55, 1);
const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
const k = (f: number, i: number[], o: number[], e = ease) =>
  interpolate(f, i, o, { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: e });

// quick access panel in screen coords
const QUICK_Y = HEADER_H + 72.5 + 4.5;
const QUICK_H = 108.5;
const QUICK_MID = QUICK_Y + QUICK_H / 2;
const MAX_OFFSET = 216;

const PartA: React.FC = () => {
  const f = useCurrentFrame();
  const dim = k(f, [10, 40, 215, 240], [0, 1, 1, 0]);
  const offset = k(f, [75, 150], [0, MAX_OFFSET]);
  // touch: swipe from right to left, then tap "+ Ekle/Çıkar"
  const swipeX = k(f, [75, 150], [330, 330 - MAX_OFFSET]);
  const tapX = 343;
  const touchX = f < 160 ? swipeX : k(f, [160, 185], [swipeX, tapX], easeOut);
  const touchOpacity = k(f, [55, 68, 152, 162, 175, 186, 210, 222], [0, 1, 1, 0.0, 0, 1, 1, 0]);
  const touchX2 = f < 162 ? swipeX : tapX;
  const press = k(f, [190, 196, 204, 210], [0, 1, 1, 0]);
  const ripple = k(f, [200, 225], [0, 1], Easing.out(Easing.quad));
  const sheet = k(f, [232, 275], [0, 1], Easing.bezier(0.22, 1, 0.36, 1));
  void touchX;

  return (
    <Stage
      camera={{
        x: k(f, [0, 340], [-430, -420]),
        y: k(f, [0, 225, 290], [215, 225, 40]),
        scale: k(f, [0, 225, 290], [1.3, 1.34, 1.08]),
        rx: 0,
        ry: k(f, [0, 340], [12, 3]),
        rz: 0,
      }}
    >
      <HomeScreen quickOffset={offset} />
      <Spotlight x={8} y={QUICK_Y - 5} w={400} h={QUICK_H + 10} amount={dim} />
      <EditSheet progress={sheet} />
      <TouchDot
        x={touchX2}
        y={QUICK_MID + 6}
        opacity={touchOpacity}
        press={f < 160 ? k(f, [62, 72], [0, 1]) * (1 - k(f, [148, 156], [0, 1])) * 0.6 : press}
        ripple={f >= 195 ? ripple : 0}
      />
    </Stage>
  );
};

const PartB: React.FC = () => {
  const f = useCurrentFrame() - CUT;
  const sheetTop = SCREEN_H - SHEET_H;
  const handleX = 362;
  const handleY = sheetTop + rowTop(ROW_KAREKOD) + ROW_H / 2 + 1;

  const lift = k(f, [55, 70, 150, 168], [0, 1, 1, 0]);
  const drag = k(f, [72, 140], [0, 1], Easing.bezier(0.45, 0, 0.3, 1));
  const ajDrag = k(f, [82, 140], [0, 1], Easing.bezier(0.45, 0, 0.3, 1));
  const touchOpacity = k(f, [32, 44, 160, 172], [0, 1, 1, 0]);

  return (
    <Stage
      camera={{
        x: k(f, [0, 270], [-400, -390]),
        y: k(f, [0, 270], [-30, -50]),
        scale: k(f, [0, 270], [1.42, 1.5]),
        rx: 0,
        ry: k(f, [0, 270], [10, 0]),
        rz: 0,
      }}
    >
      <HomeScreen />
      <EditSheet
        progress={1}
        karekod={{ dy: drag * ROW_H, lift }}
        ajanda={{ dy: -ajDrag * ROW_H, lift: lift * 0.8 }}
      />
      <TouchDot
        x={handleX}
        y={handleY + drag * ROW_H}
        opacity={touchOpacity}
        press={k(f, [44, 54], [0, 1]) * (1 - k(f, [150, 160], [0, 1]))}
      />
    </Stage>
  );
};

export const Scene2QuickAccess: React.FC = () => {
  const frame = useCurrentFrame();
  const bOpacity = k(frame, [CUT, CUT + XF], [0, 1]);
  return (
    <AbsoluteFill>
      {bOpacity < 1 ? <PartA /> : null}
      {frame >= CUT ? (
        <AbsoluteFill style={{ opacity: bOpacity }}>
          <PartB />
        </AbsoluteFill>
      ) : null}
      <Caption
        from={30}
        to={SCENE2_DURATION - 10}
        title="Quick Access"
        text="Your most frequent transactions, one tap away"
        left={1010}
        width={760}
      />
    </AbsoluteFill>
  );
};
