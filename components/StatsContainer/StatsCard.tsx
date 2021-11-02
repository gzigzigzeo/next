import css from "@styled-system/css";
import styled from "styled-components";
import Box from "components/Box";

export interface StatsCardProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export function StatsCard({ title, description, children }: StatsCardProps) {
  return (
    <StyledItem>
      <StyledTitle>{title}</StyledTitle>
      <Box as="p" fontSize="text-xl" mt={[2, 3]}>
        {description}
      </Box>
      {children}
    </StyledItem>
  );
}

const StyledItem = styled("li")(
  css({
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    py: [2, 5],
    px: [3, 2],
    borderRadius: "md",
    boxShadow: "0 1px 4px rgb(0 0 0 / 12%)",
  })
);

const StyledTitle = styled("p")(
  css({
    color: "dark-purple",
    fontSize: "hero-header",
    lineHeight: "hero-header",
    my: 0,
    fontWeight: "black",
  })
);
