import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Center } from 'shared/Containers/Containers';
import { Planet } from '@styled-icons/boxicons-solid';

const Wrapper = styled(Center)`
  width: 100%;
  height: 100%;

  div {
    text-align: center;
  }

  h1 {
    color: darkgray;
  }
  svg {
    fill: #e5e5e5;
  }
`;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    const { children } = this.props;
    if (this.state.hasError) {
      return (
        <Wrapper>
          <div>
            <Planet />
            <h1>Something went wrong</h1>
          </div>
        </Wrapper>
      );
    }
    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node,
  retry: PropTypes.func,
};

export default ErrorBoundary;
