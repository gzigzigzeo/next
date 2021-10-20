import styled from "styled-components";
import Flex from "components/Flex";

/**
 * This is the News component on the homepage underneath Get Started button in the header
 */

interface NewsItemProps {
  children: React.ReactNode;
}
export const NewsItem = ({ children }: NewsItemProps) => {
  return (
    <Flex flexDirection="row" ml={11} mt={2}>
      <StyledNewsImg>NEW</StyledNewsImg>
      <Flex ml={3} fontSize="14px">
        {children}
      </Flex>
    </Flex>
  );
};

const StyledNewsImg = styled("div")({
  color: "white",
  textAlign: "center",
  backgroundColor: "#00BFA5",
  borderRadius: "200px",
  fontSize: "11px",
  fontWeight: "bold",
  width: "44px",
});
