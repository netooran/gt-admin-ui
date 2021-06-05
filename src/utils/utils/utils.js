export const noop = () => {};
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const identity = (arg) => arg;

const capitalize = (str) => str.replace(/^\w/, (c) => c.toUpperCase());

const range = (limit) => [...Array(limit + 1).keys()].slice(1);

const prefersDarkTheme = () => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const toggleDarkTheme = (isDarkModeOn) => {
  return document.body.classList[isDarkModeOn ? 'add' : 'remove']('dark-mode');
};

export const FunctionUtils = { identity };

export const StringUtils = { capitalize };

export const ArrayUtils = { range };

export const DomUtils = { prefersDarkTheme, toggleDarkTheme };
