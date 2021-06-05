import { render } from '@testing-library/react';
import App from './App';
import { createMockResource } from 'utils/resource/resource';
import { fetchUsersResource } from 'repository/users/users';
import { useDarkMode } from 'hooks';

jest.mock('repository/users/users');
jest.mock('hooks');

useDarkMode.mockReturnValue([true, jest.fn()]);

const mockResource = createMockResource(
  [{ id: '1', name: 'Alex', email: 'alex@protonmail.com', role: 'admin' }],
  'Api error'
);

describe.skip('App', () => {
  test('renders loader', () => {
    fetchUsersResource.mockReturnValue(mockResource.loading);
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });

  test('renders table when data is available', () => {
    fetchUsersResource.mockReturnValue(mockResource.success);

    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });

  test('renders error message on api failure', () => {
    fetchUsersResource.mockReturnValue(mockResource.error);

    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });
});
