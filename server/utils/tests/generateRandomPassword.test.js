const generator = require('generate-password');
const { generateRandomPassword } = require('../generateRandomPassword');

jest.mock('generate-password');

test('confirm generatePassword() has correct behavior', () => {
    expect.assertions(5);
    const password = 'Gx7@Lp!vD#9qRt*Ae4Wz%Kf2Uy&mC8'
    generator.generate.mockReturnValue(password);

    expect(generateRandomPassword()).toEqual(password);
    expect(generateRandomPassword()).toHaveLength(30);
    expect(generateRandomPassword()).toBe(password);
    expect(generator.generate).toHaveReturned();
    expect(generator.generate).toHaveBeenCalledTimes(3);
})

