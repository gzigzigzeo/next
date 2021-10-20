import { ReactNode } from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";
import Flex, { FlexProps } from "components/Flex";
import { css } from "components/system";
import theme from "components/theme";
import starsUrl from "./assets/stars.png";

const SSRLessGlob = dynamic(() => import("components/Globe"), {
  ssr: false,
});

type Props = {
  children: ReactNode;
} & FlexProps;

const bg = [
  `url(${starsUrl}) 0 0`,
  theme.gradients.purpleToBlackRadial.background,
].join(",");

export default function GlobeBanner({ children }: Props) {
  return (
    <Flex
      as="section"
      height="400px"
      position="relative"
      overflow="hidden"
      justifyContent="center"
      alignItems="flex-end"
      bg="light-purple"
      background={bg}
      backgroundSize="1800px 600px, 100% 100%"
    >
      <StyledHeading>{children}</StyledHeading>
      <StyledGlobeWrapper>
        <SSRLessGlob
          height={1000}
          width={1000}
          viewPoint={{ lat: 5, lng: -80 }}
        />
      </StyledGlobeWrapper>
    </Flex>
  );
}

const StyledGlobeWrapper = styled("div")(
  css({
    position: "absolute",
    top: "100%",
    transform: ["translateY(-29%)", "translateY(-33%)"],
  })
);

const StyledHeading = styled("div")(
  css({
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "white",
    top: "30px",
    left: 0,
    width: "100%",
    textAlign: "center",
    py: 4,
    zIndex: 2,
    h2: {
      color: "white",
      fontSize: "header-1",
      lineHeight: "xxl",
      fontWeight: "black",
      px: "3",
      "> a": {
        display: "none !important",
      },
    },
    p: {
      m: 0,
      px: 3,
      fontSize: "text-lg",
      lineHeight: ["md", "lg"],
      maxWidth: ["100%", "70%"],
    },
  })
);
