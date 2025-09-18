const request = require('supertest');

const userService = require('../../services/userService');
jest.mock('../../services/userService');

const { createTestApp } = require('../tests/createTestApp');
const app = createTestApp();

const { isLoggedIn } = require('../../route-guards/isLoggedIn');
jest.mock('../../route-guards/isLoggedIn');

const { isGuest } = require('../../route-guards/isGuest');
jest.mock('../../route-guards/isGuest');

describe('POST /user/register', () => {

    const user = {
        email: 'test@abv.bg',
        password: '123'
    }

    test('returns 403 forbidden error', () => {
        expect.assertions(3);
        isLoggedIn.mockImplementationOnce((req, res, next) => {
            return res.status(403).json({ message: 'You are already logged in. Resource Forbidden!' })
        })

        return request(app)
            .post('/user/register')
            .send(user)
            .expect(403)
            .then(response => {
                expect(response.ok).toBe(false);
                expect(response.body.message).toBe('You are already logged in. Resource Forbidden!');
                expect(response.error).toBeTruthy();
            })
    })

    test('returns success message when user registers', () => {
        expect.assertions(3);

        isLoggedIn.mockImplementationOnce((req, res, next) => {
            next();
        })

        userService.register.mockResolvedValue({ message: 'User successfully registered' });

        return request(app)
            .post('/user/register')
            .send(user)
            .expect(200)
            .then(response => {
                expect(response.ok).toBe(true);
                expect(response.body.message).toBe('User successfully registered');
                expect(response.error).toBe(false);
            })
    })

    test('returns error if user is already registered', () => {
        expect.assertions(3);

        isLoggedIn.mockImplementationOnce((req, res, next) => {
            next();
        })

        const error = new Error('Invalid credentials!')
        userService.register.mockRejectedValue(error);

        return request(app)
            .post('/user/register')
            .send(user)
            .expect(500)
            .then(response => {
                expect(response.ok).toBe(false);
                expect(response.body.message).toBe('Invalid credentials!');
                expect(response.error).toBeTruthy();
            })
    })
})