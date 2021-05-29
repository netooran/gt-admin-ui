import styled from 'styled-components';

export const ViewPort = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const Center = styled.div`
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
`;

export const Flex = styled.div`
  display: flex;
`;

export const Row = styled(Flex)`
  flex-direction: row;
`;

export const Column = styled(Flex)`
  flex-direction: column;
`;
