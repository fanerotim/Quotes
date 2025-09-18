const request = require('supertest');

let quoteService = require('../../services/quoteService');
jest.mock('../../services/quoteService');

const { createTestApp } = require('./createTestApp');
const app = createTestApp();

let { isGuest } = require('../../route-guards/isGuest');
jest.mock('../../route-guards/isGuest');

// test quotes
const quotes = [
    {
        id: 1,
        author: 'F. Dostoevsky',
        text: 'Man is sometimes extraordinarily, passionately, in love with suffering...',
        category: 'Fiction',
        ownerId: 2
    },
    {
        id: 2,
        author: 'F. Dostoevsky',
        text: 'It is better to be unhappy and know the worst, than to be happy in a fool`s paradise.',
        category: 'Fiction',
        ownerId: 2
    },
    {
        id: 3,
        author: 'F. Dostoevsky',
        text: 'This is my last message to you: in sorrow, seek happiness.',
        category: 'Fiction',
        ownerId: 1
    },
]

// test user
const user = {
    email: 'test@abv.bg',
    id: 2
}

describe('GET /quotes', () => {

    test('should return status 200 and an array with quotes', () => {
        expect.assertions(4);
        quoteService.getAll.mockResolvedValue(quotes)

        return request(app)
            .get('/quotes')
            .expect(200)
            .then(response => {
                expect(response.body).toHaveLength(3);
                expect(response.body[0].ownerId).toBe(2);
                expect(response.body[1].author).toBe('F. Dostoevsky');
                expect(response.req.path).toEqual('/quotes');
            })
    })

    test('should return status 200 and empty [] / no quotes added', () => {
        expect.assertions(4);
        quoteService.getAll.mockResolvedValue([]);

        return request(app)
            .get('/quotes')
            .expect(200)
            .then(response => {
                expect(response.body).toHaveLength(0);
                expect(response.body).toEqual([]);
                expect(response.ok).toBe(true);
                expect(response.req.path).toEqual('/quotes');
            })
    })

    test('should return error', () => {
        expect.assertions(4);
        const error = new Error('Connection to DB failed')
        quoteService.getAll.mockRejectedValue(error);

        return request(app)
            .get('/quotes')
            .expect(500)
            .then(response => {
                expect(response.res.statusCode).toBe(500);
                expect(response.res.statusMessage).toBe('Internal Server Error')
                expect(response.body.message).toEqual('Connection to DB failed');
                expect(response.ok).toBe(false);
            })
    })
})

describe('GET /quotes/:id', () => {

    test('should return a single quote', () => {
        expect.assertions(3);
        quoteService.getQuote.mockResolvedValue(quotes[2])

        return request(app)
            .get('/quotes/:id')
            .expect(200)
            .then(response => {
                expect(response.body.id).toBe(3);
                expect(response.body.text).toBe('This is my last message to you: in sorrow, seek happiness.')
                expect(response.ok).toBe(true);
            })
    })

    test('should return empty [] if quote is not found', () => {
        expect.assertions(3);
        quoteService.getQuote.mockReturnValue([]);

        return request(app)
            .get('/quotes/:id')
            .expect(200)
            .then(response => {
                expect(response.body).toHaveLength(0);
                expect(response.ok).toBe(true);
                expect(response.body).toEqual([]);
            })
    })

    test('should return error', () => {
        expect.assertions(3);
        quoteService.getQuote.mockRejectedValue({ message: 'Connection to DB failed' });

        return request(app)
            .get('/quotes/:id')
            .expect(500)
            .then(response => {
                expect(response.body.message).toBe('Connection to DB failed');
                expect(response.ok).toBe(false);
                expect(response.error).toBeTruthy();
            })
    })
})

