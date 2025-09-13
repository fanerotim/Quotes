// for now i am commeting this out as i was stuck quite a long time on figuring out how to mock db.query by using the global mock of mySqlConfig in __mocks__
// moving on for now with the below setup as I want to move to the frontend for now and will come back to review the global configuration when I can
// jest.mock('../../mySqlConfig');

const mysqlConfig = require('../../mySqlConfig');
const userService = require('../userService');

let db = mysqlConfig();

// create a mock version of db.query, so I can then mock it in tests
db.query = jest.fn();

afterEach(() => {
    db.query.mockReset();
    db.query.mockClear();
})

describe('tests for userService`s hasUser() method', () => {

    test('should return user data if user is found in db', () => {
        expect.assertions(1);

        const result = [{ id: 1, email: 'test@abv.bg', password: '123' }]

        db.query.mockImplementationOnce((sql, [email], callback) => {
            callback(null, result)
        })

        return userService.hasUser('pancho@abv.bg').then(data => {
            expect(data).toBe(result)
        })
    });


    test('should return empty [] if user is not in db', () => {
        expect.assertions(1);

        db.query.mockImplementationOnce((sql, [email], callback) => {
            callback(null, []);
        })

        return userService.hasUser('asan@abv.bg')
            .then(data => {
                expect(data).toEqual([]);
            })
    });

    test('return db error', () => {
        expect.assertions(1);

        const error = new Error('DB connection error')

        db.query.mockImplementation((sql, [email], callback) => {
            callback(error, null)
        })

        return userService.hasUser('test@abv.bg')
            .catch(err => {
                expect(err).toEqual(error);
            })
    })

    test('should throw an error if email is not provided', () => {
        expect.assertions(1);
        const error = new Error('User email must be provided');
        // error.statusCode = 400;

        return userService.hasUser()
            .catch(err => {
                expect(err).toEqual(error);
            })
    })
})

const jwt = require('../../lib/jwt');
let { generateEmailTemplate } = require('../../mail/templates/generateEmailTemplate');
let { sendEmail } = require('../../mail/sendEmail');
const nodemailer = require('nodemailer');
jest.mock('nodemailer');

describe('tests for userService`s register() method', () => {

    // dummy user used in the tests
    const user = {
        email: 'test@abv.bg',
        password: '123'
    }

    test('should throw error if no username or password are provided', () => {
        expect.assertions(1);

        const error = new Error('All fields must be filled.');

        return userService.register().catch(err => {
            expect(err).toEqual(error);
        })
    })

    test('should throw error if user is already registered', () => {
        expect.assertions(1);

        const users = [{
            id: 1,
            email: user.email,
            password: user.password
        }]

        db.query.mockImplementationOnce((sql, [email], callback) => {
            callback(null, users);
        })

        const error = new Error('Invalid credentials!')

        return userService.register(user.email, user.password)
            .catch(err => {
                expect(err).toEqual(error);
            })
    })

    test('should return db error', () => {
        expect.assertions(1);
        const error = new Error('Connection to DB failed');
        // const hashedPassword = '#somehashedpass$' // not really needed, so I am commenting it out for now

        // simulate call to hasUser, which makes call to db via db.query
        db.query
            .mockImplementationOnce((sql, [email], callback) => {
                callback(null, []);
            })

        // and finally simulate call to db to inset user, which again calls db.query, so two calls to db.query are needed
        db.query
            .mockImplementationOnce((sql, [email, hashedPassword], callback) => {
                callback(error, null);
            })

        return userService.register('nonexistent@abv.bg', user.password)
            .catch(err => {
                expect(err).toEqual(error);
            })
    })

    test('should return token', () => {
        expect.assertions(4);

        const token = 'somerandomtokenthatwewilltestagainst';
        const hashedPassword = 'thiswillnotbeusedbutiamaddingitanyways-will-refactor'
        // simulate db call and return [] to confirm user is not found
        db.query.mockImplementationOnce((sql, [email], callback) => {
            callback(null, [])
        })

        //this mocks the resolve(result) output, otherwise test timeout as we need to return result
        db.query.mockImplementationOnce((sql, [email, hashedPassword], callback) => {
            callback(null, [user])
        })

        // mock jwt.sign
        jwt.sign = jest.fn();
        jwt.sign.mockImplementationOnce((payload, secret, options) => {
            return Promise.resolve(token);
        })

        // check if jwt returned expected token
        const SECRET = 'myverysecuresecret'
        const options = { expiresIn: '2h' }
        jwt.sign({ email: user.email }, SECRET, options)
            .then(jwt => {
                expect(jwt).toEqual(token);
            })

        // mock generateEmailTemplate
        generateEmailTemplate = jest.fn();
        const template = `Hello on board, ${user.email}`
        generateEmailTemplate.mockImplementationOnce(({ type, email }) => {
            return template;
        })

        // check if the expected template is returned
        expect(generateEmailTemplate({ type: 'WELCOME_EMAIL', email: user.email })).toEqual(template);

        //dummy implementation of transporter
        const transporter = {
            sendMail: jest.fn(),
            verify: jest.fn()
        }

        // mock nodemailer createTransporter function to avoid sending email and return transporter defined above
        nodemailer.createTransport.mockReturnValue(transporter)

        //mock sendEmail method
        sendEmail = jest.fn();
        const sentEmailDetails = { accepted: user.email, response: '250 Accepted', messageId: 1 };

        sendEmail.mockImplementationOnce((email, html) => {
            return Promise.resolve(sentEmailDetails);
        });

        //test sendEmail method
        sendEmail(user.email, template)
            .then(output => {
                expect(output).toEqual(sentEmailDetails);
            })

        // test final output of register method
        return userService.register(user.email, user.password)
            .then(result => {
                expect(result).toEqual([user]);
            })
    })
})

