import React from "react";
import { Img, staticFile } from "remotion";

// Shows a horizontal band [y0, y1) of a 2x screenshot at 1x logical size.
// All coordinates are in the source image's (2x) pixels.
export const Crop: React.FC<{
  src: string;
  y0: number;
  y1: number;
  imgW: number;
  x?: number;
  style?: React.CSSProperties;
}> = ({ src, y0, y1, imgW, x = 0, style }) => (
  <div
    style={{
      position: "relative",
      height: (y1 - y0) / 2,
      width: 390,
      overflow: "hidden",
      ...style,
    }}
  >
    <Img
      src={staticFile(src)}
      style={{
        position: "absolute",
        left: x / 2,
        top: -y0 / 2,
        width: imgW / 2,
        maxWidth: "none",
      }}
    />
  </div>
);
