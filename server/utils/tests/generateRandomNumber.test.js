const { generateRandomPassword } = require('../generateRandomPassword')

test('returns a string / password', () => {
    expect(generateRandomPassword()).toBeTruthy();
})

test('does not return undefined', () => {
    expect(generateRandomPassword()).not.toBeUndefined();
})

test('to return a string with length of 30 chars', () => {
    expect(generateRandomPassword()).toHaveLength(30);
})

test('to return a value of type string', () => {
    expect(typeof generateRandomPassword()).toBe('string');
})