const bcrypt = require('bcrypt');
jest.mock('bcrypt');
let { logger } = require('../../logger/logger');
const fs = require('node:fs/promises');

describe('tests for userService`s login() method', () => {

    const user = [{ email: 'test@abv.bg', password: '123', id: 1 }];

    test('throws error if invalid input is provided', () => {
        expect.assertions(2);
        const error = new Error('All fields must be filled.');

        return userService.login('', '123').catch(err => {
            expect(err).toEqual(error);
            expect(err).toStrictEqual(error);
        })
    })

    test('throws error if user is not registered', () => {
        expect.assertions(1);
        const error = new Error('Login details are incorrect. Please try again.');

        //mock db.query and return empty []
        db.query.mockImplementationOnce((sql, [email], callback) => {
            return callback(null, [])
        });

        return userService.login(user[0].email, user[0].password)
            .catch(err => {
                expect(err).toEqual(error);
            })
    })

    test('throws error if password is incorrect', () => {
        expect.assertions(1);
        const error = new Error('Login details are incorrect. Please try again.')

        db.query.mockImplementationOnce((sql, [email], callback) => {
            callback(null, user)
        });

        bcrypt.compare.mockResolvedValue(false)

        bcrypt.compare.mockImplementation((providedPassword, actualPassword) => {
            return false;
        })

        return userService.login(user[0].email, user[0].password)
            .catch(err => {
                expect(err).toEqual(error);
            })
    });

    test('returns user data to store in localStorage after successful login', () => {
        expect.assertions(2);

        // mock fs to avoid writing login data in access.log
        jest.mock('fs');

        // mock the implementation of db query to conitnue testing the login method
        db.query.mockImplementationOnce((sql, [email], callback) => {
            callback(null, user);
        })

        // mock bcrypt compare to continue testing next logical block of login method
        bcrypt.compare.mockResolvedValue(true);

        // create dummy login entry
        const logEntry = 'user login details entered in log file'

        // mock custom logger fn
        logger = jest.fn()
            .mockReturnValue(logEntry);

        // mock fs.appendFile method to avoid writing data in access log
        fs.appendFile = jest.fn();

        fs.appendFile.mockImplementationOnce(() => {
            return logEntry;
        })

        // test logger to make sure it returns expected value, but it never writes in actual access.log file
        expect(logger()).toEqual(logEntry);

        // mock jwt.sign and return dummy token
        jwt.sign = jest.fn();

        // create dummy token to be returned by jwt.sign
        const token = 'somedummytoken'

        // add implementation of jwt.sign's mocked fn
        jwt.sign.mockResolvedValue(token)

        // create dummy payload to test against
        const payload = {
            token,
            email: user[0].email,
            id: user[0].id
        }

        return userService.login(user[0].email, user[0].password)
            .then(result => {
                expect(result).toEqual(payload)
            })
    })
})

describe('tests for userService`s isTokenBlacklisted()', () => {

    const accessToken = 'someAlreadyBlacklistedToken';

    test('throws error if accessToken is not provided', () => {
        expect.assertions(1);

        const error = new Error('Access token must be provided')

        return userService.isTokenBlacklisted()
            .catch(err => {
                expect(err).toEqual(error)
            })
    })

    test('returns true if token is blacklisted', () => {
        expect.assertions(2);

        // mock db.query call to avoid real db call
        const sql = 'fakeSqlQuery'
        db.query.mockImplementationOnce((sql, [accessToken], callback) => {
            callback(null, [{ accessToken, id: 1 }])
        })

        return userService.isTokenBlacklisted(accessToken)
            .then(result => {
                expect(result).toBe(true);
                expect(result).toBeTruthy();
            })
    })

    test('returns false if token is not blacklisted', () => {
        expect.assertions(2);

        db.query.mockImplementationOnce((sql, [accessToken], callback) => {
            callback(null, false)
        })

        return userService.isTokenBlacklisted(accessToken)
            .then(result => {
                expect(result).toBeFalsy();
                expect(result).toBe(false);
            })
    })

    test('returns db error', () => {
        expect.assertions(1);

        const error = new Error('connection to DB failed');

        db.query.mockImplementationOnce((sql, [accessToken], callback) => {
            callback(error, null)
        })

        userService.isTokenBlacklisted(accessToken)
            .catch(err => {
                expect(err).toEqual(error);
            })
    })
})













