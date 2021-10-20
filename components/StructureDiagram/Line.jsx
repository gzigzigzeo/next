/*
NPM PACKAGES
*/
import styled, { keyframes } from "styled-components";

/*
  HELPERS
*/
import colors from "./colors";

const barberpole = keyframes`
  from { background-position: 0 0; }
  to { background-position: 60px 30px; }
`;

const Color = (props) => {
  switch (props.color) {
    case "red":
      return {
        backgroundSize: "8px 8px",
        backgroundImage: `linear-gradient(
          45deg, 
          ${colors.red}  25%, 
          transparent    25%, 
          transparent    50%, 
          ${colors.red}  50%, 
          ${colors.red}  75%, 
          transparent    75%, 
          transparent
        )`,
      };

    case "green":
      return {
        backgroundSize: "8px 8px",
        backgroundImage: `linear-gradient(
          45deg, 
          ${colors.green}  25%, 
          transparent      25%, 
          transparent      50%, 
          ${colors.green}  50%, 
          ${colors.green}  75%, 
          transparent      75%, 
          transparent
        )`,
      };

    default:
      return {
        background: colors[props.color] || colors.greyLight,
      };
  }
};

const Direction = (props) => {
  switch (props.direction) {
    case "horizontal":
      return {
        height: "3px",
      };

    case "vertical":
      return {
        width: "3px",
      };

    default:
      return {
        height: `3px`,
      };
  }
};

const Line = styled.div`
  animation: ${barberpole} 4s linear infinite;
  border-radius: 20px;
  position: absolute;
  z-index: 1;
  opacity: 0.56;
  ${Color}
  ${Direction}
`;
export default Line;
