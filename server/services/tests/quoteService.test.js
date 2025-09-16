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

    test('throw DB error if connection fails', () => {
        const error = new Error('Connection to DB failed');

        // mock db query to throw error
        db.query.mockImplementationOnce((sql, [userId], callback) => {
            callback(error, null)
        })

        return quoteService.getUserQuotes(5)
            .catch(err => {
                expect(err).toEqual(error);
            })
    })
})

describe('tests for addQuote method', () => {

    const quote = {
        author: 'F Dostoevsky',
        text: 'The mystery of human existence lies not in just staying alive, but in finding something to live for.',
        category: 'Fiction'
    }

    test('throws error if user input is invalid', () => {
        expect.assertions(1);
        const error = new Error('All fields must be filled.');

        return quoteService.addQuote()
            .catch(err => {
                expect(err).toEqual(error);
            })
    })

    test('throws error if user tries to add a quote that already exists in db', () => {
        expect.assertions(1);

        //mock db.query to return quote (already added)
        db.query.mockImplementationOnce((sql, [text], callback) => {
            callback(null, [quote]);
        })

        const error = new Error('Quote already exists and it cannot be duplicated!')

        return quoteService.addQuote(quote.author, quote.text, quote.category)
            .catch(err => {
                expect(err).toEqual(error)
            })
    })

    test('test complete flow of addQuote method', async () => {
        expect.assertions(2);

        //mock db query to return empty [] / quote not found in db
        db.query.mockImplementation((sql, [text], callback) => {
            callback(null, [])
        })

        const isQuoteAdded = await quoteService.addQuote(quote.author, quote.text, quote.category, ownerId = 4);

        expect(isQuoteAdded).toEqual([]);

        // mock final db.query to simulate successfully added quote
        const successMessage = { message: 'successfully added a quote to db', id: 15 };

        db.query.mockImplementation((sql, [author, text, onwerId, category], callback) => {
            callback(null, successMessage);
        })

        return quoteService.addQuote(quote.author, quote.text, quote.category, ownerId = 5)
            .then(result => {
                expect(result).toEqual(successMessage);
            })
    })
})

describe('tests for updateQuote method', () => {
    const quote = {
        id: 21,
        author: 'F. Dostoyevsky',
        text: 'Your worst sin is that you have destroyed and betrayed yourself for nothing.',
        category: 'Fiction'
    }

    test('throws error if input is invalid', () => {
        expect.assertions(1);
        const error = new Error('All fields must be filled.');
        expect(() => quoteService.updateQuote()).toThrow(error);
    })

    test('updates quote successfully and returns success message', () => {
        expect.assertions(1);

        const successMessage = { message: 'Quote successfully update', insertId: 151 };

        //mock db query to return success message upon successful quote update
        db.query.mockImplementationOnce((sql, [author, text, category, id], callback) => {
            callback(null, successMessage);
        })

        return quoteService.updateQuote(quote.id, quote.author, quote.text, quote.category)
            .then(result => {
                expect(result).toEqual(successMessage);
            })
    })

    test('returns db error if connection fails', () => {
        expect.assertions(1);

        const error = new Error('connection to DB failed');
        //mock db.query to return error
        db.query.mockImplementationOnce((sql, [author, text, category, id], callback) => {
            callback(error, null)
        })

        return quoteService.updateQuote(quote.id, quote.author, quote.text, quote.category)
            .catch(err => {
                expect(err).toEqual(error);
            })
    })
})