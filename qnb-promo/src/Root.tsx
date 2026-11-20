import { Composition, Still } from "remotion";
import { BackgroundOnly, BackgroundWithPhone } from "./BackgroundPreview";
import { Scene1Intro, SCENE1_DURATION } from "./scenes/Scene1Intro";
import { Scene2QuickAccess, SCENE2_DURATION } from "./scenes/Scene2QuickAccess";
import { Scene4Offers, SCENE4_DURATION } from "./scenes/Scene4Offers";
import { Scene5Panels, SCENE5_DURATION } from "./scenes/Scene5Panels";
import { FullVideo, FULL_DURATION } from "./FullVideo";
import { fontsLoaded } from "./fonts";

fontsLoaded.catch((e) => console.error(e));

const common = { fps: 30, width: 1920, height: 1080 } as const;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="QNB-Mobil-Tanitim" component={FullVideo} durationInFrames={FULL_DURATION} {...common} />
      <Composition id="Sahne1-Intro" component={Scene1Intro} durationInFrames={SCENE1_DURATION} {...common} />
      <Composition id="Sahne2-3-HizliErisim" component={Scene2QuickAccess} durationInFrames={SCENE2_DURATION} {...common} />
      <Composition id="Sahne4-BaglamsalTeklifler" component={Scene4Offers} durationInFrames={SCENE4_DURATION} {...common} />
      <Composition id="Sahne5-Panolar" component={Scene5Panels} durationInFrames={SCENE5_DURATION} {...common} />
      <Still id="BackgroundOnly" component={BackgroundOnly} width={1920} height={1080} />
      <Still id="BackgroundWithPhone" component={BackgroundWithPhone} width={1920} height={1080} />
    </>
  );
};
