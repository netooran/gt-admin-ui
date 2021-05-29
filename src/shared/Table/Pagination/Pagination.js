import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  ChevronLeft,
  ChevronsLeft,
  ChevronRight,
  ChevronsRight,
} from '@styled-icons/boxicons-solid';
import Button from 'shared/Button/Button';
import ButtonGroup from 'shared/ButtonGroup/ButtonGroup';
import { ArrayUtils } from 'utils/utils/utils';

const StyledButton = styled(Button)`
  --button-primary-color: #1890ff;
`;

const Pagination = ({ page, noOfpages, goto, noOfPagesToDisplay = 5 }) => {
  const hasPrevious = page === 1;
  const hasNext = page === noOfpages;

  const getPages = () => {
    const offset = page > noOfPagesToDisplay ? page - noOfPagesToDisplay : 0;
    return ArrayUtils.range(noOfpages).slice(
      offset,
      offset + noOfPagesToDisplay
    );
  };

  return (
    <ButtonGroup>
      <StyledButton
        aria-label="Go to first page"
        onClick={() => goto(1)}
        disabled={hasPrevious}
        variant="solid"
        shape="round"
      >
        <ChevronsLeft />
      </StyledButton>
      <StyledButton
        aria-label="Go to previous page"
        onClick={() => goto(page - 1)}
        disabled={hasPrevious}
        variant="solid"
        shape="round"
      >
        <ChevronLeft />
      </StyledButton>
      {getPages().map((pageNumber, i) => (
        <StyledButton
          aria-label={`Go to page ${pageNumber}`}
          key={i}
          onClick={() => goto(pageNumber)}
          variant={page === pageNumber ? 'outline' : 'solid'}
          shape="round"
        >
          {pageNumber}
        </StyledButton>
      ))}
      <StyledButton
        aria-label="Go to next page"
        onClick={() => goto(page + 1)}
        disabled={hasNext}
        variant="solid"
        shape="round"
      >
        <ChevronRight />
      </StyledButton>
      <StyledButton
        aria-label="Go to last page"
        onClick={() => goto(noOfpages)}
        disabled={hasNext}
        variant="solid"
        shape="round"
      >
        <ChevronsRight />
      </StyledButton>
    </ButtonGroup>
  );
};

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  noOfpages: PropTypes.number.isRequired,
  noOfPagesToDisplay: PropTypes.number,
  goto: PropTypes.func.isRequired,
};

export default Pagination;
