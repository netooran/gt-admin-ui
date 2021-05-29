import { render } from '@testing-library/react';
import Spinner from './Spinner';

test('renders spinner', () => {
  const { container } = render(<Spinner />);
  expect(container).toMatchSnapshot();
});
