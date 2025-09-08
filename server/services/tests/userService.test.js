const userService = require('../userService');
const mySqlConfig = require('../../mySqlConfig');

// custom error
const missingInputError = new Error('hello, hello - user input is required :)');

jest.mock('../../mySqlConfig');

// hasUser() tests
test.only('throw error if user already registered', () => {
    const db = mySqlConfig();

    db.query.mockResolvedValue([]);

    return userService.hasUser('b@abv.bg').then(data => {
        expect(data).toEqual([]);
    })

});





