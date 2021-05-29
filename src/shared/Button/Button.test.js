import { fireEvent, render, screen } from '@testing-library/react';
import { Home } from '@styled-icons/boxicons-regular';
import Button from './Button';

describe('Default Button', () => {
  test('renders button with default props', () => {
    const onClick = jest.fn();
    const { container } = render(<Button onClick={onClick}>Click me</Button>);
    expect(container).toMatchSnapshot();

    fireEvent.click(screen.getByText('Click me'));
    expect(onClick).toHaveBeenCalled();
  });
});

describe('Solid Button', () => {
  test('renders button with primary color as background & white font', () => {
    const props = { variant: 'solid' };
    const { container } = render(<Button {...props}>Click me</Button>);
    expect(container).toMatchSnapshot();
  });

  test('renders button with red background color & white font', () => {
    const props = { variant: 'solid', importance: 'danger' };
    const { container } = render(<Button {...props}>Click me</Button>);
    expect(container).toMatchSnapshot();
  });

  test('renders button with primary color as background & white font & rounded border', () => {
    const props = { variant: 'solid', shape: 'round' };
    const { container } = render(<Button {...props}>Click me</Button>);
    expect(container).toMatchSnapshot();
  });

  test('renders button with primary color as background & white font but disabled', () => {
    const props = { variant: 'solid', disabled: true };
    const { container } = render(<Button {...props}>Click me</Button>);
    expect(container).toMatchSnapshot();
  });
});

describe('Ghost Button', () => {
  test('renders button with primary color for text & without background & border', () => {
    const props = { variant: 'ghost' };
    const { container } = render(<Button {...props}>Click me</Button>);
    expect(container).toMatchSnapshot();
  });

  test('renders button with red color for text & without background & border', () => {
    const props = { variant: 'ghost', importance: 'danger' };
    const { container } = render(<Button {...props}>Click me</Button>);
    expect(container).toMatchSnapshot();
  });

  test('renders button with primary color for text & without background & border in round shape', () => {
    const props = { variant: 'ghost', shape: 'round' };
    const { container } = render(<Button {...props}>Click me</Button>);
    expect(container).toMatchSnapshot();
  });

  test('renders button with primary color for text & without background & border but disabled', () => {
    const props = { variant: 'ghost', disabled: true };
    const { container } = render(<Button {...props}>Click me</Button>);
    expect(container).toMatchSnapshot();
  });
});

describe('Outlined Button', () => {
  test('renders button with transparent background & primary colored border and text', () => {
    const props = { variant: 'outline' };
    const { container } = render(<Button {...props}>Click me</Button>);
    expect(container).toMatchSnapshot();
  });

  test('renders button with transparent background & red colored border and text', () => {
    const props = { variant: 'outline', importance: 'danger' };
    const { container } = render(<Button {...props}>Click me</Button>);
    expect(container).toMatchSnapshot();
  });

  test('renders button with transparent background & primary colored border and text and rounded borders', () => {
    const props = { variant: 'outline', shape: 'round' };
    const { container } = render(<Button {...props}>Click me</Button>);
    expect(container).toMatchSnapshot();
  });

  test('renders button with transparent background & primary colored border and text but disabled', () => {
    const props = { variant: 'outline', disabled: true };
    const { container } = render(<Button {...props}>Click me</Button>);
    expect(container).toMatchSnapshot();
  });
});

describe('Icon Button', () => {
  test('renders button primary colored icon', () => {
    const props = { variant: 'icon' };
    const { container } = render(
      <Button {...props}>
        <Home />
      </Button>
    );
    expect(container).toMatchSnapshot();
  });

  test('renders button red colored icon', () => {
    const props = { variant: 'icon', importance: 'danger' };
    const { container } = render(
      <Button {...props}>
        <Home />
      </Button>
    );
    expect(container).toMatchSnapshot();
  });

  test('renders button primary colored icon but disabled', () => {
    const props = { variant: 'icon', disabled: true };
    const { container } = render(
      <Button {...props}>
        <Home />
      </Button>
    );
    expect(container).toMatchSnapshot();
  });
});
