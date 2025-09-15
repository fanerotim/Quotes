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

describe('tests getQuote method', () => {

    const quote = [{
        author: 'I.Welsh',
        text: 'You can`t lie to your soul.',
        id: 1
    }]

    test('returns quote details', () => {
        expect.assertions(1);

        // mock db.query to return details of single quote
        db.query.mockImplementationOnce((sql, [id], callback) => {
            callback(null, quote);
        })

        return quoteService.getQuote(1)
            .then(result => {
                expect(result).toEqual(quote);
            })
    })

    test('returns empty [], if quote is not found (this can only happen thorugh postman request, as via UI users cannot access a quote without provided id)', () => {
        expect.assertions(1);

        //mock db.query to return empty []
        db.query.mockImplementationOnce((sql, [id], callback) => {
            callback(null, [])
        })

        return quoteService.getQuote(2)
            .then(result => {
                expect(result).toEqual([])
            });
    })

    test('throw error if id is not provided', () => {
        expect.assertions(1);

        const error = new Error('quoteId must be provided')

        expect(() => {
            quoteService.getQuote()
        }).toThrow(error);
    })
})

describe('tests for getUserQuotes method', () => {

    const quotes = [{
        author: 'F. Dostoyevsky',
        text: 'Pain and suffering are always inevitable for a large intelligence and a deep heart. The really great men must, I think, have great sadness on earth.',
        id: 1
    },
    {
        author: 'F. Dostoyevsky',
        text: `To go wrong in one's own way is better than to go right in someone else's.`,
        id: 2
    },
    {
        author: 'F. Dostoyevsky',
        text: 'What is hell? I maintain that it is the suffering of being unable to love.',
        id: 3
    }]

    test('throws error if userId is not provided', () => {
        expect.assertions(1);
        const error = new Error('userId must be provided');

        expect(() => {
            quoteService.getUserQuotes()
        }).toThrow(error);
    })

    test('returns quotes added by a user', () => {
        expect.assertions(1);

        // mock db.query to return quotes added by user
        db.query.mockImplementationOnce((sql, [userId], callback) => {
            callback(null, quotes);
        });

        return quoteService.getUserQuotes(userId = 1)
            .then(result => {
                expect(result).toEqual(quotes);
            })
    })

    test('returns empty [], if user has not added quotes yet', () => {
        expect.assertions(1);

        // mock db.query to return empty []
        db.query.mockImplementationOnce((sql, [userId], callback) => {
            callback(null, []);
        })

        return quoteService.getUserQuotes(userId = 4)
            .then(result => {
                expect(result).toEqual([]);
            });
    })
})