/**
 * Note: When using the Node.JS APIs, the config file
 * doesn't apply. Instead, pass options directly to the APIs.
 *
 * All configuration options: https://remotion.dev/docs/config
 */

import fs from "node:fs";
import { Config } from "@remotion/cli/config";

Config.setRspack(true);
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setDefaultPremountInSeconds(2);
// Only used inside the cloud build container (no internet for the browser download).
// On a normal computer Remotion downloads its own browser, so this is skipped.
const CLOUD_BROWSER =
  "/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell";
if (fs.existsSync(CLOUD_BROWSER)) {
  Config.setBrowserExecutable(CLOUD_BROWSER);
}
