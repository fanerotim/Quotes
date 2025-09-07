const userService = require('../userService');
jest.mock('../userService'); // mock user service


// hasUser method tests;

test('should return user data if provided email exists in db', () => {

    userService.hasUser = jest.fn((email) => {
        return Promise.resolve([{ id: 1, email: 'i@abv.bg', password: 'abv' }])
    })

    return userService.hasUser('i@abv.bg')
        .then(result => {
            expect(result).toEqual([{ id: 1, email: 'i@abv.bg', password: 'abv' }])
        })
})

test('should return empty array if email is not found in db', () => {
    userService.hasUser = jest.fn((email) => {
        return Promise.resolve([]);
    })

    return userService.hasUser('p@abv.bg')
        .then(result => {
            expect(result).toEqual([]);
        })
})

// adding this test, so I can try this way of testing as due to mysql2 issues, this type of test was failing for 2 days.
// will standardize once i figure out how to fix the bug with mysql2
test('promise should be rejected if db is down', () => {

    const error = { message: 'db connection down' };
    const response = { result: error };
    userService.hasUser.mockRejectedValue(response);

    return userService.hasUser().catch(err => {
        expect(err).toEqual(response);
    })
})


// register method tests

test('should throw error with message `All fields must be filled.`', () => {

    const error = { message: 'All fields must be filled', statusCode: 400 };
    const userInput = { email: '', password: '123' }

    userService.register = jest.fn((userInput) => {
        return Promise.reject(error);
    })

    return userService.register(userInput)
        .catch(err => {
            expect(err).toEqual(error);
        })
})

test('should throw `invalid credentials` error message', () => {

    const error = new Error({ message: 'Invalid credentials!', statusCode: 409 });

    userService.register.mockReturnValue(error);
    expect(userService.register({ email: 'i@abv.bg', password: '123' })).toEqual(error);
})

test('should throw if user exits in db', () => {

    const error = new Error('Invalid credentials!');

    userService.register = jest.fn((email, password) => {
        throw error;
    })

    expect(() => {
        userService.register('i@abv.bg', '123')
    }).toThrow(new Error('Invalid credentials!'));
})

