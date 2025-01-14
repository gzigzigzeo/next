import { useRef, useState, useCallback, ReactNode } from "react";
import styled, { keyframes, css as styledCss } from "styled-components";
import css from "@styled-system/css";
import { transition, media } from "components/system";
import Icon from "components/Icon";
import { FlexProps } from "components/Flex";
import HeadlessButton from "components/HeadlessButton";

const TIMEOUT = 1000;
export interface CommandProps {
  children: ReactNode;
}

export default function Command({
  children,
  ...props
}: CommandProps & FlexProps) {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const codeRef = useRef<HTMLDivElement>();

  const handleCopy = useCallback(() => {
    if (!navigator.clipboard) {
      return;
    }

    if (codeRef.current) {
      navigator.clipboard.writeText(codeRef.current.innerText);
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, TIMEOUT);
    }
  }, []);

  return (
    <StyledCommand {...props} ref={codeRef}>
      <StyledHeadlessButton onClick={handleCopy}>
        {isCopied ? (
          <Icon size="sm" name="check" />
        ) : (
          <Icon size="sm" name="copy" />
        )}
      </StyledHeadlessButton>
      {children}
    </StyledCommand>
  );
}

const shiftButton = keyframes`
  0% {
    opacity: 0;
    transform: translateX(3px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const StyledCommand = styled("div")(
  css({
    display: "flex",
    flexDirection: "column",
    position: "relative",
    width: "100%",
    color: "white",
    backgroundColor: "code",
    mx: -3,
    px: 3,
    py: [1, 0],
    fontSize: "text-md",
    lineHeight: "md",
    transition: transition([["backgroundColor", "interaction"]]),

    "& > span:first-of-type::before": {
      content: "attr(data-content)",
    },

    "&:hover, &:focus": {
      backgroundColor: "darkest",
    },

    "&:hover button, &:focus button": {
      display: "flex",
    },
  }),
  media("sm", {
    backgroundColor: "darkest",
    overflow: "scroll",
    "& + &": {
      marginTop: 1,
    },
  })
);

const StyledHeadlessButton = styled(HeadlessButton)(
  css({
    display: "none",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: -3,
    margin: 0,
    pl: 1,
    pr: 2,
    py: 1,
    color: "light-gray",
    bg: "darkest",
    cursor: "pointer",
    borderTopLeftRadius: "default",
    borderBottomLeftRadius: "default",
    opacity: 0,
    animationDuration: "0.3s",
    animationFillMode: "forwards",
    transition: transition([["color", "interaction"]]),
    transform: "translateX(3px)",
    appearance: "none",

    "&:hover, &:focus, &:active": {
      color: "white",
      outline: "none",
    },
  }),
  styledCss`animation-name: ${shiftButton};`,
  media("sm", {
    display: "none",
    animationName: "none",
    position: "initial",
    transform: "translateX(0)",
    ml: -1,
  })
);
