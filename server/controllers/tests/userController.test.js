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
            return res.status(403).json({message: 'You are already logged in. Resource Forbidden!'})
        })

        return request(app)
            .post('/user/register')
            .send(user)
            .expect(403)
            .then(response => {
                console.log(response);
                expect(response.ok).toBe(false);
                expect(response.body.message).toBe('You are already logged in. Resource Forbidden!');
                expect(response.error).toBeTruthy();
            })
    })
})