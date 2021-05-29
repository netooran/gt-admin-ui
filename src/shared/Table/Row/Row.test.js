import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Row from './Row';

const mockValidate = jest.fn();
const data = { id: '1', name: 'Alex', email: 'Alex@protonmail.com' };
const columns = [{ name: 'name', validate: mockValidate }, { name: 'email' }];

test('renders row', () => {
  const props = { data, columns };
  const { container } = render(<Row {...props} />);
  expect(container).toMatchSnapshot();
});

test.each([true, false])(
  'renders selectable row where current selection is %s',
  (isSelected) => {
    const props = {
      data,
      columns,
      options: { selectable: true },
      isSelected,
      select: jest.fn(),
    };

    const { container, getByLabelText } = render(<Row {...props} />);

    expect(container).toMatchSnapshot();

    fireEvent.click(getByLabelText('Select row'));
    expect(props.select).toHaveBeenCalledWith(props.data.id, !isSelected);
  }
);

describe('renders editble row', () => {
  test('renders row in read only mode', () => {
    const props = { data, columns, options: { editable: true } };
    const { container } = render(<Row {...props} />);
    expect(container).toMatchSnapshot();
  });

  test('renders row in edit mode', () => {
    const props = { data, columns, options: { editable: true } };
    const { container, getByLabelText } = render(<Row {...props} />);
    expect(container).toMatchSnapshot();

    fireEvent.click(getByLabelText('Edit'));
    expect(container).toMatchSnapshot();
  });

  test('saves row successfully if values are valid', () => {
    mockValidate.mockImplementation(() => [true]);
    const props = {
      data,
      columns,
      options: { editable: true },
      save: jest.fn(),
    };
    const { container, getByLabelText, getByDisplayValue } = render(
      <Row {...props} />
    );
    expect(container).toMatchSnapshot();

    fireEvent.click(getByLabelText('Edit'));
    expect(container).toMatchSnapshot();

    const newName = 'Alexander';
    userEvent.type(getByDisplayValue(props.data.name), newName);
    fireEvent.click(getByLabelText('Save'));
    expect(container).toMatchSnapshot();
    expect(props.save).toHaveBeenCalledWith({ ...props.data, name: newName });
  });

  test('handles validation error on save', () => {
    mockValidate.mockImplementation(() => [false, 'Value is not valid']);
    const props = {
      data,
      columns,
      options: { editable: true },
      save: jest.fn(),
    };
    const { container, getByLabelText, getByDisplayValue } = render(
      <Row {...props} />
    );
    expect(container).toMatchSnapshot();

    fireEvent.click(getByLabelText('Edit'));
    expect(container).toMatchSnapshot();

    userEvent.type(getByDisplayValue('Alex'), '');
    fireEvent.click(getByLabelText('Save'));
    expect(container).toMatchSnapshot();
    expect(props.save).not.toHaveBeenCalled();
  });
});

test('renders deletable row', () => {
  const props = {
    data,
    columns,
    options: { deletable: true },
    remove: jest.fn(),
  };

  const { container, getByLabelText } = render(<Row {...props} />);

  expect(container).toMatchSnapshot();

  fireEvent.click(getByLabelText('Delete'));
  expect(props.remove).toHaveBeenCalledWith(props.data);
});
