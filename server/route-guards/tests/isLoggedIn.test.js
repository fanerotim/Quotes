const request = require('supertest');
const { createTestApp } = require('../../controllers/tests/createTestApp');
const app = createTestApp();

const { isLoggedIn } = require('../isLoggedIn');
jest.mock('../isLoggedIn');

const userService = require('../../services/userService');
jest.mock('../../services/userService');

describe('returns 304 forbidden error', () => {
    const user = {
        email: 'test@abv.bg',
        id: 1
    }

    const quotes = [
        {
            id: 1,
            author: `Jack Kerouac`,
            text: `I like too many things and get all confused and hung-up running from one falling star to another till i drop. This is the night, what it does to you. I had nothing to offer anybody except my own confusion.`,
            category: 'Fiction',
            ownerId: 1
        },
        {
            id: 2,
            author: '`Jack Kerouac',
            text: `What is that feeling when you're driving away from people and they recede on the plain till you see their specks dispersing? - it's the too-huge world vaulting us, and it's good-bye. But we lean forward to the next crazy venture beneath the skies.`,
            category: `Fiction`,
            ownerId: 1
        }
    ]

    test('returns 403 forbidden error', () => {
        expect.assertions(3);

        isLoggedIn.mockImplementationOnce((req, res, next) => {
            req.user = user;
            return res.status(403).json({ message: 'You are already logged in. Resource Forbidden!' });
        })

        return request(app)
            .post('/user/login')
            .expect(403)
            .then(response => {
                expect(response.ok).toBe(false);
                expect(response.body.message).toBe('You are already logged in. Resource Forbidden!');
                expect(response.error).toBeTruthy();
            })
    })

    test('isLoggedIn allows us to login', () => {
        expect.assertions(4);

        const token = 'some.JWT.token';

        isLoggedIn.mockImplementationOnce((req, res, next) => {
            req.user = null;
            next();
        })

        const result = Object.assign(user, { token });
        userService.login.mockResolvedValue(result);

        return request(app)
            .post('/user/login')
            .send(user)
            .expect(200)
            .then(response => {
                expect(response.ok).toBeTruthy();
                expect(response.body.auth).toEqual(token);
                expect(response.body.email).toBe(user.email);
                expect(response.error).toBeFalsy();
            })

    })
})