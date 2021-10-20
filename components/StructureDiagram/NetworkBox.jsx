/*
  NPM PACKAGES
*/
import styled from "styled-components";

/*
  HELPERS
*/
import colors from "./colors";

const NetworkBox = styled.div`
  border: 1px dashed ${colors.greyLight};
  border-radius: 8px;
  box-sizing: border-box;
  background: white;
  bottom: 0;
  margin: 0 auto;
  padding: 32px;
  position: absolute;
  top: 32px;
  text-align: center;
  z-index: 1;

  h2 {
    color: ${colors.grey};
    font-size: 14px;
    font-weight: 400;
    line-height: 32px;
    margin: 0;
    position: absolute;
    text-align: center;
    text-transform: uppercase;
    top: -32px;
    left: 0px;
    right: 0px;
    z-index: 1;
  }
`;

export default NetworkBox;
