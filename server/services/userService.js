const mysqlConfig = require('../mySqlConfig');
const db = mysqlConfig();
const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');
const { validateInputs } = require('../utils/validateInputs');
const { sendWelcomeEmail } = require('../mail/sendWelcomeEmail');
const { generateRandomPassword } = require('../utils/generateRandomPassword');

const hasUser = async (email) => {

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

    // throw error if user already registered (we get an array, so check item at index 0 to verify if user exists)
    if (user) {
        const error = new Error('User is already registered!');
        error.statusCode = 409;
        throw error;
    }

    // if user DOES NOT exist, first hash their password
    const hashedPassword = await bcrypt.hash(password, 10);

    // and then ADD them to db
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
                // return the jwt token of the newly registered user
                const token = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' })
                // Send a welcome email to user
                const sentEmail = await sendWelcomeEmail(email);
                return resolve(token);
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

    const payload = {
        email,
        id: user.id
    }

    const token = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });

    return {
        token,
        email,
        id: user.id
    };
}

const isTokenBlacklisted = async (accessToken) => {

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

const blacklistToken = async (accessToken) => {

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

    const userSearchResult = await hasUser(email);
    const user = userSearchResult[0];

    if (!user) {
        const error = new Error('Incorrect email! User does not exist.')
        error.statusCode = 404;
        throw error;
    }

    // generate a new password and store it in a variable. 
    const newPassword = generateRandomPassword();
    
    // pass that variable to the email transporter function, so it can be sent to the user
    // leaving this for now, as I am still working on email templates that will be sent to the user

    // hash the password 
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // update the db
    return new Promise((resolve, reject) => {
        const sql = `
            UPDATE users
            SET password = ?
            WHERE email = ?
            `

        db.query(sql, [hashedPassword, email], (err, result) => {
            if (err) {
                return reject(err)
            }
            return resolve(result);
        })
    })


}

module.exports = {
    register,
    login,
    isTokenBlacklisted,
    blacklistToken,
    resetUserPassword
}
