import styled from 'styled-components';

const StyledInput = styled.input`
  background-color: var(--control-bg-color);
`;

const Checkbox = ({ ...props }) => {
  return <StyledInput {...props} type="checkbox" />;
};

export default Checkbox;
