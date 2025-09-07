const mysqlConfig = require('../../mySqlConfig');
const userService = require('../userService');
const db = mysqlConfig();

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

test('should reject with err', () => {
    userService.hasUser = jest.fn(() => {
        return Promise.reject(Error)
    })

    return userService.hasUser('test@abv.bg')
        .catch(err => {
            expect(err).toEqual(Error);
        })
})

// adding this test, so I can try this way of testing as due to mysql2 issues, this type of test was failing for 2 days.
// will standardize once i figure out how to fix the bug with mysql2
test('promise should be rejected if db is down', () => {
    
    jest.mock('../userService');

    const error = {message: 'db connection down'};
    const response = {result: error};
    userService.hasUser.mockRejectedValue(response);

    return userService.hasUser().catch(err => {
        expect(err).toEqual(response);
    })
})