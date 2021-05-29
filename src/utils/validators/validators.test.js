import validators, { getValidator } from './validators';

describe('isNotEmpty', () => {
  test.each`
    value            | expectedValidity
    ${'Valid value'} | ${true}
    ${''}            | ${false}
    ${null}          | ${false}
    ${undefined}     | ${false}
  `(
    'isNotEmpty returns $expectedValidity for $value',
    ({ value, expectedValidity }) => {
      expect(validators.isNotEmpty(value)).toEqual([
        expectedValidity,
        'Value must not be empty',
      ]);
    }
  );

  test.each`
    value            | expectedValidity
    ${'Valid value'} | ${true}
    ${''}            | ${false}
    ${null}          | ${false}
    ${undefined}     | ${false}
  `(
    'isNotEmpty returns $expectedValidity for $value for field',
    ({ value, expectedValidity }) => {
      expect(validators.isNotEmpty(value, 'name')).toEqual([
        expectedValidity,
        'Name must not be empty',
      ]);
    }
  );
});

describe('isValidEmail', () => {
  test.each`
    value                    | expectedValidity
    ${'alex@protonmail.com'} | ${true}
    ${'alex@protonmail'}     | ${true}
    ${'alex'}                | ${false}
    ${null}                  | ${false}
    ${undefined}             | ${false}
  `(
    'isValidEmail returns $expectedValidity for $value',
    ({ value, expectedValidity }) => {
      expect(validators.isValidEmail(value)).toEqual([
        expectedValidity,
        'Must be a valid email address',
      ]);
    }
  );
});

describe('isValidUserRole', () => {
  test.each`
    value          | expectedValidity
    ${'Admin'}     | ${true}
    ${'admin'}     | ${true}
    ${'Member'}    | ${true}
    ${'member'}    | ${true}
    ${'Moderator'} | ${false}
    ${''}          | ${false}
    ${null}        | ${false}
    ${undefined}   | ${false}
  `(
    'isValidUserRole returns $expectedValidity for $value',
    ({ value, expectedValidity }) => {
      expect(validators.isValidUserRole(value)).toEqual([
        expectedValidity,
        'Role must be admin or member',
      ]);
    }
  );
});

describe('getValidator', () => {
  const mockValidator1 = jest.fn();
  const mockValidator2 = jest.fn();

  const validResult = [true];
  const invalidResult = [false, 'Message'];
  const invalidResult2 = [false, 'Another Message'];

  test('returns validator for single validation', () => {
    const validate = getValidator([mockValidator1], 'field name');

    mockValidator1.mockImplementationOnce(() => validResult);
    expect(validate('value')).toEqual(validResult);

    mockValidator1.mockImplementationOnce(() => invalidResult);
    expect(validate('value')).toEqual(invalidResult);
  });

  test('returns validator for multiple validations', () => {
    const validate = getValidator(
      [mockValidator1, mockValidator2],
      'field name'
    );

    mockValidator1.mockReturnValue(validResult);
    mockValidator2.mockReturnValue(validResult);
    expect(validate('value')).toEqual(validResult);

    mockValidator1.mockReturnValue(invalidResult);
    mockValidator2.mockReturnValue(validResult);
    expect(validate('value')).toEqual(invalidResult);

    mockValidator1.mockReturnValue(validResult);
    mockValidator2.mockReturnValue(invalidResult2);
    expect(validate('value')).toEqual(invalidResult2);

    mockValidator1.mockReturnValue(invalidResult);
    mockValidator2.mockReturnValue(invalidResult2);
    expect(validate('value')).toEqual(invalidResult);
  });
});
