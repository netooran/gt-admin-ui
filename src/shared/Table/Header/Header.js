import styled from 'styled-components';
import PropTypes from 'prop-types';
import Input from 'shared/Input/Input';

const Wrapper = styled.div`
  padding: 1rem;
`;

const Header = ({ options, search, searchPlaceholderText = 'Search...' }) => {
  const { searchable } = options;

  return (
    <Wrapper>
      {searchable && (
        <Input
          type="text"
          role="search"
          aria-label="Search"
          placeholder={searchPlaceholderText}
          onChange={search}
          padding=".25rem 1rem"
        />
      )}
    </Wrapper>
  );
};

Header.propTypes = {
  searchable: PropTypes.bool,
  searchPlaceholderText: PropTypes.string,
  search: PropTypes.func,
  options: PropTypes.shape({
    searchable: PropTypes.bool,
  }),
};

export default Header;
