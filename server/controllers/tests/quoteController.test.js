const request = require('supertest');

let quoteService = require('../../services/quoteService');
jest.mock('../../services/quoteService');

const { createTestApp } = require('./createTestApp');
const app = createTestApp();

let { isGuest } = require('../../route-guards/isGuest');
jest.mock('../../route-guards/isGuest');

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

    const user = {
        email: 'test@abv.bg',
        id: 2
    }

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
            return res.status(401).json({message: 'You are not authorized to access this resource. Please log in!'})
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