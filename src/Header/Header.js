import styled from 'styled-components';
import { Moon, Sun } from '@styled-icons/boxicons-solid';
import { useDarkMode } from 'hooks';

const StyledHeader = styled.header`
  display: flex;
  justify-content: flex-end;
  padding: 2rem 3rem;
  height: 2.2rem;

  svg {
    width: 2rem;
    cursor: pointer;

    :hover {
      width: 2.2rem;
    }
  }
`;

const Header = () => {
  const [isDarkModeOn, toggleDarkMode] = useDarkMode();

  const Icon = isDarkModeOn ? Sun : Moon;

  return (
    <StyledHeader>
      <Icon
        fill={isDarkModeOn ? '#d89211' : 'inherit'}
        onClick={toggleDarkMode}
      />
    </StyledHeader>
  );
};

export default Header;
