jest.mock('../../mySqlConfig');

const userService = require('../userService');

// custom error
const missingInputError = new Error('hello, hello - user input is required :)');

// hasUser() tests

const users = [
    { id: 1, email: 'i@abv.bg', password: '123' }
]

test('throw error if user is already registered', () => {
    expect.assertions(2);

    return userService.hasUser(users[0].email)
        .then(data => {
            expect(data).toEqual(users);
        })
});

// test('throw error if user is already registered', () => {
//     expect.assertions(1);

//     return userService.hasUser('asan@abv.bg')
//         .then(data => {
//             expect(data).toEqual([])
//         })
// });










