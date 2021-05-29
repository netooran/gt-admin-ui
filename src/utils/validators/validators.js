import { StringUtils } from '../utils/utils';

const validators = {
  isNotEmpty: (value, field) => [
    !!(value && value.length),
    `${StringUtils.capitalize(field || 'value')} must not be empty`,
  ],
  isValidEmail: (value) => {
    const isValid =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        value
      );
    return [isValid, 'Must be a valid email address'];
  },
  isValidUserRole: (value) => {
    const isValid = value && ['admin', 'member'].includes(value.toLowerCase());
    return [!!isValid, 'Role must be admin or member'];
  },
};

export const getValidator = (validateFns, field) => {
  return (value) => {
    let result = [true];
    validateFns.every((validateFn) => {
      const [isValid, message] = validateFn(value, field);
      if (!isValid) result = [false, message];
      return isValid;
    });
    return result;
  };
};

export default validators;
