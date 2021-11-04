import styled, { keyframes, css as styledCss } from "styled-components";
import css from "@styled-system/css";

import Box from "components/Box";
import Flex from "components/Flex";
import Link from "components/Link";
import { LogoRow, CaseStudyRow, Gray1, Gray2, Gray3 } from "./data";
import * as logos from "./logos";

/**
 * The current version of this component works with implementations of 2 or 3 rows
 * Adding rows will require additional keyframes (ask Cole for help if you need it)
 */

export type LogoName = keyof typeof logos;

export interface AnnouncementBarLogoProps {
  logo: LogoName;
  inLivingColor?: boolean;
  trim?: string | string[];
}

export interface AnnouncementBarProps {
  inLivingColor?: boolean;
  rows?: Array<LogoRow> | Array<CaseStudyRow>;
  caseStudy?: boolean;
}

export interface CaseStudyLogoProps {
  logo: LogoName;
  url?: string;
  trim?: string | string[];
}

const AnnouncementBarLogo = ({
  logo,
  inLivingColor,
  trim,
}: AnnouncementBarLogoProps) => {
  const LogoSVG = logos[logo];
  return (
    <Box
      maxWidth={[120, 160]}
      minWidth={[null, 80]}
      height={inLivingColor ? 70 : 32}
      my={2}
      color="gray"
      opacity={inLivingColor ? "1" : ".56"}
      display={trim}
    >
      <LogoSVG width="100%" height="100%" display="block"></LogoSVG>
    </Box>
  );
};

export const CaseStudyLogo = ({ logo, url, trim }: CaseStudyLogoProps) => {
  const LogoSVG = logos[logo];

  return url ? (
    <StyledWrapper
      display={trim}
      border="1px solid #651fff"
      css={css({
        "&:hover": {
          transition: "all .3s",
          boxShadow: "0 4px 16px rgba(0, 0, 0, .24)",
        },
      })}
    >
      <Link href={url}>
        <StyledBox>
          <LogoSVG width="100%" height="80%"></LogoSVG>
        </StyledBox>
      </Link>
    </StyledWrapper>
  ) : (
    <StyledWrapper display={trim}>
      <StyledBox>
        <LogoSVG width="100%" height="80%"></LogoSVG>
      </StyledBox>
    </StyledWrapper>
  );
};

export const AnnouncementBar = ({
  inLivingColor = false,
  rows = [Gray1, Gray2, Gray3],
  caseStudy = false,
}: AnnouncementBarProps) => {
  return (
    <>
      {caseStudy && (
        <StyledH3>
          Trusted by{" "}
          <Link href="/case-study/" scheme="site">
            {" "}
            leading organizations
          </Link>
        </StyledH3>
      )}
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
              data-count={rows.length}
              opacity={i === 0 ? "1" : "0"}
              animationDelay={`${i * 5}s`}
              animationDuration={`${rows.length * 5}s`}
              visibility={i === 0 ? "visible" : "hidden"}
            >
              {e.map((company, index: number) => {
                return caseStudy ? (
                  <CaseStudyLogo
                    key={index}
                    logo={company["imageName"]}
                    url={company.url}
                    trim={index > 2 ? ["none", "flex"] : "flex"}
                  />
                ) : (
                  <AnnouncementBarLogo
                    key={company}
                    inLivingColor={inLivingColor}
                    logo={company as LogoName}
                    trim={index > 2 ? ["none", "flex"] : "flex"}
                  />
                );
              })}
            </StyledRow>
          );
        })}
      </Flex>
    </>
  );
};

const twoRowAnimation = keyframes`
        0% {
          opacity: 0;
          visibility: visible;
        }
        50% {
          opacity: 1;
        }
        51% {
          opacity: 0;
          visibility: hidden;
        }
        100% {
          opacity: 0;
          visibility: hidden;
        }
        `;

const threeRowAnimation = keyframes`
        0% {
          opacity: 0;
          visibility: visible;
        }
        33% {
          opacity: 1;
        }
        34% {
          opacity: 0;
          visibility: hidden;
        }
        100% {
          opacity: 0;
          visibility: hidden;
        }
        `;

const StyledBox = styled(Flex)(
  css({
    p: 2,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "16px",
  })
);

const StyledWrapper = styled(Flex)(
  css({
    width: 206,
    height: 100,
    flexShrink: 1,
    backgroundColor: "white",
    borderRadius: "16px",
    boxShadow: "0 1px 4px rgb(0 0 0 / 24%)",
    boxSizing: "border-box",
    justifyContent: "center",
  })
);

const StyledRow = styled(Flex)((props) => [
  css({
    px: 3,
    minHeight: ["48px", "60px"],
    width: "100%",
    flexDirection: "row",
    flexWrap: "nowrap",
    gap: "30px",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    animationIterationCount: "infinite",
  }),
  styledCss`animation-name: ${
    props["data-count"] === 2 ? twoRowAnimation : threeRowAnimation
  };`,
]);

const StyledH3 = styled("h3")(
  css({
    color: "dark-purple",
    fontSize: "text-md",
    textAlign: "center",
    marginBottom: 3,
    lineHeight: "lg",
  })
);
