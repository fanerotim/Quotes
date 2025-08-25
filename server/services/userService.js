const mysqlConfig = require('../mySqlConfig');
const db = mysqlConfig();
const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');

const hasUser = async (email) => {

    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM users WHERE email = ?';
   
        db.query(sql, [email], (err, result) => {
            if (err) {
                console.log(err);
                return reject(err)
            }
            return resolve(result);
        })
    })
}

const register = async (email, password) => {

    // first check if user with this email is already registered
    const userExists = await hasUser(email);

    // throw error if user already registered (we get an array, so check item at index 0 to verify if user exists)
    if (userExists.length > 0) {
        const error = new Error('User is already registered!');
        error.statusCode = 409;
        throw error;
    }

    // if user DOES NOT exist hash their password
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

            // return the jwt token of the newly registered user
            const token = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '4h' })
            // TODO: Send a confirmation email to end user to welcome them to the app
            return resolve(token);
        })
    })
}

const login = async (email, password) => {

    // check if user exists
    const userExists = await hasUser(email);

    // if it does not throw error
    if (!userExists[0]) {
        throw new Error('Login details are incorrect. Please try again.');
    }

    // if it exists, check password
    const isValid = await bcrypt.compare(password, userExists[0].password)

    if (!isValid) {
        throw new Error('Login details are incorrect. Please try again.')
    }
    const payload = {
        email
    }

    const token = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '4h' });
    return token;
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

module.exports = {
    register,
    login,
    isTokenBlacklisted,
    blacklistToken
}
