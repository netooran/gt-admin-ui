import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMockResource } from 'utils/resource/resource';
import Table from './Table';

const mockEmptyResource = createMockResource([], 'Api error');
const mockResource = createMockResource(
  [
    { id: '1', name: 'Alex', email: 'alex@protonmail.com', role: 'admin' },
    { id: '2', name: 'Chris', email: 'chris@protonmail.com', role: 'admin' },
  ],
  'Api error'
);

const mockValidate = jest.fn();

const columns = [
  { name: 'name', validate: mockValidate },
  { name: 'email', validate: mockValidate },
];

const options = {
  editable: true,
  deletable: true,
  selectable: true,
  paginatable: true,
  searchable: true,
};

test('renders plain table', () => {
  const props = { dataResource: mockResource.success, columns };
  const { container } = render(<Table {...props} />);
  expect(container).toMatchSnapshot();
});

test('renders empty table', () => {
  const props = { dataResource: mockEmptyResource.success, columns };
  const { container } = render(<Table {...props} />);
  expect(container).toMatchSnapshot();
});

test('renders paginated table with edit, delete, search & select functions', () => {
  const props = { options, dataResource: mockResource.success, columns };
  const { container } = render(<Table {...props} />);
  expect(container).toMatchSnapshot();
});

test('search table', () => {
  const props = { options, dataResource: mockResource.success, columns };

  const { container } = render(<Table {...props} />);

  expect(container).toMatchSnapshot();
  expect(screen.getAllByRole('row')).toHaveLength(3);

  userEvent.type(screen.getByRole('search'), 'Alex');
  expect(container).toMatchSnapshot();
  expect(screen.getAllByRole('row')).toHaveLength(2);
});

describe('Select', () => {
  test('select all rows', () => {
    const props = { options, dataResource: mockResource.success, columns };

    const { container } = render(<Table {...props} />);
    expect(container).toMatchSnapshot();

    userEvent.click(screen.getByLabelText('Select all'));
    expect(container).toMatchSnapshot();

    userEvent.click(screen.getByLabelText('Select all'));
    expect(container).toMatchSnapshot();
  });

  test('unselect a row from all selection', () => {
    const props = { options, dataResource: mockResource.success, columns };

    const { container } = render(<Table {...props} />);

    userEvent.click(screen.getByLabelText('Select all'));
    userEvent.click(screen.getAllByLabelText('Select row')[0]);
    expect(container).toMatchSnapshot();
  });
});

describe('Delete', () => {
  test('delete a row from table', () => {
    const props = { options, dataResource: mockResource.success, columns };

    const { container } = render(<Table {...props} />);

    expect(container).toMatchSnapshot();
    expect(screen.getAllByRole('row')).toHaveLength(3);

    userEvent.click(screen.getAllByLabelText('Delete')[0]);
    expect(container).toMatchSnapshot();
    expect(screen.getAllByRole('row')).toHaveLength(2);
  });

  test('delete all rows from table', () => {
    const props = {
      options,
      dataResource: mockResource.success,
      columns,
      pageSize: 1,
    };

    const { container } = render(<Table {...props} />);

    expect(container).toMatchSnapshot();
    expect(screen.getAllByRole('row')).toHaveLength(2);
    expect(screen.getByLabelText('Go to last page')).toBeEnabled();

    userEvent.click(screen.getByLabelText('Select all'));
    userEvent.click(screen.getByLabelText('Delete selected'));
    expect(container).toMatchSnapshot();
    expect(screen.getAllByRole('row')).toHaveLength(2);
    expect(screen.getByLabelText('Go to last page')).toBeDisabled();
  });

  test('delete selected row from table', () => {
    const props = { options, dataResource: mockResource.success, columns };

    const { container } = render(<Table {...props} />);

    expect(container).toMatchSnapshot();
    expect(screen.getAllByRole('row')).toHaveLength(3);

    userEvent.click(screen.getAllByLabelText('Select row')[0]);
    userEvent.click(screen.getByLabelText('Delete selected'));
    expect(container).toMatchSnapshot();
    expect(screen.getAllByRole('row')).toHaveLength(2);
  });
});

describe('Modify row', () => {
  test('modify row without validation erros ', () => {
    mockValidate.mockImplementationOnce(() => [true]);
    const props = { options, dataResource: mockResource.success, columns };

    const { container } = render(<Table {...props} />);
    expect(container).toMatchSnapshot();

    fireEvent.click(screen.getAllByLabelText('Edit')[0]);
    userEvent.type(screen.getByDisplayValue('Alex'), 'Alexander');
    const emailInput = screen.getByDisplayValue('alex@protonmail.com');
    emailInput.setSelectionRange(0, 4);
    userEvent.type(emailInput, 'alexander');
    fireEvent.click(screen.getAllByLabelText('Save')[0]);

    expect(container).toMatchSnapshot();
    expect(screen.getByDisplayValue('Alexander')).toBeInTheDocument();
    expect(
      screen.getByDisplayValue('alexander@protonmail.com')
    ).toBeInTheDocument();
  });

  test('modify row with validation erros ', () => {
    mockValidate.mockImplementation(() => [false, 'Validation failed']);
    const props = { options, dataResource: mockResource.success, columns };

    const { container } = render(<Table {...props} />);
    expect(container).toMatchSnapshot();

    fireEvent.click(screen.getAllByLabelText('Edit')[0]);
    userEvent.type(screen.getByDisplayValue('Alex'), '');
    userEvent.type(screen.getByDisplayValue('alex@protonmail.com'), '');
    fireEvent.click(screen.getAllByLabelText('Save')[0]);

    expect(container).toMatchSnapshot();
    expect(screen.getByDisplayValue('Alex')).toBeInTheDocument();
    expect(screen.getByDisplayValue('alex@protonmail.com')).toBeInTheDocument();
    expect(screen.getAllByText('Validation failed')).toHaveLength(2);
  });
});
