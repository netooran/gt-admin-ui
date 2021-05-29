import { render } from '@testing-library/react';
import ButtonGroup from './ButtonGroup';

test('renders button group', () => {
  const { container } = render(
    <ButtonGroup>
      <button>Click Me</button>
      <button>Click Me</button>
    </ButtonGroup>
  );
  expect(container).toMatchSnapshot();
});
