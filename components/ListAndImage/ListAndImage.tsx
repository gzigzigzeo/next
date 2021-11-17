import styled from "styled-components";
import css from "@styled-system/css";
import { Centrator } from "components/Layout";
import Section from "components/Section";
import Flex from "components/Flex";
import Box from "components/Box";

export interface ListAndImageProps {
  title: string;
  listHeading: string;
  listItems: string[];
  outro?: string | React.ReactNode;
  children: React.ReactNode;
  imagePosition?: string;
  subheader?: string | React.ReactNode;
}

export const ListAndImage = ({
  title,
  listHeading,
  listItems,
  outro,
  children,
  subheader,
  imagePosition = "right",
}: ListAndImageProps) => {
  return (
    <Section bg="grayGradient">
      <Centrator flexDirection="column" py={[3, 5, 9]}>
        <Flex
          justifyContent={imagePosition === "left" ? "flex-end" : ""}
          flexDirection={
            imagePosition === "right"
              ? ["column", "row"]
              : ["column-reverse", "row-reverse"]
          }
        >
          {/* Right/Upper Side */}
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
                {listHeading}
              </Box>
              <StyledSubheader>{subheader}</StyledSubheader>

              {/* List */}
              <Flex flexDirection="column" mr={3} mb={[3, 0]}>
                <StyledUL>
                  {listItems.map((e, i) => (
                    <li key={i}>{e}</li>
                  ))}
                </StyledUL>
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
            {children}
          </Flex>
        </Flex>
      </Centrator>
    </Section>
  );
};

const StyledSubheader = styled(Flex)(
  css({
    color: "darkest",
  })
);

const StyledUL = styled("ul")(
  css({
    m: "0 0 3 0",
    pl: 4,
    li: {
      mb: 2,
    },
  })
);
