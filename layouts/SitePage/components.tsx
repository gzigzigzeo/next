import styled from "styled-components";
import css from "@styled-system/css";
import BaseCode from "components/Code";
import BaseLink, { LinkProps } from "components/Link";
import {
  Code,
  P,
  UL,
  OL,
  LI,
  Video,
  Image,
  Figure,
  IFrame,
} from "components/MDX";

const StyledTable = styled("table")(
  css({
    width: "100%",
    borderCollapse: "collapse",
    boxShadow: "0 1px 4px rgb(0, 0, 0, .24)",
    lineHeight: "md",
    mb: 5,
    "&:last-child": {
      mb: 0,
    },
    thead: {
      tr: {
        backgroundColor: "dark-purple",
      },
      th: {
        py: 2,
        px: 3,
        fontSize: "text-sm",
        textTransform: "uppercase",
        whiteSpace: ["auto", "nowrap"],
        color: "white",
        textAlign: "left",
      },
    },
    tbody: {
      "tr:nth-child(2n)": {
        bg: "lightest-gray",
      },
      td: {
        p: 3,
        fontSize: "text-md",
        verticalAlign: "top",
      },
      "ul > li": {
        fontSize: "text-md",
      },
    },
  })
);

const StyledH1 = styled("h1")(
  css({
    mt: 2,
    mb: 5,
    fontSize: "header-2",
    fontWeight: "black",
    lineHeight: "xl",
    color: "black",
  })
);

const StyledH2 = styled("h2")(
  css({
    mt: 5,
    mb: 2,
    fontSize: "header-3",
    fontWeight: "regular",
    lineHeight: "lg",
    color: "dark-purple",
    "&:last-child": {
      mb: 0,
    },
  })
);

const StyledH3 = styled("h3")(
  css({
    my: 2,
    fontSize: "text-lg",
    fontWeight: "bold",
    lineHeight: "lg",
    color: "black",
    "&:last-child": {
      mb: 0,
    },
  })
);

export const components = {
  inlineCode: Code,
  img: Image,
  iframe: IFrame,
  h1: StyledH1,
  h2: StyledH2,
  h3: StyledH3,
  p: P,
  ul: UL,
  ol: OL,
  li: LI,
  table: StyledTable,
  video: Video,
  code: BaseCode,
  a: function Link(props: LinkProps) {
    return <BaseLink {...props} scheme="site" />;
  },
  Figure,
};
