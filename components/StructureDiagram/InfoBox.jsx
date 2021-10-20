/*
  NPM PACKAGES
*/
import React from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";

/*
  HELPERS
*/
import colors from "./colors";

const InfoBox = ({ title, description }) => {
  return (
    <StyledInfoBox>
      <h3>{title}</h3>
      <p>{description}</p>
    </StyledInfoBox>
  );
};

InfoBox.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  cta: PropTypes.string,
  url: PropTypes.string,
};

const fadeIn = keyframes`
  from {
    transform: scale(.5);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const StyledInfoBox = styled.div`
  animation: ${fadeIn} 0.3s linear;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.24);
  border-radius: 8px;
  box-sizing: border-box;
  background: white;
  margin: 0 auto;
  padding: 24px;
  position: absolute;
  top: 32px;
  right: 0;
  width: 280px;
  z-index: 1;

  h3 {
    color: ${colors.greyDark};
    font-size: 16px;
    line-height: 32px;
    margin: 0 0 8px 0;
    text-transform: uppercase;
  }

  p {
    color: ${colors.greyDark};
    font-size: 14px;
    line-height: 24px;
    margin: 0;
  }
`;

export default InfoBox;
