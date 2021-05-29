import { render } from '@testing-library/react';
import App from './App';
import { createMockResource } from 'utils/resource/resource';
import { fetchUsersResource } from 'repository/users/users';

jest.mock('repository/users/users');

const mockResource = createMockResource(
  [{ id: '1', name: 'Alex', email: 'alex@protonmail.com', role: 'admin' }],
  'Api error'
);

test('renders loader', () => {
  fetchUsersResource.mockImplementation(() => mockResource.loading);
  const { container } = render(<App />);
  expect(container).toMatchSnapshot();
});

test('renders table when data is available', () => {
  fetchUsersResource.mockImplementation(() => mockResource.success);

  const { container } = render(<App />);
  expect(container).toMatchSnapshot();
});

test('renders error message on api failure', () => {
  fetchUsersResource.mockImplementation(() => mockResource.error);

  const { container } = render(<App />);
  expect(container).toMatchSnapshot();
});
