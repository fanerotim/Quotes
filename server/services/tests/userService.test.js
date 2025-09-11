// jest.mock('../../mySqlConfig');

const mysqlConfig = require('../../mySqlConfig');
const userService = require('../userService');

let db = mysqlConfig();
db.query = jest.fn();

describe('tests for userService`s hasUser() method', () => {

    test('return user data', () => {
        expect.assertions(1);

        const result = [{ id: 1, email: 'test@abv.bg', password: '123' }]

        db.query.mockImplementationOnce((sql, [email], callback) => {
            callback(null, result)
        })

        return userService.hasUser('pancho@abv.bg').then(data => {
            expect(data).toBe(result)
        })
    });


    test('return empty [] if user is not in db', () => {
        expect.assertions(1);

        db.query.mockImplementationOnce((sql, email, callback) => {
            callback(null, []);
        })

        return userService.hasUser('asan@abv.bg')
            .then(data => {
                expect(data).toEqual([]);
            })
    });

    test('return db error', () => {
        expect.assertions(1);
        
        const error = new Error('DB connection error')

        db.query.mockImplementation((sql, email, callback) => {
            callback(error, null)
        })

        return userService.hasUser('test@abv.bg')
            .catch(err => {
                expect(err).toEqual(error);
            })
    })
})














