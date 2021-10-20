import { ReactNode } from "react";
import styled from "styled-components";
import css from "@styled-system/css";
import { StyledSystemProps, all } from "components/system";
import { variant } from "styled-system";
import Heading from "components/Heading";
import Box, { BoxProps } from "components/Box";
import Icon, { IconName } from "components/Icon";
import { Centrator } from "components/Layout";
import terminalUrl from "./assets/terminal.png";
import waveUrl from "./assets/wave.png";
import wavelight from "sharedAssets/images/wave-light.png";

const fourUpBg = `url(${wavelight}) 0px 0px no-repeat`;
const waveBg = `url(${waveUrl}) -477px 73px no-repeat`;
const terminalBg = `url(${terminalUrl}) right center no-repeat`;

type Child = React.ReactElement<typeof ListItem>;
type Size = "sm" | "md";

export type Props = {
  children: Child | Array<Child>;
  description?: ReactNode;
  fourUp?: boolean;
  grid?: boolean;
  hideImage?: boolean;
  title?: string;
  subtitle?: string;
  titleFontSize?: string | string[];
  titleFontWeight?: string | string[];
} & BoxProps;

function List({
  title,
  subtitle,
  titleFontSize,
  titleFontWeight,
  description,
  hideImage = false,
  fourUp = false,
  grid = false,
  children,
  ...props
}: Props) {
  const noImage = grid || hideImage;
  return (
    <Box
      as="section"
      background={fourUp ? fourUpBg : waveBg}
      pb={[6, 11]}
      width="100%"
      {...props}
    >
      <Centrator flexDirection="column">
        <Heading
          title={title}
          subtitle={subtitle}
          titleFontSize={titleFontSize}
          titleFontWeight={titleFontWeight}
        />
        {description}
        <Box
          background={noImage ? undefined : ["none", "none", terminalBg]}
          backgroundSize={noImage ? undefined : ["", "", "384px 320px"]}
          mt={grid ? [0, 5] : 0}
        >
          <StyledUL grid={[false, grid]}>{children}</StyledUL>
        </Box>
      </Centrator>
    </Box>
  );
}

type ListItemProps = {
  children: ReactNode;
  size?: Size;
  icon?: IconName;
  src?: string;
  title: string;
} & BoxProps;

export function ListItem({
  children,
  src,
  icon,
  size = "md",
  title,
  ...props
}: ListItemProps) {
  const iconSize = size === "md" ? "40px" : "32px";
  return (
    <StyledItem {...props}>
      {(icon || src) && (
        <StyledIconWrapper width={iconSize} height={iconSize}>
          {icon ? (
            <Icon
              name={icon}
              size={size === "md" ? "xl" : "lg"}
              color="dark-purple"
            />
          ) : (
            <Box as="img" alt={title} src={src} width="100%" height="100%" />
          )}
        </StyledIconWrapper>
      )}
      <Box>
        <StyledItemTitle size={size}>{title}</StyledItemTitle>
        <StyledContentWrapper size={size}>{children}</StyledContentWrapper>
      </Box>
    </StyledItem>
  );
}

List.Item = ListItem;

export default List;

const StyledIconWrapper = styled(Icon)(
  css({
    position: "absolute",
    left: 0,
    top: 0,
  }),
  all
);

interface WrapperProps extends StyledSystemProps {
  size?: Size | Size[];
}

const StyledItemTitle = styled("h3")<WrapperProps>(
  css({
    fontSize: "header-4",
    fontWeight: "bold",
    lineHeight: "lg",
    py: 1,
    mt: 0,
    mb: 3,
    ml: "52px",
  }),
  variant({
    prop: "size",
    variants: {
      sm: {
        color: "dark-gray",
        fontSize: "text-lg",
        lineHeight: "md",
        py: 1,
      },
    },
  })
);

const StyledContentWrapper = styled("div")<WrapperProps>(
  css({
    fontSize: "text-lg",
    lineHeight: "28px",
    color: "darkest",
    ml: "52px",
  }),
  variant({
    prop: "size",
    variants: {
      sm: {
        color: "dark-gray",
        lineHeight: "md",
      },
    },
  })
);

const StyledItem = styled("li")(
  css({
    position: "relative",
    boxSizing: "border-box",
    display: "flex",
    mt: 7,
  }),
  all
);

interface ULProps extends StyledSystemProps {
  grid?: boolean | boolean[];
}

const StyledUL = styled("ul")<ULProps>(
  css({
    listStyle: "none",
    m: 0,
    p: 0,
    maxWidth: ["100%", "100%", "60%"],
  }),
  variant({
    prop: "grid",
    variants: {
      true: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        maxWidth: ["100%", "100%", "100%"],
        [StyledIconWrapper]: {
          left: "40px",
        },
        [StyledItem]: {
          width: "33%",
          mt: 0,
          pl: 6,
          "&:nth-child(3n+1)": {
            pl: 0,
            [StyledIconWrapper]: {
              left: 0,
            },
          },
          "&:nth-child(n + 4)": {
            mt: 6,
          },
          [`${StyledContentWrapper}`]: { ml: 0 },
        },
      },
      fourUp: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        maxWidth: ["100%", "100%", "100%"],
        [StyledIconWrapper]: {
          left: "40px",
        },
        [StyledItem]: {
          width: "25%",
          mt: 0,
          pl: 6,
          [`${StyledContentWrapper}`]: { ml: 0 },
        },
      },
    },
  })
);
