import { delay } from 'utils/utils/utils';
import { fetchUsersResource } from './users';

const users = [{ name: 'Alex', email: 'alex@protonmail.com' }];

beforeEach(() => {
  fetch.resetMocks();
});

test('fetchUsersResource', async () => {
  fetch.mockResponseOnce(JSON.stringify(users));

  const resource = fetchUsersResource();

  await delay(1);
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(resource.read()).toEqual(users);
});
