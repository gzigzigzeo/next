import styled from "styled-components";
import css from "@styled-system/css";
import { Box, Flex, Link } from "components";
import { Centrator } from "components/Layout";

export interface TOCLayoutProps {
  children?: React.ReactNode;
  TOC1?: React.ReactNode;
  TOC2?: React.ReactNode;
}

export const TOCLayout = ({ children, TOC1, TOC2 }: TOCLayoutProps) => {
  return (
    <Box py={3} width="100%">
      <Centrator>
        <Box>
          {/* TOC1 is the Sidebar TOC */}
          <Box
            my={4}
            display={["none", "block"]}
            minHeight="200px"
            minWidth="100px"
            float="right"
          >
            {TOC1}
          </Box>
          <Box>{children}</Box>

          <Flex
            mt={[0, 5]}
            ml={[3, 0]}
            pb={[20, 220]}
            flexDirection={["column", "row"]}
            justifyContent="space-evenly"
          >
            {/* Bottom Section, just above the footer, contains 2 lists: */}
            {/* TOC2 is the bottom TOC */}
            <Box mr={7}>{TOC2}</Box>
            <Box>
              {/* This section is the OTHER RESOURCES list in How It Works pages but can be customized in future if necessary */}
              <Box
                fontSize="text-md"
                mt={[0, 120]}
                ml={[0, 3]}
                mb={-1}
                fontWeight="bold"
                color="darkest"
              >
                OTHER RESOURCES
              </Box>
              <StyledUL>
                <li>
                  <StyledLink scheme="site" href="/docs/quickstart/">
                    Teleport Quickstart Guide
                  </StyledLink>
                </li>
                <li>
                  <StyledLink scheme="site" href="/pricing/">
                    Get Teleport
                  </StyledLink>
                </li>
              </StyledUL>
            </Box>
          </Flex>
        </Box>
      </Centrator>
    </Box>
  );
};

const StyledLink = styled(Link)(
  css({
    lineHeight: "lg",
    fontSize: "15px",
    pb: 2,
  })
);

const StyledUL = styled("ul")({
  li: {
    pb: 2,
  },
});
