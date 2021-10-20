/*
NPM PACKAGES
*/
import styled, { keyframes } from "styled-components";

/*
  HELPERS
*/
import colors from "./colors";

const breath = keyframes`
  0% { 
    box-shadow: 0 1px 4px rgba(96, 125, 139, .24);
  }
  50% { 
    box-shadow: 0 4px 16px rgba(96, 125, 139, .56);
  }
  100% { 
    box-shadow: 0 1px 4px rgba(96, 125, 139, .24);
  }
`;

const Color = (props) => {
  const colorSelected = colors[props.color] || colors.grey;

  return {
    border: `2px solid ${colorSelected}`,
    color: colorSelected,
  };
};

const ServiceButton = styled.div`
  position: absolute;
  left: -32px;
  top: 308px;
  margin-top: -64px;
  z-index: 10;

  button {
    animation: ${(props) => (props.glow ? breath : "")} 3s linear infinite;
    background: #fff;
    border-radius: 300px;
    box-shadow: ${(props) =>
      props.selected
        ? "0 8px 32px rgba(0, 0, 0, .24)"
        : "0 1px 4px rgba(0, 0, 0, .24)"};
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    height: 64px;
    outline: none;
    transition: all 0.3s;
    width: 64px;
    ${Color}

    &:hover {
      box-shadow: ${(props) =>
        props.selected
          ? "0 8px 32px rgba(0, 0, 0, .24)"
          : "0 4px 16px rgba(0, 0, 0, .24)"};
    }
  }

  p {
    background: #fff;
    border-radius: 30px;
    color: ${(props) => colors[props.color] || colors.grey};
    font-size: 12px;
    font-weight: normal;
    margin: 0;
    left: -30%;
    line-height: 16px;
    position: absolute;
    right: -30%;
    bottom: -24px;
    text-align: center;
  }
`;

const DiagramButton = styled.button`
  border: 1px solid
    ${(props) => (props.selected ? colors.purple : "transparent")};
  background: ${(props) => (props.selected ? colors.white : "transparent")};
  box-shadow: ${(props) =>
    props.selected ? "0 4px 16px rgba(0, 0, 0, .24)" : "none"};
  border-radius: 4px;
  color: ${colors.blueLight};
  cursor: pointer;
  display: flex;
  font-size: 12px;
  justify-content: center;
  margin-bottom: 32px;
  outline: none;
  position: relative;
  width: 100px;
  transition: all 0.3s;
  text-align: center;

  &.is-small {
    margin-bottom: 16px;

    h4 {
      font-size: 10px;
    }

    img {
      height: 50px;
      margin: 0;
    }
  }

  &:hover {
    background: rgba(255, 255, 255, 0.56);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.24);
  }

  h4 {
    color: ${colors.grey};
    font-size: 11px;
    font-weight: normal;
    text-transform: uppercase;
    left: 0;
    line-height: 16px;
    margin: 0;
    position: absolute;
    right: 0;
    text-align: center;
    bottom: -16px;
  }

  img {
    margin: 0;
    height: 65px;
  }
`;

export { DiagramButton, ServiceButton };
