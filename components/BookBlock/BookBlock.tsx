import Box from "components/Box";
import Flex from "components/Flex";
import NextImage from "next/image";
import { Centrator } from "components/Layout";
import { MarketoBrowserForm } from "components/MarketoForm";
import shadowBg from "./assets/shadow.png";
import styled from "styled-components";
import css from "@styled-system/css";

export interface BookBlockProps {
  children: React.ReactNode;
  formId: string;
  src: string;
  title: string;
}

export const BookBlock = ({ children, title, src, formId }: BookBlockProps) => {
  return (
    <Flex
      borderBottom="1px solid"
      borderColor="lightest-gray"
      overflow="hidden"
    >
      <Centrator>
        <Box pt={[0, 6]} pb={[4, 6]}>
          <Box
            as="h1"
            fontSize={["header-1", "hero-header"]}
            lineHeight={["xl", "hero-header"]}
            fontWeight="black"
          >
            {title}
          </Box>
          <Box
            fontSize={["text-lg", "text-xl"]}
            lineHeight={["md", "lg"]}
            color="dark-gray"
            my={2}
          >
            {children}
          </Box>
          <Box maxWidth={["auto", "300px"]}>
            <MarketoBrowserForm id={formId} minHeight="258px" />
          </Box>
        </Box>
        <Flex
          flexShrink={0}
          mr="-76px"
          pt={6}
          display={["none", "flex"]}
          flexDirection="column"
          alignItems="center"
        >
          <StyledImageContainer>
            <NextImage src={src} alt="" layout="fill" objectFit="contain" />
          </StyledImageContainer>
          <Box
            backgroundImage={`url(${shadowBg})`}
            width="496px"
            height="113px"
            backgroundSize="496px 113px"
            position="relative"
            zIndex={1}
            top="-56px"
          />
        </Flex>
      </Centrator>
    </Flex>
  );
};

const StyledImageContainer = styled(Flex)(
  css({
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.24)",
    position: "relative",
    zIndex: 2,
    width: 344,
    height: 440,
  })
);
