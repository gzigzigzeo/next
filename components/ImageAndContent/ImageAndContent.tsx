import styled from "styled-components";
import css from "@styled-system/css";
import { Centrator } from "components/Layout";
import Section from "components/Section";
import Image from "components/Image";

import Flex from "components/Flex";
import Box from "components/Box";

export interface ImageAndContentProps {
  title: string;
  subtitle: string;
  subheader?: string | React.ReactNode;
  imageSource?: string;
  imagePosition?: string;
  outro?: string | React.ReactNode;
  children: React.ReactNode;

  listItems: string[];
}

const ImageAndContentItem = () => {
  return <h1>testing</h1>;
};

const ImageAndContent = ({
  title,
  subtitle,
  subheader,
  imageSource,
  imagePosition = "right",
  outro,
  children,

  listItems,
}: ImageAndContentProps) => {
  return (
    <Section bg="grayGradient">
      <Centrator flexDirection="column" py={[3, 5, 9]}>
        {/* Outer container */}
        <Flex
          justifyContent={imagePosition === "left" ? "flex-end" : ""}
          flexDirection={
            imagePosition === "right"
              ? ["column", "row"]
              : ["column-reverse", "row-reverse"]
          }
        >
          {/* Upper Content Side */}
          <Flex
            flexDirection="column"
            justifyContent="center"
            maxWidth={["auto", "60%"]}
          >
            <Flex flexDirection="column">
              <Box
                as="h2"
                fontSize={["header-2", "header-1"]}
                fontWeight="black"
                color="black"
                lineHeight="xxl"
                mb={[1, 3]}
              >
                {title}
              </Box>
              <Box
                as="h2"
                fontSize="text-xl"
                fontWeight="regular"
                color="darkest"
                lineHeight="lg"
                mb={[0, 3]}
              >
                {subtitle}
              </Box>
              <Flex color="darkest">{subheader}</Flex>

              {/* Content */}
              <Flex flexDirection="column" mr={3} mb={[3, 0]}>
                {children}

                <Flex>{outro}</Flex>
              </Flex>
            </Flex>
          </Flex>
          {/* Image Side: image is sourced locally from /pages/../assets
           *  Image is not visible on mobile.
           */}
          <Flex
            display={["none", "inherit"]}
            justifyContent="center"
            alignItems="center"
            width={["auto", "40%"]}
          >
            <Image src={imageSource} alt="image" width="265px" height="253px" />
          </Flex>
        </Flex>
      </Centrator>
    </Section>
  );
};

const StyledUL = styled("ul")(
  css({
    m: "0 0 3 0",
    pl: 4,
    li: {
      mb: 2,
    },
  })
);

export default ImageAndContent;
