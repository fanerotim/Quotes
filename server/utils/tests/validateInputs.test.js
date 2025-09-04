const { validateInputs } = require('../validateInputs');

test('should throw', () => {
    expect(() => validateInputs(2, 3).toThrow());
})

test('should throw new Error', () => {
    expect(() => validateInputs(1, 2).toThrowError());
})

test('should throw error', () => {
    expect(() => validateInputs([' ', ''])).toThrow(Error)
})

test('should return true', () => {
    expect(validateInputs(["pom@abv.bg", "123"])).toBe(true);
})

test('should return true', () => {
    expect(validateInputs(["pom@abv.bg", "123"])).toBeTruthy();
})