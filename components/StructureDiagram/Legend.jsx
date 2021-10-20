/*
  NPM PACKAGES
*/
import React from "react";
import styled from "styled-components";

/*
  HELPERS
*/
import colors from "./colors";

const Lengend = () => {
  return (
    <StyledLengend>
      <ul>
        <li>
          <Bullet color="green"></Bullet>
          User Connections
        </li>
        <li>
          <Bullet color="red"></Bullet>
          Audit Information
        </li>
      </ul>
    </StyledLengend>
  );
};

const Bullet = styled.div`
  background: ${(props) => colors[props.color] || colors.greyLight};
  border-radius: 2px;
  height: 12px;
  width: 12px;
  position: absolute;
  left: 0;
  top: 2px;
`;

const StyledLengend = styled.div`
  box-sizing: border-box;
  padding: 0 24px;
  position: absolute;
  bottom: 0px;
  right: 0;
  width: 280px;
  z-index: 1;

  ul {
    margin: 0;
    list-style-type: none;
  }

  li {
    color: ${colors.greyDark};
    font-size: 11px !important;
    text-transform: uppercase;
    line-height: 16px !important;
    margin: 0 0 16px 0 !important;
    padding-left: 24px;
    position: relative;
  }
`;

export default Lengend;