describe('POST /quotes/user-quotes', () => {

    test('returns user quotes', () => {
        expect.assertions(3);
        const userQuotes = quotes.filter(q => q.ownerId === 2);

        quoteService.getUserQuotes.mockResolvedValue(userQuotes);

        // mock isGuest route guard to let us get to the route
        isGuest.mockImplementationOnce((req, res, next) => {
            // mock req.user as otherwise we get an error / simulate that the user has already logged in
            req.user = user;
            // call next to proceed to the route
            next();
        })

        return request(app)
            .post('/quotes/user-quotes')
            .expect(200)
            .then(response => {
                expect(response.body).toHaveLength(2);
                expect(response.ok).toBeTruthy();
                expect(response.body[0].author).toBe('F. Dostoevsky');
            })
    });

    test('returns empty [] if user has not yet added quotes', () => {
        expect.assertions(3);

        quoteService.getUserQuotes.mockResolvedValue([]);

        isGuest.mockImplementationOnce((req, res, next) => {
            req.user = user;
            next();
        })

        return request(app)
            .post('/quotes/user-quotes')
            .expect(200)
            .then(response => {
                expect(response.body).toHaveLength(0);
                expect(response.body).toEqual([]);
                expect(response.ok).toBe(true);
            })
    })

    test('returns 401 unauthorized / isGuest route-guard test', () => {
        expect.assertions(3);

        isGuest.mockImplementationOnce((req, res, next) => {
            return res.status(401).json({ message: 'You are not authorized to access this resource. Please log in!' })
        })

        return request(app)
            .post('/quotes/user-quotes')
            .expect(401)
            .then(response => {
                expect(response.unauthorized).toBe(true);
                expect(response.ok).toBe(false);
                expect(response.error).toBeTruthy();
            })
    })

    test('returns DB connection error', () => {
        expect.assertions(3);

        isGuest.mockImplementationOnce((req, res, next) => {
            req.user = user;
            next();
        })

        const error = new Error('Connection to DB failed')
        quoteService.getUserQuotes.mockRejectedValue(error);

        return request(app)
            .post('/quotes/user-quotes')
            .expect(500)
            .then(response => {
                expect(response.ok).toBe(false);
                expect(response.error).toBeTruthy();
                expect(response.body.message).toBe('Connection to DB failed')
            })
    })
})

describe('POST /quotes/add-quote', () => {
    const quote = {
        insertId: 33,
        ownerId: 2,
        author: 'F. Dostoevsky',
        text: 'You will burn and you will burn out; you will be healed and come back again.',
        category: 'Fiction'
    }

    test('returns 401 Unauthorized error', () => {
        expect.assertions(3);

        isGuest.mockImplementationOnce((req, res, next) => {
            return res.status(401).json({ message: 'You are not authorized to access this resource. Please log in!' });
        })

        return request(app)
            .post('/quotes/add-quote')
            .expect(401)
            .then(response => {
                expect(response.ok).toBe(false);
                expect(response.error).toBeTruthy();
                expect(response.body.message).toBe('You are not authorized to access this resource. Please log in!')
            })
    })

    test('returns newly added quote', () => {
        expect.assertions(4);
        
        isGuest.mockImplementationOnce((req, res, next) => {
            req.user = user;
            next();
        })

        // add new quote
        quoteService.addQuote.mockResolvedValue(quote);
        // get newly added quote and return it to the client / returned quote needs to be in an arr due to how SQL works (mySQl in this case)
        quoteService.getQuote.mockResolvedValue([quote]);

        return request(app)
            .post('/quotes/add-quote')
            .send(user)
            .expect(200)
            .then(response => {
                expect(response.ok).toBe(true);
                expect(response.body).toBeTruthy();
                expect(response.body.ownerId).toBe(2);
                expect(response.body.insertId).toBe(33);
            })
    })

    test('returns error if quote already exists', () => {
        expect.assertions(4);

        isGuest.mockImplementationOnce((req, res, next) => {
            req.user = user;
            next();
        })

        const error = new Error('Quote already exists and it cannot be duplicated!')
        quoteService.addQuote.mockRejectedValue(error);

        return request(app)
            .post('/quotes/add-quote')
            .send(user)
            .expect(500)
            .then(response => {
                expect(response.ok).toBe(false);
                expect(response.error).toBeTruthy();
                expect(response.body.message).toBe('Quote already exists and it cannot be duplicated!')
                expect(response.error).toBeTruthy();
            })
    })
})

