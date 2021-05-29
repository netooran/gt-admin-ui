import { Loader } from '@styled-icons/boxicons-regular';
import styled from 'styled-components';
import { Center } from '../Containers/Containers';

const Wrapper = styled(Center)`
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  animation: spin 2s linear infinite;

  svg {
    width: 3rem;
  }
`;

const Spinner = () => {
  return (
    <Wrapper aria-label="Loading">
      <Loader />
    </Wrapper>
  );
};

export default Spinner;
