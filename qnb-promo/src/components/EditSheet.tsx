import React from "react";
import { Img, staticFile } from "remotion";
import { Crop } from "./Crop";
import { SCREEN_W } from "./Phone";

const SRC = "img/quick_edit_full.png";
const W2 = 780;
export const SHEET_H = 760;
export const SHEET_CROP_TOP = 80; // skip the screenshot's status bar
// edit_fab_buttons.png is 716 x 156 (2x)
const FAB_W = 716 / 2;
const FAB_H = 156 / 2;

// rows inside the screenshot (2x px), each includes its top divider
export const ROW_KAREKOD: [number, number] = [704, 816];
export const ROW_AJANDA: [number, number] = [816, 928];
export const ROW_H = (ROW_KAREKOD[1] - ROW_KAREKOD[0]) / 2;
export const rowTop = (row: [number, number]) => (row[0] - SHEET_CROP_TOP) / 2;

export type RowMotion = { dy: number; lift: number };

const Row: React.FC<{ row: [number, number]; m: RowMotion; z: number }> = ({ row, m, z }) => (
  <div
    style={{
      position: "absolute",
      left: 0,
      top: rowTop(row),
      width: SCREEN_W,
      translate: `0 ${m.dy}px`,
      scale: 1 + 0.025 * m.lift,
      zIndex: z,
      boxShadow: `0 ${10 * m.lift}px ${26 * m.lift}px rgba(30,38,72,${0.3 * m.lift}), 0 ${2 * m.lift}px ${6 * m.lift}px rgba(30,38,72,${0.12 * m.lift})`,
      borderRadius: 6 * m.lift,
      overflow: "hidden",
      background: "#fff",
    }}
  >
    <Crop src={SRC} y0={row[0]} y1={row[1]} imgW={W2} />
  </div>
);

// Bottom-sheet modal version of "Hızlı İşlemleri Düzenle". `progress` 0..1 slides it up.
export const EditSheet: React.FC<{
  progress: number;
  karekod?: RowMotion;
  ajanda?: RowMotion;
}> = ({ progress, karekod = { dy: 0, lift: 0 }, ajanda = { dy: 0, lift: 0 } }) => {
  if (progress <= 0) return null;
  return (
    <>
      {/* scrim */}
      <div style={{ position: "absolute", inset: 0, background: `rgba(8,10,24,${0.45 * progress})`, zIndex: 30 }} />
      <div
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width: SCREEN_W,
          height: SHEET_H,
          translate: `0 ${(1 - progress) * (SHEET_H + 20)}px`,
          borderRadius: "22px 22px 0 0",
          overflow: "hidden",
          background: "#fff",
          zIndex: 35,
          boxShadow: "0 -10px 30px rgba(0,0,0,0.25)",
        }}
      >
        <Crop src={SRC} y0={SHEET_CROP_TOP} y1={SHEET_CROP_TOP + SHEET_H * 2} imgW={W2} />
        {/* grabber */}
        <div style={{ position: "absolute", top: 7, left: SCREEN_W / 2 - 20, width: 40, height: 5, borderRadius: 3, background: "#D5DAE3" }} />
        {/* animated rows – white plate hides the static ones underneath */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: rowTop(ROW_KAREKOD),
            width: SCREEN_W,
            height: ROW_H * 2,
            background: "#fff",
          }}
        />
        <Row row={ROW_AJANDA} m={ajanda} z={2} />
        <Row row={ROW_KAREKOD} m={karekod} z={3} />
        {/* floating action buttons (Vazgeç / Kaydet) */}
        <div
          style={{
            position: "absolute",
            left: (SCREEN_W - FAB_W) / 2,
            bottom: 22,
            width: FAB_W,
            height: FAB_H,
            zIndex: 5,
            borderRadius: 13,
            background: "#fff",
            boxShadow: "0 8px 24px rgba(30,38,72,0.16), 0 1px 4px rgba(30,38,72,0.08)",
          }}
        >
          <Img src={staticFile("img/edit_fab_buttons.png")} style={{ width: FAB_W, height: FAB_H, display: "block" }} />
        </div>
      </div>
    </>
  );
};
