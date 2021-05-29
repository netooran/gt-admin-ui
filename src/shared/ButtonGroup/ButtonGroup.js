import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  display: flex;

  button {
    margin-right: 0.5rem;
  }
`;

const ButtonGroup = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

ButtonGroup.propTypes = {
  children: PropTypes.array.isRequired,
};

export default ButtonGroup;
