const { clearBlacklistedJWTTask } = require('../clearBlacklistedJWTTask');
const mySqlConfig = require('../../mySqlConfig');
const db = mySqlConfig();

db.query = jest.fn();

describe('tests clearBlacklistedJWTTask method', () => {

    test('returns success message upon clearing blacklisted_tokens table', () => {
        expect.assertions(1);
        const successMessage = { message: 'all blacklisted tokens were cleared from db table', insertId: 0 };

        //mock db.query to return successMessage
        db.query.mockImplementationOnce((sql, callback) => {
            callback(null, successMessage);
        })

        return clearBlacklistedJWTTask()
            .then(result => {
                expect(result).toEqual(successMessage);
            })
    })

    test('returns DB connection error', () => {
        expect.assertions(1);
        const error = new Error('connection to DB failed');

        //mock db.query to return DB connection error;
        db.query.mockImplementationOnce((sql, callback) => {
            callback(error, null);
        })

        return clearBlacklistedJWTTask()
            .catch(err => {
                expect(err).toEqual(error);
            })
    })
})


