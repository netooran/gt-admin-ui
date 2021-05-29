import { fireEvent, render, screen } from '@testing-library/react';
import Footer from './Footer';

test('renders footer with pagination', () => {
  const props = {
    options: { paginatable: true },
    page: 1,
    noOfpages: 2,
    setPage: jest.fn(),
  };
  const { container } = render(<Footer {...props} />);
  expect(container).toMatchSnapshot();

  fireEvent.click(screen.getByText('2'));
  expect(props.setPage).toHaveBeenCalledWith(2);
});

describe('Footer with select all actions', () => {
  test('renders delete selected button disabled', () => {
    const props = {
      options: { deletable: true },
      noOfpages: 1,
      hasSelection: false,
      removeSelected: jest.fn(),
    };

    const { container } = render(<Footer {...props} />);
    expect(container).toMatchSnapshot();

    fireEvent.click(screen.getByText('Delete Selected'));
    expect(props.removeSelected).not.toHaveBeenCalled();
  });

  test('renders delete selected button active', () => {
    const props = {
      options: { deletable: true },
      noOfpages: 1,
      hasSelection: true,
      removeSelected: jest.fn(),
    };

    const { container } = render(<Footer {...props} />);
    expect(container).toMatchSnapshot();

    fireEvent.click(screen.getByText('Delete Selected'));
    expect(props.removeSelected).toHaveBeenCalled();
  });

  test('renders no pagination & delete button given no page', () => {
    const props = {
      options: { deletable: true },
      noOfpages: 0,
      hasSelection: true,
      removeSelected: jest.fn(),
    };
    const { container } = render(<Footer {...props} />);
    expect(container).toMatchSnapshot();
  });
});
