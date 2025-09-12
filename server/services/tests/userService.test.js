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
        })

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














