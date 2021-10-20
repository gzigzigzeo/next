/*
NPM PACKAGES
*/
import styled from "styled-components";

/*
  HELPERS
*/
import colors from "./colors";

const Direction = (props) => {
  switch (props.direction) {
    case "top":
      return {
        borderBottom: `8px solid ${colors[props.color]}`,
      };

    case "bottom":
      return {
        borderTop: `8px solid ${colors[props.color]}`,
      };

    case "left":
      return {
        borderRight: `8px solid ${colors[props.color]}`,
      };

    case "right":
      return {
        borderLeft: `8px solid ${colors[props.color]}`,
      };

    default:
      return {
        borderLeft: `8px solid ${colors[props.color]}`,
      };
  }
};

const Arrow = styled.div`
  position: absolute;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  opacity: 0.56;
  z-index: 3;
  ${Direction}
`;

export default Arrow;
