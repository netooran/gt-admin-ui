import styled from 'styled-components';
import PropTypes from 'prop-types';
import Pagination from 'shared/Table/Pagination/Pagination';
import Button from 'shared/Button/Button';

const Wrapper = styled.div`
  display: flex;
  padding: 1rem;
  justify-content: space-between;
`;

const Footer = ({
  options,
  page,
  noOfpages,
  setPage,
  hasSelection,
  removeSelected,
}) => {
  const { deletable, paginatable } = options;
  const isTableNotEmpty = !!noOfpages;

  return (
    <Wrapper>
      {deletable && isTableNotEmpty && (
        <Button
          aria-label="Delete selected"
          variant="solid"
          importance="danger"
          disabled={!hasSelection}
          onClick={removeSelected}
        >
          Delete Selected
        </Button>
      )}
      {paginatable && isTableNotEmpty && (
        <Pagination page={page} noOfpages={noOfpages} goto={setPage} />
      )}
    </Wrapper>
  );
};

Footer.propTypes = {
  options: PropTypes.shape({
    deletable: PropTypes.bool,
    paginatable: PropTypes.bool,
  }),
  page: PropTypes.number,
  noOfpages: PropTypes.number,
  hasSelection: PropTypes.bool,
  setPage: PropTypes.func,
  removeSelected: PropTypes.func,
};

export default Footer;
