import { useEffect, useState } from 'react';
import { DomUtils } from 'utils/utils/utils';

const darkModeCacheKey = 'dark-mode';

const useDarkMode = () => {
  const [isDarkModeOn, setIsDarkModeOn] = useState(DomUtils.prefersDarkTheme());

  useEffect(() => {
    const cachedDarkMode = JSON.parse(localStorage.getItem(darkModeCacheKey));
    if (cachedDarkMode !== null) setIsDarkModeOn(cachedDarkMode);
  }, []);

  useEffect(() => {
    DomUtils.toggleDarkTheme(isDarkModeOn);
    localStorage.setItem(darkModeCacheKey, JSON.stringify(isDarkModeOn));
  }, [isDarkModeOn]);

  return [isDarkModeOn, () => setIsDarkModeOn(!isDarkModeOn)];
};

export default useDarkMode;
