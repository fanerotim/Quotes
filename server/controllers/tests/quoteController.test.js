const request = require('supertest');
let quoteService = require('../../services/quoteService');
jest.mock('../../services/quoteService');

const { createTestApp } = require('./createTestApp');
const app = createTestApp();

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

    test('should throw error', () => {
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