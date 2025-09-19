const request = require('supertest');
const { createTestApp } = require('../../controllers/tests/createTestApp');
const app = createTestApp();

const { isGuest } = require('../isGuest');
jest.mock('../isGuest');

const quoteService = require('../../services/quoteService');
jest.mock('../../services/quoteService');

describe('tests isGuest route-guard / middleware', () => {
    
    const quotes = [
        {
            id: 1,
            author: 'Allen Ginsberg',
            text: `Follow your inner moonlight; don't hide the madness.`,
            category: `Fiction`,
            ownerId: 1
        },
        {
            id: 2,
            author: `Allen Ginsberg`,
            text: `America I've given you all and now I'm nothing.`,
            category: `Fiction`,
            ownerId: 1
        }
    ]

    const user = {
        email: 'test@abv.bg',
        id: 1
    }

    test('returns 401 unauthorized', () => {
        expect.assertions(3);

        isGuest.mockImplementationOnce((req, res, next) => {
            return res.status(401).json({message: 'You are not authorized to access this resource. Please log in!'});
        })

        return request(app)
            .post('/quotes/user-quotes')
            .expect(401)
            .then(response => {
                expect(response.ok).toBe(false);
                expect(response.error).toBeTruthy();
                expect(response.body.message).toBe('You are not authorized to access this resource. Please log in!');
            })
    })

    test('allows to retrieve user-quotes', () => {
        expect.assertions(3);

        isGuest.mockImplementationOnce((req, res, next) => {
            req.user = user;
            next();
        })

        quoteService.getUserQuotes.mockResolvedValue(quotes);

        return request(app)
            .post('/quotes/user-quotes')
            .expect(200)
            .then(response => {
                expect(response.body).toEqual(quotes);
                expect(response.ok).toBe(true);
                expect(response.error).toBeFalsy();
            })
    })
})