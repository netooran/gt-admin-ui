import { render } from '@testing-library/react';
import { Center, Column, Flex, Row, ViewPort } from './Containers';

test('renders flex container', () => {
  const { container } = render(<Flex />);
  expect(container).toMatchSnapshot();
});

test('renders row', () => {
  const { container } = render(<Row />);
  expect(container).toMatchSnapshot();
});

test('renders column', () => {
  const { container } = render(<Column />);
  expect(container).toMatchSnapshot();
});

test('renders center', () => {
  const { container } = render(<Center />);
  expect(container).toMatchSnapshot();
});

test('renders viewport which fills the screen', () => {
  const { container } = render(<ViewPort />);
  expect(container).toMatchSnapshot();
});
