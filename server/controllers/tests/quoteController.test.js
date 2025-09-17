const request = require('supertest');
let quoteService = require('../../services/quoteService');
jest.mock('../../services/quoteService');

const { createTestApp } = require('./createTestApp');
const app = createTestApp();

let { clearBlacklistedJWTCron } = require('../../cron-jobs/clearBlacklistedJWTCron');

jest.mock('../../cron-jobs/clearBlacklistedJWTCron');

clearBlacklistedJWTCron = jest
    .fn()
    .mockImplementationOnce(() => {
        return {
            clearJWTCron: jest.fn()
        }
    })


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

describe('tests for quotes page', () => {

    test('should return status 200 and an array with quotes', () => {
        expect.assertions(3);
        quoteService.getAll.mockResolvedValue(quotes)

        return request(app)
            .get('/quotes')
            .expect(200)
            .then(response => {
                expect(response.body).toHaveLength(3)
                expect(response.body[0].ownerId).toBe(2)
                expect(response.body[1].author).toBe('F. Dostoevsky')
            })
        
    })
})