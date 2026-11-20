import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Temporary stand-in for QNB Sans. When the real QNB Sans files are available,
// drop them into public/fonts and point the urls below to them – the family
// name used across the video stays "QNB Sans".
export const FONT_FAMILY = "QNB Sans";

const weights = ["400", "600", "700", "800"] as const;

export const fontsLoaded = Promise.all(
  weights.flatMap((w) => [
    loadFont({
      family: FONT_FAMILY,
      url: staticFile(`fonts/temp-${w}.woff2`),
      weight: w,
      format: "woff2",
    }),
    loadFont({
      family: FONT_FAMILY,
      url: staticFile(`fonts/temp-ext-${w}.woff2`),
      weight: w,
      format: "woff2",
      unicodeRange:
        "U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF",
    }),
  ]),
);
