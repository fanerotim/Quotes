const quoteService = require('../quoteService');
const mysqlConfig = require("../../mySqlConfig");
const db = mysqlConfig();

db.query = jest.fn();

describe('tests getAll method', () => {

    const quotes = [
        {
            author: 'I.Welsh',
            text: 'You can`t lie to your soul.',
            id: 1
        },
        {
            author: 'Ken Kesey',
            text: 'He knows that you have to laugh at the things that hurt you just to keep yourself in balance, just to keep the world from running you plumb crazy.',
            id: 2
        },
        {
            author: 'Ken Kesey',
            text: 'You can`t really be strong until you can see a funny side to things.',
            id: 3
        }
    ]

    test('returns an array with quotes', () => {
        expect.assertions(1)

        db.query.mockImplementationOnce((sql, callback) => {
            callback(null, quotes)
        });

        return quoteService.getAll()
            .then(result => {
                expect(result).toEqual(quotes);
            });
    });

    test('returns empty arr, if no quotes are found in db', () => {
        expect.assertions(1);

        db.query.mockImplementationOnce((sql, callback) => {
            callback(null, []);
        })

        return quoteService.getAll()
            .then(result => {
                expect(result).toEqual([])
            });
    });

    test('throws db error if connect fails', () => {
        expect.assertions(1);

        const error = new Error('failed to connect to DB');

        db.query.mockImplementationOnce((sql, callback) => {
            callback(error, null)
        });

        return quoteService.getAll()
            .catch(err => {
                expect(err).toEqual(error);
            })
    });
})