export const noop = () => {};
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const identity = (arg) => arg;

const capitalize = (str) => str.replace(/^\w/, (c) => c.toUpperCase());

const range = (limit) => [...Array(limit + 1).keys()].slice(1);

export const FunctionUtils = { identity };

export const StringUtils = { capitalize };

export const ArrayUtils = { range };
