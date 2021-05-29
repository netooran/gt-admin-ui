import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from './Pagination';

const mockGoto = jest.fn();

const assertGotoPageToHaveBeencalled = (label, page, disabled = false) => {
  mockGoto.mockClear();

  userEvent.click(screen.getByLabelText(label));

  if (disabled) expect(mockGoto).not.toHaveBeenCalled();
  else expect(mockGoto).toHaveBeenCalledWith(page);
};

const assertGotoPageToNotHaveBeencalled = (...args) =>
  assertGotoPageToHaveBeencalled(...args, true);

test('renders pagination with 1st page active', () => {
  const props = {
    page: 1,
    noOfpages: 5,
    goto: mockGoto,
  };

  const { container } = render(<Pagination {...props} />);
  expect(container).toMatchSnapshot();

  assertGotoPageToNotHaveBeencalled('Go to first page', 1);
  assertGotoPageToNotHaveBeencalled('Go to previous page', 1);
  assertGotoPageToHaveBeencalled('Go to page 3', 3);
  assertGotoPageToHaveBeencalled('Go to next page', 2);
  assertGotoPageToHaveBeencalled('Go to last page', 5);
});

test('renders pagination with last page active', () => {
  const props = { page: 5, noOfpages: 5, goto: mockGoto };

  const { container } = render(<Pagination {...props} />);
  expect(container).toMatchSnapshot();

  assertGotoPageToHaveBeencalled('Go to first page', 1);
  assertGotoPageToHaveBeencalled('Go to previous page', 4);
  assertGotoPageToHaveBeencalled('Go to page 3', 3);
  assertGotoPageToNotHaveBeencalled('Go to next page', 5);
  assertGotoPageToNotHaveBeencalled('Go to last page', 5);
});

test('renders pagination with a page in the middle active', () => {
  const props = { page: 3, noOfpages: 5, goto: mockGoto };

  const { container } = render(<Pagination {...props} />);
  expect(container).toMatchSnapshot();

  assertGotoPageToHaveBeencalled('Go to first page', 1);
  assertGotoPageToHaveBeencalled('Go to previous page', 2);
  assertGotoPageToHaveBeencalled('Go to next page', 4);
  assertGotoPageToHaveBeencalled('Go to last page', 5);
});

test('renders pagination with a page greater than default pages to display (5)', () => {
  const props = { page: 6, noOfpages: 10, goto: mockGoto };
  const { container } = render(<Pagination {...props} />);
  expect(container).toMatchSnapshot();
});
