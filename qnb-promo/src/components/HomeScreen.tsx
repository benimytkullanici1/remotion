import React from "react";
import { Img, interpolate, staticFile } from "remotion";
import { Crop } from "./Crop";
import { SCREEN_W, SCREEN_H } from "./Phone";

const HOME = "img/home.png";
const W2 = 780; // source width (2x)
export const HEADER_H = 214 / 2; // fixed purple header (incl. status bar)
export const TABBAR_H = (4290 - 4122) / 2; // fixed bottom navigation
export const VIEWPORT_H = SCREEN_H - HEADER_H - TABBAR_H;

export type SectionKey =
  | "search"
  | "quick"
  | "accounts"
  | "cards"
  | "loans"
  | "finance"
  | "bankcards"
  | "campaigns"
  | "apply"
  | "rest";

// Section bands in home.png (2x px)
const BANDS: Record<SectionKey, [number, number]> = {
  search: [214, 359],
  quick: [359, 622],
  accounts: [622, 1089],
  cards: [1089, 1555],
  loans: [1555, 1943],
  finance: [1943, 2215],
  bankcards: [2215, 2595],
  campaigns: [2595, 3154],
  apply: [3154, 3708],
  rest: [3708, 4122],
};

export const DEFAULT_ORDER: SectionKey[] = [
  "search",
  "quick",
  "accounts",
  "cards",
  "loans",
  "finance",
  "bankcards",
  "campaigns",
  "apply",
  "rest",
];

// Card bodies / edges / offer tails for the contextual-offer animation (2x px)
const ACC_BODY: [number, number] = [622, 940];
const ACC_TAIL: [number, number] = [940, 1089]; // pink offer strip already in home.png
const CARD_BODY: [number, number] = [1089, 1516];
const CLOSED_EDGE: [number, number] = [1516, 1555]; // white rounded card bottom
const CARD_TAIL: [number, number] = [428, 575]; // from cards_offer.png

const half = (b: [number, number]) => (b[1] - b[0]) / 2;
const EDGE_H = half(CLOSED_EDGE);
const ACC_TAIL_H = half(ACC_TAIL);
const CARD_TAIL_H = half(CARD_TAIL);

export const sectionHeight = (
  key: SectionKey,
  offers: { accounts: number; cards: number },
) => {
  if (key === "accounts")
    return half(ACC_BODY) + EDGE_H + (ACC_TAIL_H - EDGE_H) * offers.accounts;
  if (key === "cards")
    return half(CARD_BODY) + EDGE_H + (CARD_TAIL_H - EDGE_H) * offers.cards;
  return half(BANDS[key]);
};