describe('PUT /quotes/edit-quote/:id', () => {
    
    const quote = {
        id: 23,
        author: 'F. Dostoevsky',
        text: 'And what`s strange, what would be marvelous, is not that God should really exist; the marvel is that such an idea, the idea of the necessity of God, could enter the head of such a savage, vicious beast as man.',
        category: 'Fiction',
        ownerId: 1
    }

    test('returns 401 unauthorized', () => {
        expect.assertions(1);

        isGuest.mockImplementationOnce((req, res, next) => {
            return res.status(401).json({message: 'You are not authorized to access this resource. Please log in!'})
        })

        return request(app)
            .put('/quotes/edit-quote/:id')
            .expect(401)
            .then(response => {
                expect(response.ok).toBe(false);
            })
    })

    test('returns updated quote', () => {
        expect.assertions(5);

        isGuest.mockImplementationOnce((req, res, next) => {
            req.user = user;
            next();
        })

        quoteService.updateQuote.mockResolvedValue(quote);
        quoteService.getQuote.mockResolvedValue(quote);

        return request(app)
            .put('/quotes/edit-quote/:id')
            .send(quote)
            .expect(200)
            .then(response => {
                expect(response.ok).toBe(true);
                expect(response.body).toBeTruthy();
                expect(response.body.id).toBe(23);
                expect(response.body.ownerId).toBe(1);
                expect(response.error).toBeFalsy();
            });
    })

    test('returns 500 internal server error', () => {
        expect.assertions(4);

        isGuest.mockImplementationOnce((req, res, next) => {
            req.user = user;
            next();
        })

        const error = new Error('Connection to DB failed')
        quoteService.updateQuote.mockRejectedValue(error);

        return request(app)
            .put('/quotes/edit-quote/:id')
            .send(quote)
            .expect(500)
            .then(response => {
                console.log(response);
                expect(response.ok).toBe(false);
                expect(response.error).toBeTruthy();
                expect(response.body.message).toBe('Connection to DB failed');
                expect(response.body).toBeTruthy();
            })
    })
})

describe('DELETE /quotes/delete-quote', () => {

    const quote = {
        id: 55,
        ownerId: 1,
        author: 'Leo Tolstoy',
        text: 'It is amazing how complete is the delusion that beauty is goodness.',
        category: 'Fiction'
    }

    test('returns 401 unauthorized', () => {
        expect.assertions(3);

        isGuest.mockImplementationOnce((req, res, next) => {
            return res.status(401).json({message: 'You are not authorized to access this resource. Please log in!'});
        })

        return request(app)
            .delete('/quotes/delete-quote')
            .send({id: user.id})
            .expect(401)
            .then(response => {
                console.log(response);
                expect(response.ok).toBe(false);
                expect(response.error).toBeTruthy();
                expect(response.body.message).toBe('You are not authorized to access this resource. Please log in!')
            })
    })

    test('returns success message after deleting a quote', () => {
        expect.assertions(3);

        isGuest.mockImplementationOnce((req, res, next) => {
            req.user = user;
            next();
        })

        quoteService.deleteQuote.mockResolvedValue({message: 'Quote DELETED successfully.'});

        return request(app)
            .delete('/quotes/delete-quote')
            .send({id: quote.id})
            .expect(200)
            .then(response => {
                console.log(response);
                expect(response.ok).toBe(true);
                expect(response.body.message).toBe('Quote DELETED successfully.');
                expect(response.error).toBe(false);
            })
    })
})