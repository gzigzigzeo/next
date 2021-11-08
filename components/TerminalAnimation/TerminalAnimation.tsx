import { useState, useEffect } from "react";
import Flex from "components/Flex";
import {
  AnimatedResetButton,
  AnimatedTerminal,
} from "../AnimationUtilities/AnimationUtilities";
import {
  HomePageText,
  DatabaseText,
  KubernetesText,
  ServerText,
} from "./TerminalText";
import { TerminalBrowser } from "../AnimationUtilities/TerminalBrowserAnimation";

/**
 * This component handles the text animation in the terminal window.
 * The translateY portion of the terminal animation is handled in the utilities file.
 * The "browser" window animation is handled in its own file.
 */

export type TerminalAnimationType =
  | "homepage"
  | "database"
  | "kubernetes"
  | "server";

export interface TerminalAnimationProps {
  text: TerminalAnimationType;
}

export const TerminalAnimation = ({
  text = "homepage",
}: TerminalAnimationProps) => {
  // the text to be displayed in the terminal window for each variant:
  const textSet = {
    homepage: HomePageText,
    database: DatabaseText,
    kubernetes: KubernetesText,
    server: ServerText,
  };

  // each step displays different animated text
  const StepOne = textSet[text][1];
  const StepTwo = textSet[text][2];
  const StepThree = textSet[text][3];

  const [termText, setTermText] = useState(StepOne);
  const [containerState, setContainerState] = useState(0);

  //this function sets the animation cadence
  const textAnimate = () => {
    setTimeout(() => {
      setTermText(StepTwo);
    }, 2200);
    setTimeout(() => {
      setTermText(StepThree);
    }, 10500);
  };

  //the animation is kicked off in this hook after the DOM is painted
  useEffect(() => {
    textAnimate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //sets the text animation state to the beginning
  const reset = () => setTermText(StepOne);

  return (
    <Flex
      key={containerState}
      position="relative"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
      mx={[3, 5]}
      my={[1, 2]}
      pt={[8, 5]}
    >
      <AnimatedResetButton
        position="absolute"
        top={["30px", "35px"]}
        variant="secondary"
        shape="outline"
        onClick={() => {
          reset(), textAnimate(), setContainerState(Math.random());
        }}
      >
        Replay Animation
      </AnimatedResetButton>
      <Flex
        flexDirection="column"
        justifyContent="flex-end"
        alignItems="center"
        height={410}
        overflowY="hidden"
        position="relative"
        width="100%"
        maxWidth="588px"
        borderRadius="0 0 8px 8px"
      >
        <AnimatedTerminal rise={text}>{termText}</AnimatedTerminal>
        <TerminalBrowser />
      </Flex>
    </Flex>
  );
};
