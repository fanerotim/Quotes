const { generateRandomPassword } = require('../generateRandomPassword')

test('returns a string / password', () => {
    expect(generateRandomPassword()).toBeTruthy();
})

test('does not return undefined', () => {
    expect(generateRandomPassword()).not.toBeUndefined();
})