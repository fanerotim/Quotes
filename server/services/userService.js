const mysqlConfig = require('../mySqlConfig');
const db = mysqlConfig();
const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');
const { validateInputs } = require('../utils/validateInputs');
const { sendEmail } = require('../mail/sendEmail');
const { generateRandomPassword } = require('../utils/generateRandomPassword');
const { generateEmailTemplate } = require('../mail/templates/generateEmailTemplate');
const { logger } = require('../logger/logger');

const hasUser = async (email) => {

    if (!email) {
        const error = new Error('User email must be provided');
        error.statusCode = 400;
        throw error;
    }

    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM users WHERE email = ?';

        db.query(sql, [email], async (err, result) => {
            if (err) {
                return reject(err)
            }
            return resolve(result);
        })
    })
}

const register = async (email, password) => {
    //validate user input
    validateInputs([email, password])

    // first check if user with this email is already registered
    const userSearchResult = await hasUser(email);
    const user = userSearchResult[0];

    // throw error if user already registered
    if (user) {
        const error = new Error('Invalid credentials!');
        error.statusCode = 409;
        throw error;
    }
    // if user DOES NOT exist, first hash their password
    const hashedPassword = await bcrypt.hash(password, 10);

    // and then INSERT user to db
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO users
        (email, password)
        VALUES(?, ?)`;

        db.query(sql, [email, hashedPassword], async (err, result) => {
            if (err) {
                return reject(err)
            }

            const payload = {
                email
            }
            try {
                const token = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });
                // Send a welcome email to user
                // generate an html template that is used in the email message
                const html = generateEmailTemplate({ type: 'WELCOME_EMAIL', email })
                // finally send the email
                const sentEmail = await sendEmail(email, html);
                return resolve(result);
            } catch (err) {
                console.error(err);
            }
        })
    })
}

const login = async (email, password) => {
    //validate user input
    validateInputs([email, password])

    // check if user exists
    const userSearchResult = await hasUser(email);
    const user = userSearchResult[0];

    if (!user) {
        throw new Error('Login details are incorrect. Please try again.');
    }

    // if it exists, check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    
    if (!isPasswordCorrect) {
        throw new Error('Login details are incorrect. Please try again.')
    }

    // log user logins into access log
    logger('ACCESS_LOG', { type: 'login', email, time: `${new Date().toDateString()}, ${new Date().toTimeString()}` })
    
    const payload = {
        email,
        id: user.id
    }
    
    const token = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });

    return {
        token,
        email,
        id: user.id
    };
}

// const generateToken = async (payload) => {
//     try {
//         const token = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });
//         console.log(token);
//         return token;
//     } catch (err) {
//         console.error(err);
//     }
// }

//  this fn / method is better to be extracted as util, as it's not related to user action
const isTokenBlacklisted = async (accessToken) => {

    if (!accessToken) {
        const error = new Error('Access token must be provided');
        error.statusCode = 400;
        throw error;
    }

    const isBlacklisted = await new Promise((resolve, reject) => {
        const sql = `SELECT *
                    FROM blacklisted_tokens
                    WHERE accessToken = ?`;

        db.query(sql, [accessToken], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        })
    })

    if (isBlacklisted.length > 0) {
        return true;
    }

    return false;
}

//  this fn / method is better to be extracted as util, as it's not related to user action
const blacklistToken = async (accessToken) => {

    if (!accessToken) {
        const error = new Error('Access token must be provided');
        error.statusCode = 400;
        throw error;
    }

    const isBlacklisted = await isTokenBlacklisted(accessToken);

    if (isBlacklisted) {
        const error = new Error('Authorization required for this request.');
        error.statusCode = 409;
        throw error;
    }

    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO blacklisted_tokens 
                    (accessToken)
                    VALUES(?)`;

        db.query(sql, [accessToken], (err, result) => {
            if (err) {
                return reject(err)
            }
            return resolve(result);
        })
    })
}

const resetUserPassword = async (email) => {

    if (!email) {
        const error = new Error('Email is required in order to reset password');
        error.statusCode = 400;
        throw error;
    }

    const userSearchResult = await hasUser(email);
    const user = userSearchResult[0];

    // check if user exists, not really needed as I have a route guard that checks if user is logged in and they cannot log in if user does not exist in db, but will keep this for now
    // TODO: REMOVE THIS AT SOME POINT / THINK ABOUT IT AND TEST FIRST
    if (!user) {
        const error = new Error('Invalid credentials!')
        error.statusCode = 400;
        throw error;
    }

    // generate a new password and store it in a variable, so we can email the user with it
    const newPassword = generateRandomPassword();
    // hash the password 
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // update the db
    return new Promise((resolve, reject) => {
        const sql = `
            UPDATE users
            SET password = ?
            WHERE email = ?
            `

        db.query(sql, [hashedPassword, email], async (err, result) => {
            if (err) {
                return reject(err)
            }
            //send the new password to the user
            // 1. first generate the email / html template
            const html = generateEmailTemplate({ type: 'PASSWORD_RESET', email, password: newPassword })
            // 2. send new pass to user
            const sentEmail = await sendEmail(email, html)
            return resolve(result);
        })
    })
}

const updatePassword = async (email, password) => {

    if (!email || !password) {
        const error = new Error('email and password must be provided');
        error.statusCode = 400;
        throw error;
    }

    // check if user exists, not really needed as I have a route guard that checks if user is logged in and they cannot log in if user does not exist in db, but will keep this for now
    // TODO: REMOVE THIS AT SOME POINT / THINK ABOUT IT AND TEST FIRST
    const userSearchResult = await hasUser(email);
    const user = userSearchResult[0];

    if (!user) {
        const error = new Error('Invalid credentials!');
        error.statusCode = 400;
        throw error;
    }

    // hash password
    const newPassword = await bcrypt.hash(password, 10);

    return new Promise((resolve, reject) => {
        const sql = `
            UPDATE users
            SET password = ?
            WHERE id = ? 
        `
        db.query(sql, [newPassword, user.id], (err, result) => {
            if (err) {
                return reject(err)
            }
            return resolve(result);
        })
    })
}

module.exports = {
    hasUser,
    register,
    login,
    isTokenBlacklisted,
    blacklistToken,
    resetUserPassword,
    updatePassword
}
