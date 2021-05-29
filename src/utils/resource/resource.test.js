import { delay, noop } from '../utils/utils';
import createResource from './resource';

describe('createResource', () => {
  test('creates a loading resource', () => {
    const resource = createResource(new Promise(noop));
    expect(resource.read).toThrow();
  });

  test('creates a successfull resource', async () => {
    const data = [];
    const resource = createResource(Promise.resolve(data));

    await delay(1);
    expect(resource.read()).toBe(data);
  });

  test('creates a failed resource', async () => {
    const errorMessage = 'Api failed';
    const resource = createResource(Promise.reject(new Error(errorMessage)));

    await delay(1);
    expect(resource.read).toThrowError(errorMessage);
  });
});
