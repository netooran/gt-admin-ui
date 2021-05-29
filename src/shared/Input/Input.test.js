import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from './Input';

test('renders readonly input', () => {
  const props = {
    initialValue: 'Some text',
    readonly: true,
    onChange: jest.fn(),
  };
  const { container } = render(<Input {...props} />);
  expect(container).toMatchSnapshot();
});

test('renders editable input', () => {
  const props = {
    initialValue: 'Alex',
    readonly: false,
    onChange: jest.fn(),
  };
  const { container } = render(<Input {...props} />);
  expect(container).toMatchSnapshot();

  const inputText = 'ander Supertramp';
  userEvent.type(screen.getByRole('textbox'), inputText);
  expect(props.onChange).toHaveBeenLastCalledWith('Alexander Supertramp');
});

test('renders input with validation error', () => {
  const props = {
    initialValue: 'Alex',
    readonly: false,
    error: 'Value is not valid',
    onChange: jest.fn(),
  };
  const { container } = render(<Input {...props} />);
  expect(container).toMatchSnapshot();
  expect(screen.getByText(props.error)).toBeInTheDocument();
});
