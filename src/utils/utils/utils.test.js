import { StringUtils, FunctionUtils, delay, ArrayUtils } from './utils';

describe('Stringutils', () => {
  test('capitalize', () => {
    expect(StringUtils.capitalize('field')).toBe('Field');
  });
});

describe('FunctionUtils', () => {
  test('capitalize', () => {
    expect(FunctionUtils.identity(1)).toBe(1);
  });
});

describe('ArrayUtils', () => {
  test('range', () => {
    expect(ArrayUtils.range(5)).toEqual([1, 2, 3, 4, 5]);
  });
});

test('delay', async () => {
  const t0 = performance.now();
  await delay(10);
  const t1 = performance.now();
  expect(t1 - t0).toBeGreaterThan(10);
});
