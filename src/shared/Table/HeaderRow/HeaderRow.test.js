import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HeaderRow from './HeaderRow';

test('renders header row with select all', () => {
  const props = {
    options: { selectable: true },
    columns: ['name', 'email'],
    isSelected: false,
    selectAll: jest.fn(),
  };

  const { container, getByRole } = render(<HeaderRow {...props} />);

  expect(container).toMatchSnapshot();

  userEvent.click(getByRole('checkbox'));
  expect(getByRole('checkbox')).toBeChecked();
  expect(props.selectAll).toHaveBeenLastCalledWith(true);
});

test('renders header row without select all', () => {
  const props = { options: { selectable: false }, columns: ['name', 'email'] };
  const { container } = render(<HeaderRow {...props} />);
  expect(container).toMatchSnapshot();
});

test('renders header row with actions', () => {
  const props = {
    options: { selectable: false, editable: true, deletable: false },
    columns: ['name', 'email'],
  };
  const { container } = render(<HeaderRow {...props} />);
  expect(container).toMatchSnapshot();
});

test('renders header row without actions', () => {
  const props = {
    options: { selectable: false, editable: false },
    columns: ['name', 'email'],
  };
  const { container } = render(<HeaderRow {...props} />);
  expect(container).toMatchSnapshot();
});
