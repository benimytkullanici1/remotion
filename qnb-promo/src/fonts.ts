import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

export const FONT_FAMILY = "QNB Sans";

const files: [string, string][] = [
  ["300", "QNBSansEN-Light.woff"],
  ["400", "QNBSansEN-Regular.woff"],
  ["500", "QNBSansEN-Medium.woff"],
  ["600", "QNBSansEN-SemiBold.woff"],
  ["700", "QNBSansEN-Bold.woff"],
];

export const fontsLoaded = Promise.all(
  files.map(([weight, file]) =>
    loadFont({ family: FONT_FAMILY, url: staticFile(`fonts/${file}`), weight, format: "woff" }),
  ),
);
