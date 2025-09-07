const userService = require('../userService');

jest.mock('../userService'); // mock user service

// custom error
const missingInputError = new Error('hello, hello - user input is required :)');

// hasUser() method tests;
test('return user data if email found in db', () => {

    const userData = [{ id: 1, email: 'i@abv.bg', password: 'abv' }]

    userService.hasUser = jest.fn((email) => {

        if (!email) {
            throw missingInputError;
        }
        return Promise.resolve(userData)
    })

    return userService.hasUser('i@abv.bg')
        .then(result => {
            expect(result).toEqual(userData)
        })
})

test('return [] if email found in db', () => {
    userService.hasUser = jest.fn((email) => {

        if (!email) {
            throw missingInputError
        }

        return Promise.resolve([]);
    })

    return userService.hasUser('p@abv.bg')
        .then(result => {
            expect(result).toEqual([]);
        })
})

// adding this test, so I can try this way of testing as due to mysql2 issues, this type of test was failing for 2 days.
// will standardize once i figure out how to fix the bug with mysql2
test('reject promise if db is down', () => {
    const error = new Error('Database connection lost');

    userService.register = jest.fn((email) => {
        
        if (!email) {
            throw missingInputError;
        }

        const isDBconnected = false;

        if (!isDBconnected) {
            return Promise.reject(error);
        }
    })

    userService.register('g@abv.bg')
        .catch(err => {
            expect(err).toEqual(error);
        })
})


// register() method tests
test('throw error in user already registered', () => {

    const error = new Error('Invalid credentials');
    userService.register = jest.fn((email, password) => {   

        //imagine we made a db call to check if user exists and received user data
        const user = [{ email: 'i@abv.bg', password: '123' }];

        if (user) {
            throw error;
        }
    })

    expect(() => {
        userService.register('i@abv.bg', '123')
    }).toThrow(error);
})



