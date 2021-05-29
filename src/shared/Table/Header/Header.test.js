import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './Header';

test('renders header with search', () => {
  const props = {
    options: { searchable: true },
    search: jest.fn(),
    searchPlaceholderText: 'Search by name or email',
  };

  const { container, getByRole } = render(<Header {...props} />);

  expect(container).toMatchSnapshot();

  userEvent.type(getByRole('search'), 'Ale');
  expect(getByRole('search')).toHaveValue('Ale');
  expect(props.search).toHaveBeenLastCalledWith('Ale');
});

test('renders header without search', () => {
  const props = { options: { searchable: false } };
  const { container } = render(<Header {...props} />);
  expect(container).toMatchSnapshot();
});
