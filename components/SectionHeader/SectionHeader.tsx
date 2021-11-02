import { Centrator } from "components/Layout";
import Box from "components/Box";
import Flex from "components/Flex";
import wave from "./fixtures/wave.svg";
import wavelight from "./fixtures/wave-light.png";
import Button, { ButtonVariant, ButtonShape } from "components/Button";

export type BGColor = "wave" | "white" | "gray" | "wavelight" | "wave-on-gray";
type LinkProps = {
  href: string;
  text: string;
  variant?: ButtonVariant;
  shape?: ButtonShape;
};
export interface SectionHeaderProps {
  title: string;
  description: React.ReactNode;
  subtitle?: string;
  children?: React.ReactNode;
  mode?: string;
  bg?: BGColor;
  link?: LinkProps;
  inColumn?: boolean;
}

const getBG = (color: BGColor) => {
  switch (color) {
    case "gray":
      return { backgroundImage: "linear-gradient(125deg ,#F0F2F4,#fff)" };
    case "white":
      return { backgroundImage: "white" };
    case "wave":
      return {
        backgroundColor: "linear-gradient(134deg, #ffffff 0%, #f0f2f4 100%)",
        backgroundImage: `url(${wave})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "5% 42%",
        backgroundSize: "160%",
      };
    case "wavelight":
      return {
        backgroundColor: "linear-gradient(134deg, #ffffff 0%, #f0f2f4 100%)",
        backgroundImage: `url(${wavelight})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "100%",
      };
    case "wave-on-gray":
      return {
        backgroundImage: `url(${wave}), linear-gradient(125deg ,#F0F2F4,#fff)`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "100%",
      };
    default:
      return {
        backgroundImage: "linear-gradient(180deg, #ffffff 0%, #f0f2f4 100%)",
      };
  }
};
export const SectionHeader = ({
  mode,
  children,
  subtitle,
  title,
  description,
  bg,
  link,
  inColumn,
}: SectionHeaderProps) => {
  const titleInColumn = inColumn ? "column" : ["column", "row"];
  const leftGap = inColumn ? 0 : [0, 11];
  const titleBottomGap = inColumn ? [0, 5] : mode === "none" ? [4, 9] : [4, 11];
  const headerBottomGap = inColumn ? [3, 5] : 0;
  const sectionTopGap = inColumn ? [11, 9] : mode === "none" ? [4, 9] : [4, 11];
  return (
    <Flex
      pt={mode === "none" ? [3, 5] : [7, 11]}
      pb={headerBottomGap}
      {...getBG(bg)}
    >
      <Centrator
        justifyContent={["auto", "space-between"]}
        alignItems="stretch"
        flexDirection={titleInColumn}
      >
        <Box
          flex="1 1 auto"
          pt={sectionTopGap}
          pb={titleBottomGap}
          order={inColumn ? 0 : [1, 0]}
        >
          <Flex flexDirection="column" alignItems="flexStart">
            {subtitle && (
              <Box
                mb={title ? "1" : 0}
                color="dark-purple"
                fontWeight="bold"
                fontSize="text-xl"
                lineHeight="md"
              >
                {subtitle}
              </Box>
            )}
            {title && (
              <Box
                as="h1"
                color="black"
                fontSize={["header-1", "54px"]}
                lineHeight={["xl", "72px"]}
                fontWeight="black"
                textAlign="left"
              >
                {title}
              </Box>
            )}
          </Flex>
          <Box
            mt={[3, 2]}
            fontSize="text-xl"
            lineHeight="lg"
            color="darkest"
            maxWidth="600px"
          >
            {description}
          </Box>
          {link && (
            <Button
              mt={6}
              as="a"
              href={link.href}
              shape={link.shape}
              variant={link.variant}
            >
              {link.text}
            </Button>
          )}
        </Box>
        <Flex
          flex="0 0 auto"
          justifyContent="center"
          alignItems="center"
          ml={leftGap}
          pt={[3, 2]}
          pb={[0, 2]}
          px={inColumn ? 0 : [3, 0]}
          maxWidth="100%"
        >
          {children}
        </Flex>
      </Centrator>
    </Flex>
  );
};
