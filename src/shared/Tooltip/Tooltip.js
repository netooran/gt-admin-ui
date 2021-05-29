import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import AppConstants from '../../constants';

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  padding: 0.5rem 0;
  font-size: 0.75rem;

  & span {
    visibility: ${({ showTooltip }) => (showTooltip ? 'visible' : 'hidden')};
    width: 120px;
    background-color: black;
    color: #fff;
    text-align: center;
    padding: 0.5rem;
    border-radius: 6px;
    top: 100%;
    left: 50%;
    margin-left: -60px;

    position: absolute;
    z-index: 1;
  }

  &:hover span {
    visibility: visible;
  }

  & span::after {
    content: ' ';
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-left: -12px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent black transparent;
  }
`;

const Tooltip = ({ message, children, showTooltipOnLoad = false }) => {
  const [showTooltip, setShowTooltip] = useState(showTooltipOnLoad);

  useEffect(() => {
    showTooltip &&
      setTimeout(() => setShowTooltip(false), AppConstants.tootipActiveTime);
  }, [showTooltip]);

  return (
    <Wrapper showTooltip={showTooltip}>
      {children}
      <span>{message}</span>
    </Wrapper>
  );
};

Tooltip.propTypes = {
  message: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  showTooltipOnLoad: PropTypes.bool,
};

export default Tooltip;
