import Flex from "components/Flex";
import wavelight1 from "sharedAssets/images/wave-light.png";
import wave1 from "sharedAssets/images/wave.svg";
import squares from "sharedAssets/images/squares.svg";
import waveGray from "sharedAssets/images/waveGray.svg";
import waveDouble from "sharedAssets/images/wave-double.png";
import wavePurple from "sharedAssets/images/wavePurple.svg";
import waveWhite from "sharedAssets/images/waveWhite.svg";

type BG =
  | "wavelight"
  | "wave"
  | "squares"
  | "wave-double"
  | "wave-gray"
  | "wave-purple"
  | "wave-white";

const getBG = (bg: BG) => {
  switch (bg) {
    case "wavelight":
      return { background: `url(${wavelight1}) 0px 0px no-repeat` };
    case "wave":
      return { background: `url(${wave1}) 0px 0px no-repeat` };
    case "squares":
      return { background: `url(${squares}) 0px 0px no-repeat` };
    case "wave-double":
      return { background: `url(${waveDouble}) 0px 0px no-repeat` };
    case "wave-gray":
      return { background: `url(${waveGray}) no-repeat` };
    case "wave-white":
      return { background: `url(${waveWhite}) 0px 0px no-repeat` };
    case "wave-purple":
      return {
        backgroundImage: `url(${wavePurple})`,
        backgroundRepeat: "no-repeat",
        backgroundColor: "dark-purple",
      };
    default:
      return { background: "gray" };
  }
};

interface BGVProps {
  bg: BG;
}

export const BackgroundViewer = ({ bg }: BGVProps) => {
  return (
    <Flex height={560} width="100%" {...getBG(bg)} border="1px solid gray" />
  );
};
