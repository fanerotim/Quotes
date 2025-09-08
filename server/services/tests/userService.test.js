const userService = require('../userService');
let mysqlConfig = require('../../mySqlConfig');
const db = mysqlConfig();

// close db connection after each request fixes error with jest (open async operation)
afterEach(() => {
    db.end();
})

// custom error
const missingInputError = new Error('hello, hello - user input is required :)');

// hasUser() tests
test('throw error if user already registered', () => {

    return userService.hasUser('b@abv.bg').then(data => {
        expect(data).toEqual([]);
    })
});





