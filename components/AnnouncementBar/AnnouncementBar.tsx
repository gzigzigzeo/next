import styled, { keyframes, css as styledCss } from "styled-components";
import css from "@styled-system/css";
import Flex from "components/Flex";
import Box from "components/Box";
import * as logos from "./logos";
import { LogoRow, Gray1, Gray2, Gray3 } from "./data";

export type LogoName = keyof typeof logos;

export interface AnnouncementBarImageProps {
  logo: LogoName;
  inLivingColor: boolean;
  trim?: string | string[];
}

const AnnouncementBarImage = ({
  logo,
  inLivingColor,
  trim,
}: AnnouncementBarImageProps) => {
  const LogoSVG = logos[logo];
  return (
    <Box
      maxWidth={[120, 160]}
      minWidth={[null, 140]}
      height={inLivingColor ? 70 : 32}
      my={2}
      mx={4}
      color="gray"
      opacity={inLivingColor ? "1" : ".56"}
      display={trim}
    >
      <LogoSVG width="100%" height="100%" display="block"></LogoSVG>
    </Box>
  );
};

export interface AnnouncementBarProps {
  inLivingColor?: boolean;
  rows: Array<LogoRow>;
}

export const AnnouncementBar = ({
  inLivingColor = false,
  rows = [Gray1, Gray2, Gray3],
}: AnnouncementBarProps) => {
  return (
    <Flex
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      height="60px"
      py={[6, 8]}
    >
      {rows.map((e, i) => {
        return (
          <StyledRow
            key={`row${i}`}
            opacity={i === 0 ? "1" : "0"}
            animationDelay={`${i * 5}s`}
            animationDuration={`${rows.length * 5}s`}
          >
            {e.map((ex, ix) => {
              return (
                <AnnouncementBarImage
                  key={ex}
                  inLivingColor={inLivingColor}
                  logo={ex as LogoName}
                  trim={ix > 2 ? ["none", "block"] : "block"}
                />
              );
            })}
          </StyledRow>
        );
      })}
    </Flex>
  );
};

const logoAnimation = keyframes`
        0% {
          opacity: 0;
        }
        33% {
          opacity: 1;
        }
        34% {
          opacity: 0;
        }
        100% {
          opacity: 0;
        }
        `;

const StyledRow = styled(Flex)(
  css({
    minHeight: ["48px", "60px"],
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    animationIterationCount: "infinite",
  }),
  styledCss`animation-name: ${logoAnimation};`
);