const OfferCard: React.FC<{
  body: [number, number];
  tail: React.ReactNode;
  tailH: number;
  p: number;
}> = ({ body, tail, tailH, p }) => {
  const regionH = EDGE_H + (tailH - EDGE_H) * p;
  return (
    <div style={{ position: "relative", background: "#fff" }}>
      <Crop src={HOME} y0={body[0]} y1={body[1]} imgW={W2} style={{ zIndex: 2 }} />
      <div style={{ position: "relative", height: regionH, overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 0, bottom: 0 }}>{tail}</div>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            opacity: interpolate(p, [0, 0.18], [1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <Crop src={HOME} y0={CLOSED_EDGE[0]} y1={CLOSED_EDGE[1]} imgW={W2} />
        </div>
      </div>
    </div>
  );
};

const QuickSection: React.FC<{ offset: number }> = ({ offset }) => {
  const [y0, y1] = BANDS.quick;
  return (
    <div style={{ position: "relative", height: (y1 - y0) / 2, background: "#fff" }}>
      <div
        style={{
          position: "absolute",
          left: 16,
          right: 0,
          top: (377 - y0) / 2,
          height: (594 - 377) / 2,
          background: "#F2F5F9",
          borderRadius: "10px 0 0 10px",
          overflow: "hidden",
        }}
      >
        <Img2
          src="img/quick_tiles.png"
          style={{
            position: "absolute",
            left: -offset,
            top: -2,
            width: 1172 / 2,
            maxWidth: "none",
          }}
        />
      </div>
    </div>
  );
};

const Img2: React.FC<{ src: string; style: React.CSSProperties }> = ({ src, style }) => (
  <Img src={staticFile(src)} style={style} />
);

export const renderSection = (
  key: SectionKey,
  opts: { quickOffset: number; offers: { accounts: number; cards: number } },
) => {
  if (key === "quick") return <QuickSection offset={opts.quickOffset} />;
  if (key === "accounts")
    return (
      <OfferCard
        body={ACC_BODY}
        tailH={ACC_TAIL_H}
        p={opts.offers.accounts}
        tail={<Crop src={HOME} y0={ACC_TAIL[0]} y1={ACC_TAIL[1]} imgW={W2} />}
      />
    );
  if (key === "cards")
    return (
      <OfferCard
        body={CARD_BODY}
        tailH={CARD_TAIL_H}
        p={opts.offers.cards}
        tail={
          <Crop
            src="img/cards_offer.png"
            y0={CARD_TAIL[0]}
            y1={CARD_TAIL[1]}
            imgW={776}
            x={2}
            style={{ background: "#fff" }}
          />
        }
      />
    );
  const [y0, y1] = BANDS[key];
  return <Crop src={HOME} y0={y0} y1={y1} imgW={W2} />;
};

export type SectionMotion = {
  // extra translateY / lift for animated re-ordering
  dy?: number;
  lift?: number; // 0..1, adds shadow + scale
  z?: number;
};

export type HomeScreenProps = {
  scrollY?: number; // logical px scrolled in the content viewport
  quickOffset?: number; // horizontal scroll of the quick access row
  offers?: { accounts: number; cards: number };
  order?: SectionKey[];
  motion?: Partial<Record<SectionKey, SectionMotion>>;
  overlay?: (layout: Record<SectionKey, { y: number; h: number }>) => React.ReactNode;
};

export const computeLayout = (
  order: SectionKey[],
  offers: { accounts: number; cards: number },
) => {
  const layout = {} as Record<SectionKey, { y: number; h: number }>;
  let y = 0;
  for (const k of order) {
    const h = sectionHeight(k, offers);
    layout[k] = { y, h };
    y += h;
  }
  return { layout, total: y };
};

export const HomeScreen: React.FC<HomeScreenProps> = ({
  scrollY = 0,
  quickOffset = 0,
  offers = { accounts: 0, cards: 0 },
  order = DEFAULT_ORDER,
  motion = {},
  overlay,
}) => {
  const { layout } = computeLayout(order, offers);
  return (
    <div style={{ position: "absolute", inset: 0, background: "#fff", width: SCREEN_W, height: SCREEN_H }}>
      {/* scrolling content */}
      <div
        style={{
          position: "absolute",
          top: HEADER_H,
          left: 0,
          width: SCREEN_W,
          height: VIEWPORT_H,
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", left: 0, top: 0, width: SCREEN_W, translate: `0 ${-scrollY}px` }}>
          {order.map((k) => {
            const m = motion[k] ?? {};
            const lift = m.lift ?? 0;
            return (
              <div
                key={k}
                style={{
                  position: "absolute",
                  left: 0,
                  top: layout[k].y,
                  width: SCREEN_W,
                  translate: `0 ${m.dy ?? 0}px`,
                  zIndex: m.z ?? (lift > 0 ? 10 : 1),
                  scale: 1 + 0.03 * lift,
                  filter: lift > 0 ? `drop-shadow(0 ${10 * lift}px ${18 * lift}px rgba(30,38,72,${0.28 * lift}))` : undefined,
                }}
              >
                {renderSection(k, { quickOffset, offers })}
              </div>
            );
          })}
          {overlay ? overlay(layout) : null}
        </div>
      </div>
      {/* fixed header */}
      <Crop src={HOME} y0={0} y1={214} imgW={W2} style={{ position: "absolute", top: 0, left: 0, zIndex: 20 }} />
      {/* fixed tab bar */}
      <Crop
        src={HOME}
        y0={4122}
        y1={4290}
        imgW={W2}
        style={{ position: "absolute", bottom: 0, left: 0, zIndex: 20, boxShadow: "0 -4px 12px rgba(30,38,72,0.06)" }}
      />
    </div>
  );
};
