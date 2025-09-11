const users = [
    { id: 1, email: 'i@abv.bg', password: '123' }
]

// for now this is diabled as it took me quite a long time to figure out why the query: jest.fn() was not being overwritten by my tests in userService.test.js
// I want to move on for now. Successfully mocked the function in userService.test.js. will come back to this when I can.
const mysqlConfig = () => {
    const db = {
        // query: (sql, [email], callback) => {
        //     callback(null, email);
        // } 
        query: jest.fn()
    }
    return db;
}

module.exports = mysqlConfig;