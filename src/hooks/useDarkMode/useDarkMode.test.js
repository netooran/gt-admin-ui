import { renderHook, act } from '@testing-library/react-hooks/dom';
import { DomUtils } from 'utils/utils/utils';
import useDarkMode from './useDarkMode';

jest.mock('utils/utils/utils');
DomUtils.prefersDarkTheme.mockReturnValue(true);

describe.skip('useDarkMode', () => {
  test('useDarkMode', () => {
    const { result } = renderHook(() => useDarkMode());

    expect(result.current.isDarkModeOn).toBeFalsy();
    expect(typeof result.current.toggleDarkMode).toBe('function');

    act(() => result.current.toggleDarkMode());
    expect(result.current.isDarkModeOn).toBe(true);
  });
});
