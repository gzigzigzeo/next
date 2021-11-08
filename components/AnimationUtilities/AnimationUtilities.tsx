import styled, { keyframes, css as styledCss } from "styled-components";
import css from "@styled-system/css";
import Box from "components/Box";
import Flex from "components/Flex";
import Button from "components/Button";
import Terminal from "components/Terminal";
import closeX from "./assets/close.png";
import add from "./assets/add.png";

// KEYFRAMES
export const blinky = keyframes`
  0% {
    opacity: 1;
  }
  49% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
`;

export const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export const browserRise = keyframes`
  0% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(-380px);
  }
`;

export const browserFall = keyframes`
  0% {
    transform: translateY(-380px);
  }
  100% {
    transform: translateY(0px);
  }
`;

export const homepageRise = keyframes`
  0% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(-210px);
  }
`;
export const serverRise = keyframes`
  0% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(-265px);
  }
`;
export const kubernetesRise = keyframes`
  0% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(-235px);
  }
`;
export const databaseRise = keyframes`
  0% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(-265px);
  }
`;

//DO NOT REMOVE
//at container height of 406:
//210 for homepage
//290 for database
//235 for kubernetes
//265 for server

//sorting object for correct rise height for each animation, referenced in AnimatedTerminal
const riseAdjuster = {
  homepage: homepageRise,
  database: databaseRise,
  kubernetes: kubernetesRise,
  server: serverRise,
};

export const buttonRipple = keyframes`
  0% {
    transform: scale(.5);
    opacity: 0.4
  }
  100% {
    transform: scale(6);
    opacity: 0;
}
`;

//Styled & Animated Components

export const StyledCertBox = styled(Box)(
  css({
    ml: 5,
    color: "#FEAA00",
    fontWeight: "bold",
  })
);

export const StyledSpan = styled("span")({
  color: "#FEAA00",
  fontWeight: "bold",
});

export const AnimatedFadeIn = styled(Box)(
  css({
    animationDuration: "2s",
  }),
  styledCss`animation-name: ${fadeIn};`
);

export const HiddenDiv = styled(Box)(
  css({
    visibility: "hidden",
  })
);

export const AnimatedCursor = styled(Box)(
  css({
    alignSelf: "center",
    height: "16px",
    width: "8px",
    backgroundColor: "#28fe14",
    animationDuration: "1s",
    animationIterationCount: "infinite",
    animationTimingFunction: "linear",
  }),
  styledCss`animation-name: ${blinky};`
);

export const StyledPrompt = () => (
  <Box ml={3} mr={2} color="#28fe14">
    $
  </Box>
);

export const AnimatedResetButton = styled(Button)(
  css({
    opacity: 0,
    zIndex: 1,
    height: "32px",
    width: "160px",
    color: "gray",
    borderColor: "light-gray",
    fontWeight: "regular",
    fontSize: "14px",
  }),
  styledCss`animation: 1s linear 12s 1 normal forwards running ${fadeIn};'`
);

export const AnimatedTerminal = styled(Terminal)((props) => [
  css({
    position: "absolute",
    top: "314px",
    zIndex: 5,
  }),
  styledCss`animation: 500ms linear 11s normal forwards running ${
    riseAdjuster[props["rise"]]
  };`,
]);

//input field and verify button for simulated sign-in screen
export const StyledInput = styled("input")(
  css({
    border: "1px solid #c5c5c5",
    borderRadius: "4px",
    boxSizing: "border-box",
    color: "gray",
    fontSize: "18px",
    height: "32px",
    mb: 2,
    mt: 3,
    px: 2,
    width: "100%",
  })
);

export const StyledVerifyButton = styled(Flex)(
  css({
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(90deg, #227DC0, #1F74B3)",
    border: "1px solid #114b74",
    borderRadius: "2px",
    color: "white",
    fontSize: "text-md",
    fontWeight: "bold",
    position: "relative",
    overflow: "hidden",
    height: "32px",
    width: "100%",
  })
);

//base component for browser "screens"
export const StyledCenterBox = styled(Flex)(
  css({
    position: "absolute",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: ["180px", "272px"],
    color: "gray",
    backgroundColor: "white",
    fontWeight: "bold",
    fontSize: "text-xl",
    border: "1px solid #D2DBDF",
    borderRadius: "default",
    p: [3, 5],
    mt: 4,
    boxSizing: "content-box",
  })
);

export const StyledImageContainer = styled(Flex)(
  css({
    backgroundColor: "white",
    position: "relative",
    borderRadius: "50%",
    overflow: "hidden",
    mt: 3,
  })
);

//Browser window elements
export const StyledBrowserButton = styled(Box)({
  borderRadius: "300px",
  height: "12px",
  width: "12px",
  marginRight: 7,
});

export const BrowserClose = () => (
  <StyledBrowserButton background="#F95E57" border="1px solid #E03D37" />
);
export const BrowserMin = () => (
  <StyledBrowserButton background="#FBBE2E" border="1px solid #DF9C12" />
);
export const BrowserMax = () => (
  <StyledBrowserButton background="#30C841" border="1px solid #2AA925" />
);

export const CloseTabButton = styled(Flex)({
  height: "12px",
  width: "16px",
  backgroundImage: `url(${closeX})`,
  backgroundReapeat: "no-repeat",
  backgroundPosition: "top right",
});

export const AddTabButton = styled(Flex)({
  height: "100%",
  width: "24px",
  backgroundColor: "#D2DBDF",
  backgroundImage: `url(${add})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "70% 60%",
});

export const BrowserTop = () => {
  return (
    <Flex
      flexDirection="row"
      background="#D2DBDF"
      borderRadius="8px 8px 0 0"
      width="100%"
      justifyContent="flex-start"
      height="32px"
      position="relative"
    >
      <Flex
        id="button-container"
        flexDirection="row"
        alignItems="center"
        ml={2}
      >
        <BrowserClose />
        <BrowserMin />
        <BrowserMax />
        <Flex
          id="tab"
          background="#F8F9F8"
          borderRadius="4px 4px 0 0"
          height="80%"
          alignSelf="flex-end"
          fontSize="text-sm"
          fontWeight="bold"
          px={2}
          ml={2}
        >
          Single Sign On
          <CloseTabButton ml={2} alignSelf="center" />
        </Flex>
        <AddTabButton />
      </Flex>
    </Flex>
  );
};
