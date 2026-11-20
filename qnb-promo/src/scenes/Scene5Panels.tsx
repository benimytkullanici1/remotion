import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Stage } from "../components/Stage";
import { Caption } from "../components/Caption";
import { DEFAULT_ORDER, HomeScreen, SectionKey, computeLayout } from "../components/HomeScreen";

export const SCENE5_DURATION = 450;

const ease = Easing.bezier(0.45, 0, 0.55, 1);
const k = (f: number, i: number[], o: number[], e = ease) =>
  interpolate(f, i, o, { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: e });
const NO_OFFERS = { accounts: 0, cards: 0 };

const swap = (order: SectionKey[], a: SectionKey, b: SectionKey) => {
  const o = [...order];
  const i = o.indexOf(a);
  const j = o.indexOf(b);
  [o[i], o[j]] = [o[j], o[i]];
  return o;
};

// Animated swap of two adjacent panels: returns motion for both.
const swapMotion = (order: SectionKey[], top: SectionKey, bottom: SectionKey, p: number, lift: number) => {
  const { layout } = computeLayout(order, NO_OFFERS);
  const hTop = layout[top].h;
  const hBottom = layout[bottom].h;
  return {
    // the panel moving up is the one being "dragged", so it sits on top
    [top]: { dy: hBottom * p, lift: lift * 0.6, z: 11 },
    [bottom]: { dy: -hTop * p, lift, z: 12 },
  };
};

const ORDER_1 = swap(DEFAULT_ORDER, "accounts", "cards");
const ORDER_2 = swap(ORDER_1, "loans", "finance");

export const Scene5Panels: React.FC = () => {
  const f = useCurrentFrame();
  const moveEase = Easing.bezier(0.6, 0, 0.25, 1);

  // swap 1: Kredi Kartlarım <-> Vadesiz Hesaplarım
  const lift1 = k(f, [60, 80, 135, 155], [0, 1, 1, 0]);
  const p1 = k(f, [78, 140], [0, 1], moveEase);
  // swap 2: Finansal Durumum <-> Kredilerim
  const lift2 = k(f, [250, 270, 325, 345], [0, 1, 1, 0]);
  const p2 = k(f, [268, 330], [0, 1], moveEase);

  let order = DEFAULT_ORDER;
  let motion = {};
  if (f < 160) {
    motion = swapMotion(DEFAULT_ORDER, "accounts", "cards", p1, lift1);
  } else {
    order = ORDER_1;
    motion = swapMotion(ORDER_1, "loans", "finance", p2, lift2);
    if (f >= 350) {
      order = ORDER_2;
      motion = {};
    }
  }

  return (
    <AbsoluteFill>
      <Stage
        camera={{
          x: k(f, [0, 450], [-420, -410]),
          y: k(f, [0, 450], [20, 0]),
          scale: k(f, [0, 450], [1.12, 1.2]),
          rx: 0,
          ry: k(f, [0, 450], [12, 0]),
          rz: 0,
        }}
        overlay={
          <Caption
            from={25}
            to={SCENE5_DURATION - 10}
            title="Adjustable panels"
            text="Arrange your home page in the order that suits you"
            left={1010}
            width={760}
          />
        }
      >
        <HomeScreen scrollY={k(f, [0, 40, 170, 240, 450], [100, 150, 150, 380, 400])} order={order} motion={motion} />
      </Stage>
    </AbsoluteFill>
  );
};
